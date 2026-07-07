// @ts-nocheck
SenkoLib.registerVariant('section-2', [
/*@@@@Senko - variacao1 */
  {
    name: 'variacao1',
    html: `<section class="section-2-2" aria-label="Cabeçalho do produto">
    <header class="section-2-2__banner">
        <div class="section-2-2__banner-container">
            <video class="section-2-2__banner-video"
                poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header_giovannababy.webp"
                preload="none" autoplay muted loop playsinline aria-hidden="true">
                <source
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header_giovannababy.webm">
            </video>
        </div>

        <div class="section-2-2__badge" role="img" aria-label="Logo da marca">
            <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/cottonbaby/logo-cottonbaby2.png"
                alt="Logo da marca" class="section-2-2__badge-img">
        </div>
    </header>

    <article class="section-2-2__body">
        <small class="section-2-2__brand"> Marca </small>
        <h2 class="section-2-2__title">
            TÍTULO DO PRODUTO GAMER <strong>Nome, Modelo e Diferencial</strong>
        </h2>
        <p class="section-2-2__subtitle">
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

    .section-2-2 {
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

    .section-2-2__banner {
        width: 100%;
        height: var(--banner-height);
        position: relative;
        display: flex;
        justify-content: center;
    }

    /* Container do vídeo ocupando todo o banner */
    .section-2-2__banner-container {
        width: 100%;
        height: 100%;
        margin: 0;
        position: relative;
    }

    .section-2-2__banner-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .section-2-2__badge {
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

    .section-2-2__badge-img {
        max-width: 90px;
        max-height: 90px;
        object-fit: contain;
    }

    .section-2-2__body {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: calc(var(--badge-size) / 2 + 1.8rem) 0.3rem 0.7rem;
        text-align: center;
    }

    .section-2-2__brand {
        color: #ff9900;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        margin-bottom: 0.75rem;
    }

    .section-2-2__title {
        font-size: clamp(1.4rem, 4vw, 2.4rem);
        line-height: clamp(1.6rem, 4vw, 3.1rem);
        font-weight: 300;
        max-width: 50rem;
        text-wrap: pretty;
        color: #1a1a1a;
    }

    .section-2-2__title strong {
        font-weight: 700;
        display: block;
    }

    .section-2-2__subtitle {
        color: #8a8a8a;
        font-size: clamp(0.95rem, 2vw, 1.1rem);
        line-height: 1.65;
        margin-top: 1.25rem;
        max-width: 48rem;
        text-wrap: pretty;
    }

    @media (max-width: 768px) {
        .section-2-2 {
            --banner-height: 180px;
        }
    }

    @media (max-width: 470px) {
        .section-2-2__subtitle {
            text-align: justify;
            font-size: clamp(0.9rem, 2vw, 1.1rem);
        }
    }
</style>`,
  },
]);
