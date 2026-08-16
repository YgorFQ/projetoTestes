// @ts-nocheck
ColLib.registerCollectionLayout("colecao-pedro",
{
  id: "comp-3-blocos-product-header-faq-embutido-e-tabela",
  name: "video-header-1bs-feat-3bs-faq-emb-tab",
  html: `    <div class="lp-container">
<style>
* {
  margin: 0;
  padding: 0;
}

video-header,
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

.section-32__container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  border: 5.5px solid #000;
  border-radius: 36px;
}

.section-32__groupimage-section {
  position: relative;
  z-index: 1;
  width: 100%;
  margin: 0;
  contain: layout style;
}

.section-32__groupimage-section:has(.faq-section) {
  z-index: 0;
}

.section-32__grouptext-overlay {
  z-index: 20;
}

.grouptext-overlay-Background {
  z-index: 20;
}

.section-32__groupimage-section img {
  width: 100%;
  height: auto;
  display: inline-block;
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
  z-index: 30;
}

.features-section {
  max-width: 1200px;
  margin: 40px auto;
  background: white;
  border-radius: 40px;
  padding: 60px 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  font-family: sans-serif;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 30px;
  align-items: center;
}

.column,
.image-display {
  display: flex;
  flex-direction: column;
}

.column {
  gap: 30px;
}

.image-display {
  align-items: center;
  gap: 40px;
}

.circle-frame {
  width: 100%;
  max-width: 400px;
  aspect-ratio: 780 / 740;
  border-radius: 50%;
  border: 5px solid #1d2637;
  overflow: hidden;
  position: relative;
  background: #eee;
  box-shadow: 0 05px 10px #090d14;
}

.circle-frame picture {
  position: absolute;
  inset: 0;
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

.feature-card {
  display: block;
  background: white;
  padding: 25px;
  border-radius: 20px;
  border: 2px solid #eee;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  box-shadow: 0 05px 10px #090d14;
}

.feature-card h2 {
  margin: 0 0 10px;
  font-size: 1.2rem;
  color: #1d2637;
  font-weight: 550;
  line-height: 2.2vh;
}

.feature-card p {
  margin: 0;
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
}

.feature-card:hover,
.feature-card:focus-visible {
  background-color: #f9fbff;
  transform: translateY(-8px);
  box-shadow: 0 10px 15px #090d14;
}

.feature-card:focus-visible {
  outline: 3px solid #1d2637;
  outline-offset: 5px;
}

#feat1:checked ~ .grid-container .img1,
#feat2:checked ~ .grid-container .img2,
#feat3:checked ~ .grid-container .img3 {
  opacity: 1;
  z-index: 2;
}

#feat1:checked ~ .grid-container label[for="feat1"],
#feat2:checked ~ .grid-container label[for="feat2"],
#feat3:checked ~ .grid-container label[for="feat3"] {
  border-color: #1d2637;
  background-color: #f9fbff;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* inicio-area-de-faq */

#faq-section {
  width: 100%;
  padding: 0 16px 2rem;
  box-sizing: border-box;
  margin: 0 auto 25px;
  font-family: sans-serif;
  position: absolute;
  top: 20%;
  left: 5%;
  right: 5%;
  background: rgba(255, 255, 255, 0.014);
  border-radius: 40px;
  max-width: 75%;
  z-index: 10;
  border: 1px solid #fff;
  max-height: 55vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

#faq-section__header {
  text-align: center;
  margin-bottom: 2rem;
}

#faq-section__title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: bold;
  color: #fff;
  margin: 0;
  line-height: 6vw;
}

#faq-section__subtitle {
  font-size: 1rem;
  color: #fff;
  margin: 0;
}

#faq-section__list {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: 56rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
}

#faq-section__item {
  background: #ffffff05;
  border: 1px solid #fff;
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
  background: #f9f9f92f;
}

#faq-section__q-text {
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  flex: 1;
}

#faq-section__q-text:hover {
  color: #ffb81c;
}

#faq-section__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  position: relative;
}

#faq-section__icon::before,
#faq-section__icon::after {
  content: "";
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

#faq-section__item details[open] #faq-section__icon::after {
  transform: rotate(90deg);
  opacity: 0;
}

#faq-section__a-inner {
  padding: 14px 20px 16px;
  border-top: 1px solid #e5e5e5;
}

#faq-section__a-text {
  font-size: 0.9rem;
  color: #fff;
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
}

#faq-section::-webkit-scrollbar {
  width: 8px;
}

#faq-section::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

#faq-section::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

#faq-section::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

@media (prefers-contrast: more) {
    #faq-section__a-text {
    font-size: 1rem;
    font-weight: bold;
    color: #000;
  }
}

@media (max-width: 1060px) {
    #faq-section {
    top: 10%;
    max-width: 90%;
    max-height: 80%;
  }
}

@media (max-width: 768px) {
    #faq-section__header {
    margin-bottom: 1rem;
  }

  #faq-section__a-text {
    font-size: 0.7rem !important;
  }

  #faq-section__title {
    font-size: 1rem !important;
  }

  #faq-section__subtitle,
  #faq-section__q-text {
    font-size: 0.75rem !important;
  }
}

@media (max-width: 470px) {
    #faq-section {
    max-height: 180px !important;
    padding: 0.5rem 8px !important;
    top: 5% !important;
    max-width: 90%;
    border-radius: 20px;
  }
  }

  /* final-area-de-faq */


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


  td a {
    color: #000;
    font-weight: 600;
    text-decoration: none;

  }

  td a:hover {
     color: #e74011;
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

@media (prefers-contrast: more) {
   .p__end,
  .video-header__subtitle {
    color: #000;
  }

  .grouptext-overlay-Background {
    background: #000;
  }

  .video-header__brand {
    color: #3a2301;
  }

        .table-td-custom-sub
      {
        color: #000;
        font-weight: 550;
      }

      .table-td-custom-title
      {
        color: #000;
        font-weight: 700;
      } 
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

  .video-header {
    --banner-height: 180px;
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

@media (max-width: 500px) {
  .section-32__grouptext-overlay h2 {
    font-size: 3vw;
  }

  .section-32__grouptext-overlay p {
    font-size: 2.3vw;
  }

  .section-32__grouptext-overlay {
    max-width: 50%;
  }
}

@media (max-width: 470px) {
  .video-header__subtitle {
    text-align: justify;
    font-size: clamp(0.9rem, 2vw, 1.5rem);
    font-weight: 550;
  }

  .section-32__grouptext-overlay p {
    font-size: 2.4vw;
  }

}

@media (max-width: 375px) {
  .section-32__grouptext-overlay p {
    font-size: 2.8vw;
  }
}
</style>
  <article style="width: 100%;" aria-labelledby="video-main-title">
  <section class="video-header" aria-label="Cabeçalho do produto">
    <header class="video-header__banner">
      <video class="video-header__banner-video"
        poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/poster-precon-p-alaranjado-ao-fundo-azul-grafitado.jpg"
        preload="none" autoplay muted loop playsinline width="1200" height="250" aria-hidden="true">
        <source src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/precon/header-precon.mov">
      </video>
      <div class="video-header__badge" role="img" aria-label="Logo da marca precon dentro de um círculo laranja">
        <img
          src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/precon/logo-precon.png"
          alt=""
          class="video-header__badge-img">
      </div>
    </header>

    <section class="video-header__body" aria-label="Título e descrição do produto">
      <small class="video-header__brand">precon</small>

      <h2 class="video-header__title" id="video-main-title">
        CONJUNTOS DE PARAFUSO AUTOBROCANTES CERAMICO/BRANCO/CONCRETO/MARFIM
      </h2>

      <p class="video-header__subtitle">
        Perfuram e fixam em uma única etapa, dispensando pré-furo. Ideais para agilizar sua obra ou reparo com total segurança e firmeza nas aplicações.
      </p>
    </section>
  </section>


      <section class="section-32__container" aria-label="Destaque visual do produto">
      <figure class="section-32__groupimage-section">
       <picture>
         <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-10-unidades-410376-02.jpg?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-10-unidades-410376-02.jpg?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-10-unidades-410376-02.jpg?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-10-unidades-410376-02.jpg?ims=1238x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-10-unidades-410376-02.jpg?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-10-unidades-410376-02.jpg">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-10-unidades-410376-02.jpg"
        alt="Kit de fixação para telha Precon Tubozan com parafusos autobrocantes em embalagem" 
        style="border-radius: 30px;" width="1600" height="865"
        loading="eager" decoding="async" fetchpriority="high">
        </picture>
      <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background" style="top: 50%; left: 25%; max-width: 40%;">
        <h2><strong>FIXAÇÃO PRECON PARA TELHA</strong></h2>
        <p>O kit Precon Tubozan é de fixação para telha, com 10 parafusos metálicos autobrocantes e tampa de acabamento.
        </p>
      </figcaption>
      </figure>
       </section>

       <section class="features-section" style="background-image: url(https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-fundo-branco-laranja-410376-bg.jpg);">
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
            <aside class="column" aria-label="Fala sobre medidas diversas disponíveis para o produto">
                <label for="feat1" class="feature-card" role="radio" aria-checked="true" tabindex="0">
                    <article>
                        <h2>QUAL MEDIDA ESCOLHER?</h2>
                        <p>A linha oferece 2.1/2 em cerâmico, concreto e marfim, além do 3.1/2 branco para quem 
                          busca uma opção diferente na fixação de telhas.</p>
                    </article>
                </label>
            </aside>

            <!-- Coluna Central: Imagens (Picture) e Card 2 -->
            <section class="image-display" aria-label="Imagem ilustrativa da funcionalidade selecionada">
                <div class="circle-frame" aria-live="polite" aria-label="Imagem da funcionalidade selecionada">
                    
                    <!-- IMAGEM 1 RESPONSIVA -->
                    <picture class="img1">
                        <source media="(max-width: 320px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafuso-autobrocante-telha-ondulada-410376-03.jpg?ims=492x">
                        <source media="(max-width: 375px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafuso-autobrocante-telha-ondulada-410376-03.jpg?ims=301x">
                        <source media="(min-width: 400px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafuso-autobrocante-telha-ondulada-410376-03.jpg?ims=318x">
                        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafuso-autobrocante-telha-ondulada-410376-03.jpg?ims=318x">
                        <source media="(max-width: 1280px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafuso-autobrocante-telha-ondulada-410376-03.jpg?ims=400x">
                        <source media="(min-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafuso-autobrocante-telha-ondulada-410376-03.jpg?ims=400x">
                        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafuso-autobrocante-telha-ondulada-410376-03.jpg" 
                        alt="Parafuso autobrocante Precon Tubozan fixado em telha ondulada com tampa cerâmica">
                    </picture>

                    <!-- IMAGEM 2 RESPONSIVA -->
                    <picture class="img2">
                       <source media="(max-width: 320px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampa-acabamento-ceramico-410376-04.jpg?ims=492x">
                        <source media="(max-width: 375px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampa-acabamento-ceramico-410376-04.jpg?ims=301x">
                        <source media="(min-width: 400px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampa-acabamento-ceramico-410376-04.jpg?ims=318x">
                        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampa-acabamento-ceramico-410376-04.jpg?ims=318x">
                        <source media="(max-width: 1280px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampa-acabamento-ceramico-410376-04.jpg?ims=400x">
                        <source media="(min-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampa-acabamento-ceramico-410376-04.jpg?ims=400x">
                        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampa-acabamento-ceramico-410376-04.jpg" 
                        alt="Tampa cerâmica Precon Tubozan sobre telha laranja texturizada em close">
                    </picture>

                    <!-- IMAGEM 3 RESPONSIVA -->
                    <picture class="img3">
                        <source media="(max-width: 320px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampa-ceramica-telhado-laranja-410376-05.jpg?ims=492x">
                        <source media="(max-width: 375px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampa-ceramica-telhado-laranja-410376-05.jpg?ims=301x">
                        <source media="(min-width: 400px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampa-ceramica-telhado-laranja-410376-05.jpg?ims=318x">
                        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampa-ceramica-telhado-laranja-410376-05.jpg?ims=318x">
                        <source media="(max-width: 1280px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampa-ceramica-telhado-laranja-410376-05.jpg?ims=400x">
                        <source media="(min-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampa-ceramica-telhado-laranja-410376-05.jpg?ims=400x">
                        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampa-ceramica-telhado-laranja-410376-05.jpg" 
                        alt="Fixador Precon Tubozan cerâmico instalado em telhado laranja, vista externa">
                    </picture>

                </div>

                <label for="feat2" class="feature-card" role="radio" style="width: 90%;" aria-checked="false" tabindex="0">
                    <article>
                        <h2>TAMPA DE ACABAMENTO</h2>
                        <p>A tampa de acabamento acompanha o kit e dá um toque final mais limpo à fixação, sem deixar o parafuso visualmente cru.</p>
                    </article>
                </label>
            </section>

            <!-- Coluna Direita -->
            <aside class="column" aria-label="Explicação da característica autobrocante do parafuso">
                <label for="feat3" class="feature-card" role="radio" aria-checked="false" tabindex="0">
                    <article>
                        <h2>ELE É AUTOBROCANTE?</h2>
                        <p>Sim. O parafuso metálico autobrocante Precon Tubozan entrega fixação para telha com instalação 
                          mais prática e acabamento mais completo no mesmo kit.</p>
                    </article>
                </label>
            </aside>
        </div>
    </div>
</section>


        <section class="section-32__container" aria-label="Galeria de características">
        <figure class="section-32__groupimage-section">
       <picture>

         <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-cores-410376-06.jpg?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-cores-410376-06.jpg?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-cores-410376-06.jpg?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-cores-410376-06.jpg?ims=1238x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-cores-410376-06.jpg?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-cores-410376-06.jpg">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-parafusos-autobrocantes-cores-410376-06.jpg"
        alt="Parafusos autobrocantes Precon Tubozan com tampas cerâmica, branca e concreto" 
        style="border-radius: 30px 30px 0 0;" width="1600" height="865"
        loading="lazy" decoding="async" fetchpriority="low">
        </picture>
      <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background" style="top: 50%; left: 72%; max-width: 35%;">
        <h2><strong>KIT PRECON COM 10</strong></h2>
        <p>Cada embalagem traz 10 unidades, uma quantidade prática para comprar, separar e aplicar os parafusos autobrocantes Precon Tubozan na obra.
        </p>
      </figcaption>
      </figure>

       <figure class="section-32__groupimage-section">
       <picture>

         <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampas-branco-marfim-concreto-410376-07.jpg?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampas-branco-marfim-concreto-410376-07.jpg?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampas-branco-marfim-concreto-410376-07.jpg?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampas-branco-marfim-concreto-410376-07.jpg?ims=1238x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampas-branco-marfim-concreto-410376-07.jpg?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampas-branco-marfim-concreto-410376-07.jpg">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-tampas-branco-marfim-concreto-410376-07.jpg"
        alt="Parafusos Precon Tubozan com tampas branco e marfim sobre fundo de instalação" 
        style="border-radius: 0;" width="1600" height="865"
        loading="lazy" decoding="async" fetchpriority="low">
        </picture>
      <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background" style="top: 75%; left: 50%; max-width: 40%;">
        <h2><strong>CORES PRECON TUBOZAN</strong></h2>
        <p>A linha Precon Tubozan oferece kits nas cores cerâmico, branco, concreto e marfim, permitindo combinar a fixação da telha 
          com o acabamento visual do projeto.
        </p>
      </figcaption>
      </figure>
      
      <figure class="section-32__groupimage-section">
      <picture>
        <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-fundo-instalacao-obra-410376-08.jpg?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-fundo-instalacao-obra-410376-08.jpg?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-fundo-instalacao-obra-410376-08.jpg?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-fundo-instalacao-obra-410376-08.jpg?ims=1280x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-fundo-instalacao-obra-410376-08.jpg?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-fundo-instalacao-obra-410376-08.jpg">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/kit-fixacao-telha-precon-tubozan-fundo-instalacao-obra-410376-08.jpg"
        alt="Cenário obra Precon Tubozan com furadeira e superfície de fixação ao fundo" 
        style="border-radius: 0px 0px 30px 30px;" width="1600" height="865"
        loading="lazy" decoding="async" fetchpriority="low">
        </picture>
        
  <!-- Camada com gradiente de fade -->

   <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
              background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.550) 37%, rgba(0, 0, 0, 0.897) 100%); 
              z-index: 5; border-radius: 0px 0px 30px 30px; pointer-events: none;" aria-hidden="true"></div>

              <!-- FAQ -->

       <section id="faq-section" aria-labelledby="faq-section-title">
           
    <div id="faq-section__header">
      <h2 id="faq-section__title" id="faq-section-title">Dúvidas Frequentes</h2>
    </div>
    <ul id="faq-section__list" style="overflow: hidden;" role="list">
      <li id="faq-section__item">
        <details>
          <summary>
            <h3 id="faq-section__q-text">1. Para que serve o Conjunto Parafuso Precon Tubozan Autobrocante para Telha 10 unidades?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
            Serve como kit de fixação para telha. A ficha informa que o produto pertence à linha Parafusos Autobrocantes 
            e conta com parafuso metálico autobrocante. É indicado para quem precisa de uma solução de fixação com 
            instalação facilitada e acabamento no conjunto.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details>
          <summary>
            <h3 id="faq-section__q-text">2. O kit Precon Tubozan tem boa praticidade na instalação?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
           apresenta fácil instalação conforme a ficha técnica. O produto reúne parafusos autobrocantes e tampa de acabamento 
           ou tampa protetora, conforme a variação informada. Essa composição favorece uma aplicação mais prática e com acabamento mais organizado.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details> 
          <summary>
            <h3 id="faq-section__q-text">3. Como usar o kit para obter melhor acabamento?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
            Deve ser usado conforme sua finalidade de kit de fixação para telha. A ficha destaca fácil instalação e, em algumas variações, 
            informa melhor acabamento e tampa de acabamento ou protetora.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details>
          <summary>
            <h3 id="faq-section__q-text">4. De que material é feito o parafuso do kit?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
              Possui parafuso metálico autobrocante. A ficha também informa a presença de tampa de acabamento 
              ou tampa protetora, dependendo da variação. Esse conjunto entrega fixação com acabamento associado ao uso em telhas.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details>
          <summary>
            <h3 id="faq-section__q-text">5. Quais são as medidas e cores disponíveis desse conjunto?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
              Aparece nas medidas 2.1/2 e 3.1/2 sendo as cores Cerâmico, Branco, Concreto e Marfim.
              Essa variação permite selecionar a opção conforme medida e acabamento descritos para cada item.
            </p>
          </div>
        </details>
      </li>
    </ul>
      </section>
    </figure>
    </section>

  <footer aria-label="Informações complementares e produtos relacionados">
           <p class="p__end">
          <strong>Imagens Meramente Ilustrativas</strong>
          </p>
           <section class="table-container-custom" aria-label="tabela contendo produtos relacionados e citados dentre deste conteúdo">
          <table class="table-design-custom" aria-describedby="table-desc">
            <caption id="table-desc" class="sr-only" style="text-align:left; padding: 0 0 8px; font-weight:600;">
          Modelos de Conjuntos de Parafusos disponíveis
          </caption>
            <thead class="table-head-custom">
               <tr class="table-tr-custom">
                 <th class="table-text-custom table-th-custom" style="background-color: #1d2637; border-radius: 10px 0 0 0;" scope="col">SKU
                 </th>
                 <!--Replicar para adicionar mais COLUNAS-->
                 <th class="table-text-custom table-th-custom" style="background-color: #1d2637; border-radius: 0 10px 0 0;" scope="col">TÍTULO
                 </th>
               </tr>
             </thead>
             <tbody>
               <tr class="table-tr-custom">
                 <td class="table-text-custom table-td-custom-title">410376</td>
            <td class="table-text-custom table-td-custom-sub">CONJUNTO PARAFUSO PRECON AUTOBRACANTES 3.1/2 CERAMICO 10X1</td>
           </tr>
         <tr class="table-tr-custom">
           <td class="table-text-custom table-td-custom-title">410377</td>
        <td class="table-text-custom table-td-custom-sub">CONJUNTO PARAFUSO PRECON AUTOBRACANTES 2.1/2 CERAMICO 10X1</td>
        </tr>
          <tr class="table-tr-custom">
           <td class="table-text-custom table-td-custom-title">410378</td>
        <td class="table-text-custom table-td-custom-sub">CONJUNTO PARAFUSO PRECON AUTOBRACANTES 3.1/2 BRANCO 10X1</td>
      </tr>
      <tr class="table-tr-custom">
        <td class="table-text-custom table-td-custom-title">410379</td>
        <td class="table-text-custom table-td-custom-sub">CONJUNTO PARAFUSO PRECON AUTOBRACANTES 3.1/2 CONCRETO 10X1</td>
         </tr>
        <tr class="table-tr-custom">
        <td class="table-text-custom table-td-custom-title">410381</td>
        <td class="table-text-custom table-td-custom-sub">CONJUNTO PARAFUSO PRECON AUTOBRACANTES 2.1/2 CONCRETO 10X</td>
          </tr>
         <tr class="table-tr-custom">
           <td class="table-text-custom table-td-custom-title">410382</td>
        <td class="table-text-custom table-td-custom-sub">CONJUNTO PARAFUSO PRECON AUTOBRACANTES 3.1/2 MARFIM 10X1</td>
        </tr>
          <tr class="table-tr-custom">
           <td class="table-text-custom table-td-custom-title">410383</td>
        <td class="table-text-custom table-td-custom-sub">CONJUNTO PARAFUSO PRECON AUTOBRACANTES 2.1/2 MARFIM 10X1</td>
      </tr>
             </tbody>
           </table>
         </section>
        </footer>

        </article>

        </div>
`,
  css: ``
}
);
