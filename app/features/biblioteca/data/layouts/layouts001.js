// @ts-nocheck

/*  layouts001.js — Primeiro pacote de layouts do SenkoLib

  RESPONSABILIDADE:
    Registra o array principal de layouts via SenkoLib.register().
    Cada objeto representa um bloco HTML/CSS reutilizável.

  ESTRUTURA DE CADA LAYOUT:
    {
      id:   'section-X',         // identificador único (minúsculo)
      name: 'Section-X (...)',   // nome de exibição
      tags: ['tag1', 'tag2'],    // palavras-chave para busca
      html: `...`,               // HTML do layout
      css:  `...`,               // CSS do layout
    }

//  MARCADORES:
//   Cada objeto é precedido por  /*@@@@Senko - [id] */
//   Esse marcador é usado pelos módulos de edição (senko-fsa.js
//   e senko-github-v2.js) para localizar e substituir o objeto
//   no arquivo sem precisar fazer parse completo do JS.
//
//   PARA ADICIONAR MAIS LAYOUTS:
//     Cole um novo objeto antes do fechamento do array ].
//     Para um novo arquivo de layouts, crie layouts002.js
//     seguindo o mesmo padrão e adicione o <script> no index.html.
//═══════════════════════════════════════════════════════ */

SenkoLib.register([

  /*@@@@Senko - section-1 */
  /* variantes: variants/section-1.js */
  {
    id: 'section-1',
    name: 'Section-1 (Header Imagem)',
    tags: ['header imagem', 'section-1', '1', 'section 1', 'responsivo', 'acessível'],
    html: `<article style="width: 100%;" aria-labelledby="product-main-title"> <!-- fecha esse article lá no final do código, depois de todo conteúdo, e antes do fechamento da div.lp-container -->
    <section class="product-header" aria-label="Cabeçalho do produto">
  <header class="product-header__banner">
    <picture style="width:100%; height:100%; margin:0;">
             <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header.jpg?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header.jpg?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header.jpg?ims=1024x">
      
              <source media="(max-width: 1200px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header.jpg?ims=1200x">
      <img
        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header.jpg"
        alt="Grafismo verde Consul CRD37EB 334L com arcos abstratos" 
        class="product-header__banner-img" loading="eager">
    </picture>
    <div class="product-header__badge" role="img" aria-label="Logo da marca consul dentro de um círculo laranja">
      <img
        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/consul/logo-consul.png"
        alt="" 
        class="product-header__badge-img">
    </div>
  </header>
  <section class="product-header__body" aria-label="Título e descrição do produto">
    <small class="product-header__brand">marca</small>
    <h2 class="product-header__title" id="product-main-title">
     TÍTULO CURTO DO PRODUTO DA FORMA QUE PREFERIR
    </h2>
    <p class="product-header__subtitle">
    Descrição breve do produto, destacando seus principais atributos e benefícios de forma clara e objetiva, para atrair a 
    atenção do consumidor e incentivá-lo a conhecer mais sobre o produto.
    </p>
  </section>
</section>
`,
    css: ` <style>
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
  /* variantes: app/features/biblioteca/data/variants/section-2.js */
  {
    id: 'section-2',
    name: 'Section-2 (Header Vídeo)',
    tags: ['Section-2', 'Section 2', '2', 'vídeo', 'header vídeo', 'responsivo', 'acessível'],
    html: `<section class="video-header" aria-label="Cabeçalho do produto">
    <header class="video-header__banner">
        <video class="video-header__banner-video"
            poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header_precon.webp" preload="none"
            autoplay muted loop playsinline width="1200" height="250" aria-hidden="true">
            <source src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-precon.webm">
        </video>
        <div class="video-header__badge" role="img" aria-label="Logo da marca precon dentro de um círculo laranja">
            <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/precon/logo-precon.png"
                alt="" class="video-header__badge-img">
        </div>
    </header>
    <section class="video-header__body" aria-label="Título e descrição do produto">
        <small class="video-header__brand">precon</small>
        <h2 class="video-header__title" id="video-main-title">
            CONJUNTOS DE PARAFUSO AUTOBROCANTES CERAMICO/BRANCO
        </h2>
        <p class="video-header__subtitle">
            Perfuram e fixam em uma única etapa, dispensando pré-furo. Ideais para agilizar sua obra ou reparo com
            total segurança e firmeza nas aplicações.
        </p>
    </section>
</section>`,
    css: `<style>
* {
  margin: 0;
  padding: 0;
}

.video-header,
.video-header * {
  box-sizing: border-box;
  margin: 0;
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
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.video-header__title {
  color: #000;
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

@media (prefers-contrast: more) {
  .video-header__subtitle {
    color: #000;
  }

  .video-header__brand {
    color: #3a2301;
  }
}

@media (max-width: 768px) {
  .video-header {
    --banner-height: 180px;
  }
}

@media (max-width: 470px) {
  .video-header__subtitle {
    text-align: justify;
    font-size: clamp(0.9rem, 2vw, 1.5rem);
    font-weight: 550;
  }
}
</style>`
  },

  /*@@@@Senko - section-4 */
  /* variantes: variants/section-4.js */
  {
    id: 'section-4',
    name: 'Section-4 (Manual de Instrução)',
    tags: ['Section-4', '4', 'Section 4', 'manual de instrução', 'responsivo', 'acessível'],
    html: `<section class="section-4-manual__container" aria-label="Manual de Instruções do Produto">
  <figure class="section-4-manual__figura" >
    <a href="https://static1.efacil.com.br/wcsstore/AuroraStorefrontAssetStore/PDP/philips-walita/2209713-manual.pdf"
      target="_blank" rel="noopener noreferrer" aria-label="Abrir manual de instruções do produto em PDF em nova aba"
      class="section-4-manual__link">
      <picture style="width:100%; height:100%; margin:0;">
             <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/manual-banner.jpg?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/manual-banner.jpg?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/manual-banner.jpg?ims=1024x">
      
              <source media="(max-width: 1200px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/manual-banner.jpg?ims=1200x">
      <img
        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/manual-banner.jpg"
        class="section-4-manual__imagem" width="1200" height="250" loading="lazy" decoding="async" fetchpriority="low"  alt=""/>
        
    </picture>
    </a>
    <figcaption class="section-4-manual__legenda">
      Manual de Instruções — abrir PDF em nova aba
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

  .section-4-manual__link:focus-visible {
  outline: 3px solid #ff9900;
  outline-offset: 4px;
  border-radius: 0.25rem;
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
    tags: ['Section-5', '5', 'Section 5', 'Tabela Nutricional', 'Responsivo', 'Acessível'],
    html: `<section class="section-5-manual__container" aria-label="Tabela nutricional do produto">
  <figure class="section-5-manual__figura" >
    <a href="https://static1.efacil.com.br/wcsstore/AuroraStorefrontAssetStore/PDP/philips-walita/2209713-manual.pdf"
      target="_blank" rel="noopener noreferrer" aria-label="Abrir tabela nutricional do produto em PDF em nova aba"
      class="section-5-manual__link">
      <picture style="width:100%; height:100%; margin:0;">
             <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/tabela-banner.jpg?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/tabela-banner.jpg?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/tabela-banner.jpg?ims=1024x">
      
              <source media="(max-width: 1200px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/tabela-banner.jpg?ims=1200x">
      <img
        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/tabela-banner.jpg"
        class="section-5-manual__imagem" width="1200" height="250" loading="lazy" decoding="async" fetchpriority="low"  alt=""/>
        
    </picture>
    </a>
    <figcaption class="section-5-manual__legenda">
      Tabela Nutricional — abrir PDF em nova aba
    </figcaption>
  </figure>
</section>`,
    css: `<style>
  .section-5-manual__container {
    width: 100%;
    margin: 0 auto;
    height: auto;
  }

  .section-5-manual__figura {
    margin: 0;
  }

  .section-5-manual__link {
    display: flex;
    align-items: center;
    text-decoration: none;
    width: 100%;
  }

  .section-5-manual__imagem {
    border-radius: 0.25rem;
    height: auto;
    object-fit: cover;
    width: 100%;
  }

  .section-5-manual__legenda {
    font-family: Arial, sans-serif;
    font-size: 0.75rem;
    color: #666;
    margin-top: 0.25rem;
    text-align: center;
  }

  .section-5-manual__link:focus-visible {
  outline: 3px solid #ff9900;
  outline-offset: 4px;
  border-radius: 0.25rem;
}

  @media (min-width: 820px) {

    .section-5-manual__container,
    .section-5-manual__figura,
    .section-5-manual__imagem {
      height: 250px;
    }
  }
</style>
`
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

  
  /*@@@@Senko - section-32 */
  /* variantes: variants/section-32.js */
  {
    id: 'section-32',
    name: 'section-32',
    tags: ['section-32', '32', 'imagem', 'hero', '32.11'],
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

  /*@@@@Senko - section-6 */
  /* variantes: app/features/biblioteca/data/variants/section-6.js */
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
          loading="lazy" fetchpriority="high" decoding="async">
      </picture>
      <div class="section-6__content">
        <h2 class="section-6__title">Caderno Funny Cat</h2>
        <p class="section-6__description">Organize seus estudos com fofura e estilo!</p>
      </div>
    </section>`,
    css: `    <style>
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
                padding: 24px 20px 16px 20px;
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
                margin-bottom: 0;
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

  /*@@@@Senko - section-7 */
  /* variantes: variants/section-7.js */
  {
    id: 'section-7',
    name: 'Section-7',
    tags: ['Fallitens', 'section 7', '7'],
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
  },


  /*@@@@Senko - section-9 */
  /* variantes: app/features/biblioteca/data/variants/section-9.js */
  {
    id: 'section-9',
    name: 'Section-9',
    tags: ['Section 9', '9', 'grid'],
    html: `<section id="faq-section" aria-labelledby="faq-section-title">
    <div id="faq-section__header">
        <h2 id="faq-section__title" id="faq-section-title">Título Principal</h2>
        <p id="faq-section__subtitle">Sub-título</p>
    </div>
    <ul id="faq-section__list">
        <li id="faq-section__item">
            <details id="faq-section__item">
                <summary>
                    <h3 id="faq-section__q-text">Pergunta</h3>
                    <span id="faq-section__icon" aria-hidden="true"></span>
                </summary>
                <div id="faq-section__a-inner">
                    <p id="faq-section__a-text">Resposta</p>
                </div>
            </details>
        </li>
        <li id="faq-section__item">
            <details id="faq-section__item">
                <summary>
                    <h3 id="faq-section__q-text">Pergunta</h3>
                    <span id="faq-section__icon" aria-hidden="true"></span>
                </summary>
                <div id="faq-section__a-inner">
                    <p id="faq-section__a-text">Resposta</p>
                </div>
            </details>
        </li>
        <li id="faq-section__item">
            <details id="faq-section__item">
                <summary>
                    <h3 id="faq-section__q-text">Pergunta</h3>
                    <span id="faq-section__icon" aria-hidden="true"></span>
                </summary>
                <div id="faq-section__a-inner">
                    <p id="faq-section__a-text">Resposta</p>
                </div>
            </details>
        </li>
        <li id="faq-section__item">
            <details id="faq-section__item">
                <summary>
                    <h3 id="faq-section__q-text">Pergunta</h3>
                    <span id="faq-section__icon" aria-hidden="true"></span>
                </summary>
                <div id="faq-section__a-inner">
                    <p id="faq-section__a-text">Resposta</p>
                </div>
            </details>
        </li>
        <li id="faq-section__item">
            <details id="faq-section__item">
                <summary>
                    <h3 id="faq-section__q-text">Pergunta</h3>
                    <span id="faq-section__icon" aria-hidden="true"></span>
                </summary>
                <div id="faq-section__a-inner">
                    <p id="faq-section__a-text">Resposta</p>
                </div>
            </details>
        </li>
    </ul>
</section>`,
    css: `<style>
    /*inicio-area-de-faq*/
    #faq-section {
        width: 100%;
        padding: 2rem 16px;
        box-sizing: border-box;
        margin: 0 auto 25px;
        padding-top: 0;
        font-family: sans-serif;
    }

    #faq-section__header {
        text-align: center;
        margin: 1rem 0;
    }

    #faq-section__title {
        font-size: clamp(1.5rem, 3vw, 2rem);
        font-weight: bold;
        color: #333;
        margin: 0 0 12px;
        line-height: 98%;
    }

    #faq-section__subtitle {
        font-size: 1rem;
        color: #666;
        margin: 0;
    }

    #faq-section__list {
        list-style: none;
        margin: 0 auto;
        padding: 0;
        max-width: 60rem;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    #faq-section__item {
        background: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 12px;
        overflow: hidden;
    }

    #faq-section__item summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 16px 20px;
        cursor: pointer;
        list-style: none;
    }

    #faq-section__item summary::-webkit-details-marker {
        display: none;
    }

    #faq-section__item summary:hover {
        background: #f9f9f9;
    }

    #faq-section__q-text {
        font-size: 1rem;
        font-weight: bold;
        color: #333;
        flex: 1;
    }

    #faq-section__q-text:hover {
        color: #ea5b0c;
    }

    #faq-section__icon {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        position: relative;
    }

    #faq-section__icon::before,
    #faq-section__icon::after {
        content: '';
        position: absolute;
        background: #888;
        border-radius: 2px;
        transition: transform 0.25s ease, opacity 0.25s ease;
    }

    #faq-section__icon::before {
        width: 12px;
        height: 1.5px;
        top: 9px;
        left: 4px;
    }

    #faq-section__icon::after {
        width: 1.5px;
        height: 12px;
        top: 4px;
        left: 9px;
    }

    #faq-section__item[open] #faq-section__icon::after {
        transform: rotate(90deg);
        opacity: 0;
    }

    #faq-section__a-inner {
        padding: 14px 20px 16px;
        border-top: 1px solid #e5e5e5;
    }

    #faq-section__a-text {
        font-size: 0.9rem;
        color: #555;
        line-height: 1.6;
        margin: 0;
    }

    @media (max-width: 480px) {
        #faq-section__q-text {
            font-size: 0.9rem;
        }
    }
    /*final-area-de-faq*/
</style>`
  },

  
  /*@@@@Senko - section-11 */
  /* variantes: variants/section-11.js */
  {
    id: 'section-11',
    name: 'Section-11',
    tags: ['Section 11', '11', 'grid'],
    html: `        <section class="section-11" aria-labelledby="section-11-title">
            <div class="section-11-container">
                <header class="section-11__header">
                    <h2 class="section-11__title" id="section-11-title">Diferenciais que garantem uma instalação superior</h2>
                </header>
                <ul class="section-11__grid" role="list">
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image" src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png" alt="Ícone de formato universitário"
                                width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">Flexibilidade Classe 4/5</h3>
                        <p class="section-11__value">Cobre de têmpera mole que desliza facilmente pelos eletrodutos, economizando tempo e esforço na instalação</p>
                    </li>
                </ul>
            </div>
        </section>`,
    css: `    <style>
        .section-11-container {
            padding-bottom: 3rem;
            padding-left: 1rem;
            padding-right: 1rem;
        }

        @media (min-width: 576px) {
            .section-11-container {
                max-width: 576px;
                margin-inline: auto;
            }
        }

        @media (min-width: 768px) {
            .section-11-container {
                max-width: 768px;
            }
        }

        @media (min-width: 992px) {
            .section-11-container {
                max-width: 992px;
            }
        }

        @media (min-width: 1200px) {
            .section-11-container {
                max-width: 1200px;
            }
        }

        @media (min-width: 1536px) {
            .section-11-container {
                max-width: 1536px;
            }
        }

        .section-11__header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .section-11__title {
            font-size: 32px;
            font-weight: 900;
            color: #1a1a1a;
            margin: 0;
            line-height: 1.25;
        }

        .section-11__grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
            list-style: none;
            margin: 0;
            padding: 0;
        }

        @media (min-width: 768px) {
            .section-11__grid {
                grid-template-columns: repeat(3, minmax(0, 1fr));
            }
        }

        @media (min-width: 992px) {
            .section-11__grid {
                grid-template-columns: repeat(5, minmax(0, 1fr));
            }
        }

        .section-11__item {
            background: #fff;
            border: 0.5px solid rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            padding: 1.5rem 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.75rem;
            transition: border-color 0.2s;
        }

        .section-11__item:hover {
            border-color: rgba(0, 0, 0, 0.22);
        }

        .section-11__figure {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 72px;
            height: 72px;
        }

        .section-11__image {
            width: 4.6rem;
            height: auto;
            display: block;
        }

        .section-11__name {
            font-size: 0.9375rem;
            font-weight: 500;
            color: #1a1a1a;
            margin: 0;
            line-height: 1.3;
        }

        .section-11__value {
            font-size: 0.875rem;
            color: #666;
            margin: 0;
            line-height: 1.4;
        }
    </style>`
  },

  /*@@@@Senko - section-12 */
  /* variantes: variants/section-12.js */
  {
    id: 'section-12',
    name: 'Section-12',
    tags: ['Section-12', '12', 'full width', 'slide'],
    html: `    <section class="section-12-container">
      <figure class="section-12 section-12--minimal" aria-label="Comparador antes e depois minimalista">
        <div class="section-12__wrapper" role="img" aria-label="Animação comparando antes e depois">
          <img class="section-12__image-after" 
            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/philco/smart-tv-philco-4k-uhd-tecnologia-hdr10-otimizada-01577-22-11928-10.png"
            alt="Tecnologia HDR10 e 4K UHD em Smart TV Philco proporcionando brilho e nitidez superior" loading="lazy"
            decoding="async" />
          <img class="section-12__image-before"
            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/philco/smart-tv-philco-4k-uhd-qualidade-imagem-padrao-01577-22-11928-09.png"
            alt="Comparativo de qualidade imagem normal em Smart TV Philco exibindo paisagem de aurora boreal"
            loading="lazy" decoding="async" />
          <div class="section-12__divider"></div>
        </div>
        <figcaption style="text-align: center; margin-top: 10px; color: #444;">Tecnologia SDR para HDR: Cores mais vivas
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
  },


  /*@@@@Senko - section-13 */
  /* variantes: variants/section-13.js */
  {
    id: 'section-13',
    name: 'Section-13',
    tags: ['13', 'celular', 'section-13'],
    html: `    <div class="section-13-container">
      <section class="section-13" aria-label="Demonstração em vídeo do produto">
        <figure class="section-13__phone-wrap">
          <div class="section-13__phone" role="img" aria-label="Celular exibindo vídeo do produto">
            <div class="section-13__notch" aria-hidden="true"></div>
            <!-- Tela -->
            <div class="section-13__screen">
              <video class="section-13__video" src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/risque/Lollapalooza.mov" autoplay muted loop playsinline loading="lazy"
                aria-label="Demonstração em vídeo do produto"></video>
            </div>
          </div>
          <figcaption class="section-13__caption">
            <p class="section-13__caption-title">Veja em ação</p>
            <p class="section-13__caption-desc">Acompanhe como o produto funciona na prática em um vídeo demonstrativo.
            </p>
          </figcaption>
        </figure>
      </section>
    </div>`,
    css: `  <style>
    /* ── CONTAINER UNIVERSAL ─────────────────────────── */
    .section-13-container {
      padding-top: 20px;
      padding-bottom: 20px;
    }

    @media (min-width: 768px) {
      .section-13-container {
        padding-top: 28px;
        padding-bottom: 28px;
      }
    }

    @media (min-width: 1200px) {
      .section-13-container {
        padding-top: 25px;
        padding-bottom: 25px;
      }
    }

    /* ── SECTION BASE ────────────────────────────────── */
    .section-13 {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
    }

    /* ── PHONE WRAPPER ───────────────────────────────── */
    .section-13__phone-wrap {
      position: relative;
      width: 220px;
      flex-shrink: 0;
    }

    @media (min-width: 576px) {
      .section-13__phone-wrap {
        width: 260px;
      }
    }

    @media (min-width: 768px) {
      .section-13__phone-wrap {
        width: 300px;
      }
    }

    @media (min-width: 992px) {
      .section-13__phone-wrap {
        width: 340px;
      }
    }

    /* ── PHONE FRAME ─────────────────────────────────── */
    .section-13__phone {
      position: relative;
      width: 100%;
      aspect-ratio: 9 / 19.5;
      background: #0d0d0d;
      border-radius: 40px;
      box-shadow: 0 0 0 2px #2a2a2a, 0 0 0 4px #111, 0 0 0 6px #3a3a3a, 0 0 15px 1px rgb(0 0 0 / 29%), inset 0 0 0 1px rgba(255, 255, 255, 0.06);
      overflow: hidden;
    }

    /* Brilho lateral esquerdo */
    .section-13__phone::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(115deg,
          rgba(255, 255, 255, 0.08) 0%,
          transparent 40%);
      border-radius: inherit;
      z-index: 3;
      pointer-events: none;
    }

    /* ── NOTCH / DYNAMIC ISLAND ──────────────────────── */
    .section-13__notch {
      position: absolute;
      top: 14px;
      left: 50%;
      transform: translateX(-50%);
      width: 28%;
      height: 22px;
      background: #0d0d0d;
      border-radius: 20px;
      z-index: 4;
    }

    /* ── SCREEN ──────────────────────────────────────── */
    .section-13__screen {
      position: absolute;
      inset: 0;
      border-radius: 38px;
      overflow: hidden;
      z-index: 2;
    }

    /* ── VIDEO ───────────────────────────────────────── */
    .section-13__video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* ── GLOW AMBIENTAL ──────────────────────────────── */
    .section-13__glow {
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      height: 60px;
      background: radial-gradient(ellipse at center, rgba(80, 140, 255, 0.25) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      filter: blur(8px);
    }

    /* ── CAPTION ─────────────────────────────────────── */
    .section-13__caption {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 1.1rem;
    }

    .section-13__caption-title {
      font-family: sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #111;
      letter-spacing: 0.02em;
    }

    .section-13__caption-desc {
      font-family: sans-serif;
      font-size: 13px;
      color: #666;
      line-height: 1.5;
      max-width: 280px;
    }

    @media (min-width: 768px) {
      .section-13__caption-title {
        font-size: 15px;
      }

      .section-13__caption-desc {
        font-size: 14px;
        max-width: 320px;
      }
    }
  </style>`
  },

  /*@@@@Senko - section-14 */
  /* variantes: variants/section-14.js */
  {
    id: 'section-14',
    name: 'Section-14',
    tags: ['Section-14', '14'],
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
  },


  
/*@@@@Senko - section-16 */
  /* variantes: variants/section-16.js */
  {
    id: 'section-16',
    name: 'Section-16',
    tags: ['Alerta', 'Ingredientes'],
    html: `    <section class="section-ingredients" aria-labelledby="ingredients-title">
      <div class="section-ingredients__inner">
        <h2 class="section-ingredients__title" id="ingredients-title">Ingredientes</h2>
        <p class="section-ingredients__text">
          Sal, pimenta-do-reino preta, coentro, cominho, orégano, cúrcuma, pimenta-calabresa, fécula de mandioca e
          antiumectante dióxido de silício.
        </p>
        <div class="section-ingredients__alert" role="alert" aria-live="polite">
          <span class="section-ingredients__alert-icon" aria-hidden="true">⚠️</span>
          <p class="section-ingredients__alert-text">
            <strong>Informação sobre alérgenos</strong>
            Contém glúten. Pode conter trigo, aveia e macadâmia. Embalagem com 24 unidades de 40g.
          </p>
        </div>
      </div>
    </section>`,
    css: `  <style>
    .section-ingredients {
      width: 100%;
      background-color: #fff8f0;
      padding: 2rem 1.5rem;
    }

    .section-ingredients__inner {
      max-width: 768px;
      margin: 0 auto;
    }

    .section-ingredients__title {
      font-size: clamp(1.1rem, 3vw, 1.4rem);
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 1rem;
      text-align: center;
    }

    .section-ingredients__text {
      font-size: 0.9rem;
      color: #555;
      line-height: 1.7;
      text-align: center;
      margin-bottom: 1.25rem;
    }

    .section-ingredients__alert {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      background: #fffbee;
      border: 1px solid #f5c542;
      border-radius: 10px;
      padding: 0.9rem 1rem;
    }

    .section-ingredients__alert-icon {
      font-size: 1.2rem;
      flex-shrink: 0;
      line-height: 1.4;
    }

    .section-ingredients__alert-text {
      font-size: 0.85rem;
      color: #7a5a00;
      line-height: 1.55;
    }

    .section-ingredients__alert-text strong {
      display: block;
      font-size: 0.9rem;
      margin-bottom: 0.2rem;
    }

    @media (min-width: 768px) {
      .section-ingredients {
        padding: 2.5rem 2rem;
      }
    }
  </style>`
  },

/*@@@@Senko - carrossel-com-nav */
  /* variantes: variants/carrossel-com-nav.js */
  {
    id: 'carrossel-com-nav',
    name: 'Section 17',
    tags: ['Carrossel', 'diversos', 'nav', '32', 'interativo'],
    html: `<section class="c32-carousel" role="region" aria-roledescription="carousel" aria-label="Destaques Pedigree Barriguinha Saudável">

  <!-- Radios: Escondidos visualmente (sr-only) para permitir navegação via teclado (setas) -->
  <input type="radio" name="c32" id="c32-s1" class="sr-only" checked>
  <input type="radio" name="c32" id="c32-s2" class="sr-only">

  <!-- Navegação: Labels que funcionam como botões -->
  <nav class="c32-nav" aria-label="Selecionar slide">
    <label for="c32-s1" class="c32-nav__btn">Salmão</label>
    <label for="c32-s2" class="c32-nav__btn">Peru</label>
  </nav>

  <!-- Slides -->
  <div class="c32-slides" aria-live="polite">

    <!-- SLIDE 1 -->
    <div class="c32-slide" role="group" aria-roledescription="slide" aria-label="1 de 2">
      <picture class="section-32__groupimage-section">
        <source media="(max-width: 430px)"  srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_salmão_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-4.jpg?ims=430x">
        <source media="(max-width: 768px)"  srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_salmão_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-4.jpg?ims=768x">
        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_salmão_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-4.jpg?ims=1024x">
        <source media="(max-width: 1238px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_salmão_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-4.jpg?ims=1238x">
        <source media="(max-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_salmão_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-4.jpg?ims=1440x">
        <source media="(min-width: 1441px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_salmão_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-4.jpg">
        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_salmão_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-4.jpg"
          alt="Duas embalagens de ração Pedigree Barriguinha Saudável sabor Salmão (2,7kg e 900g) ao lado de um cão em fundo amarelo."
          style="border-radius: 0px 0px 0px 0px;" width="1600" height="865"
          loading="lazy" decoding="async" fetchpriority="low">
      </picture>
    </div>

    <!-- SLIDE 2 -->
    <div class="c32-slide" role="group" aria-roledescription="slide" aria-label="2 de 2">
      <picture class="section-32__groupimage-section">
        <source media="(max-width: 430px)"  srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_peru_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-04.jpg?ims=430x">
        <source media="(max-width: 768px)"  srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_peru_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-04.jpg?ims=768x">
        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_peru_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-04.jpg?ims=1024x">
        <source media="(max-width: 1238px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_peru_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-04.jpg?ims=1238x">
        <source media="(max-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_peru_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-04.jpg?ims=1440x">
        <source media="(min-width: 1441px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_peru_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-04.jpg">
        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_peru_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-04.jpg"
          alt="Duas embalagens de ração Pedigree Barriguinha Saudável sabor Peru (2,7kg e 900g) ao lado de um cão em fundo amarelo."
          style="border-radius: 0px 0px 0px 0px;" width="1600" height="865"
          loading="lazy" decoding="async" fetchpriority="low">
      </picture>
    </div>

  </div>
</section>`,
    css: `.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Melhora a percepção de foco: Quando o rádio for focado via teclado, 
   destaque a label correspondente */
input[type="radio"]:focus + .c32-nav label[for="c32-s1"],
input[type="radio"]:focus + .c32-nav label[for="c32-s2"] {
  outline: 2px solid #000; /* Ou o estilo de foco da sua marca */
}

/* ── Reset e container ── */
  .c32-carousel {
    position: relative;
    width: 100%;
  }

  /* ── Radios ocultos — motor do carrossel ── */
  .c32-carousel input[type="radio"] {
    display: none;
  }

  /* ── Barra de navegação ── */
  .c32-nav {
    position: absolute;
    display: flex;
    flex-direction: row; 
    z-index: 30;
    width: 30%;
    gap: 6vw;
    align-items: center;
    justify-content: center;
    margin-top: 10rem;
    left: 50%;
  }

  .c32-nav label {
    display: flex;
    line-height: 1.2vh;
    flex: 1;
    padding: 2rem 2rem;
    font-size: 1.5em;
    font-weight: 650;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: rgb(255, 255, 255);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    text-align: center;
    transition: color 0.25s, border-color 0.25s;
    background: #ea5b0c;
    border-radius: 1.7vw;
    box-shadow: #00000093 -5px 5.5px 5px;
    font-family: sans-serif;
  }

  .c32-nav label:hover {
    color: rgba(255, 255, 255, 0.8);
    background-color: #e74011;
  }

  /* ── Label ativo — um por slide ── */
  #c32-s1:checked ~ .c32-nav label[for="c32-s1"],
  #c32-s2:checked ~ .c32-nav label[for="c32-s2"],
  #c32-s3:checked ~ .c32-nav label[for="c32-s3"],
  #c32-s4:checked ~ .c32-nav label[for="c32-s4"] {
    color: #fff;
    border-bottom-color: #fff;
  }

  /* ── Área dos slides: empilha tudo no mesmo espaço via grid ── */
  .c32-slides {
    display: grid;
  }

  .c32-slide {
    grid-column: 1;
    grid-row: 1;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
    position: relative;
  }

  /* ── Slide ativo — um por slide ── */
  #c32-s1:checked ~ .c32-slides .c32-slide:nth-child(1),
  #c32-s2:checked ~ .c32-slides .c32-slide:nth-child(2),
  #c32-s3:checked ~ .c32-slides .c32-slide:nth-child(3),
  #c32-s4:checked ~ .c32-slides .c32-slide:nth-child(4) {
    opacity: 1;
    pointer-events: auto;
  }

  /* ── Imagem responsiva ── */



 @keyframes c32-bounce {
  from { transform: translateX(60px); filter: blur(12px); opacity: 0; }
  to   { transform: translateX(0);    filter: blur(0);    opacity: 1; }
}

/* substitui os 4 seletores de "slide ativo" que já estão no CSS */
#c32-s1:checked ~ .c32-slides .c32-slide:nth-child(1),
#c32-s2:checked ~ .c32-slides .c32-slide:nth-child(2),
#c32-s3:checked ~ .c32-slides .c32-slide:nth-child(3),
#c32-s4:checked ~ .c32-slides .c32-slide:nth-child(4) {
  animation: c32-bounce;
  pointer-events: auto;
}

 .section-32__groupimage-section {
      position: relative;
      width: 100%;
      margin: 0;
      contain: layout style;
    }

  @media (max-width: 1060px) {

        .c32-nav {
          width: 30%;
          gap: 4vh;
          margin-top: 6.5rem;
        }

        .c32-nav label {
          font-size: 1.8em;
          font-weight: 600;
          line-height: 2.5vh;
          border-radius: 1.2vw;
          border-bottom: 2px solid transparent;
          padding: 1rem;
        
        }

        }

            
    @media (max-width: 960px) {

              .c32-nav {
          width: 30%;
          gap: 5vh;
        }

        .c32-nav label {
          font-size: 1.8em;
          font-weight: 600;
          line-height: 2.5vh;
          border-radius: 1.2vw;
          border-bottom: 2px solid transparent;
          padding: 0.8rem;
        
        }


        }

          @media (max-width: 768px) {

             .c32-nav {
          width: 30%;
          gap: 2.5vh;
        }

        .c32-nav label {
          font-size: 1em;
          line-height: 2vh;
          border-radius: 1.5vw;
          border-bottom: 2px solid transparent;
        
        }

     }

     @media (max-width: 600px) {


        .c32-nav {
          width: 30%;
          gap: 2vh;
        }

        .c32-nav label {
          font-size: 0.8em;
          line-height: 2vh;
          border-radius: 3vw;
          border-bottom: 2px solid transparent;
          padding: 0.5rem;
        
        }
    }

         @media (max-width: 500px) {

        .c32-nav label {
          font-size: 0.6em;
          line-height: 2vh;
          padding: 0.4rem 0.5rem;
          border-bottom: 1px solid transparent;
          box-shadow: #00000093 -3px 3px 3px;
        }

        .c32-nav {
           margin-top: 5rem;
  }
    
 }       


       @media (max-width: 440px) {  

        .c32-nav {
          margin-top: 5rem;
        }

          .c32-nav label {
          line-height: 1vh;
            
        
        }
  }

         @media (max-width: 375px) {

        .c32-nav {
          width: 30%;
        }

        .c32-nav label {
          font-size: 0.6em;
          line-height: 1vh;
          padding: 0.3rem 0.5rem;
        
        }

        
    }

             @media (max-width: 320px) {

        .c32-nav label {
          padding: 0.2rem 0.5rem;
        
        }

     }`
  },

/*@@@@Senko - section-21 */
  /* variantes: variants/section-21.js */
  {
    id: 'section-21',
    name: 'Section-18',
    tags: ['cards', 'clicavel', 'interativo', 'diversos'],
    html: ` <section class="features-section">
    <div class="section-header" aria-labelledby="main-title">
        <h2 id="main-title">TUDO O QUE VOCÊ PROCURA</h2>
    </div>

    <!-- Inputs de rádio agrupados para acessibilidade -->
    <div role="radiogroup" aria-label="Escolha uma característica para visualizar">
        <input type="radio" id="feat1" name="feature" class="sr-only" checked>
        <input type="radio" id="feat2" name="feature" class="sr-only">
        <input type="radio" id="feat3" name="feature" class="sr-only">

        <div class="grid-container">
            <!-- Coluna Esquerda -->
            <aside class="column" aria-label="Funcionalidade de resistência">
                <label for="feat1" class="feature-card" role="radio" aria-checked="true" tabindex="0">
                    <article>
                        <h2>É RESISTENTE?</h2>
                        <p>Sim! Possui caixa de engrenagem metálica para maior vida útil e interruptor selado que bloqueia a entrada de pó.</p>
                    </article>
                </label>
            </aside>

            <!-- Coluna Central: Imagens (Picture) e Card 2 -->
            <section class="image-display" aria-label="Imagem ilustrativa da funcionalidade selecionada">
                <div class="circle-frame" aria-live="polite" aria-label="Imagem da funcionalidade selecionada">
                    
                    <!-- IMAGEM 1 RESPONSIVA -->
                    <picture class="img1">
                        <source media="(max-width: 320px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-acabamento-solda-metal-509478-03.jpg?ims=492x">
                        <source media="(max-width: 375px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-acabamento-solda-metal-509478-03.jpg?ims=301x">
                        <source media="(min-width: 400px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-acabamento-solda-metal-509478-03.jpg?ims=318x">
                        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-acabamento-solda-metal-509478-03.jpg?ims=318x">
                        <source media="(max-width: 1280px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-acabamento-solda-metal-509478-03.jpg?ims=400x">
                        <source media="(min-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-acabamento-solda-metal-509478-03.jpg?ims=400x">
                        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-acabamento-solda-metal-509478-03.jpg" 
                        alt="Operador com Esmerilhadeira Black & Decker realizando acabamento sobre solda">
                    </picture>

                    <!-- IMAGEM 2 RESPONSIVA -->
                    <picture class="img2">
                       <source media="(max-width: 320px)" srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-limpeza-superficie-enferrujada-509478-04.jpg?ims=492x">
                        <source media="(max-width: 375px)" srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-limpeza-superficie-enferrujada-509478-04.jpg?ims=301x">
                        <source media="(min-width: 400px)" srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-limpeza-superficie-enferrujada-509478-04.jpg?ims=318x">
                        <source media="(max-width: 1024px)" srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-limpeza-superficie-enferrujada-509478-04.jpg?ims=318x">
                        <source media="(max-width: 1280px)" srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-limpeza-superficie-enferrujada-509478-04.jpg?ims=400x">
                        <source media="(min-width: 1440px)" srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-limpeza-superficie-enferrujada-509478-04.jpg?ims=400x">
                        <img src="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-limpeza-superficie-enferrujada-509478-04.jpg" 
                        alt="Esmerilhadeira Black & Decker G720XB2 limpando superfície enferrujada">
                    </picture>

                    <!-- IMAGEM 3 RESPONSIVA -->
                    <picture class="img3">
                        <source media="(max-width: 320px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-desbaste-borda-chapa-metal-509478-05.jpg?ims=492x">
                        <source media="(max-width: 375px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-desbaste-borda-chapa-metal-509478-05.jpg?ims=301x">
                        <source media="(min-width: 400px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-desbaste-borda-chapa-metal-509478-05.jpg?ims=318x">
                        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-desbaste-borda-chapa-metal-509478-05.jpg?ims=318x">
                        <source media="(max-width: 1280px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-desbaste-borda-chapa-metal-509478-05.jpg?ims=400x">
                        <source media="(min-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-desbaste-borda-chapa-metal-509478-05.jpg?ims=400x">
                        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-desbaste-borda-chapa-metal-509478-05.jpg" 
                        alt="Esmerilhadeira Black & Decker desbastando borda de peça metálica espessa">
                    </picture>

                </div>

                <label for="feat2" class="feature-card" role="radio" style="width: 90%;" aria-checked="false" tabindex="0">
                    <article>
                        <h2>A PEGADA É SEGURA?</h2>
                        <p>Sua carcaça é emborrachada e conta com empunhadura ergonômica de 3 posições, dando total controle.</p>
                    </article>
                </label>
            </section>

            <!-- Coluna Direita -->
            <aside class="column" aria-label="Funcionalidade de troca de disco">
                <label for="feat3" class="feature-card" role="radio" aria-checked="false" tabindex="0">
                    <article>
                        <h2>É FÁCIL TROCAR DISCO?</h2>
                        <p>A troca de disco é rápida graças ao botão de trava do eixo e o ajuste da guarda é feito sem ferramentas.</p>
                    </article>
                </label>
            </aside>
        </div>
    </div>
</section>`,
    css: `   .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
        }

        .features-section {
            max-width: 1200px;
            margin: 40px auto;
            background: white;
            border-radius: 40px;
            padding: 60px 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.05);
            font-family: sans-serif;
        }

        .section-header {
            text-align: center;
            margin-bottom: 50px;
        }

        .section-header h2 {
            font-size: 2rem;
            line-height: 2rem;
            color: #000;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .section-header p {
            color: #8a8a8a;
            max-width: 600px;
            margin: 0 auto;
        }

        /* Layout Grid */
        .grid-container {
            display: grid;
            grid-template-columns: 1fr 1.2fr 1fr;
            gap: 30px;
            align-items: center;
        }

        .column {
            display: flex;
            flex-direction: column;
            gap: 30px;
        }

        /* Container da Imagem Central */
        .image-display {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 40px;
        }

        .circle-frame {
            width: 100%;
            max-width: 400px;
            aspect-ratio: 780 / 740;
            border-radius: 50%;
            border: 05px solid #f2540d;
            overflow: hidden;
            position: relative;
            background: #eee;
        }

        /* Ajuste para que o picture se comporte como a imagem antiga */
        .circle-frame picture {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .circle-frame img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        /* Estilo dos Cards */
        .feature-card {
            display: block;
            background: white;
            padding: 25px;
            border-radius: 20px;
            border: 2px solid #eee;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            position: relative;
        }

        .feature-card h2 {
            margin: 0 0 10px 0;
            font-size: 1.2rem;
            color: #000;
            font-weight: 550;
            line-height: 2.2vh;
        }

        .feature-card p {
            margin: 0;
            font-size: 0.95rem;
            color: #666;
            line-height: 1.6;
        }

        /* Animações e Estados Interativos */
        .feature-card:hover {
            background-color: #fffcfa;
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.08);
        }

        /* Feedback visual quando o input invisível é focado ou marcado */
        input:focus-visible + .feature-card {
            outline: 3px solid #f2540d;
            outline-offset: 5px;
        }

        /* Lógica de Troca de Imagens (através da tag picture agora) */
        #feat1:checked ~ .grid-container .img1,
        #feat2:checked ~ .grid-container .img2,
        #feat3:checked ~ .grid-container .img3 {
            opacity: 1;
            z-index: 2;
        }

        #feat1:checked ~ .grid-container label[for="feat1"],
        #feat2:checked ~ .grid-container label[for="feat2"],
        #feat3:checked ~ .grid-container label[for="feat3"] {
            border-color: #f2540d;
            background-color: #fffcfa;
        }

@media (max-width: 1060px) {

        .grid-container {
                grid-template-columns: 1fr;
                gap: 40px;
            }

            .image-display {
                grid-row: 1;
            }

            .circle-frame {
                max-width: 320px;
            }

            .column {
                order: 2;
            }
        }



`
  },

/*@@@@Senko - section-19-carrossel-grid */
  /* variantes: variants/section-19-carrossel-grid.js */
  {
    id: 'section-19-carrossel-grid',
    name: 'Section-19 (Carrossel Grid)',
    tags: ['carrossel', 'grid', 'section 19', '19'],
    html: `<input class="section-19__radio" type="radio" name="slide-19" id="s19-1" checked>
<input class="section-19__radio" type="radio" name="slide-19" id="s19-2">
<input class="section-19__radio" type="radio" name="slide-19" id="s19-3">
<div class="section-19">
    <section class="section-19__wrap" aria-label="Carrossel de aplicações do produto">
        <header class="section-19__header">
            <h3 class="section-19__title">Aplicações do Cabo Flexível Corfio 4,0 mm²</h3>
        </header>

        <div class="section-19__track" role="list">
            <article class="section-19__card" role="listitem">
                <img class="section-19__card-img"
                    src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/megatron/404517_04-2.png"
                    alt="Interior de uma obra em andamento com paredes de gesso cruas, tubulações expostas e luz do sol iluminando a poeira no ar"
                    width="310" height="220" loading="lazy">
                <div class="section-19__card-body">
                    <h4 class="section-19__card-title">Instalações Comerciais e Industriais</h4>
                    <p class="section-19__card-desc">Indicado para circuitos de distribuição de energia em
                        comércios, galpões, áreas técnicas e ambientes industriais, conforme o projeto elétrico</p>
                </div>
            </article>

            <article class="section-19__card" role="listitem">
                <img class="section-19__card-img"
                    src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/megatron/404517_04-1.png"
                    alt="Imagem propositalmente desfocada de uma recepção moderna, bem iluminada e com poltronas dispostas perto de janelas grandes"
                    width="310" height="220" loading="lazy">
                <div class="section-19__card-body">
                    <h4 class="section-19__card-title">Redes Residenciais e Prediais</h4>
                    <p class="section-19__card-desc">Aplicável em casas e prédios residenciais para circuitos
                        que exigem seção nominal de 4,0 mm² e condutor flexível de cobre</p>
                </div>
            </article>

            <article class="section-19__card" role="listitem">
                <img class="section-19__card-img"
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cabo-flexivel-corfio-aplicacao-cozinha-lifestyle-4203793-21.jpg"
                    alt="Ambiente de cozinha residencial com foco em balcão, sugerindo aplicação de cabos elétricos Corfio"
                    width="310" height="220" loading="lazy">
                <div class="section-19__card-body">
                    <h4 class="section-19__card-title">Cozinhas, Áreas de Serviço e Circuitos Específicos</h4>
                    <p class="section-19__card-desc">Pode atender circuitos específicos quando o projeto exigir
                        seção de 4,0 mm², respeitando carga, distância e método de instalação</p>
                </div>
            </article>
        </div>

        <nav class="section-19__nav" aria-label="Navegação do carrossel">
            <div class="section-19__btn-slot section-19__btn--prev">
                <span class="section-19__btn-disabled" aria-hidden="true">&#8592;</span>
                <label for="s19-1" aria-label="Slide anterior">&#8592;</label>
                <label for="s19-2" aria-label="Slide anterior">&#8592;</label>
            </div>

            <div class="section-19__dots" role="tablist" aria-label="Slides">
                <label class="section-19__dot" for="s19-1" role="tab" aria-label="Ir para slide 1"></label>
                <label class="section-19__dot" for="s19-2" role="tab" aria-label="Ir para slide 2"></label>
                <label class="section-19__dot" for="s19-3" role="tab" aria-label="Ir para slide 3"></label>
            </div>

            <div class="section-19__btn-slot section-19__btn--next">
                <label for="s19-2" aria-label="Próximo slide">&#8594;</label>
                <label for="s19-3" aria-label="Próximo slide">&#8594;</label>
                <span class="section-19__btn-disabled" aria-hidden="true">&#8594;</span>
            </div>
        </nav>
    </section>
</div>`,
    css: `<style>
    /* ── Tokens do section-19 ── */
    .section-19 {
        font-family: system-ui, sans-serif;
        width: 100%;
        background: #f3f5f7;
        overflow: hidden;
        border-top: 1px solid #e2e6ea;
        border-bottom: 1px solid #e2e6ea;
    }

    /* ── Inputs ocultos ── */
    .section-19__radio {
        position: absolute;
        display: none;
        width: 0;
        height: 0;
        opacity: 0;
        pointer-events: none;
    }

    /* ── Wrap ── */
    .section-19__wrap {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 34px 0 34px;
        overflow: hidden;
    }

    /* ── Header ── */
    .section-19__header {
        padding: 0 28px;
    }

    .section-19__title {
        font-weight: 700;
        font-size: clamp(1.35rem, 2.8vw, 1.8rem);
        color: #1d2430;
        text-align: center;
        line-height: 1.25;
    }

    /* ── Track ── */
    .section-19__track {
        display: flex;
        gap: 67px;
        padding-left: calc((100% - 310px) / 2);
        padding-right: calc((100% - 310px) / 2);
        transition: transform .44s cubic-bezier(.4, 0, .2, 1);
        transform: translateX(0);
        overflow: visible;
    }

    /* ── Card ── */
    .section-19__card {
        flex: 0 0 310px;
        width: 310px;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #dde2e8;
        box-shadow: 0 12px 30px rgba(28, 35, 52, .08);
        text-align: left;
        transform: scale(0.85);
        opacity: .38;
        transition: transform .44s cubic-bezier(.4, 0, .2, 1), opacity .44s ease, box-shadow .44s ease;
    }

    .section-19__card-img {
        width: 100%;
        object-fit: cover;
        display: block;
        border-bottom: 3px solid #ef8f22;
    }

    .section-19__card-body {
        padding: 16px 16px 18px;
    }

    .section-19__card-title {
        font-size: 1.05rem;
        font-weight: 700;
        line-height: 1.3;
        margin-bottom: 8px;
        color: #2f2f82;
    }

    .section-19__card-desc {
        font-size: 0.92rem;
        color: #586070;
        line-height: 1.55;
        font-weight: 400;
        margin: 0;
    }

    /* ── Estado ativo — Mobile: 1 card ── */
    #s19-1:checked~.section-19 .section-19__card:nth-child(1),
    #s19-2:checked~.section-19 .section-19__card:nth-child(2),
    #s19-3:checked~.section-19 .section-19__card:nth-child(3) {
        transform: scale(1);
        opacity: 1;
        box-shadow: 0 18px 40px rgba(28, 35, 52, .12);
    }

    #s19-1:checked~.section-19 .section-19__track {
        transform: translateX(calc(0 * (310px + 67px) * -1));
    }

    #s19-2:checked~.section-19 .section-19__track {
        transform: translateX(calc(1 * (310px + 67px) * -1));
    }

    #s19-3:checked~.section-19 .section-19__track {
        transform: translateX(calc(2 * (310px + 67px) * -1));
    }

    /* ── Tablet ≥ 768px — 2 cards visíveis ── */
    @media (min-width: 768px) {
        .section-19__track {
            gap: 24px;
            padding-left: calc((100% - 2 * 230px - 24px) / 2);
            padding-right: calc((100% - 2 * 230px - 24px) / 2);
        }

        .section-19__card {
            flex: 0 0 230px;
            width: 230px;
        }

        #s19-1:checked~.section-19 .section-19__card:nth-child(1),
        #s19-1:checked~.section-19 .section-19__card:nth-child(2),
        #s19-2:checked~.section-19 .section-19__card:nth-child(2),
        #s19-2:checked~.section-19 .section-19__card:nth-child(3),
        #s19-3:checked~.section-19 .section-19__card:nth-child(2),
        #s19-3:checked~.section-19 .section-19__card:nth-child(3) {
            transform: scale(1);
            opacity: 1;
            box-shadow: 0 18px 40px rgba(28, 35, 52, .12);
        }

        #s19-1:checked~.section-19 .section-19__track {
            transform: translateX(0);
        }

        #s19-2:checked~.section-19 .section-19__track {
            transform: translateX(calc(1 * (230px + 24px) * -1));
        }

        #s19-3:checked~.section-19 .section-19__track {
            transform: translateX(calc(1 * (230px + 24px) * -1));
        }
    }

    /* ── Desktop ≥ 992px — 3 cards visíveis ── */
    @media (min-width: 992px) {
        .section-19__track {
            gap: 20px;
            padding-left: calc((100% - 3 * 280px - 2 * 20px) / 2);
            padding-right: calc((100% - 3 * 280px - 2 * 20px) / 2);
        }

        .section-19__card {
            flex: 0 0 280px;
            width: 280px;
            transform: scale(0.83);
        }

        #s19-1:checked~.section-19 .section-19__card:nth-child(1),
        #s19-1:checked~.section-19 .section-19__card:nth-child(2),
        #s19-1:checked~.section-19 .section-19__card:nth-child(3),
        #s19-2:checked~.section-19 .section-19__card:nth-child(1),
        #s19-2:checked~.section-19 .section-19__card:nth-child(2),
        #s19-2:checked~.section-19 .section-19__card:nth-child(3),
        #s19-3:checked~.section-19 .section-19__card:nth-child(1),
        #s19-3:checked~.section-19 .section-19__card:nth-child(2),
        #s19-3:checked~.section-19 .section-19__card:nth-child(3) {
            transform: scale(1);
            opacity: 1;
            box-shadow: 0 18px 40px rgba(28, 35, 52, .12);
        }

        #s19-1:checked~.section-19 .section-19__track,
        #s19-2:checked~.section-19 .section-19__track,
        #s19-3:checked~.section-19 .section-19__track {
            transform: translateX(0);
        }
    }

    /* ── Navegação ── */
    .section-19__nav {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
        padding: 0 28px;
    }

    .section-19__dots {
        display: flex;
        gap: 7px;
        align-items: center;
    }

    .section-19__dot {
        display: block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #2f2f82;
        opacity: .35;
        cursor: pointer;
        transition: opacity .25s, width .3s, background .25s, border-radius .3s;
    }

    #s19-1:checked~.section-19 .section-19__dot[for="s19-1"],
    #s19-2:checked~.section-19 .section-19__dot[for="s19-2"],
    #s19-3:checked~.section-19 .section-19__dot[for="s19-3"] {
        opacity: 1;
        background: #ef8f22;
        width: 20px;
        border-radius: 100px;
    }

    /* ── Botões prev/next ── */
    .section-19__btn-slot {
        position: relative;
        width: 40px;
        height: 40px;
        flex-shrink: 0;
    }

    .section-19__btn-slot label {
        position: absolute;
        inset: 0;
        display: none;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: #2f2f82;
        border: 1px solid rgba(47, 47, 130, .1);
        color: #fefefe;
        font-size: 17px;
        cursor: pointer;
        transition: background .2s, border-color .2s, transform .15s;
        user-select: none;
    }

    .section-19__btn-slot label:hover {
        background: #ef8f22;
        border-color: #ef8f22;
        transform: scale(1.1);
    }

    .section-19__btn-slot label:active {
        transform: scale(.93);
    }

    .section-19__btn-disabled {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #2f2f82;
        border: 1px solid rgba(47, 47, 130, .1);
        opacity: .2;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 17px;
        color: #f2f2f2;
        pointer-events: none;
    }

    /* Padrão: disabled visível, labels ocultos */
    .section-19__btn-slot label {
        display: none;
    }

    .section-19__btn-disabled {
        display: flex;
    }

    /* PREV */
    #s19-1:checked~.section-19 .section-19__btn--prev .section-19__btn-disabled {
        display: flex;
    }

    #s19-1:checked~.section-19 .section-19__btn--prev label {
        display: none;
    }

    #s19-2:checked~.section-19 .section-19__btn--prev .section-19__btn-disabled {
        display: none;
    }

    #s19-2:checked~.section-19 .section-19__btn--prev label {
        display: none;
    }

    #s19-2:checked~.section-19 .section-19__btn--prev label[for="s19-1"] {
        display: flex;
    }

    #s19-3:checked~.section-19 .section-19__btn--prev .section-19__btn-disabled {
        display: none;
    }

    #s19-3:checked~.section-19 .section-19__btn--prev label {
        display: none;
    }

    #s19-3:checked~.section-19 .section-19__btn--prev label[for="s19-2"] {
        display: flex;
    }

    /* NEXT */
    #s19-1:checked~.section-19 .section-19__btn--next .section-19__btn-disabled {
        display: none;
    }

    #s19-1:checked~.section-19 .section-19__btn--next label {
        display: none;
    }

    #s19-1:checked~.section-19 .section-19__btn--next label[for="s19-2"] {
        display: flex;
    }

    #s19-2:checked~.section-19 .section-19__btn--next .section-19__btn-disabled {
        display: none;
    }

    #s19-2:checked~.section-19 .section-19__btn--next label {
        display: none;
    }

    #s19-2:checked~.section-19 .section-19__btn--next label[for="s19-3"] {
        display: flex;
    }

    #s19-3:checked~.section-19 .section-19__btn--next .section-19__btn-disabled {
        display: flex;
    }

    #s19-3:checked~.section-19 .section-19__btn--next label {
        display: none;
    }

    @media (min-width: 992px) {
        .section-19__nav {
            display: none;
        }
    }
