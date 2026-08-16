// @ts-nocheck
SenkoLib.registerLayout(
    {
        id: "section-21",
        name: "Section-21",
        tags: ["cards", "clicavel", "interativo", "diversos"],
        html: `<section class="section-21" aria-labelledby="section-21-title">
  <div class="section-21__header">
    <h2 id="section-21-title">TUDO O QUE VOCÊ PROCURA</h2>
  </div>

  <div class="section-21__options" role="radiogroup" aria-label="Escolha uma característica para visualizar">
    <input class="section-21__sr-only" id="section-21-feat1" type="radio" name="section-21-feature"
      aria-label="Selecionar característica resistência" checked>

    <input class="section-21__sr-only" id="section-21-feat2" type="radio" name="section-21-feature"
      aria-label="Selecionar característica pegada segura">

    <input class="section-21__sr-only" id="section-21-feat3" type="radio" name="section-21-feature"
      aria-label="Selecionar característica troca de disco">

    <div class="section-21__grid">
      <div class="section-21__column">
        <label class="section-21__card" for="section-21-feat1" tabindex="0">
          <div class="section-21__card-content">
            <h2>É RESISTENTE?</h2>

            <p>
              Sim! Possui caixa de engrenagem metálica para maior vida útil e
              interruptor selado que bloqueia a entrada de pó.
            </p>
          </div>
        </label>
      </div>

      <div class="section-21__image-display" role="group" aria-label="Imagem ilustrativa da funcionalidade selecionada">
        <div class="section-21__circle-frame" role="img" aria-live="polite"
          aria-label="Imagem da funcionalidade selecionada">
          <div class="section-21__image section-21__image--1">
            <img
              src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-acabamento-solda-metal-509478-03.jpg"
              alt="Operador com Esmerilhadeira Black & Decker realizando acabamento sobre solda">
          </div>

          <div class="section-21__image section-21__image--2">
            <img
              src="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-limpeza-superficie-enferrujada-509478-04.jpg"
              alt="Esmerilhadeira Black & Decker G720XB2 limpando superfície enferrujada">
          </div>

          <div class="section-21__image section-21__image--3">
            <img
              src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-desbaste-borda-chapa-metal-509478-05.jpg"
              alt="Esmerilhadeira Black & Decker desbastando borda de peça metálica espessa">
          </div>
        </div>

        <label class="section-21__card section-21__card--center" for="section-21-feat2" tabindex="0"
          style="width: 90%;">
          <div class="section-21__card-content">
            <h2>A PEGADA É SEGURA?</h2>

            <p>
              Sua carcaça é emborrachada e conta com empunhadura ergonômica de
              3 posições, dando total controle.
            </p>
          </div>
        </label>
      </div>

      <div class="section-21__column" role="group" aria-label="Funcionalidade de troca de disco">
        <label class="section-21__card" for="section-21-feat3" tabindex="0">
          <div class="section-21__card-content">
            <h2>É FÁCIL TROCAR DISCO?</h2>

            <p>
              A troca de disco é rápida graças ao botão de trava do eixo e o
              ajuste da guarda é feito sem ferramentas.
            </p>
          </div>
        </label>
      </div>
    </div>
  </div>
</section>`,
        css: `<style>
  .section-21 {
    max-width: 1200px;
    margin: 40px auto;
    padding: 60px 20px;
    background: #fff;
    border-radius: 40px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
    font-family: sans-serif;
  }

  .section-21__sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .section-21__header {
    margin-bottom: 50px;
    text-align: center;
  }

  .section-21__header h2 {
    margin: 0 0 15px;
    color: #000;
    font-size: 2rem;
    font-weight: 600;
    line-height: 2rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .section-21__header p {
    max-width: 600px;
    margin: 0 auto;
    color: #8a8a8a;
  }

  .section-21__grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr 1fr;
    gap: 30px;
    align-items: center;
  }

  .section-21__column {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .section-21__image-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }

  .section-21__circle-frame {
    position: relative;
    width: 100%;
    max-width: 400px;
    aspect-ratio: 780 / 740;
    overflow: hidden;
    background: #eee;
    border: 5px solid #f2540d;
    border-radius: 50%;
  }

  .section-21__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .section-21__image img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .section-21__card {
    position: relative;
    display: block;
    padding: 25px;
    background: #fff;
    border: 2px solid #eee;
    border-radius: 20px;
    cursor: pointer;
    transition:
      background-color 0.4s ease,
      border-color 0.4s ease,
      box-shadow 0.4s ease,
      transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .section-21__card h2 {
    margin: 0 0 10px;
    color: #000;
    font-size: 1.2rem;
    font-weight: 550;
    line-height: 1.3;
  }

  .section-21__card p {
    margin: 0;
    color: #666;
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .section-21__card:hover {
    background-color: #fffcfa;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
    transform: translateY(-8px);
  }

  .section-21__sr-only:focus-visible+.section-21__card {
    outline: 3px solid #f2540d;
    outline-offset: 5px;
  }

  #section-21-feat1:checked~.section-21__grid .section-21__image--1,
  #section-21-feat2:checked~.section-21__grid .section-21__image--2,
  #section-21-feat3:checked~.section-21__grid .section-21__image--3 {
    z-index: 2;
    opacity: 1;
  }

  #section-21-feat1:checked~.section-21__grid label[for="section-21-feat1"],
  #section-21-feat2:checked~.section-21__grid label[for="section-21-feat2"],
  #section-21-feat3:checked~.section-21__grid label[for="section-21-feat3"] {
    background-color: #fffcfa;
    border-color: #f2540d;
  }

  @media (max-width: 1060px) {
    .section-21__grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .section-21__image-display {
      grid-row: 1;
    }

    .section-21__circle-frame {
      max-width: 320px;
    }

    .section-21__column {
      order: 2;
    }
  }
</style>`
    }
);
