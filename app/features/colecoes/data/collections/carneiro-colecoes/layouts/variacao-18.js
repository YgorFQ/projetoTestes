// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "variacao-18",
  name: "Variação 18",
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
        .ll-carousel {
            --ll-carousel-brand: #ff9900;
            --ll-carousel-ink: #17253f;
            --ll-carousel-muted: #61708a;
            --ll-carousel-soft: #f3f6fb;
            --ll-carousel-panel: #ffffff;
            --ll-carousel-line: #d7dfec;
            --ll-carousel-dot-hover: #edf2f9;
            --ll-carousel-dot-active: #e0e8f5;
            --ll-carousel-dot-active-border: #b8c7df;
            --ll-carousel-shadow: 0 1.5rem 3rem rgba(13, 35, 51, 0.12);
            background: var(--ll-carousel-soft);
            color: var(--ll-carousel-ink);
            font-family: Arial, Helvetica, sans-serif;
            overflow: hidden;
        }

        .ll-carousel__container {
            box-sizing: border-box;
            container-name: ll-carousel-container;
            container-type: inline-size;
            margin-inline: auto;
            padding: 2rem 1rem;
            width: 100%;
        }

        .ll-carousel__control {
            display: none;
        }

        .ll-carousel__intro {
            display: grid;
            gap: 1rem;
            justify-items: center;
            margin-block-end: 1.5rem;
            text-align: center;
        }

        .ll-carousel--hide-intro .ll-carousel__intro {
            display: none;
        }

        .ll-carousel__dot-number,
        .ll-carousel__dot-text,
        .ll-carousel__layout-eyebrow,
        .ll-carousel__layout-title,
        .ll-carousel__layout-text {
            letter-spacing: 0;
            overflow-wrap: anywhere;
        }


        .ll-carousel__viewport {
            aspect-ratio: 16 / 10;
            border: 1px solid var(--ll-carousel-line);
            border-radius: 1rem;
            box-shadow: var(--ll-carousel-shadow);
            box-sizing: border-box;
            isolation: isolate;
            margin-inline: auto;
            max-width: 100%;
            overflow: hidden;
            width: min(100%, 1280px);
        }

        .ll-carousel__track {
            display: grid;
            height: 100%;
            max-width: 100%;
            overflow: hidden;
            position: relative;
            width: 100%;
        }

        .ll-carousel__panel {
            background: var(--ll-carousel-panel);
            box-sizing: border-box;
            grid-area: 1 / 1;
            height: 100%;
            inset: 0;
            max-width: 100%;
            min-width: 0;
            opacity: 0;
            overflow: hidden;
            pointer-events: none;
            position: absolute;
            transform: translateX(100%);
            transition: transform 0.8s ease, opacity 0.4s ease;
            width: 100%;
            z-index: 1;
        }

        .ll-carousel__layout {
            box-sizing: border-box;
            height: 100%;
            max-height: 100%;
            overflow: hidden;
            width: 100%;
        }

        .ll-carousel__layout--impact {
            --ll-carousel-impact-bg: #173b74;
            --ll-carousel-impact-text: #fff7ef;
            --ll-carousel-impact-muted: rgba(255, 247, 239, 0.84);
            align-content: center;
            align-items: center;
            background: var(--ll-carousel-impact-bg);
            color: var(--ll-carousel-impact-text);
            display: grid;
            gap: clamp(1.5rem, 3vw, 3.5rem);
            grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
            grid-template-rows: minmax(0, 1fr);
            min-height: 0;
            padding: clamp(1.5rem, 3.4vw, 3.5rem);
        }

        .ll-carousel__layout--impact>* {
            min-height: 0;
            min-width: 0;
        }

        .ll-carousel__layout-copy {
            align-self: center;
            display: grid;
            gap: clamp(0.7rem, 1vw, 1.05rem);
            justify-self: start;
            max-height: 100%;
            max-width: min(43ch, 100%);
            min-width: 0;
        }

        .ll-carousel__layout-eyebrow {
            font-size: clamp(0.75rem, 0.7rem + 0.25vw, 0.95rem);
            font-weight: 800;
            margin: 0;
            text-transform: uppercase;
        }

        .ll-carousel__layout-title {
            font-size: clamp(2rem, 3.25vw, 4rem);
            font-weight: 800;
            line-height: 1.02;
            margin: 0;
            max-width: 100%;
            text-wrap: balance;
        }

        .ll-carousel__layout-text {
            color: var(--ll-carousel-impact-muted);
            font-size: clamp(0.95rem, 1vw, 1.12rem);
            line-height: 1.45;
            margin: 0;
            max-width: 100%;
        }

        .ll-carousel__media-card {
            aspect-ratio: 4 / 3;
            border-radius: 1.25rem;
            box-shadow: 0 1.5rem 3rem rgba(20, 32, 43, 0.22);
            margin-block: auto;
            max-height: 76%;
            max-width: min(100%, 38rem);
            overflow: hidden;
            place-self: center end;
            width: 100%;
        }

        .ll-carousel__layout--impact-reverse {
            grid-template-columns: minmax(0, 1.14fr) minmax(0, 0.86fr);
        }

        .ll-carousel__layout--impact-reverse .ll-carousel__layout-copy {
            grid-column: 2;
            grid-row: 1;
            justify-self: end;
            z-index: 10;
        }

        .ll-carousel__layout--impact-reverse .ll-carousel__media-card {
            grid-column: 1;
            grid-row: 1;
            place-self: center start;
        }

        .ll-carousel__image,
        .ll-carousel__picture,
        .ll-carousel__video {
            display: block;
            height: 100%;
            width: 100%;
        }

        .ll-carousel__image,
        .ll-carousel__video {
            object-fit: cover;
            object-position: center;
        }

        .ll-carousel__layout--media {
            background: var(--ll-carousel-media-bg, #101217);
            padding: 0;
        }

        .ll-carousel__figure {
            height: 100%;
            margin: 0;
            overflow: hidden;
            position: relative;
            width: 100%;
        }

        .ll-carousel__figure .ll-carousel__image,
        .ll-carousel__figure .ll-carousel__video {
            aspect-ratio: 16 / 10;
            object-fit: cover;
            object-position: center;
        }

        .ll-carousel__caption {
            align-items: flex-start;
            background: rgba(0, 0, 0, 0.48);
            border: 1px solid rgba(255, 255, 255, 0.22);
            border-radius: 1.25rem;
            box-shadow: 0 1.25rem 3rem rgba(0, 0, 0, 0.28);
            color: #fff;
            display: grid;
            gap: 0.65rem;
            left: clamp(1.25rem, 5vw, 4.75rem);
            max-width: min(42%, 34rem);
            padding: clamp(1rem, 2.5vw, 2rem);
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }

        .ll-carousel__caption h3 {
            font-size: clamp(1.35rem, 2.4vw, 3rem);
            line-height: 1.05;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .ll-carousel__caption p {
            font-size: clamp(0.85rem, 1.15vw, 1.15rem);
            line-height: 1.45;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .ll-carousel__nav {
            display: grid;
            gap: 0.5rem;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            margin: 1rem auto 0;
            max-width: 1280px;
            width: min(100%, 1280px);
        }

        .ll-carousel__dot {
            align-items: center;
            background: var(--ll-carousel-panel);
            border: 1px solid var(--ll-carousel-line);
            border-radius: 0.5rem;
            box-sizing: border-box;
            color: var(--ll-carousel-ink);
            cursor: pointer;
            display: grid;
            gap: 0.5rem;
            min-height: 4rem;
            padding: 1rem;
            transition: background 0.4s ease, border-color 0.4s ease, color 0.4s ease, transform 0.4s ease;
        }

        .ll-carousel__dot:hover {
            background: var(--ll-carousel-dot-hover);
            border-color: var(--ll-carousel-dot-active-border);
            transform: translateY(-0.25rem);
        }

        .ll-carousel__dot-number {
            color: var(--ll-carousel-brand);
            font-size: clamp(0.75rem, 0.72rem + 0.16vw, 0.875rem);
            font-weight: 700;
            line-height: 1;
        }

        .ll-carousel__dot-text {
            font-size: clamp(0.875rem, 0.84rem + 0.16vw, 1rem);
            font-weight: 700;
            line-height: 1.2;
        }

        .ll-carousel__control--1:checked~.ll-carousel__viewport .ll-carousel__panel--1,
        .ll-carousel__control--2:checked~.ll-carousel__viewport .ll-carousel__panel--2,
        .ll-carousel__control--3:checked~.ll-carousel__viewport .ll-carousel__panel--3,
        .ll-carousel__control--4:checked~.ll-carousel__viewport .ll-carousel__panel--4 {
            opacity: 1;
            pointer-events: auto;
            transform: translateX(0);
            z-index: 2;
        }

        .ll-carousel__control--2:checked~.ll-carousel__viewport .ll-carousel__panel--1,
        .ll-carousel__control--3:checked~.ll-carousel__viewport .ll-carousel__panel--1,
        .ll-carousel__control--3:checked~.ll-carousel__viewport .ll-carousel__panel--2,
        .ll-carousel__control--4:checked~.ll-carousel__viewport .ll-carousel__panel--1,
        .ll-carousel__control--4:checked~.ll-carousel__viewport .ll-carousel__panel--2,
        .ll-carousel__control--4:checked~.ll-carousel__viewport .ll-carousel__panel--3 {
            transform: translateX(-100%);
        }

        .ll-carousel__control--1:checked~.ll-carousel__nav .ll-carousel__dot--1,
        .ll-carousel__control--2:checked~.ll-carousel__nav .ll-carousel__dot--2,
        .ll-carousel__control--3:checked~.ll-carousel__nav .ll-carousel__dot--3,
        .ll-carousel__control--4:checked~.ll-carousel__nav .ll-carousel__dot--4 {
            background: var(--ll-carousel-dot-active);
            border-color: var(--ll-carousel-dot-active-border);
            color: var(--ll-carousel-ink);
        }

        @media (max-width: 760px) {
            .ll-carousel__container {
                padding: 1rem 0.75rem;
            }

            .ll-carousel__intro {
                gap: 0.65rem;
                margin-block-end: 1rem;
            }

            .ll-carousel__viewport {
                aspect-ratio: 4 / 5;
                border-radius: 0.95rem;
            }

            .ll-carousel__layout--impact {
                align-content: center;
                gap: 0.9rem;
                grid-template-columns: minmax(0, 1fr);
                grid-template-rows: auto minmax(0, 1fr);
                padding: 1rem;
            }

            .ll-carousel__layout--impact .ll-carousel__layout-copy {
                grid-column: 1;
                grid-row: 1;
                justify-self: stretch;
                max-width: none;
            }

            .ll-carousel__layout--impact .ll-carousel__media-card {
                grid-column: 1;
                grid-row: 2;
                place-self: center;
            }

            .ll-carousel__layout--impact-reverse .ll-carousel__layout-copy {
                grid-row: 2;
            }

            .ll-carousel__layout--impact-reverse .ll-carousel__media-card {
                grid-row: 1;
            }

            .ll-carousel__layout-title {
                font-size: clamp(1.3rem, 6vw, 1.85rem);
                line-height: 1.04;
            }

            .ll-carousel__layout-text {
                font-size: 0.8rem;
                line-height: 1.32;
            }

            .ll-carousel__media-card {
                border-radius: 0.8rem;
                max-height: 100%;
                max-width: 100%;
            }

            .ll-carousel__layout--media {
                background: #173b74;
                padding: 0.65rem;
            }

            .ll-carousel__figure {
                display: block;
                height: 100%;
            }

            .ll-carousel__figure .ll-carousel__picture,
            .ll-carousel__figure>.ll-carousel__video {
                background: #102b58;
                border-radius: 0.75rem;
                display: block;
                height: 100%;
                min-height: 0;
                overflow: hidden;
            }

            .ll-carousel__figure .ll-carousel__image,
            .ll-carousel__figure .ll-carousel__video {
                aspect-ratio: auto;
                height: 100%;
                object-fit: cover;
                object-position: center;
                width: 100%;
            }

            .ll-carousel__caption {
                background: rgba(0, 0, 0, 0.62);
                border-radius: 0.85rem;
                bottom: 0.72rem;
                left: 0.72rem;
                max-width: none;
                padding: 0.72rem;
                position: absolute;
                right: 0.72rem;
                top: auto;
                transform: none;
            }

            .ll-carousel__caption h3 {
                font-size: clamp(1.05rem, 5vw, 1.45rem);
            }

            .ll-carousel__caption p {
                font-size: 0.76rem;
                line-height: 1.3;
            }

            .ll-carousel__nav {
                gap: 0.35rem;
                margin-block-start: 0.65rem;
            }

            .ll-carousel__dot {
                border-radius: 0.55rem;
                gap: 0;
                justify-items: center;
                min-height: 3rem;
                padding: 0.55rem 0.42rem;
                text-align: center;
            }

            .ll-carousel__dot:hover {
                transform: none;
            }

            .ll-carousel__dot-number {
                display: none;
            }

            .ll-carousel__dot-text {
                font-size: 0.78rem;
                line-height: 1.05;
            }
        }

        @container ll-carousel-container (max-width: 620px) {
            .ll-carousel__viewport {
                aspect-ratio: 4 / 5;
                border-radius: 0.95rem;
            }

            .ll-carousel__layout--impact {
                align-content: center;
                gap: 0.9rem;
                grid-template-columns: minmax(0, 1fr);
                grid-template-rows: auto minmax(0, 1fr);
                padding: 1rem;
            }

            .ll-carousel__layout--impact .ll-carousel__layout-copy {
                grid-column: 1;
                grid-row: 1;
                justify-self: stretch;
                max-width: none;
            }

            .ll-carousel__layout--impact .ll-carousel__media-card {
                grid-column: 1;
                grid-row: 2;
                place-self: center;
            }

            .ll-carousel__layout--impact-reverse .ll-carousel__layout-copy {
                grid-row: 2;
            }

            .ll-carousel__layout--impact-reverse .ll-carousel__media-card {
                grid-row: 1;
            }

            .ll-carousel__layout-title {
                font-size: clamp(1.3rem, 7.5cqw, 1.85rem);
            }

            .ll-carousel__layout-text {
                font-size: 0.8rem;
                line-height: 1.32;
            }

            .ll-carousel__layout--media {
                background: #173b74;
                padding: 0.65rem;
            }

            .ll-carousel__figure {
                display: block;
                height: 100%;
            }

            .ll-carousel__figure .ll-carousel__picture,
            .ll-carousel__figure>.ll-carousel__video {
                background: #102b58;
                border-radius: 0.75rem;
                display: block;
                height: 100%;
                min-height: 0;
                overflow: hidden;
            }

            .ll-carousel__figure .ll-carousel__image,
            .ll-carousel__figure .ll-carousel__video {
                aspect-ratio: auto;
                height: 100%;
                object-fit: cover;
                object-position: center;
                width: 100%;
            }

            .ll-carousel__caption {
                background: rgba(0, 0, 0, 0.62);
                border-radius: 0.85rem;
                bottom: 0.72rem;
                left: 0.72rem;
                max-width: none;
                padding: 0.72rem;
                position: absolute;
                right: 0.72rem;
                top: auto;
                transform: none;
            }

            .ll-carousel__caption h3 {
                font-size: clamp(1.05rem, 5.5cqw, 1.45rem);
            }

            .ll-carousel__caption p {
                font-size: 0.76rem;
                line-height: 1.3;
            }

            .ll-carousel__nav {
                gap: 0.35rem;
                margin-block-start: 0.65rem;
            }

            .ll-carousel__dot {
                border-radius: 0.55rem;
                gap: 0;
                justify-items: center;
                min-height: 3rem;
                padding: 0.55rem 0.42rem;
                text-align: center;
            }

            .ll-carousel__dot:hover {
                transform: none;
            }

            .ll-carousel__dot-number {
                display: none;
            }

            .ll-carousel__dot-text {
                font-size: 0.78rem;
                line-height: 1.05;
            }
        }

        .ll-carousel {
            --ll-carousel-brand: #1d4f91;
            --ll-carousel-soft: #f3f6fb;
            --ll-carousel-dot-hover: #edf2f9;
            --ll-carousel-dot-active: #e0e8f5;
            --ll-carousel-dot-active-border: #b8c7df;
        }

        @media (min-width: 760px) {
            #move-llcosseawd {
                left: 2%;
                top: 53%;
            }
        }

        @media (min-width: 760px) {
            #move-llcosseawd2 {
                left: 47%;
                top: 53%;
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
            padding: calc(var(--badge-size) / 2 + 1.8rem) 0.3rem 12px;
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

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <article class="pdp" id="pdp" aria-labelledby="product-main-title"> <!-- HTML fica dentro dessa div PDP -->

        <section class="section-2-2" aria-label="Cabeçalho do produto">
            <header class="section-2-2__banner">
                <div class="section-2-2__banner-container">
                    <video class="section-2-2__banner-video"
                        poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-nivea.webp"
                        preload="none" autoplay="" muted="" loop="" playsinline="" aria-hidden="true">
                        <source src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-nivea.webm">
                    </video>
                </div>

                <div class="section-2-2__badge" role="img" aria-label="Logo da NIVEA">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/nivea/nivea-logo.png"
                        alt="Logo da NIVEA" class="section-2-2__badge-img">
                </div>
            </header>

            <article class="section-2-2__body">
                <small class="section-2-2__brand">── nivea ──</small>
                <h2 class="section-2-2__title">
                    Desodorante Derma Control Defende <strong>Proteção intensa com cuidado para as axilas</strong>
                </h2>
                <p class="section-2-2__subtitle">
                    Antitranspirante stick feminino com proteção de até 72 horas, ácido hialurônico puro e pró-vitamina
                    B5. Fórmula sem álcool etílico, desenvolvida para proporcionar conforto até após a depilação.
                </p>
            </article>
        </section>

        <section class="ll-carousel" aria-label="Diferenciais do NIVEA Derma Control Defende"
            style="background-image: linear-gradient(180deg, #ffffff, #edf3fb);">
            <div class="ll-carousel__container">
                <div class="ll-carousel__intro">
                </div>

                <input class="ll-carousel__control ll-carousel__control--1" type="radio" name="ll-carousel-active"
                    id="ll-carousel-slide-1" checked="">
                <input class="ll-carousel__control ll-carousel__control--2" type="radio" name="ll-carousel-active"
                    id="ll-carousel-slide-2">
                <input class="ll-carousel__control ll-carousel__control--3" type="radio" name="ll-carousel-active"
                    id="ll-carousel-slide-3">
                <input class="ll-carousel__control ll-carousel__control--4" type="radio" name="ll-carousel-active"
                    id="ll-carousel-slide-4">

                <div class="ll-carousel__viewport">
                    <div class="ll-carousel__track">
                        <article class="ll-carousel__panel ll-carousel__panel--1" id="ll-carousel-panel-1"
                            aria-label="Slide 1: Impacto">
                            <section class="ll-carousel__layout ll-carousel__layout--impact"
                                style="--ll-carousel-impact-bg: #173f7a; --ll-carousel-impact-text: #fffdf8; --ll-carousel-impact-muted: rgba(255, 253, 248, 0.84);"
                                aria-label="Proteção antitranspirante">
                                <div class="ll-carousel__layout-copy">
                                    <p class="ll-carousel__layout-eyebrow">Proteção prolongada</p>
                                    <h3 class="ll-carousel__layout-title">Até 72 horas contra suor e mau odor</h3>
                                    <p class="ll-carousel__layout-text">Proteção antitranspirante intensa para enfrentar
                                        a rotina com sensação de conforto e segurança.</p>
                                </div>
                                <figure class="ll-carousel__media-card">
                                    <img class="ll-carousel__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/desodorante-nivea-derma-control-defende-stick-54g-mao-ceu-208131-01.webp"
                                        alt="Desodorante Stick NIVEA Derma Control Defende 54g" width="1800"
                                        height="1600" style="object-position: 50% 50%;" loading="lazy" decoding="async">
                                </figure>
                            </section>
                        </article>

                        <article class="ll-carousel__panel ll-carousel__panel--2" id="ll-carousel-panel-2"
                            aria-label="Slide 2: Decisão">
                            <section class="ll-carousel__layout ll-carousel__layout--media"
                                style="--ll-carousel-media-bg: #17457f; background-color: #547eb6;"
                                aria-label="Cuidado da pele">
                                <figure class="ll-carousel__figure">
                                    <img class="ll-carousel__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/desodorante-nivea-derma-control-defende-stick-54g-agua-produto-208131-02.webp"
                                        alt="Detalhe do NIVEA Derma Control Defende com ativos de cuidado" width="1800"
                                        height="1600" style="object-position: 4% 50%;" loading="lazy" decoding="async">
                                    <figcaption class="ll-carousel__caption" id="move-llcosseawd2">
                                        <h3>Cuidado com ácido <br> hialurônico e B5</h3>
                                        <p>A fórmula combina ácido hialurônico puro e pró-vitamina B5 para ajudar no
                                            conforto e cuidado da pele das axilas.</p>
                                    </figcaption>
                                </figure>
                            </section>
                        </article>

                        <article class="ll-carousel__panel ll-carousel__panel--3" id="ll-carousel-panel-3"
                            aria-label="Slide 3: Invertido">
                            <section
                                class="ll-carousel__layout ll-carousel__layout--impact ll-carousel__layout--impact-reverse"
                                style="--ll-carousel-impact-bg: #426a9f; --ll-carousel-impact-text: #fffdf8; --ll-carousel-impact-muted: rgba(255, 253, 248, 0.84);"
                                aria-label="Pele sensível">
                                <div class="ll-carousel__layout-copy">
                                    <p class="ll-carousel__layout-eyebrow">Conforto pós-depilação</p>
                                    <h3 class="ll-carousel__layout-title">Suavidade para axilas sensíveis</h3>
                                    <p class="ll-carousel__layout-text">Sem álcool etílico e dermatologicamente testada,
                                        a fórmula ajuda a evitar irritação e coceira, inclusive após a depilação.
                                    </p>
                                </div>
                                <figure class="ll-carousel__media-card">
                                    <img class="ll-carousel__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/desodorante-nivea-derma-control-defende-stick-54g-axila-lifestyle-208131-03.webp"
                                        alt="NIVEA Derma Control Defende para cuidado das axilas sensíveis" width="1800"
                                        height="1600" style="object-position: 50% 50%;" loading="lazy" decoding="async">
                                </figure>
                            </section>
                        </article>

                        <article class="ll-carousel__panel ll-carousel__panel--4" id="ll-carousel-panel-4"
                            aria-label="Slide 4: Decisão">
                            <section class="ll-carousel__layout ll-carousel__layout--media"
                                style="--ll-carousel-media-bg: #244e86; background-color: #7194c2;"
                                aria-label="Aplicação">
                                <figure class="ll-carousel__figure">
                                    <img class="ll-carousel__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/desodorante-nivea-derma-control-defende-stick-54g-aplicacao-axila-208131-04.webp"
                                        alt="Desodorante NIVEA em formato stick para aplicação nas axilas" width="1800"
                                        height="1600" style="object-position: 50% 50%;" loading="lazy" decoding="async">
                                    <figcaption class="ll-carousel__caption" id="move-llcosseawd">
                                        <h3>Stick prático para a rotina</h3>
                                        <p>Aplique diretamente nas axilas e espere secar antes de se vestir. Não use
                                            sobre a pele irritada ou lesionada.</p>
                                    </figcaption>
                                </figure>
                            </section>
                        </article>
                    </div>
                </div>

                <nav class="ll-carousel__nav" style="grid-template-columns: repeat(4, minmax(0, 1fr));"
                    aria-label="Selecionar slide do carrossel">
                    <label class="ll-carousel__dot ll-carousel__dot--1" for="ll-carousel-slide-1" role="button"
                        aria-controls="ll-carousel-panel-1">
                        <span class="ll-carousel__dot-number">01</span>
                        <span class="ll-carousel__dot-text">72h</span>
                    </label>
                    <label class="ll-carousel__dot ll-carousel__dot--2" for="ll-carousel-slide-2" role="button"
                        aria-controls="ll-carousel-panel-2">
                        <span class="ll-carousel__dot-number">02</span>
                        <span class="ll-carousel__dot-text">Ativos</span>
                    </label>
                    <label class="ll-carousel__dot ll-carousel__dot--3" for="ll-carousel-slide-3" role="button"
                        aria-controls="ll-carousel-panel-3">
                        <span class="ll-carousel__dot-number">03</span>
                        <span class="ll-carousel__dot-text">Suavidade</span>
                    </label>
                    <label class="ll-carousel__dot ll-carousel__dot--4" for="ll-carousel-slide-4" role="button"
                        aria-controls="ll-carousel-panel-4">
                        <span class="ll-carousel__dot-number">04</span>
                        <span class="ll-carousel__dot-text">Aplicação</span>
                    </label>
                </nav>
            </div>
        </section>

        <!-- ESSES CODIGOS ABAIXO VOCE NAO PRECISA MEXER!!! APENAS O HTML ACIMA-->

        <p style="color: #8a8a8a; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty;
            text-align: center; padding: 30px 0; background-color: #edf3fb;">
            IMAGENS MERAMENTE ILUSTRATIVAS
        </p>

        <!-- Área de FAQ -->
        <section id="faq-section" aria-labelledby="faq-section__title">
            <div id="faq-section__header">
                <h2 id="faq-section__title">Dúvidas Frequentes</h2>
            </div>
            <ul id="faq-section__list" role="list">
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Por quanto tempo o NIVEA Derma Control Defende protege? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O antitranspirante oferece proteção de até 72 horas contra o
                                suor e o mau odor. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Quais ativos de cuidado estão presentes na fórmula? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> A fórmula contém ácido hialurônico puro e pró-vitamina B5,
                                ativos associados ao cuidado, conforto e maciez da pele das axilas. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Pode ser usado após a depilação? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> A fórmula foi desenvolvida para pele sensível pós-depilação e
                                ajuda a evitar irritações e coceira. Não aplique se a pele estiver irritada ou
                                lesionada.
                            </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> O produto contém álcool etílico? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Não. O NIVEA Derma Control Defende possui fórmula sem álcool
                                etílico e é dermatologicamente testado. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Como aplicar o desodorante stick? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Aplique diretamente nas axilas e espere o produto secar antes
                                de se vestir. Caso ocorra irritação ou coceira, suspenda o uso e procure orientação
                                médica. </p>
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
