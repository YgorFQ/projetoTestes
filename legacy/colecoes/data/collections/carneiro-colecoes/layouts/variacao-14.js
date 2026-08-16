// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "variacao-14",
  name: "variação 14",
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

        @keyframes rich-fade-up {
            from {
                opacity: 0;
                transform: translateY(22px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes rich-fade-left {
            from {
                opacity: 0;
                transform: translate(-18px, -50%);
            }

            to {
                opacity: 1;
                transform: translate(0, -50%);
            }
        }

        @keyframes rich-wine-glow {
            from {
                filter: saturate(0.94) brightness(0.98);
            }

            to {
                filter: saturate(1.08) brightness(1.04);
            }
        }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&amp;display=swap"
        rel="stylesheet">
    <title>Havaianas Elegance Amaranto</title>
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
            background: #ffffff;
            animation: rich-fade-up 0.85s ease both;
        }

        #faq-section__header {
            text-align: center;
            margin: 1rem 0;
        }

        #faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #6e0c2a;
            margin: 0 0 12px;
            line-height: 98%;
        }

        #faq-section__subtitle {
            font-size: 1rem;
            color: #6e0c2a;
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
            border: 1px solid #eadbe1;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 24px rgba(62, 7, 23, 0.04);
            transition: transform 0.32s ease, border-color 0.32s ease, box-shadow 0.32s ease;
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
            background: rgba(121, 45, 65, 0.10);
        }

        #faq-section__item:hover {
            transform: translateY(-2px);
            border-color: #792d41;
            box-shadow: 0 16px 34px rgba(62, 7, 23, 0.12);
        }

        #faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #6e0c2a;
            flex: 1;
        }

        #faq-section__q-text:hover {
            color: #6e0c2a;
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
            background: #792d41;
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
            border-top: 1px solid #eadbe1;
        }

        #faq-section__a-text {
            font-size: 0.9rem;
            color: #6e0c2a;
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
            background: #ffffff;
            font-family: sans-serif;
            color: #6e0c2a;
            animation: rich-fade-up 0.82s ease both;
        }

        .section-10__title {
            margin: 0 auto 22px;
            color: #3e0717;
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
            transition: transform 0.35s ease;
        }

        .section-10__media {
            width: 148px;
            height: 148px;
            margin: 0 0 18px;
            overflow: hidden;
            border: 1px solid #eadbe1;
            border-radius: 50%;
            background: #ffffff;
            box-shadow: 0 12px 28px rgba(62, 7, 23, 0.08);
            transition: transform 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease;
        }

        .section-10__image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
            transition: transform 0.55s ease, filter 0.55s ease;
        }

        .section-10__card-title {
            margin: 0 0 10px;
            color: #6e0c2a;
            font-size: 1rem;
            font-weight: 800;
            line-height: 1.25;
        }

        .section-10__card-text {
            margin: 0 auto;
            color: #6e0c2a;
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
            border: 1px solid #eadbe1;
            border-radius: 999px;
            background: #ffffff;
            color: #6e0c2a;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 800;
            line-height: 1;
            transition: transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
        }

        .section-10__button:hover {
            transform: translateY(-2px);
            border-color: #792d41;
            box-shadow: 0 10px 20px rgba(62, 7, 23, 0.12);
        }

        #section-10-slide-1:checked~.section-10__controls .section-10__button--1,
        #section-10-slide-2:checked~.section-10__controls .section-10__button--2,
        #section-10-slide-3:checked~.section-10__controls .section-10__button--3,
        #section-10-slide-4:checked~.section-10__controls .section-10__button--4 {
            border-color: #792d41;
            background: #6e0c2a;
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

        .section-2-2__banner::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, rgba(62, 7, 23, 0.2), rgba(110, 12, 42, 0.08), rgba(121, 45, 65, 0.16));
            pointer-events: none;
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
            filter: saturate(0.95) contrast(1.04);
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
            transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .section-2-2__badge:hover {
            transform: scale(1.04);
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
            animation: rich-fade-up 0.82s ease both;
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
            color: #6e0c2a;
        }

        .section-2-2__title strong {
            font-weight: 700;
            display: block;
            color: #3e0717;
        }

        .section-2-2__subtitle {
            color: #6e0c2a;
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
            --pos-x: 4%;
            --color-title: #3e0717;
            --bg-box: rgba(255, 255, 255, 0.86);
            padding-top: 12px;

            background-color: #ffffff;
            width: 100%;
            position: relative;
            overflow: hidden;
        }

        /* ===== IMAGEM ===== */
        .section-6__image {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 1.1s ease, filter 1.1s ease;
        }

        .section-6:hover .section-6__image {
            transform: scale(1.015);
            filter: saturate(1.04) contrast(1.03);
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
            border-left: 5px solid #792d41;
            border-radius: 4px 28px 28px 4px;
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0 18px 44px rgba(62, 7, 23, 0.2);
            backdrop-filter: blur(2px);
            overflow: hidden;
            animation: rich-fade-left 0.86s ease both;
        }

        .section-6__content::before {
            content: "";
            position: absolute;
            inset: 0 auto 0 0;
            width: 3px;
            background: linear-gradient(180deg, #3e0717, #792d41, #6e0c2a);
            box-shadow: 0 0 18px rgba(121, 45, 65, 0.42);
        }

        .section-6__title {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin: 0;
            color: #3e0717;
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
            color: #792d41;
            font-size: clamp(1.05rem, 2.1vw, 1.75rem);
            font-weight: 500;
            line-height: 1.12;
        }

        .section-6__description {
            display: flex;
            flex-direction: column;
            gap: 7px;
            max-width: 27rem;
            color: #6e0c2a;
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
                padding: 24px 22px 6px;
                border-left: 0;
                border-radius: 0;
                background: #ffffff;
                box-shadow: none;
                backdrop-filter: none;
                text-align: left;
                animation: rich-fade-up 0.76s ease both;
            }

            .section-6__content::before {
                display: none;
            }

            .section-6__title {
                color: #3e0717;
                text-shadow: none;
            }

            .section-6__description {
                margin-top: 14px;
                font-size: 1.02rem;
                color: #6e0c2a;
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
            background-color: #ffffff;
            padding: 0.76rem;
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
            animation: rich-fade-up 0.82s ease both;
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
            box-shadow: 0 16px 34px rgba(62, 7, 23, 0.12);
            transition: transform 0.7s ease, filter 0.7s ease, box-shadow 0.7s ease;
        }

        .section-15:hover .section-15__image {
            transform: scale(1.025);
            filter: saturate(1.04) contrast(1.03);
            box-shadow: 0 22px 48px rgba(62, 7, 23, 0.18);
        }

        .section-15__content {
            display: flex;
            flex-direction: column;
            width: 95%;
            margin: auto;
            box-sizing: border-box;
        }

        .section-15__title {
            color: #3e0717;
            font-size: 32px;
            font-weight: 600;
            line-height: 40px;
            margin: 0 0 1rem;
            text-align: left;
        }

        .section-15__desc {
            color: #6e0c2a;
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
            color: #792d41;
            font-size: 1.05rem;
            font-weight: 700;
            line-height: 1.35;
            margin: 0;
        }

        .section-15__feature-item-text {
            color: #6e0c2a;
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
            position: relative;
            display: grid;
            align-items: stretch;
            gap: 18px;
            padding: 42px 18px 30px;
            background: #ffffff;
            border-radius: 6px;
            color: #6e0c2a;
            font-family: sans-serif;
            isolation: isolate;
            box-shadow: 0 12px 34px rgba(62, 7, 23, 0.08);
            animation: rich-fade-up 0.82s ease both;
        }

        .section-21::before {
            content: "";
            position: absolute;
            inset: 0 auto auto 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #3e0717 0%, #6e0c2a 62%, #792d41 100%);
            clip-path: polygon(0 0, 92% 0, 55% 100%, 0 100%);
            z-index: 0;
            animation: rich-wine-glow 7s ease-in-out infinite alternate;
        }

        .section-21::after {
            content: "";
            position: absolute;
            inset: 12px auto auto 18px;
            width: 46%;
            height: 1px;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0));
            z-index: 1;
            pointer-events: none;
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
            padding: 0;
            margin: 0 0 8px 26px;
            position: relative;
            z-index: 1;
        }

        .section-21__title {
            margin: 0;
            color: #ffffff;
            font-size: clamp(1.45rem, 6.7vw, 1.85rem);
            font-weight: 900;
            line-height: 0.98;
            text-transform: uppercase;
            text-shadow: 0 12px 26px rgba(62, 7, 23, 0.26);
        }

        .section-21__text {
            margin: 0;
            color: #ffffff;
            font-size: 0.95rem;
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
            min-height: 245px;
            height: 100%;
            z-index: 1;
        }

        .section-21__viewport {
            position: relative;
            width: min(82%, 350px);
            min-height: inherit;
            height: 100%;
            margin: 0 40px 0 auto;
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
            background: rgba(121, 45, 65, 0.10);
            border-radius: 5px;
            border: 1px solid rgba(121, 45, 65, 0.16);
            box-shadow: 0 16px 36px rgba(62, 7, 23, 0.16);
        }

        .section-21__panel--first {
            clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 100%;
        }

        .section-21__panel--middle {
            clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 100%;
            width: 100%;
        }

        .section-21__panel--last {
            clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 200%;
            width: 100%;
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
            transition: transform 0.8s ease, filter 0.8s ease;
        }

        .section-21:hover .section-21__image {
            transform: scale(1.035);
            filter: saturate(1.04) contrast(1.04);
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
            border: 1px solid #ff9900;
            border-radius: 50%;
            background: #ffffff;
            color: #6e0c2a;
            cursor: pointer;
            font-size: 1.4rem;
            font-weight: 900;
            line-height: 1;
            pointer-events: auto;
            transform: translateY(-50%);
            transition: transform 0.28s ease, box-shadow 0.28s ease, color 0.28s ease;
        }

        .section-21__arrow:hover {
            color: #3e0717;
            transform: translateY(-50%) scale(1.06);
            box-shadow: 0 0 0 5px rgba(121, 45, 65, 0.10), 0 14px 24px rgba(62, 7, 23, 0.16);
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

            .section-21::before {
                inset: 0 auto 0 0;
                width: 48%;
                height: 100%;
                clip-path: polygon(0 0, 100% 0, 82% 100%, 0 100%);
            }

            .section-21__content {
                width: auto;
                margin: 0;
                padding: 0 1.75rem;
            }

            .section-21__text {
                font-size: 0.86rem;
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
            background: #ffffff;
            border-radius: 6px;
            color: #6e0c2a;
            font-family: sans-serif;
            text-align: center;
            animation: rich-fade-up 0.82s ease both;
        }

        .section-22__title {
            margin: 0;
            color: #3e0717;
            font-size: 1.55rem;
            font-weight: 900;
            line-height: 1.15;
        }

        .section-22__subtitle {
            margin: 8px auto 20px;
            color: #6e0c2a;
            font-size: 0.9rem;
            line-height: 1.55;
        }

        .section-22__table-wrap {
            width: 100%;
            overflow-x: auto;
            border: 1px solid #eadbe1;
            border-radius: 5px;
            background: #ffffff;
            box-shadow: 0 14px 30px rgba(62, 7, 23, 0.06);
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .section-22__table-wrap:hover {
            border-color: #792d41;
            box-shadow: 0 18px 38px rgba(62, 7, 23, 0.12);
        }

        .section-22__table {
            width: 100%;
            min-width: 760px;
            border-collapse: collapse;
        }

        .section-22__cell {
            min-width: 78px;
            padding: 13px 12px;
            border-right: 1px solid #eadbe1;
            color: #6e0c2a;
            font-size: 0.82rem;
            font-weight: 600;
            line-height: 1.35;
            text-align: center;
            white-space: nowrap;
        }

        .section-22__cell--label {
            min-width: 188px;
            color: #792d41;
            font-weight: 800;
            text-align: left;
        }

        .section-22__cell:last-child {
            border-right: 0;
        }

        .section-22__row+.section-22__row .section-22__cell {
            border-top: 1px solid #eadbe1;
        }

        .section-22__tip {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin: 20px auto 0;
            color: #6e0c2a;
            font-size: 0.86rem;
            line-height: 1.5;
        }

        .section-22__icon {
            flex: 0 0 auto;
            width: 34px;
            height: 20px;
            color: #6e0c2a;
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
                        preload="none" autoplay="" muted="" loop="" playsinline="" aria-hidden="true">
                        <source
                            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/havaianas/header-havaianas.mov">
                    </video>
                </div>

                <div class="section-2-2__badge" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/havaianas/logo-havaianas.png"
                        alt="Logo da marca" class="section-2-2__badge-img" loading="lazy">
                </div>
            </header>

            <article class="section-2-2__body">
                <small class="section-2-2__brand">── havaianas ──</small>
                <h2 class="section-2-2__title">
                    Havaianas Elegance Amaranto <strong>conforto elegante para todos os dias</strong>
                </h2>
                <p class="section-2-2__subtitle">
                    Calçado clássico e moderno para caminhar com estilo, renovar o visual e acompanhar seus momentos de
                    lazer com conforto.
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto" background-color:="" #ffffff;="">
            <picture>
                <source media="(max-width: 760px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-cenario-praia2-lifestyle-1225195-1225196-1225197-1225198-1225199-01.webp">
                <img class="section-6__image"
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-cenario-praia1-lifestyle-1225195-1225196-1225197-1225198-1225199-01.webp"
                    alt="Havaianas Elegance Amaranto com visual clássico e moderno" width="1600" height="650"
                    fetchpriority="high" loading="lazy" decoding="async">
            </picture>
            <div class="section-6__content">
                <h2 class="section-6__title">
                    <span class="section-6__title-brand">Havaianas</span>
                    <span class="section-6__title-model">Elegance Amaranto</span>
                </h2>
                <p class="section-6__description">
                    <span class="section-6__description-strong">Estilo, conforto e elegância na rotina.</span>
                    <span class="section-6__description-line">Sola macia e tiras texturizadas para lazer, descanso e
                        dia a dia.</span>
                </p>
            </div>
        </section>

        <div class="section-15-container" style="background-color: #ffffff;">
            <div class="section-15" background-color:="" #ffffff;="">
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        Elegância confortável para caminhar com estilo
                    </h2>
                    <p class="section-15__desc">
                        A sola 100% borracha combina maciez, flexibilidade e durabilidade para acompanhar momentos de
                        lazer com conforto.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <img class="section-15__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-modelo-sentada-lifestyle-1225195-1225196-1225197-1225198-1225199-02.webp"
                        alt="Havaianas Elegance Amaranto com solado macio de borracha" loading="lazy" decoding="async">
                </div>
            </div>
        </div>

        <section aria-label="Grid de especificações do produto" style="background-color: #6e0c2a08;">
            <div class="section-10 section-10--carousel-mobile" aria-labelledby="section-10-title">
                <h2 class="section-10__title" id="section-10-title">
                    A qualidade está em cada detalhe
                </h2>
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-1"
                    checked="">
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-2">
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-3">
                <input class="section-10__control" type="radio" name="section-10-carousel" id="section-10-slide-4">
                <div class="section-10__viewport">
                    <ul class="section-10__track">
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-detalhe-tiras-textura-1225195-1225196-1225197-1225198-1225199-03-1.webp"
                                        alt="Detalhe das tiras texturizadas da Havaianas Elegance Amaranto"
                                        loading="lazy" decoding="async">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Tiras texturizadas em PVC
                                    </h3>
                                    <p class="section-10__card-text">
                                        Tiras mais grossas ajudam na estabilidade e trazem frescor durante o uso.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-detalhe-solado-inferior-1225195-1225196-1225197-1225198-1225199-03-2.webp"
                                        alt="Detalhe do solado macio da Havaianas Elegance Amaranto" loading="lazy"
                                        decoding="async">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Solado macio de borracha
                                    </h3>
                                    <p class="section-10__card-text">
                                        Base flexível e durável para caminhar com conforto no dia a dia.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-modelo-passarela-madeira-lifestyle-1225195-1225196-1225197-1225198-1225199-03-3.webp"
                                        alt="Detalhe do acabamento da Havaianas Elegance Amaranto" loading="lazy"
                                        decoding="async">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Amaranto com presença elegante
                                    </h3>
                                    <p class="section-10__card-text">
                                        Cor marcante para renovar o visual sem abrir mão de um estilo clássico.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-detalhe-logotipo-relevo-1225195-1225196-1225197-1225198-1225199-03-4.webp"
                                        alt="Detalhe da Havaianas Elegance Amaranto fácil de limpar" loading="lazy"
                                        decoding="async">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Fácil de lavar
                                    </h3>
                                    <p class="section-10__card-text">
                                        Pode ser lavada com sabão neutro, escova macia ou na máquina de lavar.
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

        <div class="section-15-container" style="background-color: #ffffff;">
            <div class="section-15 is-reverse">
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        Clássica e moderna na mesma escolha
                    </h2>
                    <p class="section-15__desc">
                        O modelo une conforto e elegância para os pés, com visual pronto para lazer, descanso e
                        combinações casuais.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <img class="section-15__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-modelo-caminhando-ambiente-lifestyle-1225195-1225196-1225197-1225198-1225199-04.webp"
                        alt="Havaianas Elegance Amaranto com tiras texturizadas em PVC" loading="lazy" decoding="async">
                </div>
            </div>
        </div>

        <section class="section-21-container" aria-label="Estilo e detalhes das Havaianas Elegance Amaranto">
            <article class="section-21" aria-labelledby="section-21-title">
                <div class="section-21__content">
                    <h2 class="section-21__title" id="section-21-title">
                        Estilo que combina com você
                    </h2>
                    <p class="section-21__text">
                        Amaranto elegante, conforto de borracha e visual clássico para caminhar com estilo.
                    </p>
                </div>
                <input class="section-21__control" type="radio" name="section-21-carousel" id="section-21-slide-1"
                    checked="" aria-label="Mostrar primeira imagem">
                <input class="section-21__control" type="radio" name="section-21-carousel" id="section-21-slide-2"
                    aria-label="Mostrar próxima imagem">
                <input class="section-21__control" type="radio" name="section-21-carousel" id="section-21-slide-3"
                    aria-label="Mostrar última imagem">
                <div class="section-21__gallery" aria-label="Espaços para imagens em recorte diagonal">
                    <div class="section-21__viewport">
                        <div class="section-21__track">
                            <figure class="section-21__panel section-21__panel--first">
                                <img class="section-21__image"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-mao-exibindo-produto-1225195-1225196-1225197-1225198-1225199-05-3.webp"
                                    alt="Imagem das tiras texturizadas da Havaianas Elegance Amaranto" width="420"
                                    height="320" loading="lazy" decoding="async">
                            </figure>
                            <figure class="section-21__panel section-21__panel--middle">
                                <img class="section-21__image"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-mao-exibindo-produto-1225195-1225196-1225197-1225198-1225199-05-2.webp"
                                    alt="Imagem do solado macio da Havaianas Elegance Amaranto" width="420" height="320"
                                    loading="lazy" decoding="async">
                            </figure>
                            <figure class="section-21__panel section-21__panel--last">
                                <img class="section-21__image"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-modelo-shopping-lifestyle-1225195-1225196-1225197-1225198-1225199-05-1.webp"
                                    alt="Imagem lateral da Havaianas Elegance Amaranto" width="420" height="320"
                                    loading="lazy" decoding="async">
                            </figure>
                        </div>
                    </div>
                    <nav class="section-21__arrows" aria-label="Controles das imagens em destaque">
                        <label class="section-21__arrow section-21__arrow--right section-21__arrow--next-1"
                            for="section-21-slide-2" role="button" aria-label="Ver próxima imagem">›</label>
                        <label class="section-21__arrow section-21__arrow--left section-21__arrow--prev-2"
                            for="section-21-slide-1" role="button" aria-label="Ver imagem anterior">‹</label>
                        <label class="section-21__arrow section-21__arrow--right section-21__arrow--next-2"
                            for="section-21-slide-3" role="button" aria-label="Ver próxima imagem">›</label>
                        <label class="section-21__arrow section-21__arrow--left section-21__arrow--prev-3"
                            for="section-21-slide-2" role="button" aria-label="Ver imagem anterior">‹</label>
                        <label class="section-21__arrow section-21__arrow--left section-21__arrow--prev-3-tablet"
                            for="section-21-slide-1" role="button"
                            aria-label="Voltar para as primeiras imagens">‹</label>
                    </nav>
                </div>
            </article>
        </section>

        <section class="section-22-container" aria-label="Guia de tamanhos Havaianas">
            <article class="section-22" aria-labelledby="section-22-title">
                <h2 class="section-22__title" id="section-22-title">Guia de tamanhos</h2>
                <p class="section-22__subtitle">
                    Este anúncio contempla as numerações Havaianas 33/34, 35/36, 37/38, 39/40 e 41/42.
                </p>
                <div class="section-22__table-wrap">
                    <table class="section-22__table"
                        aria-label="Tabela de tamanhos e medidas aproximadas da Havaianas Elegance Amaranto">
                        <tbody>
                            <tr class="section-22__row">
                                <th class="section-22__cell section-22__cell--label" scope="row">Tamanho Havaianas
                                </th>
                                <td class="section-22__cell">33/34</td>
                                <td class="section-22__cell">35/36</td>
                                <td class="section-22__cell">37/38</td>
                                <td class="section-22__cell">39/40</td>
                                <td class="section-22__cell">41/42</td>
                            </tr>
                            <tr class="section-22__row">
                                <th class="section-22__cell section-22__cell--label" scope="row">Medida aprox. do pé
                                    (cm)</th>
                                <td class="section-22__cell">21,1 - 22,3</td>
                                <td class="section-22__cell">22,4 - 23,6</td>
                                <td class="section-22__cell">23,7 - 25,0</td>
                                <td class="section-22__cell">25,1 - 26,3</td>
                                <td class="section-22__cell">26,4 - 27,6</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <aside class="section-22__tip" aria-label="Dica sobre escolha de tamanho">
                    <svg class="section-22__icon" viewBox="0 0 48 28" role="img" aria-label="Ícone de régua">
                        <rect x="2" y="6" width="44" height="16" rx="2" fill="none" stroke="currentColor"
                            stroke-width="2"></rect>
                        <path d="M9 6v6M15 6v4M21 6v6M27 6v4M33 6v6M39 6v4" fill="none" stroke="currentColor"
                            stroke-width="2"></path>
                    </svg>
                    <p class="section-22__tip-text">
                        <span class="section-22__tip-strong">Dica:</span> confira a numeração desejada antes de
                        finalizar
                        a escolha.
                    </p>
                </aside>
            </article>
        </section>


        <p style="color: #6e0c2a; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty;
            text-align: center; padding: 30px 0;">
            IMAGENS MERAMENTE ILUSTRATIVAS
        </p>

        <!-- Área de FAQ -->
        <section id="faq-section" aria-labelledby="faq-section-title">
            <div id="faq-section__header">
                <h2 id="faq-section__title">Dúvidas Frequentes</h2>
            </div>
            <ul id="faq-section__list" role="list">
                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> Para quais ocasiões o Havaianas Elegance Amaranto é
                                indicado? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O Havaianas Elegance Amaranto é indicado para momentos de
                                lazer, descanso e uso casual no dia a dia, sempre com um visual mais elegante. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O Havaianas Elegance Amaranto é confortável para
                                caminhar? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. A sola macia e flexível é feita em 100% borracha,
                                oferecendo conforto para os pés todos os dias. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O Havaianas Elegance Amaranto combina com quais ocasiões?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O modelo combina com lazer, passeios, descanso e produções
                                casuais que pedem conforto com aparência clássica e moderna. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> Quais são os diferenciais das tiras do Havaianas Elegance
                                Amaranto? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> As tiras são texturizadas, feitas em PVC mais grosso
                                e ajudam a entregar estabilidade, frescor e praticidade durante o uso. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> De que material é feita a sola do Havaianas Elegance Amaranto?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> A sola é produzida em 100% borracha, o que contribui para
                                maciez, flexibilidade, resistência e longa durabilidade. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O Havaianas Elegance Amaranto é um produto durável? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. A combinação de sola de borracha, tiras resistentes e
                                materiais de qualidade ajuda a manter o produto confortável e durável. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> Como limpar corretamente o Havaianas Elegance Amaranto?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Lave à mão com sabão neutro e escova macia. Se preferir, o
                                modelo também pode ser lavado na máquina de lavar roupa. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> Qual a forma correta de secar o chinelo após a lavagem? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Depois da limpeza, deixe o Havaianas Elegance Amaranto secar
                                em um local bem ventilado para manter o produto conservado. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <li id="faq-section__item">
                    <details>
                        <summary>
                            <h3 id="faq-section__q-text"> O Havaianas Elegance Amaranto combina com quais estilos?
                            </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> O tom amaranto combina com looks casuais, produções de lazer
                                e visuais que pedem um toque clássico com presença. </p>
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
