// @ts-nocheck
ColLib.registerCollectionLayout('carneiro-colecoes',
{
  id: 'variao-28',
  name: 'Variao 28',
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
            color: #4E3B32;
            margin: 0 0 12px;
            line-height: 98%;
        }

        #faq-section__subtitle {
            font-size: 1rem;
            color: #705548;
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
            background: #FAF7F1;
            border: 1px solid #DED1BF;
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
            background: #F3EBDD;
        }

        #faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #4E3B32;
            flex: 1;
        }

        #faq-section__q-text:hover {
            color: #6B4A3A;
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
            background: #705548;
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
            border-top: 1px solid #DED1BF;
        }

        #faq-section__a-text {
            font-size: 0.9rem;
            color: #5F4A3F;
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
            padding: calc(var(--badge-size) / 2 + 1.8rem) 0.3rem 1.1rem;
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
                max-width: 95%;
                margin: 1.25rem auto 0;
            }
        }
    </style>

    <style>
        .section-3 {
            --s2-color-brand: #6B4A3A;
            --s2-color-ink: #4E3B32;
            --s2-color-muted: #705548;
            --s2-color-panel: rgba(250, 247, 241, 0.94);
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
            background: #F3EBDD;
            box-shadow: 0 1rem 2.5rem rgba(78, 59, 50, 0.14);
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
            border: 1px solid rgba(112, 85, 72, 0.24);
            border-radius: 1.5rem;
            background: var(--s2-color-panel);
            box-shadow: 0 1rem 2rem rgba(78, 59, 50, 0.12);
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
                width: min(48%, 21rem);
                position: absolute;
                top: 34%;
                left: 4%;
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
        .section-8 {
            --s3-color-brand: #6B4A3A;
            --s3-color-ink: #4E3B32;
            --s3-color-muted: #705548;
            --s3-color-soft: #EADFD3;
            --s3-color-line: #DED1BF;
            --s3-color-surface: #fff;
            width: 100%;
            position: relative;
            padding: 0 1rem 1.5rem;
            font-family: Roboto, Arial, sans-serif;
            color: var(--s3-color-ink);
            overflow-wrap: anywhere;
        }

        .section-8__control {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 1px;
            height: 1px;
            opacity: 0;
            pointer-events: none;
            transform: translate(-50%, -50%);
        }

        .section-8__inner {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            align-items: start;
            gap: 1rem;
            padding: 1rem;
            overflow: hidden;
            border: 1px solid rgba(78, 59, 50, 0.10);
            border-radius: 1.5rem;
            background: var(--s3-color-surface);
            box-shadow: 0 1rem 2.5rem rgba(78, 59, 50, 0.12);
        }

        .section-8__tabs {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            justify-content: center;
            gap: 1rem;
        }

        .section-8__tab {
            min-height: 3.5rem;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            padding: 1rem;
            border: 1px solid var(--s3-color-line);
            border-radius: 999px;
            background: var(--s3-color-surface);
            color: var(--s3-color-brand);
            cursor: pointer;
            transition: background-color 240ms ease, border-color 240ms ease, color 240ms ease, transform 240ms ease;
        }

        .section-8__tab-icon {
            width: 1.75rem;
            height: 1.75rem;
            flex: 0 0 1.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .section-8__tab-icon-svg {
            width: 1.5rem;
            height: 1.5rem;
            display: block;
        }

        .section-8__tab-text {
            color: currentColor;
            font-size: clamp(0.875rem, 1.8vw, 1rem);
            font-weight: 700;
            line-height: 1.4;
            text-align: center;
        }

        .section-8__viewport {
            width: 100%;
            display: grid;
            align-items: center;
            overflow: hidden;
            order: -2;
            border-radius: 1.5rem;
            background: var(--s3-color-brand);
        }

        .section-8__panel {
            width: 100%;
            grid-area: 1 / 1;
            display: grid;
            grid-template-columns: 1fr;
            align-items: start;
            opacity: 0;
            pointer-events: none;
            transform: translateX(1rem);
            transition: opacity 320ms ease, transform 320ms ease;
        }

        .section-8__media {
            width: 100%;
            margin: 0;
            aspect-ratio: 4 / 3;
        }

        .section-8__image {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
        }

        .section-8__content {
            min-width: 0;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;
            padding: 2rem;
            background: linear-gradient(135deg, #8A6550 0%, var(--s3-color-brand) 100%);
        }

        .section-8__title {
            color: var(--s3-color-surface);
            font-size: clamp(1.75rem, 4.2vw, 2.625rem);
            font-weight: 400;
            line-height: 1.18;
            margin: 0;
            text-wrap: balance;
        }

        .section-8__rule {
            width: 4rem;
            height: 0.125rem;
            margin: 1.5rem 0;
            border-radius: 999px;
            background: var(--s3-color-soft);
        }

        .section-8__copy {
            color: var(--s3-color-soft);
            font-size: clamp(0.9375rem, 2vw, 1.125rem);
            font-weight: 400;
            line-height: 1.7;
            margin: 0;
            text-wrap: pretty;
        }

        .section-8__dots {
            display: flex;
            align-items: center;
            justify-content: center;
            order: -1;
            gap: 1rem;
            margin: 0.5rem 0 0;
        }

        .section-8__dot {
            width: 1rem;
            height: 1rem;
            position: relative;
            border: 1px solid var(--s3-color-brand);
            border-radius: 50%;
            background: var(--s3-color-surface);
            transition: background-color 240ms ease, transform 240ms ease;
        }

        .section-8:has(.section-8__control--protection:checked) .section-8__tab--protection,
        .section-8:has(.section-8__control--care:checked) .section-8__tab--care,
        .section-8:has(.section-8__control--fragrance:checked) .section-8__tab--fragrance,
        .section-8:has(.section-8__control--application:checked) .section-8__tab--application {
            border-color: var(--s3-color-brand);
            background: var(--s3-color-brand);
            color: var(--s3-color-surface);
            transform: translateY(-0.5rem);
        }

        .section-8__tab:has(.section-8__control:focus-visible) {
            outline: 0.125rem solid var(--s3-color-brand);
            outline-offset: 0.25rem;
        }

        .section-8:has(.section-8__control--protection:checked) .section-8__panel--protection,
        .section-8:has(.section-8__control--care:checked) .section-8__panel--care,
        .section-8:has(.section-8__control--fragrance:checked) .section-8__panel--fragrance,
        .section-8:has(.section-8__control--application:checked) .section-8__panel--application {
            opacity: 1;
            pointer-events: auto;
            transform: translateX(0);
            z-index: 1;
        }

        .section-8:has(.section-8__control--protection:checked) .section-8__dot--protection,
        .section-8:has(.section-8__control--care:checked) .section-8__dot--care,
        .section-8:has(.section-8__control--fragrance:checked) .section-8__dot--fragrance,
        .section-8:has(.section-8__control--application:checked) .section-8__dot--application {
            background: var(--s3-color-brand);
            transform: scale(1.25);
        }

        @media (min-width: 576px) {
            .section-8 {
                padding: 0 1.5rem 1.5rem;
            }

            .section-8__tabs {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (min-width: 768px) {
            .section-8 {
                padding: 0 2rem 1.5rem;
            }

            .section-8__inner {
                gap: 1.5rem;
                padding: 1.5rem;
            }

            .section-8__panel {
                grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            }

            .section-8__panel--care,
            .section-8__panel--application {
                direction: rtl;
            }

            .section-8__panel--care .section-8__media,
            .section-8__panel--care .section-8__content,
            .section-8__panel--application .section-8__media,
            .section-8__panel--application .section-8__content {
                direction: ltr;
            }

            .section-8__media {
                height: 100%;
                aspect-ratio: auto;
            }

            .section-8__content {
                min-height: 24rem;
                padding: 3rem;
            }
        }

        @media (min-width: 992px) {
            .section-8 {
                padding: 0 2.5rem 1.5rem;
            }

            .section-8__tabs {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (min-width: 1200px) {
            .section-8 {
                padding: 0 3rem 1.5rem;
            }
        }

        @media (min-width: 1400px) {
            .section-8 {
                padding: 0 3rem 1.5rem;
            }
        }
    </style>

    <style>
        .section-33__container {
            width: 92%;
            border-radius: 26px;
            max-width: 1600px;
            margin: 0 auto;
            background-color: #6B4A3A;
        }

        .section-33__video-section {
            position: relative;
            width: 95%;
            margin: auto;
            max-height: 865px;
            overflow: hidden;
            /* background: linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #e94560 100%); */
            border-radius: 30px;
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
    <article class="pdp" id="pdp" aria-labelledby="product-main"> <!-- HTML fica dentro dessa div PDP -->

        <section class="section-2-2" aria-label="Cabeçalho do produto">
            <div class="section-2-2__banner">
                <div class="section-2-2__banner-container">
                    <video class="section-2-2__banner-video"
                        poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-oxford.webp"
                        preload="none" autoplay muted loop playsinline aria-hidden="true">
                        <source src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-oxford.webm">
                    </video>
                </div>

                <div class="section-2-2__badge" role="img" aria-label="Logo da marca Biona">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/oxford/logo-oxford.png"
                        alt="Logo da marca Biona" class="section-2-2__badge-img">
                </div>
            </div>

            <div class="section-2-2__body">
                <small class="section-2-2__brand"> biona </small>
                <h2 class="section-2-2__title">
                    <span>Aparelho de Jantar e Chá 20 Peças</span>
                    <strong>Unni Brisa em Cerâmica</strong>
                </h2>
                <p class="section-2-2__subtitle">
                    A coleção Unni Brisa traz inspiração na sensação de uma brisa de verão.
                    As peças em cerâmica recebem detalhes em preto que representam grãos de areia e filete marrom nas
                    bordas.
                </p>
            </div>
        </section>

        <section class="section-8 section-8--interactive">
            <div class="section-8__inner">
                <div class="section-8__tabs" role="radiogroup" aria-label="Escolha o destaque exibido">
                    <label class="section-8__tab section-8__tab--protection">
                        <input class="section-8__control section-8__control--protection" type="radio"
                            name="section-3-tabs-b" aria-label="Selecionar destaque Decoração natural" checked>
                        <span class="section-8__tab-icon" aria-hidden="true">
                            <svg class="section-8__tab-icon-svg" viewBox="0 0 24 24" fill="none" focusable="false">
                                <path d="M12 3.5 19 6v5.5c0 4.4-2.8 7.8-7 9.4-4.2-1.6-7-5-7-9.4V6l7-2.5Z"
                                    stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                                <path d="m9 12 2 2 4-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span class="section-8__tab-text">Decoração natural</span>
                    </label>

                    <label class="section-8__tab section-8__tab--care">
                        <input class="section-8__control section-8__control--care" type="radio" name="section-3-tabs-b"
                            aria-label="Selecionar destaque Uso prático">
                        <span class="section-8__tab-icon" aria-hidden="true">
                            <svg class="section-8__tab-icon-svg" viewBox="0 0 24 24" fill="none" focusable="false">
                                <path d="M12 3.5c4 4.8 6 8.2 6 11.1a6 6 0 0 1-12 0c0-2.9 2-6.3 6-11.1Z"
                                    stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span class="section-8__tab-text">Uso prático</span>
                    </label>
                </div>

                <div class="section-8__viewport">
                    <div class="section-8__panel section-8__panel--protection" role="group"
                        aria-labelledby="section-3-b-title-protection">
                        <figure class="section-8__media">
                            <img class="section-8__image" width="1600" height="650" loading="lazy" decoding="async"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/aparelho-jantar-biona-unni-brisa-mesa-posta-prato-fundo-ceramica-3022750-01-1.webp"
                                alt="Mesa posta decorada com prato fundo Biona Unni Brisa cerâmica creme pontilhada e filete marrom">
                        </figure>
                        <div class="section-8__content">
                            <h2 class="section-8__title" id="section-3-b-title-protection">Detalhes inspirados na
                                natureza
                            </h2>
                            <span class="section-8__rule" aria-hidden="true"></span>
                            <p class="section-8__copy">
                                Pequenos detalhes em preto representam os grãos de areia. As bordas recebem um fino
                                filete marrom inspirado em materiais naturais, como bambu e corda.
                            </p>
                        </div>
                    </div>

                    <div class="section-8__panel section-8__panel--care" role="group"
                        aria-labelledby="section-3-b-title-care">
                        <figure class="section-8__media">
                            <img class="section-8__image" width="1200" height="800" loading="lazy" decoding="async"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/aparelho-jantar-biona-unni-brisa-xicara-cha-pires-prato-detalhe-3022750-01-2.webp"
                                alt="Xícara chá com pires Biona Unni Brisa cerâmica detalhes pretos e borda marrom sobre sousplat">
                        </figure>
                        <div class="section-8__content">
                            <h2 class="section-8__title" id="section-3-b-title-care">Praticidade para servir no dia a
                                dia
                            </h2>
                            <span class="section-8__rule" aria-hidden="true"></span>
                            <p class="section-8__copy">
                                As peças em cerâmica podem ser utilizadas no micro-ondas e na lava-louças. O conjunto
                                reúne
                                pratos, xícaras de chá e pires.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="section-8__dots" aria-hidden="true">
                    <span class="section-8__dot section-8__dot--protection" aria-hidden="true"></span>
                    <span class="section-8__dot section-8__dot--care" aria-hidden="true"></span>
                </div>
            </div>
        </section>

        <section class="section-3">
            <div class="section-3__frame">
                <div class="section-3__media">
                    <picture class="section-3__picture">
                        <source media="(max-width: 760px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/aparelho-jantar-biona-unni-brisa-20-pecas-pratos-xicara-fundo-infinito-3022750-02-2.webp">
                        <img class="section-3__image" width="1600" height="650" loading="lazy" decoding="async"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/aparelho-jantar-biona-unni-brisa-20-pecas-ceramica-conjunto-completo-3022750-02-1.webp"
                            alt="Aparelho jantar 20 peças Biona Unni Brisa pratos xícara pires cerâmica estampa areia tom marrom">
                    </picture>
                </div>
                <div class="section-3__callout">
                    <div class="section-3__copy">
                        <h2 class="section-3__title">Inspiração natural para a mesa</h2>
                        <p class="section-3__text">A coleção Unni Brisa foi inspirada no design biofílico e em elementos
                            da natureza.

                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-33__container" aria-label="Seção de vídeo do produto">
            <div class="section-33__video-section">
                <div class="section-33__video-wrapper">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/jQhEZD3w4hY?si=vByKgDQ6pqQ9oDmq"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
        </section>

        <p style="color: #705548; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty;
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
                            <h3 id="faq-section__q-text"> O que vem no Aparelho de Jantar e Chá 20 Peças Biona Unni
                                Brisa? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O conjunto reúne 4 pratos rasos, 4 fundos, 4 de sobremesa e 4
                                xícaras de chá de 200 ml acompanhadas de pires. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> As peças da coleção Unni Brisa podem ir à lava-louças? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. As peças são compatíveis com lava-louças, oferecendo mais
                                praticidade na limpeza após as refeições. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> O aparelho de jantar pode ser utilizado no micro-ondas? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. As peças podem ser utilizadas no micro-ondas, facilitando
                                o aquecimento dos alimentos no dia a dia. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Qual é o material das peças do conjunto? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O aparelho de jantar e chá é produzido em cerâmica e apresenta
                                peças com formato clean e inspiração natural. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Quais são os tamanhos dos pratos desse aparelho de jantar?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Os pratos rasos medem 26 cm, os fundos 20,5 cm e os pratos de
                                sobremesa possuem 20 cm de diâmetro. </p>
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
