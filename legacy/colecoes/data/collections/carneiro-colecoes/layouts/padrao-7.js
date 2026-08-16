// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "padrao-7",
  name: "Padrão 7",
  html: `<div class="lp-container">
    <meta charset="UTF-8">
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .pdp {
            display: flex;
            flex-direction: column;
            width: 100%;
            color: #1f1f1f;
            font-family: Roboto, sans-serif;
        }

        .pdp-note {
            color: #8a8a8a;
            font-family: sans-serif;
            font-size: clamp(1rem, 2vw, 1.2rem);
            text-wrap: pretty;
            text-align: center;
            padding: 30px 0;
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
            padding: 2.5rem 1rem 3rem;
            box-sizing: border-box;
            margin: 0 auto;
            font-family: sans-serif;
            background: #f7f5f1;
        }

        .faq-section__header {
            text-align: center;
            margin: 0 auto 1.75rem;
        }

        .faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #1f1f1f;
            margin: 0 0 12px;
            line-height: 1.15;
        }

        .faq-section__subtitle {
            font-size: 1rem;
            color: #5c5c5c;
            margin: 0;
            line-height: 1.6;
        }

        .faq-section__list {
            list-style: none;
            margin: 0 auto;
            padding: 0;
            max-width: 56rem;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .faq-section__item {
            background: #fff;
            border: 1px solid #e4ded4;
            border-radius: 8px;
            overflow: hidden;
        }

        .faq-section__details {
            margin: 0;
        }

        .faq-section__summary {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 16px 20px;
            cursor: pointer;
            list-style: none;
        }

        .faq-section__summary::-webkit-details-marker {
            display: none;
        }

        .faq-section__summary:hover {
            background: #fbfaf7;
        }

        .faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #1f1f1f;
            flex: 1;
            margin: 0;
            line-height: 1.35;
        }

        .faq-section__q-text:hover {
            color: #ea5b0c;
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
            background: #888;
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
            border-top: 1px solid #e4ded4;
        }

        .faq-section__a-text {
            font-size: 0.9rem;
            color: #555;
            line-height: 1.6;
            margin: 0;
        }

        @media (min-width: 576px) {
            .faq-section__q-text {
                font-size: 1rem;
            }
        }

        @media (min-width: 768px) {
            .faq-section {
                padding: 3rem 1.5rem 3.25rem;
            }
        }

        @media (min-width: 1200px) {
            .faq-section {
                padding: 3.5rem 2rem 3.75rem;
            }
        }
    </style>

    <style>
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
            padding: calc(var(--badge-size) / 2 + 1.8rem) 0.3rem 2.5rem;
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
    </style>

    <style>
        .v7 {
            overflow: hidden;
            background: #0d0d0d;
        }

        .v7__ticker-wrap {
            background: #254c2d;
            overflow: hidden;
            white-space: nowrap;
            padding: 10px 0;
            color: #f3f3f3;
        }

        .v7__ticker {
            display: inline-block;
            animation: ticker 18s linear infinite;
            font-family: 'Syne', sans-serif;
            font-size: 0.8rem;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #f3f3f3;
        }

        .v7__ticker-item {
            margin: 0 32px;
        }

        @keyframes ticker {
            from {
                transform: translateX(0);
            }

            to {
                transform: translateX(-50%);
            }
        }

        .v7__image-wrap {
            position: relative;
            height: 320px;
            overflow: hidden;
        }

        .v7__image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            filter: brightness(0.62) saturate(0.85);
        }

        .v7__over-img {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 24px;
        }

        .v7__over-title {
            font-family: 'Unbounded', sans-serif;
            font-size: clamp(2rem, 6vw, 4.5rem);
            font-weight: 900;
            color: #fff;
            line-height: 1.05;
            text-transform: uppercase;
            letter-spacing: 0;
            text-shadow: 0 4px 32px rgba(0, 0, 0, 0.5);
            margin: 0;
        }

        .v7__over-title-emphasis {
            color: #f6e613;
            font-style: normal;
            display: block;
        }

        @media (min-width: 768px) {
            .v7__image-wrap {
                height: 430px;
            }

            .v7__over-title {
                font-size: clamp(3rem, 6vw, 4.5rem);
            }
        }

        @media (min-width: 1200px) {
            .v7__image-wrap {
                height: 520px;
            }
        }
    </style>

    <style>
        .section-15 {
            display: flex;
            flex-direction: column-reverse;
            gap: 1.35rem;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
            background: #254c2d;
            padding: 1.25rem;
        }

        .section-15__image-wrapper {
            width: 100%;
            flex-shrink: 0;
        }

        .section-15__image {
            margin: auto;
            border-radius: 8px;
            display: block;
            object-fit: cover;
            width: 100%;
            max-width: 530px;
            aspect-ratio: 16 / 9;
        }

        .section-15__content {
            display: flex;
            flex-direction: column;
            width: 95%;
            margin: auto;
            box-sizing: border-box;
        }

        .section-15__title {
            color: #f3f3f3;
            font-size: 28px;
            font-weight: 600;
            line-height: 1.18;
            margin: 0 0 1rem;
            text-align: left;
        }

        .section-15__desc {
            color: #f3f3f3;
            font-size: 14px;
            line-height: 22px;
            margin: 0 0 1.5rem;
            text-align: left;
        }

        .section-15__feature-list {
            display: flex;
            flex-direction: column;
            list-style: none;
            margin: 0;
            gap: 1rem;
            padding: 0;
        }

        .section-15__feature-item {
            align-items: flex-start;
            display: flex;
            flex-direction: row;
            gap: 0.75rem;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.14);
            border-radius: 8px;
            padding: 0.9rem;
        }

        .section-15__feature-item-icon {
            border-radius: 8px;
            flex-shrink: 0;
            height: 44px;
            width: 44px;
            color: #f6e613;
            display: block;
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

        @media (min-width: 576px) {

            .section-15__feature-item-title {
                font-size: 1.1rem;
            }
        }

        @media (min-width: 768px) {


            .section-15 {
                align-items: center;
                flex-direction: row;
                gap: 1.5rem;
                justify-content: center;
            }

            .section-15__image {
                aspect-ratio: 16 / 9;
            }

            .section-15--reverse {
                flex-direction: row-reverse;
            }

            .section-15__image-wrapper {
                flex: 0 0 48%;
                max-width: 48%;
            }

            .section-15__image {
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

        @media (min-width: 992px) {
            .section-15 {
                gap: 2rem;
                padding: 1.75rem;
            }

            .section-15__feature-list {
                gap: 1.25rem;
            }
        }

        @media (min-width: 1200px) {
            .section-15 {
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

        @media (min-width: 1400px) {
            .section-15 {
                padding: 2rem;
            }
        }
    </style>

    <style>
        .section-11-container {
            padding: 1.4rem 1rem 2rem;
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
                max-width: 1400px;
            }
        }

        .section-11__header {
            text-align: center;
            margin: 0 auto 1.75rem;
        }

        .section-11__title {
            font-size: 28px;
            font-weight: 800;
            color: #1a1a1a;
            margin: 0;
            line-height: 1.25;
        }

        .section-11__grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.85rem;
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
            background: linear-gradient(180deg, #ffffff 0%, #fbfaf6 100%);
            border: 1px solid #e7dfd3;
            border-radius: 8px;
            padding: 1rem 0.8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.65rem;
            box-shadow: 0 10px 26px rgba(31, 31, 31, 0.06);
            transition: border-color 0.2s, transform 0.2s;
        }

        .section-11__item:hover {
            border-color: rgba(234, 91, 12, 0.34);
            transform: translateY(-2px);
        }

        .section-11__figure {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 58px;
            height: 58px;
            border-radius: 50%;
            background: #f2eadf;
        }

        .section-11__image {
            width: 2.45rem;
            height: auto;
            display: block;
        }

        .section-11__name {
            font-size: 0.875rem;
            font-weight: 700;
            color: #1a1a1a;
            margin: 0;
            line-height: 1.3;
        }

        .section-11__value {
            font-size: 0.875rem;
            color: #666;
            margin: 0;
            line-height: 1.4;
        }

        @media (min-width: 768px) {
            .section-11__title {
                font-size: 32px;
            }

            .section-11__item {
                padding: 1.15rem 0.9rem;
            }
        }

        @media (min-width: 1200px) {
            .section-11__grid {
                gap: 1rem;
            }

            .section-11__item {
                min-height: 210px;
                padding: 1.25rem 1rem;
            }
        }

        @media (max-width: 760px) {
            .is-reverse {
                flex-direction: column;
            }
        }
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="section-2-2" aria-label="Cabeçalho do produto">
            <header class="section-2-2__banner">
                <div class="section-2-2__banner-container">
                    <video class="section-2-2__banner-video"
                        poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/banner-amarelo-detalhe-grafico-pistola-pressao-delta-3024248-00.jpg"
                        preload="none" autoplay muted loop playsinline aria-hidden="true">
                        <source
                            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/rossi/header-rossi.mov">
                    </video>
                </div>

                <div class="section-2-2__badge" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/rossi/logo-rossi.png"
                        alt="Logo da marca" class="section-2-2__badge-img" loading="lazy">
                </div>
            </header>

            <article class="section-2-2__body">
                <small class="section-2-2__brand">── BAHU / ROSSI AIRGUNS ──</small>
                <h1 class="section-2-2__title">
                    Pistola de Pressão Rossi G17 Blowback <strong>CO2 4,5 mm</strong>
                </h1>
                <p class="section-2-2__subtitle">
                    Plataforma moderna com ação Blowback, sensação de recuo e funcionamento por CO2 para quem busca mais
                    realismo no treino recreativo e no colecionismo.
                </p>
            </article>
        </section>

        <section class="v7" aria-label="Hero Ticker">
            <div class="v7__ticker-wrap" aria-hidden="true">
                <span class="v7__ticker">
                    <span class="v7__ticker-item">CO2 Blowback</span>
                    <span class="v7__ticker-item">Polímero e metal</span>
                    <span class="v7__ticker-item">4,5 mm</span>
                    <span class="v7__ticker-item">16 esferas</span>
                    <span class="v7__ticker-item">328 FPS</span>
                    <span class="v7__ticker-item">CO2 Blowback</span>
                    <span class="v7__ticker-item">Polímero e metal</span>
                    <span class="v7__ticker-item">4,5 mm</span>
                    <span class="v7__ticker-item">16 esferas</span>
                    <span class="v7__ticker-item">328 FPS</span>
                </span>
            </div>
            <div class="v7__image-wrap">
                <picture>
                    <source media="(max-width: 179px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-10mm-lifestyle-3024233-01-2.jpg?ims=179x">
                    <source media="(max-width: 219px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-10mm-lifestyle-3024233-01-2.jpg?ims=219x">
                    <source media="(max-width: 309px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-10mm-lifestyle-3024233-01-2.jpg?ims=309x">
                    <source media="(max-width: 419px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-10mm-lifestyle-3024233-01-2.jpg?ims=419x">
                    <!-- troca de imagem -->
                    <source media="(max-width: 767px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-10mm-lifestyle-3024233-01-1.jpg?ims=767x">
                    <source media="(max-width: 991px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-10mm-lifestyle-3024233-01-1.jpg?ims=991x">
                    <img class="v7__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-10mm-lifestyle-3024233-01-1.jpg"
                        alt="Pistola de Pressão Rossi G17 Blowback CO2 4,5 mm" loading="lazy" decoding="async">
                </picture>
                <div class="v7__over-img">
                    <h2 class="v7__over-title">
                        Rossi
                        <em class="v7__over-title-emphasis">G17 Blowback</em>
                    </h2>
                </div>
            </div>
        </section>

        <div class="section-15-container">
            <div class="section-15 is-reverse">
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        Blowback funcional para mais realismo
                    </h2>
                    <p class="section-15__desc">
                        A Rossi G17 combina sistema CO2 e ação Blowback para movimentar o slide a cada disparo,
                        simulando o recuo e elevando a sensação de realismo. No calibre 4,5 mm, entrega praticidade,
                        precisão e ótima experiência para treino recreativo.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <picture>
                        <source media="(max-width: 179px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-perfil-lifestyle-3024233-03.jpg?ims=179x">
                        <source media="(max-width: 219px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-perfil-lifestyle-3024233-03.jpg?ims=219x">
                        <source media="(max-width: 309px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-perfil-lifestyle-3024233-03.jpg?ims=309x">
                        <source media="(max-width: 419px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-perfil-lifestyle-3024233-03.jpg?ims=419x">
                        <source media="(max-width: 575px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-perfil-lifestyle-3024233-03.jpg?ims=575x">
                        <img class="section-15__image"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-perfil-lifestyle-3024233-03.jpg"
                            alt="Detalhe da Pistola de Pressão Rossi G17 Blowback CO2 4,5 mm" loading="lazy" decoding="async">
                    </picture>
                </div>
            </div>
        </div>

        <section class="section-11" aria-labelledby="section-11-title">
            <div class="section-11-container">
                <div class="section-11__header">
                    <h2 class="section-11__title" id="section-11-title">Destaques técnicos em um formato mais compacto
                    </h2>
                </div>
                <ul class="section-11__grid" role="list">
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de sistema CO2" width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">Sistema CO2</h3>
                        <p class="section-11__value">Ação a gás CO2 com Blowback funcional, simulando recuo para uma
                            experiência mais realista.</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de calibre 4,5 mm" width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">Calibre 4,5 mm</h3>
                        <p class="section-11__value">Compatível com BBs e esferas de aço 4,5 mm, unindo precisão e
                            praticidade para treino e lazer.</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de carregador com 16 esferas" width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">16 esferas</h3>
                        <p class="section-11__value">Magazine para 16 esferas, mantendo bom ritmo em sessões de treino
                            recreativo.</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de velocidade de disparo" width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">328 FPS</h3>
                        <p class="section-11__value">Velocidade informada de 328 FPS, com potência de 1,7 joule para uso
                            recreativo equilibrado.</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de peso e comprimento do produto" width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">720 g e 220 mm</h3>
                        <p class="section-11__value">Dimensões que reforçam a presença da plataforma G17 e a sensação
                            firme no manuseio.</p>
                    </li>
                </ul>
            </div>
        </section>

        <div class="section-15-container">
            <div class="section-15 section-15--reverse">
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        Recursos pensados para controle e praticidade
                    </h2>
                    <p class="section-15__desc">
                        Além do forte apelo visual, a Rossi G17 reúne recursos voltados para realismo, ergonomia e
                        praticidade em treinos e recreação.
                    </p>
                    <ul class="section-15__feature-list" aria-label="Benefícios do produto">
                        <li class="section-15__feature-item">
                            <svg class="section-15__feature-item-icon" viewBox="0 0 48 48" aria-hidden="true"
                                focusable="false">
                                <circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" stroke-width="3" />
                                <circle cx="24" cy="24" r="5" fill="none" stroke="currentColor" stroke-width="3" />
                                <path d="M24 4v8M24 36v8M4 24h8M36 24h8" fill="none" stroke="currentColor"
                                    stroke-linecap="round" stroke-width="3" />
                            </svg>
                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Plataforma ergonômica</strong>
                                <p class="section-15__feature-item-text">Formato moderno para uma pegada confortável e
                                    firme durante o treino recreativo.</p>
                            </div>
                        </li>
                        <li class="section-15__feature-item">
                            <svg class="section-15__feature-item-icon" viewBox="0 0 48 48" aria-hidden="true"
                                focusable="false">
                                <path d="M10 18h28l-5-5M38 30H10l5 5" fill="none" stroke="currentColor"
                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                                <path d="M13 24h22" fill="none" stroke="currentColor" stroke-linecap="round"
                                    stroke-width="3" />
                            </svg>
                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Polímero e metal</strong>
                                <p class="section-15__feature-item-text">Construção que combina resistência, bom
                                    acabamento e sensação mais realista no uso.</p>
                            </div>
                        </li>
                        <li class="section-15__feature-item">
                            <svg class="section-15__feature-item-icon" viewBox="0 0 48 48" aria-hidden="true"
                                focusable="false">
                                <path d="M8 17h32M8 31h32" fill="none" stroke="currentColor" stroke-linecap="round"
                                    stroke-width="3" />
                                <path d="M13 17v14M20 17v14M28 17v14M35 17v14" fill="none" stroke="currentColor"
                                    stroke-linecap="round" stroke-width="3" />
                            </svg>
                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Slide móvel</strong>
                                <p class="section-15__feature-item-text">O Blowback movimenta o slide para trás a cada
                                    disparo, aproximando a experiência de uma arma real.</p>
                            </div>
                        </li>
                        <li class="section-15__feature-item">
                            <svg class="section-15__feature-item-icon" viewBox="0 0 48 48" aria-hidden="true"
                                focusable="false">
                                <rect x="12" y="21" width="24" height="18" rx="4" fill="none" stroke="currentColor"
                                    stroke-width="3" />
                                <path d="M17 21v-5a7 7 0 0 1 14 0v5" fill="none" stroke="currentColor"
                                    stroke-linecap="round" stroke-width="3" />
                                <path d="M24 28v5" fill="none" stroke="currentColor" stroke-linecap="round"
                                    stroke-width="3" />
                            </svg>
                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Autonomia de 50 tiros</strong>
                                <p class="section-15__feature-item-text">Rendimento informado de até 50 disparos,
                                    favorecendo sessões mais completas com uma cápsula de CO2.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="section-15__image-wrapper">
                    <picture>
                        <source media="(max-width: 179px)"
                            srcset=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-empunhadura-lifestyle-3024233-02.jpg?ims=179x">
                        <source media="(max-width: 219px)"
                            srcset=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-empunhadura-lifestyle-3024233-02.jpg?ims=219x">
                        <source media="(max-width: 309px)"
                            srcset=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-empunhadura-lifestyle-3024233-02.jpg?ims=309x">
                        <source media="(max-width: 419px)"
                            srcset=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-empunhadura-lifestyle-3024233-02.jpg?ims=419x">
                        <source media="(max-width: 575px)"
                            srcset=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-empunhadura-lifestyle-3024233-02.jpg?ims=575x">
                        <img class="section-15__image"
                            src=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/pistola-airsoft-rossi-g17-delta-empunhadura-lifestyle-3024233-02.jpg"
                            alt="Detalhe da Pistola de Pressão Rossi G17 Blowback CO2 4,5 mm" loading="lazy" decoding="async">
                    </picture>
                </div>
            </div>
        </div>

        <!-- Área de FAQ -->
        <section class="faq-section" aria-labelledby="faq-section-title">
            <div class="faq-section__header">
                <h2 class="faq-section__title" id="faq-section-title">Perguntas frequentes</h2>
                <p class="faq-section__subtitle">Informações rápidas para comparar os principais pontos da Rossi G17
                    Blowback.
                </p>
            </div>
            <ul class="faq-section__list">
                <li class="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 class="faq-section__q-text">Qual é o calibre da pistola?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O modelo utiliza calibre 4,5 mm e é indicado para esferas de
                                aço.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 class="faq-section__q-text">Como funciona o sistema de disparo?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">A pistola funciona por sistema CO2 com ação Blowback, em que o
                                slide se movimenta a cada disparo para simular recuo.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 class="faq-section__q-text">Qual é a capacidade do carregador?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O magazine comporta até 16 esferas de aço 4,5 mm.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 class="faq-section__q-text">Ela possui quais recursos de controle?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O modelo conta com ação Blowback, slide móvel, construção em
                                polímero e metal, plataforma ergonômica e autonomia de até 50 tiros.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 class="faq-section__q-text">Para qual uso ela é indicada?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">É indicada para treino recreativo, diversão e colecionismo,
                                inclusive para iniciantes, intermediários e colecionadores.</p>
                        </div>
                    </details>
                </li>
            </ul>
        </section>

        <p class="pdp-note">IMAGENS MERAMENTE ILUSTRATIVAS</p>
    </div>
</div>
`,
  css: ``
}
);
