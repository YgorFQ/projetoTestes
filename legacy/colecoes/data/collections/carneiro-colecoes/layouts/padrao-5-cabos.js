// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "padrao-5-cabos",
  name: "Padrão 5 - Cabos",
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
  css: ``
}
);
