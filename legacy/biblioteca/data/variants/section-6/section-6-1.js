// @ts-nocheck
SenkoLib.registerVariantFile("section-6",
{
  id: "section-6-1",
  name: "section-6-1",
  html: `  <section class="section-6-1" aria-label="Destaque do produto com texto e benefícios">
    <picture>
      <source media="(max-width: 760px)"
        srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-2.png"
        width="780" height="400">
      <img class="section-6-1__image"
        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-1.png"
        alt="Caderno Funny Cat com estampa de gatinhos, capa colorida e espiral" width="1600" height="650"
        loading="lazy" fetchpriority="high" decoding="async">
    </picture>

    <div class="section-6-1__content">
      <h2 class="section-6-1__title">Caderno Funny Cat</h2>
      <p class="section-6-1__description">Organize seus estudos com fofura e estilo!</p>

      <ul class="section-6-1__list">
        <li class="section-6-1__item">
          <img class="section-6-1__icon" src="" alt="" loading="lazy">
          <div class="section-6-1__item-text">
            <h3 class="section-6-1__item-title">Folhas resistentes</h3>
            <p class="section-6-1__item-subtitle">Fáceis de escrever, sem borrar nem rasgar</p>
          </div>
        </li>

        <li class="section-6-1__item">
          <img class="section-6-1__icon" src="" alt="" loading="lazy">
          <div class="section-6-1__item-text">
            <h3 class="section-6-1__item-title">Espiral reforçada</h3>
            <p class="section-6-1__item-subtitle">Construída para durar o ano todo</p>
          </div>
        </li>

        <li class="section-6-1__item">
          <img class="section-6-1__icon" src="" alt="" loading="lazy">
          <div class="section-6-1__item-text">
            <h3 class="section-6-1__item-title">Estampas fofas</h3>
            <p class="section-6-1__item-subtitle">Combinam com o seu estilo</p>
          </div>
        </li>

        <li class="section-6-1__item">
          <img class="section-6-1__icon" src="" alt="" loading="lazy">
          <div class="section-6-1__item-text">
            <h3 class="section-6-1__item-title">Tamanho ideal</h3>
            <p class="section-6-1__item-subtitle">Perfeito para levar à escola ou faculdade</p>
          </div>
        </li>
      </ul>
    </div>
  </section>`,
  css: `  <style>
    /* ===== HERO SECTION — VARIÁVEIS ===== */
    .section-6-1 {
      --pos-y: 50%;
      --pos-x: 7%;
      --color-title: #ffe178;
      --bg-box: rgba(0, 0, 0, 0.33);
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      border-radius: 20px;
      overflow: hidden;
    }

    /* ===== IMAGEM ===== */
    .section-6-1__image {
      width: 100%;
      height: auto;
      display: block;
    }

    /* ===== CONTEÚDO SOBREPOSTO ===== */
    /* Posicionamento original preservado integralmente em telas > 760px */
    .section-6-1__content {
      position: absolute;
      top: var(--pos-y);
      left: clamp(1%, var(--pos-x), 100%);
      transform: translateY(-50%);
      max-width: min(40%, 480px);
      z-index: 10;
      background-color: var(--bg-box);
      padding: clamp(12px, 2vw, 20px);
      border-radius: 15px;
      backdrop-filter: blur(4px);
    }

    .section-6-1__title {
      font-size: clamp(1.4rem, 3.5vw, 2.6rem);
      color: var(--color-title);
      margin: 0 0 10px;
      line-height: 1.2;
      text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
      font-weight: 800;
    }

    .section-6-1__description {
      font-size: clamp(0.95rem, 2vw, 1.4rem);
      color: #fff;
      margin: 0 0 24px;
      line-height: 1.5;
      text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.35);
    }

    /* ===== LISTA DE BENEFÍCIOS (ÍCONE + TEXTO) ===== */
    .section-6-1__list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: clamp(10px, 1.6vw, 16px);
    }

    .section-6-1__item {
      display: flex;
      align-items: flex-start;
      gap: clamp(8px, 1.2vw, 14px);
      text-align: left;
    }

    .section-6-1__icon {
      flex: 0 0 auto;
      width: clamp(22px, 2.4vw, 30px);
      height: clamp(22px, 2.4vw, 30px);
      object-fit: contain;
      display: block;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.18);
    }

    .section-6-1__item-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .section-6-1__item-title {
      margin: 0;
      font-size: clamp(0.9rem, 1.7vw, 1.1rem);
      font-weight: 700;
      color: #fff;
      line-height: 1.3;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.35);
    }

    .section-6-1__item-subtitle {
      margin: 0;
      font-size: clamp(0.78rem, 1.4vw, 0.95rem);
      font-weight: 400;
      color: #fff;
      line-height: 1.35;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.35);
    }

    /* ===== MOBILE ===== */
    @media (max-width: 760px) {
      .section-6-1 {
        border-radius: 0;
      }

      .section-6-1__content {
        position: static;
        transform: none;
        max-width: 100%;
        padding: 24px 20px 20px;
        background: transparent;
        backdrop-filter: none;
        text-align: center;
      }

      .section-6-1__title {
        font-size: 1.8rem;
        color: #333;
        text-shadow: none;
      }

      .section-6-1__description {
        margin-bottom: 20px;
        font-size: 1.1rem;
        color: #555;
        text-shadow: none;
      }

      /* a lista desce para baixo do bloco de texto, mesma ideia do layout */
      .section-6-1__list {
        margin-top: 4px;
        gap: 14px;
      }

      .section-6-1__item {
        text-align: left;
      }

      .section-6-1__item-title,
      .section-6-1__item-subtitle {
        color: #333;
        text-shadow: none;
      }

      .section-6-1__item-title {
        font-size: 1.05rem;
      }

      .section-6-1__item-subtitle {
        font-size: 0.92rem;
      }

      .section-6-1__image {
        width: 95%;
        margin: auto;
        height: auto;
        display: block;
        border-radius: 20px;
      }
    }

    @media (max-width: 480px) {
      .section-6-1__title {
        font-size: 1.5rem;
      }

      .section-6-1__description {
        font-size: 1rem;
      }
    }
  </style>`
}
);
