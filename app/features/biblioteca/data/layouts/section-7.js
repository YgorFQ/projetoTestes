// @ts-nocheck
SenkoLib.registerLayout(
{
  id: "section-7",
  name: "Section-7",
  tags: ["Fallitens", "section 7", "7"],
  html: `<section class="section-7__banner" style="--d1:0.1; --d2:0.7; --d3:0.3; --d4:0.5; --d5:0.2;"
  aria-label="Banner promocional">
  <!-- Falling items (decorativos, aria-hidden) -->
  <img class="section-7__falling-item" loading="lazy"
    src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo-efacil.png"
    width="200" height="200" aria-hidden="true" alt="">
  <img class="section-7__falling-item" loading="lazy"
    src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo-efacil.png"
    width="200" height="200" aria-hidden="true" alt="">
  <img class="section-7__falling-item" loading="lazy"
    src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo-efacil.png"
    width="200" height="200" aria-hidden="true" alt="">
  <img class="section-7__falling-item" loading="lazy"
    src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo-efacil.png"
    width="200" height="200" aria-hidden="true" alt="">
  <img class="section-7__falling-item" loading="lazy"
    src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo-efacil.png"
    width="200" height="200" aria-hidden="true" alt="">
  <!-- Imagem de fundo -->
  <img class="section-7__banner-image" loading="lazy"
    src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao32.jpg"
    width="1600" height="865" alt="Produto em destaque — qualidade, praticidade e estilo no dia a dia">
  <!-- Overlay de texto -->
  <figcaption class="section-7__grouptext-overlay bottom">
    <p style="color: #ffffff;">Isso é uma descrição. Isso é uma descrição.</p>
    <h2 style="color: #ffffff;"><strong>SUB-TÍTULO</strong></h2>
    <p style="color: #ffffff;">Isso é uma descrição. Isso é uma descrição. Isso é uma descrição. Isso é umadescrição.
    </p>
  </figcaption>
</section>`,
  css: `<style>
  :root {
    --fall-duration: 5s;
    --fall-delay-range: 4s;
  }

  .section-7__wrapper {
    width: 100%;
    margin-inline: auto;
  }

  .section-7__banner {
    position: relative;
    width: 100%;
    overflow: hidden;
    margin: -1px;
  }

  .section-7__banner-image {
    width: 100%;
    height: auto;
    display: block;
  }

  .section-7__grouptext-overlay {
    position: absolute;
    max-width: 40%;
    width: 90%;
    line-height: 1.5;
    text-align: center;
    font-family: sans-serif
  }

  .section-7__grouptext-overlay.top {
    top: 3%;
    left: 50%;
    transform: translateX(-50%);
  }

  .section-7__grouptext-overlay.bottom {
    top: 84%;
    left: 50%;
    transform: translateX(-50%);
  }

  .section-7__grouptext-overlay.left {
    top: 50%;
    left: 25%;
    transform: translate(-50%, -50%);
    max-width: 41%;
  }

  .section-7__grouptext-overlay.right {
    top: 50%;
    left: 75%;
    transform: translate(-50%, -50%);
    max-width: 42%;
  }

  .section-7__grouptext-overlay h2 {
    font-size: 2vw;
    font-weight: bold;
    margin-bottom: 1.5px;
    line-height: 120%;
  }

  .section-7__grouptext-overlay p {
    font-size: 1.1vw;
    margin: 0;
    line-height: 120%;
  }

  @media (max-width: 960px) {
    .section-7__grouptext-overlay h2 {
      font-size: 2.1vw;
    }

    .section-7__grouptext-overlay p {
      font-size: 1.5vw;
    }
  }

  @media (max-width: 768px) {
    .section-7__grouptext-overlay h2 {
      font-size: 2.5vw;
    }

    .section-7__grouptext-overlay p {
      font-size: 1.8vw;
    }
  }

  @media (max-width: 500px) {
    .section-7__grouptext-overlay h2 {
      font-size: 3vw;
    }

    .section-7__grouptext-overlay p {
      font-size: 2.3vw;
    }
  }

  @media (max-width: 480px) {
    .section-7__grouptext-overlay h2 {
      font-size: 3vw;
    }

    .section-7__grouptext-overlay p {
      font-size: 2.3vw;
    }
  }

  @media (max-width: 1060px) {
    .section-7__grouptext-overlay.top {
      top: 3%;
    }
  }

  @media (max-width: 960px) {
    .section-7__grouptext-overlay.top {
      top: 3%;
    }
  }

  @media (max-width: 768px) {
    .section-7__grouptext-overlay.top {
      top: 3%;
    }
  }

  @media (max-width: 500px) {
    .section-7__grouptext-overlay.top {
      top: 3%;
    }
  }

  @media (max-width: 480px) {
    .section-7__grouptext-overlay.top {
      top: 3%;
    }
  }

  @media (max-width: 1060px) {
    .section-7__grouptext-overlay.bottom {
      top: 81%;
    }
  }

  @media (max-width: 960px) {
    .section-7__grouptext-overlay.bottom {
      top: 79%
    }
  }

  @media (max-width: 480px) {
    .section-7__grouptext-overlay.bottom {
      top: 81%
    }
  }

  @media (max-width: 768px) {
    .section-7__grouptext-overlay.bottom {
      top: 76%;
    }
  }

  @media (max-width: 500px) {
    .section-7__grouptext-overlay.bottom {
      top: 67%;
    }
  }

  @media (max-width: 480px) {

    .section-7__grouptext-overlay.right {
      top: 50%;
      left: 73%;
      transform: translate(-50%, -50%);
    }
  }

  @media (max-width: 480px) {

    .section-7__grouptext-overlay.left {
      top: 50%;
      left: 27%;
      transform: translate(-50%, -50%);
    }
  }

  .section-7__falling-item {
    position: absolute;
    top: -100px;
    width: 8vw;
    height: 8vw;
    opacity: 0;
    z-index: 10;
    transform-origin: center;
    animation: fall var(--fall-duration) infinite linear;
    pointer-events: none;
    user-select: none;
  }

  .section-7__falling-item:nth-child(1) {
    left: 10%;
    --start-rot: -30deg;
    --end-rot: 360deg;
    animation-delay: calc(var(--fall-delay-range) * var(--d1, 0.1));
  }

  .section-7__falling-item:nth-child(2) {
    left: 30%;
    --start-rot: 20deg;
    --end-rot: 360deg;
    animation-delay: calc(var(--fall-delay-range) * var(--d2, 0.7));
  }

  .section-7__falling-item:nth-child(3) {
    left: 50%;
    --start-rot: -45deg;
    --end-rot: 360deg;
    animation-delay: calc(var(--fall-delay-range) * var(--d3, 0.3));
  }

  .section-7__falling-item:nth-child(4) {
    left: 70%;
    --start-rot: 15deg;
    --end-rot: 360deg;
    animation-delay: calc(var(--fall-delay-range) * var(--d4, 0.5));
  }

  .section-7__falling-item:nth-child(5) {
    left: 90%;
    --start-rot: 45deg;
    --end-rot: 360deg;
    animation-delay: calc(var(--fall-delay-range) * var(--d5, 0.2));
  }

  @keyframes fall {
    0% {
      transform: translateY(-100px) rotate(var(--start-rot));
      opacity: 1;
    }

    90% {
      opacity: 1;
    }

    100% {
      transform: translateY(110vh) rotate(var(--end-rot));
      opacity: 0;
    }
  }
</style>`
}
);
