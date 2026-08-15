const crypto = require('node:crypto');
const { getDatabase } = require('firebase-admin/database');
const {
  FieldValue,
  getFirestore
} = require('firebase-admin/firestore');
const { HttpsError } = require('firebase-functions/v2/https');

const db = getFirestore();

function cleanId(value, label) {
  const id = String(value || '').trim();
  if (!id || id.includes('/') || id.length > 180) {
    throw new HttpsError('invalid-argument', `${label} invalido.`);
  }
  return id;
}

function cleanWorkspaceId(value) {
  return cleanId(value || 'senkolib', 'Workspace');
}

function normalizeName(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function cleanName(value) {
  const name = String(value || '').trim();
  if (name.length < 2 || name.length > 160) {
    throw new HttpsError('invalid-argument', 'Informe um nome entre 2 e 160 caracteres.');
  }
  return name;
}

function cleanText(value, label, maxLength) {
  const text = String(value || '');
  if (text.length > maxLength) {
    throw new HttpsError(
      'invalid-argument',
      `${label} ultrapassa o limite de ${maxLength} caracteres.`
    );
  }
  return text;
}

function cleanTags(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((tag) => String(tag || '').trim())
    .filter(Boolean)
    .slice(0, 40)
    .map((tag) => tag.slice(0, 80));
}

function cleanColor(value) {
  const color = String(value || '').trim();
  if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
    throw new HttpsError('invalid-argument', 'Informe uma cor hexadecimal valida.');
  }
  return color.toLowerCase();
}

function reservationId(scope, nameKey) {
  return crypto
    .createHash('sha256')
    .update(`${scope}:${nameKey}`)
    .digest('hex');
}

function workspaceRef(workspaceId) {
  return db.doc(`workspaces/${workspaceId}`);
}

function memberRef(workspaceId, uid) {
  return db.doc(`workspaces/${workspaceId}/members/${uid}`);
}

async function requireMember(auth, workspaceId) {
  if (!auth || !auth.uid) {
    throw new HttpsError('unauthenticated', 'Entre com sua conta Google.');
  }
  const member = await memberRef(workspaceId, auth.uid).get();
  if (!member.exists) {
    throw new HttpsError('permission-denied', 'Sua conta nao e membro deste SenkoLib.');
  }
  return member.data();
}

function resolveVersionedResource(workspaceId, data) {
  const kind = String(data.kind || '');
  const parentId = data.parentId ? cleanId(data.parentId, 'ID pai') : '';

  if (kind === 'libraryLayout') {
    const collection = db.collection(`workspaces/${workspaceId}/bibliotecaLayouts`);
    return {
      kind,
      parentId: '',
      parentRef: null,
      collection,
      scope: 'biblioteca-layouts'
    };
  }

  if (kind === 'libraryVariant') {
    if (!parentId) throw new HttpsError('invalid-argument', 'Layout pai obrigatorio.');
    const parentRef = db.doc(`workspaces/${workspaceId}/bibliotecaLayouts/${parentId}`);
    return {
      kind,
      parentId,
      parentRef,
      collection: parentRef.collection('variants'),
      scope: `biblioteca-variantes:${parentId}`
    };
  }

  if (kind === 'collectionLayout') {
    if (!parentId) throw new HttpsError('invalid-argument', 'Colecao pai obrigatoria.');
    const parentRef = db.doc(`workspaces/${workspaceId}/collections/${parentId}`);
    return {
      kind,
      parentId,
      parentRef,
      collection: parentRef.collection('layouts'),
      scope: `colecao-layouts:${parentId}`
    };
  }

  throw new HttpsError('invalid-argument', 'Tipo de conteudo desconhecido.');
}

