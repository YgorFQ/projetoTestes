// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "variacao-25",
  name: "Variação 25",
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
        .section-32__container {
            width: 100%;
            max-width: 1600px;
            margin: 0 auto;
        }

        .section-32__groupimage-section {
            position: relative;
            width: 100%;
            margin: 0;
        }

        .section-32__groupimage-section img {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 30px;
        }

        .section-32__grouptext-overlay {
            position: absolute;
            top: 50%;
            left: 25%;
            transform: translate(-50%, -50%);
            max-width: 40%;
            color: #fff;
            text-align: center;
            font-family: sans-serif;
            z-index: 20;
        }

        .grouptext-overlay-Background {
            background: rgba(0, 0, 0, 0.438);
            border-radius: 2.8vw;
            padding: 0.5rem;
            backdrop-filter: blur(0.5vw);
            -webkit-backdrop-filter: blur(0.5vw);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.3);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        @media (prefers-contrast: more) {
            .grouptext-overlay-Background {
                background: #000;
            }
        }

        .section-32__grouptext-overlay h2 {
            font-size: 2vw;
            font-weight: bold;
            margin-bottom: 1.5px;
            line-height: 120%;
        }

        .section-32__grouptext-overlay p {
            font-size: 1.2vw;
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
                font-size: 2vw;
            }
        }

        @media (max-width: 500px) {
            .section-32__grouptext-overlay {
                max-width: 50%;
            }

            .section-32__grouptext-overlay h2 {
                font-size: 3vw;
            }

            .section-32__grouptext-overlay p {
                font-size: 2.3vw;
            }
        }

        @media (max-width: 470px) {
            .section-32__grouptext-overlay p {
                font-size: 2.4vw;
            }
        }

        @media (max-width: 375px) {
            .section-32__grouptext-overlay p {
                font-size: 2.8vw;
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
        .section-33__container {
            width: 100%;
            max-width: 1600px;
            margin: 0 auto;
        }

        .section-33__video-section {
            position: relative;
            width: 100%;
            max-height: 865px;
            overflow: hidden;
            background: linear-gradient(239deg, #a5876e 0%, #d3b296 40%, #b19177 70%, #e6d4c5 100%);
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

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="product-header-2" aria-label="Cabeçalho do produto">
            <header class="product-header__banner-2">
                <figure style="width:100%;height:100%;margin:0;">
                    <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/banner-maquina-lavar-panasonic-na-f190-detalhe-abstrato-2224635-2224636-00.webp"
                        alt="Banner do produto" class="product-header__banner-img-2" loading="eager">
                </figure>
                <div class="product-header__badge-2" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/panasonic/logo-panasonic.png"
                        alt="Ícone da marca" class="product-header__badge-img-2">
                </div>
            </header>
            <article class="product-header__body-2">
                <small class="product-header__brand-2">panasonic</small>
                <h2 class="product-header__title-2">
                    <span>Lavadora Automática 19kg</span>
                    <strong>Branca com Sistema Ciclone</strong>
                </h2>
                <p class="product-header__subtitle-2">
                    Desenvolvida para entregar a melhor lavagem da categoria, a Lavadora Panasonic possui
                    capacidade para 19kg, Sistema Ciclone sem agitador, painel digital moderno e recursos que oferecem
                    praticidade, eficiência e mais cuidado com as roupas no dia a dia.
                </p>
            </article>
        </section>

        <section class="section-32__container" aria-label="Destaque visual do produto">
            <figure class="section-32__groupimage-section">
                <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/maquina-lavar-panasonic-na-f190-19kg-branca-aberta-visao-superior-lifestyle-2224635-2224636-01.webp"
                    alt="Lavadora Panasonic com cesto aberto e Sistema Ciclone" width="1600" height="865"
                    loading="eager" decoding="async" style="border-radius: 30px 30px 0 0;">
                <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background" style="top: 55%;
    left: 76%;
    max-width: 55%;">
                    <h2><strong>SISTEMA CICLONE SEM AGITADOR</strong></h2>
                    <p>O Sistema Ciclone dispensa o agitador central, proporcionando uma lavagem mais eficiente e maior
                        cuidado com as roupas, além de oferecer amplo espaço interno.</p>
                </figcaption>
            </figure>
        </section>

        <section class="section-32__container" aria-label="Destaque visual do produto">
            <figure class="section-32__groupimage-section">
                <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/maquina-lavar-panasonic-na-f190-19kg-branca-tampa-vidro-fechada-lifestyle-2224635-2224636-02.webp"
                    alt="Painel digital da Lavadora Panasonic" width="1600" height="865" loading="eager"
                    decoding="async" style="border-radius: 0;">
                <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background"
                    style="top: 50%; left: 25%; max-width: 40%;">
                    <h2><strong>PAINEL DIGITAL MODERNO</strong></h2>
                    <p>O painel digital permite programar ciclos de lavagem, controlar o tempo de funcionamento e salvar
                        seu programa favorito para tornar o uso ainda mais prático.</p>
                </figcaption>
            </figure>
        </section>

        <section class="section-32__container" aria-label="Destaque visual do produto">
            <figure class="section-32__groupimage-section">
                <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/maquina-lavar-panasonic-na-f190-19kg-branca-painel-ligado-ambiente-lifestyle-2224635-2224636-03.webp"
                    alt="Tampa com fechamento suave da Lavadora Panasonic" width="1600" height="865"
                    loading="eager" decoding="async" style="border-radius: 0 ">
                <figcaption class="section-32__grouptext-overlay left grouptext-overlay-Background"
                    style="top: 50%; left: 23%; max-width: 40%;">
                    <h2><strong>FECHAMENTO SUAVE DA TAMPA</strong></h2>
                    <p>O sistema anti-impacto proporciona fechamento suave e seguro da tampa, oferecendo mais conforto e
                        segurança durante o uso da lavadora.</p>
                </figcaption>
            </figure>
        </section>

        <section class="section-33__container" aria-label="Seção de vídeo do produto">
            <div class="section-33__video-section">
                <div class="section-33__video-wrapper">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/yCqzakXqBVs?si=xDNg4dIQMPuc3lD4"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
        </section>

        <p style="color: #8a8a8a; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty;
        text-align: center; padding: 30px 0;">
            IMAGENS MERAMENTE ILUSTRATIVAS
        </p>

        <!-- Área de FAQ -->
        <section id="faq-section" aria-labelledby="faq-section-title">
            <div id="faq-section__header">
                <h2 id="faq-section__title" id="faq-section-title">Perguntas Frequentes</h2>
                <p id="faq-section__subtitle">Saiba mais sobre a Lavadora Panasonic 19kg.</p>
            </div>

            <ul id="faq-section__list">

                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Qual é a capacidade de lavagem da Panasonic?</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">
                                A lavadora possui capacidade para até 19 kg de roupas, permitindo lavar desde grandes
                                volumes de peças até edredons em um único ciclo.
                            </p>
                        </div>
                    </details>
                </li>

                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">O que é o Sistema Ciclone?</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">
                                O Sistema Ciclone dispensa o agitador central e utiliza movimentos específicos para
                                oferecer
                                maior eficiência de lavagem e mais cuidado com os tecidos.
                            </p>
                        </div>
                    </details>
                </li>

                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Quais recursos o painel digital oferece?</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">
                                O painel digital permite selecionar ciclos de lavagem, programar o tempo de
                                funcionamento e
                                salvar o programa favorito para facilitar o uso diário.
                            </p>
                        </div>
                    </details>
                </li>

                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">A lavadora possui programas especiais?</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">
                                Sim. Ela conta com Programa Vanish, Ciclo Pet para remoção de pelos de animais, programa
                                para roupas perfumadas por mais tempo e 10 programas de lavagem.
                            </p>
                        </div>
                    </details>
                </li>

                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Quais outros diferenciais a lavadora oferece?</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">
                                O modelo conta com cesto em inox, filtro de fiapos, dispenser para sabão e amaciante,
                                reuso de água, fechamento suave da tampa e classificação energética A.
                            </p>
                        </div>
                    </details>
                </li>

            </ul>
        </section>

    </div>
</div>`,
  css: ``
}
);