</style>`
  },

/*@@@@Senko - section-20 */
  /* variantes: variants/section-20.js */
  {
    id: 'section-20',
    name: 'Section-20',
    tags: ['bullet points'],
    html: `<section class="section-10" aria-label="Principais características do adesivo">
    <article class="section-10__intro">
        <h2 class="section-10__title">Diferenciais para fixar com confiança</h2>
        <p class="section-10__text">
            Força de montagem, acabamento limpo e resistência para uso interno ou externo.
            Um adesivo para resolver mais aplicações com menos ferramentas.
        </p>
    </article>
    <div class="section-10__grid" aria-label="Lista de benefícios">
        <article class="section-10__item">
            <span class="section-10__marker" aria-hidden="true">✓</span>
            <p class="section-10__label">Nanotecnologia</p>
        </article>
        <article class="section-10__item">
            <span class="section-10__marker" aria-hidden="true">✓</span>
            <p class="section-10__label">Flexível</p>
        </article>
        <article class="section-10__item">
            <span class="section-10__marker" aria-hidden="true">✓</span>
            <p class="section-10__label">Agarre imediato</p>
        </article>
        <article class="section-10__item">
            <span class="section-10__marker" aria-hidden="true">✓</span>
            <p class="section-10__label">Resistente aos raios UV</p>
        </article>
        <article class="section-10__item">
            <span class="section-10__marker" aria-hidden="true">✓</span>
            <p class="section-10__label">Substitui pregos e parafusos</p>
        </article>
        <article class="section-10__item">
            <span class="section-10__marker" aria-hidden="true">✓</span>
            <p class="section-10__label">Uso interno e externo</p>
        </article>
        <article class="section-10__item">
            <span class="section-10__marker" aria-hidden="true">✓</span>
            <p class="section-10__label">Não escorre</p>
        </article>
        <article class="section-10__item">
            <span class="section-10__marker" aria-hidden="true">✓</span>
            <p class="section-10__label">Aceita pintura</p>
        </article>
    </div>
