// @ts-nocheck
SenkoLib.registerLayout(
{
  id: "section 39.2 (caderno)",
  name: "Section 39.2 (Caderno)",
  tags: ["Caderno", "Section 39.2", "39.2", "interativo"],
  html: `<div class="bookcontainer3">
  <div class="book3">
    <div class="bookfront3">
      <div class="bookcover3 frontcover3" 
        style="background-image: url('https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao39.2.png')">
      </div>
    </div>
    <div class="bookleft3-side"></div>
    <div class="bookback3"
      style="background-image: url(https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao39_02.png);">
      <div class="bookcover3 backcover3"></div>
    </div>
    <div class="bookinnerpage3"
      style="background-image: url(https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao39_02.png);">
    </div>
  </div>
</div>`,
  css: `<style>
  .bookcontainer3 {

    display: flex;
    justify-content: center;
    gap: 20px;
    perspective: 2800px;
    z-index: 1;
  }

  .bookcontainer3 .book3 {

    display: block;
    position: relative;
    width: 520px;
    height: 410px;
    color: #2b2b2b;
    border-radius: 3px 4px 4px 3px;
    box-shadow: 12px 12px 7px 0px rgba(115, 114, 116, 0.6);
    font-weight: 400;
    transform-style: preserve-3d;
    transition: transform 0.6s;
  }

  .bookcontainer3 .book3:hover {

    transform: rotate3d(0, 1, 0, 30deg);
  }

  .bookcontainer3 .bookfront3 {

    transform-origin: 0% 50%;
    transform-style: preserve-3d;
    z-index: 10;
    transition: transform 0.6s;
    transform: translate3d(0, 0, 18px);
  }

  .bookcontainer3 .bookfront3>div {

    height: 410px;
    width: 540px;
    border-radius: 0 3px 3px 0;
    box-shadow: inset 3px 0 9px rgba(0, 0, 0, 0.1);
  }

  .bookcontainer3 .bookleft3-side {

    height: 410px;
    width: 45px;
    left: -18px;
    transform: rotate3d(0, 1, 0, -90deg);
  }

  .bookcontainer3 .bookcover3:after {

    content: '';
    position: absolute;
    top: 0;
    left: 12px;
    bottom: 0;
    width: 3px;
    background: rgba(0, 0, 0, 0.12);
    box-shadow: 1px 0 3px rgba(255, 255, 255, 0.1);
  }

  .bookcontainer3 .bookfront3:after {

    content: '';
    position: absolute;
    top: 1px;
    bottom: 1px;
    left: -1px;
    width: 1px;
  }

  .bookcover3 {

    background-size: 102%;
    transform-origin: left;
    transition: transform 0.6s;
  }

  .bookinnerpage3 {

    background-size: 103%;
    transform-origin: left;
    transition: transform 0.6s;
  }

  .bookcontainer3 .book3:hover .bookcover3 {

    transform: rotateY(-160deg);
  }

  .bookcontainer3 .book3:hover .bookinnerpage3 {

    transform: rotateY(-160deg) translateZ(-11px) translateX(26px);
    opacity: 1;
  }

  .bookback3 {

    position: absolute;
    top: 0;
    left: 0;
    width: 540px;
    height: 410px;
    background-size: 101%;
    border-radius: 3px 4px 4px 3px;
  }

  .bookcontainer3 .bookinnerpage3 {

    position: absolute;
    top: 0;
    opacity: 1;
    left: 20px;
    height: 100%;
    width: 100%;
    background-size: 103%;
    z-index: -1;
    /* Mantém a página atrás do livro */

    transform: translate3d(0px, 0px, 0px);
    /* Leve ajuste de posição */
  }
</style>`
}
);
