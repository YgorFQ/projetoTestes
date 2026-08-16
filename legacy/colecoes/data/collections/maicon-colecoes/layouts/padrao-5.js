// @ts-nocheck
ColLib.registerCollectionLayout('maicon-colecoes',
{
  id: 'padrao-5',
  name: 'padrão 5',
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
        * {
            margin: 0;
            padding: 0;
        }

        .video-header,
        .video-header * {
            box-sizing: border-box;
            margin: 0;
        }

        .video-header {
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

        .video-header__banner {
            width: 100%;
            height: var(--banner-height);
            position: relative;
            display: flex;
            justify-content: center;
        }

        .video-header__banner-video {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            pointer-events: none;
        }

        .video-header__badge {
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

        .video-header__badge-img {
            max-width: 90px;
            max-height: 90px;
            object-fit: contain;
        }

        .video-header__body {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: calc(var(--badge-size) / 2 + 1.1rem) 0.3rem .8rem;
            text-align: center;
        }

        .video-header__brand {
            color: #ff9900;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }

        .video-header__title {
            color: #000;
            font-size: clamp(1.4rem, 4vw, 2.4rem);
            line-height: clamp(1.6rem, 4vw, 3.1rem);
            font-weight: 600;
            max-width: 50rem;
            text-wrap: pretty;
        }

        .video-header__subtitle {
            color: #8a8a8a;
            font-size: clamp(1rem, 2vw, 1.2rem);
            line-height: 120%;
            margin-top: 1rem;
            max-width: 52rem;
            text-wrap: pretty;
        }

        @media (prefers-contrast: more) {
            .video-header__subtitle {
                color: #000;
            }

            .video-header__brand {
                color: #3a2301;
            }
        }

        @media (max-width: 768px) {
            .video-header {
                --banner-height: 180px;
            }
        }

        @media (max-width: 470px) {
            .video-header__subtitle {
                text-align: justify;
                font-size: clamp(0.9rem, 2vw, 1.5rem);
                font-weight: 550;
            }
        }
    </style>

    <style>
        .section-3 {
            --s2-color-brand: #4a4d52;
            --s2-color-ink: #202124;
            --s2-color-muted: #686c72;
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
            background: #e5e7e9;
            box-shadow: 0 1rem 2.5rem rgba(74, 77, 82, 0.14);
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
            border: 1px solid rgba(74, 77, 82, 0.20);
            border-radius: 1.5rem;
            background: var(--s2-color-panel);
            box-shadow: 0 1rem 2rem rgba(74, 77, 82, 0.12);
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
                left: 45%;
                /* <-- ponto fixo: ajuste esse valor como quiser */
                margin: 0;
                transform: translateY(-50%);
            }
        }

        @media (min-width: 992px) {
            .section-3 {
                padding: 0 2.5rem 1rem;
            }

            .section-3__callout {
                padding: 2rem;
                /* sem "left" aqui — mantém o mesmo ponto definido acima */
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
        .section-15-container,
        .section-15-container * {
            box-sizing: border-box;
        }

        .section-15-container {
            width: 93%;
            margin: 0 auto;
            padding: 1.5rem;
            background-color: #6e6865;
            border-radius: 23px;
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
            color: #f3f3f3;
            font-size: clamp(1.75rem, 4vw, 2rem);
            font-weight: 600;
            line-height: 1.25;
            text-align: left;
        }

        .section-15__desc {
            margin: 0 0 1.5rem;
            color: #f3f3f3;
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
            color: #f5f5f5;
            font-size: 1.05rem;
            font-weight: 700;
            line-height: 1.35;
        }

        .section-15__feature-item-text {
            margin: 0;
            color: #f5f5f5;
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
            border: 1px solid transparent;
            border-radius: 12px;
            transition:
                background-color 0.3s ease,
                border-color 0.3s ease,
                transform 0.3s ease,
                box-shadow 0.3s ease;
        }

        .section-15__feature-item:hover,
        .section-15__feature-item:focus-visible {
            background-color: rgba(255, 255, 255, 0.12);
            border-color: rgba(255, 255, 255, 0.25);
            box-shadow: 0 12px 28px rgba(60, 20, 4, 0.18);
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
    </style>


    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <article class="pdp" id="pdp" aria-label="Conteúdo rico do produto"> <!-- HTML fica dentro dessa div PDP -->

        <section class="video-header">
            <div class="video-header__banner">
                <video class="video-header__banner-video"
                    poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-panasonic.webp"
                    preload="none" autoplay muted loop playsinline width="1200" height="250">
                    <source src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-panasonic.webm">
                </video>
                <div class="video-header__badge">
                    <img class="video-header__badge-img"
                        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/panasonic/logo-panasonic.png"
                        alt="logo da marca panasonic dentro de um círculo laranja" />
                </div>
            </div>
            <div class="video-header__body">
                <small class="video-header__brand">panasonic</small>
                <h2 class="video-header__title">
                    Geladeira Intuitive+
                    Bottom Freezer, Inverter, Aço Escovado
                </h2>
                <p class="video-header__subtitle">
                    A Geladeira Panasonic Bottom Freezer 511L combina FreshFreezer, tecnologia Inverter e SmartSense
                    para oferecer armazenamento na temperatura ideal, economia de energia e mais praticidade para o dia
                    a dia.
                </p>
            </div>
        </section>

        <section class="section-3">
            <div class="section-3__frame">
                <div class="section-3__media">
                    <picture class="section-3__picture">
                        <source media="(max-width: 760px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/geladeira-refrigerador-panasonic-bottom-freezer-inox-cozinha-modera-zoom-painel-2224641_2224642-01-02.webp">
                        <img class="section-3__image" width="1600" height="650" loading="lazy" decoding="async"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/geladeira-refrigerador-panasonic-bottom-freezer-inox-cozinha-moderna-2224641_2224642-01.webp"
                            alt="Geladeira Panasonic Bottom Freezer de aço escovado em cozinha moderna com bancada de pedra e janelão.">
                    </picture>
                </div>
                <div class="section-3__callout">
                    <div class="section-3__copy">
                        <h2 class="section-3__title">Tecnologia em cada detalhe</h2>
                        <p class="section-3__text">Projetada para facilitar a rotina, tecnologias inteligentes que
                            ajudam a conservar alimentos, economizar energia e oferecer mais praticidade no dia a dia.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-15-container" aria-labelledby="section-15-title">
            <div class="section-15">
                <div class="section-15__content">

                    <ul class="section-15__feature-list" aria-label="Benefícios do produto">
                        <li class="section-15__feature-item">
                            <img class="section-15__feature-item-icon" loading="lazy"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/geladeira-refrigerador-panasonic-frost-free-icone-floco-neve-2224641_2224642-02-2.webp"
                                alt="Ícone de floco de neve para tecnologia Frost Free e modos de refrigeração rápida na geladeira Panasonic."
                                width="48" height="48" />

                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">
                                    Fresh Zone
                                </strong>

                                <p class="section-15__feature-item-text">
                                    A gaveta Fresh Zone conta com Climate Control, que controla a umidade do
                                    compartimento para ajudar a preservar os alimentos por mais tempo.
                                </p>
                            </div>
                        </li>

                        <li class="section-15__feature-item">
                            <img class="section-15__feature-item-icon" loading="lazy"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/geladeira-refrigerador-panasonic-controle-configuracoes-icone-engrenagem-2224641_2224642-02-3.webp"
                                alt="Ícone de engrenagem da geladeira Panasonic para acesso às configurações de controle e modos de operação."
                                width="48" height="48" />

                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">
                                    Funções Pré-programadas
                                </strong>

                                <p class="section-15__feature-item-text">
                                    Conta com os modos Férias, Festa e Compras, que adaptam o funcionamento da geladeira
                                    para diferentes situações do dia a dia.
                                </p>
                            </div>
                        </li>

                        <li class="section-15__feature-item">
                            <img class="section-15__feature-item-icon" loading="lazy"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/geladeira-refrigerador-panasonic-frost-free-icone-congelamento-2224641_2224642-02-4.webp"
                                alt="Ícone de geladeira Panasonic Frost Free mostrando um cubo de gelo derretendo sem acumulação."
                                width="48" height="48" />

                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">
                                    Bottom Freezer
                                </strong>

                                <p class="section-15__feature-item-text">
                                    O freezer localizado na parte inferior possui 166 litros de capacidade e
                                    compartimentos em formato de gavetas, facilitando a organização.
                                </p>
                            </div>
                        </li>

                        <li class="section-15__feature-item">
                            <img class="section-15__feature-item-icon" loading="lazy"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/geladeira-refrigerador-panasonic-conectividade-wi-fi-icone-sinal-2224641_2224642-02-5.webp"
                                alt="Ícone de Wi-Fi para geladeira Panasonic conectada que permite controle por smartphone e monitoramento."
                                width="48" height="48" />

                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">
                                    SmartSense
                                </strong>

                                <p class="section-15__feature-item-text">
                                    Com sensores de abertura de portas, luminosidade e temperatura, a tecnologia
                                    SmartSense utiliza inteligência artificial para aprender a rotina da casa e otimizar
                                    o consumo de energia.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="section-15__image-wrapper">
                    <img class="section-15__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/geladeira-refrigerador-panasonic-bottom-freezer-inox-portas-abertas-cozinha-clara-2224641_2224642-02.webp"
                        alt="Geladeira Panasonic Bottom Freezer de inox com ambas as portas abertas em cozinha clara." />
                </div>
            </div>
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
            <ul id="faq-section__list" role="list"> <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Para que serve o Refrigerador Panasonic Bottom Freezer 511L
                                BB71? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> É indicado para conservar alimentos e bebidas com temperatura
                                adequada. O sistema Bottom Freezer facilita o acesso aos itens mais usados no
                                refrigerador. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Como funciona a gaveta Freshfreezer? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Ela oferece quatro opções de temperatura independentes para
                                armazenar bebidas, frios, carnes, peixes e laticínios na condição ideal de consumo. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Quais são os benefícios da tecnologia Inverter? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Ela regula o funcionamento do compressor para reduzir o consumo
                                de energia, diminuir o ruído e acelerar o congelamento dos alimentos. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Como a tecnologia SmartSense ajuda no dia a dia? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Ela utiliza sensores e inteligência artificial para entender a
                                rotina de uso da geladeira e otimizar o consumo de energia automaticamente. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> O que a tecnologia Vitamin Power oferece? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Ela utiliza luzes de LED especiais na gaveta Fresh Zone para
                                potencializar as vitaminas C e D dos alimentos durante o armazenamento. </p>
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
