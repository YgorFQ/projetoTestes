// @ts-nocheck
SenkoLib.registerLayout(
  {
    id: "section-12",
    name: "Section-12",
    tags: ["Section-12", "12", "full width", "slide"],
    html: `        <section class="section-12-container">
            <figure class="section-12 section-12--minimal" aria-label="Comparador antes e depois minimalista">
                <div class="section-12__wrapper">
                    <img class="section-12__image-after" loading="lazy" decoding="async"
                        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/philco/smart-tv-philco-4k-uhd-tecnologia-hdr10-otimizada-01577-22-11928-10.png"
                        alt="Tecnologia HDR10 e 4K UHD em Smart TV Philco proporcionando brilho e nitidez superior" />
                    <img class="section-12__image-before" loading="lazy" decoding="async"
                        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/philco/smart-tv-philco-4k-uhd-qualidade-imagem-padrao-01577-22-11928-09.png"
                        alt="Comparativo de qualidade imagem normal em Smart TV Philco exibindo paisagem de aurora boreal" />
                    <div class="section-12__divider"></div>
                </div>
                <figcaption style="text-align: center; margin-top: 10px; color: #444;">Tecnologia SDR para HDR: Cores
                    mais vivas
                    e pretos mais profundos</figcaption>
            </figure>
        </section>`,
    css: `  <style>
    .section-12-container {
      padding-top: 1rem;
      padding-bottom: 0;
      border-radius: 12px;
    }

    .section-12 {
      width: 95%;
      margin-left: auto;
      margin-right: auto;
    }

    .section-12__wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .section-12__image-after {
      display: block;
      width: 100%;
      height: auto;
      border-radius: 12px;
    }

    .section-12__image-before {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      clip-path: inset(0 50% 0 0);
      animation: s12-reveal 4s ease-in-out infinite alternate;
      border-radius: 12px;
    }

    .section-12__divider {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 3px;
      background-color: #fff;
      transform: translateX(-50%);
      animation: s12-line 4s ease-in-out infinite alternate;
    }

    .section-12__handle {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, -50%);
      animation: s12-line 4s ease-in-out infinite alternate;
    }

    .section-12__handle-arrows {
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .section-12__arrow--left {
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: 8px solid #333;
    }

    .section-12__arrow--right {
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 8px solid #333;
    }

    @keyframes s12-reveal {
      0% {
        clip-path: inset(0 90% 0 0);
      }

      100% {
        clip-path: inset(0 10% 0 0);
      }
    }

    @keyframes s12-line {
      0% {
        left: 10%;
      }

      100% {
        left: 90%;
      }
    }

    /* Variação: sem handle */
    .section-12--minimal .section-12__handle {
      display: none;
    }

    @media (min-width: 768px) {
      .section-12 {
        max-width: 768px;
      }
    }

    @media (min-width: 992px) {
      .section-12 {
        max-width: 992px;
      }
    }

    @media (min-width: 1200px) {
      .section-12 {
        max-width: 1200px;
      }
    }

    @media (min-width: 1536px) {
      .section-12 {
        max-width: unset;
      }
    }
  </style>`
  }
);
