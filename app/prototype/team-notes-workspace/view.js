(function () {
  var api = window.SenkoTeamNotesWorkspace = window.SenkoTeamNotesWorkspace || {};

  api.createView = function createView() {
    var wrapper = document.createElement('div');
    wrapper.className = 'senko-feature-content team-notes-workspace-page';
    wrapper.innerHTML = `
      <section class="team-notes-workspace-hero" aria-labelledby="team-notes-workspace-title">
        <div>
          <span class="team-notes-workspace-eyebrow">Equipe · protótipo</span>
          <h1 id="team-notes-workspace-title">Notas da equipe</h1>
          <p>Seções, páginas e conteúdo compartilhado em uma tela de trabalho contínua.</p>
        </div>
        <div class="team-notes-workspace-cloud" title="O protótipo ainda não grava dados reais">
          <span aria-hidden="true"></span>
          Firebase previsto
        </div>
      </section>

      <section class="team-notes-workspace-shell" aria-label="Protótipo do espaço de notas">
        <div class="team-notes-workspace-notebook">
          <span class="team-notes-workspace-notebook__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h13v16H6z"/><path d="M9 8h7M9 12h7M9 16h5"/><path d="M3 7h3M3 12h3M3 17h3"/></svg>
          </span>
          <span>
            <small>Caderno compartilhado</small>
            <strong>SenkoLib · Equipe</strong>
          </span>
        </div>

        <div class="team-notes-workspace-layout">
          <aside class="team-notes-workspace-sections" aria-labelledby="team-notes-sections-title">
            <div class="team-notes-workspace-pane-head">
              <div>
                <span>Organização</span>
                <h2 id="team-notes-sections-title">Seções</h2>
              </div>
              <span class="team-notes-workspace-count" id="team-notes-sections-count">0</span>
            </div>
            <button class="team-notes-workspace-add team-notes-workspace-add--quiet" id="team-notes-add-section" type="button">
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
            <label class="team-notes-workspace-filter" for="team-notes-filter">
              <span>Tipo</span>
              <select id="team-notes-filter">
                <option value="">Todos os tipos</option>
                <option value="prompt">Prompts</option>
                <option value="regra">Regras</option>
                <option value="guia">Guias</option>
                <option value="padrao">Padrões</option>
                <option value="geral">Geral</option>
              </select>
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
              <span class="team-notes-workspace-save-state" id="team-notes-save-state">Salva</span>
            </div>

            <div class="team-notes-workspace-editor-body">
              <label class="team-notes-workspace-title-field" for="team-notes-title">
                <span class="team-notes-workspace-sr-only">Título da página</span>
                <input id="team-notes-title" type="text" maxlength="140" placeholder="Título da página" required>
              </label>
              <div class="team-notes-workspace-date" id="team-notes-date">Selecione uma página para começar</div>
              <div class="team-notes-workspace-metadata">
                <label for="team-notes-type">
                  <span>Tipo</span>
                  <select id="team-notes-type">
                    <option value="prompt">Prompt</option>
                    <option value="regra">Regra</option>
                    <option value="guia">Guia</option>
                    <option value="padrao">Padrão</option>
                    <option value="geral">Geral</option>
                  </select>
                </label>
                <label for="team-notes-tags">
                  <span>Tags</span>
                  <input id="team-notes-tags" type="text" placeholder="pdp, seo, processo">
                </label>
              </div>
              <label class="team-notes-workspace-content-field" for="team-notes-content">
                <span class="team-notes-workspace-sr-only">Conteúdo da página</span>
                <textarea id="team-notes-content" spellcheck="true" placeholder="Comece a escrever..."></textarea>
              </label>
            </div>

            <div class="team-notes-workspace-editor-footer">
              <div>
                <span id="team-notes-character-count">0 caracteres</span>
                <span>·</span>
                <span id="team-notes-version">versão 0</span>
              </div>
              <div class="team-notes-workspace-editor-actions">
                <button class="team-notes-workspace-btn team-notes-workspace-btn--danger" id="team-notes-delete" type="button">Excluir</button>
                <button class="team-notes-workspace-btn" id="team-notes-copy" type="button">Copiar conteúdo</button>
                <button class="team-notes-workspace-btn team-notes-workspace-btn--primary" id="team-notes-save" type="submit">Salvar página</button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <div class="team-notes-workspace-toast" id="team-notes-toast" role="status" aria-live="polite"></div>
    `;
    return wrapper;
  };
})();
