// @ts-nocheck
SenkoLib.registerLayout(
  {
    id: 'section-1',
    name: 'Section-1 (Header Imagem)',
    tags: ['header imagem', 'section-1', '1', 'section 1', 'responsivo', 'acessível'],
    html: `        <section class="product-header">
            <div class="product-header__banner">
                <img class="product-header__banner-img" loading="eager"
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header.jpg"
                    alt="Banner visual do produto">
                <div class="product-header__badge">
                    <img class="product-header__badge-img"
                        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/consul/logo-consul.png"
                        alt="">
                </div>
            </div>
            <div class="product-header__body">
                <small class="product-header__brand">marca</small>
                <h2 class="product-header__title">
                    TÍTULO CURTO DO PRODUTO DA FORMA QUE PREFERIR
                </h2>
                <p class="product-header__subtitle">
                    Descrição breve do produto, destacando seus principais atributos e benefícios de forma clara e
                    objetiva, para atrair a tenção do consumidor e incentivá-lo a conhecer mais sobre o produto.
                </p>
            </div>
        </section>`,
    css: ` <style>
  *{
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

  .product-header__banner figure {
    width: 100%;
    height: 100%;
    margin: 0;
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
    padding: calc(var(--badge-size) / 2 + 1.1rem) 0.3rem 1.1rem;
    text-align: center;
  }

  .product-header__brand {
    color: #ff9900;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .product-header__title {
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

  @media (max-width: 768px) {
    .product-header {
      --banner-height: 180px;
    }
  }

  @media (max-width: 470px) {
    .product-header__subtitle {
      font-size: clamp(0.9rem, 2vw, 1.2rem);
      max-width: 95%;
      margin: 1.25rem auto 0;
    }
  }
</style>`
  }
);
