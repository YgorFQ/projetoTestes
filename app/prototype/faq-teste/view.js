(function () {
  /* A view declara somente a estrutura; estado e eventos pertencem ao script. */
  var api = window.SenkoFaqTest = window.SenkoFaqTest || {};

  api.createView = function createView() {
    var wrapper = document.createElement('div');
    wrapper.className = 'senko-feature-content faq-test-page';
    wrapper.innerHTML = `
      <section class="faq-test-hero" aria-labelledby="faq-test-title">
        <div class="faq-test-hero__copy">
          <span class="faq-test-eyebrow">FAQ multissite</span>
          <h1 class="faq-test-title" id="faq-test-title">Teste</h1>
          <p class="faq-test-subtitle">Importe, edite, simule e copie sem sair desta tela.</p>
        </div>
        <div class="faq-test-summary" id="faq-test-summary" aria-live="polite">0 perguntas</div>
      </section>

      <nav class="faq-test-sites" aria-label="FAQ que está sendo editado">
        <button class="faq-test-site is-active" type="button" data-edit-site="efacil">
          <span class="faq-test-site__dot faq-test-site__dot--efacil" aria-hidden="true"></span>
          <span class="faq-test-site__name">eFácil</span>
          <span class="faq-test-site__count" data-site-count="efacil">0</span>
        </button>
        <button class="faq-test-site" type="button" data-edit-site="martins">
          <span class="faq-test-site__dot faq-test-site__dot--martins" aria-hidden="true"></span>
          <span class="faq-test-site__name">Martins</span>
          <span class="faq-test-site__count" data-site-count="martins">0</span>
        </button>
        <button class="faq-test-site" type="button" data-edit-site="generic">
          <span class="faq-test-site__dot faq-test-site__dot--generic" aria-hidden="true"></span>
          <span class="faq-test-site__name">Genérico</span>
          <span class="faq-test-site__count" data-site-count="generic">0</span>
        </button>
      </nav>

      <nav class="faq-test-workflow" role="tablist" aria-label="Etapas do FAQ">
        <button class="faq-test-workflow__tab is-active" id="faq-test-tab-import" type="button" role="tab" aria-controls="faq-test-panel-import" aria-selected="true" data-workspace-tab="import">
          <span>1</span>Entrada
        </button>
        <button class="faq-test-workflow__tab" id="faq-test-tab-editor" type="button" role="tab" aria-controls="faq-test-panel-editor" aria-selected="false" data-workspace-tab="editor">
          <span>2</span>Perguntas
        </button>
        <button class="faq-test-workflow__tab" id="faq-test-tab-preview" type="button" role="tab" aria-controls="faq-test-panel-preview" aria-selected="false" data-workspace-tab="preview">
          <span>3</span>Simular
        </button>
        <button class="faq-test-workflow__tab" id="faq-test-tab-output" type="button" role="tab" aria-controls="faq-test-panel-output" aria-selected="false" data-workspace-tab="output">
          <span>4</span>Código
        </button>
      </nav>

      <div class="faq-test-workspace">
        <section class="faq-test-panel faq-test-panel--import" id="faq-test-panel-import" role="tabpanel" aria-labelledby="faq-test-tab-import" data-workspace-panel="import">
          <div class="faq-test-panel__head">
            <div>
              <span class="faq-test-panel__kicker">Entrada rápida</span>
              <h2 class="faq-test-panel__title" id="faq-test-import-title">Cole perguntas e respostas</h2>
            </div>
            <span class="faq-test-format"><code>&lt;q&gt;&lt;a&gt;</code> ou <code>&lt;h3&gt;&lt;p&gt;</code></span>
          </div>
          <div class="faq-test-panel__body faq-test-panel__body--import">
            <label class="faq-test-label" for="faq-test-import-input">Conteúdo para importar</label>
            <textarea class="faq-test-import" id="faq-test-import-input" spellcheck="false" placeholder="<q>Qual é o prazo?</q>\n<a>Consulte o prazo no carrinho.</a>\n\nou\n\n<h3>Onde acompanho meu pedido?</h3>\n<p>Acesse <a href=&quot;/meus-pedidos&quot;>Meus pedidos</a>.</p>"></textarea>
            <div class="faq-test-import__meta">
              <span id="faq-test-import-status">Nenhum par detectado.</span>
              <span>Links funcionam melhor no formato &lt;h3&gt;/&lt;p&gt;.</span>
            </div>
          </div>
          <div class="faq-test-panel__footer">
            <button class="faq-test-btn faq-test-btn--ghost" id="faq-test-import-clear" type="button">Limpar</button>
            <button class="faq-test-btn faq-test-btn--primary" id="faq-test-import-btn" type="button" disabled>Adicionar ao eFácil</button>
          </div>
        </section>

        <section class="faq-test-panel faq-test-panel--editor" id="faq-test-panel-editor" role="tabpanel" aria-labelledby="faq-test-tab-editor" data-workspace-panel="editor" hidden>
          <div class="faq-test-panel__head">
            <div>
              <span class="faq-test-panel__kicker">Editor</span>
              <h2 class="faq-test-panel__title" id="faq-test-editor-title">FAQ eFácil</h2>
            </div>
            <div class="faq-test-actions faq-test-actions--compact">
              <button class="faq-test-btn faq-test-btn--ghost" id="faq-test-clear-site" type="button">Limpar FAQ</button>
              <button class="faq-test-btn faq-test-btn--primary" id="faq-test-add-pair" type="button">Adicionar pergunta</button>
            </div>
          </div>
          <div class="faq-test-pairs" id="faq-test-pairs"></div>
        </section>

        <section class="faq-test-panel faq-test-panel--preview" id="faq-test-panel-preview" role="tabpanel" aria-labelledby="faq-test-tab-preview" data-workspace-panel="preview" hidden>
          <div class="faq-test-panel__head faq-test-panel__head--preview">
            <div>
              <span class="faq-test-panel__kicker">Resultado real</span>
              <h2 class="faq-test-panel__title" id="faq-test-preview-title">Simular · <span id="faq-test-preview-site-name">eFácil</span></h2>
            </div>
            <div class="faq-test-preview-sites" role="group" aria-label="Canonical usado no preview">
              <button class="faq-test-preview-site is-active" type="button" data-preview-site="efacil">eFácil</button>
              <button class="faq-test-preview-site" type="button" data-preview-site="martins">Martins</button>
              <button class="faq-test-preview-site" type="button" data-preview-site="generic">Outro site</button>
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

        <section class="faq-test-panel faq-test-panel--output" id="faq-test-panel-output" role="tabpanel" aria-labelledby="faq-test-tab-output" data-workspace-panel="output" hidden>
          <div class="faq-test-panel__head">
            <div>
              <span class="faq-test-panel__kicker">Entrega</span>
              <h2 class="faq-test-panel__title" id="faq-test-output-title">HTML + CSS final</h2>
            </div>
            <button class="faq-test-btn faq-test-btn--primary" id="faq-test-copy-output" type="button">Copiar código</button>
          </div>
          <textarea class="faq-test-output" id="faq-test-output" aria-label="Código final gerado" spellcheck="false" readonly></textarea>
        </section>
      </div>

      <div class="faq-test-toast" id="faq-test-toast" role="status" aria-live="polite"></div>
    `;
    return wrapper;
  };
})();