async function saveVersionedContent(request) {
  const data = request.data || {};
  const workspaceId = cleanWorkspaceId(data.workspaceId);
  const actor = request.auth;
  await requireMember(actor, workspaceId);

  const target = resolveVersionedResource(workspaceId, data);
  const resourceId = data.resourceId
    ? cleanId(data.resourceId, 'ID do conteudo')
    : target.collection.doc().id;
  const resourceRef = target.collection.doc(resourceId);
  const revisionRef = resourceRef.collection('revisions').doc();
  const name = cleanName(data.name);
  const nameKey = normalizeName(name);
  const html = cleanText(data.html, 'HTML', 750000);
  const css = cleanText(data.css, 'CSS', 250000);
  const baseRevisionId = data.baseRevisionId === null
    ? null
    : String(data.baseRevisionId || '').trim();
  const newReservationRef = db.doc(
    `workspaces/${workspaceId}/nameReservations/${reservationId(target.scope, nameKey)}`
  );

  const result = await db.runTransaction(async (transaction) => {
    const reads = [
      transaction.get(memberRef(workspaceId, actor.uid)),
      transaction.get(resourceRef),
      transaction.get(newReservationRef)
    ];
    if (target.parentRef) reads.push(transaction.get(target.parentRef));

    const snapshots = await Promise.all(reads);
    const memberSnapshot = snapshots[0];
    const resourceSnapshot = snapshots[1];
    const reservationSnapshot = snapshots[2];
    const parentSnapshot = target.parentRef ? snapshots[3] : null;

    if (!memberSnapshot.exists) {
      throw new HttpsError('permission-denied', 'Sua permissao foi removida.');
    }
    if (parentSnapshot && !parentSnapshot.exists) {
      throw new HttpsError('not-found', 'O item pai nao existe mais.');
    }

    const existing = resourceSnapshot.exists ? resourceSnapshot.data() : null;
    if (existing) {
      if (!baseRevisionId || baseRevisionId !== existing.currentRevisionId) {
        throw new HttpsError(
          'aborted',
          'Outra pessoa salvou uma versao mais recente. Recarregue ou compare antes de salvar.'
        );
      }
    } else if (baseRevisionId) {
      throw new HttpsError('aborted', 'Este conteudo ainda nao existe no Firebase.');
    }

    if (reservationSnapshot.exists &&
        reservationSnapshot.data().resourcePath !== resourceRef.path) {
      throw new HttpsError('already-exists', 'Ja existe outro item com esse nome.');
    }

    const now = FieldValue.serverTimestamp();
    const version = existing ? Number(existing.version || 0) + 1 : 1;
    const resourceData = {
      id: resourceId,
      kind: target.kind,
      workspaceId,
      parentId: target.parentId || null,
      collectionId: target.kind === 'collectionLayout' ? target.parentId : null,
      name,
      nameKey,
      tags: cleanTags(data.tags),
      html,
      css,
      currentRevisionId: revisionRef.id,
      version,
      updatedAt: now,
      updatedBy: actor.uid,
      updatedByName: actor.token.name || actor.token.email || 'Membro'
    };

    if (!existing) {
      resourceData.createdAt = now;
      resourceData.createdBy = actor.uid;
      resourceData.legacyId = data.legacyId
        ? cleanId(data.legacyId, 'ID legado')
        : null;
    }

    transaction.set(resourceRef, resourceData, { merge: true });
    transaction.create(revisionRef, {
      revisionId: revisionRef.id,
      resourceId,
      workspaceId,
      kind: target.kind,
      name,
      tags: resourceData.tags,
      html,
      css,
      baseRevisionId: existing ? existing.currentRevisionId : null,
      createdAt: now,
      createdBy: actor.uid,
      createdByName: resourceData.updatedByName
    });
    transaction.set(newReservationRef, {
      scope: target.scope,
      name,
      nameKey,
      resourcePath: resourceRef.path,
      updatedAt: now
    });

    if (existing && existing.nameKey && existing.nameKey !== nameKey) {
      const oldReservationRef = db.doc(
        `workspaces/${workspaceId}/nameReservations/` +
        reservationId(target.scope, existing.nameKey)
      );
      transaction.delete(oldReservationRef);
    }

    transaction.set(workspaceRef(workspaceId), {
      dataVersion: FieldValue.increment(1),
      updatedAt: now,
      updatedBy: actor.uid
    }, { merge: true });

    return {
      id: resourceId,
      revisionId: revisionRef.id,
      version
    };
  });

  return result;
}

