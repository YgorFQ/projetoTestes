// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "padrao-8",
  name: "Padrão 8",
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
            font-family: Roboto, sans-serif;
            background: #fffaf1;
            color: #273017;
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
            width: 100%;
            padding: 2.5rem 16px 3rem;
            box-sizing: border-box;
            margin: 0 auto;
            font-family: sans-serif;
            background: #fffaf1;
        }

        .faq-section__header {
            text-align: center;
            margin: 0 auto 1.5rem;
            max-width: 44rem;
        }

        .faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: 800;
            color: #273017;
            margin: 0 0 10px;
            line-height: 1.12;
        }

        .faq-section__subtitle {
            font-size: 1rem;
            color: #6d735f;
            margin: 0;
            line-height: 1.45;
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
            background: #ffffff;
            border: 1px solid #f1dfbc;
            border-radius: 10px;
            box-shadow: 0 10px 24px rgba(80, 57, 14, 0.06);
            overflow: hidden;
            transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }

        .faq-section__item summary {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 17px 20px;
            cursor: pointer;
            list-style: none;
            outline: none;
        }

        .faq-section__item summary::-webkit-details-marker {
            display: none;
        }

        .faq-section__item summary:hover {
            background: #fff5df;
        }

        .faq-section__item summary:focus-visible {
            box-shadow: inset 0 0 0 2px #f28b24;
        }

        .faq-section__item:hover {
            border-color: #efb760;
            transform: translateY(-2px);
        }

        .faq-section__item[open] {
            border-color: #f28b24;
            box-shadow: 0 16px 30px rgba(80, 57, 14, 0.1);
        }

        .faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #273017;
            flex: 1;
            line-height: 1.35;
        }

        .faq-section__q-text:hover {
            color: #d86f0b;
        }

        .faq-section__icon {
            width: 28px;
            height: 28px;
            flex-shrink: 0;
            position: relative;
            border-radius: 50%;
            background: #fff1d4;
            transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .faq-section__icon::before,
        .faq-section__icon::after {
            content: '';
            position: absolute;
            background: #d86f0b;
            border-radius: 2px;
            transition: transform 0.25s ease, opacity 0.25s ease;
        }

        .faq-section__icon::before {
            width: 12px;
            height: 1.5px;
            top: 13px;
            left: 8px;
        }

        .faq-section__icon::after {
            width: 1.5px;
            height: 12px;
            top: 8px;
            left: 13px;
        }

        .faq-section__item[open] .faq-section__icon::after {
            transform: rotate(90deg);
            opacity: 0;
        }

        .faq-section__item[open] .faq-section__icon {
            background: #f28b24;
            transform: rotate(180deg);
        }

        .faq-section__item[open] .faq-section__icon::before,
        .faq-section__item[open] .faq-section__icon::after {
            background: #ffffff;
        }

        .faq-section__a-inner {
            padding: 14px 20px 16px;
            border-top: 1px solid #f3e2c1;
            background: #fffaf1;
        }

        .faq-section__a-text {
            font-size: 0.9rem;
            color: #5b604e;
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
        .section-15-container {
            padding: 1.5rem;
            width: 100%;
            box-sizing: border-box;
            background: #fffaf1;
        }

        .section-15-container--soft {
            background: #f7f5e8;
        }

        .section-15 {
            display: flex;
            flex-direction: column-reverse;
            /* ← era column-reverse */
            gap: 1.25rem;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
            background: #ffffff;
            border: 1px solid #f2dfba;
            border-radius: 18px;
            padding: 1rem;
            box-shadow: 0 18px 38px rgba(80, 57, 14, 0.08);
            transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .section-15:hover {
            border-color: #efb760;
            box-shadow: 0 22px 46px rgba(80, 57, 14, 0.12);
            transform: translateY(-3px);
        }

        .section-15__image-wrapper {
            width: 100%;
            flex-shrink: 0;
            overflow: hidden;
            border-radius: 16px;
        }

        .section-15__image {
            margin: auto;
            border-radius: 16px;
            display: block;
            object-fit: cover;
            width: 100%;
            max-width: 530px;
            aspect-ratio: 16 / 9;
            transition: transform 0.35s ease, filter 0.35s ease;
        }

        .section-15:hover .section-15__image {
            transform: scale(1.035);
            filter: saturate(1.06);
        }

        .section-15__content {
            display: flex;
            flex-direction: column;
            width: 95%;
            margin: auto;
            box-sizing: border-box;
            padding: 0.5rem;
        }

        .section-15__title {
            color: #273017;
            font-size: clamp(1.55rem, 3vw, 2rem);
            font-weight: 800;
            line-height: 1.15;
            margin: 0 0 0.85rem;
            text-align: left;
            position: relative;
            padding-top: 0.8rem;
        }

        .section-15__title::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 48px;
            height: 4px;
            background: #f28b24;
            border-radius: 999px;
        }

        .section-15__desc {
            color: #5b604e;
            font-size: 1rem;
            line-height: 1.55;
            margin: 0;
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
            color: #f5f5f5;
            font-size: 1.05rem;
            font-weight: 700;
            line-height: 1.35;
            margin: 0;
        }

        .section-15__feature-item-text {
            color: #f5f5f5;
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
                padding: 1.75rem;
            }

            .section-15__feature-item-title {
                font-size: 1.1rem;
            }
        }

        @media (min-width: 768px) {
            .section-15-container {
                padding: 2rem;
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
                gap: 1.5rem;
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

        @media (max-width: 759px) {
            #section-15-container {
                background-color: #f28b24;
            }
        }
    </style>

    <style>
        .section-32__container {
            width: 100%;
            max-width: 1600px;
            margin: 0 auto;
        }

        .section-32__groupimage-section {
            position: relative;
            width: 100%;
            margin: 0;
            contain: layout style;
        }

        .section-32__groupimage-section img {
            width: 100%;
            height: auto;
            display: block;
        }

        .section-32__grouptext-overlay {
            position: absolute;
            max-width: 40%;
            width: 90%;
            line-height: 1.5;
            text-align: center;
            font-family: sans-serif
        }

        .section-32__grouptext-overlay.top {
            top: 3%;
            left: 50%;
            transform: translateX(-50%);
        }

        .section-32__grouptext-overlay.bottom {
            top: 84%;
            left: 50%;
            transform: translateX(-50%);
        }

        .section-32__grouptext-overlay.left {
            top: 50%;
            left: 25%;
            transform: translate(-50%, -50%);
            max-width: 41%;
        }

        .section-32__grouptext-overlay.right {
            top: 50%;
            left: 75%;
            transform: translate(-50%, -50%);
            max-width: 42%;
        }

        .section-32__grouptext-overlay h2 {
            font-size: 2vw;
            font-weight: bold;
            margin-bottom: 1.5px;
            line-height: 120%;
        }

        .section-32__grouptext-overlay p {
            font-size: 1.1vw;
            margin: 0;
            line-height: 120%;
        }

        @media (max-width: 960px) {
            .section-32__grouptext-overlay h2 {
                font-size: 2.1vw;
            }

            .section-32__grouptext-overlay p {
                font-size: 1.5vw;
            }
        }

        @media (max-width: 768px) {
            .section-32__grouptext-overlay h2 {
                font-size: 2.5vw;
            }

            .section-32__grouptext-overlay p {
                font-size: 1.8vw;
            }
        }

        @media (max-width: 500px) {
            .section-32__grouptext-overlay h2 {
                font-size: 3vw;
            }

            .section-32__grouptext-overlay p {
                font-size: 2.3vw;
            }
        }

        @media (max-width: 480px) {
            .section-32__grouptext-overlay h2 {
                font-size: 3vw;
            }

            .section-32__grouptext-overlay p {
                font-size: 2.3vw;
            }
        }

        @media (max-width: 1060px) {
            .section-32__grouptext-overlay.top {
                top: 3%;
            }
        }

        @media (max-width: 960px) {
            .section-32__grouptext-overlay.top {
                top: 3%;
            }
        }

        @media (max-width: 768px) {
            .section-32__grouptext-overlay.top {
                top: 3%;
            }
        }

        @media (max-width: 500px) {
            .section-32__grouptext-overlay.top {
                top: 3%;
            }
        }

        @media (max-width: 480px) {
            .section-32__grouptext-overlay.top {
                top: 3%;
            }
        }

        @media (max-width: 1060px) {
            .section-32__grouptext-overlay.bottom {
                top: 81%;
            }
        }

        @media (max-width: 960px) {
            .section-32__grouptext-overlay.bottom {
                top: 79%
            }
        }

        @media (max-width: 480px) {
            .section-32__grouptext-overlay.bottom {
                top: 81%
            }
        }

        @media (max-width: 768px) {
            .section-32__grouptext-overlay.bottom {
                top: 76%;
            }
        }

        @media (max-width: 500px) {
            .section-32__grouptext-overlay.bottom {
                top: 67%;
            }
        }

        @media (max-width: 480px) {

            .section-32__grouptext-overlay.right {
                top: 50%;
                left: 73%;
                transform: translate(-50%, -50%);
            }
        }

        @media (max-width: 480px) {

            .section-32__grouptext-overlay.left {
                top: 50%;
                left: 27%;
                transform: translate(-50%, -50%);
            }
        }

        .grouptext-overlay-Background {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4.5vw;
            padding: 0.5rem;
            backdrop-filter: blur(0.8vw);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
            -webkit-backdrop-filter: blur(10px);

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.3);
            max-width: 70%;
            z-index: 100;
        }
    </style>

    <style>
        /* ===== HERO SECTION — VARIÁVEIS ===== */
        .section-6 {
            --pos-y: 50%;
            --pos-x: 7%;
            --color-title: #ffffff;
            --bg-box: rgba(71, 43, 3, 0.5);
            background-color: #f28b24;
            width: 100%;
            position: relative;
            overflow: hidden;
            padding: 1rem 0;
        }

        /* ===== IMAGEM ===== */
        .section-6__image {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 18px;
            transition: transform 0.4s ease, filter 0.4s ease;
        }

        .section-6:hover .section-6__image {
            transform: scale(1.02);
            filter: saturate(1.08);
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
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.28);
            backdrop-filter: blur(6px);
            box-shadow: 0 16px 32px rgba(66, 42, 8, 0.18);
            transition: transform 0.25s ease, background-color 0.25s ease;
        }

        .section-6:hover .section-6__content {
            transform: translateY(-52%);
            background-color: rgba(71, 43, 3, 0.58);
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
            margin: 0;
            line-height: 1.45;
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
                border-radius: 0;
                box-shadow: none;
                border: 0;
            }

            .section-6:hover .section-6__content {
                transform: none;
                background: transparent;
            }

            .section-6__title {
                font-size: 1.8rem;
                color: #273017;
                text-shadow: none;
            }

            .section-6__description {
                margin-bottom: 0;
                font-size: 1.1rem;
                color: #5b604e;
                text-shadow: none;
            }

            .section-6__image {
                width: 95%;
                margin: auto;
                height: auto;
                display: block;
                border-radius: 20px;
                padding: 18px 0 0;
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

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="product-header-2" aria-label="Cabeçalho do produto">
            <div class="product-header__banner-2">
                <figure style="width:100%;height:100%;margin:0;">
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-laranja-tial-ingredientes-detalhe-frutas-banner-4600117-00.jpg?ims=288x">
                        <source media="(max-width: 375px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-laranja-tial-ingredientes-detalhe-frutas-banner-4600117-00.jpg?ims=343x">
                        <source media="(max-width: 425px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-laranja-tial-ingredientes-detalhe-frutas-banner-4600117-00.jpg?ims=393x">
                        <source media="(max-width: 768px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-laranja-tial-ingredientes-detalhe-frutas-banner-4600117-00.jpg?ims=736x">
                        <source media="(max-width: 1024px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-laranja-tial-ingredientes-detalhe-frutas-banner-4600117-00.jpg?ims=992x">
                        <source media="(max-width: 1440px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-laranja-tial-ingredientes-detalhe-frutas-banner-4600117-00.jpg?ims=1248x">
                        <img class="product-header__banner-img-2"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-laranja-tial-ingredientes-detalhe-frutas-banner-4600117-00.jpg?ims=1248x"
                            alt="Banner decorativo para apresentação do Néctar Tial sabor laranja" loading="lazy"
                            decoding="async">
                    </picture>
                </figure>
                <div class="product-header__badge-2" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/tial/logo-tial.png"
                        alt="Ícone da marca" class="product-header__badge-img-2" loading="lazy" decoding="async">
                </div>
            </div>
            <article class="product-header__body-2">
                <small class="product-header__brand-2">── tial ──</small>
                <h1 class="product-header__title-2">
                    <span>Suco Néctar de Laranja</span>
                    <strong>1 Litro, 12 Unidades</strong>
                </h1>
                <p class="product-header__subtitle-2">
                    Néctar de laranja pronto para beber, com 30% de suco, ingredientes naturais e vitamina C.
                    Embalagem de 1 litro em caixa com 12 unidades.
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto">
            <picture>
                <source media="(max-width: 320px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/nectar-tial-laranja-1l-detalhe-embalagem-4600124-01-2.jpg?ims=520x">
                <source media="(max-width: 375px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/nectar-tial-laranja-1l-detalhe-embalagem-4600124-01-2.jpg?ims=620x">
                <source media="(max-width: 425px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/nectar-tial-laranja-1l-detalhe-embalagem-4600124-01-2.jpg?ims=710x">
                <source media="(max-width: 768px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/nectar-tial-laranja-1l-cozinha-lifestyle-4600124-01-1.jpg?ims=1399x">
                <source media="(max-width: 1024px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/nectar-tial-laranja-1l-cozinha-lifestyle-4600124-01-1.jpg?ims=1885x">
                <source media="(max-width: 1440px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/nectar-tial-laranja-1l-cozinha-lifestyle-4600124-01-1.jpg?ims=2372x">
                <img class="section-6__image"
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/nectar-tial-laranja-1l-cozinha-lifestyle-4600124-01-1.jpg?ims=2372x"
                    alt="Néctar de laranja Tial em embalagem de 1 litro pronto para beber" width="1600" height="650"
                    fetchpriority="high" loading="lazy" decoding="async">
            </picture>
            <div class="section-6__content">
                <h2 class="section-6__title">Agite, abra e sirva</h2>
                <p class="section-6__description">Pronto para beber, com sabor de laranja e consumo simples no dia a
                    dia.</p>
            </div>
        </section>

        <div class="section-15-container">
            <div class="section-15 is-reverse">
                <div class="section-15__content">
                    <!-- ══ TÍTULO + DESCRIÇÃO (apague este bloco se não quiser usar) ══ -->
                    <h2 class="section-15__title">
                        Feito com frutas e vitamina C
                    </h2>
                    <p class="section-15__desc">
                        A composição traz suco concentrado de laranja e maçã, além de vitamina C. Um néctar leve,
                        saboroso e fácil de incluir na rotina.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-laranja-tial-copo-lifestyle-4600124-01.jpg?ims=392x">
                        <source media="(max-width: 375px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-laranja-tial-copo-lifestyle-4600124-01.jpg?ims=496x">
                        <source media="(max-width: 425px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-laranja-tial-copo-lifestyle-4600124-01.jpg?ims=591x">
                        <source media="(max-width: 768px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-laranja-tial-copo-lifestyle-4600124-01.jpg?ims=582x">
                        <source media="(max-width: 1024px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-laranja-tial-copo-lifestyle-4600124-01.jpg?ims=816x">
                        <source media="(max-width: 1440px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-laranja-tial-copo-lifestyle-4600124-01.jpg?ims=1007x">
                        <img class="section-15__image"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-laranja-tial-copo-lifestyle-4600124-01.jpg?ims=1007x"
                            alt="Embalagem do Néctar Tial sabor laranja de 1 litro" loading="lazy" decoding="async">
                    </picture>
                </div>
            </div>
        </div>

        <div class="section-15-container section-15-container--soft" id="section-15-container">
            <div class="section-15">
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        Conservação simples, sabor sempre à mão
                    </h2>
                    <p class="section-15__desc">
                        Antes de abrir, mantenha em local seco, limpo, ventilado e protegido do sol. Após aberto,
                        conserve refrigerado entre 0 °C e 8 °C.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/nectar-tial-laranja-gondola-supermercado-4600124-02.jpg?ims=392x">
                        <source media="(max-width: 375px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/nectar-tial-laranja-gondola-supermercado-4600124-02.jpg?ims=496x">
                        <source media="(max-width: 425px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/nectar-tial-laranja-gondola-supermercado-4600124-02.jpg?ims=591x">
                        <source media="(max-width: 768px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/nectar-tial-laranja-gondola-supermercado-4600124-02.jpg?ims=582x">
                        <source media="(max-width: 1024px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/nectar-tial-laranja-gondola-supermercado-4600124-02.jpg?ims=816x">
                        <source media="(max-width: 1440px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/nectar-tial-laranja-gondola-supermercado-4600124-02.jpg?ims=1007x">
                        <img class="section-15__image"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/nectar-tial-laranja-gondola-supermercado-4600124-02.jpg?ims=1007x"
                            alt="Caixa com unidades do Néctar Tial sabor laranja" loading="lazy" decoding="async">
                    </picture>
                </div>
            </div>
        </div>

        <!-- Área de FAQ -->
        <section class="faq-section" aria-labelledby="faq-section-title">
            <div class="faq-section__header">
                <h3 class="faq-section__title" id="faq-section-title">Dúvidas sobre o Néctar Tial Laranja</h3>
                <p class="faq-section__subtitle">Respostas rápidas para escolher e consumir melhor.</p>
            </div>
            <ul class="faq-section__list">
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Para que serve o Suco Tial Néctar Laranja 1L e para quem é
                                recomendado?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O Suco Tial Néctar Laranja 1L serve como uma bebida prática e
                                pronta para o consumo em refeições diárias. Esse produto é recomendado para pessoas que
                                buscam a conveniência de um refresco saboroso que dispensa qualquer tipo de preparo. O
                                kit com 12 unidades garante o estoque ideal para abastecer a rotina de consumo de toda a
                                família.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">O Suco Tial Néctar Laranja apresenta um bom diferencial e
                                qualidade no sabor?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Sim. O Suco Tial Néctar Laranja entrega alta qualidade por
                                ser feito com trinta por cento de puro suco concentrado. A bebida se diferencia pelo
                                equilíbrio entre ingredientes selecionados que preservam as características originais da
                                fruta. Essa receita garante uma experiência sensorial refrescante e muito agradável para
                                quem aprecia um bom néctar.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">O Suco Tial Néctar Laranja é seguro para o consumo de todos?
                            </h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Sim. O Suco Tial Néctar Laranja é seguro para consumo desde
                                que a sua embalagem protetora não esteja danificada. O produto segue orientações rígidas
                                de fábrica para que o líquido chegue totalmente adequado e protegido ao consumidor. Essa
                                integridade na embalagem assegura que a bebida mantenha as propriedades saudáveis para
                                um consumo tranquilo.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Qual é a tecnologia ou composição de ingredientes do Suco
                                Tial Néctar Laranja?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O Suco Tial Néctar Laranja é composto de água, açúcar, suco
                                concentrado de laranja e suco concentrado de maçã. A fórmula ainda emprega vitamina C,
                                concentrado de cenoura e maçã, aromatizante e acidulante ácido cítrico na mistura. O uso
                                desses componentes naturais garante um alimento equilibrado e saboroso para a dieta do
                                dia a dia.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Qual característica técnica específica de capacidade o Suco
                                Tial Néctar Laranja possui?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O Suco Tial Néctar Laranja possui a característica de vir em
                                uma embalagem com 12 unidades volumosas de 1 litro. O produto apresenta a especificação
                                técnica de 30% de suco, que pode variar em cor e sabor conforme a safra. Esse formato
                                comercial gera o benefício de alto rendimento e economia para o estoque da sua despensa.
                            </p>
                        </div>
                    </details>
                </li>
            </ul>
        </section>

        <p
            style="color: #8a8a8a; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty; text-align: center; padding: 30px 0;">
            IMAGENS MERAMENTE ILUSTRATIVAS</p>
    </div>
</div>`,
  css: ``
}
);
