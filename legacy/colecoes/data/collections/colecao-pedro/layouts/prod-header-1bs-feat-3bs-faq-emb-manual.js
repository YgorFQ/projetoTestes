// @ts-nocheck
ColLib.registerCollectionLayout("colecao-pedro",
{
  id: "prod-header-1bs-feat-3bs-faq-emb-manual",
  name: "video-header-1bs-feat-3bs-faq-emb-manual",
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

.section-32__groupimage-section:has(#faq-section) {
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
  z-index: 100;
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
  border: 5px solid #000000;
  overflow: hidden;
  position: relative;
  background: #eee;
  box-shadow: 0 05px 10px #000000;
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
  box-shadow: 0 05px 10px #000000;
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
  box-shadow: 0 10px 15px #000000;
}

.feature-card:focus-visible {
  outline: 3px solid #000000;
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
  border-color: #000000;
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
  color: #e8ff5e;
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

  @media (min-width: 820px) {

    .section-4-manual__container,
    .section-4-manual__figura,
    .section-4-manual__imagem {
      height: 250px;
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
        poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/poster-philco-logo-na-frente-de-fundo-tecnologico-escuro-com-luz-azul.jpg"
        preload="none" autoplay muted loop playsinline width="1200" height="250" aria-hidden="true">
        <source src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/philco/header-philco.mov">
      </video>
      <div class="video-header__badge" role="img" aria-label="Logo da marca philco dentro de um círculo laranja">
        <img
          src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/philco/logo-philco.png"
          alt=""
          class="video-header__badge-img">
      </div>
    </header>

    <section class="video-header__body" aria-label="Título e descrição do produto">
      <small class="video-header__brand">philco</small>

      <h2 class="video-header__title" id="video-main-title">
        CERVEJEIRA 96L PCV09A 3 EM 1 PRETO
      </h2>
      <p class="video-header__subtitle">
        Bebidas sempre no ponto ideal: cervejeira Philco 96L 3 em 1, com função cervejeira, 
        frigobar e adega, design moderno e refrigeração eficiente para qualquer ocasião.
      </p>
    </section>
  </section>


      <section class="section-32__container" aria-label="Destaque visual do produto">
      <figure class="section-32__groupimage-section">
       <picture>
         <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-preta-cozinha-2224721-02.jpg?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-preta-cozinha-2224721-02.jpg?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-preta-cozinha-2224721-02.jpg?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-preta-cozinha-2224721-02.jpg?ims=1238x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-preta-cozinha-2224721-02.jpg?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-preta-cozinha-2224721-02.jpg">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-preta-cozinha-2224721-02.jpg"
        alt="Cervejeira Philco PCV09A 96L 3 em 1 preta em cozinha com bebidas internas" 
        style="border-radius: 30px;" width="1600" height="865"
        loading="eager" decoding="async" fetchpriority="high">
        </picture>
      <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background" style="top: 50%; left: 75%; max-width: 40%;">
        <h2><strong>O QUE ELA FAZ?</strong></h2>
        <p>A PCV09A funciona como cervejeira, adega e frigobar, adaptando o espaço interno para bebidas, alimentos e diferentes ocasiões.
        </p>
      </figcaption>
      </figure>
       </section>

       <section class="features-section" style="background-image: url(https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-fundo-branco-garrafas-verdes-2224721-bg.jpg);">
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
                        <h2>84 LATAS GELADAS?</h2>
                        <p> A capacidade comporta até 84 latas, 48 long necks ou 4 barris, com 96L brutos e 82L líquidos.</p>
                    </article>
                </label>
            </aside>

            <!-- Coluna Central: Imagens (Picture) e Card 2 -->
            <section class="image-display" aria-label="Imagem ilustrativa da funcionalidade selecionada">
                <div class="circle-frame" aria-live="polite" aria-label="Imagem da funcionalidade selecionada">
                    
                    <!-- IMAGEM 1 RESPONSIVA -->
                    <picture class="img1">
                        <source media="(max-width: 320px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-interior-bebidas-2224721-03.jpg?ims=492x">
                        <source media="(max-width: 375px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-interior-bebidas-2224721-03.jpg?ims=301x">
                        <source media="(min-width: 400px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-interior-bebidas-2224721-03.jpg?ims=318x">
                        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-interior-bebidas-2224721-03.jpg?ims=318x">
                        <source media="(max-width: 1280px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-interior-bebidas-2224721-03.jpg?ims=400x">
                        <source media="(min-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-interior-bebidas-2224721-03.jpg?ims=400x">
                        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-interior-bebidas-2224721-03.jpg" 
                        alt="Interior da Cervejeira Philco PCV09A 96L com latas e long necks organizadas">
                    </picture>

                    <!-- IMAGEM 2 RESPONSIVA -->
                    <picture class="img2">
                       <source media="(max-width: 320px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-display-digital-ventilacao-2224721-04.jpg?ims=492x">
                        <source media="(max-width: 375px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-display-digital-ventilacao-2224721-04.jpg?ims=301x">
                        <source media="(min-width: 400px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-display-digital-ventilacao-2224721-04.jpg?ims=318x">
                        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-display-digital-ventilacao-2224721-04.jpg?ims=318x">
                        <source media="(max-width: 1280px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-display-digital-ventilacao-2224721-04.jpg?ims=400x">
                        <source media="(min-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-display-digital-ventilacao-2224721-04.jpg?ims=400x">
                        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-display-digital-ventilacao-2224721-04.jpg" 
                        alt="Display digital da Cervejeira Philco PCV09A com temperatura -2 e ventilação interna">
                    </picture>

                    <!-- IMAGEM 3 RESPONSIVA -->
                    <picture class="img3">
                        <source media="(max-width: 320px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-preta-porta-vidro-2224721-05.jpg?ims=492x">
                        <source media="(max-width: 375px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-preta-porta-vidro-2224721-05.jpg?ims=301x">
                        <source media="(min-width: 400px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-preta-porta-vidro-2224721-05.jpg?ims=318x">
                        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-preta-porta-vidro-2224721-05.jpg?ims=318x">
                        <source media="(max-width: 1280px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-preta-porta-vidro-2224721-05.jpg?ims=400x">
                        <source media="(min-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-preta-porta-vidro-2224721-05.jpg?ims=400x">
                        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-preta-porta-vidro-2224721-05.jpg" 
                        alt="Cervejeira Philco PCV09A preta com porta de vidro e prateleiras internas">
                    </picture>

                </div>

                <label for="feat2" class="feature-card" role="radio" style="width: 90%;" aria-checked="false" tabindex="0">
                    <article>
                        <h2>GELA POR IGUAL?</h2>
                        <p>A ventilação interna distribui a temperatura pelo interior, enquanto o compressor entrega maior capacidade de refrigeração.</p>
                    </article>
                </label>
            </section>

            <!-- Coluna Direita -->
            <aside class="column" aria-label="Explicação da característica autobrocante do parafuso">
                <label for="feat3" class="feature-card" role="radio" aria-checked="false" tabindex="0">
                    <article>
                        <h2>VALE PARA CASA?</h2>
                        <p>Sim. A Philco PCV09A combina 96L, visual preto, porta de vidro e organização para bebidas em ambientes sociais.</p>
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
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-ambiente-bar-2224721-06.jpg?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-ambiente-bar-2224721-06.jpg?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-ambiente-bar-2224721-06.jpg?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-ambiente-bar-2224721-06.jpg?ims=1238x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-ambiente-bar-2224721-06.jpg?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-ambiente-bar-2224721-06.jpg">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-3-em-1-ambiente-bar-2224721-06.jpg"
        alt="Cervejeira Philco PCV09A 96L em ambiente de bar com parede de tijolos  " 
        style="border-radius: 30px 30px 0 0;" width="1600" height="865"
        loading="lazy" decoding="async" fetchpriority="low">
        </picture>
      <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background" style="top: 60%; left: 25%; max-width: 35%;">
        <h2><strong>VIDRO TRIPLO ANTISSUDAÇÃO</strong></h2>
        <p>Sim. A porta de vidro triplo permite visualizar o interior, enquanto o sistema antissudação ajuda a reduzir umidade.
        </p>
      </figcaption>
      </figure>

       <figure class="section-32__groupimage-section">
       <picture>

         <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-prateleiras-bebidas-ambiente-bar-2224721-07.jpg?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-prateleiras-bebidas-ambiente-bar-2224721-07.jpg?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-prateleiras-bebidas-ambiente-bar-2224721-07.jpg?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-prateleiras-bebidas-ambiente-bar-2224721-07.jpg?ims=1238x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-prateleiras-bebidas-ambiente-bar-2224721-07.jpg?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-prateleiras-bebidas-ambiente-bar-2224721-07.jpg">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-prateleiras-bebidas-ambiente-bar-2224721-07.jpg"
        alt="Cervejeira Philco PCV09A com garrafas e latas em prateleiras iluminadas" 
        style="border-radius: 0;" width="1600" height="865"
        loading="lazy" decoding="async" fetchpriority="low">
        </picture>
      <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background" style="top: 55%; left: 40%; max-width: 33%;">
        <h2><strong>PCV09A 110V OU 220V</strong></h2>
        <p>A PCV09A tem versões 110V e 220V. Escolha a voltagem compatível com a tomada do local de instalação.
        </p>
      </figcaption>
      </figure>
      
      <figure class="section-32__groupimage-section">
      <picture>
        <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-fundo-escuro-piso-ambiente-2224721-08.jpg?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-fundo-escuro-piso-ambiente-2224721-08.jpg?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-fundo-escuro-piso-ambiente-2224721-08.jpg?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-fundo-escuro-piso-ambiente-2224721-08.jpg?ims=1280x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-fundo-escuro-piso-ambiente-2224721-08.jpg?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-fundo-escuro-piso-ambiente-2224721-08.jpg">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-philco-pcv09a-96l-fundo-escuro-piso-ambiente-2224721-08.jpg"
        alt="Fundo escuro Philco PCV09A com piso e ambiente de bar em baixa luz" 
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
            <h3 id="faq-section__q-text">1. Para que serve a Cervejeira Philco 96L 3 em 1 PCV09A Preto?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
            A Cervejeira Philco 96L 3 em 1 PCV09A Preto serve como cervejeira, frigobar e adega em um só produto.
            Ela é indicada para armazenar latas, long necks, barris, bebidas e alimentos, conforme a necessidade de uso.
            Essa versatilidade facilita a organização em diferentes ocasiões e ambientes.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details>
          <summary>
            <h3 id="faq-section__q-text">2. A Cervejeira Philco PCV09A tem bom desempenho de refrigeração?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
           Sim. A Cervejeira Philco 96L 3 em 1 PCV09A Preto conta com sistema de refrigeração por compressor.
            A ventilação interna distribui a temperatura de forma uniforme, e o display digital permite controle preciso sem abrir a porta.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details> 
          <summary>
            <h3 id="faq-section__q-text">3. A Cervejeira Philco PCV09A é adequada para evitar umidade na porta?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
            Sim. A Cervejeira Philco 96L 3 em 1 PCV09A Preto possui porta de vidro triplo com sistema antissudação.
            A ficha também informa resistência na porta, recurso que evita o acúmulo de umidade na parte interna.
            Isso favorece a estabilidade térmica e mantém a visualização do conteúdo mais prática.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details>
          <summary>
            <h3 id="faq-section__q-text">4. Como usar melhor a Cervejeira Philco PCV09A no dia a dia?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
              A Cervejeira Philco 96L 3 em 1 PCV09A Preto permite ajustar a temperatura pelo display digital sem abrir a porta.
              A capacidade comporta até 84 latas, 48 long necks ou 4 barris, conforme as informações do fornecedor presentes na ficha.
              Com a organização interna e a iluminação em LED, o acesso às bebidas fica mais simples e funcional.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details>
          <summary>
            <h3 id="faq-section__q-text">5. Quais são as características técnicas da Cervejeira Philco PCV09A?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
              A Cervejeira Philco 96L 3 em 1 PCV09A Preto tem capacidade bruta de 96L e capacidade líquida de 82L.
              Ela aparece nas versões 110V, com EAN 7891356129827, e 220V, com EAN 7899963921469.
              Também possui iluminação interna em LED, degelo automático, pés frontais niveladores e cordão de 1800 mm.
            </p>
          </div>
        </details>
      </li>
    </ul>
      </section>
    </figure>
    </section>

  <footer aria-label="Informações complementares">
           <p class="p__end">
          <strong>Imagens Meramente Ilustrativas</strong>
          </p>

          <section class="section-4-manual__container" aria-label="Manual de Instruções da cervejeira">
  <figure class="section-4-manual__figura" >
    <a href="https://static1.efacil.com.br/wcsstore/AuroraStorefrontAssetStore/PDP/philco/2224721-manual.pdf"
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
        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/manual-verde-philco-preto.jpg"
        class="section-4-manual__imagem" width="1200" height="250" loading="lazy" decoding="async" fetchpriority="low"  alt=""/>
        
    </picture>
    </a>
  </figure>
</section>
        </footer>
    </article>

        </div>
`,
  css: ``
}
);
