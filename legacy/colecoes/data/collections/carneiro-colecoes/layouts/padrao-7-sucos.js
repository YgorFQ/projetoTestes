// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "padrao-7-sucos",
  name: "Padrão 7 (sucos)",
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
  css: ``
}
);