</section>`,
    css: `<style>
    .section-10 {
        padding: 1.5rem;
        box-sizing: border-box;
        font-family: sans-serif;
    }

    .section-10__intro {
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
        margin: 0 0 1.25rem;
    }

    .section-10__title {
        color: #222;
        font-size: 1.55rem;
        font-weight: 700;
        line-height: 1.18;
        margin: 0;
    }

    .section-10__text {
        color: #222;
        font-size: 0.95rem;
        line-height: 1.55;
        margin: 0;
    }

    .section-10__grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }

    .section-10__item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        min-height: 58px;
        padding: 0.9rem;
        box-sizing: border-box;
        border: 1px solid rgba(245, 197, 66, 0.24);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.08);
    }

    .section-10__marker {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 30px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #f5c542;
        color: #1f2422;
        font-size: 0.95rem;
        font-weight: 700;
        line-height: 1;
    }

    .section-10__label {
        color: #222;
        font-size: 0.95rem;
        font-weight: 700;
        line-height: 1.35;
        margin: 0;
    }

    @media (min-width: 576px) {
        .section-10 {
            padding: 1.75rem;
        }

        .section-10__grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 768px) {
        .section-10 {
            padding: 2rem;
        }

        .section-10__intro {
            max-width: 720px;
            margin: auto;
            margin-bottom: 1.5rem;
        }

        .section-10__title {
            font-size: 2rem;
        }
    }

    @media (min-width: 992px) {
        .section-10 {
            display: grid;
            grid-template-columns: 0.8fr 1.2fr;
            align-items: center;
            gap: 2rem;
        }

        .section-10__intro {
            margin-bottom: 0;
        }

        .section-10__grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1200px) {
        .section-10 {
            padding: 2.25rem;
        }

        .section-10__grid {
            gap: 0.9rem;
        }
    }

    @media (min-width: 1400px) {
        .section-10 {
            padding: 2.75rem 5rem;
        }
    }
