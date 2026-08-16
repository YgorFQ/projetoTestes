// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "variacao-13",
  name: "Variação 13",
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
        /*inicio-area-de-faq*/
        #faq-section {
            width: 100%;
            padding: 2rem 16px;
            box-sizing: border-box;
            margin: 0 auto 25px;
            padding-top: 0;
            font-family: sans-serif;
            background: #f7f8fa;
        }

        #faq-section__header {
            text-align: center;
            margin: 1rem 0;
        }

        #faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #2b3037;
            margin: 0 0 12px;
            line-height: 98%;
        }

        #faq-section__subtitle {
            font-size: 1rem;
            color: #68717d;
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
            background: #ffffff;
            border: 1px solid #dde2e8;
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
            background: #f1f3f5;
        }

        #faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #2b3037;
            flex: 1;
        }

        #faq-section__q-text:hover {
            color: #59636f;
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
            background: #8d96a1;
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
            border-top: 1px solid #dde2e8;
        }

        #faq-section__a-text {
            font-size: 0.9rem;
            color: #59636f;
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
        .section-10-container {
            padding-top: 28px;
            padding-bottom: 36px;
        }

        .section-10 {
            width: 100%;
            overflow: hidden;
            position: relative;
            padding: 28px 16px 34px;
            background: linear-gradient(180deg, #f5f6f8 0%, #ffffff 56%, #eef1f4 100%);
            font-family: sans-serif;
            color: #2b3037;
        }

        .section-10__title {
            margin: 0 auto 22px;
            color: #2b3037;
            font-size: 1.55rem;
            font-weight: 800;
            line-height: 1.15;
            text-align: center;
        }

        .section-10__control {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
        }

        .section-10__viewport {
            width: 100%;
            overflow: hidden;
        }

        .section-10__track {
            display: flex;
            margin: 0;
            padding: 0;
            list-style: none;
            transition: transform 0.35s ease;
        }

        .section-10__item {
            flex: 0 0 100%;
            min-width: 0;
            padding: 0 10px;
        }

        #section-10-slide-1:checked~.section-10__viewport .section-10__track {
            transform: translateX(0);
        }

        #section-10-slide-2:checked~.section-10__viewport .section-10__track {
            transform: translateX(-100%);
        }

        #section-10-slide-3:checked~.section-10__viewport .section-10__track {
            transform: translateX(-200%);
        }

        #section-10-slide-4:checked~.section-10__viewport .section-10__track {
            transform: translateX(-300%);
        }

        .section-10__card {
            display: flex;
            min-height: 100%;
            flex-direction: column;
            align-items: center;
            padding: 0 14px;
            text-align: center;
        }

        .section-10__media {
            width: 148px;
            height: 148px;
            margin: 0 0 18px;
            overflow: hidden;
            border: 1px solid #d9dee5;
            border-radius: 50%;
            background: #ffffff;
        }

        .section-10__image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
        }

        .section-10__card-title {
            margin: 0 0 10px;
            color: #2b3037;
            font-size: 1rem;
            font-weight: 800;
            line-height: 1.25;
        }

        .section-10__card-text {
            margin: 0 auto;
            color: #59636f;
            font-size: 0.86rem;
            line-height: 1.55;
        }

        .section-10__controls {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 8px 0 0;
        }

        .section-10__button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border: 1px solid #cfd5dd;
            border-radius: 999px;
            background: #ffffff;
            color: #2b3037;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 800;
            line-height: 1;
            transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }

        .section-10__button:hover {
            border-color: #6f7782;
        }

        #section-10-slide-1:checked~.section-10__controls .section-10__button--1,
        #section-10-slide-2:checked~.section-10__controls .section-10__button--2,
        #section-10-slide-3:checked~.section-10__controls .section-10__button--3,
        #section-10-slide-4:checked~.section-10__controls .section-10__button--4 {
            border-color: #2f363f;
            background: #2f363f;
            color: #ffffff;
        }

        @media (min-width: 576px) {
            .section-10 {
                padding: 34px 30px 42px;
            }

            .section-10__title {
                max-width: 576px;
                font-size: 1.85rem;
            }

            .section-10__media {
                width: 164px;
                height: 164px;
            }
        }

        @media (min-width: 768px) {
            .section-10 {
                padding: 38px 28px 46px;
            }

            .section-10__title {
                max-width: 768px;
                margin-bottom: 28px;
            }

            .section-10__item {
                flex-basis: 50%;
                padding: 0 12px;
            }

            #section-10-slide-1:checked~.section-10__viewport .section-10__track {
                transform: translateX(0);
            }

            #section-10-slide-2:checked~.section-10__viewport .section-10__track {
                transform: translateX(-50%);
            }

            #section-10-slide-3:checked~.section-10__viewport .section-10__track,
            #section-10-slide-4:checked~.section-10__viewport .section-10__track {
                transform: translateX(-100%);
            }

            .section-10__button--4 {
                display: none;
            }
        }

        @media (min-width: 992px) {
            .section-10 {
                padding: 42px 105px 52px;
            }

            .section-10__title {
                max-width: 992px;
                font-size: 2.15rem;
            }
        }

        @media (min-width: 1200px) {
            .section-10 {
                padding: 46px 34px 58px;
            }

            .section-10__viewport {
                overflow: visible;
            }

            .section-10__item {
                flex-basis: 25%;
                padding: 0 14px;
            }

            #section-10-slide-1:checked~.section-10__viewport .section-10__track,
            #section-10-slide-2:checked~.section-10__viewport .section-10__track,
            #section-10-slide-3:checked~.section-10__viewport .section-10__track,
            #section-10-slide-4:checked~.section-10__viewport .section-10__track {
                transform: none;
            }

            .section-10__controls {
                display: none;
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
            filter: grayscale(1) brightness(1.14) contrast(0.76);
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
            padding: calc(var(--badge-size) / 2 + 1.8rem) 0.3rem 2.5rem;
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
            color: #262b31;
        }

        .section-2-2__title strong {
            font-weight: 700;
            display: block;
        }

        .section-2-2__subtitle {
            color: #68717d;
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

    <style>
        /* ===== HERO SECTION — VARIÁVEIS ===== */
        .section-6 {
            --pos-y: 50%;
            --pos-x: 54%;
            --color-title: #2b3037;
            --bg-box: rgba(255, 255, 255, 0.86);
            padding-top: 12px;

            background-color: #eef0f2;
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
            max-width: min(38%, 470px);
            z-index: 10;
            padding: clamp(20px, 3vw, 34px) clamp(18px, 3vw, 36px);
            border-left: 5px solid #c5cad1;
            border-radius: 4px 28px 28px 4px;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.92) 0%, rgba(242, 244, 246, 0.64) 78%, rgba(242, 244, 246, 0) 100%);
            box-shadow: 0 18px 42px rgba(34, 40, 48, 0.12);
            backdrop-filter: blur(2px);
        }

        .section-6__title {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin: 0;
            color: #2b3037;
            line-height: 1;
            text-shadow: 0 2px 14px rgba(255, 255, 255, 0.7);
        }

        .section-6__title-brand {
            display: block;
            font-size: clamp(2.25rem, 5.1vw, 4.7rem);
            font-weight: 900;
            letter-spacing: 0;
        }

        .section-6__title-model {
            display: block;
            color: #505964;
            font-size: clamp(1.05rem, 2.1vw, 1.75rem);
            font-weight: 500;
            line-height: 1.12;
        }

        .section-6__description {
            display: flex;
            flex-direction: column;
            gap: 7px;
            max-width: 27rem;
            color: #3f4650;
            margin: 18px 0 0;
            font-size: clamp(1rem, 1.55vw, 1.22rem);
            line-height: 1.42;
            text-shadow: 0 2px 10px rgba(255, 255, 255, 0.65);
        }

        .section-6__description-strong {
            font-weight: 800;
        }

        .section-6__description-line {
            font-weight: 400;
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
                padding: 24px 22px 28px;
                border-left: 0;
                border-radius: 0;
                background: linear-gradient(180deg, #f4f5f6 0%, #e8ebee 100%);
                box-shadow: none;
                backdrop-filter: none;
                text-align: left;
            }

            .section-6__title {
                color: #2b3037;
                text-shadow: none;
            }

            .section-6__description {
                margin-top: 14px;
                font-size: 1.02rem;
                color: #525b66;
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
            .section-6__title-brand {
                font-size: 2rem;
            }

            .section-6__title-model {
                font-size: 1.05rem;
            }

            .section-6__description {
                font-size: 0.96rem;
            }
        }
    </style>

    <style>
        .section-15-container {
            background-color: #eef1f4;
            padding: 1.5rem;
            width: 100%;
            box-sizing: border-box;
            position: relative;
        }

        @media (min-width: 760px) {
            #section-15-container::before {
                content: "";
                position: absolute;
                inset: 0;
                background-image: url("https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-dual-masculino-cinza-fundo-infinito-1225035-12.png");
                background-size: contain;
                background-repeat: no-repeat;
                pointer-events: none;
                z-index: 4;
            }
        }

        .section-15 {
            display: flex;
            flex-direction: column-reverse;
            gap: 1.25rem;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
            position: relative;
            z-index: 5;
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
            color: #2b3037;
            font-size: 32px;
            font-weight: 600;
            line-height: 40px;
            margin: 0 0 1rem;
            text-align: left;
        }

        .section-15__desc {
            color: #545e6b;
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
            color: #2b3037;
            font-size: 1.05rem;
            font-weight: 700;
            line-height: 1.35;
            margin: 0;
        }

        .section-15__feature-item-text {
            color: #545e6b;
            font-size: 0.8125rem;
            line-height: 1.55;
            margin: 0;
        }

        /* ── NOVO: aspect-ratio e desc oculta no mobile ── */
        @media (max-width: 759px) {
            .section-15__image {
                aspect-ratio: 4 / 3;
            }
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

            .section-15__image-wrapper {
                flex: 0 0 48%;
                max-width: 48%;
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
        .section-21 {
            width: 100%;
            min-height: 280px;
            overflow: hidden;
            display: grid;
            align-items: stretch;
            gap: 18px;
            padding: 22px 16px;
            background: #f0f2f5;
            border-radius: 6px;
            color: #2b3037;
            font-family: sans-serif;
        }

        .section-21--reverse .section-21__content {
            order: 2;

        }

        .section-21--reverse .section-21__gallery {
            order: 1;
        }

        .section-21__content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 12px;
            padding: 0 1.75rem;
        }

        .section-21__title {
            margin: 0;
            color: #2b3037;
            font-size: 1.65rem;
            font-weight: 900;
            line-height: 0.98;
            text-transform: uppercase;
        }

        .section-21__text {
            margin: 0;
            color: #535c68;
            font-size: 0.86rem;
            line-height: 1.55;
        }

        .section-21__control {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
        }

        .section-21__gallery {
            position: relative;
            display: block;
            min-height: 205px;
            height: 100%;
        }

        .section-21__viewport {
            position: relative;
            width: calc(100% - 72px);
            min-height: inherit;
            height: 100%;
            margin: 0 auto;
            overflow: hidden;
        }

        .section-21__track {
            position: relative;
            min-height: inherit;
            height: 100%;
            transition: transform 0.35s ease;
        }

        .section-21__panel {
            min-height: 0;
            height: auto;
            margin: 0;
            overflow: hidden;
            background: #d8dde4;
            border-radius: 5px;
        }

        .section-21__panel--first {
            clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 7%;
            width: 86%;
        }

        .section-21__panel--middle {
            clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 107%;
            width: 86%;
        }

        .section-21__panel--last {
            clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 207%;
            width: 86%;
        }

        #section-21-slide-1:checked~.section-21__gallery .section-21__track {
            transform: translateX(0);
        }

        #section-21-slide-2:checked~.section-21__gallery .section-21__track {
            transform: translateX(-100%);
        }

        #section-21-slide-3:checked~.section-21__gallery .section-21__track {
            transform: translateX(-200%);
        }

        .section-21__image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }

        .section-21__image:not([src]) {
            opacity: 0;
        }

        .section-21__arrows {
            position: absolute;
            inset: 0;
            pointer-events: none;
        }

        .section-21__arrow {
            position: absolute;
            top: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            width: 34px;
            height: 34px;
            border: 1px solid #cbd1da;
            border-radius: 50%;
            background: #ffffff;
            color: #3a414b;
            cursor: pointer;
            font-size: 1.4rem;
            font-weight: 900;
            line-height: 1;
            pointer-events: auto;
            transform: translateY(-50%);
        }

        .section-21__arrow--left {
            left: 0;
        }

        .section-21__arrow--right {
            right: 0;
        }

        #section-21-slide-1:checked~.section-21__gallery .section-21__arrow--next-1 {
            display: flex;
        }

        #section-21-slide-2:checked~.section-21__gallery .section-21__arrow--prev-2 {
            display: flex;
        }

        #section-21-slide-2:checked~.section-21__gallery .section-21__arrow--next-2 {
            display: flex;
        }

        #section-21-slide-3:checked~.section-21__gallery .section-21__arrow--prev-3 {
            display: flex;
        }

        @media (min-width: 576px) {
            .section-21 {
                padding: 24px 20px;
            }

            .section-21__title {
                font-size: 1.9rem;
            }

            .section-21__gallery {
                min-height: 230px;
            }

            .section-21__viewport {
                width: calc(100% - 86px);
            }

            .section-21__panel--first {
                left: 0;
                width: 56%;
            }

            .section-21__panel--middle {
                left: 44%;
                width: 56%;
            }

            .section-21__panel--last {
                left: 88%;
                width: 56%;
            }

            #section-21-slide-2:checked~.section-21__gallery .section-21__track {
                transform: translateX(-44%);
            }

            #section-21-slide-3:checked~.section-21__gallery .section-21__track {
                transform: translateX(-44%);
            }

            #section-21-slide-2:checked~.section-21__gallery .section-21__arrow--next-2 {
                display: none;
            }

            #section-21-slide-3:checked~.section-21__gallery .section-21__arrow--prev-3 {
                display: none;
            }

            #section-21-slide-3:checked~.section-21__gallery .section-21__arrow--prev-3-tablet {
                display: flex;
            }
        }

        @media (min-width: 768px) {
            .section-21 {
                grid-template-columns: minmax(0, 0.75fr) minmax(0, 2.25fr);
                align-items: stretch;
                gap: 18px;
                padding: 24px;
            }

            .section-21--reverse {
                grid-template-columns: minmax(0, 2.25fr) minmax(0, 0.75fr);
            }

            .section-21__content {
                gap: 14px;
            }

            .section-21__gallery {
                min-height: 250px;
            }
        }

        @media (min-width: 992px) {
            .section-21 {
                gap: 22px;
                padding: 26px;
            }

            .section-21__title {
                font-size: 2.15rem;
            }

            .section-21__gallery {
                min-height: 270px;
            }
        }

        @media (min-width: 992px) {
            .section-21 {
                gap: 24px;
                padding: 28px;
            }

            .section-21__gallery {
                min-height: 285px;
            }

            .section-21__viewport {
                width: 100%;
                overflow: visible;
            }

            #section-21-slide-1:checked~.section-21__gallery .section-21__track,
            #section-21-slide-2:checked~.section-21__gallery .section-21__track,
            #section-21-slide-3:checked~.section-21__gallery .section-21__track {
                transform: none;
            }

            .section-21__panel--first {
                left: 0%;
                width: 37%;
            }

            .section-21__panel--middle {
                left: 31%;
                width: 37%;
            }

            .section-21__panel--last {
                left: 63%;
                width: 37%;
            }

            .section-21__arrows {
                display: none;
            }
        }

        @media (min-width: 1400px) {
            .section-21 {
                gap: 28px;
                padding: 30px;
            }

            .section-21__title {
                font-size: 2.35rem;
            }
        }
    </style>

    <style>
        .section-22 {
            width: 100%;
            overflow: hidden;
            padding: 28px 16px;
            background: linear-gradient(180deg, #f6f7f9 0%, #ffffff 58%, #eff2f5 100%);
            border-radius: 6px;
            color: #2b3037;
            font-family: sans-serif;
            text-align: center;
        }

        .section-22__title {
            margin: 0;
            color: #2b3037;
            font-size: 1.55rem;
            font-weight: 900;
            line-height: 1.15;
        }

        .section-22__subtitle {
            margin: 8px auto 20px;
            color: #5a6370;
            font-size: 0.9rem;
            line-height: 1.55;
        }

        .section-22__table-wrap {
            width: 100%;
            overflow-x: auto;
            border: 1px solid #d7dce3;
            border-radius: 5px;
            background: #ffffff;
        }

        .section-22__table {
            width: 100%;
            min-width: 760px;
            border-collapse: collapse;
        }

        .section-22__cell {
            min-width: 78px;
            padding: 13px 12px;
            border-right: 1px solid #d7dde6;
            color: #3b434e;
            font-size: 0.82rem;
            font-weight: 600;
            line-height: 1.35;
            text-align: center;
            white-space: nowrap;
        }

        .section-22__cell--label {
            min-width: 188px;
            color: #2b3037;
            font-weight: 800;
            text-align: left;
        }

        .section-22__cell:last-child {
            border-right: 0;
        }

        .section-22__row+.section-22__row .section-22__cell {
            border-top: 1px solid #d7dce3;
        }

        .section-22__tip {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin: 20px auto 0;
            color: #56606c;
            font-size: 0.86rem;
            line-height: 1.5;
        }

        .section-22__icon {
            flex: 0 0 auto;
            width: 34px;
            height: 20px;
            color: #454d58;
        }

        .section-22__tip-text {
            margin: 0;
            text-align: left;
        }

        .section-22__tip-strong {
            font-weight: 800;
        }

        @media (min-width: 576px) {
            .section-22 {
                padding: 32px 22px;
            }

            .section-22__title {
                font-size: 1.85rem;
            }
        }

        @media (min-width: 768px) {
            .section-22 {
                padding: 36px 26px;
            }

            .section-22__subtitle {
                margin-bottom: 24px;
            }
        }

        @media (min-width: 992px) {
            .section-22 {
                padding: 40px 34px;
            }

            .section-22__title {
                font-size: 2.2rem;
            }

            .section-22__table-wrap {
                overflow-x: visible;
            }

            .section-22__table {
                min-width: 0;
            }
        }

        @media (min-width: 1200px) {
            .section-22 {
                padding: 44px 40px;
            }
        }

        @media (min-width: 1400px) {
            .section-22 {
                padding: 46px 44px;
            }
        }
    </style>


    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="section-2-2" aria-label="Cabeçalho do produto">
            <header class="section-2-2__banner">
                <div class="section-2-2__banner-container">
                    <video class="section-2-2__banner-video"
                        poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-havaianas.webp"
                        preload="none" autoplay muted loop playsinline aria-hidden="true">
                        <source
                            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/havaianas/header-havaianas.mov">
                    </video>
                </div>

                <div class="section-2-2__badge" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/havaianas/logo-havaianas.png"
                        alt="Logo da marca" class="section-2-2__badge-img">
                </div>
            </header>

            <article class="section-2-2__body">
                <small class="section-2-2__brand">── havaianas ──</small>
                <h2 class="section-2-2__title">
                    Havaianas Dual Verde São Francisco <strong>Robustez e conforto para o dia a dia</strong>
                </h2>
                <p class="section-2-2__subtitle">
                    Chinelo masculino com solado em duas camadas, tiras bicolores mais grossas e encaixe firme.
                    Uma escolha casual para quem quer conforto do rolê à rotina.
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto" background-color: #90939f99;>
            <picture>
                <source media="(max-width: 760px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-dual-masculino-cinza-gelo-casual-1225035-10.webp"
                    width="780" height="400">
                <img class="section-6__image"
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-dual-masculino-cinza-gelo-lifestyle-1225035-11.webp"
                    alt="Havaianas Dual Verde São Francisco com tiras largas e solado robusto" width="1600" height="650"
                    loading="lazy" fetchpriority="high" decoding="async">
            </picture>
            <div class="section-6__content">
                <h2 class="section-6__title">
                    <span class="section-6__title-brand">Havaianas</span>
                    <span class="section-6__title-model">Dual Verde São Francisco</span>
                </h2>
                <p class="section-6__description">
                    <span class="section-6__description-strong">Robusta, confortável e durável.</span>
                    <span class="section-6__description-line">Solado duplo e tiras largas para acompanhar do rolê à
                        rotina.</span>
                </p>
            </div>
        </section>

        <div class="section-15-container" id="section-15-container" style="background-color: #90939f99;">
            <div class="section-15" background-color: #90939f99;>
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        Solado duplo para mais conforto e presença
                    </h2>
                    <p class="section-15__desc">
                        A estrutura em duas camadas combina borracha macia, flexibilidade e resistência para deixar a
                        pisada mais confortável no uso casual.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <img class="section-15__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sandalia-havaianas-dual-masculina-cinza-gelo-fundo-infinito-1225035-13.webp"
                        alt="Chinelo Havaianas Dual Verde com solado robusto em duas camadas" />
                </div>
            </div>
        </div>

        <section aria-label="Grid de especificações do produto">
            <div class="section-10 section-10--carousel-mobile" aria-labelledby="section-10-title">
                <h2 class="section-10__title" id="section-10-title">
                    A qualidade está em cada detalhe
                </h2>
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-1"
                    checked>
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-2">
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-3">
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-4">
                <div class="section-10__viewport">
                    <ul class="section-10__track">
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sandalia-havaianas-dual-masculina-cinza-gelo-1225035-02.webp"
                                        alt="Detalhe das tiras largas em PVC da Havaianas Dual">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Tiras largas em PVC
                                    </h3>
                                    <p class="section-10__card-text">
                                        Encaixe firme, toque macio e visual robusto para o uso casual.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-dual-masculino-cinza-lifestyle-1225035-03.webp"
                                        alt="Detalhe do solado de duas camadas da Havaianas Dual">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Solado em duas camadas
                                    </h3>
                                    <p class="section-10__card-text">
                                        Mais conforto, resistência e presença para acompanhar o dia a dia.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-dual-masculino-cinza-casual-1225035-04.webp"
                                        alt="Detalhe da textura na base da Havaianas Dual">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Textura para aderência
                                    </h3>
                                    <p class="section-10__card-text">
                                        A base texturizada ajuda a deixar a passada mais segura.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-dual-masculino-praia-lifestyle-1225035-05.webp"
                                        alt="Detalhe da borracha flexível da Havaianas Dual">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Borracha macia e durável
                                    </h3>
                                    <p class="section-10__card-text">
                                        Material flexível, resistente e simples de limpar depois do uso.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                    </ul>
                </div>
                <nav class="section-10__controls">
                    <label class="section-10__button section-10__button--1" for="section-10-slide-1">1</label>
                    <label class="section-10__button section-10__button--2" for="section-10-slide-2">2</label>
                    <label class="section-10__button section-10__button--3" for="section-10-slide-3">3</label>
                    <label class="section-10__button section-10__button--4" for="section-10-slide-4">4</label>
                </nav>
            </div>
        </section>

        <div class="section-15-container" style="background-color: #90939f99;">
            <div class="section-15 is-reverse">
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        Tiras largas que firmam melhor nos pés
                    </h2>
                    <p class="section-15__desc">
                        As tiras bicolores em PVC texturizado têm visual moderno, toque firme e melhor encaixe para quem
                        prefere um chinelo masculino mais robusto.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <img class="section-15__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-dual-masculino-cinza-gelo-angulo-lateral-1225035-14.webp"
                        alt="Chinelo Havaianas Dual Verde com tiras bicolores largas" />
                </div>
            </div>
        </div>

        <section class="section-21-container" aria-label="Estilo e detalhes das Havaianas Dual">
            <article class="section-21" aria-labelledby="section-21-title">
                <div class="section-21__content">
                    <h2 class="section-21__title" id="section-21-title">
                        Estilo que combina com você
                    </h2>
                    <p class="section-21__text">
                        Tiras bicolores com textura inspirada em pneu que trazem um visual moderno e marcante.
                    </p>
                </div>
                <input class="section-21__control" type="radio" name="section-21-carousel" id="section-21-slide-1"
                    checked aria-label="Mostrar primeira imagem">
                <input class="section-21__control" type="radio" name="section-21-carousel" id="section-21-slide-2"
                    aria-label="Mostrar próxima imagem">
                <input class="section-21__control" type="radio" name="section-21-carousel" id="section-21-slide-3"
                    aria-label="Mostrar última imagem">
                <div class="section-21__gallery" aria-label="Espaços para imagens em recorte diagonal">
                    <div class="section-21__viewport">
                        <div class="section-21__track">
                            <figure class="section-21__panel section-21__panel--first">
                                <img class="section-21__image"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sandalia-havaianas-dual-detalhe-tira-textura-pneu-1225035-06.webp"
                                    alt="Imagem da tira bicolor da Havaianas Dual" loading="lazy" width="420"
                                    height="320">
                            </figure>
                            <figure class="section-21__panel section-21__panel--middle">
                                <img class="section-21__image"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sandalia-havaianas-dual-solado-borracha-antiderrapante-1225035-07.webp"
                                    alt="Imagem da palmilha texturizada da Havaianas Dual" loading="lazy" width="420"
                                    height="320">
                            </figure>
                            <figure class="section-21__panel section-21__panel--last">
                                <img class="section-21__image"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sandalia-havaianas-dual-solado-dupla-camada-borracha-1225035-08.webp"
                                    alt="Imagem lateral do solado da Havaianas Dual" loading="lazy" width="420"
                                    height="320">
                            </figure>
                        </div>
                    </div>
                    <nav class="section-21__arrows" aria-label="Controles das imagens em destaque">
                        <label class="section-21__arrow section-21__arrow--right section-21__arrow--next-1"
                            for="section-21-slide-2" role="button" aria-label="Ver próxima imagem">&#8250;</label>
                        <label class="section-21__arrow section-21__arrow--left section-21__arrow--prev-2"
                            for="section-21-slide-1" role="button" aria-label="Ver imagem anterior">&#8249;</label>
                        <label class="section-21__arrow section-21__arrow--right section-21__arrow--next-2"
                            for="section-21-slide-3" role="button" aria-label="Ver próxima imagem">&#8250;</label>
                        <label class="section-21__arrow section-21__arrow--left section-21__arrow--prev-3"
                            for="section-21-slide-2" role="button" aria-label="Ver imagem anterior">&#8249;</label>
                        <label class="section-21__arrow section-21__arrow--left section-21__arrow--prev-3-tablet"
                            for="section-21-slide-1" role="button"
                            aria-label="Voltar para as primeiras imagens">&#8249;</label>
                    </nav>
                </div>
            </article>
        </section>

        <section class="section-22-container" aria-label="Guia de tamanhos Havaianas">
            <article class="section-22" aria-labelledby="section-22-title">
                <h2 class="section-22__title" id="section-22-title">Guia de tamanhos</h2>
                <p class="section-22__subtitle">
                    Este anúncio contempla as numerações Havaianas 37/38, 39/40, 41/42, 43/44 e 45/46.
                </p>
                <div class="section-22__table-wrap">
                    <table class="section-22__table"
                        aria-label="Tabela de conversão de comprimento do pé para tamanho Havaianas">
                        <tbody>
                            <tr class="section-22__row">
                                <th class="section-22__cell section-22__cell--label" scope="row">Comprimento do pé (cm)
                                </th>
                                <td class="section-22__cell">23,7 - 25,0</td>
                                <td class="section-22__cell">25,1 - 26,3</td>
                                <td class="section-22__cell">26,4 - 27,6</td>
                                <td class="section-22__cell">27,7 - 29,0</td>
                                <td class="section-22__cell">29,1 - 30,3</td>
                            </tr>
                            <tr class="section-22__row">
                                <th class="section-22__cell section-22__cell--label" scope="row">Tamanho Havaianas</th>
                                <td class="section-22__cell">37/38</td>
                                <td class="section-22__cell">39/40</td>
                                <td class="section-22__cell">41/42</td>
                                <td class="section-22__cell">43/44</td>
                                <td class="section-22__cell">45/46</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <aside class="section-22__tip" aria-label="Dica sobre escolha de tamanho">
                    <svg class="section-22__icon" viewBox="0 0 48 28" role="img" aria-label="Ícone de régua">
                        <rect x="2" y="6" width="44" height="16" rx="2" fill="none" stroke="currentColor"
                            stroke-width="2" />
                        <path d="M9 6v6M15 6v4M21 6v6M27 6v4M33 6v6M39 6v4" fill="none" stroke="currentColor"
                            stroke-width="2" />
                    </svg>
                    <p class="section-22__tip-text">
                        <span class="section-22__tip-strong">Dica:</span> Ficou entre dois tamanhos? Escolha o maior
                        para mais conforto.
                    </p>
                </aside>
            </article>
        </section>


        <p style="color: #727b86; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty;
            text-align: center; padding: 30px 0;">
            IMAGENS MERAMENTE ILUSTRATIVAS
        </p>

        <!-- Área de FAQ -->
        <section id="faq-section" aria-labelledby="faq-section-title">
            <div id="faq-section__header">
                <h2 id="faq-section__title" id="faq-section-title">Dúvidas Frequentes</h2>
            </div>
            <ul id="faq-section__list" role="list">
                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O Havaianas Dual Verde é indicado para qual tipo de uso? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Ele é indicado para uso casual no dia a dia, do rolê à rotina,
                                com estrutura robusta e confortável para quem procura um chinelo resistente e versátil.
                            </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O chinelo Havaianas Dual Verde é confortável? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. Ele tem solado com duas camadas robustas, macias e
                                flexíveis, ajudando a entregar mais conforto durante o uso. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O solado do Havaianas Dual Verde é resistente? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. O solado é feito em borracha e possui duas camadas, o que
                                contribui para maior durabilidade, resistência e aderência. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> As tiras do Havaianas Dual Verde são grossas? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. As tiras são mais largas, bicolores e texturizadas,
                                oferecendo melhor encaixe aos pés e visual mais moderno. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> Qual é o material do Havaianas Dual Verde? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O chinelo é fabricado em borracha, com tiras texturizadas de
                                PVC, combinando flexibilidade, durabilidade e conforto. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O Havaianas Dual Verde tem boa aderência? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. O modelo conta com solado robusto e estrutura pensada para
                                oferecer melhor aderência no uso casual. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> Como limpar o chinelo Havaianas Dual Verde? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Lave com escova de cerdas macias, água e sabão neutro. Depois,
                                deixe secar em local arejado e à sombra. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> Pode usar produto químico para limpar o Havaianas Dual Verde?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Não. A limpeza deve ser feita sem produtos químicos,
                                preservando melhor o material, as tiras e o acabamento do chinelo. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O Havaianas Dual Verde combina com quais ocasiões? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Ele combina com momentos casuais, passeios e uso diário,
                                principalmente para quem busca um chinelo masculino robusto, confortável e fácil de
                                usar. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->
            </ul>
        </section>

    </div>
</div>`,
  css: ``
}
);
