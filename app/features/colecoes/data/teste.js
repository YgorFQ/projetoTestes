// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   app/features/colecoes/data/teste.js — Coleção: Teste

   ATENÇÃO: Arquivo gerado pelo modulo GitHub de Colecoes.
   NÃO edite manualmente em produção.
═══════════════════════════════════════════════════════════════════════ */
ColLib.register({
  slug:  'teste',
  name:  'Teste',
  group: 'egambling',
  tags:  ['ser gamer', 'ser um jogador', 'tcs'],
  layouts: [
    /*@@@@Col - teste */
    {
      id:   'teste',
      name: 'Teste',
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
            --pos-x: 47%;
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
        /* ── Variáveis de marca ─────────────────────────────── */
        .section-32 {
            --s32-color-brand: #7b1d2e;
            --s32-color-bg: #faf7f2;
            --s32-color-tab-bg: #f0ebe3;
            --s32-color-text: #2c1a12;
            --s32-color-muted: #6b5044;
            --s32-color-border: #d9cfc4;
        }

        /* ── Inputs de controle: escondidos mas acessíveis ──── */
        .section-32__radio {
            position: absolute;
            width: 1px;
            height: 1px;
            opacity: 0;
            pointer-events: none;
        }

        /* ── Wrapper geral ──────────────────────────────────── */
        .section-32 {
            background-color: var(--s32-color-bg);
            padding: 2rem 1rem;
            font-family: Georgia, serif;
            position: relative;
        }

        .section-32-container {
            width: 100%;
            margin-inline: auto;
        }

        /* ── Nav de abas ────────────────────────────────────── */
        .section-32__nav {
            display: flex;
            border-bottom: 2px solid var(--s32-color-border);
            overflow-x: auto;
            scrollbar-width: none;
        }

        .section-32__nav::-webkit-scrollbar {
            height: 0;
        }

        .section-32__tab-label {
            flex: 1 0 auto;
            min-width: 7rem;
            padding: 0.75rem 1rem;
            font-size: clamp(0.8rem, 1.5vw, 0.9rem);
            font-family: Arial, sans-serif;
            color: var(--s32-color-muted);
            background-color: var(--s32-color-tab-bg);
            border: 1px solid var(--s32-color-border);
            border-bottom: none;
            cursor: pointer;
            text-align: center;
            white-space: nowrap;
            transition: background-color 0.2s, color 0.2s;
            user-select: none;
        }

        /* ── Painéis ────────────────────────────────────────── */
        .section-32__panels {
            border: 1px solid var(--s32-color-border);
            border-top: none;
            background-color: #ffffff;
        }

        /* Painel oculto: fora do fluxo mas sem display:none */
        .section-32__panel {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
            scroll-margin-top: 0;
        }

        /* ── Split — mobile: coluna única ───────────────────── */
        .section-32__split {
            display: flex;
            flex-direction: column;
            align-items: start;
        }

        .section-32__figure {
            width: 100%;
            margin: 0;
            aspect-ratio: 4/3;
            overflow: hidden;
        }

        .section-32__image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .section-32__body {
            padding: 1.5rem 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: start;
        }

        .section-32__title {
            font-size: clamp(1.25rem, 3vw, 1.75rem);
            color: var(--s32-color-brand);
            line-height: 1.3;
            margin: 0;
            font-weight: 700;
        }

        .section-32__description {
            font-size: clamp(0.875rem, 1.5vw, 1rem);
            color: var(--s32-color-text);
            line-height: 1.7;
            margin: 0;
            font-family: Arial, sans-serif;
        }

        .section-32__location {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: clamp(0.8rem, 1.2vw, 0.875rem);
            color: var(--s32-color-brand);
            font-family: Arial, sans-serif;
        }

        /* ── :checked — ativa aba ───────────────────────────── */
        #s32-tab1:checked~.section-32-container .section-32__tab-label[for="s32-tab1"],
        #s32-tab2:checked~.section-32-container .section-32__tab-label[for="s32-tab2"],
        #s32-tab3:checked~.section-32-container .section-32__tab-label[for="s32-tab3"],
        #s32-tab4:checked~.section-32-container .section-32__tab-label[for="s32-tab4"] {
            background-color: var(--s32-color-brand);
            color: #ffffff;
            border-color: var(--s32-color-brand);
        }

        /* ── :checked — ativa painel ───────────────────────── */
        #s32-tab1:checked~.section-32-container .section-32__panel--1,
        #s32-tab2:checked~.section-32-container .section-32__panel--2,
        #s32-tab3:checked~.section-32-container .section-32__panel--3,
        #s32-tab4:checked~.section-32-container .section-32__panel--4 {
            position: static;
            width: auto;
            height: auto;
            overflow: visible;
            opacity: 1;
            pointer-events: auto;
        }

        /* ── Breakpoint 768px — split lado a lado ───────────── */
        @media (min-width: 768px) {
            .section-32-container {
                max-width: 768px;
            }

            .section-32__split {
                flex-direction: row;
            }

            .section-32__figure {
                flex: 0 0 45%;
                aspect-ratio: 4/3;
            }

            .section-32__body {
                flex: 1;
                padding: 2rem 1.5rem;
                justify-content: center;
            }

            /* imagem à direita */
            .section-32__split--reverse {
                flex-direction: row-reverse;
            }
        }

        @media (min-width: 992px) {
            .section-32-container {
                max-width: 992px;
            }

            .section-32__figure {
                flex: 0 0 42%;
            }

            .section-32__body {
                padding: 2rem;
            }
        }

        @media (min-width: 1200px) {
            .section-32-container {
                max-width: 1200px;
            }
        }

        @media (min-width: 1400px) {
            .section-32-container {
                max-width: 1400px;
            }
        }
    </style>


    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <article class="pdp" id="pdp" aria-labelledby="product-main-title"> <!-- HTML fica dentro dessa div PDP -->

        <section class="product-header-2" aria-label="Cabeçalho do produto">
            <header class="product-header__banner-2">
                <figure style="width:100%;height:100%;margin:0;">
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/header.jpg?ims=288x">
                        <source media="(max-width: 375px)"
                            srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/header.jpg?ims=343x">
                        <source media="(max-width: 425px)"
                            srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/header.jpg?ims=393x">
                        <source media="(max-width: 768px)"
                            srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/header.jpg?ims=736x">
                        <source media="(max-width: 1024px)"
                            srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/header.jpg?ims=992x">
                        <source media="(max-width: 1440px)"
                            srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/header.jpg?ims=1248x">
                        <img class="product-header__banner-img-2"
                            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/header.jpg"
                            alt="Banner do produto" loading="eager" decoding="async">
                    </picture>
                </figure>
                <div class="product-header__badge-2" role="img" aria-label="Logo da marca">
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo.png?ims=90x">
                        <source media="(max-width: 375px)"
                            srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo.png?ims=90x">
                        <source media="(max-width: 425px)"
                            srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo.png?ims=90x">
                        <source media="(max-width: 768px)"
                            srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo.png?ims=90x">
                        <source media="(max-width: 1024px)"
                            srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo.png?ims=90x">
                        <source media="(max-width: 1440px)"
                            srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo.png?ims=90x">
                        <img class="product-header__badge-img-2"
                            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo.png"
                            alt="Ícone da marca" loading="lazy" decoding="async">
                    </picture>
                </div>
            </header>
            <article class="product-header__body-2">
                <small class="product-header__brand-2">── Marca ──</small>
                <h2 class="product-header__title-2">
                    <span>TÍTULO DO PRODUTO GAMER</span>
                    <strong>Nome, Modelo e Diferencial</strong>
                </h2>
                <p class="product-header__subtitle-2">
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto">
            <picture>
                <source media="(max-width: 320px)"
                    srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-2.png?ims=274x">
                <source media="(max-width: 375px)"
                    srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-2.png?ims=326x">
                <source media="(max-width: 425px)"
                    srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-2.png?ims=374x">
                <source media="(max-width: 760px)"
                    srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-2.png?ims=692x">
                <!-- troca de imagem -->
                <source media="(max-width: 768px)" srcset="C:\\Users\\ygorq\\Downloads\\917580_01-1.webp?ims=736x">
                <source media="(max-width: 1024px)" srcset="C:\\Users\\ygorq\\Downloads\\917580_01-1.webp?ims=992x">
                <source media="(max-width: 1440px)" srcset="C:\\Users\\ygorq\\Downloads\\917580_01-1.webp?ims=1248x">
                <img class="section-6__image" src="C:\\Users\\ygorq\\Downloads\\917580_01-1.webp"
                    alt="Caderno Funny Cat com estampa de gatinhos, capa colorida e espiral" width="1600" height="650"
                    fetchpriority="high" loading="lazy" decoding="async">
            </picture>
            <div class="section-6__content">
                <h2 class="section-6__title">Caderno Funny Cat</h2>
                <p class="section-6__description">Organize seus estudos com fofura e estilo!</p>
            </div>
        </section>

        <section class="section-32" aria-label="Abas de conteúdo sobre o produto">

            <!-- Inputs ANTES do container para o seletor ~ funcionar -->
            <input class="section-32__radio" type="radio" name="s32-tabs" id="s32-tab1" checked="" aria-hidden="true">
            <input class="section-32__radio" type="radio" name="s32-tabs" id="s32-tab2" aria-hidden="true">
            <input class="section-32__radio" type="radio" name="s32-tabs" id="s32-tab3" aria-hidden="true">
            <input class="section-32__radio" type="radio" name="s32-tabs" id="s32-tab4" aria-hidden="true">

            <div class="section-32-container">

                <!-- Nav -->
                <nav class="section-32__nav" role="tablist" aria-label="Seções do produto">
                    <label class="section-32__tab-label" for="s32-tab1" role="tab">Origem</label>
                    <label class="section-32__tab-label" for="s32-tab2" role="tab">Processo</label>
                    <label class="section-32__tab-label" for="s32-tab3" role="tab">Envelhecimento</label>
                    <label class="section-32__tab-label" for="s32-tab4" role="tab">Perfil Sensorial</label>
                </nav>

                <!-- Painéis -->
                <div class="section-32__panels">

                    <!-- Painel 1 — imagem à ESQUERDA -->
                    <article class="section-32__panel section-32__panel--1" role="tabpanel" aria-label="Origem">
                        <div class="section-32__split">
                            <figure class="section-32__figure">
                                <picture>
                                    <source media="(max-width: 320px)"
                                        srcset="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ims=254x">
                                    <source media="(max-width: 375px)"
                                        srcset="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ims=309x">
                                    <source media="(max-width: 425px)"
                                        srcset="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ims=359x">
                                    <source media="(max-width: 768px)"
                                        srcset="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ims=316x">
                                    <source media="(max-width: 1024px)"
                                        srcset="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ims=403x">
                                    <source media="(max-width: 1440px)"
                                        srcset="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ims=510x">
                                    <img class="section-32__image"
                                        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64"
                                        alt="Barris de carvalho enfileirados em adega escura — local de origem do Domecq"
                                        width="800" height="600" loading="lazy" decoding="async">
                                </picture>
                            </figure>
                            <div class="section-32__body">
                                <h2 class="section-32__title">Tradição brasileira<br>que atravessa gerações</h2>
                                <p class="section-32__description">Produzido no Brasil pela Pernod Ricard Brasil, em
                                    Resende – RJ, o Domecq
                                    Coquetel Composto é elaborado com ingredientes selecionados que garantem seu aroma
                                    frutado e sabor
                                    inigualável. Uma receita clássica, feita para momentos que merecem ser celebrados.
                                </p>
                                <span class="section-32__location" aria-label="Localização: Resende, RJ, Brasil">
                                </span>
                            </div>
                        </div>
                    </article>

                    <!-- Painel 2 — imagem à DIREITA -->
                    <article class="section-32__panel section-32__panel--2" role="tabpanel" aria-label="Processo">
                        <div class="section-32__split section-32__split--reverse">
                            <figure class="section-32__figure">
                                <picture>
                                    <source media="(max-width: 320px)"
                                        srcset="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ims=1x">
                                    <source media="(max-width: 375px)"
                                        srcset="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ims=1x">
                                    <source media="(max-width: 425px)"
                                        srcset="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ims=1x">
                                    <source media="(max-width: 768px)"
                                        srcset="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ims=1x">
                                    <source media="(max-width: 1024px)"
                                        srcset="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ims=1x">
                                    <source media="(max-width: 1440px)"
                                        srcset="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ims=1x">
                                    <img class="section-32__image"
                                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                                        alt="Mesa com ingredientes e utensílios do processo artesanal de destilação"
                                        width="800" height="600" loading="lazy" decoding="async">
                                </picture>
                            </figure>
                            <div class="section-32__body">
                                <h2 class="section-32__title">Destilação artesanal<br>com técnica centenária</h2>
                                <p class="section-32__description">Cada lote é produzido com controle rigoroso de
                                    temperatura e tempo de
                                    fermentação. O processo combina métodos tradicionais herdados de mestres
                                    destiladores com padrões modernos
                                    de qualidade que garantem consistência e pureza em cada garrafa.</p>
                                <span class="section-32__location" aria-label="Processo realizado em Resende, RJ">
                                </span>
                            </div>
                        </div>
                    </article>

                    <!-- Painel 3 — imagem à ESQUERDA -->
                    <article class="section-32__panel section-32__panel--3" role="tabpanel" aria-label="Envelhecimento">
                        <div class="section-32__split">
                            <figure class="section-32__figure">
                                <picture>
                                    <source media="(max-width: 320px)"
                                        srcset="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ims=1x">
                                    <source media="(max-width: 375px)"
                                        srcset="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ims=1x">
                                    <source media="(max-width: 425px)"
                                        srcset="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ims=1x">
                                    <source media="(max-width: 768px)"
                                        srcset="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ims=1x">
                                    <source media="(max-width: 1024px)"
                                        srcset="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ims=1x">
                                    <source media="(max-width: 1440px)"
                                        srcset="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ims=1x">
                                    <img class="section-32__image"
                                        src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3"
                                        alt="Taça com destilado âmbar iluminado — resultado do envelhecimento em barris de carvalho"
                                        width="800" height="600" loading="lazy" decoding="async">
                                </picture>
                            </figure>
                            <div class="section-32__body">
                                <h2 class="section-32__title">Envelhecido em carvalho<br>para sabor complexo</h2>
                                <p class="section-32__description">O descanso em barris de carvalho americano confere ao
                                    Domecq notas
                                    amadeiradas, caramelo e baunilha que equilibram a doçura natural da bebida. O tempo
                                    de maturação é
                                    cuidadosamente monitorado para atingir o ponto exato de harmonia entre força e
                                    suavidade.</p>
                                <span class="section-32__location"
                                    aria-label="Envelhecimento em adega própria em Resende, RJ">
                                </span>
                            </div>
                        </div>
                    </article>

                    <!-- Painel 4 — imagem à DIREITA -->
                    <article class="section-32__panel section-32__panel--4" role="tabpanel"
                        aria-label="Perfil Sensorial">
                        <div class="section-32__split section-32__split--reverse">
                            <figure class="section-32__figure">
                                <picture>
                                    <source media="(max-width: 320px)"
                                        srcset="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ims=1x">
                                    <source media="(max-width: 375px)"
                                        srcset="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ims=1x">
                                    <source media="(max-width: 425px)"
                                        srcset="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ims=1x">
                                    <source media="(max-width: 768px)"
                                        srcset="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ims=1x">
                                    <source media="(max-width: 1024px)"
                                        srcset="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ims=1x">
                                    <source media="(max-width: 1440px)"
                                        srcset="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ims=1x">
                                    <img class="section-32__image"
                                        src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                                        alt="Prato gourmet com ingredientes aromáticos que representam o perfil sensorial do produto"
                                        width="800" height="600" loading="lazy" decoding="async">
                                </picture>
                            </figure>
                            <div class="section-32__body">
                                <h2 class="section-32__title">Aroma frutado,<br>sabor inigualável</h2>
                                <p class="section-32__description">No nariz, notas de frutas tropicais, especiarias
                                    suaves e um toque de
                                    mel. Na boca, a entrada é redonda e envolvente, com final longo e persistente. Um
                                    perfil sensorial
                                    equilibrado que agrada tanto apreciadores experientes quanto quem descobre o mundo
                                    dos destilados pela
                                    primeira vez.</p>
                                <span class="section-32__location"
                                    aria-label="Avaliação sensorial certificada — Resende, RJ">
                                </span>
                            </div>
                        </div>
                    </article>

                </div><!-- /.section-32__panels -->
            </div><!-- /.section-32-container -->
        </section>

        <p style="color: #8a8a8a; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty;
            text-align: center; padding: 30px 0;">
            IMAGENS MERAMENTE ILUSTRATIVAS
        </p>

        <!-- Área de FAQ -->
        <section id="faq-section" aria-labelledby="faq-section-title">
            <div id="faq-section__header">
                <h2 id="faq-section__title">Título Principal</h2>
                <p id="faq-section__subtitle">Sub-título</p>
            </div>
            <ul id="faq-section__list">
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Pergunta</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Pergunta</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Pergunta</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Pergunta</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Pergunta</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
            </ul>
        </section>

    </article>
</div>`,
      css:  ``,
    },

  ]
});
