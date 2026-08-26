(function () {
  var api = window.SenkoTeamNotesWorkspace = window.SenkoTeamNotesWorkspace || {};

  api.createView = function createView() {
    var wrapper = document.createElement('div');
    wrapper.className = 'senko-feature-content team-notes-workspace-page';
    wrapper.innerHTML = `
      <h1 class="team-notes-workspace-sr-only">Notas da equipe</h1>

      <section class="team-notes-workspace-shell" aria-label="Protótipo do espaço de notas">
        <div class="team-notes-workspace-layout">
          <aside class="team-notes-workspace-sections" aria-labelledby="team-notes-sections-title">
            <div class="team-notes-workspace-pane-head">
              <div>
                <span>Organização</span>
                <h2 id="team-notes-sections-title">Seções</h2>
              </div>
              <span class="team-notes-workspace-count" id="team-notes-sections-count">0</span>
            </div>
            <button class="team-notes-workspace-add" id="team-notes-add-section" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
              Nova seção
            </button>
            <form class="team-notes-workspace-section-form" id="team-notes-section-form" hidden>
              <label for="team-notes-section-name">Nome da seção</label>
              <input id="team-notes-section-name" type="text" maxlength="80" autocomplete="off" placeholder="Ex: Processos">
              <div>
                <button type="button" data-cancel-section>Cancelar</button>
                <button type="submit">Criar</button>
              </div>
            </form>
            <label class="team-notes-workspace-search" for="team-notes-section-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
              <span class="team-notes-workspace-sr-only">Buscar seções</span>
              <input id="team-notes-section-search" type="search" autocomplete="off" placeholder="Buscar seção">
            </label>
            <div class="team-notes-workspace-section-list" id="team-notes-section-list"></div>
          </aside>

          <section class="team-notes-workspace-pages" aria-labelledby="team-notes-pages-title">
            <div class="team-notes-workspace-pane-head">
              <div>
                <span id="team-notes-pages-kicker">Páginas</span>
                <h2 id="team-notes-pages-title">Selecione uma seção</h2>
              </div>
              <span class="team-notes-workspace-count" id="team-notes-pages-count">0</span>
            </div>
            <button class="team-notes-workspace-add" id="team-notes-add-page" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
              Nova página
            </button>
            <label class="team-notes-workspace-search" for="team-notes-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
              <span class="team-notes-workspace-sr-only">Buscar páginas</span>
              <input id="team-notes-search" type="search" autocomplete="off" placeholder="Buscar nesta seção">
            </label>
            <div class="team-notes-workspace-page-list" id="team-notes-page-list"></div>
          </section>

          <form class="team-notes-workspace-editor" id="team-notes-editor">
            <div class="team-notes-workspace-editor-head">
              <div class="team-notes-workspace-breadcrumb">
                <span id="team-notes-editor-section">Seção</span>
                <span aria-hidden="true">/</span>
                <strong id="team-notes-editor-page">Página</strong>
              </div>
              <div class="team-notes-workspace-editor-toolbar">
                <div class="team-notes-workspace-editor-stats">
                  <span id="team-notes-character-count">0 caracteres</span>
                  <span aria-hidden="true">·</span>
                  <span id="team-notes-version">versão 0</span>
                </div>
                <div class="team-notes-workspace-editor-actions">
                  <button class="team-notes-workspace-btn team-notes-workspace-btn--danger" id="team-notes-delete" type="button">Excluir</button>
                  <button class="team-notes-workspace-btn" id="team-notes-copy" type="button">Copiar</button>
                  <button class="team-notes-workspace-btn team-notes-workspace-btn--primary" id="team-notes-save" type="submit">Salvar</button>
                </div>
              </div>
            </div>

            <div class="team-notes-workspace-editor-body">
              <label class="team-notes-workspace-title-field" for="team-notes-title">
                <span class="team-notes-workspace-sr-only">Título da página</span>
                <input id="team-notes-title" type="text" maxlength="140" placeholder="Título da página" required>
              </label>
              <div class="team-notes-workspace-date" id="team-notes-date">Selecione uma página para começar</div>
              <label class="team-notes-workspace-content-field" for="team-notes-content">
                <span class="team-notes-workspace-sr-only">Conteúdo da página</span>
                <textarea id="team-notes-content" spellcheck="true" placeholder="Comece a escrever..."></textarea>
              </label>
            </div>

          </form>
        </div>
      </section>

      <div class="team-notes-workspace-confirm-overlay" id="team-notes-confirm-overlay" hidden>
        <div class="team-notes-workspace-confirm" role="alertdialog" aria-modal="true" aria-labelledby="team-notes-confirm-title" aria-describedby="team-notes-confirm-description">
          <button class="team-notes-workspace-confirm__close" id="team-notes-confirm-close" type="button" aria-label="Fechar confirmação">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
          </button>
          <div class="team-notes-workspace-confirm__intro">
            <span class="team-notes-workspace-confirm__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/><path d="M10 11v5M14 11v5"/></svg>
            </span>
            <div>
              <span class="team-notes-workspace-confirm__eyebrow">Notas beta</span>
              <h2 id="team-notes-confirm-title">Confirmar exclusão</h2>
            </div>
          </div>
          <p class="team-notes-workspace-confirm__description" id="team-notes-confirm-description"></p>
          <div class="team-notes-workspace-confirm__target">
            <span id="team-notes-confirm-target-label">Item selecionado</span>
            <strong id="team-notes-confirm-target-name"></strong>
            <small id="team-notes-confirm-target-detail"></small>
          </div>
          <p class="team-notes-workspace-confirm__warning">Esta ação é permanente e não poderá ser desfeita.</p>
          <div class="team-notes-workspace-confirm__actions">
            <button class="team-notes-workspace-confirm__cancel" id="team-notes-confirm-cancel" type="button">Cancelar</button>
            <button class="team-notes-workspace-confirm__delete" id="team-notes-confirm-delete" type="button">Excluir</button>
          </div>
        </div>
      </div>

      <div class="team-notes-workspace-toast" id="team-notes-toast" role="status" aria-live="polite"></div>
    `;
    return wrapper;
  };
})();