async function saveCollection(request) {
  const data = request.data || {};
  const workspaceId = cleanWorkspaceId(data.workspaceId);
  const actor = request.auth;
  await requireMember(actor, workspaceId);

  const collections = db.collection(`workspaces/${workspaceId}/collections`);
  const groupId = data.groupId ? cleanId(data.groupId, 'Grupo') : null;
  const groupRef = groupId
    ? db.doc(`workspaces/${workspaceId}/groups/${groupId}`)
    : null;
  const collectionId = data.collectionId
    ? cleanId(data.collectionId, 'ID da colecao')
    : collections.doc().id;
  const collectionRef = collections.doc(collectionId);
  const name = cleanName(data.name);
  const nameKey = normalizeName(name);
  const scope = 'colecoes';
  const newReservationRef = db.doc(
    `workspaces/${workspaceId}/nameReservations/${reservationId(scope, nameKey)}`
  );
  const expectedVersion = data.expectedVersion === null
    ? null
    : Number(data.expectedVersion);

  return db.runTransaction(async (transaction) => {
    const reads = [
      transaction.get(memberRef(workspaceId, actor.uid)),
      transaction.get(collectionRef),
      transaction.get(newReservationRef)
    ];
    if (groupRef) reads.push(transaction.get(groupRef));

    const snapshots = await Promise.all(reads);
    const memberSnapshot = snapshots[0];
    const collectionSnapshot = snapshots[1];
    const reservationSnapshot = snapshots[2];
    const groupSnapshot = groupRef ? snapshots[3] : null;

    if (!memberSnapshot.exists) {
      throw new HttpsError('permission-denied', 'Sua permissao foi removida.');
    }
    if (groupSnapshot && !groupSnapshot.exists) {
      throw new HttpsError('not-found', 'O grupo selecionado nao existe mais.');
    }

    const existing = collectionSnapshot.exists ? collectionSnapshot.data() : null;
    if (existing && expectedVersion !== Number(existing.version || 0)) {
      throw new HttpsError(
        'aborted',
        'Outra pessoa alterou esta colecao. Recarregue antes de salvar.'
      );
    }
    if (!existing && expectedVersion !== null) {
      throw new HttpsError('aborted', 'Esta colecao ainda nao existe no Firebase.');
    }

    if (reservationSnapshot.exists &&
        reservationSnapshot.data().resourcePath !== collectionRef.path) {
      throw new HttpsError('already-exists', 'Ja existe outra colecao com esse nome.');
    }

    const now = FieldValue.serverTimestamp();
    const version = existing ? Number(existing.version || 0) + 1 : 1;
    const collectionData = {
      id: collectionId,
      workspaceId,
      name,
      nameKey,
      groupId,
      tags: cleanTags(data.tags),
      version,
      updatedAt: now,
      updatedBy: actor.uid,
      updatedByName: actor.token.name || actor.token.email || 'Membro'
    };

    if (!existing) {
      collectionData.createdAt = now;
      collectionData.createdBy = actor.uid;
      collectionData.legacyId = data.legacyId
        ? cleanId(data.legacyId, 'ID legado')
        : null;
    }

    transaction.set(collectionRef, collectionData, { merge: true });
    transaction.set(newReservationRef, {
      scope,
      name,
      nameKey,
      resourcePath: collectionRef.path,
      updatedAt: now
    });

    if (existing && existing.nameKey && existing.nameKey !== nameKey) {
      transaction.delete(db.doc(
        `workspaces/${workspaceId}/nameReservations/` +
        reservationId(scope, existing.nameKey)
      ));
    }

    transaction.set(workspaceRef(workspaceId), {
      dataVersion: FieldValue.increment(1),
      updatedAt: now,
      updatedBy: actor.uid
    }, { merge: true });

    return { id: collectionId, version };
  });
}

