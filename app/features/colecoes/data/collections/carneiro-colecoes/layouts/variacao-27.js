// @ts-nocheck
ColLib.registerCollectionLayout('carneiro-colecoes',
{
  id: 'variacao-27',
  name: 'Variação 27',
  html: `<div class="lp-container">
    <meta charset="UTF-8">
    <style>
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
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet">
    <title>Esmalte Impala Cacau Show Ops, Acabou Perolado 7,5 ml - eFácil</title>
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
            color: #231614;
            margin: 0 0 12px;
            line-height: 98%;
        }

        #faq-section__subtitle {
            font-size: 1rem;
            color: #6b5c54;
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
            border: 1px solid #c3bbb1;
            border-radius: 12px;
            overflow: hidden;
        }

        #faq-section__item:hover {
            color: #533025;
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
            background: #f3efe9;
        }

        #faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #231614;
            flex: 1;
        }

        #faq-section__q-text:hover {
            color: #533025;
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
            background: #867268;
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
            border-top: 1px solid #c3bbb1;
        }

        #faq-section__a-text {
            font-size: 0.9rem;
            color: #6b5c54;
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
            color: #533025;
        }

        .product-header__title-2 strong {
            font-weight: 700;
            display: block;
        }

        .product-header__subtitle-2 {
            color: #6b5c54;
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
        .section-3 {
            --s2-color-brand: #533025;
            --s2-color-ink: #231614;
            --s2-color-muted: #6b5c54;
            --s2-color-panel: rgba(255, 255, 255, 0.92);
            width: 100%;
            padding: 0 1rem 1rem;
            font-family: Roboto, Arial, sans-serif;
            color: var(--s2-color-ink);
            overflow-wrap: anywhere;
        }

        .section-3__frame {
            width: 100%;
            position: relative;
            overflow: hidden;
            border-radius: 1.5rem;
            background: #e8e2da;
            box-shadow: 0 1rem 2.5rem rgba(83, 48, 37, 0.14);
        }

        .section-3__media {
            width: 100%;
            margin: 0;
            aspect-ratio: 16 / 9;
        }

        .section-3__picture {
            width: 100%;
            height: 100%;
            display: block;
        }

        .section-3__image {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
        }

        .section-3__callout {
            display: flex;
            align-items: start;
            gap: 1rem;
            margin: 1rem;
            padding: 1.5rem;
            border: 1px solid rgba(83, 48, 37, 0.20);
            border-radius: 1.5rem;
            background: var(--s2-color-panel);
            box-shadow: 0 1rem 2rem rgba(83, 48, 37, 0.12);
        }

        .section-3__icon {
            width: 3.5rem;
            height: 3.5rem;
            flex: 0 0 3.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 1rem;
            color: var(--s2-color-brand);
            background: #eee8e0;
        }

        .section-3__icon-svg {
            width: 2.5rem;
            height: 2.5rem;
            display: block;
        }

        .section-3__title {
            color: var(--s2-color-brand);
            font-size: clamp(1.5rem, 4vw, 2.375rem);
            font-weight: 700;
            line-height: 1.18;
            margin: 0;
            text-wrap: balance;
        }

        .section-3__text {
            color: var(--s2-color-muted);
            font-size: clamp(0.9375rem, 2vw, 1.125rem);
            font-weight: 400;
            line-height: 1.7;
            margin: 1rem 0 0;
            text-wrap: pretty;
        }

        @media (min-width: 576px) {
            .section-3 {
                padding: 0 1.5rem 1rem;
            }
        }

        @media (min-width: 760px) {
            .section-3 {
                padding: 0 2rem 1rem;
            }

            .section-3__callout {
                width: min(48%, 25rem);
                position: absolute;
                top: 50%;
                left: 19rem;
                margin: 0;
                transform: translateY(-50%);
            }

            .section-3__frame {
                outline: 8px solid #533025;
                border: 1px solid #867268;
            }

        }

        @media (min-width: 992px) {
            .section-3 {
                padding: 0 2.5rem 1rem;
            }

            .section-3__callout {
                left: 33rem;
                padding: 2rem;
            }
        }

        @media (min-width: 1200px) {
            .section-3 {
                padding: 0 3rem 1rem;
            }
        }

        @media (min-width: 1400px) {
            .section-3 {
                padding: 0 3rem 1rem;
            }
        }
    </style>

    <style>
        .section-8 {
            --s3-color-brand: #533025;
            --s3-color-ink: #231614;
            --s3-color-muted: #6b5c54;
            --s3-color-soft: #d3d2d0;
            --s3-color-line: #c3bbb1;
            --s3-color-surface: #ffffff;
            width: 100%;
            position: relative;
            padding: 0 1rem 1.5rem;
            font-family: Roboto, Arial, sans-serif;
            color: var(--s3-color-ink);
            overflow-wrap: anywhere;
        }

        .section-8__control {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 1px;
            height: 1px;
            opacity: 0;
            pointer-events: none;
            transform: translate(-50%, -50%);
        }

        .section-8__inner {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            align-items: start;
            gap: 1rem;
            padding: 1rem;
            overflow: hidden;
            border: 1px solid rgba(83, 48, 37, 0.08);
            border-radius: 1.5rem;
            background: var(--s3-color-surface);
            box-shadow: 0 1rem 2.5rem rgba(83, 48, 37, 0.10);
        }

        .section-8__tabs {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            justify-content: center;
            gap: 1rem;
        }

        .section-8__tab {
            min-height: 3.5rem;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            padding: 1rem;
            border: 1px solid var(--s3-color-line);
            border-radius: 999px;
            background: var(--s3-color-surface);
            color: var(--s3-color-brand);
            cursor: pointer;
            transition: background-color 240ms ease, border-color 240ms ease, color 240ms ease, transform 240ms ease;
        }

        .section-8__tab-icon {
            width: 1.75rem;
            height: 1.75rem;
            flex: 0 0 1.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .section-8__tab-icon-svg {
            width: 1.5rem;
            height: 1.5rem;
            display: block;
        }

        .section-8__tab-text {
            color: currentColor;
            font-size: clamp(0.875rem, 1.8vw, 1rem);
            font-weight: 700;
            line-height: 1.4;
            text-align: center;
        }

        .section-8__viewport {
            width: 100%;
            display: grid;
            align-items: start;
            overflow: hidden;
            order: -2;
            border-radius: 1.5rem;
            background: var(--s3-color-brand);
        }

        .section-8__panel {
            width: 100%;
            grid-area: 1 / 1;
            display: grid;
            grid-template-columns: 1fr;
            align-items: start;
            opacity: 0;
            pointer-events: none;
            transform: translateX(1rem);
            transition: opacity 320ms ease, transform 320ms ease;
        }

        .section-8__media {
            width: 100%;
            margin: 0;
            aspect-ratio: 4 / 3;
        }

        .section-8__image {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
        }

        .section-8__content {
            min-width: 0;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;
            padding: 2rem;
            background: linear-gradient(135deg, #6b5c54 0%, var(--s3-color-brand) 100%);
        }

        .section-8__title {
            color: var(--s3-color-surface);
            font-size: clamp(1.75rem, 4.2vw, 2.625rem);
            font-weight: 400;
            line-height: 1.18;
            margin: 0;
            text-wrap: balance;
        }

        .section-8__rule {
            width: 4rem;
            height: 0.125rem;
            margin: 1.5rem 0;
            border-radius: 999px;
            background: var(--s3-color-soft);
        }

        .section-8__copy {
            color: var(--s3-color-soft);
            font-size: clamp(0.9375rem, 2vw, 1.125rem);
            font-weight: 400;
            line-height: 1.7;
            margin: 0;
            text-wrap: pretty;
        }

        .section-8__dots {
            display: flex;
            align-items: center;
            justify-content: center;
            order: -1;
            gap: 1rem;
            margin: 0.5rem 0 0;
        }

        .section-8__dot {
            width: 1rem;
            height: 1rem;
            position: relative;
            border: 1px solid var(--s3-color-brand);
            border-radius: 50%;
            background: var(--s3-color-surface);
            transition: background-color 240ms ease, transform 240ms ease;
        }

        .section-8:has(.section-8__control--protection:checked) .section-8__tab--protection,
        .section-8:has(.section-8__control--care:checked) .section-8__tab--care,
        .section-8:has(.section-8__control--fragrance:checked) .section-8__tab--fragrance,
        .section-8:has(.section-8__control--application:checked) .section-8__tab--application {
            border-color: var(--s3-color-brand);
            background: var(--s3-color-brand);
            color: var(--s3-color-surface);
            transform: translateY(-0.5rem);
        }

        .section-8__tab:has(.section-8__control:focus-visible) {
            outline: 0.125rem solid var(--s3-color-brand);
            outline-offset: 0.25rem;
        }

        .section-8:has(.section-8__control--protection:checked) .section-8__panel--protection,
        .section-8:has(.section-8__control--care:checked) .section-8__panel--care,
        .section-8:has(.section-8__control--fragrance:checked) .section-8__panel--fragrance,
        .section-8:has(.section-8__control--application:checked) .section-8__panel--application {
            opacity: 1;
            pointer-events: auto;
            transform: translateX(0);
            z-index: 1;
        }

        .section-8:has(.section-8__control--protection:checked) .section-8__dot--protection,
        .section-8:has(.section-8__control--care:checked) .section-8__dot--care,
        .section-8:has(.section-8__control--fragrance:checked) .section-8__dot--fragrance,
        .section-8:has(.section-8__control--application:checked) .section-8__dot--application {
            background: var(--s3-color-brand);
            transform: scale(1.25);
        }

        @media (min-width: 576px) {
            .section-8 {
                padding: 0 1.5rem 1.5rem;
            }

            .section-8__tabs {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (min-width: 768px) {
            .section-8 {
                padding: 0 2rem 1.5rem;
            }

            .section-8__inner {
                gap: 1.5rem;
                padding: 1.5rem;
            }

            .section-8__panel {
                grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            }

            .section-8__panel--care,
            .section-8__panel--application {
                direction: rtl;
            }

            .section-8__panel--care .section-8__media,
            .section-8__panel--care .section-8__content,
            .section-8__panel--application .section-8__media,
            .section-8__panel--application .section-8__content {
                direction: ltr;
            }

            .section-8__media {
                height: 100%;
                aspect-ratio: auto;
            }

            .section-8__content {
                min-height: 24rem;
                padding: 3rem;
            }
        }

        @media (min-width: 992px) {
            .section-8 {
                padding: 0 2.5rem 1.5rem;
            }

            .section-8__tabs {
                grid-template-columns: repeat(4, minmax(0, 1fr));
            }
        }

        @media (min-width: 1200px) {
            .section-8 {
                padding: 0 3rem 1.5rem;
            }
        }

        @media (min-width: 1400px) {
            .section-8 {
                padding: 0 3rem 1.5rem;
            }
        }
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="product-header-2" aria-label="Cabeçalho do Esmalte Impala Cacau Show Ops, Acabou">
            <header class="product-header__banner-2">
                <figure style="width:100%;height:100%;margin:0;">
                    <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmalte-impala-cacau-show-ops-acabou-fundo-texturizado-perolado-113619-00.webp"
                        alt="Fundo texturizado bege neutro com ondas suaves da coleção Impala Cacau Show"
                        class="product-header__banner-img-2" loading="eager">
                </figure>
                <div class="product-header__badge-2" role="img" aria-label="Logo da marca Impala">
                    <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/impala-logo.webp"
                        alt="Logo da marca" class="product-header__badge-img-2">
                </div>
            </header>
            <article class="product-header__body-2">
                <small class="product-header__brand-2"> impala </small>
                <h2 class="product-header__title-2">
                    <span>Esmalte Perolado</span>
                    <strong>Ops, Acabou</strong>
                </h2>
                <p class="product-header__subtitle-2">
                    Fragrância de chocolate, alta cobertura e brilho intenso.
                    Secagem rápida e conteúdo de 7,5 ml.
                </p>
            </article>
        </section>

        <section class="section-3" aria-label="Características do Esmalte Impala Cacau Show Ops, Acabou">
            <article class="section-3__frame">
                <figure class="section-3__media">
                    <picture class="section-3__picture">
                        <source media="(max-width: 760px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmalte-impala-cacau-show-ops-acabou-perolado-fundo-infinito-113619-01-2.webp">
                        <img class="section-3__image"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmalte-impala-cacau-show-ops-acabou-perolado-banner-113619-01-1.webp"
                            alt="Esmalte Impala Cacau Show Ops, Acabou perolado posicionado à esquerda em fundo cinza"
                            width="1600" height="650" loading="lazy" decoding="async">
                    </picture>
                </figure>
                <article class="section-3__callout">
                    <span class="section-3__icon" aria-hidden="true">
                        <svg class="section-3__icon-svg" viewBox="0 0 48 48" fill="none" focusable="false">
                            <path d="M24 5.5 39 11v11.5c0 9.5-6.1 16.8-15 20-8.9-3.2-15-10.5-15-20V11l15-5.5Z"
                                stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
                            <path d="m17 24 4.5 4.5L31.5 18" stroke="currentColor" stroke-width="3"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                    <div class="section-3__copy">
                        <h2 class="section-3__title">Fragrância de chocolate</h2>
                        <p class="section-3__text">A coleção Impala Cacau Show combina tons inspirados no chocolate com
                            fragrância de chocolate durante a esmaltação.
                        </p>
                    </div>
                </article>
            </article>
        </section>

        <section class="section-8 section-8--interactive"
            aria-label="Benefícios em detalhes do Esmalte Impala Cacau Show">
            <article class="section-8__inner">
                <nav class="section-8__tabs" aria-label="Escolha um benefício para ver em detalhes">
                    <label class="section-8__tab section-8__tab--protection">
                        <input class="section-8__control section-8__control--protection" type="radio"
                            name="section-3-tabs-b" checked>
                        <span class="section-8__tab-icon" aria-hidden="true">
                            <svg class="section-8__tab-icon-svg" viewBox="0 0 24 24" fill="none" focusable="false">
                                <path d="M12 3.5 19 6v5.5c0 4.4-2.8 7.8-7 9.4-4.2-1.6-7-5-7-9.4V6l7-2.5Z"
                                    stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                                <path d="m9 12 2 2 4-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span class="section-8__tab-text">Alta cobertura</span>
                    </label>

                    <label class="section-8__tab section-8__tab--care">
                        <input class="section-8__control section-8__control--care" type="radio" name="section-3-tabs-b">
                        <span class="section-8__tab-icon" aria-hidden="true">
                            <svg class="section-8__tab-icon-svg" viewBox="0 0 24 24" fill="none" focusable="false">
                                <path d="M12 3.5c4 4.8 6 8.2 6 11.1a6 6 0 0 1-12 0c0-2.9 2-6.3 6-11.1Z"
                                    stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span class="section-8__tab-text">Brilho e duração</span>
                    </label>

                    <label class="section-8__tab section-8__tab--fragrance">
                        <input class="section-8__control section-8__control--fragrance" type="radio"
                            name="section-3-tabs-b">
                        <span class="section-8__tab-icon" aria-hidden="true">
                            <svg class="section-8__tab-icon-svg" viewBox="0 0 24 24" fill="none" focusable="false">
                                <path d="M20 5c-8.2.3-13 4.4-15 12.5 4.8-.8 9.2-3.7 15-12.5Z" stroke="currentColor"
                                    stroke-width="1.8" stroke-linejoin="round" />
                                <path d="M5 18c3-4.1 6.4-6.8 10.4-8.2" stroke="currentColor" stroke-width="1.8"
                                    stroke-linecap="round" />
                            </svg>
                        </span>
                        <span class="section-8__tab-text">Vegano e hipoalergênico</span>
                    </label>

                    <label class="section-8__tab section-8__tab--application">
                        <input class="section-8__control section-8__control--application" type="radio"
                            name="section-3-tabs-b">
                        <span class="section-8__tab-icon" aria-hidden="true">
                            <svg class="section-8__tab-icon-svg" viewBox="0 0 24 24" fill="none" focusable="false">
                                <path d="M9 8h6v12H9V8Z" stroke="currentColor" stroke-width="1.8"
                                    stroke-linejoin="round" />
                                <path d="M10.5 4h3L15 8H9l1.5-4Z" stroke="currentColor" stroke-width="1.8"
                                    stroke-linejoin="round" />
                                <path d="M12 11v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                            </svg>
                        </span>
                        <span class="section-8__tab-text">Pincel flat</span>
                    </label>
                </nav>

                <div class="section-8__viewport">
                    <article class="section-8__panel section-8__panel--protection"
                        aria-labelledby="section-3-b-title-protection">
                        <figure class="section-8__media">
                            <img class="section-8__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmalte-impala-cacau-show-ops-acabou-perolado-lifestyle-chocolate-113619-02-1.webp"
                                alt="Mão com unhas pintadas em bege perolado segura esmalte Impala Cacau Show Ops, Acabou; fundo com chocolate"
                                width="1600" height="650" loading="lazy" decoding="async">
                        </figure>
                        <div class="section-8__content">
                            <h2 class="section-8__title" id="section-3-b-title-protection">Cor marcante em cada camada
                            </h2>
                            <span class="section-8__rule" aria-hidden="true"></span>
                            <p class="section-8__copy">
                                A alta cobertura valoriza a cor perolada e entrega um resultado marcante nas unhas.
                            </p>
                        </div>
                    </article>

                    <article class="section-8__panel section-8__panel--care" aria-labelledby="section-3-b-title-care">
                        <figure class="section-8__media">
                            <img class="section-8__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmalte-impala-cacau-show-ops-acabou-perolado-textura-pincel-113619-02-2.webp"
                                alt="Pincel flat com esmalte Impala Cacau Show Ops, Acabou em tom bege perolado"
                                width="1200" height="800" loading="lazy" decoding="async">
                        </figure>
                        <div class="section-8__content">
                            <h2 class="section-8__title" id="section-3-b-title-care">Brilho que valoriza a cor
                            </h2>
                            <span class="section-8__rule" aria-hidden="true"></span>
                            <p class="section-8__copy">
                                O brilho intenso destaca a cor. A longa duração ajuda a preservar o resultado da
                                esmaltação.
                            </p>
                        </div>
                    </article>

                    <article class="section-8__panel section-8__panel--fragrance"
                        aria-labelledby="section-3-b-title-fragrance">
                        <figure class="section-8__media">
                            <img class="section-8__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmalte-impala-cacau-show-ops-acabou-perolado-unhas-amendoadas-113619-02-3.webp"
                                alt="Mão com unhas longas amendoadas pintadas com esmalte Impala Cacau Show Ops, Acabou perolado em fundo neutro"
                                width="1200" height="800" loading="lazy" decoding="async">
                        </figure>
                        <div class="section-8__content">
                            <h2 class="section-8__title" id="section-3-b-title-fragrance">Fórmula com atributos
                                confirmados</h2>
                            <span class="section-8__rule" aria-hidden="true"></span>
                            <p class="section-8__copy">
                                O esmalte é vegano, hipoalergênico, dermatologicamente testado e não testado em animais.
                            </p>
                        </div>
                    </article>

                    <article class="section-8__panel section-8__panel--application"
                        aria-labelledby="section-3-b-title-application">
                        <figure class="section-8__media">
                            <img class="section-8__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmalte-impala-cacau-show-ops-acabou-perolado-ambiente-madeira-113619-02-4.webp"
                                alt="Esmalte Impala Cacau Show Ops, Acabou perolado sobre mesa madeira rústica; livros desfocados ao fundo"
                                width="1200" height="800" loading="lazy" decoding="async">
                        </figure>
                        <div class="section-8__content">
                            <h2 class="section-8__title" id="section-3-b-title-application">Aplicação uniforme e
                                confortável
                            </h2>
                            <span class="section-8__rule" aria-hidden="true"></span>
                            <p class="section-8__copy">
                                O pincel flat facilita a aplicação. Agite bem, aplique sobre as unhas e aguarde a
                                secagem.
                            </p>
                        </div>
                    </article>
                </div>

                <nav class="section-8__dots" aria-label="Indicadores dos benefícios">
                    <span class="section-8__dot section-8__dot--protection" aria-hidden="true"></span>
                    <span class="section-8__dot section-8__dot--care" aria-hidden="true"></span>
                    <span class="section-8__dot section-8__dot--fragrance" aria-hidden="true"></span>
                    <span class="section-8__dot section-8__dot--application" aria-hidden="true"></span>
                </nav>
            </article>
        </section>

        <p style="color: #6b5c54; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty;
            text-align: center; padding: 30px 0;">
            IMAGENS MERAMENTE ILUSTRATIVAS
        </p>

        <!-- Área de FAQ -->
        <section id="faq-section" aria-labelledby="faq-section__title">
            <div id="faq-section__header">
                <h2 id="faq-section__title">Dúvidas Frequentes</h2>
            </div>
            <ul id="faq-section__list" role="list"> <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Para que serve o Esmalte Impala Cacau Show Ops, Acabou 7,5 ml?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> É indicado para colorir as unhas com alta cobertura, brilho
                                intenso e fragrância de chocolate. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> O esmalte possui fragrância de chocolate? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. A fragrância de chocolate torna a esmaltação uma
                                experiência sensorial mais envolvente. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> O produto apresenta secagem rápida? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. A fórmula possui secagem rápida, facilitando a finalização
                                da esmaltação. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Esse esmalte oferece boa cobertura e brilho? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. Ele combina alta cobertura e brilho intenso para um
                                resultado bonito e marcante. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Qual é o diferencial do pincel flat? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O pincel flat proporciona uma aplicação uniforme e confortável
                                durante a esmaltação. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->
            </ul>
        </section>

    </div>
</div>`,
  css: ``
}
);
