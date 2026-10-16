(function () {
  var dialog;
  var form;
  var readPanel;
  var status;
  var editButton;
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
    document.getElementById('libraryAnalysisSave').disabled = true;
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
      document.getElementById('libraryAnalysisSave').disabled = false;
    });
  }

  function init() {
    dialog = document.getElementById('libraryAnalysisDialog');
    form = document.getElementById('libraryAnalysisForm');
    readPanel = document.getElementById('libraryAnalysisRead');
    status = document.getElementById('libraryAnalysisStatus');
    editButton = document.getElementById('libraryAnalysisEdit');
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
