// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-fsa.js — Modulo experimental: salvar direto nos arquivos .js
   ───────────────────────────────────────────────────────────────────────
   COMO USAR:
     Adicione no index.html APOS o script.js:
       <script src="senko-fsa.js"></script>

   REQUISITOS:
     - Chrome ou Edge
     - Live Server do VS Code
═══════════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIO: Parser híbrido
   Estratégia:
     1. Acha o marcador  @@@@Senko - [id]  no arquivo
     2. A partir dele, acha o '{' que abre o objeto
     3. Conta profundidade de chaves ciente de template literals
     4. Retorna { start, end } onde:
          start = posição do marcador (primeira ocorrência)
          end   = posição após o fechamento do objeto
     5. Antes de retornar, remove todas as ocorrências duplicadas
        do marcador que estejam acima do start — deixa só uma
═══════════════════════════════════════════════════════════════════════ */
function findObjectBounds(content, layoutId) {
  var marker    = '/*@@@@Senko - ' + layoutId.toLowerCase() + ' */';
  var markerPos = content.indexOf(marker);

  if (markerPos === -1) return { error: 'no_marker' };

  /* Avança do marcador até o '{' que abre o objeto */
  var objOpen = content.indexOf('{', markerPos + marker.length);
  if (objOpen === -1) return null;

  /* Conta profundidade de chaves, ciente de template literals */
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

    if (ch === '{') { depth++; i++; continue; }

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
   UTILITÁRIO: Remove marcadores duplicados que acumularam no arquivo.
   Mantém só a ultima ocorrência (a mais recente, logo antes do objeto).
═══════════════════════════════════════════════════════════════════════ */
function deduplicateMarkers(content, layoutId) {
  var marker = '/*@@@@Senko - ' + layoutId.toLowerCase() + ' */';

  /* Coleta todas as posições do marcador */
  var positions = [];
  var search = 0;
  while (true) {
    var pos = content.indexOf(marker, search);
    if (pos === -1) break;
    positions.push(pos);
    search = pos + marker.length;
  }

  /* Se há só uma ocorrência, nada a fazer */
  if (positions.length <= 1) return content;

  /* Remove todas exceto a última — de trás pra frente para não deslocar índices */
  for (var k = positions.length - 2; k >= 0; k--) {
    var start = positions[k];
    /* Consome até o fim da linha (incluindo \n) */
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
═══════════════════════════════════════════════════════════════════════ */
async function backupFile(projectDir, fileName, content) {
  try {
    var backupsDir = await projectDir.getDirectoryHandle('backups', { create: true });
    var ts         = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    var backupName = fileName.replace('.js', '') + '.' + ts + '.bak';
    var bf         = await backupsDir.getFileHandle(backupName, { create: true });
    var writable   = await bf.createWritable({ keepExistingData: false });
    await writable.write(new Blob([content], { type: 'text/plain' }));
    await writable.close();
    console.log('[senko-fsa] Backup: backups/' + backupName);
  } catch (e) {
    console.warn('[senko-fsa] Falha no backup (nao bloqueante):', e.message);
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Salvar layout — substitui saveLayoutToFile() do script.js
═══════════════════════════════════════════════════════════════════════ */
var saveLayoutToFile = async function (layoutId, objectCode) {
  if (!_projectDir) {
    alert('Selecione a pasta do projeto primeiro.');
    return false;
  }

  try {
    var layoutsDir = await _projectDir.getDirectoryHandle('layouts', { create: false });
    var marker     = '/*@@@@Senko - ' + layoutId.toLowerCase() + ' */';
    var candidates = [];

    for await (var entry of layoutsDir.values()) {
      if (entry.kind !== 'file' || !entry.name.endsWith('.js')) continue;
      var file    = await entry.getFile();
      var content = await file.text();
      if (content.indexOf(marker) !== -1) {
        candidates.push({ entry: entry, content: content });
      }
    }

    if (candidates.length === 0) {
      alert(
        'Marcador nao encontrado para "' + layoutId + '".\n\n' +
        'Se e um layout novo: cole o objeto gerado manualmente no arquivo correto e recarregue.'
      );
      return false;
    }

    if (candidates.length > 1) {
      var names = candidates.map(function (c) { return c.entry.name; }).join(', ');
      alert('O marcador de "' + layoutId + '" foi encontrado em mais de um arquivo:\n' + names + '\n\nCorrija a duplicata manualmente.');
      return false;
    }

    var targetFile    = candidates[0].entry;
    var targetContent = candidates[0].content;

    /* Remove marcadores duplicados acumulados antes de parsear */
    targetContent = deduplicateMarkers(targetContent, layoutId);

    var bounds = findObjectBounds(targetContent, layoutId);

    if (!bounds) {
      alert('Nao foi possivel localizar o objeto "' + layoutId + '".\nSalve manualmente.');
      return false;
    }
    if (bounds.error === 'no_marker') {
      alert('Marcador nao encontrado para "' + layoutId + '".');
      return false;
    }

    await backupFile(_projectDir, targetFile.name, targetContent);

    /* objectCode ja inclui o marcador e a virgula final */
    var newContent =
      targetContent.slice(0, bounds.start) +
      objectCode + '\n' +
      targetContent.slice(bounds.end);

    var writable = await targetFile.createWritable({ keepExistingData: false });
    await writable.write(new Blob([newContent], { type: "text/plain" }));
    await writable.close();
    return targetFile.name;

  } catch (e) {
    console.error('[senko-fsa] Erro ao salvar layout:', e);
    alert('Erro ao salvar: ' + e.message);
    return false;
  }
};


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Salvar variante — opera em /variants/[parentId].js
═══════════════════════════════════════════════════════════════════════ */
async function saveVariantToFile(parentId, variantNome, objectCode) {
  if (!_projectDir) {
    alert('Selecione a pasta do projeto primeiro.');
    return false;
  }

  try {
    var varDir  = await _projectDir.getDirectoryHandle('variants', { create: false });
    var entry   = await varDir.getFileHandle(parentId + '.js', { create: false });
    var file    = await entry.getFile();
    var content = await file.text();

    var marker  = "nome: '" + variantNome + "'";
    var pos     = content.indexOf(marker);
    if (pos === -1) {
      alert('Variante "' + variantNome + '" nao encontrada em variants/' + parentId + '.js');
      return false;
    }
    if (content.indexOf(marker, pos + 1) !== -1) {
      alert('A variante "' + variantNome + '" aparece mais de uma vez no arquivo.\nCorrija manualmente.');
      return false;
    }

    /* Busca o '{' que abre o objeto avançando a partir do marcador,
       não voltando — evita pegar um '{' dentro de HTML/CSS de outro objeto */
    var objOpen = -1;
    var scanBack = pos;
    /* Volta linha a linha até achar o '{' de abertura do objeto,
       verificando que não estamos dentro de um template literal */
    var tmpScan = content.lastIndexOf('{', pos);
    /* Valida: o '{' encontrado deve ser o do objeto { nome: '...', não um de CSS/HTML.
       Para isso, checa que entre ele e o 'nome:' só há espaços, newlines e nada mais */
    while (tmpScan !== -1) {
      var between = content.slice(tmpScan + 1, pos).trim();
      /* Se entre o '{' e o 'nome:' só há espaços/newlines, é o '{' correto */
      if (/^[\s]*$/.test(between)) {
        objOpen = tmpScan;
        break;
      }
      /* Senão, continua procurando mais para trás */
      tmpScan = content.lastIndexOf('{', tmpScan - 1);
    }
    if (objOpen === -1) { alert('Inicio do objeto da variante nao encontrado.'); return false; }

    var i          = objOpen;
    var depth      = 0;
    var inTemplate = false;
    var len        = content.length;
    var objEnd     = -1;

    while (i < len) {
      var ch = content[i];
      if (ch === '`') {
        var backslashes = 0; var j = i - 1;
        while (j >= 0 && content[j] === '\\') { backslashes++; j--; }
        if (backslashes % 2 === 0) inTemplate = !inTemplate;
        i++; continue;
      }
      if (inTemplate) { i++; continue; }
      if (ch === '{') { depth++; i++; continue; }
      if (ch === '}') {
        depth--;
        if (depth === 0) {
          objEnd = i + 1;
          if (content[objEnd] === ',') objEnd++;
          if (content[objEnd] === '\n') objEnd++;
          break;
        }
        i++; continue;
      }
      i++;
    }

    if (objEnd === -1) { alert('Fim do objeto da variante nao encontrado.'); return false; }

    await backupFile(_projectDir, entry.name, content);

    var newContent =
      content.slice(0, objOpen) +
      objectCode + ',\n' +
      content.slice(objEnd);

    var writable = await entry.createWritable({ keepExistingData: false });
    await writable.write(new Blob([newContent], { type: "text/plain" }));
    await writable.close();
    return entry.name;

  } catch (e) {
    console.error('[senko-fsa] Erro ao salvar variante:', e);
    alert('Erro ao salvar variante: ' + e.message);
    return false;
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   UI: Patch saveToFileBtn + botao salvar variante
═══════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {

  var SAVE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>';

  /* Patch: modal de edição de layout */
  var saveBtn = document.getElementById('saveToFileBtn');
  if (saveBtn) {
    var newSaveBtn = saveBtn.cloneNode(true);
    saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);

    newSaveBtn.addEventListener('click', async function () {
      var code = document.getElementById('editGeneratedCode').textContent;
      var id   = document.getElementById('editId').value.trim().toLowerCase();
      if (!id || code.indexOf('//') === 0) { alert('Preencha os campos primeiro.'); return; }

      this.textContent = 'Salvando...';
      var self   = this;
      var result = await saveLayoutToFile(id, code);

      if (result) {
        var layouts = SenkoLib.getAll();
        for (var i = 0; i < layouts.length; i++) {
          if (layouts[i].id === id) {
            layouts[i].name = document.getElementById('editName').value.trim();
            layouts[i].tags = document.getElementById('editTags').value
              .split(',').map(function (t) { return t.trim(); }).filter(Boolean);
            layouts[i].html = document.getElementById('editHtml').value;
            layouts[i].css  = document.getElementById('editCss').value;
            break;
          }
        }
        self.textContent = 'Salvo em ' + result;
        setTimeout(function () {
          closeEditModal();
          renderGrid();
          var btn = document.getElementById('saveToFileBtn');
          if (btn) btn.innerHTML = SAVE_ICON + ' Salvar no arquivo';
        }, 1200);
      } else {
        self.innerHTML = SAVE_ICON + ' Salvar no arquivo';
      }
    });
  }

  /* Botao salvar no modal de nova variante */
  var newVarCopyBtn = document.getElementById('newVarCopyBtn');
  if (newVarCopyBtn && !document.getElementById('saveVariantToFileBtn')) {
    var saveVarBtn = document.createElement('button');
    saveVarBtn.className = 'btn-save-file';
    saveVarBtn.id = 'saveVariantToFileBtn';
    saveVarBtn.innerHTML = SAVE_ICON + ' Salvar no arquivo';
    newVarCopyBtn.parentNode.insertBefore(saveVarBtn, newVarCopyBtn.nextSibling);

    saveVarBtn.addEventListener('click', async function () {
      var nome = document.getElementById('newVarName').value.trim().toLowerCase();
      if (nome.length < 3)          { alert('Preencha o nome da variante primeiro.'); return; }
      if (!state.currentForVariant) { alert('Nenhum layout pai selecionado.'); return; }

      var html     = document.getElementById('newVarHtml').value;
      var css      = document.getElementById('newVarCss').value;
      var safeHtml = html.replace(/`/g, '\\`');
      var safeCss  = css.replace(/`/g, '\\`');
      var parentId = state.currentForVariant.id;

      var objectCode =
        "  { nome: '" + nome + "',\n" +
        '    html: `' + safeHtml + '`,\n' +
        '    css: `'  + safeCss  + '` }';

      this.textContent = 'Salvando...';
      var self   = this;
      var result = await saveVariantToFile(parentId, nome, objectCode);

      if (result) {
        var variants    = SenkoLib.getVariants(parentId);
        var existingIdx = -1;
        for (var i = 0; i < variants.length; i++) {
          if ((variants[i].nome || variants[i].name) === nome) { existingIdx = i; break; }
        }
        if (existingIdx !== -1) {
          variants[existingIdx].html = html;
          variants[existingIdx].css  = css;
        } else {
          SenkoLib.registerVariant(parentId, [{ nome: nome, html: html, css: css }]);
        }

        self.textContent = 'Salvo em ' + result;
        setTimeout(function () {
          closeNewVariantModal();
          if (state.currentForVariant) {
            var updated = SenkoLib.getVariants(state.currentForVariant.id);
            renderVariantBlocks(updated);
            var countEl = document.getElementById('variantsCount');
            if (countEl) countEl.textContent = updated.length + (updated.length === 1 ? ' variacao' : ' variacoes');
          }
          renderGrid();
          var btn = document.getElementById('saveVariantToFileBtn');
          if (btn) btn.innerHTML = SAVE_ICON + ' Salvar no arquivo';
        }, 1200);
      } else {
        self.innerHTML = SAVE_ICON + ' Salvar no arquivo';
      }
    });
  }

});

/* ═══════════════════════════════════════════════════════════════════════
   NOVO LAYOUT: Salvar automaticamente em arquivo selecionado
   ───────────────────────────────────────────────────────────────────────
   Injeta no modal de criação:
     - Um <select> com os arquivos disponíveis em /layouts/
     - Um botão "Salvar automático" ao lado do "Copiar objeto"
   O select é populado quando a pasta do projeto está selecionada.
   Ao clicar o botão, o objeto é inserido no final do array do arquivo
   escolhido, antes do ]);  que fecha o SenkoLib.register([...]).
═══════════════════════════════════════════════════════════════════════ */

/* Popula o dropdown com os arquivos de /layouts/ */
async function populateLayoutFilesDropdown() {
  var select = document.getElementById('addTargetFile');
  if (!select) return;

  select.innerHTML = '<option value="">-- selecione o arquivo --</option>';

  if (typeof _projectDir === 'undefined' || !_projectDir) {
    select.disabled = true;
    return;
  }

  try {
    var layoutsDir = await _projectDir.getDirectoryHandle('layouts', { create: false });
    var files = [];
    for await (var entry of layoutsDir.values()) {
      if (entry.kind === 'file' && entry.name.endsWith('.js')) {
        files.push(entry.name);
      }
    }
    files.sort();
    files.forEach(function (name) {
      var opt = document.createElement('option');
      opt.value = name;
      opt.textContent = 'layouts/' + name;
      select.appendChild(opt);
    });
    select.disabled = false;
  } catch (e) {
    console.warn('[senko-fsa] Nao foi possivel listar /layouts/:', e.message);
    select.disabled = true;
  }
}

/* Salva o novo layout no arquivo escolhido */
async function saveNewLayoutToFile(fileName, objectCode, layoutId) {
  if (!_projectDir) {
    alert('Selecione a pasta do projeto primeiro.');
    return false;
  }
  try {
    var layoutsDir = await _projectDir.getDirectoryHandle('layouts', { create: false });
    var entry      = await layoutsDir.getFileHandle(fileName, { create: false });
    var file       = await entry.getFile();
    var content    = await file.text();

    /* Verifica se o ID já existe no arquivo */
    var marker = '/*@@@@Senko - ' + layoutId.toLowerCase() + ' */';
    if (content.indexOf(marker) !== -1) {
      alert('O ID "' + layoutId + '" ja existe em ' + fileName + '.\nUse o botao de editar no card para modificar layouts existentes.');
      return false;
    }

    /* Encontra o ]); que fecha o SenkoLib.register */
    var closePos = content.lastIndexOf(']);');
    if (closePos === -1) {
      alert('Nao foi possivel encontrar o fechamento do array em ' + fileName + '.\nVerifique se o arquivo segue o padrao SenkoLib.register([...]);');
      return false;
    }

    /* Backup antes de escrever */
    await backupFile(_projectDir, fileName, content);

    /* Insere o novo objeto antes do ]); */
    var newContent =
      content.slice(0, closePos) +
      '\n' + objectCode + '\n\n' +
      content.slice(closePos);

    var writable = await entry.createWritable({ keepExistingData: false });
    await writable.truncate(0);
    await writable.write({ type: 'write', position: 0, data: newContent });
    await writable.close();
    return fileName;

  } catch (e) {
    console.error('[senko-fsa] Erro ao salvar novo layout:', e);
    alert('Erro ao salvar: ' + e.message);
    return false;
  }
}

/* Injeta o select e o botão no modal de criação */
document.addEventListener('DOMContentLoaded', function () {

  var SAVE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>';

  var copyBtn = document.getElementById('copyGeneratedBtn');
  if (!copyBtn) return;

  /* ── Select de arquivo ── */
  var select = document.createElement('select');
  select.id = 'addTargetFile';
  select.disabled = true;
  select.innerHTML = '<option value="">-- selecione o arquivo --</option>';
  select.style.cssText = [
    'font-family: var(--font-body)',
    'font-size: .85rem',
    'font-weight: 700',
    'padding: .35rem .7rem',
    'border: 1.5px solid var(--border)',
    'border-radius: var(--radius)',
    'background: var(--bg)',
    'color: var(--text2)',
    'cursor: pointer',
    'height: 34px',
    'width: 200px',
  ].join(';');

  /* ── Botão salvar automático ── */
  var saveAutoBtn = document.createElement('button');
  saveAutoBtn.id = 'saveNewLayoutBtn';
  saveAutoBtn.className = 'btn-save-file';
  saveAutoBtn.innerHTML = SAVE_ICON + ' Salvar automático';

  /* Agrupa select + botão num wrapper inline-flex e insere após o copyBtn */
  var autoGroup = document.createElement('div');
  autoGroup.style.cssText = 'display:inline-flex;align-items:center;gap:.4rem;';
  autoGroup.appendChild(select);
  autoGroup.appendChild(saveAutoBtn);
  copyBtn.parentNode.insertBefore(autoGroup, copyBtn.nextSibling);

  /* Popula o dropdown quando a pasta já estiver selecionada */
  populateLayoutFilesDropdown();

  /* Repopula sempre que o botão "Adicionar" for clicado */
  var openAddBtn = document.getElementById('openAddModal');
  if (openAddBtn) {
    openAddBtn.addEventListener('click', function () {
      /* Pequeno delay para o modal terminar de abrir antes de popular */
      setTimeout(populateLayoutFilesDropdown, 50);
    });
  }

  /* Repopula quando a pasta for selecionada (botão FSA) */
  var selectFolderBtn = document.getElementById('selectFolderBtn');
  if (selectFolderBtn) {
    selectFolderBtn.addEventListener('click', function () {
      setTimeout(populateLayoutFilesDropdown, 500);
    });
  }

  /* Clique no botão salvar automático */
  saveAutoBtn.addEventListener('click', async function () {
    var code = document.getElementById('generatedCode').textContent;
    var id   = document.getElementById('addId').value.trim().toLowerCase();
    var fileName = document.getElementById('addTargetFile').value;

    if (!id || code.indexOf('//') === 0) {
      alert('Preencha os campos primeiro.');
      return;
    }
    if (!fileName) {
      alert('Selecione o arquivo de destino no dropdown.');
      return;
    }
    if (!_projectDir) {
      alert('Selecione a pasta do projeto primeiro.');
      return;
    }

    this.textContent = 'Salvando...';
    var self   = this;
    var result = await saveNewLayoutToFile(fileName, code, id);

    if (result) {
      /* Registra em memória para aparecer imediatamente no grid */
      var html = document.getElementById('addHtml').value;
      var css  = document.getElementById('addCss').value;
      var name = document.getElementById('addName').value.trim();
      var tags = document.getElementById('addTags').value
        .split(',').map(function (t) { return t.trim(); }).filter(Boolean);

      SenkoLib.register([{ id: id, name: name, tags: tags, html: html, css: css }]);

      self.textContent = 'Salvo em ' + result;
      setTimeout(function () {
        closeAddModal();
        renderGrid();
        self.innerHTML = SAVE_ICON + ' Salvar automatico';
      }, 1200);
    } else {
      self.innerHTML = SAVE_ICON + ' Salvar automatico';
    }
  });

});
