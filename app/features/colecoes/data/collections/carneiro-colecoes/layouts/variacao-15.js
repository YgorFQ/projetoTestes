// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "variacao-15",
  name: "Variação 15",
  html: `<div class="lp-container" style="background-color: #fef9f4;">
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

        @keyframes pdp-fade-up {
            from {
                opacity: 0;
                transform: translateY(22px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes pdp-soft-shine {
            from {
                transform: translateX(-120%) rotate(8deg);
            }

            to {
                transform: translateX(135%) rotate(8deg);
            }
        }

        @keyframes pdp-hero-content {
            from {
                opacity: 0;
                transform: translateY(calc(-50% + 22px));
            }

            to {
                opacity: 1;
                transform: translateY(-50%);
            }
        }

        @keyframes pdp-choco-glow {
            from {
                filter: saturate(0.96) brightness(0.98);
            }

            to {
                filter: saturate(1.08) brightness(1.03);
            }
        }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet">
    <title>Biscoito Itamaraty Recheado Chocolate 30x76g</title>
    <!-- ---------------------------------------- ÁREA PARA COLOCAR STYLES ----------------------------------------------------------- -->
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
            background-color: #fff8ef;
            padding: 1.5rem;
            width: 100%;
            box-sizing: border-box;
        }

        .section-15 {
            display: flex;
            flex-direction: column-reverse;
            /* ← era column-reverse */
            gap: 1.25rem;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
            animation: pdp-fade-up 0.78s ease both;
        }

        .section-15__image-wrapper {
            width: 100%;
            flex-shrink: 0;
        }

        .section-15__image {
            margin: auto;
            display: block;
            object-fit: cover;
            width: 100%;
            max-width: 530px;
            aspect-ratio: 16 / 9;
            border-radius: 18px;
            box-shadow: 0 18px 38px rgba(63, 33, 24, 0.14);
            transition: transform 0.75s ease, box-shadow 0.75s ease, filter 0.75s ease;
        }

        .section-15:hover .section-15__image {
            transform: scale(1.025);
            filter: saturate(1.05) contrast(1.03);
            box-shadow: 0 24px 54px rgba(63, 33, 24, 0.22);
        }

        .section-15__content {
            display: flex;
            flex-direction: column;
            width: 95%;
            margin: auto;
            box-sizing: border-box;
        }

        .section-15__title {
            color: #3f2118;
            font-size: 32px;
            font-weight: 600;
            line-height: 40px;
            margin: 0 0 1rem;
            text-align: left;
        }

        .section-15__desc {
            color: #6f4a33;
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
            padding: 0.85rem 0.9rem;
            border: 1px solid rgba(123, 61, 34, 0.14);
            border-radius: 14px;
            background: rgb(255 248 239);
            transition: transform 0.32s ease, border-color 0.32s ease, box-shadow 0.32s ease;
        }

        .section-15__feature-item:hover {
            transform: translateY(-3px);
            border-color: rgba(123, 61, 34, 0.34);
            box-shadow: 0 14px 28px rgba(63, 33, 24, 0.12);
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
            color: #3f2118;
            font-size: 1.05rem;
            font-weight: 700;
            line-height: 1.35;
            margin: 0;
        }

        .section-15__feature-item-text {
            color: #6f4a33;
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
    </style>

    <style>
        /*inicio-area-de-faq*/
        #faq-section {
            width: 100%;
            padding: 2rem 16px;
            box-sizing: border-box;
            margin: 0 auto 25px;
            padding-top: 0;
            font-family: sans-serif;
            background: #fffaf4;
            animation: pdp-fade-up 0.78s ease both;
        }

        #faq-section__header {
            text-align: center;
            margin: 1rem 0;
        }

        #faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #3f2118;
            margin: 0 0 12px;
            line-height: 98%;
        }

        #faq-section__subtitle {
            font-size: 1rem;
            color: #6f4a33;
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
            border: 1px solid rgba(123, 61, 34, 0.16);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 24px rgba(63, 33, 24, 0.05);
            transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
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
            background: rgba(255, 240, 221, 0.72);
        }

        #faq-section__item:hover {
            transform: translateY(-2px);
            border-color: rgba(123, 61, 34, 0.34);
            box-shadow: 0 16px 34px rgba(63, 33, 24, 0.12);
        }

        #faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #3f2118;
            flex: 1;
        }

        #faq-section__q-text:hover {
            color: #7b3d22;
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
            background: #7b3d22;
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
            border-top: 1px solid rgba(123, 61, 34, 0.16);
        }

        #faq-section__a-text {
            font-size: 0.9rem;
            color: #6f4a33;
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
            --pos-x: 2%;
            --color-title: #fff0dd;
            --bg-box: rgba(63, 33, 24, 0.58);

            width: 100%;
            position: relative;
            overflow: hidden;
            background: #3f2118;
        }

        /* ===== IMAGEM ===== */
        .section-6__image {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 1s ease, filter 1s ease;
        }

        .section-6:hover .section-6__image {
            transform: scale(1.018);
            filter: saturate(1.06) contrast(1.03);
        }

        /* ===== CONTEÚDO SOBREPOSTO ===== */
        .section-6__content {
            position: absolute;
            top: var(--pos-y);
            left: clamp(0%, var(--pos-x), 100%);
            transform: translateY(-50%);
            max-width: min(40%, 480px);
            z-index: 10;
            background-color: var(--bg-box);
            padding: clamp(12px, 2vw, 20px);
            border-radius: 15px;
            backdrop-filter: blur(4px);
            overflow: hidden;
            box-shadow: 0 20px 46px rgba(63, 33, 24, 0.28);
            animation: pdp-hero-content 0.78s ease both;
        }

        .section-6__content::after {
            content: "";
            position: absolute;
            inset: -40% auto -40% 0;
            width: 36%;
            background: linear-gradient(90deg, transparent, rgba(255, 240, 221, 0.18), transparent);
            animation: pdp-soft-shine 5s ease-in-out infinite;
            pointer-events: none;
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
            .section-6 {
                border-radius: 0;
                padding-top: 15px;
            }

            .section-6__content {
                position: static;
                transform: none;
                max-width: 100%;
                padding: 24px 20px 0 20px;
                background: transparent;
                backdrop-filter: none;
                text-align: center;
                box-shadow: none;
                animation: pdp-fade-up 0.78s ease both;
            }

            .section-6__content::after {
                display: none;
            }

            .section-6__title {
                font-size: 1.8rem;
                color: #f1eae8;
                text-shadow: none;
            }

            .section-6__description {
                margin-bottom: 0;
                font-size: 1.1rem;
                color: #f1eae8;
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

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->


        <section class="product-header-2" aria-label="Cabeçalho do produto">
            <header class="product-header__banner-2">
                <figure style="width:100%;height:100%;margin:0;">
                    <img src="C:\\Users\\ygorq\\Downloads\\header_degrade_4303600_00.webp" alt="Banner do produto"
                        class="product-header__banner-img-2" loading="eager">
                </figure>
                <div class="product-header__badge-2" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/itamaraty/itamaraty-logo.png"
                        alt="Ícone da marca" class="product-header__badge-img-2">
                </div>
            </header>
            <article class="product-header__body-2">
                <small class="product-header__brand-2">── itamaraty ──</small>
                <h2 class="product-header__title-2">
                    <span>Biscoito Recheado Chocolate</span>
                    <strong>caixa com 30 unidades de 76g</strong>
                </h2>
                <p class="product-header__subtitle-2">
                    Sabor chocolate em porções práticas para vender, compartilhar ou abastecer a rotina com um doce
                    fácil de levar.
                </p>
            </article>
        </section>


        <section class="section-6" aria-label="Destaque do produto com texto">
            <picture>
                <source media="(max-width: 760px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/biscoito-recheado-itamaraty-chocolate-76g-fundo-infinito-splash-4303600-01-2.webp"
                    width="780" height="400">
                <img class="section-6__image"
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/biscoito-recheado-itamaraty-chocolate-76g-ambientada-splash-4303600-01-1.webp"
                    alt="Biscoito Itamaraty Recheado Chocolate com embalagem sobre calda de chocolate" width="1600"
                    height="650" loading="lazy" fetchpriority="high" decoding="async">
            </picture>
            <div class="section-6__content">
                <h2 class="section-6__title">Recheado de chocolate para qualquer pausa</h2>
                <p class="section-6__description">Pacote de 76g com biscoito crocante e recheio sabor chocolate em uma
                    caixa com 30 unidades.</p>
            </div>
        </section>


        <div class="section-15-container" style="background-color: #fff8ef;">
            <div class="section-15 is-reverse">
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        Prático para vender, servir ou ter sempre por perto
                    </h2>

                    <p class="section-15__desc">
                        A caixa com 30 pacotes de 76g facilita o abastecimento de lanchonetes, mercearias, escritórios
                        ou despensas que precisam de porções individuais de giro rápido.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <img class="section-15__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/biscoito-recheado-itamaraty-chocolate-76g-detalhe-mesa-cafe-4303600-03.webp"
                        alt="Pessoa consumindo biscoito recheado Itamaraty Chocolate" loading="lazy" decoding="async">
                </div>
            </div>
        </div>

        <div class="section-15-container" style="background-color: #3f2118;">
            <div class="section-15">
                <div class="section-15__content">
                    <ul class="section-15__feature-list" aria-label="Benefícios do produto">
                        <li class="section-15__feature-item">
                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Chocolate que chama atenção</strong>
                                <p class="section-15__feature-item-text">Sabor clássico para quem procura um doce rápido
                                    e fácil de escolher.</p>
                            </div>
                        </li>
                        <li class="section-15__feature-item">
                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">30 unidades na caixa</strong>
                                <p class="section-15__feature-item-text">Formato ideal para reposição, revenda ou
                                    consumo compartilhado.</p>
                            </div>
                        </li>
                        <li class="section-15__feature-item">
                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Pacote individual de 76g</strong>
                                <p class="section-15__feature-item-text">Porção prática para levar, expor no balcão ou
                                    incluir no lanche.</p>
                            </div>
                        </li>
                        <li class="section-15__feature-item">
                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Informação clara de alérgenos</strong>
                                <p class="section-15__feature-item-text">Contém glúten e derivados de trigo e soja,
                                    conforme ficha do produto.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="section-15__image-wrapper">
                    <img class="section-15__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/biscoito-recheado-itamaraty-chocolate-76g-lifestyle-modelo-4303600-02.webp"
                        alt="Biscoito Itamaraty Recheado Chocolate em mesa com café e embalagem de 76g" loading="lazy"
                        decoding="async">
                </div>
            </div>
        </div>

        <p
            style="color: #8a8a8a; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty; text-align: center; padding: 30px 0;">
            IMAGENS MERAMENTE ILUSTRATIVAS</p>

        <section id="faq-section" aria-labelledby="faq-section-title">
            <div id="faq-section__header">
                <h2 id="faq-section__title" id="faq-section-title">Dúvidas Frequentes</h2>
            </div>
            <ul id="faq-section__list" role="list">
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O biscoito recheado Itamaraty é sabor chocolate? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. Este item é o Biscoito Itamaraty Recheado Chocolate, uma
                                opção prática para quem busca biscoito doce em embalagem individual. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O Biscoito Itamaraty Recheado Chocolate contém glúten? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. Ele contém glúten, pois leva farinha de trigo enriquecida
                                com ferro e ácido fólico em sua composição. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O Biscoito Itamaraty Recheado Chocolate contém derivados de
                                trigo e soja? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. Ele contém derivados de trigo e soja, informação
                                importante para quem precisa conferir alergênicos antes da compra. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O biscoito pode conter leite ou ovo? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. Pode conter leite, ovo e outros ingredientes como
                                amendoim, avelã, centeio, cevada, aveia e castanhas, ajudando você a comprar com mais
                                atenção. </p>
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
