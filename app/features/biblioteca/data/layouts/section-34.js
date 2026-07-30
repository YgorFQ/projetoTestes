// @ts-nocheck
SenkoLib.registerLayout(
{
    id: 'section-34',
    name: 'Section-34',
    tags: ['fotos', 'split', '34'],
    html: `  <div class="section-34">
    <section class="section-34__container" aria-label="Hero Polaroids">
      <div class="section-34__left">
        <div class="section-34__polaroid-main">
          <picture>
            <source media="(max-width: 760px)"
              srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-2.png">
            <img
              src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-1.png"
              alt="Caderno Funny Cat" loading="lazy">
          </picture>
          <span class="section-34__polaroid-label">Funny Cat ♡</span>
        </div>
        <div class="section-34__polaroid-mini">
          <div class="section-34__tape"></div>
          <picture>
            <source media="(max-width: 760px)"
              srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-2.png">
            <img
              src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-1.png"
              alt="detalhe" loading="lazy">
          </picture>
        </div>
      </div>
      <div class="section-34__right">
        <h2 class="section-34__title">Caderno Funny Cat</h2>
        <p class="section-34__desc">Organize seus estudos com fofura e estilo. Design exclusivo para quem ama gatos, com
          capa
          colorida e espiral resistente.</p>
      </div>
    </section>
  </div>`,
    css: `  <style>
    .section-34 {
      max-width: 1100px;
      margin: 0 auto 60px;
      padding: 0 20px;
    }

    .section-34__container {
      --accent: #06b6d4;
      --bg: #f8faff;
      background: var(--bg);
      border-radius: 20px;
      overflow: hidden;
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      align-items: center;
      min-height: 420px;
      position: relative;
    }

    .section-34__container::after {
      content: '';
      position: absolute;
      bottom: -60px;
      left: -60px;
      width: 260px;
      height: 260px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(6, 182, 212, 0.1), transparent 70%);
      pointer-events: none;
    }

    .section-34__left {
      position: relative;
      min-height: 420px;
      padding: 32px;
    }

    .section-34__polaroid-main {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-3deg);
      background: #fff;
      padding: 10px 10px 40px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.14), 0 2px 8px rgba(0, 0, 0, 0.08);
      border-radius: 3px;
      width: 75%;
      max-width: 280px;
      transition: transform 0.4s ease;
    }

    .section-34__container:hover .section-34__polaroid-main {
      transform: translate(-50%, -52%) rotate(-1deg);
    }

    .section-34__polaroid-main img {
      width: 100%;
      aspect-ratio: 1/0.9;
      object-fit: cover;
      display: block;
    }

    .section-34__polaroid-label {
      text-align: center;
      font-size: 1.1rem;
      color: #444;
      padding-top: 10px;
      font-style: italic;
    }

    .section-34__polaroid-mini {
      position: absolute;
      bottom: 28px;
      right: 26px;
      background: #fff;
      padding: 7px 7px 30px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      border-radius: 3px;
      width: 38%;
      max-width: 130px;
      transform: rotate(6deg);
      transition: transform 0.4s ease;
      z-index: 3;
    }

    .section-34__container:hover .section-34__polaroid-mini {
      transform: rotate(3deg) scale(1.04);
    }

    .section-34__polaroid-mini img {
      width: 100%;
      aspect-ratio: 1/0.9;
      object-fit: cover;
      display: block;
      filter: saturate(0.85);
    }

    .section-34__tape {
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%) rotate(-2deg);
      width: 40px;
      height: 18px;
      background: rgba(6, 182, 212, 0.35);
      border-radius: 2px;
      z-index: 4;
    }

    .section-34__right {
      padding: clamp(24px, 3.5vw, 52px) clamp(24px, 3.5vw, 52px) clamp(24px, 3.5vw, 52px) 0;
      position: relative;
      z-index: 2;
    }

    .section-34__title {
      font-size: clamp(1.6rem, 3vw, 2.6rem);
      font-weight: 900;
      color: #0f1a2a;
      line-height: 1.15;
      margin-bottom: 14px;
    }

    .section-34__desc {
      font-size: clamp(0.9rem, 1.4vw, 1rem);
      color: #6a7a8a;
      line-height: 1.68;
      margin-bottom: 28px;
    }

    @media (max-width: 760px) {
      .section-34__container {
        grid-template-columns: 1fr;
        min-height: auto;
      }

      .section-34__left {
        min-height: 320px;
      }

      .section-34__right {
        padding: 8px 24px 36px;
      }

      .section-34__title {
        font-size: 1.7rem;
      }
    }
  </style>`
}
);