</style>`
  },

/*@@@@Senko - section-22 */
  /* variantes: variants/section-22.js */
  {
    id: 'section-22',
    name: 'section-22',
    tags: ['tabela', 'responsivo', 'acessível'],
    html: `<footer aria-label="Informações complementares e produtos Relacionados">
  <p class="p__end">
    <strong>Imagens Meramente Ilustrativas</strong>
  </p>
  <section class="table-container-custom" aria-label="tabela contendo produtos relacionados e citados dentre deste conteúdo">
    <table class="table-design-custom" aria-describedby="table-desc">
      <caption id="table-desc" class="sr-only" style="text-align:left; padding: 0 0 8px; font-weight:600;">
        Produtos Havaianas Kids Color disponíveis
      </caption>
      <thead class="table-head-custom">
        <tr class="table-tr-custom">
          <th class="table-text-custom table-th-custom" style="background-color: #fb373c; border-radius: 10px 0 0 0;" scope="col">SKU
          </th>
          <th class="table-text-custom table-th-custom" style="background-color: #fb373c; border-radius: 0 10px 0 0;" scope="col">TÍTULO
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224878</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR BRANCO 23/4</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224879</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR BRANCO 25/6</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224881</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR BRANCO 27/8</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224882</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR BRANCO 29/0</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224883</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR BRANCO 31/2</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224884</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR PRETO 23/4</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224885</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR PRETO 25/6</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224886</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR PRETO 27/8</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224887</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR PRETO 29/0</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224888</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR PRETO 31/2</td>
        </tr>
      </tbody>
    </table>
  </section>
</footer>
`,
    css: `<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

   .p__end {
    color: #8a8a8a;
    font-family: sans-serif;
    font-size: clamp(1rem, 2vw, 1.2rem);
    text-wrap: pretty;
    text-align: center;
    padding: 40px 0;
  }


  .table-container-custom {
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
    color: #fff;
    border-radius: 10px;
  }

  .table-text-custom {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #979797;
    font-family: sans-serif;
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

  .table-tr-custom:nth-child(even) {
    background-color: #f1f1f1;
  }

  td a {
    color: #000;
    font-weight: 600;
    text-decoration: none;
  }

  td a:hover {
    color: #e74011;
  }

  @media (prefers-contrast: more) {
    .table-td-custom-sub {
      color: #000;
      font-weight: 550;
    }

    .table-td-custom-title {
      color: #000;
      font-weight: 700;
    }

    .p__end {
      color: #000;
    }
  }

  @media (max-width: 600px) {
    .table-container-custom {
      padding: 10px;
    }

    .table-text-custom,
    .table-th-custom,
    .table-td-custom {
      padding: 8px;
    }
  }
</style>`
  },



/*@@@@Senko - section-15 */
  /* variantes: app/features/biblioteca/data/variants/section-15.js */
  {
    id: 'section-15',
    name: 'Section-15',
    tags: ['Split', 'Section 15', '15'],
    html: `<div class="section-15-container">
    <div class="section-15">
        <div class="section-15__content">
            <!-- ══ TÍTULO + DESCRIÇÃO (apague este bloco se não quiser usar) ══ -->
            <h2 class="section-15__title">
                A garantia de que o que está por trás das paredes nunca será um problema
            </h2>
            <p class="section-15__desc">
                Ao escolher um condutor que une a máxima segurança contra incêndios, a eficiência energética para seus
                equipamentos de alta potência e a flexibilidade necessária para uma instalação ágil, você garante a
                proteção do seu patrimônio e a tranquilidade de saber que sua estrutura elétrica foi feita para durar
                uma vida inteira.
            </p>
            <!-- ══ FIM TÍTULO + DESCRIÇÃO ══ -->
            <ul class="section-15__feature-list" aria-label="Benefícios do produto">
                <li class="section-15__feature-item">
                    <img class="section-15__feature-item-icon" loading="lazy" src="C:\\Users\\ygorq\\Downloads\\2222455_03-2-1.png"
                        alt="Ícone" />
                    <div class="section-15__feature-item-body">
                        <strong class="section-15__feature-item-title">Manhãs Sem Pausa</strong>
                        <p class="section-15__feature-item-text">Prepare vitaminas nutritivas em segundos e use a função
                            autolimpeza para sair de casa sem deixar bagunça na pia</p>
                    </div>
                </li>
                <li class="section-15__feature-item">
                    <img class="section-15__feature-item-icon" loading="lazy" src="C:\\Users\\ygorq\\Downloads\\2222455_03-2-2.png"
                        alt="Ícone" />
                    <div class="section-15__feature-item-body">
                        <strong class="section-15__feature-item-title">Receitas de uma Só Vez</strong>
                        <p class="section-15__feature-item-text">A jarra de 2,1L permite cozinhar para a família inteira
                            sem precisar bater os ingredientes em várias etapas</p>
                    </div>
                </li>
                <li class="section-15__feature-item">
                    <img class="section-15__feature-item-icon" loading="lazy" src="C:\\Users\\ygorqDownloads\\2222455_03-2-3.png"
                        alt="Ícone" />
                    <div class="section-15__feature-item-body">
                        <strong class="section-15__feature-item-title">Cozinha Sempre Organizada</strong>
                        <p class="section-15__feature-item-text">O sistema enrola-cabo e o design leve eliminam a briga
                            com fios e facilitam o armazenamento após o uso</p>
                    </div>
                </li>
                <li class="section-15__feature-item">
                    <img class="section-15__feature-item-icon" loading="lazy" src="C:\\Users\\ygorq\\Downloads\\2222455_03-2-4.png"
                        alt="Ícone" />
                    <div class="section-15__feature-item-body">
                        <strong class="section-15__feature-item-title">Cuidado com o Bolso</strong>
                        <p class="section-15__feature-item-text">Durabilidade garantida por lâminas de aço inox e 1 ano
                            de garantia, evitando gastos inesperados com trocas precoces</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="section-15__image-wrapper">
            <img class="section-15__image" src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao4.jpg"
                 alt="Eletricista com capacete branco e colete laranja em obra" />
        </div>
    </div>
</div>`,
    css: `<style>
  .section-15-container {
      background-color: #f16425;
      padding: 1.5rem;
      width: 100%;
      box-sizing: border-box;
  }
  
  .section-15 {
      display: flex;
      flex-direction: column-reverse;
      gap: 1.25rem;
      margin: 0 auto;
      width: 100%;
      box-sizing: border-box;
  }
  
  .section-15__image-wrapper {
      width: 100%;
      flex-shrink: 0;
  }
  
  .section-15__image {
      margin: auto;
      border-radius: 16px;
      display: block;
      object-fit: cover;
      width: 100%;
      max-width: 530px;
      aspect-ratio: 16 / 9;
  }
  
  .section-15__content {
      display: flex;
      flex-direction: column;
      width: 95%;
      margin: auto;
      box-sizing: border-box;
  }
  
  .section-15__title {
      color: #f3f3f3;
      font-size: 32px;
      font-weight: 600;
      line-height: 40px;
      margin: 0 0 1rem;
      text-align: left;
  }
  
  .section-15__desc {
      color: #f3f3f3;
      font-size: 14px;
      line-height: 22px;
      margin: 0 0 1.5rem;
      text-align: left;
  }
  
  .section-15__feature-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      list-style: none;
      margin: 0;
      gap: 22px;
      padding: 0;
  }
  
  .section-15__feature-item {
      align-items: flex-start;
      display: flex;
      flex-direction: row;
      gap: 0.75rem;
  }
  
  .section-15__feature-item-icon {
      border-radius: 8px;
      flex-shrink: 0;
      height: 44px;
      object-fit: contain;
      width: 44px;
  }
  
  .section-15__feature-item-body {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
  }
  
  .section-15__feature-item-title {
      color: #f5f5f5;
      font-size: 1.05rem;
      font-weight: 700;
      line-height: 1.35;
      margin: 0;
  }
  
  .section-15__feature-item-text {
      color: #f5f5f5;
      font-size: 0.8125rem;
      line-height: 1.55;
      margin: 0;
  }
  
  /* ── NOVO: aspect-ratio e desc oculta no mobile ── */
  @media (max-width: 759px) {
      .section-15__image {
          aspect-ratio: 4 / 3;
      }
  }
  
  @media (min-width: 480px) {
      .section-15-container {
          padding: 1.75rem;
      }
  
      .section-15__feature-item-title {
          font-size: 1.1rem;
      }
  }
  
  @media (min-width: 768px) {
      .section-15-container {
          padding: 2rem;
      }
  
      .section-15 {
          max-width: 768px;
      }
  
      .section-15__image {
          border-radius: 20px;
          aspect-ratio: 16 / 9;
      }
  }
  
  @media (min-width: 760px) {
      .section-15 {
          align-items: center;
          flex-direction: row;
          gap: 1.5rem;
          justify-content: center;
          max-width: 960px;
      }
  
      .section-15--reverse {
          flex-direction: row-reverse;
      }
  
      .section-15__image-wrapper {
          flex: 0 0 48%;
          max-width: 48%;
      }
  
      .section-15__image {
          aspect-ratio: 4 / 3;
          height: 100%;
          max-height: 420px;
      }
  
      .section-15__content {
          flex: 1 1 0;
          min-width: 0;
      }
  
      .section-15__feature-list--icon-right .section-15__feature-item {
          flex-direction: row-reverse;
      }
  
      .section-15__feature-list--icon-right .section-15__feature-item-body {
          align-items: flex-end;
      }
  
      .section-15__feature-list--icon-right .section-15__feature-item-title,
      .section-15__feature-list--icon-right .section-15__feature-item-text {
          text-align: right;
      }
  
      .section-15__feature-item-icon {
          height: 48px;
          width: 48px;
      }
  
      .section-15__feature-item-title {
          font-size: 1.2rem;
      }
  
      .section-15__feature-item-text {
          font-size: 0.875rem;
      }
  }
  
  @media (min-width: 1060px) {
      .section-15 {
          max-width: 1060px;
          gap: 2rem;
      }
  
      .section-15__feature-list {
          gap: 1.25rem;
      }
  }
  
  @media (min-width: 1280px) {
      .section-15 {
          max-width: 1280px;
          gap: 2.5rem;
      }
  
      .section-15__image-wrapper {
          flex: 0 0 50%;
          max-width: 50%;
      }
  
      .section-15__image {
          max-height: 460px;
      }
  
      .section-15__feature-item-title {
          font-size: 1.3rem;
      }
  
      .section-15__feature-item-text {
          font-size: 0.9rem;
      }
  }
  
  .is-reverse {
      flex-direction: row-reverse;
  }
  
  @media (max-width: 760px) {
      .is-reverse {
          flex-direction: column-reverse;
      }
  }
  
  .is-reverse-760 {
      flex-direction: row-reverse;
  }
  
  @media (max-width: 760px) {
      .is-reverse-760 {
          flex-direction: column;
      }
  }
