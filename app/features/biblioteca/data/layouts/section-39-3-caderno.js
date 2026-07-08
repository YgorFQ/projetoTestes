// @ts-nocheck
SenkoLib.registerLayout(
{
  id: "section 39.3 (caderno)",
  name: "Section 39.3 (Caderno)",
  tags: ["Caderno", "Section 39.3", "39.3", "interativo"],
  html: `<div class="bookcontainer1">
  <div class="book1">
    <div class="bookfront1">
      <div class="bookcover1"
        style="background-image: url(https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao39.png);">

      </div>
    </div>
  </div>
</div>`,
  css: `<style>
  .bookcontainer1 {

      display: flex;
      justify-content: center;
      /* Alinha os livros no centro horizontalmente */
      gap: 20px;
      /* Espaçamento entre os livros */
      perspective: 2800px;
      z-index: 1;
      margin-top: 15px;
    }

    .bookcontainer1 .book1 {

      display: block;
      position: relative;
      width: 423px;
      height: 552px;
      color: #2b2b2b;
      background: linear-gradient(45deg, #e9e9e9 0%, #e9e9e9 100%);
      border-radius: 3px 4px 4px 3px;
      box-shadow: 12px 12px 7px 0px rgba(115, 114, 116, 0.6);
      font-weight: 400;
      transform-style: preserve-3d;
      transition: transform 0.6s;
    }

    .bookcontainer1 .book1:hover {

      transform: rotate3d(0, 1, 0, 30deg);
    }

    .bookcontainer1 .bookfront1 {

      transform-origin: 0% 50%;
      transform-style: preserve-3d;
      z-index: 10;
      transition: transform 0.6s;
      transform: translate3d(0, 0, 18px);
    }

    .bookcontainer1 .bookfront1>div {

      height: 552px;
      width: 423px;
      border-radius: 0 3px 3px 0;
      box-shadow: inset 3px 0 9px rgba(0, 0, 0, 0.1);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: top left;
    }

    .bookcontainer1 .bookleft1-side {

      height: 540px;
      width: 45px;
      left: -18px;
      transform: rotate3d(0, 1, 0, -90deg);
    }

    .bookcontainer1 .bookcover1:after {

      content: '';
      position: absolute;
      top: 0;
      left: 12px;
      bottom: 0;
      width: 3px;
      background: rgba(0, 0, 0, 0.12);
      box-shadow: 1px 0 3px rgba(255, 255, 255, 0.1);
    }

    .bookcontainer1 .bookfront1:after {

      content: '';
      position: absolute;
      top: 1px;
      bottom: 1px;
      left: -1px;
      width: 1px;
    }

    .bookcover1 {

      background-size: 106%;
    }
</style>`
}
);
