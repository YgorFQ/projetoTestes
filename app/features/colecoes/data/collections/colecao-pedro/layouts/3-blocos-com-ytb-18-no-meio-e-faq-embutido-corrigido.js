// @ts-nocheck
ColLib.registerCollectionLayout("colecao-pedro",
{
  id: "3-blocos-com-ytb-18-no-meio-e-faq-embutido-corrigido",
  name: "prod-header-1bs-feat-3bs-faq-emb-manual",
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
  border: 5px solid #000000;
  overflow: hidden;
  position: relative;
  background: rgb(255, 253, 253)230;
  box-shadow: 0 5px 10px #000000
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
  box-shadow: 0 5px 10px #000000
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
  box-shadow: 0 10px 15px  #000000
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
  background-color: #ffffff;
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
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-faixa-engrenagens-amarelas-509485-01.webp?ims=430x">
      
              <source media="(max-width: 768px)"
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-faixa-engrenagens-amarelas-509485-01.webp?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-faixa-engrenagens-amarelas-509485-01.webp?ims=1024x">
      
              <source media="(max-width: 1200px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-faixa-engrenagens-amarelas-509485-01.webp?ims=1200x">
      <img
        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-faixa-engrenagens-amarelas-509485-01.webp"
        alt="Fundo branco Stanley SDH710 com engrenagens amarelas e contorno preto" 
        class="product-header__banner-img" loading="eager">
    </picture>
    <div class="product-header__badge" role="img" aria-label="Logo da marca stanley dentro de um círculo laranja">
      <img
        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/logo-stanley.webp"
        alt="" 
        class="product-header__badge-img">
    </div>
  </header>
  <section class="product-header__body" aria-label="Título e descrição do produto">
    <small class="product-header__brand">stanley</small>
    <h2 class="product-header__title" id="product-main-title">
     FURADEIRA DE IMPACTO STANLEY 1/2 SDH710BR 710W
    </h2>
    <p class="product-header__subtitle">
    Potência e desempenho para encarar diferentes trabalhos: furadeira de impacto Stanley 710W com mandril 1/2”, 
    ideal para perfurações em madeira, metal e alvenaria.
    </p>
  </section>
</section>


      <section class="section-32__container" aria-label="Destaque visual do produto">
      <figure class="section-32__groupimage-section">
       <picture>

         <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-meia-polegada-produto-lateral-509485-02.webp?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-meia-polegada-produto-lateral-509485-02.webp?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-meia-polegada-produto-lateral-509485-02.webp?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-meia-polegada-produto-lateral-509485-02.webp?ims=1238x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-meia-polegada-produto-lateral-509485-02.webp?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-meia-polegada-produto-lateral-509485-02.webp">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-meia-polegada-produto-lateral-509485-02.webp"
        alt="Furadeira de impacto Stanley SDH710 710W 1/2 pol. com empunhadura lateral" 
        style="border-radius: 30px;" width="1600" height="865"
        loading="eager" decoding="async" fetchpriority="high">
        </picture>
      <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background" style="top: 60%; left: 28%; max-width: 35%;">
        <h2><strong>O QUE ELA FAZ?</strong></h2>
        <p>A Stanley SDH710 entrega 710W para perfurar madeira, plástico, aço, alvenaria e concreto em reformas, instalações e obras.
        </p>
      </figcaption>
      </figure>
       </section>

       <section class="features-section" 
       style="background-image: url('https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-fundo-branco-engrenagens-amarelas-509485-bg.webp');">


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
                        <h2>PERFURAÇÃO EM AÇO</h2>
                        <p>A Stanley SDH710 perfura aço até 13mm, usando mandril de 1/2” e controle de velocidade variável.</p>
                    </article>
                </label>
            </aside>

            <!-- Coluna Central: Imagens (Picture) e Card 2 -->
            <section class="image-display" aria-label="Imagem ilustrativa da funcionalidade selecionada">
                <div class="circle-frame" aria-live="polite" aria-label="Imagem da funcionalidade selecionada">
                    
                    <!-- IMAGEM 1 RESPONSIVA -->
                    <picture class="img1">
                        <source media="(max-width: 320px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-metal-509485-03.webp?ims=492x">
                        <source media="(max-width: 375px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-metal-509485-03.webp?ims=301x">
                        <source media="(min-width: 400px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-metal-509485-03.webp?ims=318x">
                        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-metal-509485-03.webp?ims=318x">
                        <source media="(max-width: 1280px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-metal-509485-03.webp?ims=400x">
                        <source media="(min-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-metal-509485-03.webp?ims=400x">
                        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-metal-509485-03.webp" 
                        alt="Furadeira Stanley SDH710 perfurando metal com broca e empunhadura lateral" loading="lazy" decoding="async" fetchpriority="low">
                    </picture>

                    <!-- IMAGEM 2 RESPONSIVA -->
                    <picture class="img2">
                       <source media="(max-width: 320px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-madeira-509485-04.webp?ims=492x">
                        <source media="(max-width: 375px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-madeira-509485-04.webp?ims=301x">
                        <source media="(min-width: 400px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-madeira-509485-04.webp?ims=318x">
                        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-madeira-509485-04.webp?ims=318x">
                        <source media="(max-width: 1280px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-madeira-509485-04.webp?ims=400x">
                        <source media="(min-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-madeira-509485-04.webp?ims=400x">
                        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-madeira-509485-04.webp" 
                        alt="Furadeira Stanley SDH710 perfurando madeira em móvel com apoio manual" loading="lazy" decoding="async" fetchpriority="low">
                    </picture>

                    <!-- IMAGEM 3 RESPONSIVA -->
                    <picture class="img3">
                        <source media="(max-width: 320px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-concreto-509485-05.webp?ims=492x">
                        <source media="(max-width: 375px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-concreto-509485-05.webp?ims=301x">
                        <source media="(min-width: 400px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-concreto-509485-05.webp?ims=318x">
                        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-concreto-509485-05.webp?ims=318x">
                        <source media="(max-width: 1280px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-concreto-509485-05.webp?ims=400x">
                        <source media="(min-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-concreto-509485-05.webp?ims=400x">
                        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-perfuracao-concreto-509485-05.webp" 
                        alt="Furadeira de impacto Stanley SDH710 perfurando parede de concreto" loading="lazy" decoding="async" fetchpriority="low">
                    </picture>

                </div>

                <label for="feat2" class="feature-card" role="radio" style="width: 90%;" aria-checked="false" tabindex="0">
                    <article>
                        <h2>PERFURAÇÃO EM MADEIRA</h2>
                        <p>A Stanley SDH710 perfura madeira até 25mm, com motor de 710W e velocidade variável para ajustar o ritmo do trabalho.</p>
                    </article>
                </label>
            </section>

            <!-- Coluna Direita -->
            <aside class="column" aria-label="Explica praticidade na hora da instalação">
                <label for="feat3" class="feature-card" role="radio" aria-checked="false" tabindex="0">
                    <article>
                        <h2>PERFURAÇÃO EM CONCRETO</h2>
                        <p>A Stanley SDH710 perfura concreto até 13mm com função impacto, indicada para superfícies rígidas em reformas e instalações.</p>
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
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-close-concreto-509485-06.webp?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-close-concreto-509485-06.webp?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-close-concreto-509485-06.webp?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-close-concreto-509485-06.webp?ims=1280x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-close-concreto-509485-06.webp?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-close-concreto-509485-06.webp">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-close-concreto-509485-06.webp"
        alt="Close da furadeira Stanley SDH710 perfurando concreto com limitador de profundidade" 
        style="border-radius: 30px 30px 0px 0px;" width="1600" height="865"
        loading="lazy" decoding="async" fetchpriority="low">
        </picture>
      <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background" style="top: 75%; left: 30%;">
        <h2><strong>O QUE É VVR?</strong></h2>
        <p>O VVR combina velocidade variável e reversão, permitindo ajustar rotação e sentido conforme o material, a broca e o tipo de trabalho.
        </p>
      </figcaption>
      </figure>

      <figure class="section-32__groupimage-section">
      <picture>
             <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-manejo-empunhadura-509485-07.webp?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-manejo-empunhadura-509485-07.webp?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-manejo-empunhadura-509485-07.webp?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-manejo-empunhadura-509485-07.webp?ims=1280x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-manejo-empunhadura-509485-07.webp?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-manejo-empunhadura-509485-07.webp">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-manejo-empunhadura-509485-07.webp"
        alt="Detalhe da empunhadura Stanley SDH710 durante perfuração em parede" 
        style="border-radius: 0px 0px 0px 0px;" width="1600" height="865"
        loading="lazy" decoding="async" fetchpriority="low">
        </picture>
      <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background" style="top: 45%; left: 65%;">
        <h2><strong>QUAL A CAPACIDADE?</strong></h2>
        <p>A SDH710 perfura até 25mm em madeira e até 13mm em aço, concreto ou alvenaria, conforme a aplicação. O mandril de 1/2” 
          ou 13mm com chave permite usar diferentes brocas com firmeza durante a perfuração.
        </p>
      </figcaption>
      </figure>
      

      <figure class="section-32__groupimage-section">
      <picture>
        <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-fundo-parede-obra-509485-08.webp?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-fundo-parede-obra-509485-08.webp?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-fundo-parede-obra-509485-08.webp?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-fundo-parede-obra-509485-08.webp?ims=1280x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-fundo-parede-obra-509485-08.webp?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-fundo-parede-obra-509485-08.webp">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-stanley-sdh710b2-710w-fundo-parede-obra-509485-08.webp"
        alt="Recorte de obra Stanley SDH710 com parede, luva e fundo escuro" 
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
            <h3 id="faq-section__q-text">1. Para que serve a Furadeira de Impacto 1/2" 710W com Chave VVR Stanley 127V?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
           A Furadeira de Impacto 1/2" 710W com Chave VVR Stanley 127V serve para perfuração em materiais como madeira, 
           plástico e alvenaria. A ficha também informa capacidade de perfuração em madeira, aço e alvenaria. É indicada 
           para aplicações que exigem força, controle e versatilidade em reformas, obras e instalações.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details>
          <summary>
            <h3 id="faq-section__q-text">2. A Furadeira de Impacto Stanley tem bom desempenho em materiais rígidos?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
           Sim. A Furadeira de Impacto 1/2" 710W com Chave VVR Stanley 127V possui motor de 710W e função impacto. 
           A ficha informa impacto de 0 a 51.000 ipm e velocidade de 0 a 3.000 rpm. Esse desempenho favorece perfurações 
           em aplicações exigentes e materiais como alvenaria.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details> 
          <summary>
            <h3 id="faq-section__q-text">3. A Furadeira de Impacto Stanley é adequada para uso contínuo?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
            Sim. A Furadeira de Impacto 1/2" 710W com Chave VVR Stanley 127V possui gatilho eletrônico de dois dedos com trava para uso contínuo. 
            O material do fornecedor também informa design ergonômico e botão de trava para longos períodos de trabalho. 
            Esses recursos contribuem para mais conforto e controle durante a operação.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details>
          <summary>
            <h3 id="faq-section__q-text">4. Qual é a durabilidade e garantia da Furadeira de Impacto Stanley?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
              A Furadeira de Impacto 1/2" 710W com Chave VVR Stanley 127V possui garantia de 12 meses conforme a ficha técnica. 
              O arquivo também informa anéis de carvão, descritos como recurso para maior durabilidade da ferramenta. 
              Essa construção oferece respaldo e resistência para o uso em aplicações frequentes.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details>
          <summary>
            <h3 id="faq-section__q-text">5. Quais são as principais características técnicas da Furadeira de Impacto Stanley?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
            A Furadeira de Impacto 1/2" 710W com Chave VVR Stanley 127V tem referência SDH710B2, potência de 710W e mandril 
            de 1/2" ou 13 mm. A capacidade de perfuração informada é de 25 mm em madeira e 13 mm em aço e alvenaria. 
            Esses dados ajudam a avaliar a compatibilidade da ferramenta com diferentes materiais e brocas.
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
        </footer>

        </article>

        </div>
`,
  css: ``
}
);
