(function () {
  var dialog;
  var form;
  var readPanel;
  var status;
  var editButton;
  var manualPanel;
  var codePanel;
  var codeInput;
  var manualModeButton;
  var codeModeButton;
  var saveButton;
  var layout = null;
  var analysis = null;
  var trigger = null;
  var unsubscribe = null;
  var editing = false;
  var dirty = false;
  var saving = false;
  var baseVersion = 0;

  var fields = [
    ['descriptiveName', 'Nome descritivo'],
    ['mainStructure', 'Estrutura principal'],
    ['whatIsIt', 'O que é?'],
    ['purpose', 'Para que serve?'],
    ['rationale', 'Por que é assim?'],
    ['whenToUse', 'Quando utilizar?'],
    ['limitations', 'Limitações']
  ];
  var codeFields = {
    nome_descritivo: ['descriptiveName', 160],
    estrutura_principal: ['mainStructure', 500],
    o_que_e: ['whatIsIt', 10000],
    para_que_serve: ['purpose', 10000],
    por_que_e_assim: ['rationale', 10000],
    quando_utilizar: ['whenToUse', 10000],
    limitacoes: ['limitations', 10000]
  };

  function canEdit() {
    var firebase = window.SenkoFirebase;
    var member = firebase && firebase.getState && firebase.getState().member;
    return Boolean(window.SenkoDataMode && window.SenkoDataMode.isFirebase() &&
      member && ['owner', 'admin'].indexOf(member.role) !== -1);
  }

  function setStatus(message, error) {
    status.textContent = message || '';
    status.classList.toggle('is-error', Boolean(error));
  }

  function setMode(mode, focus) {
    var isManual = mode === 'manual';
    manualPanel.hidden = !isManual;
    codePanel.hidden = isManual;
    manualModeButton.setAttribute('aria-pressed', String(isManual));
    codeModeButton.setAttribute('aria-pressed', String(!isManual));
    saveButton.hidden = !isManual;
    if (focus) {
      (isManual ? form.elements.namedItem('descriptiveName') : codeInput).focus();
    }
  }

  function parseCode() {
    var source = codeInput.value.trim();
    if (!source) throw new Error('Cole um JSON antes de preencher os campos.');
    var fenced = source.match(/^```(?:json)?\s*\n([\s\S]*?)\n```$/i);
    if (fenced) source = fenced[1].trim();
    var data;
    try { data = JSON.parse(source); }
    catch (error) { throw new Error('O código precisa ser um JSON válido. Confira vírgulas, aspas e chaves.'); }
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('O JSON precisa conter um objeto com os campos da análise.');
    }
    var keys = Object.keys(data);
    if (!keys.length) throw new Error('O JSON não contém campos para preencher.');
    var updates = {};
    keys.forEach(function (key) {
      if (key === 'tags') {
        if (!Array.isArray(data.tags) || data.tags.some(function (tag) {
          return typeof tag !== 'string' || !tag.trim() || tag.indexOf(',') !== -1;
        })) {
          throw new Error('"tags" deve ser uma lista de palavras ou frases sem vírgulas internas.');
        }
        var tags = parseTags(data.tags.join(', '));
        var tagText = tags.join(', ');
        if (tagText.length > 3239) throw new Error('A lista de tags é longa demais.');
        updates.tags = tagText;
        return;
      }
      if (!Object.prototype.hasOwnProperty.call(codeFields, key)) {
        throw new Error('Campo não reconhecido no JSON: ' + key + '.');
      }
      var mapping = codeFields[key];
      if (typeof data[key] !== 'string') {
        throw new Error('"' + key + '" precisa conter um texto.');
      }
      var value = data[key].trim();
      if (value.length > mapping[1]) {
        throw new Error('"' + key + '" excede o limite de ' + mapping[1] + ' caracteres.');
      }
      if (key === 'nome_descritivo' && value.length < 2) {
        throw new Error('"nome_descritivo" precisa ter pelo menos 2 caracteres.');
      }
      updates[mapping[0]] = value;
    });
    return updates;
  }

  function fillFromCode() {
    var updates;
    try { updates = parseCode(); }
    catch (error) { setStatus(error.message, true); codeInput.focus(); return; }
    Object.keys(updates).forEach(function (name) {
      form.elements.namedItem(name).value = updates[name];
    });
    dirty = true;
    setMode('manual', true);
    setStatus('Campos preenchidos. Revise a análise e clique em Salvar alterações para gravar no Firebase.');
  }

  function addReadField(label, value) {
    var section = document.createElement('section');
    section.className = 'library-analysis-read-field';
    var heading = document.createElement('h3');
    heading.textContent = label;
    var content = document.createElement('p');
    content.textContent = value || 'Não informado.';
    content.classList.toggle('is-empty', !value);
    section.append(heading, content);
    readPanel.appendChild(section);
  }

  function renderRead() {
    readPanel.replaceChildren();
    if (!analysis) {
      addReadField('Análise', 'Nenhuma análise cadastrada para este layout.');
    } else {
      fields.forEach(function (field) {
        addReadField(field[1], analysis[field[0]] || '');
      });
      var tagSection = document.createElement('section');
      tagSection.className = 'library-analysis-read-field';
      var heading = document.createElement('h3');
      heading.textContent = 'Tags';
      var tags = document.createElement('div');
      tags.className = 'library-analysis-tags';
      (analysis.tags || []).forEach(function (value) {
        var tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = value;
        tags.appendChild(tag);
      });
      if (!tags.childElementCount) {
        var empty = document.createElement('p');
        empty.className = 'is-empty';
        empty.textContent = 'Nenhuma tag cadastrada.';
        tags.appendChild(empty);
      }
      tagSection.append(heading, tags);
      readPanel.appendChild(tagSection);
    }
    editButton.hidden = !canEdit();
    document.getElementById('libraryAnalysisFooter').hidden = editButton.hidden;
  }

  function showRead() {
    editing = false;
    dirty = false;
    codeInput.value = '';
    setMode('manual');
    form.hidden = true;
    readPanel.hidden = false;
    renderRead();
  }

  function showEdit() {
    if (!canEdit()) return;
    baseVersion = analysis ? Number(analysis.version || 0) : 0;
    fields.forEach(function (field) {
      form.elements.namedItem(field[0]).value = analysis ? analysis[field[0]] || '' : '';
    });
    form.elements.namedItem('tags').value = analysis ? (analysis.tags || []).join(', ') : '';
    codeInput.value = '';
    setMode('manual');
    dirty = false;
    editing = true;
    readPanel.hidden = true;
    form.hidden = false;
    editButton.hidden = true;
    document.getElementById('libraryAnalysisFooter').hidden = true;
    setStatus('');
    form.elements.namedItem('descriptiveName').focus();
  }

  function stopWatching() {
    if (typeof unsubscribe === 'function') unsubscribe();
    unsubscribe = null;
  }

  function connect() {
    stopWatching();
    if (!layout || !dialog.open) return;
    var firebase = window.SenkoFirebase;
    if (!firebase || !firebase.isEnabled || !firebase.isEnabled()) {
      if (!editing) showRead();
      else setStatus('Firebase indisponível. O rascunho permanece aqui, mas não pode ser salvo.', true);
      return;
    }
    unsubscribe = window.SenkoBibliotecaFirebase.watchAnalysis(layout.id, function (remote) {
      analysis = remote || window.SenkoBibliotecaStatic.getAnalysis(layout.id);
      if (editing) {
        if (!saving && Number(remote && remote.version || 0) !== baseVersion) {
          setStatus('Outra pessoa alterou esta análise. Seu rascunho foi preservado; compare antes de salvar.', true);
        }
      } else {
        showRead();
      }
    }, function (error) {
      console.error('[Biblioteca] Falha ao ler análise:', error);
      analysis = window.SenkoBibliotecaStatic.getAnalysis(layout.id);
      if (!editing) showRead();
      setStatus('Não foi possível ler a análise ao vivo. Exibindo o último backup disponível.', true);
    });
  }

  function close() {
    if (saving) return;
    if (editing && dirty && !window.confirm('Descartar as alterações não salvas da análise?')) return;
    stopWatching();
    dialog.close();
    layout = null;
    analysis = null;
    editing = false;
    dirty = false;
    if (trigger && trigger.isConnected) trigger.focus();
    trigger = null;
  }

  function parseTags(value) {
    var seen = new Set();
    var tags = String(value || '').split(',').map(function (tag) { return tag.trim(); }).filter(Boolean);
    if (tags.length > 40 || tags.some(function (tag) { return tag.length > 80; })) {
      throw new Error('Use até 40 tags de no máximo 80 caracteres cada.');
    }
    return tags.filter(function (tag) {
      var key = tag.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function save(event) {
    event.preventDefault();
    if (!layout || saving || !canEdit()) return;
    var values = { layoutId: layout.id, expectedVersion: baseVersion };
    fields.forEach(function (field) {
      values[field[0]] = form.elements.namedItem(field[0]).value.trim();
    });
    if (values.descriptiveName.length < 2) {
      setStatus('Informe um nome descritivo com pelo menos 2 caracteres.', true);
      return;
    }
    try { values.tags = parseTags(form.elements.namedItem('tags').value); }
    catch (error) { setStatus(error.message, true); return; }
    saving = true;
    saveButton.disabled = true;
    window.SenkoBibliotecaFirebase.saveAnalysis(values).then(function (saved) {
      analysis = saved;
      showRead();
      setStatus('Análise salva no Firebase.');
    }).catch(function (error) {
      var code = String(error && error.code || '');
      if (code.indexOf('aborted') !== -1) {
        setStatus('Outra pessoa salvou esta análise antes de você. Seu rascunho foi preservado.', true);
      } else if (code.indexOf('permission-denied') !== -1) {
        setStatus('O Firestore recusou o salvamento. Confira seu acesso admin/owner e se as regras da análise foram publicadas no Firebase. Seu rascunho foi preservado.', true);
      } else {
        setStatus(error && error.message || 'Não foi possível salvar a análise.', true);
      }
    }).finally(function () {
      saving = false;
      saveButton.disabled = false;
    });
  }

  function init() {
    dialog = document.getElementById('libraryAnalysisDialog');
    form = document.getElementById('libraryAnalysisForm');
    readPanel = document.getElementById('libraryAnalysisRead');
    status = document.getElementById('libraryAnalysisStatus');
    editButton = document.getElementById('libraryAnalysisEdit');
    manualPanel = document.getElementById('libraryAnalysisManualPanel');
    codePanel = document.getElementById('libraryAnalysisCodePanel');
    codeInput = document.getElementById('libraryAnalysisCodeInput');
    manualModeButton = document.getElementById('libraryAnalysisManualMode');
    codeModeButton = document.getElementById('libraryAnalysisCodeMode');
    saveButton = document.getElementById('libraryAnalysisSave');
    manualModeButton.addEventListener('click', function () { setMode('manual', true); });
    codeModeButton.addEventListener('click', function () { setMode('code', true); });
    document.getElementById('libraryAnalysisFillCode').addEventListener('click', fillFromCode);
    document.getElementById('libraryAnalysisClose').addEventListener('click', close);
    document.getElementById('libraryAnalysisCancel').addEventListener('click', function () {
      if (saving) return;
      if (dirty && !window.confirm('Descartar as alterações não salvas da análise?')) return;
      showRead();
      setStatus('');
    });
    editButton.addEventListener('click', showEdit);
    form.addEventListener('input', function () { dirty = true; });
    form.addEventListener('submit', save);
    dialog.addEventListener('cancel', function (event) { event.preventDefault(); close(); });
    dialog.addEventListener('click', function (event) { if (event.target === dialog) close(); });
    window.SenkoDataMode.onChange(function () {
      if (dialog.open) connect();
    });
  }

  window.SenkoBibliotecaAnalysis = {
    init: init,
    open: function (selectedLayout, button) {
      if (!dialog || !selectedLayout || dialog.open) return;
      layout = selectedLayout;
      trigger = button;
      analysis = window.SenkoBibliotecaStatic.getAnalysis(layout.id);
      document.getElementById('libraryAnalysisTitle').textContent = layout.name;
      document.getElementById('libraryAnalysisPreview').srcdoc = buildSrcDoc(layout.html || '', layout.css || '');
      setStatus('');
      showRead();
      dialog.showModal();
      connect();
    }
  };
})();
