// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "variacao-17",
  name: "Variação 17",
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

        .pdp__image-note {
            color: #6f747b;
            font-family: sans-serif;
            font-size: clamp(1rem, 2vw, 1.2rem);
            padding: 2rem 0;
            text-align: center;
            text-wrap: pretty;
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
            background: #f6f7f8;
        }

        #faq-section__header {
            text-align: center;
            margin: 1rem 0;
        }

        #faq-section-title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #17212b;
            margin: 0 0 12px;
            line-height: 98%;
        }

        #faq-section__subtitle {
            font-size: 1rem;
            color: #58616d;
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

        .faq-section__item {
            background: #fff;
            border: 1px solid #dfe4e8;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 0.5rem 1.5rem rgba(23, 33, 43, 0.06);
            transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
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
            color: transparent;
            font-size: 0;
        }

        .faq-section__item summary:hover {
            background: #eef2f5;
        }

        .faq-section__item:hover {
            border-color: #c8d1d8;
            box-shadow: 0 0.75rem 2rem rgba(23, 33, 43, 0.09);
            transform: translateY(-0.125rem);
        }

        .faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #17212b;
            flex: 1;
        }

        .faq-section__q-text:hover {
            color: #ff9900;
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
            background: #6f747b;
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
            border-top: 1px solid #dfe4e8;
        }

        .faq-section__a-text {
            font-size: 0.9rem;
            color: #3d4650;
            line-height: 1.6;
            margin: 0;
        }

        @media (max-width: 480px) {
            .faq-section__q-text {
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
            background: #f6f7f8;
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
            filter: saturate(0.88) contrast(1.05);
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
            width: 100%;
            background: #ffffff;
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
            color: #17212b;
        }

        .product-header__title-2 strong {
            font-weight: 700;
            display: block;
        }

        .product-header__subtitle-2 {
            color: #58616d;
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
            --pos-y: 50%;
            --pos-x: 7%;
            --color-title: #ffe178;
            --bg-box: rgba(23, 33, 43, 0.84);

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
            max-width: min(40%, 480px);
            z-index: 10;
            background-color: var(--bg-box);
            padding: clamp(12px, 2vw, 20px);
            border-radius: 15px;
            border: 1px solid rgba(255, 255, 255, 0.16);
            box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.18);
            transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .section-6:hover .section-6__content {
            transform: translateY(-50%) translateX(0.25rem);
            box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.24);
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
                border: 0;
                box-shadow: none;
                text-align: center;
            }

            .section-6:hover .section-6__content {
                transform: none;
                box-shadow: none;
            }

            .section-6__title {
                font-size: 1.8rem;
                color: #17212b;
                text-shadow: none;
            }

            .section-6__description {
                margin-bottom: 0;
                font-size: 1.1rem;
                color: #3d4650;
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
        }

        .section-24 {
            --s24-color-brand: #ff9900;
            --s24-color-ink: #17212b;
            --s24-color-muted: #58616d;
            --s24-color-soft: #f6f7f8;
            --s24-color-surface: #ffffff;
            --s24-color-line: #dfe4e8;
            --s24-color-brand-soft: #fff2d9;
            --s24-color-brand-strong: #7a4a00;
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
            box-shadow: 0 1rem 2rem rgba(23, 33, 43, 0.12);
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
            box-shadow: 0 1.5rem 3rem rgba(23, 33, 43, 0.1);
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

        .section-24__frame:hover .section-24__image {
            transform: scale(1.07);
        }

        .section-24__caption {
            position: relative;
            min-height: 4rem;
            padding: 1rem;
            border-left: 0.25rem solid var(--s24-color-brand);
            border-radius: 0.5rem;
            color: var(--s24-color-ink);
            background: var(--s24-color-surface);
            box-shadow: 0 0.75rem 1.5rem rgba(23, 33, 43, 0.08);
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
            box-shadow: 0 1rem 2rem rgba(23, 33, 43, 0.14), inset 0 0 0 2px var(--s24-color-brand);
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
        .section-11 {
            --s11-color-brand: #ff9900;
            --s11-color-ink: #17212b;
            --s11-color-muted: #58616d;
            --s11-color-soft: #f1f4f6;
            --s11-color-surface: #ffffff;
            --s11-color-line: #dfe4e8;
            width: 100%;
            background: var(--s11-color-soft);
            color: var(--s11-color-ink);
        }

        .section-11-container {
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
                max-width: 1400px;
            }
        }

        .section-11__header {
            text-align: center;
            margin-bottom: 2rem;
            display: grid;
            gap: 0.75rem;
            align-items: start;
        }

        .section-11__title {
            font-size: clamp(1.5rem, 3vw, 2.25rem);
            font-weight: 900;
            color: var(--s11-color-ink);
            margin: 0;
            line-height: 1.25;
            text-wrap: balance;
            overflow-wrap: anywhere;
        }

        .section-11__subtitle {
            max-width: 46rem;
            margin: 0 auto;
            color: var(--s11-color-muted);
            font-size: clamp(0.9375rem, 2vw, 1.0625rem);
            line-height: 1.55;
            text-wrap: pretty;
            overflow-wrap: anywhere;
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
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (min-width: 992px) {
            .section-11__grid {
                grid-template-columns: repeat(5, minmax(0, 1fr));
            }
        }

        .section-11__item {
            position: relative;
            min-width: 0;
            background: var(--s11-color-surface);
            border: 1px solid var(--s11-color-line);
            border-radius: 0.5rem;
            padding: 1.5rem 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1rem;
            overflow: hidden;
            box-shadow: 0 1rem 2rem rgba(23, 33, 43, 0.07);
            transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
            animation: section-11-rise 520ms ease both;
        }

        .section-11__item::before {
            position: absolute;
            inset: 0 0 auto;
            height: 0.25rem;
            background: var(--s11-color-brand);
            content: "";
            transform: scaleX(0.18);
            transform-origin: left;
            transition: transform 180ms ease;
        }

        .section-11__item:hover {
            border-color: rgba(255, 153, 0, 0.55);
            box-shadow: 0 1.5rem 3rem rgba(23, 33, 43, 0.12);
            transform: translateY(-0.25rem);
        }

        .section-11__item:hover::before {
            transform: scaleX(1);
        }

        .section-11__figure {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
            background: #fff5e6;
            border: 1px solid rgba(255, 153, 0, 0.3);
        }

        .section-11__image {
            width: 3.5rem;
            height: auto;
            display: block;
            filter: saturate(0.92) contrast(1.05);
            transition: transform 180ms ease;
        }

        .section-11__item:hover .section-11__image {
            transform: scale(1.08);
        }

        .section-11__name {
            font-size: clamp(1rem, 2vw, 1.125rem);
            font-weight: 800;
            color: var(--s11-color-ink);
            margin: 0;
            line-height: 1.3;
            overflow-wrap: anywhere;
        }

        .section-11__value {
            font-size: clamp(0.875rem, 1.8vw, 0.9375rem);
            color: var(--s11-color-muted);
            margin: 0;
            line-height: 1.5;
            overflow-wrap: anywhere;
            text-wrap: pretty;
        }

        .section-11__item:nth-child(2) {
            animation-delay: 80ms;
        }

        .section-11__item:nth-child(3) {
            animation-delay: 160ms;
        }

        .section-11__item:nth-child(4) {
            animation-delay: 240ms;
        }

        .section-11__item:nth-child(5) {
            animation-delay: 320ms;
        }

        @keyframes section-11-rise {
            from {
                opacity: 0;
                transform: translateY(0.75rem);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <article class="pdp" id="pdp" aria-labelledby="product-main-title"> <!-- HTML fica dentro dessa div PDP -->

        <section class="product-header-2" aria-label="Cabeçalho do produto">
            <div class="product-header__banner-2">
                <figure>
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cenario-fundo-abstrato-azul-escuro-efeito-fumaca-luz-bosch-508651-00.webp?ims=288x">
                        <source media="(max-width: 375px)"
                            srcset=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cenario-fundo-abstrato-azul-escuro-efeito-fumaca-luz-bosch-508651-00.webp?ims=343x">
                        <source media="(max-width: 425px)"
                            srcset=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cenario-fundo-abstrato-azul-escuro-efeito-fumaca-luz-bosch-508651-00.webp?ims=393x">
                        <source media="(max-width: 768px)"
                            srcset=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cenario-fundo-abstrato-azul-escuro-efeito-fumaca-luz-bosch-508651-00.webp?ims=736x">
                        <source media="(max-width: 1024px)"
                            srcset=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cenario-fundo-abstrato-azul-escuro-efeito-fumaca-luz-bosch-508651-00.webp?ims=992x">
                        <source media="(max-width: 1440px)"
                            srcset=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cenario-fundo-abstrato-azul-escuro-efeito-fumaca-luz-bosch-508651-00.webp?ims=1248x">
                        <img class="product-header__banner-img-2"
                            src=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cenario-fundo-abstrato-azul-escuro-efeito-fumaca-luz-bosch-508651-00.webp"
                            alt="Banner da Parafusadeira e Furadeira de Impacto Bosch GSB 185-LI" width="1200"
                            height="250" loading="eager" decoding="async">
                    </picture>
                </figure>
                <div class="product-header__badge-2" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/bosch/bosch-logo.png"
                        alt="Logo Bosch" class="product-header__badge-img-2" width="90" height="90" loading="lazy">
                </div>
            </div>
            <article class="product-header__body-2">
                <small class="product-header__brand-2">── bosch ──</small>
                <h2 class="product-header__title-2">
                    <span>Parafusadeira e Furadeira de Impacto</span>
                    <strong>Bosch GSB 185-LI 18V</strong>
                </h2>
                <p class="product-header__subtitle-2">
                    Potência de 18V em corpo compacto, com motor brushless, mandril metálico e LED na base para
                    trabalhar com mais controle em furos e parafusamentos.
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto">
            <picture>
                <source media="(max-width: 760px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-parafusadeira-bosch-professional-gsb-183-li-bateria-18v-detalhe-508715-01-2.webp">
                <img class="section-6__image"
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-parafusadeira-bosch-professional-gsb-183-li-bateria-18v-508715-01-1.webp"
                    alt="Parafusadeira e furadeira de impacto Bosch GSB 185-LI em destaque" width="1600" height="650"
                    fetchpriority="high" loading="lazy" decoding="async">
            </picture>
            <div class="section-6__content">
                <h2 class="section-6__title">18V no tamanho certo</h2>
                <p class="section-6__description">Corpo de 177 mm para alcançar áreas apertadas sem abrir mão de força.
                </p>
            </div>
        </section>

        <section class="section-24" aria-labelledby="section-24-title">
            <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-1"
                aria-label="Mostrar imagem de visão geral" checked="">
            <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-2"
                aria-label="Mostrar imagem de detalhe">
            <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-3"
                aria-label="Mostrar imagem de uso">

            <article class="section-24__container">
                <section class="section-24__content" aria-labelledby="section-24-title">
                    <nav class="section-24__options" aria-label="Escolha a imagem exibida">
                        <label class="section-24__button section-24__button--one" for="section-24-view-1">
                            <span class="section-24__button-title">Motor brushless 18V</span>
                            <span class="section-24__button-text">Entrega força de ferramenta a cabo em um corpo mais
                                compacto e eficiente.</span>
                        </label>

                        <label class="section-24__button section-24__button--two" for="section-24-view-2">
                            <span class="section-24__button-title">Mandril metálico robusto</span>
                            <span class="section-24__button-text">Trava melhor o acessório e ajuda a aumentar a
                                durabilidade no uso intenso.</span>
                        </label>

                        <label class="section-24__button section-24__button--three" for="section-24-view-3">
                            <span class="section-24__button-title">LED no ponto certo</span>
                            <span class="section-24__button-text">Iluminação na base para enxergar melhor onde o furo ou
                                parafusamento será feito.</span>
                        </label>
                    </nav>
                </section>

                <figure class="section-24__visual" aria-label="Imagens alternáveis do produto">
                    <div class="section-24__frame">
                        <!-- IMG 1-->
                        <div class="section-24__panel section-24__panel--one">
                            <img class="section-24__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-parafusadeira-bosch-gsb-183-li-furando-metal-oficina-lifestyle-508715-02-1.webp"
                                alt="Visão geral da Bosch GSB 185-LI 18V" width="1200" height="900" loading="lazy"
                                decoding="async">
                        </div>
                        <!-- IMG 2-->
                        <div class="section-24__panel section-24__panel--two">
                            <img class="section-24__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-parafusadeira-bosch-gsb-183-li-instalacao-parede-lifestyle-508715-02-2.webp"
                                alt="Detalhe da parafusadeira e furadeira Bosch GSB 185-LI" width="1200" height="900"
                                loading="lazy" decoding="async">
                        </div>
                        <!-- IMG 3-->
                        <div class="section-24__panel section-24__panel--three">
                            <img class="section-24__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/furadeira-impacto-parafusadeira-bosch-gsb-183-li-painel-eletrico-lifestyle-508715-02-3.webp"
                                alt="Bosch GSB 185-LI em contexto de uso" width="1200" height="900" loading="lazy"
                                decoding="async">
                        </div>
                    </div>

                    <figcaption class="section-24__caption">
                        <span class="section-24__message section-24__message--one">Motor brushless para mais tempo de
                            execução por carga e maior vida útil.</span>
                        <span class="section-24__message section-24__message--two">Mandril metálico para fixação firme
                            do
                            acessório e sensação de ferramenta robusta.</span>
                        <span class="section-24__message section-24__message--three">LED na base ajuda a iluminar o
                            ponto
                            exato de trabalho.</span>
                    </figcaption>
                </figure>
            </article>
        </section>

        <section class="section-11" aria-labelledby="section-11-title">
            <div class="section-11-container">
                <div class="section-11__header">
                    <h2 class="section-11__title">Detalhes que aceleram o trabalho</h2>
                    <p class="section-11__subtitle">Recursos pensados para furar, parafusar e manter controle em tarefas
                        de instalação, montagem e manutenção.</p>
                </div>
                <ul class="section-11__grid" role="list">
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de motor brushless 18V" width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">Força de 18V</h3>
                        <p class="section-11__value">Motor brushless entrega potência em tamanho compacto e ajuda a
                            aumentar o tempo de execução por carga.</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de mandril metálico" width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">Mandril metálico</h3>
                        <p class="section-11__value">Trava melhor o acessório e oferece mais robustez para a rotina de
                            furos e parafusamentos.</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de ferramenta compacta" width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">Compacta de verdade</h3>
                        <p class="section-11__value">Com apenas 177 mm, o corpo facilita o trabalho em cantos, móveis e
                            pontos com pouco espaço.</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de luz LED na base" width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">LED na base</h3>
                        <p class="section-11__value">Ilumina melhor o ponto onde o furo ou parafusamento será feito,
                            ajudando na precisão.</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de proteção eletrônica da bateria" width="74" height="74" loading="lazy">
                        </figure>
                        <h3 class="section-11__name">Proteção ECP</h3>
                        <p class="section-11__value">A proteção eletrônica ajuda a preservar a bateria contra
                            aquecimento e sobrecarga.</p>
                    </li>
                </ul>
            </div>
        </section>

        <p class="pdp__image-note">
            IMAGENS MERAMENTE ILUSTRATIVAS
        </p>

        <!-- Área de FAQ -->
        <section id="faq-section" aria-labelledby="faq-section-title">
            <div id="faq-section__header">
                <h2 id="faq-section-title">Dúvidas Frequentes</h2>
                <p id="faq-section__subtitle">Respostas rápidas sobre a Bosch GSB 185-LI</p>
            </div>
            <ul id="faq-section__list">
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">A Parafusadeira/Furadeira de Impacto Bosch GSB 185-LI é
                                indicada para quais usos?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">A Bosch GSB 185-LI é indicada para furação e parafusamento,
                                com função de impacto para aplicações que exigem mais força. O formato compacto ajuda no
                                uso em espaços menores sem abrir mão da potência de 18V.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">A Bosch GSB 185-LI é uma ferramenta compacta?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Sim. Ela possui apenas 177 mm de comprimento, sendo mais
                                compacta que a GSB 120-LI, que possui 187 mm. Isso facilita o manuseio em locais
                                apertados e melhora o controle durante o trabalho.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Qual é a vantagem do motor Brushless na GSB 185-LI?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O motor Brushless 18V entrega força de ferramenta a cabo em
                                um
                                tamanho super compacto. Além disso, contribui para maior tempo de execução por carga e
                                aumenta a vida útil da ferramenta.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">O mandril metálico da Bosch GSB 185-LI faz diferença?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Sim. O mandril metálico trava melhor o acessório, oferecendo
                                mais robustez e durabilidade no uso. Isso ajuda a manter a broca ou ponta mais firme
                                durante a aplicação.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">A Bosch GSB 185-LI possui iluminação LED?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Sim. A luz LED fica posicionada na base da ferramenta e
                                ilumina diretamente o ponto onde o furo ou parafusamento será feito. Isso melhora a
                                visibilidade em áreas com pouca luz.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">A Parafusadeira/Furadeira de Impacto GSB 185-LI tem proteção
                                para bateria?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Sim. Ela conta com Bosch Electronic Cell Protection, o
                                sistema
                                ECP, que protege eletronicamente a bateria contra aquecimento e sobrecarga. Isso ajuda a
                                preservar a vida útil da bateria.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">A GSB 185-LI entrega força mesmo sendo compacta?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Sim. Ela combina motor Brushless 18V com corpo compacto,
                                entregando força elevada em uma estrutura menor. É uma boa escolha para quem precisa de
                                potência com mais praticidade no manuseio.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">O que torna a Bosch GSB 185-LI mais prática no uso diário?
                            </h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O conjunto de corpo compacto, luz LED na base, mandril
                                metálico e motor Brushless torna o uso mais prático. A ferramenta oferece melhor
                                controle, boa iluminação da área de trabalho e mais segurança na fixação dos acessórios.
                            </p>
                        </div>
                    </details>
                </li>
            </ul>
        </section>

    </article>
</div>`,
  css: ``
}
);
