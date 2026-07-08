// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "variacao-19",
  name: "Variação 19",
  html: `<div class="lp-container">
    <meta charset="utf-8">
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
            padding: 0 1rem;
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
            transition: .2s;
        }

        .ll-carousel__dot:hover {
            background: var(--ll-carousel-dot-hover);
            border-color: var(--ll-carousel-dot-active-border);
            transform: translateY(-0.25rem);
            transition: .7s;
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
                padding: 0 .75rem;
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
                transition: .2s;
            }

            .ll-carousel__dot:hover {
                transform: none;
                transition: .7s;
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
                transition: .7s;
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

        /* ===== MELHORIAS ADICIONADAS ===== */

        /* 1. Fundo degradê do carrossel */

        /* 2. Imagem sem ratio fixo no media-card (slide 1 e 3) */
        .ll-carousel__media-card {
            aspect-ratio: unset !important;
            height: 100%;
            max-height: 82%;
        }

        .ll-carousel__media-card .ll-carousel__image {
            object-fit: cover;
            width: 100%;
            height: 100%;
            display: block;
        }

        /* 3. Nav sem background unificado — cada botão é individual */
        .ll-carousel__nav {
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
            box-shadow: none !important;
            gap: 0.5rem !important;
            margin-top: 0.75rem !important;
        }

        /* Cada botão: card branco individual */
        .ll-carousel__dot {
            border-radius: 0.75rem !important;
            border: 1.5px solid #e8e4dc !important;
            background: #fff !important;
            padding: 0.75rem 1rem !important;
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 0.5rem !important;
            min-height: unset !important;
            transition: background 0.25s, border-color 0.25s !important;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06) !important;
        }

        .ll-carousel__dot:hover {
            background: #fff9f2 !important;
            border-color: #f5c280 !important;
            transition: .7s;
        }

        .ll-carousel__dot-copy {
            display: flex;
            flex-direction: column;
            gap: 0.1rem;
            min-width: 0;
        }

        .ll-carousel__dot-number {
            color: #aaa !important;
            font-size: 0.7rem !important;
            font-weight: 700 !important;
            line-height: 1 !important;
        }

        .ll-carousel__dot-text {
            font-size: 0.875rem !important;
            font-weight: 700 !important;
            color: #17253f !important;
            line-height: 1.2 !important;
        }

        .ll-carousel__dot-icon {
            flex-shrink: 0;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: #f0ede8;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #17253f;
            transition: background 0.25s, color 0.25s;
        }

        /* Active state laranja */
        .ll-carousel__control--1:checked~.ll-carousel__nav .ll-carousel__dot--1,
        .ll-carousel__control--2:checked~.ll-carousel__nav .ll-carousel__dot--2,
        .ll-carousel__control--3:checked~.ll-carousel__nav .ll-carousel__dot--3,
        .ll-carousel__control--4:checked~.ll-carousel__nav .ll-carousel__dot--4 {
            background: #fff4e0 !important;
            border-color: #ee6911 !important;
        }

        .ll-carousel__control--1:checked~.ll-carousel__nav .ll-carousel__dot--1 .ll-carousel__dot-number,
        .ll-carousel__control--2:checked~.ll-carousel__nav .ll-carousel__dot--2 .ll-carousel__dot-number,
        .ll-carousel__control--3:checked~.ll-carousel__nav .ll-carousel__dot--3 .ll-carousel__dot-number,
        .ll-carousel__control--4:checked~.ll-carousel__nav .ll-carousel__dot--4 .ll-carousel__dot-number {
            color: #ee6911 !important;
        }

        .ll-carousel__control--1:checked~.ll-carousel__nav .ll-carousel__dot--1 .ll-carousel__dot-text,
        .ll-carousel__control--2:checked~.ll-carousel__nav .ll-carousel__dot--2 .ll-carousel__dot-text,
        .ll-carousel__control--3:checked~.ll-carousel__nav .ll-carousel__dot--3 .ll-carousel__dot-text,
        .ll-carousel__control--4:checked~.ll-carousel__nav .ll-carousel__dot--4 .ll-carousel__dot-text {
            color: #ee6911 !important;
        }

        .ll-carousel__control--1:checked~.ll-carousel__nav .ll-carousel__dot--1 .ll-carousel__dot-icon,
        .ll-carousel__control--2:checked~.ll-carousel__nav .ll-carousel__dot--2 .ll-carousel__dot-icon,
        .ll-carousel__control--3:checked~.ll-carousel__nav .ll-carousel__dot--3 .ll-carousel__dot-icon,
        .ll-carousel__control--4:checked~.ll-carousel__nav .ll-carousel__dot--4 .ll-carousel__dot-icon {
            background: #ee6911 !important;
            color: #fff !important;
        }

        /* Mobile: 2 colunas × 2 linhas */
        @media (max-width: 760px) {
            .ll-carousel__nav {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }

            .ll-carousel__dot-icon {
                width: 36px;
                height: 36px;
            }

            .ll-carousel__dot-icon svg {
                width: 18px;
                height: 18px;
            }
        }

        @container ll-carousel-container (max-width: 620px) {
            .ll-carousel__nav {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
        }

        /* 4. Bolinhas indicadoras dentro do viewport */
        .ll-carousel__viewport {
            position: relative;
        }

        .ll-carousel__track::after {
            content: '';
            position: absolute;
            bottom: 1rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 6px;
            z-index: 10;
            pointer-events: none;
        }

        /* Bolinhas via pseudo-elements nos panels */
        .ll-carousel__indicators {
            position: absolute;
            bottom: 1rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 7px;
            z-index: 20;
            pointer-events: none;
        }

        .ll-carousel__indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transition: background 0.3s, width 0.3s;
            display: block;
        }

        .ll-carousel__control--1:checked~.ll-carousel__viewport .ll-carousel__indicator--1,
        .ll-carousel__control--2:checked~.ll-carousel__viewport .ll-carousel__indicator--2,
        .ll-carousel__control--3:checked~.ll-carousel__viewport .ll-carousel__indicator--3,
        .ll-carousel__control--4:checked~.ll-carousel__viewport .ll-carousel__indicator--4 {
            background: #fff;
            width: 20px;
            border-radius: 4px;
        }

        @media (min-width: 760px) {
            #move-llcosseawd {
                left: 2%;
                top: 53%;
            }
        }

        @media (min-width: 760px) {
            #move-llcosseawd2 {
                left: 11%;
                top: 43%;
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
    <article aria-labelledby="product-main-title" class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->
        <section aria-label="Cabeçalho do produto" class="section-2-2">
            <header class="section-2-2__banner">
                <div class="section-2-2__banner-container">
                    <video aria-hidden="true" autoplay="" class="section-2-2__banner-video" loop="" muted=""
                        playsinline=""
                        poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-coala.webp"
                        preload="none">
                        <source src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-coala.webm">
                    </video>
                </div>
                <div aria-label="Logo da Coala" class="section-2-2__badge" role="img">
                    <img alt="Logo da Coala" class="section-2-2__badge-img"
                        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/coala/logo-coala.png">
                </div>
            </header>
            <article class="section-2-2__body">
                <small class="section-2-2__brand">── coala ──</small>
                <h2 class="section-2-2__title">Amaciante Coala Sol do Brasil 1L <strong>Maciez intensa e perfume
                        marcante</strong></h2>
                <p class="section-2-2__subtitle">Amaciante de roupas concentrado com fórmula premium. Amacia
                    profundamente os tecidos, deixa fragrância intensa e rende até 50 lavagens.
                </p>
            </article>
        </section>
        <section aria-label="Diferenciais do Amaciante Coala Concentrado Sol do Brasil 12x1L" class="ll-carousel"
            style="background-image: linear-gradient(180deg, #ffffff, #fff4e0);">
            <div class="ll-carousel__container">
                <div class="ll-carousel__intro">
                </div>
                <input checked="" class="ll-carousel__control ll-carousel__control--1" id="ll-carousel-slide-1"
                    name="ll-carousel-active" type="radio">
                <input class="ll-carousel__control ll-carousel__control--2" id="ll-carousel-slide-2"
                    name="ll-carousel-active" type="radio">
                <input class="ll-carousel__control ll-carousel__control--3" id="ll-carousel-slide-3"
                    name="ll-carousel-active" type="radio">
                <input class="ll-carousel__control ll-carousel__control--4" id="ll-carousel-slide-4"
                    name="ll-carousel-active" type="radio">
                <div class="ll-carousel__viewport">
                    <div class="ll-carousel__indicators">
                        <span class="ll-carousel__indicator ll-carousel__indicator--1"></span>
                        <span class="ll-carousel__indicator ll-carousel__indicator--2"></span>
                        <span class="ll-carousel__indicator ll-carousel__indicator--3"></span>
                        <span class="ll-carousel__indicator ll-carousel__indicator--4"></span>
                    </div>
                    <div class="ll-carousel__track">
                        <article aria-label="Slide 1: Impacto" class="ll-carousel__panel ll-carousel__panel--1"
                            id="ll-carousel-panel-1">
                            <section aria-label="Maciez e perfume para as roupas"
                                class="ll-carousel__layout ll-carousel__layout--impact"
                                style="--ll-carousel-impact-bg: #ee6911e1; --ll-carousel-impact-text: #fffdf8; --ll-carousel-impact-muted: rgba(255, 253, 248, 0.84); background-image: linear-gradient(323deg, #495330, #607037);">
                                <div class="ll-carousel__layout-copy">
                                    <p class="ll-carousel__layout-eyebrow">Perfume</p>
                                    <h3 class="ll-carousel__layout-title">Maciez intensa e perfume por mais tempo</h3>
                                    <p class="ll-carousel__layout-text">Fórmula concentrada que amacia profundamente os
                                        tecidos e envolve as roupas com fragrância vibrante, fresca e marcante.
                                    </p>
                                </div>
                                <figure class="ll-carousel__media-card">
                                    <img class="ll-carousel__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/amaciante-concentrado-coala-sol-do-brasil-roupas-varal-lifestyle-1704661-01.webp"
                                        alt="Amaciante Coala Concentrado Sol do Brasil 12x1L" width="1800" height="1600"
                                        style="object-position: 50% 50%;" loading="lazy" decoding="async">
                                </figure>
                            </section>
                        </article>
                        <article aria-label="Slide 2: Decisão" class="ll-carousel__panel ll-carousel__panel--2"
                            id="ll-carousel-panel-2">
                            <section aria-label="Rendimento concentrado"
                                class="ll-carousel__layout ll-carousel__layout--media"
                                style="--ll-carousel-media-bg: #ee6911e1; background-color: #ee6911e1; ">
                                <figure class="ll-carousel__figure">
                                    <img class="ll-carousel__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/amaciante-concentrado-coala-sol-do-brasil-embalagem-paisagem-rio-de-janeiro-1704661-02.webp"
                                        alt="Detalhe do Amaciante Coala Concentrado Sol do Brasil" width="1800"
                                        height="1600" style="object-position: 86% 50%;" loading="lazy" decoding="async">
                                    <figcaption class="ll-carousel__caption" id="move-llcosseawd2">
                                        <h3>Rende até <br>50 lavagens</h3>
                                        <p>Com rendimento inteligente, 1 litro equivale a 4 litros. Use meia tampa por
                                            lavagem, na máquina ou no último enxágue.</p>
                                    </figcaption>
                                </figure>
                            </section>
                        </article>
                        <article aria-label="Slide 3: Invertido" class="ll-carousel__panel ll-carousel__panel--3"
                            id="ll-carousel-panel-3">
                            <section aria-label="Ativos de fontes renováveis"
                                class="ll-carousel__layout ll-carousel__layout--impact ll-carousel__layout--impact-reverse"
                                style="--ll-carousel-impact-bg: #ee6911e1; --ll-carousel-impact-text: #fffdf8; --ll-carousel-impact-muted: rgba(255, 253, 248, 0.84); background-image: linear-gradient(323deg, #607037, #495330);">
                                <div class="ll-carousel__layout-copy">
                                    <p class="ll-carousel__layout-eyebrow">Cuidado premium</p>
                                    <h3 class="ll-carousel__layout-title">Ativos de fontes renováveis</h3>
                                    <p class="ll-carousel__layout-text">Produzido com ativos de fontes renováveis,
                                        fórmula biodegradável e não irritante, para mais bem-estar no cuidado das
                                        roupas.</p>
                                </div>
                                <figure class="ll-carousel__media-card">
                                    <img class="ll-carousel__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/amaciante-concentrado-coala-sol-do-brasil-maquina-lavar-movimento-1704661-03.webp"
                                        alt="Amaciante Coala Sol do Brasil em roupas no varal" width="1800"
                                        height="1600" style="object-position: 50% 50%;" loading="lazy" decoding="async">
                                </figure>
                            </section>
                        </article>
                        <article aria-label="Slide 4: Decisão" class="ll-carousel__panel ll-carousel__panel--4"
                            id="ll-carousel-panel-4">
                            <section aria-label="Modo de uso e conservação"
                                class="ll-carousel__layout ll-carousel__layout--media"
                                style="--ll-carousel-media-bg: #ee6911e1; background-color: #ee6911e1;">
                                <figure class="ll-carousel__figure">
                                    <img class="ll-carousel__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/amaciante-concentrado-coala-sol-do-brasil-embalagem-lavanderia-ambiente-1704661-04.webp"
                                        alt="Amaciante Coala Sol do Brasil em lavanderia" width="1800" height="1600"
                                        style="object-position: 50% 50%;" loading="lazy" decoding="async">
                                    <figcaption class="ll-carousel__caption" id="move-llcosseawd">
                                        <h3>Modo de uso <br>recomendado</h3>
                                        <p>Na máquina, aplique meia tampa no compartimento ou no último enxágue. No
                                            tanque, dilua em água limpa e deixe agir por 5 minutos.</p>
                                    </figcaption>
                                </figure>
                            </section>
                        </article>
                    </div>
                </div>
                <nav aria-label="Selecionar slide do carrossel" class="ll-carousel__nav"
                    style="grid-template-columns: repeat(4, minmax(0, 1fr));">
                    <label aria-controls="ll-carousel-panel-1" class="ll-carousel__dot ll-carousel__dot--1"
                        for="ll-carousel-slide-1" role="button">
                        <span class="ll-carousel__dot-copy">
                            <span class="ll-carousel__dot-number">01</span>
                            <span class="ll-carousel__dot-text">Maciez</span>
                        </span>
                        <span class="ll-carousel__dot-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22"
                                height="22" aria-hidden="true">
                                <path
                                    d="M20.393 5.879A5.5 5.5 0 0 0 12 4.376a5.5 5.5 0 0 0-8.393 1.503C2.195 7.823 2.5 10.5 4.5 12.5L12 20l7.5-7.5c2-2 2.305-4.677.893-6.621z">
                                </path>
                            </svg>
                        </span>
                    </label>
                    <label aria-controls="ll-carousel-panel-2" class="ll-carousel__dot ll-carousel__dot--2"
                        for="ll-carousel-slide-2" role="button">
                        <span class="ll-carousel__dot-copy">
                            <span class="ll-carousel__dot-number">02</span>
                            <span class="ll-carousel__dot-text">Rendimento</span>
                        </span>
                        <span class="ll-carousel__dot-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                                width="22" height="22" aria-hidden="true">
                                <path d="M9 2h6l1 4H8z"></path>
                                <path d="M8 6c0 8 8 8 8 14a4 4 0 0 1-8 0c0-6 8-6 8-14"></path>
                                <line x1="12" y1="10" x2="12" y2="14"></line>
                            </svg>
                        </span>
                    </label>
                    <label aria-controls="ll-carousel-panel-3" class="ll-carousel__dot ll-carousel__dot--3"
                        for="ll-carousel-slide-3" role="button">
                        <span class="ll-carousel__dot-copy">
                            <span class="ll-carousel__dot-number">03</span>
                            <span class="ll-carousel__dot-text">Perfume</span>
                        </span>
                        <span class="ll-carousel__dot-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                                width="22" height="22" aria-hidden="true">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path
                                    d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42">
                                </path>
                            </svg>
                        </span>
                    </label>
                    <label aria-controls="ll-carousel-panel-4" class="ll-carousel__dot ll-carousel__dot--4"
                        for="ll-carousel-slide-4" role="button">
                        <span class="ll-carousel__dot-copy">
                            <span class="ll-carousel__dot-number">04</span>
                            <span class="ll-carousel__dot-text">Modo de uso</span>
                        </span>
                        <span class="ll-carousel__dot-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                                width="22" height="22" aria-hidden="true">
                                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M2 9h3M19 9h3M2 15h3M19 15h3"></path>
                            </svg>
                        </span>
                    </label>
                </nav>
            </div>
        </section>
        <!-- ESSES CODIGOS ABAIXO VOCE NAO PRECISA MEXER!!! APENAS O HTML ACIMA-->
        <p style="color: #8a8a8a; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty;
            text-align: center; padding: 30px 0; background-color: #fff4e0;">
            IMAGENS MERAMENTE ILUSTRATIVAS
        </p>
        <!-- Área de FAQ -->
        <section aria-labelledby="faq-section__title" id="faq-section">
            <div id="faq-section__header">
                <h2 id="faq-section__title">Dúvidas Frequentes</h2>
            </div>
            <ul id="faq-section__list" role="list">
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Para que serve o Amaciante Coala Concentrado Sol do Brasil
                                12x1L? </h3>
                            <span aria-hidden="true" id="faq-section__icon"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O Amaciante Coala Concentrado Sol do Brasil 12x1L é indicado
                                para amaciar roupas, perfumar os tecidos e deixar a rotina de lavagem mais sofisticada,
                                com fragrância intensa e toque macio. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Quais são os principais benefícios do Amaciante Coala Sol do
                                Brasil? </h3>
                            <span aria-hidden="true" id="faq-section__icon"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Ele oferece extrema maciez, perfume por mais tempo, fórmula
                                concentrada com rendimento de até 50 lavagens e ativos de fontes renováveis. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Qual é o rendimento do Amaciante Coala Concentrado? </h3>
                            <span aria-hidden="true" id="faq-section__icon"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> A embalagem de 1L equivale a 4L de amaciante comum e rende até
                                50 lavagens, usando meia tampa por lavagem conforme a recomendação. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Como usar o Amaciante Coala Sol do Brasil na máquina ou no
                                tanque? </h3>
                            <span aria-hidden="true" id="faq-section__icon"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Na máquina, aplique meia tampa no compartimento indicado ou
                                dilua na água do último enxágue. No tanque, dilua meia tampa em água limpa e deixe as
                                roupas agirem por 5 minutos. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Quais cuidados devo ter ao usar o Amaciante Coala Concentrado?
                            </h3>
                            <span aria-hidden="true" id="faq-section__icon"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Mantenha fora do alcance de crianças e animais domésticos.
                                Evite contato com olhos e pele, não ingira, não reutilize a embalagem e armazene em
                                local fresco, seco, ventilado e protegido da luz e do calor. </p>
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
