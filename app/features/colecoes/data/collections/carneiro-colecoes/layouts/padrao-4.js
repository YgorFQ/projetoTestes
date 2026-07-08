// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "padrao-4",
  name: "Padrão 4",
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

    <style>
        .product-header {
            --badge-size: 8rem;
            --banner-height: 180px;
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

        .product-header__banner-figure {
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
            font-size: clamp(0.9rem, 2vw, 1.2rem);
            line-height: 120%;
            margin-top: 1rem;
            max-width: 90%;
            text-align: justify;
            text-wrap: pretty;
        }

        /* ===== 768px — banner cresce ===== */
        @media (min-width: 768px) {
            .product-header {
                --banner-height: 250px;
            }

            .product-header__subtitle {
                text-align: center;
            }
        }
    </style>

    <style>
        /* ===== HERO SECTION — VARIÁVEIS ===== */
        .section-6 {
            --pos-y: 50%;
            --pos-x: 7%;
            --color-title: #ffe178;
            --bg-box: rgba(0, 0, 0, 0.33);
            width: 100%;
            position: relative;
            overflow: hidden;
        }

        /* ===== IMAGEM ===== */
        .section-6__image {
            width: 100%;
            margin: auto;
            height: auto;
            display: block;
            border-radius: 15px 15px 0 0;
        }

        /* ===== CONTEÚDO — BASE MOBILE ===== */
        .section-6__content {
            background-color: #ea5b0c;
            position: static;
            transform: none;
            max-width: 100%;
            padding: 24px 20px;
            backdrop-filter: none;
            text-align: center;
            z-index: 10;
        }

        .section-6__title {
            font-size: 1.5rem;
            color: #333;
            margin: 0 0 2px;
            line-height: 1.2;
            font-weight: 800;
        }

        .section-6__description {
            font-size: 1rem;
            color: #555;
            line-height: 1.5;
        }

        /* ===== 576px — texto cresce um pouco ===== */
        @media (min-width: 576px) {
            .section-6__title {
                font-size: 1.8rem;
            }

            .section-6__description {
                font-size: 1.1rem;
            }

            .section-6__image {
                width: 100%;
                border-radius: 20px 20px 0 0;
            }
        }

        /* ===== 768px — layout passa a ser sobreposto ===== */
        @media (min-width: 768px) {

            .section-6__image {
                width: 100%;
            }

            .section-6__content {
                position: absolute;
                top: var(--pos-y);
                left: clamp(1%, var(--pos-x), 100%);
                transform: translateY(-50%);
                max-width: min(40%, 480px);
                padding: clamp(12px, 2vw, 20px);
                background-color: var(--bg-box);
                backdrop-filter: blur(4px);
                text-align: left;
                border-radius: 20px;
            }

            .section-6__title {
                font-size: clamp(1.4rem, 3.5vw, 2.6rem);
                color: var(--color-title);
                text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
            }

            .section-6__description {
                font-size: clamp(0.95rem, 2vw, 1.4rem);
                color: #fff;
                margin-bottom: 24px;
                text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.35);
            }
        }
    </style>

    <style>
        .section-15-container {
            background-color: #f16425;
            padding: 1.5rem;
            width: 100%;
            box-sizing: border-box;

        }

        .section-15 {
            display: flex;
            flex-direction: column-reverse;
            gap: 1.25rem;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
        }

        .section-15__image-wrapper {
            width: 100%;
            flex-shrink: 0;
        }

        .section-15__image {
            margin: auto;
            border-radius: 16px;
            display: block;
            object-fit: cover;
            width: 100%;
            max-width: 530px;
            aspect-ratio: 16 / 9;
        }

        .section-15__content {
            display: flex;
            flex-direction: column;
            width: 95%;
            margin: auto;
            box-sizing: border-box;
        }

        .section-15__title {
            color: #f3f3f3;
            font-size: 32px;
            font-weight: 600;
            line-height: 40px;
            margin: 0 0 1rem;
            text-align: left;
        }

        .section-15__desc {
            color: #f3f3f3;
            font-size: 14px;
            line-height: 22px;
            margin: 0 0 1.5rem;
            text-align: left;
        }

        .section-15__feature-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            list-style: none;
            margin: 0;
            gap: 22px;
            padding: 0;
        }

        .section-15__feature-item {
            align-items: flex-start;
            display: flex;
            flex-direction: row;
            gap: 0.75rem;
        }

        .section-15__feature-item-icon {
            border-radius: 8px;
            flex-shrink: 0;
            height: 44px;
            object-fit: contain;
            width: 44px;
        }

        .section-15__feature-item-body {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
        }

        .section-15__feature-item-title {
            color: #f5f5f5;
            font-size: 1.05rem;
            font-weight: 700;
            line-height: 1.35;
            margin: 0;
        }

        .section-15__feature-item-text {
            color: #f5f5f5;
            font-size: 0.8125rem;
            line-height: 1.55;
            margin: 0;
        }

        @media (min-width: 480px) {
            .section-15-container {
                padding: 1.75rem;

            }

            .section-15__feature-item-title {
                font-size: 1.1rem;
            }
        }

        @media (min-width: 768px) {
            .section-15-container {
                padding: 2rem;
            }

            .section-15 {
                max-width: 768px;
            }

            .section-15__image {
                border-radius: 20px;
                aspect-ratio: 16 / 9;
            }
        }

        @media (min-width: 760px) {
            .section-15 {
                align-items: center;
                flex-direction: row;
                gap: 1.5rem;
                justify-content: center;
                max-width: 960px;
            }

            .section-15--reverse {
                flex-direction: row-reverse;
            }



            .section-15__image {
                aspect-ratio: 4 / 3;
                height: 100%;
                max-height: 420px;
            }

            .section-15__content {
                flex: 1 1 0;
                min-width: 0;
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
                height: 48px;
                width: 48px;
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
                max-width: 1060px;
                gap: 2rem;
            }

            .section-15__feature-list {
                gap: 1.25rem;
            }
        }

        @media (min-width: 1280px) {
            .section-15 {
                max-width: 1280px;
                gap: 2.5rem;
            }

            .section-15__image-wrapper {
                flex: 0 0 50%;
                max-width: 50%;
            }

            .section-15__image {
                max-height: 460px;
            }

            .section-15__feature-item-title {
                font-size: 1.3rem;
            }

            .section-15__feature-item-text {
                font-size: 0.9rem;
            }
        }

        .is-reverse {
            flex-direction: row-reverse;
        }

        @media (max-width: 760px) {
            .is-reverse {
                flex-direction: column-reverse;
            }
        }

        .is-reverse-760 {
            flex-direction: row-reverse;
        }

        @media (max-width: 760px) {
            .is-reverse-760 {
                flex-direction: column;
            }
        }
    </style>

    <style>
        .section-15-container {
            background-color: #f16425;
            padding: 1.5rem;
            width: 100%;
            box-sizing: border-box;
        }

        .section-15 {
            display: flex;
            flex-direction: column-reverse;
            gap: 1.25rem;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
        }

        /* Variação: imagem embaixo do conteúdo no mobile */
        .section-15--reverse {
            flex-direction: column;
        }

        .section-15__image-wrapper {
            width: 100%;
            flex-shrink: 0;
        }

        .section-15__image {
            margin: auto;
            border-radius: 16px;
            display: block;
            object-fit: cover;
            width: 100%;
            max-width: 530px;
            aspect-ratio: 16 / 9;
        }

        .section-15__content {
            display: flex;
            flex-direction: column;
            width: 95%;
            margin: auto;
            box-sizing: border-box;
        }

        .section-15__title {
            color: #f3f3f3;
            font-size: 32px;
            font-weight: 600;
            line-height: 40px;
            margin: 0 0 1rem;
            text-align: left;
        }

        .section-15__desc {
            color: #f3f3f3;
            font-size: 14px;
            line-height: 22px;
            margin: 0 0 1.5rem;
            text-align: left;
        }

        .section-15__feature-list {
            display: flex;
            flex-direction: column;
            list-style: none;
            margin: 0;
            gap: 22px;
            padding: 0;
        }

        .section-15__feature-item {
            align-items: flex-start;
            display: flex;
            flex-direction: row;
            gap: 0.75rem;
        }

        .section-15__feature-item-icon {
            border-radius: 8px;
            flex-shrink: 0;
            height: 44px;
            object-fit: contain;
            width: 44px;
        }

        .section-15__feature-item-body {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
        }

        .section-15__feature-item-title {
            color: #f5f5f5;
            font-size: 1.05rem;
            font-weight: 700;
            line-height: 1.35;
            margin: 0;
        }

        .section-15__feature-item-text {
            color: #f5f5f5;
            font-size: 0.8125rem;
            line-height: 1.55;
            margin: 0;
        }

        /* ===== 576px ===== */
        @media (min-width: 576px) {
            .section-15-container {
                padding: 1.75rem;
            }

            .section-15__feature-item-title {
                font-size: 1.1rem;
            }
        }

        /* ===== 768px — layout lado a lado ===== */
        @media (min-width: 768px) {
            .section-15-container {
                padding: 2rem;
            }

            .section-15 {
                align-items: center;
                flex-direction: row;
                gap: 1.5rem;
                justify-content: center;
                max-width: 960px;
            }

            /* No desktop, --reverse inverte a linha */
            .section-15--reverse {
                flex-direction: row-reverse;
            }

            .section-15__image-wrapper {
                flex: 0 0 48%;
                max-width: 48%;
            }

            .section-15__image {
                border-radius: 20px;
                aspect-ratio: 4 / 3;
                height: 100%;
                max-height: 420px;
                max-width: unset;
            }

            .section-15__content {
                flex: 1 1 0;
                min-width: 0;
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
                height: 48px;
                width: 48px;
            }

            .section-15__feature-item-title {
                font-size: 1.2rem;
            }

            .section-15__feature-item-text {
                font-size: 0.875rem;
            }
        }

        /* ===== 992px ===== */
        @media (min-width: 992px) {
            .section-15 {
                max-width: 1060px;
                gap: 2rem;
            }

            .section-15__feature-list {
                gap: 1.25rem;
            }
        }

        /* ===== 1200px ===== */
        @media (min-width: 1200px) {
            .section-15 {
                max-width: 1280px;
                gap: 2.5rem;
            }

            .section-15__image-wrapper {
                flex: 0 0 50%;
                max-width: 50%;
            }

            .section-15__image {
                max-height: 460px;
            }

            .section-15__feature-item-title {
                font-size: 1.3rem;
            }

            .section-15__feature-item-text {
                font-size: 0.9rem;
            }
        }
    </style>

    <style>
        .section-11-container {
            padding: 0 1rem 3rem;
            margin-inline: auto;
        }

        @media (min-width: 576px) {
            .section-11-container {
                max-width: 576px;
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
            margin: 1rem 0;
        }

        .section-11__title {
            font-size: 32px;
            font-weight: 900;
            color: #1a1a1a;
            margin: 0;
            line-height: 1.25;
        }

        @media (max-width: 768px) {
            .section-11__title {
                display: none;
            }
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
        .section-32__container {
            width: 100%;
            max-width: 1600px;
            margin: 0 auto;
        }

        .section-32__groupimage-section {
            position: relative;
            width: 100%;
            margin: 0;
            contain: layout style;
        }

        .section-32__groupimage-section img {
            width: 100%;
            height: auto;
            display: block;
        }

        .section-32__grouptext-overlay {
            position: absolute;
            max-width: 40%;
            width: 90%;
            line-height: 1.5;
            text-align: center;
            font-family: sans-serif
        }

        .section-32__grouptext-overlay.top {
            top: 3%;
            left: 50%;
            transform: translateX(-50%);
        }

        .section-32__grouptext-overlay.bottom {
            top: 84%;
            left: 50%;
            transform: translateX(-50%);
        }

        .section-32__grouptext-overlay.left {
            top: 50%;
            left: 25%;
            transform: translate(-50%, -50%);
            max-width: 41%;
        }

        .section-32__grouptext-overlay.right {
            top: 50%;
            left: 75%;
            transform: translate(-50%, -50%);
            max-width: 42%;
        }

        .section-32__grouptext-overlay h2 {
            font-size: 2vw;
            font-weight: bold;
            margin-bottom: 1.5px;
            line-height: 120%;
        }

        .section-32__grouptext-overlay p {
            font-size: 1.1vw;
            margin: 0;
            line-height: 120%;
        }

        @media (max-width: 960px) {
            .section-32__grouptext-overlay h2 {
                font-size: 2.1vw;
            }

            .section-32__grouptext-overlay p {
                font-size: 1.5vw;
            }
        }

        @media (max-width: 768px) {
            .section-32__grouptext-overlay h2 {
                font-size: 2.5vw;
            }

            .section-32__grouptext-overlay p {
                font-size: 1.8vw;
            }
        }

        @media (max-width: 500px) {
            .section-32__grouptext-overlay h2 {
                font-size: 3vw;
            }

            .section-32__grouptext-overlay p {
                font-size: 2.3vw;
            }
        }

        @media (max-width: 480px) {
            .section-32__grouptext-overlay h2 {
                font-size: 3vw;
            }

            .section-32__grouptext-overlay p {
                font-size: 2.3vw;
            }
        }

        @media (max-width: 1060px) {
            .section-32__grouptext-overlay.top {
                top: 3%;
            }
        }

        @media (max-width: 960px) {
            .section-32__grouptext-overlay.top {
                top: 3%;
            }
        }

        @media (max-width: 768px) {
            .section-32__grouptext-overlay.top {
                top: 3%;
            }
        }

        @media (max-width: 500px) {
            .section-32__grouptext-overlay.top {
                top: 3%;
            }
        }

        @media (max-width: 480px) {
            .section-32__grouptext-overlay.top {
                top: 3%;
            }
        }

        @media (max-width: 1060px) {
            .section-32__grouptext-overlay.bottom {
                top: 81%;
            }
        }

        @media (max-width: 960px) {
            .section-32__grouptext-overlay.bottom {
                top: 79%
            }
        }

        @media (max-width: 480px) {
            .section-32__grouptext-overlay.bottom {
                top: 81%
            }
        }

        @media (max-width: 768px) {
            .section-32__grouptext-overlay.bottom {
                top: 76%;
            }
        }

        @media (max-width: 500px) {
            .section-32__grouptext-overlay.bottom {
                top: 67%;
            }
        }

        @media (max-width: 480px) {

            .section-32__grouptext-overlay.right {
                top: 50%;
                left: 73%;
                transform: translate(-50%, -50%);
            }
        }

        @media (max-width: 480px) {

            .section-32__grouptext-overlay.left {
                top: 50%;
                left: 27%;
                transform: translate(-50%, -50%);
            }
        }

        .grouptext-overlay-Background {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4.5vw;
            padding: 0.5rem;
            backdrop-filter: blur(0.8vw);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
            -webkit-backdrop-filter: blur(10px);

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.3);
            max-width: 70%;
            z-index: 100;
        }
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="product-header" aria-label="Cabeçalho do produto">
            <header class="product-header__banner">
                <figure class="product-header__banner-figure">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/header.jpg"
                        alt="Banner do produto" class="product-header__banner-img" loading="eager">
                </figure>
                <div class="product-header__badge" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/logo.png"
                        alt="Ícone da marca" class="product-header__badge-img" loading="lazy">
                </div>
            </header>
            <article class="product-header__body">
                <small class="product-header__brand">Marca</small>
                <h2 class="product-header__title">
                    TÍTULO DO PRODUTO GAMERE (Nome, modelo, diferencial...)
                </h2>
                <p class="product-header__subtitle">
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                    Isso é uma descrição. Isso é uma descrição. Isso é uma descrição.
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto">
            <picture>
                <source media="(max-width: 767px)"
                    srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-2.png"
                    width="780" height="400">
                <img class="section-6__image"
                    src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/section-49-1.png"
                    alt="Caderno Funny Cat com estampa de gatinhos, capa colorida e espiral" width="1600" height="650"
                    loading="lazy" fetchpriority="high" decoding="async">
            </picture>
            <div class="section-6__content">
                <h3 class="section-6__title">Caderno Funny Cat</h3>
                <p class="section-6__description">Organize seus estudos com fofura e estilo!</p>
            </div>
        </section>

        <section class="section-11" aria-labelledby="section-11-title">
            <div class="section-11-container">
                <header class="section-11__header">
                    <h3 class="section-11__title" id="section-11-title">
                        Diferenciais que garantem uma instalação superior
                    </h3>
                </header>
                <ul class="section-11__grid" role="list">
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de formato universitário" width="74" height="74" loading="lazy">
                        </figure>
                        <h4 class="section-11__name">Flexibilidade Classe 4/5</h4>
                        <p class="section-11__value">Cobre de têmpera mole que desliza facilmente pelos eletrodutos,
                            economizando tempo
                            e esforço na instalação</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de formato universitário" width="74" height="74" loading="lazy">
                        </figure>
                        <h4 class="section-11__name">Flexibilidade Classe 4/5</h4>
                        <p class="section-11__value">Cobre de têmpera mole que desliza facilmente pelos eletrodutos,
                            economizando tempo
                            e esforço na instalação</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de formato universitário" width="74" height="74" loading="lazy">
                        </figure>
                        <h4 class="section-11__name">Flexibilidade Classe 4/5</h4>
                        <p class="section-11__value">Cobre de têmpera mole que desliza facilmente pelos eletrodutos,
                            economizando tempo
                            e esforço na instalação</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de formato universitário" width="74" height="74" loading="lazy">
                        </figure>
                        <h4 class="section-11__name">Flexibilidade Classe 4/5</h4>
                        <p class="section-11__value">Cobre de têmpera mole que desliza facilmente pelos eletrodutos,
                            economizando tempo
                            e esforço na instalação</p>
                    </li>
                    <li class="section-11__item">
                        <figure class="section-11__figure">
                            <img class="section-11__image"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/corfio/4203786_03-1.png"
                                alt="Ícone de formato universitário" width="74" height="74" loading="lazy">
                        </figure>
                        <h4 class="section-11__name">Flexibilidade Classe 4/5</h4>
                        <p class="section-11__value">Cobre de têmpera mole que desliza facilmente pelos eletrodutos,
                            economizando tempo
                            e esforço na instalação</p>
                    </li>
                </ul>
            </div>
        </section>

        <div class="section-15-container">
            <div class="section-15 is-reverse-760">
                <div class="section-15__content">
                    <h3 class="section-15__title">
                        A garantia de que o que está por trás das paredes nunca será um problema
                    </h3>
                    <p class="section-15__desc">
                        Ao escolher um condutor que une a máxima segurança contra incêndios, a eficiência energética
                        para seus equipamentos de alta potência e a flexibilidade necessária para uma instalação ágil,
                        você garante a proteção do seu patrimônio e a tranquilidade de saber que sua estrutura elétrica
                        foi feita para durar uma vida inteira.
                    </p>
                    <ul class="section-15__feature-list" aria-label="Benefícios do produto">
                        <li class="section-15__feature-item">
                            <img class="section-15__feature-item-icon" src="C:\\Users\\ygorq\\Downloads\\2222455_03-2-1.png"
                                alt="Ícone manhãs sem pausa" loading="lazy" />
                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Manhãs Sem Pausa</strong>
                                <p class="section-15__feature-item-text">Prepare vitaminas nutritivas em segundos e use
                                    a função autolimpeza para sair de casa sem deixar bagunça na pia</p>
                            </div>
                        </li>
                        <li class="section-15__feature-item">
                            <img class="section-15__feature-item-icon" src="C:\\Users\\ygorq\\Downloads\\2222455_03-2-2.png"
                                alt="Ícone receitas de uma só vez" loading="lazy" />
                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Receitas de uma Só Vez</strong>
                                <p class="section-15__feature-item-text">A jarra de 2,1L permite cozinhar para a família
                                    inteira sem precisar bater os ingredientes em várias etapas</p>
                            </div>
                        </li>
                        <li class="section-15__feature-item">
                            <img class="section-15__feature-item-icon" src="C:\\Users\\ygorq\\Downloads\\2222455_03-2-3.png"
                                alt="Ícone cozinha sempre organizada" loading="lazy" />
                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Cozinha Sempre Organizada</strong>
                                <p class="section-15__feature-item-text">O sistema enrola-cabo e o design leve eliminam
                                    a briga com fios e facilitam o armazenamento após o uso</p>
                            </div>
                        </li>
                        <li class="section-15__feature-item">
                            <img class="section-15__feature-item-icon" src="C:\\Users\\ygorq\\Downloads\\2222455_03-2-4.png"
                                alt="Ícone cuidado com o bolso" loading="lazy" />
                            <div class="section-15__feature-item-body">
                                <strong class="section-15__feature-item-title">Cuidado com o Bolso</strong>
                                <p class="section-15__feature-item-text">Durabilidade garantida por lâminas de aço inox
                                    e 1 ano de garantia, evitando gastos inesperados com trocas precoces</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="section-15__image-wrapper">
                    <picture>
                        <source media="(min-width: 768px)"
                            srcset="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao4.jpg" />
                        <img class="section-15__image"
                            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao4.jpg"
                            alt="Eletricista com capacete branco e colete laranja em obra" loading="lazy" />
                    </picture>
                </div>
            </div>
        </div>

        <section class="section-32__container" aria-label="Seção de destaque do produto">
            <figure class="section-32__groupimage-section">
                <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/metalfrio/2223537_02.jpg"
                    alt="!!!!!COLOQUE O TEXTO ALT AQUI!!!!!" style="border-radius: 0px 0px 0px 0px;" width="1600"
                    height="865" loading="lazy" decoding="async" fetchpriority="low">
                <figcaption class="section-32__grouptext-overlay left">
                    <p style="color: #faca95;">Isso é uma descrição. Isso é uma descrição.</p>
                    <h2 style="color: #faca95;"><strong>SUB-TÍTULO</strong></h2>
                    <p style="color: #faca95;">Isso é uma descrição. Isso é uma descrição. Isso é uma descrição. Isso é
                        umadescrição.</p>
                </figcaption>
            </figure>
        </section>

        <!-- Área de FAQ -->
        <section class="faq-section" aria-labelledby="faq-section-title">
            <div class="faq-section__header">
                <h3 class="faq-section__title" id="faq-section-title">Título Principal</h3>
                <p class="faq-section__subtitle">Sub-título</p>
            </div>
            <ul class="faq-section__list">
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Pergunta</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Pergunta</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Pergunta</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Pergunta</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Pergunta</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Resposta</p>
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
