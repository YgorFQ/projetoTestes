// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-github-col-layouts.js — Adicionar e editar layouts de coleção

   RESPONSABILIDADE:
     — Adicionar layout novo dentro de uma coleção existente
     — Editar layout existente (nome, tags, html, css)
     — Excluir layout de uma coleção

   ONDE INJETA:
     — Botão "+ Adicionar Layout" no modal de layouts da coleção (#colCollectionModal)
     — Botão "GitHub" no modal de edição de layout (aberto pelo ✎ de cada card)

   ESTRUTURA NO ARQUIVO da coleção:
     Cada layout é prefixado com o marcador @@@@Col seguido do ID.
     O array fica dentro de ColLib.registerLayout(slug, [...]).

   DEPENDÊNCIAS: senko-github-v2.js, col-core.js, col-script.js, col-modals.js
═══════════════════════════════════════════════════════════════════════ */

var _GHC_LAY_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>';

function _ghcLayIcon() { return (typeof GH_ICON !== 'undefined') ? GH_ICON : _GHC_LAY_ICON; }

/* ── Validação de id: só letras minúsculas, números e hífen ── */
function ghcLayValidId(val) { return /^[a-z0-9-]+$/.test(val); }

/* ── Gera ID a partir do nome ── */
function ghcLayBuildId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g,'-').replace(/^-|-$/g,'');
}

