// @ts-nocheck
/* ═══════════════════════════════════════════════════════
   layouts001.js — Layouts: Header
   Para adicionar mais layouts neste arquivo, copie um
   objeto abaixo e cole antes do fechamento do array ].
   Para criar um novo arquivo de layouts, veja o README
   no index.html ou siga o padrão deste arquivo.
═══════════════════════════════════════════════════════ */

SenkoLib.register([

  /*@@@@Senko - section-1 */
  /* variantes: variants/section-1.js */
  {
    id: 'section-1',
    name: 'Section-1 (Header Imagem)',
    tags: ['header imagem', 'section-1', '1', 'section 1'],
    html: `<section class="product-header" aria-label="Cabeçalho do produto">
  <header class="product-header__banner">
    <figure style="width:100%;height:100%;margin:0;">
      <img
        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/header.jpg"
        alt="Banner do produto" class="product-header__banner-img" loading="eager">
    </figure>

    <div class="product-header__badge" role="img" aria-label="Logo da marca">
      <img
        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo.png"
        alt="imagem png com ícone da marca" class="product-header__badge-img">
    </div>
  </header>

  <article class="product-header__body">
    <small class="product-header__brand">Marca</small>
    <h1 class="product-header__title">
      TÍTULO DO PRODUTO GAMERE (Nome, modelo, diferencial...)
    </h1>
    <p class="product-header__subtitle">
      Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
      Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
      Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
    </p>
  </article>
</section>`,
    css: `<style>
  *{
    margin: 0;
    padding: 0;
  }

  .product-header {
    --badge-size: 8rem;
    --banner-height: 250px;

    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: relative;
    font-family: sans-serif;
    container-type: inline-size;
  }

  .product-header__banner {
    width: 100%;
    height: var(--banner-height);
    position: relative;
    display: flex;
    justify-content: center;
  }

  .product-header__banner figure {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .product-header__banner-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .product-header__badge {
    position: absolute;
    bottom: calc(var(--badge-size) / -2);
    width: var(--badge-size);
    height: var(--badge-size);
    background-color: #ff9900;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 10;
  }

  .product-header__badge-img {
    max-width: 90px;
    max-height: 90px;
    object-fit: contain;
  }

  .product-header__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: calc(var(--badge-size) / 2 + 1.1rem) 0.3rem 2.5rem;
    text-align: center;
  }

  .product-header__brand {
    color: #ff9900;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .product-header__title {
    font-size: clamp(1.4rem, 4vw, 2.4rem);
    line-height: clamp(1.6rem, 4vw, 3.1rem);
    font-weight: 600;
    max-width: 50rem;
    text-wrap: pretty;
  }

  .product-header__subtitle {
    color: #8a8a8a;
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 120%;
    margin-top: 1rem;
    max-width: 52rem;
    text-wrap: pretty;
  }

  @media (max-width: 768px) {
    .product-header {
      --banner-height: 180px;
    }
  }

  @media (max-width: 470px) {
    .product-header__subtitle {
      text-align: justify;
      font-size: clamp(0.9rem, 2vw, 1.2rem);
    }
  }
</style>`
  },

  /*@@@@Senko - section-2 */
  /* variantes: variants/section-2.js */
  {
    id: 'section-2',
    name: 'Section-2 (Header Vídeo)',
    tags: ['Section-2', 'Section 2', '2', 'vídeo', 'header vídeo'],
    html: `<section class="video-header" aria-label="Cabeçalho do produto">
  <header class="video-header__banner">
    <video class="video-header__banner-video" autoplay muted loop playsinline width="1200" height="250"
      aria-hidden="true">
      <source
        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/cottonbaby/header-cottonbaby.mov">
    </video>
    <div class="video-header__badge" role="img" aria-label="Logo da marca">
      <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/cottonbaby/logo-cottonbaby2.png"
        alt="imagem png com ícone da marca" class="video-header__badge-img">
    </div>
  </header>
  <article class="video-header__body">
    <small class="video-header__brand">Marca</small>
    <h1 class="video-header__title">
      TÍTULO DO PRODUTO (Nome, modelo, diferencial...)
    </h1>
    <p class="video-header__subtitle">
      Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
      Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
      Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
    </p>
  </article>
</section>`,
    css: `<style>
  * {
    margin: 0;
    padding: 0;
  }

  .video-header {
    --badge-size: 8rem;
    --banner-height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: relative;
    font-family: sans-serif;
    container-type: inline-size;
  }

  .video-header__banner {
    width: 100%;
    height: var(--banner-height);
    position: relative;
    display: flex;
    justify-content: center;
  }

  .video-header__banner-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
  }

  .video-header__badge {
    position: absolute;
    bottom: calc(var(--badge-size) / -2);
    width: var(--badge-size);
    height: var(--badge-size);
    background-color: #ff9900;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 10;
  }

  .video-header__badge-img {
    max-width: 90px;
    max-height: 90px;
    object-fit: contain;
  }

  .video-header__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: calc(var(--badge-size) / 2 + 1.1rem) 0.3rem 2.5rem;
    text-align: center;
  }

  .video-header__brand {
    color: #ff9900;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .video-header__title {
    font-size: clamp(1.4rem, 4vw, 2.4rem);
    line-height: clamp(1.6rem, 4vw, 3.1rem);
    font-weight: 600;
    max-width: 50rem;
    text-wrap: pretty;
  }

  .video-header__subtitle {
    color: #8a8a8a;
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 120%;
    margin-top: 1rem;
    max-width: 52rem;
    text-wrap: pretty;
  }

  @media (max-width: 768px) {
    .video-header {
      --banner-height: 180px;
    }
  }

  @media (max-width: 470px) {
    .video-header__subtitle {
      text-align: justify;
      font-size: clamp(0.9rem, 2vw, 1.2rem);
    }
  }
</style>`
  },

  /*@@@@Senko - section-4 */
  /* variantes: variants/section-4.js */
  {
    id: 'section-4',
    name: 'Section-4 (Manual de Instrução)',
    tags: ['Section-4', '4', 'Section 4', 'manual de instrução'],
    html: `<section class="section-4-manual__container" aria-label="Manual de Instruções do Produto">
  <figure class="section-4-manual__figura">
    <a href="https://static1.efacil.com.br/wcsstore/AuroraStorefrontAssetStore/PDP/philips-walita/2209713-manual.pdf"
      target="_blank" rel="noopener noreferrer" download title="Baixar manual de instruções do produto"
      class="section-4-manual__link">
      <img
        src="https://static1.efacil.com.br/wcsstore/AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/manual.jpg"
        class="section-4-manual__imagem" width="1200" height="250" loading="lazy" decoding="async" fetchpriority="low"
        alt="Manual de instruções do produto"/>
    </a>
    <figcaption class="section-4-manual__legenda">
      Manual de Instruções — clique para baixar
    </figcaption>
  </figure>
</section>`,
    css: `<style>
  .section-4-manual__container {
    width: 100%;
    margin: 0 auto;
    height: auto;
  }

  .section-4-manual__figura {
    margin: 0;
  }

  .section-4-manual__link {
    display: flex;
    align-items: center;
    text-decoration: none;
    width: 100%;
  }

  .section-4-manual__imagem {
    border-radius: 0.25rem;
    height: auto;
    object-fit: cover;
    width: 100%;
  }

  .section-4-manual__legenda {
    font-family: Arial, sans-serif;
    font-size: 0.75rem;
    color: #666;
    margin-top: 0.25rem;
    text-align: center;
  }

  @media (min-width: 820px) {

    .section-4-manual__container,
    .section-4-manual__figura,
    .section-4-manual__imagem {
      height: 250px;
    }
  }
</style>`
  },

  /*@@@@Senko - section-5 */
  /* variantes: variants/section-5.js */
  {
    id: 'section-5',
    name: 'Section-5',
    tags: ['Section-5', '5', 'Section 5', 'Tabela Nutricional'],
    html: `<section class="section-5-tabela-nutricional-" aria-label="Tabela Nutricional do Produto">
    <figure class="section-5-tabela-nutricional-__figura">

        <a href="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/castelo/4900992-tabela.jpg"
            target="_blank" rel="noopener noreferrer" title="Abrir tabela nutricional completa em tamanho original"
            class="section-5-tabela-nutricional-__link">
            <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/TABELA-BANNER.jpg"
                class="section-5-tabela-nutricional-__imagem" width="1200" height="250" loading="lazy" decoding="async"
                fetchpriority="low"
                alt="Tabela nutricional do produto: informações sobre calorias, carboidratos, proteínas, gorduras e demais nutrientes por porção.">
        </a>
        <figcaption class="section-5-tabela-nutricional-__legenda">
            Tabela Nutricional — clique para ampliar
        </figcaption>
    </figure>
</section>`,
    css: `<style>
    .section-5-tabela-nutricional- {
        width: 100%;
        margin: 0 auto;
    }

    .section-5-tabela-nutricional-__figura {
        margin: 0;
    }

    .section-5-tabela-nutricional-__link {
        display: flex;
        align-items: center;
        text-decoration: none;
    }

    .section-5-tabela-nutricional-__imagem {
        border-radius: 0.25rem;
        height: auto;
        object-fit: cover;
        width: 100%;
    }

    .section-5-tabela-nutricional-__legenda {
        font-family: Arial, sans-serif;
        font-size: 0.75rem;
        color: #666;
        margin-top: 0.25rem;
        text-align: center;
    }

    @media (min-width: 820px) {

        .section-5-tabela-nutricional-,
        .section-5-tabela-nutricional-__imagem {
            height: 250px;
        }
    }
</style>`
  },

  /*@@@@Senko - section-60 */
  /* variantes: variants/section-60.js */
  {
    id: 'section-60',
    name: 'section-60',
    tags: ['60', 'section 60', 'split', 'metade'],
    html: `<div class="wrapper-section-60">
    <div class="text-col-section-60">
        <img src="https://cdn-icons-png.flaticon.com/512/894/894565.png" class="brand-icon-section-60">
        <h2 class="title-section-60">A Lenda dos Sete Mares</h2>
        <p class="desc-section-60">
            Capitan Cortez não é apenas um rum, é um convite à descoberta. Inspirado nos diários de bordo dos
            grandes navegadores, nossa receita busca capturar a glória da tradição em cada garrafa. Uma homenagem
            àqueles que ousam ir além do horizonte.
        </p>
        <a href="#" class="cta-link-section-60">
            Conheça Nossa História
            <span class="arrow-icon-section-60">&rarr;</span>
        </a>
    </div>
    <div class="image-col-section-60">
        <img src=""
            class="bg-image-section-60" alt="Capitan Cortez Lifestyle">
    </div>
</div>`,
    css: `        .wrapper-section-60 {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      background-color: #f8f8f8;
      min-height: 28rem;
      /* ~450px */
    }

    .text-col-section-60 {
      flex: 1;
      min-width: 18.75rem;
      padding: 2.5rem 1.25rem;
      /* Padding Mobile */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .image-col-section-60 {
      flex: 1;
      min-width: 18.75rem;
      position: relative;
    }

    .bg-image-section-60 {
      width: 95%;
      height: 95%;
      margin: 0.5rem;
      border-radius: 15px;
      object-fit: cover;
      display: block;
      min-height: 18.75rem;
      /* Mobile Height */
    }

    .brand-icon-section-60 {
      width: 3.75rem;
      /* 60px */
      height: auto;
      margin-bottom: 1.5rem;
      opacity: 0.8;
    }

    .title-section-60 {
      color: #1a1a1a;
      font-weight: 400;
      letter-spacing: 0.125rem;
      text-transform: uppercase;
      margin-bottom: 1.25rem;
      line-height: 1.3;

      /* Mobile Base */
      font-size: 1.25rem;
      /* ~20px */
    }

    .desc-section-60 {
      color: #555;
      line-height: 1.8;
      max-width: 25rem;

      /* Mobile Base */
      font-size: 0.875rem;
      /* ~14px */
    }

    .cta-link-section-60 {
      text-decoration: none;
      color: #1a1a1a;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.0625rem;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: color 0.3s;

      /* Mobile Base */
      font-size: 0.75rem;
      /* ~12px */
    }

    .arrow-icon-section-60 {
      font-size: 1rem;
      line-height: 1;
    }

    /* Responsividade Exclusiva da Sessão 60 */
    @media (min-width: 768px) {
      .text-col-section-60 {
        padding: 3.75rem 2.5rem;
        /* Mais espaçamento no Desktop */
      }

      .title-section-60 {
        font-size: 1.5rem;
        /* ~24px Desktop */
      }

      .desc-section-60 {
        font-size: 1rem;
        /* 16px Desktop */
      }

      .cta-link-section-60 {
        font-size: 0.875rem;
        /* ~14px Desktop */
      }

      .reverse-desktop-60 {
        flex-direction: row-reverse;
      }

    }

    @media (max-width: 720px) {
      .wrapper-section-60 {
        flex-direction: column-reverse;
      }

      .reverse-mobile-60 {
        flex-direction: column;
      }

      .bg-image-section-60 {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        min-height: 18.75rem;
        max-width: 95%;
        margin: 0.6rem auto;
        border-radius: 10px;
      }
    }`
  },

  
  /*@@@@Senko - section-49 */
  /* variantes: variants/section-49.js */
  {
    id: 'section-49',
    name: 'Section-49',
    tags: ['Section 49', '49', 'full width', 'responsivo'],
    html: `<div class="hero-section-49">
  <!-- Imagem para pcGamer -->
  <img class="hero-image-desktop-section-49" src="  " alt="Banner Desktop"
    width="1600" height="650">

  <!-- Imagem para mobileGamer -->
  <img class="hero-image-mobile-section-49" src="  " alt="Banner Mobile"
    width="780" height="400">

  <div class="hero-content-section-49">
    <style>
      :root {
        --position-49-y: 50%;
        --position-49-x: 7%;
        --position-49-x-1024: 5%;
        --position-49-x-900: 1%;
        --position-49-x-800: 1%;
        --color-title-49: #ffe178;
        --shadow-title-49: 2px 2px 4px rgba(0, 0, 0, 0.3);
        --color-frase-49: #fff;
        --shadow-frase-49: 1px 1px 3px rgba(0, 0, 0, 0.3);
        --background-box-49: #00000054;
      }
    </style>
    <h1>Caderno Funny Cat:</h1>
    <p>Organize seus Estudos com Fofura e Estilo!</p>
  </div>
</div>`,
    css: `<style>
  .hero-section-49 {
    width: 100%;
    margin: 0 auto;
    position: relative;
  }

  .hero-section-49 .hero-image-desktop-section-49 {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 20px;
  }

  .hero-section-49 .hero-image-mobile-section-49 {
    display: none;
  }

  .hero-section-49 .hero-content-section-49 {
    position: absolute;
    transform: translateY(-50%);
    max-width: 40%;
    z-index: 10;

    /*estilização*/
    top: var(--position-49-y);
    left: var(--position-49-x);
    background-color: var(--background-box-49);
    padding: 15px;
    border-radius: 15px;
  }

  .hero-section-49 h1 {
    font-size: clamp(1.5rem, 4vw, 2.8rem);
    color: var(--color-title-49);
    margin-bottom: 10px;
    text-shadow: var(--shadow-title-49);
    line-height: 1.2;
  }

  .hero-section-49 p {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    color: var(--color-frase-49);
    margin-bottom: 25px;
    text-shadow: var(--shadow-frase-49);
    line-height: 1.4;
  }

  /* Responsivo - Tablets e telas médias */
  @media (max-width: 1024px) {
    .hero-section-49 .hero-content-section-49 {
      max-width: 45%;
      left: var(--position-49-x-1024);
    }
  }

  @media (max-width: 900px) {
    .hero-section-49 .hero-content-section-49 {
      max-width: 50%;
      left: var(--position-49-x-900);
    }
  }

  @media (max-width: 800px) {
    .hero-section-49 .hero-content-section-49 {
      max-width: 55%;
      left: var(--position-49-x-800);
    }
  }

  /* Responsivo - Mobile */
  @media (max-width: 760px) {
    .hero-section-49 .hero-image-desktop-section-49 {
      display: none;
    }

    .hero-section-49 .hero-image-mobile-section-49 {
      display: block;
      width: 100%;
      height: auto;

      max-width: 95%;
      margin: auto;
      border-radius: 10px;
      filter: drop-shadow(0px 8px 16px #9cccdf00);
    }

    .hero-section-49 .hero-content-section-49 {
      position: static;
      transform: none;
      max-width: 100%;
      padding: 30px 20px 0 20px;
      background-color: rgba(255, 255, 255, 0);
      text-align: center;
      border-radius: 0;
      text-shadow: none;
    }

    .hero-section-49 h1 {
      font-size: 2rem;
      text-shadow: none;
      color: #333;
    }

    .hero-section-49 p {
      font-size: 1.2rem;
      text-shadow: none;
      color: #333;
    }
  }

  @media (max-width: 480px) {
    .hero-section-49 .hero-content-section-49 {
      padding: 25px 15px;
    }

    .hero-section-49 h1 {
      font-size: 1.6rem;
      margin-bottom: 8px;
      text-shadow: none;
    }

    .hero-section-49 p {
      font-size: 1rem;
      margin-bottom: 20px;
      text-shadow: none;
    }
  }

  /* Imagem SEO — fora da área visível, mas renderizada */
  .hero-image-seo-y {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
</style>`
  },

  /*@@@@Senko - section 39.3 (caderno) */
  /* variantes: variants/section 39.3 (caderno).js */
  {
    id: 'section 39.3 (caderno)',
    name: 'Section 39.3 (Caderno)',
    tags: ['Caderno', 'Section 39.3', '39.3', 'interativo'],
    html: `<div class="bookcontainer1">
  <div class="book1">
    <div class="bookfront1">
      <div class="bookcover1"
        style="background-image: url(https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao39.png);">

      </div>
    </div>
  </div>
</div>`,
    css: `<style>
  .bookcontainer1 {

      display: flex;
      justify-content: center;
      /* Alinha os livros no centro horizontalmente */
      gap: 20px;
      /* Espaçamento entre os livros */
      perspective: 2800px;
      z-index: 1;
      margin-top: 15px;
    }

    .bookcontainer1 .book1 {

      display: block;
      position: relative;
      width: 423px;
      height: 552px;
      color: #2b2b2b;
      background: linear-gradient(45deg, #e9e9e9 0%, #e9e9e9 100%);
      border-radius: 3px 4px 4px 3px;
      box-shadow: 12px 12px 7px 0px rgba(115, 114, 116, 0.6);
      font-weight: 400;
      transform-style: preserve-3d;
      transition: transform 0.6s;
    }

    .bookcontainer1 .book1:hover {

      transform: rotate3d(0, 1, 0, 30deg);
    }

    .bookcontainer1 .bookfront1 {

      transform-origin: 0% 50%;
      transform-style: preserve-3d;
      z-index: 10;
      transition: transform 0.6s;
      transform: translate3d(0, 0, 18px);
    }

    .bookcontainer1 .bookfront1>div {

      height: 552px;
      width: 423px;
      border-radius: 0 3px 3px 0;
      box-shadow: inset 3px 0 9px rgba(0, 0, 0, 0.1);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: top left;
    }

    .bookcontainer1 .bookleft1-side {

      height: 540px;
      width: 45px;
      left: -18px;
      transform: rotate3d(0, 1, 0, -90deg);
    }

    .bookcontainer1 .bookcover1:after {

      content: '';
      position: absolute;
      top: 0;
      left: 12px;
      bottom: 0;
      width: 3px;
      background: rgba(0, 0, 0, 0.12);
      box-shadow: 1px 0 3px rgba(255, 255, 255, 0.1);
    }

    .bookcontainer1 .bookfront1:after {

      content: '';
      position: absolute;
      top: 1px;
      bottom: 1px;
      left: -1px;
      width: 1px;
    }

    .bookcover1 {

      background-size: 106%;
    }
</style>`
  },

  /*@@@@Senko - section 39.2 (caderno) */
  /* variantes: variants/section 39.2 (caderno).js */
  {
    id: 'section 39.2 (caderno)',
    name: 'Section 39.2 (Caderno)',
    tags: ['Caderno', 'Section 39.2', '39.2', 'interativo'],
    html: `<div class="bookcontainer3">
  <div class="book3">
    <div class="bookfront3">
      <div class="bookcover3 frontcover3"
        style="background-image: url('https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao39.2.png')">
      </div>
    </div>
    <div class="bookleft3-side"></div>
    <div class="bookback3"
      style="background-image: url(https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao39_02.png);">
      <div class="bookcover3 backcover3"></div>
    </div>
    <div class="bookinnerpage3"
      style="background-image: url(https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao39_02.png);">
    </div>
  </div>
</div>`,
    css: `<style>
  .bookcontainer3 {

    display: flex;
    justify-content: center;
    gap: 20px;
    perspective: 2800px;
    z-index: 1;
  }

  .bookcontainer3 .book3 {

    display: block;
    position: relative;
    width: 520px;
    height: 410px;
    color: #2b2b2b;
    border-radius: 3px 4px 4px 3px;
    box-shadow: 12px 12px 7px 0px rgba(115, 114, 116, 0.6);
    font-weight: 400;
    transform-style: preserve-3d;
    transition: transform 0.6s;
  }

  .bookcontainer3 .book3:hover {

    transform: rotate3d(0, 1, 0, 30deg);
  }

  .bookcontainer3 .bookfront3 {

    transform-origin: 0% 50%;
    transform-style: preserve-3d;
    z-index: 10;
    transition: transform 0.6s;
    transform: translate3d(0, 0, 18px);
  }

  .bookcontainer3 .bookfront3>div {

    height: 410px;
    width: 540px;
    border-radius: 0 3px 3px 0;
    box-shadow: inset 3px 0 9px rgba(0, 0, 0, 0.1);
  }

  .bookcontainer3 .bookleft3-side {

    height: 410px;
    width: 45px;
    left: -18px;
    transform: rotate3d(0, 1, 0, -90deg);
  }

  .bookcontainer3 .bookcover3:after {

    content: '';
    position: absolute;
    top: 0;
    left: 12px;
    bottom: 0;
    width: 3px;
    background: rgba(0, 0, 0, 0.12);
    box-shadow: 1px 0 3px rgba(255, 255, 255, 0.1);
  }

  .bookcontainer3 .bookfront3:after {

    content: '';
    position: absolute;
    top: 1px;
    bottom: 1px;
    left: -1px;
    width: 1px;
  }

  .bookcover3 {

    background-size: 102%;
    transform-origin: left;
    transition: transform 0.6s;
  }

  .bookinnerpage3 {

    background-size: 103%;
    transform-origin: left;
    transition: transform 0.6s;
  }

  .bookcontainer3 .book3:hover .bookcover3 {

    transform: rotateY(-160deg);
  }

  .bookcontainer3 .book3:hover .bookinnerpage3 {

    transform: rotateY(-160deg) translateZ(-11px) translateX(26px);
    opacity: 1;
  }

  .bookback3 {

    position: absolute;
    top: 0;
    left: 0;
    width: 540px;
    height: 410px;
    background-size: 101%;
    border-radius: 3px 4px 4px 3px;
  }

  .bookcontainer3 .bookinnerpage3 {

    position: absolute;
    top: 0;
    opacity: 1;
    left: 20px;
    height: 100%;
    width: 100%;
    background-size: 103%;
    z-index: -1;
    /* Mantém a página atrás do livro */

    transform: translate3d(0px, 0px, 0px);
    /* Leve ajuste de posição */
  }
</style>`
  },

  /*@@@@Senko - section-46 */
  /* variantes: variants/section-46.js */
  {
    id: 'section-46',
    name: 'Section-46',
    tags: ['Imagem quadrada', '', '', ''],
    html: `      <div class="section-46-y reverse-46 ">
        <!--    AQUI É POSSIVEL TROCAR SE A IMAGEM FICA EM CIMA OU EM BAIXO TIRANDO A CLASSE "TROCAR-ORDEM-730PX"-->
        <div class="section-46-y-img trocar-ordem-730px">
          <img
            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao4.jpg"
            alt="Imagem representativa do do produto">
        </div>
        <div class="section-46-y-content">

          <!-- Título padrão-->
          <h1>
            Isso é um título. <br> Isso é um título.
          </h1>
          <!-- Descrição padrão-->
          <p class="section-46-y-desc">
            Isso é uma descrição gamer. Isso é uma descrição gamer.
          </p>

          <!-- título e Descrição com ícone -->
          <div class="section-46-y-box reverse-icon-46">
            <div class="section-46-y-box-icon reverse-icon-46">
              <img
                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao47.jpg"
                width="75" height="75" alt="Ícone de qualidade">
            </div>
            <div class="section-46-y-box-text">
              <h3>Isso é um título.</h3>
              <p>Isso é uma descrição gamer. Isso é uma descrição gamer.</p>
            </div>
          </div>

          <!-- título e Descrição com ícone invertido -->
          <div class="section-46-y-box reverse-icon">
            <div class="section-46-y-box-icon">
              <img
                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao47.jpg"
                width="75" height="75" alt="Ícone de qualidade">
            </div>
            <div class="section-46-y-box-text">
              <h3>Isso é um título.</h3>
              <p>Isso é uma descrição gamer. Isso é uma descrição gamer.</p>
            </div>
          </div>
        </div>
      </div>`,
    css: `.section-46-y {
      max-width: 1300px;
      margin: 0 auto;
      padding: 40px 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 40px;
      text-align: left;
    }

    .section-46-y.reverse-46 {
      flex-direction: row-reverse;

    }

    /* ===== IMAGEM ===== */
    .section-46-y-img {
      flex: 1;
      display: flex;
      justify-content: center;
    }

    .section-46-y-img img {
      width: 100%;
      max-width: 550px;
      border-radius: 12px;
      display: block;
      transition: transform 0.3s ease;
    }

    .section-46-y-img img:hover {
      transform: scale(1.02);
      /*aumentar/diminuir efeito que faz piscar a iamgem */
    }

    /* ===== CONTEÚDO ===== */
    .section-46-y-content {
      flex: 1;
    }

    .section-46-y-content h1 {
      text-align: center;
    }

    .section-46-y-content p {
      text-align: center;
    }

    /* ===== TITULO ===== */
    .section-46-y-content h1 {
      font-size: clamp(22px, 3.2vw, 48px);
      font-weight: 700;
      margin-bottom: 20px;
      line-height: 1.2;
    }

    /* ===== DESCRIÇÃO ===== */
    .section-46-y-desc {
      font-size: clamp(14px, 1.4vw, 26px);
      margin-bottom: 30px;
      color: #1b1b1b;
      line-height: 28px;
    }

    .section-46-y-box {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 25px;
      padding: 12px;
      border-radius: 10px;
      transition: background 0.3s ease, transform 0.3s ease;
    }

    .section-46-y-box:hover {
      background: #29292936;
      transform: translateY(-3px);
    }

    .section-46-y-box-icon img {
      width: 48px;
      height: 48px;
      object-fit: contain;
    }

    .section-46-y-box-text h3 {
      font-size: clamp(16px, 2vw, 32px);
      margin: 0 0 5px;
      line-height: 1.1;
    }

    .section-46-y-box-text p {
      font-size: clamp(12px, 1.4vw, 22px);
      color: #555;
      margin: 0;
      line-height: 1.1;
    }

    @media (max-width: 1060px) {

      .section-46-y-content h1 {
        font-size: 3.8vw;
      }

      .section-46-y-desc {
        font-size: 1.8vw;
      }

      .section-46-y-box-text h3 {
        font-size: 2.4vw;
      }

      .section-46-y-box-text p {
        font-size: 1.8vw;
      }
    }

    @media (max-width: 960px) {

      .section-46-y-content h1 {
        font-size: 4.3vw;
      }

      .section-46-y-desc {
        font-size: 2vw;
      }

      .section-46-y-box-text h3 {
        font-size: 2.7vw;
      }

      .section-46-y-box-text p {
        font-size: 2.3vw;
      }
    }

    @media (max-width: 730px) {

      .section-46-y {
        flex-direction: column;
        text-align: center;
      }

      .section-46-y-box {
        flex-direction: column;
        text-align: center;
      }

      .section-46-y-content h1 {
        font-size: 5vw;
      }

      .section-46-y-desc {
        font-size: 2.7vw;
      }

      .section-46-y-box-text h3 {
        font-size: 3.3vw;
      }

      .section-46-y-box-text p {
        font-size: 2.5vw;
        text-align: left;
      }
    }

    @media (max-width: 800px) {

      .section-46-y,
      .section-46-y.reverse,
      .section-46-y[data-order="invert"] {
        flex-direction: column !important;
      }

      .section-46-y-img {
        width: 81%;
      }

      .section-46-y-box,
      .section-46-y-box.reverse-icon,
      .section-46-y-box[data-icon-order="invert"] {
        flex-direction: row !important;
        text-align: center !important;
      }

      .section-46-y-box-text {
        text-align: left !important;
        margin-left: 8px;
      }

      .section-46-y-box-text p {
        text-align: left !important;
      }
    }

    @media (max-width: 500px) {
      .section-46-y-content h1 {
        font-size: 6vw;
      }

      .section-46-y-desc {
        font-size: 3.5vw;
      }

      .section-46-y-box-text h3 {
        font-size: 4vw;
        line-height: 1.1;
      }

      .section-46-y-box-text p {
        font-size: 3.3vw;
        line-height: 1.1;
        text-align: left;
      }
    }

    @media (max-width: 420px) {
      .section-46-y-content h1 {
        font-size: 7vw;
      }

      .section-46-y-desc {
        font-size: 4vw;
      }

      .section-46-y-box-text h3 {
        font-size: 5vw;
        line-height: 1.1;
      }

      .section-46-y-box-text p {
        font-size: 3.8vw;
        line-height: 1.1;
        text-align: left;
      }
    }

    .section-46-y.reverse-46 {
      flex-direction: row-reverse;
    }

    .section-46-y-box.reverse-icon-46 {
      flex-direction: row-reverse;
      text-align: right;
    }`
  },

  /*@@@@Senko - section-3 */
  /* variantes: variants/section-3.js */
  {
    id: 'section-3',
    name: 'section-3',
    tags: [],
    html: `        <div class="universal-container">
      <section class="section-4 --dark --horizontal">
        <div class="section-4__header">
          <h2 class="section-4__title"><em>Cîroc</em> Vodka Original</h2>
        </div>

        <div class="section-4__grid">
          <div class="section-4__spec">
            <p class="section-4__spec-key">País</p>
            <p class="section-4__spec-val">França</p>
          </div>
          <div class="section-4__spec">
            <p class="section-4__spec-key">Tipo</p>
            <p class="section-4__spec-val">Vodka</p>
          </div>
          <div class="section-4__spec">
            <p class="section-4__spec-key">Alc.</p>
            <p class="section-4__spec-val">40%</p>
          </div>
          <div class="section-4__spec">
            <p class="section-4__spec-key">Vol.</p>
            <p class="section-4__spec-val">750ml</p>
          </div>
          <div class="section-4__spec">
            <p class="section-4__spec-key">Destilado</p>
            <p class="section-4__spec-val">5×</p>
          </div>
          <div class="section-4__spec">
            <p class="section-4__spec-key">Garrafa</p>
            <p class="section-4__spec-val">Vidro</p>
          </div>
        </div>
      </section>
    </div>`,
    css: `<style>
.section-4 {
      --s4-bg: #f8f5ef;
      --s4-text: #0a1428;
      --s4-accent: #0a1428;
      --s4-gold: #9a7820;
      --s4-muted: #6a6a7a;
      --s4-border: rgba(10, 20, 40, 0.1);
      --s4-card: #ffffff;

      container-type: inline-size;
      background: var(--s4-bg);
      padding: clamp(3rem, 7vw, 7rem) clamp(1.5rem, 6vw, 8rem);
    }

    .section-4.--dark {
      --s4-bg: #0a1428;
      --s4-text: #e8e2d4;
      --s4-accent: #c4a44a;
      --s4-gold: #c4a44a;
      --s4-muted: #7080a0;
      --s4-border: rgba(196, 164, 74, 0.15);
      --s4-card: #111d38;
    }

    .section-4.--with-bottle {
      --s4-bg: #050d1f;
      --s4-text: #e8e2d4;
      --s4-accent: #c4a44a;
      --s4-gold: #c4a44a;
      --s4-muted: #7080a0;
      --s4-border: rgba(196, 164, 74, 0.15);
      --s4-card: #0a1428;
    }

    .section-4__header {
      text-align: center;
      margin-block-end: clamp(2rem, 5vw, 4rem);
    }

    .section-4__eyebrow {

      font-size: clamp(0.58rem, 0.85vw, 0.7rem);
      font-weight: 300;
      letter-spacing: 0.4em;
      text-transform: uppercase;
      color: var(--s4-gold);
      display: block;
      margin-block-end: 0.7rem;
    }

    .section-4__title {

      font-size: clamp(2rem, 4vw, 3.5rem);
      font-weight: 300;
      color: var(--s4-text);
      line-height: 1.1;
      letter-spacing: -0.01em;
    }

    .section-4__title em {
      font-style: italic;
    }

    .section-4__with-bottle-layout {
      display: none;
    }

    .section-4.--with-bottle .section-4__with-bottle-layout {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: clamp(1rem, 3vw, 2rem);
      align-items: center;
    }

    .section-4.--with-bottle .section-4__grid {
      display: none;
    }

    .section-4__bottle-col {
      display: flex;
      justify-content: center;
    }

    .section-4__bottle-img {
      width: clamp(100px, 16vw, 200px);
      aspect-ratio: 1/3;
      object-fit: contain;
      filter: drop-shadow(0 30px 60px rgba(196, 164, 74, 0.2));
    }

    .section-4__spec-col {
      display: flex;
      flex-direction: column;
      gap: clamp(0.6rem, 1.5vw, 1rem);
    }

    .section-4__spec-col--right {
      align-items: flex-end;
      text-align: right;
    }

    .section-4__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
      gap: clamp(0.6rem, 1.5vw, 1.2rem);
    }

    .section-4__spec {
      background: var(--s4-card);
      border: 1px solid var(--s4-border);
      padding: clamp(1.2rem, 2.5vw, 2rem) clamp(1rem, 2vw, 1.5rem);
      position: relative;
    }

    .section-4__spec::after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      translate: -50% 0;
      width: 30px;
      height: 1px;
      background: var(--s4-gold);
    }

    .section-4__spec-key {

      font-size: clamp(0.55rem, 0.75vw, 0.64rem);
      font-weight: 500;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--s4-gold);
      margin-block-end: 0.5em;
    }

    .section-4__spec-val {

      font-size: clamp(1.1rem, 1.8vw, 1.5rem);
      font-weight: 400;
      color: var(--s4-text);
      line-height: 1.2;
    }

    .section-4__spec-sub {

      font-size: clamp(0.6rem, 0.75vw, 0.68rem);
      color: var(--s4-muted);
      margin-block-start: 0.3em;
    }

    .section-4.--horizontal .section-4__grid {
      grid-template-columns: repeat(auto-fit, minmax(min(120px, 100%), 1fr));
      border: 1px solid var(--s4-border);
    }

    .section-4.--horizontal .section-4__spec {
      border: none;
      border-right: 1px solid var(--s4-border);
      text-align: center;
    }

    .section-4.--horizontal .section-4__spec:last-child {
      border-right: none;
    }

    @container (max-width: 580px) {
      .section-4.--with-bottle .section-4__with-bottle-layout {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
      }

      .section-4__bottle-col {
        grid-column: 1 / -1;
        order: -1;
      }

      .section-4__bottle-img {
        width: 100px;
      }

      .section-4__spec-col--right {
        align-items: flex-start;
        text-align: left;
      }
    }
</style>`
  },

  /*@@@@Senko - section-32 */
  /* variantes: variants/section-32.js */
  {
    id: 'section-32',
    name: 'section-32',
    tags: ['section-32', '32', 'imagem', 'hero', '32.11'],
    html: `  <section class="section-32__container" aria-label="Seção de destaque do produto">
    <figure class="section-32__groupimage-section">
      <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/metalfrio/2223537_02.jpg"
        alt="!!!!!COLOQUE O TEXTO ALT AQUI!!!!!" style="border-radius: 0px 0px 0px 0px;" width="1600" height="865"
        loading="lazy" decoding="async" fetchpriority="low">
      <figcaption class="section-32__grouptext-overlay left">
        <p style="color: #faca95;">Isso é uma descrição. Isso é uma descrição.</p>
        <h2 style="color: #faca95;"><strong>SUB-TÍTULO</strong></h2>
        <p style="color: #faca95;">Isso é uma descrição. Isso é uma descrição. Isso é uma descrição. Isso é umadescrição.</p>
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
  </style>`
  },

  /*@@@@Senko - section-33 */
  /* variantes: variants/section-33.js */
  {
    id: 'section-33',
    name: 'section-33',
    tags: ['section-33', 'section 33', '33', 'video'],
    html: `  <div class="section-33__container">
    <section class="section-33__mov-section" aria-label="Seção de destaque em vídeo">
      <figure class="section-33__mov-figure">
        <video class="section-33__mov-figure__video"
          src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/metalfrio/2223537_video2.mov"
          autoplay muted loop playsinline style="border-radius: 0px 0px 0px 0px;" width="1600" height="865"
          aria-label="Vídeo de destaque do produto">
          <track kind="descriptions" label="Descrição do vídeo"/>
          Desculpe, mas o vídeo não pode ser carregado...
        </video>
      </figure>
    </section>
  </div>`,
    css: `  <style>
    .section-33__container {
      width: 100%;
      margin: 0 auto;
    }

    .section-33__container--spaced {
      margin-bottom: 50px;
      align-self: center;
    }

    .section-33__mov-section {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .section-33__mov-figure {
      position: relative;
      width: 100%;
      margin: 0;
    }

    .section-33__mov-figure__video {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
    }

    /* Suporte a imagem como fallback */
    .section-33__mov-figure__img {
      width: 100%;
      height: auto;
      display: block;
    }

  </style>`
  },

  /*@@@@Senko - section 41 */
  /* variantes: variants/section 41.js */
  {
    id: 'section 41',
    name: 'Section 41 - Tabela',
    tags: ['tabela', 'section 41', '41'],
    html: `<div class="table-container-custom">
  <h1 class="table-text-custom">NOME DA TABELA</h1><br />
  <table class="table-design-custom">
    <thead class="table-head-custom">
      <tr class="table-tr-custom">
        <th class="table-text-custom table-th-custom" style="background-color: #16a2ff;">Coluna 1
        </th>
        <!--Replicar para adicionar mais COLUNAS-->
        <th class="table-text-custom table-th-custom" style="background-color: #16a2ff;">Coluna 2
        </th>
        <th class="table-text-custom table-th-custom" style="background-color: #16a2ff;">Coluna 3
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="table-tr-custom">
        <td class="table-text-custom table-td-custom">SKU 1</td>
        <!--Replicar para adicionar mais LINHAS-->
        <td class="table-text-custom table-td-custom">DESCRIÇÃO DO PRODUTO 1</td>
        <td class="table-text-custom table-td-custom">-</td>
      </tr>
      <tr class="table-tr-custom">
        <td class="table-text-custom table-td-custom">SKU 2</td>
        <td class="table-text-custom table-td-custom">DESCRIÇÃO DO PRODUTO 2</td>
        <td class="table-text-custom table-td-custom">-</td>
      </tr>
      <tr class="table-tr-custom">
        <td class="table-text-custom table-td-custom">SKU 3</td>
        <td class="table-text-custom table-td-custom">DESCRIÇÃO DO PRODUTO 3</td>
        <td class="table-text-custom table-td-custom">-</td>
      </tr>
      <tr class="table-tr-custom">
        <td class="table-text-custom table-td-custom">SKU 4</td>
        <td class="table-text-custom table-td-custom">DESCRIÇÃO DO PRODUTO 4</td>
        <td class="table-text-custom table-td-custom">-</td>
      </tr>
      <tr class="table-tr-custom">
        <td class="table-text-custom table-td-custom">SKU 5</td>
        <td class="table-text-custom table-td-custom">DESCRIÇÃO DO PRODUTO 5</td>
        <td class="table-text-custom table-td-custom">-</td>
      </tr>
    </tbody>
  </table>
</div>`,
    css: `  .table-container-custom {

    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    display: block;
  }

  .table-design-custom {

    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
  }

  .table-head-custom {

    background-color: #ee3b0f;
    color: white;
  }

  .table-text-custom {

    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .table-row-custom:hover {

    background-color: #f1f1f1;
    filter: brightness(0.9);
  }

  .table-th-custom {

    font-weight: bold;
  }

  .table-td-custom {

    color: #555;
  }

  /* Efeito de zebrado nas linhas */

  .table-tr-custom:nth-child(even) {

    background-color: #f1f1f1;
  }

  /* Responsividade */

  @media (max-width: 600px) {

    .table-container-custom {

      padding: 10px;
    }

    .table-text-custom,
    .table-th-custom,
    .table-td-custom {

      padding: 8px;
    }
  }`
  },

  /*@@@@Senko - section 32.4 (imagens caindo) */
  /* variantes: variants/section 32.4 (imagens caindo).js */
  {
    id: 'section 32.4 (imagens caindo)',
    name: 'Section 32.4 (Imagens caindo)',
    tags: ['imagens caindo', 'caindo', 'Section 32.4', '32.4'],
    html: `<div class="groupcontainer">
  <!-- Primeira seção com imagem -->
  <div class="fallingItem-container"
    style="--random-delay1: 0.1; --random-delay2: 0.7; --random-delay3: 0.3; --random-delay4: 0.5; --random-delay5: 0.2;">
    <img
      src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo-efacil.png"
      class="fallingItem" width="200" height="200"
      alt="Imagem ilustrativa de produto em destaque, representando qualidade, praticidade e estilo em uso no dia a dia.">
    <img
      src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo-efacil.png"
      class="fallingItem" width="200" height="200"
      alt="Imagem ilustrativa de produto em destaque, representando qualidade, praticidade e estilo em uso no dia a dia.">
    <img
      src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo-efacil.png"
      class="fallingItem" width="200" height="200"
      alt="Imagem ilustrativa de produto em destaque, representando qualidade, praticidade e estilo em uso no dia a dia.">
    <img
      src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo-efacil.png"
      class="fallingItem" width="200" height="200"
      alt="Imagem ilustrativa de produto em destaque, representando qualidade, praticidade e estilo em uso no dia a dia.">
    <img
      src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo-efacil.png"
      class="fallingItem" width="200" height="200"
      alt="Imagem ilustrativa de produto em destaque, representando qualidade, praticidade e estilo em uso no dia a dia.">
    <div class="groupimage-section">
      <img
        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao32.jpg"
        style="border-radius: 30px;" width="1600" height="865"
        alt="Imagem ilustrativa de produto em destaque, representando qualidade, praticidade e estilo em uso no dia a dia.">
      <div class="grouptext-overlay-Down">
        <center>
          <p1 style="color: #ffffff;">Isso é uma descrição. Isso é uma descrição.</p1>
          <h1 style="color: #ffffff;"><b>SUB-TÍTULO</b></h1>
          <p style="color: #ffffff;">Isso é uma descrição. Isso é uma descrição. Isso é uma
            descrição. Isso é uma
            descrição.
          </p>
        </center>
      </div>
    </div>
  </div>
</div>`,
    css: `<style>
  .groupcontainer {

    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
  }

  .fallingItem-container {

    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 100;
  }

  .groupimage-section {

    position: relative;
    width: 100%;
  }

  .groupimage-section img {

    width: 100%;
    height: auto;
    display: block;
  }

  .fallingItem {

    position: absolute;
    top: -100px;
    width: 8vw;
    height: 8vw;
    /*Ajuste o tamanho da imagem */

    animation: fall infinite linear;
    animation-duration: 5s;
    /* Tempo para cair*/

    opacity: 0;
    z-index: 10;
    transform-origin: center;
  }

  .fallingItem-container {

    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 100;
  }

  .fallingItem-container2 {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 100;
    overflow: visible;
  }

  .fallingItem {

    position: absolute;
    top: -100px;
    width: 8vw;
    height: 8vw;
    /*Ajuste o tamanho da imagem */

    animation: fall infinite linear;
    animation-duration: 5s;
    /* Tempo para cair*/

    opacity: 0;
    z-index: 10;
    transform-origin: center;
  }

  .fallingItem2 {
    position: absolute;
    top: 100px;
    width: 8vw;
    height: 8vw;
    /*Ajuste o tamanho da imagem */

    animation: fall2 infinite linear;
    animation-duration: 5s;
    /* Tempo para cair*/

    opacity: 0;
    z-index: 10;
    transform-origin: center;
  }

  .fallingItem3 {
    position: absolute;
    top: 100px;
    width: 15vw;
    height: 15vw;
    /*Ajuste o tamanho da imagem */

    animation: fall3 infinite linear;
    animation-duration: 8s;
    /* Tempo para cair*/

    opacity: 0;
    z-index: 10;
    transform-origin: center;
  }

  @keyframes fall3 {

    0% {

      transform: translateY(0vh);
      opacity: 0;
    }

    10% {
      opacity: 1;
    }

    40% {

      transform: translateY(0vh);
      opacity: 1;
    }

    90% {

      opacity: 1;
    }

    100% {

      transform: translateY(-180vh);
      opacity: 0;
    }
  }

  @keyframes fall2 {

    0% {

      transform: translateY(-2rem) rotate(var(--start-rotation));
      opacity: 0;
    }

    10% {
      opacity: 1;
    }

    40% {

      transform: translateY(-2rem) rotate(var(--start-rotation));
      opacity: 1;
    }

    90% {

      opacity: 1;
    }

    100% {

      transform: translateY(110vh) rotate(var(--end-rotation));
      opacity: 0;
    }
  }

  @keyframes fall {

    0% {

      transform: translateY(-100px) rotate(var(--start-rotation));
      opacity: 1;
    }

    90% {

      opacity: 1;
    }

    100% {

      transform: translateY(110vh) rotate(var(--end-rotation));
      opacity: 0;
    }
  }

  /* Tempo de Queda e Rotação */

  .fallingItem:nth-child(1) {

    left: 10%;
    animation-delay: calc(0s + (4s * var(--random-delay1)));
    --start-rotation: -30deg;
    --end-rotation: 360deg;
  }

  .fallingItem:nth-child(2) {

    left: 30%;
    animation-delay: calc(0s + (4s * var(--random-delay2)));
    --start-rotation: 20deg;
    --end-rotation: 360deg;
  }

  .fallingItem:nth-child(3) {

    left: 50%;
    animation-delay: calc(0s + (4s * var(--random-delay3)));
    --start-rotation: -45deg;
    --end-rotation: 360deg;
  }

  .fallingItem:nth-child(4) {

    left: 70%;
    animation-delay: calc(0s + (4s * var(--random-delay4)));
    --start-rotation: 15deg;
    --end-rotation: 360deg;
  }

  .fallingItem:nth-child(5) {

    left: 90%;
    animation-delay: calc(0s + (4s * var(--random-delay5)));
    --start-rotation: 45deg;
    --end-rotation: 360deg;
  }

  .fallingItem2:nth-child(1) {

    left: 10%;
    animation-delay: calc(0s + (4s * var(--random-delay1)));
    --start-rotation: -30deg;
    --end-rotation: 360deg;
  }

  .fallingItem2:nth-child(2) {

    left: 30%;
    animation-delay: calc(0s + (4s * var(--random-delay2)));
    --start-rotation: 20deg;
    --end-rotation: 360deg;
  }

  .fallingItem2:nth-child(3) {

    left: 50%;
    animation-delay: calc(0s + (4s * var(--random-delay3)));
    --start-rotation: -45deg;
    --end-rotation: 360deg;
  }

  .fallingItem2:nth-child(4) {

    left: 70%;
    animation-delay: calc(0s + (4s * var(--random-delay4)));
    --start-rotation: 15deg;
    --end-rotation: 360deg;
  }

  .fallingItem2:nth-child(5) {

    left: 90%;
    animation-delay: calc(0s + (4s * var(--random-delay5)));
    --start-rotation: 45deg;
    --end-rotation: 360deg;
  }

  .fallingItem3:nth-child(1) {
    left: 10%;
    animation-delay: calc(0s + (4s * var(--random-delay1)));
    --start-rotation: -30deg;
    --end-rotation: 360deg;
  }

  .fallingItem3:nth-child(2) {

    left: 30%;
    animation-delay: calc(0s + (4s * var(--random-delay2)));
    --start-rotation: 20deg;
    --end-rotation: 360deg;
  }

  .fallingItem3:nth-child(3) {

    left: 50%;
    animation-delay: calc(0s + (4s * var(--random-delay3)));
    --start-rotation: -45deg;
    --end-rotation: 360deg;
  }

  .fallingItem3:nth-child(4) {

    left: 70%;
    animation-delay: calc(0s + (4s * var(--random-delay4)));
    --start-rotation: 15deg;
    --end-rotation: 360deg;
  }

  .fallingItem3:nth-child(5) {

    left: 90%;
    animation-delay: calc(0s + (4s * var(--random-delay5)));
    --start-rotation: 45deg;
    --end-rotation: 360deg;
  }

  @media all and (max-width:1000px) {
    .fallingItem2 {

      animation: fall2 infinite linear;
      animation-duration: 10s;
      /* Tempo para cair*/
    }

    .fallingItem3 {

      animation: fall3 infinite linear;
      animation-duration: 10s;
      /* Tempo para cair*/
    }
  }
</style>`
  },

  /*@@@@Senko - section 39.1 (caderno) */
  /* variantes: variants/section 39.1 (caderno).js */
  {
    id: 'section 39.1 (caderno)',
    name: 'Section 39.1 (Caderno)',
    tags: ['interativo', 'Section 39.1', '39.1', 'caderno'],
    html: `<div class="bookcontainer">
  <div class="book">
    <div class="bookfront">
      <div class="bookcover frontcover"
        style="background-image: url('https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao39.png')">
      </div>
    </div>
    <div class="bookleft-side"></div>
    <div class="bookback"
      style="background-image: url(https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao39_02.png);">
      <div class="bookcover backcover"></div>
    </div>
    <div class="bookinnerpage"
      style="background-image: url(https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao39_02.png);">
    </div>
  </div>
</div>`,
    css: `<style>
  .bookcontainer {

    display: flex;
    justify-content: center;
    gap: 20px;
    perspective: 2800px;
    z-index: 1;
  }

  .bookcontainer .book {

    display: block;
    position: relative;
    width: 400px;
    height: 540px;
    color: #2b2b2b;
    border-radius: 3px 4px 4px 3px;
    box-shadow: 12px 12px 7px 0px rgba(115, 114, 116, 0.6);
    font-weight: 400;
    transform-style: preserve-3d;
    transition: transform 0.6s;
  }

  .bookcontainer .book:hover {

    transform: rotate3d(0, 1, 0, 30deg);

  }

  .bookcontainer .bookfront {

    transform-origin: 0% 50%;
    transform-style: preserve-3d;
    z-index: 10;
    transition: transform 0.6s;
    transform: translate3d(0, 0, 18px);
  }

  .bookcontainer .bookfront>div {

    height: 540px;
    width: 410px;
    border-radius: 0 3px 3px 0;
    box-shadow: inset 3px 0 9px rgba(0, 0, 0, 0.1);
  }

  .bookcontainer .bookleft-side {

    height: 540px;
    width: 45px;
    left: -18px;
    transform: rotate3d(0, 1, 0, -90deg);
  }

  .bookcontainer .bookcover:after {

    content: '';
    position: absolute;
    top: 0;
    left: 12px;
    bottom: 0;
    width: 3px;
    background: rgba(0, 0, 0, 0.12);
    box-shadow: 1px 0 3px rgba(255, 255, 255, 0.1);
  }

  .bookcontainer .bookfront:after {

    content: '';
    position: absolute;
    top: 1px;
    bottom: 1px;
    left: -1px;
    width: 1px;
  }

  .bookcover {

    background-size: 102%;
    transform-origin: left;
    transition: transform 0.6s;
  }

  .bookinnerpage {

    background-size: 103%;
    transform-origin: left;
    transition: transform 0.6s;
  }

  .bookcontainer .book:hover .bookcover {

    transform: rotateY(-160deg);

  }

  .bookcontainer .book:hover .bookinnerpage {

    transform: rotateY(-160deg) translateZ(-11px) translateX(26px);
    opacity: 1;
  }

  .bookback {

    position: absolute;
    top: 0;
    left: 0;
    width: 410px;
    height: 540px;
    background-size: 101%;
    border-radius: 3px 4px 4px 3px;
  }

  .bookcontainer .bookinnerpage {

    position: absolute;
    top: 0;
    opacity: 1;
    left: 20px;
    height: 100%;
    width: 98%;
    background-size: 103%;
    z-index: -1;
    /* Mantém a página atrás do livro */

    background-size: cover;
    background-position: center;
    object-fit: cover;
    transform: translate3d(0px, 0px, 0px);
    /* Leve ajuste de posição */
  }
</style>`
  },

  /*@@@@Senko - section-51 */
  /* variantes: variants/section-51.js */
  {
    id: 'section-51',
    name: 'Section-51',
    tags: ['section 51. 51. grid', 'blocos', 'icons'],
    html: `<div class="details-section-51">
  <h2>Pensado para o seu dia a dia</h2>
  <div class="details-section-51">
    <div class="detail-item-section-51">
      <div class="detail-icon-section-51">
        <img
          src="Https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-51.png"
          alt="">
      </div>
      <div class="detail-title-section-51">Formato Universitário</div>
      <div class="detail-description-section-51">200mm x 275mm</div>
    </div>
    <div class="detail-item-section-51">
      <div class="detail-icon-section-51">
        <img
          src="Https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-51.png"
          alt="">
      </div>
      <div class="detail-title-section-51">Capa Dura com</div>
      <div class="detail-description-section-51">Verniz Localizado</div>
    </div>
    <div class="detail-item-section-51">
      <div class="detail-icon-section-51">
        <img @type="product"
          src="Https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-51.png"
          alt="">
      </div>
      <div class="detail-title-section-51">Espiral Metálico</div>
      <div class="detail-description-section-51">Resistente</div>
    </div>
    <div class="detail-item-section-51">
      <div class="detail-icon-section-51">
        <img
          src="Https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-51.png"
          alt="">
      </div>
      <div class="detail-title-section-51">80 Folhas Pautadas</div>
      <div class="detail-description-section-51">Decoradas</div>
    </div>
    <div class="detail-item-section-51">
      <div class="detail-icon-section-51">
        <img
          src="Https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-51.png"
          alt="">
      </div>
      <div class="detail-title-section-51">Gramatura</div>
      <div class="detail-description-section-51">56g/m²</div>
    </div>
  </div>
</div>`,
    css: `<style>
  .details-section-51 {
    width: 100%;
    margin: 0 auto 25px auto;
  }

  .details-section-51 h2 {
    text-align: center;
    font-size: 2rem;
    color: #333;
    margin: 10px 0 0 0;
  }

  .details-section-51 p {
    margin: auto;
    --tw-text-opacity: 1;
    color: #333;
    font-size: clamp(1.09rem, 1vw, 1.4rem);
    line-height: 22px;
    margin-top: 1rem;
    max-width: 56rem;
    text-align: center;
    text-wrap: pretty;
  }

  .details-section-51 .details-section-51 {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 30px;
    margin: 0 auto;
    padding: 28px;
  }

  .details-section-51 .detail-item-section-51 {
    background: #fff;
    padding: 30px 20px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .details-section-51 .detail-item-section-51:hover {
    transform: translateY(-5px);
  }

  .details-section-51 .detail-icon-section-51 {
    font-size: 3rem;
    color: #DAA520;
    margin: 15px auto;
  }

  .details-section-51 .detail-icon-section-51 img {
    width: 4.6rem;
    margin: auto;
  }

  .details-section-51 .detail-title-section-51 {
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 8px;
    color: #333;
  }

  .details-section-51 .detail-description-section-51 {
    font-size: 0.9rem;
    color: #666;
  }

  /* Responsivo - Tablet */
  @media (max-width: 1024px) {
    .details-section-51 .details-section-51 {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Responsivo - Mobile */
  @media (max-width: 760px) {
    .details-section-51 .details-section-51 {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .details-section-51 .detail-icon-section-51 {
      font-size: 2.5rem;
    }

    .details-section-51 {
      margin: 0 auto 25px auto;
    }

    .details-section-51 .detail-icon-section-51 img {
      width: 4.3rem;
    }
  }
</style>`
  },






/*@@@@Senko - section-6 */
  /* variantes: variants/section-6.js */
  {
    id: 'section-6',
    name: 'Section-6',
    tags: ['Section 6', 'Hero', '6'],
    html: `    <section class="section-6" aria-label="Destaque do produto com texto">
      <picture>
        <source media="(max-width: 760px)"
          srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-2.png"
          width="780" height="400">
        <img class="section-6__image"
          src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-1.png"
          alt="Caderno Funny Cat com estampa de gatinhos, capa colorida e espiral" width="1600" height="650"
          loading="eager" fetchpriority="high" decoding="async">
      </picture>
      <div class="section-6__content">
        <h1 class="section-6__title">Caderno Funny Cat</h1>
        <p class="section-6__description">Organize seus estudos com fofura e estilo!</p>
      </div>
    </section>`,
    css: `  <style>
    /* ===== HERO SECTION — VARIÁVEIS ===== */
    .section-6 {
      --pos-y: 50%;
      --pos-x: 7%;
      --color-title: #ffe178;
      --bg-box: rgba(0, 0, 0, 0.33);

      width: 100%;
      position: relative;
      border-radius: 20px;
      overflow: hidden;
    }

    /* ===== IMAGEM ===== */
    .section-6__image {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 20px;
    }

    /* ===== CONTEÚDO SOBREPOSTO ===== */
    .section-6__content {
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

    .section-6__title {
      font-size: clamp(1.4rem, 3.5vw, 2.6rem);
      color: var(--color-title);
      margin: 0 0 10px;
      line-height: 1.2;
      text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
      font-weight: 800;
    }

    .section-6__description {
      font-size: clamp(0.95rem, 2vw, 1.4rem);
      color: #fff;
      margin: 0 0 24px;
      line-height: 1.5;
      text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.35);
    }

    /* ===== MOBILE ===== */
    @media (max-width: 760px) {
      .section-6__ {
        border-radius: 0;
      }

      .section-6__content {
        position: static;
        transform: none;
        max-width: 100%;
        padding: 24px 20px;
        background: transparent;
        backdrop-filter: none;
        text-align: center;
      }

      .section-6__title {
        font-size: 1.8rem;
        color: #333;
        text-shadow: none;
      }

      .section-6__description {
        font-size: 1.1rem;
        color: #555;
        text-shadow: none;
      }

      .section-6__image {
        width: 95%;
        margin: auto;
        height: auto;
        display: block;
        border-radius: 20px;
      }
    }

    @media (max-width: 480px) {
      .section-6__title {
        font-size: 1.5rem;
      }

      .section-6__description {
        font-size: 1rem;
      }
    }
  </style>`
  },










]);