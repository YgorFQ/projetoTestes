// @ts-nocheck
ColLib.registerCollectionLayout('carneiro-colecoes',
{
  id: 'variacao-29',
  name: 'Variação 29',
  html: `<div class="lp-container">
    <style>
        .lp-container {
            --brand-dark: #003837;
            --brand-primary: #014747;
            --brand-accent: #adff36;
            --background-light: #f4f7f4;
            --background-soft: #e8efec;
            --text-dark: #173331;
            --text-muted: #60706e;
            --white: #ffffff;
            --border: #d8e2df;
        }

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
            color: var(--brand-dark);
            margin: 0 0 12px;
            line-height: 98%;
        }

        #faq-section__subtitle {
            font-size: 1rem;
            color: var(--text-muted);
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
            background: var(--white);
            border: 1px solid var(--border);
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
            background: var(--background-soft);
        }

        #faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: var(--brand-dark);
            flex: 1;
        }

        #faq-section__q-text:hover {
            color: var(--brand-primary);
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
            background: var(--brand-primary);
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
            border-top: 1px solid var(--border);
        }

        #faq-section__a-text {
            font-size: 0.9rem;
            color: var(--text-muted);
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
            --pos-x: 7%;
            --color-title: var(--brand-accent);
            --bg-box: rgba(0, 56, 55, 0.88);

            width: 100%;
            position: relative;
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
            color: white;
            margin: 0 0 10px;
            line-height: 1.2;
            text-shadow: 2px 2px 6px rgba(0, 56, 55, 0.4);
            font-weight: 800;
        }

        .section-6__description {
            font-size: clamp(0.95rem, 2vw, 1.4rem);
            color: var(--white);
            margin: 0 0 24px;
            line-height: 1.5;
            text-shadow: 1px 1px 4px rgba(0, 56, 55, 0.35);
        }

        /* ===== MOBILE ===== */
        @media (max-width: 760px) {
            .section-6 {
                border-radius: 0;
                padding-top: 12px;


            }

            .section-6__content {
                position: static;
                transform: none;
                max-width: 100%;
                padding: 24px 20px 16px 20px;
                background: transparent;
                backdrop-filter: none;
                text-align: center;
            }

            .section-6__title {
                font-size: 1.8rem;
                color: var(--brand-dark);
                text-shadow: none;
            }

            .section-6__description {
                margin-bottom: 0;
                font-size: 1.1rem;
                color: var(--text-muted);
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
            padding: calc(var(--badge-size) / 2 + 1.1rem) 0.3rem 1.1rem;
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
            color: var(--text-muted);
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
                max-width: 95%;
                margin: 1.25rem auto 0;
            }
        }
    </style>

    <style>
        .section-15-container,
        .section-15-container * {
            box-sizing: border-box;
            border-radius: 20px;
        }

        .section-15-container {
            width: 100%;
            padding: 1.5rem;
            background-color: var(--brand-primary);
        }

        .section-15 {
            display: flex;
            flex-direction: column-reverse;
            gap: 1.5rem;
            width: 100%;
            max-width: 1280px;
            margin: 0 auto;
        }

        .section-15__image-wrapper {
            width: 100%;
            flex-shrink: 0;
        }

        .section-15__image {
            display: block;
            width: 100%;
            max-width: 530px;
            margin: 0 auto;
            border-radius: 16px;
            object-fit: cover;
            aspect-ratio: 4 / 3;
        }

        .section-15__content {
            display: flex;
            flex-direction: column;
            width: 100%;
            min-width: 0;
        }

        .section-15__title {
            margin: 0 0 1rem;
            color: var(--white);
            font-size: clamp(1.75rem, 4vw, 2rem);
            font-weight: 600;
            line-height: 1.25;
            text-align: left;
        }

        .section-15__desc {
            margin: 0 0 1.5rem;
            color: var(--white);
            font-size: 0.875rem;
            line-height: 1.6;
            text-align: left;
        }

        .section-15__feature-list {
            display: flex;
            flex-direction: column;
            gap: 1.375rem;
            padding: 0;
            margin: 0;
            list-style: none;
        }

        .section-15__feature-item {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
        }

        .section-15__feature-item-icon {
            display: block;
            width: 44px;
            height: 44px;
            flex-shrink: 0;
            border-radius: 8px;
            object-fit: contain;
        }

        .section-15__feature-item-body {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            min-width: 0;
        }

        .section-15__feature-item-title {
            margin: 0;
            color: var(--white);
            font-size: 1.05rem;
            font-weight: 700;
            line-height: 1.35;
        }

        .section-15__feature-item-text {
            margin: 0;
            color: var(--white);
            font-size: 0.8125rem;
            line-height: 1.55;
        }

        @media (min-width: 480px) {
            .section-15-container {
                padding: 1.75rem;
            }

            .section-15__feature-item-title {
                font-size: 1.1rem;
            }
        }

        @media (min-width: 760px) {
            .section-15-container {
                padding: 2rem;
            }

            .section-15 {
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 2rem;
            }

            .section-15--reverse {
                flex-direction: row-reverse;
            }

            .section-15__image-wrapper {
                flex: 0 1 48%;
                max-width: 48%;
            }

            .section-15__image {
                width: 100%;
                max-width: none;
                max-height: 460px;
                border-radius: 20px;
                aspect-ratio: 4 / 3;
            }

            .section-15__content {
                flex: 1 1 0;
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
                width: 48px;
                height: 48px;
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
                gap: 2.5rem;
            }
        }

        @media (min-width: 1280px) {
            .section-15__image-wrapper {
                flex-basis: 50%;
                max-width: 50%;
            }

            .section-15__feature-item-title {
                font-size: 1.3rem;
            }

            .section-15__feature-item-text {
                font-size: 0.9rem;
            }
        }

        /* Entrada inicial */
        .section-15__content,
        .section-15__image-wrapper {
            animation: section-15-fade-up 0.8s ease both;
        }

        .section-15__image-wrapper {
            animation-delay: 0.15s;
        }

        @keyframes section-15-fade-up {
            from {
                opacity: 0;
                transform: translateY(28px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Imagem interativa */
        .section-15__image-wrapper {
            overflow: hidden;
            border-radius: 20px;
        }

        .section-15__image {
            transition:
                transform 0.5s ease,
                filter 0.5s ease;
        }

        .section-15__image-wrapper:hover .section-15__image {
            transform: scale(1.04);
            filter: brightness(1.05);
        }

        /* Cards dos benefícios */
        .section-15__feature-item {
            position: relative;
            padding: 0.8rem;
            border: 1px solid transparent;
            border-radius: 12px;
            transition:
                background-color 0.3s ease,
                border-color 0.3s ease,
                transform 0.3s ease,
                box-shadow 0.3s ease;
        }

        .section-15__feature-item:hover,
        .section-15__feature-item:focus-visible {
            background-color: rgba(255, 255, 255, 0.12);
            border-color: rgba(255, 255, 255, 0.25);
            box-shadow: 0 12px 28px rgba(0, 56, 55, 0.22);
            transform: translateX(8px);
            outline: none;
        }

        /* Animação dos ícones */
        .section-15__feature-item-icon {
            transition:
                transform 0.35s ease,
                background-color 0.35s ease;
        }

        .section-15__feature-item:hover .section-15__feature-item-icon,
        .section-15__feature-item:focus-visible .section-15__feature-item-icon {
            transform: scale(1.12) rotate(-4deg);
        }

        /* Destaque dos títulos */
        .section-15__feature-item-title {
            transition: transform 0.3s ease;
        }

        .section-15__feature-item:hover .section-15__feature-item-title,
        .section-15__feature-item:focus-visible .section-15__feature-item-title {
            transform: translateX(4px);
        }

        /* Entrada progressiva dos itens */
        .section-15__feature-item {
            animation: section-15-item-in 0.65s ease both;
        }

        .section-15__feature-item:nth-child(1) {
            animation-delay: 0.15s;
        }

        .section-15__feature-item:nth-child(2) {
            animation-delay: 0.25s;
        }

        .section-15__feature-item:nth-child(3) {
            animation-delay: 0.35s;
        }

        .section-15__feature-item:nth-child(4) {
            animation-delay: 0.45s;
        }

        @keyframes section-15-item-in {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        /* Animação ao aparecer durante o scroll */
        @supports (animation-timeline: view()) {
            .section-15 {
                animation: section-15-scroll-reveal linear both;
                animation-timeline: view();
                animation-range: entry 10% cover 35%;
            }

            @keyframes section-15-scroll-reveal {
                from {
                    opacity: 0;
                    transform: translateY(40px);
                }

                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        }

        /* Mobile */
        @media (max-width: 759px) {

            .section-15__feature-item:hover,
            .section-15__feature-item:focus-visible {
                transform: translateY(-4px);
            }
        }

        /* Acessibilidade */
        @media (prefers-reduced-motion: reduce) {

            .section-15,
            .section-15__content,
            .section-15__image-wrapper,
            .section-15__image,
            .section-15__feature-item,
            .section-15__feature-item-icon,
            .section-15__feature-item-title {
                animation: none;
                transition: none;
            }
        }

        .is-reverse-section-15 {
            flex-direction: row-reverse;
        }

        .section-15-container:nth-of-type(even) {
            background-color: var(--brand-dark);
        }

        .section-15-container:nth-of-type(even) .section-15__title,
        .section-15-container:nth-of-type(even) .section-15__feature-item-title {
            color: white;
        }

        .section-15-container:nth-of-type(even) .section-15__desc,
        .section-15-container:nth-of-type(even) .section-15__feature-item-text {
            color: white;
        }

        .section-15-container:nth-of-type(even) .section-15__feature-item:hover,
        .section-15-container:nth-of-type(even) .section-15__feature-item:focus-visible {
            background-color: var(--white);
            border-color: var(--border);
        }

        @media (max-width: 760px) {
            .is-reverse-section-15 {
                flex-direction: column-reverse;
            }
        }
    </style>

    <style>
        .groupimage-sectionSelect {

            position: relative;
            width: 100%;
        }

        .groupimage-sectionSelect img {

            width: 100%;
            height: auto;
        }

        .featuresCheckBox-container {
            max-width: 1600px;
            padding: 20px;
            margin: 0 auto;
            color: var(--brand-primary);
            border-radius: 30px;
        }

        .sectionCheckBox-title {

            text-align: center;
            margin-bottom: 30px;
            font-size: 24px;
            font-weight: bold;
        }

        .featureCheckBox-content {

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }

        .featureCheckBox-image-container {

            width: 50%;
        }

        .featureCheckBox-image {

            width: 100%;
            height: auto;
            display: none;
            border-radius: 8px;
        }

        /* Mostrar imagem com base no radio selecionado */

        #radioCheck1:checked~.featureCheckBox-content .featureCheckBox-image-container #img1,
        #radioCheck2:checked~.featureCheckBox-content .featureCheckBox-image-container #img2,
        #radioCheck3:checked~.featureCheckBox-content .featureCheckBox-image-container #img3 {

            display: block;
        }

        #radioCheck1:checked~.featureCheckBox-content .featureCheckBox-image-container .defaultCheck-image,
        #radioCheck2:checked~.featureCheckBox-content .featureCheckBox-image-container .defaultCheck-image,
        #radioCheck3:checked~.featureCheckBox-content .featureCheckBox-image-container .defaultCheck-image {

            display: none;
        }

        .featureCheck-buttons {

            width: 45%;
            display: flex;
            flex-direction: column;
            gap: 20px;
            text-align: center;
        }

        .featureCheck-button-label {

            display: block;
            padding: 15px 20px;
            background-color: var(--brand-primary);
            color: var(--white);
            border: 2px solid transparent;
            border-radius: 30px;
            font-weight: bold;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .featureCheck-button-label:hover {

            background-color: var(--brand-accent);
            color: var(--brand-dark);
            border-color: var(--brand-accent);
            transform: translateY(-3px);
        }

        #radioCheck1:checked~.featureCheckBox-content label[for="radioCheck1"],
        #radioCheck2:checked~.featureCheckBox-content label[for="radioCheck2"],
        #radioCheck3:checked~.featureCheckBox-content label[for="radioCheck3"] {
            background-color: var(--brand-accent);
            color: var(--brand-dark);
            border-color: var(--brand-accent);
        }

        .defaultCheck-image {

            display: block;
        }

        @media (max-width: 760px) {
            .featuresCheckBox-container {
                border-radius: 0;
            }

            .featureCheckBox-content {
                flex-direction: column;
                gap: 20px;
            }

            .featureCheckBox-image-container,
            .featureCheck-buttons {
                width: 100%;
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
            background-color: var(--background-light);
            font-family: sans-serif;
        }

        #faq-section__header {
            text-align: center;
            margin: 1rem 0;
        }

        #faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: var(--brand-dark);
            margin: 0 0 12px;
            line-height: 98%;
        }

        #faq-section__subtitle {
            font-size: 1rem;
            color: var(--text-muted);
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
            background: var(--white);
            border: 1px solid var(--border);
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
            background: var(--background-soft);
        }

        #faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: var(--brand-dark);
            flex: 1;
        }

        #faq-section__q-text:hover {
            color: var(--brand-primary);
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
            background: var(--brand-primary);
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
            border-top: 1px solid var(--border);
        }

        #faq-section__a-text {
            font-size: 0.9rem;
            color: var(--text-muted);
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

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <article class="pdp" id="pdp" aria-label="Conteúdo rico do produto"> <!-- HTML fica dentro dessa div PDP -->

        <section class="product-header">
            <div class="product-header__banner">
                <img class="product-header__banner-img" loading="eager"
                    src=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/refrigerador-consul-crd37-header-2224585_2224586_00.webp"
                    alt="Refrigerador Consul Cycle Defrost 332 litros branco">
                <div class="product-header__badge">
                    <img class="product-header__badge-img"
                        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/consul/logo-consul.png"
                        alt="Consul">
                </div>
            </div>
            <div class="product-header__body">
                <small class="product-header__brand">Consul</small>
                <h2 class="product-header__title">
                    Refrigerador 2 Portas <br> Cycle Defrost 332 L Branco
                </h2>
                <p class="product-header__subtitle">
                    Com 258 L no refrigerador e 74 L no congelador, oferece espaços
                    pensados para organizar os alimentos.
                </p>
            </div>
        </section>

        <section class="section-6">
            <picture>
                <source media="(max-width: 760px)"
                    srcset=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/refrigerador-consul-crd37-2-portas-332l-branco-interno-2224585_2224586_01-2.webp"
                    width="780" height="450">
                <img class="section-6__image" width="1600" height="650" loading="lazy" fetchpriority="low"
                    decoding="async"
                    src=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/refrigerador-consul-crd37-2-portas-332l-branco-aberto-2224585_2224586_01-1.webp"
                    alt="Refrigerador Consul CRD37 2 portas 332L branco portas abertas alimentos organizados cozinha">
            </picture>
            <div class="section-6__content">
                <h2 class="section-6__title">Refrigerador Consul 332 L</h2>
                <p class="section-6__description">Duas portas e espaços pensados para facilitar a organização.</p>
            </div>
        </section>

        <section class="section-15-container" aria-labelledby="section-15-title">
            <div class="section-15 is-reverse-section-15">
                <div class="section-15__content">
                    <h2 class="section-15__title" id="section-15-title">
                        Eficiência energética para economizar no dia a dia
                    </h2>

                    <p class="section-15__desc">
                        A eficiência energética comprovada permite economizar até 20% de
                        energia elétrica no ano.
                    </p>
                </div>

                <div class="section-15__image-wrapper">
                    <img class="section-15__image"
                        src=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/refrigerador-consul-crd37-2-portas-332l-branco-lifestyle-cozinha-2224585_2224586_02.webp"
                        alt="Refrigerador Consul CRD37 2 portas 332L branco portas fechadas ambiente cozinha planejada" />
                </div>
            </div>
        </section>

        <div class="featuresCheckBox-container">
            <!-- Radios escondidos dentro do container -->
            <input style="display: none;" type="radio" name="feature" id="radioCheck1">
            <input style="display: none;" type="radio" name="feature" id="radioCheck2">
            <input style="display: none;" type="radio" name="feature" id="radioCheck3">

            <h2 class="sectionCheckBox-title">PRINCIPAIS RECURSOS</h2>

            <section class="featureCheckBox-content">
                <!-- Container de imagens -->
                <div class="featureCheckBox-image-container">
                    <!-- Imagem padrão -->
                    <img src=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/refrigerador-consul-crd37-congelador-espacoso-74l-2224585_2224586_03-1.webp"
                        width="1600" height="865"
                        alt="Congelador espaçoso 74L refrigerador Consul CRD37 abastecido carnes alimentos congelados"
                        class="featureCheckBox-image defaultCheck-image">

                    <img src=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/refrigerador-consul-crd37-congelador-espacoso-74l-2224585_2224586_03-1.webp"
                        width="1600" height="865"
                        alt="Congelador espaçoso 74L refrigerador Consul CRD37 abastecido carnes alimentos congelados"
                        id="img1" class="featureCheckBox-image">
                    <img src=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/refrigerador-consul-crd37-prateleira-removivel-grade-2224585_2224586_03-2.webp"
                        width="1600" height="865"
                        alt="Prateleira removível ajustável grade refrigerador Consul CRD37 praticidade limpeza organização"
                        id="img2" class="featureCheckBox-image">
                    <img src=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/refrigerador-consul-crd37-gaveta-frutas-legumes-transparente-2224585_2224586_03-3.webp"
                        width="1600" height="865"
                        alt="Gavetão transparente frutas legumes refrigerador Consul CRD37 alimentos frescos organizados"
                        id="img3" class="featureCheckBox-image">
                </div>

                <!-- Botões -->
                <div class="featureCheck-buttons">
                    <label for="radioCheck1" class="featureCheck-button-label">Congelador Espaçoso</label>
                    <label for="radioCheck2" class="featureCheck-button-label">Prateleiras Removíveis</label>
                    <label for="radioCheck3" class="featureCheck-button-label">Gavetão de Frutas e Legumes</label>
                </div>
        </div>
        </section>

        <section class="section-15-container" aria-labelledby="section-15-title">
            <div class="section-15">
                <div class="section-15__content">
                    <h2 class="section-15__title" id="section-15-title">
                        Cycle Defrost
                    </h2>

                    <p class="section-15__desc">
                        Descongele o refrigerador cerca de duas vezes ao ano para mantê-lo
                        sempre pronto para o uso.
                    </p>
                </div>

                <div class="section-15__image-wrapper">
                    <img class="section-15__image"
                        src=" 	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/refrigerador-consul-crd37-iluminacao-interna-controle-temperatura-2224585_2224586_04.webp"
                        alt="Iluminação interna LED controle temperatura refrigerador Consul CRD37 Cycle Defrost" />
                </div>
            </div>
        </section>

        <section id="faq-section" aria-labelledby="faq-section__title">
            <div id="faq-section__header">
                <h2 id="faq-section__title">Dúvidas Frequentes</h2>
            </div>
            <ul id="faq-section__list" role="list"> <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Como é dividido o espaço da Geladeira Panasonic BB71 511L
                                Bottom Freezer? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> São 345 litros no refrigerador e 166 litros no freezer,
                                totalizando 511 litros para organizar alimentos e bebidas. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Quais temperaturas podem ser selecionadas na gaveta
                                Freshfreezer? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> A gaveta permite ajustes de 0°C, -2°C, -3°C e -5°C para
                                armazenar laticínios, bebidas, peixes, carnes e porções. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Essa geladeira Panasonic apresenta baixo consumo de energia?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. Possui classificação energética A, consumo de 29,8 kWh por
                                mês e tecnologias Inverter e SmartSense/Econavi. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> O que a tecnologia SmartSense faz durante o uso diário? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Os sensores monitoram portas, luminosidade e temperaturas para
                                reconhecer a rotina da casa e otimizar o consumo de energia. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Como a gaveta Fresh Zone ajuda na conservação dos alimentos?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O Climate Control controla a umidade do compartimento, enquanto
                                o Vitamin Power utiliza LEDs especiais para vitaminas C e D. </p>
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
