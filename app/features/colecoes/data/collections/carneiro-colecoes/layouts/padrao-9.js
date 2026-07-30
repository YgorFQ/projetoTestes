// @ts-nocheck
ColLib.registerCollectionLayout('carneiro-colecoes',
{
  id: 'padrao-9',
  name: 'Padrão 9',
  html: `<div class="lp-container">
    <meta charset="UTF-8">
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        :root {
            --cor-principal: #c10230;
            --cor-principal-escura: #870022;
            --cor-principal-media: #d32246;
            --cor-principal-clara: #fff0f3;
            --cor-principal-suave: #fff7f8;
            --cor-principal-borda: #f0bac5;
            --cor-texto-forte: #211014;
            --cor-texto-suave: #6c4b52;
        }

        .pdp {
            display: flex;
            flex-direction: column;
            gap: clamp(1.5rem, 3vw, 2.75rem);
            font-family: Roboto, sans-serif
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
        .faq-section {
            width: calc(100% - 32px);
            box-sizing: border-box;
            margin: 0 auto;
            font-family: sans-serif;
        }

        .faq-section__header {
            text-align: center;
            margin: 0 auto 1.25rem;
        }

        .faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: var(--cor-texto-forte);
            margin: 0 0 12px;
            line-height: 98%;
        }

        .faq-section__subtitle {
            font-size: 1rem;
            color: var(--cor-texto-suave);
            margin: 0;
        }

        .faq-section__list {
            list-style: none;
            margin: 0 auto;
            padding: 0;
            max-width: 56rem;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .faq-section__item {
            background: #fff;
            border: 1px solid var(--cor-principal-borda);
            border-radius: 12px;
            overflow: hidden;
        }

        .faq-section__item summary {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 16px 20px;
            cursor: pointer;
            list-style: none;
        }

        .faq-section__item summary::-webkit-details-marker {
            display: none;
        }

        .faq-section__item summary:hover {
            background: var(--cor-principal-suave);
        }

        .faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: var(--cor-texto-forte);
            flex: 1;
        }

        .faq-section__q-text:hover {
            color: var(--cor-principal);
        }

        .faq-section__icon {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
            position: relative;
        }

        .faq-section__icon::before,
        .faq-section__icon::after {
            content: '';
            position: absolute;
            background: var(--cor-principal);
            border-radius: 2px;
            transition: transform 0.25s ease, opacity 0.25s ease;
        }

        .faq-section__icon::before {
            width: 12px;
            height: 1.5px;
            top: 9px;
            left: 4px;
        }

        .faq-section__icon::after {
            width: 1.5px;
            height: 12px;
            top: 4px;
            left: 9px;
        }

        .faq-section__item[open] .faq-section__icon::after {
            transform: rotate(90deg);
            opacity: 0;
        }

        .faq-section__a-inner {
            padding: 14px 20px 16px;
            border-top: 1px solid var(--cor-principal-borda);
        }

        .faq-section__a-text {
            font-size: 0.9rem;
            color: var(--cor-texto-suave);
            line-height: 1.6;
            margin: 0;
        }

        @media (max-width: 480px) {
            .faq-section__q-text {
                font-size: 0.9rem;
            }
        }
    </style>

    <style>
        /* ===== HERO SECTION — VARIÁVEIS ===== */
        .section-6 {
            --pos-y: 50%;
            --pos-x: 59%;
            --color-title: #fff;
            --bg-box: rgba(135, 0, 34, 0.82);

            width: calc(100% - 32px);
            max-width: 1248px;
            margin-inline: auto;
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
            padding: clamp(16px, 2vw, 24px);
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
                text-align: left;
            }

            .section-6__title {
                font-size: 1.8rem;
                color: var(--cor-principal-escura);
                text-shadow: none;
            }

            .section-6__description {
                margin-bottom: 0;
                font-size: 1.1rem;
                color: var(--cor-texto-suave);
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
            padding-bottom: 0;
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
        .section-15-container {
            background: linear-gradient(135deg, var(--cor-principal-escura), var(--cor-principal));
            padding: clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem);
            width: 100%;
            box-sizing: border-box;
            margin: 0 auto;
            border-radius: 20px;
            width: calc(100% - 32px);
        }

        .section-15 {
            display: flex;
            flex-direction: column-reverse;
            /* ← era column-reverse */
            gap: clamp(1.25rem, 3vw, 2.25rem);
            margin: 0 auto;
            width: 100%;
            max-width: 1248px;
            box-sizing: border-box;
        }

        .section-15__image-wrapper {
            width: 100%;
            flex-shrink: 0;
        }

        .section-15__image {
            margin: auto;
            border-radius: 16px;
            display: block;
            object-fit: cover;
            width: 100%;
            max-width: 530px;
            aspect-ratio: 16 / 9;
            box-shadow: 0 18px 32px rgba(60, 0, 15, 0.22);
        }

        .section-15__content {
            display: flex;
            flex-direction: column;
            width: 95%;
            margin: auto;
            box-sizing: border-box;
            padding: clamp(0.5rem, 2vw, 1rem) 0;
        }

        .section-15__title {
            color: #fff;
            font-size: 32px;
            font-weight: 600;
            line-height: 40px;
            margin: 0 0 1rem;
            text-align: left;
        }

        .section-15__desc {
            color: #ffe6eb;
            font-size: 14px;
            line-height: 22px;
            margin: 0 0 1.5rem;
            text-align: left;
        }

        .section-15__feature-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            list-style: none;
            margin: 0;
            gap: 22px;
            padding: 0;
        }

        .section-15__feature-item {
            align-items: flex-start;
            display: flex;
            flex-direction: row;
            gap: 0.75rem;
        }

        .section-15__feature-item-icon {
            border-radius: 8px;
            flex-shrink: 0;
            height: 44px;
            object-fit: contain;
            width: 44px;
        }

        .section-15__feature-item-body {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
        }

        .section-15__feature-item-title {
            color: #fff;
            font-size: 1.05rem;
            font-weight: 700;
            line-height: 1.35;
            margin: 0;
        }

        .section-15__feature-item-text {
            color: #ffe6eb;
            font-size: 0.8125rem;
            line-height: 1.55;
            margin: 0;
        }

        /* ── NOVO: aspect-ratio e desc oculta no mobile ── */
        @media (max-width: 759px) {
            .section-15__image {
                aspect-ratio: 4 / 3;
            }
        }

        @media (min-width: 480px) {
            .section-15-container {
                padding: 2rem 1.5rem;
            }

            .section-15__feature-item-title {
                font-size: 1.1rem;
            }
        }

        @media (min-width: 768px) {
            .section-15-container {
                padding: 2.5rem 2rem;
            }

            .section-15 {
                max-width: 768px;
            }

            .section-15__image {
                border-radius: 20px;
                aspect-ratio: 16 / 9;
            }
        }

        @media (min-width: 760px) {
            .section-15 {
                align-items: center;
                flex-direction: row;
                gap: clamp(1.75rem, 4vw, 3rem);
                justify-content: center;
                max-width: 960px;
            }

            .section-15--reverse {
                flex-direction: row-reverse;
            }

            .section-15__image-wrapper {
                flex: 0 0 48%;
                max-width: 48%;
            }

            .section-15__image {
                aspect-ratio: 4 / 3;
                height: 100%;
                max-height: 420px;
            }

            .section-15__content {
                flex: 1 1 0;
                min-width: 0;
            }

            .section-15__feature-list--icon-right .section-15__feature-item {
                flex-direction: row-reverse;
            }

            .section-15__feature-list--icon-right .section-15__feature-item-body {
                align-items: flex-end;
            }

            .section-15__feature-list--icon-right .section-15__feature-item-title,
            .section-15__feature-list--icon-right .section-15__feature-item-text {
                text-align: right;
            }

            .section-15__feature-item-icon {
                height: 48px;
                width: 48px;
            }

            .section-15__feature-item-title {
                font-size: 1.2rem;
            }

            .section-15__feature-item-text {
                font-size: 0.875rem;
            }
        }

        @media (min-width: 1060px) {
            .section-15 {
                max-width: 1060px;
                gap: 2rem;
            }

            .section-15__feature-list {
                gap: 1.25rem;
            }
        }

        @media (min-width: 1280px) {
            .section-15 {
                max-width: 1280px;
                gap: 2.5rem;
            }

            .section-15__image-wrapper {
                flex: 0 0 50%;
                max-width: 50%;
            }

            .section-15__image {
                max-height: 460px;
            }

            .section-15__feature-item-title {
                font-size: 1.3rem;
            }

            .section-15__feature-item-text {
                font-size: 0.9rem;
            }
        }

        .is-reverse {
            flex-direction: row-reverse;
        }

        @media (max-width: 760px) {
            .is-reverse {
                flex-direction: column-reverse;
            }
        }

        .is-reverse-760 {
            flex-direction: row-reverse;
        }

        @media (max-width: 760px) {
            .is-reverse-760 {
                flex-direction: column;
            }
        }
    </style>

    <style>
        .section-11-container {
            padding-top: 0.5rem;
            padding-bottom: 1rem;
            padding-left: 1rem;
            padding-right: 1rem;
        }

        @media (min-width: 576px) {
            .section-11-container {
                max-width: 576px;
                margin-inline: auto;
            }
        }

        @media (min-width: 768px) {
            .section-11-container {
                max-width: 768px;
            }
        }

        @media (min-width: 992px) {
            .section-11-container {
                max-width: 992px;
            }
        }

        @media (min-width: 1200px) {
            .section-11-container {
                max-width: 1200px;
            }
        }

        @media (min-width: 1400px) {
            .section-11-container {
                max-width: 1248px;
            }
        }

        .section-11__header {
            text-align: center;
            margin-bottom: clamp(1rem, 2.5vw, 1.75rem);
        }

        .section-11__title {
            font-size: 26px;
            font-weight: 900;
            color: var(--cor-principal-escura);
            margin: 0;
            line-height: 1.25;
        }

        .section-11__grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: clamp(0.75rem, 2vw, 1rem);
            list-style: none;
            margin: 0;
            padding: 0;
        }

        @media (min-width: 768px) {
            .section-11__grid {
                grid-template-columns: repeat(3, minmax(0, 1fr));
            }
        }

        @media (min-width: 992px) {
            .section-11__grid {
                grid-template-columns: repeat(5, minmax(0, 1fr));
            }
        }

        .section-11__item {
            background: linear-gradient(180deg, #fff, var(--cor-principal-suave));
            border: 1px solid var(--cor-principal-borda);
            border-radius: 10px;
            padding: clamp(0.9rem, 2vw, 1.15rem) 0.8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.55rem;
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        .section-11__item:hover {
            border-color: var(--cor-principal-media);
            box-shadow: 0 10px 22px rgba(135, 0, 34, 0.1);
        }

        .section-11__figure {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 46px;
            height: 46px;
            border-radius: 999px;
            background: var(--cor-principal-clara);
        }

        .section-11__icon {
            width: 42px;
            height: 42px;
            display: block;
            color: var(--cor-principal);
        }

        .section-11__name {
            font-size: 0.875rem;
            font-weight: 700;
            color: var(--cor-principal-escura);
            margin: 0;
            line-height: 1.3;
        }

        .section-11__value {
            font-size: 0.78rem;
            color: var(--cor-texto-suave);
            margin: 0;
            line-height: 1.4;
        }
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <article class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="product-header-2" aria-labelledby="product-header-2-title">
            <div class="product-header__banner-2">
                <figure style="width:100%;height:100%;margin:0;">
                    <picture>
                        <img class="product-header__banner-img-2" loading="eager" decoding="async"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/fundo-vermelho-textura-pdp-lorenzetti-advanced-402193-00.jpg?ims=1248x"
                            alt="">
                </figure>
                <div class="product-header__badge-2">
                    <img class="product-header__badge-img-2"
                        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/lorenzetti/lorenzetti-logo.png"
                        alt="Logo Lorenzetti">
                </div>
            </div>
            <div class="product-header__body-2">
                <p class="product-header__brand-2"> lorenzetti </p>
                <h2 class="product-header__title-2" id="product-header-2-title">
                    <span> Ducha Elétrica Advanced</span>
                    <strong>design integrado, Multi Temperatura</strong>
                </h2>
                <p class="product-header__subtitle-2">
                    Tecnologia de ponta em uma ducha elétrica pensada para conforto, praticidade e visual limpo no
                    banheiro, com cano incorporado, comando multitemperaturas, resistência tipo refil e compatibilidade
                    com aquecedores solares.
                </p>
            </div>
        </section>

        <section class="section-6" aria-labelledby="section-6-title">
            <figure class="section-6__figure">
                <picture>
                    <source media="(max-width: 760px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/ducha-eletrica-lorenzetti-advanced-pressurizada-branca-ambiente-close-4200997-02.jpg?ims=704x">
                    <img class="section-6__image" width="1600" height="650" fetchpriority="high" loading="lazy"
                        decoding="async"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/ducha-eletrica-lorenzetti-advanced-pressurizada-branca-ambiente-panoramico-4200997-01.jpg?ims=1216x"
                        alt="Ducha Elétrica Advanced com design sem fiação aparente e cano incorporado">
                </picture>
            </figure>
            <div class="section-6__content">
                <h2 class="section-6__title" id="section-6-title">Banho mais confortável e visual mais limpo</h2>
                <p class="section-6__description">Visual limpo, ajuste fácil e banho confortável todos os dias.</p>
            </div>
        </section>

        <section class="section-15-container" aria-labelledby="section-15-title">
            <div class="section-15">
                <div class="section-15__content">
                    <!-- ══ TÍTULO + DESCRIÇÃO (apague este bloco se não quiser usar) ══ -->
                    <h2 class="section-15__title" id="section-15-title">
                        Mais possibilidades para o seu banheiro
                    </h2>
                    <p class="section-15__desc">
                        Compatível com aquecedores solares, a Ducha Advanced amplia o uso no dia a dia. Boa para quem
                        quer conforto, apoio de temperatura quando necessário e manutenção simples.
                    </p>
                </div>
                <figure class="section-15__image-wrapper">
                    <img class="section-15__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/ducha-eletrica-lorenzetti-advanced-com-pressurizador-branca-ambiente-4200997_02.jpg?ims=530x"
                        alt="Banheiro com ducha elétrica instalada e acabamento discreto" loading="lazy"
                        decoding="async">
                </figure>
            </div>
        </section>

        <section class="section-11" aria-labelledby="section-11-title">
            <div class="section-11-container">
                <div class="section-11__header">
                    <h2 class="section-11__title" id="section-11-title">Recursos para um banho prático</h2>
                </div>
                <ul class="section-11__grid">
                    <li class="section-11__item">
                        <div class="section-11__figure">
                            <svg class="section-11__icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
                                <path d="M24 6a12 12 0 0 0-7 21.7V36a7 7 0 0 0 14 0v-8.3A12 12 0 0 0 24 6Z" fill="none"
                                    stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                                <path d="M17 18h14M19 24h10M24 31v8" fill="none" stroke="currentColor" stroke-width="3"
                                    stroke-linecap="round" />
                            </svg>
                        </div>
                        <h3 class="section-11__name">Comando multitemperaturas</h3>
                        <p class="section-11__value">Escolha o ponto ideal do banho e evite desperdício.</p>
                    </li>
                    <li class="section-11__item">
                        <div class="section-11__figure">
                            <svg class="section-11__icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
                                <path d="M18 8h12v10H18zM18 30h12v10H18zM24 18v12" fill="none" stroke="currentColor"
                                    stroke-width="3" stroke-linejoin="round" />
                                <path d="M13 24h22M34 20l4 4-4 4M14 28l-4-4 4-4" fill="none" stroke="currentColor"
                                    stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h3 class="section-11__name">Resistência tipo refil</h3>
                        <p class="section-11__value">Manutenção rápida, sem complicar a rotina.</p>
                    </li>
                    <li class="section-11__item">
                        <div class="section-11__figure">
                            <svg class="section-11__icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
                                <path d="M15 11h18a5 5 0 0 1 5 5v3H10v-3a5 5 0 0 1 5-5Z" fill="none"
                                    stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
                                <path d="M14 28v1M22 28v1M30 28v1M18 36v1M26 36v1M34 36v1" fill="none"
                                    stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                            </svg>
                        </div>
                        <h3 class="section-11__name">Grande espalhador</h3>
                        <p class="section-11__value">Jato mais amplo para banho confortável.</p>
                    </li>

                    <li class="section-11__item">
                        <div class="section-11__figure">
                            <svg class="section-11__icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
                                <circle cx="15" cy="15" r="6" fill="none" stroke="currentColor" stroke-width="3" />
                                <path
                                    d="M15 3v3M15 24v3M3 15h3M24 15h3M6.5 6.5l2.2 2.2M21.3 21.3l2.2 2.2M23.5 6.5l-2.2 2.2M8.7 21.3l-2.2 2.2"
                                    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
                                <path d="M28 20h12v18H28zM31 24h6M31 29h6M31 34h6" fill="none" stroke="currentColor"
                                    stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h3 class="section-11__name">Compatível com aquecedores solares</h3>
                        <p class="section-11__value">Boa opção para casas com sistema solar.</p>
                    </li>
                    <li class="section-11__item">
                        <div class="section-11__figure">
                            <svg class="section-11__icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
                                <path d="M25 4 11 27h11l-1 17 16-26H25z" fill="none" stroke="currentColor"
                                    stroke-width="3" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h3 class="section-11__name">Opções de potência</h3>
                        <p class="section-11__value">5.500 W em 127 V; 6.400 W ou 7.500 W em 220 V.</p>
                    </li>

                </ul>
            </div>
        </section>

        <aside
            style="color: var(--cor-texto-suave); font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty; text-align: center; padding: 30px 0;">
            IMAGENS MERAMENTE ILUSTRATIVAS</aside>

        <!-- Área de FAQ -->
        <section class="faq-section" aria-labelledby="faq-section-title">
            <div class="faq-section__header">
                <h2 class="faq-section__title" id="faq-section-title">Dúvidas frequentes sobre a Ducha Advanced</h2>
                <p class="faq-section__subtitle">Informações rápidas para ajudar na escolha e no uso do produto.</p>
            </div>
            <ul class="faq-section__list">
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Para quem é indicada a Ducha Lorenzetti Advanced Multi
                                Temperatura 7500W 220V?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O Chuveiro Ducha Lorenzetti Advanced Multi Temperatura 7500W
                                220V é indicado para residências com rede 220V que buscam economia. O modelo atende
                                perfeitamente casas equipadas com sistema de aquecimento solar, expandindo as
                                possibilidades de uso. Essa compatibilidade garante um banho confortável e adequado para
                                diferentes configurações hidráulicas</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Qual é o diferencial de desempenho deste modelo?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O Chuveiro Ducha Lorenzetti Advanced traz como diferencial o
                                seu grande espalhador, que entrega maior volume de água. O desempenho é reforçado pelo
                                comando multitemperaturas, feito para ajustar o aquecimento com precisão. Essa
                                combinação resulta em um banho muito mais satisfatório e relaxant</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">O chuveiro Lorenzetti Advanced é seguro para instalação em
                                banheiros residenciais?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O Chuveiro Ducha Lorenzetti Advanced garante total segurança
                                através do design com cano incorporado e fiação totalmente oculta. Essa estrutura evita
                                cabos aparentes no banheiro, eliminando riscos elétricos em áreas molhadas. O cuidado no
                                projeto assegura um uso tranquilo e protegido para toda a família.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Qual tecnologia ou material é utilizado na resistência do
                                produto?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O Chuveiro Ducha Lorenzetti Advanced utiliza uma resistência
                                com tecnologia tipo refil de troca rápida. Esse componente foi desenvolvido com foco no
                                fácil acesso, simplificando a manutenção pelo próprio usuário. O sistema de encaixe
                                inteligente traz praticidade e agilidade na substituição da peça.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Quais são as principais características técnicas de potência
                                e voltagem deste modelo?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O Chuveiro Ducha Lorenzetti Advanced opera na voltagem de
                                220V com potência máxima de 7.500W e código de resistência 3055-O. O produto possui
                                tecnologia de ponta em todos os detalhes, incluindo o design com cano já incorporado de
                                fábrica. Esses dados técnicos confirmam a alta capacidade de aquecimento do aparelho</p>
                        </div>
                    </details>
                </li>
            </ul>
        </section>
    </article>
</div>`,
  css: ``
}
);
