(function () {
  /* A view declara somente a estrutura; estado e eventos pertencem ao script. */
  var api = window.SenkoFaqTest = window.SenkoFaqTest || {};

  api.createView = function createView() {
    var wrapper = document.createElement('div');
    wrapper.className = 'senko-feature-content faq-test-page';
    wrapper.innerHTML = `
      <header class="faq-test-hero" aria-labelledby="faq-test-title">
        <div class="faq-test-hero__copy">
          <span class="faq-test-eyebrow">FAQ multissite</span>
          <div>
            <h1 class="faq-test-title" id="faq-test-title">Editor de FAQs</h1>
            <p class="faq-test-subtitle">Monte conteúdos específicos e acompanhe o resultado enquanto edita.</p>
          </div>
        </div>
        <div class="senko-tag faq-test-summary" id="faq-test-summary" aria-live="polite">0 perguntas</div>
      </header>

      <div class="faq-test-layout">
        <aside class="faq-test-sidebar" aria-label="Edição do FAQ">
          <div class="faq-test-sidebar__head">
            <div>
              <span class="faq-test-panel__kicker">Conteúdo</span>
              <h2 class="faq-test-sidebar__title">Perguntas e respostas</h2>
            </div>
            <nav class="faq-test-sites" aria-label="FAQ que está sendo editado">
              <button class="senko-tab-btn faq-test-site is-active active" type="button" data-edit-site="efacil">
                <span class="faq-test-site__dot faq-test-site__dot--efacil" aria-hidden="true"></span>
                <span class="faq-test-site__name">eFácil</span>
                <span class="faq-test-site__count" data-site-count="efacil">0</span>
              </button>
              <button class="senko-tab-btn faq-test-site" type="button" data-edit-site="martins">
                <span class="faq-test-site__dot faq-test-site__dot--martins" aria-hidden="true"></span>
                <span class="faq-test-site__name">Martins</span>
                <span class="faq-test-site__count" data-site-count="martins">0</span>
              </button>
              <button class="senko-tab-btn faq-test-site" type="button" data-edit-site="generic">
                <span class="faq-test-site__dot faq-test-site__dot--generic" aria-hidden="true"></span>
                <span class="faq-test-site__name">Genérico</span>
                <span class="faq-test-site__count" data-site-count="generic">0</span>
              </button>
            </nav>
          </div>

          <nav class="faq-test-workflow" role="tablist" aria-label="Área de trabalho">
            <button class="senko-tab-btn faq-test-workflow__tab is-active active" id="faq-test-tab-editor" type="button" role="tab" aria-controls="faq-test-panel-editor" aria-selected="true" data-workspace-tab="editor">Editar FAQ</button>
            <button class="senko-tab-btn faq-test-workflow__tab" id="faq-test-tab-output" type="button" role="tab" aria-controls="faq-test-panel-output" aria-selected="false" data-workspace-tab="output">Código final</button>
          </nav>

          <div class="faq-test-sidebar__content">
            <section class="faq-test-panel faq-test-panel--editor" id="faq-test-panel-editor" role="tabpanel" aria-labelledby="faq-test-tab-editor" data-workspace-panel="editor">
              <div class="faq-test-importer">
                <div class="faq-test-section-heading">
                  <div>
                    <span class="faq-test-section-heading__step">Entrada rápida</span>
                    <h3>Adicionar perguntas</h3>
                  </div>
                  <span class="faq-test-format"><code>&lt;q&gt;&lt;a&gt;</code> ou <code>&lt;h3&gt;&lt;p&gt;</code></span>
                </div>
                <label class="faq-test-label" for="faq-test-import-input">Cole perguntas e respostas em massa</label>
                <textarea class="faq-test-import" id="faq-test-import-input" spellcheck="false" placeholder="<q>Qual é o prazo?</q>\n<a>Consulte o prazo no carrinho.</a>\n\nou\n\n<h3>Onde acompanho meu pedido?</h3>\n<p>Acesse <a href=&quot;/meus-pedidos&quot;>Meus pedidos</a>.</p>"></textarea>
                <div class="faq-test-import__meta">
                  <span id="faq-test-import-status">Nenhum par detectado.</span>
                  <span>HTML inline e links são preservados.</span>
                </div>
                <div class="faq-test-importer__actions">
                  <button class="senko-btn senko-btn-ghost faq-test-btn faq-test-btn--ghost" id="faq-test-import-clear" type="button">Limpar</button>
                  <button class="senko-btn senko-btn-primary faq-test-btn faq-test-btn--primary" id="faq-test-import-btn" type="button" disabled>Adicionar ao eFácil</button>
                </div>
              </div>

              <div class="faq-test-question-section">
                <div class="faq-test-question-section__head">
                  <div>
                    <span class="faq-test-section-heading__step">Lista atual</span>
                    <h3 id="faq-test-editor-title">FAQ eFácil</h3>
                  </div>
                  <div class="faq-test-actions faq-test-actions--compact">
                    <button class="senko-btn senko-btn-ghost faq-test-btn faq-test-btn--ghost" id="faq-test-clear-site" type="button">Limpar FAQ</button>
                    <button class="senko-btn senko-btn-primary faq-test-btn faq-test-btn--primary" id="faq-test-add-pair" type="button">+ Pergunta</button>
                  </div>
                </div>
                <div class="faq-test-pairs" id="faq-test-pairs"></div>
              </div>
            </section>

            <section class="faq-test-panel faq-test-panel--output" id="faq-test-panel-output" role="tabpanel" aria-labelledby="faq-test-tab-output" data-workspace-panel="output" hidden>
              <div class="faq-test-panel__head">
                <div>
                  <span class="faq-test-panel__kicker">Entrega</span>
                  <h2 class="faq-test-panel__title" id="faq-test-output-title">HTML final</h2>
                </div>
                <button class="senko-btn senko-btn-primary faq-test-btn faq-test-btn--primary" id="faq-test-copy-output" type="button">Copiar código</button>
              </div>
              <textarea class="faq-test-output" id="faq-test-output" aria-label="Código final gerado" spellcheck="false" readonly></textarea>
            </section>
          </div>
        </aside>

        <section class="faq-test-preview-panel" aria-labelledby="faq-test-preview-title">
          <div class="faq-test-preview-panel__head">
            <div>
              <span class="faq-test-panel__kicker">Prévia ao vivo</span>
              <h2 class="faq-test-panel__title" id="faq-test-preview-title">Visualizando <span id="faq-test-preview-site-name">eFácil</span></h2>
            </div>
            <div class="faq-test-preview-sites" role="group" aria-label="Canonical usado no preview">
              <button class="senko-tab-btn faq-test-preview-site is-active active" type="button" data-preview-site="efacil">eFácil</button>
              <button class="senko-tab-btn faq-test-preview-site" type="button" data-preview-site="martins">Martins</button>
              <button class="senko-tab-btn faq-test-preview-site" type="button" data-preview-site="generic">Outro site</button>
            </div>
          </div>
          <div class="faq-test-preview-toolbar">
            <div class="faq-test-canonical">
              <label for="faq-test-canonical-input">Canonical da página simulada</label>
              <div class="faq-test-canonical__control">
                <input class="faq-test-canonical__input" id="faq-test-canonical-input" type="url" value="https://www.efacil.com.br/produto-exemplo" placeholder="https://www.site.com.br/produto" autocomplete="off" spellcheck="false">
                <span class="faq-test-canonical__result" id="faq-test-canonical-result">FAQ eFácil</span>
              </div>
            </div>
            <div class="faq-test-route" id="faq-test-route">
              <strong class="faq-test-route__site faq-test-route__site--efacil">FAQ eFácil</strong>
              <span class="faq-test-route__status">canonical detectado</span>
              <code>https://www.efacil.com.br/produto-exemplo</code>
              <span class="faq-test-route__count">0 perguntas</span>
            </div>
          </div>
          <div class="faq-test-preview-stage">
            <iframe class="faq-test-preview-frame" id="faq-test-preview-frame" title="Preview do FAQ multissite" sandbox="allow-scripts"></iframe>
          </div>
        </section>
      </div>

      <div class="faq-test-toast" id="faq-test-toast" role="status" aria-live="polite"></div>
    `;
    return wrapper;
  };
})();
