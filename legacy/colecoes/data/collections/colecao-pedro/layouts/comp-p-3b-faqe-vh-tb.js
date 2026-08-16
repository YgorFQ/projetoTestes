// @ts-nocheck
ColLib.registerCollectionLayout("colecao-pedro",
{
  id: "comp-p-3b-faqe-vh-tb",
  name: "video-header-3bs-faq-emb-tab",
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
        poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/poster-imbat-engrenagens-peças-mecanicas-girando.jpg"
        preload="none" autoplay muted loop playsinline width="1200" height="250" aria-hidden="true">
        <source src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-imbat.webm">
      </video>
      <div class="video-header__badge" role="img" aria-label="Logo da marca imbat dentro de um círculo laranja">
        <img
          src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/logo-imbat.webp"
          alt=""
          class="video-header__badge-img">
      </div>
    </header>
    <section class="video-header__body" aria-label="Título e descrição do produto">
      <small class="video-header__brand">imbat</small>

      <h2 class="video-header__title" id="video-main-title">
        LUVA TRICOTADA COM BANHO JANELA EM LATEX VERDE 
      </h2>
      <p class="video-header__subtitle">
        O revestimento em látex verde na palma e dedos garante excelente aderência e resistência. Ideal para manusear 
        ferramentas e materiais ásperos com total segurança e controle.
      </p>
    </section>
  </section>


        <section class="section-32__container" aria-label="Galeria de características">
        <figure class="section-32__groupimage-section">
       <picture>

         <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-latex-enrugado-verde-9000798-02.webp?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-latex-enrugado-verde-9000798-02.webp?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-latex-enrugado-verde-9000798-02.webp?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-latex-enrugado-verde-9000798-02.webp?ims=1238x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-latex-enrugado-verde-9000798-02.webp?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-latex-enrugado-verde-9000798-02.webp">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-latex-enrugado-verde-9000798-02.webp"
        alt="Parafusos autobrocantes imbat Tubozan com tampas cerâmica, branca e concreto" 
        style="border-radius: 30px 30px 0 0;" width="1600" height="865"
        loading="lazy" decoding="async" fetchpriority="low">
        </picture>
      <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background" style="top: 60%; left: 75%; max-width: 35%;">
        <h2><strong>MAIS FIRMEZA NO TRABALHO?</strong></h2>
        <p>O banho em látex verde enrugado garante uma pegada firme e segura, evitando que peças escorreguem.
        </p>
      </figcaption>
      </figure>

       <figure class="section-32__groupimage-section">
       <picture>

         <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-manuseio-peca-verde-9000798-03.webp?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-manuseio-peca-verde-9000798-03.webp?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-manuseio-peca-verde-9000798-03.webp?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-manuseio-peca-verde-9000798-03.webp?ims=1238x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-manuseio-peca-verde-9000798-03.webp?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-manuseio-peca-verde-9000798-03.webp">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-manuseio-peca-verde-9000798-03.webp"
        alt="Parafusos imbat Tubozan com tampas branco e marfim sobre fundo de instalação" 
        style="border-radius: 0;" width="1600" height="865"
        loading="lazy" decoding="async" fetchpriority="low">
        </picture>
      <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background" style="top: 85%; left: 50%; max-width: 40%;">
        <h2><strong>DURA MUITO TEMPO?</strong></h2>
        <p>Projetada para riscos mecânicos, ela é muito resistente a rasgos e cortes, entregando maior economia.
        </p>
      </figcaption>
      </figure>
      
      <figure class="section-32__groupimage-section">
      <picture>
        <source media="(max-width: 430px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-detalhe-bancada-verde-9000798-04.webp?ims=430x">
      
              <source media="(max-width: 768px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-detalhe-bancada-verde-9000798-04.webp?ims=768x">

              <source media="(max-width: 1024px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-detalhe-bancada-verde-9000798-04.webp?ims=1024x">
      
              <source media="(max-width: 1280px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-detalhe-bancada-verde-9000798-04.webp?ims=1280x">
      
              <source media="(max-width: 1440px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-detalhe-bancada-verde-9000798-04.webp?ims=1440x">

              <source media="(min-width: 1441px)" 
              srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-detalhe-bancada-verde-9000798-04.webp">

       <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/luva-de-seguranca-imbat-lv-s-blv-detalhe-bancada-verde-9000798-04.webp"
        alt="Cenário obra imbat Tubozan com furadeira e superfície de fixação ao fundo" 
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
            <h3 id="faq-section__q-text">1. Para que serve a luva de segurança imbat lv-s-blv e quando usar?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
            A luva de segurança IMBAT LV-S-BLV é indicada para proteger as mãos contra riscos mecânicos em diversas atividades diárias. 
            O modelo atende perfeitamente situações que envolvem agentes abrasivos, escoriantes, objetos cortantes e materiais perfurantes.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details>
          <summary>
            <h3 id="faq-section__q-text">2. A luva oferece boa aderência e desempenho nas atividades?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
            A luva de segurança IMBAT possui um banho em látex verde enrugado aplicado na palma, no dorso e nas pontas dos dedos. 
            Essa superfície texturizada atua como seu principal diferencial para aumentar a firmeza durante o manuseio de ferramentas.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details> 
          <summary>
            <h3 id="faq-section__q-text">3. De que é feito este equipamento de proteção individual?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
            A luva de segurança IMBAT é confeccionada a partir de um suporte têxtil em suedine branco revestido com o aplique de látex. 
            O seu punho apresenta um excelente acabamento em elastano finalizado com resistentes costuras do tipo overlock.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details>
          <summary>
            <h3 id="faq-section__q-text">4. Como higienizar a peça para garantir melhores resultados?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
              A luva de segurança IMBAT oferece validade de 5 anos e possui uma garantia de 180 dias em condições normais de uso. 
              Para manter a integridade, ela precisa ser guardada em local com temperatura média de 23ºC e sem incidência direta de luz solar ou raios UV.
            </p>
          </div>
        </details>
      </li>
      <li id="faq-section__item">
        <details>
          <summary>
            <h3 id="faq-section__q-text">5. Como higienizar a peça para garantir melhores resultados?</h3>
            <span id="faq-section__icon" aria-hidden="true"></span>
          </summary>
          <div id="faq-section__a-inner">
            <p id="faq-section__a-text">
              A luva de segurança IMBAT deve ser lavada apenas com sabão neutro, evitando produtos com pH acima de 11, clarificadores ou alvejantes. 
              A secagem precisa ocorrer sempre à sombra, sem utilizar calor extremo provindo de fornos ou caldeiras e evitando o sol direto.
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
          tamanhos de luvas disponíveis
          </caption>
            <thead class="table-head-custom">
               <tr class="table-tr-custom">
                 <th class="table-text-custom table-th-custom" style="background-color: #291d35; border-radius: 10px 0 0 0;" scope="col">SKU
                 </th>
                 <!--Replicar para adicionar mais COLUNAS-->
                 <th class="table-text-custom table-th-custom" style="background-color: #291d35; border-radius: 0 10px 0 0;" scope="col">TÍTULO
                 </th>
               </tr>
             </thead>
             <tbody>
               <tr class="table-tr-custom">
                 <td class="table-text-custom table-td-custom-title">9000798</td>
            <td class="table-text-custom table-td-custom-sub">LUVA IMBAT TRICOTADA COM BANHO JANELA EM LATEX VERDE TAMANHO 8 12X1</td>
           </tr>
         <tr class="table-tr-custom">
           <td class="table-text-custom table-td-custom-title">9000799</td>
        <td class="table-text-custom table-td-custom-sub">LUVA IMBAT TRICOTADA COM BANHO JANELA EM LATEX VERDE TAMANHO 9 12X1</td>
        </tr>
          <tr class="table-tr-custom">
           <td class="table-text-custom table-td-custom-title">9000800</td>
        <td class="table-text-custom table-td-custom-sub">LUVA IMBAT TRICOTADA COM BANHO JANELA EM LATEX VERDE TAMANHO 10 12X1</td>
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
