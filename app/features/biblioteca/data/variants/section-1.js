// @ts-nocheck
SenkoLib.registerVariant('section-1', [
/*@@@@Senko - variacao1 */
  {
    name: 'variacao1',
    html: `<section class="product-header-2" aria-label="Cabeçalho do produto">
  <header class="product-header__banner-2">
    <figure style="width:100%;height:100%;margin:0;">
      <img
        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/header.jpg"
        alt="Banner do produto" class="product-header__banner-img-2" loading="eager">
    </figure>
    <div class="product-header__badge-2" role="img" aria-label="Logo da marca">
      <img
        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo.png"
        alt="Ícone da marca" class="product-header__badge-img-2">
    </div>
  </header>
  <article class="product-header__body-2">
    <small class="product-header__brand-2">── Marca ──</small>
    <h2 class="product-header__title-2">
      <span>TÍTULO DO PRODUTO GAMER</span>
      <strong>Nome, Modelo e Diferencial</strong>
    </h2>
    <p class="product-header__subtitle-2">
      Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
      Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
      Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
    </p>
  </article>
</section>`,
    css: `<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .product-header-2 {
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

  .product-header__banner-2 {
    width: 100%;
    height: var(--banner-height);
    position: relative;
    display: flex;
    justify-content: center;
  }

  .product-header__banner-2 figure {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .product-header__banner-img-2 {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .product-header__badge-2 {
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

  .product-header__badge-img-2 {
    max-width: 90px;
    max-height: 90px;
    object-fit: contain;
  }

  .product-header__body-2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: calc(var(--badge-size) / 2 + 1.8rem) 0.3rem 2.5rem;
    text-align: center;
  }

  .product-header__brand-2 {
    color: #ff9900;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
  }

  .product-header__title-2 {
    font-size: clamp(1.4rem, 4vw, 2.4rem);
    line-height: clamp(1.6rem, 4vw, 3.1rem);
    font-weight: 300;
    max-width: 50rem;
    text-wrap: pretty;
    color: #1a1a1a;
  }

  .product-header__title-2 strong {
    font-weight: 700;
    display: block;
  }

  .product-header__subtitle-2 {
    color: #8a8a8a;
    font-size: clamp(0.95rem, 2vw, 1.1rem);
    line-height: 1.65;
    margin-top: 1.25rem;
    max-width: 48rem;
    text-wrap: pretty;
  }

  @media (max-width: 768px) {
    .product-header-2 {
      --banner-height: 180px;
    }
  }

  @media (max-width: 470px) {
    .product-header__subtitle-2 {
      text-align: justify;
      font-size: clamp(0.9rem, 2vw, 1.1rem);
    }
  }
</style>`,
  },
]);
