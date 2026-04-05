// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-fsa-variants.js — Módulo FSA para salvar variantes em disco

   RESPONSABILIDADE:
     Injeta o botão "Salvar no arquivo" no modal de edição de variante
     e no modal de nova variante, usando a File System Access API.

     Espelha exatamente o que o senko-fsa.js faz para layouts —
     a única diferença é que opera em /variants/[parentId].js
     e usa o nome ORIGINAL da variante (antes de qualquer edição)
     para localizar o marcador no arquivo.

   DEPENDÊNCIAS:
     - senkolib-core.js         (SenkoLib global)
     - core/script.js           (state, buildSrcDoc, closeEditVariantModal,
                                 closeNewVariantModal, renderVariantBlocks,
                                 updateVariantsCount, renderGrid)
     - _projectDir              (definido no script.js via selectProjectFolder)

   REQUISITOS:
     - Chrome ou Edge
     - Live Server do VS Code (não funciona em file://)

   ORDEM DE CARREGAMENTO no index.html:
     Após core/script.js, antes dos módulos GitHub:
       <script src="modules/fsa/senko-fsa-variants.js"></script>
═══════════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIO: Localiza os bounds de um objeto de variante no arquivo
   usando o marcador  /*@@@@Senko - [name] *\/
   Retorna { start, end } ou null.
   Ciente de template literals — não confunde ` com fim de objeto.
═══════════════════════════════════════════════════════════════════════ */
function fsavFindVariantBounds(content, variantName) {
  var marker    = '/*@@@@Senko - ' + variantName.toLowerCase() + ' */';
  var markerPos = content.indexOf(marker);
  if (markerPos === -1) return null;

  var objOpen = content.indexOf('{', markerPos + marker.length);
  if (objOpen === -1) return null;

  var i          = objOpen;
  var depth      = 0;
  var inTemplate = false;
  var len        = content.length;

  while (i < len) {
    var ch = content[i];

    if (ch === '`') {
      var backslashes = 0;
      var j = i - 1;
      while (j >= 0 && content[j] === '\\') { backslashes++; j--; }
      if (backslashes % 2 === 0) inTemplate = !inTemplate;
      i++; continue;
    }

    if (inTemplate) { i++; continue; }
    if (ch === '{')  { depth++; i++; continue; }

    if (ch === '}') {
      depth--;
      if (depth === 0) {
        var end = i + 1;
        if (content[end] === ',') end++;
        if (content[end] === '\n') end++;
        return { start: markerPos, end: end };
      }
      i++; continue;
    }

    i++;
  }

  return null;
}


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIO: Remove marcadores duplicados do mesmo nome no arquivo.
   Mantém só a última ocorrência (a mais recente).
═══════════════════════════════════════════════════════════════════════ */
function fsavDeduplicateMarkers(content, variantName) {
  var marker    = '/*@@@@Senko - ' + variantName.toLowerCase() + ' */';
  var positions = [];
  var search    = 0;

  while (true) {
    var pos = content.indexOf(marker, search);
    if (pos === -1) break;
    positions.push(pos);
    search = pos + marker.length;
  }

  if (positions.length <= 1) return content;

  /* Remove todas exceto a última — de trás para frente para não deslocar índices */
  for (var k = positions.length - 2; k >= 0; k--) {
    var start   = positions[k];
    var lineEnd = content.indexOf('\n', start);
    if (lineEnd === -1) lineEnd = content.length;
    else lineEnd += 1;
    content = content.slice(0, start) + content.slice(lineEnd);
  }

  return content;
}


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIO: Backup automático antes de sobrescrever
   Salva em /backups/[nome].[timestamp].bak
   (mesma lógica do senko-fsa.js — usa _projectDir do script.js)
═══════════════════════════════════════════════════════════════════════ */
async function fsavBackupFile(fileName, content) {
  if (typeof _projectDir === 'undefined' || !_projectDir) return;
  try {
    var backupsDir = await _projectDir.getDirectoryHandle('backups', { create: true });
    var ts         = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    var backupName = fileName.replace('.js', '') + '.' + ts + '.bak';
    var bf         = await backupsDir.getFileHandle(backupName, { create: true });
    var writable   = await bf.createWritable({ keepExistingData: false });
    await writable.write(new Blob([content], { type: 'text/plain' }));
    await writable.close();
    console.log('[senko-fsa-variants] Backup: backups/' + backupName);
  } catch (e) {
    console.warn('[senko-fsa-variants] Falha no backup (não bloqueante):', e.message);
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Editar variante existente em /variants/[parentId].js
   ───────────────────────────────────────────────────────────────────────
   Recebe o nome ORIGINAL da variante (antes de qualquer edição pelo
   usuário) para localizar o marcador correto no arquivo.
   O objectCode já carrega o nome novo dentro de si — é o resultado
   completo que será gravado no lugar do objeto antigo.
═══════════════════════════════════════════════════════════════════════ */
async function fsavEditVariant(parentId, originalName, objectCode) {
  if (typeof _projectDir === 'undefined' || !_projectDir) {
    alert('Selecione a pasta do projeto primeiro.');
    return false;
  }

  try {
    var varDir = await _projectDir.getDirectoryHandle('variants', { create: false });
    var entry  = await varDir.getFileHandle(parentId + '.js', { create: false });
    var file   = await entry.getFile();
    var content = await file.text();

    /* Remove marcadores duplicados acumulados antes de procurar */
    content = fsavDeduplicateMarkers(content, originalName);

    var bounds = fsavFindVariantBounds(content, originalName);

    if (!bounds) {
      alert(
        'Marcador não encontrado para "' + originalName + '" em variants/' + parentId + '.js.\n\n' +
        'Verifique se o nome da variante e o arquivo estão corretos.'
      );
      return false;
    }

    await fsavBackupFile(entry.name, content);

    var newContent =
      content.slice(0, bounds.start) +
      objectCode + '\n' +
      content.slice(bounds.end);

    var writable = await entry.createWritable({ keepExistingData: false });
    await writable.write(new Blob([newContent], { type: 'text/plain' }));
    await writable.close();
    return entry.name;

  } catch (e) {
    if (e.name === 'NotFoundError') {
      alert('Arquivo variants/' + parentId + '.js não encontrado na pasta do projeto.');
      return false;
    }
    console.error('[senko-fsa-variants] Erro ao editar variante:', e);
    alert('Erro ao editar variante: ' + e.message);
    return false;
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Criar variante nova em /variants/[parentId].js
   Cria o arquivo do zero se ele não existir.
═══════════════════════════════════════════════════════════════════════ */
async function fsavCreateVariant(parentId, variantName, objectCode) {
  if (typeof _projectDir === 'undefined' || !_projectDir) {
    alert('Selecione a pasta do projeto primeiro.');
    return false;
  }

  try {
    var varDir  = await _projectDir.getDirectoryHandle('variants', { create: true });
    var entry, content;

    try {
      entry        = await varDir.getFileHandle(parentId + '.js', { create: false });
      var file     = await entry.getFile();
      content      = await file.text();
    } catch (e) {
      /* Arquivo ainda não existe — cria do zero */
      entry   = await varDir.getFileHandle(parentId + '.js', { create: true });
      content = null;
    }

    var newContent;
    var marker = '/*@@@@Senko - ' + variantName.toLowerCase() + ' */';

    if (!content) {
      /* Arquivo novo */
      newContent =
        '// @ts-nocheck\n' +
        "SenkoLib.registerVariant('" + parentId.toLowerCase() + "', [\n\n" +
        objectCode + '\n\n' +
        ']);\n';

    } else if (content.indexOf(marker) !== -1) {
      /* Variante com esse nome já existe */
      alert('Já existe uma variante com o nome "' + variantName + '" em variants/' + parentId + '.js.\nEscolha outro nome.');
      return false;

    } else {
      /* Arquivo existe, variante é nova: insere antes do ]); */
      var closePos = content.lastIndexOf(']);');
      if (closePos === -1) {
        alert('Não foi possível encontrar o fechamento do array em variants/' + parentId + '.js.');
        return false;
      }
      newContent =
        content.slice(0, closePos) +
        objectCode + '\n\n' +
        content.slice(closePos);
    }

    if (content) await fsavBackupFile(entry.name, content);

    var writable = await entry.createWritable({ keepExistingData: false });
    await writable.write(new Blob([newContent], { type: 'text/plain' }));
    await writable.close();
    return entry.name;

  } catch (e) {
    console.error('[senko-fsa-variants] Erro ao criar variante:', e);
    alert('Erro ao criar variante: ' + e.message);
    return false;
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIO: Atualiza o objeto de variante na memória do SenkoLib
   após uma edição salva com sucesso.
═══════════════════════════════════════════════════════════════════════ */
function fsavUpdateVariantInMemory(parentId, originalName, newName, html, css) {
  var variants = SenkoLib.getVariants(parentId);
  var origLower = originalName.toLowerCase();
  for (var i = 0; i < variants.length; i++) {
    if ((variants[i].name || '').toLowerCase() === origLower) {
      variants[i].name = newName;
      variants[i].html = html;
      variants[i].css  = css;
      return;
    }
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   UI: Injeção dos botões nos modais
═══════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {

  var SAVE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>';

  /* ─── Modal EDITAR VARIANTE — botão "Salvar no arquivo" ─── */
  var saveVarToFileBtn = document.getElementById('saveVarToFileBtn');
  if (saveVarToFileBtn) {
    /* Torna o botão visível (estava display:none, reservado para módulos) */
    saveVarToFileBtn.style.display = '';

    saveVarToFileBtn.addEventListener('click', async function () {
      if (!state.currentForVariant)  { alert('Nenhum layout pai selecionado.'); return; }
      if (!state.currentEditVariant) { alert('Nenhuma variante selecionada.');  return; }

      /* ⚠ Nome ORIGINAL: lido do state, não do campo (o campo pode ter sido alterado) */
      var originalName = state.currentEditVariant.name || '';
      var newName      = document.getElementById('editVarName').value.trim().toLowerCase();
      var html         = document.getElementById('editVarHtml').value;
      var css          = document.getElementById('editVarCss').value;
      var parentId     = state.currentForVariant.id;

      if (newName.length < 2) { alert('Nome da variante muito curto.'); return; }

      var safeHtml   = html.replace(/`/g, '\\`');
      var safeCss    = css.replace(/`/g, '\\`');
      var objectCode =
        '/*@@@@Senko - ' + newName + ' */\n' +
        '  {\n' +
        "    name: '" + newName + "',\n" +
        '    html: `' + safeHtml + '`,\n' +
        '    css: `'  + safeCss  + '`,\n' +
        '  },';

      this.textContent = 'Salvando...';
      var self = this;

      var result = await fsavEditVariant(parentId, originalName, objectCode);

      if (result) {
        /* Atualiza memória com os valores novos */
        fsavUpdateVariantInMemory(parentId, originalName, newName, html, css);

        self.textContent = 'Salvo em ' + result;
        setTimeout(function () {
          closeEditVariantModal();
          self.innerHTML = SAVE_ICON + ' Salvar no arquivo';
        }, 1200);
      } else {
        self.innerHTML = SAVE_ICON + ' Salvar no arquivo';
      }
    });
  }


  /* ─── Modal NOVA VARIANTE — botão "Salvar no arquivo" ─── */
  var newVarCopyBtn = document.getElementById('newVarCopyBtn');
  if (newVarCopyBtn && !document.getElementById('fsavSaveVariantBtn')) {

    var fsavBtn = document.createElement('button');
    fsavBtn.id        = 'fsavSaveVariantBtn';
    fsavBtn.className = 'btn-save-file';
    fsavBtn.innerHTML = SAVE_ICON + ' Salvar no arquivo';

    /* Insere após o botão "Copiar objeto" */
    newVarCopyBtn.parentNode.insertBefore(fsavBtn, newVarCopyBtn.nextSibling);

    fsavBtn.addEventListener('click', async function () {
      var name = document.getElementById('newVarName').value.trim().toLowerCase();
      if (name.length < 2)           { alert('Preencha o nome da variante primeiro.'); return; }
      if (!state.currentForVariant)  { alert('Nenhum layout pai selecionado.');        return; }

      var html     = document.getElementById('newVarHtml').value;
      var css      = document.getElementById('newVarCss').value;
      var parentId = state.currentForVariant.id;

      var safeHtml = html.replace(/`/g, '\\`');
      var safeCss  = css.replace(/`/g, '\\`');
      var objectCode =
        '/*@@@@Senko - ' + name + ' */\n' +
        '  {\n' +
        "    name: '" + name + "',\n" +
        '    html: `' + safeHtml + '`,\n' +
        '    css: `'  + safeCss  + '`,\n' +
        '  },';

      this.textContent = 'Salvando...';
      var self = this;

      var result = await fsavCreateVariant(parentId, name, objectCode);

      if (result) {
        /* Registra em memória para aparecer imediatamente na lista */
        SenkoLib.registerVariant(parentId, [{ name: name, html: html, css: css }]);

        self.textContent = 'Salvo em ' + result;
        setTimeout(function () {
          closeNewVariantModal();
          if (state.currentForVariant) {
            renderVariantBlocks(SenkoLib.getVariants(parentId));
            if (typeof updateVariantsCount === 'function') updateVariantsCount(parentId);
          }
          renderGrid();
          self.innerHTML = SAVE_ICON + ' Salvar no arquivo';
        }, 1200);
      } else {
        self.innerHTML = SAVE_ICON + ' Salvar no arquivo';
      }
    });
  }

});
