(function () {
  /*
   * View local da feature Imagens.
   *
   * O shell nao conhece este HTML. O register.js chama createView() somente
   * quando a aba e aberta, mantendo a feature independente e evitando buscar
   * e recortar app/features/imagens/index.html em tempo de execucao.
   */
  var api = window.SenkoImagens = window.SenkoImagens || {};

  api.createView = function createView() {
    var wrapper = document.createElement('div');
    wrapper.className = 'senko-feature-content imagens-page';
    wrapper.innerHTML = `
      <div class="image-tool-app">
        <nav class="image-tool-nav" aria-label="Ferramentas de imagens">
          <div class="tabs" role="tablist" aria-label="Ferramentas de imagens">
            <button class="tab is-active" type="button" data-tab="compressor">Compressor</button>
            <button class="tab" type="button" data-tab="resizer">Redimensionador</button>
          </div>
          <div class="header__status" aria-live="polite">
            <div class="dot" id="dot"></div>
            <span id="status-text">aguardando</span>
          </div>
        </nav>

        <main class="image-tool-main">
          <section class="view is-active" id="view-compressor" aria-label="Compressor">
            <div class="compressor-layout">
              <aside class="compressor-controls" aria-label="Controles do compressor">
                <div class="panel__head">
                  <div class="panel__label">Entrada</div>
                </div>

                <div class="file-picker">
                  <button class="btn btn-primary" id="btn-pick-images" type="button">Selecionar imagens</button>
                  <span class="file-picker__hint">Arraste PNG, JPG, JPEG ou WebP para a area de imagens</span>
                </div>
                <input class="visually-hidden" id="image-input" type="file" accept="image/png,image/jpeg,image/webp" multiple>

                <div class="control-group">
                  <label class="field-label" for="quality-range">Qualidade</label>
                  <div class="range-row">
                    <input id="quality-range" type="range" min="65" max="92" value="82">
                    <span class="range-value" id="quality-value">82%</span>
                  </div>
                </div>

                <div class="control-group">
                  <span class="field-label">Preset</span>
                  <div class="segmented segmented--compact">
                    <button class="segment" type="button" data-quality="88">Alta</button>
                    <button class="segment is-active" type="button" data-quality="82">Equilibrada</button>
                    <button class="segment" type="button" data-quality="74">Leve</button>
                  </div>
                </div>

                <div class="control-group">
                  <label class="field-label" for="png-colors">PNG</label>
                  <select id="png-colors" class="select">
                    <option value="256" selected>256 cores</option>
                    <option value="192">192 cores</option>
                    <option value="128">128 cores</option>
                  </select>
                </div>

                <div class="actions actions--stack">
                  <button class="btn btn-primary" id="btn-compress" disabled>Comprimir</button>
                  <button class="btn btn-ghost" id="btn-sort-images" disabled>Ordenar A-Z</button>
                  <button class="btn btn-ghost" id="btn-download-each" disabled>Baixar tudo</button>
                  <button class="btn btn-ghost" id="btn-download-all" disabled>Baixar ZIP</button>
                  <button class="btn btn-ghost" id="btn-clear-images" disabled>Limpar</button>
                </div>
              </aside>

              <section class="compressor-results">
                <div class="panel__head">
                  <div class="panel__label">Imagens</div>
                  <div class="panel__label panel__badge" id="compressor-badge">0 arquivos</div>
                </div>
                <div class="image-list" id="image-list">
                  <div class="empty">
                    <div class="empty__icon">PNG</div>
                    <div class="empty__text">Adicione imagens para comprimir localmente</div>
                  </div>
                </div>
              </section>
            </div>
          </section>

          <section class="view" id="view-resizer" aria-label="Redimensionador">
            <div class="resizer-layout">
              <aside class="resizer-controls" aria-label="Controles do redimensionador">
                <div class="panel__head">
                  <div class="panel__label">Variantes</div>
                </div>

                <div class="file-picker">
                  <button class="btn btn-primary" id="btn-pick-resize-images" type="button">Selecionar imagens</button>
                  <span class="file-picker__hint">Arraste PNG, JPG, JPEG ou WebP para a area de imagens</span>
                </div>
                <input class="visually-hidden" id="resize-image-input" type="file" accept="image/png,image/jpeg,image/webp" multiple>

                <div class="control-group">
                  <span class="field-label">Breakpoints</span>
                  <div class="resize-breakpoints" id="resize-breakpoints"></div>
                  <button class="btn btn-ghost resize-add" id="btn-add-resize-breakpoint" type="button">Adicionar medida</button>
                  <div class="resize-name-preview" id="resize-name-preview"></div>
                </div>

                <div class="control-group">
                  <span class="field-label">Formato final</span>
                  <div class="segmented" id="resize-format-options">
                    <button class="segment is-active" type="button" data-resize-format="webp">WebP</button>
                    <button class="segment" type="button" data-resize-format="jpg">JPG</button>
                    <button class="segment" type="button" data-resize-format="both">Ambos</button>
                  </div>
                </div>

                <div class="control-group">
                  <label class="field-label" for="resize-quality-range">Qualidade</label>
                  <div class="range-row">
                    <input id="resize-quality-range" type="range" min="50" max="100" value="80">
                    <span class="range-value" id="resize-quality-value">80%</span>
                  </div>
                </div>

                <div class="resize-progress is-hidden" id="resize-progress">
                  <div class="resize-progress__track">
                    <div class="resize-progress__fill" id="resize-progress-fill"></div>
                  </div>
                  <div class="resize-progress__label" id="resize-progress-label">aguardando</div>
                </div>

                <div class="actions actions--stack">
                  <button class="btn btn-primary" id="btn-generate-resize-zip" disabled>Gerar ZIP</button>
                  <button class="btn btn-ghost" id="btn-clear-resize-images" disabled>Limpar</button>
                </div>
              </aside>

              <section class="resizer-results">
                <div class="panel__head">
                  <div class="panel__label">Imagens</div>
                  <div class="panel__label panel__badge" id="resize-badge">0 arquivos</div>
                </div>
                <div class="resizer-output">
                  <div class="resize-file-list" id="resize-file-list">
                    <div class="empty">
                      <div class="empty__icon">ZIP</div>
                      <div class="empty__text">Adicione imagens para gerar variantes responsivas</div>
                    </div>
                  </div>
                  <div class="resize-log is-hidden" id="resize-log"></div>
                </div>
              </section>
            </div>
          </section>
        </main>
      </div>
    `;
    return wrapper;
  };
})();
