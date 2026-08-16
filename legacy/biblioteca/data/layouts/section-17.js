// @ts-nocheck
SenkoLib.registerLayout(
  {
    id: "section-17",
    name: "Section-17",
    tags: ["Carrossel", "17"],
    html: `<div class="section-17__carousel">

  <!-- ── Radios: um por slide ── -->
  <input type="radio" name="c32" id="section-17__s1" checked>
  <input type="radio" name="c32" id="section-17__s2">

  <!-- ── Navegação ── -->
  <nav class="section-17__nav">
    <label for="section-17__s1">Salmão</label>
    <label for="section-17__s2">Peru</label>
  </nav>

  <!-- ── Slides ── -->
  <div class="section-17__slides">

    <!-- SLIDE 1 -->
    <div class="section-17__slide">
      <div class="section-17__groupimage-section">
        <img
          src="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_salmão_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-4.jpg"
          alt="Tigela madeira ração seca duas embalagens Whiskas Superfoods Adultos Salmão Linhaça fundo roxo"
          style="border-radius: 0px 0px 0px 0px;" width="1600" height="865" loading="lazy" decoding="async"
          fetchpriority="low">
      </div>
    </div>

    <!-- SLIDE 2 -->
    <div class="section-17__slide">
      <div class="section-17__groupimage-section">
        <img
          src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_peru_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-04.jpg"
          alt="Descrição da imagem do slide Superfoods" style="border-radius: 0px 0px 0px 0px;" width="1600"
          height="865" loading="lazy" decoding="async" fetchpriority="low">
      </div>
    </div>

  </div>
</div>`,
    css: `<style>
  /* ── Reset e container ── */
  .section-17__carousel {
    position: relative;
    width: 100%;
  }

  /* ── Radios ocultos — motor do carrossel ── */
  .section-17__carousel input[type="radio"] {
    display: none;
  }

  /* ── Barra de navegação ── */
  .section-17__nav {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 30;
    width: 30%;
    gap: 6vw;
    align-items: center;
    justify-content: center;
    margin-top: 10rem;
    left: 75%;
  }

  .section-17__nav label {
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

  .section-17__nav label:hover {
    color: rgba(255, 255, 255, 0.8);
    background-color: #e74011;
  }

  /* ── Label ativo — um por slide ── */
  #section-17__s1:checked~.section-17__nav label[for="section-17__s1"],
  #section-17__s2:checked~.section-17__nav label[for="section-17__s2"],
  #section-17__s3:checked~.section-17__nav label[for="section-17__s3"],
  #section-17__s4:checked~.section-17__nav label[for="section-17__s4"] {
    color: #fff;
    border-bottom-color: #fff;
  }

  /* ── Área dos slides: empilha tudo no mesmo espaço via grid ── */
  .section-17__slides {
    display: grid;
  }

  .section-17__slide {
    grid-column: 1;
    grid-row: 1;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
    position: relative;
  }

  /* ── Slide ativo — um por slide ── */
  #section-17__s1:checked~.section-17__slides .section-17__slide:nth-child(1),
  #section-17__s2:checked~.section-17__slides .section-17__slide:nth-child(2),
  #section-17__s3:checked~.section-17__slides .section-17__slide:nth-child(3),
  #section-17__s4:checked~.section-17__slides .section-17__slide:nth-child(4) {
    opacity: 1;
    pointer-events: auto;
  }

  /* ── Imagem responsiva ── */

  @keyframes section-17__bounce {
    from {
      transform: translateX(60px);
      filter: blur(12px);
      opacity: 0;
    }

    to {
      transform: translateX(0);
      filter: blur(0);
      opacity: 1;
    }
  }

  /* substitui os 4 seletores de "slide ativo" que já estão no CSS */
  #section-17__s1:checked~.section-17__slides .section-17__slide:nth-child(1),
  #section-17__s2:checked~.section-17__slides .section-17__slide:nth-child(2),
  #section-17__s3:checked~.section-17__slides .section-17__slide:nth-child(3),
  #section-17__s4:checked~.section-17__slides .section-17__slide:nth-child(4) {
    animation: section-17__bounce;
    pointer-events: auto;
  }

  .section-32__groupimage-section {
    position: relative;
    width: 100%;
    margin: 0;
    contain: layout style;
  }

  @media (max-width: 1060px) {

    .section-17__nav {
      width: 30%;
      gap: 4vh;
      margin-top: 6.5rem;
    }

    .section-17__nav label {
      font-size: 1.8em;
      font-weight: 600;
      line-height: 2.5vh;
      border-radius: 1.2vw;
      border-bottom: 2px solid transparent;
      padding: 1rem;

    }

  }

  @media (max-width: 960px) {

    .section-17__nav {
      width: 30%;
      gap: 5vh;
    }

    .section-17__nav label {
      font-size: 1.8em;
      font-weight: 600;
      line-height: 2.5vh;
      border-radius: 1.2vw;
      border-bottom: 2px solid transparent;
      padding: 0.8rem;

    }
  }

  @media (max-width: 768px) {

    .section-17__nav {
      width: 30%;
      gap: 2.5vh;
    }

    .section-17__nav label {
      font-size: 1em;
      line-height: 2vh;
      border-radius: 1.5vw;
      border-bottom: 2px solid transparent;

    }

  }

  @media (max-width: 600px) {


    .section-17__nav {
      width: 30%;
      gap: 2vh;
    }

    .section-17__nav label {
      font-size: 0.8em;
      line-height: 2vh;
      border-radius: 3vw;
      border-bottom: 2px solid transparent;
      padding: 0.5rem;

    }
  }

  @media (max-width: 500px) {

    .section-17__nav label {
      font-size: 0.6em;
      line-height: 2vh;
      padding: 0.4rem 0.5rem;
      border-bottom: 1px solid transparent;
      box-shadow: #00000093 -3px 3px 3px;
    }

    .section-17__nav {
      margin-top: 5rem;
    }

  }

  @media (max-width: 440px) {

    .section-17__nav {
      margin-top: 5rem;
    }

    .section-17__nav label {
      line-height: 1vh;


    }
  }

  @media (max-width: 375px) {

    .section-17__nav {
      width: 30%;
    }

    .section-17__nav label {
      font-size: 0.6em;
      line-height: 1vh;
      padding: 0.3rem 0.5rem;

    }


  }

  @media (max-width: 320px) {

    .section-17__nav label {
      padding: 0.2rem 0.5rem;

    }

  }

  .section-17__groupimage-section {
    position: relative;
    width: 100%;
    margin: 0;
    contain: layout style;
    isolation: isolate;
  }

  .section-17__groupimage-section img {
    width: 100%;
    height: auto;
    display: block;
    min-width: 100%;
  }
</style>
`
  }
);