</style>`
  },


/*@@@@Senko - section-27 */
  /* variantes: app/features/biblioteca/data/variants/section-27.js */
  {
    id: 'section-27',
    name: 'Section-27',
    tags: ['grid', '21', 'split', 'carrossel', 'animado'],
    html: `<section class="section-27-container" aria-label="Estilo e detalhes da Havaianas Top Senses Areia/Areia">
    <article class="section-27" aria-labelledby="section-21-title">
        <div class="section-27__content">
            <h2 class="section-27__title" id="section-21-title">
                Versatilidade que simplifica o visual
            </h2>
            <p class="section-27__text">
                Tom areia, conforto de borracha e visual clássico para usar sem pensar duas vezes.
            </p>
        </div>
        <input class="section-27__control" type="radio" name="section-21-carousel" id="section-21-slide-1"
            checked="" aria-label="Mostrar primeira imagem">
        <input class="section-27__control" type="radio" name="section-21-carousel" id="section-21-slide-2"
            aria-label="Mostrar próxima imagem">
        <input class="section-27__control" type="radio" name="section-21-carousel" id="section-21-slide-3"
            aria-label="Mostrar última imagem">
        <div class="section-27__gallery" aria-label="Espaços para imagens em recorte diagonal">
            <div class="section-27__viewport">
                <div class="section-27__track">
                    <figure class="section-27__panel section-27__panel--first">
                        <img class="section-27__image"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-mao-exibindo-produto-1225195-1225196-1225197-1225198-1225199-05-3.webp"
                            alt="Imagem ilustrativa das tiras texturizadas da Havaianas Top Senses Areia/Areia" width="420"
                            height="320" loading="lazy" decoding="async">
                    </figure>
                    <figure class="section-27__panel section-27__panel--middle">
                        <img class="section-27__image"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-mao-exibindo-produto-1225195-1225196-1225197-1225198-1225199-05-2.webp"
                            alt="Imagem ilustrativa do solado macio da Havaianas Top Senses Areia/Areia" width="420" height="320"
                            loading="lazy" decoding="async">
                    </figure>
                    <figure class="section-27__panel section-27__panel--last">
                        <img class="section-27__image"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-modelo-shopping-lifestyle-1225195-1225196-1225197-1225198-1225199-05-1.webp"
                            alt="Imagem lateral ilustrativa da Havaianas Top Senses Areia/Areia" width="420" height="320"
                            loading="lazy" decoding="async">
                    </figure>
                </div>
            </div>
            <nav class="section-27__arrows" aria-label="Controles das imagens em destaque">
                <label class="section-27__arrow section-27__arrow--right section-27__arrow--next-1"
                    for="section-21-slide-2" role="button" aria-label="Ver próxima imagem">›</label>
                <label class="section-27__arrow section-27__arrow--left section-27__arrow--prev-2"
                    for="section-21-slide-1" role="button" aria-label="Ver imagem anterior">‹</label>
                <label class="section-27__arrow section-27__arrow--right section-27__arrow--next-2"
                    for="section-21-slide-3" role="button" aria-label="Ver próxima imagem">›</label>
                <label class="section-27__arrow section-27__arrow--left section-27__arrow--prev-3"
                    for="section-21-slide-2" role="button" aria-label="Ver imagem anterior">‹</label>
                <label class="section-27__arrow section-27__arrow--left section-27__arrow--prev-3-tablet"
                    for="section-21-slide-1" role="button"
                    aria-label="Voltar para as primeiras imagens">‹</label>
            </nav>
        </div>
    </article>
</section>`,
    css: `<style>
    .section-27 {
        width: 100%;
        min-height: 280px;
        overflow: hidden;
        position: relative;
        display: grid;
        align-items: stretch;
        gap: 18px;
        padding: 42px 18px 30px;
        background: #ffffff;
        border-radius: 6px;
        color: #6e0c2a;
        font-family: sans-serif;
        isolation: isolate;
        box-shadow: 0 12px 34px rgba(62, 7, 23, 0.08);
        animation: rich-fade-up 0.82s ease both;
    }

    .section-27::before {
        content: "";
        position: absolute;
        inset: 0 auto auto 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #3e0717 0%, #6e0c2a 62%, #792d41 100%);
        clip-path: polygon(0 0, 92% 0, 55% 100%, 0 100%);
        z-index: 0;
        animation: rich-wine-glow 7s ease-in-out infinite alternate;
    }

    .section-27::after {
        content: "";
        position: absolute;
        inset: 12px auto auto 18px;
        width: 46%;
        height: 1px;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0));
        z-index: 1;
        pointer-events: none;
    }

    .section-27--reverse .section-27__content {
        order: 2;
    }

    .section-27--reverse .section-27__gallery {
        order: 1;
    }

    .section-27__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 12px;
        padding: 0;
        margin: 0 0 8px 26px;
        position: relative;
        z-index: 1;
    }

    .section-27__title {
        margin: 0;
        color: #ffffff;
        font-size: clamp(1.45rem, 6.7vw, 1.85rem);
        font-weight: 900;
        line-height: 0.98;
        text-transform: uppercase;
        text-shadow: 0 12px 26px rgba(62, 7, 23, 0.26);
    }

    .section-27__text {
        margin: 0;
        color: #ffffff;
        font-size: 0.95rem;
        line-height: 1.55;
    }

    .section-27__control {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
    }

    .section-27__gallery {
        position: relative;
        display: block;
        min-height: 245px;
        height: 100%;
        z-index: 1;
    }

    .section-27__viewport {
        position: relative;
        width: min(82%, 350px);
        min-height: inherit;
        height: 100%;
        margin: 0 40px 0 auto;
        overflow: hidden;
    }

    .section-27__track {
        position: relative;
        min-height: inherit;
        height: 100%;
        transition: transform 0.35s ease;
    }

    .section-27__panel {
        min-height: 0;
        height: auto;
        margin: 0;
        overflow: hidden;
        background: rgba(121, 45, 65, 0.10);
        border-radius: 5px;
        border: 1px solid rgba(121, 45, 65, 0.16);
        box-shadow: 0 16px 36px rgba(62, 7, 23, 0.16);
    }

    .section-27__panel--first {
        clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .section-27__panel--middle {
        clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 100%;
        width: 100%;
    }

    .section-27__panel--last {
        clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 200%;
        width: 100%;
    }

    #section-21-slide-1:checked~.section-27__gallery .section-27__track {
        transform: translateX(0);
    }

    #section-21-slide-2:checked~.section-27__gallery .section-27__track {
        transform: translateX(-100%);
    }

    #section-21-slide-3:checked~.section-27__gallery .section-27__track {
        transform: translateX(-200%);
    }

    .section-27__image {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: transform 0.8s ease, filter 0.8s ease;
    }

    .section-27:hover .section-27__image {
        transform: scale(1.035);
        filter: saturate(1.04) contrast(1.04);
    }

    .section-27__image:not([src]) {
        opacity: 0;
    }

    .section-27__arrows {
        position: absolute;
        inset: 0;
        pointer-events: none;
    }

    .section-27__arrow {
        position: absolute;
        top: 50%;
        display: none;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        border: 1px solid #ff9900;
        border-radius: 50%;
        background: #ffffff;
        color: #6e0c2a;
        cursor: pointer;
        font-size: 1.4rem;
        font-weight: 900;
        line-height: 1;
        pointer-events: auto;
        transform: translateY(-50%);
        transition: transform 0.28s ease, box-shadow 0.28s ease, color 0.28s ease;
        animation: section-21-arrow-radiate 1.15s ease-in-out infinite;
    }

    .section-27__arrow::before,
    .section-27__arrow::after {
        content: "";
        position: absolute;
        inset: -8px;
        border-radius: 50%;
        border: 2px solid rgba(255, 153, 0, 0.42);
        opacity: 0;
        pointer-events: none;
    }

    .section-27__arrow::before {
        animation: section-21-arrow-ring 1.35s ease-out infinite;
    }

    .section-27__arrow::after {
        animation: section-21-arrow-ring 1.35s ease-out 0.38s infinite;
    }

    .section-27__arrow:hover {
        color: #3e0717;
        transform: translateY(-50%) scale(1.06);
        box-shadow: 0 0 0 5px rgba(121, 45, 65, 0.10), 0 14px 24px rgba(62, 7, 23, 0.16);
    }

    @keyframes section-21-arrow-radiate {
        0%,
        100% {
            box-shadow: 0 0 0 0 rgba(255, 153, 0, 0.40), 0 8px 18px rgba(62, 7, 23, 0.12);
        }

        50% {
            box-shadow: 0 0 0 9px rgba(255, 153, 0, 0.16), 0 0 22px rgba(121, 45, 65, 0.24), 0 14px 26px rgba(62, 7, 23, 0.18);
        }
    }

    @keyframes section-21-arrow-ring {
        0% {
            opacity: 0.70;
            transform: scale(0.72);
        }

        100% {
            opacity: 0;
            transform: scale(1.65);
        }
    }

    .section-27__arrow--left {
        left: 0;
    }

    .section-27__arrow--right {
        right: 0;
    }

    #section-21-slide-1:checked~.section-27__gallery .section-27__arrow--next-1 {
        display: flex;
    }

    #section-21-slide-2:checked~.section-27__gallery .section-27__arrow--prev-2 {
        display: flex;
    }

    #section-21-slide-2:checked~.section-27__gallery .section-27__arrow--next-2 {
        display: flex;
    }

    #section-21-slide-3:checked~.section-27__gallery .section-27__arrow--prev-3 {
        display: flex;
    }

    @media (min-width: 576px) {
        .section-27 {
            padding: 24px 20px;
        }

        .section-27__title {
            font-size: 1.9rem;
        }

        .section-27__gallery {
            min-height: 230px;
        }

        .section-27__viewport {
            width: calc(100% - 86px);
        }

        .section-27__panel--first {
            left: 0;
            width: 56%;
        }

        .section-27__panel--middle {
            left: 44%;
            width: 56%;
        }

        .section-27__panel--last {
            left: 88%;
            width: 56%;
        }

        #section-21-slide-2:checked~.section-27__gallery .section-27__track {
            transform: translateX(-44%);
        }

        #section-21-slide-3:checked~.section-27__gallery .section-27__track {
            transform: translateX(-44%);
        }

        #section-21-slide-2:checked~.section-27__gallery .section-27__arrow--next-2 {
            display: none;
        }

        #section-21-slide-3:checked~.section-27__gallery .section-27__arrow--prev-3 {
            display: none;
        }

        #section-21-slide-3:checked~.section-27__gallery .section-27__arrow--prev-3-tablet {
            display: flex;
        }
    }

    @media (min-width: 768px) {
        .section-27 {
            grid-template-columns: minmax(0, 0.75fr) minmax(0, 2.25fr);
            align-items: stretch;
            gap: 18px;
            padding: 24px;
        }

        .section-27::before {
            inset: 0 auto 0 0;
            width: 48%;
            height: 100%;
            clip-path: polygon(0 0, 100% 0, 82% 100%, 0 100%);
        }

        .section-27__content {
            width: auto;
            margin: 0;
            padding: 0 1.75rem;
        }

        .section-27__text {
            font-size: 0.86rem;
        }

        .section-27--reverse {
            grid-template-columns: minmax(0, 2.25fr) minmax(0, 0.75fr);
        }

        .section-27__content {
            gap: 14px;
        }

        .section-27__gallery {
            min-height: 250px;
        }
    }

    @media (min-width: 992px) {
        .section-27 {
            gap: 22px;
            padding: 26px;
        }

        .section-27__title {
            font-size: 2.15rem;
        }

        .section-27__gallery {
            min-height: 270px;
        }
    }

    @media (min-width: 992px) {
        .section-27 {
            gap: 24px;
            padding: 28px;
        }

        .section-27__gallery {
            min-height: 285px;
        }

        .section-27__viewport {
            width: 100%;
            overflow: visible;
        }

        #section-21-slide-1:checked~.section-27__gallery .section-27__track,
        #section-21-slide-2:checked~.section-27__gallery .section-27__track,
        #section-21-slide-3:checked~.section-27__gallery .section-27__track {
            transform: none;
        }

        .section-27__panel--first {
            left: 0%;
            width: 37%;
        }

        .section-27__panel--middle {
            left: 31%;
            width: 37%;
        }

        .section-27__panel--last {
            left: 63%;
            width: 37%;
        }

        .section-27__arrows {
            display: none;
        }
    }

    @media (min-width: 1400px) {
        .section-27 {
            gap: 28px;
            padding: 30px;
        }

        .section-27__title {
            font-size: 2.35rem;
        }
    }
