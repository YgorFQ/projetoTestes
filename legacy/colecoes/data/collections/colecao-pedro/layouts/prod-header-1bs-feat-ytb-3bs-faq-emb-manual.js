// @ts-nocheck
ColLib.registerCollectionLayout("colecao-pedro",
{
  id: "prod-header-1bs-feat-ytb-3bs-faq-emb-manual",
  name: "prod-header-1bs-feat-ytb-3bs-faq-emb-manual",
  html: `<div class="lp-container">
<style>
* {
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
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.product-header__title {
  color: #000;
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

.youtube-video-container {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.youtube-video {
  width: 100%;
  height: 100%;
  border-radius: 30px 30px 0 0;
}

.p__end {
  color: #8a8a8a;
  font-family: sans-serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  text-wrap: pretty;
  text-align: center;
  padding: 40px 0;
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
  color: #ffe600;
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

.column {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

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
  border: 5px solid #0053a2;
  overflow: hidden;
  position: relative;
  background: rgb(255, 253, 253)230;
  box-shadow: 0 5px 10px #001222
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
  box-shadow: 0 5px 10px #001222
}

.feature-card h2 {
  margin: 0 0 10px;
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

.feature-card:hover {
  background-color: #fffcfd;
  transform: translateY(-8px);
  box-shadow: 0 10px 15px  #001222
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
  border-color: #0053a2;
  background-color: #ffffff;
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
  .product-header__subtitle {
    color: #000;
  }

  .grouptext-overlay-Background {
    background: #000;
  }

  .product-header__brand {
    color: #3a2301;
  }

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

 @media (min-width: 820px) {

    .section-4-manual__container,
    .section-4-manual__figura,
    .section-4-manual__imagem {
      height: 250px;
    }
  }

@media (max-width: 768px) {
  .section-32__grouptext-overlay h2 {
    font-size: 2.5vw;
  }

  .section-32__grouptext-overlay p {
    font-size: 2vw;
  }

  .product-header {
    --banner-height: 180px;
  }

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

@media (max-width: 500px) {
  .section-32__grouptext-overlay h2 {
    font-size: 3vw;
  }

  .section-32__grouptext-overlay p {
    font-size: 2.3vw;
  }
}

@media (max-width: 470px) {
  .product-header__subtitle {
    text-align: justify;
    font-size: clamp(0.9rem, 2vw, 1.5rem);
    font-weight: 550;
  }

  .section-32__grouptext-overlay p {
    font-size: 2.4vw;
  }

  .section-32__grouptext-overlay.left {
    top: 50%;
    left: 27%;
    transform: translate(-50%, -50%);
  }

  #faq-section {
    max-height: 180px !important;
    padding: 0.5rem 8px !important;
    top: 5% !important;
    max-width: 90%;
    border-radius: 20px;
  }
}

@media (max-width: 375px) {
  .section-32__grouptext-overlay p {
    font-size: 2.8vw;
  }
}
</style>
   <article style="width: 100%;" aria-labelledby="product-main-title">
    <section class="product-header" aria-label="Cabeçalho do produto">
  <header class="product-header__banner">
    <picture style="width:100%; height:100%; margin:0;">
             <source media="(max-width: 430px)"
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-garrafas-fundo-2219906-01.webp?ims=430x">
      
              <source media="(max-width: 768px)"
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-garrafas-fundo-2219906-01.webp?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-garrafas-fundo-2219906-01.webp?ims=1024x">
      
              <source media="(max-width: 1200px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-garrafas-fundo-2219906-01.webp?ims=1200x">
      <img
        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-garrafas-fundo-2219906-01.webp"
        alt="Garrafas de cerveja Metalfrio Beer Maxx VN25TP em faixa horizontal" 
        class="product-header__banner-img" loading="eager">
    </picture>
    <div class="product-header__badge" role="img" aria-label="Logo da marca metalfrio dentro de um círculo laranja">
      <img
        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/logo-metalfrio.webp"
        alt="" 
        class="product-header__badge-img">
    </div>
  </header>
  <section class="product-header__body" aria-label="Título e descrição do produto">
    <small class="product-header__brand">metalfrio</small>
    <h2 class="product-header__title" id="product-main-title">
     REFRIGERADOR CERVEJEIRA METALFRIO 264L VN25TP BEER MAXX INOX
    </h2>
    <p class="product-header__subtitle">
    Cervejas sempre geladas e prontas para servir: cervejeira Metalfrio 264L Beer Maxx em inox, com amplo espaço interno, 
    visual profissional e alta performance de refrigeração.
    </p>
  </section>
</section>


      <section class="section-32__container" aria-label="Destaque visual do produto">
      <figure class="section-32__groupimage-section">
       <picture>

         <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-inox-sala-futebol-2219906-02.webp?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-inox-sala-futebol-2219906-02.webp?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-inox-sala-futebol-2219906-02.webp?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-inox-sala-futebol-2219906-02.webp?ims=1238x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-inox-sala-futebol-2219906-02.webp?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-inox-sala-futebol-2219906-02.webp">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-inox-sala-futebol-2219906-02.webp"
        alt="Cervejeira Metalfrio Beer Maxx VN25TP 228L em sala com família assistindo futebol" 
        style="border-radius: 30px;" width="1600" height="865"
        loading="eager" decoding="async" fetchpriority="high">
        </picture>
      <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background" style="top: 75%; left: 25%; max-width: 35%;">
        <h2><strong>COPA SEM FILA</strong></h2>
        <p> Com 228L, fluxo de ar contínuo, LED interno e prateleiras reguláveis, a VN25TP ajuda a manter bebidas visíveis, organizadas e geladas. Assim você
          nunca vai ficar na mão em dia de jogo!
        </p>
      </figcaption>
      </figure>
       </section>

       <section class="features-section" 
       style="background-image: url('https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-fundo-branco-garrafas-coloridas-2219906-bg.webp');">


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
                        <h2>TECNOLOGIA SUBZERO</h2>
                        <p>Com a mesma tecnologia usada nas cervejeiras das melhores marcas e bares, a Beer Maxx leva em consideração as 
                          necessidades de resfriamento de diferentes tipos de embalagens e cerveja, baixando a temperatura ao limite do congelamento.</p>
                    </article>
                </label>
            </aside>

            <!-- Coluna Central: Imagens (Picture) e Card 2 -->
            <section class="image-display" aria-label="Imagem ilustrativa da funcionalidade selecionada">
                <div class="circle-frame" aria-live="polite" aria-label="Imagem da funcionalidade selecionada">
                    
                    <!-- IMAGEM 1 RESPONSIVA -->
                    <picture class="img1">
                        <source media="(max-width: 320px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-subzero-2219906-03.webp?ims=492x">
                        <source media="(max-width: 375px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-subzero-2219906-03.webp?ims=301x">
                        <source media="(min-width: 400px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-subzero-2219906-03.webp?ims=318x">
                        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-subzero-2219906-03.webp?ims=318x">
                        <source media="(max-width: 1280px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-subzero-2219906-03.webp?ims=400x">
                        <source media="(min-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-subzero-2219906-03.webp?ims=400x">
                        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-subzero-2219906-03.webp" 
                        alt="Cervejeira Metalfrio Beer Maxx VN25TP com refrigeração subzero e cristais de gelo" loading="lazy" decoding="async" fetchpriority="low">
                    </picture>

                    <!-- IMAGEM 2 RESPONSIVA -->
                    <picture class="img2">
                       <source media="(max-width: 320px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-display-digital-2219906-04.webp?ims=492x">
                        <source media="(max-width: 375px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-display-digital-2219906-04.webp?ims=301x">
                        <source media="(min-width: 400px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-display-digital-2219906-04.webp?ims=318x">
                        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-display-digital-2219906-04.webp?ims=318x">
                        <source media="(max-width: 1280px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-display-digital-2219906-04.webp?ims=400x">
                        <source media="(min-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-display-digital-2219906-04.webp?ims=400x">
                        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-display-digital-2219906-04.webp" 
                        alt="Display digital Metalfrio Beer Maxx VN25TP marcando -6 °C com Eco Mode" loading="lazy" decoding="async" fetchpriority="low">
                    </picture>

                    <!-- IMAGEM 3 RESPONSIVA -->
                    <picture class="img3">
                        <source media="(max-width: 320px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-porta-vidro-display-2219906-05.webp?ims=492x">
                        <source media="(max-width: 375px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-porta-vidro-display-2219906-05.webp?ims=301x">
                        <source media="(min-width: 400px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-porta-vidro-display-2219906-05.webp?ims=318x">
                        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-porta-vidro-display-2219906-05.webp?ims=318x">
                        <source media="(max-width: 1280px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-porta-vidro-display-2219906-05.webp?ims=400x">
                        <source media="(min-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-porta-vidro-display-2219906-05.webp?ims=400x">
                        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-porta-vidro-display-2219906-05.webp" 
                        alt="Cervejeira Metalfrio Beer Maxx VN25TP inox com porta de vidro e garrafas geladas" loading="lazy" decoding="async" fetchpriority="low">
                    </picture>

                </div>

                <label for="feat2" class="feature-card" role="radio" style="width: 90%;" aria-checked="false" tabindex="0">
                    <article>
                        <h2>DISPLAY INTERATIVO</h2>
                        <p>O novo controlador eletrônico com display touch da Beer Maxx dá a você total autonomia para definir, 
                          de acordo com sua preferência, a temperatura ideal da sua cerveja!</p>
                    </article>
                </label>
            </section>

            <!-- Coluna Direita -->
            <aside class="column" aria-label="Explica praticidade na hora da instalação">
                <label for="feat3" class="feature-card" role="radio" aria-checked="false" tabindex="0">
                    <article>
                        <h2>DESIGN SOFISTICADO</h2>
                        <p>Porta em cor inox, display touch e puxador ergonômico para melhor encaixe das mãos garantem máxima 
                          funcionalidade e elegância para sua casa e área de lazer.</p>
                    </article>
                </label>
            </aside>
        </div>
    </div>
</section>


        <section class="section-32__container" aria-label="Galeria de características">
        <figure class="section-32__groupimage-section" aria-label="Vídeo demonstrativo do produto">
       <div class="youtube-video-container" style="border-radius: 30px 30px 0px 0px;">
          <iframe class="youtube-video" width="1600" height="865"
            src="https://www.youtube.com/embed/D4AD3hS3u5Q?si=147A8aKvxB4M7HKT"
            title="Vídeo demonstrativo da Esmerilhadeira Angular Black & Decker G720XBR" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>
      </figure>

       <figure class="section-32__groupimage-section">
      <picture>
             <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-aberta-bar-garrafas-2219906-06.webp?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-aberta-bar-garrafas-2219906-06.webp?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-aberta-bar-garrafas-2219906-06.webp?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-aberta-bar-garrafas-2219906-06.webp?ims=1280x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-aberta-bar-garrafas-2219906-06.webp?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-aberta-bar-garrafas-2219906-06.webp">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-aberta-bar-garrafas-2219906-06.webp"
        alt="Cervejeira Metalfrio Beer Maxx VN25TP aberta em bar com garrafas iluminadas" 
        style="border-radius: 0px 0px 0px 0px;" width="1600" height="865"
        loading="lazy" decoding="async" fetchpriority="low">
        </picture>
      <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background" style="top: 75%; left: 75%;">
        <h2><strong>216 LATAS GELADAS</strong></h2>
        <p>A VN25TP armazena 216 latas de 350ml, 108 garrafas de 355ml ou 75 garrafas de 600ml, com 3 prateleiras internas.
        </p>
      </figcaption>
      </figure>

      <figure class="section-32__groupimage-section">
      <picture>
             <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-interior-garrafas-porta-aberta-2219906-07.webp?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-interior-garrafas-porta-aberta-2219906-07.webp?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-interior-garrafas-porta-aberta-2219906-07.webp?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-interior-garrafas-porta-aberta-2219906-07.webp?ims=1280x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-interior-garrafas-porta-aberta-2219906-07.webp?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-interior-garrafas-porta-aberta-2219906-07.webp">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-interior-garrafas-porta-aberta-2219906-07.webp"
        alt="Interior da Cervejeira Metalfrio Beer Maxx VN25TP com garrafas e porta aberta" 
        style="border-radius: 0px 0px 0px 0px;" width="1600" height="865"
        loading="lazy" decoding="async" fetchpriority="low">
        </picture>
      <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background" style="top: 55%; left: 68%;">
        <h2><strong>ONDE USAR A VN25TP?</strong></h2>
        <p>Combina com varandas, terraços gourmet, áreas de lazer, casas de praia e campo, levando refrigeração profissional para ambientes sociais.
        </p>
      </figcaption>
      </figure>
      

      <figure class="section-32__groupimage-section">
      <picture>
        <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-fundo-piso-ambiente-2219906-08.webp?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-fundo-piso-ambiente-2219906-08.webp?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-fundo-piso-ambiente-2219906-08.webp?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-fundo-piso-ambiente-2219906-08.webp?ims=1280x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-fundo-piso-ambiente-2219906-08.webp?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-fundo-piso-ambiente-2219906-08.webp">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-beer-maxx-vn25tp-228l-fundo-piso-ambiente-2219906-08.webp"
        alt="Piso escuro Metalfrio Beer Maxx VN25TP em ambiente de bar com luz quente" 
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
            <h3 id="faq-section__q-text">1. Para que serve o Metalfrio VN25TP Inox 228 Litros?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
           O Metalfrio VN25TP Inox 228 Litros serve para armazenar e resfriar bebidas com alta capacidade interna. A ficha indica 
           uso em varandas, terraços gourmet, áreas de lazer, casas de praia e casas de campo. Essa aplicação atende ambientes que 
           precisam de bebidas organizadas e refrigeradas com praticidade.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details>
          <summary>
            <h3 id="faq-section__q-text">2. O Metalfrio VN25TP tem bom desempenho de refrigeração?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
           O Metalfrio VN25TP Inox 228 Litros possui sistema de refrigeração subzero e faixa de temperatura ampliada de 2º a -6º. 
           O fluxo de ar contínuo favorece o resfriamento rápido e uniforme de todas as bebidas. Esse desempenho contribui para 
           manter o conteúdo interno em temperatura adequada.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details> 
          <summary>
            <h3 id="faq-section__q-text">3. O Metalfrio VN25TP é indicado para áreas de lazer e ambientes gourmet?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
            O Metalfrio VN25TP Inox 228 Litros conta com display interativo, display digital, iluminação interna em LED e função Eco Mode. 
            A ficha também informa prateleiras reguláveis, puxador ergonômico e tanque termoformado. Esses recursos favorecem controle, 
            organização interna e melhor visualização das bebidas.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details>
          <summary>
            <h3 id="faq-section__q-text">4. Como organizar melhor as bebidas no Metalfrio VN25TP?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
              O Metalfrio VN25TP Inox 228 Litros possui 3 prateleiras, sendo 2 reguláveis e 1 grade de fundo. A capacidade de armazenamento 
              informada é de 216 latas de 350 ml, 108 garrafas de 355 ml ou 75 garrafas de 600 ml. Essa configuração facilita a adaptação 
              do espaço interno conforme o tipo de bebida.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details>
          <summary>
            <h3 id="faq-section__q-text">5. Quais são as principais características técnicas do Metalfrio VN25TP?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
            O Metalfrio VN25TP Inox 228 Litros está disponível em 110V ou 220V, com potência de 285W e frequência de 60Hz. 
            A capacidade líquida é de 228 litros, enquanto a capacidade bruta é de 264 litros. As dimensões externas são 
            158,5 cm de altura, 52,5 cm de largura e 72,6 cm de profundidade.
            </p>
          </div>
        </details>
      </li>
    </ul>
      </section>
    </figure>
    </section>

    <footer aria-label="Informações legais">
           <p class="p__end">
          <strong>Imagens Meramente Ilustrativas</strong>
          </p>

          <section class="section-4-manual__container" aria-label="Manual de Instruções do Produto">
  <figure class="section-4-manual__figura" >
    <a href="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cervejeira-metalfrio-vn25tp-264-litros-beer-maxx-manual.pdf"
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
  </figure>
</section>
        </footer>

        </article>

        </div>
`,
  css: ``
}
);
