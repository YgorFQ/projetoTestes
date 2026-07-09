(function () {
  /*
   * View local do Preview beta.
   *
   * O register.js monta este elemento no shell e o script.js cuida apenas do
   * comportamento. A estrutura nao depende do HTML de nenhuma outra feature.
   */
  var api = window.SenkoGamerPreview = window.SenkoGamerPreview || {};

  api.createView = function createView() {
    var wrapper = document.createElement('div');
    wrapper.className = 'senko-feature-content gamer-preview-page';
    wrapper.innerHTML = `
      <main class="prototype-shell">
        <section class="editor-panel" aria-label="Conteudo">
          <div class="panel-head">
            <div class="panel-title">GAMER</div>
            <div class="status" id="status">carregando base</div>
          </div>

          <textarea id="content-input" spellcheck="false" placeholder="Cole o HTML do conteudo aqui"></textarea>

          <div class="actions">
            <button class="btn btn-primary" id="btn-render" type="button">Atualizar preview</button>
            <button class="btn btn-ghost" id="btn-clear" type="button">Limpar</button>
            <button class="btn btn-ghost" id="btn-copy" type="button" disabled>Copiar HTML final</button>
          </div>
        </section>

        <section class="preview-panel" aria-label="Preview (beta)">
          <div class="panel-head panel-head--preview">
            <div class="panel-title">Preview (beta)</div>
            <div class="range-group">
              <span class="range-value" id="width-label">1024px</span>
              <input id="viewport-range" type="range" min="320" max="1440" step="1" value="1024">
            </div>

            <div class="presets" aria-label="Larguras">
              <button class="preset" type="button" data-width="1440">1440</button>
              <button class="preset is-active" type="button" data-width="1024">1024</button>
              <button class="preset" type="button" data-width="768">768</button>
              <button class="preset" type="button" data-width="425">425</button>
              <button class="preset" type="button" data-width="375">375</button>
              <button class="preset" type="button" data-width="320">320</button>
            </div>
          </div>

          <div class="preview-stage">
            <div class="preview-viewport" id="preview-viewport">
              <iframe id="preview-frame" title="Preview (beta)" sandbox="allow-scripts allow-forms"></iframe>
            </div>
          </div>
        </section>
      </main>
    `;
    return wrapper;
  };
})();
