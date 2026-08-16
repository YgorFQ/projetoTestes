// @ts-nocheck
ColLib.registerCollectionLayout('carneiro-colecoes',
{
  id: 'variacao-30',
  name: 'Variação 30',
  html: `<div class="lp-container">
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
            color: #243746;
            margin: 0 0 12px;
            line-height: 98%;
        }

        #faq-section__subtitle {
            font-size: 1rem;
            color: #6b7785;
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
            background: #ffffff;
            border: 1px solid #dde4ea;
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
            background: #f3f7fa;
        }

        #faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #243746;
            flex: 1;
        }

        #faq-section__q-text:hover {
            color: #2f6f9f;
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
            background: #7890a3;
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
            border-top: 1px solid #dde4ea;
        }

        #faq-section__a-text {
            font-size: 0.9rem;
            color: #556473;
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
            padding: calc(var(--badge-size) / 2 + 1.8rem) 0.3rem 1.1rem;
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
            color: #243746;
        }

        .product-header__title-2 strong {
            font-weight: 700;
            display: block;
        }

        .product-header__subtitle-2 {
            color: #6b7785;
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
                max-width: 95%;
                margin: 1.25rem auto 0;
            }
        }
    </style>

    <style>
        /* ===== HERO SECTION — VARIÁVEIS ===== */
        .section-6 {
            --pos-y: 50%;
            --pos-x: 7%;
            --color-title: #eaf4fb;
            --bg-box: rgba(24, 39, 52, 0.58);

            width: 100%;
            position: relative;
            overflow: hidden;
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
            color: #ffffff;
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
                padding: 24px 20px 16px 20px;
                background: transparent;
                backdrop-filter: none;
                text-align: center;
            }

            .section-6__title {
                font-size: 1.8rem;
                color: #243746;
                text-shadow: none;
            }

            .section-6__description {
                margin-bottom: 0;
                font-size: 1.1rem;
                color: #556473;
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
        .section-15-container,
        .section-15-container * {
            box-sizing: border-box;
        }

        .section-15-container {
            width: 100%;
            padding: 1.5rem;
            background-color: #eef4f7;
        }

        .section-15 {
            display: flex;
            flex-direction: column-reverse;
            gap: 1.5rem;
            width: 100%;
            max-width: 1280px;
            margin: 0 auto;
        }

        .section-15__image-wrapper {
            width: 100%;
            flex-shrink: 0;
        }

        .section-15__image {
            display: block;
            width: 100%;
            max-width: 530px;
            margin: 0 auto;
            border-radius: 16px;
            object-fit: cover;
            aspect-ratio: 4 / 3;
        }

        .section-15__content {
            display: flex;
            flex-direction: column;
            width: 100%;
            min-width: 0;
        }

        .section-15__title {
            margin: 0 0 1rem;
            color: #243746;
            font-size: clamp(1.75rem, 4vw, 2rem);
            font-weight: 600;
            line-height: 1.25;
            text-align: left;
        }

        .section-15__desc {
            margin: 0 0 1.5rem;
            color: #243746;
            font-size: 0.875rem;
            line-height: 1.6;
            text-align: left;
        }

        .section-15__feature-list {
            display: flex;
            flex-direction: column;
            gap: 1.375rem;
            padding: 0;
            margin: 0;
            list-style: none;
        }

        .section-15__feature-item {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
        }

        .section-15__feature-item-icon {
            display: block;
            width: 44px;
            height: 44px;
            flex-shrink: 0;
            border-radius: 8px;
            object-fit: contain;
        }

        .section-15__feature-item-body {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            min-width: 0;
        }

        .section-15__feature-item-title {
            margin: 0;
            color: #23415a;
            font-size: 1.05rem;
            font-weight: 700;
            line-height: 1.35;
        }

        .section-15__feature-item-text {
            margin: 0;
            color: #52677a;
            font-size: 0.8125rem;
            line-height: 1.55;
        }

        @media (min-width: 480px) {
            .section-15-container {
                padding: 1.75rem;
            }

            .section-15__feature-item-title {
                font-size: 1.1rem;
            }
        }

        @media (min-width: 760px) {
            .section-15-container {
                padding: 2rem;
            }

            .section-15 {
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 2rem;
            }

            .section-15--reverse {
                flex-direction: row-reverse;
            }

            .section-15__image-wrapper {
                flex: 0 1 48%;
                max-width: 48%;
            }

            .section-15__image {
                width: 100%;
                max-width: none;
                max-height: 460px;
                border-radius: 20px;
                aspect-ratio: 4 / 3;
            }

            .section-15__content {
                flex: 1 1 0;
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
                width: 48px;
                height: 48px;
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
                gap: 2.5rem;
            }
        }

        @media (min-width: 1280px) {
            .section-15__image-wrapper {
                flex-basis: 50%;
                max-width: 50%;
            }

            .section-15__feature-item-title {
                font-size: 1.3rem;
            }

            .section-15__feature-item-text {
                font-size: 0.9rem;
            }
        }

        /* Entrada inicial */
        .section-15__content,
        .section-15__image-wrapper {
            animation: section-15-fade-up 0.8s ease both;
        }

        .section-15__image-wrapper {
            animation-delay: 0.15s;
        }

        @keyframes section-15-fade-up {
            from {
                opacity: 0;
                transform: translateY(28px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Imagem interativa */
        .section-15__image-wrapper {
            overflow: hidden;
            border-radius: 20px;
        }

        .section-15__image {
            transition:
                transform 0.5s ease,
                filter 0.5s ease;
        }

        .section-15__image-wrapper:hover .section-15__image {
            transform: scale(1.04);
            filter: brightness(1.05);
        }

        /* Cards dos benefícios */
        .section-15__feature-item {
            position: relative;
            padding: 0.8rem;
            background-color: rgba(255, 255, 255, 0.72);
            border: 1px solid #d7e3ea;
            border-radius: 12px;
            transition:
                background-color 0.3s ease,
                border-color 0.3s ease,
                transform 0.3s ease,
                box-shadow 0.3s ease;
        }

        .section-15__feature-item:hover,
        .section-15__feature-item:focus-visible {
            background-color: #ffffff;
            border-color: #9fbfd5;
            box-shadow: 0 12px 28px rgba(35, 65, 90, 0.12);
            transform: translateX(8px);
            outline: none;
        }

        /* Animação dos ícones */
        .section-15__feature-item-icon {
            transition:
                transform 0.35s ease,
                background-color 0.35s ease;
        }

        .section-15__feature-item:hover .section-15__feature-item-icon,
        .section-15__feature-item:focus-visible .section-15__feature-item-icon {
            transform: scale(1.12) rotate(-4deg);
        }

        /* Destaque dos títulos */
        .section-15__feature-item-title {
            transition: transform 0.3s ease;
        }

        .section-15__feature-item:hover .section-15__feature-item-title,
        .section-15__feature-item:focus-visible .section-15__feature-item-title {
            transform: translateX(4px);
        }

        /* Entrada progressiva dos itens */
        .section-15__feature-item {
            animation: section-15-item-in 0.65s ease both;
        }

        .section-15__feature-item:nth-child(1) {
            animation-delay: 0.15s;
        }

        .section-15__feature-item:nth-child(2) {
            animation-delay: 0.25s;
        }

        .section-15__feature-item:nth-child(3) {
            animation-delay: 0.35s;
        }

        .section-15__feature-item:nth-child(4) {
            animation-delay: 0.45s;
        }

        @keyframes section-15-item-in {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        /* Animação ao aparecer durante o scroll */
        @supports (animation-timeline: view()) {
            .section-15 {
                animation: section-15-scroll-reveal linear both;
                animation-timeline: view();
                animation-range: entry 10% cover 35%;
            }

            @keyframes section-15-scroll-reveal {
                from {
                    opacity: 0;
                    transform: translateY(40px);
                }

                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        }

        /* Mobile */
        @media (max-width: 759px) {

            .section-15__feature-item:hover,
            .section-15__feature-item:focus-visible {
                transform: translateY(-4px);
            }
        }

        /* Acessibilidade */
        @media (prefers-reduced-motion: reduce) {

            .section-15,
            .section-15__content,
            .section-15__image-wrapper,
            .section-15__image,
            .section-15__feature-item,
            .section-15__feature-item-icon,
            .section-15__feature-item-title {
                animation: none;
                transition: none;
            }
        }

        @media(min-width: 760px) {
            .is-reverse {
                flex-direction: row-reverse;
            }
        }
    </style>

    <style>
        .section-33__container {
            width: 92%;
            border-radius: 26px;
            max-width: 1600px;
            margin: 0 auto;
        }

        .section-33__video-section {
            position: relative;
            width: 95%;
            margin: auto;
            max-height: 865px;
            overflow: hidden;
            /* background: linear-gradient(135deg, #0f2d4f 0%, #12385f 40%, #0c4e86 70%, #198fd6 100%); */
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 18px 0;
        }

        .section-33__video-wrapper {
            position: relative;
            width: 100%;
            max-width: 1280px;
            max-height: 865px;

            /*
     * PROPORÇÃO DO VÍDEO
     * 16:9 = padding-bottom: 56.25%
     * 4:3  = padding-bottom: 75%
     * 1:1  = padding-bottom: 100%
     */
            padding-bottom: 56.25%;

            margin: 0 auto;
        }

        .section-33__video-wrapper iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 18px;
        }
    </style>

    <style>
        :root {
            --s1-color-bg: #f4f7f9;
            --s1-color-header-bg: #dce8f0;
            --s1-color-card-bg: #ffffff;
            --s1-color-pill-bg: #4e7fa5;
            --s1-color-text-dark: #28445b;
            --s1-color-text-light: #28445b;
        }

        .section-1 {
            background-color: var(--s1-color-bg);
            padding-block: 2rem;
        }

        .section-1__container {
            margin-inline: auto;
            padding-inline: 1rem;
        }

        @media (min-width: 576px) {
            .section-1__container {
                max-width: 576px;
            }
        }

        @media (min-width: 768px) {
            .section-1__container {
                max-width: 768px;
            }
        }

        @media (min-width: 992px) {
            .section-1__container {
                max-width: 992px;
            }
        }

        @media (min-width: 1200px) {
            .section-1__container {
                max-width: 1200px;
            }
        }

        @media (min-width: 1400px) {
            .section-1__container {
                max-width: 1400px;
            }
        }

        .section-1__content {
            margin-block-end: 1.5rem;
        }

        .section-1__title {
            color: var(--s1-color-text-light);
            font-size: clamp(1.25rem, 1rem + 1vw, 1.75rem);
            font-weight: 700;
            line-height: 1.25;
            overflow-wrap: break-word;
            margin-block-end: 0.5rem;
        }

        .section-1__text {
            color: var(--s1-color-text-light);
            font-size: clamp(0.875rem, 0.8rem + 0.4vw, 1rem);
            line-height: 1.5;
            overflow-wrap: break-word;
            max-width: 60ch;
        }

        .section-1__table-wrapper {
            overflow-x: auto;
        }

        .section-1__table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0.5rem;
            table-layout: fixed;
        }

        .section-1__col--size {
            width: 25%;
        }

        .section-1__caption {
            caption-side: top;
            text-align: left;
            color: var(--s1-color-text-light);
            font-size: clamp(0.75rem, 0.7rem + 0.3vw, 0.875rem);
            margin-block-end: 0.5rem;
            overflow-wrap: break-word;
        }

        .section-1__visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        .section-1__th {
            background-color: var(--s1-color-header-bg);
            color: var(--s1-color-text-dark);
            font-weight: 700;
            font-size: clamp(0.75rem, 0.7rem + 0.35vw, 0.9375rem);
            text-align: center;
            padding: 1rem 0.5rem;
            border-radius: 1.5rem;
            overflow-wrap: break-word;
        }

        .section-1__th--empty {
            background-color: transparent;
        }

        .section-1__size {
            background-color: var(--s1-color-pill-bg);
            color: var(--s1-color-text-light);
            font-weight: 700;
            font-size: clamp(0.875rem, 0.8rem + 0.4vw, 1.125rem);
            text-align: center;
            padding: 1rem 0.5rem;
            border-radius: 1.5rem;
            overflow-wrap: break-word;
        }

        .section-1__td {
            background-color: var(--s1-color-card-bg);
            color: var(--s1-color-text-dark);
            font-weight: 600;
            font-size: clamp(0.75rem, 0.7rem + 0.4vw, 1rem);
            text-align: center;
            padding: 1rem 0.5rem;
            border-radius: 1.5rem;
            overflow-wrap: break-word;
        }

        @media (min-width: 768px) {

            .section-1__th,
            .section-1__size,
            .section-1__td {
                padding: 1rem 1.5rem;
            }
        }

        /* Variação: conteúdo ao lado da tabela em telas maiores */
        .section-1--side .section-1__container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        @media (min-width: 768px) {
            .section-1--side .section-1__container {
                flex-direction: row;
                align-items: start;
                gap: 2rem;
            }

            .section-1--side .section-1__content {
                flex: 0 0 auto;
                width: 33%;
                margin-block-end: 0;
            }

            .section-1--side .section-1__table-wrapper {
                flex: 1 1 auto;
            }
        }
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <article class="pdp" id="pdp"
        aria-label="Conteúdo rico da Fralda Descartável Adulto TENA Slip Dermacare Extra Grande">
        <!-- HTML fica dentro dessa div PDP -->

        <section class="product-header-2" aria-label="Apresentação da Fralda TENA Slip Dermacare Extra Grande">
            <div class="product-header__banner-2">
                <figure style="width:100%;height:100%;margin:0;">
                    <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/fralda-descartavel-adulto-tena-dermacare-fundo-banner-208241-00.webp"
                        alt="Banner da Fralda TENA Slip Dermacare Extra Grande" class="product-header__banner-img-2"
                        loading="eager">
                </figure>
                <div class="product-header__badge-2" role="img" aria-label="Logo da TENA">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/tena/logo-tena.png"
                        alt="Logo da TENA" class="product-header__badge-img-2">
                </div>
            </div>
            <div class="product-header__body-2">
                <small class="product-header__brand-2">tena</small>
                <h2 class="product-header__title-2">
                    <span>Fralda Descartável Adulto</span>
                    <strong>TENA Slip Dermacare Extra Grande</strong>
                </h2>
                <p class="product-header__subtitle-2">Indicadas para mulheres e homens com incontinência severa e com
                    pouco ou nenhuma mobilidade</p>
            </div>
        </section>

        <section class="section-6" aria-label="Proteção e cuidado com a pele">
            <picture>
                <source media="(max-width: 760px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/fralda-descartavel-adulto-tena-dermacare-slip-eg-embalagem-frente-208241-01-2.webp"
                    width="780" height="450">
                <img class="section-6__image" width="1600" height="650" loading="lazy" fetchpriority="low"
                    decoding="async"
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/fralda-descartavel-adulto-tena-dermacare-slip-eg-embalagem-lateral-208241-01-1.webp"
                    alt="Fralda TENA Slip Dermacare com proteção para incontinência severa">
            </picture>
            <div class="section-6__content">
                <h2 class="section-6__title">Pele saudável, seca e protegida</h2>
                <p class="section-6__description">A dupla camada absorvente retém rapidamente o líquido, enquanto os
                    materiais macios e respiráveis oferecem conforto</p>
            </div>
        </section>

        <section class="section-15-container" aria-label="Principais benefícios da Fralda TENA Slip Dermacare">
            <div class="section-15 is-reverse">
                <div class="section-15__content">
                    <ul class="section-15__feature-list" aria-label="Benefícios da Fralda TENA Slip Dermacare">
                        <li class="section-15__feature-item">
                            <svg class="section-15__feature-item-icon" viewBox="0 0 48 48" width="48" height="48"
                                aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                <rect x="1" y="1" width="46" height="46" rx="10" fill="#e4f1f8" />
                                <path
                                    d="M24 8C24 8 14.5 20 14.5 28.2C14.5 34.2 18.8 39 24 39C29.2 39 33.5 34.2 33.5 28.2C33.5 20 24 8 24 8Z"
                                    fill="#4e7fa5" />
                                <path d="M19 29.2C19.5 32.4 21.4 34.4 24.2 34.8" fill="none" stroke="#ffffff"
                                    stroke-width="2.6" stroke-linecap="round" />
                                <path d="M37 15L39.3 17.3L43 13.5" fill="none" stroke="#2f6f9f" stroke-width="2.4"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Núcleo de alta e rápida absorção</strong>
                                <p class="section-15__feature-item-text">Pele protegida e seca.</p>
                            </div>
                        </li>

                        <li class="section-15__feature-item">
                            <svg class="section-15__feature-item-icon" viewBox="0 0 48 48" width="48" height="48"
                                aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                <rect x="1" y="1" width="46" height="46" rx="10" fill="#e4f1f8" />
                                <path d="M11 18H22C25.3 18 28 20.7 28 24C28 27.3 25.3 30 22 30H15" fill="none"
                                    stroke="#4e7fa5" stroke-width="3" stroke-linecap="round" />
                                <path d="M37 30H26C22.7 30 20 27.3 20 24C20 20.7 22.7 18 26 18H33" fill="none"
                                    stroke="#2f6f9f" stroke-width="3" stroke-linecap="round" />
                                <path d="M15 14L10 18L15 22M33 26L38 30L33 34" fill="none" stroke="#23415a"
                                    stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
                                <circle cx="24" cy="24" r="2.5" fill="#23415a" />
                            </svg>

                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Microganchos Multifix</strong>
                                <p class="section-15__feature-item-text">Permitem o ajuste do produto sem problemas.</p>
                            </div>
                        </li>

                        <li class="section-15__feature-item">
                            <svg class="section-15__feature-item-icon" viewBox="0 0 48 48" width="48" height="48"
                                aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                <rect x="1" y="1" width="46" height="46" rx="10" fill="#e4f1f8" />
                                <path d="M16 10C17.5 15 18 18.5 17 22.5C16 26.7 14.5 30.5 16 38" fill="none"
                                    stroke="#4e7fa5" stroke-width="3" stroke-linecap="round" />
                                <path d="M32 10C30.5 15 30 18.5 31 22.5C32 26.7 33.5 30.5 32 38" fill="none"
                                    stroke="#4e7fa5" stroke-width="3" stroke-linecap="round" />
                                <path d="M17.5 17.5C21.5 20 26.5 20 30.5 17.5M17 29.5C21.4 32.2 26.6 32.2 31 29.5"
                                    fill="none" stroke="#2f6f9f" stroke-width="2.6" stroke-linecap="round" />
                                <path
                                    d="M10 24H17M10 24L13.5 20.5M10 24L13.5 27.5M38 24H31M38 24L34.5 20.5M38 24L34.5 27.5"
                                    fill="none" stroke="#23415a" stroke-width="2.4" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>

                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Elásticos nas costas</strong>
                                <p class="section-15__feature-item-text">Garante ajuste perfeito ao corpo.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="section-15__image-wrapper">
                    <img class="section-15__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/fralda-descartavel-adulto-tena-dermacare-cuidadora-e-idosa-lifestyle-208241-02.webp"
                        alt="Detalhes de absorção e ajuste da Fralda TENA Slip Dermacare" />
                </div>
            </div>
        </section>

        <span style="display: inline-block; background-color: #dce8f0;">
            <section class="section-33__container" aria-label="Vídeo da Fralda TENA Slip Dermacare">
                <div class="section-33__video-section">
                    <div class="section-33__video-wrapper">
                        <iframe width="560" height="315"
                            src="https://www.youtube.com/embed/uQutV5ycXaU?si=uj3RvF2kZ3dYQDTl"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </div>
            </section>
        </span>

        <section class="section-1" aria-labelledby="section-1-title">
            <div class="section-1__container">
                <div class="section-1__content">
                    <h2 class="section-1__title" id="section-1-title">Guia de tamanhos</h2>
                    <p class="section-1__text">Consulte a cintura e o peso indicados para escolher o tamanho adequado.
                    </p>
                </div>
                <div class="section-1__table-wrapper">
                    <table class="section-1__table">
                        <caption class="section-1__caption">Referência de tamanho por cintura e peso</caption>
                        <colgroup>
                            <col class="section-1__col section-1__col--size">
                            <col class="section-1__col">
                            <col class="section-1__col">
                        </colgroup>
                        <thead>
                            <tr>
                                <th class="section-1__th" scope="col">Tamanho</th>
                                <th class="section-1__th" scope="col">Cintura (cm)</th>
                                <th class="section-1__th" scope="col">Peso (kg)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th class="section-1__size" scope="row">M</th>
                                <td class="section-1__td">73–126 cm</td>
                                <td class="section-1__td">40–70 kg</td>
                            </tr>
                            <tr>
                                <th class="section-1__size" scope="row">G</th>
                                <td class="section-1__td">80–156 cm</td>
                                <td class="section-1__td">70–90 kg</td>
                            </tr>
                            <tr>
                                <th class="section-1__size" scope="row">EG</th>
                                <td class="section-1__td">120–164 cm</td>
                                <td class="section-1__td">Acima de 90 kg</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <p style="color: #6b7785; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty;
            text-align: center; padding: 30px 0;">IMAGENS MERAMENTE ILUSTRATIVAS</p>

        <!-- Área de FAQ -->
        <section id="faq-section" aria-labelledby="faq-section__title">
            <div id="faq-section__header">
                <h2 id="faq-section__title">Dúvidas Frequentes</h2>
            </div>
            <ul id="faq-section__list" role="list"> <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Para quem é indicada a Fralda Descartável Adulto TENA Slip
                                Dermacare Extra Grande? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> É indicada para homens e mulheres com incontinência moderada a
                                severa, mobilidade reduzida ou que permanecem acamados. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Como a dupla camada absorvente ajuda a manter a pele seca?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O núcleo retém rapidamente o líquido e o mantém afastado da
                                pele, favorecendo maior proteção e conforto durante o uso. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Quais recursos ajudam a evitar vazamentos? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> As barreiras antivazamento e os elásticos nas pernas e na
                                cintura proporcionam melhor vedação e ajuste ao corpo. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Como saber o momento adequado para realizar a troca? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> A faixa indicadora de umidade muda a sinalização quando a troca
                                é necessária, evitando aberturas desnecessárias. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Os microganchos MultiFix podem ser abertos novamente? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. Os microganchos permitem múltiplas aberturas e
                                fechamentos, facilitando o ajuste preciso sem comprometer o produto. </p>
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
