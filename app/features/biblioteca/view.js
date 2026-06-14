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

  <!-- MODAL VISUALIZAR -->
  <!-- MODAL EDITAR LAYOUT -->
  <div class="modal-overlay hidden" id="editModalOverlay">
    <div class="modal edit-modal" id="editModal">
      <div class="modal-header">
        <div class="modal-meta">
          <span class="modal-category">Editar</span>
          <h2 class="modal-title">Editar Layout</h2>
        </div>
        <div style="display:flex;gap:.5rem;align-items:center;">
          <!-- Âncora para GitHub injetar botão de salvar -->
          <span id="saveToFileBtn" style="display:none;"></span>
          <button class="modal-close" id="editModalClose" title="Fechar">✕</button>
        </div>
      </div>

      <!-- Campos de metadados -->
      <input type="hidden" id="editId" />
      <div class="add-fields">
        <div class="field-row">
          <div class="field-group" style="flex:1;">
            <label>Nome <span class="req">*</span></label>
            <input type="text" id="editName" placeholder="ex: Section-58" />
            <span class="field-desc">Nome de exibição na biblioteca.</span>
          </div>
        </div>
        <div class="field-row">
          <div class="field-group">
            <label>Tags <span class="hint">(separadas por vírgula)</span></label>
            <input type="text" id="editTags" placeholder="ex: hero, banner, cta" />
            <span class="field-desc">Palavras-chave para busca.</span>
          </div>
        </div>
      </div>

      <!-- Seletor de modo -->
      <div class="edit-mode-bar">
        <button class="edit-mode-btn" data-editmode="html">HTML</button>
        <button class="edit-mode-btn" data-editmode="css">CSS</button>
        <button class="edit-mode-btn active" data-editmode="preview">Visualizar</button>
      </div>

      <!-- Painéis — ocupam todo o espaço restante -->
      <div class="edit-mode-panel" id="editModeHtml">
        <textarea id="editHtml" class="code-textarea edit-textarea" placeholder="HTML do layout…"></textarea>
      </div>
      <div class="edit-mode-panel" id="editModeCss">
        <textarea id="editCss" class="code-textarea edit-textarea" placeholder="CSS do layout…"></textarea>
      </div>
      <div class="edit-mode-panel active" id="editModePreview">
        <iframe id="editPreviewIframe" class="edit-preview-iframe" sandbox="allow-scripts"></iframe>
      </div>

      <!-- Campo oculto para o objeto gerado (só para copiar) -->
      <pre id="editGeneratedCode" style="display:none"></pre>
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

  <!-- MODAL EDITAR VARIANTE -->
  <div class="modal-overlay hidden" id="editVarOverlay">
    <div class="modal edit-modal" id="editVarModal">
      <div class="modal-header">
        <div class="modal-meta">
          <span class="modal-category">Editar Variante</span>
          <h2 class="modal-title" id="editVarParentName"></h2>
        </div>
        <div style="display:flex;gap:.5rem;align-items:center;">
          <!-- Botão excluir variante — dentro do modal de edição -->
          <button class="btn-delete-var-modal btn-delete-variant-card" id="editVarDeleteBtn" title="Excluir variante" style="display:none;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
            </svg>
            Excluir
          </button>
          <!-- Âncora para GitHub injetar botão de salvar -->
          <span id="saveVarToFileBtn" style="display:none;"></span>
          <button class="modal-close" id="editVarClose" title="Fechar">✕</button>
        </div>
      </div>

      <!-- Campo nome -->
      <div class="add-fields">
        <div class="field-row">
          <div class="field-group" style="flex:1;">
            <label>Nome <span class="req">*</span></label>
            <input type="text" id="editVarName" placeholder="ex: section-1-2" />
            <span class="field-desc">Use apenas letras, numeros, espacos e hifen.</span>
          </div>
        </div>
      </div>

      <!-- Seletor de modo -->
      <div class="edit-mode-bar">
        <button class="edit-var-mode-btn" data-evmode="html">HTML</button>
        <button class="edit-var-mode-btn" data-evmode="css">CSS</button>
        <button class="edit-var-mode-btn active" data-evmode="preview">Visualizar</button>
      </div>

      <!-- Painéis -->
      <div class="edit-mode-panel" id="editVarModeHtml">
        <textarea id="editVarHtml" class="code-textarea edit-textarea" placeholder="HTML da variante…"></textarea>
      </div>
      <div class="edit-mode-panel" id="editVarModeCss">
        <textarea id="editVarCss" class="code-textarea edit-textarea" placeholder="CSS da variante…"></textarea>
      </div>
      <div class="edit-mode-panel active" id="editVarModePreview">
        <iframe id="editVarPreviewIframe" class="edit-preview-iframe" sandbox="allow-scripts"></iframe>
      </div>

      <!-- Objeto gerado (oculto — só para copiar) -->
      <pre id="editVarGeneratedCode" style="display:none"></pre>
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
