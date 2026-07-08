// @ts-nocheck
SenkoLib.registerLayout(
{
  id: "section 39.1 (caderno)",
  name: "Section 39.1 (Caderno)",
  tags: ["interativo", "Section 39.1", "39.1", "caderno"],
  html: `<div class="bookcontainer">
  <div class="book">
    <div class="bookfront">
      <div class="bookcover frontcover"
        style="background-image: url('https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao39.png')">
      </div>
    </div>
    <div class="bookleft-side"></div>
    <div class="bookback"
      style="background-image: url(https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao39_02.png);">
      <div class="bookcover backcover"></div>
    </div>
    <div class="bookinnerpage"
      style="background-image: url(https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao39_02.png);">
    </div>
  </div>
</div>`,
  css: `<style>
  .bookcontainer {

    display: flex;
    justify-content: center;
    gap: 20px;
    perspective: 2800px;
    z-index: 1;
  }

  .bookcontainer .book {

    display: block;
    position: relative;
    width: 400px;
    height: 540px;
    color: #2b2b2b;
    border-radius: 3px 4px 4px 3px;
    box-shadow: 12px 12px 7px 0px rgba(115, 114, 116, 0.6);
    font-weight: 400;
    transform-style: preserve-3d;
    transition: transform 0.6s;
  }

  .bookcontainer .book:hover {

    transform: rotate3d(0, 1, 0, 30deg);

  }

  .bookcontainer .bookfront {

    transform-origin: 0% 50%;
    transform-style: preserve-3d;
    z-index: 10;
    transition: transform 0.6s;
    transform: translate3d(0, 0, 18px);
  }

  .bookcontainer .bookfront>div {

    height: 540px;
    width: 410px;
    border-radius: 0 3px 3px 0;
    box-shadow: inset 3px 0 9px rgba(0, 0, 0, 0.1);
  }

  .bookcontainer .bookleft-side {

    height: 540px;
    width: 45px;
    left: -18px;
    transform: rotate3d(0, 1, 0, -90deg);
  }

  .bookcontainer .bookcover:after {

    content: '';
    position: absolute;
    top: 0;
    left: 12px;
    bottom: 0;
    width: 3px;
    background: rgba(0, 0, 0, 0.12);
    box-shadow: 1px 0 3px rgba(255, 255, 255, 0.1);
  }

  .bookcontainer .bookfront:after {

    content: '';
    position: absolute;
    top: 1px;
    bottom: 1px;
    left: -1px;
    width: 1px;
  }

  .bookcover {

    background-size: 102%;
    transform-origin: left;
    transition: transform 0.6s;
  }

  .bookinnerpage {

    background-size: 103%;
    transform-origin: left;
    transition: transform 0.6s;
  }

  .bookcontainer .book:hover .bookcover {

    transform: rotateY(-160deg);

  }

  .bookcontainer .book:hover .bookinnerpage {

    transform: rotateY(-160deg) translateZ(-11px) translateX(26px);
    opacity: 1;
  }

  .bookback {

    position: absolute;
    top: 0;
    left: 0;
    width: 410px;
    height: 540px;
    background-size: 101%;
    border-radius: 3px 4px 4px 3px;
  }

  .bookcontainer .bookinnerpage {

    position: absolute;
    top: 0;
    opacity: 1;
    left: 20px;
    height: 100%;
    width: 98%;
    background-size: 103%;
    z-index: -1;
    /* Mantém a página atrás do livro */

    background-size: cover;
    background-position: center;
    object-fit: cover;
    transform: translate3d(0px, 0px, 0px);
    /* Leve ajuste de posição */
  }
</style>`
}
);
