// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "variacao-20",
  name: "Variação 20",
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
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet">
    <title>PDP - eFácil</title>
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
        /* ===== HERO SECTION — VARIÁVEIS ===== */
        .section-6 {
            --pos-y: 50%;
            --pos-x: 10%;
            --color-title: #ffe178;
            --bg-box: rgba(0, 0, 0, 0.33);

            width: 100%;
            position: relative;

            overflow: hidden;
            background-color: #fff6ed;
        }

        /* ===== IMAGEM ===== */
        .section-6__image {
            width: 100%;
            height: auto;
            display: block;

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
                padding: 12px 20px 12px 20px;
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
                margin: 1rem auto;
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
    </style>

    <style>
        :root {
            --s2-color-bg: #5C1A22;
            --s2-color-text: #F5EFE6;
            --s2-color-accent: #C8A96E;
        }

        .section-2 {
            background-color: var(--s2-color-bg);
            padding: 2rem 1rem;
        }

        .section-2__container {
            width: 100%;
        }

        .section-2__content {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .section-2__image-block {
            width: 100%;
            aspect-ratio: 16/9;
            border-radius: 8px;
            overflow: hidden;
        }

        .section-2__image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .section-2__text-block {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .section-2__title {
            font-family: Georgia, serif;
            font-size: clamp(1.5rem, 4vw, 2.25rem);
            color: var(--s2-color-text);
            margin: 0;
        }

        .section-2__divider {
            width: 3rem;
            height: 2px;
            background-color: var(--s2-color-accent);
            border: none;
            margin: 0;
        }

        .section-2__paragraph {
            font-size: clamp(0.875rem, 2vw, 1rem);
            color: var(--s2-color-text);
            line-height: 1.7;
            margin: 0;
            opacity: 0.9;
        }

        @media (min-width: 768px) {
            .section-2__container {
                max-width: 768px;
                margin: 0 auto;
            }

            .section-2__content {
                flex-direction: row;
                align-items: center;
                gap: 2.5rem;
            }

            .section-2__image-block {
                flex: 0 0 42%;
                aspect-ratio: 4/3;
            }

            .section-2__text-block {
                flex: 1;
            }
        }

        @media (min-width: 992px) {
            .section-2 {
                padding: 3rem 1.5rem;
            }

            .section-2__container {
                max-width: 992px;
            }
        }

        @media (min-width: 1200px) {
            .section-2__container {
                max-width: 1200px;
            }
        }

        @media (min-width: 1400px) {
            .section-2__container {
                max-width: 1400px;
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
            <header class="product-header__banner-2">
                <figure style="width:100%;height:100%;margin:0;">
                    <img src=" https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/coquetel-composto-domecq-garrafas-bar-fundo-desfocado-lifestyle-917580-00.webp"
                        alt="Garrafas e luzes desfocadas em segundo plano de balcão de bar iluminado"
                        class="product-header__banner-img-2" loading="eager">
                </figure>
                <div class="product-header__badge-2" role="img" aria-label="Logo da marca">
                    <img src=" https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/logo-pernod-ricard-marca-fabricante-fornecedor-logo-pernod.webp"
                        alt="Ícone da marca" class="product-header__badge-img-2">
                </div>
            </header>
            <article class="product-header__body-2">
                <small class="product-header__brand-2">── pernod ──</small>
                <h2 class="product-header__title-2">
                    <span>Conhaque Domecq 1L</span>
                </h2>
                <p class="product-header__subtitle-2">
                    Domecq combina aroma frutado, sabor intenso e presença marcante em uma bebida feita para ser
                    apreciada com calma, pura ou com gelo
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto">
            <picture>
                <source media="(max-width: 760px)"
                    srcset=" https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/coquetel-composto-domecq-pernod-ricard-1l-garrafa-copo-dosador-ambiente-917580-01-2.webp"
                    width="780" height="400">
                <img class="section-6__image"
                    src=" https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/coquetel-composto-domecq-pernod-ricard-1l-garrafa-balcao-bar-lifestyle-917580-01-1.webp"
                    alt="Garrafa Domecq 1L sobre balcão de bar com dosador, copo com gelo e azeitonas" width="1600"
                    height="650" loading="lazy" fetchpriority="high" decoding="async">
            </picture>
            <div class="section-6__content">
                <h2 class="section-6__title">Sabor intenso, aroma frutado</h2>
                <p class="section-6__description">Elaborado com destilado vínico e amadurecido em carvalho</p>
            </div>
        </section>

        <section class="section-2" aria-label="Origem e tradição do Domecq Coquetel Composto">
            <div class="section-2__container">
                <div class="section-2__content">
                    <div class="section-2__image-block">
                        <figure>
                            <img class="section-2__image"
                                src=" https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/coquetel-composto-domecq-pernod-ricard-1l-garrafa-copo-bebida-917580-02.webp"
                                alt="Garrafa de coquetel composto Domecq 1L ao lado de copo baixo com a bebida pura e gelo"
                                width="800" height="600" loading="lazy">
                        </figure>
                    </div>
                    <div class="section-2__text-block">
                        <h2 class="section-2__title">Origem brasileira e tradição</h2>
                        <hr class="section-2__divider" aria-hidden="true">
                        <p class="section-2__paragraph">
                            Domecq traz uma composição cuidadosamente elaborada para destacar aroma frutado, sabor
                            intenso e presença marcante
                        </p>
                        <p class="section-2__paragraph">
                            Uma bebida de 38% de graduação alcoólica, ideal para momentos de apreciação
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-24" aria-labelledby="section-24-title" style="background-color: #fff6ed;">
            <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-1"
                aria-label="Mostrar imagem de visão geral" checked>
            <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-2"
                aria-label="Mostrar imagem de detalhe">
            <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-3"
                aria-label="Mostrar imagem de uso">

            <article class="section-24__container">
                <section class="section-24__content" aria-labelledby="section-24-title">
                    <nav class="section-24__options" aria-label="Escolha a imagem exibida">
                        <label class="section-24__button section-24__button--one" for="section-24-view-1">
                            <span class="section-24__button-title">Sabor para apreciar</span>
                            <span class="section-24__button-text">Uma bebida intensa, perfeita para degustar com
                                calma</span>
                        </label>

                        <label class="section-24__button section-24__button--two" for="section-24-view-2">
                            <span class="section-24__button-title">Toque de carvalho</span>
                            <span class="section-24__button-text">Elaborado com destilado vínico, carvalho e extrato de
                                amêndoas</span>
                        </label>

                        <label class="section-24__button section-24__button--three" for="section-24-view-3">
                            <span class="section-24__button-title">Aroma envolvente</span>
                            <span class="section-24__button-text">Notas frutadas que valorizam o momento de
                                consumo</span>
                        </label>
                    </nav>
                </section>

                <figure class="section-24__visual" aria-label="Imagens alternáveis do produto">
                    <div class="section-24__frame">
                        <!-- IMG 1-->
                        <div class="section-24__panel section-24__panel--one">
                            <img class="section-24__image"
                                src=" https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/coquetel-composto-domecq-copo-bebida-tabua-frios-petiscos-lifestyle-917580-03-1.webp"
                                width="1200" height="900" loading="lazy"
                                alt="Copo de Domecq ao lado de tábua com presunto cru, queijos, uvas e nozes em ambiente rústico"
                                decoding="async">
                        </div>
                        <!-- IMG 2-->
                        <div class="section-24__panel section-24__panel--two">
                            <img class="section-24__image"
                                src=" https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/coquetel-composto-domecq-envelhecimento-barricas-barris-carvalho-917580-03-2.webp"
                                width="1200" height="900" loading="lazy"
                                alt="Fileira de barris de carvalho usados no envelhecimento e maturação da bebida Domecq"
                                decoding="async">
                        </div>
                        <!-- IMG 3-->
                        <div class="section-24__panel section-24__panel--three">
                            <img class="section-24__image"
                                src=" https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/coquetel-composto-domecq-copo-baixo-bebida-gelo-destaque-917580-03-3.webp"
                                width="1200" height="900" loading="lazy"
                                alt="Copo baixo com pedras de gelo e coquetel composto Domecq servido sobre balcão de madeira"
                                decoding="async">
                        </div>
                    </div>

                    <figcaption class="section-24__caption">
                        <span class="section-24__message section-24__message--one">Ideal para apreciar com calma, puro
                            ou com gelo</span>
                        <span class="section-24__message section-24__message--two">Composição com destilado vínico,
                            carvalho e extrato de amêndoas</span>
                        <span class="section-24__message section-24__message--three">Aroma marcante e frutado para
                            momentos de degustação</span>
                    </figcaption>
                </figure>
            </article>
        </section>

        <p style="color: #8a8a8a; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty;
            text-align: center; padding: 30px 0;">
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
                            <h3 id="faq-section__q-text"> Domecq é indicado para consumir de que forma? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Domecq é indicado para ser apreciado puro ou com gelo. Essa
                                forma de consumo valoriza o sabor inigualável, o aroma marcante e frutado e as
                                características obtidas pelo envelhecimento em barricas de carvalho. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> O Domecq pode ser tomado com gelo? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. Domecq pode ser consumido com gelo, mantendo uma
                                experiência de degustação simples e direta. É uma boa escolha para quem prefere uma
                                bebida mais refrescante sem esconder suas características principais. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Qual é o sabor do Domecq? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Domecq tem sabor inigualável, formado pela combinação de
                                destilado vínico, álcool neutro, extrato de carvalho e extrato de amêndoas. Essa
                                composição ajuda a entregar uma bebida intensa e própria para apreciar com calma. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> O aroma do Domecq é mais suave ou marcante? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O aroma do Domecq é marcante e frutado. Essa característica vem
                                do uso de destilados vínicos e do envelhecimento em barricas de carvalho antes do
                                engarrafamento. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Do que o Domecq é feito? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Domecq é composto por álcool neutro, destilado vínico, extrato
                                de carvalho e extrato de amêndoas. A presença do destilado proveniente do vinho é
                                essencial para formar seu sabor característico. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> O Domecq passa por envelhecimento? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. Domecq amadurece em barricas de carvalho antes do
                                engarrafamento. Esse processo contribui para suas características únicas, especialmente
                                no aroma marcante e no perfil de sabor. </p>
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