</style>`
  },


/*@@@@Senko - section-10 */
  /* variantes: app/features/biblioteca/data/variants/section-10.js */
  {
    id: 'section-10',
    name: 'Section-10',
    tags: ['grid', '10', 'carrossel', 'animado'],
    html: `        <section aria-label="Grid de especificações do produto" style="background-color: #6e0c2a08;">
            <div class="section-10 section-10--carousel-mobile" aria-labelledby="section-10-title">
                <h2 class="section-10__title" id="section-10-title">
                    Detalhes que fazem diferença no uso
                </h2>
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-1"
                    checked="">
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-2">
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-3">
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-4">
                <div class="section-10__viewport">
                    <ul class="section-10__track">
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-detalhe-tiras-textura-1225195-1225196-1225197-1225198-1225199-03-1.webp"
                                        alt="Detalhe ilustrativo das tiras texturizadas da Havaianas Top Senses Areia/Areia"
                                        loading="lazy" decoding="async">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Tiras texturizadas em PVC
                                    </h3>
                                    <p class="section-10__card-text">
                                        Tiras mais grossas ajudam na estabilidade e mantêm a sensação de frescor.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-detalhe-solado-inferior-1225195-1225196-1225197-1225198-1225199-03-2.webp"
                                        alt="Detalhe ilustrativo do solado da Havaianas Top Senses Areia/Areia" loading="lazy"
                                        decoding="async">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Solado macio de borracha
                                    </h3>
                                    <p class="section-10__card-text">
                                        Base 100% borracha, flexível e durável para caminhar com conforto.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-modelo-passarela-madeira-lifestyle-1225195-1225196-1225197-1225198-1225199-03-3.webp"
                                        alt="Imagem ilustrativa da cor neutra da Havaianas Top Senses Areia/Areia" loading="lazy"
                                        decoding="async">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Areia/Areia fácil de combinar
                                    </h3>
                                    <p class="section-10__card-text">
                                        Cor neutra para compor looks casuais sem pesar no visual.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-detalhe-logotipo-relevo-1225195-1225196-1225197-1225198-1225199-03-4.webp"
                                        alt="Detalhe ilustrativo da Havaianas Top Senses Areia/Areia fácil de limpar" loading="lazy"
                                        decoding="async">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Fácil de lavar
                                    </h3>
                                    <p class="section-10__card-text">
                                        Pode ser lavado à mão com sabão neutro ou na máquina de lavar roupa.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                    </ul>
                </div>
                <nav class="section-10__controls">
                    <label class="section-10__button section-10__button--1" for="section-10-slide-1">1</label>
                    <label class="section-10__button section-10__button--2" for="section-10-slide-2">2</label>
                    <label class="section-10__button section-10__button--3" for="section-10-slide-3">3</label>
                    <label class="section-10__button section-10__button--4" for="section-10-slide-4">4</label>
                </nav>
            </div>
        </section>`,
    css: `    <style>
        .section-10-container {
            padding-top: 28px;
            padding-bottom: 36px;
        }

        .section-10 {
            width: 100%;
            overflow: hidden;
            position: relative;
            padding: 28px 16px 34px;
            background: #ffffff;
            font-family: sans-serif;
            color: #6e0c2a;
            animation: rich-fade-up 0.82s ease both;
        }

        .section-10__title {
            margin: 0 auto 22px;
            color: #3e0717;
            font-size: 1.55rem;
            font-weight: 800;
            line-height: 1.15;
            text-align: center;
        }

        .section-10__control {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
        }

        .section-10__viewport {
            width: 100%;
            overflow: hidden;
        }

        .section-10__track {
            display: flex;
            margin: 0;
            padding: 0;
            list-style: none;
            transition: transform 0.35s ease;
        }

        .section-10__item {
            flex: 0 0 100%;
            min-width: 0;
            padding: 0 10px;
        }

        #section-10-slide-1:checked~.section-10__viewport .section-10__track {
            transform: translateX(0);
        }

        #section-10-slide-2:checked~.section-10__viewport .section-10__track {
            transform: translateX(-100%);
        }

        #section-10-slide-3:checked~.section-10__viewport .section-10__track {
            transform: translateX(-200%);
        }

        #section-10-slide-4:checked~.section-10__viewport .section-10__track {
            transform: translateX(-300%);
        }

        .section-10__card {
            display: flex;
            min-height: 100%;
            flex-direction: column;
            align-items: center;
            padding: 0 14px;
            text-align: center;
            transition: transform 0.35s ease;
        }

        .section-10__media {
            width: 148px;
            height: 148px;
            margin: 0 0 18px;
            overflow: hidden;
            border: 1px solid #eadbe1;
            border-radius: 50%;
            background: #ffffff;
            box-shadow: 0 12px 28px rgba(62, 7, 23, 0.08);
            transition: transform 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease;
        }

        .section-10__image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
            transition: transform 0.55s ease, filter 0.55s ease;
        }

        .section-10__card-title {
            margin: 0 0 10px;
            color: #6e0c2a;
            font-size: 1rem;
            font-weight: 800;
            line-height: 1.25;
        }

        .section-10__card-text {
            margin: 0 auto;
            color: #6e0c2a;
            font-size: 0.86rem;
            line-height: 1.55;
        }

        .section-10__controls {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 8px 0 0;
            padding-bottom: 22px;
        }

        .section-10__button {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border: 1px solid #eadbe1;
            border-radius: 999px;
            background: #ffffff;
            color: #6e0c2a;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 800;
            line-height: 1;
            transition: transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
        }

        .section-10__button::after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: -17px;
            width: 0;
            height: 0;
            border-right: 8px solid transparent;
            border-bottom: 10px solid #ff9900;
            border-left: 8px solid transparent;
            filter: drop-shadow(0 5px 6px rgba(62, 7, 23, 0.22));
            opacity: 0;
            transform: translate(-50%, 6px);
            transition: opacity 0.25s ease;
            pointer-events: none;
        }

        .section-10__button:hover {
            transform: translateY(-2px);
            border-color: #792d41;
            box-shadow: 0 10px 20px rgba(62, 7, 23, 0.12);
        }

        #section-10-slide-1:checked~.section-10__controls .section-10__button--1,
        #section-10-slide-2:checked~.section-10__controls .section-10__button--2,
        #section-10-slide-3:checked~.section-10__controls .section-10__button--3,
        #section-10-slide-4:checked~.section-10__controls .section-10__button--4 {
            border-color: #792d41;
            background: #6e0c2a;
            color: #ffffff;
        }

        #section-10-slide-1:checked~.section-10__controls .section-10__button--1::after,
        #section-10-slide-2:checked~.section-10__controls .section-10__button--2::after,
        #section-10-slide-3:checked~.section-10__controls .section-10__button--3::after,
        #section-10-slide-4:checked~.section-10__controls .section-10__button--4::after {
            opacity: 1;
            animation: section-10-arrow-bounce 0.82s ease-in-out infinite;
        }

        @keyframes section-10-arrow-bounce {
            0%,
            100% {
                transform: translate(-50%, 6px);
            }

            50% {
                transform: translate(-50%, -1px);
            }
        }

        @media (min-width: 576px) {
            .section-10 {
                padding: 34px 30px 42px;
            }

            .section-10__title {
                max-width: 576px;
                font-size: 1.85rem;
            }

            .section-10__media {
                width: 164px;
                height: 164px;
            }
        }

        @media (min-width: 768px) {
            .section-10 {
                padding: 38px 28px 46px;
            }

            .section-10__title {
                max-width: 768px;
                margin-bottom: 28px;
            }

            .section-10__item {
                flex-basis: 50%;
                padding: 0 12px;
            }

            #section-10-slide-1:checked~.section-10__viewport .section-10__track {
                transform: translateX(0);
            }

            #section-10-slide-2:checked~.section-10__viewport .section-10__track {
                transform: translateX(-50%);
            }

            #section-10-slide-3:checked~.section-10__viewport .section-10__track,
            #section-10-slide-4:checked~.section-10__viewport .section-10__track {
                transform: translateX(-100%);
            }

            .section-10__button--4 {
                display: none;
            }
        }

        @media (min-width: 992px) {
            .section-10 {
                padding: 42px 105px 52px;
            }

            .section-10__title {
                max-width: 992px;
                font-size: 2.15rem;
            }
        }

        @media (min-width: 1200px) {
            .section-10 {
                padding: 46px 34px 58px;
            }

            .section-10__viewport {
                overflow: visible;
            }

            .section-10__item {
                flex-basis: 25%;
                padding: 0 14px;
            }

            #section-10-slide-1:checked~.section-10__viewport .section-10__track,
            #section-10-slide-2:checked~.section-10__viewport .section-10__track,
            #section-10-slide-3:checked~.section-10__viewport .section-10__track,
            #section-10-slide-4:checked~.section-10__viewport .section-10__track {
                transform: none;
            }

            .section-10__controls {
                display: none;
            }
        }
    </style>`
  },


/*@@@@Senko - section-23 */
  /* variantes: app/features/biblioteca/data/variants/section-23.js */
  {
    id: 'section-23',
    name: 'Section-23',
    tags: ['stories', '23', 'section-23', 'responsivo', 'acessivel'],
    html: `<section class="lp-stories lp-stories--groups-3" aria-label="Stories visuais e representativos do produto">
      <span class="lp-stories__target" id="lp-story-produto-1" aria-hidden="true"></span>
      <span class="lp-stories__target" id="lp-story-produto-2" aria-hidden="true"></span>
      <span class="lp-stories__target" id="lp-story-uso-1" aria-hidden="true"></span>
      <span class="lp-stories__target" id="lp-story-uso-2" aria-hidden="true"></span>
      <span class="lp-stories__target" id="lp-story-detalhes-1" aria-hidden="true"></span>
      <span class="lp-stories__target" id="lp-story-detalhes-2" aria-hidden="true"></span>

      <nav class="lp-stories__options" aria-label="Containers de stories">
        <a class="lp-stories__option lp-stories__option--produto" href="#lp-story-produto-1" aria-label="Abrir container Pra quem ama o mar, slide 1 de 2">
          <span class="lp-stories__ring" aria-hidden="true">
            <img class="lp-stories__thumb" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-estudio-1225024-02.webp" alt="Miniatura de Pra quem ama o mar" width="400" height="400" loading="lazy">
          </span>
          <span class="lp-stories__name">Pra quem ama o mar</span>
        </a>
        <a class="lp-stories__option lp-stories__option--uso" href="#lp-story-uso-1" aria-label="Abrir container Estilo e Conforto, slide 1 de 2">
          <span class="lp-stories__ring" aria-hidden="true">
            <img class="lp-stories__thumb" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-rua-cafe-1225024-04.webp" alt="Miniatura de Estilo e Conforto" width="400" height="400" loading="lazy">
          </span>
          <span class="lp-stories__name">Estilo e Conforto</span>
        </a>
        <a class="lp-stories__option lp-stories__option--detalhes" href="#lp-story-detalhes-1" aria-label="Abrir container Sempre com voce, slide 1 de 2">
          <span class="lp-stories__ring" aria-hidden="true">
            <img class="lp-stories__thumb" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-deck-praia-1225024-06.webp" alt="Miniatura de Sempre com voce" width="400" height="400" loading="lazy">
          </span>
          <span class="lp-stories__name">Sempre com voce</span>
        </a>
      </nav>

      <div class="lp-stories__panels" aria-live="polite">
        <article class="lp-stories__panel panel-produto-1 is-default" aria-labelledby="lp-story-produto-1-title" aria-describedby="lp-story-produto-1-caption">
          <div class="lp-stories__viewer">
            <div class="lp-stories__progress lp-stories__progress--slides-2 lp-stories__progress--index-1" aria-label="Progresso do container Pra quem ama o mar"></div>
            <header class="lp-stories__topbar" aria-label="Identificação do container Pra quem ama o mar">
              <img class="lp-stories__avatar" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/logo-havaianas.webp" alt="Logo dos stories" width="400" height="400" loading="lazy">
              <h3 class="lp-stories__title" id="lp-story-produto-1-title">Pra quem ama o mar</h3>
              <span class="lp-stories__step">1/2</span>
            </header>
            <figure class="lp-stories__figure lp-stories__figure--focus-bottom">
              <div class="lp-stories__media">
                <picture class="lp-stories__picture">
                  <source media="(max-width: 499px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-estudio-1225024-02.webp?ims=400x">
                  <source media="(min-width: 992px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-estudio-1225024-02.webp?ims=960x">
                  <source media="(min-width: 500px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-estudio-1225024-02.webp?ims=430x">
                  <img class="lp-stories__image" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-estudio-1225024-02.webp?ims=960x" alt="Havaianas Top Nautical branco e marinho nos pes em estudio com fundo claro" width="1080" height="1920" loading="lazy">
                </picture>
              </div>
              <figcaption class="lp-stories__caption is-top" id="lp-story-produto-1-caption">Listras classicas para quem e do mar.</figcaption>
            </figure>
            <nav class="lp-stories__nav" aria-label="Navegar slides do container Pra quem ama o mar">
              <a class="lp-stories__arrow prev" href="#lp-story-detalhes-2" aria-label="Slide anterior de Pra quem ama o mar"><span aria-hidden="true">&lsaquo;</span></a>
              <a class="lp-stories__arrow next" href="#lp-story-produto-2" aria-label="Proximo slide de Pra quem ama o mar"><span aria-hidden="true">&rsaquo;</span></a>
            </nav>
          </div>
        </article>

        <article class="lp-stories__panel panel-produto-2" aria-labelledby="lp-story-produto-2-title" aria-describedby="lp-story-produto-2-caption">
          <div class="lp-stories__viewer">
            <div class="lp-stories__progress lp-stories__progress--slides-2 lp-stories__progress--index-2" aria-label="Progresso do container Pra quem ama o mar"></div>
            <header class="lp-stories__topbar" aria-label="Identificação do container Pra quem ama o mar">
              <img class="lp-stories__avatar" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/logo-havaianas.webp" alt="Logo dos stories" width="400" height="400" loading="lazy">
              <h3 class="lp-stories__title" id="lp-story-produto-2-title">Pra quem ama o mar</h3>
              <span class="lp-stories__step">2/2</span>
            </header>
            <figure class="lp-stories__figure lp-stories__figure--focus-bottom">
              <div class="lp-stories__media">
                <picture class="lp-stories__picture">
                  <source media="(max-width: 499px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-marinho-branco-estudio-1225024-03.webp?ims=400x">
                  <source media="(min-width: 992px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-marinho-branco-estudio-1225024-03.webp?ims=960x">
                  <source media="(min-width: 500px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-marinho-branco-estudio-1225024-03.webp?ims=430x">
                  <img class="lp-stories__image" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-marinho-branco-estudio-1225024-03.webp?ims=960x" alt="Havaianas Top Nautical marinho e branco nos pes em estudio de moda" width="1080" height="1920" loading="lazy">
                </picture>
              </div>
              <figcaption class="lp-stories__caption is-top" id="lp-story-produto-2-caption">Top Nautical no pe, leveza no dia.</figcaption>
            </figure>
            <nav class="lp-stories__nav" aria-label="Navegar slides do container Pra quem ama o mar">
              <a class="lp-stories__arrow prev" href="#lp-story-produto-1" aria-label="Slide anterior de Pra quem ama o mar"><span aria-hidden="true">&lsaquo;</span></a>
              <a class="lp-stories__arrow next" href="#lp-story-uso-1" aria-label="Proximo slide de Pra quem ama o mar"><span aria-hidden="true">&rsaquo;</span></a>
            </nav>
          </div>
        </article>

        <article class="lp-stories__panel panel-uso-1" aria-labelledby="lp-story-uso-1-title" aria-describedby="lp-story-uso-1-caption">
          <div class="lp-stories__viewer">
            <div class="lp-stories__progress lp-stories__progress--slides-2 lp-stories__progress--index-1" aria-label="Progresso do container Estilo e Conforto"></div>
            <header class="lp-stories__topbar" aria-label="Identificação do container Estilo e Conforto">
              <img class="lp-stories__avatar" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/logo-havaianas.webp" alt="Logo dos stories" width="400" height="400" loading="lazy">
              <h3 class="lp-stories__title" id="lp-story-uso-1-title">Estilo e Conforto</h3>
              <span class="lp-stories__step">1/2</span>
            </header>
            <figure class="lp-stories__figure lp-stories__figure--focus-bottom">
              <div class="lp-stories__media">
                <picture class="lp-stories__picture">
                  <source media="(max-width: 499px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-rua-cafe-1225024-04.webp?ims=400x">
                  <source media="(min-width: 992px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-rua-cafe-1225024-04.webp?ims=960x">
                  <source media="(min-width: 500px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-rua-cafe-1225024-04.webp?ims=430x">
                  <img class="lp-stories__image" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-rua-cafe-1225024-04.webp?ims=960x" alt="Havaianas Top Nautical branco e marinho nos pes em calcada com cafe ao fundo" width="1080" height="1920" loading="lazy">
                </picture>
              </div>
              <figcaption class="lp-stories__caption is-top" id="lp-story-uso-1-caption">Estilo atemporal para sair leve.</figcaption>
            </figure>
            <nav class="lp-stories__nav" aria-label="Navegar slides do container Estilo e Conforto">
              <a class="lp-stories__arrow prev" href="#lp-story-produto-2" aria-label="Slide anterior de Estilo e Conforto"><span aria-hidden="true">&lsaquo;</span></a>
              <a class="lp-stories__arrow next" href="#lp-story-uso-2" aria-label="Proximo slide de Estilo e Conforto"><span aria-hidden="true">&rsaquo;</span></a>
            </nav>
          </div>
        </article>

        <article class="lp-stories__panel panel-uso-2" aria-labelledby="lp-story-uso-2-title" aria-describedby="lp-story-uso-2-caption">
          <div class="lp-stories__viewer">
            <div class="lp-stories__progress lp-stories__progress--slides-2 lp-stories__progress--index-2" aria-label="Progresso do container Estilo e Conforto"></div>
            <header class="lp-stories__topbar" aria-label="Identificação do container Estilo e Conforto">
              <img class="lp-stories__avatar" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/logo-havaianas.webp" alt="Logo dos stories" width="400" height="400" loading="lazy">
              <h3 class="lp-stories__title" id="lp-story-uso-2-title">Estilo e Conforto</h3>
              <span class="lp-stories__step">2/2</span>
            </header>
            <figure class="lp-stories__figure lp-stories__figure--focus-bottom">
              <div class="lp-stories__media">
                <picture class="lp-stories__picture">
                  <source media="(max-width: 499px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-marinho-branco-piscina-1225024-05.webp?ims=400x">
                  <source media="(min-width: 992px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-marinho-branco-piscina-1225024-05.webp?ims=960x">
                  <source media="(min-width: 500px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-marinho-branco-piscina-1225024-05.webp?ims=430x">
                  <img class="lp-stories__image" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-marinho-branco-piscina-1225024-05.webp?ims=960x" alt="Havaianas Top Nautical marinho e branco nos pes a beira da piscina" width="1080" height="1920" loading="lazy">
                </picture>
              </div>
              <figcaption class="lp-stories__caption is-top" id="lp-story-uso-2-caption">Solado 100% borracha, pronto para dias de piscina.</figcaption>
            </figure>
            <nav class="lp-stories__nav" aria-label="Navegar slides do container Estilo e Conforto">
              <a class="lp-stories__arrow prev" href="#lp-story-uso-1" aria-label="Slide anterior de Estilo e Conforto"><span aria-hidden="true">&lsaquo;</span></a>
              <a class="lp-stories__arrow next" href="#lp-story-detalhes-1" aria-label="Proximo slide de Estilo e Conforto"><span aria-hidden="true">&rsaquo;</span></a>
            </nav>
          </div>
        </article>

        <article class="lp-stories__panel panel-detalhes-1" aria-labelledby="lp-story-detalhes-1-title" aria-describedby="lp-story-detalhes-1-caption">
          <div class="lp-stories__viewer">
            <div class="lp-stories__progress lp-stories__progress--slides-2 lp-stories__progress--index-1" aria-label="Progresso do container Sempre com voce"></div>
            <header class="lp-stories__topbar" aria-label="Identificação do container Sempre com voce">
              <img class="lp-stories__avatar" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/logo-havaianas.webp" alt="Logo dos stories" width="400" height="400" loading="lazy">
              <h3 class="lp-stories__title" id="lp-story-detalhes-1-title">Sempre com voce</h3>
              <span class="lp-stories__step">1/2</span>
            </header>
            <figure class="lp-stories__figure lp-stories__figure--focus-bottom">
              <div class="lp-stories__media">
                <picture class="lp-stories__picture">
                  <source media="(max-width: 499px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-deck-praia-1225024-06.webp?ims=400x">
                  <source media="(min-width: 992px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-deck-praia-1225024-06.webp?ims=960x">
                  <source media="(min-width: 500px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-deck-praia-1225024-06.webp?ims=430x">
                  <img class="lp-stories__image" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-deck-praia-1225024-06.webp?ims=960x" alt="Havaianas Top Nautical branco e marinho nos pes sobre deck de madeira na praia" width="1080" height="1920" loading="lazy">
                </picture>
              </div>
              <figcaption class="lp-stories__caption is-top" id="lp-story-detalhes-1-caption">Do calcadao ao mar em cada passo.</figcaption>
            </figure>
            <nav class="lp-stories__nav" aria-label="Navegar slides do container Sempre com voce">
              <a class="lp-stories__arrow prev" href="#lp-story-uso-2" aria-label="Slide anterior de Sempre com voce"><span aria-hidden="true">&lsaquo;</span></a>
              <a class="lp-stories__arrow next" href="#lp-story-detalhes-2" aria-label="Proximo slide de Sempre com voce"><span aria-hidden="true">&rsaquo;</span></a>
            </nav>
          </div>
        </article>

        <article class="lp-stories__panel panel-detalhes-2" aria-labelledby="lp-story-detalhes-2-title" aria-describedby="lp-story-detalhes-2-caption">
          <div class="lp-stories__viewer">
            <div class="lp-stories__progress lp-stories__progress--slides-2 lp-stories__progress--index-2" aria-label="Progresso do container Sempre com voce"></div>
            <header class="lp-stories__topbar" aria-label="Identificação do container Sempre com voce">
              <img class="lp-stories__avatar" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/logo-havaianas.webp" alt="Logo dos stories" width="400" height="400" loading="lazy">
              <h3 class="lp-stories__title" id="lp-story-detalhes-2-title">Sempre com voce</h3>
              <span class="lp-stories__step">2/2</span>
            </header>
            <figure class="lp-stories__figure lp-stories__figure--focus-bottom">
              <div class="lp-stories__media">
                <picture class="lp-stories__picture">
                  <source media="(max-width: 499px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-marinho-branco-praia-ondas-1225024-07.webp?ims=400x">
                  <source media="(min-width: 992px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-marinho-branco-praia-ondas-1225024-07.webp?ims=960x">
                  <source media="(min-width: 500px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-marinho-branco-praia-ondas-1225024-07.webp?ims=430x">
                  <img class="lp-stories__image" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-marinho-branco-praia-ondas-1225024-07.webp?ims=960x" alt="Havaianas Top Nautical marinho e branco nos pes na areia com ondas do mar" width="1080" height="1920" loading="lazy">
                </picture>
              </div>
              <figcaption class="lp-stories__caption is-top" id="lp-story-detalhes-2-caption">Na areia, pertinho do mar.</figcaption>
            </figure>
            <nav class="lp-stories__nav" aria-label="Navegar slides do container Sempre com voce">
              <a class="lp-stories__arrow prev" href="#lp-story-detalhes-1" aria-label="Slide anterior de Sempre com voce"><span aria-hidden="true">&lsaquo;</span></a>
              <a class="lp-stories__arrow next" href="#lp-story-produto-1" aria-label="Proximo slide de Sempre com voce"><span aria-hidden="true">&rsaquo;</span></a>
            </nav>
          </div>
        </article>
      </div>
    </section>`,
    css: `<style>
  /* Guia rapido de midias:
     - Slide/story: proporcao 9:16. Recomendado 1080x1920 px. Minimo seguro 860x1530 px.
     - Poster de video: use a mesma proporcao do slide, preferencialmente 1080x1920 px.
     - Miniatura da bolinha: proporcao 1:1. Recomendado 400x400 px. Minimo seguro 220x220 px.
     - Desktop largo: o viewer muda para 16:10 e usa imagem em 960x para ocupar melhor a area.
     - Use imagens verticais nas maiores dimensoes possiveis. Em desktop largo existe zoom/corte, e arquivos maiores preservam nitidez.
     - Ajuste o foco da midia por slide para topo, centro ou base conforme a posicao do objeto principal.
     - Limites do componente: ate 3 containers e ate 4 slides por container.
     - Imagens horizontais funcionam, mas serao cortadas pelo object-fit: cover.
     - Formatos comuns: webp, jpg, png para imagem; webm ou mp4 para video.
  */
  .lp-stories {
    --story-max-width: 430px;
    --story-max-height: 68vh;
    --story-aspect-ratio: 9 / 16;
    --story-ring-size: 4.6rem;
    --story-thumb-size: 4.1rem;
    --story-ring-bg: conic-gradient(from -20deg, #ff9900, #111827, #ffcc66, #ff9900);
    width: min(100%, 520px);
    margin: 0 auto 2.5rem;
    padding: 0 0.8rem;
    font-family: sans-serif;
    color: #111827;
    position: relative;
  }

  .lp-stories__target {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    scroll-margin-top: 0;
  }

  .lp-stories__options {
    display: grid;
    grid-template-columns: repeat(var(--story-groups, 3), minmax(0, 1fr));
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .lp-stories--groups-1 .lp-stories__options {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .lp-stories--groups-2 .lp-stories__options {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lp-stories--groups-3 .lp-stories__options {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lp-stories__option {
    min-width: 0;
    padding: 0;
    color: #111827;
    background: transparent;
    display: grid;
    justify-items: center;
    gap: 0.5rem;
    text-align: center;
    text-decoration: none;
    transition: transform 160ms ease;
  }

  .lp-stories__option:hover {
    transform: translateY(-2px);
  }

  .lp-stories__option:focus-visible {
    outline: none;
  }

  .lp-stories__option:focus-visible .lp-stories__ring,
  #lp-story-produto-1:target ~ .lp-stories__options .lp-stories__option--produto .lp-stories__ring,
  #lp-story-produto-2:target ~ .lp-stories__options .lp-stories__option--produto .lp-stories__ring,
  #lp-story-produto-3:target ~ .lp-stories__options .lp-stories__option--produto .lp-stories__ring,
  #lp-story-produto-4:target ~ .lp-stories__options .lp-stories__option--produto .lp-stories__ring,
  #lp-story-uso-1:target ~ .lp-stories__options .lp-stories__option--uso .lp-stories__ring,
  #lp-story-uso-2:target ~ .lp-stories__options .lp-stories__option--uso .lp-stories__ring,
  #lp-story-uso-3:target ~ .lp-stories__options .lp-stories__option--uso .lp-stories__ring,
  #lp-story-uso-4:target ~ .lp-stories__options .lp-stories__option--uso .lp-stories__ring,
  #lp-story-detalhes-1:target ~ .lp-stories__options .lp-stories__option--detalhes .lp-stories__ring,
  #lp-story-detalhes-2:target ~ .lp-stories__options .lp-stories__option--detalhes .lp-stories__ring,
  #lp-story-detalhes-3:target ~ .lp-stories__options .lp-stories__option--detalhes .lp-stories__ring,
  #lp-story-detalhes-4:target ~ .lp-stories__options .lp-stories__option--detalhes .lp-stories__ring {
    outline: 3px solid rgba(255, 153, 0, 0.28);
    outline-offset: 4px;
  }

  .lp-stories__ring {
    width: var(--story-ring-size);
    height: var(--story-ring-size);
    padding: 4px;
    border-radius: 50%;
    background: var(--story-ring-bg);
    display: grid;
    place-items: center;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.14);
  }

  .lp-stories__thumb {
    width: var(--story-thumb-size);
    height: var(--story-thumb-size);
    border: 4px solid #fff;
    border-radius: 50%;
    object-fit: cover;
    background: #f1f5f9;
  }

  .lp-stories__name {
    max-width: 5.2rem;
    color: #334155;
    font-size: clamp(0.75rem, 1.2vw, 0.875rem);
    line-height: 1.2;
    overflow-wrap: anywhere;
  }

  .lp-stories__panel {
    display: none;
  }

  .lp-stories__panel.is-default {
    display: block;
  }

  .lp-stories__target:target ~ .lp-stories__panels .lp-stories__panel.is-default {
    display: none;
  }

  #lp-story-produto-1:target ~ .lp-stories__panels .panel-produto-1,
  #lp-story-produto-2:target ~ .lp-stories__panels .panel-produto-2,
  #lp-story-produto-3:target ~ .lp-stories__panels .panel-produto-3,
  #lp-story-produto-4:target ~ .lp-stories__panels .panel-produto-4,
  #lp-story-uso-1:target ~ .lp-stories__panels .panel-uso-1,
  #lp-story-uso-2:target ~ .lp-stories__panels .panel-uso-2,
  #lp-story-uso-3:target ~ .lp-stories__panels .panel-uso-3,
  #lp-story-uso-4:target ~ .lp-stories__panels .panel-uso-4,
  #lp-story-detalhes-1:target ~ .lp-stories__panels .panel-detalhes-1,
  #lp-story-detalhes-2:target ~ .lp-stories__panels .panel-detalhes-2,
  #lp-story-detalhes-3:target ~ .lp-stories__panels .panel-detalhes-3,
  #lp-story-detalhes-4:target ~ .lp-stories__panels .panel-detalhes-4 {
    display: block;
  }

  .lp-stories__viewer {
    width: min(100%, var(--story-max-width));
    max-height: var(--story-max-height);
    aspect-ratio: var(--story-aspect-ratio);
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    background: #020617;
    color: #fff;
    box-shadow: 0 18px 54px rgba(15, 23, 42, 0.22);
    isolation: isolate;
  }

  .lp-stories__viewer::before {
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    height: 128px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0));
    pointer-events: none;
  }

  .lp-stories__progress {
    --slides: 3;
    --index: 1;
    --gap: 4px;
    position: absolute;
    z-index: 4;
    top: 12px;
    left: 12px;
    right: 12px;
    height: 3px;
    overflow: hidden;
    border-radius: 999px;
    background: repeating-linear-gradient(to right, rgba(255, 255, 255, 0.32) 0 calc((100% / var(--slides)) - var(--gap)), transparent calc((100% / var(--slides)) - var(--gap)) calc(100% / var(--slides)));
  }

  .lp-stories__progress::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, #fff 0 calc((100% / var(--slides)) * var(--index)), transparent 0);
    mask: repeating-linear-gradient(to right, #000 0 calc((100% / var(--slides)) - var(--gap)), transparent calc((100% / var(--slides)) - var(--gap)) calc(100% / var(--slides)));
  }

  .lp-stories__progress--slides-1 {
    --slides: 1;
  }

  .lp-stories__progress--slides-2 {
    --slides: 2;
  }

  .lp-stories__progress--slides-3 {
    --slides: 3;
  }

  .lp-stories__progress--slides-4 {
    --slides: 4;
  }

  .lp-stories__progress--index-1 {
    --index: 1;
  }

  .lp-stories__progress--index-2 {
    --index: 2;
  }

  .lp-stories__progress--index-3 {
    --index: 3;
  }

  .lp-stories__progress--index-4 {
    --index: 4;
  }

  .lp-stories__topbar {
    position: absolute;
    z-index: 5;
    top: 26px;
    left: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .lp-stories__avatar {
    width: 36px;
    height: 36px;
    flex: 0 0 auto;
    border: 2px solid rgba(255, 255, 255, 0.78);
    border-radius: 50%;
    object-fit: cover;
  }

  .lp-stories__title {
    min-width: 0;
    flex: 1;
    margin: 0;
    color: #fff;
    font-size: clamp(0.875rem, 1.2vw, 1rem);
    line-height: 1.2;
    font-weight: 700;
    overflow-wrap: anywhere;
    text-shadow: 0 1px 14px rgba(0, 0, 0, 0.45);
  }

  .lp-stories__step {
    font-size: clamp(0.75rem, 1vw, 0.875rem);
    font-weight: 700;
    text-shadow: 0 1px 14px rgba(0, 0, 0, 0.45);
  }

  .lp-stories__figure,
  .lp-stories__media,
  .lp-stories__picture {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .lp-stories__figure {
    position: relative;
  }

  .lp-stories__image,
  .lp-stories__video {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center center;
    background: #020617;
  }

  .lp-stories__figure--focus-top .lp-stories__image,
  .lp-stories__figure--focus-top .lp-stories__video {
    object-position: center top;
  }

  .lp-stories__figure--focus-center .lp-stories__image,
  .lp-stories__figure--focus-center .lp-stories__video {
    object-position: center center;
  }

  .lp-stories__figure--focus-bottom .lp-stories__image,
  .lp-stories__figure--focus-bottom .lp-stories__video {
    object-position: center bottom;
  }

  .lp-stories__caption {
    position: absolute;
    z-index: 3;
    left: 16px;
    right: 16px;
    margin: 0;
    padding: 16px;
    border-radius: 8px;
    color: #fff;
    font-size: clamp(0.875rem, 1.4vw, 1rem);
    line-height: 1.35;
    overflow-wrap: anywhere;
    background: linear-gradient(90deg, var(--story-caption-bg-start), var(--story-caption-bg-end));
    text-shadow: 0 1px 10px rgba(0, 0, 0, 0.38);
  }

  .lp-stories__caption.is-top {
    top: 84px;
  }

  .lp-stories__caption.is-bottom {
    bottom: 22px;
  }

  .lp-stories__nav {
    position: absolute;
    z-index: 6;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: auto;
  }

  .lp-stories__arrow {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 8px;
    color: transparent;
    background: transparent;
    cursor: pointer;
    display: grid;
    place-items: center;
    font-size: 0;
    line-height: 1;
    text-decoration: none;
    pointer-events: auto;
  }

  .lp-stories__arrow.prev {
    display: none;
  }

  @media (min-width: 576px) {
    .lp-stories {
      padding-inline: 1rem;
      --story-max-height: min(680px, 78vh);
      --story-ring-size: 5.25rem;
      --story-thumb-size: 4.75rem;
    }

    .lp-stories__options {
      gap: 1rem;
    }

    .lp-stories__name {
      max-width: 6rem;
    }

    .lp-stories__caption {
      border-radius: 12px;
    }

    .lp-stories__viewer {
      border-radius: 16px;
    }

    .lp-stories__nav {
      pointer-events: none;
    }

    .lp-stories__arrow.prev {
      display: grid;
      border-radius: 0 12px 12px 0;
    }

    .lp-stories__arrow {
      position: static;
      width: 48px;
      height: 56px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      color: #fff;
      background: rgba(15, 23, 42, 0.42);
      font-size: clamp(1.75rem, 3vw, 2rem);
    }

    .lp-stories__arrow.next {
      border-radius: 12px 0 0 12px;
    }
  }

  @media (min-width: 992px) {
    .lp-stories {
      --story-max-width: 960px;
      --story-max-height: none;
      --story-aspect-ratio: 16 / 10;
      width: min(100%, 1040px);
    }

    .lp-stories__viewer {
      width: min(100%, var(--story-max-width));
    }

    .lp-stories__caption {
      right: auto;
      max-width: 560px;
    }

    .lp-stories__caption.is-top {
      top: 96px;
    }

    .lp-stories__caption.is-bottom {
      bottom: 32px;
    }
  }

  .lp-stories {
    --story-ring-bg: conic-gradient(from -20deg, #ff262b, #9e070a, #ff262b);
    --story-caption-bg-start: rgba(2, 6, 23, 0.72);
    --story-caption-bg-end: rgba(2, 6, 23, 0.46);
  }
</style>`
  },


/*@@@@Senko - section-24 */
  /* variantes: app/features/biblioteca/data/variants/section-24.js */
  {
    id: 'section-24',
    name: 'Section-24',
    tags: ['split', 'adaptativo', '24'],
    html: `<section class="section-24" aria-labelledby="section-24-title">
    <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-1"
        aria-label="Mostrar imagem de visão geral" checked>
    <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-2"
        aria-label="Mostrar imagem de detalhe">
    <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-3"
        aria-label="Mostrar imagem de uso">

    <article class="section-24__container">
        <section class="section-24__content" aria-labelledby="section-24-title">
            <nav class="section-24__options" aria-label="Escolha a imagem exibida">
                <label class="section-24__button section-24__button--one" for="section-24-view-1">
                    <span class="section-24__button-title">26 dentes fixos</span>
                    <span class="section-24__button-text">Recolhe folhas, grama solta e resíduos leves com mais
                        praticidade.</span>
                </label>

                <label class="section-24__button section-24__button--two" for="section-24-view-2">
                    <span class="section-24__button-title">Plástico resistente</span>
                    <span class="section-24__button-text">Polipropileno de alta resistência, leve para usar e feito para
                        durar.</span>
                </label>

                <label class="section-24__button section-24__button--three" for="section-24-view-3">
                    <span class="section-24__button-title">Cabo de 120 cm</span>
                    <span class="section-24__button-text">Madeira renovável com acabamento envernizado e toque mais
                        liso.</span>
                </label>
            </nav>
        </section>

        <figure class="section-24__visual" aria-label="Imagens alternáveis do produto">
            <div class="section-24__frame">
                <!-- IMG 1-->
                <div class="section-24__panel section-24__panel--one">
                    <img class="section-24__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-uso-gramado-509702-03.webp"
                        width="1200" height="900" loading="lazy" alt="Imagem de visão geral do produto"
                        decoding="async">
                </div>
                <!-- IMG 2-->
                <div class="section-24__panel section-24__panel--two">
                    <img class="section-24__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-conjunto-ferramentas-509702-02.webp"
                        width="1200" height="900" loading="lazy" alt="Imagem aproximada do acabamento do produto"
                        decoding="async">
                </div>
                <!-- IMG 3-->
                <div class="section-24__panel section-24__panel--three">
                    <img class="section-24__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-lifestyle-509702-01.webp"
                        width="1200" height="900" loading="lazy" alt="Imagem do produto em contexto de uso"
                        decoding="async">
                </div>
            </div>

            <figcaption class="section-24__caption">
                <span class="section-24__message section-24__message--one">Mais alcance sobre folhas e resíduos
                    leves.</span>
                <span class="section-24__message section-24__message--two">Leveza e resistência para a rotina do
                    jardim.</span>
                <span class="section-24__message section-24__message--three">Cabo longo, toque liso e acabamento
                    envernizado.</span>
            </figcaption>
        </figure>
    </article>
</section>`,
    css: `<style>
    * {
        margin: 0;
        padding: 0;
    }

    .section-24 {
        --s24-color-brand: #ff9900;
        --s24-color-ink: #202124;
        --s24-color-muted: #62666d;
        --s24-color-soft: #f4f5f2;
        --s24-color-surface: #ffffff;
        --s24-color-line: #d9ddd3;
        --s24-color-brand-soft: #fff2d9;
        --s24-color-brand-strong: #9c5d00;
        width: 100%;
        margin: 0;
        padding: 2rem 1rem;
        color: var(--s24-color-ink);
        background: var(--s24-color-soft);
        font-family: Arial, Helvetica, sans-serif;
    }

    .section-24,
    .section-24__input,
    .section-24__container,
    .section-24__content,
    .section-24__options,
    .section-24__button,
    .section-24__visual,
    .section-24__frame,
    .section-24__panel,
    .section-24__image,
    .section-24__caption,
    .section-24__message {
        box-sizing: border-box;
    }

    .section-24__input {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
    }

    .section-24__container {
        width: 100%;
        display: grid;
        gap: 1.5rem;
        align-items: start;
    }

    .section-24__content {
        width: 100%;
        display: grid;
        gap: 1rem;
        align-items: start;
    }

    .section-24__button-title,
    .section-24__button-text,
    .section-24__message {
        margin: 0;
        min-width: 0;
        overflow-wrap: anywhere;
    }

    .section-24__options {
        width: 100%;
        display: grid;
        gap: 1rem;
        align-items: start;
        margin-top: 0.5rem;
    }

    .section-24__button {
        position: relative;
        width: 100%;
        display: grid;
        gap: 0.5rem;
        align-items: start;
        padding: 1rem;
        border: 1px solid var(--s24-color-line);
        border-radius: 0.5rem;
        color: var(--s24-color-ink);
        background: var(--s24-color-surface);
        cursor: pointer;
        overflow: hidden;
        transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease, transform 180ms ease;
    }

    .section-24__button::before {
        position: absolute;
        top: 0.5rem;
        bottom: 0.5rem;
        left: 0;
        width: 0.25rem;
        border-radius: 0 0.5rem 0.5rem 0;
        background: var(--s24-color-brand);
        content: "";
        opacity: 0;
        transform: scaleY(0.4);
        transform-origin: center;
        transition: opacity 180ms ease, transform 180ms ease;
    }

    .section-24__button:hover {
        border-color: var(--s24-color-brand);
        box-shadow: 0 0.5rem 1.5rem rgba(32, 33, 36, 0.1);
        transform: translateY(-0.125rem);
    }

    .section-24__button:active {
        transform: scale(0.99);
    }

    .section-24__button-title {
        position: relative;
        z-index: 1;
        font-size: clamp(1rem, 2.7vw, 1.1875rem);
        font-weight: 800;
        line-height: 1.25;
        transition: color 180ms ease;
    }

    .section-24__button-text {
        position: relative;
        z-index: 1;
        color: var(--s24-color-muted);
        font-size: clamp(0.875rem, 2.3vw, 1rem);
        line-height: 1.45;
    }

    .section-24__visual {
        width: 100%;
        margin: 0;
        display: grid;
        gap: 1rem;
        align-items: start;
    }

    .section-24__frame {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        border: 1px solid var(--s24-color-line);
        border-radius: 0.5rem;
        background: var(--s24-color-surface);
        box-shadow: 0 1rem 2rem rgba(32, 33, 36, 0.08);
    }

    .section-24__panel {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        pointer-events: none;
        transform: translateY(0.5rem);
        transition: opacity 220ms ease, transform 220ms ease;
    }

    .section-24__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: saturate(0.92);
        transform: scale(1.04);
        transition: filter 420ms ease, transform 420ms ease;
    }

    .section-24__caption {
        position: relative;
        min-height: 4rem;
        padding: 1rem;
        border-left: 0.25rem solid var(--s24-color-brand);
        border-radius: 0.5rem;
        color: var(--s24-color-ink);
        background: var(--s24-color-surface);
        box-shadow: 0 0.5rem 1rem rgba(32, 33, 36, 0.06);
    }

    .section-24__message {
        position: absolute;
        inset: 1rem;
        color: var(--s24-color-ink);
        font-size: clamp(0.875rem, 2.2vw, 1rem);
        font-weight: 700;
        line-height: 1.4;
        opacity: 0;
        transform: translateY(0.5rem);
        transition: opacity 180ms ease, transform 180ms ease;
    }

    #section-24-view-1:checked~.section-24__container .section-24__panel--one,
    #section-24-view-2:checked~.section-24__container .section-24__panel--two,
    #section-24-view-3:checked~.section-24__container .section-24__panel--three {
        z-index: 2;
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
    }

    #section-24-view-1:checked~.section-24__container .section-24__panel--one .section-24__image,
    #section-24-view-2:checked~.section-24__container .section-24__panel--two .section-24__image,
    #section-24-view-3:checked~.section-24__container .section-24__panel--three .section-24__image {
        filter: saturate(1);
        transform: scale(1);
    }

    #section-24-view-1:checked~.section-24__container .section-24__message--one,
    #section-24-view-2:checked~.section-24__container .section-24__message--two,
    #section-24-view-3:checked~.section-24__container .section-24__message--three {
        opacity: 1;
        transform: translateY(0);
    }

    #section-24-view-1:checked~.section-24__container .section-24__button--one,
    #section-24-view-2:checked~.section-24__container .section-24__button--two,
    #section-24-view-3:checked~.section-24__container .section-24__button--three {
        border-color: var(--s24-color-brand);
        background: var(--s24-color-brand-soft);
        box-shadow: 0 0.5rem 1.5rem rgba(32, 33, 36, 0.12), inset 0 0 0 2px var(--s24-color-brand);
        transform: translateY(-0.125rem);
    }

    #section-24-view-1:checked~.section-24__container .section-24__button--one::before,
    #section-24-view-2:checked~.section-24__container .section-24__button--two::before,
    #section-24-view-3:checked~.section-24__container .section-24__button--three::before {
        opacity: 1;
        transform: scaleY(1);
    }

    #section-24-view-1:checked~.section-24__container .section-24__button--one .section-24__button-title,
    #section-24-view-2:checked~.section-24__container .section-24__button--two .section-24__button-title,
    #section-24-view-3:checked~.section-24__container .section-24__button--three .section-24__button-title {
        color: var(--s24-color-brand-strong);
    }

    #section-24-view-1:focus-visible~.section-24__container .section-24__button--one,
    #section-24-view-2:focus-visible~.section-24__container .section-24__button--two,
    #section-24-view-3:focus-visible~.section-24__container .section-24__button--three {
        outline: 2px solid var(--s24-color-brand);
        outline-offset: 4px;
    }

    @media (min-width: 576px) {

        .section-24__container {
            gap: 2rem;
        }
    }

    @media (min-width: 768px) {

        .section-24__container {
            grid-template-columns: minmax(0, 1fr);
            gap: .5rem;
        }

        .section-24__content {
            order: 2;
        }

        .section-24__visual {
            order: 1;
        }

        .section-24__options {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .section-24__button-title {
            font-size: clamp(0.875rem, 1.8vw, 1rem);
        }

        .section-24__button-text {
            font-size: clamp(0.75rem, 1.6vw, 0.875rem);
        }

        .section-24__frame {
            aspect-ratio: 16 / 9;
        }
    }

    @media (min-width: 992px) {

        .section-24__container {
            grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
            gap: 3rem;
        }

        .section-24__content {
            order: 1;
            align-self: center;
        }

        .section-24__visual {
            order: 2;
        }

        .section-24--reverse .section-24__content {
            order: 2;
        }

        .section-24--reverse .section-24__visual {
            order: 1;
        }

        .section-24__options {
            grid-template-columns: minmax(0, 1fr);
        }

        .section-24__button {
            padding: 1.5rem;
        }

        .section-24__button-title {
            font-size: clamp(1rem, 2.7vw, 1.1875rem);
        }

        .section-24__button-text {
            font-size: clamp(0.875rem, 2.3vw, 1rem);
        }
    }

    @media (min-width: 1200px) {
        .section-24__container {
            gap: 3rem;
        }

        .section-24__frame {
            aspect-ratio: 16 / 9;
        }
    }
</style>`
  },


/*@@@@Senko - section-25 */
  /* variantes: app/features/biblioteca/data/variants/section-25.js */
  {
    id: 'section-25',
    name: 'Section-25',
    tags: ['Carrossel', 'grid'],
    html: `<section class="section-25" aria-label="Abas de conteúdo sobre o produto">

    <input class="section-25__radio" type="radio" name="s25-tabs" id="s25-tab1" checked aria-hidden="true">
    <input class="section-25__radio" type="radio" name="s25-tabs" id="s25-tab2" aria-hidden="true">
    <input class="section-25__radio" type="radio" name="s25-tabs" id="s25-tab3" aria-hidden="true">
    <input class="section-25__radio" type="radio" name="s25-tabs" id="s25-tab4" aria-hidden="true">

    <div class="section-25-container">

        <nav class="section-25__nav" role="tablist" aria-label="Seções do produto">
            <label class="section-25__tab-label" for="s25-tab1" role="tab">Origem</label>
            <label class="section-25__tab-label" for="s25-tab2" role="tab">Processo</label>
            <label class="section-25__tab-label" for="s25-tab3" role="tab">Envelhecimento</label>
            <label class="section-25__tab-label" for="s25-tab4" role="tab">Perfil Sensorial</label>
        </nav>

        <div class="section-25__panels">

            <article class="section-25__panel section-25__panel--1" role="tabpanel" aria-label="Origem">
                <div class="section-25__split">
                    <figure class="section-25__figure">
                        <picture>
                            <source srcset="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" media="(min-width: 768px)">
                            <img class="section-25__image" src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" alt="Barris de carvalho enfileirados em adega escura — local de origem do Domecq" width="800" height="600" loading="lazy">
                        </picture>
                    </figure>
                    <div class="section-25__body">
                        <h2 class="section-25__title">Tradição brasileira<br>que atravessa gerações</h2>
                        <p class="section-25__description">Produzido no Brasil pela Pernod Ricard Brasil, em Resende – RJ, o Domecq Coquetel Composto é elaborado com ingredientes selecionados que garantem seu aroma frutado e sabor inigualável. Uma receita clássica, feita para momentos que merecem ser celebrados.</p>
                        <span class="section-25__location" aria-label="Localização: Resende, RJ, Brasil"></span>
                    </div>
                </div>
            </article>

            <article class="section-25__panel section-25__panel--2" role="tabpanel" aria-label="Processo">
                <div class="section-25__split section-25__split--reverse">
                    <figure class="section-25__figure">
                        <picture>
                            <source srcset="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80" media="(min-width: 768px)">
                            <img class="section-25__image" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80" alt="Mesa com ingredientes e utensílios do processo artesanal de destilação" width="800" height="600" loading="lazy">
                        </picture>
                    </figure>
                    <div class="section-25__body">
                        <h2 class="section-25__title">Destilação artesanal<br>com técnica centenária</h2>
                        <p class="section-25__description">Cada lote é produzido com controle rigoroso de temperatura e tempo de fermentação. O processo combina métodos tradicionais herdados de mestres destiladores com padrões modernos de qualidade que garantem consistência e pureza em cada garrafa.</p>
                        <span class="section-25__location" aria-label="Processo realizado em Resende, RJ"></span>
                    </div>
                </div>
            </article>

            <article class="section-25__panel section-25__panel--3" role="tabpanel" aria-label="Envelhecimento">
                <div class="section-25__split">
                    <figure class="section-25__figure">
                        <picture>
                            <source srcset="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=700&q=80" media="(min-width: 768px)">
                            <img class="section-25__image" src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80" alt="Taça com destilado âmbar iluminado — resultado do envelhecimento em barris de carvalho" width="800" height="600" loading="lazy">
                        </picture>
                    </figure>
                    <div class="section-25__body">
                        <h2 class="section-25__title">Envelhecido em carvalho<br>para sabor complexo</h2>
                        <p class="section-25__description">O descanso em barris de carvalho americano confere ao Domecq notas amadeiradas, caramelo e baunilha que equilibram a doçura natural da bebida. O tempo de maturação é cuidadosamente monitorado para atingir o ponto exato de harmonia entre força e suavidade.</p>
                        <span class="section-25__location" aria-label="Envelhecimento em adega própria em Resende, RJ"></span>
                    </div>
                </div>
            </article>

            <article class="section-25__panel section-25__panel--4" role="tabpanel" aria-label="Perfil Sensorial">
                <div class="section-25__split section-25__split--reverse">
                    <figure class="section-25__figure">
                        <picture>
                            <source srcset="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=700&q=80" media="(min-width: 768px)">
                            <img class="section-25__image" src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&q=80" alt="Prato gourmet com ingredientes aromáticos que representam o perfil sensorial do produto" width="800" height="600" loading="lazy">
                        </picture>
                    </figure>
                    <div class="section-25__body">
                        <h2 class="section-25__title">Aroma frutado,<br>sabor inigualável</h2>
                        <p class="section-25__description">No nariz, notas de frutas tropicais, especiarias suaves e um toque de mel. Na boca, a entrada é redonda e envolvente, com final longo e persistente. Um perfil sensorial equilibrado que agrada tanto apreciadores experientes quanto quem descobre o mundo dos destilados pela primeira vez.</p>
                        <span class="section-25__location" aria-label="Avaliação sensorial certificada — Resende, RJ"></span>
                    </div>
                </div>
            </article>

        </div>
    </div>
</section>`,
    css: `<style>
    .section-25 {
        --s25-color-brand: #7b1d2e;
        --s25-color-bg: #faf7f2;
        --s25-color-tab-bg: #f0ebe3;
        --s25-color-text: #2c1a12;
        --s25-color-muted: #6b5044;
        --s25-color-border: #d9cfc4;
    }

    .section-25__radio {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
    }

    .section-25 {
        background-color: var(--s25-color-bg);
        padding: 2rem 1rem;
        font-family: Georgia, serif;
        position: relative;
    }

    .section-25-container {
        width: 100%;
        margin-inline: auto;
    }

    .section-25__nav {
        display: flex;
        border-bottom: 2px solid var(--s25-color-border);
        overflow-x: auto;
        scrollbar-width: none;
    }

    .section-25__nav::-webkit-scrollbar {
        height: 0;
    }

    .section-25__tab-label {
        flex: 1 0 auto;
        min-width: 7rem;
        padding: 0.75rem 1rem;
        font-size: clamp(0.8rem, 1.5vw, 0.9rem);
        font-family: Arial, sans-serif;
        color: var(--s25-color-muted);
        background-color: var(--s25-color-tab-bg);
        border: 1px solid var(--s25-color-border);
        border-bottom: none;
        cursor: pointer;
        text-align: center;
        white-space: nowrap;
        transition: background-color 0.2s, color 0.2s;
        user-select: none;
    }

    .section-25__panels {
        border: 1px solid var(--s25-color-border);
        border-top: none;
        background-color: #ffffff;
    }

    .section-25__panel {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
        scroll-margin-top: 0;
    }

    .section-25__split {
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    .section-25__figure {
        width: 100%;
        margin: 0;
        aspect-ratio: 4/3;
        overflow: hidden;
    }

    .section-25__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .section-25__body {
        padding: 1.5rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: start;
    }

    .section-25__title {
        font-size: clamp(1.25rem, 3vw, 1.75rem);
        color: var(--s25-color-brand);
        line-height: 1.3;
        margin: 0;
        font-weight: 700;
    }

    .section-25__description {
        font-size: clamp(0.875rem, 1.5vw, 1rem);
        color: var(--s25-color-text);
        line-height: 1.7;
        margin: 0;
        font-family: Arial, sans-serif;
    }

    .section-25__location {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: clamp(0.8rem, 1.2vw, 0.875rem);
        color: var(--s25-color-brand);
        font-family: Arial, sans-serif;
    }

    #s25-tab1:checked~.section-25-container .section-25__tab-label[for="s25-tab1"],
    #s25-tab2:checked~.section-25-container .section-25__tab-label[for="s25-tab2"],
    #s25-tab3:checked~.section-25-container .section-25__tab-label[for="s25-tab3"],
    #s25-tab4:checked~.section-25-container .section-25__tab-label[for="s25-tab4"] {
        background-color: var(--s25-color-brand);
        color: #ffffff;
        border-color: var(--s25-color-brand);
    }

    #s25-tab1:checked~.section-25-container .section-25__panel--1,
    #s25-tab2:checked~.section-25-container .section-25__panel--2,
    #s25-tab3:checked~.section-25-container .section-25__panel--3,
    #s25-tab4:checked~.section-25-container .section-25__panel--4 {
        position: static;
        width: auto;
        height: auto;
        overflow: visible;
        opacity: 1;
        pointer-events: auto;
    }

    @media (min-width: 768px) {
        .section-25-container {
            max-width: 768px;
        }

        .section-25__split {
            flex-direction: row;
        }

        .section-25__figure {
            flex: 0 0 45%;
            aspect-ratio: 4/3;
        }

        .section-25__body {
            flex: 1;
            padding: 2rem 1.5rem;
            justify-content: center;
        }

        .section-25__split--reverse {
            flex-direction: row-reverse;
        }
    }

    @media (min-width: 992px) {
        .section-25-container {
            max-width: 992px;
        }

        .section-25__figure {
            flex: 0 0 42%;
        }

        .section-25__body {
            padding: 2rem;
        }
    }

    @media (min-width: 1200px) {
        .section-25-container {
            max-width: 1200px;
        }
    }

    @media (min-width: 1400px) {
        .section-25-container {
            max-width: 1400px;
        }
    }
