// @ts-nocheck
ColLib.registerCollectionLayout('carneiro-colecoes',
{
  id: 'variacao-26',
  name: 'Variaçao 26',
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
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .section-1 {
            --s1-color-brand: #ff9900;
            --s1-color-ink: #131313;
            --s1-color-muted: #6d6d6d;
            --s1-badge-size: 5.5rem;
            --s1-banner-height: 11rem;
            width: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: Roboto, Arial, sans-serif;
            color: var(--s1-color-ink);
            overflow-wrap: anywhere;
        }

        .section-1__banner {
            width: 100%;
            height: var(--s1-banner-height);
            position: relative;
            display: flex;
            justify-content: center;
            margin: 0;
        }

        .section-1__banner-media {
            width: 100%;
            height: 100%;
            margin: 0;
            position: relative;
        }

        .section-1__banner-video {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
        }

        .section-1__badge {
            width: var(--s1-badge-size);
            height: var(--s1-badge-size);
            position: absolute;
            bottom: calc(var(--s1-badge-size) / -2);
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            border-radius: 50%;
            background: var(--s1-color-brand);
        }

        .section-1__badge-img {
            width: 4rem;
            height: 4rem;
            object-fit: contain;
        }

        .section-1__body {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 5rem 1rem 2rem;
            text-align: center;
        }

        .section-1__brand {
            color: var(--s1-color-brand);
            font-size: clamp(0.75rem, 1.4vw, 0.875rem);
            font-weight: 700;
            letter-spacing: 0.16em;
            line-height: 1.4;
            text-transform: uppercase;
            margin: 0 0 1rem;
        }

        .section-1__title {
            width: min(100%, 52rem);
            color: var(--s1-color-ink);
            font-size: clamp(1.625rem, 4.5vw, 2.5rem);
            font-weight: 300;
            line-height: 1.18;
            margin: 0;
            text-wrap: balance;
        }

        .section-1__title-strong {
            display: block;
            font-weight: 700;
        }

        .section-1__subtitle {
            width: min(100%, 46rem);
            color: var(--s1-color-muted);
            font-size: clamp(0.9375rem, 2vw, 1.125rem);
            font-weight: 400;
            line-height: 1.7;
            margin: 1.5rem 0 0;
            text-wrap: pretty;
        }

        @media (min-width: 576px) {
            .section-1 {
                --s1-banner-height: 12rem;
            }
        }

        @media (min-width: 768px) {
            .section-1 {
                --s1-badge-size: 8rem;
                --s1-banner-height: 16rem;
            }

            .section-1__badge-img {
                width: 5.625rem;
                height: 5.625rem;
            }

            .section-1__body {
                padding: 6.5rem 1.5rem 2.5rem;
            }
        }

        @media (min-width: 992px) {
            .section-1__body {
                padding: 6.5rem 2rem 2.5rem;
            }
        }

        @media (min-width: 1200px) {
            .section-1__body {
                padding: 6.5rem 2.5rem 3rem;
            }
        }

        @media (min-width: 1400px) {
            .section-1__body {
                padding: 6.5rem 3rem 3rem;
            }
        }

        .section-2 {
            --s2-color-brand: #003da5;
            --s2-color-ink: #081844;
            --s2-color-muted: #29324d;
            --s2-color-panel: rgba(255, 255, 255, 0.92);
            width: 100%;
            padding: 0 1rem 1rem;
            font-family: Roboto, Arial, sans-serif;
            color: var(--s2-color-ink);
            overflow-wrap: anywhere;
        }

        .section-2__frame {
            width: 100%;
            position: relative;
            overflow: hidden;
            border-radius: 1.5rem;
            background: #e7f1ff;
            box-shadow: 0 1rem 2.5rem rgba(3, 33, 82, 0.12);
        }

        .section-2__media {
            width: 100%;
            margin: 0;
            aspect-ratio: 16 / 9;
        }

        .section-2__picture {
            width: 100%;
            height: 100%;
            display: block;
        }

        .section-2__image {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
        }

        .section-2__callout {
            display: flex;
            align-items: start;
            gap: 1rem;
            margin: 1rem;
            padding: 1.5rem;
            border: 1px solid rgba(0, 61, 165, 0.12);
            border-radius: 1.5rem;
            background: var(--s2-color-panel);
            box-shadow: 0 1rem 2rem rgba(3, 33, 82, 0.1);
        }

        .section-2__icon {
            width: 3.5rem;
            height: 3.5rem;
            flex: 0 0 3.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 1rem;
            color: var(--s2-color-brand);
            background: #eef5ff;
        }

        .section-2__icon-svg {
            width: 2.5rem;
            height: 2.5rem;
            display: block;
        }

        .section-2__title {
            color: var(--s2-color-brand);
            font-size: clamp(1.5rem, 4vw, 2.375rem);
            font-weight: 700;
            line-height: 1.18;
            margin: 0;
            text-wrap: balance;
        }

        .section-2__text {
            color: var(--s2-color-muted);
            font-size: clamp(0.9375rem, 2vw, 1.125rem);
            font-weight: 400;
            line-height: 1.7;
            margin: 1rem 0 0;
            text-wrap: pretty;
        }

        @media (min-width: 576px) {
            .section-2 {
                padding: 0 1.5rem 1rem;
            }
        }

        @media (min-width: 768px) {
            .section-2 {
                padding: 0 2rem 1rem;
            }

            .section-2__callout {
                width: min(48%, 28rem);
                position: absolute;
                top: 50%;
                left: 2rem;
                margin: 0;
                transform: translateY(-50%);
            }
        }

        @media (min-width: 992px) {
            .section-2 {
                padding: 0 2.5rem 1rem;
            }

            .section-2__callout {
                left: 4rem;
                padding: 2rem;
            }
        }

        @media (min-width: 1200px) {
            .section-2 {
                padding: 0 3rem 1rem;
            }
        }

        @media (min-width: 1400px) {
            .section-2 {
                padding: 0 3rem 1rem;
            }
        }

        .section-3 {
            --s3-color-brand: #003da5;
            --s3-color-ink: #081844;
            --s3-color-muted: #5b6682;
            width: 100%;
            padding: 0 1rem 1.5rem;
            font-family: Roboto, Arial, sans-serif;
            color: var(--s3-color-ink);
            overflow-wrap: anywhere;
        }

        .section-3__list {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            align-items: start;
            gap: 1rem;
            list-style: none;
            margin: 0;
            padding: 1rem;
            border: 1px solid rgba(8, 24, 68, 0.08);
            border-radius: 1.5rem;
            background: #ffffff;
            box-shadow: 0 0.75rem 1.5rem rgba(3, 33, 82, 0.08);
        }

        .section-3__item {
            min-height: 3.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            padding: 1rem;
            border: 1px solid #dbe5f4;
            border-radius: 999px;
            background: #ffffff;
            color: var(--s3-color-brand);
        }

        .section-3__item--active {
            border-color: #dbe5f4;
            color: #003da5;

        }

        .section-3__icon {
            width: 1.75rem;
            height: 1.75rem;
            flex: 0 0 1.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .section-3__icon-svg {
            width: 1.5rem;
            height: 1.5rem;
            display: block;
        }

        .section-3__text {
            color: currentColor;
            font-size: clamp(0.875rem, 1.8vw, 1rem);
            font-weight: 700;
            line-height: 1.4;
            text-align: center;
        }

        @media (min-width: 576px) {
            .section-3 {
                padding: 0 1.5rem 1.5rem;
            }

            .section-3__list {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (min-width: 768px) {
            .section-3 {
                padding: 0 2rem 1.5rem;
            }
        }

        @media (min-width: 992px) {
            .section-3 {
                padding: 0 2.5rem 1.5rem;
            }

            .section-3__list {
                grid-template-columns: repeat(4, minmax(0, 1fr));
            }
        }

        @media (min-width: 1200px) {
            .section-3 {
                padding: 0 3rem 1.5rem;
            }
        }

        @media (min-width: 1400px) {
            .section-3 {
                padding: 0 3rem 1.5rem;
            }
        }

        .section-4 {
            --s4-color-brand: #003da5;
            --s4-color-ink: #ffffff;
            --s4-color-soft: #dfeaff;
            width: 100%;
            padding: 0 1rem 1.5rem;
            font-family: Roboto, Arial, sans-serif;
            color: var(--s4-color-ink);
            overflow-wrap: anywhere;
        }

        .section-4__inner {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            align-items: start;
            overflow: hidden;
            border-radius: 1.5rem;
            background: var(--s4-color-brand);
            box-shadow: 0 1rem 2.5rem rgba(3, 33, 82, 0.12);
        }

        .section-4--reverse .section-4__inner {
            direction: rtl;
        }

        .section-4--reverse .section-4__media,
        .section-4--reverse .section-4__content {
            direction: ltr;
        }

        .section-4__media {
            width: 100%;
            margin: 0;
            aspect-ratio: 4 / 3;
        }

        .section-4__image {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
        }

        .section-4__content {
            min-width: 0;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;
            padding: 2rem;
            background: linear-gradient(135deg, #0849ba 0%, var(--s4-color-brand) 100%);
        }

        .section-4__title {
            color: var(--s4-color-ink);
            font-size: clamp(1.75rem, 4.2vw, 2.625rem);
            font-weight: 700;
            line-height: 1.18;
            margin: 0;
            text-wrap: balance;
        }

        .section-4__rule {
            width: 4rem;
            height: 0.125rem;
            margin: 1.5rem 0;
            border-radius: 999px;
            background: var(--s4-color-soft);
        }

        .section-4__text {
            color: var(--s4-color-soft);
            font-size: clamp(0.9375rem, 2vw, 1.125rem);
            font-weight: 400;
            line-height: 1.7;
            margin: 0;
            text-wrap: pretty;
        }

        @media (min-width: 576px) {
            .section-4 {
                padding: 0 1.5rem 1.5rem;
            }
        }

        @media (min-width: 768px) {
            .section-4 {
                padding: 0 2rem 1.5rem;
            }

            .section-4__inner {
                grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            }

            .section-4__media {
                height: 100%;
                aspect-ratio: auto;
            }

            .section-4__content {
                min-height: 24rem;
                padding: 3rem;
            }
        }

        @media (min-width: 992px) {
            .section-4 {
                padding: 0 2.5rem 1.5rem;
            }
        }

        @media (min-width: 1200px) {
            .section-4 {
                padding: 0 3rem 1.5rem;
            }
        }

        @media (min-width: 1400px) {
            .section-4 {
                padding: 0 3rem 1.5rem;
            }
        }

        .section-5 {
            --s5-color-brand: #003da5;
            --s5-color-ink: #081844;
            --s5-color-muted: #34415f;
            --s5-color-line: #dbe5f4;
            width: 100%;
            padding: 0 1rem 1rem;
            font-family: Roboto, Arial, sans-serif;
            color: var(--s5-color-ink);
            overflow-wrap: anywhere;
        }

        .section-5__inner {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            align-items: start;
            gap: 1.5rem;
            padding: 1.5rem;
            border: 1px solid rgba(8, 24, 68, 0.08);
            border-radius: 1.5rem;
            background: #ffffff;
            box-shadow: 0 1rem 2.5rem rgba(3, 33, 82, 0.1);
        }

        .section-5--reverse .section-5__inner {
            direction: rtl;
        }

        .section-5--reverse .section-5__content,
        .section-5--reverse .section-5__media {
            direction: ltr;
        }

        .section-5__content {
            min-width: 0;
            display: flex;
            flex-direction: column;
        }

        .section-5__list {
            display: grid;
            grid-template-columns: 1fr;
            align-items: start;
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .section-5__item {
            display: grid;
            grid-template-columns: 3.5rem minmax(0, 1fr);
            align-items: start;
            gap: 1rem;
            padding: 1rem 0;
            border-bottom: 1px solid var(--s5-color-line);
        }

        .section-5__item:first-child {
            padding-top: 0;
        }

        .section-5__item:last-child {
            padding-bottom: 0;
            border-bottom: 0;
        }

        .section-5__icon-shell {
            width: 3.5rem;
            height: 3.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            color: var(--s5-color-brand);
            background: #edf4ff;
        }

        .section-5__icon {
            width: 2.5rem;
            height: 2.5rem;
            display: block;
        }

        .section-5__feature-title {
            color: var(--s5-color-ink);
            font-size: clamp(1rem, 2vw, 1.1875rem);
            font-weight: 700;
            line-height: 1.35;
            margin: 0;
            text-wrap: balance;
        }

        .section-5__feature-text {
            color: var(--s5-color-muted);
            font-size: clamp(0.875rem, 1.8vw, 1rem);
            font-weight: 400;
            line-height: 1.6;
            margin: 0.5rem 0 0;
            text-wrap: pretty;
        }

        .section-5__media {
            width: 100%;
            margin: 0;
            overflow: hidden;
            border-radius: 1.25rem;
            aspect-ratio: 4 / 3;
        }

        .section-5__image {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
        }

        @media (min-width: 576px) {
            .section-5 {
                padding: 0 1.5rem 1rem;
            }

            .section-5__inner {
                padding: 2rem;
            }
        }

        @media (min-width: 768px) {
            .section-5 {
                padding: 0 2rem 1rem;
            }

            .section-5__inner {
                grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
                gap: 2rem;
                padding: 2rem;
            }

            .section-5__media {
                height: 100%;
                aspect-ratio: auto;
            }
        }

        @media (min-width: 992px) {
            .section-5 {
                padding: 0 2.5rem 1rem;
            }

            .section-5__inner {
                gap: 2.5rem;
            }
        }

        @media (min-width: 1200px) {
            .section-5 {
                padding: 0 3rem 1rem;
            }
        }

        @media (min-width: 1400px) {
            .section-5 {
                padding: 0 3rem 1rem;
            }
        }

        .section-6 {
            --s6-color-muted: #7b8498;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 1rem 1rem 0;
            font-family: Roboto, Arial, sans-serif;
            color: var(--s6-color-muted);
            text-align: center;
            overflow-wrap: anywhere;
        }

        .section-6__icon {
            width: 1rem;
            height: 1rem;
            flex: 0 0 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid currentColor;
            border-radius: 50%;
            font-size: clamp(0.75rem, 1.5vw, 0.875rem);
            font-weight: 700;
            line-height: 1;
        }

        .section-6__text {
            font-size: clamp(0.75rem, 1.8vw, 1rem);
            font-weight: 400;
            letter-spacing: 0.04em;
            line-height: 1.5;
            text-transform: uppercase;
        }

        @media (min-width: 576px) {
            .section-6 {
                padding: 1rem 1.5rem 0;
            }
        }

        @media (min-width: 768px) {
            .section-6 {
                padding: 1rem 2rem 0;
            }
        }

        @media (min-width: 992px) {
            .section-6 {
                padding: 1rem 2.5rem 0;
            }
        }

        @media (min-width: 1200px) {
            .section-6 {
                padding: 1rem 3rem 0;
            }
        }

        @media (min-width: 1400px) {
            .section-6 {
                padding: 1rem 3rem 0;
            }
        }

        .section-7 {
            --s7-color-brand: #003da5;
            --s7-color-ink: #081844;
            --s7-color-muted: #6d7792;
            --s7-color-line: #dbe5f4;
            width: 100%;
            padding: 1rem 1rem 2rem;
            font-family: Roboto, Arial, sans-serif;
            color: var(--s7-color-ink);
            overflow-wrap: anywhere;
        }

        .section-7__inner {
            width: 100%;
            padding: 1.5rem;
            border: 1px solid rgba(8, 24, 68, 0.08);
            border-radius: 1.5rem;
            background: #ffffff;
            box-shadow: 0 1rem 2.5rem rgba(3, 33, 82, 0.08);
        }

        .section-7__intro {
            text-align: center;
            margin: 0 0 1.5rem;
        }

        .section-7__title {
            color: var(--s7-color-brand);
            font-size: clamp(1.625rem, 3.6vw, 2.25rem);
            font-weight: 700;
            line-height: 1.2;
            margin: 0;
            text-wrap: balance;
        }

        .section-7__subtitle {
            color: var(--s7-color-muted);
            font-size: clamp(0.875rem, 1.8vw, 1rem);
            font-weight: 400;
            line-height: 1.6;
            margin: 0.5rem 0 0;
        }

        .section-7__list {
            display: grid;
            grid-template-columns: 1fr;
            align-items: start;
            gap: 0.5rem;
        }

        .section-7__item {
            border: 1px solid var(--s7-color-line);
            border-radius: 0.75rem;
            background: #ffffff;
            overflow: hidden;
        }

        .section-7__question {
            min-height: 3.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            padding: 1rem 1.5rem;
            cursor: pointer;
            list-style: none;
        }

        .section-7__question::marker {
            content: "";
            font-size: 0;
        }

        .section-7__question::-webkit-details-marker {
            width: 0;
            height: 0;
            color: transparent;
            font-size: 0;
        }

        .section-7__question-text {
            color: var(--s7-color-ink);
            font-size: clamp(0.875rem, 1.8vw, 1rem);
            font-weight: 700;
            line-height: 1.4;
            margin: 0;
            text-wrap: pretty;
        }

        .section-7__icon {
            width: 1rem;
            height: 1rem;
            position: relative;
            flex: 0 0 1rem;
            color: var(--s7-color-brand);
        }

        .section-7__icon::before,
        .section-7__icon::after {
            content: "";
            position: absolute;
            border-radius: 999px;
            background: currentColor;
            transition: transform 0.24s ease, opacity 0.24s ease;
        }

        .section-7__icon::before {
            width: 1rem;
            height: 0.125rem;
            top: 0.4375rem;
            left: 0;
        }

        .section-7__icon::after {
            width: 0.125rem;
            height: 1rem;
            top: 0;
            left: 0.4375rem;
        }

        .section-7__item[open] .section-7__icon::after {
            transform: rotate(90deg);
            opacity: 0;
        }

        .section-7__answer {
            padding: 0 1.5rem 1rem;
            border-top: 1px solid var(--s7-color-line);
        }

        .section-7__answer-text {
            color: var(--s7-color-muted);
            font-size: clamp(0.875rem, 1.8vw, 1rem);
            font-weight: 400;
            line-height: 1.7;
            margin: 1rem 0 0;
            text-wrap: pretty;
        }

        @media (min-width: 576px) {
            .section-7 {
                padding: 1rem 1.5rem 2.5rem;
            }
        }

        @media (min-width: 768px) {
            .section-7 {
                padding: 1rem 2rem 2.5rem;
            }

            .section-7__inner {
                padding: 2rem;
            }
        }

        @media (min-width: 992px) {
            .section-7 {
                padding: 1rem 2.5rem 3rem;
            }
        }

        @media (min-width: 1200px) {
            .section-7 {
                padding: 1rem 3rem 3rem;
            }
        }

        @media (min-width: 1400px) {
            .section-7 {
                padding: 1rem 3rem 3rem;
            }
        }
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="section-1" aria-label="Cabeçalho do Desodorante NIVEA Protect &amp; Care">
            <figure class="section-1__banner">
                <div class="section-1__banner-media">
                    <video class="section-1__banner-video"
                        poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-nivea.webp"
                        preload="none" autoplay muted loop playsinline aria-hidden="true">
                        <source src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-nivea.webm"
                            type="video/webm">
                    </video>
                </div>

                <span class="section-1__badge" role="img" aria-label="Logo NIVEA">
                    <img class="section-1__badge-img"
                        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/nivea/nivea-logo.png"
                        alt="Logo NIVEA" width="90" height="90" loading="eager" decoding="async">
                </span>
            </figure>

            <article class="section-1__body">
                <p class="section-1__brand">NIVEA</p>
                <h2 class="section-1__title">
                    Desodorante Protect &amp; Care
                    <span class="section-1__title-strong">Aerossol Feminino 200 ml</span>
                </h2>
                <p class="section-1__subtitle">
                    Proteção por 72 horas contra suor e mau odor, com fragrância NIVEA Creme.
                    Dermatologicamente testado.
                </p>
            </article>
        </section>

        <section class="section-2" aria-label="Proteção do Desodorante NIVEA Protect &amp; Care">
            <article class="section-2__frame">
                <figure class="section-2__media">
                    <picture class="section-2__picture">
                        <source media="(width <= 575px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/desodorante-aerossol-feminino-nivea-protect-care-detalhe-embalagem-economica-72h-208142-01-2.webp">
                        <img class="section-2__image"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/desodorante-aerossol-feminino-nivea-protect-care-embalagem-economica-72h-208142-01-1.webp"
                            alt="Desodorante Antitranspirante Aerossol Feminino Nívea Protect Care Embalagem Econômica 200ml 72h proteção"
                            width="1600" height="650" loading="lazy" decoding="async">
                    </picture>
                </figure>

                <article class="section-2__callout">
                    <span class="section-2__icon" aria-hidden="true">
                        <svg class="section-2__icon-svg" viewBox="0 0 48 48" fill="none" focusable="false">
                            <path d="M24 5.5 39 11v11.5c0 9.5-6.1 16.8-15 20-8.9-3.2-15-10.5-15-20V11l15-5.5Z"
                                stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
                            <path d="m17 24 4.5 4.5L31.5 18" stroke="currentColor" stroke-width="3"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                    <div class="section-2__copy">
                        <h2 class="section-2__title">Proteção por 72 horas</h2>
                        <p class="section-2__text">Protege contra o suor e o mau odor.</p>
                    </div>
                </article>
            </article>
        </section>

        <section class="section-3" aria-label="Benefícios principais do desodorante">
            <ul class="section-3__list">
                <li class="section-3__item section-3__item--active">
                    <span class="section-3__icon" aria-hidden="true">
                        <svg class="section-3__icon-svg" viewBox="0 0 24 24" fill="none" focusable="false">
                            <path d="M12 3.5 19 6v5.5c0 4.4-2.8 7.8-7 9.4-4.2-1.6-7-5-7-9.4V6l7-2.5Z"
                                stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                            <path d="m9 12 2 2 4-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </span>
                    <span class="section-3__text">Proteção 72h</span>
                </li>
                <li class="section-3__item">
                    <span class="section-3__icon" aria-hidden="true">
                        <svg class="section-3__icon-svg" viewBox="0 0 24 24" fill="none" focusable="false">
                            <path d="M12 3.5c4 4.8 6 8.2 6 11.1a6 6 0 0 1-12 0c0-2.9 2-6.3 6-11.1Z"
                                stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                        </svg>
                    </span>
                    <span class="section-3__text">Cuidado completo</span>
                </li>
                <li class="section-3__item">
                    <span class="section-3__icon" aria-hidden="true">
                        <svg class="section-3__icon-svg" viewBox="0 0 24 24" fill="none" focusable="false">
                            <path d="M20 5c-8.2.3-13 4.4-15 12.5 4.8-.8 9.2-3.7 15-12.5Z" stroke="currentColor"
                                stroke-width="1.8" stroke-linejoin="round" />
                            <path d="M5 18c3-4.1 6.4-6.8 10.4-8.2" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" />
                        </svg>
                    </span>
                    <span class="section-3__text">Fragrância NIVEA Creme</span>
                </li>
                <li class="section-3__item">
                    <span class="section-3__icon" aria-hidden="true">
                        <svg class="section-3__icon-svg" viewBox="0 0 24 24" fill="none" focusable="false">
                            <path d="M9 8h6v12H9V8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                            <path d="M10.5 4h3L15 8H9l1.5-4Z" stroke="currentColor" stroke-width="1.8"
                                stroke-linejoin="round" />
                            <path d="M12 11v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                        </svg>
                    </span>
                    <span class="section-3__text">Aplicação prática</span>
                </li>
            </ul>
        </section>

        <section class="section-4" aria-label="Cuidado completo para as axilas">
            <article class="section-4__inner">
                <figure class="section-4__media">
                    <img class="section-4__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/208143_03.webp"
                        alt="Mulher com os braços levantados representando axilas bem cuidadas" width="1200"
                        height="800" loading="lazy" decoding="async">
                </figure>

                <div class="section-4__content">
                    <h2 class="section-4__title">Cuidado completo para as axilas</h2>
                    <span class="section-4__rule" aria-hidden="true"></span>
                    <p class="section-4__text">
                        Fórmula com o melhor do NIVEA Creme, que cuida da pele enquanto protege contra suor e mau odor.
                    </p>
                </div>
            </article>
        </section>

        <section class="section-5" aria-label="Características do Desodorante NIVEA Protect &amp; Care">
            <article class="section-5__inner">
                <div class="section-5__content">
                    <ul class="section-5__list">
                        <li class="section-5__item">
                            <span class="section-5__icon-shell" role="img" aria-label="Proteção por 72 horas">
                                <svg class="section-5__icon" viewBox="0 0 48 48" fill="none" aria-hidden="true"
                                    focusable="false">
                                    <path
                                        d="M24 5.5 38 10.7v10.8c0 8.8-5.7 15.7-14 18.7-8.3-3-14-9.9-14-18.7V10.7L24 5.5Z"
                                        stroke="currentColor" stroke-width="2.8" stroke-linejoin="round" />
                                    <circle cx="24" cy="23" r="8" stroke="currentColor" stroke-width="2.8" />
                                    <path d="M24 18.5V23l3.5 2" stroke="currentColor" stroke-width="2.8"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                            <div class="section-5__feature-copy">
                                <h2 class="section-5__feature-title">Proteção prolongada</h2>
                                <p class="section-5__feature-text">Proteção por 72 horas contra suor e mau odor.</p>
                            </div>
                        </li>
                        <li class="section-5__item">
                            <span class="section-5__icon-shell" role="img" aria-label="Fragrância NIVEA Creme">
                                <svg class="section-5__icon" viewBox="0 0 48 48" fill="none" aria-hidden="true"
                                    focusable="false">
                                    <path d="m13 12 18 18" stroke="currentColor" stroke-width="3"
                                        stroke-linecap="round" />
                                    <path d="m10 9 5-2 15 15-4 4L10 9Z" stroke="currentColor" stroke-width="2.8"
                                        stroke-linejoin="round" />
                                    <path d="m30 22 7 7-7 7-7-7" stroke="currentColor" stroke-width="2.8"
                                        stroke-linejoin="round" />
                                    <path d="M36 8v6M33 11h6M11 31v5M8.5 33.5h5" stroke="currentColor"
                                        stroke-width="2.6" stroke-linecap="round" />
                                </svg>
                            </span>
                            <div class="section-5__feature-copy">
                                <h2 class="section-5__feature-title">Fragrância exclusiva</h2>
                                <p class="section-5__feature-text">Fragrância característica do NIVEA Creme.</p>
                            </div>
                        </li>
                        <li class="section-5__item">
                            <span class="section-5__icon-shell" role="img"
                                aria-label="Fórmula dermatologicamente testada">
                                <svg class="section-5__icon" viewBox="0 0 48 48" fill="none" aria-hidden="true"
                                    focusable="false">
                                    <path d="M19 7h10M20.5 7v7L15 22.5V38h18V22.5L27.5 14V7" stroke="currentColor"
                                        stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15 29h18" stroke="currentColor" stroke-width="2.8"
                                        stroke-linecap="round" />
                                    <circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="2.8" />
                                    <path d="M11.5 11.5 36.5 36.5" stroke="currentColor" stroke-width="3.2"
                                        stroke-linecap="round" />
                                </svg>
                            </span>
                            <div class="section-5__feature-copy">
                                <h2 class="section-5__feature-title">Dermatologicamente testado</h2>
                                <p class="section-5__feature-text">Fórmula desenvolvida para o cuidado das axilas.</p>
                            </div>
                        </li>
                        <li class="section-5__item">
                            <span class="section-5__icon-shell" role="img" aria-label="Aplicação prática em aerossol">
                                <svg class="section-5__icon" viewBox="0 0 48 48" fill="none" aria-hidden="true"
                                    focusable="false">
                                    <path d="M16 16h15v25H16V16Z" stroke="currentColor" stroke-width="2.8"
                                        stroke-linejoin="round" />
                                    <path d="M19 11h9l3 5H16l3-5Z" stroke="currentColor" stroke-width="2.8"
                                        stroke-linejoin="round" />
                                    <path d="M22 7h7v4h-7V7Z" stroke="currentColor" stroke-width="2.8"
                                        stroke-linejoin="round" />
                                    <path d="M29 9h5" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" />
                                    <path d="M36 9h1M39.5 7.5l1-.5M39.5 10.5l1 .5" stroke="currentColor"
                                        stroke-width="2.6" stroke-linecap="round" />
                                    <path d="M20 23h7M20 28h7" stroke="currentColor" stroke-width="2.4"
                                        stroke-linecap="round" />
                                </svg>
                            </span>
                            <div class="section-5__feature-copy">
                                <h2 class="section-5__feature-title">Aplicação prática</h2>
                                <p class="section-5__feature-text">Aplique a 15 cm e espere secar antes de se vestir.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

                <figure class="section-5__media">
                    <img class="section-5__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/208143_02.webp"
                        alt="Desodorante NIVEA Protect &amp; Care aplicado na axila" width="1200" height="800"
                        loading="lazy" decoding="async">
                </figure>
            </article>
        </section>

        <aside class="section-6" aria-label="Aviso sobre as imagens">
            <span class="section-6__icon" aria-hidden="true">i</span>
            <span class="section-6__text">Imagens meramente ilustrativas</span>
        </aside>

        <section class="section-7" aria-label="Dúvidas sobre o produto">
            <article class="section-7__inner">
                <div class="section-7__intro">
                    <h2 class="section-7__title">Dúvidas sobre o produto</h2>
                    <p class="section-7__subtitle">Informações rápidas para uso seguro</p>
                </div>

                <div class="section-7__list">
                    <details class="section-7__item">
                        <summary class="section-7__question">
                            <h3 class="section-7__question-text">Para que serve o Desodorante NIVEA Aerossol Feminino
                                Protect &amp;
                                Care 200 ml?</h3>
                            <span class="section-7__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="section-7__answer">
                            <p class="section-7__answer-text">Protege contra o suor e o mau odor por 72 horas, enquanto
                                cuida da
                                pele das axilas.</p>
                        </div>
                    </details>

                    <details class="section-7__item">
                        <summary class="section-7__question">
                            <h3 class="section-7__question-text">Como aplicar o antitranspirante corretamente?</h3>
                            <span class="section-7__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="section-7__answer">
                            <p class="section-7__answer-text">Aplique nas axilas a 15 cm de distância. Espere o
                                produto
                                secar antes de se vestir.</p>
                        </div>
                    </details>

                    <details class="section-7__item">
                        <summary class="section-7__question">
                            <h3 class="section-7__question-text">Onde o desodorante deve ser aplicado?</h3>
                            <span class="section-7__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="section-7__answer">
                            <p class="section-7__answer-text">Use somente nas axilas. Não aplique se a pele estiver
                                irritada ou
                                lesionada.</p>
                        </div>
                    </details>

                    <details class="section-7__item">
                        <summary class="section-7__question">
                            <h3 class="section-7__question-text">Por quanto tempo o aerossol protege contra suor e mau
                                odor?
                            </h3>
                            <span class="section-7__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="section-7__answer">
                            <p class="section-7__answer-text">O desodorante oferece proteção contra suor e mau odor por
                                72 horas.</p>
                        </div>
                    </details>

                    <details class="section-7__item">
                        <summary class="section-7__question">
                            <h3 class="section-7__question-text">Quais são os diferenciais da fórmula?</h3>
                            <span class="section-7__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="section-7__answer">
                            <p class="section-7__answer-text">A fórmula reúne o cuidado do NIVEA Creme, fragrância
                                exclusiva e
                                proteção dermatologicamente testada.</p>
                        </div>
                    </details>
                </div>
            </article>
        </section>
    </div>
</div>`,
  css: ``
}
);
