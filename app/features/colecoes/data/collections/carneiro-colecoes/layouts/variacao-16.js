// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "variacao-16",
  name: "Variação 16",
  html: `<div class="lp-container">
    <meta charset="UTF-8">
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        .pdp {
            width: 100%;
            display: flex;
            flex-direction: column;
            font-family: Roboto, sans-serif;
        }

        .pdp * {
            box-sizing: border-box;
            margin: 0;
        }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&amp;display=swap"
        rel="stylesheet">
    <title>PDP - Vassoura Jardim Tramontina 18 Dentes</title>
    <!-- ---------------------------------------- ÁREA PARA COLOCAR STYLES ----------------------------------------------------------- -->

    <style>
        /*inicio-area-de-faq*/
        #faq-section {
            width: 100%;
            padding: 2rem 16px;
            box-sizing: border-box;
            margin: 0 auto 25px;
            padding-top: 0;
            font-family: sans-serif;
        }

        #faq-section__header {
            text-align: center;
            margin: 1rem 0;
        }

        #faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #333;
            margin: 0 0 12px;
            line-height: 98%;
        }

        #faq-section__subtitle {
            font-size: 1rem;
            color: #666;
            margin: 0;
        }

        #faq-section__list {
            list-style: none;
            margin: 0 auto;
            padding: 0;
            max-width: 60rem;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        #faq-section__item {
            background: #fff;
            border: 1px solid #e5e5e5;
            border-radius: 12px;
            overflow: hidden;
        }

        #faq-section__item summary {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 16px 20px;
            cursor: pointer;
            list-style: none;
        }

        #faq-section__item summary::-webkit-details-marker {
            display: none;
        }

        #faq-section__item summary:hover {
            background: #f9f9f9;
        }

        #faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #333;
            flex: 1;
        }

        #faq-section__q-text:hover {
            color: #ea5b0c;
        }

        #faq-section__icon {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
            position: relative;
        }

        #faq-section__icon::before,
        #faq-section__icon::after {
            content: '';
            position: absolute;
            background: #888;
            border-radius: 2px;
            transition: transform 0.25s ease, opacity 0.25s ease;
        }

        #faq-section__icon::before {
            width: 12px;
            height: 1.5px;
            top: 9px;
            left: 4px;
        }

        #faq-section__icon::after {
            width: 1.5px;
            height: 12px;
            top: 4px;
            left: 9px;
        }

        #faq-section__item[open] #faq-section__icon::after {
            transform: rotate(90deg);
            opacity: 0;
        }

        #faq-section__a-inner {
            padding: 14px 20px 16px;
            border-top: 1px solid #e5e5e5;
        }

        #faq-section__a-text {
            font-size: 0.9rem;
            color: #555;
            line-height: 1.6;
            margin: 0;
        }

        @media (max-width: 480px) {
            #faq-section__q-text {
                font-size: 0.9rem;
            }
        }

        /*final-area-de-faq*/
    </style>

    <style>
        .product-header-2 {
            --ph2-color-brand: #ff9900;
            --ph2-color-ink: #203025;
            --ph2-color-muted: #5f6b61;
            --ph2-color-soft: #f4f8f0;
            --ph2-color-line: #dde8d8;
            --badge-size: 8rem;
            --banner-height: 180px;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            position: relative;
            font-family: sans-serif;
            border-bottom: 1px solid var(--ph2-color-line);
            container-type: inline-size;
        }

        .product-header__banner-2 {
            width: 100%;
            height: var(--banner-height);
            position: relative;
            display: flex;
            justify-content: center;
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
            background-color: var(--ph2-color-brand);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            z-index: 10;
            box-shadow: 0 1rem 2rem rgba(32, 48, 37, 0.16);
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
            background: #ffffff;
        }

        .product-header__brand-2 {
            color: var(--ph2-color-brand);
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
            color: var(--ph2-color-ink);
        }

        .product-header__title-emphasis-2 {
            font-weight: 700;
            display: block;
        }

        .product-header__subtitle-2 {
            color: var(--ph2-color-muted);
            font-size: clamp(0.95rem, 2vw, 1.1rem);
            line-height: 1.65;
            margin-top: 1.25rem;
            max-width: 48rem;
            text-wrap: pretty;
        }

        .pdp__image-note {
            color: #64705f;
            font-family: sans-serif;
            font-size: clamp(1rem, 2vw, 1.2rem);
            padding: 2rem 0;
            text-align: center;
            text-wrap: pretty;
            background: #f8faf6;
            border-top: 1px solid var(--ph2-color-line);
            border-bottom: 1px solid var(--ph2-color-line);
        }

        @media (min-width: 768px) {
            .product-header-2 {
                --banner-height: 250px;
            }
        }
    </style>

    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .section-24 {
            --s24-color-brand: #ff9900;
            --s24-color-ink: #202124;
            --s24-color-muted: #62666d;
            --s24-color-soft: #f4f5f2;
            --s24-color-surface: #ffffff;
            --s24-color-line: #d9ddd3;
            --s24-color-brand-soft: #fff2d9;
            --s24-color-brand-strong: #9c5d00;
            width: 100%;
            margin: 0;
            padding: 2rem 1rem;
            color: var(--s24-color-ink);
            background: var(--s24-color-soft);
            font-family: Arial, Helvetica, sans-serif;
        }

        .section-24,
        .section-24__input,
        .section-24__container,
        .section-24__content,
        .section-24__options,
        .section-24__button,
        .section-24__visual,
        .section-24__frame,
        .section-24__panel,
        .section-24__image,
        .section-24__caption,
        .section-24__message {
            box-sizing: border-box;
        }

        .section-24__input {
            position: absolute;
            width: 1px;
            height: 1px;
            opacity: 0;
            pointer-events: none;
        }

        .section-24__container {
            width: 100%;
            display: grid;
            gap: 1.5rem;
            align-items: start;
        }

        .section-24__content {
            width: 100%;
            display: grid;
            gap: 1rem;
            align-items: start;
        }

        .section-24__button-title,
        .section-24__button-text,
        .section-24__message {
            margin: 0;
            min-width: 0;
            overflow-wrap: anywhere;
        }

        .section-24__options {
            width: 100%;
            display: grid;
            gap: 1rem;
            align-items: start;
            margin-top: 0.5rem;
        }

        .section-24__button {
            position: relative;
            width: 100%;
            display: grid;
            gap: 0.5rem;
            align-items: start;
            padding: 1rem;
            border: 1px solid var(--s24-color-line);
            border-radius: 0.5rem;
            color: var(--s24-color-ink);
            background: var(--s24-color-surface);
            cursor: pointer;
            overflow: hidden;
            transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease, transform 180ms ease;
        }

        .section-24__button::before {
            position: absolute;
            top: 0.5rem;
            bottom: 0.5rem;
            left: 0;
            width: 0.25rem;
            border-radius: 0 0.5rem 0.5rem 0;
            background: var(--s24-color-brand);
            content: "";
            opacity: 0;
            transform: scaleY(0.4);
            transform-origin: center;
            transition: opacity 180ms ease, transform 180ms ease;
        }

        .section-24__button:hover {
            border-color: var(--s24-color-brand);
            box-shadow: 0 0.5rem 1.5rem rgba(32, 33, 36, 0.1);
            transform: translateY(-0.125rem);
        }

        .section-24__button:active {
            transform: scale(0.99);
        }

        .section-24__button-title {
            position: relative;
            z-index: 1;
            font-size: clamp(1rem, 2.7vw, 1.1875rem);
            font-weight: 800;
            line-height: 1.25;
            transition: color 180ms ease;
        }

        .section-24__button-text {
            position: relative;
            z-index: 1;
            color: var(--s24-color-muted);
            font-size: clamp(0.875rem, 2.3vw, 1rem);
            line-height: 1.45;
        }

        .section-24__visual {
            width: 100%;
            margin: 0;
            display: grid;
            gap: 1rem;
            align-items: start;
        }

        .section-24__frame {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 9;
            overflow: hidden;
            border: 1px solid var(--s24-color-line);
            border-radius: 0.5rem;
            background: var(--s24-color-surface);
            box-shadow: 0 1rem 2rem rgba(32, 33, 36, 0.08);
        }

        .section-24__panel {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            pointer-events: none;
            transform: translateY(0.5rem);
            transition: opacity 220ms ease, transform 220ms ease;
        }

        .section-24__image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: saturate(0.92);
            transform: scale(1.04);
            transition: filter 420ms ease, transform 420ms ease;
        }

        .section-24__caption {
            position: relative;
            min-height: 4rem;
            padding: 1rem;
            border-left: 0.25rem solid var(--s24-color-brand);
            border-radius: 0.5rem;
            color: var(--s24-color-ink);
            background: var(--s24-color-surface);
            box-shadow: 0 0.5rem 1rem rgba(32, 33, 36, 0.06);
        }

        .section-24__message {
            position: absolute;
            inset: 1rem;
            color: var(--s24-color-ink);
            font-size: clamp(0.875rem, 2.2vw, 1rem);
            font-weight: 700;
            line-height: 1.4;
            opacity: 0;
            transform: translateY(0.5rem);
            transition: opacity 180ms ease, transform 180ms ease;
        }

        #section-24-view-1:checked~.section-24__container .section-24__panel--one,
        #section-24-view-2:checked~.section-24__container .section-24__panel--two,
        #section-24-view-3:checked~.section-24__container .section-24__panel--three {
            z-index: 2;
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
        }

        #section-24-view-1:checked~.section-24__container .section-24__panel--one .section-24__image,
        #section-24-view-2:checked~.section-24__container .section-24__panel--two .section-24__image,
        #section-24-view-3:checked~.section-24__container .section-24__panel--three .section-24__image {
            filter: saturate(1);
            transform: scale(1);
        }

        #section-24-view-1:checked~.section-24__container .section-24__message--one,
        #section-24-view-2:checked~.section-24__container .section-24__message--two,
        #section-24-view-3:checked~.section-24__container .section-24__message--three {
            opacity: 1;
            transform: translateY(0);
        }

        #section-24-view-1:checked~.section-24__container .section-24__button--one,
        #section-24-view-2:checked~.section-24__container .section-24__button--two,
        #section-24-view-3:checked~.section-24__container .section-24__button--three {
            border-color: var(--s24-color-brand);
            background: var(--s24-color-brand-soft);
            box-shadow: 0 0.5rem 1.5rem rgba(32, 33, 36, 0.12), inset 0 0 0 2px var(--s24-color-brand);
            transform: translateY(-0.125rem);
        }

        #section-24-view-1:checked~.section-24__container .section-24__button--one::before,
        #section-24-view-2:checked~.section-24__container .section-24__button--two::before,
        #section-24-view-3:checked~.section-24__container .section-24__button--three::before {
            opacity: 1;
            transform: scaleY(1);
        }

        #section-24-view-1:checked~.section-24__container .section-24__button--one .section-24__button-title,
        #section-24-view-2:checked~.section-24__container .section-24__button--two .section-24__button-title,
        #section-24-view-3:checked~.section-24__container .section-24__button--three .section-24__button-title {
            color: var(--s24-color-brand-strong);
        }

        #section-24-view-1:focus-visible~.section-24__container .section-24__button--one,
        #section-24-view-2:focus-visible~.section-24__container .section-24__button--two,
        #section-24-view-3:focus-visible~.section-24__container .section-24__button--three {
            outline: 2px solid var(--s24-color-brand);
            outline-offset: 4px;
        }

        @media (min-width: 576px) {

            .section-24__container {
                gap: 2rem;
            }
        }

        @media (min-width: 768px) {

            .section-24__container {
                grid-template-columns: minmax(0, 1fr);
                gap: .5rem;
            }

            .section-24__content {
                order: 2;
            }

            .section-24__visual {
                order: 1;
            }

            .section-24__options {
                grid-template-columns: repeat(3, minmax(0, 1fr));
            }

            .section-24__button-title {
                font-size: clamp(0.875rem, 1.8vw, 1rem);
            }

            .section-24__button-text {
                font-size: clamp(0.75rem, 1.6vw, 0.875rem);
            }

            .section-24__frame {
                aspect-ratio: 16 / 9;
            }
        }

        @media (min-width: 992px) {

            .section-24__container {
                grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
                gap: 3rem;
            }

            .section-24__content {
                order: 1;
                align-self: center;
            }

            .section-24__visual {
                order: 2;
            }

            .section-24--reverse .section-24__content {
                order: 2;
            }

            .section-24--reverse .section-24__visual {
                order: 1;
            }

            .section-24__options {
                grid-template-columns: minmax(0, 1fr);
            }

            .section-24__button {
                padding: 1.5rem;
            }

            .section-24__button-title {
                font-size: clamp(1rem, 2.7vw, 1.1875rem);
            }

            .section-24__button-text {
                font-size: clamp(0.875rem, 2.3vw, 1rem);
            }
        }

        @media (min-width: 1200px) {
            .section-24__container {
                gap: 3rem;
            }

            .section-24__frame {
                aspect-ratio: 16 / 9;
            }
        }
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <article class="pdp" id="pdp" aria-labelledby="product-main-title"> <!-- HTML fica dentro dessa div PDP -->

        <section class="product-header-2" aria-label="Cabeçalho do produto">
            <figure class="product-header__banner-2">
                <picture>
                    <source media="(max-width: 320px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/509702-00.webp?ims=288x">
                    <source media="(max-width: 375px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/509702-00.webp?ims=343x">
                    <source media="(max-width: 425px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/509702-00.webp?ims=393x">
                    <source media="(max-width: 768px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/509702-00.webp?ims=736x">
                    <source media="(max-width: 1024px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/509702-00.webp?ims=992x">
                    <source media="(max-width: 1440px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/509702-00.webp?ims=1248x">
                    <img class="product-header__banner-img-2"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/509702-00.webp"
                        alt="Vassoura de jardim Tramontina para limpeza de gramado" loading="eager" decoding="async">
                </picture>
                <div class="product-header__badge-2" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/tramontina/tramontina-logo.png"
                        alt="Logo Tramontina" class="product-header__badge-img-2" loading="lazy">
                </div>
            </figure>
            <article class="product-header__body-2">
                <small class="product-header__brand-2">── tramontina ──</small>
                <h2 class="product-header__title-2" id="product-main-title">
                    <span>Vassoura de jardim Tramontina</span>
                    <strong class="product-header__title-emphasis-2">18 dentes e cabo de madeira 120 cm</strong>
                </h2>
                <p class="product-header__subtitle-2">
                    Recolha folhas secas, sobras de grama e resíduos leves com uma vassoura prática para áreas
                    externas. A estrutura em polipropileno resistente e o cabo envernizado ajudam a manter o jardim
                    limpo com leveza no uso diário.
                </p>
            </article>
        </section>

        <section class="section-24" aria-labelledby="section-24-title">
            <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-1"
                aria-label="Mostrar imagem de visão geral" checked="">
            <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-2"
                aria-label="Mostrar imagem de detalhe">
            <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-3"
                aria-label="Mostrar imagem de uso">

            <article class="section-24__container">
                <section class="section-24__content" aria-labelledby="section-24-title">
                    <nav class="section-24__options" aria-label="Escolha a imagem exibida">
                        <label class="section-24__button section-24__button--one" for="section-24-view-1">
                            <span class="section-24__button-title">18 dentes fixos</span>
                            <span class="section-24__button-text">Recolhe folhas, grama solta e resíduos leves com mais
                                praticidade.</span>
                        </label>

                        <label class="section-24__button section-24__button--two" for="section-24-view-2">
                            <span class="section-24__button-title">Plástico resistente</span>
                            <span class="section-24__button-text">Polipropileno de alta resistência, leve para usar e
                                feito para
                                durar.</span>
                        </label>

                        <label class="section-24__button section-24__button--three" for="section-24-view-3">
                            <span class="section-24__button-title">Cabo de 120 cm</span>
                            <span class="section-24__button-text">Madeira renovável com acabamento envernizado e toque
                                mais
                                liso.</span>
                        </label>
                    </nav>
                </section>

                <figure class="section-24__visual" aria-label="Imagens alternáveis do produto">
                    <div class="section-24__frame">
                        <!-- IMG 1-->
                        <div class="section-24__panel section-24__panel--one">
                            <picture>
                                <source media="(max-width: 320px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-uso-gramado-509702-03.webp?ims=254x">
                                <source media="(max-width: 375px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-uso-gramado-509702-03.webp?ims=309x">
                                <source media="(max-width: 425px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-uso-gramado-509702-03.webp?ims=359x">
                                <source media="(max-width: 768px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-uso-gramado-509702-03.webp?ims=702x">
                                <source media="(max-width: 1024px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-uso-gramado-509702-03.webp?ims=386x">
                                <source media="(max-width: 1440px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-uso-gramado-509702-03.webp?ims=495x">
                                <img class="section-24__image"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-uso-gramado-509702-03.webp"
                                    alt="Imagem de visão geral do produto" width="1200" height="900" loading="lazy"
                                    decoding="async">
                            </picture>
                        </div>
                        <!-- IMG 2-->
                        <div class="section-24__panel section-24__panel--two">
                            <picture>
                                <source media="(max-width: 320px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-conjunto-ferramentas-509702-02.webp?ims=265x">
                                <source media="(max-width: 375px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-conjunto-ferramentas-509702-02.webp?ims=322x">
                                <source media="(max-width: 425px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-conjunto-ferramentas-509702-02.webp?ims=374x">
                                <source media="(max-width: 768px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-conjunto-ferramentas-509702-02.webp?ims=731x">
                                <source media="(max-width: 1024px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-conjunto-ferramentas-509702-02.webp?ims=402x">
                                <source media="(max-width: 1440px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-conjunto-ferramentas-509702-02.webp?ims=515x">
                                <img class="section-24__image"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-conjunto-ferramentas-509702-02.webp"
                                    alt="Imagem aproximada do acabamento do produto" width="1200" height="900"
                                    loading="lazy" decoding="async">
                            </picture>
                        </div>
                        <!-- IMG 3-->
                        <div class="section-24__panel section-24__panel--three">
                            <picture>
                                <source media="(max-width: 320px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-lifestyle-509702-01.webp?ims=265x">
                                <source media="(max-width: 375px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-lifestyle-509702-01.webp?ims=322x">
                                <source media="(max-width: 425px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-lifestyle-509702-01.webp?ims=374x">
                                <source media="(max-width: 768px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-lifestyle-509702-01.webp?ims=731x">
                                <source media="(max-width: 1024px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-lifestyle-509702-01.webp?ims=402x">
                                <source media="(max-width: 1440px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-lifestyle-509702-01.webp?ims=515x">
                                <img class="section-24__image"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-lifestyle-509702-01.webp"
                                    alt="Imagem do produto em contexto de uso" width="1200" height="900" loading="lazy"
                                    decoding="async">
                            </picture>
                        </div>
                    </div>

                    <figcaption class="section-24__caption">
                        <span class="section-24__message section-24__message--one">Mais alcance sobre folhas e resíduos
                            leves.</span>
                        <span class="section-24__message section-24__message--two">Leveza e resistência para a rotina do
                            jardim.</span>
                        <span class="section-24__message section-24__message--three">Cabo longo, toque liso e acabamento
                            envernizado.</span>
                    </figcaption>
                </figure>
            </article>
        </section>

        <p class="pdp__image-note">
            IMAGENS MERAMENTE ILUSTRATIVAS
        </p>

        <!-- Área de FAQ -->
        <section id="faq-section" aria-labelledby="faq-section__title">
            <div id="faq-section__header">
                <h2 id="faq-section__title">Dúvidas Frequentes</h2>
            </div>
            <ul id="faq-section__list" role="list">
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> A vassoura de jardim Tramontina 18 dentes serve para qual tipo
                                de limpeza? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> A vassoura de jardim Tramontina 18 dentes é indicada para
                                recolher folhas secas, sobras de grama cortada e outros detritos presentes no gramado.
                                Ela ajuda a manter o jardim limpo com mais praticidade no dia a dia. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> A vassoura plástica Tramontina pode ser usada em gramado?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. Ela é ideal para limpeza de gramados, principalmente para
                                remover folhas caídas e resíduos leves sem dificultar o manuseio. Isso facilita a
                                conservação de áreas externas. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> O cabo da vassoura de jardim Tramontina é resistente? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. O cabo tem 120 cm, é produzido em madeira de origem
                                renovável e possui acabamento envernizado. Esse acabamento melhora a apresentação,
                                realça a tonalidade da madeira e deixa o toque mais liso. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> A vassoura Tramontina 77850/681 é leve para usar no jardim?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. A vassoura é descrita como leve e prática, sendo uma boa
                                opção para recolher grama cortada, folhas levadas pelo vento e outros detritos no
                                gramado sem tornar a limpeza pesada. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Qual é o material da vassoura de jardim Tramontina laranja?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> A parte plástica é fabricada em polipropileno de alta
                                resistência, material que contribui para maior durabilidade e bom acabamento. Isso torna
                                o produto adequado para uso em áreas externas. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Quantos dentes tem a vassoura plástica Tramontina? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> A vassoura possui 18 dentes fixos, estrutura indicada para
                                juntar folhas, grama cortada e resíduos espalhados pelo gramado. Esse formato ajuda a
                                tornar a limpeza mais eficiente. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> A vassoura de jardim Tramontina acompanha cabo? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. Ela acompanha cabo de madeira de 120 cm, com acabamento
                                envernizado. O produto já vem pronto para auxiliar na limpeza e manutenção do jardim.
                            </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Qual é a garantia da vassoura jardim Tramontina 18 dentes?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> A vassoura possui 90 dias de garantia legal contra vícios ou
                                defeitos de fabricação. Isso oferece mais segurança na compra e no uso do produto. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Como descartar a vassoura Tramontina e sua embalagem? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O descarte do produto e da embalagem deve seguir as orientações
                                de reciclagem vigentes. Assim, você contribui para um descarte mais adequado após o uso.
                            </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->
            </ul>
        </section>

    </article>
</div>`,
  css: ``
}
);
