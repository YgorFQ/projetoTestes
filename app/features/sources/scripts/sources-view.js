(function () {
  /*
   * View local da feature Sources.
   *
   * Toda a estrutura visual fica junto da feature. O shell recebe apenas o
   * elemento pronto e nao precisa conhecer campos, botoes ou regras internas.
   */
  var api = window.SenkoSources = window.SenkoSources || {};

  api.createView = function createView() {
    var wrapper = document.createElement('div');
    wrapper.className = 'senko-feature-content sources-page';
    wrapper.innerHTML = `
      <main>
        <section class="view is-active" id="view-sources" aria-label="Sources">
          <div class="main-grid">
            <div class="panel panel--left">
              <div class="source-options">
                <div class="control-group">
                  <label class="field-label" for="source-multiplier">Multiplicador</label>
                  <select id="source-multiplier" class="select">
                    <option value="1" selected>1x</option>
                    <option value="1.1">1.1x</option>
                    <option value="1.2">1.2x</option>
                    <option value="1.3">1.3x</option>
                    <option value="1.4">1.4x</option>
                    <option value="1.5">1.5x</option>
                    <option value="1.6">1.6x</option>
                    <option value="1.7">1.7x</option>
                    <option value="1.8">1.8x</option>
                    <option value="1.9">1.9x</option>
                    <option value="2">2x</option>
                  </select>
                </div>

                <div class="control-group source-options__wide">
                  <label class="field-label" for="source-breakpoints">Breakpoints analisados</label>
                  <input class="text-input" id="source-breakpoints" type="text" inputmode="numeric" value="320, 375, 425, 768, 1024" placeholder="Ex: 320, 375, 425, 768, 1024">
                </div>

                <div class="control-group">
                  <span class="field-label">Ultima medida</span>
                  <label class="option-check" for="skip-last-multiplier">
                    <input id="skip-last-multiplier" type="checkbox">
                    <span>nao multiplicar</span>
                  </label>
                </div>

                <div class="control-group source-options__wide">
                  <label class="field-label" for="measurement-mode">Modo de medicao</label>
                  <select id="measurement-mode" class="select">
                    <option value="standard" selected>Padrao</option>
                    <option value="base">Base.html</option>
                  </select>
                </div>

                <div class="control-group source-options__wide is-hidden" id="base-file-group">
                  <span class="field-label">Base do site</span>
                  <div class="file-row">
                    <label class="btn btn-ghost file-btn" for="base-html-input">Selecionar Base.html</label>
                    <input class="visually-hidden" id="base-html-input" type="file" accept=".html,text/html">
                    <span class="file-row__name" id="base-file-name">nenhuma base importada</span>
                  </div>
                </div>
              </div>

              <textarea id="html-input" placeholder="Cole aqui o HTML completo do conteudo rico (com <picture>, <img>, CSS, tudo)..."></textarea>

              <div class="actions">
                <button class="btn btn-primary" id="btn-run">Analisar</button>
                <button class="btn btn-ghost" id="btn-auto-measure" disabled>Medir automatico</button>
                <button class="btn btn-ghost" id="btn-clear">Limpar</button>
                <span class="hint" id="hint">0 imagens</span>
              </div>
            </div>

            <div class="panel">
              <div class="panel__head panel__head--actions">
                <button class="copy-btn" id="btn-select-all" type="button" disabled>Selecionar todas</button>
                <button class="copy-btn" id="btn-build-final" type="button" disabled>preencher automaticamente</button>
                <button class="copy-btn" id="btn-copy-final" type="button" disabled>copiar</button>
                <div class="panel__label panel__badge" id="out-badge">-</div>
              </div>
              <div class="output" id="output">
                <div class="empty" id="empty">
                  <div class="empty__icon">IMG</div>
                  <div class="empty__text">Cole o HTML e clique em Analisar</div>
                </div>
                <div class="final-output is-hidden" id="final-output">
                  <div class="out-section__label">
                    <span>conteudo final</span>
                  </div>
                  <div class="code" id="final-code"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    `;
    return wrapper;
  };
})();