</style>`
  },


/*@@@@Senko - section-33 */
  /* variantes: app/features/biblioteca/data/variants/section-33.js */
  {
    id: 'section-33',
    name: 'Section-33',
    tags: ['Video', 'full width', '33'],
    html: `<section class="section-33__container" aria-label="Seção de vídeo do produto">
  <div class="section-33__video-section">
    <div class="section-33__video-wrapper">

      <!--
      =====================================================================
      OPÇÃO 1 — IFRAME DIRETO
      Copie e cole o iframe gerado pelo próprio YouTube:
        1. Abra o vídeo no YouTube
        2. Clique em "Compartilhar" → "Incorporar"
        3. Copie o <iframe> e cole aqui substituindo o abaixo

      Exemplo pronto:
      =====================================================================
      -->
      <iframe width="560" height="315" src="https://www.youtube.com/embed/F_uv8PM0tYc?si=KSkt2pbhIguSII_K"
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

      <!--
      =====================================================================
      OPÇÃO 2 — SÓ O LINK DO YOUTUBE (sem iframe)
      Se preferir usar apenas o link do vídeo, siga o padrão abaixo:

      Link normal:   https://www.youtube.com/watch?v=ID_DO_VIDEO
      Vire embed:    https://www.youtube.com/embed/ID_DO_VIDEO

      Basta pegar o valor após "?v=" e colar no src assim:
        src="https://www.youtube.com/embed/ID_DO_VIDEO"

      Parâmetros opcionais no link embed:
        ?autoplay=1          → inicia automaticamente (exige mute=1 no Chrome)
        ?mute=1              → sem som
        ?controls=0          → esconde os controles
        ?loop=1&playlist=ID  → repete o vídeo
        ?start=30            → começa no segundo 30

      Exemplo com parâmetros:
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ"
      =====================================================================
      -->

    </div>
  </div>
</section>`,
    css: `<style>
  .section-33__container {
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
  }

  .section-33__video-section {
    position: relative;
    width: 100%;
    max-height: 865px;
    overflow: hidden;
    /* background: linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #e94560 100%); */
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px 0;
  }

  .section-33__video-wrapper {
    position: relative;
    width: 100%;
    max-width: 1280px;
    max-height: 865px;

    /*
     * PROPORÇÃO DO VÍDEO
     * 16:9 = padding-bottom: 56.25%
     * 4:3  = padding-bottom: 75%
     * 1:1  = padding-bottom: 100%
     */
    padding-bottom: 56.25%;

    margin: 0 auto;
  }

  .section-33__video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 18px;
  }
</style>`
  },

]);
