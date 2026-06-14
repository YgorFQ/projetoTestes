// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   colecoes/data/colecao-pedro.js — Coleção: Coleção Pedro

   ATENÇÃO: Arquivo gerado pelo módulo GitHub do SenkoLib.
   NÃO edite manualmente em produção.
═══════════════════════════════════════════════════════════════════════ */
ColLib.register({
  slug:  'colecao-pedro',
  name:  'Coleção Pedro',
  group: 'pedro',
  tags:  [],
  layouts: [
                    
            
                        
        
                                        /*@@@@Col - comp-p-3b-faqe-vh-tb */
    {
      id:   'comp-p-3b-faqe-vh-tb',
      name: 'video-header-3bs-faq-emb-tab',
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
      css:  ``,
    },

                            /*@@@@Col - comp-3-blocos-product-header-faq-embutido-e-tabela */
    {
      id:   'comp-3-blocos-product-header-faq-embutido-e-tabela',
      name: 'video-header-1bs-feat-3bs-faq-emb-tab',
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
      css:  ``,
    },

                                /*@@@@Col - 3-blocos-com-ytb-18-no-meio-e-faq-embutido-corrigido */
    {
      id:   '3-blocos-com-ytb-18-no-meio-e-faq-embutido-corrigido',
      name: 'prod-header-1bs-feat-3bs-faq-emb-manual',
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
      css:  ``,
    },

            
            /*@@@@Col - prod-header-1bs-feat-3bs-faq-emb-manual */
    {
      id:   'prod-header-1bs-feat-3bs-faq-emb-manual',
      name: 'video-header-1bs-feat-3bs-faq-emb-manual',
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
      css:  ``,
    },

    /*@@@@Col - prod-header-1bs-feat-ytb-3bs-faq-emb-manual */
    {
      id:   'prod-header-1bs-feat-ytb-3bs-faq-emb-manual',
      name: 'prod-header-1bs-feat-ytb-3bs-faq-emb-manual',
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
      css:  ``,
    },

    /*@@@@Col - video-header-ytb-4bs-faq-emb */
    {
      id:   'video-header-ytb-4bs-faq-emb',
      name: 'video-header-ytb-4bs-faq-emb',
      html: `<div class="lp-container">
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

    .youtube-video-container {
      width: 100%;
      aspect-ratio: 16 / 9;
    }

    .youtube-video {
      width: 100%;
      height: 100%;
      border-radius: 30px 30px 0 0;
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

    #feat1:checked~.grid-container .img1,
    #feat2:checked~.grid-container .img2,
    #feat3:checked~.grid-container .img3 {
      opacity: 1;
      z-index: 2;
    }

    #feat1:checked~.grid-container label[for="feat1"],
    #feat2:checked~.grid-container label[for="feat2"],
    #feat3:checked~.grid-container label[for="feat3"] {
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
          poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/poster-rossi-amarelo-marca.webp"
          preload="none" autoplay muted loop playsinline width="1200" height="250" aria-hidden="true">
          <source src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-rossi.webm">
        </video>
        <div class="video-header__badge" role="img" aria-label="Logo da marca rossi dentro de um círculo laranja">
          <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/logo-rossi.webp" alt=""
            class="video-header__badge-img">
        </div>
      </header>
      <section class="video-header__body" aria-label="Título e descrição do produto">
        <small class="video-header__brand">rossi</small>

        <h2 class="video-header__title" id="video-main-title">
          PISTOLA DE PRESSÃO G17 BLOW BACK CO2 4,5MM
        </h2>
        <p class="video-header__subtitle">
          Realismo e desempenho em cada disparo: pistola de pressão Rossi G17 Blow Back CO2 4,5mm,
          ideal para prática esportiva e momentos de lazer com mais precisão.
        </p>
      </section>
    </section>


    <section class="section-32__container" aria-label="Galeria de características">
      <figure class="section-32__groupimage-section" aria-label="Vídeo demonstrativo do produto">
        <div class="youtube-video-container" style="border-radius: 30px 30px 0px 0px;">
          <iframe class="youtube-video" width="1600" height="865"
            src="https://www.youtube.com/embed/sqFV3MQCQl8?si=P0xcjdwfqHvgLw_8"
            title="Vídeo demonstrativo da pistola de pressão Rossi G17 Blow Back CO2 4,5MM" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>
      </figure>

      <figure class="section-32__groupimage-section">
        <picture>
          <source media="(max-width: 430px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-produto-preto-3024233-02.webp?ims=430x">

          <source media="(max-width: 768px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-produto-preto-3024233-02.webp?ims=768x">

          <source media="(max-width: 1024px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-produto-preto-3024233-02.webp?ims=1024x">

          <source media="(max-width: 1280px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-produto-preto-3024233-02.webp?ims=1238x">

          <source media="(max-width: 1440px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-produto-preto-3024233-02.webp?ims=1440x">

          <source media="(min-width: 1441px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-produto-preto-3024233-02.webp">

          <img
            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-produto-preto-3024233-02.webp"
            alt="Parafusos autobrocantes rossi Tubozan com tampas cerâmica, branca e concreto" style="border-radius: 0;"
            width="1600" height="865" loading="lazy" decoding="async" fetchpriority="low">
        </picture>
        <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background"
          style="top: 85%; left: 45%; max-width: 35%;">
          <h2><strong>O QUE É BLOWBACK?</strong></h2>
          <p>Blowback é a ação em que o slide se movimenta a cada disparo, criando sensação de recuo e uma experiência
            mais realista.
          </p>
        </figcaption>
      </figure>

      <figure class="section-32__groupimage-section">
        <picture>

          <source media="(max-width: 430px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-alvo-estande-3024233-03.webp?ims=430x">

          <source media="(max-width: 768px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-alvo-estande-3024233-03.webp?ims=768x">

          <source media="(max-width: 1024px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-alvo-estande-3024233-03.webp?ims=1024x">

          <source media="(max-width: 1280px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-alvo-estande-3024233-03.webp?ims=1238x">

          <source media="(max-width: 1440px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-alvo-estande-3024233-03.webp?ims=1440x">

          <source media="(min-width: 1441px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-alvo-estande-3024233-03.webp">

          <img
            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-alvo-estande-3024233-03.webp"
            alt="Parafusos rossi Tubozan com tampas branco e marfim sobre fundo de instalação" style="border-radius: 0;"
            width="1600" height="865" loading="lazy" decoding="async" fetchpriority="low">
        </picture>
        <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background"
          style="top: 85%; left: 40%; max-width: 40%;">
          <h2><strong>QUAL O DESEMPENHO?</strong></h2>
          <p>A Rossi G17 usa gás CO2, calibre 4,5mm, magazine para 16 BBs, autonomia de 50 tiros e potência de 328 FPS.
          </p>
        </figcaption>
      </figure>

      <figure class="section-32__groupimage-section">
        <picture>

          <source media="(max-width: 430px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-manejo-lateral-3024233-04.webp?ims=430x">

          <source media="(max-width: 768px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-manejo-lateral-3024233-04.webp?ims=768x">

          <source media="(max-width: 1024px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-manejo-lateral-3024233-04.webp?ims=1024x">

          <source media="(max-width: 1280px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-manejo-lateral-3024233-04.webp?ims=1238x">

          <source media="(max-width: 1440px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-manejo-lateral-3024233-04.webp?ims=1440x">

          <source media="(min-width: 1441px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-manejo-lateral-3024233-04.webp">

          <img
            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-manejo-lateral-3024233-04.webp"
            alt="Parafusos rossi Tubozan com tampas branco e marfim sobre fundo de instalação" style="border-radius: 0;"
            width="1600" height="865" loading="lazy" decoding="async" fetchpriority="low">
        </picture>
        <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background"
          style="top: 65%; left: 26%; max-width: 40%;">
          <h2><strong>PARA QUEM É?</strong></h2>
          <p>É indicada para uso recreativo, treino, diversão e colecionismo, atendendo iniciantes, intermediários e
            consumidores que buscam realismo.
          </p>
        </figcaption>
      </figure>

      <figure class="section-32__groupimage-section">
        <picture>
          <source media="(max-width: 430px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-fundo-amarelo-estande-3024233-05.webp?ims=430x">

          <source media="(max-width: 768px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-fundo-amarelo-estande-3024233-05.webp?ims=768x">

          <source media="(max-width: 1024px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-fundo-amarelo-estande-3024233-05.webp?ims=1024x">

          <source media="(max-width: 1280px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-fundo-amarelo-estande-3024233-05.webp?ims=1280x">

          <source media="(max-width: 1440px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-fundo-amarelo-estande-3024233-05.webp?ims=1440x">

          <source media="(min-width: 1441px)"
            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-fundo-amarelo-estande-3024233-05.webp">

          <img
            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-pressao-rossi-gk-g17-blowback-co2-4-5mm-fundo-amarelo-estande-3024233-05.webp"
            alt="Cenário obra rossi Tubozan com furadeira e superfície de fixação ao fundo"
            style="border-radius: 0px 0px 30px 30px;" width="1600" height="865" loading="lazy" decoding="async"
            fetchpriority="low">
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
                  <h3 id="faq-section__q-text">1. Para que serve a Pistola de Pressão Rossi G17 Blowback CO2 4,5mm?</h3>
                  <span id="faq-section__icon" aria-hidden="true"></span>
                </summary>
                <div id="faq-section__a-inner">
                  <p id="faq-section__a-text">
                    A Pistola de Pressão Rossi G17 Blowback CO2 4,5mm é indicada para treino recreativo, diversão e
                    colecionismo.
                    A ficha informa funcionamento por sistema CO2, ação blowback e calibre 4,5 mm. Esse perfil atende
                    consumidores que buscam uma pistola de pressão com realismo, praticidade e apelo visual.
                  </p>
                </div>
              </details>
            </li>
            <li id="faq-section__item">
              <details>
                <summary>
                  <h3 id="faq-section__q-text">2. A Pistola de Pressão Rossi G17 Blowback tem bom desempenho?</h3>
                  <span id="faq-section__icon" aria-hidden="true"></span>
                </summary>
                <div id="faq-section__a-inner">
                  <p id="faq-section__a-text">
                    A Pistola de Pressão Rossi G17 Blowback CO2 4,5mm oferece ação blowback, que movimenta o slide para
                    trás a cada disparo.
                    A ficha informa velocidade de 328 FPS, potência de 1,7 joules e autonomia de 50 tiros. Esse conjunto
                    reforça a
                    experiência de tiro recreativo com sensação de recuo e funcionamento realista.
                  </p>
                </div>
              </details>
            </li>
            <li id="faq-section__item">
              <details>
                <summary>
                  <h3 id="faq-section__q-text">3. A Pistola de Pressão Rossi G17 é indicada para iniciantes e
                    colecionadores?</h3>
                  <span id="faq-section__icon" aria-hidden="true"></span>
                </summary>
                <div id="faq-section__a-inner">
                  <p id="faq-section__a-text">
                    A Pistola de Pressão Rossi G17 Blowback CO2 4,5mm é descrita como modelo indicado para iniciantes,
                    intermediários e colecionadores.
                    O arquivo também cita plataforma ergonômica e moderna para treino e recreação. Essa adequação amplia
                    o uso para
                    diferentes perfis dentro da proposta recreativa e de coleção.
                  </p>
                </div>
              </details>
            </li>
            <li id="faq-section__item">
              <details>
                <summary>
                  <h3 id="faq-section__q-text">4. De que material é feita a Pistola de Pressão Rossi G17?</h3>
                  <span id="faq-section__icon" aria-hidden="true"></span>
                </summary>
                <div id="faq-section__a-inner">
                  <p id="faq-section__a-text">
                    A Pistola de Pressão Rossi G17 Blowback CO2 4,5mm é fabricada em polímero e metal, conforme as
                    informações
                    enviadas pelo fornecedor. A cor informada é Black, e o modelo aparece como GK G17 Blowback. Essa
                    composição
                    entrega estrutura compatível com a proposta de realismo e uso recreativo do produto.
                  </p>
                </div>
              </details>
            </li>
            <li id="faq-section__item">
              <details>
                <summary>
                  <h3 id="faq-section__q-text">5. Quais são as principais características técnicas da Pistola Rossi G17
                    Blowback?</h3>
                  <span id="faq-section__icon" aria-hidden="true"></span>
                </summary>
                <div id="faq-section__a-inner">
                  <p id="faq-section__a-text">
                    A Pistola de Pressão Rossi G17 Blowback CO2 4,5mm tem peso de 720 g, tamanho de 220 mm e capacidade
                    de
                    carregador para 16 munições. O calibre informado é 4,5 mm, o tipo de munição é BBs e o sistema de
                    funcionamento é gás CO2. Esses dados ajudam a identificar compatibilidade, capacidade e desempenho
                    do modelo.
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
    </footer>

  </article>

</div>`,
      css:  ``,
    },

  ]
});
