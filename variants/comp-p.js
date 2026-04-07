// @ts-nocheck
SenkoLib.registerVariant('comp-p', [
/*@@@@Senko - padrao-p-2-blocos */
  {
    name: 'padrao-p-2-blocos',
    html: `<section class="video-header" aria-label="Cabeçalho do produto">
        <article style="width: 100%;">
      <header class="video-header__banner">
        <video class="video-header__banner-video"
          poster="C:UsersygorqDownloadsCaptura de tela 2026-04-02 161810.png" preload="none" autoplay muted loop
          playsinline width="1200" height="250" aria-hidden="true">
          <source
            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/cottonbaby/header-cottonbaby1.mov"
            loading="lazy">
        </video>
        <div class="video-header__badge" role="img" aria-label="Logo da marca">
          <img
            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/cottonbaby/logo-cottonbaby2.png"
            alt="imagem png com ícone da marca" class="video-header__badge-img">
        </div>
      </header>
        <section class="video-header__body">
        <small class="video-header__brand">Marca</small>
        <h1 class="video-header__title">
          TÍTULO DO PRODUTO (Nome, modelo, diferencial...)
        </h1>
        <p class="video-header__subtitle">
          Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
          Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
        </p>
    </section>
     </section>

      <section class="section-32__container" aria-label="Seção de destaque do produto">
    <figure class="section-32__groupimage-section">
      <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/nestle/biscoito-nestle-surpresa-embalagem-flutuando-fundo-natureza-4303562-02.jpg.jpg"
        alt="!!!!!COLOQUE O TEXTO ALT AQUI!!!!!" style="border-radius: 30px 30px 0px 0px;" width="1600" height="865"
        loading="lazy" decoding="async" fetchpriority="low">
      <figcaption class="section-32__grouptext-overlay right grouptext-overlay-Background" style="top: 25%;">
        <h2><strong>SUB-TÍTULO</strong></h2>
        <p>Isso é uma descrição. Isso é uma descrição. Isso é uma descrição. Isso é umadescrição.
          Isso é uma descrição.  Isso é uma descrição.
        </p>
      </figcaption>


    <figure class="section-32__groupimage-section" style="z-index: 1;">
      <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/nestle/biscoito-nestle-surpresa-tucano-galho-chocolate-ambiente-4303562-03.jpg.jpg"
        alt="!!!!!COLOQUE O TEXTO ALT AQUI!!!!!" style="border-radius: 0px 0px 30px 30px;" width="1600" height="865"
        loading="lazy" decoding="async" fetchpriority="low">
      <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background" style="top: 75%; left: 25%;">
        <h2>
            <strong>SUB-TÍTULO</strong>
        </h2>
        <p>Isso é uma descrição. Isso é uma descrição. Isso é uma descrição. Isso é umadescrição.
          Isso é uma descrição. 
        </p>
      </figcaption>
    </figure>
  </section>
    

  <footer>
  <p class="p__end">
    <strong>Imagens Meramente Ilustrativas</strong>
  </p>
  </footer>
  </article>

 </div>`,
    css: `
    @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Varela+Round&display=swap');


    *{
    margin: 0;
    padding: 0;
  }

   body {

      margin: 0;
    }

    .tw-container {
      margin-left: auto;
      margin-right: auto;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      width: 100%
    }

    @media (min-width:576px) {

      .tw-container {

        max-width: 576px
      }
    }

    @media (min-width:768px) {

      .tw-container {

        max-width: 768px
      }
    }

    @media (min-width:992px) {

      .tw-container {

        max-width: 992px
      }
    }

    @media (min-width:1200px) {

      .tw-container {

        max-width: 1200px
      }
    }

    @media (min-width:1536px) {

      .tw-container {

        max-width: 1536px
      }
    }

    .tw-absolute {

      position: absolute
    }

    .tw-relative {

      position: relative
    }

    .-tw-bottom-16 {

      bottom: -4rem
    }

    .tw-left-0 {

      left: 0
    }

    .tw-top-0 {

      top: 0
    }

    .tw-z-0 {

      z-index: 0
    }

    .tw-z-10 {

      z-index: 10
    }

    .tw-col-span-2 {

      grid-column: span 2/span 2
    }

    .tw-m-0 {

      margin: 0
    }

    .tw-my-16 {

      margin-bottom: 4rem;
      margin-top: 4rem
    }

    .tw-my-8 {

      margin-bottom: 2rem;
      margin-top: 2rem
    }

    .tw-mb-1 {

      margin-bottom: .25rem
    }

    .tw-mb-6 {

      margin-bottom: 1.5rem
    }

    .tw-mt-16 {

      margin-top: 4rem
    }

    .tw-mt-4 {

      margin-top: 1rem
    }

    .tw-mt-8 {

      margin-top: 2rem
    }

    .tw-flex {

      display: flex
    }

    .tw-grid {

      display: grid
    }

    .tw-h-14 {

      height: 3.5rem
    }

    .tw-h-32 {

      height: 8rem
    }

    .tw-h-5 {

      height: 1.25rem
    }

    .tw-h-56 {

      height: 14rem
    }

    .tw-h-6 {

      height: 1.5rem
    }

    .tw-h-64 {

      height: 16rem
    }

    .tw-h-25rem {

      height: 25rem
    }

    .tw-h-31-25rem {

      height: 31.25rem
    }

    .tw-h-32rem {

      height: 32rem
    }

    .tw-h-full {

      height: 100%
    }

    .tw-w-14 {

      width: 3.5rem
    }

    .tw-w-32 {

      width: 8rem
    }

    .tw-w-5 {

      width: 1.25rem
    }

    .tw-w-6 {

      width: 1.5rem
    }

    .tw-w-full {

      width: 100%
    }

    .tw-max-w-6rem {

      max-width: 6rem
    }

    .tw-max-w-md {

      max-width: 28rem
    }

    .tw-max-w-sm {

      max-width: 24rem
    }

    .tw-max-w-xl {

      max-width: 36rem
    }

    .tw-select-none {

      -webkit-user-select: none;
      user-select: none
    }

    .tw-list-none {

      list-style-type: none
    }

    .tw-grid-cols-1 {

      grid-template-columns: repeat(1, minmax(0, 1fr))
    }

    .tw-flex-col {

      flex-direction: column
    }

    .tw-items-end {

      align-items: flex-end
    }

    .tw-items-center {

      align-items: center
    }

    .tw-justify-end {

      justify-content: flex-end
    }

    .tw-justify-center {

      justify-content: center
    }

    .tw-justify-between {

      justify-content: space-between
    }

    .tw-gap-10 {

      gap: 2.5rem
    }

    .tw-gap-14 {

      gap: 3.5rem
    }

    .tw-gap-4 {

      gap: 1rem
    }

    .tw-gap-y-4 {

      row-gap: 1rem
    }

    .tw-rounded {

      border-radius: .25rem
    }

    .tw-rounded-2xl {

      border-radius: 1rem
    }

    .tw-rounded-full {

      border-radius: 9999px
    }

    .tw-rounded-lg {

      border-radius: .5rem
    }

    .tw-rounded-t {

      border-top-left-radius: .25rem;
      border-top-right-radius: .25rem
    }

    .tw-border-t {

      border-top-width: 1px
    }

    .tw-border-solid {

      border-style: solid
    }

    .tw-border-transparent {

      border-color: transparent
    }

    .tw-bg-gray-900 {

      --tw-bg-opacity: 1;
      background-color: rgb(46 53 56/var(--tw-bg-opacity))
    }

    .tw-bg-primary {

      --tw-bg-opacity: 1;
      background-color: rgb(255 153 0/var(--tw-bg-opacity))
    }

    .tw-bg-white {

      --tw-bg-opacity: 1;
      background-color: rgb(255 255 255/var(--tw-bg-opacity))
    }

    .tw-object-contain {

      object-fit: contain
    }

    .tw-object-cover {

      object-fit: cover
    }

    .tw-p-3 {

      padding: .75rem
    }

    .tw-p-5 {

      padding: 1.25rem
    }

    .tw-p-6 {

      padding: 1.5rem
    }

    .tw-p-8 {

      padding: 2rem
    }

    .tw-py-10 {

      padding-bottom: 2.5rem;
      padding-top: 2.5rem
    }

    .tw-pl-0 {

      padding-left: 0
    }

    .tw-pt-8 {

      padding-top: 2rem
    }

    .tw-text-center {

      text-align: center
    }

    .tw-font-roboto {

      font-family: Roboto, sans-serif
    }

    .tw-text-2xl {

      font-size: 32px;
      font-weight: 600;
      line-height: 40px
    }

    .tw-text-lg {

      font-size: 20px;
      font-weight: 700;
      line-height: 28px
    }

    .tw-text-md {

      font-size: 16px;
      line-height: 24px
    }

    .tw-text-sm {

      font-size: 14px;
      line-height: 22px
    }

    .tw-text-xs {

      font-size: 12px;
      font-weight: 700;
      line-height: 16px
    }

    .tw-uppercase {

      text-transform: uppercase
    }

    .tw-text-black {

      --tw-text-opacity: 1;
      color: rgb(0 0 0/var(--tw-text-opacity))
    }

    .tw-text-gray-500 {

      --tw-text-opacity: 1;
      color: rgb(138 138 138/var(--tw-text-opacity))
    }

    .pdp {

      display: flex;
      flex-direction: column;
      font-family: Roboto, sans-serif
    }

    .pdp * {

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
    letter-spacing: 0.08em;
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

 
  
    .section-32__container {
      width: 100%;
      max-width: 1600px;
      margin: 0 auto;
      border: 5.5px solid #000;
      border-radius: 34.5px;
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
      color: #ffffff;
      position: absolute;
      max-width: 45%;
      width: 90%;
      line-height: 2rem;
      text-align: center;
      font-family: sans-serif
    }

    .section-32__grouptext-overlay.top {
      top: 3%;
      left: 50%;
      transform: translateX(-50%);
    }

    .section-32__grouptext-overlay.bottom {
      top: 75%;
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
      top: 25%;
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
      font-size: 1.2vw;
      margin: 0;
      line-height: 120%;
    }

    .grouptext-overlay-Background {
        background: rgba(0, 0, 0, 0.438);
        border-radius: 4.5vw;
        padding: 0.5rem;
        backdrop-filter: blur(0.5vw);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        -webkit-backdrop-filter: blur(0px);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255, 255, 255, 0.3);
        max-width: 70%;
        z-index: 100;
    }

    .p__end {
      color: #8a8a8a;
      font-family: sans-serif;
      font-size: clamp(1rem, 2vw, 1.2rem);
      text-wrap: pretty;
      text-align: center;
      padding: 40px 0;
        
    }

    @media (max-width: 470px) {  
      .video-header__subtitle {
        text-align: justify;
        font-size: clamp(0.9rem, 2vw, 1.5rem);
        font-weight: 550;
        
      }

      .section-32__grouptext-overlay h2 {
          font-size: 3vw;
        }

      .section-32__grouptext-overlay p {
          font-size: 2.4vw;
        }

      .section-32__grouptext-overlay.top {
          top: 3%;
        }

      .section-32__grouptext-overlay.bottom {
          top: 81%
        }

      .section-32__grouptext-overlay.right {
          top: 35%;
          left: 73%;
          transform: translate(-50%, -50%);
        }

        .section-32__grouptext-overlay.left {
          top: 50%;
          left: 27%;
          transform: translate(-50%, -50%);
        }

    }

    @media (max-width: 500px) {
        .section-32__grouptext-overlay h2 {
          font-size: 3vw;
        }

        .section-32__grouptext-overlay p {
          font-size: 2.3vw;
        }

        .section-32__grouptext-overlay.top {
          top: 3%;
        }

          .section-32__grouptext-overlay.bottom {
          top: 67%;
        }

        
    }


    @media (max-width: 768px) {
      .video-header {
        --banner-height: 180px;
      }

      .section-32__grouptext-overlay h2 {
          font-size: 2.5vw;
        }

      .section-32__grouptext-overlay p {
          font-size: 2vw;
        }

      .section-32__grouptext-overlay.top {
          top: 3%;
        }

      .section-32__grouptext-overlay.bottom {
          top: 76%;
        }
    }

    @media (max-width: 960px) {
        .section-32__grouptext-overlay h2 {
          font-size: 2.1vw;
        }

        .section-32__grouptext-overlay p {
          font-size: 1.5vw;
        }

        .section-32__grouptext-overlay.top {
          top: 3%;
        }

        .section-32__grouptext-overlay.bottom {
          top: 79%
        }
    }

    @media (max-width: 1060px) {
        .section-32__grouptext-overlay.top {
          top: 3%;
        }

        .section-32__grouptext-overlay.bottom {
          top: 81%;
        }
    }`,
  },
/*@@@@Senko - padrao-p-com-table */
  {
    name: 'padrao-p-com-table',
    html: `<div class="lp-container">
  <link rel="nestlenect" href="https://fonts.googleapis.com">
  <link rel="nestlenect" href="https://fonts.gstatic.com" crossorigin>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
    rel="stylesheet">
  <title>PDP - eFácil</title>


   <article style="width: 100%;">
    <section class="video-header" aria-label="Cabeçalho do produto">
   
      <header class="video-header__banner">
        <video class="video-header__banner-video"
          poster="C:UsersygorqDownloadsCaptura de tela 2026-04-02 161810.png" preload="none" autoplay muted loop
          playsinline width="1200" height="250" aria-hidden="true">
          <source
            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/cottonbaby/header-cottonbaby1.mov"
            loading="lazy">
        </video>
        <div class="video-header__badge" role="img" aria-label="Logo da marca">
          <img
            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/cottonbaby/logo-cottonbaby2.png"
            alt="imagem png com ícone da marca" class="video-header__badge-img">
        </div>
      </header>
        <section class="video-header__body">
        <small class="video-header__brand">Marca</small>
        <h1 class="video-header__title">
          TÍTULO DO PRODUTO (Nome, modelo, diferencial...)s
        </h1>
        <p class="video-header__subtitle">
          Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
          Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
        </p>
     </section>
     </section>



      <section class="section-32__container" aria-label="Seção de destaque do ou dos produto">
       <figure class="section-32__groupimage-section">
       <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao32.jpg"
        alt="!!!!!COLOQUE O TEXTO ALT AQUI!!!!!" style="border-radius: 30px 30px 0px 0px;" width="1600" height="865"
        loading="lazy" decoding="async" fetchpriority="low">
      <figcaption class="section-32__grouptext-overlay right grouptext-overlay-Background" style="top: 25%;">
        <h2><strong>SUB-TÍTULO</strong></h2>
        <p>Isso é uma descrição. Isso é uma descrição. Isso é uma descrição. Isso é umadescrição.
          Isso é uma descrição.  Isso é uma descrição.
        </p>
      </figcaption>
      </figure>

       <figure class="section-32__groupimage-section" style="z-index: 2;">
      <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao32.jpg"
        alt="!!!!!COLOQUE O TEXTO ALT AQUI!!!!!" style="border-radius: 0px 0px 0px 0px;" width="1600" height="865"
        loading="lazy" decoding="async" fetchpriority="low">
      <figcaption class="section-32__grouptext-overlay bottom grouptext-overlay-Background" style="top: 75%;">
        <h2><strong>SUB-TÍTULO</strong></h2>
        <p>Isso é uma descrição. Isso é uma descrição. Isso é uma descrição. Isso é umadescrição.
          Isso é uma descrição.  Isso é uma descrição.
        </p>
      </figcaption>
      </figure>


      <figure class="section-32__groupimage-section">
      <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao32.jpg"
        alt="!!!!!COLOQUE O TEXTO ALT AQUI!!!!!" style="border-radius: 0px 0px 30px 30px;" width="1600" height="865"
        loading="lazy" decoding="async" fetchpriority="low">
      <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background" style="top: 75%; left: 25%;">
        <h2>
            <strong>SUB-TÍTULO</strong>
        </h2>
        <p>Isso é uma descrição. Isso é uma descrição. Isso é uma descrição. Isso é umadescrição.
          Isso é uma descrição. 
        </p>
      </figcaption>
      </figure>
      </section>
    

        <footer>
           <p class="p__end">
          <strong>Imagens Meramente Ilustrativas</strong>
          </p>

          <section class="table-container-custom" aria-label="tabela contendo produtos relacionados e citados dentre deste conteúdo">
          <h1 class="table-text-custom">ITENS RELACIONADOS</h1><br />
          <table class="table-design-custom">
            <thead class="table-head-custom">
               <tr class="table-tr-custom">
                 <th class="table-text-custom table-th-custom" style="background-color: #fb8d00; border-radius: 10px 0 0 0;">SKU
                 </th>
                 <!--Replicar para adicionar mais COLUNAS-->
                 <th class="table-text-custom table-th-custom" style="background-color: #fb8d00; border-radius: 0 10px 0 0;">TÍTULO
                 </th>
               </tr>
             </thead>
             <tbody>
               <tr class="table-tr-custom">
                 <td class="table-text-custom table-td-custom-title">SKU 1</td>
                 <td class="table-text-custom table-td-custom-sub">DESCRIÇÃO DO PRODUTO 1</td>
               </tr>
               <tr class="table-tr-custom">
                 <td class="table-text-custom table-td-custom-title">SKU 2</td>
                 <td class="table-text-custom table-td-custom-sub">DESCRIÇÃO DO PRODUTO 2</td>
               </tr>
               <tr class="table-tr-custom">
                 <td class="table-text-custom table-td-custom-title">SKU 3</td>
                 <td class="table-text-custom table-td-custom-sub">DESCRIÇÃO DO PRODUTO 3</td>
               </tr>
               <tr class="table-tr-custom">
                 <td class="table-text-custom table-td-custom-title ">SKU 4</td>
                 <td class="table-text-custom table-td-custom-sub">DESCRIÇÃO DO PRODUTO 4</td>
               </tr>
             </tbody>
           </table>
         </section>
        </footer>

        </article>


</div>


`,
    css: `
    @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Varela+Round&display=swap');


    *{
    margin: 0;
    padding: 0;
  }

   body {

      margin: 0;
    }

    .tw-container {
      margin-left: auto;
      margin-right: auto;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      width: 100%
    }

    @media (min-width:576px) {

      .tw-container {

        max-width: 576px
      }
    }

    @media (min-width:768px) {

      .tw-container {

        max-width: 768px
      }
    }

    @media (min-width:992px) {

      .tw-container {

        max-width: 992px
      }
    }

    @media (min-width:1200px) {

      .tw-container {

        max-width: 1200px
      }
    }

    @media (min-width:1536px) {

      .tw-container {

        max-width: 1536px
      }
    }

    .tw-absolute {

      position: absolute
    }

    .tw-relative {

      position: relative
    }

    .-tw-bottom-16 {

      bottom: -4rem
    }

    .tw-left-0 {

      left: 0
    }

    .tw-top-0 {

      top: 0
    }

    .tw-z-0 {

      z-index: 0
    }

    .tw-z-10 {

      z-index: 10
    }

    .tw-col-span-2 {

      grid-column: span 2/span 2
    }

    .tw-m-0 {

      margin: 0
    }

    .tw-my-16 {

      margin-bottom: 4rem;
      margin-top: 4rem
    }

    .tw-my-8 {

      margin-bottom: 2rem;
      margin-top: 2rem
    }

    .tw-mb-1 {

      margin-bottom: .25rem
    }

    .tw-mb-6 {

      margin-bottom: 1.5rem
    }

    .tw-mt-16 {

      margin-top: 4rem
    }

    .tw-mt-4 {

      margin-top: 1rem
    }

    .tw-mt-8 {

      margin-top: 2rem
    }

    .tw-flex {

      display: flex
    }

    .tw-grid {

      display: grid
    }

    .tw-h-14 {

      height: 3.5rem
    }

    .tw-h-32 {

      height: 8rem
    }

    .tw-h-5 {

      height: 1.25rem
    }

    .tw-h-56 {

      height: 14rem
    }

    .tw-h-6 {

      height: 1.5rem
    }

    .tw-h-64 {

      height: 16rem
    }

    .tw-h-25rem {

      height: 25rem
    }

    .tw-h-31-25rem {

      height: 31.25rem
    }

    .tw-h-32rem {

      height: 32rem
    }

    .tw-h-full {

      height: 100%
    }

    .tw-w-14 {

      width: 3.5rem
    }

    .tw-w-32 {

      width: 8rem
    }

    .tw-w-5 {

      width: 1.25rem
    }

    .tw-w-6 {

      width: 1.5rem
    }

    .tw-w-full {

      width: 100%
    }

    .tw-max-w-6rem {

      max-width: 6rem
    }

    .tw-max-w-md {

      max-width: 28rem
    }

    .tw-max-w-sm {

      max-width: 24rem
    }

    .tw-max-w-xl {

      max-width: 36rem
    }

    .tw-select-none {

      -webkit-user-select: none;
      user-select: none
    }

    .tw-list-none {

      list-style-type: none
    }

    .tw-grid-cols-1 {

      grid-template-columns: repeat(1, minmax(0, 1fr))
    }

    .tw-flex-col {

      flex-direction: column
    }

    .tw-items-end {

      align-items: flex-end
    }

    .tw-items-center {

      align-items: center
    }

    .tw-justify-end {

      justify-content: flex-end
    }

    .tw-justify-center {

      justify-content: center
    }

    .tw-justify-between {

      justify-content: space-between
    }

    .tw-gap-10 {

      gap: 2.5rem
    }

    .tw-gap-14 {

      gap: 3.5rem
    }

    .tw-gap-4 {

      gap: 1rem
    }

    .tw-gap-y-4 {

      row-gap: 1rem
    }

    .tw-rounded {

      border-radius: .25rem
    }

    .tw-rounded-2xl {

      border-radius: 1rem
    }

    .tw-rounded-full {

      border-radius: 9999px
    }

    .tw-rounded-lg {

      border-radius: .5rem
    }

    .tw-rounded-t {

      border-top-left-radius: .25rem;
      border-top-right-radius: .25rem
    }

    .tw-border-t {

      border-top-width: 1px
    }

    .tw-border-solid {

      border-style: solid
    }

    .tw-border-transparent {

      border-color: transparent
    }

    .tw-bg-gray-900 {

      --tw-bg-opacity: 1;
      background-color: rgb(46 53 56/var(--tw-bg-opacity))
    }

    .tw-bg-primary {

      --tw-bg-opacity: 1;
      background-color: rgb(255 153 0/var(--tw-bg-opacity))
    }

    .tw-bg-white {

      --tw-bg-opacity: 1;
      background-color: rgb(255 255 255/var(--tw-bg-opacity))
    }

    .tw-object-contain {

      object-fit: contain
    }

    .tw-object-cover {

      object-fit: cover
    }

    .tw-p-3 {

      padding: .75rem
    }

    .tw-p-5 {

      padding: 1.25rem
    }

    .tw-p-6 {

      padding: 1.5rem
    }

    .tw-p-8 {

      padding: 2rem
    }

    .tw-py-10 {

      padding-bottom: 2.5rem;
      padding-top: 2.5rem
    }

    .tw-pl-0 {

      padding-left: 0
    }

    .tw-pt-8 {

      padding-top: 2rem
    }

    .tw-text-center {

      text-align: center
    }

    .tw-font-roboto {

      font-family: Roboto, sans-serif
    }

    .tw-text-2xl {

      font-size: 32px;
      font-weight: 600;
      line-height: 40px
    }

    .tw-text-lg {

      font-size: 20px;
      font-weight: 700;
      line-height: 28px
    }

    .tw-text-md {

      font-size: 16px;
      line-height: 24px
    }

    .tw-text-sm {

      font-size: 14px;
      line-height: 22px
    }

    .tw-text-xs {

      font-size: 12px;
      font-weight: 700;
      line-height: 16px
    }

    .tw-uppercase {

      text-transform: uppercase
    }

    .tw-text-black {

      --tw-text-opacity: 1;
      color: rgb(0 0 0/var(--tw-text-opacity))
    }

    .tw-text-gray-500 {

      --tw-text-opacity: 1;
      color: rgb(138 138 138/var(--tw-text-opacity))
    }

    .pdp {

      display: flex;
      flex-direction: column;
      font-family: Roboto, sans-serif
    }

    .pdp * {

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
    letter-spacing: 0.08em;
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

 
  
    .section-32__container {
      width: 100%;
      max-width: 1600px;
      margin: 0 auto;
      border: 5.5px solid #000;
      border-radius: 34.5px;
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
      color: #ffffff;
      position: absolute;
      max-width: 45%;
      width: 90%;
      line-height: 2rem;
      text-align: center;
      font-family: sans-serif
    }

    .section-32__grouptext-overlay.top {
      top: 3%;
      left: 50%;
      transform: translateX(-50%);
    }

    .section-32__grouptext-overlay.bottom {
      top: 75%;
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
      top: 25%;
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
      font-size: 1.2vw;
      margin: 0;
      line-height: 120%;
    }

    .grouptext-overlay-Background {
        background: rgba(0, 0, 0, 0.438);
        border-radius: 4.5vw;
        padding: 0.5rem;
        backdrop-filter: blur(0.5vw);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        -webkit-backdrop-filter: blur(0px);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255, 255, 255, 0.3);
        max-width: 70%;
        z-index: 100;
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
    color: rgb(255, 255, 255);
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

  /* Efeito de zebrado nas linhas */

  .table-tr-custom:nth-child(even) {

    background-color: #f1f1f1;
    }

    @media (max-width: 360px) {
        .section-32__grouptext-overlay h2 {
          font-size: 3vw;
        }

        .section-32__grouptext-overlay p {
          font-size: 2.8vw;
        }



        
    }

    @media (max-width: 470px) {  
      .video-header__subtitle {
        text-align: justify;
        font-size: clamp(0.9rem, 2vw, 1.5rem);
        font-weight: 550;
        
      }

      .section-32__grouptext-overlay h2 {
          font-size: 3vw;
        }

      .section-32__grouptext-overlay p {
          font-size: 2.4vw;
        }

      .section-32__grouptext-overlay.top {
          top: 3%;
        }

      .section-32__grouptext-overlay.bottom {
          top: 81%
        }

      .section-32__grouptext-overlay.right {
          top: 35%;
          left: 73%;
          transform: translate(-50%, -50%);
        }

        .section-32__grouptext-overlay.left {
          top: 50%;
          left: 27%;
          transform: translate(-50%, -50%);
        }

    }

    @media (max-width: 500px) {
        .section-32__grouptext-overlay h2 {
          font-size: 3vw;
        }

        .section-32__grouptext-overlay p {
          font-size: 2.3vw;
        }

        .section-32__grouptext-overlay.top {
          top: 3%;
        }

          .section-32__grouptext-overlay.bottom {
          top: 67%;
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

    @media (max-width: 768px) {
      .video-header {
        --banner-height: 180px;
      }

      .section-32__grouptext-overlay h2 {
          font-size: 2.5vw;
        }

      .section-32__grouptext-overlay p {
          font-size: 2vw;
        }

      .section-32__grouptext-overlay.top {
          top: 3%;
        }

      .section-32__grouptext-overlay.bottom {
          top: 76%;
        }
    }

    @media (max-width: 960px) {
        .section-32__grouptext-overlay h2 {
          font-size: 2.1vw;
        }

        .section-32__grouptext-overlay p {
          font-size: 1.5vw;
        }

        .section-32__grouptext-overlay.top {
          top: 3%;
        }

        .section-32__grouptext-overlay.bottom {
          top: 79%
        }
    }

    @media (max-width: 1060px) {
        .section-32__grouptext-overlay.top {
          top: 3%;
        }

        .section-32__grouptext-overlay.bottom {
          top: 81%;
        }
    }`,
  },
  
]);
