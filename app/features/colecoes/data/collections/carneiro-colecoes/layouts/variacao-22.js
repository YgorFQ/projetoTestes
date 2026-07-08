// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "variacao-22",
  name: "Variação 22",
  html: `<div class="lp-container">
    <meta charset="utf-8" />
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
        rel="stylesheet" />
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
            color: #10251F;
            margin: 0 0 12px;
            line-height: 98%;
        }

        #faq-section__subtitle {
            font-size: 1rem;
            color: #4F5B3A;
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
            background: #FFFFFF;
            border: 1px solid #D8C99E;
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
            width: 0;
            height: 0;
            color: transparent;
            font-size: 0;
        }

        #faq-section__item summary:hover {
            background: #F7EED3;
        }

        #faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #10251F;
            flex: 1;
        }

        #faq-section__q-text:hover {
            color: #8A1F1F;
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
            background: #8A1F1F;
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
            border-top: 1px solid #D8C99E;
        }

        #faq-section__a-text {
            font-size: 0.9rem;
            color: #354735;
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

        .product-header__figure-2 {
            width: 100%;
            height: 100%;
            margin: 0;
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
            background-color: #8A1F1F;
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
            padding: calc(var(--badge-size) / 2 + 1rem) 0.3rem 0.5rem;
            text-align: center;
        }

        .product-header__brand-2 {
            color: #8A1F1F;
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
            color: #10251F;
        }

        .product-header__title-2 strong {
            font-weight: 700;
            display: block;
        }

        .product-header__subtitle-2 {
            color: #4F5B3A;
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
        /* ===== HERO SECTION — VARIÁVEIS ===== */
        .section-6 {
            --pos-y: 46%;
            --pos-x: 11%;
            --color-title: #F0C75E;
            --bg-box: rgba(1, 59, 42, 0.72);
            width: 100%;
            position: relative;
            padding: 1rem 0;
            overflow: hidden;
            background-color: #013B2A;
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
            color: #FFFFFF;
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
                text-align: center;
            }

            .section-6__title {
                font-size: 1.8rem;
                color: #f3f3f3;
                text-shadow: none;
            }

            .section-6__description {
                margin-bottom: 0;
                font-size: 1.1rem;
                color: #f3f3f3;
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
        :root {
            --s2-color-bg: #013B2A;
            --s2-color-text: #F7EED3;
            --s2-color-accent: #C89B3C;
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
                flex: 0 0 50%;
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
            --s24-color-brand: #4F5B3Ae05;
            --s24-color-ink: #10251F;
            --s24-color-muted: #4F5B3A;
            --s24-color-soft: #F7EED3;
            --s24-color-surface: #FFFFFFfff;
            --s24-color-line: #D8C99E;
            --s24-color-brand-soft: #F3E7C4;
            --s24-color-brand-strong: #006B46;
            width: 100%;
            margin: 0;
            padding: 2rem 1rem;
            color: var(--s24-color-ink);
            background: var(--s24-color-soft);
            font-family: Arial, Helvetica, sans-serif;
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
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .section-composicao {
            width: 100%;
            overflow: hidden;
            position: relative;
            padding: 12px 16px 14px;
            background: #F7EED3;
            font-family: sans-serif;
        }

        .section-composicao__title {
            margin: 0 auto 8px;
            color: #10251F;
            font-family: Georgia, serif;
            font-size: 1.55rem;
            font-weight: 700;
            line-height: 1.15;
            text-align: center;
        }

        .section-composicao__divider {
            width: 48px;
            height: 2px;
            background-color: #C89B3C;
            margin: 0 auto 14px;
            border-radius: 2px;
        }

        .section-composicao__subtitle {
            margin: 0 auto 14px;
            color: #4F5B3A;
            font-size: 0.9rem;
            line-height: 1.6;
            text-align: center;
            max-width: 360px;
        }

        /* ── RADIO CONTROLS ── */

        .section-composicao__control {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
        }

        /* ── VIEWPORT + TRACK ── */

        .section-composicao__viewport {
            width: 100%;
            overflow: hidden;
        }

        .section-composicao__track {
            display: flex;
            margin: 0;
            padding: 0;
            list-style: none;
            transition: transform 0.4s ease;
        }

        /* ── ITEM: mobile = 1 card por vez ── */

        .section-composicao__item {
            flex: 0 0 100%;
            min-width: 0;
            padding: 0 8px;
        }

        /* ── TRANSFORMS mobile (1 por vez) ── */

        #sc-slide-1:checked~.section-composicao__viewport .section-composicao__track {
            transform: translateX(0%);
        }

        #sc-slide-2:checked~.section-composicao__viewport .section-composicao__track {
            transform: translateX(-100%);
        }

        #sc-slide-3:checked~.section-composicao__viewport .section-composicao__track {
            transform: translateX(-200%);
        }

        #sc-slide-4:checked~.section-composicao__viewport .section-composicao__track {
            transform: translateX(-300%);
        }

        /* ── CARD ── */

        .section-composicao__card {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 28px 20px 24px;
            text-align: center;
            background: #FFFFFFff;
            border-radius: 16px;
            border: 1px solid rgba(196, 154, 60, 0.22);
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .section-composicao__card::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #F3E7C4, #C89B3C, #F3E7C4);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .section-composicao__card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 28px rgba(196, 154, 60, 0.18);
            border-color: rgba(196, 154, 60, 0.55);
        }

        .section-composicao__card:hover::after {
            opacity: 1;
        }

        .section-composicao__media {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: #F3E7C4;
            margin: 0 auto 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            transition: transform 0.35s ease;
        }

        .section-composicao__card:hover .section-composicao__media {
            transform: scale(1.08) rotate(-4deg);
        }

        .section-composicao__image {
            display: block;
            width: 56px;
            height: 56px;
            object-fit: contain;
            filter: sepia(1) saturate(3.5) hue-rotate(4deg) brightness(0.68);
            transition: transform 0.35s ease;
            margin: auto;
        }

        .section-composicao__card-title {
            margin: 0 0 8px;
            color: #10251F;
            font-family: Georgia, serif;
            font-size: 1rem;
            font-weight: 700;
            line-height: 1.25;
        }

        .section-composicao__card-text {
            margin: 0;
            color: #4F5B3A;
            font-size: 0.84rem;
            line-height: 1.6;
        }

        /* ── BOTÕES (labels) ── */

        .section-composicao__controls {
            display: flex;
            justify-content: center;
            gap: 12px;
            margin-top: 14px;
        }

        .section-composicao__btn {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border: 2px solid #C89B3C;
            border-radius: 999px;
            background: transparent;
            color: #C89B3C;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 700;
            line-height: 1;
            transition: transform 0.22s ease, background-color 0.22s ease, color 0.22s ease, box-shadow 0.22s ease;
            animation: sc-pulse 3s ease-in-out infinite;
        }

        .section-composicao__btn:hover {
            transform: scale(1.1);
            background-color: #C89B3C;
            color: #F7EED3;
            box-shadow: 0 0 0 6px rgba(196, 154, 60, 0.2);
            animation: none;
        }

        @keyframes sc-pulse {
            0% {
                box-shadow: 0 0 0 0px rgba(196, 154, 60, 0.45);
            }

            60% {
                box-shadow: 0 0 0 9px rgba(196, 154, 60, 0);
            }

            100% {
                box-shadow: 0 0 0 0px rgba(196, 154, 60, 0);
            }
        }

        /* botão ativo quando o radio correspondente está checked */

        #sc-slide-1:checked~.section-composicao__controls .section-composicao__btn--1,
        #sc-slide-2:checked~.section-composicao__controls .section-composicao__btn--2,
        #sc-slide-3:checked~.section-composicao__controls .section-composicao__btn--3,
        #sc-slide-4:checked~.section-composicao__controls .section-composicao__btn--4 {
            background-color: #C89B3C;
            color: #F7EED3;
            border-color: #C89B3C;
            animation: none;
        }

        /* ── TABLET: 2 por vez ── */

        @media (min-width: 768px) {
            .section-composicao__item {
                flex-basis: 50%;
            }

            #sc-slide-1:checked~.section-composicao__viewport .section-composicao__track {
                transform: translateX(0%);
            }

            #sc-slide-2:checked~.section-composicao__viewport .section-composicao__track {
                transform: translateX(-50%);
            }

            #sc-slide-3:checked~.section-composicao__viewport .section-composicao__track,
            #sc-slide-4:checked~.section-composicao__viewport .section-composicao__track {
                transform: translateX(-100%);
            }

            .section-composicao__btn--4 {
                position: absolute;
                width: 1px;
                height: 1px;
                opacity: 0;
                pointer-events: none;
                overflow: hidden;
            }

            .section-composicao__media {
                width: 120px;
                height: 120px;
            }

            .section-composicao__image {
                width: 68px;
                height: 68px;
            }
        }

        /* ── DESKTOP: todos visíveis, sem carrossel ── */

        @media (min-width: 1200px) {
            .section-composicao__viewport {
                overflow: visible;
            }

            .section-composicao__item {
                flex-basis: 25%;
            }

            #sc-slide-1:checked~.section-composicao__viewport .section-composicao__track,
            #sc-slide-2:checked~.section-composicao__viewport .section-composicao__track,
            #sc-slide-3:checked~.section-composicao__viewport .section-composicao__track,
            #sc-slide-4:checked~.section-composicao__viewport .section-composicao__track {
                transform: none;
            }

            .section-composicao__controls {
                position: absolute;
                width: 1px;
                height: 1px;
                opacity: 0;
                pointer-events: none;
                overflow: hidden;
            }
        }
    </style>
    <style>
        .pdp-note {
            color: #4F5B3A;
            font-family: sans-serif;
            font-size: clamp(1rem, 2vw, 1.2rem);
            text-wrap: pretty;
            text-align: center;
            padding: 2rem 0;
            margin: 0;
        }
    </style>
    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <article aria-labelledby="product-main-title" class="pdp" id="pdp" style="background-color: #F7EED3;">
        <!-- HTML fica dentro dessa div PDP -->
        <section aria-label="Cabeçalho do produto" class="product-header-2">
            <div class="product-header__banner-2">
                <figure class="product-header__figure-2">
                    <img alt="Banner editorial para o Whiskey Jameson 750ml" class="product-header__banner-img-2"
                        decoding="async" height="250" loading="eager"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/whisky-escoces-ballantines-17-anos-cevada-ingredientes-lifestyle-4500078-00.webp"
                        width="1600" />
                </figure>
                <div aria-label="Logo da marca" class="product-header__badge-2" role="img">
                    <img alt="Ícone da marca Jameson" class="product-header__badge-img-2" height="90" loading="lazy"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/logo-pernod.webp" width="90" />
                </div>
            </div>
            <article class="product-header__body-2">
                <small class="product-header__brand-2"> Jameson </small>
                <h2 class="product-header__title-2" id="product-main-title"><span>Whiskey Irlandês
                        750ml</span><strong>Tripla destilação e sabor irlandês clássico</strong></h2>
                <p class="product-header__subtitle-2">Whiskey irlandês produzido na Irlanda, com tripla destilação,
                    aroma delicado, notas florais, toque frutado e final suave e persistente.</p>
            </article>
        </section>
        <section aria-label="Destaque do produto com texto" class="section-6">
            <picture>
                <source media="(max-width: 760px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/whisky-escoces-ballantines-17-anos-750ml-garrafa-cevada-ambientada-4500078-01-2.webp" />
                <!-- troca de imagem -->
                <img alt="Whiskey Jameson 750ml em destaque" class="section-6__image" decoding="async"
                    fetchpriority="high" height="650" loading="lazy"
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/whisky-escoces-ballantines-17-anos-banner-garrafa-cevada-lifestyle-4500078-01-1.webp"
                    width="1600" />
                <div class="section-6__content">
                    <h2 class="section-6__title">Direto dos campos da Irlanda</h2>
                    <p class="section-6__description">Um whiskey irlandês clássico, suave e memorável, feito com
                        tradição
                        desde 1780.</p>
                </div>
        </section>
        <section aria-labelledby="sc-title" class="section-composicao">
            <h3 class="section-composicao__title" id="sc-title">O que faz este whiskey se destacar</h3>
            <div class="section-composicao__divider"></div>
            <p class="section-composicao__subtitle">Da tripla destilação ao sabor suave, cada detalhe reforça a tradição
                irlandesa do Jameson.</p>
            <input checked="" class="section-composicao__control" id="sc-slide-1" name="sc-carousel" type="radio" />
            <input class="section-composicao__control" id="sc-slide-2" name="sc-carousel" type="radio" />
            <input class="section-composicao__control" id="sc-slide-3" name="sc-carousel" type="radio" />
            <input class="section-composicao__control" id="sc-slide-4" name="sc-carousel" type="radio" />
            <div class="section-composicao__viewport">
                <ul class="section-composicao__track">
                    <li class="section-composicao__item">
                        <figure class="section-composicao__card">
                            <div class="section-composicao__media">
                                <img alt="Ícone ilustrativo para tripla destilação do Jameson"
                                    class="section-composicao__image" decoding="async" height="128" loading="lazy"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/whisky-escoces-ballantines-17-anos-icone-barril-uva-4500078-02-1.webp"
                                    width="128" />
                            </div>
                            <figcaption>
                                <h4 class="section-composicao__card-title">Tripla destilação</h4>
                                <p class="section-composicao__card-text">Processo clássico que ajuda a entregar uma
                                    bebida mais suave e equilibrada.</p>
                            </figcaption>
                        </figure>
                    </li>
                    <li class="section-composicao__item">
                        <figure class="section-composicao__card">
                            <div class="section-composicao__media">
                                <img alt="Ícone ilustrativo para notas de sabor do Jameson"
                                    class="section-composicao__image" decoding="async" height="128" loading="lazy"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/whisky-escoces-ballantines-17-anos-icone-flor-baunilha-4500078-02-2.webp"
                                    width="128" />
                            </div>
                            <figcaption>
                                <h4 class="section-composicao__card-title">Baunilha, caramelo e especiarias</h4>
                                <p class="section-composicao__card-text">Notas doces e levemente especiadas para uma
                                    experiência sensorial marcante.</p>
                            </figcaption>
                        </figure>
                    </li>
                    <li class="section-composicao__item">
                        <figure class="section-composicao__card">
                            <div class="section-composicao__media">
                                <img alt="Ícone ilustrativo para final suave do Jameson"
                                    class="section-composicao__image" decoding="async" height="128" loading="lazy"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/whisky-escoces-ballantines-17-anos-icone-colmeia-mel-4500078-02-3.webp"
                                    width="128" />
                            </div>
                            <figcaption>
                                <h4 class="section-composicao__card-title">Final suave</h4>
                                <p class="section-composicao__card-text">Final persistente e levemente adocicado, ideal
                                    para degustar com calma.</p>
                            </figcaption>
                        </figure>
                    </li>
                    <li class="section-composicao__item">
                        <figure class="section-composicao__card">
                            <div class="section-composicao__media">
                                <img alt="Ícone ilustrativo para origem irlandesa do Jameson"
                                    class="section-composicao__image" decoding="async" height="128" loading="lazy"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/whisky-escoces-ballantines-17-anos-icone-bandeira-escocia-4500078-02-4.webp"
                                    width="128" />
                            </div>
                            <figcaption>
                                <h4 class="section-composicao__card-title">Origem irlandesa</h4>
                                <p class="section-composicao__card-text">Produzido na Irlanda, com tradição associada à
                                    destilaria de Midleton.</p>
                            </figcaption>
                        </figure>
                    </li>
                </ul>
            </div>
            <nav aria-label="Navegação do carrossel" class="section-composicao__controls">
                <label class="section-composicao__btn section-composicao__btn--1" for="sc-slide-1">1</label>
                <label class="section-composicao__btn section-composicao__btn--2" for="sc-slide-2">2</label>
                <label class="section-composicao__btn section-composicao__btn--3" for="sc-slide-3">3</label>
                <label class="section-composicao__btn section-composicao__btn--4" for="sc-slide-4">4</label>
            </nav>
        </section>
        <section aria-label="Origem e tradição do Whiskey Jameson 750ml" class="section-2">
            <div class="section-2__container">
                <div class="section-2__content">
                    <div class="section-2__image-block">
                        <figure>
                            <img alt="Whiskey Jameson 750ml em composição ilustrativa" class="section-2__image"
                                decoding="async" height="600" loading="lazy"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/whisky-escoces-ballantines-17-anos-750ml-garrafa-diagonal-4500078-03.webp"
                                width="800" />
                        </figure>
                    </div>
                    <div class="section-2__text-block">
                        <h2 class="section-2__title">Um Irish Whiskey versátil para diferentes momentos</h2>
                        <hr aria-hidden="true" class="section-2__divider" />
                        <p class="section-2__paragraph">Jameson é uma escolha para quem busca um whiskey irlandês suave,
                            clássico e fácil de apreciar.</p>
                        <p class="section-2__paragraph">O sabor combina baunilha, caramelo, especiarias e frutos secos,
                            com aroma floral delicado e toque frutado.</p>
                    </div>
                </div>
            </div>
        </section>
        <section aria-labelledby="section-24-title" class="section-24">
            <input aria-label="Mostrar imagem de visão geral" checked="" class="section-24__input"
                id="section-24-view-1" name="section-24-view" type="radio" />
            <input aria-label="Mostrar imagem de detalhe" class="section-24__input" id="section-24-view-2"
                name="section-24-view" type="radio" />
            <input aria-label="Mostrar imagem de uso" class="section-24__input" id="section-24-view-3"
                name="section-24-view" type="radio" />
            <article class="section-24__container">
                <section aria-labelledby="section-24-title" class="section-24__content">
                    <nav aria-label="Escolha a imagem exibida" class="section-24__options">
                        <label class="section-24__button section-24__button--one" for="section-24-view-1">
                            <span class="section-24__button-title">Irlandês clássico</span>
                            <span class="section-24__button-text">Origem: Irlanda. Produzido com processos tradicionais
                                e ingredientes selecionados.</span>
                        </label>
                        <label class="section-24__button section-24__button--two" for="section-24-view-2">
                            <span class="section-24__button-title">40% de graduação</span>
                            <span class="section-24__button-text">Teor equilibrado para apreciar puro, com gelo ou em
                                coquetéis, sempre com moderação.</span>
                        </label>
                        <label class="section-24__button section-24__button--three" for="section-24-view-3">
                            <span class="section-24__button-title">Garrafa de 750ml</span>
                            <span class="section-24__button-text">Volume versátil para momentos de descontração,
                                celebrações ou preparo de drinks.</span>
                        </label>
                    </nav>
                </section>
                <figure aria-label="Imagens alternáveis do produto" class="section-24__visual">
                    <div class="section-24__frame">
                        <!-- IMG 1-->
                        <div class="section-24__panel section-24__panel--one">
                            <img alt="Whiskey Jameson em visão geral ilustrativa" class="section-24__image"
                                decoding="async" height="900" loading="lazy"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/whisky-escoces-ballantines-17-anos-bandeira-escocia-origem-lifestyle-4500078-04-1.webp"
                                width="1200" />
                        </div>
                        <!-- IMG 2-->
                        <div class="section-24__panel section-24__panel--two">
                            <img alt="Detalhe ilustrativo do Whiskey Jameson" class="section-24__image" decoding="async"
                                height="900" loading="lazy"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/whisky-escoces-ballantines-17-anos-copo-gelo-casca-limao-detalhe-4500078-04-2.webp"
                                width="1200" />
                        </div>
                        <!-- IMG 3-->
                        <div class="section-24__panel section-24__panel--three">
                            <img alt="Whiskey Jameson em contexto de degustação" class="section-24__image"
                                decoding="async" height="900" loading="lazy"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/whisky-escoces-ballantines-17-anos-750ml-garrafa-fundo-infinito-4500078-04-3.webp"
                                width="1200" />
                        </div>
                    </div>
                    <figcaption class="section-24__caption">
                        <span class="section-24__message section-24__message--one">Um Irish Whiskey clássico,
                            reconhecido pela suavidade da tripla destilação.</span>
                        <span class="section-24__message section-24__message--two">Sabor com baunilha, caramelo,
                            especiarias e frutos secos em equilíbrio.</span>
                        <span class="section-24__message section-24__message--three">750ml, origem irlandesa e graduação
                            alcoólica de 40%.</span>
                    </figcaption>
                </figure>
            </article>
        </section>
        <p class="pdp-note">
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
                            <h3 id="faq-section__q-text"> O Whiskey Jameson 750ml é indicado para qual tipo de consumo?
                            </h3>
                            <span aria-hidden="true" id="faq-section__icon"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O Whiskey Jameson 750ml é indicado para quem busca um whiskey
                                irlandês suave, clássico e versátil. Pode ser apreciado puro, com gelo ou em coquetéis,
                                sempre com moderação. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> O Jameson pode ser tomado puro? </h3>
                            <span aria-hidden="true" id="faq-section__icon"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. O Jameson pode ser apreciado puro, especialmente por quem
                                prefere perceber melhor as notas de baunilha, caramelo, especiarias e frutos secos. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Qual é a graduação alcoólica do Whiskey Jameson 750ml? </h3>
                            <span aria-hidden="true" id="faq-section__icon"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> A graduação alcoólica do Whiskey Jameson 750ml é de 40%. Esse
                                teor combina com a proposta de um Irish Whiskey suave, equilibrado e versátil. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> O que diferencia o Jameson de outros whiskeys? </h3>
                            <span aria-hidden="true" id="faq-section__icon"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> A tripla destilação ajuda a entregar a suavidade característica
                                do Jameson. Na prática, isso cria um whiskey equilibrado, fácil de apreciar e com
                                tradição irlandesa. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Qual é o sabor do Whiskey Jameson? </h3>
                            <span aria-hidden="true" id="faq-section__icon"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O sabor do Jameson combina baunilha, caramelo, especiarias e
                                frutos secos, com final suave, levemente adocicado e persistente no paladar. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> O aroma do Jameson é intenso? </h3>
                            <span aria-hidden="true" id="faq-section__icon"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O aroma do Jameson é delicado e equilibrado, com fragrâncias
                                florais, notas doces e toque sutil frutado. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> O Whiskey Jameson é de qual país? </h3>
                            <span aria-hidden="true" id="faq-section__icon"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O Whiskey Jameson é da Irlanda. Seus processos de fabricação
                                são feitos na Irlanda, mantendo a tradição da marca. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> Quais características fazem parte do Jameson? </h3>
                            <span aria-hidden="true" id="faq-section__icon"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Jameson é um blended whiskey feito com ingredientes
                                selecionados e grãos cuidadosamente escolhidos para entregar sabor suave e único. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details class="faq-section__details">
                        <summary class="faq-section__summary">
                            <h3 id="faq-section__q-text"> O Jameson combina com drinks? </h3>
                            <span aria-hidden="true" id="faq-section__icon"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. O Jameson é versátil e pode ser usado em coquetéis como
                                Whisky Sour e Irish Coffee, além de ser apreciado puro ou com gelo. </p>
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
