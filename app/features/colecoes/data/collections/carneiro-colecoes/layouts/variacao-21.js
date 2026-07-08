// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "variacao-21",
  name: "Variação 21",
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
            color: #d4af37;
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
            --pos-x: 10%;
            --color-title: #f2cf57;
            --bg-box: rgba(0, 0, 0, 0.33);

            width: 100%;
            position: relative;

            overflow: hidden;
            background-color: #eef4fb;
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
                padding: 12px 20px 12px 20px;
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
                margin: 1rem auto;
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
            padding: calc(var(--badge-size) / 2 + 1rem) 1rem 1rem !important;
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
        :root {
            --s2-color-bg: #163a70;
            --s2-color-text: #F5EFE6;
            --s2-color-accent: #d4af37;
        }

        .section-2 {
            background-color: var(--s2-color-bg);
            padding: 2rem 1rem;
        }

        .section-2__container {
            width: 100%;
        }

        .section-2__content {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .section-2__image-block {
            width: 100%;
            aspect-ratio: 16/9;
            border-radius: 8px;
            overflow: hidden;
        }

        .section-2__image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .section-2__text-block {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .section-2__title {
            font-size: clamp(1.5rem, 4vw, 2.25rem);
            color: var(--s2-color-text);
            margin: 0;
        }

        .section-2__divider {
            width: 3rem;
            height: 2px;
            background-color: var(--s2-color-accent);
            border: none;
            margin: 0;
        }

        .section-2__paragraph {
            font-size: clamp(0.875rem, 2vw, 1rem);
            color: var(--s2-color-text);
            line-height: 1.7;
            margin: 0;
            opacity: 0.9;
        }

        @media (min-width: 768px) {
            .section-2__container {
                max-width: 768px;
                margin: 0 auto;
            }

            .section-2__content {
                flex-direction: row;
                align-items: center;
                gap: 2.5rem;
            }

            .section-2__image-block {
                flex: 0 0 42%;
                aspect-ratio: 4/3;
            }

            .section-2__text-block {
                flex: 1;
            }
        }

        @media (min-width: 992px) {
            .section-2 {
                padding: 3rem 1.5rem;
            }

            .section-2__container {
                max-width: 992px;
            }
        }

        @media (min-width: 1200px) {
            .section-2__container {
                max-width: 1200px;
            }
        }

        @media (min-width: 1400px) {
            .section-2__container {
                max-width: 1400px;
            }
        }
    </style>

    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .section-24 {
            --s24-color-brand: #d4af37;
            --s24-color-ink: #202124;
            --s24-color-muted: #667c96;
            --s24-color-soft: #f3f8ff;
            --s24-color-surface: #ffffff;
            --s24-color-line: #d7e3f3;
            --s24-color-brand-soft: #ecf3fb;
            --s24-color-brand-strong: #b38a2e;
            width: 100%;
            margin: 0;
            padding: 2rem 1rem;
            color: var(--s24-color-ink);
            background: var(--s24-color-soft);
        }

        .section-24,
        .section-24__input,
        .section-24__container,
        .section-24__content,
        .section-24__options,
        .section-24__button,
        .section-24__visual,
        .section-24__frame,
        .section-24__panel,
        .section-24__image,
        .section-24__caption,
        .section-24__message {
            box-sizing: border-box;
        }

        .section-24__input {
            position: absolute;
            width: 1px;
            height: 1px;
            opacity: 0;
            pointer-events: none;
        }

        .section-24__container {
            width: 100%;
            display: grid;
            gap: 1.5rem;
            align-items: start;
        }

        .section-24__content {
            width: 100%;
            display: grid;
            gap: 1rem;
            align-items: start;
        }

        .section-24__button-title,
        .section-24__button-text,
        .section-24__message {
            margin: 0;
            min-width: 0;
            overflow-wrap: anywhere;
        }

        .section-24__options {
            width: 100%;
            display: grid;
            gap: 1rem;
            align-items: start;
            margin-top: 0.5rem;
        }

        .section-24__button {
            position: relative;
            width: 100%;
            display: grid;
            gap: 0.5rem;
            align-items: start;
            padding: 1rem;
            border: 1px solid var(--s24-color-line);
            border-radius: 0.5rem;
            color: var(--s24-color-ink);
            background: var(--s24-color-surface);
            cursor: pointer;
            overflow: hidden;
            transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease, transform 180ms ease;
        }

        .section-24__button::before {
            position: absolute;
            top: 0.5rem;
            bottom: 0.5rem;
            left: 0;
            width: 0.25rem;
            border-radius: 0 0.5rem 0.5rem 0;
            background: var(--s24-color-brand);
            content: "";
            opacity: 0;
            transform: scaleY(0.4);
            transform-origin: center;
            transition: opacity 180ms ease, transform 180ms ease;
        }

        .section-24__button:hover {
            border-color: var(--s24-color-brand);
            box-shadow: 0 0.5rem 1.5rem rgba(32, 33, 36, 0.1);
            transform: translateY(-0.125rem);
        }

        .section-24__button:active {
            transform: scale(0.99);
        }

        .section-24__button-title {
            position: relative;
            z-index: 1;
            font-size: clamp(1rem, 2.7vw, 1.1875rem);
            font-weight: 800;
            line-height: 1.25;
            transition: color 180ms ease;
        }

        .section-24__button-text {
            position: relative;
            z-index: 1;
            color: var(--s24-color-muted);
            font-size: clamp(0.875rem, 2.3vw, 1rem);
            line-height: 1.45;
        }

        .section-24__visual {
            width: 100%;
            margin: 0;
            display: grid;
            gap: 1rem;
            align-items: start;
        }

        .section-24__frame {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 9;
            overflow: hidden;
            border: 1px solid var(--s24-color-line);
            border-radius: 0.5rem;
            background: var(--s24-color-surface);
            box-shadow: 0 1rem 2rem rgba(32, 33, 36, 0.08);
        }

        .section-24__panel {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            pointer-events: none;
            transform: translateY(0.5rem);
            transition: opacity 220ms ease, transform 220ms ease;
        }

        .section-24__image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: saturate(0.92);
            transform: scale(1.04);
            transition: filter 420ms ease, transform 420ms ease;
        }

        .section-24__caption {
            position: relative;
            min-height: 4rem;
            padding: 1rem;
            border-left: 0.25rem solid var(--s24-color-brand);
            border-radius: 0.5rem;
            color: var(--s24-color-ink);
            background: var(--s24-color-surface);
            box-shadow: 0 0.5rem 1rem rgba(32, 33, 36, 0.06);
        }

        .section-24__message {
            position: absolute;
            inset: 1rem;
            color: var(--s24-color-ink);
            font-size: clamp(0.875rem, 2.2vw, 1rem);
            font-weight: 700;
            line-height: 1.4;
            opacity: 0;
            transform: translateY(0.5rem);
            transition: opacity 180ms ease, transform 180ms ease;
        }

        #section-24-view-1:checked~.section-24__container .section-24__panel--one,
        #section-24-view-2:checked~.section-24__container .section-24__panel--two,
        #section-24-view-3:checked~.section-24__container .section-24__panel--three {
            z-index: 2;
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
        }

        #section-24-view-1:checked~.section-24__container .section-24__panel--one .section-24__image,
        #section-24-view-2:checked~.section-24__container .section-24__panel--two .section-24__image,
        #section-24-view-3:checked~.section-24__container .section-24__panel--three .section-24__image {
            filter: saturate(1);
            transform: scale(1);
        }

        #section-24-view-1:checked~.section-24__container .section-24__message--one,
        #section-24-view-2:checked~.section-24__container .section-24__message--two,
        #section-24-view-3:checked~.section-24__container .section-24__message--three {
            opacity: 1;
            transform: translateY(0);
        }

        #section-24-view-1:checked~.section-24__container .section-24__button--one,
        #section-24-view-2:checked~.section-24__container .section-24__button--two,
        #section-24-view-3:checked~.section-24__container .section-24__button--three {
            border-color: var(--s24-color-brand);
            background: var(--s24-color-brand-soft);
            box-shadow: 0 0.5rem 1.5rem rgba(32, 33, 36, 0.12), inset 0 0 0 2px var(--s24-color-brand);
            transform: translateY(-0.125rem);
        }

        #section-24-view-1:checked~.section-24__container .section-24__button--one::before,
        #section-24-view-2:checked~.section-24__container .section-24__button--two::before,
        #section-24-view-3:checked~.section-24__container .section-24__button--three::before {
            opacity: 1;
            transform: scaleY(1);
        }

        #section-24-view-1:checked~.section-24__container .section-24__button--one .section-24__button-title,
        #section-24-view-2:checked~.section-24__container .section-24__button--two .section-24__button-title,
        #section-24-view-3:checked~.section-24__container .section-24__button--three .section-24__button-title {
            color: var(--s24-color-brand-strong);
        }

        #section-24-view-1:focus-visible~.section-24__container .section-24__button--one,
        #section-24-view-2:focus-visible~.section-24__container .section-24__button--two,
        #section-24-view-3:focus-visible~.section-24__container .section-24__button--three {
            outline: 2px solid var(--s24-color-brand);
            outline-offset: 4px;
        }

        @media (min-width: 576px) {

            .section-24__container {
                gap: 2rem;
            }
        }

        @media (min-width: 768px) {

            .section-24__container {
                grid-template-columns: minmax(0, 1fr);
                gap: .5rem;
            }

            .section-24__content {
                order: 2;
            }

            .section-24__visual {
                order: 1;
            }

            .section-24__options {
                grid-template-columns: repeat(3, minmax(0, 1fr));
            }

            .section-24__button-title {
                font-size: clamp(0.875rem, 1.8vw, 1rem);
            }

            .section-24__button-text {
                font-size: clamp(0.75rem, 1.6vw, 0.875rem);
            }

            .section-24__frame {
                aspect-ratio: 16 / 9;
            }
        }

        @media (min-width: 992px) {

            .section-24__container {
                grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
                gap: 3rem;
            }

            .section-24__content {
                order: 1;
                align-self: center;
            }

            .section-24__visual {
                order: 2;
            }

            .section-24--reverse .section-24__content {
                order: 2;
            }

            .section-24--reverse .section-24__visual {
                order: 1;
            }

            .section-24__options {
                grid-template-columns: minmax(0, 1fr);
            }

            .section-24__button {
                padding: 1.5rem;
            }

            .section-24__button-title {
                font-size: clamp(1rem, 2.7vw, 1.1875rem);
            }

            .section-24__button-text {
                font-size: clamp(0.875rem, 2.3vw, 1rem);
            }
        }

        @media (min-width: 1200px) {
            .section-24__container {
                gap: 3rem;
            }

            .section-24__frame {
                aspect-ratio: 16 / 9;
            }
        }
    </style>


    <style>
        /* ===== MELHORIAS VISUAIS — DOMECQ / CONTEÚDO RICO ===== */
        .pdp {
            --dcq-burgundy: #163a70;
            --dcq-burgundy-dark: #102b58;
            --dcq-burgundy-soft: #245ea8;
            --dcq-gold: #d4af37;
            --dcq-gold-strong: #d4af37;
            --dcq-cream: #eef4fb;
            --dcq-cream-2: #e6eef8;
            --dcq-ink: #112f54;
            --dcq-muted: #627b99;
            --dcq-line: rgba(92, 26, 34, 0.14);
            background: linear-gradient(180deg, #f7fbff 0%, #eef4fb 45%, #fff 100%);
            color: var(--dcq-ink);
            overflow: hidden;
        }

        .product-header-2 {
            background: #f7fbff;
        }

        .product-header__banner-2::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(17, 7, 5, 0.12), rgba(17, 7, 5, 0.38));
            pointer-events: none;
        }

        .product-header__banner-img-2 {
            filter: saturate(1.06) contrast(1.05);
            transform: scale(1.02);
        }

        .product-header__body-2 {
            width: 100%;
            padding: calc(var(--badge-size) / 2 + 2rem) 1rem 3.25rem;
            background:
                radial-gradient(circle at 50% 0%, rgba(200, 169, 110, 0.16), transparent 34%),
                linear-gradient(180deg, #fffdf8 0%, #edf4fc 100%);
        }

        .product-header__brand-2 {
            color: var(--dcq-gold-strong);
            font-size: 0.72rem;
            letter-spacing: 0.22em;
        }

        .product-header__title-2 {
            color: var(--dcq-ink);
            font-weight: 500;
            letter-spacing: -0.035em;
        }

        .product-header__subtitle-2 {
            color: var(--dcq-muted);
            max-width: 44rem;
            line-height: 1.7;
        }

        .section-6 {
            padding: 0 clamp(1rem, 2.5vw, 2rem) clamp(1.5rem, 3vw, 2.5rem);
            background:
                linear-gradient(180deg, #edf4fc 0%, #eef4fb 55%, #163a70 55%, #163a70 100%);
        }

        .section-6 picture {
            display: block;
            max-width: 1400px;
            margin: 0 auto;
            overflow: hidden;
            border-radius: clamp(18px, 2.4vw, 30px);
            box-shadow: 0 26px 70px rgba(52, 16, 22, 0.28);
            border: 1px solid rgba(255, 255, 255, 0.36);
        }

        .section-6__image {
            height: clamp(360px, 43vw, 650px);
            object-fit: cover;
            object-position: center;
            filter: saturate(1.06) contrast(1.03);
        }

        .section-6__content {
            left: max(calc((100% - 1400px) / 2 + 7rem), 52%);
            max-width: min(36rem, 38%);
            padding: clamp(1.25rem, 3vw, 3rem);
            border: 1px solid rgba(200, 169, 110, 0.58);
            border-radius: clamp(16px, 2vw, 24px);
            box-shadow: 0 22px 48px rgba(25, 8, 11, 0.36);
            backdrop-filter: blur(10px);
        }

        .section-6__content::before {
            content: "";
            display: block;
            width: 3rem;
            height: 3rem;
            margin-bottom: 1.1rem;
            border: 1px solid rgba(255, 225, 120, 0.62);
            border-radius: 999px;
            background:
                radial-gradient(circle at 50% 25%, rgba(255, 225, 120, 0.95) 0 4px, transparent 4.5px),
                radial-gradient(circle at 35% 45%, rgba(255, 225, 120, 0.85) 0 4px, transparent 4.5px),
                radial-gradient(circle at 65% 45%, rgba(255, 225, 120, 0.85) 0 4px, transparent 4.5px),
                radial-gradient(circle at 50% 65%, rgba(255, 225, 120, 0.85) 0 4px, transparent 4.5px);
        }

        .section-6__title {
            font-size: clamp(1.8rem, 3.35vw, 3.25rem);
            color: #f5d56a;
            line-height: 1.05;
            letter-spacing: -0.04em;
            text-shadow: 0 2px 16px rgba(0, 0, 0, 0.32);
        }

        .section-6__description {
            font-size: clamp(1rem, 1.35vw, 1.18rem);
            line-height: 1.6;
            margin-top: 1rem;
            margin-bottom: 0;
            color: rgba(255, 255, 255, 0.94);
        }

        .section-2 {
            padding: clamp(1.5rem, 3vw, 3.5rem) clamp(1rem, 2.5vw, 2rem);
            background: linear-gradient(180deg, #163a70 0%, #1d4f91 100%);
        }

        .section-2__container {
            max-width: 1400px !important;
        }

        .section-2__content {
            gap: clamp(1.5rem, 4vw, 4rem);
            padding: clamp(1rem, 2.3vw, 2rem);
            border-radius: clamp(18px, 2.2vw, 28px);
            background: radial-gradient(circle at 100% 20%, rgba(200, 169, 110, 0.15), transparent 32%), linear-gradient(135deg, #8B5E1F, #cca34e);
            border: 1px solid rgba(200, 169, 110, 0.18);
            box-shadow: 0 24px 60px rgba(25, 8, 11, 0.2);
        }

        .section-2__image-block {
            border-radius: clamp(14px, 1.8vw, 22px);
            box-shadow: 0 18px 40px rgba(18, 7, 5, 0.28);
            border: 1px solid rgba(255, 255, 255, 0.14);
        }

        .section-2__image {
            filter: saturate(1.05) contrast(1.04);
            transform: scale(1.01);
        }

        .section-2__title {
            color: #f5d56a;
            font-weight: 700;
            line-height: 1.08;
            letter-spacing: -0.035em;
        }

        .section-2__divider {
            width: 4.5rem;
            height: 3px;
            border-radius: 999px;
            background: linear-gradient(90deg, var(--dcq-gold), rgba(200, 169, 110, 0));
        }

        .section-2__paragraph {
            max-width: 42rem;
            color: rgba(255, 246, 237, 0.92);
        }

        .section-24 {
            padding: clamp(2rem, 4vw, 4rem) clamp(1rem, 2.5vw, 2rem) !important;
            background:
                radial-gradient(circle at 20% 0%, rgba(200, 169, 110, 0.22), transparent 28%),
                linear-gradient(180deg, #eef4fb 0%, #e6eef8 100%) !important;
        }

        .section-24__container {
            max-width: 1400px;
            margin: 0 auto;
            padding: clamp(1rem, 2vw, 2rem);
            border-radius: clamp(18px, 2.2vw, 28px);
            background: rgba(255, 255, 255, 0.76);
            border: 1px solid rgba(92, 26, 34, 0.10);
            box-shadow: 0 24px 70px rgba(92, 26, 34, 0.12);
            backdrop-filter: blur(6px);
        }

        .section-24__options {
            gap: 0.85rem;
        }

        .section-24__button {
            grid-template-columns: 3.25rem minmax(0, 1fr);
            grid-template-areas:
                "icon title"
                "icon text";
            column-gap: 0.9rem;
            row-gap: 0.2rem;
            align-items: center;
            min-height: 5.35rem;
            padding: 1rem 1.1rem;
            border-radius: 15px;
            border-color: rgba(92, 26, 34, 0.12);
            background: linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%);
            box-shadow: 0 10px 24px rgba(52, 16, 22, 0.06);
        }

        .section-24__button::before {
            top: 0.75rem;
            bottom: 0.75rem;
            width: 0.3rem;
            background: linear-gradient(180deg, #d4af37, #d4af37);
        }

        .section-24__button::after {
            content: "";
            grid-area: icon;
            width: 3rem;
            height: 3rem;
            border-radius: 14px;
            border: 1px solid rgba(200, 169, 110, 0.32);
            background:
                radial-gradient(circle at 50% 50%, rgba(217, 149, 28, 0.45) 0 4px, transparent 4.5px),
                linear-gradient(145deg, #edf4fc, #e6eef8);
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.72);
        }

        .section-24__button:hover {
            border-color: rgba(217, 149, 28, 0.65);
            box-shadow: 0 16px 34px rgba(92, 26, 34, 0.13);
        }

        .section-24__button-title {
            grid-area: title;
            color: #16345e;
            font-weight: 800;
            letter-spacing: -0.015em;
        }

        .section-24__button-text {
            grid-area: text;
            color: #5d7390;
            line-height: 1.5;
        }

        #section-24-view-1:checked~.section-24__container .section-24__button--one,
        #section-24-view-2:checked~.section-24__container .section-24__button--two,
        #section-24-view-3:checked~.section-24__container .section-24__button--three {
            border-color: #d4af37;
            background: linear-gradient(180deg, #f2f7fd 0%, #ffffff 100%);
            box-shadow: 0 16px 36px rgba(92, 26, 34, 0.16), inset 0 0 0 1px rgba(255, 153, 0, 0.55);
        }

        #section-24-view-1:checked~.section-24__container .section-24__button--one::after,
        #section-24-view-2:checked~.section-24__container .section-24__button--two::after,
        #section-24-view-3:checked~.section-24__container .section-24__button--three::after {
            background:
                radial-gradient(circle at 50% 50%, #fff 0 4px, transparent 4.5px),
                linear-gradient(145deg, #d4af37, #d4af37);
            border-color: rgba(255, 153, 0, 0.8);
        }

        #section-24-view-1:checked~.section-24__container .section-24__button--one .section-24__button-title,
        #section-24-view-2:checked~.section-24__container .section-24__button--two .section-24__button-title,
        #section-24-view-3:checked~.section-24__container .section-24__button--three .section-24__button-title {
            color: #b38a2e;
        }

        .section-24__visual {
            gap: 1rem;
        }

        .section-24__frame {
            height: clamp(300px, 38vw, 520px);
            aspect-ratio: auto !important;
            border-radius: 20px;
            border-color: rgba(92, 26, 34, 0.12);
            box-shadow: 0 22px 50px rgba(52, 16, 22, 0.14);
        }

        .section-24__image {
            object-fit: cover;
            transform: scale(1.02);
            filter: saturate(1.04) contrast(1.03);
        }

        .section-24__caption {
            min-height: 4.6rem;
            padding: 1.1rem 1.25rem 1.1rem 4rem;
            border-left: 0;
            border-radius: 14px;
            background: linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%);
            border: 1px solid rgba(92, 26, 34, 0.10);
            box-shadow: 0 12px 26px rgba(52, 16, 22, 0.07);
        }

        .section-24__caption::before {
            content: "";
            position: absolute;
            left: 1rem;
            top: 50%;
            width: 2.1rem;
            height: 2.1rem;
            border-radius: 10px;
            transform: translateY(-50%);
            background:
                radial-gradient(circle at 50% 50%, #fff 0 3px, transparent 3.5px),
                linear-gradient(145deg, #d4af37, #d4af37);
            box-shadow: 0 8px 18px rgba(217, 149, 28, 0.22);
        }

        .section-24__message {
            inset: 1.1rem 1.25rem 1.1rem 4rem;
            display: flex;
            align-items: center;
            color: #1b447a;
            font-weight: 800;
        }

        .section-24__visual::after {
            --dot-1: var(--dcq-gold-strong);
            --dot-2: #ffffff;
            --dot-3: #ffffff;
            content: "";
            justify-self: center;
            width: 5.5rem;
            height: 1.25rem;
            margin-top: 0.2rem;
            border-radius: 999px;
            background:
                radial-gradient(circle at 0.75rem 50%, var(--dot-1) 0 0.33rem, transparent 0.36rem),
                radial-gradient(circle at 2.75rem 50%, var(--dot-2) 0 0.33rem, transparent 0.36rem),
                radial-gradient(circle at 4.75rem 50%, var(--dot-3) 0 0.33rem, transparent 0.36rem);
            filter: drop-shadow(0 2px 6px rgba(52, 16, 22, 0.16));
        }

        #section-24-view-2:checked~.section-24__container .section-24__visual::after {
            --dot-1: #ffffff;
            --dot-2: var(--dcq-gold-strong);
            --dot-3: #ffffff;
        }

        #section-24-view-3:checked~.section-24__container .section-24__visual::after {
            --dot-1: #ffffff;
            --dot-2: #ffffff;
            --dot-3: var(--dcq-gold-strong);
        }

        .section-24+p {
            margin: 0 !important;
            padding: 0 1rem 1rem !important;
            background: linear-gradient(180deg, #e6eef8 0%, #f7fbff 100%);
            color: #7f94ad !important;
            font-size: clamp(0.82rem, 1.4vw, 0.98rem) !important;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        #faq-section {
            padding: 1rem 16px 3rem;
            margin: 0 auto 0;
            background:
                radial-gradient(circle at 50% 0%, rgba(200, 169, 110, 0.15), transparent 32%),
                linear-gradient(180deg, #f7fbff 0%, #ffffff 100%);
        }

        #faq-section__header {
            margin: 0 auto 1.5rem;
        }

        #faq-section__header::before {
            display: block;
            z-index: 1000;
            margin-bottom: 0.45rem;
            color: var(--dcq-gold-strong);
            font-size: 0.78rem;
            font-weight: 800;
            overflow: visible;
            letter-spacing: 0.18em;
        }

        #faq-section__header::after {
            content: "";
            display: block;
            width: 4.5rem;
            height: 2px;
            margin: 0.75rem auto 0;
            border-radius: 999px;
            background: linear-gradient(90deg, transparent, var(--dcq-gold), transparent);
        }

        #faq-section__title {
            color: #17365f;
            font-weight: 600;
            letter-spacing: -0.025em;
        }

        #faq-section__list {
            max-width: 960px;
            gap: 10px;
        }

        #faq-section__item {
            border: 1px solid rgba(92, 26, 34, 0.10);
            border-radius: 14px;
            background: rgba(255, 255, 255, 0.88);
            box-shadow: 0 8px 24px rgba(52, 16, 22, 0.05);
            transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
        }

        #faq-section__item:hover {
            border-color: rgba(217, 149, 28, 0.45);
            box-shadow: 0 14px 30px rgba(52, 16, 22, 0.08);
            transform: translateY(-1px);
        }

        #faq-section__item summary {
            padding: 17px 20px;
        }

        #faq-section__item summary:hover {
            background: #f5f9ff;
        }

        #faq-section__q-text {
            color: #183c6d;
            font-size: clamp(0.9rem, 1.5vw, 1rem);
        }

        #faq-section__q-text:hover {
            color: #b38a2e;
        }

        #faq-section__icon {
            width: 24px;
            height: 24px;
            border: 1px solid rgba(217, 149, 28, 0.62);
            border-radius: 999px;
            background: #f5f9ff;
        }

        #faq-section__icon::before,
        #faq-section__icon::after {
            background: #b38a2e;
        }

        #faq-section__icon::before {
            top: 10.5px;
            left: 5.5px;
        }

        #faq-section__icon::after {
            top: 5.5px;
            left: 10.5px;
        }

        #faq-section__a-inner {
            border-top-color: rgba(92, 26, 34, 0.10);
            background: #f5f9ff;
        }

        #faq-section__a-text {
            color: #516882;
        }

        @media (min-width: 992px) {
            .section-24__container {
                grid-template-columns: minmax(280px, 0.72fr) minmax(0, 1.28fr);
            }
        }

        @media (max-width: 760px) {
            .product-header-2 {
                --badge-size: 6rem;
            }

            .section-6 {
                padding: 1rem;
                background: #16396d;

            }

            .section-6 picture {
                border-radius: 18px;
            }

            .section-6__image {
                width: 100%;
                height: clamp(260px, 62vw, 390px);
                margin: 0;
                border-radius: 0;
            }

            .section-6__content {
                position: relative;
                left: auto;
                top: auto;
                transform: none;
                max-width: 100%;
                margin: 1rem 0rem 0;
                text-align: left;
                background: radial-gradient(circle at 100% 20%, rgba(200, 169, 110, 0.15), transparent 32%), linear-gradient(135deg, #8B5E1F, #cca34e);
            }

            .section-6__title {
                color: #f5d56a;
                text-shadow: none;
            }

            .section-6__description {
                color: rgba(255, 255, 255, 0.92);
            }

            .section-2__content {
                padding: 1rem;
            }

            .section-24__button {
                grid-template-columns: 2.8rem minmax(0, 1fr);
                min-height: auto;
            }

            .section-24__button::after {
                width: 2.55rem;
                height: 2.55rem;
            }
        }
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <article class="pdp" id="pdp" aria-labelledby="product-main-title"> <!-- HTML fica dentro dessa div PDP -->

        <section class="product-header-2" aria-label="Cabeçalho do produto">
            <header class="product-header__banner-2">
                <figure style="width:100%;height:100%;margin:0;">
                    <img src=" https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/coquetel-composto-domecq-garrafas-bar-fundo-desfocado-lifestyle-917580-00.webp"
                        alt="Banner ilustrativo do Whisky Chivas Regal 18 Anos 750ml"
                        class="product-header__banner-img-2" loading="eager">
                </figure>
                <div class="product-header__badge-2" role="img" aria-label="Logo da marca">
                    <img src=" https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/logo-pernod-ricard-marca-fabricante-fornecedor-logo-pernod.webp"
                        alt="Ícone da marca" class="product-header__badge-img-2">
                </div>
            </header>
            <article class="product-header__body-2">
                <small class="product-header__brand-2">chivas regal</small>
                <h2 class="product-header__title-2"><span>Whisky Chivas Regal 18 Anos 750ml</span></h2>
                <p class="product-header__subtitle-2">Whisky escocês super premium com 85 notas de sabores únicos, blend
                    harmônico envelhecido por no mínimo 18 anos e graduação alcoólica de 40%.</p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto">
            <picture>
                <source media="(max-width: 760px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/whisky-chivas-regal-18-anos-garrafa-copo-gelo-ambiente-4500077-01-2.webp"
                    width="780" height="400">
                <img class="section-6__image"
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/whisky-chivas-regal-18-anos-garrafa-copo-gelo-detalhe-4500077-01-1.webp"
                    alt="Whisky Chivas Regal 18 Anos 750ml em composição de destaque" width="1600" height="650"
                    loading="lazy" fetchpriority="high" decoding="async">
            </picture>
            <div class="section-6__content">
                <h2 class="section-6__title">Super Premium Scotch Whisky mais vendido no mundo</h2>
                <p class="section-6__description">Blend escocês excepcionalmente rico, envelhecido por no mínimo 18 anos
                </p>
            </div>
        </section>

        <section class="section-2" aria-label="Origem e tradição do Whisky Chivas Regal 18 Anos">
            <div class="section-2__container">
                <div class="section-2__content">
                    <div class="section-2__image-block">
                        <figure>
                            <img class="section-2__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/whisky-chivas-regal-18-anos-barris-envelhecimento-madeira-4500077-02.webp"
                                alt="Whisky Chivas Regal 18 Anos 750ml em composição com copo" width="800" height="600"
                                loading="lazy">
                        </figure>
                    </div>
                    <div class="section-2__text-block">
                        <h2 class="section-2__title">Blend harmônico e sofisticado</h2>
                        <hr class="section-2__divider" aria-hidden="true">
                        <p class="section-2__paragraph">Composto por whiskies escolhidos a dedo e envelhecidos por no
                            mínimo 18 anos, Chivas Regal 18 entrega uma experiência rica, suave e de múltiplas camadas.
                        </p>
                        <p class="section-2__paragraph">Produzido na Escócia e com 40% de graduação alcoólica, apresenta
                            aroma indulgente e paladar aveludado, intenso e elegante.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-24" aria-labelledby="section-24-title" style="background-color: #eef4fb;">
            <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-1"
                aria-label="Mostrar imagem de visão geral" checked>
            <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-2"
                aria-label="Mostrar imagem de detalhe">
            <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-3"
                aria-label="Mostrar imagem de uso">

            <article class="section-24__container">
                <section class="section-24__content" aria-labelledby="section-24-title">
                    <nav class="section-24__options" aria-label="Escolha a imagem exibida">
                        <label class="section-24__button section-24__button--one" for="section-24-view-1">
                            <span class="section-24__button-title">85 notas de sabor</span>
                            <span class="section-24__button-text">Uma bebida intensa, perfeita para degustar com
                                calma</span>
                        </label>

                        <label class="section-24__button section-24__button--two" for="section-24-view-2">
                            <span class="section-24__button-title">18 anos de envelhecimento</span>
                            <span class="section-24__button-text">Elaborado com destilado vínico, carvalho e extrato de
                                amêndoas</span>
                        </label>

                        <label class="section-24__button section-24__button--three" for="section-24-view-3">
                            <span class="section-24__button-title">Aroma e paladar</span>
                            <span class="section-24__button-text">Notas frutadas que valorizam o momento de
                                consumo</span>
                        </label>
                    </nav>
                </section>

                <figure class="section-24__visual" aria-label="Imagens alternáveis do produto">
                    <div class="section-24__frame">
                        <!-- IMG 1-->
                        <div class="section-24__panel section-24__panel--one">
                            <img class="section-24__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/whisky-chivas-regal-18-anos-garrafa-frutas-ingredientes-4500077-03-1.webp"
                                width="1200" height="900" loading="lazy"
                                alt="Composição ilustrativa para experiência de degustação do Chivas Regal 18 Anos"
                                decoding="async">
                        </div>
                        <!-- IMG 2-->
                        <div class="section-24__panel section-24__panel--two">
                            <img class="section-24__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/whisky-chivas-regal-18-anos-copo-tabua-frios-petiscos-4500077-03-2.webp"
                                width="1200" height="900" loading="lazy"
                                alt="Barris de carvalho representando o envelhecimento do Chivas Regal 18 Anos"
                                decoding="async">
                        </div>
                        <!-- IMG 3-->
                        <div class="section-24__panel section-24__panel--three">
                            <img class="section-24__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/whisky-chivas-regal-18-anos-garrafa-frasco-perfume-aroma-4500077-03-3.webp"
                                width="1200" height="900" loading="lazy"
                                alt="Copo de whisky em composição ilustrativa do Chivas Regal 18 Anos" decoding="async">
                        </div>
                    </div>

                    <figcaption class="section-24__caption">
                        <span class="section-24__message section-24__message--one">85 notas únicas fazem de cada gole
                            uma nova descoberta</span>
                        <span class="section-24__message section-24__message--two">Seleção especial de whiskies
                            envelhecidos por no mínimo 18 anos</span>
                        <span class="section-24__message section-24__message--three">Aroma rico e multifacetado com
                            paladar aveludado e toque defumado</span>
                    </figcaption>
                </figure>
            </article>
        </section>

        <p style="color: #8a8a8a; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty;
            text-align: center; padding: 30px 0; background-color: #eef4fb;">
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
                            <h3 id="faq-section__q-text"> Como é o sabor do Chivas Regal 18 Anos? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O Chivas Regal 18 Anos tem paladar aveludado, com notas de
                                chocolate amargo, notas florais e um toque defumado. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Qual é o aroma do Chivas Regal 18 Anos? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Seu aroma é rico, indulgente e multifacetado, com notas de
                                frutas secas, bala de caramelo e chocolate amargo. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Qual é a graduação alcoólica do Chivas Regal 18 Anos 750ml?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> A versão de 750ml possui 40% de graduação alcoólica. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> O que significa o envelhecimento de 18 anos? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Significa que o blend é composto por uma seleção de whiskies
                                envelhecidos por no mínimo 18 anos, o que contribui para um perfil mais suave, rico e
                                complexo. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Onde o Chivas Regal 18 Anos é produzido? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O produto é de origem escocesa e é produzido pela Chivas
                                Brothers LTD Distillers, em Keith, Scotland. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Quais são os ingredientes do Chivas Regal 18 Anos? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Seus ingredientes são água, grãos e malte. </p>
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
