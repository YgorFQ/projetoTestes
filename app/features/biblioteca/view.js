(function () {
  /*
   * View da Biblioteca.
   *
   * Este arquivo e o unico dono da estrutura HTML da feature. O index
   * principal e o shell nao conhecem campos, grids ou modais da Biblioteca.
   */
  var api = window.SenkoBiblioteca = window.SenkoBiblioteca || {};
  var markup = `
<!-- DASHBOARD -->
  <main class="dashboard" id="dashboard">
    <!-- Toolbar exclusiva da Biblioteca: busca layouts e cria layouts, sem chamar outras features. -->
    <div class="feature-toolbar biblioteca-toolbar">
      <div class="feature-toolbar-main">
        <div class="search-wrap feature-search-wrap">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" id="searchInput" class="search-input" placeholder="Buscar layouts..." autocomplete="off" />
        </div>
      </div>

      <div class="feature-toolbar-actions">
        <button class="copy-base-edit-btn" id="copyBaseEditBtn" type="button" title="Editar HTML básico"
          aria-label="Editar HTML básico" aria-haspopup="dialog" aria-controls="copyBaseEditorOverlay">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="17" height="17"
            aria-hidden="true">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
          </svg>
        </button>

        <button class="btn-copyall" id="copyAllBtn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          HTML Basico
        </button>

        <button class="btn-add" id="openAddModal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Adicionar
        </button>
      </div>
    </div>

    <div class="stats-bar" id="statsBar"></div>
    <div class="grid" id="layoutGrid"></div>
    <div class="no-results hidden" id="noResults">
      <img src="app/shared/assets/senko.png" class="no-results-icon" alt="Sem resultados" />
      <p>Nenhum layout encontrado para <strong id="noResultsQuery"></strong></p>
    </div>
  </main>

  <!-- MODAL EDITAR HTML BASICO -->
  <div class="copy-base-editor-overlay" id="copyBaseEditorOverlay" hidden>
    <div class="copy-base-editor-modal" role="dialog" aria-modal="true" aria-labelledby="copyBaseEditorTitle"
      aria-describedby="copyBaseEditorDescription">
      <div class="copy-base-editor-header">
        <div>
          <span class="copy-base-editor-category">Biblioteca</span>
          <h2 id="copyBaseEditorTitle">Editar HTML básico</h2>
          <p id="copyBaseEditorDescription">Este conteúdo é copiado pelo botão HTML Básico.</p>
        </div>
        <button class="copy-base-editor-close" id="copyBaseEditorClose" type="button" title="Fechar"
          aria-label="Fechar editor de HTML básico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="copy-base-editor-body">
        <label for="copyBaseEditorTextarea">HTML básico</label>
        <textarea id="copyBaseEditorTextarea" spellcheck="false"></textarea>
      </div>
      <div class="copy-base-editor-footer">
        <span class="copy-base-editor-status" id="copyBaseEditorStatus" role="status" aria-live="polite"></span>
        <div class="copy-base-editor-actions">
          <button class="copy-base-editor-cancel" id="copyBaseEditorCancel" type="button">Cancelar</button>
          <button class="copy-base-editor-save" id="copyBaseEditorSave" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M4 4h13l3 3v13H4Z" />
              <path d="M8 4v6h8V4M8 16h8" />
            </svg>
            <span>Salvar no Firebase</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- MODAL ADICIONAR -->
  <div class="modal-overlay hidden" id="addModalOverlay">
    <div class="modal add-modal" id="addModal">
      <div class="modal-header">
        <div class="modal-meta">

          <h2 class="modal-title">Adicionar Layout</h2>
        </div>
        <button class="modal-close" id="addModalClose" title="Fechar">✕</button>
      </div>
      <input type="hidden" id="addId" />
      <div class="add-fields">
        <div class="field-row">
          <div class="field-group">
            <label>Nome <span class="req">*</span></label>
            <input type="text" id="addName" placeholder="ex: Section-58" />
            <span class="field-desc">Nome de exibição na biblioteca. Pode ter maiúsculas.</span>
          </div>
        </div>
        <div class="field-row">
          <div class="field-group">
            <label>Tags <span class="hint">(separadas por vírgula)</span></label>
            <input type="text" id="addTags" placeholder="ex: hero, banner, cta" />
            <span class="field-desc">Palavras-chave para facilitar a busca. Separe por vírgula.</span>
          </div>
        </div>
      </div>
      <div class="code-section">
        <div class="code-tabs">
          <button class="tab-btn add-tab active" data-addtab="html">HTML</button>
          <button class="tab-btn add-tab" data-addtab="css">CSS</button>
          <button class="tab-btn add-tab" data-addtab="preview">Preview</button>
        </div>
        <div class="add-code-panel active" id="addPanelHtml">
          <textarea id="addHtml" class="code-textarea" placeholder="Cole o HTML do layout aqui…"></textarea>
        </div>
        <div class="add-code-panel" id="addPanelCss">
          <textarea id="addCss" class="code-textarea" placeholder="Cole o CSS do layout aqui…"></textarea>
        </div>
        <div class="add-code-panel" id="addPanelPreview">
          <div class="preview-label">Preview ao vivo</div>
          <iframe id="addPreviewIframe" class="modal-iframe" sandbox="allow-scripts"></iframe>
        </div>
      </div>
      <!-- Âncora para GitHub injetar o botão de salvar novo layout -->
      <div class="add-result-section">
        <div class="code-toolbar" id="addResultToolbar">
          <!-- GitHub injeta aqui o botão GitHub -->
          <span id="copyGeneratedBtn" style="display:none;"></span>
        </div>
        <pre class="code-block" id="generatedCode" style="display:none;"></pre>
      </div>
    </div>
  </div>


  <!-- MODAL VARIANTES -->
  <div class="modal-overlay hidden" id="variantsOverlay">
    <div class="modal variants-modal" id="variantsModal">

      <!-- Cabeçalho do modal -->
      <div class="variants-modal-header">
        <div class="variants-header-left">
          <span class="modal-category">Variantes</span>
          <h2 class="modal-title" id="variantsTitle"></h2>
        </div>
        <div class="variants-header-right">
          <!-- Badge de contagem — sem background, só border laranja -->
          <div class="variants-stats-badge" id="variantsStatsBadge">
            <span id="variantsCount"></span>
            <span class="variants-stats-sep" id="variantsFavSep" style="display:none">·</span>
            <span class="variants-fav-count hidden" id="variantsFavCount">
              <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" style="color:#f5a623">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span id="variantsFavNum"></span> favorito
            </span>
          </div>
          <!-- Barra de pesquisa de variantes (visual, sem lógica por enquanto) -->
          <div class="variants-search-wrap">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" class="variants-search-input" placeholder="Pesquisar variações…" autocomplete="off" id="variantsSearchInput" />
          </div>
          <button class="modal-close" id="variantsClose" title="Fechar">✕</button>
        </div>
      </div>

      <!-- Grid de variantes -->
      <div class="variants-grid-wrap">
        <div class="variants-grid" id="variantsGrid"></div>
      </div>
    </div>
  </div>

  <!-- MODAL NOVA VARIANTE -->
  <div class="modal-overlay hidden" id="newVarOverlay">
    <div class="modal newvar-modal" id="newVarModal">
      <div class="modal-header">
        <div class="modal-meta">
          <span class="modal-category">Nova Variante</span>
          <h2 class="modal-title">Criar Variante</h2>
          <p class="add-hint">Variante de: <strong id="newVarParentName"></strong></p>
        </div>
        <button class="modal-close" id="newVarClose" title="Fechar">✕</button>
      </div>
      <div class="add-fields">
        <div class="field-row">
          <div class="field-group">
            <label>Nome <span class="req">*</span></label>
            <input type="text" id="newVarName" placeholder="ex: section-49-1" />
            <span class="field-desc">Use apenas letras, numeros, espacos e hifen.</span>
          </div>
        </div>
      </div>
      <div class="code-section">
        <div class="code-tabs">
          <button class="tab-btn newvar-tab active" data-nvtab="html">HTML</button>
          <button class="tab-btn newvar-tab" data-nvtab="css">CSS</button>
          <button class="tab-btn newvar-tab" data-nvtab="preview">Preview</button>
        </div>
        <div class="add-code-panel active newvar-panel" id="newVarPanelHtml">
          <textarea id="newVarHtml" class="code-textarea" placeholder="Cole o HTML da variante aqui…"></textarea>
        </div>
        <div class="add-code-panel newvar-panel" id="newVarPanelCss">
          <textarea id="newVarCss" class="code-textarea" placeholder="Cole o CSS da variante aqui…"></textarea>
        </div>
        <div class="add-code-panel newvar-panel" id="newVarPanelPreview">
          <div class="preview-label">Preview ao vivo</div>
          <iframe id="newVarPreviewIframe" class="modal-iframe" sandbox="allow-scripts"></iframe>
        </div>
      </div>
      <!-- Âncora para GitHub injetar botão de salvar nova variante -->
      <div class="add-result-section">
        <div class="code-toolbar">
          <span id="newVarCopyBtn" style="display:none;"></span>
        </div>
        <pre id="newVarGeneratedCode" style="display:none;"></pre>
      </div>
    </div>
  </div>

  <!-- Análise vinculada ao layout selecionado -->
  <dialog class="library-analysis-dialog" id="libraryAnalysisDialog" aria-labelledby="libraryAnalysisTitle">
    <div class="library-analysis-shell">
      <header class="library-analysis-header">
        <div><span class="modal-category">Biblioteca · Mais informações</span><h2 id="libraryAnalysisTitle"></h2></div>
        <button type="button" class="library-analysis-close" id="libraryAnalysisClose" aria-label="Fechar informações">×</button>
      </header>
      <div class="library-analysis-columns">
        <section class="library-analysis-preview" aria-label="Prévia do layout">
          <iframe id="libraryAnalysisPreview" title="Prévia do layout" sandbox="allow-scripts"></iframe>
        </section>
        <section class="library-analysis-content" aria-label="Análise do layout">
          <div id="libraryAnalysisRead"></div>
          <form id="libraryAnalysisForm" hidden>
            <div class="library-analysis-mode-switch" role="group" aria-label="Modo de preenchimento da análise">
              <button type="button" id="libraryAnalysisManualMode" class="library-analysis-mode-button" aria-controls="libraryAnalysisManualPanel" aria-pressed="true">Manual</button>
              <button type="button" id="libraryAnalysisCodeMode" class="library-analysis-mode-button" aria-controls="libraryAnalysisCodePanel" aria-pressed="false">Código</button>
            </div>
            <div id="libraryAnalysisManualPanel" class="library-analysis-manual-panel">
              <label>Nome descritivo <input name="descriptiveName" maxlength="160" required></label>
              <label>Estrutura principal <textarea name="mainStructure" maxlength="500" rows="2"></textarea></label>
              <label>O que é? <textarea name="whatIsIt" maxlength="10000" rows="3"></textarea></label>
              <label>Para que serve? <textarea name="purpose" maxlength="10000" rows="3"></textarea></label>
              <label>Por que é assim? <textarea name="rationale" maxlength="10000" rows="3"></textarea></label>
              <label>Quando utilizar? <textarea name="whenToUse" maxlength="10000" rows="3"></textarea></label>
              <label>Limitações <textarea name="limitations" maxlength="10000" rows="3"></textarea></label>
              <label>Tags <input name="tags" maxlength="3239" placeholder="Separe por vírgula"></label>
            </div>
            <div id="libraryAnalysisCodePanel" class="library-analysis-code-panel" hidden>
              <label for="libraryAnalysisCodeInput">Cole o JSON da análise</label>
              <p id="libraryAnalysisCodeHelp" class="library-analysis-code-help">Chaves aceitas: <code>nome_descritivo</code>, <code>estrutura_principal</code>, <code>o_que_e</code>, <code>para_que_serve</code>, <code>por_que_e_assim</code>, <code>quando_utilizar</code>, <code>limitacoes</code> e <code>tags</code> (lista de textos). Campos ausentes serão mantidos.</p>
              <textarea id="libraryAnalysisCodeInput" rows="14" spellcheck="false" aria-describedby="libraryAnalysisCodeHelp" placeholder='{"nome_descritivo":"Título da seção","tags":["responsivo"]}'></textarea>
              <button type="button" id="libraryAnalysisFillCode" class="library-analysis-fill-button">Preencher campos</button>
            </div>
            <div class="library-analysis-form-actions">
              <button type="button" id="libraryAnalysisCancel">Cancelar</button>
              <button type="submit" id="libraryAnalysisSave">Salvar alterações</button>
            </div>
          </form>
          <p class="library-analysis-status" id="libraryAnalysisStatus" role="status" aria-live="polite"></p>
        </section>
      </div>
      <footer class="library-analysis-footer" id="libraryAnalysisFooter" hidden><button type="button" id="libraryAnalysisEdit" hidden>Editar análise</button></footer>
    </div>
  </dialog>

  <!-- Toast -->
  <div class="toast" id="toast">✓ Copiado!</div>
  `;

  api.createView = function createView() {
    var content = document.createElement('div');
    content.className = 'biblioteca-feature';
    content.innerHTML = markup;
    return content;
  };
})();
