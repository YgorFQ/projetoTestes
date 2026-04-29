// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   masqueico-resizer.js — Aba "Masqueico" integrada ao SenkoLib

   RESPONSABILIDADE:
     - Injeta o botão "Masqueico" na barra de abas existente (#colTabBar)
     - Monkey-patcha colSwitchTab() para suportar a terceira aba
     - Cria o dashboard do Image Resizer (#masqueicoPanel)
     - Gerencia toda a lógica de redimensionamento e geração do .zip

   DEPENDÊNCIAS (devem estar carregadas antes):
     col-script.js  → cria #colTabBar e define colSwitchTab()
     col-styles.css → estilo das abas (.col-tab-btn etc.)
     jszip          → carregado dinamicamente na primeira conversão

   ORDEM DE CARREGAMENTO:
     Deve ser o ÚLTIMO script carregado (após senko-github-col.js).
═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────
     ESTADO INTERNO
  ───────────────────────────────────────────────────────────────── */
  var msqFiles      = [];
  var msqFormat     = 'webp';
  var msqBreakpoints = [
    { width: 393,  label: 'm' },
    { width: 702,  label: 't' },
    { width: 1200, label: 'd' },
  ];

  /* Referências DOM — preenchidas em _cacheRefs() */
  var _dropzone, _fileInput, _fileList, _log;
  var _progressWrap, _progressFill, _progressLabel;
  var _bpList, _previewRow, _convertBtn;
  var _qualitySlider, _qualityVal;


  /* ─────────────────────────────────────────────────────────────────
     CARREGAMENTO DINÂMICO DO JSZIP
  ───────────────────────────────────────────────────────────────── */
  function _loadJSZip(cb) {
    if (typeof JSZip !== 'undefined') { cb(); return; }
    var s    = document.createElement('script');
    s.src    = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    s.onload = cb;
    s.onerror = function () {
      _addLog('<span class="err">✘ Falha ao carregar JSZip. Verifique sua conexão.</span>');
    };
    document.head.appendChild(s);
  }


  /* ═══════════════════════════════════════════════════════════════
     INJEÇÃO NA BARRA DE ABAS
  ═══════════════════════════════════════════════════════════════ */

  function msqInjectTab() {
    var tabBar = document.getElementById('colTabBar');
    if (!tabBar) {
      /* col-script.js não carregado — não faz nada */
      console.warn('[Masqueico] #colTabBar não encontrado. Verifique se col-script.js carregou.');
      return;
    }

    var btn = document.createElement('button');
    btn.id        = 'colTabMasqueico';
    btn.className = 'col-tab-btn';
    btn.textContent = 'Masqueico';
    btn.addEventListener('click', function () {
      if (typeof colSwitchTab === 'function') colSwitchTab('masqueico');
    });

    tabBar.appendChild(btn);
  }


  /* ═══════════════════════════════════════════════════════════════
     MONKEY-PATCH EM colSwitchTab
     Estende a função original para lidar com a aba 'masqueico'.
     A função original permanece intacta para 'biblioteca' e 'colecoes'.
  ═══════════════════════════════════════════════════════════════ */

  function msqPatchTabSwitch() {
    if (typeof window.colSwitchTab !== 'function') {
      console.warn('[Masqueico] colSwitchTab não definida. Monkey-patch ignorado.');
      return;
    }

    var _orig = window.colSwitchTab;

    window.colSwitchTab = function (tab) {
      var msqPanel = document.getElementById('masqueicoPanel');
      var btnMsq   = document.getElementById('colTabMasqueico');

      if (tab === 'masqueico') {
        /* Esconde as duas dashboards existentes */
        var dashboard    = document.getElementById('dashboard');
        var colDashboard = document.getElementById('colDashboard');
        if (dashboard)    dashboard.style.display    = 'none';
        if (colDashboard) colDashboard.style.display = 'none';

        /* Desativa botões das outras abas */
        var btnLib = document.getElementById('colTabBiblioteca');
        var btnCol = document.getElementById('colTabColecoes');
        if (btnLib) btnLib.classList.remove('active');
        if (btnCol) btnCol.classList.remove('active');

        /* Ativa aba Masqueico */
        if (btnMsq) btnMsq.classList.add('active');
        if (msqPanel) msqPanel.style.display = '';

        try { localStorage.setItem('senkolib_active_tab', 'masqueico'); } catch (e) {}

      } else {
        /* Para qualquer outra aba: esconde Masqueico e delega ao original */
        if (msqPanel) msqPanel.style.display = 'none';
        if (btnMsq)   btnMsq.classList.remove('active');
        _orig(tab);
      }
    };
  }


  /* ═══════════════════════════════════════════════════════════════
     CRIAÇÃO DO PAINEL (dashboard dinâmico)
  ═══════════════════════════════════════════════════════════════ */

  function msqCreatePanel() {
    var panel = document.createElement('div');
    panel.id         = 'masqueicoPanel';
    panel.className  = 'msq-dashboard';
    panel.style.display = 'none';

    panel.innerHTML = [
      /* ── Cabeçalho ── */
      '<div class="msq-header">',
        '<h1 class="msq-title">Image <span>Resizer</span></h1>',
        '<p class="msq-subtitle">',
          '// gera variantes responsivas em lote · sem Photoshop · sem TinyPNG',
        '</p>',
      '</div>',

      /* ── Layout 2 colunas ── */
      '<div class="msq-layout">',

        /* Coluna principal */
        '<div class="msq-main-col">',

          /* Drop zone */
          '<div class="msq-dropzone" id="msqDropzone">',
            '<input type="file" id="msqFileInput" multiple ',
              'accept="image/jpeg,image/png,image/webp" />',
            '<span class="msq-drop-icon">🖼</span>',
            '<p class="msq-drop-label">',
              '<strong>Arraste as imagens aqui</strong><br>',
              'ou clique para selecionar',
            '</p>',
            '<p class="msq-drop-formats">JPG · PNG · WebP</p>',
          '</div>',

          /* Lista de arquivos */
          '<div class="msq-file-list" id="msqFileList"></div>',

          /* Log */
          '<div class="msq-log" id="msqLog"></div>',

        '</div>',

        /* Sidebar */
        '<div class="msq-sidebar">',

          /* Card: Breakpoints */
          '<div class="msq-card">',
            '<div class="msq-card-title">Breakpoints</div>',
            '<div class="msq-bp-legend">',
              '<span class="col-px">largura</span>',
              '<span class="col-sfx">sufixo</span>',
            '</div>',
            '<div class="msq-bp-list" id="msqBpList"></div>',
            '<button class="msq-bp-add" id="msqAddBp">+ adicionar breakpoint</button>',
            '<div class="msq-preview-row" id="msqPreviewRow"></div>',
          '</div>',

          /* Card: Formato */
          '<div class="msq-card">',
            '<div class="msq-card-title">Formato de saída</div>',
            '<div class="msq-format-options" id="msqFormatOptions">',
              '<button class="msq-fmt-btn active" data-msqfmt="webp">WebP</button>',
              '<button class="msq-fmt-btn" data-msqfmt="jpg">JPG</button>',
              '<button class="msq-fmt-btn" data-msqfmt="both">Ambos</button>',
            '</div>',
          '</div>',

          /* Card: Qualidade */
          '<div class="msq-card">',
            '<div class="msq-card-title">Qualidade</div>',
            '<div class="msq-quality-row">',
              '<input type="range" id="msqQuality" min="50" max="100" value="80" />',
              '<span class="msq-quality-val" id="msqQualityVal">80</span>',
            '</div>',
          '</div>',

          /* Card: Converter */
          '<div class="msq-card">',
            '<div class="msq-progress-wrap" id="msqProgressWrap">',
              '<div class="msq-progress-bg">',
                '<div class="msq-progress-fill" id="msqProgressFill"></div>',
              '</div>',
              '<div class="msq-progress-label" id="msqProgressLabel">Processando...</div>',
            '</div>',
            '<button class="msq-btn-convert" id="msqConvertBtn" disabled>',
              'Gerar e baixar .zip',
            '</button>',
          '</div>',

        '</div>',
      '</div>',
    ].join('');

    /* Insere depois de #colDashboard (ou #dashboard se não existir) */
    var ref = document.getElementById('colDashboard') || document.getElementById('dashboard');
    if (ref && ref.parentNode) {
      ref.parentNode.insertBefore(panel, ref.nextSibling);
    } else {
      document.body.appendChild(panel);
    }

    _cacheRefs();
    _bindEvents();
    _renderBps();
  }

  /* ─────────────────────────────────────────────────────────────────
     Cache de referências DOM
  ───────────────────────────────────────────────────────────────── */
  function _cacheRefs() {
    _dropzone      = document.getElementById('msqDropzone');
    _fileInput     = document.getElementById('msqFileInput');
    _fileList      = document.getElementById('msqFileList');
    _log           = document.getElementById('msqLog');
    _progressWrap  = document.getElementById('msqProgressWrap');
    _progressFill  = document.getElementById('msqProgressFill');
    _progressLabel = document.getElementById('msqProgressLabel');
    _bpList        = document.getElementById('msqBpList');
    _previewRow    = document.getElementById('msqPreviewRow');
    _convertBtn    = document.getElementById('msqConvertBtn');
    _qualitySlider = document.getElementById('msqQuality');
    _qualityVal    = document.getElementById('msqQualityVal');
  }


  /* ═══════════════════════════════════════════════════════════════
     EVENTOS
  ═══════════════════════════════════════════════════════════════ */

  function _bindEvents() {

    /* Drop zone */
    _dropzone.addEventListener('dragover', function (e) {
      e.preventDefault();
      _dropzone.classList.add('over');
    });

    _dropzone.addEventListener('dragleave', function () {
      _dropzone.classList.remove('over');
    });

    _dropzone.addEventListener('drop', function (e) {
      e.preventDefault();
      _dropzone.classList.remove('over');
      _addFiles([].slice.call(e.dataTransfer.files));
    });

    _fileInput.addEventListener('change', function () {
      _addFiles([].slice.call(_fileInput.files));
      /* Limpa o input para permitir re-seleção do mesmo arquivo */
      _fileInput.value = '';
    });

    /* Botões de formato */
    var fmtBtns = document.querySelectorAll('#msqFormatOptions .msq-fmt-btn');
    fmtBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        fmtBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        msqFormat = btn.dataset.msqfmt;
        _renderPreview();
      });
    });

    /* Qualidade */
    _qualitySlider.addEventListener('input', function () {
      _qualityVal.textContent = _qualitySlider.value;
    });

    /* Adicionar breakpoint */
    document.getElementById('msqAddBp').addEventListener('click', function () {
      msqBreakpoints.push({ width: 1024, label: 'x' });
      _renderBps();
    });

    /* Botão converter */
    _convertBtn.addEventListener('click', function () {
      _loadJSZip(_doConvert);
    });
  }


  /* ═══════════════════════════════════════════════════════════════
     GERENCIAMENTO DE ARQUIVOS
  ═══════════════════════════════════════════════════════════════ */

  function _addFiles(newFiles) {
    newFiles.forEach(function (f) {
      var exists = msqFiles.some(function (x) { return x.name === f.name; });
      if (!exists) msqFiles.push(f);
    });
    _renderFileList();
    _updateConvertBtn();
  }

  function _removeFile(index) {
    msqFiles.splice(index, 1);
    _renderFileList();
    _updateConvertBtn();
  }

  function _renderFileList() {
    if (!_fileList) return;
    _fileList.innerHTML = '';
    msqFiles.forEach(function (f, i) {
      var item = document.createElement('div');
      item.className = 'msq-file-item';

      var nameSpan = document.createElement('span');
      nameSpan.className   = 'msq-file-name';
      nameSpan.textContent = f.name;

      var sizeSpan = document.createElement('span');
      sizeSpan.className   = 'msq-file-size';
      sizeSpan.textContent = (f.size / 1024).toFixed(0) + 'kb';

      var removeBtn = document.createElement('button');
      removeBtn.className = 'msq-file-remove';
      removeBtn.title     = 'Remover';
      removeBtn.textContent = '✕';
      /* IIFE para capturar o índice correto no closure */
      (function (idx) {
        removeBtn.addEventListener('click', function () { _removeFile(idx); });
      })(i);

      item.appendChild(nameSpan);
      item.appendChild(sizeSpan);
      item.appendChild(removeBtn);
      _fileList.appendChild(item);
    });
  }

  function _updateConvertBtn() {
    if (_convertBtn) _convertBtn.disabled = msqFiles.length === 0;
  }


  /* ═══════════════════════════════════════════════════════════════
     BREAKPOINTS
  ═══════════════════════════════════════════════════════════════ */

  function _renderBps() {
    if (!_bpList) return;
    _bpList.innerHTML = '';

    msqBreakpoints.forEach(function (bp, i) {
      var row = document.createElement('div');
      row.className = 'msq-bp-row';

      /* Input de largura */
      var numInput  = document.createElement('input');
      numInput.type = 'number';
      numInput.value = String(bp.width);
      numInput.min   = '100';
      numInput.max   = '3000';
      (function (idx) {
        numInput.addEventListener('change', function () {
          msqBreakpoints[idx].width = parseInt(this.value) || msqBreakpoints[idx].width;
          _renderPreview();
        });
      })(i);

      /* Separador */
      var sep = document.createElement('span');
      sep.className   = 'msq-bp-sep';
      sep.textContent = '→';

      /* Input de sufixo */
      var txtInput      = document.createElement('input');
      txtInput.type     = 'text';
      txtInput.value    = bp.label;
      txtInput.maxLength = 4;
      txtInput.placeholder = 'ex: m';
      (function (idx) {
        txtInput.addEventListener('input', function () {
          msqBreakpoints[idx].label = this.value.trim();
          _renderPreview();
        });
      })(i);

      row.appendChild(numInput);
      row.appendChild(sep);
      row.appendChild(txtInput);

      /* Botão remover (só se houver mais de 1 BP) */
      if (msqBreakpoints.length > 1) {
        var delBtn = document.createElement('button');
        delBtn.className   = 'msq-bp-del';
        delBtn.title       = 'Remover breakpoint';
        delBtn.textContent = '✕';
        (function (idx) {
          delBtn.addEventListener('click', function () {
            msqBreakpoints.splice(idx, 1);
            _renderBps();
          });
        })(i);
        row.appendChild(delBtn);
      }

      _bpList.appendChild(row);
    });

    _renderPreview();
  }

  function _renderPreview() {
    if (!_previewRow) return;
    var ext = msqFormat === 'jpg' ? 'jpg' : 'webp';
    var lines = msqBreakpoints
      .filter(function (bp) { return bp.label; })
      .map(function (bp) {
        return 'nome-<span>' + _esc(bp.label) + '</span>.' + ext;
      });
    _previewRow.innerHTML = lines.join('<br>');
  }


  /* ═══════════════════════════════════════════════════════════════
     CONVERSÃO E GERAÇÃO DO ZIP
  ═══════════════════════════════════════════════════════════════ */

  function _doConvert() {
    var quality = parseInt(_qualitySlider.value) / 100;

    /* Reset UI */
    _log.innerHTML = '';
    _log.classList.add('visible');
    _progressWrap.classList.add('visible');
    _progressFill.style.width = '0%';
    _convertBtn.disabled = true;

    var zip   = new JSZip();
    var total = msqFiles.length
              * msqBreakpoints.length
              * (msqFormat === 'both' ? 2 : 1);
    var done  = 0;

    function _updateProgress(msg) {
      done++;
      var pct = Math.round((done / total) * 100);
      _progressFill.style.width = pct + '%';
      _progressLabel.textContent = pct + '% — ' + msg;
    }

    function _resizeToBlob(file, width, fmt) {
      return new Promise(function (resolve, reject) {
        var img = new Image();
        var url = URL.createObjectURL(file);

        img.onload = function () {
          var w      = Math.min(width, img.naturalWidth);
          var h      = Math.round(w * (img.naturalHeight / img.naturalWidth));
          var canvas = document.createElement('canvas');
          canvas.width  = w;
          canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          URL.revokeObjectURL(url);

          var mime = fmt === 'webp' ? 'image/webp' : 'image/jpeg';
          canvas.toBlob(function (blob) {
            if (blob) resolve(blob);
            else reject(new Error('Falha ao gerar blob'));
          }, mime, quality);
        };

        img.onerror = function () {
          URL.revokeObjectURL(url);
          reject(new Error('Falha ao carregar imagem'));
        };

        img.src = url;
      });
    }

    /* Encadeia todas as operações numa Promise chain sequencial */
    var chain = Promise.resolve();

    msqFiles.forEach(function (file) {
      var baseName = file.name.replace(/\.[^.]+$/, '');

      msqBreakpoints.forEach(function (bp) {
        var suffix  = bp.label || String(bp.width);
        var formats = msqFormat === 'both' ? ['webp', 'jpg'] : [msqFormat];

        formats.forEach(function (fmt) {
          chain = chain.then(function () {
            var ext     = fmt === 'webp' ? 'webp' : 'jpg';
            var outName = baseName + '-' + suffix + '.' + ext;

            return _resizeToBlob(file, bp.width, fmt)
              .then(function (blob) {
                zip.file(outName, blob);
                _addLog(
                  '<span class="ok">✔</span> ' + _esc(outName) +
                  ' <span style="color:var(--text3)">(' +
                  (blob.size / 1024).toFixed(0) + 'kb)</span>'
                );
                _updateProgress(outName);
              })
              .catch(function (e) {
                _addLog('<span class="err">✘</span> ' + _esc(outName) + ': ' + e.message);
                _updateProgress(outName);
              });
          });
        });
      });
    });

    /* Gera e baixa o ZIP */
    chain
      .then(function () {
        _progressLabel.textContent = 'Gerando .zip...';
        return zip.generateAsync({ type: 'blob' });
      })
      .then(function (zipBlob) {
        var a      = document.createElement('a');
        a.href     = URL.createObjectURL(zipBlob);
        a.download = 'variantes.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        _progressFill.style.width  = '100%';
        _progressLabel.textContent = '✔ Download iniciado!';
        _convertBtn.disabled       = false;
        _addLog('<br><span class="ok">→ variantes.zip baixado com sucesso</span>');
      })
      .catch(function (e) {
        _addLog('<span class="err">✘ Erro ao gerar ZIP: ' + e.message + '</span>');
        _convertBtn.disabled = false;
      });
  }


  /* ═══════════════════════════════════════════════════════════════
     UTILITÁRIOS
  ═══════════════════════════════════════════════════════════════ */

  function _addLog(html) {
    if (!_log) return;
    _log.innerHTML += html + '<br>';
    _log.scrollTop  = _log.scrollHeight;
  }

  function _esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }


  /* ═══════════════════════════════════════════════════════════════
     INICIALIZAÇÃO
  ═══════════════════════════════════════════════════════════════ */

  document.addEventListener('DOMContentLoaded', function () {

    /* 1. Adiciona botão "Masqueico" à tab bar existente */
    msqInjectTab();

    /* 2. Estende colSwitchTab para suportar a nova aba */
    msqPatchTabSwitch();

    /* 3. Cria o painel do resizer no DOM */
    msqCreatePanel();

    /* 4. Restaura aba se foi a última ativa */
    try {
      var saved = localStorage.getItem('senkolib_active_tab');
      if (saved === 'masqueico') {
        /* setTimeout(0) garante que o patch já foi aplicado antes da troca */
        setTimeout(function () {
          if (typeof colSwitchTab === 'function') colSwitchTab('masqueico');
        }, 0);
      }
    } catch (e) {}

  });

})();
