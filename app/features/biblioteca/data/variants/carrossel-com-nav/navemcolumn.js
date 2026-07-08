// @ts-nocheck
SenkoLib.registerVariantFile("carrossel-com-nav",
{
  id: "navemcolumn",
  name: "navemcolumn",
  html: `<div class="c32-carousel">

  <!-- ── Radios: um por slide ── -->
  <input type="radio" name="c32" id="c32-s1" checked>
  <input type="radio" name="c32" id="c32-s2">

  <!-- ── Navegação ── -->
  <nav class="c32-nav">
    <label for="c32-s1">Salmão</label>
    <label for="c32-s2">Peru</label>
  </nav>

  <!-- ── Slides ── -->
  <div class="c32-slides">

    <!-- SLIDE 1 -->
    <div class="c32-slide">
      <picture class="section-32__groupimage-section">
        <source media="(max-width: 430px)"  srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_salmão_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-4.jpg?ims=430x">
        <source media="(max-width: 768px)"  srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_salmão_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-4.jpg?ims=768x">
        <source media="(max-width: 1024px)" srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_salmão_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-4.jpg?ims=1024x">
        <source media="(max-width: 1238px)" srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_salmão_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-4.jpg?ims=1238x">
        <source media="(max-width: 1440px)" srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_salmão_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-4.jpg?ims=1440x">
        <source media="(min-width: 1441px)" srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_salmão_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-4.jpg">
        <img src="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_salmão_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-4.jpg"
          alt="Tigela madeira ração seca duas embalagens Whiskas Superfoods Adultos Salmão Linhaça fundo roxo"
          style="border-radius: 0px 0px 0px 0px;" width="1600" height="865"
          loading="lazy" decoding="async" fetchpriority="low">
      </picture>
    </div>

    <!-- SLIDE 2 -->
    <div class="c32-slide">
      <picture class="section-32__groupimage-section">
        <source media="(max-width: 430px)"  srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_peru_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-04.jpg?ims=430x">
        <source media="(max-width: 768px)"  srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_peru_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-04.jpg?ims=768x">
        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_peru_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-04.jpg?ims=1024x">
        <source media="(max-width: 1238px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_peru_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-04.jpg?ims=1238x">
        <source media="(max-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_peru_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-04.jpg?ims=1440x">
        <source media="(min-width: 1441px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_peru_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-04.jpg">
        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/embalagens_pedigree_barriguinha_saudável_peru_2,7kg_e_900g_ao_lado_de_cão_fundo_amarelo-703206-04.jpg"
          alt="Descrição da imagem do slide Superfoods"
          style="border-radius: 0px 0px 0px 0px;" width="1600" height="865"
          loading="lazy" decoding="async" fetchpriority="low">
      </picture>
    </div>


  </div>
</div>`,
  css: `/* ── Reset e container ── */
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
    flex-direction: column; 
    z-index: 30;
    width: 30%;
    gap: 6vw;
    align-items: center;
    justify-content: center;
    margin-top: 10rem;
    left: 75%;
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
}
);
