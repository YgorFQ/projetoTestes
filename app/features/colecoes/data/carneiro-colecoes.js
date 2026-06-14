// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   colecoes/data/carneiro-colecoes.js — Coleção: Ygor Coleções

   ATENÇÃO: Arquivo gerado pelo módulo GitHub do SenkoLib.
   NÃO edite manualmente em produção.
═══════════════════════════════════════════════════════════════════════ */
ColLib.register({
  slug:  'carneiro-colecoes',
  name:  'Ygor Coleções',
  group: 'ygor',
  tags:  ['Responsivo', 'adaptativos'],
  layouts: [
    /*@@@@Col - padrao1 */
    {
      id:   'padrao1',
      name: 'Padrão 1',
      html: `<div class="lp-container">
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
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet">
    <title>PDP - eFácil</title>
    <!-- ---------------------------------------- ÁREA PARA COLOCAR STYLES ----------------------------------------------------------- -->

    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .product-header {
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

        .product-header__banner {
            width: 100%;
            height: var(--banner-height);
            position: relative;
            display: flex;
            justify-content: center;
        }

        .product-header__banner figure {
            width: 100%;
            height: 100%;
            margin: 0;
        }

        .product-header__banner-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .product-header__badge {
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

        .product-header__badge-img {
            max-width: 90px;
            max-height: 90px;
            object-fit: contain;
        }

        .product-header__body {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: calc(var(--badge-size) / 2 + 1.1rem) 0.3rem 2.5rem;
            text-align: center;
        }

        .product-header__brand {
            color: #ff9900;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }

        .product-header__title {
            font-size: clamp(1.4rem, 4vw, 2.4rem);
            line-height: clamp(1.6rem, 4vw, 3.1rem);
            font-weight: 600;
            max-width: 50rem;
            text-wrap: pretty;
        }

        .product-header__subtitle {
            color: #8a8a8a;
            font-size: clamp(1rem, 2vw, 1.2rem);
            line-height: 120%;
            margin-top: 1rem;
            max-width: 52rem;
            text-wrap: pretty;
        }

        @media (max-width: 768px) {
            .product-header {
                --banner-height: 180px;
            }
        }

        @media (max-width: 470px) {
            .product-header__subtitle {
                text-align: justify;
                font-size: clamp(0.9rem, 2vw, 1.2rem);
            }
        }
    </style>

    <style>
        /* ===== HERO SECTION — VARIÁVEIS ===== */
        .section-6 {
            --pos-y: 50%;
            --pos-x: 9%;
            --color-title: #56ffd0;
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
            background-color: rgb(0 0 0 / 65%);
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
                text-align: left;
                text-shadow: none;
            }

            .section-6__description {
                margin-bottom: 0;
                font-size: 1.1rem;
                color: #555;
                text-align: left;
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
        .pdp-row-product {
            margin-left: auto;
            margin-right: auto;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            width: 100%
        }

        .tw-text-2xl {
            font-size: 32px;
            font-weight: 600;
            line-height: 40px
        }

        .pdp-product-title {
            --tw-text-opacity: 1;
            color: rgb(0 0 0/var(--tw-text-opacity));
            max-width: 56rem;
            text-align: center
        }

        .tw-text-lg {
            font-size: 20px;
            font-weight: 700;
            line-height: 28px
        }

        .pdp-product-description {
            --tw-text-opacity: 1;
            color: rgb(138 138 138/var(--tw-text-opacity));
            font-size: 14px;
            line-height: 22px;
            margin-top: 1rem;
            max-width: 56rem;
            text-align: center
        }

        @media (min-width:576px) {
            .pdp-row-product {
                max-width: 576px
            }

            .tw-text-2xl {
                font-size: 32px;
            }
        }

        @media (min-width:768px) {
            .pdp-row-product {
                max-width: 768px
            }

            .tw-text-2xl {
                font-size: 32px;
            }

        }



        @media (min-width:992px) {
            .pdp-row-product {
                max-width: 992px
            }

            .tw-text-2xl {
                font-size: 32px;
            }
        }

        @media (min-width:1200px) {
            .pdp-row-product {
                max-width: 1200px
            }

            .tw-text-2xl {
                font-size: 32px;
            }
        }

        @media (min-width:1536px) {
            .pdp-row-product {
                max-width: 1536px
            }

            .tw-text-2xl {
                font-size: 32px;
            }
        }

        .pdp-row-product {
            align-items: center;
            display: flex;
            gap: 1.5rem;
            justify-content: space-between;
            margin-bottom: 2rem;
            margin-top: 2rem
        }

        .reverse-row-product {
            flex-direction: row-reverse;
        }

        @media not all and (min-width:992px) {
            .pdp-row-product {
                flex-direction: column-reverse
            }
        }

        @media (min-width:992px) {
            .pdp-row-product {
                gap: 6rem
            }
        }

        .pdp-row-product-image {
            max-width: 30rem;
            object-fit: contain;
            width: 100%;
            border-radius: 20px;
        }

        .pdp-row-product-content {
            display: flex;
            flex-direction: column;
            max-width: 28rem;
            width: 100%
        }

        .pdp-row-product-content * {
            text-align: left
        }

        @media (min-width:992px) {
            .pdp-row-product.is-reverse .pdp-row-product-image {
                order: 1
            }

            .pdp-row-product.is-reverse .pdp-row-product-content {
                order: 2
            }
        }

        .pdp-row-product-content {
            display: flex;
            flex-direction: column;
            max-width: 28rem;
            width: 100%
        }

        .pdp-row-product-content * {
            text-align: left
        }

        @media (min-width:992px) {
            .pdp-row-product.is-reverse .pdp-row-product-image {
                order: 1
            }

            .pdp-row-product.is-reverse .pdp-row-product-content {
                order: 2
            }
        }

        @media (max-width:768px) {
            .pdp-row-product-image {
                width: 100%;
                aspect-ratio: 9 / 6;
                object-fit: cover;
            }
        }
    </style>

    <style>
        .section-11-container {
            padding-bottom: 3rem;
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

        @media (min-width: 1536px) {
            .section-11-container {
                max-width: 1536px;
            }
        }

        .section-11__header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .section-11__title {
            font-size: 32px;
            font-weight: 900;
            color: #1a1a1a;
            margin: 0;
            line-height: 1.25;
        }

        .section-11__grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
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
            background: #fff;
            border: 0.5px solid rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            padding: 1.5rem 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.75rem;
            transition: border-color 0.2s;
        }

        .section-11__item:hover {
            border-color: rgba(0, 0, 0, 0.22);
        }

        .section-11__figure {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 72px;
            height: 72px;
        }

        .section-11__image {
            width: 4.6rem;
            height: auto;
            display: block;
        }

        .section-11__name {
            font-size: 0.9375rem;
            font-weight: 500;
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
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="product-header" aria-label="Cabeçalho do produto">
            <header class="product-header__banner">
                <figure style="width:100%;height:100%;margin:0;">
                    <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2224438_header.jpg"
                        alt="Banner do produto" class="product-header__banner-img" loading="eager">
                </figure>

                <div class="product-header__badge" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/philips/logo-philips.png"
                        alt="imagem png com ícone da marca" class="product-header__badge-img">
                </div>
            </header>

            <article class="product-header__body">
                <small class="product-header__brand">philips</small>
                <h1 class="product-header__title">
                    Smart TV LCD LED 55" 4K <br>Ultra HD com Wi-Fi
                </h1>
                <p class="product-header__subtitle">
                    Eleve sua experiência visual com a Philips Ambilight é a Smart TV 4K que expande os limites da tela com um show de luzes imersivo, comando de voz inteligente e alta performance para filmes e games
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto">
            <picture>
                <source media="(max-width: 760px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/smart-tv-philips-55-polegadas-4k-uhd-ambilight-tecnologia-2224438-01-2.jpg"
                    width="780" height="400">
                <img class="section-6__image"
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/smart-tv-philips-ambilight-55pug8100-78-sala-estar-lifestyle-2224438-01-1.jpg"
                    alt="Smart TV Philips 55 polegadas 4K com tecnologia Ambilight projetando luzes coloridas na parede"
                    width="1600" height="650" loading="eager" fetchpriority="high" decoding="async">
            </picture>
            <div class="section-6__content">
                <h1 class="section-6__title">A realidade termina onde a sua tela começa</h1>
                <p class="section-6__description">Mergulhe em um universo onde cada cor respira e o som molda o espaço ao seu redo</p>
            </div>
        </section>

        <div class="pdp-row-product is-reverse">
            <div class="pdp-row-product-content">
                <h3 class="pdp-product-title tw-text-2xl">
                    Clareza Absoluta e Perfeição do 4K HDR10+
                </h3>
                <p class="pdp-product-description">
                    Mergulhe em imagens realistas com a precisão do Ultra HD e o contraste do HDR10+, transformando cada
                    detalhe em uma experiência de tirar o fôlego
                </p>
            </div>
            <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/smart-tv-philips-55-polegadas-ambilight-4k-detalhe-moldura-2224438-02.jpg"
                alt="Detalhe Smart TV Philips 55 polegadas 4K Ambilight ressaltando cores vívidas e design sem bordas"
                class="pdp-row-product-image" />
        </div>

        <div class="pdp-row-product">
            <div class="pdp-row-product-content">
                <h3 class="pdp-product-title tw-text-2xl">
                    Agilidade e Inteligência no seu Entretenimento
                </h3>
                <p class="pdp-product-description">
                    Com uma interface intuitiva, o Titan OS elimina a perda de tempo com menus complicados. Seus
                    principais serviços de streaming, Netflix, Prime Video e YouTube, já aparecem organizados e prontos
                    para o uso, garantindo que você gaste menos tempo procurando e mais tempo assistindo ao que ama
                </p>
            </div>
            <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/smart-tv-philips-aplicativos-netflix-prime-video-disney-2224438-03.jpg"
                alt="Eletricista com capacete branco e colete laranja em obra garantindo qualidade e segurança Corfio"
                class="pdp-row-product-image" />
        </div>

        <section class="section-11" aria-labelledby="section-11-title">
            <div class="section-11-container">
                <header class="section-11__header">
                    <h2 class="section-11__title" id="section-11-title">conectividade completa que <br>você não encontra
                        em
                        telas básicas</h2>
                </header>
                <ul class="section-11__grid" role="list">
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/smart-tv-philips-icon-ajuste-brilho-tela-2224438-03-1.png"
                                alt="Ícone de sol representando ajuste de brilho e iluminação da Smart TV Philips"
                                width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">Exclusividade Ambilight</h3>
                        <p class="section-11__value">Luzes que expandem a imagem além da tela e protegem sua visão</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/smart-tv-philips-icon-conexao-wifi-dual-band-2224438-03-2.png"
                                alt="Ícone de Wi-Fi indicando conectividade Dual Band de alta velocidade da Smart TV Philips"
                                width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">Conexão Apple e Alexa</h3>
                        <p class="section-11__value">Espelhamento via AirPlay e controle por voz integrados nativamente
                        </p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/smart-tv-philips-icon-gaming-vrr-allm-gamebar-2224438-03-3.png"
                                alt="Ícone de controle de videogame representando recursos gamer VRR e ALLM da TV Philips"
                                width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">DNA Gamer</h3>
                        <p class="section-11__value">Tecnologias VRR e ALLM para jogos fluidos e sem atrasos de resposta
                        </p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/smart-tv-philips-icon-processamento-rapido-quad-core-2224438-03-4.png"
                                alt="Ícone de cronômetro simbolizando rapidez e baixo tempo de resposta da Smart TV Philips"
                                width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">Navegação Instantânea</h3>
                        <p class="section-11__value">Processador Quad Core e controle com 6 atalhos diretos para
                            streaming</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/smart-tv-philips-dolby-atmos-som-surround-sala-2224438-04.png"
                                alt="Gráfico de ondas sonoras Dolby Atmos preenchendo sala com Smart TV Philips Série 8100"
                                width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">Borda Infinita</h3>
                        <p class="section-11__value">Design minimalista que foca no que importa: a resolução 4K HDR
                            realista</p>
                    </li>
                </ul>
            </div>
        </section>

        <div class="pdp-row-product is-reverse">
            <div class="pdp-row-product-content">
                <h3 class="pdp-product-title tw-text-2xl">
                    Agilidade e Inteligência no seu Entretenimento
                </h3>
                <p class="pdp-product-description">
                    Com uma interface intuitiva, o Titan OS elimina a perda de tempo com menus complicados. Seus
                    principais serviços de streaming, Netflix, Prime Video e YouTube, já aparecem organizados e prontos
                    para o uso, garantindo que você gaste menos tempo procurando e mais tempo assistindo ao que ama
                </p>
            </div>
            <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/smart-tv-philips-aplicativos-netflix-prime-video-disney-2224438-03.jpg"
                alt="Eletricista com capacete branco e colete laranja em obra garantindo qualidade e segurança Corfio"
                class="pdp-row-product-image" />
        </div>

        <div class="pdp-row-product ">
            <div class="pdp-row-product-content">
                <h3 class="pdp-product-title tw-text-2xl">
                    Performance Gamer de Próxima Geração
                </h3>
                <p class="pdp-product-description">
                    Eleve seu nível de jogo com HDMI 2.1 e VRR e ALLM para gráficos fluidos e sem atrasos, ativados
                    automaticamente assim que você liga seu console
                </p>
            </div>
            <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/smart-tv-philips-modo-gamer-rpg-baixa-latencia-2224438-05.jpg"
                alt="Eletricista com capacete branco e colete laranja em obra garantindo qualidade e segurança Corfio"
                class="pdp-row-product-image" />
        </div>

        <p
            style="color: #8a8a8a; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty; text-align: center; padding: 30px 0;">
            IMAGENS MERAMENTE ILUSTRATIVAS</p>
    </div>
</div>`,
      css:  ``,
    },

    /*@@@@Col - modelo2 */
    {
      id:   'modelo2',
      name: 'Padrão 2',
      html: `<div class="lp-container">
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
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet">
    <title>PDP - eFácil</title>
    <!-- ---------------------------------------- ÁREA PARA COLOCAR STYLES ----------------------------------------------------------- -->

    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .product-header {
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

        .product-header__banner {
            width: 100%;
            height: var(--banner-height);
            position: relative;
            display: flex;
            justify-content: center;
        }

        .product-header__banner figure {
            width: 100%;
            height: 100%;
            margin: 0;
        }

        .product-header__banner-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .product-header__badge {
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

        .product-header__badge-img {
            max-width: 90px;
            max-height: 90px;
            object-fit: contain;
        }

        .product-header__body {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: calc(var(--badge-size) / 2 + 1.1rem) 0.3rem 2.5rem;
            text-align: center;
        }

        .product-header__brand {
            color: #ff9900;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }

        .product-header__title {
            font-size: clamp(1.4rem, 4vw, 2.4rem);
            line-height: clamp(1.6rem, 4vw, 3.1rem);
            font-weight: 600;
            max-width: 50rem;
            text-wrap: pretty;
        }

        .product-header__subtitle {
            color: #8a8a8a;
            font-size: clamp(1rem, 2vw, 1.2rem);
            line-height: 120%;
            margin-top: 1rem;
            max-width: 52rem;
            text-wrap: pretty;
        }

        @media (max-width: 768px) {
            .product-header {
                --banner-height: 180px;
            }
        }

        @media (max-width: 470px) {
            .product-header__subtitle {
                text-align: justify;
                font-size: clamp(0.9rem, 2vw, 1.2rem);
            }
        }
    </style>

    <style>
        /* ===== HERO SECTION — VARIÁVEIS ===== */
        .section-6 {
            --pos-y: 50%;
            --pos-x: 7%;
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
        .pdp-row-product {
            margin-left: auto;
            margin-right: auto;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            width: 100%
        }

        .tw-text-2xl {
            font-size: 32px;
            font-weight: 600;
            line-height: 40px
        }

        .pdp-product-title {
            --tw-text-opacity: 1;
            color: rgb(0 0 0/var(--tw-text-opacity));
            max-width: 56rem;
            text-align: center
        }

        .tw-text-lg {
            font-size: 20px;
            font-weight: 700;
            line-height: 28px
        }

        .pdp-product-description {
            --tw-text-opacity: 1;
            color: rgb(138 138 138/var(--tw-text-opacity));
            font-size: 14px;
            line-height: 22px;
            margin-top: 1rem;
            max-width: 56rem;
            text-align: center
        }

        @media (min-width:576px) {
            .pdp-row-product {
                max-width: 576px
            }

            .tw-text-2xl {
                font-size: 32px;
            }
        }

        @media (min-width:768px) {
            .pdp-row-product {
                max-width: 768px
            }

            .tw-text-2xl {
                font-size: 32px;
            }

        }



        @media (min-width:992px) {
            .pdp-row-product {
                max-width: 992px
            }

            .tw-text-2xl {
                font-size: 32px;
            }
        }

        @media (min-width:1200px) {
            .pdp-row-product {
                max-width: 1200px
            }

            .tw-text-2xl {
                font-size: 32px;
            }
        }

        @media (min-width:1536px) {
            .pdp-row-product {
                max-width: 1536px
            }

            .tw-text-2xl {
                font-size: 32px;
            }
        }

        .pdp-row-product {
            align-items: center;
            display: flex;
            gap: 1.5rem;
            justify-content: space-between;
            margin-bottom: 2rem;
            margin-top: 2rem
        }

        .reverse-row-product {
            flex-direction: row-reverse;
        }

        @media not all and (min-width:992px) {
            .pdp-row-product {
                flex-direction: column-reverse
            }
        }

        @media (min-width:992px) {
            .pdp-row-product {
                gap: 6rem
            }
        }

        .pdp-row-product-image {
            max-width: 30rem;
            object-fit: contain;
            width: 100%;
            border-radius: 20px;
        }

        .pdp-row-product-content {
            display: flex;
            flex-direction: column;
            max-width: 28rem;
            width: 100%
        }

        .pdp-row-product-content * {
            text-align: left
        }

        @media (min-width:992px) {
            .pdp-row-product.is-reverse .pdp-row-product-image {
                order: 1
            }

            .pdp-row-product.is-reverse .pdp-row-product-content {
                order: 2
            }
        }

        .pdp-row-product-content {
            display: flex;
            flex-direction: column;
            max-width: 28rem;
            width: 100%
        }

        .pdp-row-product-content * {
            text-align: left
        }

        @media (min-width:992px) {
            .pdp-row-product.is-reverse .pdp-row-product-image {
                order: 1
            }

            .pdp-row-product.is-reverse .pdp-row-product-content {
                order: 2
            }
        }

        @media (max-width:768px) {
            .pdp-row-product-image {
                width: 100%;
                aspect-ratio: 9 / 6;
                object-fit: cover;
            }
        }
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="product-header" aria-label="Cabeçalho do produto">
            <header class="product-header__banner">
                <figure style="width:100%;height:100%;margin:0;">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/header.jpg"
                        alt="Banner do produto" class="product-header__banner-img" loading="eager">
                </figure>

                <div class="product-header__badge" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo.png"
                        alt="imagem png com ícone da marca" class="product-header__badge-img">
                </div>
            </header>

            <article class="product-header__body">
                <small class="product-header__brand">Marca</small>
                <h1 class="product-header__title">
                    TÍTULO DO PRODUTO GAMERE (Nome, modelo, diferencial...)
                </h1>
                <p class="product-header__subtitle">
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto">
            <picture>
                <source media="(max-width: 760px)"
                    srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-2.png"
                    width="780" height="400">
                <img class="section-6__image"
                    src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-1.png"
                    alt="Caderno Funny Cat com estampa de gatinhos, capa colorida e espiral" width="1600" height="650"
                    loading="eager" fetchpriority="high" decoding="async">
            </picture>
            <div class="section-6__content">
                <h1 class="section-6__title">Caderno Funny Cat</h1>
                <p class="section-6__description">Organize seus estudos com fofura e estilo!</p>
            </div>
        </section>

        <div class="pdp-row-product">
            <div class="pdp-row-product-content">
                <h3 class="pdp-product-title tw-text-2xl">
                    A garantia de que o que está por trás das paredes nunca será um problema
                </h3>
                <p class="pdp-product-description">
                    Ao escolher um condutor que une a máxima segurança contra incêndios, a eficiência energética para
                    seus equipamentos de alta potência e a flexibilidade necessária para uma instalação ágil, você
                    garante a proteção do seu patrimônio e a tranquilidade de saber que sua estrutura elétrica foi feita
                    para durar uma vida inteira, sem surpresas na conta de luz ou a necessidade de reformas precoces
                </p>
            </div>
            <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao4.jpg"
                alt="Eletricista com capacete branco e colete laranja em obra garantindo qualidade e segurança Corfio"
                class="pdp-row-product-image" />
        </div>

        <p
            style="color: #8a8a8a; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty; text-align: center; padding: 30px 0;">
            IMAGENS MERAMENTE ILUSTRATIVAS</p>
    </div>
</div>`,
      css:  ``,
    },

    /*@@@@Col - padrao3 */
    {
      id:   'padrao3',
      name: 'Padrão 3',
      html: `<div class="lp-container">
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
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet">
    <title>PDP - eFácil</title>
    <!-- ---------------------------------------- ÁREA PARA COLOCAR STYLES ----------------------------------------------------------- -->

    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .product-header {
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

        .product-header__banner {
            width: 100%;
            height: var(--banner-height);
            position: relative;
            display: flex;
            justify-content: center;
        }

        .product-header__banner figure {
            width: 100%;
            height: 100%;
            margin: 0;
        }

        .product-header__banner-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .product-header__badge {
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

        .product-header__badge-img {
            max-width: 90px;
            max-height: 90px;
            object-fit: contain;
        }

        .product-header__body {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: calc(var(--badge-size) / 2 + 1.1rem) 0.3rem 2.5rem;
            text-align: center;
        }

        .product-header__brand {
            color: #ff9900;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }

        .product-header__title {
            font-size: clamp(1.4rem, 4vw, 2.4rem);
            line-height: clamp(1.6rem, 4vw, 3.1rem);
            font-weight: 600;
            max-width: 50rem;
            text-wrap: pretty;
        }

        .product-header__subtitle {
            color: #8a8a8a;
            font-size: clamp(1rem, 2vw, 1.2rem);
            line-height: 120%;
            margin-top: 1rem;
            max-width: 52rem;
            text-wrap: pretty;
        }

        @media (max-width: 768px) {
            .product-header {
                --banner-height: 180px;
            }
        }

        @media (max-width: 470px) {
            .product-header__subtitle {
                text-align: justify;
                font-size: clamp(0.9rem, 2vw, 1.2rem);
            }
        }
    </style>


    <style>
        /* ===== HERO SECTION — VARIÁVEIS ===== */
        .section-6 {
            --pos-y: 50%;
            --pos-x: 7%;
            --color-title: #f16425;
            --bg-box: rgba(0, 0, 0, 0.103);

            width: 100%;
            position: relative;
            overflow: hidden;
        }

        /* ===== IMAGEM ===== */
        .section-6__image {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 20px 20px 0 0;
        }

        /* ===== CONTEÚDO SOBREPOSTO ===== */
        .section-6__content {
            position: absolute;
            top: var(--pos-y);
            left: clamp(1%, var(--pos-x), 100%);
            transform: translateY(-50%);
            max-width: min(40%, 500px);
            z-index: 10;
            background-color: var(--bg-box);
            padding: clamp(12px, 2vw, 20px);
            backdrop-filter: blur(4px);
            border-radius: 20px;
        }

        .section-6__title {
            font-size: clamp(1.4rem, 4.5vw, 4rem);
            color: #ff7a3f;
            margin: 0 0 10px;
            line-height: 1.2;
            text-shadow: 2px 2px 6px rgb(0 0 0 / 12%);
            font-weight: 800;


        }

        .section-6__description {
            font-size: clamp(0.95rem, 3vw, 2.4rem);
            color: #fff;
            margin: 0 0 24px;
            line-height: 1.3;
            text-shadow: 1px 1px 4px rgb(0 0 0 / 18%);
            max-width: 90%;
        }

        /* ===== MOBILE ===== */
        @media (max-width: 795px) {
            .section-6__ {
                border-radius: 0;
            }

            .section-6__content {
                position: static;
                transform: none;
                max-width: 100%;
                padding: 24px 20px;
                background: transparent;
                backdrop-filter: none;
                border-radius: 0;
                text-align: center;
                background-color: #f16425;
            }

            .section-6__title {
                font-size: 1.8rem;
                color: #f1f1f1;
                text-shadow: 0 0 2px rgba(129, 28, 3, 0.247);
            }

            .section-6__description {
                margin-bottom: 0;
                font-size: 1.1rem;
                color: #f1f1f1;
                text-shadow: 0 0 2px rgba(129, 28, 3, 0.247);
            }

            .section-6__image {
                width: 100%;
                margin: auto;
                height: auto;
                display: block;
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
        /* ══════════════════════════════════════════
   CONTAINER
══════════════════════════════════════════ */
        .pdp-row-product-container {
            background-color: #f16425;
            padding: 1.5rem;
            width: 100%;
            box-sizing: border-box;
        }

        /* ══════════════════════════════════════════
   ROW PRODUCT — mobile-first (coluna)
══════════════════════════════════════════ */
        .pdp-row-product {
            display: flex;
            flex-direction: column-reverse;
            /* mobile: empilhado */
            gap: 1.25rem;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
        }

        /* ══════════════════════════════════════════
   IMAGEM
══════════════════════════════════════════ */
        .pdp-row-product__image-wrapper {
            width: 100%;
            flex-shrink: 0;
        }

        .pdp-row-product__image {
            margin: auto;
            border-radius: 16px;
            display: block;
            object-fit: cover;
            width: 100%;
            max-width: 530px;
            aspect-ratio: 16 / 9;
            /* mobile: panorâmica */
        }

        /* ══════════════════════════════════════════
   CONTEÚDO
══════════════════════════════════════════ */
        .pdp-row-product__content {
            display: flex;
            flex-direction: column;
            width: 95%;
            margin: auto;
            box-sizing: border-box;
        }

        /* ══════════════════════════════════════════
   TÍTULO + DESCRIÇÃO (dentro do content)
══════════════════════════════════════════ */
        .pdp-row-product__title {
            color: #f3f3f3;
            font-size: 32px;
            font-weight: 600;
            line-height: 40px;
            margin: 0 0 1rem;
            text-align: left;
        }

        .pdp-row-product__desc {
            color: #f3f3f3;
            font-size: 14px;
            line-height: 22px;
            margin: 0 0 1.5rem;
            text-align: left;
        }

        /* ══════════════════════════════════════════
   FEATURE LIST
══════════════════════════════════════════ */
        .pdp-feature-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            list-style: none;
            margin: 0;
            gap: 22px;
            padding: 0;
        }

        .pdp-feature-item {
            align-items: flex-start;
            display: flex;
            flex-direction: row;
            gap: 0.75rem;
        }

        .pdp-feature-item__icon {
            border-radius: 8px;
            flex-shrink: 0;
            height: 44px;
            object-fit: contain;
            width: 44px;
        }

        .pdp-feature-item__body {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
        }

        .pdp-feature-item__title {
            color: #f5f5f5;
            font-size: 1.05rem;
            font-weight: 700;
            line-height: 1.35;
            margin: 0;
        }

        .pdp-feature-item__text {
            color: #f5f5f5;
            font-size: 0.8125rem;
            line-height: 1.55;
            margin: 0;
        }

        /* ══════════════════════════════════════════
   BREAKPOINT 480px
══════════════════════════════════════════ */
        @media (min-width: 480px) {
            .pdp-row-product-container {
                padding: 1.75rem;
            }

            .pdp-feature-item__title {
                font-size: 1.1rem;
            }
        }

        /* ══════════════════════════════════════════
   BREAKPOINT 768px
══════════════════════════════════════════ */
        @media (min-width: 768px) {
            .pdp-row-product-container {
                padding: 2rem;
            }

            .pdp-row-product {
                max-width: 768px;
            }

            .pdp-row-product__image {
                border-radius: 20px;
                aspect-ratio: 16 / 9;
            }
        }

        /* ══════════════════════════════════════════
   BREAKPOINT 760px — lado a lado
══════════════════════════════════════════ */
        @media (min-width: 760px) {
            .pdp-row-product {
                align-items: center;
                flex-direction: row;
                /* desktop: lado a lado */
                gap: 1.5rem;
                justify-content: center;
                max-width: 960px;
            }

            /* variação que inverte a ordem */
            .pdp-row-product--reverse {
                flex-direction: row-reverse;
            }

            .pdp-row-product__image-wrapper {
                flex: 0 0 48%;
                max-width: 48%;
            }

            .pdp-row-product__image {
                aspect-ratio: 4 / 3;
                /* desktop: mais quadrada */
                height: 100%;
                max-height: 420px;
            }

            .pdp-row-product__content {
                flex: 1 1 0;
                min-width: 0;
            }

            /* ícone à direita (variação desktop) */
            .pdp-feature-list--icon-right .pdp-feature-item {
                flex-direction: row-reverse;
            }

            .pdp-feature-list--icon-right .pdp-feature-item__body {
                align-items: flex-end;
            }

            .pdp-feature-list--icon-right .pdp-feature-item__title,
            .pdp-feature-list--icon-right .pdp-feature-item__text {
                text-align: right;
            }

            .pdp-feature-item__icon {
                height: 48px;
                width: 48px;
            }

            .pdp-feature-item__title {
                font-size: 1.2rem;
            }

            .pdp-feature-item__text {
                font-size: 0.875rem;
            }
        }

        /* ══════════════════════════════════════════
   BREAKPOINT 1060px
══════════════════════════════════════════ */
        @media (min-width: 1060px) {
            .pdp-row-product {
                max-width: 1060px;
                gap: 2rem;
            }

            .pdp-feature-list {
                gap: 1.25rem;
            }
        }

        /* ══════════════════════════════════════════
   BREAKPOINT 1280px
══════════════════════════════════════════ */
        @media (min-width: 1280px) {
            .pdp-row-product {
                max-width: 1280px;
                gap: 2.5rem;
            }

            .pdp-row-product__image-wrapper {
                flex: 0 0 50%;
                max-width: 50%;
            }

            .pdp-row-product__image {
                max-height: 460px;
            }

            .pdp-feature-item__title {
                font-size: 1.3rem;
            }

            .pdp-feature-item__text {
                font-size: 0.9rem;
            }
        }

        /* ══════════════════════════════════════════
   UTILITÁRIO
══════════════════════════════════════════ */
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
        .section-9 {
            width: 100%;
            padding: 2rem 16px;
            box-sizing: border-box;
            margin: 0 auto 25px;
            padding-top: 0;
            font-family: sans-serif;
        }

        .section-9__header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .section-9__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #333;
            margin: 0 0 12px;
            line-height: 98%;
        }

        .section-9__subtitle {
            font-size: 1rem;
            color: #666;
            margin: 0;
        }

        .section-9__list {
            list-style: none;
            margin: 0 auto;
            padding: 0;
            max-width: 56rem;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .section-9__item {
            background: #fff;
            border: 1px solid #e5e5e5;
            border-radius: 12px;
            overflow: hidden;
        }

        .section-9__item summary {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 16px 20px;
            cursor: pointer;
            list-style: none;
        }

        .section-9__item summary::-webkit-details-marker {
            display: none;
        }

        .section-9__item summary:hover {
            background: #f9f9f9;
        }

        .section-9__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #333;
            flex: 1;
        }

        .section-9__q-text:hover {
            color: #ea5b0c;
        }

        .section-9__icon {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
            position: relative;
        }

        .section-9__icon::before,
        .section-9__icon::after {
            content: '';
            position: absolute;
            background: #888;
            border-radius: 2px;
            transition: transform 0.25s ease, opacity 0.25s ease;
        }

        .section-9__icon::before {
            width: 12px;
            height: 1.5px;
            top: 9px;
            left: 4px;
        }

        .section-9__icon::after {
            width: 1.5px;
            height: 12px;
            top: 4px;
            left: 9px;
        }

        .section-9__item[open] .section-9__icon::after {
            transform: rotate(90deg);
            opacity: 0;
        }

        .section-9__a-inner {
            padding: 14px 20px 16px;
            border-top: 1px solid #e5e5e5;
        }

        .section-9__a-text {
            font-size: 0.9rem;
            color: #555;
            line-height: 1.6;
            margin: 0;
        }

        @media (max-width: 480px) {
            .section-9__q-text {
                font-size: 0.9rem;
            }
        }
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->


        <section class="product-header" aria-label="Cabeçalho do produto">
            <header class="product-header__banner">
                <figure style="width:100%;height:100%;margin:0;">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/header.jpg"
                        alt="Banner do produto" class="product-header__banner-img" loading="eager">
                </figure>

                <div class="product-header__badge" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo.png"
                        alt="imagem png com ícone da marca" class="product-header__badge-img">
                </div>
            </header>

            <article class="product-header__body">
                <small class="product-header__brand">Marca</small>
                <h1 class="product-header__title">
                    TÍTULO DO PRODUTO GAMERE (Nome, modelo, diferencial...)
                </h1>
                <p class="product-header__subtitle">
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto">
            <picture>
                <source media="(max-width: 760px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2222455_02-2.jpg"
                    width="780" height="400">
                <img class="section-6__image" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2222455_02-1.jpg"
                    alt="Caderno Funny Cat com estampa de gatinhos, capa colorida e espiral" width="1600" height="650"
                    loading="eager" fetchpriority="high" decoding="async">
            </picture>
            <div class="section-6__content">
                <h1 class="section-6__title">PRATICIDADE EM CADA GIRO</h1>
                <p class="section-6__description">Sucos, vitaminas e cremes perfeitos com lâminas de aço inox e função
                    pulsar</p>
            </div>
        </section>

        <div class="pdp-row-product-container">
            <div class="pdp-row-product is-reverse">
                <div class="pdp-row-product__content">
                    <ul class="pdp-feature-list" aria-label="Benefícios do produto">
                        <li class="pdp-feature-item">
                            <img class="pdp-feature-item__icon"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2222455_03-2-2.png" alt="Ícone" />
                            <div class="pdp-feature-item__body">
                                <strong class="pdp-feature-item__title">Manhãs Sem Pausa</strong>
                                <p class="pdp-feature-item__text">Prepare vitaminas nutritivas em segundos e use a
                                    função autolimpeza para sair de casa sem deixar bagunça na pia</p>
                            </div>
                        </li>
                        <li class="pdp-feature-item">
                            <img class="pdp-feature-item__icon"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2222455_03-2-3.png" alt="Ícone" />
                            <div class="pdp-feature-item__body">
                                <strong class="pdp-feature-item__title">Receitas de uma Só Vez</strong>
                                <p class="pdp-feature-item__text">A jarra de 2,1L permite cozinhar para a família
                                    inteira sem precisar bater os ingredientes em várias etapas</p>
                            </div>
                        </li>
                        <li class="pdp-feature-item">
                            <img class="pdp-feature-item__icon"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2222455_03-2-1.png" alt="Ícone" />
                            <div class="pdp-feature-item__body">
                                <strong class="pdp-feature-item__title">Cozinha Sempre Organizada</strong>
                                <p class="pdp-feature-item__text">O sistema enrola-cabo e o design leve eliminam a briga
                                    com fios e facilitam o armazenamento após o uso</p>
                            </div>
                        </li>
                        <li class="pdp-feature-item">
                            <img class="pdp-feature-item__icon"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2222455_03-2-4.png" alt="Ícone" />
                            <div class="pdp-feature-item__body">
                                <strong class="pdp-feature-item__title">Cuidado com o Bolso</strong>
                                <p class="pdp-feature-item__text">Durabilidade garantida por lâminas de aço inox e 1 ano
                                    de garantia, evitando gastos inesperados com trocas precoces</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="pdp-row-product__image-wrapper">
                    <picture>
                        <source media="(min-width: 960px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2222455_03-1.jpg" />
                        <img class="pdp-row-product__image" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2222455_03-2.jpg"
                            alt="Eletricista com capacete branco e colete laranja em obra" />
                    </picture>
                </div>

            </div>
        </div>

        <div class="pdp-row-product-container" style="background-color: white;">
            <div class="pdp-row-product">
                <div class="pdp-row-product__content">
                    <!-- ══ TÍTULO + DESCRIÇÃO (apague este bloco se não quiser usar) ══ -->
                    <h2 class="pdp-row-product__title" style="color: #222;">
                        Potência e Precisão para suas Receitas Diárias
                    </h2>
                    <p class="pdp-row-product__desc" style="color: #222;">
                        Com 2 velocidades e função pulsar, o Fast Mix utiliza 4 lâminas em aço inox para garantir
                        texturas homogêneas. É o desempenho ideal para sucos, vitaminas e cremes com total praticidade
                    </p>
                    <!-- ══ FIM TÍTULO + DESCRIÇÃO ══ -->
                </div>
                <div class="pdp-row-product__image-wrapper">
                    <picture>
                        <source media="(min-width: 960px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2222455_04-1.jpg" />
                        <img class="pdp-row-product__image" src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2222455_04-2.jpg"
                            alt="Eletricista com capacete branco e colete laranja em obra" />
                    </picture>
                </div>
            </div>
        </div>

        <section class="section-9" aria-labelledby="section-9-title">
            <div class="section-9__header">
                <h2 class="section-9__title" id="section-9-title">Tira-Dúvidas: Liquidificador Fast Mix</h2>
            </div>
            <ul class="section-9__list">
                <li class="section-9__item">
                    <details class="section-9__item">
                        <summary>
                            <h3 class="section-9__q-text">Bate gelo e fruta congelada?</h3>
                            <span class="section-9__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="section-9__a-inner">
                            <p class="section-9__a-text">Sim. As 4 lâminas de aço inox trituram gelo e alimentos sólidos com facilidade</p>
                        </div>
                    </details>
                </li>
                <li class="section-9__item">
                    <details class="section-9__item">
                        <summary>
                            <h3 class="section-9__q-text">O copo é bem resistente?</h3>
                            <span class="section-9__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="section-9__a-inner">
                            <p class="section-9__a-text">Sim. A jarra em PP é flexível e muito mais resistente a quedas que o acrílico comum</p>
                        </div>
                    </details>
                </li>
                <li class="section-9__item">
                    <details class="section-9__item">
                        <summary>
                            <h3 class="section-9__q-text">É muito barulhento?</h3>
                            <span class="section-9__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="section-9__a-inner">
                            <p class="section-9__a-text">Não. Ele possui selo de ruído aprovado para uso doméstico silencioso e estável</p>
                        </div>
                    </details>
                </li>
                <li class="section-9__item">
                    <details class="section-9__item">
                        <summary>
                            <h3 class="section-9__q-text">Cabe em armário pequeno?</h3>
                            <span class="section-9__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="section-9__a-inner">
                            <p class="section-9__a-text">Sim. É compacto, leve e tem sistema enrola-cabo para facilitar o armazenamento</p>
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
      css:  ``,
    },

        /*@@@@Col - padrao-4 */
    {
      id:   'padrao-4',
      name: 'Padrão 4',
      html: `<div class="lp-container">
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
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet">
    <title>PDP - eFácil</title>
    <!-- ---------------------------------------- ÁREA PARA COLOCAR STYLES ----------------------------------------------------------- -->

    <style>
        .faq-section {
            width: 100%;
            padding: 2rem 16px;
            box-sizing: border-box;
            margin: 0 auto 25px;
            padding-top: 0;
            font-family: sans-serif;
        }

        .faq-section__header {
            text-align: center;
            margin: 1rem 0;
        }

        .faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #333;
            margin: 0 0 12px;
            line-height: 98%;
        }

        .faq-section__subtitle {
            font-size: 1rem;
            color: #666;
            margin: 0;
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
            border: 1px solid #e5e5e5;
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
            background: #f9f9f9;
        }

        .faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #333;
            flex: 1;
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
            border-top: 1px solid #e5e5e5;
        }

        .faq-section__a-text {
            font-size: 0.9rem;
            color: #555;
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
        .product-header {
            --badge-size: 8rem;
            --banner-height: 180px;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            position: relative;
            font-family: sans-serif;
            container-type: inline-size;
        }

        .product-header__banner {
            width: 100%;
            height: var(--banner-height);
            position: relative;
            display: flex;
            justify-content: center;
        }

        .product-header__banner-figure {
            width: 100%;
            height: 100%;
            margin: 0;
        }

        .product-header__banner-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .product-header__badge {
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

        .product-header__badge-img {
            max-width: 90px;
            max-height: 90px;
            object-fit: contain;
        }

        .product-header__body {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: calc(var(--badge-size) / 2 + 1.1rem) 0.3rem 2.5rem;
            text-align: center;
        }

        .product-header__brand {
            color: #ff9900;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }

        .product-header__title {
            font-size: clamp(1.4rem, 4vw, 2.4rem);
            line-height: clamp(1.6rem, 4vw, 3.1rem);
            font-weight: 600;
            max-width: 50rem;
            text-wrap: pretty;
        }

        .product-header__subtitle {
            color: #8a8a8a;
            font-size: clamp(0.9rem, 2vw, 1.2rem);
            line-height: 120%;
            margin-top: 1rem;
            max-width: 90%;
            text-align: justify;
            text-wrap: pretty;
        }

        /* ===== 768px — banner cresce ===== */
        @media (min-width: 768px) {
            .product-header {
                --banner-height: 250px;
            }

            .product-header__subtitle {
                text-align: center;
            }
        }
    </style>

    <style>
        /* ===== HERO SECTION — VARIÁVEIS ===== */
        .section-6 {
            --pos-y: 50%;
            --pos-x: 7%;
            --color-title: #ffe178;
            --bg-box: rgba(0, 0, 0, 0.33);
            width: 100%;
            position: relative;
            overflow: hidden;
        }

        /* ===== IMAGEM ===== */
        .section-6__image {
            width: 100%;
            margin: auto;
            height: auto;
            display: block;
            border-radius: 15px 15px 0 0;
        }

        /* ===== CONTEÚDO — BASE MOBILE ===== */
        .section-6__content {
            background-color: #ea5b0c;
            position: static;
            transform: none;
            max-width: 100%;
            padding: 24px 20px;
            backdrop-filter: none;
            text-align: center;
            z-index: 10;
        }

        .section-6__title {
            font-size: 1.5rem;
            color: #333;
            margin: 0 0 2px;
            line-height: 1.2;
            font-weight: 800;
        }

        .section-6__description {
            font-size: 1rem;
            color: #555;
            line-height: 1.5;
        }

        /* ===== 576px — texto cresce um pouco ===== */
        @media (min-width: 576px) {
            .section-6__title {
                font-size: 1.8rem;
            }

            .section-6__description {
                font-size: 1.1rem;
            }

            .section-6__image {
                width: 100%;
                border-radius: 20px 20px 0 0;
            }
        }

        /* ===== 768px — layout passa a ser sobreposto ===== */
        @media (min-width: 768px) {

            .section-6__image {
                width: 100%;
            }

            .section-6__content {
                position: absolute;
                top: var(--pos-y);
                left: clamp(1%, var(--pos-x), 100%);
                transform: translateY(-50%);
                max-width: min(40%, 480px);
                padding: clamp(12px, 2vw, 20px);
                background-color: var(--bg-box);
                backdrop-filter: blur(4px);
                text-align: left;
                border-radius: 20px;
            }

            .section-6__title {
                font-size: clamp(1.4rem, 3.5vw, 2.6rem);
                color: var(--color-title);
                text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
            }

            .section-6__description {
                font-size: clamp(0.95rem, 2vw, 1.4rem);
                color: #fff;
                margin-bottom: 24px;
                text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.35);
            }
        }
    </style>

    <style>
        .section-15-container {
            background-color: #f16425;
            padding: 1.5rem;
            width: 100%;
            box-sizing: border-box;

        }

        .section-15 {
            display: flex;
            flex-direction: column-reverse;
            gap: 1.25rem;
            margin: 0 auto;
            width: 100%;
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
            font-size: 32px;
            font-weight: 600;
            line-height: 40px;
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
        .section-15-container {
            background-color: #f16425;
            padding: 1.5rem;
            width: 100%;
            box-sizing: border-box;
        }

        .section-15 {
            display: flex;
            flex-direction: column-reverse;
            gap: 1.25rem;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
        }

        /* Variação: imagem embaixo do conteúdo no mobile */
        .section-15--reverse {
            flex-direction: column;
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
            font-size: 32px;
            font-weight: 600;
            line-height: 40px;
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

        /* ===== 576px ===== */
        @media (min-width: 576px) {
            .section-15-container {
                padding: 1.75rem;
            }

            .section-15__feature-item-title {
                font-size: 1.1rem;
            }
        }

        /* ===== 768px — layout lado a lado ===== */
        @media (min-width: 768px) {
            .section-15-container {
                padding: 2rem;
            }

            .section-15 {
                align-items: center;
                flex-direction: row;
                gap: 1.5rem;
                justify-content: center;
                max-width: 960px;
            }

            /* No desktop, --reverse inverte a linha */
            .section-15--reverse {
                flex-direction: row-reverse;
            }

            .section-15__image-wrapper {
                flex: 0 0 48%;
                max-width: 48%;
            }

            .section-15__image {
                border-radius: 20px;
                aspect-ratio: 4 / 3;
                height: 100%;
                max-height: 420px;
                max-width: unset;
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

        /* ===== 992px ===== */
        @media (min-width: 992px) {
            .section-15 {
                max-width: 1060px;
                gap: 2rem;
            }

            .section-15__feature-list {
                gap: 1.25rem;
            }
        }

        /* ===== 1200px ===== */
        @media (min-width: 1200px) {
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
    </style>

    <style>
        .section-11-container {
            padding: 0 1rem 3rem;
            margin-inline: auto;
        }

        @media (min-width: 576px) {
            .section-11-container {
                max-width: 576px;
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
            margin: 1rem 0;
        }

        .section-11__title {
            font-size: 32px;
            font-weight: 900;
            color: #1a1a1a;
            margin: 0;
            line-height: 1.25;
        }

        @media (max-width: 768px) {
            .section-11__title {
                display: none;
            }
        }

        .section-11__grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
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
            background: #fff;
            border: 0.5px solid rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            padding: 1.5rem 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.75rem;
            transition: border-color 0.2s;
        }

        .section-11__item:hover {
            border-color: rgba(0, 0, 0, 0.22);
        }

        .section-11__figure {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 72px;
            height: 72px;
        }

        .section-11__image {
            width: 4.6rem;
            height: auto;
            display: block;
        }

        .section-11__name {
            font-size: 0.9375rem;
            font-weight: 500;
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

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="product-header" aria-label="Cabeçalho do produto">
            <header class="product-header__banner">
                <figure class="product-header__banner-figure">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/header.jpg"
                        alt="Banner do produto" class="product-header__banner-img" loading="eager">
                </figure>
                <div class="product-header__badge" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo.png"
                        alt="Ícone da marca" class="product-header__badge-img" loading="lazy">
                </div>
            </header>
            <article class="product-header__body">
                <small class="product-header__brand">Marca</small>
                <h2 class="product-header__title">
                    TÍTULO DO PRODUTO GAMERE (Nome, modelo, diferencial...)
                </h2>
                <p class="product-header__subtitle">
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto">
            <picture>
                <source media="(max-width: 767px)"
                    srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-2.png"
                    width="780" height="400">
                <img class="section-6__image"
                    src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-1.png"
                    alt="Caderno Funny Cat com estampa de gatinhos, capa colorida e espiral" width="1600" height="650"
                    loading="lazy" fetchpriority="high" decoding="async">
            </picture>
            <div class="section-6__content">
                <h3 class="section-6__title">Caderno Funny Cat</h3>
                <p class="section-6__description">Organize seus estudos com fofura e estilo!</p>
            </div>
        </section>

        <section class="section-11" aria-labelledby="section-11-title">
            <div class="section-11-container">
                <header class="section-11__header">
                    <h3 class="section-11__title" id="section-11-title">
                        Diferenciais que garantem uma instalação superior
                    </h3>
                </header>
                <ul class="section-11__grid" role="list">
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de formato universitário" width="74" height="74" loading="lazy">
                        </figure>
                        <h4 class="section-11__name">Flexibilidade Classe 4/5</h4>
                        <p class="section-11__value">Cobre de têmpera mole que desliza facilmente pelos eletrodutos,
                            economizando tempo
                            e esforço na instalação</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de formato universitário" width="74" height="74" loading="lazy">
                        </figure>
                        <h4 class="section-11__name">Flexibilidade Classe 4/5</h4>
                        <p class="section-11__value">Cobre de têmpera mole que desliza facilmente pelos eletrodutos,
                            economizando tempo
                            e esforço na instalação</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de formato universitário" width="74" height="74" loading="lazy">
                        </figure>
                        <h4 class="section-11__name">Flexibilidade Classe 4/5</h4>
                        <p class="section-11__value">Cobre de têmpera mole que desliza facilmente pelos eletrodutos,
                            economizando tempo
                            e esforço na instalação</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de formato universitário" width="74" height="74" loading="lazy">
                        </figure>
                        <h4 class="section-11__name">Flexibilidade Classe 4/5</h4>
                        <p class="section-11__value">Cobre de têmpera mole que desliza facilmente pelos eletrodutos,
                            economizando tempo
                            e esforço na instalação</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de formato universitário" width="74" height="74" loading="lazy">
                        </figure>
                        <h4 class="section-11__name">Flexibilidade Classe 4/5</h4>
                        <p class="section-11__value">Cobre de têmpera mole que desliza facilmente pelos eletrodutos,
                            economizando tempo
                            e esforço na instalação</p>
                    </li>
                </ul>
            </div>
        </section>

        <div class="section-15-container">
            <div class="section-15 is-reverse-760">
                <div class="section-15__content">
                    <h3 class="section-15__title">
                        A garantia de que o que está por trás das paredes nunca será um problema
                    </h3>
                    <p class="section-15__desc">
                        Ao escolher um condutor que une a máxima segurança contra incêndios, a eficiência energética
                        para seus equipamentos de alta potência e a flexibilidade necessária para uma instalação ágil,
                        você garante a proteção do seu patrimônio e a tranquilidade de saber que sua estrutura elétrica
                        foi feita para durar uma vida inteira.
                    </p>
                    <ul class="section-15__feature-list" aria-label="Benefícios do produto">
                        <li class="section-15__feature-item">
                            <img class="section-15__feature-item-icon" src="C:\\Users\\ygorq\\Downloads\\2222455_03-2-1.png"
                                alt="Ícone manhãs sem pausa" loading="lazy" />
                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Manhãs Sem Pausa</strong>
                                <p class="section-15__feature-item-text">Prepare vitaminas nutritivas em segundos e use
                                    a função autolimpeza para sair de casa sem deixar bagunça na pia</p>
                            </div>
                        </li>
                        <li class="section-15__feature-item">
                            <img class="section-15__feature-item-icon" src="C:\\Users\\ygorq\\Downloads\\2222455_03-2-2.png"
                                alt="Ícone receitas de uma só vez" loading="lazy" />
                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Receitas de uma Só Vez</strong>
                                <p class="section-15__feature-item-text">A jarra de 2,1L permite cozinhar para a família
                                    inteira sem precisar bater os ingredientes em várias etapas</p>
                            </div>
                        </li>
                        <li class="section-15__feature-item">
                            <img class="section-15__feature-item-icon" src="C:\\Users\\ygorq\\Downloads\\2222455_03-2-3.png"
                                alt="Ícone cozinha sempre organizada" loading="lazy" />
                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Cozinha Sempre Organizada</strong>
                                <p class="section-15__feature-item-text">O sistema enrola-cabo e o design leve eliminam
                                    a briga com fios e facilitam o armazenamento após o uso</p>
                            </div>
                        </li>
                        <li class="section-15__feature-item">
                            <img class="section-15__feature-item-icon" src="C:\\Users\\ygorq\\Downloads\\2222455_03-2-4.png"
                                alt="Ícone cuidado com o bolso" loading="lazy" />
                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Cuidado com o Bolso</strong>
                                <p class="section-15__feature-item-text">Durabilidade garantida por lâminas de aço inox
                                    e 1 ano de garantia, evitando gastos inesperados com trocas precoces</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="section-15__image-wrapper">
                    <picture>
                        <source media="(min-width: 768px)"
                            srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao4.jpg" />
                        <img class="section-15__image"
                            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao4.jpg"
                            alt="Eletricista com capacete branco e colete laranja em obra" loading="lazy" />
                    </picture>
                </div>
            </div>
        </div>

        <section class="section-32__container" aria-label="Seção de destaque do produto">
            <figure class="section-32__groupimage-section">
                <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/metalfrio/2223537_02.jpg"
                    alt="!!!!!COLOQUE O TEXTO ALT AQUI!!!!!" style="border-radius: 0px 0px 0px 0px;" width="1600"
                    height="865" loading="lazy" decoding="async" fetchpriority="low">
                <figcaption class="section-32__grouptext-overlay left">
                    <p style="color: #faca95;">Isso é uma descrição. Isso é uma descrição.</p>
                    <h2 style="color: #faca95;"><strong>SUB-TÍTULO</strong></h2>
                    <p style="color: #faca95;">Isso é uma descrição. Isso é uma descrição. Isso é uma descrição. Isso é
                        umadescrição.</p>
                </figcaption>
            </figure>
        </section>

        <!-- Área de FAQ -->
        <section class="faq-section" aria-labelledby="faq-section-title">
            <div class="faq-section__header">
                <h3 class="faq-section__title" id="faq-section-title">Título Principal</h3>
                <p class="faq-section__subtitle">Sub-título</p>
            </div>
            <ul class="faq-section__list">
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Pergunta</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Pergunta</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Pergunta</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Pergunta</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Pergunta</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Resposta</p>
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
      css:  ``,
    },

    /*@@@@Col - padrao-5-cabos */
    {
      id:   'padrao-5-cabos',
      name: 'Padrão 5 - Cabos',
      html: `<div class="lp-container">
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
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet">
    <title>PDP - eFácil</title>
    <!-- ---------------------------------------- ÁREA PARA COLOCAR STYLES ----------------------------------------------------------- -->

    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .product-header {
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

        .product-header__banner {
            width: 100%;
            height: var(--banner-height);
            position: relative;
            display: flex;
            justify-content: center;
        }

        .product-header__banner figure {
            width: 100%;
            height: 100%;
            margin: 0;
        }

        .product-header__banner-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .product-header__badge {
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

        .product-header__badge-img {
            max-width: 90px;
            max-height: 90px;
            object-fit: contain;
        }

        .product-header__body {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: calc(var(--badge-size) / 2 + 1.1rem) 0.3rem 2.5rem;
            text-align: center;
            padding-bottom: 0;
        }

        .product-header__brand {
            color: #ff9900;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }

        .product-header__title {
            font-size: clamp(1.4rem, 4vw, 2.4rem);
            line-height: clamp(1.6rem, 4vw, 3.1rem);
            font-weight: 600;
            max-width: 50rem;
            text-wrap: pretty;
        }

        .product-header__subtitle {
            color: #8a8a8a;
            font-size: clamp(1rem, 2vw, 1.2rem);
            line-height: 120%;
            margin-top: 1rem;
            max-width: 52rem;
            text-wrap: pretty;
        }

        @media (max-width: 768px) {
            .product-header {
                --banner-height: 180px;
            }
        }

        @media (max-width: 470px) {
            .product-header__subtitle {
                text-align: justify;
                font-size: clamp(0.9rem, 2vw, 1.2rem);
            }
        }
    </style>

    <style>
        .pdp-row-product {
            margin-left: auto;
            margin-right: auto;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            width: 100%;
        }

        .tw-text-2xl {
            font-size: 32px;
            font-weight: 600;
            line-height: 40px
        }

        .pdp-product-title {
            --tw-text-opacity: 1;
            color: rgb(0 0 0/var(--tw-text-opacity));
            max-width: 56rem;
            text-align: center
        }

        .tw-text-lg {
            font-size: 20px;
            font-weight: 700;
            line-height: 28px
        }

        .pdp-product-description {
            --tw-text-opacity: 1;
            color: rgb(138 138 138/var(--tw-text-opacity));
            font-size: 14px;
            line-height: 22px;
            margin-top: 1rem;
            max-width: 56rem;
            text-align: center
        }

        @media (min-width:576px) {
            .pdp-row-product {
                max-width: 576px;
            }

            .tw-text-2xl {
                font-size: 32px;
            }
        }

        @media (min-width:768px) {
            .pdp-row-product {
                max-width: 768px
            }

            .tw-text-2xl {
                font-size: 32px;
            }

        }



        @media (min-width:992px) {
            .pdp-row-product {
                max-width: 992px
            }

            .tw-text-2xl {
                font-size: 32px;
            }
        }

        @media (min-width:1200px) {
            .pdp-row-product {
                max-width: 1200px
            }

            .tw-text-2xl {
                font-size: 32px;
            }
        }

        @media (min-width:1536px) {
            .pdp-row-product {
                max-width: 1536px
            }

            .tw-text-2xl {
                font-size: 32px;
            }
        }

        .pdp-row-product {
            align-items: center;
            display: flex;
            gap: 1.5rem;
            justify-content: space-between;
            margin-top: 2rem;
            margin-bottom: 2rem;
        }

        .reverse-row-product {
            flex-direction: row-reverse;
        }

        @media not all and (min-width:992px) {
            .pdp-row-product {
                flex-direction: column-reverse
            }
        }

        @media (min-width:992px) {
            .pdp-row-product {
                gap: 6rem
            }
        }

        .pdp-row-product-image {
            max-width: 30rem;
            object-fit: contain;
            width: 100%;
            border-radius: 20px;
        }

        .pdp-row-product-content {
            display: flex;
            flex-direction: column;
            max-width: 28rem;
            width: 100%
        }

        .pdp-row-product-content * {
            text-align: left
        }

        @media (min-width:992px) {
            .pdp-row-product.is-reverse .pdp-row-product-image {
                order: 1
            }

            .pdp-row-product.is-reverse .pdp-row-product-content {
                order: 2
            }
        }

        .pdp-row-product-content {
            display: flex;
            flex-direction: column;
            max-width: 28rem;
            width: 100%
        }

        .pdp-row-product-content * {
            text-align: left
        }

        @media (min-width:992px) {
            .pdp-row-product.is-reverse .pdp-row-product-image {
                order: 1
            }

            .pdp-row-product.is-reverse .pdp-row-product-content {
                order: 2
            }
        }

        @media (max-width:768px) {
            .pdp-row-product-image {
                width: 100%;
                aspect-ratio: 9 / 6;
                object-fit: cover;
            }
        }
    </style>

    <style>
        .section-11-container {
            padding-bottom: 3rem;
            padding-top: 1.8rem;
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

        @media (min-width: 1536px) {
            .section-11-container {
                max-width: 1536px;
            }
        }

        .section-11__header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .section-11__title {
            font-size: 32px;
            font-weight: 900;
            color: #1a1a1a;
            margin: 0;
            line-height: 1.25;
        }

        .section-11__grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
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
            background: #fff;
            border: 0.5px solid rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            padding: 1.5rem 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.75rem;
            transition: border-color 0.2s;
        }

        .section-11__item:hover {
            border-color: rgba(0, 0, 0, 0.22);
        }

        .section-11__figure {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 72px;
            height: 72px;
        }

        .section-11__image {
            width: 4.6rem;
            height: auto;
            display: block;
        }

        .section-11__name {
            font-size: 0.9375rem;
            font-weight: 500;
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
    </style>

    <style>
        /* ── Tokens do section-62 ── */
        .section-62 {
            font-family: system-ui, sans-serif;
            width: 100%;
            background: #efefef;
            overflow: hidden;
        }

        /* ── Inputs ocultos ── */
        .section-62__radio {
            position: absolute;
            display: none;
            width: 0;
            height: 0;
            opacity: 0;
            pointer-events: none;
        }

        /* ── Wrap ── */
        .section-62__wrap {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 32px 0 28px;
            overflow: hidden;
        }

        /* ── Header ── */
        .section-62__header {
            padding: 0 28px;
        }

        .section-62__title {
            font-weight: 500;
            font-size: clamp(1rem, 2.8vw, 1.4rem);
            color: #1a1a1a;
            text-align: center;
        }

        /* ── Track ── */
        .section-62__track {
            display: flex;
            gap: 67px;
            padding-left: calc((100% - 310px) / 2);
            padding-right: calc((100% - 310px) / 2);
            transition: transform .44s cubic-bezier(.4, 0, .2, 1);
            transform: translateX(0);
            overflow: visible;
        }

        /* ── Card ── */
        .section-62__card {
            flex: 0 0 310px;
            width: 310px;
            background: #55606b;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 6px 32px rgba(0, 0, 0, .075);
            text-align: center;
            transform: scale(0.85);
            opacity: .38;
            transition: transform .44s cubic-bezier(.4, 0, .2, 1), opacity .44s ease, box-shadow .44s ease;
        }

        .section-62__card-img {
            width: 100%;
            object-fit: cover;
            display: block;
        }

        .section-62__card-body {
            padding: 14px 14px 18px;
        }

        .section-62__card-title {
            font-size: 1.4rem;
            font-weight: 600;
            line-height: 1.3;
            margin-bottom: 5px;
            color: #fefefe;
        }

        .section-62__card-desc {
            font-size: 1.1rem;
            color: #f2f2f2;
            line-height: 1.55;
            font-weight: 300;
            margin: 0;
        }

        /* ── Estado ativo — Mobile: 1 card ── */
        #s62-1:checked~.section-62 .section-62__card:nth-child(1),
        #s62-2:checked~.section-62 .section-62__card:nth-child(2),
        #s62-3:checked~.section-62 .section-62__card:nth-child(3) {
            transform: scale(1);
            opacity: 1;
            box-shadow: 0 0 10px rgba(0, 0, 0, .205), 0 0 0 1.5px rgba(201, 168, 76, .041);
        }

        #s62-1:checked~.section-62 .section-62__track {
            transform: translateX(calc(0 * (310px + 67px) * -1));
        }

        #s62-2:checked~.section-62 .section-62__track {
            transform: translateX(calc(1 * (310px + 67px) * -1));
        }

        #s62-3:checked~.section-62 .section-62__track {
            transform: translateX(calc(2 * (310px + 67px) * -1));
        }

        /* ── Tablet ≥ 768px — 2 cards visíveis ── */
        @media (min-width: 768px) {
            .section-62__track {
                gap: 24px;
                padding-left: calc((100% - 2 * 230px - 24px) / 2);
                padding-right: calc((100% - 2 * 230px - 24px) / 2);
            }

            .section-62__card {
                flex: 0 0 230px;
                width: 230px;
            }

            #s62-1:checked~.section-62 .section-62__card:nth-child(1),
            #s62-1:checked~.section-62 .section-62__card:nth-child(2),
            #s62-2:checked~.section-62 .section-62__card:nth-child(2),
            #s62-2:checked~.section-62 .section-62__card:nth-child(3),
            #s62-3:checked~.section-62 .section-62__card:nth-child(2),
            #s62-3:checked~.section-62 .section-62__card:nth-child(3) {
                transform: scale(1);
                opacity: 1;
                box-shadow: 0 0 10px rgba(0, 0, 0, .205), 0 0 0 1.5px rgba(201, 168, 76, .041);
            }

            #s62-1:checked~.section-62 .section-62__track {
                transform: translateX(0);
            }

            #s62-2:checked~.section-62 .section-62__track {
                transform: translateX(calc(1 * (230px + 24px) * -1));
            }

            #s62-3:checked~.section-62 .section-62__track {
                transform: translateX(calc(1 * (230px + 24px) * -1));
            }
        }

        /* ── Desktop ≥ 992px — 3 cards visíveis ── */
        @media (min-width: 992px) {
            .section-62__track {
                gap: 20px;
                padding-left: calc((100% - 3 * 280px - 2 * 20px) / 2);
                padding-right: calc((100% - 3 * 280px - 2 * 20px) / 2);
            }

            .section-62__card {
                flex: 0 0 280px;
                width: 280px;
                transform: scale(0.83);
            }

            #s62-1:checked~.section-62 .section-62__card:nth-child(1),
            #s62-1:checked~.section-62 .section-62__card:nth-child(2),
            #s62-1:checked~.section-62 .section-62__card:nth-child(3),
            #s62-2:checked~.section-62 .section-62__card:nth-child(1),
            #s62-2:checked~.section-62 .section-62__card:nth-child(2),
            #s62-2:checked~.section-62 .section-62__card:nth-child(3),
            #s62-3:checked~.section-62 .section-62__card:nth-child(1),
            #s62-3:checked~.section-62 .section-62__card:nth-child(2),
            #s62-3:checked~.section-62 .section-62__card:nth-child(3) {
                transform: scale(1);
                opacity: 1;
                box-shadow: 0 0 10px rgba(0, 0, 0, .205), 0 0 0 1.5px rgba(201, 168, 76, .041);
            }

            #s62-1:checked~.section-62 .section-62__track,
            #s62-2:checked~.section-62 .section-62__track,
            #s62-3:checked~.section-62 .section-62__track {
                transform: translateX(0);
            }
        }

        /* ── Navegação ── */
        .section-62__nav {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 14px;
            padding: 0 28px;
        }

        .section-62__dots {
            display: flex;
            gap: 7px;
            align-items: center;
        }

        .section-62__dot {
            display: block;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #55606b;
            opacity: .35;
            cursor: pointer;
            transition: opacity .25s, width .3s, background .25s, border-radius .3s;
        }

        #s62-1:checked~.section-62 .section-62__dot[for="s62-1"],
        #s62-2:checked~.section-62 .section-62__dot[for="s62-2"],
        #s62-3:checked~.section-62 .section-62__dot[for="s62-3"] {
            opacity: 1;
            background: #c9a84c;
            width: 20px;
            border-radius: 100px;
        }

        /* ── Botões prev/next ── */
        .section-62__btn-slot {
            position: relative;
            width: 40px;
            height: 40px;
            flex-shrink: 0;
        }

        .section-62__btn-slot label {
            position: absolute;
            inset: 0;
            display: none;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: #55606b;
            border: 1px solid rgba(255, 255, 255, .07);
            color: #fefefe;
            font-size: 17px;
            cursor: pointer;
            transition: background .2s, border-color .2s, transform .15s;
            user-select: none;
        }

        .section-62__btn-slot label:hover {
            background: rgba(201, 168, 76, .15);
            border-color: #c9a84c;
            transform: scale(1.1);
        }

        .section-62__btn-slot label:active {
            transform: scale(.93);
        }

        .section-62__btn-disabled {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #55606b;
            border: 1px solid rgba(255, 255, 255, .04);
            opacity: .2;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 17px;
            color: #f2f2f2;
            pointer-events: none;
        }

        /* Padrão: disabled visível, labels ocultos */
        .section-62__btn-slot label {
            display: none;
        }

        .section-62__btn-disabled {
            display: flex;
        }

        /* PREV */
        #s62-1:checked~.section-62 .section-62__btn--prev .section-62__btn-disabled {
            display: flex;
        }

        #s62-1:checked~.section-62 .section-62__btn--prev label {
            display: none;
        }

        #s62-2:checked~.section-62 .section-62__btn--prev .section-62__btn-disabled {
            display: none;
        }

        #s62-2:checked~.section-62 .section-62__btn--prev label {
            display: none;
        }

        #s62-2:checked~.section-62 .section-62__btn--prev label[for="s62-1"] {
            display: flex;
        }

        #s62-3:checked~.section-62 .section-62__btn--prev .section-62__btn-disabled {
            display: none;
        }

        #s62-3:checked~.section-62 .section-62__btn--prev label {
            display: none;
        }

        #s62-3:checked~.section-62 .section-62__btn--prev label[for="s62-2"] {
            display: flex;
        }

        /* NEXT */
        #s62-1:checked~.section-62 .section-62__btn--next .section-62__btn-disabled {
            display: none;
        }

        #s62-1:checked~.section-62 .section-62__btn--next label {
            display: none;
        }

        #s62-1:checked~.section-62 .section-62__btn--next label[for="s62-2"] {
            display: flex;
        }

        #s62-2:checked~.section-62 .section-62__btn--next .section-62__btn-disabled {
            display: none;
        }

        #s62-2:checked~.section-62 .section-62__btn--next label {
            display: none;
        }

        #s62-2:checked~.section-62 .section-62__btn--next label[for="s62-3"] {
            display: flex;
        }

        #s62-3:checked~.section-62 .section-62__btn--next .section-62__btn-disabled {
            display: flex;
        }

        #s62-3:checked~.section-62 .section-62__btn--next label {
            display: none;
        }
    </style>

    <style>
        .section-9 {
            width: 100%;
            padding: 2rem 16px;
            box-sizing: border-box;
            margin: 25px auto 25px;
            padding-top: 0;
            font-family: sans-serif;
        }

        .section-9__header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .section-9__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #333;
            margin: 0 0 12px;
            line-height: 98%;
        }

        .section-9__subtitle {
            font-size: 1rem;
            color: #666;
            margin: 0;
        }

        .section-9__list {
            list-style: none;
            margin: 0 auto;
            padding: 0;
            max-width: 56rem;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .section-9__item {
            background: #fff;
            border: 1px solid #e5e5e5;
            border-radius: 12px;
            overflow: hidden;
        }

        .section-9__item summary {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 16px 20px;
            cursor: pointer;
            list-style: none;
        }

        .section-9__item summary::-webkit-details-marker {
            display: none;
        }

        .section-9__item summary:hover {
            background: #f9f9f9;
        }

        .section-9__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #333;
            flex: 1;
        }

        .section-9__q-text:hover {
            color: #ea5b0c;
        }

        .section-9__icon {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
            position: relative;
        }

        .section-9__icon::before,
        .section-9__icon::after {
            content: '';
            position: absolute;
            background: #888;
            border-radius: 2px;
            transition: transform 0.25s ease, opacity 0.25s ease;
        }

        .section-9__icon::before {
            width: 12px;
            height: 1.5px;
            top: 9px;
            left: 4px;
        }

        .section-9__icon::after {
            width: 1.5px;
            height: 12px;
            top: 4px;
            left: 9px;
        }

        .section-9__item[open] .section-9__icon::after {
            transform: rotate(90deg);
            opacity: 0;
        }

        .section-9__a-inner {
            padding: 14px 20px 16px;
            border-top: 1px solid #e5e5e5;
        }

        .section-9__a-text {
            font-size: 0.9rem;
            color: #555;
            line-height: 1.6;
            margin: 0;
        }

        @media (max-width: 480px) {
            .section-9__q-text {
                font-size: 0.9rem;
            }
        }
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="product-header" aria-label="Cabeçalho do produto">
            <header class="product-header__banner">
                <figure style="width:100%;height:100%;margin:0;">
                    <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/logotipo-corfio-fios-cabos-eletricos-4203793-00.jpg"
                        alt="Logotipo Corfio Fios e Cabos Elétricos em letras brancas sobre fundo azul escuro"
                        class="product-header__banner-img" loading="eager">
                </figure>

                <div class="product-header__badge" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/corfio-logo.png"
                        alt="imagem png com ícone da marca" class="product-header__badge-img">
                </div>
            </header>

            <article class="product-header__body">
                <small class="product-header__brand">corfio</small>
                <h1 class="product-header__title">
                    Cabo Flexível Bobina 2,5mm 1100m 750V Branco
                </h1>
                <p class="product-header__subtitle">
                    Garanta agilidade na obra com o Cabo Flexível Corfio 2,5mm². Desenvolvido com encordoamento classe
                    4/5 para maior flexibilidade e deslizamento, ele é a escolha perfeita para redes de distribuição em
                    casas, prédios e painéis elétricos que exigem máxima confiança
                </p>
            </article>
        </section>

        <div class="pdp-row-product">
            <div class="pdp-row-product-content">
                <h3 class="pdp-product-title tw-text-2xl">
                    Potência com Segurança Máxima
                </h3>
                <p class="pdp-product-description">
                    A escolha profissional para instalações residenciais e comerciais que exigem durabilidade e
                    conformidade técnica
                </p>
            </div>
            <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cabo-flexivel-corfio-2-5mm-detalhe-condutor-cobre-4203793-01.jpg"
                alt="Detalhe em close do condutor de cobre nu e isolação branca do Cabo Flexível Corfio 2,5mm"
                class="pdp-row-product-image" />
        </div>


        <input class="section-62__radio" type="radio" name="slide-62" id="s62-1" checked>
        <input class="section-62__radio" type="radio" name="slide-62" id="s62-2">
        <input class="section-62__radio" type="radio" name="slide-62" id="s62-3">
        <div class="section-62">
            <section class="section-62__wrap" aria-label="Carrossel de aplicações do produto">
                <header class="section-62__header">
                    <h3 class="section-62__title">Aplicações do Cabo da Corfio</h3>
                </header>

                <div class="section-62__track" role="list">
                    <article class="section-62__card" role="listitem">
                        <img class="section-62__card-img"
                            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/megatron/404517_04-2.png"
                            alt="Interior de uma obra em andamento com paredes de gesso cruas, tubulações expostas e luz do sol iluminando a poeira no ar"
                            width="310" height="220" loading="lazy">
                        <div class="section-62__card-body">
                            <h4 class="section-62__card-title">Ambientes Comerciais e Escritórios</h4>
                            <p class="section-62__card-desc">Embutido em alvenaria ou em canaletas de escritórios para
                                alimentar estações de trabalho e sistemas de iluminação LED de alta performance</p>
                        </div>
                    </article>

                    <article class="section-62__card" role="listitem">
                        <img class="section-62__card-img"
                            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/megatron/404517_04-1.png"
                            alt="Imagem propositalmente desfocada de uma recepção moderna, bem iluminada e com poltronas dispostas perto de janelas grandes"
                            width="310" height="220" loading="lazy">
                        <div class="section-62__card-body">
                            <h4 class="section-62__card-title">Ambientes Residenciais (Uso Geral)</h4>
                            <p class="section-62__card-desc">Quartos, salas e corredores para ligar aparelhos comuns
                                (TVs, computadores, carregadores, luminárias)</p>
                        </div>
                    </article>

                    <article class="section-62__card" role="listitem">
                        <img class="section-62__card-img"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cabo-flexivel-corfio-aplicacao-cozinha-lifestyle-4203793-21.jpg"
                            alt="Ambiente de cozinha residencial com foco em balcão, sugerindo aplicação de cabos elétricos Corfio"
                            width="310" height="220" loading="lazy">
                        <div class="section-62__card-body">
                            <h4 class="section-62__card-title">Áreas Úmidas e Cozinhas (Circuitos Específicos)</h4>
                            <p class="section-62__card-desc">Tomadas de cozinhas e áreas de serviço para
                                eletrodomésticos de médio porte, como liquidificadores, batedeiras e geladeiras</p>
                        </div>
                    </article>
                </div>

                <nav class="section-62__nav" aria-label="Navegação do carrossel">
                    <div class="section-62__btn-slot section-62__btn--prev">
                        <span class="section-62__btn-disabled" aria-hidden="true">&#8592;</span>
                        <label for="s62-1" aria-label="Slide anterior">&#8592;</label>
                        <label for="s62-2" aria-label="Slide anterior">&#8592;</label>
                    </div>

                    <div class="section-62__dots" role="tablist" aria-label="Slides">
                        <label class="section-62__dot" for="s62-1" role="tab" aria-label="Ir para slide 1"></label>
                        <label class="section-62__dot" for="s62-2" role="tab" aria-label="Ir para slide 2"></label>
                        <label class="section-62__dot" for="s62-3" role="tab" aria-label="Ir para slide 3"></label>
                    </div>

                    <div class="section-62__btn-slot section-62__btn--next">
                        <label for="s62-2" aria-label="Próximo slide">&#8594;</label>
                        <label for="s62-3" aria-label="Próximo slide">&#8594;</label>
                        <span class="section-62__btn-disabled" aria-hidden="true">&#8594;</span>
                    </div>
                </nav>
            </section>
        </div>

        <div class="pdp-row-product is-reverse">
            <div class="pdp-row-product-content">
                <h3 class="pdp-product-title tw-text-2xl">
                    Flexibilidade Classe 5: Instalação sem Esforço
                </h3>
                <p class="pdp-product-description">
                    Desenvolvido com encordoamento de alta classe e isolação em PVC especial, o cabo oferece um
                    deslizamento superior. Menos atrito no conduíte significa uma instalação mais rápida e sem danos ao
                    material
                </p>
            </div>
            <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cabo-flexivel-corfio-2-5mm-instalacao-eletrica-lifestyle-4203793-02.jpg"
                alt="Eletricista instalando Cabo Flexível Corfio branco 2,5mm em caixa de passagem de alvenaria"
                class="pdp-row-product-image" />
        </div>

        <section class="section-11" aria-labelledby="section-11-title" style="background-color: #efefef;">
            <div class="section-11-container">
                <header class="section-11__header">
                    <h2 class="section-11__title" id="section-11-title">Diferenciais que garantem uma instalação
                        superior</h2>
                </header>
                <ul class="section-11__grid" role="list">
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cabo-flexivel-corfio-selo-qualidade-garantia-icon-4203793-31.png"
                                alt="Ícone de medalha com engrenagem simbolizando a qualidade e conformidade técnica dos cabos Corfio"
                                width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">Normatização Rigorosa</h3>
                        <p class="section-11__value">Atende à ABNT NBR NM 247-3. Segurança jurídica e técnica para sua
                            obra</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cabo-flexivel-corfio-bobina-100m-icon-4203793-32.png"
                                alt="Ícone ilustrativo de bobina de cabo elétrico Corfio representando a embalagem de venda"
                                width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">Máxima Flexibilidade</h3>
                        <p class="section-11__value">Classe 4/5 que garante deslizamento fácil e instalação rápida em
                            qualquer conduíte</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cabo-flexivel-corfio-antichama-autoextinguivel-icon-4203793-33.png"
                                alt="Ícone de chama cortada indicando propriedade antichama e autoextinguível do cabo Corfio"
                                width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">Segurança Anti-chamas</h3>
                        <p class="section-11__value">Isolamento em PVC/A autoextinguível. Proteção ativa contra
                            propagação de fogo</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cabo-flexivel-corfio-condutor-cobre-flexibilidade-icon-4203793-34.png"
                                alt="Ícone de fios de cobre desencapados destacando a flexibilidade classe 4 ou 5 do condutor Corfio"
                                width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">Cobre de Alta Pureza</h3>
                        <p class="section-11__value">Resistência máxima de 7,98 Ω/km, evitando o aquecimento excessivo
                            da rede</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cabo-flexivel-corfio-protecao-contra-fogo-seguranca-icon-4203793-35.png"
                                alt="Ícone de escudo com chama interna representando a proteção e segurança contra incêndios Corfio"
                                width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">Resistência Térmica</h3>
                        <p class="section-11__value">Suporta picos de até 160°C em curto-circuito sem derreter a
                            isolação</p>
                    </li>

                </ul>
            </div>
        </section>

        <section class="section-9" aria-labelledby="section-9-title">
            <div class="section-9__header">
                <h2 class="section-9__title" id="section-9-title">Guia Rápido: Cabo Flexível 2,5mm</h2>
            </div>
            <ul class="section-9__list">
                <li class="section-9__item">
                    <details class="section-9__item">
                        <summary>
                            <span class="section-9__q-text">Ele desliza bem no conduíte?</span>
                            <span class="section-9__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="section-9__a-inner">
                            <p class="section-9__a-text">Sim, possui acabamento em PVC de alto deslizamento e
                                flexibilidade classe 4/5. É projetado para passar fácil por curvas e tubulações
                                apertadas</p>
                        </div>
                    </details>
                </li>
                <li class="section-9__item">
                    <details class="section-9__item">
                        <summary>
                            <span class="section-9__q-text">É cobre puro ou alumínio?</span>
                            <span class="section-9__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="section-9__a-inner">
                            <p class="section-9__a-text">Cobre 100% puro (têmpera mole). Garante a máxima condução de
                                energia e não sofre com a oxidação precoce dos fios mistos</p>
                        </div>
                    </details>
                </li>
                <li class="section-9__item">
                    <details class="section-9__item">
                        <summary>
                            <span class="section-9__q-text">O material é antichama?</span>
                            <span class="section-9__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="section-9__a-inner">
                            <p class="section-9__a-text">Sim, possui isolação em PVC/A que não propaga fogo e se apaga
                                sozinho. Segurança total contra curtos-circuitos</p>
                        </div>
                    </details>
                </li>
                <li class="section-9__item">
                    <details class="section-9__item">
                        <summary>
                            <span class="section-9__q-text">Para que serve o cabo 2,5mm?</span>
                            <span class="section-9__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="section-9__a-inner">
                            <p class="section-9__a-text">É o padrão para tomadas de uso geral (quartos e salas) e
                                circuitos de iluminação. Suporta com segurança a carga de eletrodomésticos comuns</p>
                        </div>
                    </details>
                </li>
                <li class="section-9__item">
                    <details class="section-9__item">
                        <summary>
                            <span class="section-9__q-text">Posso instalar em parede de alvenaria?</span>
                            <span class="section-9__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="section-9__a-inner">
                            <p class="section-9__a-text">Sim, é ideal para eletrodutos embutidos, aparentes ou
                                canaletas. Suporta temperaturas de até 70°C em uso constante</p>
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
      css:  ``,
    },
    /*@@@@Col - padrao6 */
    {
      id:   'padrao6',
      name: 'padrao6',
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
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
    rel="stylesheet">
  <title>PDP - eFácil</title>
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
      background-color: #f16425;
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
    }

    .section-15__content {
      display: flex;
      flex-direction: column;
      width: 95%;
      margin: auto;
      box-sizing: border-box;
    }

    .section-15__title {
      color: #1a1a1a;
      font-size: 32px;
      font-weight: 600;
      line-height: 40px;
      margin: 0 0 1rem;
      text-align: left;
    }

    .section-15__desc {
      color: #1a1a1a;
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
      color: #1a1a1a;
      font-size: 1.05rem;
      font-weight: 700;
      line-height: 1.35;
      margin: 0;
    }

    .section-15__feature-item-text {
      color: #1a1a1a;
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
    .seals-section {
      width: 100%;
      background-color: #fef9f4;
      padding: 2.5rem 1.5rem;
      box-sizing: border-box;
      font-family: sans-serif;
    }

    .seals-section__inner {
      max-width: 960px;
      margin: 0 auto;
    }

    .seals-section__title {
      text-align: center;
      font-size: clamp(1.2rem, 3vw, 1.6rem);
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 0.5rem;
    }

    .seals-section__subtitle {
      text-align: center;
      color: #888;
      font-size: 0.9rem;
      margin-bottom: 2rem;
    }

    .seals-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .seal-card {
      background: #fff;
      border: 1px solid #e8e8e8;
      border-radius: 14px;
      padding: 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .seal-card__icon {
      font-size: 1.6rem;
      flex-shrink: 0;
      line-height: 1;
    }

    .seal-card__body {
      min-width: 0;
    }

    .seal-card__title {
      font-size: 0.8rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 0.15rem;
      line-height: 1.3;
    }

    .seal-card__text {
      font-size: 0.72rem;
      color: #777;
      line-height: 1.45;
      margin: 0;
    }

    @media (min-width: 520px) {
      .seals-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (min-width: 768px) {
      .seals-grid {
        grid-template-columns: repeat(6, 1fr);
      }

      .seal-card {
        flex-direction: column;
        text-align: center;
        padding: 1.25rem 0.75rem;
        gap: 0.5rem;
      }

      .seal-card__icon {
        font-size: 2rem;
      }

      .seal-card__title {
        font-size: 0.75rem;
      }

      .seal-card__text {
        display: none;
      }
    }
  </style>

  <style>
    .faq-section {
      width: 100%;
      padding: 2rem 16px;
      box-sizing: border-box;
      margin: 0 auto 25px;
      padding-top: 0;
      font-family: sans-serif;
    }

    .faq-section__header {
      text-align: center;
      margin: 2rem auto;
      margin-top: 0;
    }

    .faq-section__title {
      font-size: clamp(1.5rem, 3vw, 2rem);
      font-weight: bold;
      color: #333;
      margin: 0 0 12px;
      line-height: 98%;
    }

    .faq-section__subtitle {
      font-size: 1rem;
      color: #666;
      margin: 0;
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
      border: 1px solid #e5e5e5;
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
      background: #f9f9f9;
    }

    .faq-section__q-text {
      font-size: 1rem;
      font-weight: bold;
      color: #333;
      flex: 1;
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
      border-top: 1px solid #e5e5e5;
    }

    .faq-section__a-text {
      font-size: 0.9rem;
      color: #555;
      line-height: 1.6;
      margin: 0;
    }

    @media (max-width: 480px) {
      .faq-section__q-text {
        font-size: 0.9rem;
      }
    }
  </style>

  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->


    <section class="product-header-2" aria-label="Cabeçalho do produto">
      <header class="product-header__banner-2">
        <figure style="width:100%;height:100%;margin:0;">
          <img class="product-header__banner-img-2"
            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sabonete-liquido-johnsons-baby-detalhe-bolhas-espuma-201447-00.jpg"
            alt="Detalhe de bolhas de sabão translúcidas e espuma cremosa do Sabonete Líquido Johnson's Baby"
            width="1338" height="250" loading="eager" decoding="async">
        </figure>
        <div class="product-header__badge-2" role="img" aria-label="Logo da marca">
          <img class="product-header__badge-img-2"
            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/johnsonsbaby/logo-johnsonsbaby.png"
            alt="Ícone da marca" loading="lazy" decoding="async">
        </div>
      </header>
      <article class="product-header__body-2">
        <small class="product-header__brand-2">── Johnson's Baby ──</small>
        <h1 class="product-header__title-2">
          <span>Sabonete Líquido Glicerina</span>
          <strong> Baby Cabeça aos Pés, 750 mL</strong>
        </h1>

        <p class="product-header__subtitle-2">
          Limpeza completa e suave desde o primeiro dia de vida. Com glicerina de origem natural,
          este sabonete 3 em 1 limpa, hidrata e protege a pele do bebê contra o ressecamento,
          mantendo o cuidado essencial no dia a dia
        </p>
      </article>
    </section>

    <div class="section-15-container" style="background-color: #f9e0d8;">
      <div class="section-15">
        <div class="section-15__content">
          <h2 class="section-15__title">
            Limpeza e hidratação para todos os momentos
          </h2>

          <p class="section-15__desc">
            Com 94% de ingredientes naturais e glicerina, o Sabonete Cabeça aos Pés é hipoalergênico,
            suave e ideal para uso diário. Limpa sem agredir, preservando a hidratação natural da pele.
          </p>
        </div>
        <div class="section-15__image-wrapper">
          <img class="section-15__image"
            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sabonete-liquido-johnsons-baby-da-cabeca-aos-pes-glicerina-208026_01.jpg"
            alt="Sabonete Líquido Johnson's Baby Da Cabeça aos Pés 200ml com glicerina e vitamina B5" loading="lazy"
            decoding="async">
        </div>
      </div>
    </div>

    <div class="section-15-container" style="background-color: #fef9f4;">
      <div class="section-15 is-reverse">
        <div class="section-15__content">
          <ul class="section-15__feature-list" aria-label="Benefícios do produto">
            <li class="section-15__feature-item">
              <div class="section-15__feature-item-body">
                <strong class="section-15__feature-item-title">Limpeza Completa 3 em 1</strong>
                <p class="section-15__feature-item-text">Limpa, hidrata e protege contra o ressecamento</p>
              </div>
            </li>
            <li class="section-15__feature-item">
              <div class="section-15__feature-item-body">
                <strong class="section-15__feature-item-title">Hidratação Natural</strong>
                <p class="section-15__feature-item-text">Com glicerina que ajuda a manter a pele macia e saudável</p>
            </li>
            <li class="section-15__feature-item">
              <div class="section-15__feature-item-body">
                <strong class="section-15__feature-item-title">Uso Desde o Primeiro Dia</strong>
                <p class="section-15__feature-item-text">Seguro para recém-nascidos e ideal para uso diário</p>
              </div>
            </li>
            <li class="section-15__feature-item">
              <div class="section-15__feature-item-body">
                <strong class="section-15__feature-item-title">Cuidado Suave</strong>
                <p class="section-15__feature-item-text">Hipoalergênico, com pH equilibrado e sem ingredientes
                  agressivos</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="section-15__image-wrapper">
          <img class="section-15__image"
            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sabonete-liquido-johnsons-baby-bebe-banho-lifestyle-201447-02.jpg"
            alt="Bebê sorrindo durante banho com Johnson's Baby, limpeza suave e proteção para pele delicada"
            loading="lazy" decoding="async">
        </div>
      </div>
    </div>

    <div class="section-15-container" style="background-color: #f9e0d8;">
      <div class="section-15">
        <div class="section-15__content">
          <h2 class="section-15__title">
            Fórmula CHEGA DE LÁGRIMAS® — suave para o corpo e olhos
          </h2>

          <p class="section-15__desc">
            Desenvolvido para não causar ardência nos olhos, o banho se torna mais tranquilo e seguro.
            Sua fórmula é tão suave quanto água pura, ideal para o uso diário da cabeça aos pés.
          </p>
        </div>
        <div class="section-15__image-wrapper">
          <img class="section-15__image"
            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sabonete-liquido-johnsons-baby-bebe-brincando-agua-lifestyle-201447-03.jpg"
            alt="Bebê feliz brincando com água na banheira usando Johnson's Baby — fórmula Chega de Lágrimas"
            loading="lazy" decoding="async">
        </div>
      </div>
    </div>

    <section class="seals-section" aria-labelledby="seals-title">
      <div class="seals-section__inner">
        <h2 class="seals-section__title" id="seals-title">Por que confiar no JOHNSON'S® Baby?</h2>
        <p class="seals-section__subtitle">Cada detalhe da fórmula foi pensado para a pele delicada do seu bebê.
        </p>
        <ul class="seals-grid" role="list" aria-label="Diferenciais da fórmula">
          <li class="seal-card">
            <span class="seal-card__icon" aria-hidden="true">🌿</span>
            <div class="seal-card__body">
              <strong class="seal-card__title">94% Natural</strong>
              <p class="seal-card__text">Ingredientes de origem natural conforme ISO 16128</p>
            </div>
          </li>
          <li class="seal-card">
            <span class="seal-card__icon" aria-hidden="true">🚫</span>
            <div class="seal-card__body">
              <strong class="seal-card__title">Sem Parabenos</strong>
              <p class="seal-card__text">Livre de parabenos, sulfatos, corantes e ftalatos</p>
            </div>
          </li>
          <li class="seal-card">
            <span class="seal-card__icon" aria-hidden="true">🔬</span>
            <div class="seal-card__body">
              <strong class="seal-card__title">Testado Clinicamente</strong>
              <p class="seal-card__text">Aprovado por pediatras e dermatologistas</p>
            </div>
          </li>
          <li class="seal-card">
            <span class="seal-card__icon" aria-hidden="true">💧</span>
            <div class="seal-card__body">
              <strong class="seal-card__title">pH Ideal</strong>
              <p class="seal-card__text">Equilibrado para a pele sensível do bebê</p>
            </div>
          </li>
          <li class="seal-card">
            <span class="seal-card__icon" aria-hidden="true">🌸</span>
            <div class="seal-card__body">
              <strong class="seal-card__title">Hipoalergênico</strong>
              <p class="seal-card__text">Formulado para minimizar risco de alergias</p>
            </div>
          </li>
          <li class="seal-card">
            <span class="seal-card__icon" aria-hidden="true">👶</span>
            <div class="seal-card__body">
              <strong class="seal-card__title">Todas as Idades</strong>
              <p class="seal-card__text">Do recém-nascido em diante, seguro para o dia a dia</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Área de FAQ -->
    <section class="faq-section" aria-labelledby="faq-section-title">
      <div class="faq-section__header">
        <h3 class="faq-section__title" id="faq-section-title">Dúvidas Frequentes</h3>
        <p class="faq-section__subtitle">Sabonete JOHNSON'S® Cabeça aos Pés</p>
      </div>
      <ul class="faq-section__list">
        <li class="faq-section__item">
          <details class="faq-section__item">
            <summary>
              <h3 class="faq-section__q-text">A partir de qual idade posso usar?</h3>
              <span class="faq-section__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-section__a-inner">
              <p class="faq-section__a-text">
                Seguro desde o primeiro dia de vida. Fórmula hipoalergênica e testada por pediatras.
              </p>
            </div>
          </details>
        </li>
        <li class="faq-section__item">
          <details class="faq-section__item">
            <summary>
              <h3 class="faq-section__q-text">Pode usar todos os dias?</h3>
              <span class="faq-section__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-section__a-inner">
              <p class="faq-section__a-text">
                Sim. Foi desenvolvido para uso diário, mantendo a pele limpa e hidratada sem ressecar.
              </p>
            </div>
          </details>
        </li>
        <li class="faq-section__item">
          <details class="faq-section__item">
            <summary>
              <h3 class="faq-section__q-text">Ele hidrata mesmo sendo sabonete?</h3>
              <span class="faq-section__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-section__a-inner">
              <p class="faq-section__a-text">
                Sim. A glicerina ajuda a reter a hidratação natural da pele durante o banho.
              </p>
            </div>
          </details>
        </li>
        <li class="faq-section__item">
          <details class="faq-section__item">
            <summary>
              <h3 class="faq-section__q-text">Pode causar irritação?</h3>
              <span class="faq-section__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-section__a-inner">
              <p class="faq-section__a-text">
                Não. É hipoalergênico e livre de parabenos, sulfatos, corantes e ftalatos.
              </p>
            </div>
          </details>
        </li>
        <li class="faq-section__item">
          <details class="faq-section__item">
            <summary>
              <h3 class="faq-section__q-text">O que significa “Cabeça aos Pés”?</h3>
              <span class="faq-section__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-section__a-inner">
              <p class="faq-section__a-text">
                Significa que pode ser usado no corpo e cabelo, simplificando a rotina de cuidados do bebê.
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
      css:  ``,
    },

    /*@@@@Col - padrao-7 */
    {
      id:   'padrao-7',
      name: 'Padrão 7',
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
      css:  ``,
    },

    /*@@@@Col - padrao-7-sucos */
    {
      id:   'padrao-7-sucos',
      name: 'Padrão 7 (sucos)',
      html: `<div class="lp-container">
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet">
    <title>PDP - eFácil</title>

    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .pdp {
            display: flex;
            flex-direction: column;
            gap: 0;
            font-family: Roboto, sans-serif;
            color: #1d1d1d;
        }

        .pdp__illustrative-note {
            color: #7a7a7a;
            font-family: Roboto, sans-serif;
            font-size: 1rem;
            line-height: 1.5;
            text-align: center;
            padding: 30px 16px;
            margin: 0;
        }

        @media (min-width: 768px) {
            .pdp__illustrative-note {
                font-size: 1.08rem;
            }
        }

        @media (min-width: 1200px) {
            .pdp__illustrative-note {
                font-size: 1.15rem;
            }
        }
    </style>

    <style>
        .product-header-2 {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            position: relative;
            font-family: Roboto, sans-serif;
            margin-bottom: 16px;
            box-sizing: border-box;
            container-type: inline-size;
        }

        .product-header__banner-2 {
            width: 100%;
            height: 180px;
            position: relative;
            display: flex;
            justify-content: center;
        }

        .product-header__figure-2 {
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
            bottom: -54px;
            width: 108px;
            height: 108px;
            background-color: #ff9900;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            z-index: 10;
            box-shadow: 0 14px 30px rgba(79, 31, 12, 0.18);
        }

        .product-header__badge-img-2 {
            width: 76px;
            height: 76px;
            object-fit: contain;
        }

        .product-header__body-2 {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 390px;
            box-sizing: border-box;
            margin: 0 auto;
            padding: 86px 20px 15px;
            text-align: center;
        }

        .product-header__brand-2 {
            color: #ff9900;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            margin-bottom: 12px;
        }

        .product-header__title-2 {
            width: 100%;
            max-width: 760px;
            font-size: 1.45rem;
            line-height: 1.18;
            font-weight: 400;
            color: #1a1a1a;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .product-header__title-accent-2 {
            font-weight: 700;
            display: block;
            color: #b33445;
        }

        .product-header__subtitle-2 {
            color: #606060;
            width: 100%;
            max-width: 930px;
            font-size: 0.98rem;
            line-height: 1.68;
            margin: 18px 0 0;
            overflow-wrap: anywhere;
        }

        @media (min-width: 576px) {
            .product-header__banner-2 {
                height: 200px;
            }

            .product-header__title-2 {
                font-size: 1.95rem;
            }
        }

        @media (min-width: 768px) {
            .product-header-2 {
                margin-bottom: 20px;
            }

            .product-header__banner-2 {
                height: 230px;
            }

            .product-header__badge-2 {
                bottom: -62px;
                width: 124px;
                height: 124px;
            }

            .product-header__badge-img-2 {
                width: 88px;
                height: 88px;
            }

            .product-header__body-2 {
                max-width: 820px;
                padding: 104px 40px 15px;
            }
        }

        @media (min-width: 992px) {
            .product-header__title-2 {
                font-size: 2.25rem;
            }

            .product-header__subtitle-2 {
                font-size: 1.08rem;
            }
        }

        @media (min-width: 1200px) {
            .product-header__banner-2 {
                height: 250px;
            }
        }

        @media (min-width: 1400px) {
            .product-header__title-2 {
                font-size: 2.4rem;
            }
        }
    </style>

    <style>
        .section-6 {
            width: 100%;
            position: relative;
            overflow: hidden;
            margin: 0 auto;
            border-radius: 0;
            background: #fff6ed;
            box-sizing: border-box;
        }

        .section-6__picture {
            display: block;
        }

        .section-6__image {
            width: 100%;
            height: auto;
            display: block;
        }

        .section-6__content {
            display: grid;
            gap: 8px;
            width: 100%;
            max-width: 390px;
            box-sizing: border-box;
            margin: 0 auto;
            padding: 24px 20px 28px;
            text-align: center;
            background: #fff6ed;
        }

        .section-6__title {
            color: #2b221d;
            font-size: 1.5rem;
            font-weight: 800;
            line-height: 1.15;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .section-6__description {
            color: #665850;
            font-size: 1rem;
            line-height: 1.5;
            margin: 0;
            overflow-wrap: anywhere;
        }

        @media (min-width: 576px) {
            .section-6 {
                margin-bottom: 32px;
            }

            .section-6__title {
                font-size: 1.8rem;
            }
        }

        @media (min-width: 768px) {
            .section-6 {
                border-radius: 8px;
                margin-bottom: 36px;
            }

            .section-6__content {
                position: absolute;
                top: 50%;
                left: 7%;
                transform: translateY(-50%);
                width: 36%;
                max-width: 430px;
                margin: 0;
                padding: 20px;
                text-align: left;
                border-radius: 8px;
                background: rgba(73, 29, 19, 0.55);
                backdrop-filter: blur(4px);
            }

            .section-6__title {
                color: #ffe178;
                font-size: 2rem;
                text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.35);
            }

            .section-6__description {
                color: #ffffff;
                font-size: 1.1rem;
                text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
            }
        }

        @media (min-width: 992px) {
            .section-6__title {
                font-size: 2.35rem;
            }

            .section-6__description {
                font-size: 1.24rem;
            }
        }

        @media (min-width: 1200px) {
            .section-6 {
                margin-bottom: 44px;
            }
        }

        @media (min-width: 1400px) {
            .section-6__content {
                width: 34%;
            }
        }
    </style>

    <style>
        .section-1-container {
            width: auto;
            margin: 0 auto;
            box-sizing: border-box;
        }

        .section-1 {
            display: grid;
            align-items: stretch;
            width: 100%;
            overflow: hidden;
            gap: 0;
            border: 1px solid #f3d7c3;
            border-radius: 8px;
            background: #fff9ef;
            box-sizing: border-box;
        }

        .section-1--reverse {
            background: #fff6ed;
        }

        .section-1__body {
            order: 2;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 14px;
            padding: 24px 22px 28px;
            box-sizing: border-box;
        }

        .section-1__eyebrow {
            color: #23714f;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
        }

        .section-1__title {
            color: #2b221d;
            font-size: 1.5rem;
            line-height: 1.16;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .section-1__text {
            color: #5f5148;
            font-size: 0.98rem;
            line-height: 1.66;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .section-1__list {
            display: grid;
            gap: 10px;
            list-style: none;
            margin: 4px 0 0;
            padding: 0;
        }

        .section-1__item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            color: #3f332d;
            font-size: 0.95rem;
            line-height: 1.5;
            overflow-wrap: anywhere;
        }

        .section-1__marker {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: #d9425f;
            flex: 0 0 auto;
            margin-top: 7px;
        }

        .section-1__visual {
            order: 1;
            min-height: 260px;
            margin: 0;
            display: grid;
            align-items: stretch;
            overflow: hidden;
            background: #f4e2d6;
        }

        .section-1__image {
            width: 100%;
            height: 100%;
            min-height: 260px;
            display: block;
            object-fit: cover;
        }

        @media (min-width: 576px) {
            .section-1-container {
                max-width: 576px;
                margin-bottom: 32px;
            }

            .section-1__body {
                padding: 28px 30px 32px;
            }
        }

        @media (min-width: 768px) {
            .section-1-container {
                max-width: 768px;
                margin-bottom: 36px;
            }

            .section-1 {
                grid-template-columns: 1fr 0.92fr;
            }

            .section-1--reverse {
                grid-template-columns: 0.92fr 1fr;
            }

            .section-1__body {
                order: 1;
                padding: 36px 34px;
            }

            .section-1__visual {
                order: 2;
                min-height: 390px;
            }

            .section-1--reverse .section-1__body {
                order: 2;
            }

            .section-1--reverse .section-1__visual {
                order: 1;
            }

            .section-1__image {
                min-height: 390px;
            }
        }

        @media (min-width: 992px) {
            .section-1-container {
                max-width: 992px;
            }

            .section-1__body {
                padding: 44px 42px;
            }

            .section-1__title {
                font-size: 1.9rem;
            }

            .section-1__text {
                font-size: 1.03rem;
            }
        }

        @media (min-width: 1200px) {
            .section-1-container {
                max-width: 1200px;
                margin-bottom: 44px;
            }

            .section-1__body {
                padding: 52px 48px;
            }
        }

        @media (min-width: 1400px) {
            .section-1-container {
                max-width: 1400px;
            }
        }
    </style>

    <style>
        .section-7 {
            position: relative;
            width: 100%;
            overflow: hidden;
            margin: 0 auto;
            background: #6f253b;
            box-sizing: border-box;
        }

        .section-7--banner {
            display: block;
        }

        .section-7__banner-image {
            width: 100%;
            height: auto;
            display: block;
        }

        .section-7__grouptext-overlay {
            display: grid;
            gap: 6px;
            width: 100%;
            max-width: 390px;
            box-sizing: border-box;
            margin: 0 auto;
            padding: 18px 20px 22px;
            text-align: center;
            font-family: Roboto, sans-serif;
            background: #6f253b;
        }

        .section-7__overlay-kicker {
            color: #ffffff;
            font-size: 0.92rem;
            line-height: 1.35;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .section-7__overlay-title {
            color: #ffffff;
            font-size: 1.45rem;
            font-weight: 800;
            line-height: 1.1;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .section-7__overlay-text {
            color: #ffffff;
            font-size: 0.96rem;
            line-height: 1.45;
            margin: 0;
            overflow-wrap: anywhere;
        }

        @media (min-width: 576px) {
            .section-7__overlay-title {
                font-size: 1.8rem;
            }
        }

        @media (min-width: 768px) {
            .section-7 {
                margin-bottom: 36px;
            }

            .section-7__grouptext-overlay {
                position: absolute;
                left: 50%;
                bottom: 6%;
                transform: translateX(-50%);
                width: 62%;
                max-width: 680px;
                margin: 0;
                padding: 18px 22px;
                border-radius: 8px;
                background: rgba(82, 24, 42, 0.64);
                backdrop-filter: blur(4px);
            }

            .section-7__falling-item {
                display: block;
            }
        }

        @media (min-width: 992px) {
            .section-7__grouptext-overlay {
                bottom: 7%;
                width: 50%;
            }

            .section-7__overlay-title {
                font-size: 2rem;
            }

            .section-7__overlay-text {
                font-size: 1.02rem;
            }
        }

        @media (min-width: 1200px) {
            .section-7 {
                margin-bottom: 44px;
            }
        }

        @media (min-width: 1400px) {
            .section-7__grouptext-overlay {
                bottom: 8%;
            }
        }

        @keyframes fall {
            0% {
                transform: translateY(-100px) rotate(-30deg);
                opacity: 1;
            }

            90% {
                opacity: 1;
            }

            100% {
                transform: translateY(110vh) rotate(360deg);
                opacity: 0;
            }
        }
    </style>

    <style>
        .faq-section {
            width: 100%;
            padding: 2rem 16px;
            box-sizing: border-box;
            margin: 0 auto 25px;
            padding-top: 0;
            font-family: sans-serif;
        }

        .faq-section__header {
            text-align: center;
            margin: 1rem 0;
        }

        .faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #333;
            margin: 0 0 12px;
            line-height: 98%;
        }

        .faq-section__subtitle {
            font-size: 1rem;
            color: #666;
            margin: 0;
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
            border: 1px solid #e5e5e5;
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
            background: #f9f9f9;
        }

        .faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #333;
            flex: 1;
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
            border-top: 1px solid #e5e5e5;
        }

        .faq-section__a-text {
            font-size: 0.9rem;
            color: #555;
            line-height: 1.6;
            margin: 0;
        }

        @media (max-width: 480px) {
            .faq-section__q-text {
                font-size: 0.9rem;
            }
        }
    </style>

    <div class="pdp" id="pdp">
        <section class="product-header-2" aria-label="Apresentação do Suco Tial 100% Goiaba 1L">
            <section class="product-header__banner-2" aria-label="Banner visual do produto">
                <figure class="product-header__figure-2">
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-pera-frutas-mesa-madeira-lifestyle-4600114-00.jpg?ims=288x">
                        <source media="(max-width: 375px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-pera-frutas-mesa-madeira-lifestyle-4600114-00.jpg?ims=343x">
                        <source media="(max-width: 425px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-pera-frutas-mesa-madeira-lifestyle-4600114-00.jpg?ims=393x">
                        <source media="(max-width: 768px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-pera-frutas-mesa-madeira-lifestyle-4600114-00.jpg?ims=736x">
                        <source media="(max-width: 1024px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-pera-frutas-mesa-madeira-lifestyle-4600114-00.jpg?ims=992x">
                        <source media="(max-width: 1440px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-pera-frutas-mesa-madeira-lifestyle-4600114-00.jpg?ims=1248x">
                        <img class="product-header__banner-img-2"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-pera-frutas-mesa-madeira-lifestyle-4600114-00.jpg?ims=1248x"
                            alt="Banner decorativo para apresentação do Suco Tial 100% Goiaba" loading="lazy"
                            decoding="async">
                    </picture>
                </figure>
                <div class="product-header__badge-2" role="img" aria-label="Selo visual da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/tial/logo-tial.png"
                        alt="Selo visual de destaque do produto" class="product-header__badge-img-2" loading="lazy">
                </div>
            </section>
            <article class="product-header__body-2">
                <small class="product-header__brand-2">tial</small>
                <h2 class="product-header__title-2">
                    <span>Suco Tial 100% Goiaba 1L</span>
                    <span class="product-header__title-accent-2">embalagem com 12 unidades</span>
                </h2>
                <p class="product-header__subtitle-2">
                    Pronto para beber, feito com polpa de goiaba reconstituída, suco de pera reconstituído e vitamina C.
                    Uma opção prática para servir em casa, no trabalho ou em momentos de pausa ao longo do dia.
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto">
            <picture>
                <source media="(max-width: 320px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-1l-embalagem-frutas-foco-pomar-4600114-01.jpg?ims=288x">
                <source media="(max-width: 375px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-1l-embalagem-frutas-foco-pomar-4600114-01.jpg?ims=343x">
                <source media="(max-width: 425px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-1l-embalagem-frutas-foco-pomar-4600114-01.jpg?ims=393x">
                <source media="(max-width: 768px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-1l-embalagem-frutas-pomar-panoramica-4600114-01.jpg?ims=736x">
                <source media="(max-width: 1024px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-1l-embalagem-frutas-pomar-panoramica-4600114-01.jpg?ims=992x">
                <source media="(max-width: 1440px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-1l-embalagem-frutas-pomar-panoramica-4600114-01.jpg?ims=1248x">
                <img class="section-6__image"
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-1l-embalagem-frutas-pomar-panoramica-4600114-01.jpg?ims=1248x"
                    alt="Suco Tial Goiaba em apresentação visual de destaque" width="1600" height="650"
                    fetchpriority="high" loading="lazy" decoding="async">
            </picture>
            <article class="section-6__content">
                <h2 class="section-6__title">Goiaba pronta para servir</h2>
                <p class="section-6__description">Sabor de fruta em uma opção prática para acompanhar a rotina.</p>
            </article>
        </section>

        <article class="section-1-container">
            <section class="section-1 section-1--reverse" aria-labelledby="section-1-title-1">
                <article class="section-1__body">
                    <span class="section-1__eyebrow">Sabor goiaba</span>
                    <h2 class="section-1__title" id="section-1-title-1">Fruta no centro da experiência, com preparo
                        simples para o dia a dia</h2>
                    <p class="section-1__text">
                        O Suco Tial 100% Goiaba combina polpa de goiaba reconstituída e suco de pera reconstituído
                        em uma bebida líquida, pronta para beber e fácil de servir.
                    </p>
                    <ul class="section-1__list" aria-label="Principais características do suco">
                        <li class="section-1__item">
                            <span class="section-1__marker" aria-hidden="true"></span>
                            <span>50% polpa de goiaba reconstituída e 50% suco de pera reconstituído.</span>
                        </li>
                        <li class="section-1__item">
                            <span class="section-1__marker" aria-hidden="true"></span>
                            <span>Com vitamina C, aromatizantes e acidulante ácido cítrico.</span>
                        </li>
                        <li class="section-1__item">
                            <span class="section-1__marker" aria-hidden="true"></span>
                            <span>Embalagem de 1 litro em caixa com 12 unidades.</span>
                        </li>
                    </ul>
                </article>
                <figure class="section-1__visual">
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-1l-embalagem-copo-cozinha-lifestyle-4600114-04.jpg?ims=286x">
                        <source media="(max-width: 375px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-1l-embalagem-copo-cozinha-lifestyle-4600114-04.jpg?ims=341x">
                        <source media="(max-width: 425px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-1l-embalagem-copo-cozinha-lifestyle-4600114-04.jpg?ims=391x">
                        <source media="(max-width: 768px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-1l-embalagem-copo-cozinha-lifestyle-4600114-04.jpg?ims=352x">
                        <source media="(max-width: 1024px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-1l-embalagem-copo-cozinha-lifestyle-4600114-04.jpg?ims=475x">
                        <source media="(max-width: 1440px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-1l-embalagem-copo-cozinha-lifestyle-4600114-04.jpg?ims=598x">
                        <img class="section-1__image"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-1l-embalagem-copo-cozinha-lifestyle-4600114-04.jpg?ims=598x"
                            alt="Suco de goiaba em destaque para composição visual da seção" loading="lazy"
                            decoding="async">
                    </picture>
                </figure>
            </section>
        </article>

        <section class="section-7 section-7--banner" aria-label="Banner promocional">
            <picture>
                <source media="(max-width: 320px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-familia-reunida-mesa-cafe-lifestyle-4600114-03.jpg?ims=288x">
                <source media="(max-width: 375px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-familia-reunida-mesa-cafe-lifestyle-4600114-03.jpg?ims=343x">
                <source media="(max-width: 425px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-familia-reunida-mesa-cafe-lifestyle-4600114-03.jpg?ims=393x">
                <source media="(max-width: 768px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-familia-reunida-mesa-cafe-lifestyle-4600114-03.jpg?ims=736x">
                <source media="(max-width: 1024px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-familia-reunida-mesa-cafe-lifestyle-4600114-03.jpg?ims=992x">
                <source media="(max-width: 1440px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-familia-reunida-mesa-cafe-lifestyle-4600114-03.jpg?ims=1248x">
                <img class="section-7__banner-image"
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-familia-reunida-mesa-cafe-lifestyle-4600114-03.jpg?ims=1248x"
                    alt="Produto em destaque com composição visual de qualidade e praticidade" width="1600" height="865"
                    loading="lazy" decoding="async">
            </picture>
            <article class="section-7__grouptext-overlay">
                <p class="section-7__overlay-kicker">Pronto para beber</p>
                <h2 class="section-7__overlay-title">Mais sabor para o dia</h2>
                <p class="section-7__overlay-text">Agite, sirva e aproveite o perfil frutado do Suco Tial Goiaba.</p>
            </article>
        </section>

        <article class="section-1-container">
            <section class="section-1" aria-labelledby="section-1-title-2">
                <article class="section-1__body">
                    <span class="section-1__eyebrow">Momento de sabor</span>
                    <h2 class="section-1__title" id="section-1-title-2">Uma pausa mais leve, colorida e cheia de fruta
                    </h2>
                    <p class="section-1__text">
                        Com o sabor marcante da goiaba e a praticidade da embalagem de 1 litro, o Suco Tial combina
                        com refeições, lanches e momentos de pausa ao longo do dia.
                    </p>
                </article>
                <figure class="section-1__visual">
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-mulher-bebendo-copo-cozinha-lifestyle-4600114-02.jpg?ims=286x">
                        <source media="(max-width: 375px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-mulher-bebendo-copo-cozinha-lifestyle-4600114-02.jpg?ims=341x">
                        <source media="(max-width: 425px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-mulher-bebendo-copo-cozinha-lifestyle-4600114-02.jpg?ims=391x">
                        <source media="(max-width: 768px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-mulher-bebendo-copo-cozinha-lifestyle-4600114-02.jpg?ims=352x">
                        <source media="(max-width: 1024px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-mulher-bebendo-copo-cozinha-lifestyle-4600114-02.jpg?ims=475x">
                        <source media="(max-width: 1440px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-mulher-bebendo-copo-cozinha-lifestyle-4600114-02.jpg?ims=598x">
                        <img class="section-1__image"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-tial-100-goiaba-mulher-bebendo-copo-cozinha-lifestyle-4600114-02.jpg?ims=598x"
                            alt="Imagem de apoio visual para o Suco Tial Goiaba" loading="lazy" decoding="async">
                    </picture>
                </figure>
            </section>
        </article>

        <section class="faq-section" aria-labelledby="faq-section-title">
            <div class="faq-section__header">
                <h2 class="faq-section__title" id="faq-section-title">Suco Tial 100% Goiaba 1L</h2>
                <p class="faq-section__subtitle">Dúvidas frequentes relacionadas</p>
            </div>
            <ul class="faq-section__list">
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Para que serve o Suco Tial 100% Goiaba 1L e para quem é
                                recomendado?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O Suco Tial 100% Goiaba 1L serve como uma bebida prática para
                                o dia a dia. O produto é recomendado para quem busca uma opção mais saudável. A
                                composição é feita com ingredientes naturais e sem químicos. Isso garante um consumo
                                mais consciente para toda a família</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">O suco Tial de goiaba tem boa qualidade e algum diferencial?
                            </h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Sim. O Suco Tial de goiaba possui alta qualidade por conter
                                100% de polpa e suco. O diferencial do produto é a mistura de goiaba e pera. Essa
                                combinação equilibra o sabor de forma natural. O consumidor ganha uma experiência
                                saborosa e muito mais autêntica.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">O Suco Tial de goiaba é seguro para o consumo de todos?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Sim. O Suco Tial de goiaba é seguro para o público geral. A
                                restrição é não consumir o produto se a embalagem estiver danificada. A fórmula do item
                                é livre de componentes químicos. Essa característica assegura um alimento confiável para
                                a rotina diária.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Qual é a composição e a tecnologia do Suco Tial de goiaba?
                            </h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O Suco Tial de goiaba é composto por polpa de goiaba e suco
                                de pera reconstituídos. O produto também leva vitamina C, aromatizantes e acidulante
                                ácido cítrico. Por ser feito de frutas, o líquido sofre variações conforme a safra. Essa
                                tecnologia natural preserva o sabor real do campo</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Qual é a característica técnica de capacidade do Suco Tial
                                de goiaba?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O Suco Tial de goiaba possui a característica líquida e vem
                                em embalagem de 1L. O formato de venda do produto consiste em caixas com 12 unidades.
                                Esse volume é ideal para o abastecimento da despensa. O modelo em kit traz a vantagem de
                                maior praticidade para o lar.</p>
                        </div>
                    </details>
                </li>
            </ul>
        </section>

        <p class="pdp__illustrative-note">IMAGENS MERAMENTE ILUSTRATIVAS</p>
    </div>
</div>`,
      css:  ``,
    },

    /*@@@@Col - padrao-8 */
    {
      id:   'padrao-8',
      name: 'Padrão 8',
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
      css:  ``,
    },

    /*@@@@Col - padrao-9 */
    {
      id:   'padrao-9',
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
            padding: clamp(1.25rem, 3vw, 2.5rem) 0;
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
                text-align: center;
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
        .section-18 {
            width: calc(100% - 32px);
            max-width: 1248px;
            margin-inline: auto;
            background: linear-gradient(180deg, #fff, var(--cor-principal-suave));
            border-radius: 28px;
            padding: clamp(2rem, 4vw, 3.5rem) clamp(1rem, 3vw, 2rem);
            box-shadow: 0 14px 38px rgba(135, 0, 34, 0.08);
            font-family: sans-serif;
            box-sizing: border-box;
            padding-top: 0;
            margin-top: -17px;
        }

        /* --- Header --- */
        .section-18__header {
            text-align: center;
            margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
        }

        .section-18__title {
            font-size: 2rem;
            line-height: 2rem;
            color: var(--cor-principal-escura);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .section-18__subtitle {
            color: var(--cor-texto-suave);
            max-width: 600px;
            margin: 0 auto;
        }

        /* --- Radio (sr-only) --- */
        .section-18__radio {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
        }

        /* --- Grid --- */
        .section-18__grid {
            display: grid;
            grid-template-columns: 1fr 1.2fr 1fr;
            gap: clamp(1rem, 3vw, 2rem);
            align-items: center;
        }

        /* --- Columns --- */
        .section-18__column {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        /* --- Media (coluna central) --- */
        .section-18__media {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.25rem;
        }

        /* --- Frame circular --- */
        .section-18__frame {
            width: 100%;
            max-width: 400px;
            aspect-ratio: 780 / 740;
            border-radius: 50%;
            border: 5px solid var(--cor-principal-media);
            overflow: hidden;
            position: relative;
            background: var(--cor-principal-clara);
        }

        /* --- Pictures dentro do frame --- */
        .section-18__picture {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .section-18__svg {
            width: 78%;
            height: 78%;
            color: var(--cor-principal);
        }

        .section-18__svg-fill {
            fill: var(--cor-principal-clara);
        }

        .section-18__svg-soft {
            fill: var(--cor-principal-borda);
        }

        /* --- Cards --- */
        .section-18__card {
            display: block;
            background: white;
            padding: clamp(1rem, 2vw, 1.35rem);
            border-radius: 16px;
            border: 2px solid var(--cor-principal-borda);
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            position: relative;
            box-sizing: border-box;
        }

        .section-18__card:hover {
            background-color: var(--cor-principal-suave);
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(135, 0, 34, 0.12);
        }

        @media (max-width: 760px) {
            .section-18__title {
                display: none;
            }
        }

        .section-18__card--center {
            width: 90%;
        }

        .section-18__card-title {
            margin: 0 0 10px 0;
            font-size: 1.2rem;
            color: var(--cor-principal-escura);
            font-weight: 550;
        }

        .section-18__card-text {
            margin: 0;
            font-size: 0.95rem;
            color: var(--cor-texto-suave);
            line-height: 1.6;
        }

        /* --- Focus acessível --- */
        .section-18__radio:focus-visible+.section-18__card {
            outline: 3px solid var(--cor-principal-media);
            outline-offset: 5px;
        }

        /* ==========================================
           LÓGICA DE TROCA DE IMAGEM (CSS puro)
        ========================================== */

        #s18-feat1:checked~.section-18__grid .section-18__picture--1,
        #s18-feat2:checked~.section-18__grid .section-18__picture--2,
        #s18-feat3:checked~.section-18__grid .section-18__picture--3 {
            opacity: 1;
            z-index: 2;
        }

        #s18-feat1:checked~.section-18__grid label[for="s18-feat1"],
        #s18-feat2:checked~.section-18__grid label[for="s18-feat2"],
        #s18-feat3:checked~.section-18__grid label[for="s18-feat3"] {
            border-color: var(--cor-principal-media);
            background-color: var(--cor-principal-clara);
        }

        /* ==========================================
           MOBILE — max-width: 1060px
        ========================================== */

        @media (max-width: 1060px) {
            .section-18__grid {
                grid-template-columns: 1fr;
                gap: 16px;
            }

            .section-18__media {
                grid-row: 1;
                order: 1;
                gap: 16px;
            }

            .section-18__column {
                order: 2;
                gap: 16px;
            }

            .section-18__column--right {
                order: 3;
            }

            .section-18__frame {
                max-width: 320px;
            }

            /* Garante que o card central fique igual aos demais no mobile */
            .section-18__card--center {
                width: 100%;
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
            padding-bottom: 2rem;
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

    <style>
        .section-4-manual__container {
            width: calc(100% - 32px);
            max-width: 1248px;
            margin: 0 auto;
            height: auto;
        }

        .section-4-manual__figura {
            margin: 0;
        }

        .section-4-manual__link {
            display: flex;
            align-items: center;
            text-decoration: none;
            width: 100%;
        }

        .section-4-manual__imagem {
            border-radius: 12px;
            height: auto;
            object-fit: cover;
            width: 100%;
            box-shadow: 0 10px 24px rgba(135, 0, 34, 0.08);
        }

        .section-4-manual__legenda {
            font-family: Arial, sans-serif;
            font-size: 0.75rem;
            color: var(--cor-texto-suave);
            margin-top: 0.6rem;
            text-align: center;
        }

        @media (min-width: 820px) {

            .section-4-manual__container,
            .section-4-manual__figura,
            .section-4-manual__imagem {
                height: 250px;
            }
        }
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="product-header-2" aria-label="Cabeçalho do produto">
            <header class="product-header__banner-2">
                <figure style="width:100%;height:100%;margin:0;">
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/fundo-vermelho-textura-pdp-lorenzetti-advanced-402193-00.jpg?ims=288x">
                        <source media="(max-width: 375px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/fundo-vermelho-textura-pdp-lorenzetti-advanced-402193-00.jpg?ims=343x">
                        <source media="(max-width: 425px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/fundo-vermelho-textura-pdp-lorenzetti-advanced-402193-00.jpg?ims=393x">
                        <source media="(max-width: 768px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/fundo-vermelho-textura-pdp-lorenzetti-advanced-402193-00.jpg?ims=736x">
                        <source media="(max-width: 1024px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/fundo-vermelho-textura-pdp-lorenzetti-advanced-402193-00.jpg?ims=992x">
                        <source media="(max-width: 1440px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/fundo-vermelho-textura-pdp-lorenzetti-advanced-402193-00.jpg?ims=1248x">
                        <img class="product-header__banner-img-2"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/fundo-vermelho-textura-pdp-lorenzetti-advanced-402193-00.jpg?ims=1248x"
                            alt="Banner do produto" loading="eager" decoding="async">
                    </picture>
                </figure>
                <div class="product-header__badge-2" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/lorenzetti/lorenzetti-logo.png"
                        alt="Ícone da marca" class="product-header__badge-img-2">
                </div>
            </header>
            <article class="product-header__body-2">
                <small class="product-header__brand-2">── lorenzetti ──</small>
                <h1 class="product-header__title-2">
                    <span> Ducha Elétrica Advanced</span>
                    <strong>design integrado, Multi Temperatura</strong>
                </h1>
                <p class="product-header__subtitle-2">
                    Tecnologia de ponta em uma ducha elétrica pensada para conforto, praticidade e visual limpo no
                    banheiro, com cano incorporado, comando multitemperaturas, resistência tipo refil e compatibilidade
                    com aquecedores solares.
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto">
            <picture>
                <source media="(max-width: 320px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/ducha-eletrica-lorenzetti-advanced-pressurizada-branca-ambiente-close-4200997-02.jpg?ims=244x">
                <source media="(max-width: 375px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/ducha-eletrica-lorenzetti-advanced-pressurizada-branca-ambiente-close-4200997-02.jpg?ims=296x">
                <source media="(max-width: 425px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/ducha-eletrica-lorenzetti-advanced-pressurizada-branca-ambiente-close-4200997-02.jpg?ims=343x">
                <source media="(max-width: 768px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/ducha-eletrica-lorenzetti-advanced-pressurizada-branca-ambiente-close-4200997-02.jpg?ims=704x">
                <source media="(max-width: 1024px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/ducha-eletrica-lorenzetti-advanced-pressurizada-branca-ambiente-panoramico-4200997-01.jpg?ims=960x">
                <source media="(max-width: 1440px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/ducha-eletrica-lorenzetti-advanced-pressurizada-branca-ambiente-panoramico-4200997-01.jpg?ims=1216x">
                <img class="section-6__image"
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/ducha-eletrica-lorenzetti-advanced-pressurizada-branca-ambiente-panoramico-4200997-01.jpg?ims=1216x"
                    alt="Ducha Elétrica Advanced com design sem fiação aparente e cano incorporado" width="1600"
                    height="650" fetchpriority="high" loading="lazy" decoding="async">
            </picture>
            <div class="section-6__content">
                <h2 class="section-6__title">Banho mais confortável e visual mais limpo</h2>
                <p class="section-6__description">Visual limpo, ajuste fácil e banho confortável todos os dias.</p>
            </div>
        </section>

        <section class="section-18">

            <div class="section-18__header" aria-labelledby="s18-title">
                <h2 class="section-18__title" id="s18-title">Detalhes que valorizam o seu banho</h2>
            </div>

            <div role="radiogroup" aria-label="Escolha uma característica para visualizar">

                <input type="radio" id="s18-feat1" name="s18-feature" class="section-18__radio" checked>
                <input type="radio" id="s18-feat2" name="s18-feature" class="section-18__radio">
                <input type="radio" id="s18-feat3" name="s18-feature" class="section-18__radio">

                <div class="section-18__grid">

                    <!-- Coluna Esquerda -->
                    <aside class="section-18__column section-18__column--left" aria-label="Design com cano incorporado">
                        <label for="s18-feat1" class="section-18__card" role="radio" aria-checked="true" tabindex="0">
                            <h3 class="section-18__card-title">Design sem fiação aparente</h3>
                            <p class="section-18__card-text">Instalação discreta para quem valoriza acabamento no
                                banheiro.</p>
                        </label>
                    </aside>

                    <!-- Coluna Central: imagem + card do meio -->
                    <section class="section-18__media" aria-label="Imagem ilustrativa da funcionalidade selecionada">

                        <div class="section-18__frame" aria-live="polite"
                            aria-label="Imagem da funcionalidade selecionada">

                            <!-- ILUSTRAÇÃO 1 -->
                            <div class="section-18__picture section-18__picture--1" aria-hidden="true">
                                <svg class="section-18__svg" viewBox="0 0 220 220" focusable="false">
                                    <circle class="section-18__svg-fill" cx="110" cy="110" r="92" />
                                    <path d="M72 78h76a14 14 0 0 1 14 14v42H58V92a14 14 0 0 1 14-14Z" fill="#fff"
                                        stroke="currentColor" stroke-width="7" stroke-linejoin="round" />
                                    <path d="M75 78V56h70v22M82 107h56M82 127h40" fill="none" stroke="currentColor"
                                        stroke-width="7" stroke-linecap="round" />
                                    <path d="M150 98h20M150 118h20M150 138h20" fill="none" stroke="currentColor"
                                        stroke-width="6" stroke-linecap="round" />
                                    <path d="M58 146h104v14a10 10 0 0 1-10 10H68a10 10 0 0 1-10-10Z"
                                        class="section-18__svg-soft" stroke="currentColor" stroke-width="7"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>

                            <!-- ILUSTRAÇÃO 2 -->
                            <div class="section-18__picture section-18__picture--2" aria-hidden="true">
                                <svg class="section-18__svg" viewBox="0 0 220 220" focusable="false">
                                    <circle class="section-18__svg-fill" cx="110" cy="110" r="92" />
                                    <path d="M82 52h56v34H82zM82 134h56v34H82z" fill="#fff" stroke="currentColor"
                                        stroke-width="7" stroke-linejoin="round" />
                                    <path d="M110 86v48" fill="none" stroke="currentColor" stroke-width="7"
                                        stroke-linecap="round" />
                                    <path d="M63 110h94M154 94l17 16-17 16M66 126l-17-16 17-16" fill="none"
                                        stroke="currentColor" stroke-width="7" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M91 65h38M91 151h38" fill="none" stroke="currentColor" stroke-width="5"
                                        stroke-linecap="round" />
                                </svg>
                            </div>

                            <!-- ILUSTRAÇÃO 3 -->
                            <div class="section-18__picture section-18__picture--3" aria-hidden="true">
                                <svg class="section-18__svg" viewBox="0 0 220 220" focusable="false">
                                    <circle class="section-18__svg-fill" cx="110" cy="110" r="92" />
                                    <path d="M64 74h92a22 22 0 0 1 22 22v16H42V96a22 22 0 0 1 22-22Z" fill="#fff"
                                        stroke="currentColor" stroke-width="7" stroke-linejoin="round" />
                                    <path d="M54 128h112" fill="none" stroke="currentColor" stroke-width="7"
                                        stroke-linecap="round" />
                                    <path
                                        d="M66 148v7M88 148v7M110 148v7M132 148v7M154 148v7M77 172v7M99 172v7M121 172v7M143 172v7"
                                        fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
                                    <path d="M84 59h52" fill="none" stroke="currentColor" stroke-width="7"
                                        stroke-linecap="round" />
                                </svg>
                            </div>

                        </div>

                        <label for="s18-feat2" class="section-18__card section-18__card--center" role="radio"
                            aria-checked="false" tabindex="0">
                            <h3 class="section-18__card-title">Resistência de troca rápida</h3>
                            <p class="section-18__card-text">Troca simples para facilitar a manutenção quando precisar.
                            </p>
                        </label>

                    </section>

                    <!-- Coluna Direita -->
                    <aside class="section-18__column section-18__column--right" aria-label="Grande espalhador de água">
                        <label for="s18-feat3" class="section-18__card" role="radio" aria-checked="false" tabindex="0">
                            <h3 class="section-18__card-title">Grande espalhador</h3>
                            <p class="section-18__card-text">Mais distribuição de água para um banho gostoso e uniforme.
                            </p>
                        </label>
                    </aside>

                </div>
            </div>

        </section>

        <div class="section-15-container">
            <div class="section-15">
                <div class="section-15__content">
                    <!-- ══ TÍTULO + DESCRIÇÃO (apague este bloco se não quiser usar) ══ -->
                    <h2 class="section-15__title">
                        Mais possibilidades para o seu banheiro
                    </h2>
                    <p class="section-15__desc">
                        Compatível com aquecedores solares, a Ducha Advanced amplia o uso no dia a dia. Boa para quem
                        quer conforto, apoio de temperatura quando necessário e manutenção simples.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/ducha-eletrica-lorenzetti-advanced-com-pressurizador-branca-ambiente-4200997_02.jpg?ims=256x">
                        <source media="(max-width: 375px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/ducha-eletrica-lorenzetti-advanced-com-pressurizador-branca-ambiente-4200997_02.jpg?ims=311x">
                        <source media="(max-width: 425px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/ducha-eletrica-lorenzetti-advanced-com-pressurizador-branca-ambiente-4200997_02.jpg?ims=361x">
                        <source media="(max-width: 768px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/ducha-eletrica-lorenzetti-advanced-com-pressurizador-branca-ambiente-4200997_02.jpg?ims=323x">
                        <source media="(max-width: 1024px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/ducha-eletrica-lorenzetti-advanced-com-pressurizador-branca-ambiente-4200997_02.jpg?ims=446x">
                        <source media="(max-width: 1440px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/ducha-eletrica-lorenzetti-advanced-com-pressurizador-branca-ambiente-4200997_02.jpg?ims=530x">
                        <img class="section-15__image"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/ducha-eletrica-lorenzetti-advanced-com-pressurizador-branca-ambiente-4200997_02.jpg?ims=530x"
                            alt="Banheiro com ducha elétrica instalada e acabamento discreto" loading="lazy"
                            decoding="async">
                    </picture>
                </div>
            </div>
        </div>

        <section class="section-11" aria-labelledby="section-11-title">
            <div class="section-11-container">
                <header class="section-11__header">
                    <h2 class="section-11__title" id="section-11-title">Recursos para um banho prático</h2>
                </header>
                <ul class="section-11__grid" role="list">
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <svg class="section-11__icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
                                <path d="M24 6a12 12 0 0 0-7 21.7V36a7 7 0 0 0 14 0v-8.3A12 12 0 0 0 24 6Z" fill="none"
                                    stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                                <path d="M17 18h14M19 24h10M24 31v8" fill="none" stroke="currentColor" stroke-width="3"
                                    stroke-linecap="round" />
                            </svg>
                        </figure>
                        <h3 class="section-11__name">Comando multitemperaturas</h3>
                        <p class="section-11__value">Escolha o ponto ideal do banho e evite desperdício.</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <svg class="section-11__icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
                                <path d="M18 8h12v10H18zM18 30h12v10H18zM24 18v12" fill="none" stroke="currentColor"
                                    stroke-width="3" stroke-linejoin="round" />
                                <path d="M13 24h22M34 20l4 4-4 4M14 28l-4-4 4-4" fill="none" stroke="currentColor"
                                    stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </figure>
                        <h3 class="section-11__name">Resistência tipo refil</h3>
                        <p class="section-11__value">Manutenção rápida, sem complicar a rotina.</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <svg class="section-11__icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
                                <path d="M15 11h18a5 5 0 0 1 5 5v3H10v-3a5 5 0 0 1 5-5Z" fill="none"
                                    stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
                                <path d="M14 28v1M22 28v1M30 28v1M18 36v1M26 36v1M34 36v1" fill="none"
                                    stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                            </svg>
                        </figure>
                        <h3 class="section-11__name">Grande espalhador</h3>
                        <p class="section-11__value">Jato mais amplo para banho confortável.</p>
                    </li>

                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <svg class="section-11__icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
                                <circle cx="15" cy="15" r="6" fill="none" stroke="currentColor" stroke-width="3" />
                                <path
                                    d="M15 3v3M15 24v3M3 15h3M24 15h3M6.5 6.5l2.2 2.2M21.3 21.3l2.2 2.2M23.5 6.5l-2.2 2.2M8.7 21.3l-2.2 2.2"
                                    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
                                <path d="M28 20h12v18H28zM31 24h6M31 29h6M31 34h6" fill="none" stroke="currentColor"
                                    stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </figure>
                        <h3 class="section-11__name">Compatível com aquecedores solares</h3>
                        <p class="section-11__value">Boa opção para casas com sistema solar.</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <svg class="section-11__icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
                                <path d="M25 4 11 27h11l-1 17 16-26H25z" fill="none" stroke="currentColor"
                                    stroke-width="3" stroke-linejoin="round" />
                            </svg>
                        </figure>
                        <h3 class="section-11__name">Opções de potência</h3>
                        <p class="section-11__value">5.500 W em 127 V; 6.400 W ou 7.500 W em 220 V.</p>
                    </li>

                </ul>
            </div>
        </section>

        <section class="section-4-manual__container" aria-label="Manual de Instruções do Produto">
            <figure class="section-4-manual__figura">
                <a href="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/manual.pdf" target="_blank"
                    rel="noopener noreferrer" download title="Baixar manual de instruções do produto"
                    class="section-4-manual__link">
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/manual-instrucoes-ducha-lorenzetti-advanced-402193-manual.jpg?ims=256x">
                        <source media="(max-width: 375px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/manual-instrucoes-ducha-lorenzetti-advanced-402193-manual.jpg?ims=311x">
                        <source media="(max-width: 425px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/manual-instrucoes-ducha-lorenzetti-advanced-402193-manual.jpg?ims=361x">
                        <source media="(max-width: 768px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/manual-instrucoes-ducha-lorenzetti-advanced-402193-manual.jpg?ims=704x">
                        <source media="(max-width: 1024px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/manual-instrucoes-ducha-lorenzetti-advanced-402193-manual.jpg?ims=960x">
                        <source media="(max-width: 1440px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/manual-instrucoes-ducha-lorenzetti-advanced-402193-manual.jpg?ims=1216x">
                        <img class="section-4-manual__imagem"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/manual-instrucoes-ducha-lorenzetti-advanced-402193-manual.jpg?ims=1216x"
                            alt="Manual de instruções do produto" width="1200" height="250" fetchpriority="low"
                            loading="lazy" decoding="async">
                    </picture>
                </a>
                <figcaption class="section-4-manual__legenda">
                    Consulte o manual para orientações de instalação, uso e manutenção da ducha.
                </figcaption>
            </figure>
        </section>

        <!-- Área de FAQ -->
        <section class="faq-section" aria-labelledby="faq-section-title">
            <div class="faq-section__header">
                <h3 class="faq-section__title" id="faq-section-title">Dúvidas frequentes sobre a Ducha Advanced</h3>
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

        <p
            style="color: var(--cor-texto-suave); font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty; text-align: center; padding: 30px 0;">
            IMAGENS MERAMENTE ILUSTRATIVAS</p>
    </div>
</div>`,
      css:  ``,
    },

    /*@@@@Col - variacao-11 */
    {
      id:   'variacao-11',
      name: 'Variação 11',
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
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&amp;display=swap"
        rel="stylesheet">
    <title>PDP - eFácil</title>
    <!-- ---------------------------------------- ÁREA PARA COLOCAR STYLES ----------------------------------------------------------- -->

    <style>
        .faq-section {
            width: 100%;
            padding: 2rem 16px;
            box-sizing: border-box;
            margin: 0 auto 25px;
            padding-top: 0;
            font-family: sans-serif;
        }

        .faq-section__header {
            text-align: center;
            margin: 2rem auto;
        }

        .faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #3A3F44;
            margin: 0 0 12px;
            line-height: 98%;
        }

        .faq-section__subtitle {
            font-size: 1rem;
            color: #59636E;
            margin: 0;
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
            border: 1px solid #D8DEE6;
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
            background: #f9f9f9;
        }

        .faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #3A3F44;
            flex: 1;
        }

        .faq-section__q-text:hover {
            color: #0052CC;
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
            background: #B87333;
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
            border-top: 1px solid #D8DEE6;
        }

        .faq-section__a-text {
            font-size: 0.9rem;
            color: #59636E;
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
            --pos-x: 4%;
            --color-title: #ffffff;
            --bg-box: rgba(58, 63, 68, 0.74);

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
                color: #3A3F44;
                text-shadow: none;
            }

            .section-6__description {
                margin-bottom: 0;
                font-size: 1.1rem;
                color: #59636E;
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
        .section-15-container {
            background-color: #F7F9FC;
            padding: 1.5rem;
            width: 100%;
            box-sizing: border-box;
            border-top: 1px solid #9999993b;
            background-image: linear-gradient(22deg, #dee7f578, #fff);
        }

        .section-15 {
            display: flex;
            flex-direction: column-reverse;
            /* ← era column-reverse */
            gap: 1.25rem;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
        }

        .section-15__image-wrapper {
            width: 100%;
            flex-shrink: 0;
        }

        .section-15__image {
            margin: auto;
            border-radius: 16px;
            border: 1px solid #D8DEE6;
            display: block;
            object-fit: cover;
            width: 100%;
            max-width: 530px;
            aspect-ratio: 16 / 9;
            box-shadow: 0 18px 42px rgba(58, 63, 68, 0.1);
        }

        .section-15__content {
            display: flex;
            flex-direction: column;
            width: 95%;
            margin: auto;
            box-sizing: border-box;
        }

        .section-15__title {
            color: #3A3F44;
            font-size: 1.62rem;
            font-weight: 600;
            line-height: 1.18;
            margin: 0 0 1rem;
            overflow-wrap: anywhere;
            text-align: left;
        }

        .section-15__desc {
            color: #59636E;
            font-size: 14px;
            line-height: 22px;
            margin: 0 0 1.5rem;
            overflow-wrap: anywhere;
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
            border-left: 3px solid #B87333;
            padding-left: 0.85rem;
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
            color: #0052CC;
            font-size: 1.05rem;
            font-weight: 700;
            line-height: 1.35;
            margin: 0;
        }

        .section-15__feature-item-text {
            color: #59636E;
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

        #section-15-container {
            border: 0;
        }


        @media (min-width: 760px) {
            .section-15 {
                align-items: center;
                flex-direction: row-reverse;
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

            .section-15__title {
                font-size: 2rem;
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

            .section-15__title {
                font-size: 2.15rem;
            }

            .section-15__feature-item-text {
                font-size: 0.9rem;
            }
        }

        .is-reverse {
            flex-direction: row;
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
            border: 3px solid #ff9900;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            z-index: 10;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.171);
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
            font-size: clamp(1.22rem, 4vw, 2.4rem);
            line-height: clamp(1.6rem, 4vw, 3.1rem);
            font-weight: 300;
            max-width: 50rem;
            overflow-wrap: anywhere;
            text-wrap: pretty;
            color: #3A3F44;
        }

        .section-2-2__title strong {
            font-weight: 700;
            display: block;
            color: #0052CC;
        }

        .section-2-2__subtitle {
            color: #59636E;
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
        /* ── Tokens do section-19 ── */
        .section-19 {
            font-family: system-ui, sans-serif;
            width: 100%;
            background: #F4F6F8;
            overflow: hidden;
            border-top: 1px solid #D8DEE6;
            border-bottom: 1px solid #D8DEE6;
        }

        /* ── Inputs ocultos ── */
        .section-19__radio {
            position: absolute;
            display: none;
            width: 0;
            height: 0;
            opacity: 0;
            pointer-events: none;
        }

        /* ── Wrap ── */
        .section-19__wrap {
            display: flex;
            flex-direction: column;
            gap: 24px;
            padding: 34px 0 34px;
            overflow: hidden;
        }

        /* ── Header ── */
        .section-19__header {
            padding: 0 28px;
        }

        .section-19__title {
            font-weight: 700;
            font-size: clamp(1.35rem, 2.8vw, 1.8rem);
            color: #3A3F44;
            text-align: center;
            line-height: 1.25;
        }

        /* ── Track ── */
        .section-19__track {
            display: flex;
            gap: 67px;
            padding-left: calc((100% - 310px) / 2);
            padding-right: calc((100% - 310px) / 2);
            transition: transform .44s cubic-bezier(.4, 0, .2, 1);
            transform: translateX(0);
            overflow: visible;
        }

        /* ── Card ── */
        .section-19__card {
            flex: 0 0 310px;
            width: 310px;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #D8DEE6;
            box-shadow: 0 12px 30px rgba(58, 63, 68, .08);
            text-align: left;
            transform: scale(0.85);
            opacity: .38;
            transition: transform .44s cubic-bezier(.4, 0, .2, 1), opacity .44s ease, box-shadow .44s ease;
        }

        .section-19__card-img {
            width: 100%;
            object-fit: cover;
            display: block;
            border-bottom: 3px solid #B87333;
        }

        .section-19__card-body {
            padding: 16px 16px 18px;
        }

        .section-19__card-title {
            font-size: 1.05rem;
            font-weight: 700;
            line-height: 1.3;
            margin-bottom: 8px;
            color: #0052CC;
        }

        .section-19__card-desc {
            font-size: 0.92rem;
            color: #59636E;
            line-height: 1.55;
            font-weight: 400;
            margin: 0;
        }

        /* ── Estado ativo — Mobile: 1 card ── */
        #s19-1:checked~.section-19 .section-19__card:nth-child(1),
        #s19-2:checked~.section-19 .section-19__card:nth-child(2),
        #s19-3:checked~.section-19 .section-19__card:nth-child(3) {
            transform: scale(1);
            opacity: 1;
            box-shadow: 0 18px 40px rgba(0, 82, 204, .14);
        }

        #s19-1:checked~.section-19 .section-19__track {
            transform: translateX(calc(0 * (310px + 67px) * -1));
        }

        #s19-2:checked~.section-19 .section-19__track {
            transform: translateX(calc(1 * (310px + 67px) * -1));
        }

        #s19-3:checked~.section-19 .section-19__track {
            transform: translateX(calc(2 * (310px + 67px) * -1));
        }

        /* ── Tablet ≥ 768px — 2 cards visíveis ── */
        @media (min-width: 768px) {
            .section-19__track {
                gap: 24px;
                padding-left: calc((100% - 2 * 230px - 24px) / 2);
                padding-right: calc((100% - 2 * 230px - 24px) / 2);
            }

            .section-19__card {
                flex: 0 0 230px;
                width: 230px;
            }

            #s19-1:checked~.section-19 .section-19__card:nth-child(1),
            #s19-1:checked~.section-19 .section-19__card:nth-child(2),
            #s19-2:checked~.section-19 .section-19__card:nth-child(2),
            #s19-2:checked~.section-19 .section-19__card:nth-child(3),
            #s19-3:checked~.section-19 .section-19__card:nth-child(2),
            #s19-3:checked~.section-19 .section-19__card:nth-child(3) {
                transform: scale(1);
                opacity: 1;
                box-shadow: 0 18px 40px rgba(0, 82, 204, .14);
            }

            #s19-1:checked~.section-19 .section-19__track {
                transform: translateX(0);
            }

            #s19-2:checked~.section-19 .section-19__track {
                transform: translateX(calc(1 * (230px + 24px) * -1));
            }

            #s19-3:checked~.section-19 .section-19__track {
                transform: translateX(calc(1 * (230px + 24px) * -1));
            }
        }

        /* ── Desktop ≥ 992px — 3 cards visíveis ── */
        @media (min-width: 992px) {
            .section-19__track {
                gap: 20px;
                padding-left: calc((100% - 3 * 280px - 2 * 20px) / 2);
                padding-right: calc((100% - 3 * 280px - 2 * 20px) / 2);
            }

            .section-19__card {
                flex: 0 0 280px;
                width: 280px;
                transform: scale(0.83);
            }

            #s19-1:checked~.section-19 .section-19__card:nth-child(1),
            #s19-1:checked~.section-19 .section-19__card:nth-child(2),
            #s19-1:checked~.section-19 .section-19__card:nth-child(3),
            #s19-2:checked~.section-19 .section-19__card:nth-child(1),
            #s19-2:checked~.section-19 .section-19__card:nth-child(2),
            #s19-2:checked~.section-19 .section-19__card:nth-child(3),
            #s19-3:checked~.section-19 .section-19__card:nth-child(1),
            #s19-3:checked~.section-19 .section-19__card:nth-child(2),
            #s19-3:checked~.section-19 .section-19__card:nth-child(3) {
                transform: scale(1);
                opacity: 1;
                box-shadow: 0 18px 40px rgba(0, 82, 204, .14);
            }

            #s19-1:checked~.section-19 .section-19__track,
            #s19-2:checked~.section-19 .section-19__track,
            #s19-3:checked~.section-19 .section-19__track {
                transform: translateX(0);
            }
        }

        /* ── Navegação ── */
        .section-19__nav {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 14px;
            padding: 0 28px;
        }

        .section-19__dots {
            display: flex;
            gap: 7px;
            align-items: center;
        }

        .section-19__dot {
            display: block;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #0052CC;
            opacity: .35;
            cursor: pointer;
            transition: opacity .25s, width .3s, background .25s, border-radius .3s;
        }

        #s19-1:checked~.section-19 .section-19__dot[for="s19-1"],
        #s19-2:checked~.section-19 .section-19__dot[for="s19-2"],
        #s19-3:checked~.section-19 .section-19__dot[for="s19-3"] {
            opacity: 1;
            background: #B87333;
            width: 20px;
            border-radius: 100px;
        }

        /* ── Botões prev/next ── */
        .section-19__btn-slot {
            position: relative;
            width: 40px;
            height: 40px;
            flex-shrink: 0;
        }

        .section-19__btn-slot label {
            position: absolute;
            inset: 0;
            display: none;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: #0052CC;
            border: 1px solid rgba(0, 82, 204, .16);
            color: #fefefe;
            font-size: 17px;
            cursor: pointer;
            transition: background .2s, border-color .2s, transform .15s;
            user-select: none;
        }

        .section-19__btn-slot label:hover {
            background: #B87333;
            border-color: #B87333;
            transform: scale(1.1);
        }

        .section-19__btn-slot label:active {
            transform: scale(.93);
        }

        .section-19__btn-disabled {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #3A3F44;
            border: 1px solid rgba(58, 63, 68, .16);
            opacity: .2;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 17px;
            color: #f2f2f2;
            pointer-events: none;
        }

        /* Padrão: disabled visível, labels ocultos */
        .section-19__btn-slot label {
            display: none;
        }

        .section-19__btn-disabled {
            display: flex;
        }

        /* PREV */
        #s19-1:checked~.section-19 .section-19__btn--prev .section-19__btn-disabled {
            display: flex;
        }

        #s19-1:checked~.section-19 .section-19__btn--prev label {
            display: none;
        }

        #s19-2:checked~.section-19 .section-19__btn--prev .section-19__btn-disabled {
            display: none;
        }

        #s19-2:checked~.section-19 .section-19__btn--prev label {
            display: none;
        }

        #s19-2:checked~.section-19 .section-19__btn--prev label[for="s19-1"] {
            display: flex;
        }

        #s19-3:checked~.section-19 .section-19__btn--prev .section-19__btn-disabled {
            display: none;
        }

        #s19-3:checked~.section-19 .section-19__btn--prev label {
            display: none;
        }

        #s19-3:checked~.section-19 .section-19__btn--prev label[for="s19-2"] {
            display: flex;
        }

        /* NEXT */
        #s19-1:checked~.section-19 .section-19__btn--next .section-19__btn-disabled {
            display: none;
        }

        #s19-1:checked~.section-19 .section-19__btn--next label {
            display: none;
        }

        #s19-1:checked~.section-19 .section-19__btn--next label[for="s19-2"] {
            display: flex;
        }

        #s19-2:checked~.section-19 .section-19__btn--next .section-19__btn-disabled {
            display: none;
        }

        #s19-2:checked~.section-19 .section-19__btn--next label {
            display: none;
        }

        #s19-2:checked~.section-19 .section-19__btn--next label[for="s19-3"] {
            display: flex;
        }

        #s19-3:checked~.section-19 .section-19__btn--next .section-19__btn-disabled {
            display: flex;
        }

        #s19-3:checked~.section-19 .section-19__btn--next label {
            display: none;
        }

        @media (min-width: 992px) {
            .section-19__nav {
                display: none;
            }
        }
    </style>

    <style>
        .section-21 {
            width: 100%;
            padding: 28px 18px;
            background: #F4F6F8;
            border-top: 1px solid #9999993b;
            border-radius: 8px;
            color: #3A3F44;
            overflow: hidden;
        }

        .section-21--soft {
            background: #F4F6F8;
        }

        .section-21__intro {
            display: grid;
            gap: 10px;
            margin-bottom: 22px;
            min-width: 0;
            text-align: left;
        }

        .section-21--soft .section-21__intro {
            text-align: center;
        }

        .section-21__title {
            color: #3A3F44;
            font-size: 1.58rem;
            line-height: 1.08;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .section-21__text {
            color: #59636E;
            font-size: 0.98rem;
            line-height: 1.55;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .section-21__layout {
            display: grid;
            gap: 18px;
            min-width: 0;
        }

        .section-21__image-wrap {
            align-self: stretch;
            background: #ffffff;
            border: 1px solid #BFD2EE;
            border-radius: 8px;
            min-width: 0;
            min-height: 260px;
            padding: 18px;
        }

        .section-21__image {
            width: 100%;
            height: 100%;
            min-height: 240px;
            object-fit: contain;
            display: block;
        }

        .section-21__cards {
            display: grid;
            gap: 12px;
            min-width: 0;
        }

        .section-21__card {
            background: #ffffff;
            border: 1px solid #D8DEE6;
            border-radius: 8px;
            color: #3A3F44;
            display: grid;
            gap: 8px;
            min-width: 0;
            padding: 16px;
            box-shadow: 0 12px 26px rgba(58, 63, 68, .08);
        }

        .section-21__card-icon {
            align-items: center;
            background: #0052CC;
            border: 1px solid #B87333;
            border-radius: 8px;
            color: #ffffff;
            display: flex;
            font-size: 0.78rem;
            font-weight: 800;
            height: 42px;
            justify-content: center;
            width: 54px;
        }

        .section-21__card-title {
            color: #3A3F44;
            font-size: 1rem;
            font-weight: 800;
            line-height: 1.25;
            overflow-wrap: anywhere;
        }

        .section-21__card-text {
            color: #59636E;
            font-size: 0.88rem;
            line-height: 1.42;
            margin: 0;
            overflow-wrap: anywhere;
        }

        @media (min-width: 576px) {
            .section-21 {
                padding: 34px 24px;
            }

            .section-21__cards {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (min-width: 768px) {
            .section-21__layout {
                grid-template-columns: minmax(0, 1.2fr) minmax(220px, 0.8fr);
                align-items: center;
            }
        }

        @media (min-width: 992px) {
            .section-21 {
                padding: 42px;
            }

            .section-21__title {
                font-size: 2.7rem;
            }
        }
    </style>

    <style>
        .section-22-container {
            padding: 28px 0;
        }

        .section-22 {
            width: 100%;
            padding: 24px 18px;
            background: #F7F9FC;
        }

        .section-22--reverse .section-22__item {
            direction: rtl;
        }

        .section-22--reverse .section-22__body {
            direction: ltr;
        }

        .section-22__list {
            display: grid;
            gap: 18px;
            margin: 0;
            padding: 0;
        }

        .section-22__item {
            align-items: center;
            display: grid;
            gap: 18px;
            min-width: 0;
        }

        .section-22__figure {
            background: #EEF3F8;
            border: 1px solid #D8DEE6;
            border-radius: 8px;
            margin: 0;
            min-width: 0;
            padding: 12px;
        }

        .section-22__image {
            width: 100%;
            height: auto;
            aspect-ratio: 4 / 3;
            object-fit: contain;
            display: block;
        }

        .section-22__caption {
            color: #59636E;
            font-size: 0.8rem;
            line-height: 1.35;
            margin-top: 8px;
            overflow-wrap: anywhere;
        }

        .section-22__body {
            display: grid;
            gap: 8px;
            min-width: 0;
        }

        .section-22__tag {
            color: #B87333;
            font-size: 0.78rem;
            font-weight: 800;
            letter-spacing: 0;
            text-transform: uppercase;
        }

        .section-22__title {
            color: #3A3F44;
            font-size: 1.55rem;
            line-height: 1.1;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .section-22__text {
            color: #59636E;
            font-size: 0.96rem;
            line-height: 1.55;
            margin: 0;
            overflow-wrap: anywhere;
        }

        @media (min-width: 576px) {
            .section-22 {
                padding: 30px 24px;
            }
        }

        @media (min-width: 768px) {
            .section-22__item {
                grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
            }

            .section-22__item--reverse {
                grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
            }

            .section-22__item--reverse .section-22__figure {
                order: 2;
            }

            .section-22__item--reverse .section-22__body {
                order: 1;
            }
        }

        @media (min-width: 992px) {
            .section-22 {
                padding: 42px;
            }

            .section-22__list {
                gap: 26px;
            }

            .section-22__title {
                font-size: 2.15rem;
            }
        }
    </style>

    <style>
        .section-23 {
            width: 100%;
            padding: 30px 18px;
            background: #F4F6F8;
            border-top: 1px solid #9999993b;
            border-radius: 8px;
        }

        .section-23--panel {
            background: #F7F9FC;
        }

        .section-23__intro {
            display: grid;
            gap: 10px;
            margin-bottom: 24px;
            text-align: center;
        }

        .section-23__title {
            color: #3A3F44;
            font-size: 1.58rem;
            line-height: 1.1;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .section-23__text {
            color: #59636E;
            font-size: 0.96rem;
            line-height: 1.55;
            margin: 0 auto;
            overflow-wrap: anywhere;
        }

        .section-23__map {
            display: grid;
            gap: 14px;
            min-width: 0;
        }

        .section-23__center {
            background: #ffffff;
            border: 1px solid #BFD2EE;
            border-radius: 8px;
            margin: 0;
            min-width: 0;
            padding: 14px;
            position: relative;
            box-shadow: 0 18px 44px rgba(0, 82, 204, .08);
        }

        .section-23__center-image {
            width: 100%;
            height: auto;
            aspect-ratio: 1 / 1;
            object-fit: contain;
            display: block;
        }

        .section-23__callouts {
            display: grid;
            gap: 12px;
            margin: 0;
            min-width: 0;
            padding: 0;
        }

        .section-23__callout {
            align-items: center;
            background: #ffffff;
            border: 1px solid #D8DEE6;
            border-radius: 8px;
            display: grid;
            gap: 12px;
            grid-template-columns: 72px minmax(0, 1fr);
            min-width: 0;
            padding: 10px;
            box-shadow: 0 10px 24px rgba(58, 63, 68, .08);
        }

        .section-23__callout-image {
            background: #F7F9FC;
            width: 72px;
            height: 72px;
            object-fit: contain;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #B87333;
            display: block;
        }

        .section-23__callout-body {
            display: grid;
            gap: 3px;
            min-width: 0;
        }

        .section-23__callout-title {
            color: #0052CC;
            font-size: 0.98rem;
            font-weight: 800;
            line-height: 1.2;
            overflow-wrap: anywhere;
        }

        .section-23__callout-text {
            color: #59636E;
            font-size: 0.84rem;
            line-height: 1.35;
            margin: 0;
            overflow-wrap: anywhere;
        }

        @media (min-width: 576px) {
            .section-23 {
                padding: 34px 24px;
            }

            .section-23__callouts {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 768px) {
            .section-23__map {
                grid-template-columns: minmax(260px, 0.9fr) minmax(0, 1.1fr);
                align-items: center;
            }
        }

        @media (min-width: 992px) {
            .section-23 {
                padding: 44px;
            }

            .section-23__title {
                font-size: 2.55rem;
            }

            .section-23__map {
                grid-template-columns: minmax(0, 0.82fr) minmax(300px, 1fr) minmax(0, 0.82fr);
                grid-template-rows: repeat(2, auto);
            }

            .section-23__center {
                grid-column: 2;
                grid-row: 1 / span 2;
                border-radius: 50%;
                padding: 24px;
            }

            .section-23__center::before {
                border: 2px dashed #B87333;
                border-radius: 50%;
                content: "";
                inset: 12px;
                position: absolute;
            }

            .section-23__center-image {
                position: relative;
                z-index: 1;
            }

            .section-23__callouts {
                display: contents;
            }

            .section-23__callout {
                align-self: center;
            }

            .section-23__callout:nth-child(1) {
                grid-column: 1;
                grid-row: 1;
            }

            .section-23__callout:nth-child(2) {
                grid-column: 3;
                grid-row: 1;
            }

            .section-23__callout:nth-child(3) {
                grid-column: 1;
                grid-row: 2;
            }

            .section-23__callout:nth-child(4) {
                grid-column: 3;
                grid-row: 2;
            }
        }
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="section-2-2" aria-label="Cabeçalho do produto">
            <div class="section-2-2__banner">
                <div class="section-2-2__banner-container">
                    <video class="section-2-2__banner-video"
                        poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/logotipo-philco-metalizado-banner-horizontal-preto-2220795-00.jpg"
                        preload="none" autoplay="" muted="" loop="" playsinline="" aria-hidden="true">
                        <source
                            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/philco/header-philco.mov">
                    </video>
                </div>

                <div class="section-2-2__badge" role="img" aria-label="Logo Philco">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/philco/logo-philco.png"
                        alt="Logo Philco" class="section-2-2__badge-img" loading="lazy">
                </div>
            </div>

            <article class="section-2-2__body">
                <small class="section-2-2__brand">── philco ──</small>
                <h2 class="section-2-2__title">
                    Liquidificador Philco PLQ1350 Turbo Glass Preto <strong>1200W, jarra de vidro e 12
                        velocidades</strong>
                </h2>
                <p class="section-2-2__subtitle">
                    Potência alta, Tecnologia Pro Maxx 6 e funções Ice, Pulsar e Autolimpeza para preparar sucos,
                    vitaminas, molhos, sopas cremosas e bebidas geladas com mais controle.
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto">
            <picture>
                <source media="(max-width: 760px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-preto-banner-recortado-2220795-01-2.jpg"
                    width="780" height="400">
                <picture>
                    <source media="(max-width: 320px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-preto-banner-recortado-2220795-01-2.jpg?ims=411x">
                    <source media="(max-width: 375px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-preto-banner-recortado-2220795-01-2.jpg?ims=489x">
                    <source media="(max-width: 425px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-preto-banner-recortado-2220795-01-2.jpg?ims=561x">
                    <source media="(max-width: 768px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-preto-banner-recortado-2220795-01-2.jpg?ims=561x">
                    <source media="(max-width: 1024px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-preto-banner-geometrico-2220795-01-1.jpg?ims=1488x">
                    <img class="section-6__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-preto-banner-geometrico-2220795-01-1.jpg?ims=1488x"
                        alt="Liquidificador Philco PLQ1350 Turbo Glass em destaque com informações de potência e capacidade"
                        width="1600" height="650" fetchpriority="high" loading="lazy" decoding="async">
                </picture>
            </picture>
            <div class="section-6__content">
                <h2 class="section-6__title">Potência de 1200W para acelerar o preparo</h2>
                <p class="section-6__description">Mais força para triturar, misturar e chegar na textura certa.</p>
            </div>
        </section>

        <div class="section-15-container" id="section-15-container">
            <div class="section-15">
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        12 velocidades para ajustar
                        cada receita no ponto certo
                    </h2>
                    <p class="section-15__desc">
                        Controle a intensidade conforme o preparo: misturas leves, vitaminas encorpadas, molhos,
                        sopas cremosas e receitas que pedem mais rotação.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-painel-botoes-velocidade-preto-2220795-02.jpg?ims=357x">
                        <source media="(max-width: 375px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-painel-botoes-velocidade-preto-2220795-02.jpg?ims=440x">
                        <source media="(max-width: 425px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-painel-botoes-velocidade-preto-2220795-02.jpg?ims=515x">
                        <source media="(max-width: 768px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-painel-botoes-velocidade-preto-2220795-02.jpg?ims=481x">
                        <source media="(max-width: 1024px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-painel-botoes-velocidade-preto-2220795-02.jpg?ims=666x">
                        <img class="section-15__image"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-painel-botoes-velocidade-preto-2220795-02.jpg?ims=666x"
                            alt="Liquidificador Philco PLQ1350 Turbo Glass destacando controle de velocidades"
                            loading="lazy" decoding="async">
                    </picture>
                </div>
            </div>
        </div>

        <input class="section-19__radio" type="radio" name="slide-19" id="s19-1" checked="">
        <input class="section-19__radio" type="radio" name="slide-19" id="s19-2">
        <input class="section-19__radio" type="radio" name="slide-19" id="s19-3">
        <div class="section-19">
            <section class="section-19__wrap" aria-label="Carrossel de funções do liquidificador Philco PLQ1350">
                <div class="section-19__header">
                    <h3 class="section-19__title">Funções que simplificam a rotina na cozinha</h3>
                </div>

                <div class="section-19__track" role="list">
                    <article class="section-19__card" role="listitem">
                        <picture>
                            <source media="(max-width: 320px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/torta-pavlova-morangos-hortela-receita-liquidificador-philco-2220795-03-1.jpg?ims=462x">
                            <source media="(max-width: 375px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/torta-pavlova-morangos-hortela-receita-liquidificador-philco-2220795-03-1.jpg?ims=462x">
                            <source media="(max-width: 425px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/torta-pavlova-morangos-hortela-receita-liquidificador-philco-2220795-03-1.jpg?ims=462x">
                            <source media="(max-width: 768px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/torta-pavlova-morangos-hortela-receita-liquidificador-philco-2220795-03-1.jpg?ims=342x">
                            <source media="(max-width: 1024px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/torta-pavlova-morangos-hortela-receita-liquidificador-philco-2220795-03-1.jpg?ims=417x">
                            <img class="section-19__card-img"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/torta-pavlova-morangos-hortela-receita-liquidificador-philco-2220795-03-1.jpg?ims=417x"
                                alt="Liquidificador Philco PLQ1350 com referência visual à função pulsar" width="310"
                                height="220" loading="lazy" decoding="async">
                        </picture>
                        <div class="section-19__card-body">
                            <h4 class="section-19__card-title">Função Pulsar</h4>
                            <p class="section-19__card-desc">Ajuda a controlar o ponto de vitaminas, sopas cremosas,
                                molhos e misturas mais espessas sem perder o domínio do preparo.
                            </p>
                        </div>
                    </article>

                    <article class="section-19__card" role="listitem">
                        <picture>
                            <source media="(max-width: 320px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/panquecas-americanas-doces-framboesas-receita-liquidificador-philco-2220795-03-2.jpg?ims=393x">
                            <source media="(max-width: 375px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/panquecas-americanas-doces-framboesas-receita-liquidificador-philco-2220795-03-2.jpg?ims=393x">
                            <source media="(max-width: 425px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/panquecas-americanas-doces-framboesas-receita-liquidificador-philco-2220795-03-2.jpg?ims=393x">
                            <source media="(max-width: 768px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/panquecas-americanas-doces-framboesas-receita-liquidificador-philco-2220795-03-2.jpg?ims=292x">
                            <source media="(max-width: 1024px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/panquecas-americanas-doces-framboesas-receita-liquidificador-philco-2220795-03-2.jpg?ims=359x">
                            <img class="section-19__card-img"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/panquecas-americanas-doces-framboesas-receita-liquidificador-philco-2220795-03-2.jpg?ims=359x"
                                alt="Liquidificador Philco PLQ1350 com referência visual à função Ice" width="310"
                                height="220" loading="lazy" decoding="async">
                        </picture>
                        <div class="section-19__card-body">
                            <h4 class="section-19__card-title">Função Ice</h4>
                            <p class="section-19__card-desc">Tritura gelo com mais facilidade e rapidez para bebidas
                                geladas, sobremesas e preparos que precisam de mais força.</p>
                        </div>
                    </article>

                    <article class="section-19__card" role="listitem">
                        <picture>
                            <source media="(max-width: 320px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-vitamina-laranja-gelo-copos-receita-liquidificador-philco-2220795-03-3.jpg?ims=393x">
                            <source media="(max-width: 375px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-vitamina-laranja-gelo-copos-receita-liquidificador-philco-2220795-03-3.jpg?ims=393x">
                            <source media="(max-width: 425px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-vitamina-laranja-gelo-copos-receita-liquidificador-philco-2220795-03-3.jpg?ims=393x">
                            <source media="(max-width: 768px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-vitamina-laranja-gelo-copos-receita-liquidificador-philco-2220795-03-3.jpg?ims=291x">
                            <source media="(max-width: 1024px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-vitamina-laranja-gelo-copos-receita-liquidificador-philco-2220795-03-3.jpg?ims=356x">
                            <img class="section-19__card-img"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-vitamina-laranja-gelo-copos-receita-liquidificador-philco-2220795-03-3.jpg?ims=356x"
                                alt="Liquidificador Philco PLQ1350 com referência visual à função autolimpeza"
                                width="310" height="220" loading="lazy" decoding="async">
                        </picture>
                        <div class="section-19__card-body">
                            <h4 class="section-19__card-title">Função Autolimpeza</h4>
                            <p class="section-19__card-desc">Facilita a limpeza após o uso e deixa a rotina mais
                                prática para quem prepara receitas todos os dias.</p>
                        </div>
                    </article>
                </div>

                <nav class="section-19__nav" aria-label="Navegação do carrossel">
                    <div class="section-19__btn-slot section-19__btn--prev">
                        <span class="section-19__btn-disabled" aria-hidden="true">←</span>
                        <label for="s19-1" aria-label="Slide anterior">←</label>
                        <label for="s19-2" aria-label="Slide anterior">←</label>
                    </div>

                    <div class="section-19__dots" role="tablist" aria-label="Slides">
                        <label class="section-19__dot" for="s19-1" role="tab" aria-label="Ir para slide 1"></label>
                        <label class="section-19__dot" for="s19-2" role="tab" aria-label="Ir para slide 2"></label>
                        <label class="section-19__dot" for="s19-3" role="tab" aria-label="Ir para slide 3"></label>
                    </div>

                    <div class="section-19__btn-slot section-19__btn--next">
                        <label for="s19-2" aria-label="Próximo slide">→</label>
                        <label for="s19-3" aria-label="Próximo slide">→</label>
                        <span class="section-19__btn-disabled" aria-hidden="true">→</span>
                    </div>
                </nav>
            </section>
        </div>

        <div class="section-21-container">
            <section class="section-21 section-21--soft" aria-labelledby="section-21-title">
                <div class="section-21__intro">
                    <h2 class="section-21__title" id="section-21-title">Jarra de vidro feita para uso intenso</h2>
                    <p class="section-21__text">
                        O copo de vidro não mancha, não pega cheiro e é mais difícil de riscar, mantendo a rotina mais
                        limpa e agradável por mais tempo.
                    </p>
                </div>
                <div class="section-21__layout">
                    <div class="section-21__cards" role="list" aria-label="Diferenciais da jarra de vidro">
                        <article class="section-21__card" role="listitem">
                            <span class="section-21__card-icon" aria-hidden="true">01</span>
                            <strong class="section-21__card-title">Capacidade total de 2,5L</strong>
                            <p class="section-21__card-text">Espaço para preparar sucos, vitaminas e sobremesas para
                                compartilhar.</p>
                        </article>
                        <article class="section-21__card" role="listitem">
                            <span class="section-21__card-icon" aria-hidden="true">02</span>
                            <strong class="section-21__card-title">Capacidade útil de 1,75L</strong>
                            <p class="section-21__card-text">Medida ideal para bater receitas sem ultrapassar o limite
                                recomendado.</p>
                        </article>
                        <article class="section-21__card" role="listitem">
                            <span class="section-21__card-icon" aria-hidden="true">03</span>
                            <strong class="section-21__card-title">Não pega cheiro</strong>
                            <p class="section-21__card-text">Mais cuidado entre receitas doces, salgadas, frutas e
                                ingredientes com aroma forte.</p>
                        </article>
                    </div>
                    <figure class="section-21__image-wrap">
                        <picture>
                            <source media="(max-width: 320px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-glass-1200w-preto-bancada-2220795-07.jpg?ims=321x">
                            <source media="(max-width: 375px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-glass-1200w-preto-bancada-2220795-07.jpg?ims=404x">
                            <source media="(max-width: 425px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-glass-1200w-preto-bancada-2220795-07.jpg?ims=479x">
                            <source media="(max-width: 768px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-glass-1200w-preto-bancada-2220795-07.jpg?ims=345x">
                            <source media="(max-width: 1024px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-glass-1200w-preto-bancada-2220795-07.jpg?ims=477x">
                            <img class="section-21__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-glass-1200w-preto-bancada-2220795-07.jpg?ims=477x"
                                alt="Jarra de vidro do Liquidificador Philco PLQ1350 Turbo Glass" loading="lazy"
                                decoding="async">
                        </picture>
                    </figure>
                </div>
            </section>
        </div>

        <div class="section-15-container">
            <div class="section-15">
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        Tecnologia Pro Maxx 6:
                        trituração potente em 6 lâminas
                    </h2>
                    <p class="section-15__desc">
                        O conjunto de lâminas foi pensado para entregar alto poder de trituração em frutas, gelo,
                        cremes e ingredientes mais firmes.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-frutas-lifestyle-2220795-05.jpg?ims=357x">
                        <source media="(max-width: 375px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-frutas-lifestyle-2220795-05.jpg?ims=440x">
                        <source media="(max-width: 425px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-frutas-lifestyle-2220795-05.jpg?ims=515x">
                        <source media="(max-width: 768px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-frutas-lifestyle-2220795-05.jpg?ims=481x">
                        <source media="(max-width: 1024px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-frutas-lifestyle-2220795-05.jpg?ims=666x">
                        <img class="section-15__image"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-frutas-lifestyle-2220795-05.jpg?ims=666x"
                            alt="Lâminas da Tecnologia Pro Maxx 6 do Liquidificador Philco PLQ1350" loading="lazy"
                            decoding="async">
                    </picture>
                </div>
            </div>
        </div>

        <div class="section-23-container">
            <section class="section-23 section-23--panel" aria-labelledby="section-23-title">
                <div class="section-23__intro">
                    <h2 class="section-23__title" id="section-23-title">Um liquidificador para a rotina da família</h2>
                    <p class="section-23__text">
                        Potência, capacidade e funções reunidas para preparar desde bebidas rápidas até receitas mais
                        encorpadas.
                    </p>
                </div>
                <div class="section-23__map">
                    <figure class="section-23__center">
                        <picture>
                            <source media="(max-width: 320px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2220795_2220796_06.png?ims=333x">
                            <source media="(max-width: 375px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2220795_2220796_06.png?ims=416x">
                            <source media="(max-width: 425px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2220795_2220796_06.png?ims=491x">
                            <source media="(max-width: 768px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2220795_2220796_06.png?ims=410x">
                            <source media="(max-width: 1024px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2220795_2220796_06.png?ims=423x">
                            <img class="section-23__center-image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2220795_2220796_06.png?ims=423x"
                                alt="Liquidificador Philco PLQ1350 Turbo Glass em destaque central" loading="lazy"
                                decoding="async">
                        </picture>
                    </figure>
                    <div class="section-23__callouts" role="list" aria-label="Possibilidades de preparo">
                        <article class="section-23__callout" role="listitem">
                            <svg class="section-23__callout-image" viewBox="0 0 72 72" role="img"
                                aria-labelledby="section-23-icon-sucos" focusable="false">
                                <title id="section-23-icon-sucos">Ícone de copo para sucos e vitaminas</title>
                                <path d="M21 18h30l-4 36H25L21 18Z" fill="#ffffff" stroke="#0052CC" stroke-width="4"
                                    stroke-linejoin="round"></path>
                                <path d="M27 28h18" stroke="#B87333" stroke-width="4" stroke-linecap="round"></path>
                                <path d="M42 17l8-8" stroke="#0052CC" stroke-width="4" stroke-linecap="round"></path>
                                <path d="M30 43c5 0 9-4 9-9 0 5 4 9 9 9-5 0-9 4-9 9 0-5-4-9-9-9Z" fill="#B87333"
                                    opacity=".9"></path>
                            </svg>
                            <div class="section-23__callout-body">
                                <strong class="section-23__callout-title">Sucos e vitaminas</strong>
                                <p class="section-23__callout-text">Jarra ampla e 12 velocidades para misturas leves ou
                                    mais encorpadas.</p>
                            </div>
                        </article>
                        <article class="section-23__callout" role="listitem">
                            <svg class="section-23__callout-image" viewBox="0 0 72 72" role="img"
                                aria-labelledby="section-23-icon-molhos" focusable="false">
                                <title id="section-23-icon-molhos">Ícone de tigela para molhos e cremes</title>
                                <path d="M18 34h36c-2 13-10 20-18 20S20 47 18 34Z" fill="#ffffff" stroke="#0052CC"
                                    stroke-width="4" stroke-linejoin="round"></path>
                                <path d="M25 34c1-7 5-11 11-11s10 4 11 11" fill="none" stroke="#B87333" stroke-width="4"
                                    stroke-linecap="round"></path>
                                <path d="M45 19l10-10" stroke="#0052CC" stroke-width="4" stroke-linecap="round"></path>
                                <path d="M26 43h20" stroke="#B87333" stroke-width="4" stroke-linecap="round"></path>
                            </svg>
                            <div class="section-23__callout-body">
                                <strong class="section-23__callout-title">Molhos e cremes</strong>
                                <p class="section-23__callout-text">Função Pulsar ajuda a chegar no ponto sem passar da
                                    textura desejada.
                                </p>
                            </div>
                        </article>
                        <article class="section-23__callout" role="listitem">
                            <svg class="section-23__callout-image" viewBox="0 0 72 72" role="img"
                                aria-labelledby="section-23-icon-gelo" focusable="false">
                                <title id="section-23-icon-gelo">Ícone de gelo para bebidas geladas</title>
                                <path d="M18 18h22v22H18V18Z" fill="#ffffff" stroke="#0052CC" stroke-width="4"
                                    stroke-linejoin="round"></path>
                                <path d="M32 32h22v22H32V32Z" fill="#ffffff" stroke="#0052CC" stroke-width="4"
                                    stroke-linejoin="round"></path>
                                <path d="M22 46h8M26 42v8" stroke="#B87333" stroke-width="4" stroke-linecap="round">
                                </path>
                                <path d="M44 16v8M40 20h8" stroke="#B87333" stroke-width="4" stroke-linecap="round">
                                </path>
                            </svg>
                            <div class="section-23__callout-body">
                                <strong class="section-23__callout-title">Bebidas geladas</strong>
                                <p class="section-23__callout-text">Função Ice acelera a trituração do gelo para drinks,
                                    sucos e sobremesas.</p>
                            </div>
                        </article>
                        <article class="section-23__callout" role="listitem">
                            <svg class="section-23__callout-image" viewBox="0 0 72 72" role="img"
                                aria-labelledby="section-23-icon-organizacao" focusable="false">
                                <title id="section-23-icon-organizacao">Ícone de organização com porta-fio e check
                                </title>
                                <path d="M22 21h28v23H22V21Z" fill="#ffffff" stroke="#0052CC" stroke-width="4"
                                    stroke-linejoin="round"></path>
                                <path d="M28 44c0 7 16 7 16 0" fill="none" stroke="#0052CC" stroke-width="4"
                                    stroke-linecap="round"></path>
                                <path d="M27 33l7 7 13-15" fill="none" stroke="#B87333" stroke-width="4"
                                    stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M50 28h6v10h-6" fill="none" stroke="#B87333" stroke-width="4"
                                    stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <div class="section-23__callout-body">
                                <strong class="section-23__callout-title">Mais organização</strong>
                                <p class="section-23__callout-text">Porta-fio, base antiderrapante e autolimpeza deixam
                                    o
                                    pós-preparo mais simples.</p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </div>

        <div class="section-15-container">
            <div class="section-15 is-reverse">
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        Detalhes pensados para usar,
                        encaixar e guardar melhor
                    </h2>
                    <p class="section-15__desc">
                        A base antiderrapante dá mais firmeza, o copo tem fácil encaixe e a sobretampa dosadora também
                        ajuda a liberar a base do copo quando for necessário.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-pecas-desmontadas-2220795-06.jpg?ims=357x">
                        <source media="(max-width: 375px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-pecas-desmontadas-2220795-06.jpg?ims=440x">
                        <source media="(max-width: 425px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-pecas-desmontadas-2220795-06.jpg?ims=515x">
                        <source media="(max-width: 768px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-pecas-desmontadas-2220795-06.jpg?ims=481x">
                        <source media="(max-width: 1024px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-pecas-desmontadas-2220795-06.jpg?ims=666x">
                        <img class="section-15__image"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-pecas-desmontadas-2220795-06.jpg?ims=666x"
                            alt="Liquidificador Philco PLQ1350 com base antiderrapante e encaixe do copo" loading="lazy"
                            decoding="async">
                    </picture>
                </div>
            </div>
        </div>

        <!-- Área de FAQ -->
        <section class="faq-section" aria-labelledby="faq-section-title">
            <div class="faq-section__header">
                <h3 class="faq-section__title" id="faq-section-title">Dúvidas rápidas sobre o Philco PLQ1350</h3>
                <p class="faq-section__subtitle">Especificações essenciais para comparar antes da compra.</p>
            </div>
            <ul class="faq-section__list">
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Qual é a potência do liquidificador?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O Philco PLQ1350 tem 1200W de potência para triturar,
                                misturar e preparar receitas com mais agilidade.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">A jarra é de qual material?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">A jarra é de vidro, material que não mancha, não pega cheiro
                                e é mais difícil de riscar.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Qual é a capacidade do copo?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">A capacidade total informada é de 2,5L. A ficha técnica
                                também informa capacidade total de 2,65L e útil de 1,75L para preparo.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Quais funções ele possui?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Possui 12 velocidades, Função Pulsar, Função Ice e Função
                                Autolimpeza.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Quais são as dimensões do produto?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O produto mede 42 cm de altura, 23,5 cm de largura e 22,5 cm
                                de comprimento, com peso aproximado de 2,651 kg.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Qual é a voltagem e a garantia?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O modelo está disponível em versões 110V ou 220V e possui
                                garantia de 1 ano ofertada pelo fabricante.</p>
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
      css:  ``,
    },

            /*@@@@Col - variacao-12 */
    {
      id:   'variacao-12',
      name: 'Variação 12',
      html: `<div class="lp-container">
    <meta charset="UTF-8">
    <title>PDP - eFacil</title>

    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .lp-container {
            width: 100%;
            background: #ffffff;
        }

        .pdp {
            display: flex;
            flex-direction: column;
            font-family: Roboto, sans-serif;
            color: #1b2148;
            background: #ffffff;
            width: 100%;
        }

        .pdp * {
            box-sizing: border-box;
            margin: 0;
        }
    </style>

    <style>
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
            margin: 2rem auto;
        }

        #faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #1b2148;
            margin: 0 0 12px;
            line-height: 98%;
        }

        #faq-section__subtitle {
            font-size: 1rem;
            color: #5d6783;
            margin: 0;
        }

        #faq-section__list {
            list-style: none;
            margin: 0 auto;
            padding: 0;
            max-width: 56rem;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        #faq-section__item {
            background: #fff;
            border: 1px solid #dbe8f8;
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
            background: #f5f9ff;
        }

        #faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #1b2148;
            flex: 1;
        }

        #faq-section__q-text:hover {
            color: #5f8fce;
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
            background: #5f8fce;
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
            border-top: 1px solid #dbe8f8;
        }

        #faq-section__a-text {
            font-size: 0.9rem;
            color: #4e5874;
            line-height: 1.6;
            margin: 0;
        }

        @media (max-width: 480px) {
            #faq-section__q-text {
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
        .section-1-wrap,
        .section-2-wrap,
        .section-3-wrap {
            padding: 28px 16px;
        }

        .section-1 {
            display: grid;
            gap: 24px;
            align-items: center;
            margin: 0 auto;
            width: 100%;
        }

        .section-1__content {
            display: flex;
            flex-direction: column;
            gap: 16px;
            order: 3;
        }

        .section-1__eyebrow {
            color: #5f8fce;
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.16em;
            text-transform: uppercase;
        }

        .section-1__title {
            color: #11184a;
            font-size: clamp(1.45rem, 3vw, 2.25rem);
            line-height: 1.12;
            font-weight: 700;
            text-wrap: pretty;
        }

        .section-1__text {
            color: #4e5874;
            font-size: 1rem;
            line-height: 1.68;
            text-wrap: pretty;
        }

        .section-1__list {
            display: grid;
            gap: 10px;
            list-style: none;
            padding: 0;
        }

        .section-1__item {
            display: flex;
            gap: 10px;
            align-items: flex-start;
            color: #273158;
            font-size: 0.98rem;
            line-height: 1.45;
        }

        .section-1__marker {
            width: 10px;
            height: 10px;
            margin-top: 7px;
            border-radius: 50%;
            background: #89b9ef;
            flex: 0 0 auto;
        }

        .section-1__media {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 320px;
            border-radius: 22px;
            background: linear-gradient(145deg, #eef8ff 0%, #d9ecff 100%);
            overflow: hidden;
        }

        .section-1__image {
            width: min(88%, 390px);
            height: auto;
            display: block;
            padding: 20px;
            object-fit: contain;
            filter: drop-shadow(0 24px 34px rgba(24, 37, 88, 0.18));
        }

        .section-2 {
            display: grid;
            gap: 14px;
            width: 100%;
            margin: 0 auto;
        }

        .section-2__intro {
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 8px;
        }

        .section-2__title {
            color: #11184a;
            font-size: clamp(1.35rem, 3vw, 2rem);
            line-height: 1.18;
            font-weight: 700;
        }

        .section-2__text {
            color: #5d6783;
            font-size: 1rem;
            line-height: 1.6;
        }

        .section-2__grid {
            display: grid;
            gap: 12px;
        }

        .section-2__card {
            border: 1px solid #dbe8f8;
            border-radius: 8px;
            background: #ffffff;
            padding: 18px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            min-height: 136px;
        }

        .section-2__number {
            color: #5f8fce;
            font-size: 1.85rem;
            line-height: 1;
            font-weight: 700;
        }

        .section-2__label {
            color: #11184a;
            font-size: 1rem;
            font-weight: 700;
            line-height: 1.3;
        }

        .section-2__description {
            color: #4e5874;
            font-size: 0.94rem;
            line-height: 1.5;
        }

        .section-3 {
            display: grid;
            gap: 22px;
            align-items: center;
            width: 100%;
            margin: 0 auto;
            padding: 22px;
            border-radius: 22px;
            background: #f5f9ff;
        }

        .section-3__content {
            display: flex;
            flex-direction: column;
            gap: 14px;
        }

        @media (max-width: 767px) {
            .section-3__content {
                order: 1;
            }
        }

        .section-3__title {
            color: #11184a;
            font-size: clamp(1.35rem, 3vw, 2rem);
            line-height: 1.18;
            font-weight: 700;
            text-wrap: pretty;
        }

        .section-3__text {
            color: #4e5874;
            font-size: 1rem;
            line-height: 1.65;
            text-wrap: pretty;
        }

        .section-3__steps {
            display: grid;
            gap: 10px;
            list-style: none;
            padding: 0;
        }

        .section-3__step {
            display: grid;
            grid-template-columns: 44px 1fr;
            gap: 12px;
            align-items: start;
            color: #273158;
            font-size: 0.96rem;
            line-height: 1.48;
        }

        .section-3__step-number {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #11184a;
            color: #ffffff;
            font-weight: 700;
        }

        .section-3__media {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 300px;
        }

        .section-3__image {
            width: min(88%, 390px);
            height: auto;
            display: block;
            object-fit: contain;
            filter: drop-shadow(0 20px 28px rgba(24, 37, 88, 0.16));
        }

        @media (min-width: 576px) {

            .section-1,
            .section-2,
            .section-3 {
                max-width: 576px;
            }

            .section-2__grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 768px) {

            .section-1,
            .section-2,
            .section-3 {
                max-width: 768px;
            }

            .section-1 {
                grid-template-columns: 0.92fr 1.08fr;
            }

            .section-1--reverse {
                grid-template-columns: 1.08fr 0.92fr;
            }

            .section-1--reverse .section-1__media {
                order: 2;
            }

            .section-3 {
                grid-template-columns: 1.08fr 0.92fr;
                padding: 34px;
            }
        }

        @media (min-width: 992px) {

            .section-1,
            .section-2,
            .section-3 {
                max-width: 992px;
            }

            .section-2__grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }

        @media (min-width: 1200px) {

            .section-1,
            .section-2,
            .section-3 {
                max-width: 1200px;
            }
        }

        @media (min-width: 1400px) {

            .section-1,
            .section-2,
            .section-3 {
                max-width: 1400px;
            }
        }
    </style>

    <div class="pdp" id="pdp">
        <section class="product-header-2" aria-label="Cabeçalho do produto">
            <header class="product-header__banner-2">
                <div style="width: 100%; height: 100%; margin: 0px;">
                    <img class="product-header__banner-img-2"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/amaciante-comfort-puro-cuidado-toalhas-algodao-lifestyle-1704676-00fix.jpg"
                        alt="Toalhas brancas macias empilhadas com flores de algodão e penas, Amaciante Comfort Puro Cuidado"
                        loading="eager" decoding="async">
                </div>
                <div class="product-header__badge-2" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/comfort/logo-comfort.png"
                        alt="Ícone da marca" class="product-header__badge-img-2">
                </div>
            </header>
            <article class="product-header__body-2">
                <small class="product-header__brand-2">── Comfort ──</small>
                <h1 class="product-header__title-2">
                    <span>Amaciante Concentrado Puro Cuidado</span>
                    <strong>maciez suave para roupas de bebês</strong>
                </h1>
                <p class="product-header__subtitle-2">
                    Fórmula hipoalergênica, dermatologicamente testada e com perfume suave. Rende até 50 lavagens.
                </p>
            </article>
        </section>

        <section class="section-1-wrap" aria-label="Benefícios do amaciante Comfort Puro Cuidado">
            <article class="section-1">
                <div class="section-1__media">
                    <img class="section-1__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/amaciante-comfort-concentrado-puro-cuidado-fundo-preto-1704676-01.png"
                        alt="Amaciante Comfort Concentrado Puro Cuidado 1L hipoalergênico indicado para roupas de bebê"
                        loading="lazy" decoding="async" style="margin: auto;">
                </div>
                <div class="section-1__content">
                    <p class="section-1__eyebrow">Cuidado concentrado</p>
                    <h3 class="section-1__title">Maciez e perfume suave em cada lavagem</h3>
                    <p class="section-1__text">
                        Menos de meia tampinha ajuda a deixar as roupas macias, cheirosas e agradáveis ao toque.
                    </p>
                    <ul class="section-1__list" aria-label="Principais atributos do produto">
                        <li class="section-1__item"><span class="section-1__marker"
                                aria-hidden="true"></span>Hipoalergênico.</li>
                        <li class="section-1__item"><span class="section-1__marker" aria-hidden="true"></span>Perfume
                            delicado.</li>
                        <li class="section-1__item"><span class="section-1__marker" aria-hidden="true"></span>Para
                            roupas de bebês.
                        </li>
                        <li class="section-1__item"><span class="section-1__marker" aria-hidden="true"></span>Até 50
                            lavagens.</li>
                    </ul>
                </div>
            </article>
        </section>

        <section class="section-2-wrap" aria-label="Destaques do Comfort Concentrado">
            <article class="section-2">
                <div class="section-2__intro">
                    <h3 class="section-2__title">Rende mais. Usa menos.</h3>
                    <p class="section-2__text">
                        Comfort concentrado entrega cuidado com uma dosagem pequena no último enxágue.
                    </p>
                </div>
                <div class="section-2__grid">
                    <article class="section-2__card">
                        <strong class="section-2__number">50</strong>
                        <h4 class="section-2__label">lavagens</h4>
                        <p class="section-2__description">Usando 20 ml por lavagem.</p>
                    </article>
                    <article class="section-2__card">
                        <strong class="section-2__number">4,5 L</strong>
                        <h4 class="section-2__label">de rendimento</h4>
                        <p class="section-2__description">1 L que rende como 4,5 L.</p>
                    </article>
                    <article class="section-2__card">
                        <strong class="section-2__number">20 ml</strong>
                        <h4 class="section-2__label">para até 8 kg</h4>
                        <p class="section-2__description">Menos de 1/3 da tampa.</p>
                    </article>
                    <article class="section-2__card">
                        <strong class="section-2__number">Sim</strong>
                        <h4 class="section-2__label">testado na pele</h4>
                        <p class="section-2__description">Para peles delicadas.</p>
                    </article>
                </div>
            </article>
        </section>

        <section class="section-3-wrap" aria-label="Modo de uso do amaciante">
            <article class="section-3">
                <div class="section-3__content">
                    <h3 class="section-3__title">Dosagem sem complicação</h3>
                    <p class="section-3__text">
                        Coloque no compartimento da máquina ou na água do último enxágue.
                    </p>
                    <ol class="section-3__steps">
                        <li class="section-3__step"><span class="section-3__step-number">1</span><span>Máquinas até 8 kg
                                ou lavagem
                                à mão: 20 ml.</span></li>
                        <li class="section-3__step"><span class="section-3__step-number">2</span><span>Máquinas de 9 a
                                14 kg: dosar
                                22,5 ml.</span></li>
                        <li class="section-3__step"><span class="section-3__step-number">3</span><span>Máquinas de 15 kg
                                ou maiores:
                                1 tampa.</span></li>
                    </ol>
                </div>
                <div class="section-3__media">
                    <img class="section-3__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/amaciante-comfort-concentrado-puro-cuidado-hipoalergenico-1l-1704676-02fix.jpg"
                        alt="Amaciante Comfort Concentrado Puro Cuidado 1L hipoalergênico envolto por flores de algodão e penas"
                        style="border-radius: 20px; margin: auto;" loading="lazy" decoding="async">
                </div>
            </article>
        </section>

        <section class="section-1-wrap" aria-label="Cuidados e recomendações de uso">
            <article class="section-1 section-1--reverse">
                <div class="section-1__content">
                    <p class="section-1__eyebrow">Uso consciente</p>
                    <h3 class="section-1__title">Use do jeito certo</h3>
                    <p class="section-1__text">
                        Siga o rótulo, respeite a dosagem e guarde em local fresco, longe de crianças e animais.
                    </p>
                    <ul class="section-1__list" aria-label="Recomendacoes importantes">
                        <li class="section-1__item"><span class="section-1__marker" aria-hidden="true"></span>Não use em
                            seda ou
                            couro.</li>
                        <li class="section-1__item"><span class="section-1__marker" aria-hidden="true"></span>Não
                            aplique direto na
                            roupa.</li>
                        <li class="section-1__item"><span class="section-1__marker" aria-hidden="true"></span>Mantenha
                            fora do
                            alcance infantil.</li>
                        <li class="section-1__item"><span class="section-1__marker" aria-hidden="true"></span>Em contato
                            com olhos,
                            lave com água.</li>
                    </ul>
                </div>
                <div class="section-1__media">
                    <img class="section-1__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/amaciante-comfort-puro-cuidado-maquina-lavar-uso-lifestyle-1704676-03fix.jpg"
                        alt="Máquina de lavar roupas aberta com peças coloridas e espuma de Amaciante Comfort Puro Cuidado"
                        style="border-radius: 38px; margin: auto;" loading="lazy" decoding="async">
                </div>
            </article>
        </section>

        <section id="faq-section" aria-labelledby="faq-section-title">
            <div id="faq-section__header">
                <h3 id="faq-section__title" id="faq-section-title">Dúvidas rápidas</h3>
                <p id="faq-section__subtitle">As principais respostas antes de usar.</p>
            </div>
            <ul id="faq-section__list">
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">É indicado para roupas de bebê?</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Sim, é indicado para roupas de crianças e bebês.</p>
                        </div>
                    </details>
                </li>
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Quantas lavagens o produto rende?</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Até 50 lavagens, usando 20 ml em máquinas de até 8 kg.</p>
                        </div>
                    </details>
                </li>
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">O amaciante é hipoalergênico?</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Sim. Ele é hipoalergênico e dermatologicamente testado.</p>
                        </div>
                    </details>
                </li>
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Onde coloco o amaciante?</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">No compartimento da máquina ou na água do último enxágue.</p>
                        </div>
                    </details>
                </li>
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Pode usar em qualquer tecido?</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Não é recomendado para seda e couro.</p>
                        </div>
                    </details>
                </li>
            </ul>
        </section>

        <p
            style="color: rgb(138, 138, 138); font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty; text-align: center; padding: 30px 0px;">
            IMAGENS MERAMENTE ILUSTRATIVAS</p>
    </div>
</div>`,
      css:  ``,
    },

        /*@@@@Col - variacao-13 */
    {
      id:   'variacao-13',
      name: 'Variação 13',
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
            background: #f7f8fa;
        }

        #faq-section__header {
            text-align: center;
            margin: 1rem 0;
        }

        #faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #2b3037;
            margin: 0 0 12px;
            line-height: 98%;
        }

        #faq-section__subtitle {
            font-size: 1rem;
            color: #68717d;
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
            border: 1px solid #dde2e8;
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
            background: #f1f3f5;
        }

        #faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #2b3037;
            flex: 1;
        }

        #faq-section__q-text:hover {
            color: #59636f;
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
            background: #8d96a1;
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
            border-top: 1px solid #dde2e8;
        }

        #faq-section__a-text {
            font-size: 0.9rem;
            color: #59636f;
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
        .section-10-container {
            padding-top: 28px;
            padding-bottom: 36px;
        }

        .section-10 {
            width: 100%;
            overflow: hidden;
            position: relative;
            padding: 28px 16px 34px;
            background: linear-gradient(180deg, #f5f6f8 0%, #ffffff 56%, #eef1f4 100%);
            font-family: sans-serif;
            color: #2b3037;
        }

        .section-10__title {
            margin: 0 auto 22px;
            color: #2b3037;
            font-size: 1.55rem;
            font-weight: 800;
            line-height: 1.15;
            text-align: center;
        }

        .section-10__control {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
        }

        .section-10__viewport {
            width: 100%;
            overflow: hidden;
        }

        .section-10__track {
            display: flex;
            margin: 0;
            padding: 0;
            list-style: none;
            transition: transform 0.35s ease;
        }

        .section-10__item {
            flex: 0 0 100%;
            min-width: 0;
            padding: 0 10px;
        }

        #section-10-slide-1:checked~.section-10__viewport .section-10__track {
            transform: translateX(0);
        }

        #section-10-slide-2:checked~.section-10__viewport .section-10__track {
            transform: translateX(-100%);
        }

        #section-10-slide-3:checked~.section-10__viewport .section-10__track {
            transform: translateX(-200%);
        }

        #section-10-slide-4:checked~.section-10__viewport .section-10__track {
            transform: translateX(-300%);
        }

        .section-10__card {
            display: flex;
            min-height: 100%;
            flex-direction: column;
            align-items: center;
            padding: 0 14px;
            text-align: center;
        }

        .section-10__media {
            width: 148px;
            height: 148px;
            margin: 0 0 18px;
            overflow: hidden;
            border: 1px solid #d9dee5;
            border-radius: 50%;
            background: #ffffff;
        }

        .section-10__image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
        }

        .section-10__card-title {
            margin: 0 0 10px;
            color: #2b3037;
            font-size: 1rem;
            font-weight: 800;
            line-height: 1.25;
        }

        .section-10__card-text {
            margin: 0 auto;
            color: #59636f;
            font-size: 0.86rem;
            line-height: 1.55;
        }

        .section-10__controls {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 8px 0 0;
        }

        .section-10__button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border: 1px solid #cfd5dd;
            border-radius: 999px;
            background: #ffffff;
            color: #2b3037;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 800;
            line-height: 1;
            transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }

        .section-10__button:hover {
            border-color: #6f7782;
        }

        #section-10-slide-1:checked~.section-10__controls .section-10__button--1,
        #section-10-slide-2:checked~.section-10__controls .section-10__button--2,
        #section-10-slide-3:checked~.section-10__controls .section-10__button--3,
        #section-10-slide-4:checked~.section-10__controls .section-10__button--4 {
            border-color: #2f363f;
            background: #2f363f;
            color: #ffffff;
        }

        @media (min-width: 576px) {
            .section-10 {
                padding: 34px 30px 42px;
            }

            .section-10__title {
                max-width: 576px;
                font-size: 1.85rem;
            }

            .section-10__media {
                width: 164px;
                height: 164px;
            }
        }

        @media (min-width: 768px) {
            .section-10 {
                padding: 38px 28px 46px;
            }

            .section-10__title {
                max-width: 768px;
                margin-bottom: 28px;
            }

            .section-10__item {
                flex-basis: 50%;
                padding: 0 12px;
            }

            #section-10-slide-1:checked~.section-10__viewport .section-10__track {
                transform: translateX(0);
            }

            #section-10-slide-2:checked~.section-10__viewport .section-10__track {
                transform: translateX(-50%);
            }

            #section-10-slide-3:checked~.section-10__viewport .section-10__track,
            #section-10-slide-4:checked~.section-10__viewport .section-10__track {
                transform: translateX(-100%);
            }

            .section-10__button--4 {
                display: none;
            }
        }

        @media (min-width: 992px) {
            .section-10 {
                padding: 42px 105px 52px;
            }

            .section-10__title {
                max-width: 992px;
                font-size: 2.15rem;
            }
        }

        @media (min-width: 1200px) {
            .section-10 {
                padding: 46px 34px 58px;
            }

            .section-10__viewport {
                overflow: visible;
            }

            .section-10__item {
                flex-basis: 25%;
                padding: 0 14px;
            }

            #section-10-slide-1:checked~.section-10__viewport .section-10__track,
            #section-10-slide-2:checked~.section-10__viewport .section-10__track,
            #section-10-slide-3:checked~.section-10__viewport .section-10__track,
            #section-10-slide-4:checked~.section-10__viewport .section-10__track {
                transform: none;
            }

            .section-10__controls {
                display: none;
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
            filter: grayscale(1) brightness(1.14) contrast(0.76);
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
            color: #262b31;
        }

        .section-2-2__title strong {
            font-weight: 700;
            display: block;
        }

        .section-2-2__subtitle {
            color: #68717d;
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
        /* ===== HERO SECTION — VARIÁVEIS ===== */
        .section-6 {
            --pos-y: 50%;
            --pos-x: 54%;
            --color-title: #2b3037;
            --bg-box: rgba(255, 255, 255, 0.86);
            padding-top: 12px;

            background-color: #eef0f2;
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
            max-width: min(38%, 470px);
            z-index: 10;
            padding: clamp(20px, 3vw, 34px) clamp(18px, 3vw, 36px);
            border-left: 5px solid #c5cad1;
            border-radius: 4px 28px 28px 4px;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.92) 0%, rgba(242, 244, 246, 0.64) 78%, rgba(242, 244, 246, 0) 100%);
            box-shadow: 0 18px 42px rgba(34, 40, 48, 0.12);
            backdrop-filter: blur(2px);
        }

        .section-6__title {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin: 0;
            color: #2b3037;
            line-height: 1;
            text-shadow: 0 2px 14px rgba(255, 255, 255, 0.7);
        }

        .section-6__title-brand {
            display: block;
            font-size: clamp(2.25rem, 5.1vw, 4.7rem);
            font-weight: 900;
            letter-spacing: 0;
        }

        .section-6__title-model {
            display: block;
            color: #505964;
            font-size: clamp(1.05rem, 2.1vw, 1.75rem);
            font-weight: 500;
            line-height: 1.12;
        }

        .section-6__description {
            display: flex;
            flex-direction: column;
            gap: 7px;
            max-width: 27rem;
            color: #3f4650;
            margin: 18px 0 0;
            font-size: clamp(1rem, 1.55vw, 1.22rem);
            line-height: 1.42;
            text-shadow: 0 2px 10px rgba(255, 255, 255, 0.65);
        }

        .section-6__description-strong {
            font-weight: 800;
        }

        .section-6__description-line {
            font-weight: 400;
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
                padding: 24px 22px 28px;
                border-left: 0;
                border-radius: 0;
                background: linear-gradient(180deg, #f4f5f6 0%, #e8ebee 100%);
                box-shadow: none;
                backdrop-filter: none;
                text-align: left;
            }

            .section-6__title {
                color: #2b3037;
                text-shadow: none;
            }

            .section-6__description {
                margin-top: 14px;
                font-size: 1.02rem;
                color: #525b66;
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
            .section-6__title-brand {
                font-size: 2rem;
            }

            .section-6__title-model {
                font-size: 1.05rem;
            }

            .section-6__description {
                font-size: 0.96rem;
            }
        }
    </style>

    <style>
        .section-15-container {
            background-color: #eef1f4;
            padding: 1.5rem;
            width: 100%;
            box-sizing: border-box;
            position: relative;
        }

        @media (min-width: 760px) {
            #section-15-container::before {
                content: "";
                position: absolute;
                inset: 0;
                background-image: url("https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-dual-masculino-cinza-fundo-infinito-1225035-12.png");
                background-size: contain;
                background-repeat: no-repeat;
                pointer-events: none;
                z-index: 4;
            }
        }

        .section-15 {
            display: flex;
            flex-direction: column-reverse;
            gap: 1.25rem;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
            position: relative;
            z-index: 5;
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
        }

        .section-15__content {
            display: flex;
            flex-direction: column;
            width: 95%;
            margin: auto;
            box-sizing: border-box;
        }

        .section-15__title {
            color: #2b3037;
            font-size: 32px;
            font-weight: 600;
            line-height: 40px;
            margin: 0 0 1rem;
            text-align: left;
        }

        .section-15__desc {
            color: #545e6b;
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
            color: #2b3037;
            font-size: 1.05rem;
            font-weight: 700;
            line-height: 1.35;
            margin: 0;
        }

        .section-15__feature-item-text {
            color: #545e6b;
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
        .section-21 {
            width: 100%;
            min-height: 280px;
            overflow: hidden;
            display: grid;
            align-items: stretch;
            gap: 18px;
            padding: 22px 16px;
            background: #f0f2f5;
            border-radius: 6px;
            color: #2b3037;
            font-family: sans-serif;
        }

        .section-21--reverse .section-21__content {
            order: 2;

        }

        .section-21--reverse .section-21__gallery {
            order: 1;
        }

        .section-21__content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 12px;
            padding: 0 1.75rem;
        }

        .section-21__title {
            margin: 0;
            color: #2b3037;
            font-size: 1.65rem;
            font-weight: 900;
            line-height: 0.98;
            text-transform: uppercase;
        }

        .section-21__text {
            margin: 0;
            color: #535c68;
            font-size: 0.86rem;
            line-height: 1.55;
        }

        .section-21__control {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
        }

        .section-21__gallery {
            position: relative;
            display: block;
            min-height: 205px;
            height: 100%;
        }

        .section-21__viewport {
            position: relative;
            width: calc(100% - 72px);
            min-height: inherit;
            height: 100%;
            margin: 0 auto;
            overflow: hidden;
        }

        .section-21__track {
            position: relative;
            min-height: inherit;
            height: 100%;
            transition: transform 0.35s ease;
        }

        .section-21__panel {
            min-height: 0;
            height: auto;
            margin: 0;
            overflow: hidden;
            background: #d8dde4;
            border-radius: 5px;
        }

        .section-21__panel--first {
            clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 7%;
            width: 86%;
        }

        .section-21__panel--middle {
            clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 107%;
            width: 86%;
        }

        .section-21__panel--last {
            clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 207%;
            width: 86%;
        }

        #section-21-slide-1:checked~.section-21__gallery .section-21__track {
            transform: translateX(0);
        }

        #section-21-slide-2:checked~.section-21__gallery .section-21__track {
            transform: translateX(-100%);
        }

        #section-21-slide-3:checked~.section-21__gallery .section-21__track {
            transform: translateX(-200%);
        }

        .section-21__image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }

        .section-21__image:not([src]) {
            opacity: 0;
        }

        .section-21__arrows {
            position: absolute;
            inset: 0;
            pointer-events: none;
        }

        .section-21__arrow {
            position: absolute;
            top: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            width: 34px;
            height: 34px;
            border: 1px solid #cbd1da;
            border-radius: 50%;
            background: #ffffff;
            color: #3a414b;
            cursor: pointer;
            font-size: 1.4rem;
            font-weight: 900;
            line-height: 1;
            pointer-events: auto;
            transform: translateY(-50%);
        }

        .section-21__arrow--left {
            left: 0;
        }

        .section-21__arrow--right {
            right: 0;
        }

        #section-21-slide-1:checked~.section-21__gallery .section-21__arrow--next-1 {
            display: flex;
        }

        #section-21-slide-2:checked~.section-21__gallery .section-21__arrow--prev-2 {
            display: flex;
        }

        #section-21-slide-2:checked~.section-21__gallery .section-21__arrow--next-2 {
            display: flex;
        }

        #section-21-slide-3:checked~.section-21__gallery .section-21__arrow--prev-3 {
            display: flex;
        }

        @media (min-width: 576px) {
            .section-21 {
                padding: 24px 20px;
            }

            .section-21__title {
                font-size: 1.9rem;
            }

            .section-21__gallery {
                min-height: 230px;
            }

            .section-21__viewport {
                width: calc(100% - 86px);
            }

            .section-21__panel--first {
                left: 0;
                width: 56%;
            }

            .section-21__panel--middle {
                left: 44%;
                width: 56%;
            }

            .section-21__panel--last {
                left: 88%;
                width: 56%;
            }

            #section-21-slide-2:checked~.section-21__gallery .section-21__track {
                transform: translateX(-44%);
            }

            #section-21-slide-3:checked~.section-21__gallery .section-21__track {
                transform: translateX(-44%);
            }

            #section-21-slide-2:checked~.section-21__gallery .section-21__arrow--next-2 {
                display: none;
            }

            #section-21-slide-3:checked~.section-21__gallery .section-21__arrow--prev-3 {
                display: none;
            }

            #section-21-slide-3:checked~.section-21__gallery .section-21__arrow--prev-3-tablet {
                display: flex;
            }
        }

        @media (min-width: 768px) {
            .section-21 {
                grid-template-columns: minmax(0, 0.75fr) minmax(0, 2.25fr);
                align-items: stretch;
                gap: 18px;
                padding: 24px;
            }

            .section-21--reverse {
                grid-template-columns: minmax(0, 2.25fr) minmax(0, 0.75fr);
            }

            .section-21__content {
                gap: 14px;
            }

            .section-21__gallery {
                min-height: 250px;
            }
        }

        @media (min-width: 992px) {
            .section-21 {
                gap: 22px;
                padding: 26px;
            }

            .section-21__title {
                font-size: 2.15rem;
            }

            .section-21__gallery {
                min-height: 270px;
            }
        }

        @media (min-width: 992px) {
            .section-21 {
                gap: 24px;
                padding: 28px;
            }

            .section-21__gallery {
                min-height: 285px;
            }

            .section-21__viewport {
                width: 100%;
                overflow: visible;
            }

            #section-21-slide-1:checked~.section-21__gallery .section-21__track,
            #section-21-slide-2:checked~.section-21__gallery .section-21__track,
            #section-21-slide-3:checked~.section-21__gallery .section-21__track {
                transform: none;
            }

            .section-21__panel--first {
                left: 0%;
                width: 37%;
            }

            .section-21__panel--middle {
                left: 31%;
                width: 37%;
            }

            .section-21__panel--last {
                left: 63%;
                width: 37%;
            }

            .section-21__arrows {
                display: none;
            }
        }

        @media (min-width: 1400px) {
            .section-21 {
                gap: 28px;
                padding: 30px;
            }

            .section-21__title {
                font-size: 2.35rem;
            }
        }
    </style>

    <style>
        .section-22 {
            width: 100%;
            overflow: hidden;
            padding: 28px 16px;
            background: linear-gradient(180deg, #f6f7f9 0%, #ffffff 58%, #eff2f5 100%);
            border-radius: 6px;
            color: #2b3037;
            font-family: sans-serif;
            text-align: center;
        }

        .section-22__title {
            margin: 0;
            color: #2b3037;
            font-size: 1.55rem;
            font-weight: 900;
            line-height: 1.15;
        }

        .section-22__subtitle {
            margin: 8px auto 20px;
            color: #5a6370;
            font-size: 0.9rem;
            line-height: 1.55;
        }

        .section-22__table-wrap {
            width: 100%;
            overflow-x: auto;
            border: 1px solid #d7dce3;
            border-radius: 5px;
            background: #ffffff;
        }

        .section-22__table {
            width: 100%;
            min-width: 760px;
            border-collapse: collapse;
        }

        .section-22__cell {
            min-width: 78px;
            padding: 13px 12px;
            border-right: 1px solid #d7dde6;
            color: #3b434e;
            font-size: 0.82rem;
            font-weight: 600;
            line-height: 1.35;
            text-align: center;
            white-space: nowrap;
        }

        .section-22__cell--label {
            min-width: 188px;
            color: #2b3037;
            font-weight: 800;
            text-align: left;
        }

        .section-22__cell:last-child {
            border-right: 0;
        }

        .section-22__row+.section-22__row .section-22__cell {
            border-top: 1px solid #d7dce3;
        }

        .section-22__tip {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin: 20px auto 0;
            color: #56606c;
            font-size: 0.86rem;
            line-height: 1.5;
        }

        .section-22__icon {
            flex: 0 0 auto;
            width: 34px;
            height: 20px;
            color: #454d58;
        }

        .section-22__tip-text {
            margin: 0;
            text-align: left;
        }

        .section-22__tip-strong {
            font-weight: 800;
        }

        @media (min-width: 576px) {
            .section-22 {
                padding: 32px 22px;
            }

            .section-22__title {
                font-size: 1.85rem;
            }
        }

        @media (min-width: 768px) {
            .section-22 {
                padding: 36px 26px;
            }

            .section-22__subtitle {
                margin-bottom: 24px;
            }
        }

        @media (min-width: 992px) {
            .section-22 {
                padding: 40px 34px;
            }

            .section-22__title {
                font-size: 2.2rem;
            }

            .section-22__table-wrap {
                overflow-x: visible;
            }

            .section-22__table {
                min-width: 0;
            }
        }

        @media (min-width: 1200px) {
            .section-22 {
                padding: 44px 40px;
            }
        }

        @media (min-width: 1400px) {
            .section-22 {
                padding: 46px 44px;
            }
        }
    </style>


    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="section-2-2" aria-label="Cabeçalho do produto">
            <header class="section-2-2__banner">
                <div class="section-2-2__banner-container">
                    <video class="section-2-2__banner-video"
                        poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-havaianas.webp"
                        preload="none" autoplay muted loop playsinline aria-hidden="true">
                        <source
                            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/havaianas/header-havaianas.mov">
                    </video>
                </div>

                <div class="section-2-2__badge" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/havaianas/logo-havaianas.png"
                        alt="Logo da marca" class="section-2-2__badge-img">
                </div>
            </header>

            <article class="section-2-2__body">
                <small class="section-2-2__brand">── havaianas ──</small>
                <h2 class="section-2-2__title">
                    Havaianas Dual Verde São Francisco <strong>Robustez e conforto para o dia a dia</strong>
                </h2>
                <p class="section-2-2__subtitle">
                    Chinelo masculino com solado em duas camadas, tiras bicolores mais grossas e encaixe firme.
                    Uma escolha casual para quem quer conforto do rolê à rotina.
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto" background-color: #90939f99;>
            <picture>
                <source media="(max-width: 760px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-dual-masculino-cinza-gelo-casual-1225035-10.webp"
                    width="780" height="400">
                <img class="section-6__image"
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-dual-masculino-cinza-gelo-lifestyle-1225035-11.webp"
                    alt="Havaianas Dual Verde São Francisco com tiras largas e solado robusto" width="1600" height="650"
                    loading="lazy" fetchpriority="high" decoding="async">
            </picture>
            <div class="section-6__content">
                <h2 class="section-6__title">
                    <span class="section-6__title-brand">Havaianas</span>
                    <span class="section-6__title-model">Dual Verde São Francisco</span>
                </h2>
                <p class="section-6__description">
                    <span class="section-6__description-strong">Robusta, confortável e durável.</span>
                    <span class="section-6__description-line">Solado duplo e tiras largas para acompanhar do rolê à
                        rotina.</span>
                </p>
            </div>
        </section>

        <div class="section-15-container" id="section-15-container" style="background-color: #90939f99;">
            <div class="section-15" background-color: #90939f99;>
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        Solado duplo para mais conforto e presença
                    </h2>
                    <p class="section-15__desc">
                        A estrutura em duas camadas combina borracha macia, flexibilidade e resistência para deixar a
                        pisada mais confortável no uso casual.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <img class="section-15__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sandalia-havaianas-dual-masculina-cinza-gelo-fundo-infinito-1225035-13.webp"
                        alt="Chinelo Havaianas Dual Verde com solado robusto em duas camadas" />
                </div>
            </div>
        </div>

        <section aria-label="Grid de especificações do produto">
            <div class="section-10 section-10--carousel-mobile" aria-labelledby="section-10-title">
                <h2 class="section-10__title" id="section-10-title">
                    A qualidade está em cada detalhe
                </h2>
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-1"
                    checked>
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-2">
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-3">
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-4">
                <div class="section-10__viewport">
                    <ul class="section-10__track">
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sandalia-havaianas-dual-masculina-cinza-gelo-1225035-02.webp"
                                        alt="Detalhe das tiras largas em PVC da Havaianas Dual">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Tiras largas em PVC
                                    </h3>
                                    <p class="section-10__card-text">
                                        Encaixe firme, toque macio e visual robusto para o uso casual.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-dual-masculino-cinza-lifestyle-1225035-03.webp"
                                        alt="Detalhe do solado de duas camadas da Havaianas Dual">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Solado em duas camadas
                                    </h3>
                                    <p class="section-10__card-text">
                                        Mais conforto, resistência e presença para acompanhar o dia a dia.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-dual-masculino-cinza-casual-1225035-04.webp"
                                        alt="Detalhe da textura na base da Havaianas Dual">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Textura para aderência
                                    </h3>
                                    <p class="section-10__card-text">
                                        A base texturizada ajuda a deixar a passada mais segura.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-dual-masculino-praia-lifestyle-1225035-05.webp"
                                        alt="Detalhe da borracha flexível da Havaianas Dual">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Borracha macia e durável
                                    </h3>
                                    <p class="section-10__card-text">
                                        Material flexível, resistente e simples de limpar depois do uso.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                    </ul>
                </div>
                <nav class="section-10__controls">
                    <label class="section-10__button section-10__button--1" for="section-10-slide-1">1</label>
                    <label class="section-10__button section-10__button--2" for="section-10-slide-2">2</label>
                    <label class="section-10__button section-10__button--3" for="section-10-slide-3">3</label>
                    <label class="section-10__button section-10__button--4" for="section-10-slide-4">4</label>
                </nav>
            </div>
        </section>

        <div class="section-15-container" style="background-color: #90939f99;">
            <div class="section-15 is-reverse">
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        Tiras largas que firmam melhor nos pés
                    </h2>
                    <p class="section-15__desc">
                        As tiras bicolores em PVC texturizado têm visual moderno, toque firme e melhor encaixe para quem
                        prefere um chinelo masculino mais robusto.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <img class="section-15__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-dual-masculino-cinza-gelo-angulo-lateral-1225035-14.webp"
                        alt="Chinelo Havaianas Dual Verde com tiras bicolores largas" />
                </div>
            </div>
        </div>

        <section class="section-21-container" aria-label="Estilo e detalhes das Havaianas Dual">
            <article class="section-21" aria-labelledby="section-21-title">
                <div class="section-21__content">
                    <h2 class="section-21__title" id="section-21-title">
                        Estilo que combina com você
                    </h2>
                    <p class="section-21__text">
                        Tiras bicolores com textura inspirada em pneu que trazem um visual moderno e marcante.
                    </p>
                </div>
                <input class="section-21__control" type="radio" name="section-21-carousel" id="section-21-slide-1"
                    checked aria-label="Mostrar primeira imagem">
                <input class="section-21__control" type="radio" name="section-21-carousel" id="section-21-slide-2"
                    aria-label="Mostrar próxima imagem">
                <input class="section-21__control" type="radio" name="section-21-carousel" id="section-21-slide-3"
                    aria-label="Mostrar última imagem">
                <div class="section-21__gallery" aria-label="Espaços para imagens em recorte diagonal">
                    <div class="section-21__viewport">
                        <div class="section-21__track">
                            <figure class="section-21__panel section-21__panel--first">
                                <img class="section-21__image"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sandalia-havaianas-dual-detalhe-tira-textura-pneu-1225035-06.webp"
                                    alt="Imagem da tira bicolor da Havaianas Dual" loading="lazy" width="420"
                                    height="320">
                            </figure>
                            <figure class="section-21__panel section-21__panel--middle">
                                <img class="section-21__image"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sandalia-havaianas-dual-solado-borracha-antiderrapante-1225035-07.webp"
                                    alt="Imagem da palmilha texturizada da Havaianas Dual" loading="lazy" width="420"
                                    height="320">
                            </figure>
                            <figure class="section-21__panel section-21__panel--last">
                                <img class="section-21__image"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sandalia-havaianas-dual-solado-dupla-camada-borracha-1225035-08.webp"
                                    alt="Imagem lateral do solado da Havaianas Dual" loading="lazy" width="420"
                                    height="320">
                            </figure>
                        </div>
                    </div>
                    <nav class="section-21__arrows" aria-label="Controles das imagens em destaque">
                        <label class="section-21__arrow section-21__arrow--right section-21__arrow--next-1"
                            for="section-21-slide-2" role="button" aria-label="Ver próxima imagem">&#8250;</label>
                        <label class="section-21__arrow section-21__arrow--left section-21__arrow--prev-2"
                            for="section-21-slide-1" role="button" aria-label="Ver imagem anterior">&#8249;</label>
                        <label class="section-21__arrow section-21__arrow--right section-21__arrow--next-2"
                            for="section-21-slide-3" role="button" aria-label="Ver próxima imagem">&#8250;</label>
                        <label class="section-21__arrow section-21__arrow--left section-21__arrow--prev-3"
                            for="section-21-slide-2" role="button" aria-label="Ver imagem anterior">&#8249;</label>
                        <label class="section-21__arrow section-21__arrow--left section-21__arrow--prev-3-tablet"
                            for="section-21-slide-1" role="button"
                            aria-label="Voltar para as primeiras imagens">&#8249;</label>
                    </nav>
                </div>
            </article>
        </section>

        <section class="section-22-container" aria-label="Guia de tamanhos Havaianas">
            <article class="section-22" aria-labelledby="section-22-title">
                <h2 class="section-22__title" id="section-22-title">Guia de tamanhos</h2>
                <p class="section-22__subtitle">
                    Este anúncio contempla as numerações Havaianas 37/38, 39/40, 41/42, 43/44 e 45/46.
                </p>
                <div class="section-22__table-wrap">
                    <table class="section-22__table"
                        aria-label="Tabela de conversão de comprimento do pé para tamanho Havaianas">
                        <tbody>
                            <tr class="section-22__row">
                                <th class="section-22__cell section-22__cell--label" scope="row">Comprimento do pé (cm)
                                </th>
                                <td class="section-22__cell">23,7 - 25,0</td>
                                <td class="section-22__cell">25,1 - 26,3</td>
                                <td class="section-22__cell">26,4 - 27,6</td>
                                <td class="section-22__cell">27,7 - 29,0</td>
                                <td class="section-22__cell">29,1 - 30,3</td>
                            </tr>
                            <tr class="section-22__row">
                                <th class="section-22__cell section-22__cell--label" scope="row">Tamanho Havaianas</th>
                                <td class="section-22__cell">37/38</td>
                                <td class="section-22__cell">39/40</td>
                                <td class="section-22__cell">41/42</td>
                                <td class="section-22__cell">43/44</td>
                                <td class="section-22__cell">45/46</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <aside class="section-22__tip" aria-label="Dica sobre escolha de tamanho">
                    <svg class="section-22__icon" viewBox="0 0 48 28" role="img" aria-label="Ícone de régua">
                        <rect x="2" y="6" width="44" height="16" rx="2" fill="none" stroke="currentColor"
                            stroke-width="2" />
                        <path d="M9 6v6M15 6v4M21 6v6M27 6v4M33 6v6M39 6v4" fill="none" stroke="currentColor"
                            stroke-width="2" />
                    </svg>
                    <p class="section-22__tip-text">
                        <span class="section-22__tip-strong">Dica:</span> Ficou entre dois tamanhos? Escolha o maior
                        para mais conforto.
                    </p>
                </aside>
            </article>
        </section>


        <p style="color: #727b86; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty;
            text-align: center; padding: 30px 0;">
            IMAGENS MERAMENTE ILUSTRATIVAS
        </p>

        <!-- Área de FAQ -->
        <section id="faq-section" aria-labelledby="faq-section-title">
            <div id="faq-section__header">
                <h2 id="faq-section__title" id="faq-section-title">Dúvidas Frequentes</h2>
            </div>
            <ul id="faq-section__list" role="list">
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O Havaianas Dual Verde é indicado para qual tipo de uso? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Ele é indicado para uso casual no dia a dia, do rolê à rotina,
                                com estrutura robusta e confortável para quem procura um chinelo resistente e versátil.
                            </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O chinelo Havaianas Dual Verde é confortável? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. Ele tem solado com duas camadas robustas, macias e
                                flexíveis, ajudando a entregar mais conforto durante o uso. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O solado do Havaianas Dual Verde é resistente? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. O solado é feito em borracha e possui duas camadas, o que
                                contribui para maior durabilidade, resistência e aderência. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> As tiras do Havaianas Dual Verde são grossas? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. As tiras são mais largas, bicolores e texturizadas,
                                oferecendo melhor encaixe aos pés e visual mais moderno. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> Qual é o material do Havaianas Dual Verde? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O chinelo é fabricado em borracha, com tiras texturizadas de
                                PVC, combinando flexibilidade, durabilidade e conforto. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O Havaianas Dual Verde tem boa aderência? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. O modelo conta com solado robusto e estrutura pensada para
                                oferecer melhor aderência no uso casual. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> Como limpar o chinelo Havaianas Dual Verde? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Lave com escova de cerdas macias, água e sabão neutro. Depois,
                                deixe secar em local arejado e à sombra. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> Pode usar produto químico para limpar o Havaianas Dual Verde?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Não. A limpeza deve ser feita sem produtos químicos,
                                preservando melhor o material, as tiras e o acabamento do chinelo. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O Havaianas Dual Verde combina com quais ocasiões? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Ele combina com momentos casuais, passeios e uso diário,
                                principalmente para quem busca um chinelo masculino robusto, confortável e fácil de
                                usar. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->
            </ul>
        </section>

    </div>
</div>`,
      css:  ``,
    },

    /*@@@@Col - variacao-14 */
    {
      id:   'variacao-14',
      name: 'variação 14',
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

        @keyframes rich-fade-up {
            from {
                opacity: 0;
                transform: translateY(22px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes rich-fade-left {
            from {
                opacity: 0;
                transform: translate(-18px, -50%);
            }

            to {
                opacity: 1;
                transform: translate(0, -50%);
            }
        }

        @keyframes rich-wine-glow {
            from {
                filter: saturate(0.94) brightness(0.98);
            }

            to {
                filter: saturate(1.08) brightness(1.04);
            }
        }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&amp;display=swap"
        rel="stylesheet">
    <title>Havaianas Elegance Amaranto</title>
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
            background: #ffffff;
            animation: rich-fade-up 0.85s ease both;
        }

        #faq-section__header {
            text-align: center;
            margin: 1rem 0;
        }

        #faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #6e0c2a;
            margin: 0 0 12px;
            line-height: 98%;
        }

        #faq-section__subtitle {
            font-size: 1rem;
            color: #6e0c2a;
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
            border: 1px solid #eadbe1;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 24px rgba(62, 7, 23, 0.04);
            transition: transform 0.32s ease, border-color 0.32s ease, box-shadow 0.32s ease;
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
            background: rgba(121, 45, 65, 0.10);
        }

        #faq-section__item:hover {
            transform: translateY(-2px);
            border-color: #792d41;
            box-shadow: 0 16px 34px rgba(62, 7, 23, 0.12);
        }

        #faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #6e0c2a;
            flex: 1;
        }

        #faq-section__q-text:hover {
            color: #6e0c2a;
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
            background: #792d41;
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
            border-top: 1px solid #eadbe1;
        }

        #faq-section__a-text {
            font-size: 0.9rem;
            color: #6e0c2a;
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
        .section-10-container {
            padding-top: 28px;
            padding-bottom: 36px;
        }

        .section-10 {
            width: 100%;
            overflow: hidden;
            position: relative;
            padding: 28px 16px 34px;
            background: #ffffff;
            font-family: sans-serif;
            color: #6e0c2a;
            animation: rich-fade-up 0.82s ease both;
        }

        .section-10__title {
            margin: 0 auto 22px;
            color: #3e0717;
            font-size: 1.55rem;
            font-weight: 800;
            line-height: 1.15;
            text-align: center;
        }

        .section-10__control {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
        }

        .section-10__viewport {
            width: 100%;
            overflow: hidden;
        }

        .section-10__track {
            display: flex;
            margin: 0;
            padding: 0;
            list-style: none;
            transition: transform 0.35s ease;
        }

        .section-10__item {
            flex: 0 0 100%;
            min-width: 0;
            padding: 0 10px;
        }

        #section-10-slide-1:checked~.section-10__viewport .section-10__track {
            transform: translateX(0);
        }

        #section-10-slide-2:checked~.section-10__viewport .section-10__track {
            transform: translateX(-100%);
        }

        #section-10-slide-3:checked~.section-10__viewport .section-10__track {
            transform: translateX(-200%);
        }

        #section-10-slide-4:checked~.section-10__viewport .section-10__track {
            transform: translateX(-300%);
        }

        .section-10__card {
            display: flex;
            min-height: 100%;
            flex-direction: column;
            align-items: center;
            padding: 0 14px;
            text-align: center;
            transition: transform 0.35s ease;
        }

        .section-10__media {
            width: 148px;
            height: 148px;
            margin: 0 0 18px;
            overflow: hidden;
            border: 1px solid #eadbe1;
            border-radius: 50%;
            background: #ffffff;
            box-shadow: 0 12px 28px rgba(62, 7, 23, 0.08);
            transition: transform 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease;
        }

        .section-10__image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
            transition: transform 0.55s ease, filter 0.55s ease;
        }

        .section-10__card-title {
            margin: 0 0 10px;
            color: #6e0c2a;
            font-size: 1rem;
            font-weight: 800;
            line-height: 1.25;
        }

        .section-10__card-text {
            margin: 0 auto;
            color: #6e0c2a;
            font-size: 0.86rem;
            line-height: 1.55;
        }

        .section-10__controls {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 8px 0 0;
        }

        .section-10__button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border: 1px solid #eadbe1;
            border-radius: 999px;
            background: #ffffff;
            color: #6e0c2a;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 800;
            line-height: 1;
            transition: transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
        }

        .section-10__button:hover {
            transform: translateY(-2px);
            border-color: #792d41;
            box-shadow: 0 10px 20px rgba(62, 7, 23, 0.12);
        }

        #section-10-slide-1:checked~.section-10__controls .section-10__button--1,
        #section-10-slide-2:checked~.section-10__controls .section-10__button--2,
        #section-10-slide-3:checked~.section-10__controls .section-10__button--3,
        #section-10-slide-4:checked~.section-10__controls .section-10__button--4 {
            border-color: #792d41;
            background: #6e0c2a;
            color: #ffffff;
        }

        @media (min-width: 576px) {
            .section-10 {
                padding: 34px 30px 42px;
            }

            .section-10__title {
                max-width: 576px;
                font-size: 1.85rem;
            }

            .section-10__media {
                width: 164px;
                height: 164px;
            }
        }

        @media (min-width: 768px) {
            .section-10 {
                padding: 38px 28px 46px;
            }

            .section-10__title {
                max-width: 768px;
                margin-bottom: 28px;
            }

            .section-10__item {
                flex-basis: 50%;
                padding: 0 12px;
            }

            #section-10-slide-1:checked~.section-10__viewport .section-10__track {
                transform: translateX(0);
            }

            #section-10-slide-2:checked~.section-10__viewport .section-10__track {
                transform: translateX(-50%);
            }

            #section-10-slide-3:checked~.section-10__viewport .section-10__track,
            #section-10-slide-4:checked~.section-10__viewport .section-10__track {
                transform: translateX(-100%);
            }

            .section-10__button--4 {
                display: none;
            }
        }

        @media (min-width: 992px) {
            .section-10 {
                padding: 42px 105px 52px;
            }

            .section-10__title {
                max-width: 992px;
                font-size: 2.15rem;
            }
        }

        @media (min-width: 1200px) {
            .section-10 {
                padding: 46px 34px 58px;
            }

            .section-10__viewport {
                overflow: visible;
            }

            .section-10__item {
                flex-basis: 25%;
                padding: 0 14px;
            }

            #section-10-slide-1:checked~.section-10__viewport .section-10__track,
            #section-10-slide-2:checked~.section-10__viewport .section-10__track,
            #section-10-slide-3:checked~.section-10__viewport .section-10__track,
            #section-10-slide-4:checked~.section-10__viewport .section-10__track {
                transform: none;
            }

            .section-10__controls {
                display: none;
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

        .section-2-2__banner::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, rgba(62, 7, 23, 0.2), rgba(110, 12, 42, 0.08), rgba(121, 45, 65, 0.16));
            pointer-events: none;
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
            filter: saturate(0.95) contrast(1.04);
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
            transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .section-2-2__badge:hover {
            transform: scale(1.04);
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
            animation: rich-fade-up 0.82s ease both;
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
            color: #6e0c2a;
        }

        .section-2-2__title strong {
            font-weight: 700;
            display: block;
            color: #3e0717;
        }

        .section-2-2__subtitle {
            color: #6e0c2a;
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
        /* ===== HERO SECTION — VARIÁVEIS ===== */
        .section-6 {
            --pos-y: 50%;
            --pos-x: 4%;
            --color-title: #3e0717;
            --bg-box: rgba(255, 255, 255, 0.86);
            padding-top: 12px;

            background-color: #ffffff;
            width: 100%;
            position: relative;
            overflow: hidden;
        }

        /* ===== IMAGEM ===== */
        .section-6__image {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 1.1s ease, filter 1.1s ease;
        }

        .section-6:hover .section-6__image {
            transform: scale(1.015);
            filter: saturate(1.04) contrast(1.03);
        }

        /* ===== CONTEÚDO SOBREPOSTO ===== */
        .section-6__content {
            position: absolute;
            top: var(--pos-y);
            left: clamp(1%, var(--pos-x), 100%);
            transform: translateY(-50%);
            max-width: min(38%, 470px);
            z-index: 10;
            padding: clamp(20px, 3vw, 34px) clamp(18px, 3vw, 36px);
            border-left: 5px solid #792d41;
            border-radius: 4px 28px 28px 4px;
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0 18px 44px rgba(62, 7, 23, 0.2);
            backdrop-filter: blur(2px);
            overflow: hidden;
            animation: rich-fade-left 0.86s ease both;
        }

        .section-6__content::before {
            content: "";
            position: absolute;
            inset: 0 auto 0 0;
            width: 3px;
            background: linear-gradient(180deg, #3e0717, #792d41, #6e0c2a);
            box-shadow: 0 0 18px rgba(121, 45, 65, 0.42);
        }

        .section-6__title {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin: 0;
            color: #3e0717;
            line-height: 1;
            text-shadow: 0 2px 14px rgba(255, 255, 255, 0.7);
        }

        .section-6__title-brand {
            display: block;
            font-size: clamp(2.25rem, 5.1vw, 4.7rem);
            font-weight: 900;
            letter-spacing: 0;
        }

        .section-6__title-model {
            display: block;
            color: #792d41;
            font-size: clamp(1.05rem, 2.1vw, 1.75rem);
            font-weight: 500;
            line-height: 1.12;
        }

        .section-6__description {
            display: flex;
            flex-direction: column;
            gap: 7px;
            max-width: 27rem;
            color: #6e0c2a;
            margin: 18px 0 0;
            font-size: clamp(1rem, 1.55vw, 1.22rem);
            line-height: 1.42;
            text-shadow: 0 2px 10px rgba(255, 255, 255, 0.65);
        }

        .section-6__description-strong {
            font-weight: 800;
        }

        .section-6__description-line {
            font-weight: 400;
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
                padding: 24px 22px 6px;
                border-left: 0;
                border-radius: 0;
                background: #ffffff;
                box-shadow: none;
                backdrop-filter: none;
                text-align: left;
                animation: rich-fade-up 0.76s ease both;
            }

            .section-6__content::before {
                display: none;
            }

            .section-6__title {
                color: #3e0717;
                text-shadow: none;
            }

            .section-6__description {
                margin-top: 14px;
                font-size: 1.02rem;
                color: #6e0c2a;
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
            .section-6__title-brand {
                font-size: 2rem;
            }

            .section-6__title-model {
                font-size: 1.05rem;
            }

            .section-6__description {
                font-size: 0.96rem;
            }
        }
    </style>

    <style>
        .section-15-container {
            background-color: #ffffff;
            padding: 0.76rem;
            width: 100%;
            box-sizing: border-box;
            position: relative;
        }

        @media (min-width: 760px) {
            #section-15-container::before {
                content: "";
                position: absolute;
                inset: 0;
                background-image: url("https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-dual-masculino-cinza-fundo-infinito-1225035-12.png");
                background-size: contain;
                background-repeat: no-repeat;
                pointer-events: none;
                z-index: 4;
            }
        }

        .section-15 {
            display: flex;
            flex-direction: column-reverse;
            gap: 1.25rem;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
            position: relative;
            z-index: 5;
            animation: rich-fade-up 0.82s ease both;
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
            box-shadow: 0 16px 34px rgba(62, 7, 23, 0.12);
            transition: transform 0.7s ease, filter 0.7s ease, box-shadow 0.7s ease;
        }

        .section-15:hover .section-15__image {
            transform: scale(1.025);
            filter: saturate(1.04) contrast(1.03);
            box-shadow: 0 22px 48px rgba(62, 7, 23, 0.18);
        }

        .section-15__content {
            display: flex;
            flex-direction: column;
            width: 95%;
            margin: auto;
            box-sizing: border-box;
        }

        .section-15__title {
            color: #3e0717;
            font-size: 32px;
            font-weight: 600;
            line-height: 40px;
            margin: 0 0 1rem;
            text-align: left;
        }

        .section-15__desc {
            color: #6e0c2a;
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
            color: #792d41;
            font-size: 1.05rem;
            font-weight: 700;
            line-height: 1.35;
            margin: 0;
        }

        .section-15__feature-item-text {
            color: #6e0c2a;
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
        .section-21 {
            width: 100%;
            min-height: 280px;
            overflow: hidden;
            position: relative;
            display: grid;
            align-items: stretch;
            gap: 18px;
            padding: 42px 18px 30px;
            background: #ffffff;
            border-radius: 6px;
            color: #6e0c2a;
            font-family: sans-serif;
            isolation: isolate;
            box-shadow: 0 12px 34px rgba(62, 7, 23, 0.08);
            animation: rich-fade-up 0.82s ease both;
        }

        .section-21::before {
            content: "";
            position: absolute;
            inset: 0 auto auto 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #3e0717 0%, #6e0c2a 62%, #792d41 100%);
            clip-path: polygon(0 0, 92% 0, 55% 100%, 0 100%);
            z-index: 0;
            animation: rich-wine-glow 7s ease-in-out infinite alternate;
        }

        .section-21::after {
            content: "";
            position: absolute;
            inset: 12px auto auto 18px;
            width: 46%;
            height: 1px;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0));
            z-index: 1;
            pointer-events: none;
        }

        .section-21--reverse .section-21__content {
            order: 2;

        }

        .section-21--reverse .section-21__gallery {
            order: 1;
        }

        .section-21__content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 12px;
            padding: 0;
            margin: 0 0 8px 26px;
            position: relative;
            z-index: 1;
        }

        .section-21__title {
            margin: 0;
            color: #ffffff;
            font-size: clamp(1.45rem, 6.7vw, 1.85rem);
            font-weight: 900;
            line-height: 0.98;
            text-transform: uppercase;
            text-shadow: 0 12px 26px rgba(62, 7, 23, 0.26);
        }

        .section-21__text {
            margin: 0;
            color: #ffffff;
            font-size: 0.95rem;
            line-height: 1.55;
        }

        .section-21__control {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
        }

        .section-21__gallery {
            position: relative;
            display: block;
            min-height: 245px;
            height: 100%;
            z-index: 1;
        }

        .section-21__viewport {
            position: relative;
            width: min(82%, 350px);
            min-height: inherit;
            height: 100%;
            margin: 0 40px 0 auto;
            overflow: hidden;
        }

        .section-21__track {
            position: relative;
            min-height: inherit;
            height: 100%;
            transition: transform 0.35s ease;
        }

        .section-21__panel {
            min-height: 0;
            height: auto;
            margin: 0;
            overflow: hidden;
            background: rgba(121, 45, 65, 0.10);
            border-radius: 5px;
            border: 1px solid rgba(121, 45, 65, 0.16);
            box-shadow: 0 16px 36px rgba(62, 7, 23, 0.16);
        }

        .section-21__panel--first {
            clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 100%;
        }

        .section-21__panel--middle {
            clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 100%;
            width: 100%;
        }

        .section-21__panel--last {
            clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 200%;
            width: 100%;
        }

        #section-21-slide-1:checked~.section-21__gallery .section-21__track {
            transform: translateX(0);
        }

        #section-21-slide-2:checked~.section-21__gallery .section-21__track {
            transform: translateX(-100%);
        }

        #section-21-slide-3:checked~.section-21__gallery .section-21__track {
            transform: translateX(-200%);
        }

        .section-21__image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            transition: transform 0.8s ease, filter 0.8s ease;
        }

        .section-21:hover .section-21__image {
            transform: scale(1.035);
            filter: saturate(1.04) contrast(1.04);
        }

        .section-21__image:not([src]) {
            opacity: 0;
        }

        .section-21__arrows {
            position: absolute;
            inset: 0;
            pointer-events: none;
        }

        .section-21__arrow {
            position: absolute;
            top: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            width: 34px;
            height: 34px;
            border: 1px solid #ff9900;
            border-radius: 50%;
            background: #ffffff;
            color: #6e0c2a;
            cursor: pointer;
            font-size: 1.4rem;
            font-weight: 900;
            line-height: 1;
            pointer-events: auto;
            transform: translateY(-50%);
            transition: transform 0.28s ease, box-shadow 0.28s ease, color 0.28s ease;
        }

        .section-21__arrow:hover {
            color: #3e0717;
            transform: translateY(-50%) scale(1.06);
            box-shadow: 0 0 0 5px rgba(121, 45, 65, 0.10), 0 14px 24px rgba(62, 7, 23, 0.16);
        }

        .section-21__arrow--left {
            left: 0;
        }

        .section-21__arrow--right {
            right: 0;
        }

        #section-21-slide-1:checked~.section-21__gallery .section-21__arrow--next-1 {
            display: flex;
        }

        #section-21-slide-2:checked~.section-21__gallery .section-21__arrow--prev-2 {
            display: flex;
        }

        #section-21-slide-2:checked~.section-21__gallery .section-21__arrow--next-2 {
            display: flex;
        }

        #section-21-slide-3:checked~.section-21__gallery .section-21__arrow--prev-3 {
            display: flex;
        }

        @media (min-width: 576px) {
            .section-21 {
                padding: 24px 20px;
            }

            .section-21__title {
                font-size: 1.9rem;
            }

            .section-21__gallery {
                min-height: 230px;
            }

            .section-21__viewport {
                width: calc(100% - 86px);
            }

            .section-21__panel--first {
                left: 0;
                width: 56%;
            }

            .section-21__panel--middle {
                left: 44%;
                width: 56%;
            }

            .section-21__panel--last {
                left: 88%;
                width: 56%;
            }

            #section-21-slide-2:checked~.section-21__gallery .section-21__track {
                transform: translateX(-44%);
            }

            #section-21-slide-3:checked~.section-21__gallery .section-21__track {
                transform: translateX(-44%);
            }

            #section-21-slide-2:checked~.section-21__gallery .section-21__arrow--next-2 {
                display: none;
            }

            #section-21-slide-3:checked~.section-21__gallery .section-21__arrow--prev-3 {
                display: none;
            }

            #section-21-slide-3:checked~.section-21__gallery .section-21__arrow--prev-3-tablet {
                display: flex;
            }
        }

        @media (min-width: 768px) {
            .section-21 {
                grid-template-columns: minmax(0, 0.75fr) minmax(0, 2.25fr);
                align-items: stretch;
                gap: 18px;
                padding: 24px;
            }

            .section-21::before {
                inset: 0 auto 0 0;
                width: 48%;
                height: 100%;
                clip-path: polygon(0 0, 100% 0, 82% 100%, 0 100%);
            }

            .section-21__content {
                width: auto;
                margin: 0;
                padding: 0 1.75rem;
            }

            .section-21__text {
                font-size: 0.86rem;
            }

            .section-21--reverse {
                grid-template-columns: minmax(0, 2.25fr) minmax(0, 0.75fr);
            }

            .section-21__content {
                gap: 14px;
            }

            .section-21__gallery {
                min-height: 250px;
            }
        }

        @media (min-width: 992px) {
            .section-21 {
                gap: 22px;
                padding: 26px;
            }

            .section-21__title {
                font-size: 2.15rem;
            }

            .section-21__gallery {
                min-height: 270px;
            }
        }

        @media (min-width: 992px) {
            .section-21 {
                gap: 24px;
                padding: 28px;
            }

            .section-21__gallery {
                min-height: 285px;
            }

            .section-21__viewport {
                width: 100%;
                overflow: visible;
            }

            #section-21-slide-1:checked~.section-21__gallery .section-21__track,
            #section-21-slide-2:checked~.section-21__gallery .section-21__track,
            #section-21-slide-3:checked~.section-21__gallery .section-21__track {
                transform: none;
            }

            .section-21__panel--first {
                left: 0%;
                width: 37%;
            }

            .section-21__panel--middle {
                left: 31%;
                width: 37%;
            }

            .section-21__panel--last {
                left: 63%;
                width: 37%;
            }

            .section-21__arrows {
                display: none;
            }
        }

        @media (min-width: 1400px) {
            .section-21 {
                gap: 28px;
                padding: 30px;
            }

            .section-21__title {
                font-size: 2.35rem;
            }
        }
    </style>

    <style>
        .section-22 {
            width: 100%;
            overflow: hidden;
            padding: 28px 16px;
            background: #ffffff;
            border-radius: 6px;
            color: #6e0c2a;
            font-family: sans-serif;
            text-align: center;
            animation: rich-fade-up 0.82s ease both;
        }

        .section-22__title {
            margin: 0;
            color: #3e0717;
            font-size: 1.55rem;
            font-weight: 900;
            line-height: 1.15;
        }

        .section-22__subtitle {
            margin: 8px auto 20px;
            color: #6e0c2a;
            font-size: 0.9rem;
            line-height: 1.55;
        }

        .section-22__table-wrap {
            width: 100%;
            overflow-x: auto;
            border: 1px solid #eadbe1;
            border-radius: 5px;
            background: #ffffff;
            box-shadow: 0 14px 30px rgba(62, 7, 23, 0.06);
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .section-22__table-wrap:hover {
            border-color: #792d41;
            box-shadow: 0 18px 38px rgba(62, 7, 23, 0.12);
        }

        .section-22__table {
            width: 100%;
            min-width: 760px;
            border-collapse: collapse;
        }

        .section-22__cell {
            min-width: 78px;
            padding: 13px 12px;
            border-right: 1px solid #eadbe1;
            color: #6e0c2a;
            font-size: 0.82rem;
            font-weight: 600;
            line-height: 1.35;
            text-align: center;
            white-space: nowrap;
        }

        .section-22__cell--label {
            min-width: 188px;
            color: #792d41;
            font-weight: 800;
            text-align: left;
        }

        .section-22__cell:last-child {
            border-right: 0;
        }

        .section-22__row+.section-22__row .section-22__cell {
            border-top: 1px solid #eadbe1;
        }

        .section-22__tip {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin: 20px auto 0;
            color: #6e0c2a;
            font-size: 0.86rem;
            line-height: 1.5;
        }

        .section-22__icon {
            flex: 0 0 auto;
            width: 34px;
            height: 20px;
            color: #6e0c2a;
        }

        .section-22__tip-text {
            margin: 0;
            text-align: left;
        }

        .section-22__tip-strong {
            font-weight: 800;
        }

        @media (min-width: 576px) {
            .section-22 {
                padding: 32px 22px;
            }

            .section-22__title {
                font-size: 1.85rem;
            }
        }

        @media (min-width: 768px) {
            .section-22 {
                padding: 36px 26px;
            }

            .section-22__subtitle {
                margin-bottom: 24px;
            }
        }

        @media (min-width: 992px) {
            .section-22 {
                padding: 40px 34px;
            }

            .section-22__title {
                font-size: 2.2rem;
            }

            .section-22__table-wrap {
                overflow-x: visible;
            }

            .section-22__table {
                min-width: 0;
            }
        }

        @media (min-width: 1200px) {
            .section-22 {
                padding: 44px 40px;
            }
        }

        @media (min-width: 1400px) {
            .section-22 {
                padding: 46px 44px;
            }
        }
    </style>


    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="section-2-2" aria-label="Cabeçalho do produto">
            <header class="section-2-2__banner">
                <div class="section-2-2__banner-container">
                    <video class="section-2-2__banner-video"
                        poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-havaianas.webp"
                        preload="none" autoplay="" muted="" loop="" playsinline="" aria-hidden="true">
                        <source
                            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/havaianas/header-havaianas.mov">
                    </video>
                </div>

                <div class="section-2-2__badge" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/havaianas/logo-havaianas.png"
                        alt="Logo da marca" class="section-2-2__badge-img" loading="lazy">
                </div>
            </header>

            <article class="section-2-2__body">
                <small class="section-2-2__brand">── havaianas ──</small>
                <h2 class="section-2-2__title">
                    Havaianas Elegance Amaranto <strong>conforto elegante para todos os dias</strong>
                </h2>
                <p class="section-2-2__subtitle">
                    Calçado clássico e moderno para caminhar com estilo, renovar o visual e acompanhar seus momentos de
                    lazer com conforto.
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto" background-color:="" #ffffff;="">
            <picture>
                <source media="(max-width: 760px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-cenario-praia2-lifestyle-1225195-1225196-1225197-1225198-1225199-01.webp">
                <img class="section-6__image"
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-cenario-praia1-lifestyle-1225195-1225196-1225197-1225198-1225199-01.webp"
                    alt="Havaianas Elegance Amaranto com visual clássico e moderno" width="1600" height="650"
                    fetchpriority="high" loading="lazy" decoding="async">
            </picture>
            <div class="section-6__content">
                <h2 class="section-6__title">
                    <span class="section-6__title-brand">Havaianas</span>
                    <span class="section-6__title-model">Elegance Amaranto</span>
                </h2>
                <p class="section-6__description">
                    <span class="section-6__description-strong">Estilo, conforto e elegância na rotina.</span>
                    <span class="section-6__description-line">Sola macia e tiras texturizadas para lazer, descanso e
                        dia a dia.</span>
                </p>
            </div>
        </section>

        <div class="section-15-container" style="background-color: #ffffff;">
            <div class="section-15" background-color:="" #ffffff;="">
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        Elegância confortável para caminhar com estilo
                    </h2>
                    <p class="section-15__desc">
                        A sola 100% borracha combina maciez, flexibilidade e durabilidade para acompanhar momentos de
                        lazer com conforto.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <img class="section-15__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-modelo-sentada-lifestyle-1225195-1225196-1225197-1225198-1225199-02.webp"
                        alt="Havaianas Elegance Amaranto com solado macio de borracha" loading="lazy" decoding="async">
                </div>
            </div>
        </div>

        <section aria-label="Grid de especificações do produto" style="background-color: #6e0c2a08;">
            <div class="section-10 section-10--carousel-mobile" aria-labelledby="section-10-title">
                <h2 class="section-10__title" id="section-10-title">
                    A qualidade está em cada detalhe
                </h2>
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-1"
                    checked="">
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-2">
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-3">
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-4">
                <div class="section-10__viewport">
                    <ul class="section-10__track">
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-detalhe-tiras-textura-1225195-1225196-1225197-1225198-1225199-03-1.webp"
                                        alt="Detalhe das tiras texturizadas da Havaianas Elegance Amaranto"
                                        loading="lazy" decoding="async">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Tiras texturizadas em PVC
                                    </h3>
                                    <p class="section-10__card-text">
                                        Tiras mais grossas ajudam na estabilidade e trazem frescor durante o uso.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-detalhe-solado-inferior-1225195-1225196-1225197-1225198-1225199-03-2.webp"
                                        alt="Detalhe do solado macio da Havaianas Elegance Amaranto" loading="lazy"
                                        decoding="async">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Solado macio de borracha
                                    </h3>
                                    <p class="section-10__card-text">
                                        Base flexível e durável para caminhar com conforto no dia a dia.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-modelo-passarela-madeira-lifestyle-1225195-1225196-1225197-1225198-1225199-03-3.webp"
                                        alt="Detalhe do acabamento da Havaianas Elegance Amaranto" loading="lazy"
                                        decoding="async">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Amaranto com presença elegante
                                    </h3>
                                    <p class="section-10__card-text">
                                        Cor marcante para renovar o visual sem abrir mão de um estilo clássico.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-detalhe-logotipo-relevo-1225195-1225196-1225197-1225198-1225199-03-4.webp"
                                        alt="Detalhe da Havaianas Elegance Amaranto fácil de limpar" loading="lazy"
                                        decoding="async">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Fácil de lavar
                                    </h3>
                                    <p class="section-10__card-text">
                                        Pode ser lavada com sabão neutro, escova macia ou na máquina de lavar.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                    </ul>
                </div>
                <nav class="section-10__controls">
                    <label class="section-10__button section-10__button--1" for="section-10-slide-1">1</label>
                    <label class="section-10__button section-10__button--2" for="section-10-slide-2">2</label>
                    <label class="section-10__button section-10__button--3" for="section-10-slide-3">3</label>
                    <label class="section-10__button section-10__button--4" for="section-10-slide-4">4</label>
                </nav>
            </div>
        </section>

        <div class="section-15-container" style="background-color: #ffffff;">
            <div class="section-15 is-reverse">
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        Clássica e moderna na mesma escolha
                    </h2>
                    <p class="section-15__desc">
                        O modelo une conforto e elegância para os pés, com visual pronto para lazer, descanso e
                        combinações casuais.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <img class="section-15__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-modelo-caminhando-ambiente-lifestyle-1225195-1225196-1225197-1225198-1225199-04.webp"
                        alt="Havaianas Elegance Amaranto com tiras texturizadas em PVC" loading="lazy" decoding="async">
                </div>
            </div>
        </div>

        <section class="section-21-container" aria-label="Estilo e detalhes das Havaianas Elegance Amaranto">
            <article class="section-21" aria-labelledby="section-21-title">
                <div class="section-21__content">
                    <h2 class="section-21__title" id="section-21-title">
                        Estilo que combina com você
                    </h2>
                    <p class="section-21__text">
                        Amaranto elegante, conforto de borracha e visual clássico para caminhar com estilo.
                    </p>
                </div>
                <input class="section-21__control" type="radio" name="section-21-carousel" id="section-21-slide-1"
                    checked="" aria-label="Mostrar primeira imagem">
                <input class="section-21__control" type="radio" name="section-21-carousel" id="section-21-slide-2"
                    aria-label="Mostrar próxima imagem">
                <input class="section-21__control" type="radio" name="section-21-carousel" id="section-21-slide-3"
                    aria-label="Mostrar última imagem">
                <div class="section-21__gallery" aria-label="Espaços para imagens em recorte diagonal">
                    <div class="section-21__viewport">
                        <div class="section-21__track">
                            <figure class="section-21__panel section-21__panel--first">
                                <img class="section-21__image"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-mao-exibindo-produto-1225195-1225196-1225197-1225198-1225199-05-3.webp"
                                    alt="Imagem das tiras texturizadas da Havaianas Elegance Amaranto" width="420"
                                    height="320" loading="lazy" decoding="async">
                            </figure>
                            <figure class="section-21__panel section-21__panel--middle">
                                <img class="section-21__image"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-mao-exibindo-produto-1225195-1225196-1225197-1225198-1225199-05-2.webp"
                                    alt="Imagem do solado macio da Havaianas Elegance Amaranto" width="420" height="320"
                                    loading="lazy" decoding="async">
                            </figure>
                            <figure class="section-21__panel section-21__panel--last">
                                <img class="section-21__image"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-modelo-shopping-lifestyle-1225195-1225196-1225197-1225198-1225199-05-1.webp"
                                    alt="Imagem lateral da Havaianas Elegance Amaranto" width="420" height="320"
                                    loading="lazy" decoding="async">
                            </figure>
                        </div>
                    </div>
                    <nav class="section-21__arrows" aria-label="Controles das imagens em destaque">
                        <label class="section-21__arrow section-21__arrow--right section-21__arrow--next-1"
                            for="section-21-slide-2" role="button" aria-label="Ver próxima imagem">›</label>
                        <label class="section-21__arrow section-21__arrow--left section-21__arrow--prev-2"
                            for="section-21-slide-1" role="button" aria-label="Ver imagem anterior">‹</label>
                        <label class="section-21__arrow section-21__arrow--right section-21__arrow--next-2"
                            for="section-21-slide-3" role="button" aria-label="Ver próxima imagem">›</label>
                        <label class="section-21__arrow section-21__arrow--left section-21__arrow--prev-3"
                            for="section-21-slide-2" role="button" aria-label="Ver imagem anterior">‹</label>
                        <label class="section-21__arrow section-21__arrow--left section-21__arrow--prev-3-tablet"
                            for="section-21-slide-1" role="button"
                            aria-label="Voltar para as primeiras imagens">‹</label>
                    </nav>
                </div>
            </article>
        </section>

        <section class="section-22-container" aria-label="Guia de tamanhos Havaianas">
            <article class="section-22" aria-labelledby="section-22-title">
                <h2 class="section-22__title" id="section-22-title">Guia de tamanhos</h2>
                <p class="section-22__subtitle">
                    Este anúncio contempla as numerações Havaianas 33/34, 35/36, 37/38, 39/40 e 41/42.
                </p>
                <div class="section-22__table-wrap">
                    <table class="section-22__table"
                        aria-label="Tabela de tamanhos e medidas aproximadas da Havaianas Elegance Amaranto">
                        <tbody>
                            <tr class="section-22__row">
                                <th class="section-22__cell section-22__cell--label" scope="row">Tamanho Havaianas
                                </th>
                                <td class="section-22__cell">33/34</td>
                                <td class="section-22__cell">35/36</td>
                                <td class="section-22__cell">37/38</td>
                                <td class="section-22__cell">39/40</td>
                                <td class="section-22__cell">41/42</td>
                            </tr>
                            <tr class="section-22__row">
                                <th class="section-22__cell section-22__cell--label" scope="row">Medida aprox. do pé
                                    (cm)</th>
                                <td class="section-22__cell">21,1 - 22,3</td>
                                <td class="section-22__cell">22,4 - 23,6</td>
                                <td class="section-22__cell">23,7 - 25,0</td>
                                <td class="section-22__cell">25,1 - 26,3</td>
                                <td class="section-22__cell">26,4 - 27,6</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <aside class="section-22__tip" aria-label="Dica sobre escolha de tamanho">
                    <svg class="section-22__icon" viewBox="0 0 48 28" role="img" aria-label="Ícone de régua">
                        <rect x="2" y="6" width="44" height="16" rx="2" fill="none" stroke="currentColor"
                            stroke-width="2"></rect>
                        <path d="M9 6v6M15 6v4M21 6v6M27 6v4M33 6v6M39 6v4" fill="none" stroke="currentColor"
                            stroke-width="2"></path>
                    </svg>
                    <p class="section-22__tip-text">
                        <span class="section-22__tip-strong">Dica:</span> confira a numeração desejada antes de
                        finalizar
                        a escolha.
                    </p>
                </aside>
            </article>
        </section>


        <p style="color: #6e0c2a; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty;
            text-align: center; padding: 30px 0;">
            IMAGENS MERAMENTE ILUSTRATIVAS
        </p>

        <!-- Área de FAQ -->
        <section id="faq-section" aria-labelledby="faq-section-title">
            <div id="faq-section__header">
                <h2 id="faq-section__title">Dúvidas Frequentes</h2>
            </div>
            <ul id="faq-section__list" role="list">
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> Para quais ocasiões o Havaianas Elegance Amaranto é
                                indicado? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O Havaianas Elegance Amaranto é indicado para momentos de
                                lazer, descanso e uso casual no dia a dia, sempre com um visual mais elegante. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O Havaianas Elegance Amaranto é confortável para
                                caminhar? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. A sola macia e flexível é feita em 100% borracha,
                                oferecendo conforto para os pés todos os dias. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O Havaianas Elegance Amaranto combina com quais ocasiões?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O modelo combina com lazer, passeios, descanso e produções
                                casuais que pedem conforto com aparência clássica e moderna. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> Quais são os diferenciais das tiras do Havaianas Elegance
                                Amaranto? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> As tiras são texturizadas, feitas em PVC mais grosso
                                e ajudam a entregar estabilidade, frescor e praticidade durante o uso. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> De que material é feita a sola do Havaianas Elegance Amaranto?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> A sola é produzida em 100% borracha, o que contribui para
                                maciez, flexibilidade, resistência e longa durabilidade. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O Havaianas Elegance Amaranto é um produto durável? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. A combinação de sola de borracha, tiras resistentes e
                                materiais de qualidade ajuda a manter o produto confortável e durável. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> Como limpar corretamente o Havaianas Elegance Amaranto?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Lave à mão com sabão neutro e escova macia. Se preferir, o
                                modelo também pode ser lavado na máquina de lavar roupa. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> Qual a forma correta de secar o chinelo após a lavagem? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Depois da limpeza, deixe o Havaianas Elegance Amaranto secar
                                em um local bem ventilado para manter o produto conservado. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O Havaianas Elegance Amaranto combina com quais estilos?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O tom amaranto combina com looks casuais, produções de lazer
                                e visuais que pedem um toque clássico com presença. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->
            </ul>
        </section>

    </div>
</div>`,
      css:  ``,
    },

        /*@@@@Col - variacao-15 */
    {
      id:   'variacao-15',
      name: 'Variação 15',
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
      css:  ``,
    },

  ]
});
