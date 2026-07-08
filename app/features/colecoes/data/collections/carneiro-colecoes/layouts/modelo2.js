// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "modelo2",
  name: "Padrão 2",
  html: `<div class="lp-container">
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Varela+Round&display=swap');

        * {
            padding: 0;
            margin: 0;
        }

        .pdp {
            display: flex;
            flex-direction: column;
            font-family: Roboto, sans-serif
        }

        .pdp * {
            box-sizing: border-box;
            margin: 0;
        }

        .pdp-text-gradient {
            background: linear-gradient(90deg, #c29869, #ddbc88, #e6c588);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
            background-clip: text;
        }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet">
    <title>PDP - eFácil</title>
    <!-- ---------------------------------------- ÁREA PARA COLOCAR STYLES ----------------------------------------------------------- -->

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
            padding: calc(var(--badge-size) / 2 + 1.1rem) 0.3rem 2.5rem;
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
                text-align: justify;
                font-size: clamp(0.9rem, 2vw, 1.2rem);
            }
        }
    </style>

    <style>
        /* ===== HERO SECTION — VARIÁVEIS ===== */
        .section-6 {
            --pos-y: 50%;
            --pos-x: 7%;
            --color-title: #ffe178;
            --bg-box: rgba(0, 0, 0, 0.33);

            width: 100%;
            position: relative;
            border-radius: 20px;
            overflow: hidden;
        }

        /* ===== IMAGEM ===== */
        .section-6__image {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 20px;
        }

        /* ===== CONTEÚDO SOBREPOSTO ===== */
        .section-6__content {
            position: absolute;
            top: var(--pos-y);
            left: clamp(1%, var(--pos-x), 100%);
            transform: translateY(-50%);
            max-width: min(40%, 480px);
            z-index: 10;
            background-color: var(--bg-box);
            padding: clamp(12px, 2vw, 20px);
            border-radius: 15px;
            backdrop-filter: blur(4px);
        }

        .section-6__title {
            font-size: clamp(1.4rem, 3.5vw, 2.6rem);
            color: var(--color-title);
            margin: 0 0 10px;
            line-height: 1.2;
            text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
            font-weight: 800;
        }

        .section-6__description {
            font-size: clamp(0.95rem, 2vw, 1.4rem);
            color: #fff;
            margin: 0 0 24px;
            line-height: 1.5;
            text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.35);
        }

        /* ===== MOBILE ===== */
        @media (max-width: 760px) {
            .section-6__ {
                border-radius: 0;
            }

            .section-6__content {
                position: static;
                transform: none;
                max-width: 100%;
                padding: 24px 20px 0 20px;
                background: transparent;
                backdrop-filter: none;
                text-align: center;
            }

            .section-6__title {
                font-size: 1.8rem;
                color: #333;
                text-shadow: none;
            }

            .section-6__description {
                margin-bottom: 0;
                font-size: 1.1rem;
                color: #555;
                text-shadow: none;
            }

            .section-6__image {
                width: 95%;
                margin: auto;
                height: auto;
                display: block;
                border-radius: 20px;
            }
        }

        @media (max-width: 480px) {
            .section-6__title {
                font-size: 1.5rem;
            }

            .section-6__description {
                font-size: 1rem;
            }
        }
    </style>

    <style>
        .pdp-row-product {
            margin-left: auto;
            margin-right: auto;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            width: 100%
        }

        .tw-text-2xl {
            font-size: 32px;
            font-weight: 600;
            line-height: 40px
        }

        .pdp-product-title {
            --tw-text-opacity: 1;
            color: rgb(0 0 0/var(--tw-text-opacity));
            max-width: 56rem;
            text-align: center
        }

        .tw-text-lg {
            font-size: 20px;
            font-weight: 700;
            line-height: 28px
        }

        .pdp-product-description {
            --tw-text-opacity: 1;
            color: rgb(138 138 138/var(--tw-text-opacity));
            font-size: 14px;
            line-height: 22px;
            margin-top: 1rem;
            max-width: 56rem;
            text-align: center
        }

        @media (min-width:576px) {
            .pdp-row-product {
                max-width: 576px
            }

            .tw-text-2xl {
                font-size: 32px;
            }
        }

        @media (min-width:768px) {
            .pdp-row-product {
                max-width: 768px
            }

            .tw-text-2xl {
                font-size: 32px;
            }

        }



        @media (min-width:992px) {
            .pdp-row-product {
                max-width: 992px
            }

            .tw-text-2xl {
                font-size: 32px;
            }
        }

        @media (min-width:1200px) {
            .pdp-row-product {
                max-width: 1200px
            }

            .tw-text-2xl {
                font-size: 32px;
            }
        }

        @media (min-width:1536px) {
            .pdp-row-product {
                max-width: 1536px
            }

            .tw-text-2xl {
                font-size: 32px;
            }
        }

        .pdp-row-product {
            align-items: center;
            display: flex;
            gap: 1.5rem;
            justify-content: space-between;
            margin-bottom: 2rem;
            margin-top: 2rem
        }

        .reverse-row-product {
            flex-direction: row-reverse;
        }

        @media not all and (min-width:992px) {
            .pdp-row-product {
                flex-direction: column-reverse
            }
        }

        @media (min-width:992px) {
            .pdp-row-product {
                gap: 6rem
            }
        }

        .pdp-row-product-image {
            max-width: 30rem;
            object-fit: contain;
            width: 100%;
            border-radius: 20px;
        }

        .pdp-row-product-content {
            display: flex;
            flex-direction: column;
            max-width: 28rem;
            width: 100%
        }

        .pdp-row-product-content * {
            text-align: left
        }

        @media (min-width:992px) {
            .pdp-row-product.is-reverse .pdp-row-product-image {
                order: 1
            }

            .pdp-row-product.is-reverse .pdp-row-product-content {
                order: 2
            }
        }

        .pdp-row-product-content {
            display: flex;
            flex-direction: column;
            max-width: 28rem;
            width: 100%
        }

        .pdp-row-product-content * {
            text-align: left
        }

        @media (min-width:992px) {
            .pdp-row-product.is-reverse .pdp-row-product-image {
                order: 1
            }

            .pdp-row-product.is-reverse .pdp-row-product-content {
                order: 2
            }
        }

        @media (max-width:768px) {
            .pdp-row-product-image {
                width: 100%;
                aspect-ratio: 9 / 6;
                object-fit: cover;
            }
        }
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="product-header" aria-label="Cabeçalho do produto">
            <header class="product-header__banner">
                <figure style="width:100%;height:100%;margin:0;">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/header.jpg"
                        alt="Banner do produto" class="product-header__banner-img" loading="eager">
                </figure>

                <div class="product-header__badge" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo.png"
                        alt="imagem png com ícone da marca" class="product-header__badge-img">
                </div>
            </header>

            <article class="product-header__body">
                <small class="product-header__brand">Marca</small>
                <h1 class="product-header__title">
                    TÍTULO DO PRODUTO GAMERE (Nome, modelo, diferencial...)
                </h1>
                <p class="product-header__subtitle">
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto">
            <picture>
                <source media="(max-width: 760px)"
                    srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-2.png"
                    width="780" height="400">
                <img class="section-6__image"
                    src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-1.png"
                    alt="Caderno Funny Cat com estampa de gatinhos, capa colorida e espiral" width="1600" height="650"
                    loading="eager" fetchpriority="high" decoding="async">
            </picture>
            <div class="section-6__content">
                <h1 class="section-6__title">Caderno Funny Cat</h1>
                <p class="section-6__description">Organize seus estudos com fofura e estilo!</p>
            </div>
        </section>

        <div class="pdp-row-product">
            <div class="pdp-row-product-content">
                <h3 class="pdp-product-title tw-text-2xl">
                    A garantia de que o que está por trás das paredes nunca será um problema
                </h3>
                <p class="pdp-product-description">
                    Ao escolher um condutor que une a máxima segurança contra incêndios, a eficiência energética para
                    seus equipamentos de alta potência e a flexibilidade necessária para uma instalação ágil, você
                    garante a proteção do seu patrimônio e a tranquilidade de saber que sua estrutura elétrica foi feita
                    para durar uma vida inteira, sem surpresas na conta de luz ou a necessidade de reformas precoces
                </p>
            </div>
            <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao4.jpg"
                alt="Eletricista com capacete branco e colete laranja em obra garantindo qualidade e segurança Corfio"
                class="pdp-row-product-image" />
        </div>

        <p
            style="color: #8a8a8a; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty; text-align: center; padding: 30px 0;">
            IMAGENS MERAMENTE ILUSTRATIVAS</p>
    </div>
</div>`,
  css: ``
}
);
