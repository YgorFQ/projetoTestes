// @ts-nocheck
SenkoLib.registerLayout(
{
  id: "section-14",
  name: "Section-14",
  tags: ["Section-14", "14"],
  html: `<div class="section-14-container">
  <section class="section-14" aria-labelledby="section14-title">

    <header class="section-14__header">
      <h3 class="section-14__title" id="section14-title">SUB-TÍTULO</h3>
      <p class="section-14__description">
        Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
        Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
        Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
      </p>
    </header>

    <div class="section-14__body">

      <div class="section-14__column section-14__column--left">
        <article class="section-14__feature">
          <img
            class="section-14__icon" loading="lazy"
            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/check2.png"
            width="56" height="56"
            alt="Ícone de confirmação representando a característica 1"
          >
          <h4 class="section-14__feature-title">Característica 1</h4>
          <p class="section-14__feature-text">Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.</p>
        </article>

        <article class="section-14__feature">
          <img
            class="section-14__icon"
            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/check2.png"
            width="56" height="56"
            alt="Ícone de confirmação representando a característica 2"
          >
          <h4 class="section-14__feature-title">Característica 2</h4>
          <p class="section-14__feature-text">Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.</p>
        </article>
      </div>

      <figure class="section-14__image-wrap">
        <img
          class="section-14__image"
          src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao4.jpg"
          width="780" height="740"
          alt="Produto em destaque demonstrando suas principais características de uso no dia a dia"
        >
      </figure>

      <div class="section-14__column section-14__column--right">
        <article class="section-14__feature">
          <img
            class="section-14__icon"
            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/check2.png"
            width="56" height="56"
            alt="Ícone de confirmação representando a característica 3"
          >
          <h4 class="section-14__feature-title">Característica 3</h4>
          <p class="section-14__feature-text">Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.</p>
        </article>

        <article class="section-14__feature">
          <img
            class="section-14__icon"
            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/check2.png"
            width="56" height="56"
            alt="Ícone de confirmação representando a característica 4"
          >
          <h4 class="section-14__feature-title">Característica 4</h4>
          <p class="section-14__feature-text">Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.</p>
        </article>
      </div>

    </div>
  </section>
</div>`,
  css: `  <style>
    /* ── CONTAINER UNIVERSAL ── */
    .section-14-container {
      padding-top: 1.2rem;
      padding-bottom: 1.2rem;
    }

    @media (min-width: 768px) {
      .section-14-container {
        max-width: 768px;
        margin-inline: auto;
      }
    }

    @media (min-width: 992px) {
      .section-14-container {
        max-width: 992px;
      }
    }

    @media (min-width: 1200px) {
      .section-14-container {
        max-width: 1200px;
      }
    }

    @media (min-width: 1536px) {
      .section-14-container {
        max-width: 1536px;
      }
    }

    /* ── HEADER ── */
    .section-14__header {
      text-align: center;
      margin-bottom: 40px;
      padding-inline: 16px;
    }

    .section-14__title {
      font-size: 2rem;
      font-weight: 900;
      color: #111;
      margin: 0 0 16px;
      line-height: 1.1;
    }

    .section-14__description {
      font-size: 0.9375rem;
      color: #555;
      max-width: 700px;
      margin-inline: auto;
      line-height: 1.6;
    }

    /* ── BODY: mobile — coluna única ── */
    .section-14__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
      padding-inline: 16px;
    }

    /* ── FEATURE BLOCK ── */
    .section-14__feature {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 15px 16px;
    }

    .section-14__icon {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      margin-bottom: 12px;
      padding: 10px;
      background: #ff9100;
      flex-shrink: 0;
    }

    .section-14__feature-title {
      font-size: 1rem;
      font-weight: 700;
      color: #111;
      margin: 0 0 8px;
    }

    .section-14__feature-text {
      font-size: 0.875rem;
      color: #666;
      line-height: 1.5;
      margin: 0;
    }

    /* ── IMAGEM CENTRAL ── */
    .section-14__image-wrap {
      width: 100%;
    }

    .section-14__image {
      display: block;
      width: 100%;
      height: auto;
      object-fit: cover;

    }

    /* ── COLUNA DE FEATURES ── */
    .section-14__column {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    /* ─────────────────────────────────────────────────
      @media 768px — imagem central com features
      sobrepostas nas bordas (layout imagem 2)
  ───────────────────────────────────────────────── */
    @media (min-width: 768px) {
      .section-14__body {
        position: relative;
        flex-direction: row;
        align-items: stretch;
        padding-inline: 0;
      }

      .section-14__column {
        width: auto;
        flex: 0 0 220px;
        justify-content: space-around;
        z-index: 2;
      }

      .section-14__column--left {
        align-items: flex-start;
      }

      .section-14__column--right {
        align-items: flex-end;
      }

      .section-14__image-wrap {
        flex: 1;
        min-width: 0;
        position: relative;
      }

      .section-14__image {
        height: 100%;
        border-radius: 16px;
        object-fit: cover;
      }

      .section-14__feature {
        align-items: flex-start;
        text-align: left;
        padding: 12px 16px;
      }

      .section-14__column--right .section-14__feature {
        align-items: flex-end;
        text-align: right;
      }
    }

    @media (max-width: 767px) {
      .section-14__image {
        object-fit: cover;
        width: 84%;
        aspect-ratio: 9 / 6;
        margin: auto;
        border-radius: 20px;
      }
    }

    @media (min-width: 992px) {
      .section-14__image {
        object-fit: cover;
        width: 88%;
        margin: auto;
      }
    }

    /* ─────────────────────────────────────────────────
      @media 1200px — 3 colunas separadas (layout imagem 3):
      col-esq | imagem | col-dir, sem sobreposição
  ───────────────────────────────────────────────── */
    @media (min-width: 1200px) {
      .section-14__body {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 48px;
      }

      .section-14__column {
        width: 90%;
        margin: auto;
        gap: 58px;
        justify-content: flex-start;
      }

      .section-14__column--left {
        align-items: flex-start;
      }

      .section-14__column--right {
        align-items: flex-end;
      }

      .section-14__image-wrap {
        flex: unset;
        width: 420px;
      }

      .section-14__image {
        height: auto;
        border-radius: 4px;
        border-radius: 18px;
      }

      .section-14__feature {
        padding: 0;
      }
    }
  </style>`
}
);