/* ── Monta o bloco de um layout ── */
function ghcLayBuildBlock(id, name, tags, html, css) {
  var tagsStr  = (tags||[]).map(function(t){ return "'"+t+"'"; }).join(', ');
  var safeHtml = (html||'').replace(/`/g,'\\`');
  var safeCss  = (css||'').replace(/`/g,'\\`');
  return (
    '  /*@@@@Col - ' + id + ' */\n' +
    '  {\n' +
    "    id:   '" + id   + "',\n" +
    "    name: '" + (name||'').replace(/'/g,"\\'") + "',\n" +
    '    tags: [' + tagsStr + '],\n' +
    '    html: `' + safeHtml + '`,\n' +
    '    css:  `' + safeCss  + '`,\n' +
    '  },'
  );
}

/* ── Localiza bounds de um layout pelo marcador @@@@Col ── */
function ghcLayFindBounds(content, id) {
  var marker = '/*@@@@Col - ' + id.toLowerCase() + ' */';
  var pos    = content.indexOf(marker);
  if (pos === -1) return null;

  var objOpen = content.indexOf('{', pos + marker.length);
  if (objOpen === -1) return null;

  var i=objOpen, depth=0, inTpl=false, len=content.length;
  while (i < len) {
    var ch = content[i];
    if (ch === '`') {
      var bs=0, j=i-1;
      while(j>=0 && content[j]==='\\'){bs++;j--;}
      if(bs%2===0) inTpl=!inTpl;
      i++; continue;
    }
    if (inTpl) { i++; continue; }
    if (ch==='{') { depth++; i++; continue; }
    if (ch==='}') {
      depth--;
      if (depth===0) {
        var end=i+1;
        if(content[end]===',') end++;
        if(content[end]==='\n') end++;
        return { start: pos, end: end };
      }
      i++; continue;
    }
    i++;
  }
  return null;
}

/* ── Insere novo layout antes do fechamento do array registerLayout ── */
function ghcLayInsert(content, block) {
  var closePos = content.lastIndexOf(']);');
  if (closePos === -1) return null;
  return content.slice(0, closePos) + block + '\n' + content.slice(closePos);
}

/* ── Substitui layout existente ── */
function ghcLayReplace(content, id, newBlock) {
  var bounds = ghcLayFindBounds(content, id);
  if (!bounds) return null;
  return content.slice(0, bounds.start) + newBlock + '\n' + content.slice(bounds.end);
}

/* ── Remove layout do arquivo ── */
function ghcLayRemove(content, id) {
  var bounds = ghcLayFindBounds(content, id);
  if (!bounds) return null;
  var result = content.slice(0, bounds.start) + content.slice(bounds.end);
  return result.replace(/\n\n\n/g, '\n\n');
}

/* ═══════════════════════════════════════════════════════════════════════
   CORE — adicionar layout
═══════════════════════════════════════════════════════════════════════ */
function ghcLayAddLayout(colSlug, id, name, tags, html, css) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) { ghUnlockSave(); ghSetStatus('Token não configurado','error'); return Promise.resolve(false); }

  var filePath = 'colecoes/data/' + colSlug + '.js';
  ghSetStatus('Lendo coleção…','saving');

  return (typeof ghcGroupsFlushPending === 'function' ? ghcGroupsFlushPending() : Promise.resolve(true)).then(function() {
  return githubGetFile(filePath).then(function(data) {
    /* Verifica duplicata */
    var marker = '/*@@@@Col - ' + id.toLowerCase() + ' */';
    if (data.content.indexOf(marker) !== -1) {
      ghUnlockSave();
      ghSetStatus('ID já existe','error');
      ghShowErrorModal('Já existe um layout com o ID "' + id + '" nesta coleção.\nEscolha outro ID.');
      return false;
    }

    var block      = ghcLayBuildBlock(id, name, tags, html, css);
    var newContent = ghcLayInsert(data.content, block);
    if (!newContent) {
      ghUnlockSave();
      ghSetStatus('Estrutura inválida','error');
      ghShowErrorModal('Não foi possível localizar o array registerLayout em ' + filePath + '.');
      return false;
    }

    ghSetStatus('Salvando layout…','saving');
    return githubPutFile(filePath, newContent, data.sha,
      '[SenkoLib] add layout to collection: ' + id + ' (' + colSlug + ')'
    ).then(function() {
      ColLib.registerLayout(colSlug, [{ id:id, name:name, tags:tags, html:html, css:css }]);
      ghSetStatus('✓ Layout adicionado: ' + id,'ok');
      ghUnlockSave();
      ghStartDeployWatch(filePath);
      return true;
    });

  }); }).catch(function(e) {
    console.error('[col-layouts add]', e);
    ghSetStatus('Erro: '+e.message,'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   CORE — editar layout
═══════════════════════════════════════════════════════════════════════ */
function ghcLayEditLayout(colSlug, originalId, name, tags, html, css) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) { ghUnlockSave(); ghSetStatus('Token não configurado','error'); return Promise.resolve(false); }

  var filePath = 'colecoes/data/' + colSlug + '.js';
  ghSetStatus('Lendo coleção…','saving');

  return githubGetFile(filePath).then(function(data) {
    var block      = ghcLayBuildBlock(originalId, name, tags, html, css);
    var newContent = ghcLayReplace(data.content, originalId, block);
    if (!newContent) {
      ghUnlockSave();
      ghSetStatus('Layout não encontrado','error');
      ghShowErrorModal('Marcador do layout "' + originalId + '" não encontrado em ' + filePath + '.');
      return false;
    }

    ghSetStatus('Salvando…','saving');
    return githubPutFile(filePath, newContent, data.sha,
      '[SenkoLib] edit layout in collection: ' + originalId + ' (' + colSlug + ')'
    ).then(function() {
      ColLib.updateLayout(colSlug, originalId, { name:name, tags:tags, html:html, css:css });
      ghSetStatus('✓ Layout salvo: ' + originalId,'ok');
      ghUnlockSave();
      ghStartDeployWatch(filePath);
      return true;
    });

  }).catch(function(e) {
    console.error('[col-layouts edit]', e);
    ghSetStatus('Erro: '+e.message,'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   CORE — excluir layout
═══════════════════════════════════════════════════════════════════════ */
function ghcLayDeleteLayout(colSlug, layoutId) {
  if (!ghEnsureToken()) { ghSetStatus('Token não configurado','error'); return Promise.resolve(false); }

  var filePath = 'colecoes/data/' + colSlug + '.js';
  ghSetStatus('Removendo layout…','saving');

  return githubGetFile(filePath).then(function(data) {
    var newContent = ghcLayRemove(data.content, layoutId);
    if (!newContent) {
      ghSetStatus('Layout não encontrado','error');
      ghShowErrorModal('Marcador do layout "' + layoutId + '" não encontrado em ' + filePath + '.');
      return false;
    }
    return githubPutFile(filePath, newContent, data.sha,
      '[SenkoLib] remove layout from collection: ' + layoutId + ' (' + colSlug + ')'
    ).then(function() {
      ColLib.removeLayout(colSlug, layoutId);
      ghSetStatus('✓ Layout removido: ' + layoutId,'ok');
      ghStartDeployWatch(filePath);
      return true;
    });

  }).catch(function(e) {
    console.error('[col-layouts delete]', e);
    ghSetStatus('Erro: '+e.message,'error');
    ghShowErrorModal(e.message);
    return false;
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   MODAL DE ADICIONAR LAYOUT (injetado via JS — não existe no HTML)
═══════════════════════════════════════════════════════════════════════ */
var _ghcLayAddModalReady = false;

function ghcLayEnsureAddModal() {
  if (_ghcLayAddModalReady) return;
  _ghcLayAddModalReady = true;

  var style = document.createElement('style');
  style.textContent = [
    '#ghcLayAddOverlay{position:fixed;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;z-index:9998;padding:1rem;}',
    '#ghcLayAddOverlay.gh-hidden{display:none;}',
    '#ghcLayAddModal{background:var(--card,#fff);border:1.5px solid var(--border,#e2e8f0);border-radius:calc(var(--radius,8px)*1.5);padding:0;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.18);}',
    '.ghclay-header{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-bottom:1px solid var(--border,#e2e8f0);}',
    '.ghclay-title{font-family:var(--font-body,sans-serif);font-size:1rem;font-weight:800;color:var(--text1,#0f172a);margin:0;}',
    '.ghclay-close{background:none;border:none;font-size:1rem;color:var(--text3,#94a3b8);cursor:pointer;padding:.25rem;}',
    '.ghclay-body{padding:1rem 1.25rem;display:flex;flex-direction:column;gap:.75rem;}',
    '.ghclay-field{display:flex;flex-direction:column;gap:.3rem;}',
    '.ghclay-field label{font-family:var(--font-body,sans-serif);font-size:.82rem;font-weight:700;color:var(--text1,#0f172a);}',
    '.ghclay-field input,.ghclay-field textarea{font-family:var(--font-mono,monospace);font-size:.83rem;padding:.45rem .7rem;border:1.5px solid var(--border,#e2e8f0);border-radius:var(--radius,6px);background:var(--bg,#f8fafc);color:var(--text1,#0f172a);outline:none;resize:vertical;}',
    '.ghclay-field textarea{min-height:90px;}',
    '.ghclay-field input:focus,.ghclay-field textarea:focus{border-color:#94a3b8;}',
    '.ghclay-field-desc{font-family:var(--font-body,sans-serif);font-size:.75rem;color:var(--text3,#94a3b8);}',
    '.ghclay-warn{font-family:var(--font-body,sans-serif);font-size:.75rem;font-weight:700;color:#ef4444;display:none;}',
    '.ghclay-tabs{display:flex;gap:.25rem;border-bottom:1px solid var(--border,#e2e8f0);padding:0 1.25rem;}',
    '.ghclay-tab{padding:.5rem .85rem;font-family:var(--font-body,sans-serif);font-size:.8rem;font-weight:700;color:var(--text3,#94a3b8);background:none;border:none;border-bottom:2px solid transparent;cursor:pointer;position:relative;bottom:-1px;}',
    '.ghclay-tab.active{color:var(--accent,#6366f1);border-bottom-color:var(--accent,#6366f1);}',
    '.ghclay-panel{display:none;padding:0 1.25rem .75rem;}',
    '.ghclay-panel.active{display:block;}',
    '.ghclay-preview-frame{width:100%;height:200px;border:1px solid var(--border,#e2e8f0);border-radius:var(--radius,6px);}',
    '.ghclay-footer{display:flex;align-items:center;justify-content:flex-end;gap:.6rem;padding:.75rem 1.25rem;border-top:1px solid var(--border,#e2e8f0);}',
    '[data-theme="dark"] #ghcLayAddModal{background:#1f2223;border-color:#363b3d;}',
    '[data-theme="dark"] .ghclay-field input,[data-theme="dark"] .ghclay-field textarea{background:#25282a;color:#d8d4cf;border-color:#363b3d;}',
    '[data-theme="dark"] .ghclay-field label,[data-theme="dark"] .ghclay-title{color:#d8d4cf;}',
  ].join('');
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id        = 'ghcLayAddOverlay';
  overlay.className = 'gh-hidden';
  overlay.innerHTML = [
    '<div id="ghcLayAddModal">',
    '  <div class="ghclay-header">',
    '    <h3 class="ghclay-title">Adicionar Layout à Coleção</h3>',
    '    <button class="ghclay-close" id="ghcLayAddClose">✕</button>',
    '  </div>',
    '  <div class="ghclay-body">',
    '    <div class="ghclay-field">',
    '      <label>ID <span style="color:#ef4444">*</span></label>',
    '      <input type="text" id="ghcLayAddId" placeholder="ex: hero-v2" autocomplete="off" />',
    '      <span class="ghclay-field-desc">Identificador único — letras minúsculas, números e hífen.</span>',
    '      <span class="ghclay-warn" id="ghcLayAddIdWarn"></span>',
    '    </div>',
    '    <div class="ghclay-field">',
    '      <label>Nome <span style="color:#ef4444">*</span></label>',
    '      <input type="text" id="ghcLayAddName" placeholder="ex: Hero Banner V2" autocomplete="off" />',
    '      <span class="ghclay-warn" id="ghcLayAddNameWarn"></span>',
    '    </div>',
    '    <div class="ghclay-field">',
    '      <label>Tags <span style="color:#94a3b8;font-weight:400">(separadas por vírgula)</span></label>',
    '      <input type="text" id="ghcLayAddTags" placeholder="ex: hero, banner" autocomplete="off" />',
    '    </div>',
    '  </div>',
    '  <div class="ghclay-tabs">',
    '    <button class="ghclay-tab active" data-ghclaytab="html">HTML</button>',
    '    <button class="ghclay-tab" data-ghclaytab="css">CSS</button>',
    '    <button class="ghclay-tab" data-ghclaytab="preview">Preview</button>',
    '  </div>',
    '  <div class="ghclay-panel active" id="ghcLayPanelHtml" style="padding-top:.75rem;">',
    '    <textarea id="ghcLayAddHtml" class="ghclay-field" style="width:100%;min-height:110px;font-family:var(--font-mono,monospace);font-size:.83rem;padding:.45rem .7rem;border:1.5px solid var(--border,#e2e8f0);border-radius:var(--radius,6px);background:var(--bg,#f8fafc);color:var(--text1,#0f172a);resize:vertical;" placeholder="Cole o HTML aqui…"></textarea>',
    '  </div>',
    '  <div class="ghclay-panel" id="ghcLayPanelCss" style="padding-top:.75rem;">',
    '    <textarea id="ghcLayAddCss" style="width:100%;min-height:110px;font-family:var(--font-mono,monospace);font-size:.83rem;padding:.45rem .7rem;border:1.5px solid var(--border,#e2e8f0);border-radius:var(--radius,6px);background:var(--bg,#f8fafc);color:var(--text1,#0f172a);resize:vertical;" placeholder="Cole o CSS aqui…"></textarea>',
    '  </div>',
    '  <div class="ghclay-panel" id="ghcLayPanelPreview" style="padding-top:.75rem;">',
    '    <iframe id="ghcLayPreviewFrame" class="ghclay-preview-frame" sandbox="allow-scripts"></iframe>',
    '  </div>',
    '  <div class="ghclay-footer">',
    '    <button id="ghcLayAddCancelBtn" style="padding:.5rem 1rem;border:1.5px solid var(--border,#e2e8f0);border-radius:var(--radius,6px);background:none;color:var(--text2,#64748b);font-family:var(--font-body,sans-serif);font-size:.83rem;font-weight:700;cursor:pointer;">Cancelar</button>',
    '    <button id="ghcLayAddSaveBtn" class="btn-github">' + _ghcLayIcon() + ' Salvar na coleção</button>',
    '  </div>',
    '</div>',
  ].join('');
  document.body.appendChild(overlay);

  /* Fecha ao clicar fora */
  overlay.addEventListener('click', function(e){ if(e.target===overlay) ghcLayCloseAddModal(); });
  document.getElementById('ghcLayAddClose').addEventListener('click', ghcLayCloseAddModal);
  document.getElementById('ghcLayAddCancelBtn').addEventListener('click', ghcLayCloseAddModal);

  /* Auto-gera ID a partir do nome */
  document.getElementById('ghcLayAddName').addEventListener('input', function() {
    var idEl = document.getElementById('ghcLayAddId');
    if (!idEl || idEl._userEdited) return;
    idEl.value = ghcLayBuildId(this.value);
    ghcLayValidateAddForm();
  });
  document.getElementById('ghcLayAddId').addEventListener('input', function() {
    this._userEdited = true;
    /* Força lowercase e remove chars inválidos */
    this.value = this.value.toLowerCase().replace(/[^a-z0-9-]/g,'');
    ghcLayValidateAddForm();
  });
  ['ghcLayAddName','ghcLayAddTags'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.addEventListener('input', ghcLayValidateAddForm);
  });

  /* Tabs HTML / CSS / Preview */
  overlay.querySelectorAll('.ghclay-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      overlay.querySelectorAll('.ghclay-tab').forEach(function(t){ t.classList.remove('active'); });
      overlay.querySelectorAll('.ghclay-panel').forEach(function(p){ p.classList.remove('active'); });
      this.classList.add('active');
      var panel = document.getElementById('ghcLayPanel' + this.dataset.ghclaytab.charAt(0).toUpperCase() + this.dataset.ghclaytab.slice(1));
      if (panel) panel.classList.add('active');
      if (this.dataset.ghclaytab === 'preview') {
        var h = (document.getElementById('ghcLayAddHtml')||{}).value||'';
        var c = (document.getElementById('ghcLayAddCss') ||{}).value||'';
        var f = document.getElementById('ghcLayPreviewFrame');
        if (f) { f.srcdoc=''; setTimeout(function(){ if(h||c) f.srcdoc = (typeof buildSrcDoc==='function') ? buildSrcDoc(h,c) : '<!DOCTYPE html><html><head><style>'+c+'</style></head><body>'+h+'</body></html>'; },50); }
      }
    });
  });

  /* Salvar */
  document.getElementById('ghcLayAddSaveBtn').addEventListener('click', function() {
    var col = colState && colState.currentCollection;
    if (!col) { ghShowErrorModal('Nenhuma coleção ativa.'); return; }

    if (!ghcLayValidateAddForm()) return;

    var id      = (document.getElementById('ghcLayAddId')   ||{}).value||'';
    var name    = (document.getElementById('ghcLayAddName') ||{}).value||'';
    var tagsRaw = (document.getElementById('ghcLayAddTags') ||{}).value||'';
    var html    = (document.getElementById('ghcLayAddHtml') ||{}).value||'';
    var css     = (document.getElementById('ghcLayAddCss')  ||{}).value||'';
    var tags    = tagsRaw.split(',').map(function(t){return t.trim();}).filter(Boolean);

    var btn = this;
    btn.textContent = 'Salvando…';
    btn.disabled    = true;

    ghcLayAddLayout(col.slug, id.trim(), name.trim(), tags, html, css).then(function(result) {
      if (result) {
        btn.innerHTML = _ghcLayIcon() + ' Salvo!';
        setTimeout(function() {
          ghcLayCloseAddModal();
          /* Re-renderiza o modal de coleção */
          if (typeof _colRenderLayoutsGrid === 'function') _colRenderLayoutsGrid(col);
          var countEl = document.getElementById('colCollectionCount');
          var layouts = ColLib.getLayouts(col.slug);
          if (countEl) countEl.textContent = layouts.length + (layouts.length===1?' layout':' layouts');
          /* Atualiza badge no card do grid */
          if (typeof colRenderGrid === 'function') colRenderGrid();
          btn.innerHTML = _ghcLayIcon() + ' Salvar na coleção';
          btn.disabled  = false;
        }, 1200);
      } else {
        btn.innerHTML = _ghcLayIcon() + ' Salvar na coleção';
        btn.disabled  = false;
      }
    }).catch(function(){
      btn.innerHTML = _ghcLayIcon() + ' Salvar na coleção';
      btn.disabled  = false;
    });
  });
}

function ghcLayValidateAddForm() {
  var id   = ((document.getElementById('ghcLayAddId')  ||{}).value||'').trim();
  var name = ((document.getElementById('ghcLayAddName')||{}).value||'').trim();

  var idOk   = id.length >= 2   && ghcLayValidId(id);
  var nameOk = name.length >= 2;

  var idWarn   = document.getElementById('ghcLayAddIdWarn');
  var nameWarn = document.getElementById('ghcLayAddNameWarn');
  var saveBtn  = document.getElementById('ghcLayAddSaveBtn');

  if (idWarn)   { idWarn.textContent   = (id.length>0 && !idOk)     ? '⚠ Use apenas letras minúsculas, números e hífen' : ''; idWarn.style.display   = (id.length>0 && !idOk)     ? 'block' : 'none'; }
  if (nameWarn) { nameWarn.textContent = (name.length>0 && !nameOk) ? '⚠ Nome deve ter pelo menos 2 caracteres'         : ''; nameWarn.style.display = (name.length>0 && !nameOk) ? 'block' : 'none'; }

  var ok = idOk && nameOk;
  if (saveBtn) { if(ok) saveBtn.classList.remove('btn-blocked'); else saveBtn.classList.add('btn-blocked'); }
  return ok;
}

function ghcLayOpenAddModal() {
  ghcLayEnsureAddModal();
  /* Limpa campos */
  ['ghcLayAddId','ghcLayAddName','ghcLayAddTags','ghcLayAddHtml','ghcLayAddCss'].forEach(function(id){
    var el = document.getElementById(id);
    if (el) { el.value=''; el._userEdited=false; }
  });
  var frame = document.getElementById('ghcLayPreviewFrame');
  if (frame) frame.srcdoc='';
  /* Reset tabs */
  var overlay = document.getElementById('ghcLayAddOverlay');
  if (overlay) {
    overlay.querySelectorAll('.ghclay-tab').forEach(function(t){t.classList.remove('active');});
    overlay.querySelectorAll('.ghclay-panel').forEach(function(p){p.classList.remove('active');});
    var firstTab   = overlay.querySelector('[data-ghclaytab="html"]');
    var firstPanel = document.getElementById('ghcLayPanelHtml');
    if (firstTab)  firstTab.classList.add('active');
    if (firstPanel) firstPanel.classList.add('active');
  }
  var saveBtn = document.getElementById('ghcLayAddSaveBtn');
  if (saveBtn) saveBtn.classList.add('btn-blocked');

  var ov = document.getElementById('ghcLayAddOverlay');
  if (ov) { ov.classList.remove('gh-hidden'); document.body.style.overflow='hidden'; }
}

function ghcLayCloseAddModal() {
  var ov = document.getElementById('ghcLayAddOverlay');
  if (ov) ov.classList.add('gh-hidden');
  document.body.style.overflow='';
}

/* ═══════════════════════════════════════════════════════════════════════
   MODAL DE EDITAR LAYOUT (reutiliza openModal da biblioteca para preview,
   mas injeta botão GitHub no card do modal de coleção)
═══════════════════════════════════════════════════════════════════════ */
var _ghcLayEditModalReady = false;

function ghcLayEnsureEditModal() {
  if (_ghcLayEditModalReady) return;
  _ghcLayEditModalReady = true;

  var overlay = document.createElement('div');
  overlay.id        = 'ghcLayEditOverlay';
  overlay.className = 'gh-hidden';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;z-index:9997;padding:1rem;';
  overlay.innerHTML = [
    '<div id="ghcLayEditModal" style="background:var(--card,#fff);border:1.5px solid var(--border,#e2e8f0);border-radius:calc(var(--radius,8px)*1.5);padding:0;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.18);">',
    '  <div class="ghclay-header">',
    '    <h3 class="ghclay-title">Editar Layout</h3>',
    '    <div style="display:flex;gap:.5rem;align-items:center;">',
    '      <button id="ghcLayEditDelBtn" style="display:inline-flex;align-items:center;gap:.35rem;padding:.35rem .7rem;background:transparent;color:#ef4444;border:1px solid #fca5a5;border-radius:var(--radius,6px);font-size:.78rem;font-weight:700;font-family:var(--font-body,sans-serif);cursor:pointer;height:30px;"></button>',
    '      <button id="ghcLayEditSaveBtn" class="btn-github"></button>',
    '      <button class="ghclay-close" id="ghcLayEditClose">✕</button>',
    '    </div>',
    '  </div>',
    '  <div class="ghclay-body">',
    '    <div class="ghclay-field">',
    '      <label>Nome <span style="color:#ef4444">*</span></label>',
    '      <input type="text" id="ghcLayEditName" placeholder="ex: Hero Banner V2" autocomplete="off" />',
    '    </div>',
    '    <div class="ghclay-field">',
    '      <label>Tags <span style="color:#94a3b8;font-weight:400">(separadas por vírgula)</span></label>',
    '      <input type="text" id="ghcLayEditTags" placeholder="ex: hero, banner" autocomplete="off" />',
    '    </div>',
    '  </div>',
    '  <div class="ghclay-tabs">',
    '    <button class="ghclay-tab active" data-ghclyedittab="html">HTML</button>',
    '    <button class="ghclay-tab" data-ghclyedittab="css">CSS</button>',
    '    <button class="ghclay-tab" data-ghclyedittab="preview">Preview</button>',
    '  </div>',
    '  <div class="ghclay-panel active" id="ghcLayEditPanelHtml" style="padding-top:.75rem;">',
    '    <textarea id="ghcLayEditHtml" style="width:100%;min-height:110px;font-family:var(--font-mono,monospace);font-size:.83rem;padding:.45rem .7rem;border:1.5px solid var(--border,#e2e8f0);border-radius:var(--radius,6px);background:var(--bg,#f8fafc);color:var(--text1,#0f172a);resize:vertical;" placeholder="HTML…"></textarea>',
    '  </div>',
    '  <div class="ghclay-panel" id="ghcLayEditPanelCss" style="padding-top:.75rem;">',
    '    <textarea id="ghcLayEditCss" style="width:100%;min-height:110px;font-family:var(--font-mono,monospace);font-size:.83rem;padding:.45rem .7rem;border:1.5px solid var(--border,#e2e8f0);border-radius:var(--radius,6px);background:var(--bg,#f8fafc);color:var(--text1,#0f172a);resize:vertical;" placeholder="CSS…"></textarea>',
    '  </div>',
    '  <div class="ghclay-panel" id="ghcLayEditPanelPreview" style="padding-top:.75rem;">',
    '    <iframe id="ghcLayEditPreviewFrame" class="ghclay-preview-frame" sandbox="allow-scripts" style="width:100%;height:200px;border:1px solid var(--border,#e2e8f0);border-radius:var(--radius,6px);"></iframe>',
    '  </div>',
    '</div>',
  ].join('');
  document.body.appendChild(overlay);

  overlay.addEventListener('click', function(e){ if(e.target===overlay) ghcLayCloseEditModal(); });
  document.getElementById('ghcLayEditClose').addEventListener('click', ghcLayCloseEditModal);

  /* Tabs */
  overlay.querySelectorAll('[data-ghclyedittab]').forEach(function(tab) {
    tab.addEventListener('click', function() {
      overlay.querySelectorAll('[data-ghclyedittab]').forEach(function(t){t.classList.remove('active');});
      overlay.querySelectorAll('.ghclay-panel').forEach(function(p){p.classList.remove('active');});
      this.classList.add('active');
      var panel = document.getElementById('ghcLayEditPanel' + this.dataset.ghclyedittab.charAt(0).toUpperCase() + this.dataset.ghclyedittab.slice(1));
      if (panel) panel.classList.add('active');
      if (this.dataset.ghclyedittab === 'preview') {
        var h = (document.getElementById('ghcLayEditHtml')||{}).value||'';
        var c = (document.getElementById('ghcLayEditCss') ||{}).value||'';
        var f = document.getElementById('ghcLayEditPreviewFrame');
        if (f) { f.srcdoc=''; setTimeout(function(){ if(h||c) f.srcdoc = (typeof buildSrcDoc==='function') ? buildSrcDoc(h,c) : '<!DOCTYPE html><html><head><style>'+c+'</style></head><body>'+h+'</body></html>'; },50); }
      }
    });
  });

  /* Salvar */
  document.getElementById('ghcLayEditSaveBtn').addEventListener('click', function() {
    var lay = colState && colState.currentEditLayout;
    var col = colState && colState.currentEditLayoutCollection;
    if (!lay || !col) { ghShowErrorModal('Nenhum layout selecionado.'); return; }

    var name    = ((document.getElementById('ghcLayEditName')||{}).value||'').trim();
    var tagsRaw = ((document.getElementById('ghcLayEditTags')||{}).value||'').trim();
    var html    = (document.getElementById('ghcLayEditHtml') ||{}).value||'';
    var css     = (document.getElementById('ghcLayEditCss')  ||{}).value||'';
    var tags    = tagsRaw.split(',').map(function(t){return t.trim();}).filter(Boolean);

    if (!name || name.length < 2) { ghShowErrorModal('Preencha o Nome.'); return; }

    var btn = this;
    btn.textContent = 'Salvando…';
    btn.disabled    = true;

    ghcLayEditLayout(col.slug, lay.id, name, tags, html, css).then(function(result) {
      if (result) {
        btn.innerHTML = _ghcLayIcon() + ' Salvo!';
        setTimeout(function() {
          ghcLayCloseEditModal();
          if (typeof _colRenderLayoutsGrid === 'function') _colRenderLayoutsGrid(col);
          if (typeof colRenderGrid         === 'function') colRenderGrid();
          btn.innerHTML = _ghcLayIcon() + ' GitHub';
          btn.disabled  = false;
        }, 1200);
      } else {
        btn.innerHTML = _ghcLayIcon() + ' GitHub';
        btn.disabled  = false;
      }
    }).catch(function(){
      btn.innerHTML = _ghcLayIcon() + ' GitHub';
      btn.disabled  = false;
    });
  });

  /* Excluir */
  document.getElementById('ghcLayEditDelBtn').addEventListener('click', function() {
    var lay = colState && colState.currentEditLayout;
    var col = colState && colState.currentEditLayoutCollection;
    if (!lay || !col) return;
    if (!confirm('Excluir o layout "' + lay.name + '" desta coleção?\nEssa ação não pode ser desfeita.')) return;
    ghcLayDeleteLayout(col.slug, lay.id).then(function(result) {
      if (result) {
        ghcLayCloseEditModal();
        if (typeof _colRenderLayoutsGrid === 'function') _colRenderLayoutsGrid(col);
        if (typeof colRenderGrid         === 'function') colRenderGrid();
      }
    });
  });
}

function ghcLayOpenEditModal(layout, col) {
  ghcLayEnsureEditModal();
  colState.currentEditLayout           = layout;
  colState.currentEditLayoutCollection = col;

  var nameEl  = document.getElementById('ghcLayEditName');
  var tagsEl  = document.getElementById('ghcLayEditTags');
  var htmlEl  = document.getElementById('ghcLayEditHtml');
  var cssEl   = document.getElementById('ghcLayEditCss');
  var saveBtn = document.getElementById('ghcLayEditSaveBtn');
  var delBtn  = document.getElementById('ghcLayEditDelBtn');

  if (nameEl) nameEl.value = layout.name || '';
  if (tagsEl) tagsEl.value = (layout.tags||[]).join(', ');
  if (htmlEl) htmlEl.value = layout.html || '';
  if (cssEl)  cssEl.value  = layout.css  || '';
  if (saveBtn) saveBtn.innerHTML = _ghcLayIcon() + ' GitHub';
  if (delBtn)  delBtn.innerHTML  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg> Excluir';

  /* Reset tabs para HTML */
  var ov = document.getElementById('ghcLayEditOverlay');
  if (ov) {
    ov.querySelectorAll('[data-ghclyedittab]').forEach(function(t){t.classList.remove('active');});
    ov.querySelectorAll('.ghclay-panel').forEach(function(p){p.classList.remove('active');});
    var firstTab   = ov.querySelector('[data-ghclyedittab="html"]');
    var firstPanel = document.getElementById('ghcLayEditPanelHtml');
    if (firstTab)  firstTab.classList.add('active');
    if (firstPanel) firstPanel.classList.add('active');
  }

  var overlay = document.getElementById('ghcLayEditOverlay');
  if (overlay) { overlay.classList.remove('gh-hidden'); document.body.style.overflow='hidden'; }
}

function ghcLayCloseEditModal() {
  var ov = document.getElementById('ghcLayEditOverlay');
  if (ov) ov.classList.add('gh-hidden');
  document.body.style.overflow='';
  if (colState) { colState.currentEditLayout=null; colState.currentEditLayoutCollection=null; }
}

/* ═══════════════════════════════════════════════════════════════════════
   UI — injeta botão "Adicionar Layout" no modal de coleção
   e conecta o botão ✎ de cada card ao modal de edição
═══════════════════════════════════════════════════════════════════════ */
function ghcLayInjectAddButton() {
  /* Botão "+ Adicionar Layout" no rodapé do modal de coleção */
  if (document.getElementById('ghcLayAddBtn')) return;
  var header = document.querySelector('#colCollectionModal .col-collection-header-right');
  if (!header) return;

  var btn       = document.createElement('button');
  btn.id        = 'ghcLayAddBtn';
  btn.className = 'btn-github';
  btn.innerHTML = _ghcLayIcon() + ' Adicionar layout';
  btn.title     = 'Adicionar novo layout a esta coleção';
  btn.style.cssText = 'margin-right:.5rem;';

  /* Insere antes do badge de contagem */
  var countBadge = document.getElementById('colCollectionCount');
  header.insertBefore(btn, countBadge);

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    ghcLayOpenAddModal();
  });
}

/* Chamado por col-modals.js ao renderizar os cards de layout */
function colOpenLayoutEditModal(layout, col) {
  ghcLayOpenEditModal(layout, col);
}

/* ─── Escape fecha modais de layouts ── */
function _ghcLayEscapeHandler(e) {
  if (e.key !== 'Escape') return;
  var editOv = document.getElementById('ghcLayEditOverlay');
  var addOv  = document.getElementById('ghcLayAddOverlay');
  if (editOv && !editOv.classList.contains('gh-hidden')) { ghcLayCloseEditModal(); return; }
  if (addOv  && !addOv.classList.contains('gh-hidden'))  { ghcLayCloseAddModal();  return; }
}

document.addEventListener('DOMContentLoaded', function() {
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;
  document.addEventListener('keydown', _ghcLayEscapeHandler);
  setTimeout(ghcLayInjectAddButton, 400);
});