async function saveGroup(request) {
  const data = request.data || {};
  const workspaceId = cleanWorkspaceId(data.workspaceId);
  const actor = request.auth;
  await requireMember(actor, workspaceId);

  const groups = db.collection(`workspaces/${workspaceId}/groups`);
  const groupId = cleanId(data.groupId, 'ID do grupo');
  const groupRef = groups.doc(groupId);
  const name = cleanName(data.name);
  const nameKey = normalizeName(name);
  const color = cleanColor(data.color);
  const scope = 'grupos';
  const reservationRef = db.doc(
    `workspaces/${workspaceId}/nameReservations/${reservationId(scope, nameKey)}`
  );
  const expectedVersion = data.expectedVersion === null
    ? null
    : Number(data.expectedVersion);

  return db.runTransaction(async (transaction) => {
    const [memberSnapshot, groupSnapshot, reservationSnapshot] = await Promise.all([
      transaction.get(memberRef(workspaceId, actor.uid)),
      transaction.get(groupRef),
      transaction.get(reservationRef)
    ]);

    if (!memberSnapshot.exists) {
      throw new HttpsError('permission-denied', 'Sua permissao foi removida.');
    }

    const existing = groupSnapshot.exists ? groupSnapshot.data() : null;
    if (existing && expectedVersion === null) {
      throw new HttpsError('already-exists', 'Ja existe um grupo com esse nome.');
    }
    if (existing && expectedVersion !== Number(existing.version || 0)) {
      throw new HttpsError('aborted', 'Outra pessoa alterou este grupo.');
    }
    if (!existing && expectedVersion !== null) {
      throw new HttpsError('aborted', 'Este grupo ainda nao existe no Firebase.');
    }
    if (reservationSnapshot.exists &&
        reservationSnapshot.data().resourcePath !== groupRef.path) {
      throw new HttpsError('already-exists', 'Ja existe outro grupo com esse nome.');
    }

    const now = FieldValue.serverTimestamp();
    const version = existing ? Number(existing.version || 0) + 1 : 1;
    const groupData = {
      id: groupId,
      workspaceId,
      name,
      nameKey,
      color,
      version,
      updatedAt: now,
      updatedBy: actor.uid,
      updatedByName: actor.token.name || actor.token.email || 'Membro'
    };

    if (!existing) {
      groupData.createdAt = now;
      groupData.createdBy = actor.uid;
    }

    transaction.set(groupRef, groupData, { merge: true });
    transaction.set(reservationRef, {
      scope,
      name,
      nameKey,
      resourcePath: groupRef.path,
      updatedAt: now
    });

    if (existing && existing.nameKey && existing.nameKey !== nameKey) {
      transaction.delete(db.doc(
        `workspaces/${workspaceId}/nameReservations/` +
        reservationId(scope, existing.nameKey)
      ));
    }

    transaction.set(workspaceRef(workspaceId), {
      dataVersion: FieldValue.increment(1),
      updatedAt: now,
      updatedBy: actor.uid
    }, { merge: true });

    return { id: groupId, version };
  });
}

async function deleteGroup(request) {
  const data = request.data || {};
  const workspaceId = cleanWorkspaceId(data.workspaceId);
  const actor = request.auth;
  await requireMember(actor, workspaceId);

  const groupId = cleanId(data.groupId, 'ID do grupo');
  const groupRef = db.doc(`workspaces/${workspaceId}/groups/${groupId}`);
  const collectionsUsingGroup = db.collection(`workspaces/${workspaceId}/collections`)
    .where('groupId', '==', groupId)
    .limit(1);
  const expectedVersion = Number(data.expectedVersion || 0);

  return db.runTransaction(async (transaction) => {
    const [memberSnapshot, groupSnapshot, usageSnapshot] = await Promise.all([
      transaction.get(memberRef(workspaceId, actor.uid)),
      transaction.get(groupRef),
      transaction.get(collectionsUsingGroup)
    ]);

    if (!memberSnapshot.exists) {
      throw new HttpsError('permission-denied', 'Sua permissao foi removida.');
    }
    if (!groupSnapshot.exists) {
      return { deleted: false, reason: 'not-found' };
    }
    if (!usageSnapshot.empty) {
      throw new HttpsError(
        'failed-precondition',
        'Mova as colecoes deste grupo antes de exclui-lo.'
      );
    }

    const group = groupSnapshot.data();
    if (Number(group.version || 0) !== expectedVersion) {
      throw new HttpsError(
        'aborted',
        'Outra pessoa alterou este grupo antes da exclusao.'
      );
    }

    transaction.delete(groupRef);
    if (group.nameKey) {
      transaction.delete(db.doc(
        `workspaces/${workspaceId}/nameReservations/` +
        reservationId('grupos', group.nameKey)
      ));
    }
    transaction.set(workspaceRef(workspaceId), {
      dataVersion: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: actor.uid
    }, { merge: true });

    return { deleted: true, id: groupId, name: group.name || '' };
  });
}

