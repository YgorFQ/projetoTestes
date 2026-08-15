(function () {
  var state = {
    requests: [],
    members: [],
    events: [],
    tab: 'requests',
    busy: false,
    unsubscribers: []
  };

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function roleLabel(role) {
    return { owner: 'Proprietario', admin: 'Admin', editor: 'Editor' }[role] || 'Editor';
  }

  function actionLabel(action) {
    return {
      approve: 'Acesso aprovado',
      reject: 'Solicitacao recusada',
      'role-change': 'Cargo alterado',
      remove: 'Membro removido'
    }[action] || action;
  }

  function formatDate(value) {
    if (!value) return '-';
    var date = typeof value.toDate === 'function' ? value.toDate() : new Date(value);
    if (Number.isNaN(date.getTime())) return '-';
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(date);
  }

  function root() {
    return document.getElementById('senkoAccessFeature');
  }

  function setStatus(message, type) {
    var element = document.getElementById('senkoAccessStatus');
    if (!element) return;
    element.textContent = message || '';
    element.dataset.type = type || '';
  }

  function pendingRequests() {
    return state.requests.filter(function (request) {
      return request.uid && request.email && request.status === 'pending';
    });
  }

  function renderRequests() {
    var container = document.getElementById('senkoAccessRequests');
    if (!container) return;
    var requests = pendingRequests();
    if (!requests.length) {
      container.innerHTML = '<div class="senko-access-empty">Nenhuma solicitacao pendente.</div>';
      return;
    }

    var owner = window.SenkoAccessRepository.isOwner();
    container.innerHTML = requests.map(function (request) {
      var roleControl = owner
        ? '<select data-access-role="' + escapeHtml(request.uid) + '" aria-label="Cargo inicial">' +
          '<option value="editor">Editor</option><option value="admin">Admin</option>' +
          '<option value="owner">Proprietario</option></select>'
        : '<span class="senko-access-role senko-access-role--editor">Editor</span>';
      return '<article class="senko-access-row" data-request-uid="' + escapeHtml(request.uid) + '">' +
        '<div class="senko-access-person"><strong>' + escapeHtml(request.displayName || request.email) + '</strong>' +
        '<span>' + escapeHtml(request.email) + '</span><small>' + Number(request.attemptCount || 1) +
        ' tentativa(s) | ' + escapeHtml(formatDate(request.lastAttemptAt)) + '</small></div>' +
        '<div class="senko-access-controls">' + roleControl +
        '<button type="button" class="senko-access-btn senko-access-btn--secondary" data-access-reject="' + escapeHtml(request.uid) + '">Recusar</button>' +
        '<button type="button" class="senko-access-btn senko-access-btn--primary" data-access-approve="' + escapeHtml(request.uid) + '">Aprovar</button>' +
        '</div></article>';
    }).join('');
  }

  function renderMembers() {
    var container = document.getElementById('senkoAccessMembers');
    if (!container) return;
    var repository = window.SenkoAccessRepository;
    var owner = repository.isOwner();
    var currentUid = (window.SenkoFirebase.getState().user || {}).uid;

    container.innerHTML = state.members.map(function (member) {
      var role = member.role || 'editor';
      var isSelf = member.uid === currentUid;
      var controls = '';
      if (owner && !isSelf) {
        controls += '<select data-member-role="' + escapeHtml(member.uid) + '" aria-label="Cargo de ' + escapeHtml(member.displayName || member.email) + '">' +
          ['owner', 'admin', 'editor'].map(function (option) {
            return '<option value="' + option + '"' + (option === role ? ' selected' : '') + '>' + roleLabel(option) + '</option>';
          }).join('') + '</select>';
      } else {
        controls += '<span class="senko-access-role senko-access-role--' + role + '">' + roleLabel(role) + '</span>';
      }
      if (!isSelf && (owner || role === 'editor')) {
        controls += '<button type="button" class="senko-access-btn senko-access-btn--secondary" data-member-sync="' + escapeHtml(member.uid) + '">Sincronizar</button>';
      }
      if (!isSelf && (owner || role === 'editor')) {
        controls += '<button type="button" class="senko-access-btn senko-access-btn--danger" data-member-remove="' + escapeHtml(member.uid) + '">Remover</button>';
      }
      return '<article class="senko-access-row" data-member-uid="' + escapeHtml(member.uid) + '">' +
        '<div class="senko-access-person"><strong>' + escapeHtml(member.displayName || member.email) + (isSelf ? ' (voce)' : '') + '</strong>' +
        '<span>' + escapeHtml(member.email) + '</span><small>Desde ' + escapeHtml(formatDate(member.joinedAt)) + '</small></div>' +
        '<div class="senko-access-controls">' + controls + '</div></article>';
    }).join('') || '<div class="senko-access-empty">Nenhum membro encontrado.</div>';
  }

  function renderEvents() {
    var container = document.getElementById('senkoAccessEvents');
    if (!container) return;
    container.innerHTML = state.events.map(function (event) {
      return '<article class="senko-access-event"><div><strong>' + escapeHtml(actionLabel(event.action)) + '</strong>' +
        '<span>' + escapeHtml(event.targetEmail || event.targetUid) +
        (event.targetRole ? ' | ' + escapeHtml(roleLabel(event.targetRole)) : '') + '</span></div>' +
        '<small>' + escapeHtml(event.actorName || 'Administrador') + ' | ' + escapeHtml(formatDate(event.createdAt)) + '</small></article>';
    }).join('') || '<div class="senko-access-empty">Nenhuma atividade administrativa.</div>';
  }

  function renderCounts() {
    var requests = document.getElementById('senkoAccessRequestCount');
    var members = document.getElementById('senkoAccessMemberCount');
    if (requests) requests.textContent = pendingRequests().length;
    if (members) members.textContent = state.members.length;
  }

  function render() {
    renderCounts();
    renderRequests();
    renderMembers();
    renderEvents();
  }

  function switchTab(tab) {
    state.tab = tab;
    document.querySelectorAll('[data-access-tab]').forEach(function (button) {
      button.classList.toggle('is-active', button.dataset.accessTab === tab);
    });
    document.querySelectorAll('[data-access-panel]').forEach(function (panel) {
      panel.hidden = panel.dataset.accessPanel !== tab;
    });
  }

  function findRequest(uid) {
    return state.requests.find(function (request) { return request.uid === uid; });
  }

  function findMember(uid) {
    return state.members.find(function (member) { return member.uid === uid; });
  }

  function runAction(button, action, successMessage) {
    if (state.busy) return;
    state.busy = true;
    button.disabled = true;
    setStatus('Salvando...', 'info');
    Promise.resolve().then(action).then(function (result) {
      setStatus((result && result.warning) || successMessage, result && result.warning ? 'warning' : 'success');
    }).catch(function (error) {
      setStatus(error.message || 'Nao foi possivel concluir a acao.', 'error');
    }).finally(function () {
      state.busy = false;
      button.disabled = false;
    });
  }

  function handleClick(event) {
    var tab = event.target.closest('[data-access-tab]');
    if (tab) {
      switchTab(tab.dataset.accessTab);
      return;
    }

    var approve = event.target.closest('[data-access-approve]');
    if (approve) {
      var request = findRequest(approve.dataset.accessApprove);
      var requestRow = approve.closest('[data-request-uid]');
      var select = requestRow ? requestRow.querySelector('[data-access-role]') : null;
      var role = select ? select.value : 'editor';
      runAction(approve, function () {
        return window.SenkoAccessRepository.approveRequest(request, role);
      }, 'Acesso aprovado.');
      return;
    }

    var reject = event.target.closest('[data-access-reject]');
    if (reject) {
      var rejectedRequest = findRequest(reject.dataset.accessReject);
      if (!window.confirm('Recusar o acesso de ' + rejectedRequest.email + '?')) return;
      runAction(reject, function () {
        return window.SenkoAccessRepository.rejectRequest(rejectedRequest);
      }, 'Solicitacao recusada.');
      return;
    }

    var remove = event.target.closest('[data-member-remove]');
    if (remove) {
      var removedMember = findMember(remove.dataset.memberRemove);
      if (!window.confirm('Remover o acesso de ' + removedMember.email + '?')) return;
      runAction(remove, function () {
        return window.SenkoAccessRepository.removeMember(removedMember);
      }, 'Membro removido.');
      return;
    }

    var sync = event.target.closest('[data-member-sync]');
    if (sync) {
      runAction(sync, function () {
        return window.SenkoAccessRepository.repairRealtimeAccess(findMember(sync.dataset.memberSync));
      }, 'Acesso sincronizado.');
    }
  }

  function handleChange(event) {
    var select = event.target.closest('[data-member-role]');
    if (!select) return;
    var member = findMember(select.dataset.memberRole);
    var previousRole = member.role || 'editor';
    if (!window.confirm('Alterar ' + member.email + ' para ' + roleLabel(select.value) + '?')) {
      select.value = previousRole;
      return;
    }
    var nextRole = select.value;
    runAction(select, function () {
      return window.SenkoAccessRepository.changeRole(member, nextRole);
    }, 'Cargo atualizado.');
  }

  function stop() {
    state.unsubscribers.splice(0).forEach(function (unsubscribe) {
      if (typeof unsubscribe === 'function') unsubscribe();
    });
  }

  function start() {
    stop();
    var repository = window.SenkoAccessRepository;
    if (!repository || !repository.isManager()) return;
    setStatus('', '');
    var roleLabelElement = document.getElementById('senkoAccessRoleLabel');
    if (roleLabelElement) {
      roleLabelElement.textContent = repository.isOwner()
        ? 'Proprietario do SenkoLib'
        : 'Administrador';
    }
    state.unsubscribers.push(repository.watchRequests(function (requests) {
      state.requests = requests;
      render();
    }, function (error) { setStatus(error.message, 'error'); }));
    state.unsubscribers.push(repository.watchMembers(function (members) {
      state.members = members;
      render();
    }, function (error) { setStatus(error.message, 'error'); }));
    state.unsubscribers.push(repository.watchEvents(function (events) {
      state.events = events;
      render();
    }, function (error) { setStatus(error.message, 'error'); }));
  }

  function init() {
    var element = root();
    if (!element || element.dataset.accessInitialized) return;
    element.dataset.accessInitialized = '1';
    element.addEventListener('click', handleClick);
    element.addEventListener('change', handleChange);
    switchTab('requests');
  }

  window.SenkoAccess = {
    init: init,
    start: start,
    stop: stop,
    render: render
  };
})();
