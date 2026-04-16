// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-github-col-edit.js — Editar metadados de coleção no GitHub

   FLUXO:
     Usuário abre modal de edição → altera nome/tags/autor/cor
     → clica GitHub → módulo lê colecoes/data/[slug].js existente
     → substitui apenas o bloco registerCollection({ ... })
     → salva no GitHub → atualiza memória via ColLib.updateCollection

   REGRAS:
     - Slug nunca é alterado (é o nome do arquivo — imutável)
     - Só o objeto registerCollection é reescrito
     - registerLayout e tudo abaixo fica intacto

   DEPENDÊNCIAS: senko-github-v2.js, col-core.js, col-script.js, col-modals.js
═══════════════════════════════════════════════════════════════════════ */

var _GHC_EDIT_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>';

function _ghcEditIcon() {
  return (typeof GH_ICON !== 'undefined') ? GH_ICON : _GHC_EDIT_ICON;
}

/* ── Lê campos do modal de edição ── */
function ghcEditReadFields() {
  var name    = ((document.getElementById('colEditName')   ||{}).value||'').trim();
  var tagsRaw = ((document.getElementById('colEditTags')   ||{}).value||'').trim();
  var author  = ((document.getElementById('colEditAuthor') ||{}).value||'').trim();
  var color   = (typeof colGetSelectedColor === 'function') ? colGetSelectedColor('edit') : '';
  var tags    = tagsRaw.split(',').map(function(t){ return t.trim(); }).filter(Boolean);
  return { name: name, tags: tags, author: author, color: color };
}

/* ── Monta o novo bloco registerCollection ── */
function ghcEditBuildBlock(slug, fields) {
  var tagsStr = fields.tags.map(function(t){ return "'" + t + "'"; }).join(', ');
  return (
    "ColLib.registerCollection({\n" +
    "  slug:   '" + slug                                    + "',\n" +
    "  name:   '" + (fields.name  ||'').replace(/'/g,"\\'") + "',\n" +
    '  tags:   [' + tagsStr                                 + '],\n' +
    "  author: '" + (fields.author||'').replace(/'/g,"\\'") + "',\n" +
    "  color:  '" + (fields.color ||'')                     + "',\n" +
    '});'
  );
}

/* ── Localiza e substitui o bloco registerCollection no conteúdo ──
   Procura: ColLib.registerCollection({  ...  });
   Preserva tudo antes e depois (especialmente registerLayout).
── */
function ghcEditReplaceBlock(content, newBlock) {
  /* Regex que encontra ColLib.registerCollection({ ... }); */
  var re    = /ColLib\.registerCollection\(\{[\s\S]*?\}\);/;
  var match = content.match(re);
  if (!match) return null; /* bloco não encontrado */
  return content.replace(re, newBlock);
}

/* ═══════════════════════════════════════════════════════════════════════
   CORE — fluxo principal
═══════════════════════════════════════════════════════════════════════ */
function ghcEditCollection(slug, fields) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) { ghUnlockSave(); ghSetStatus('Token não configurado','error'); return Promise.resolve(false); }

  var filePath = 'colecoes/data/' + slug + '.js';
  ghSetStatus('Lendo coleção…','saving');

  return (typeof ghcGroupsFlushPending === 'function' ? ghcGroupsFlushPending() : Promise.resolve(true)).then(function() {
  return githubGetFile(filePath).then(function(data) {

    var newBlock   = ghcEditBuildBlock(slug, fields);
    var newContent = ghcEditReplaceBlock(data.content, newBlock);

    if (!newContent) {
      ghUnlockSave();
      ghSetStatus('Bloco não encontrado','error');
      ghShowErrorModal(
        'Não foi possível localizar ColLib.registerCollection em ' + filePath + '.\n' +
        'Verifique se o arquivo segue o padrão correto.'
      );
      return false;
    }

    ghSetStatus('Salvando no GitHub…','saving');

    return githubPutFile(filePath, newContent, data.sha,
      '[SenkoLib] edit collection: ' + slug

    ).then(function() {
      /* Atualiza memória */
      ColLib.updateCollection(slug, {
        name:   fields.name,
        tags:   fields.tags,
        author: fields.author,
        color:  fields.color,
      });
      ghSetStatus('✓ Coleção atualizada: ' + filePath,'ok');
      ghUnlockSave();
      ghStartDeployWatch(filePath);
      return true;
    });

  }); }).catch(function(e) {
    console.error('[col-edit]', e);
    ghSetStatus('Erro: ' + e.message,'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   UI — injeta botão GitHub no modal de edição
═══════════════════════════════════════════════════════════════════════ */
function ghcEditInjectButton() {
  if (document.getElementById('ghcEditColBtn')) return;
  var anchor = document.getElementById('colEditSaveBtn');
  if (!anchor) return;

  var btn       = document.createElement('button');
  btn.id        = 'ghcEditColBtn';
  btn.className = 'btn-github';
  btn.innerHTML = _ghcEditIcon() + ' GitHub';
  btn.title     = 'Salvar alterações no repositório GitHub';

  anchor.parentNode.replaceChild(btn, anchor);

  btn.addEventListener('click', function() {
    var validation = (typeof colValidateEditForm === 'function')
      ? colValidateEditForm() : { allOk: false };
    if (!validation.allOk) return;

    var col = colState && colState.currentEditCollection;
    if (!col || !col.slug) {
      ghShowErrorModal('Nenhuma coleção selecionada para edição.'); return;
    }

    var fields = ghcEditReadFields();
    if (!fields.name || fields.name.length < 2) {
      ghShowErrorModal('Preencha o Nome Exibido.'); return;
    }

    btn.textContent = 'Salvando…';
    btn.disabled    = true;

    ghcEditCollection(col.slug, fields).then(function(result) {
      if (result) {
        btn.innerHTML = _ghcEditIcon() + ' Salvo!';
        setTimeout(function() {
          if (typeof colCloseEditModal === 'function') colCloseEditModal();
          if (typeof colRenderGrid     === 'function') colRenderGrid();
          btn.innerHTML = _ghcEditIcon() + ' GitHub';
          btn.disabled  = false;
        }, 1200);
      } else {
        btn.innerHTML = _ghcEditIcon() + ' GitHub';
        btn.disabled  = false;
      }
    }).catch(function() {
      btn.innerHTML = _ghcEditIcon() + ' GitHub';
      btn.disabled  = false;
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;
  setTimeout(ghcEditInjectButton, 350);
});
