// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "variacao-11",
  name: "Variação 11",
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
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&amp;display=swap"
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
            margin: 2rem auto;
        }

        .faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #3A3F44;
            margin: 0 0 12px;
            line-height: 98%;
        }

        .faq-section__subtitle {
            font-size: 1rem;
            color: #59636E;
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
            border: 1px solid #D8DEE6;
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
            color: #3A3F44;
            flex: 1;
        }

        .faq-section__q-text:hover {
            color: #0052CC;
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
            background: #B87333;
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
            border-top: 1px solid #D8DEE6;
        }

        .faq-section__a-text {
            font-size: 0.9rem;
            color: #59636E;
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
        /* ===== HERO SECTION — VARIÁVEIS ===== */
        .section-6 {
            --pos-y: 50%;
            --pos-x: 4%;
            --color-title: #ffffff;
            --bg-box: rgba(58, 63, 68, 0.74);

            width: 100%;
            position: relative;
            border-radius: 20px;
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
                backdrop-filter: none;
                text-align: center;
            }

            .section-6__title {
                font-size: 1.8rem;
                color: #3A3F44;
                text-shadow: none;
            }

            .section-6__description {
                margin-bottom: 0;
                font-size: 1.1rem;
                color: #59636E;
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
        .section-15-container {
            background-color: #F7F9FC;
            padding: 1.5rem;
            width: 100%;
            box-sizing: border-box;
            border-top: 1px solid #9999993b;
            background-image: linear-gradient(22deg, #dee7f578, #fff);
        }

        .section-15 {
            display: flex;
            flex-direction: column-reverse;
            /* ← era column-reverse */
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
            border: 1px solid #D8DEE6;
            display: block;
            object-fit: cover;
            width: 100%;
            max-width: 530px;
            aspect-ratio: 16 / 9;
            box-shadow: 0 18px 42px rgba(58, 63, 68, 0.1);
        }

        .section-15__content {
            display: flex;
            flex-direction: column;
            width: 95%;
            margin: auto;
            box-sizing: border-box;
        }

        .section-15__title {
            color: #3A3F44;
            font-size: 1.62rem;
            font-weight: 600;
            line-height: 1.18;
            margin: 0 0 1rem;
            overflow-wrap: anywhere;
            text-align: left;
        }

        .section-15__desc {
            color: #59636E;
            font-size: 14px;
            line-height: 22px;
            margin: 0 0 1.5rem;
            overflow-wrap: anywhere;
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
            border-left: 3px solid #B87333;
            padding-left: 0.85rem;
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
            color: #0052CC;
            font-size: 1.05rem;
            font-weight: 700;
            line-height: 1.35;
            margin: 0;
        }

        .section-15__feature-item-text {
            color: #59636E;
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

        #section-15-container {
            border: 0;
        }


        @media (min-width: 760px) {
            .section-15 {
                align-items: center;
                flex-direction: row-reverse;
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

            .section-15__title {
                font-size: 2rem;
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

            .section-15__title {
                font-size: 2.15rem;
            }

            .section-15__feature-item-text {
                font-size: 0.9rem;
            }
        }

        .is-reverse {
            flex-direction: row;
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
            border: 3px solid #ff9900;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            z-index: 10;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.171);
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
            font-size: clamp(1.22rem, 4vw, 2.4rem);
            line-height: clamp(1.6rem, 4vw, 3.1rem);
            font-weight: 300;
            max-width: 50rem;
            overflow-wrap: anywhere;
            text-wrap: pretty;
            color: #3A3F44;
        }

        .section-2-2__title strong {
            font-weight: 700;
            display: block;
            color: #0052CC;
        }

        .section-2-2__subtitle {
            color: #59636E;
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
        /* ── Tokens do section-19 ── */
        .section-19 {
            font-family: system-ui, sans-serif;
            width: 100%;
            background: #F4F6F8;
            overflow: hidden;
            border-top: 1px solid #D8DEE6;
            border-bottom: 1px solid #D8DEE6;
        }

        /* ── Inputs ocultos ── */
        .section-19__radio {
            position: absolute;
            display: none;
            width: 0;
            height: 0;
            opacity: 0;
            pointer-events: none;
        }

        /* ── Wrap ── */
        .section-19__wrap {
            display: flex;
            flex-direction: column;
            gap: 24px;
            padding: 34px 0 34px;
            overflow: hidden;
        }

        /* ── Header ── */
        .section-19__header {
            padding: 0 28px;
        }

        .section-19__title {
            font-weight: 700;
            font-size: clamp(1.35rem, 2.8vw, 1.8rem);
            color: #3A3F44;
            text-align: center;
            line-height: 1.25;
        }

        /* ── Track ── */
        .section-19__track {
            display: flex;
            gap: 67px;
            padding-left: calc((100% - 310px) / 2);
            padding-right: calc((100% - 310px) / 2);
            transition: transform .44s cubic-bezier(.4, 0, .2, 1);
            transform: translateX(0);
            overflow: visible;
        }

        /* ── Card ── */
        .section-19__card {
            flex: 0 0 310px;
            width: 310px;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #D8DEE6;
            box-shadow: 0 12px 30px rgba(58, 63, 68, .08);
            text-align: left;
            transform: scale(0.85);
            opacity: .38;
            transition: transform .44s cubic-bezier(.4, 0, .2, 1), opacity .44s ease, box-shadow .44s ease;
        }

        .section-19__card-img {
            width: 100%;
            object-fit: cover;
            display: block;
            border-bottom: 3px solid #B87333;
        }

        .section-19__card-body {
            padding: 16px 16px 18px;
        }

        .section-19__card-title {
            font-size: 1.05rem;
            font-weight: 700;
            line-height: 1.3;
            margin-bottom: 8px;
            color: #0052CC;
        }

        .section-19__card-desc {
            font-size: 0.92rem;
            color: #59636E;
            line-height: 1.55;
            font-weight: 400;
            margin: 0;
        }

        /* ── Estado ativo — Mobile: 1 card ── */
        #s19-1:checked~.section-19 .section-19__card:nth-child(1),
        #s19-2:checked~.section-19 .section-19__card:nth-child(2),
        #s19-3:checked~.section-19 .section-19__card:nth-child(3) {
            transform: scale(1);
            opacity: 1;
            box-shadow: 0 18px 40px rgba(0, 82, 204, .14);
        }

        #s19-1:checked~.section-19 .section-19__track {
            transform: translateX(calc(0 * (310px + 67px) * -1));
        }

        #s19-2:checked~.section-19 .section-19__track {
            transform: translateX(calc(1 * (310px + 67px) * -1));
        }

        #s19-3:checked~.section-19 .section-19__track {
            transform: translateX(calc(2 * (310px + 67px) * -1));
        }

        /* ── Tablet ≥ 768px — 2 cards visíveis ── */
        @media (min-width: 768px) {
            .section-19__track {
                gap: 24px;
                padding-left: calc((100% - 2 * 230px - 24px) / 2);
                padding-right: calc((100% - 2 * 230px - 24px) / 2);
            }

            .section-19__card {
                flex: 0 0 230px;
                width: 230px;
            }

            #s19-1:checked~.section-19 .section-19__card:nth-child(1),
            #s19-1:checked~.section-19 .section-19__card:nth-child(2),
            #s19-2:checked~.section-19 .section-19__card:nth-child(2),
            #s19-2:checked~.section-19 .section-19__card:nth-child(3),
            #s19-3:checked~.section-19 .section-19__card:nth-child(2),
            #s19-3:checked~.section-19 .section-19__card:nth-child(3) {
                transform: scale(1);
                opacity: 1;
                box-shadow: 0 18px 40px rgba(0, 82, 204, .14);
            }

            #s19-1:checked~.section-19 .section-19__track {
                transform: translateX(0);
            }

            #s19-2:checked~.section-19 .section-19__track {
                transform: translateX(calc(1 * (230px + 24px) * -1));
            }

            #s19-3:checked~.section-19 .section-19__track {
                transform: translateX(calc(1 * (230px + 24px) * -1));
            }
        }

        /* ── Desktop ≥ 992px — 3 cards visíveis ── */
        @media (min-width: 992px) {
            .section-19__track {
                gap: 20px;
                padding-left: calc((100% - 3 * 280px - 2 * 20px) / 2);
                padding-right: calc((100% - 3 * 280px - 2 * 20px) / 2);
            }

            .section-19__card {
                flex: 0 0 280px;
                width: 280px;
                transform: scale(0.83);
            }

            #s19-1:checked~.section-19 .section-19__card:nth-child(1),
            #s19-1:checked~.section-19 .section-19__card:nth-child(2),
            #s19-1:checked~.section-19 .section-19__card:nth-child(3),
            #s19-2:checked~.section-19 .section-19__card:nth-child(1),
            #s19-2:checked~.section-19 .section-19__card:nth-child(2),
            #s19-2:checked~.section-19 .section-19__card:nth-child(3),
            #s19-3:checked~.section-19 .section-19__card:nth-child(1),
            #s19-3:checked~.section-19 .section-19__card:nth-child(2),
            #s19-3:checked~.section-19 .section-19__card:nth-child(3) {
                transform: scale(1);
                opacity: 1;
                box-shadow: 0 18px 40px rgba(0, 82, 204, .14);
            }

            #s19-1:checked~.section-19 .section-19__track,
            #s19-2:checked~.section-19 .section-19__track,
            #s19-3:checked~.section-19 .section-19__track {
                transform: translateX(0);
            }
        }

        /* ── Navegação ── */
        .section-19__nav {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 14px;
            padding: 0 28px;
        }

        .section-19__dots {
            display: flex;
            gap: 7px;
            align-items: center;
        }

        .section-19__dot {
            display: block;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #0052CC;
            opacity: .35;
            cursor: pointer;
            transition: opacity .25s, width .3s, background .25s, border-radius .3s;
        }

        #s19-1:checked~.section-19 .section-19__dot[for="s19-1"],
        #s19-2:checked~.section-19 .section-19__dot[for="s19-2"],
        #s19-3:checked~.section-19 .section-19__dot[for="s19-3"] {
            opacity: 1;
            background: #B87333;
            width: 20px;
            border-radius: 100px;
        }

        /* ── Botões prev/next ── */
        .section-19__btn-slot {
            position: relative;
            width: 40px;
            height: 40px;
            flex-shrink: 0;
        }

        .section-19__btn-slot label {
            position: absolute;
            inset: 0;
            display: none;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: #0052CC;
            border: 1px solid rgba(0, 82, 204, .16);
            color: #fefefe;
            font-size: 17px;
            cursor: pointer;
            transition: background .2s, border-color .2s, transform .15s;
            user-select: none;
        }

        .section-19__btn-slot label:hover {
            background: #B87333;
            border-color: #B87333;
            transform: scale(1.1);
        }

        .section-19__btn-slot label:active {
            transform: scale(.93);
        }

        .section-19__btn-disabled {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #3A3F44;
            border: 1px solid rgba(58, 63, 68, .16);
            opacity: .2;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 17px;
            color: #f2f2f2;
            pointer-events: none;
        }

        /* Padrão: disabled visível, labels ocultos */
        .section-19__btn-slot label {
            display: none;
        }

        .section-19__btn-disabled {
            display: flex;
        }

        /* PREV */
        #s19-1:checked~.section-19 .section-19__btn--prev .section-19__btn-disabled {
            display: flex;
        }

        #s19-1:checked~.section-19 .section-19__btn--prev label {
            display: none;
        }

        #s19-2:checked~.section-19 .section-19__btn--prev .section-19__btn-disabled {
            display: none;
        }

        #s19-2:checked~.section-19 .section-19__btn--prev label {
            display: none;
        }

        #s19-2:checked~.section-19 .section-19__btn--prev label[for="s19-1"] {
            display: flex;
        }

        #s19-3:checked~.section-19 .section-19__btn--prev .section-19__btn-disabled {
            display: none;
        }

        #s19-3:checked~.section-19 .section-19__btn--prev label {
            display: none;
        }

        #s19-3:checked~.section-19 .section-19__btn--prev label[for="s19-2"] {
            display: flex;
        }

        /* NEXT */
        #s19-1:checked~.section-19 .section-19__btn--next .section-19__btn-disabled {
            display: none;
        }

        #s19-1:checked~.section-19 .section-19__btn--next label {
            display: none;
        }

        #s19-1:checked~.section-19 .section-19__btn--next label[for="s19-2"] {
            display: flex;
        }

        #s19-2:checked~.section-19 .section-19__btn--next .section-19__btn-disabled {
            display: none;
        }

        #s19-2:checked~.section-19 .section-19__btn--next label {
            display: none;
        }

        #s19-2:checked~.section-19 .section-19__btn--next label[for="s19-3"] {
            display: flex;
        }

        #s19-3:checked~.section-19 .section-19__btn--next .section-19__btn-disabled {
            display: flex;
        }

        #s19-3:checked~.section-19 .section-19__btn--next label {
            display: none;
        }

        @media (min-width: 992px) {
            .section-19__nav {
                display: none;
            }
        }
    </style>

    <style>
        .section-21 {
            width: 100%;
            padding: 28px 18px;
            background: #F4F6F8;
            border-top: 1px solid #9999993b;
            border-radius: 8px;
            color: #3A3F44;
            overflow: hidden;
        }

        .section-21--soft {
            background: #F4F6F8;
        }

        .section-21__intro {
            display: grid;
            gap: 10px;
            margin-bottom: 22px;
            min-width: 0;
            text-align: left;
        }

        .section-21--soft .section-21__intro {
            text-align: center;
        }

        .section-21__title {
            color: #3A3F44;
            font-size: 1.58rem;
            line-height: 1.08;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .section-21__text {
            color: #59636E;
            font-size: 0.98rem;
            line-height: 1.55;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .section-21__layout {
            display: grid;
            gap: 18px;
            min-width: 0;
        }

        .section-21__image-wrap {
            align-self: stretch;
            background: #ffffff;
            border: 1px solid #BFD2EE;
            border-radius: 8px;
            min-width: 0;
            min-height: 260px;
            padding: 18px;
        }

        .section-21__image {
            width: 100%;
            height: 100%;
            min-height: 240px;
            object-fit: contain;
            display: block;
        }

        .section-21__cards {
            display: grid;
            gap: 12px;
            min-width: 0;
        }

        .section-21__card {
            background: #ffffff;
            border: 1px solid #D8DEE6;
            border-radius: 8px;
            color: #3A3F44;
            display: grid;
            gap: 8px;
            min-width: 0;
            padding: 16px;
            box-shadow: 0 12px 26px rgba(58, 63, 68, .08);
        }

        .section-21__card-icon {
            align-items: center;
            background: #0052CC;
            border: 1px solid #B87333;
            border-radius: 8px;
            color: #ffffff;
            display: flex;
            font-size: 0.78rem;
            font-weight: 800;
            height: 42px;
            justify-content: center;
            width: 54px;
        }

        .section-21__card-title {
            color: #3A3F44;
            font-size: 1rem;
            font-weight: 800;
            line-height: 1.25;
            overflow-wrap: anywhere;
        }

        .section-21__card-text {
            color: #59636E;
            font-size: 0.88rem;
            line-height: 1.42;
            margin: 0;
            overflow-wrap: anywhere;
        }

        @media (min-width: 576px) {
            .section-21 {
                padding: 34px 24px;
            }

            .section-21__cards {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (min-width: 768px) {
            .section-21__layout {
                grid-template-columns: minmax(0, 1.2fr) minmax(220px, 0.8fr);
                align-items: center;
            }
        }

        @media (min-width: 992px) {
            .section-21 {
                padding: 42px;
            }

            .section-21__title {
                font-size: 2.7rem;
            }
        }
    </style>

    <style>
        .section-22-container {
            padding: 28px 0;
        }

        .section-22 {
            width: 100%;
            padding: 24px 18px;
            background: #F7F9FC;
        }

        .section-22--reverse .section-22__item {
            direction: rtl;
        }

        .section-22--reverse .section-22__body {
            direction: ltr;
        }

        .section-22__list {
            display: grid;
            gap: 18px;
            margin: 0;
            padding: 0;
        }

        .section-22__item {
            align-items: center;
            display: grid;
            gap: 18px;
            min-width: 0;
        }

        .section-22__figure {
            background: #EEF3F8;
            border: 1px solid #D8DEE6;
            border-radius: 8px;
            margin: 0;
            min-width: 0;
            padding: 12px;
        }

        .section-22__image {
            width: 100%;
            height: auto;
            aspect-ratio: 4 / 3;
            object-fit: contain;
            display: block;
        }

        .section-22__caption {
            color: #59636E;
            font-size: 0.8rem;
            line-height: 1.35;
            margin-top: 8px;
            overflow-wrap: anywhere;
        }

        .section-22__body {
            display: grid;
            gap: 8px;
            min-width: 0;
        }

        .section-22__tag {
            color: #B87333;
            font-size: 0.78rem;
            font-weight: 800;
            letter-spacing: 0;
            text-transform: uppercase;
        }

        .section-22__title {
            color: #3A3F44;
            font-size: 1.55rem;
            line-height: 1.1;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .section-22__text {
            color: #59636E;
            font-size: 0.96rem;
            line-height: 1.55;
            margin: 0;
            overflow-wrap: anywhere;
        }

        @media (min-width: 576px) {
            .section-22 {
                padding: 30px 24px;
            }
        }

        @media (min-width: 768px) {
            .section-22__item {
                grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
            }

            .section-22__item--reverse {
                grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
            }

            .section-22__item--reverse .section-22__figure {
                order: 2;
            }

            .section-22__item--reverse .section-22__body {
                order: 1;
            }
        }

        @media (min-width: 992px) {
            .section-22 {
                padding: 42px;
            }

            .section-22__list {
                gap: 26px;
            }

            .section-22__title {
                font-size: 2.15rem;
            }
        }
    </style>

    <style>
        .section-23 {
            width: 100%;
            padding: 30px 18px;
            background: #F4F6F8;
            border-top: 1px solid #9999993b;
            border-radius: 8px;
        }

        .section-23--panel {
            background: #F7F9FC;
        }

        .section-23__intro {
            display: grid;
            gap: 10px;
            margin-bottom: 24px;
            text-align: center;
        }

        .section-23__title {
            color: #3A3F44;
            font-size: 1.58rem;
            line-height: 1.1;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .section-23__text {
            color: #59636E;
            font-size: 0.96rem;
            line-height: 1.55;
            margin: 0 auto;
            overflow-wrap: anywhere;
        }

        .section-23__map {
            display: grid;
            gap: 14px;
            min-width: 0;
        }

        .section-23__center {
            background: #ffffff;
            border: 1px solid #BFD2EE;
            border-radius: 8px;
            margin: 0;
            min-width: 0;
            padding: 14px;
            position: relative;
            box-shadow: 0 18px 44px rgba(0, 82, 204, .08);
        }

        .section-23__center-image {
            width: 100%;
            height: auto;
            aspect-ratio: 1 / 1;
            object-fit: contain;
            display: block;
        }

        .section-23__callouts {
            display: grid;
            gap: 12px;
            margin: 0;
            min-width: 0;
            padding: 0;
        }

        .section-23__callout {
            align-items: center;
            background: #ffffff;
            border: 1px solid #D8DEE6;
            border-radius: 8px;
            display: grid;
            gap: 12px;
            grid-template-columns: 72px minmax(0, 1fr);
            min-width: 0;
            padding: 10px;
            box-shadow: 0 10px 24px rgba(58, 63, 68, .08);
        }

        .section-23__callout-image {
            background: #F7F9FC;
            width: 72px;
            height: 72px;
            object-fit: contain;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #B87333;
            display: block;
        }

        .section-23__callout-body {
            display: grid;
            gap: 3px;
            min-width: 0;
        }

        .section-23__callout-title {
            color: #0052CC;
            font-size: 0.98rem;
            font-weight: 800;
            line-height: 1.2;
            overflow-wrap: anywhere;
        }

        .section-23__callout-text {
            color: #59636E;
            font-size: 0.84rem;
            line-height: 1.35;
            margin: 0;
            overflow-wrap: anywhere;
        }

        @media (min-width: 576px) {
            .section-23 {
                padding: 34px 24px;
            }

            .section-23__callouts {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 768px) {
            .section-23__map {
                grid-template-columns: minmax(260px, 0.9fr) minmax(0, 1.1fr);
                align-items: center;
            }
        }

        @media (min-width: 992px) {
            .section-23 {
                padding: 44px;
            }

            .section-23__title {
                font-size: 2.55rem;
            }

            .section-23__map {
                grid-template-columns: minmax(0, 0.82fr) minmax(300px, 1fr) minmax(0, 0.82fr);
                grid-template-rows: repeat(2, auto);
            }

            .section-23__center {
                grid-column: 2;
                grid-row: 1 / span 2;
                border-radius: 50%;
                padding: 24px;
            }

            .section-23__center::before {
                border: 2px dashed #B87333;
                border-radius: 50%;
                content: "";
                inset: 12px;
                position: absolute;
            }

            .section-23__center-image {
                position: relative;
                z-index: 1;
            }

            .section-23__callouts {
                display: contents;
            }

            .section-23__callout {
                align-self: center;
            }

            .section-23__callout:nth-child(1) {
                grid-column: 1;
                grid-row: 1;
            }

            .section-23__callout:nth-child(2) {
                grid-column: 3;
                grid-row: 1;
            }

            .section-23__callout:nth-child(3) {
                grid-column: 1;
                grid-row: 2;
            }

            .section-23__callout:nth-child(4) {
                grid-column: 3;
                grid-row: 2;
            }
        }
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="section-2-2" aria-label="Cabeçalho do produto">
            <div class="section-2-2__banner">
                <div class="section-2-2__banner-container">
                    <video class="section-2-2__banner-video"
                        poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/logotipo-philco-metalizado-banner-horizontal-preto-2220795-00.jpg"
                        preload="none" autoplay="" muted="" loop="" playsinline="" aria-hidden="true">
                        <source
                            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/philco/header-philco.mov">
                    </video>
                </div>

                <div class="section-2-2__badge" role="img" aria-label="Logo Philco">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/philco/logo-philco.png"
                        alt="Logo Philco" class="section-2-2__badge-img" loading="lazy">
                </div>
            </div>

            <article class="section-2-2__body">
                <small class="section-2-2__brand">── philco ──</small>
                <h2 class="section-2-2__title">
                    Liquidificador Philco PLQ1350 Turbo Glass Preto <strong>1200W, jarra de vidro e 12
                        velocidades</strong>
                </h2>
                <p class="section-2-2__subtitle">
                    Potência alta, Tecnologia Pro Maxx 6 e funções Ice, Pulsar e Autolimpeza para preparar sucos,
                    vitaminas, molhos, sopas cremosas e bebidas geladas com mais controle.
                </p>
            </article>
        </section>

        <section class="section-6" aria-label="Destaque do produto com texto">
            <picture>
                <source media="(max-width: 760px)"
                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-preto-banner-recortado-2220795-01-2.jpg"
                    width="780" height="400">
                <picture>
                    <source media="(max-width: 320px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-preto-banner-recortado-2220795-01-2.jpg?ims=411x">
                    <source media="(max-width: 375px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-preto-banner-recortado-2220795-01-2.jpg?ims=489x">
                    <source media="(max-width: 425px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-preto-banner-recortado-2220795-01-2.jpg?ims=561x">
                    <source media="(max-width: 768px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-preto-banner-recortado-2220795-01-2.jpg?ims=561x">
                    <source media="(max-width: 1024px)"
                        srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-preto-banner-geometrico-2220795-01-1.jpg?ims=1488x">
                    <img class="section-6__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-preto-banner-geometrico-2220795-01-1.jpg?ims=1488x"
                        alt="Liquidificador Philco PLQ1350 Turbo Glass em destaque com informações de potência e capacidade"
                        width="1600" height="650" fetchpriority="high" loading="lazy" decoding="async">
                </picture>
            </picture>
            <div class="section-6__content">
                <h2 class="section-6__title">Potência de 1200W para acelerar o preparo</h2>
                <p class="section-6__description">Mais força para triturar, misturar e chegar na textura certa.</p>
            </div>
        </section>

        <div class="section-15-container" id="section-15-container">
            <div class="section-15">
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        12 velocidades para ajustar
                        cada receita no ponto certo
                    </h2>
                    <p class="section-15__desc">
                        Controle a intensidade conforme o preparo: misturas leves, vitaminas encorpadas, molhos,
                        sopas cremosas e receitas que pedem mais rotação.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-painel-botoes-velocidade-preto-2220795-02.jpg?ims=357x">
                        <source media="(max-width: 375px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-painel-botoes-velocidade-preto-2220795-02.jpg?ims=440x">
                        <source media="(max-width: 425px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-painel-botoes-velocidade-preto-2220795-02.jpg?ims=515x">
                        <source media="(max-width: 768px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-painel-botoes-velocidade-preto-2220795-02.jpg?ims=481x">
                        <source media="(max-width: 1024px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-painel-botoes-velocidade-preto-2220795-02.jpg?ims=666x">
                        <img class="section-15__image"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-painel-botoes-velocidade-preto-2220795-02.jpg?ims=666x"
                            alt="Liquidificador Philco PLQ1350 Turbo Glass destacando controle de velocidades"
                            loading="lazy" decoding="async">
                    </picture>
                </div>
            </div>
        </div>

        <input class="section-19__radio" type="radio" name="slide-19" id="s19-1" checked="">
        <input class="section-19__radio" type="radio" name="slide-19" id="s19-2">
        <input class="section-19__radio" type="radio" name="slide-19" id="s19-3">
        <div class="section-19">
            <section class="section-19__wrap" aria-label="Carrossel de funções do liquidificador Philco PLQ1350">
                <div class="section-19__header">
                    <h3 class="section-19__title">Funções que simplificam a rotina na cozinha</h3>
                </div>

                <div class="section-19__track" role="list">
                    <article class="section-19__card" role="listitem">
                        <picture>
                            <source media="(max-width: 320px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/torta-pavlova-morangos-hortela-receita-liquidificador-philco-2220795-03-1.jpg?ims=462x">
                            <source media="(max-width: 375px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/torta-pavlova-morangos-hortela-receita-liquidificador-philco-2220795-03-1.jpg?ims=462x">
                            <source media="(max-width: 425px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/torta-pavlova-morangos-hortela-receita-liquidificador-philco-2220795-03-1.jpg?ims=462x">
                            <source media="(max-width: 768px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/torta-pavlova-morangos-hortela-receita-liquidificador-philco-2220795-03-1.jpg?ims=342x">
                            <source media="(max-width: 1024px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/torta-pavlova-morangos-hortela-receita-liquidificador-philco-2220795-03-1.jpg?ims=417x">
                            <img class="section-19__card-img"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/torta-pavlova-morangos-hortela-receita-liquidificador-philco-2220795-03-1.jpg?ims=417x"
                                alt="Liquidificador Philco PLQ1350 com referência visual à função pulsar" width="310"
                                height="220" loading="lazy" decoding="async">
                        </picture>
                        <div class="section-19__card-body">
                            <h4 class="section-19__card-title">Função Pulsar</h4>
                            <p class="section-19__card-desc">Ajuda a controlar o ponto de vitaminas, sopas cremosas,
                                molhos e misturas mais espessas sem perder o domínio do preparo.
                            </p>
                        </div>
                    </article>

                    <article class="section-19__card" role="listitem">
                        <picture>
                            <source media="(max-width: 320px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/panquecas-americanas-doces-framboesas-receita-liquidificador-philco-2220795-03-2.jpg?ims=393x">
                            <source media="(max-width: 375px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/panquecas-americanas-doces-framboesas-receita-liquidificador-philco-2220795-03-2.jpg?ims=393x">
                            <source media="(max-width: 425px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/panquecas-americanas-doces-framboesas-receita-liquidificador-philco-2220795-03-2.jpg?ims=393x">
                            <source media="(max-width: 768px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/panquecas-americanas-doces-framboesas-receita-liquidificador-philco-2220795-03-2.jpg?ims=292x">
                            <source media="(max-width: 1024px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/panquecas-americanas-doces-framboesas-receita-liquidificador-philco-2220795-03-2.jpg?ims=359x">
                            <img class="section-19__card-img"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/panquecas-americanas-doces-framboesas-receita-liquidificador-philco-2220795-03-2.jpg?ims=359x"
                                alt="Liquidificador Philco PLQ1350 com referência visual à função Ice" width="310"
                                height="220" loading="lazy" decoding="async">
                        </picture>
                        <div class="section-19__card-body">
                            <h4 class="section-19__card-title">Função Ice</h4>
                            <p class="section-19__card-desc">Tritura gelo com mais facilidade e rapidez para bebidas
                                geladas, sobremesas e preparos que precisam de mais força.</p>
                        </div>
                    </article>

                    <article class="section-19__card" role="listitem">
                        <picture>
                            <source media="(max-width: 320px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-vitamina-laranja-gelo-copos-receita-liquidificador-philco-2220795-03-3.jpg?ims=393x">
                            <source media="(max-width: 375px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-vitamina-laranja-gelo-copos-receita-liquidificador-philco-2220795-03-3.jpg?ims=393x">
                            <source media="(max-width: 425px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-vitamina-laranja-gelo-copos-receita-liquidificador-philco-2220795-03-3.jpg?ims=393x">
                            <source media="(max-width: 768px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-vitamina-laranja-gelo-copos-receita-liquidificador-philco-2220795-03-3.jpg?ims=291x">
                            <source media="(max-width: 1024px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-vitamina-laranja-gelo-copos-receita-liquidificador-philco-2220795-03-3.jpg?ims=356x">
                            <img class="section-19__card-img"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/suco-vitamina-laranja-gelo-copos-receita-liquidificador-philco-2220795-03-3.jpg?ims=356x"
                                alt="Liquidificador Philco PLQ1350 com referência visual à função autolimpeza"
                                width="310" height="220" loading="lazy" decoding="async">
                        </picture>
                        <div class="section-19__card-body">
                            <h4 class="section-19__card-title">Função Autolimpeza</h4>
                            <p class="section-19__card-desc">Facilita a limpeza após o uso e deixa a rotina mais
                                prática para quem prepara receitas todos os dias.</p>
                        </div>
                    </article>
                </div>

                <nav class="section-19__nav" aria-label="Navegação do carrossel">
                    <div class="section-19__btn-slot section-19__btn--prev">
                        <span class="section-19__btn-disabled" aria-hidden="true">←</span>
                        <label for="s19-1" aria-label="Slide anterior">←</label>
                        <label for="s19-2" aria-label="Slide anterior">←</label>
                    </div>

                    <div class="section-19__dots" role="tablist" aria-label="Slides">
                        <label class="section-19__dot" for="s19-1" role="tab" aria-label="Ir para slide 1"></label>
                        <label class="section-19__dot" for="s19-2" role="tab" aria-label="Ir para slide 2"></label>
                        <label class="section-19__dot" for="s19-3" role="tab" aria-label="Ir para slide 3"></label>
                    </div>

                    <div class="section-19__btn-slot section-19__btn--next">
                        <label for="s19-2" aria-label="Próximo slide">→</label>
                        <label for="s19-3" aria-label="Próximo slide">→</label>
                        <span class="section-19__btn-disabled" aria-hidden="true">→</span>
                    </div>
                </nav>
            </section>
        </div>

        <div class="section-21-container">
            <section class="section-21 section-21--soft" aria-labelledby="section-21-title">
                <div class="section-21__intro">
                    <h2 class="section-21__title" id="section-21-title">Jarra de vidro feita para uso intenso</h2>
                    <p class="section-21__text">
                        O copo de vidro não mancha, não pega cheiro e é mais difícil de riscar, mantendo a rotina mais
                        limpa e agradável por mais tempo.
                    </p>
                </div>
                <div class="section-21__layout">
                    <div class="section-21__cards" role="list" aria-label="Diferenciais da jarra de vidro">
                        <article class="section-21__card" role="listitem">
                            <span class="section-21__card-icon" aria-hidden="true">01</span>
                            <strong class="section-21__card-title">Capacidade total de 2,5L</strong>
                            <p class="section-21__card-text">Espaço para preparar sucos, vitaminas e sobremesas para
                                compartilhar.</p>
                        </article>
                        <article class="section-21__card" role="listitem">
                            <span class="section-21__card-icon" aria-hidden="true">02</span>
                            <strong class="section-21__card-title">Capacidade útil de 1,75L</strong>
                            <p class="section-21__card-text">Medida ideal para bater receitas sem ultrapassar o limite
                                recomendado.</p>
                        </article>
                        <article class="section-21__card" role="listitem">
                            <span class="section-21__card-icon" aria-hidden="true">03</span>
                            <strong class="section-21__card-title">Não pega cheiro</strong>
                            <p class="section-21__card-text">Mais cuidado entre receitas doces, salgadas, frutas e
                                ingredientes com aroma forte.</p>
                        </article>
                    </div>
                    <figure class="section-21__image-wrap">
                        <picture>
                            <source media="(max-width: 320px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-glass-1200w-preto-bancada-2220795-07.jpg?ims=321x">
                            <source media="(max-width: 375px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-glass-1200w-preto-bancada-2220795-07.jpg?ims=404x">
                            <source media="(max-width: 425px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-glass-1200w-preto-bancada-2220795-07.jpg?ims=479x">
                            <source media="(max-width: 768px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-glass-1200w-preto-bancada-2220795-07.jpg?ims=345x">
                            <source media="(max-width: 1024px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-glass-1200w-preto-bancada-2220795-07.jpg?ims=477x">
                            <img class="section-21__image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-turbo-glass-1200w-preto-bancada-2220795-07.jpg?ims=477x"
                                alt="Jarra de vidro do Liquidificador Philco PLQ1350 Turbo Glass" loading="lazy"
                                decoding="async">
                        </picture>
                    </figure>
                </div>
            </section>
        </div>

        <div class="section-15-container">
            <div class="section-15">
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        Tecnologia Pro Maxx 6:
                        trituração potente em 6 lâminas
                    </h2>
                    <p class="section-15__desc">
                        O conjunto de lâminas foi pensado para entregar alto poder de trituração em frutas, gelo,
                        cremes e ingredientes mais firmes.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-frutas-lifestyle-2220795-05.jpg?ims=357x">
                        <source media="(max-width: 375px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-frutas-lifestyle-2220795-05.jpg?ims=440x">
                        <source media="(max-width: 425px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-frutas-lifestyle-2220795-05.jpg?ims=515x">
                        <source media="(max-width: 768px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-frutas-lifestyle-2220795-05.jpg?ims=481x">
                        <source media="(max-width: 1024px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-frutas-lifestyle-2220795-05.jpg?ims=666x">
                        <img class="section-15__image"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-frutas-lifestyle-2220795-05.jpg?ims=666x"
                            alt="Lâminas da Tecnologia Pro Maxx 6 do Liquidificador Philco PLQ1350" loading="lazy"
                            decoding="async">
                    </picture>
                </div>
            </div>
        </div>

        <div class="section-23-container">
            <section class="section-23 section-23--panel" aria-labelledby="section-23-title">
                <div class="section-23__intro">
                    <h2 class="section-23__title" id="section-23-title">Um liquidificador para a rotina da família</h2>
                    <p class="section-23__text">
                        Potência, capacidade e funções reunidas para preparar desde bebidas rápidas até receitas mais
                        encorpadas.
                    </p>
                </div>
                <div class="section-23__map">
                    <figure class="section-23__center">
                        <picture>
                            <source media="(max-width: 320px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2220795_2220796_06.png?ims=333x">
                            <source media="(max-width: 375px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2220795_2220796_06.png?ims=416x">
                            <source media="(max-width: 425px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2220795_2220796_06.png?ims=491x">
                            <source media="(max-width: 768px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2220795_2220796_06.png?ims=410x">
                            <source media="(max-width: 1024px)"
                                srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2220795_2220796_06.png?ims=423x">
                            <img class="section-23__center-image"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/2220795_2220796_06.png?ims=423x"
                                alt="Liquidificador Philco PLQ1350 Turbo Glass em destaque central" loading="lazy"
                                decoding="async">
                        </picture>
                    </figure>
                    <div class="section-23__callouts" role="list" aria-label="Possibilidades de preparo">
                        <article class="section-23__callout" role="listitem">
                            <svg class="section-23__callout-image" viewBox="0 0 72 72" role="img"
                                aria-labelledby="section-23-icon-sucos" focusable="false">
                                <title id="section-23-icon-sucos">Ícone de copo para sucos e vitaminas</title>
                                <path d="M21 18h30l-4 36H25L21 18Z" fill="#ffffff" stroke="#0052CC" stroke-width="4"
                                    stroke-linejoin="round"></path>
                                <path d="M27 28h18" stroke="#B87333" stroke-width="4" stroke-linecap="round"></path>
                                <path d="M42 17l8-8" stroke="#0052CC" stroke-width="4" stroke-linecap="round"></path>
                                <path d="M30 43c5 0 9-4 9-9 0 5 4 9 9 9-5 0-9 4-9 9 0-5-4-9-9-9Z" fill="#B87333"
                                    opacity=".9"></path>
                            </svg>
                            <div class="section-23__callout-body">
                                <strong class="section-23__callout-title">Sucos e vitaminas</strong>
                                <p class="section-23__callout-text">Jarra ampla e 12 velocidades para misturas leves ou
                                    mais encorpadas.</p>
                            </div>
                        </article>
                        <article class="section-23__callout" role="listitem">
                            <svg class="section-23__callout-image" viewBox="0 0 72 72" role="img"
                                aria-labelledby="section-23-icon-molhos" focusable="false">
                                <title id="section-23-icon-molhos">Ícone de tigela para molhos e cremes</title>
                                <path d="M18 34h36c-2 13-10 20-18 20S20 47 18 34Z" fill="#ffffff" stroke="#0052CC"
                                    stroke-width="4" stroke-linejoin="round"></path>
                                <path d="M25 34c1-7 5-11 11-11s10 4 11 11" fill="none" stroke="#B87333" stroke-width="4"
                                    stroke-linecap="round"></path>
                                <path d="M45 19l10-10" stroke="#0052CC" stroke-width="4" stroke-linecap="round"></path>
                                <path d="M26 43h20" stroke="#B87333" stroke-width="4" stroke-linecap="round"></path>
                            </svg>
                            <div class="section-23__callout-body">
                                <strong class="section-23__callout-title">Molhos e cremes</strong>
                                <p class="section-23__callout-text">Função Pulsar ajuda a chegar no ponto sem passar da
                                    textura desejada.
                                </p>
                            </div>
                        </article>
                        <article class="section-23__callout" role="listitem">
                            <svg class="section-23__callout-image" viewBox="0 0 72 72" role="img"
                                aria-labelledby="section-23-icon-gelo" focusable="false">
                                <title id="section-23-icon-gelo">Ícone de gelo para bebidas geladas</title>
                                <path d="M18 18h22v22H18V18Z" fill="#ffffff" stroke="#0052CC" stroke-width="4"
                                    stroke-linejoin="round"></path>
                                <path d="M32 32h22v22H32V32Z" fill="#ffffff" stroke="#0052CC" stroke-width="4"
                                    stroke-linejoin="round"></path>
                                <path d="M22 46h8M26 42v8" stroke="#B87333" stroke-width="4" stroke-linecap="round">
                                </path>
                                <path d="M44 16v8M40 20h8" stroke="#B87333" stroke-width="4" stroke-linecap="round">
                                </path>
                            </svg>
                            <div class="section-23__callout-body">
                                <strong class="section-23__callout-title">Bebidas geladas</strong>
                                <p class="section-23__callout-text">Função Ice acelera a trituração do gelo para drinks,
                                    sucos e sobremesas.</p>
                            </div>
                        </article>
                        <article class="section-23__callout" role="listitem">
                            <svg class="section-23__callout-image" viewBox="0 0 72 72" role="img"
                                aria-labelledby="section-23-icon-organizacao" focusable="false">
                                <title id="section-23-icon-organizacao">Ícone de organização com porta-fio e check
                                </title>
                                <path d="M22 21h28v23H22V21Z" fill="#ffffff" stroke="#0052CC" stroke-width="4"
                                    stroke-linejoin="round"></path>
                                <path d="M28 44c0 7 16 7 16 0" fill="none" stroke="#0052CC" stroke-width="4"
                                    stroke-linecap="round"></path>
                                <path d="M27 33l7 7 13-15" fill="none" stroke="#B87333" stroke-width="4"
                                    stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M50 28h6v10h-6" fill="none" stroke="#B87333" stroke-width="4"
                                    stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <div class="section-23__callout-body">
                                <strong class="section-23__callout-title">Mais organização</strong>
                                <p class="section-23__callout-text">Porta-fio, base antiderrapante e autolimpeza deixam
                                    o
                                    pós-preparo mais simples.</p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </div>

        <div class="section-15-container">
            <div class="section-15 is-reverse">
                <div class="section-15__content">
                    <h2 class="section-15__title">
                        Detalhes pensados para usar,
                        encaixar e guardar melhor
                    </h2>
                    <p class="section-15__desc">
                        A base antiderrapante dá mais firmeza, o copo tem fácil encaixe e a sobretampa dosadora também
                        ajuda a liberar a base do copo quando for necessário.
                    </p>
                </div>
                <div class="section-15__image-wrapper">
                    <picture>
                        <source media="(max-width: 320px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-pecas-desmontadas-2220795-06.jpg?ims=357x">
                        <source media="(max-width: 375px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-pecas-desmontadas-2220795-06.jpg?ims=440x">
                        <source media="(max-width: 425px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-pecas-desmontadas-2220795-06.jpg?ims=515x">
                        <source media="(max-width: 768px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-pecas-desmontadas-2220795-06.jpg?ims=481x">
                        <source media="(max-width: 1024px)"
                            srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-pecas-desmontadas-2220795-06.jpg?ims=666x">
                        <img class="section-15__image"
                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/liquidificador-philco-plq1350-jarra-vidro-pecas-desmontadas-2220795-06.jpg?ims=666x"
                            alt="Liquidificador Philco PLQ1350 com base antiderrapante e encaixe do copo" loading="lazy"
                            decoding="async">
                    </picture>
                </div>
            </div>
        </div>

        <!-- Área de FAQ -->
        <section class="faq-section" aria-labelledby="faq-section-title">
            <div class="faq-section__header">
                <h3 class="faq-section__title" id="faq-section-title">Dúvidas rápidas sobre o Philco PLQ1350</h3>
                <p class="faq-section__subtitle">Especificações essenciais para comparar antes da compra.</p>
            </div>
            <ul class="faq-section__list">
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Qual é a potência do liquidificador?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O Philco PLQ1350 tem 1200W de potência para triturar,
                                misturar e preparar receitas com mais agilidade.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">A jarra é de qual material?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">A jarra é de vidro, material que não mancha, não pega cheiro
                                e é mais difícil de riscar.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Qual é a capacidade do copo?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">A capacidade total informada é de 2,5L. A ficha técnica
                                também informa capacidade total de 2,65L e útil de 1,75L para preparo.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Quais funções ele possui?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">Possui 12 velocidades, Função Pulsar, Função Ice e Função
                                Autolimpeza.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Quais são as dimensões do produto?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O produto mede 42 cm de altura, 23,5 cm de largura e 22,5 cm
                                de comprimento, com peso aproximado de 2,651 kg.</p>
                        </div>
                    </details>
                </li>
                <li class="faq-section__item">
                    <details class="faq-section__item">
                        <summary>
                            <h3 class="faq-section__q-text">Qual é a voltagem e a garantia?</h3>
                            <span class="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div class="faq-section__a-inner">
                            <p class="faq-section__a-text">O modelo está disponível em versões 110V ou 220V e possui
                                garantia de 1 ano ofertada pelo fabricante.</p>
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
