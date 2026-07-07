// @ts-nocheck
SenkoLib.registerVariant('section-32', [
/*@@@@Senko - variacao1 */
  {
    name: 'variacao1',
    html: `        <section class="section-32__container" aria-label="Seção de destaque do produto">
            <figure class="section-32__groupimage-section">
                <picture class="section-32__groupimage-section">
                    <source media="(max-width: 430px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/purificador-colormaq-eletronico-padrao-gotas-azul-2218413-04.jpg?ims=430x">

                    <source media="(max-width: 768px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/purificador-colormaq-eletronico-padrao-gotas-azul-2218413-04.jpg?ims=768x">

                    <source media="(max-width: 1024px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/purificador-colormaq-eletronico-padrao-gotas-azul-2218413-04.jpg?ims=1024x">

                    <source media="(max-width: 1238px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/purificador-colormaq-eletronico-padrao-gotas-azul-2218413-04.jpg?ims=1238x">

                    <source media="(max-width: 1440px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/purificador-colormaq-eletronico-padrao-gotas-azul-2218413-04.jpg?ims=1440x">

                    <source media="(min-width: 1441px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/purificador-colormaq-eletronico-padrao-gotas-azul-2218413-04.jpg">

                    <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/purificador-colormaq-eletronico-padrao-gotas-azul-2218413-04.jpg"
                        alt="Padrão textura gotas água fundo azul Purificador Colormaq Eletrônico"
                        style="border-radius: 0px 0px 30px 30px;" width="1600" height="865" loading="lazy"
                        decoding="async" fetchpriority="low">
                    <figcaption class="section-32__grouptext-overlay left">
                        <p style="color: #faca95;">Isso é uma descrição. Isso é uma descrição.</p>
                        <h2 style="color: #faca95;"><strong>SUB-TÍTULO</strong></h2>
                        <p style="color: #faca95;">Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                            Isso é
                            umadescrição.</p>
                    </figcaption>
            </figure>
        </section>`,
    css: `  <style>
    .section-32__container {
      width: 100%;
      max-width: 1600px;
      margin: 0 auto;
    }

    .section-32__groupimage-section {
      position: relative;
      width: 100%;
      margin: 0;
      contain: layout style;
    }

    .section-32__groupimage-section img {
      width: 100%;
      height: auto;
      display: block;
    }

    .section-32__grouptext-overlay {
      position: absolute;
      max-width: 40%;
      width: 90%;
      line-height: 1.5;
      text-align: center;
      font-family: sans-serif
    }

    .section-32__grouptext-overlay.top {
      top: 3%;
      left: 50%;
      transform: translateX(-50%);
    }

    .section-32__grouptext-overlay.bottom {
      top: 84%;
      left: 50%;
      transform: translateX(-50%);
    }

    .section-32__grouptext-overlay.left {
      top: 50%;
      left: 25%;
      transform: translate(-50%, -50%);
      max-width: 41%;
    }

    .section-32__grouptext-overlay.right {
      top: 50%;
      left: 75%;
      transform: translate(-50%, -50%);
      max-width: 42%;
    }

    .section-32__grouptext-overlay h2 {
      font-size: 2vw;
      font-weight: bold;
      margin-bottom: 1.5px;
      line-height: 120%;
    }

    .section-32__grouptext-overlay p {
      font-size: 1.1vw;
      margin: 0;
      line-height: 120%;
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
        font-size: 1.8vw;
      }
    }

    @media (max-width: 500px) {
      .section-32__grouptext-overlay h2 {
        font-size: 3vw;
      }

      .section-32__grouptext-overlay p {
        font-size: 2.3vw;
      }
    }

    @media (max-width: 480px) {
      .section-32__grouptext-overlay h2 {
        font-size: 3vw;
      }

      .section-32__grouptext-overlay p {
        font-size: 2.3vw;
      }
    }

    @media (max-width: 1060px) {
      .section-32__grouptext-overlay.top {
        top: 3%;
      }
    }

    @media (max-width: 960px) {
      .section-32__grouptext-overlay.top {
        top: 3%;
      }
    }

    @media (max-width: 768px) {
      .section-32__grouptext-overlay.top {
        top: 3%;
      }
    }

    @media (max-width: 500px) {
      .section-32__grouptext-overlay.top {
        top: 3%;
      }
    }

    @media (max-width: 480px) {
      .section-32__grouptext-overlay.top {
        top: 3%;
      }
    }

    @media (max-width: 1060px) {
      .section-32__grouptext-overlay.bottom {
        top: 81%;
      }
    }

    @media (max-width: 960px) {
      .section-32__grouptext-overlay.bottom {
        top: 79%
      }
    }

    @media (max-width: 480px) {
      .section-32__grouptext-overlay.bottom {
        top: 81%
      }
    }

    @media (max-width: 768px) {
      .section-32__grouptext-overlay.bottom {
        top: 76%;
      }
    }

    @media (max-width: 500px) {
      .section-32__grouptext-overlay.bottom {
        top: 67%;
      }
    }
    
    @media (max-width: 480px) {

      .section-32__grouptext-overlay.right {
        top: 50%;
        left: 73%;
        transform: translate(-50%, -50%);
      }
    }

    @media (max-width: 480px) {

      .section-32__grouptext-overlay.left {
        top: 50%;
        left: 27%;
        transform: translate(-50%, -50%);
      }
    }

    .grouptext-overlay-Background {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4.5vw;
        padding: 0.5rem;
        backdrop-filter: blur(0.8vw);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        -webkit-backdrop-filter: blur(10px);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255, 255, 255, 0.3);
        max-width: 70%;
        z-index: 100;
    }
  </style>`,
  },
/*@@@@Senko - varicao-2 */
  {
    name: 'varicao-2',
    html: `<section class="section-32__container" aria-label="Destaque visual do produto">
    <figure class="section-32__groupimage-section">
        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-10-unidades-410376-02.jpg"
            alt="Kit de fixação para telha Precon Tubozan com parafusos autobrocantes em embalagem" width="1600"
            height="865" loading="eager" decoding="async" style="border-radius: 30px;">
        <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background"
            style="top: 50%; left: 25%; max-width: 40%;">
            <h2><strong>FIXAÇÃO PRECON PARA TELHA</strong></h2>
            <p>O kit Precon Tubozan é de fixação para telha, com 10 parafusos metálicos autobrocantes e tampa de
                acabamento</p>
        </figcaption>
    </figure>
</section>`,
    css: `<style>
    .section-32__container {
        width: 100%;
        max-width: 1600px;
        margin: 0 auto;
    }

    .section-32__groupimage-section {
        position: relative;
        width: 100%;
        margin: 0;
    }

    .section-32__groupimage-section img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 30px;
    }

    .section-32__grouptext-overlay {
        position: absolute;
        top: 50%;
        left: 25%;
        transform: translate(-50%, -50%);
        max-width: 40%;
        color: #fff;
        text-align: center;
        font-family: sans-serif;
        z-index: 20;
    }

    .grouptext-overlay-Background {
        background: rgba(0, 0, 0, 0.438);
        border-radius: 2.8vw;
        padding: 0.5rem;
        backdrop-filter: blur(0.5vw);
        -webkit-backdrop-filter: blur(0.5vw);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    @media (prefers-contrast: more) {
        .grouptext-overlay-Background {
            background: #000;
        }
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
</style>`,
  },
]);
