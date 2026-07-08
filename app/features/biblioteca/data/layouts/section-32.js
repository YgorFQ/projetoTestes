// @ts-nocheck
SenkoLib.registerLayout(
{
  id: "section-32",
  name: "section-32",
  tags: ["section-32", "32", "imagem", "hero", "32.11"],
  html: `<section class="section-32__container" aria-label="Destaque visual do produto">
  <figure class="section-32__groupimage-section">
    <picture>
      <source
        media="(max-width: 430px)"
        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-10-unidades-410376-02.jpg?ims=430x">

      <source
        media="(max-width: 768px)"
        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-10-unidades-410376-02.jpg?ims=768x">

      <source
        media="(max-width: 1024px)"
        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-10-unidades-410376-02.jpg?ims=1024x">

      <source
        media="(max-width: 1280px)"
        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-10-unidades-410376-02.jpg?ims=1238x">

      <source
        media="(max-width: 1440px)"
        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-10-unidades-410376-02.jpg?ims=1440x">

      <source
        media="(min-width: 1441px)"
        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-10-unidades-410376-02.jpg">

      <img
        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-10-unidades-410376-02.jpg"
        alt="Kit de fixação para telha Precon Tubozan com parafusos autobrocantes em embalagem"
        style="border-radius: 30px;" width="1600"height="865" loading="eager" decoding="async" fetchpriority="high"> <!-- todos os que vierem depois do primeiro, devem ter loading="lazy" e fetchpriority="low" -->
    </picture>

    <figcaption
      class="section-32__grouptext-overlay left grouptext-overlay-Background"
      style="top: 50%; left: 25%; max-width: 40%;">
      <h2><strong>FIXAÇÃO PRECON PARA TELHA</strong></h2>
      <p>
        O kit Precon Tubozan é de fixação para telha, com 10 parafusos metálicos autobrocantes e tampa de acabamento.
      </p>
    </figcaption>
  </figure>
</section>`,
  css: `<style>
  .section-32__container {
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    border: 5.5px solid #000;
    border-radius: 36px;
  }

  .section-32__groupimage-section {
    position: relative;
    width: 100%;
    margin: 0;
    contain: layout style;
    isolation: isolate;
  }

  .section-32__groupimage-section img {
    width: 100%;
    height: auto;
    display: block;
    min-width: 100%;
  }

  .section-32__grouptext-overlay {
    color: #fff;
    position: absolute;
    max-width: 50%;
    width: 90%;
    line-height: 2rem;
    text-align: center;
    font-family: sans-serif;
    z-index: 20;
  }

  .section-32__grouptext-overlay.left {
    top: 50%;
    left: 25%;
    transform: translate(-50%, -50%);
    max-width: 45%;
  }

  .section-32__grouptext-overlay h2 {
    font-size: 2vw;
    font-weight: bold;
    margin-bottom: 1.5px;
    line-height: 120%;
  }

  .section-32__grouptext-overlay p {
    font-size: 1.2vw;
    margin: 0;
    line-height: 120%;
  }

  .grouptext-overlay-Background {
    background: rgba(0, 0, 0, 0.438);
    border-radius: 2.8vw;
    padding: 0.5rem;
    backdrop-filter: blur(0.5vw);
    -webkit-backdrop-filter: blur(0.5vw);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.3);
    max-width: 70%;
    z-index: 20;
  }

  @media (prefers-contrast: more) {
    .grouptext-overlay-Background {
      background: #000;
    }
  }

  @media (max-width: 960px) {
    .section-32__grouptext-overlay h2 {
      font-size: 2.1vw;
    }

    .section-32__grouptext-overlay p {
      font-size: 1.5vw;
    }
  }

  @media (max-width: 768px) {
    .section-32__grouptext-overlay h2 {
      font-size: 2.5vw;
    }

    .section-32__grouptext-overlay p {
      font-size: 2vw;
    }
  }

  @media (max-width: 500px) {
    .section-32__grouptext-overlay {
      max-width: 50%;
    }

    .section-32__grouptext-overlay h2 {
      font-size: 3vw;
    }

    .section-32__grouptext-overlay p {
      font-size: 2.3vw;
    }
  }

  @media (max-width: 470px) {
    .section-32__grouptext-overlay p {
      font-size: 2.4vw;
    }
  }

  @media (max-width: 375px) {
    .section-32__grouptext-overlay p {
      font-size: 2.8vw;
    }
  }
</style>`
}
);