function resolveDeleteTarget(workspaceId, data) {
  if (data.kind === 'collection') {
    const collectionId = cleanId(data.resourceId, 'ID da colecao');
    return {
      ref: db.doc(`workspaces/${workspaceId}/collections/${collectionId}`),
      scope: 'colecoes'
    };
  }

  const target = resolveVersionedResource(workspaceId, data);
  const resourceId = cleanId(data.resourceId, 'ID do conteudo');
  return {
    ref: target.collection.doc(resourceId),
    scope: target.scope
  };
}

async function deleteContent(request) {
  const data = request.data || {};
  const workspaceId = cleanWorkspaceId(data.workspaceId);
  const actor = request.auth;
  await requireMember(actor, workspaceId);

  const target = resolveDeleteTarget(workspaceId, data);
  const snapshot = await target.ref.get();
  if (!snapshot.exists) return { deleted: false, reason: 'not-found' };

  const existing = snapshot.data();
  await db.runTransaction(async (transaction) => {
    const [memberSnapshot, currentSnapshot] = await Promise.all([
      transaction.get(memberRef(workspaceId, actor.uid)),
      transaction.get(target.ref)
    ]);

    if (!memberSnapshot.exists) {
      throw new HttpsError('permission-denied', 'Sua permissao foi removida.');
    }
    if (!currentSnapshot.exists) return;

    const current = currentSnapshot.data();
    if (data.expectedVersion !== undefined && data.expectedVersion !== null &&
        Number(current.version || 0) !== Number(data.expectedVersion)) {
      throw new HttpsError(
        'aborted',
        'Outra pessoa alterou este item antes da exclusao.'
      );
    }
    if (data.expectedRevisionId &&
        current.currentRevisionId !== data.expectedRevisionId) {
      throw new HttpsError(
        'aborted',
        'Outra pessoa salvou uma nova versao antes da exclusao.'
      );
    }

    transaction.set(target.ref, {
      deleting: true,
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: actor.uid
    }, { merge: true });

    if (current.nameKey) {
      transaction.delete(db.doc(
        `workspaces/${workspaceId}/nameReservations/` +
        reservationId(target.scope, current.nameKey)
      ));
    }

    transaction.set(workspaceRef(workspaceId), {
      dataVersion: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: actor.uid
    }, { merge: true });
  });

  await db.recursiveDelete(target.ref);
  return {
    deleted: true,
    id: target.ref.id,
    name: existing.name || ''
  };
}

async function ensurePresenceAccess(request) {
  const data = request.data || {};
  const workspaceId = cleanWorkspaceId(data.workspaceId);
  const actor = request.auth;
  await requireMember(actor, workspaceId);

  await getDatabase().ref(`presenceAccess/${workspaceId}/${actor.uid}`).set(true);
  return { allowed: true };
}

async function bootstrapEmulatorMember(request) {
  if (process.env.FUNCTIONS_EMULATOR !== 'true') {
    throw new HttpsError('permission-denied', 'Disponivel somente nos emuladores locais.');
  }
  if (!request.auth || !request.auth.uid) {
    throw new HttpsError('unauthenticated', 'Entre no emulador de Authentication.');
  }

  const workspaceId = cleanWorkspaceId((request.data || {}).workspaceId);
  const now = FieldValue.serverTimestamp();
  await Promise.all([
    workspaceRef(workspaceId).set({
      name: 'SenkoLib local',
      dataVersion: 0,
      createdAt: now
    }, { merge: true }),
    memberRef(workspaceId, request.auth.uid).set({
      uid: request.auth.uid,
      email: request.auth.token.email || '',
      displayName: request.auth.token.name || request.auth.token.email || 'Membro local',
      joinedAt: now,
      localEmulator: true
    }, { merge: true })
  ]);

  return { created: true };
}

module.exports = {
  bootstrapEmulatorMember,
  deleteContent,
  deleteGroup,
  ensurePresenceAccess,
  normalizeName,
  requireMember,
  saveCollection,
  saveGroup,
  saveVersionedContent
};
