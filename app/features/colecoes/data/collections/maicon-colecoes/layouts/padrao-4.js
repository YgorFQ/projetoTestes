// @ts-nocheck
ColLib.registerCollectionLayout('maicon-colecoes',
{
  id: 'padrao-4',
  name: 'padrão 4',
  html: `<div class="lp-container">
    <style>
        * {

            margin: 0;
            padding: 0;
        }

        .pdp {
            display: flex;
            flex-direction: column;
        }

        .pdp * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
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
        }

        #faq-section__header {
            text-align: center;
            margin: 1rem 0;
        }

        #faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #333;
            margin: 0 0 12px;
            line-height: 98%;
        }

        #faq-section__subtitle {
            font-size: 1rem;
            color: #666;
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
            background: #fff;
            border: 1px solid #e5e5e5;
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
            background: #f9f9f9;
        }

        #faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #333;
            flex: 1;
        }

        #faq-section__q-text:hover {
            color: #ea5b0c;
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
            background: #888;
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
            border-top: 1px solid #e5e5e5;
        }

        #faq-section__a-text {
            font-size: 0.9rem;
            color: #555;
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
        }

        .video-header,
        .video-header * {
            box-sizing: border-box;
            margin: 0;
        }

        .video-header {
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

        .video-header__banner {
            width: 100%;
            height: var(--banner-height);
            position: relative;
            display: flex;
            justify-content: center;
        }

        .video-header__banner-video {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            pointer-events: none;
        }

        .video-header__badge {
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

        .video-header__badge-img {
            max-width: 90px;
            max-height: 90px;
            object-fit: contain;
        }

        .video-header__body {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: calc(var(--badge-size) / 2 + 1.1rem) 0.3rem .8rem;
            text-align: center;
        }

        .video-header__brand {
            color: #ff9900;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }

        .video-header__title {
            color: #000;
            font-size: clamp(1.4rem, 4vw, 2.4rem);
            line-height: clamp(1.6rem, 4vw, 3.1rem);
            font-weight: 600;
            max-width: 50rem;
            text-wrap: pretty;
        }

        .video-header__subtitle {
            color: #8a8a8a;
            font-size: clamp(1rem, 2vw, 1.2rem);
            line-height: 120%;
            margin-top: 1rem;
            max-width: 52rem;
            text-wrap: pretty;
        }

        @media (prefers-contrast: more) {
            .video-header__subtitle {
                color: #000;
            }

            .video-header__brand {
                color: #3a2301;
            }
        }

        @media (max-width: 768px) {
            .video-header {
                --banner-height: 180px;
            }
        }

        @media (max-width: 470px) {
            .video-header__subtitle {
                text-align: justify;
                font-size: clamp(0.9rem, 2vw, 1.5rem);
                font-weight: 550;
            }
        }
    </style>

    <style>
        /* Estilos do carrossel controlado somente por HTML e CSS. */

        .ll-carousel {
            --ll-carousel-brand: #ff9900;
            --ll-carousel-ink: #14202b;
            --ll-carousel-muted: #586675;
            --ll-carousel-soft: #f4f7f9;
            --ll-carousel-panel: #ffffff;
            --ll-carousel-line: #d9e2ea;
            --ll-carousel-section-bg: var(--ll-carousel-soft);
            --ll-carousel-dot-hover: #f0f3f5;
            --ll-carousel-dot-active: #e7ecef;
            --ll-carousel-dot-active-border: #c8d2da;
            --ll-carousel-dot-icon-bg: #f0ede8;
            --ll-carousel-dot-icon-color: var(--ll-carousel-ink);
            --ll-carousel-dot-icon-active-bg: var(--ll-carousel-brand);
            --ll-carousel-dot-icon-active-color: #ffffff;
            --ll-carousel-indicator-color: rgba(255, 255, 255, 0.5);
            --ll-carousel-indicator-active-color: #ffffff;
            --ll-carousel-shadow: 0 1.5rem 3rem rgba(13, 35, 51, 0.12);
            background: var(--ll-carousel-section-bg);
            color: var(--ll-carousel-ink);
            overflow: hidden;
        }

        .ll-carousel__container {
            box-sizing: border-box;
            container-name: ll-carousel-container;
            container-type: inline-size;
            margin-inline: auto;
            padding: 1rem;
            width: 100%;
        }

        .ll-carousel__control {
            display: none;
        }

        .ll-carousel__intro {
            display: grid;
            gap: 1rem;
            justify-items: center;
            margin-block-end: 1.5rem;
            text-align: center;
            display: none;
        }

        .ll-carousel--hide-intro .ll-carousel__intro {
            display: none;
        }

        .ll-carousel__eyebrow,
        .ll-carousel__title,
        .ll-carousel__lead,
        .ll-carousel__dot-number,
        .ll-carousel__dot-text,
        .ll-carousel__layout-eyebrow,
        .ll-carousel__layout-title,
        .ll-carousel__layout-text {
            letter-spacing: 0;
            overflow-wrap: anywhere;
        }

        .ll-carousel__eyebrow {
            color: var(--ll-carousel-brand);
            font-size: clamp(0.75rem, 0.72rem + 0.16vw, 0.875rem);
            font-weight: 700;
            line-height: 1.4;
            margin: 0;
            text-transform: uppercase;
        }

        .ll-carousel__title {
            font-size: clamp(1.75rem, 1.34rem + 1.76vw, 3rem);
            line-height: 1.08;
            margin: 0;
        }

        .ll-carousel__lead {
            color: var(--ll-carousel-muted);
            font-size: clamp(0.9375rem, 0.9rem + 0.16vw, 1.0625rem);
            line-height: 1.6;
            margin: 0;
            max-width: 54rem;
        }

        .ll-carousel__viewport {
            aspect-ratio: 16 / 10;
            border: 1px solid var(--ll-carousel-line);
            border-radius: 1rem;
            box-shadow: var(--ll-carousel-shadow);
            box-sizing: border-box;
            isolation: isolate;
            margin-inline: auto;
            max-width: 100%;
            overflow: hidden;
            position: relative;
            width: min(100%, 1280px);
        }

        .ll-carousel__track {
            display: grid;
            height: 100%;
            max-width: 100%;
            overflow: hidden;
            position: relative;
            width: 100%;
        }

        .ll-carousel__panel {
            background: var(--ll-carousel-panel);
            box-sizing: border-box;
            grid-area: 1 / 1;
            height: 100%;
            inset: 0;
            max-width: 100%;
            min-width: 0;
            opacity: 0;
            overflow: hidden;
            pointer-events: none;
            position: absolute;
            transform: translateX(100%);
            transition: transform 0.8s ease, opacity 0.4s ease;
            width: 100%;
            z-index: 1;
        }

        .ll-carousel__layout {
            box-sizing: border-box;
            height: 100%;
            max-height: 100%;
            overflow: hidden;
            width: 100%;
        }

        .ll-carousel__layout--impact {
            --ll-carousel-impact-bg: #f16425;
            --ll-carousel-impact-text: #fff7ef;
            --ll-carousel-impact-muted: rgba(255, 247, 239, 0.84);
            align-content: center;
            align-items: center;
            background: var(--ll-carousel-impact-bg);
            background-image: var(--ll-carousel-impact-gradient, none);
            color: var(--ll-carousel-impact-text);
            display: grid;
            gap: clamp(1.5rem, 3vw, 3.5rem);
            grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
            grid-template-rows: minmax(0, 1fr);
            min-height: 0;
            padding: clamp(1.5rem, 3.4vw, 3.5rem);
        }

        .ll-carousel__layout--impact>* {
            min-height: 0;
            min-width: 0;
        }

        .ll-carousel__layout-copy {
            align-self: center;
            display: grid;
            gap: clamp(0.7rem, 1vw, 1.05rem);
            justify-self: start;
            max-height: 100%;
            max-width: min(43ch, 100%);
            min-width: 0;
        }

        .ll-carousel__layout-eyebrow {
            font-size: clamp(0.75rem, 0.7rem + 0.25vw, 0.95rem);
            font-weight: 800;
            margin: 0;
            text-transform: uppercase;
        }

        .ll-carousel__layout-title {
            font-size: clamp(2rem, 3.25vw, 4rem);
            font-weight: 800;
            line-height: 1.02;
            margin: 0;
            max-width: 100%;
            overflow-wrap: normal;
            text-wrap: balance;
            word-break: normal;
        }

        .ll-carousel__layout-text {
            color: var(--ll-carousel-impact-muted);
            font-size: clamp(0.95rem, 1vw, 1.12rem);
            line-height: 1.45;
            margin: 0;
            max-width: 100%;
            overflow-wrap: normal;
            word-break: normal;
        }

        .ll-carousel__media-card {
            aspect-ratio: auto;
            border-radius: 1.25rem;
            box-shadow: 0 1.5rem 3rem rgba(20, 32, 43, 0.22);
            height: 100%;
            margin-block: auto;
            max-height: 82%;
            max-width: min(100%, 38rem);
            overflow: hidden;
            place-self: center end;
            position: relative;
            width: 100%;
        }

        .ll-carousel__layout--impact-reverse {
            grid-template-columns: minmax(0, 1.14fr) minmax(0, 0.86fr);
        }

        .ll-carousel__layout--impact-reverse .ll-carousel__layout-copy {
            grid-column: 2;
            grid-row: 1;
            justify-self: end;
        }

        .ll-carousel__layout--impact-reverse .ll-carousel__media-card {
            grid-column: 1;
            grid-row: 1;
            place-self: center start;
        }

        .ll-carousel__image,
        .ll-carousel__picture,
        .ll-carousel__video {
            display: block;
            height: 100%;
            width: 100%;
        }

        .ll-carousel__image,
        .ll-carousel__video {
            object-fit: cover;
            object-position: center;
        }

        .ll-carousel__layout--media {
            background: var(--ll-carousel-media-bg, #101217);
            padding: 0;
        }

        .ll-carousel__figure {
            height: 100%;
            margin: 0;
            overflow: hidden;
            position: relative;
            width: 100%;
        }

        .ll-carousel__figure .ll-carousel__image,
        .ll-carousel__figure .ll-carousel__video {
            aspect-ratio: 16 / 10;
            object-fit: cover;
            object-position: center;
        }

        .ll-carousel__caption {
            align-items: flex-start;
            background: var(--ll-carousel-caption-bg, rgba(0, 0, 0, 0.48));
            bottom: var(--ll-carousel-caption-bottom, auto);
            border: 1px solid rgba(255, 255, 255, 0.22);
            border-radius: 1.25rem;
            box-shadow: 0 1.25rem 3rem rgba(0, 0, 0, 0.28);
            color: var(--ll-carousel-caption-text, #fff);
            display: grid;
            gap: 0.65rem;
            left: var(--ll-carousel-caption-left, clamp(1.25rem, 5vw, 4.75rem));
            max-width: min(42%, 34rem);
            padding: clamp(1rem, 2.5vw, 2rem);
            position: absolute;
            right: var(--ll-carousel-caption-right, auto);
            top: var(--ll-carousel-caption-top, 50%);
            transform: translate(var(--ll-carousel-caption-translate-x, 0), var(--ll-carousel-caption-translate-y, -50%));
            z-index: 5;
        }

        .ll-carousel__caption h3 {
            font-size: clamp(1.35rem, 2.4vw, 3rem);
            line-height: 1.05;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .ll-carousel__caption p {
            font-size: clamp(0.85rem, 1.15vw, 1.15rem);
            line-height: 1.45;
            margin: 0;
            overflow-wrap: anywhere;
        }

        .ll-carousel__nav {
            display: grid;
            gap: 0.5rem;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            margin: 0.75rem auto 0;
            max-width: 1280px;
            width: min(100%, 1280px);
        }

        .ll-carousel__dot {
            align-items: center;
            background: var(--ll-carousel-panel);
            border: 1px solid var(--ll-carousel-line);
            border-radius: 0.75rem;
            box-sizing: border-box;
            color: var(--ll-carousel-ink);
            cursor: pointer;
            display: flex;
            gap: 0.5rem;
            justify-content: space-between;
            min-height: 3.9rem;
            padding: 0.75rem 1rem;
            transition: background 0.4s ease, border-color 0.4s ease, color 0.4s ease, transform 0.4s ease;
        }

        .ll-carousel__dot:hover {
            background: var(--ll-carousel-dot-hover);
            border-color: var(--ll-carousel-dot-active-border);
            transform: translateY(-0.25rem);
        }

        .ll-carousel__dot-copy {
            display: flex;
            flex-direction: column;
            gap: 0.15rem;
            min-width: 0;
        }

        .ll-carousel__dot-number {
            color: var(--ll-carousel-brand);
            font-size: clamp(0.75rem, 0.72rem + 0.16vw, 0.875rem);
            font-weight: 700;
            line-height: 1;
        }

        .ll-carousel__dot-text {
            font-size: clamp(0.875rem, 0.84rem + 0.16vw, 1rem);
            font-weight: 700;
            line-height: 1.2;
        }

        .ll-carousel__dot-icon {
            align-items: center;
            background: var(--ll-carousel-dot-icon-bg);
            border-radius: 50%;
            color: var(--ll-carousel-dot-icon-color);
            display: flex;
            flex: 0 0 auto;
            height: 42px;
            justify-content: center;
            transition: background 0.25s ease, color 0.25s ease;
            width: 42px;
        }

        .ll-carousel__dot-icon svg {
            display: block;
            height: 22px;
            width: 22px;
        }

        .ll-carousel__dot-icon-img {
            display: block;
            height: 70%;
            object-fit: contain;
            width: 70%;
        }

        .ll-carousel__side-hint {
            align-items: center;
            background: transparent;
            border: 0;
            color: transparent;
            cursor: pointer;
            display: none;
            font-size: 0;
            height: 100%;
            justify-content: center;
            line-height: 1;
            opacity: 1;
            pointer-events: auto;
            position: absolute;
            top: 0;
            transform: none;
            width: min(18%, 9rem);
            z-index: 25;
        }

        .ll-carousel__side-hint--prev {
            left: 0;
        }

        .ll-carousel__side-hint--next {
            right: 0;
        }

        .ll-carousel__control--1:checked~.ll-carousel__viewport .ll-carousel__panel--1,
        .ll-carousel__control--2:checked~.ll-carousel__viewport .ll-carousel__panel--2,
        .ll-carousel__control--3:checked~.ll-carousel__viewport .ll-carousel__panel--3,
        .ll-carousel__control--4:checked~.ll-carousel__viewport .ll-carousel__panel--4 {
            opacity: 1;
            pointer-events: auto;
            transform: translateX(0);
            z-index: 2;
        }

        .ll-carousel__control--1:checked~.ll-carousel__viewport .ll-carousel__side-hint--1,
        .ll-carousel__control--2:checked~.ll-carousel__viewport .ll-carousel__side-hint--2,
        .ll-carousel__control--3:checked~.ll-carousel__viewport .ll-carousel__side-hint--3,
        .ll-carousel__control--4:checked~.ll-carousel__viewport .ll-carousel__side-hint--4 {
            display: flex;
        }

        .ll-carousel__control--2:checked~.ll-carousel__viewport .ll-carousel__panel--1,
        .ll-carousel__control--3:checked~.ll-carousel__viewport .ll-carousel__panel--1,
        .ll-carousel__control--3:checked~.ll-carousel__viewport .ll-carousel__panel--2,
        .ll-carousel__control--4:checked~.ll-carousel__viewport .ll-carousel__panel--1,
        .ll-carousel__control--4:checked~.ll-carousel__viewport .ll-carousel__panel--2,
        .ll-carousel__control--4:checked~.ll-carousel__viewport .ll-carousel__panel--3 {
            transform: translateX(-100%);
        }

        .ll-carousel__control--1:checked~.ll-carousel__nav .ll-carousel__dot--1,
        .ll-carousel__control--2:checked~.ll-carousel__nav .ll-carousel__dot--2,
        .ll-carousel__control--3:checked~.ll-carousel__nav .ll-carousel__dot--3,
        .ll-carousel__control--4:checked~.ll-carousel__nav .ll-carousel__dot--4 {
            background: var(--ll-carousel-dot-active);
            border-color: var(--ll-carousel-dot-active-border);
            color: var(--ll-carousel-ink);
        }

        .ll-carousel__control--1:checked~.ll-carousel__nav .ll-carousel__dot--1 .ll-carousel__dot-number,
        .ll-carousel__control--2:checked~.ll-carousel__nav .ll-carousel__dot--2 .ll-carousel__dot-number,
        .ll-carousel__control--3:checked~.ll-carousel__nav .ll-carousel__dot--3 .ll-carousel__dot-number,
        .ll-carousel__control--4:checked~.ll-carousel__nav .ll-carousel__dot--4 .ll-carousel__dot-number,
        .ll-carousel__control--1:checked~.ll-carousel__nav .ll-carousel__dot--1 .ll-carousel__dot-text,
        .ll-carousel__control--2:checked~.ll-carousel__nav .ll-carousel__dot--2 .ll-carousel__dot-text,
        .ll-carousel__control--3:checked~.ll-carousel__nav .ll-carousel__dot--3 .ll-carousel__dot-text,
        .ll-carousel__control--4:checked~.ll-carousel__nav .ll-carousel__dot--4 .ll-carousel__dot-text {
            color: var(--ll-carousel-brand);
        }

        .ll-carousel__control--1:checked~.ll-carousel__nav .ll-carousel__dot--1 .ll-carousel__dot-icon,
        .ll-carousel__control--2:checked~.ll-carousel__nav .ll-carousel__dot--2 .ll-carousel__dot-icon,
        .ll-carousel__control--3:checked~.ll-carousel__nav .ll-carousel__dot--3 .ll-carousel__dot-icon,
        .ll-carousel__control--4:checked~.ll-carousel__nav .ll-carousel__dot--4 .ll-carousel__dot-icon {
            background: var(--ll-carousel-dot-icon-active-bg);
            color: var(--ll-carousel-dot-icon-active-color);
        }

        .ll-carousel__indicators {
            bottom: 1rem;
            display: flex;
            gap: 7px;
            left: 50%;
            pointer-events: none;
            position: absolute;
            transform: translateX(-50%);
            z-index: 20;
        }

        .ll-carousel--hide-indicators .ll-carousel__indicators {
            display: none;
        }

        .ll-carousel__indicator {
            background: var(--ll-carousel-indicator-color);
            border-radius: 50%;
            display: block;
            height: 8px;
            transition: background 0.3s ease, width 0.3s ease;
            width: 8px;
        }

        .ll-carousel__control--1:checked~.ll-carousel__viewport .ll-carousel__indicator--1,
        .ll-carousel__control--2:checked~.ll-carousel__viewport .ll-carousel__indicator--2,
        .ll-carousel__control--3:checked~.ll-carousel__viewport .ll-carousel__indicator--3,
        .ll-carousel__control--4:checked~.ll-carousel__viewport .ll-carousel__indicator--4 {
            background: var(--ll-carousel-indicator-active-color);
            border-radius: 4px;
            width: 20px;
        }

        @media (min-width: 761px) and (max-width: 1180px) {
            .ll-carousel__layout--impact {
                gap: clamp(1.25rem, 2.6vw, 2.75rem);
                padding: clamp(1.25rem, 2.8vw, 2.5rem);
            }

            .ll-carousel__layout-copy {
                max-width: min(32ch, 100%);
                min-width: 0;
                position: relative;
                z-index: 3;
            }

            .ll-carousel__layout-title {
                font-size: clamp(1.35rem, 2.45vw, 2.35rem);
                line-height: 1.06;
                text-wrap: balance;
            }

            .ll-carousel__layout-text {
                font-size: clamp(0.76rem, 0.9vw, 0.95rem);
                line-height: 1.38;
                max-width: min(32ch, 100%);
            }
        }

        @container ll-carousel-container (min-width: 621px) and (max-width: 980px) {
            .ll-carousel__layout--impact {
                gap: clamp(1.25rem, 3cqw, 2.75rem);
                padding: clamp(1.25rem, 2.8cqw, 2.5rem);
            }

            .ll-carousel__layout-copy {
                max-width: min(28ch, 100%);
                min-width: 0;
                position: relative;
                z-index: 3;
            }

            .ll-carousel__layout-title {
                font-size: clamp(1.25rem, 2.9cqw, 2.15rem);
                line-height: 1.06;
                text-wrap: balance;
            }

            .ll-carousel__layout-text {
                font-size: clamp(0.74rem, 1.15cqw, 0.9rem);
                line-height: 1.38;
                max-width: min(28ch, 100%);
            }
        }

        @media (max-width: 760px) {
            .ll-carousel__container {
                padding: 1rem 0.75rem;
            }

            .ll-carousel__intro {
                gap: 0.65rem;
                margin-block-end: 1rem;
                display: none;
            }

            .ll-carousel__title {
                font-size: clamp(1.45rem, 7vw, 2rem);
            }

            .ll-carousel__lead {
                font-size: 0.9rem;
                line-height: 1.45;
            }

            .ll-carousel__viewport {
                aspect-ratio: auto;
                border-radius: 0.95rem;
                height: clamp(22rem, 105vw, 26rem);
                min-height: 22rem;
            }

            .ll-carousel__track {
                height: 100%;
                min-height: 0;
            }

            .ll-carousel__control--1:checked~.ll-carousel__viewport .ll-carousel__panel--1,
            .ll-carousel__control--2:checked~.ll-carousel__viewport .ll-carousel__panel--2,
            .ll-carousel__control--3:checked~.ll-carousel__viewport .ll-carousel__panel--3,
            .ll-carousel__control--4:checked~.ll-carousel__viewport .ll-carousel__panel--4 {
                height: 100%;
                inset: 0;
                min-height: 0;
                overflow: hidden;
                position: absolute;
            }

            .ll-carousel__layout {
                height: 100%;
                max-height: 100%;
                min-height: 0;
                overflow: hidden;
            }

            .ll-carousel__layout--impact {
                align-content: start;
                gap: 0.9rem;
                grid-template-columns: minmax(0, 1fr);
                grid-template-rows: auto minmax(0, 1fr);
                padding: 1rem;
            }

            .ll-carousel__layout--impact .ll-carousel__layout-copy {
                grid-column: 1;
                grid-row: 1;
                justify-self: stretch;
                max-height: none;
                max-width: none;
            }

            .ll-carousel__layout--impact .ll-carousel__media-card {
                grid-column: 1;
                grid-row: 2;
                place-self: center;
            }

            .ll-carousel__layout--impact-reverse .ll-carousel__layout-copy {
                grid-row: 2;
            }

            .ll-carousel__layout--impact-reverse .ll-carousel__media-card {
                grid-row: 1;
            }

            .ll-carousel__layout--impact-reverse {
                grid-template-rows: minmax(0, 1fr) auto;
            }

            .ll-carousel__layout-title {
                font-size: clamp(1.3rem, 6vw, 1.85rem);
                line-height: 1.04;
            }

            .ll-carousel__layout-text {
                font-size: 0.8rem;
                line-height: 1.32;
            }

            .ll-carousel__media-card {
                aspect-ratio: auto;
                border-radius: 0.8rem;
                height: 100%;
                min-height: 0;
                max-height: 100%;
                max-width: 100%;
            }

            .ll-carousel__layout--media {
                background: var(--ll-carousel-media-bg, #0d2333);
                height: 100%;
                min-height: 0;
                overflow: hidden;
                padding: 0.65rem;
            }

            .ll-carousel__figure {
                display: grid;
                gap: 0.55rem;
                grid-template-rows: minmax(0, 1fr) auto;
                height: 100%;
                min-height: 0;
                overflow: hidden;
            }

            .ll-carousel__figure .ll-carousel__picture,
            .ll-carousel__figure>.ll-carousel__video {
                aspect-ratio: 16 / 9;
                background: #101821;
                border-radius: 0.75rem;
                display: block;
                height: 100%;
                max-height: 100%;
                min-height: 0;
                overflow: hidden;
            }

            .ll-carousel__figure .ll-carousel__image,
            .ll-carousel__figure .ll-carousel__video {
                aspect-ratio: auto;
                height: 100%;
                object-fit: cover;
                object-position: center;
                width: 100%;
            }

            .ll-carousel__caption {
                background: var(--ll-carousel-caption-bg, rgba(0, 0, 0, 0.62));
                border-radius: 0.85rem;
                bottom: auto;
                left: auto;
                max-width: none;
                padding: 0.72rem;
                position: static;
                right: auto;
                top: auto;
                transform: none;
            }

            .ll-carousel__caption h3 {
                font-size: clamp(1.05rem, 5vw, 1.45rem);
            }

            .ll-carousel__caption p {
                font-size: 0.76rem;
                line-height: 1.3;
            }

            .ll-carousel__nav {
                gap: 0.35rem;
                margin-block-start: 0.65rem;
            }

            .ll-carousel__dot {
                border-radius: 0.55rem;
                gap: 0.45rem;
                justify-content: space-between;
                min-height: 3rem;
                padding: 0.55rem 0.42rem;
                text-align: center;
            }

            .ll-carousel__dot:hover {
                transform: none;
            }

            .ll-carousel__dot-number {
                display: none;
            }

            .ll-carousel__dot-text {
                font-size: 0.78rem;
                line-height: 1.05;
            }

            .ll-carousel__dot-icon {
                height: 36px;
                width: 36px;
            }

            .ll-carousel__dot-icon svg {
                height: 18px;
                width: 18px;
            }

            .ll-carousel__side-hint {
                width: 28%;
            }

            .ll-carousel__indicators {
                display: none;
            }
        }

        @container ll-carousel-container (max-width: 620px) {
            .ll-carousel__viewport {
                aspect-ratio: auto;
                border-radius: 0.95rem;
                height: clamp(22rem, 105cqw, 26rem);
                min-height: 22rem;
            }

            .ll-carousel__track {
                height: 100%;
                min-height: 0;
            }

            .ll-carousel__control--1:checked~.ll-carousel__viewport .ll-carousel__panel--1,
            .ll-carousel__control--2:checked~.ll-carousel__viewport .ll-carousel__panel--2,
            .ll-carousel__control--3:checked~.ll-carousel__viewport .ll-carousel__panel--3,
            .ll-carousel__control--4:checked~.ll-carousel__viewport .ll-carousel__panel--4 {
                height: 100%;
                inset: 0;
                min-height: 0;
                overflow: hidden;
                position: absolute;
            }

            .ll-carousel__layout {
                height: 100%;
                max-height: 100%;
                min-height: 0;
                overflow: hidden;
            }

            .ll-carousel__layout--impact {
                align-content: start;
                gap: 0.9rem;
                grid-template-columns: minmax(0, 1fr);
                grid-template-rows: auto minmax(0, 1fr);
                padding: 1rem;
            }

            .ll-carousel__layout--impact .ll-carousel__layout-copy {
                grid-column: 1;
                grid-row: 1;
                justify-self: stretch;
                max-height: none;
                max-width: none;
            }

            .ll-carousel__layout--impact .ll-carousel__media-card {
                grid-column: 1;
                grid-row: 2;
                place-self: center;
            }

            .ll-carousel__layout--impact-reverse .ll-carousel__layout-copy {
                grid-row: 2;
            }

            .ll-carousel__layout--impact-reverse .ll-carousel__media-card {
                grid-row: 1;
            }

            .ll-carousel__layout--impact-reverse {
                grid-template-rows: minmax(0, 1fr) auto;
            }

            .ll-carousel__layout-title {
                font-size: clamp(1.3rem, 7.5cqw, 1.85rem);
            }

            .ll-carousel__layout-text {
                font-size: 0.8rem;
                line-height: 1.32;
            }

            .ll-carousel__media-card {
                aspect-ratio: auto;
                border-radius: 0.8rem;
                height: 100%;
                min-height: 0;
                max-height: 100%;
                max-width: 100%;
            }

            .ll-carousel__layout--media {
                background: var(--ll-carousel-media-bg, #0d2333);
                height: 100%;
                min-height: 0;
                overflow: hidden;
                padding: 0.65rem;
            }

            .ll-carousel__figure {
                display: grid;
                gap: 0.55rem;
                grid-template-rows: minmax(0, 1fr) auto;
                height: 100%;
                min-height: 0;
                overflow: hidden;
            }

            .ll-carousel__figure .ll-carousel__picture,
            .ll-carousel__figure>.ll-carousel__video {
                aspect-ratio: 16 / 9;
                background: #101821;
                border-radius: 0.75rem;
                display: block;
                height: 100%;
                max-height: 100%;
                min-height: 0;
                overflow: hidden;
            }

            .ll-carousel__figure .ll-carousel__image,
            .ll-carousel__figure .ll-carousel__video {
                aspect-ratio: auto;
                height: 100%;
                object-fit: cover;
                object-position: center;
                width: 100%;
            }

            .ll-carousel__caption {
                background: var(--ll-carousel-caption-bg, rgba(0, 0, 0, 0.62));
                border-radius: 0.85rem;
                bottom: auto;
                left: auto;
                max-width: none;
                padding: 0.72rem;
                position: static;
                right: auto;
                top: auto;
                transform: none;
            }

            .ll-carousel__caption h3 {
                font-size: clamp(1.05rem, 5.5cqw, 1.45rem);
            }

            .ll-carousel__caption p {
                font-size: 0.76rem;
                line-height: 1.3;
            }

            .ll-carousel__nav {
                gap: 0.35rem;
                margin-block-start: 0.65rem;
            }

            .ll-carousel__dot {
                border-radius: 0.55rem;
                gap: 0;
                justify-items: center;
                min-height: 3rem;
                padding: 0.55rem 0.42rem;
                text-align: center;
            }

            .ll-carousel__dot:hover {
                transform: none;
            }

            .ll-carousel__dot-number {
                display: none;
            }

            .ll-carousel__dot-text {
                font-size: 0.78rem;
                line-height: 1.05;
            }

            .ll-carousel__indicators {
                display: none;
            }
        }

        .ll-carousel {
            --ll-carousel-brand: #ee6911;
            --ll-carousel-soft: #f3f6fb;
            --ll-carousel-section-bg: linear-gradient(180deg, #ffffff, #fff0f6);
            --ll-carousel-dot-hover: #fff9f2;
            --ll-carousel-dot-active: #fff4e0;
            --ll-carousel-dot-active-border: #ee6911;
            --ll-carousel-dot-icon-bg: #f0ede8;
            --ll-carousel-dot-icon-active-bg: #ee6911;
            --ll-carousel-dot-icon-active-color: #ffffff;
            --ll-carousel-indicator-color: rgba(255, 255, 255, 0.5);
            --ll-carousel-indicator-active-color: #ffffff;
        }
    </style>

    <style>
        /* Refinamento visual: preserva as seções e o funcionamento 100% em CSS. */
        .pdp {
            --biona-orange: #f47a16;
            --ink: #3f2424;
            --wine: #6f2731;
            --terracotta: #d8795f;
            --blush: #f7d4ce;
            --blush-light: #fff7f4;
            --ivory: #fffdf9;
            --line: #ead8d1;
            --muted: #756b67;
            background: #ffffff;
            color: var(--ink);
            line-height: 1.5;
            overflow: hidden;
        }

        .pdp h2,

        .product-header {
            --badge-size: 7.5rem;
            --banner-height: clamp(190px, 18vw, 260px);
            color: var(--ink);
        }

        .product-header__banner::after {
            background: linear-gradient(180deg, transparent 72%, rgba(63, 36, 36, 0.08));
            content: "";
            inset: 0;
            pointer-events: none;
            position: absolute;
        }

        .product-header__banner-img {
            object-position: center 52%;
        }

        .product-header__badge {
            background: var(--biona-orange);
            border: 5px solid #f47a16;
            box-shadow: 0 14px 30px rgba(104, 49, 35, 0.18);
        }

        .product-header__badge-img {
            max-height: 82px;
            max-width: 82px;
        }

        .product-header__body {
            max-width: 960px;
            padding: calc(var(--badge-size) / 2 + 1.35rem) 24px clamp(1.3rem, 1vw, -0.5rem);
        }

        .product-header__brand {
            color: var(--biona-orange);
            font-size: 0.72rem;
            letter-spacing: 0.16em;
            margin-bottom: 0.6rem;
        }

        .product-header__title {
            color: var(--wine);
            font-size: clamp(1.9rem, 3.2vw, 3.15rem);
            font-weight: 500;
            line-height: 1.12;
            max-width: 780px;
        }

        .product-header__subtitle {
            color: var(--muted);
            font-size: clamp(0.96rem, 1.35vw, 1.12rem);
            line-height: 1.55;
            margin-top: 0.95rem;
            max-width: 740px;
        }

        .ll-carousel {
            --ll-carousel-brand: var(--biona-orange);
            --ll-carousel-ink: var(--ink);
            --ll-carousel-muted: var(--muted);
            --ll-carousel-line: var(--line);
            --ll-carousel-section-bg: #ffffff;
            --ll-carousel-dot-hover: #fff9f5;
            --ll-carousel-dot-active: #fff2e8;
            --ll-carousel-dot-active-border: var(--biona-orange);
            --ll-carousel-dot-icon-bg: #f4efeb;
            --ll-carousel-dot-icon-color: var(--wine);
            --ll-carousel-dot-icon-active-bg: var(--biona-orange);
            --ll-carousel-shadow: 0 22px 55px rgba(78, 48, 38, 0.12);
            background: #ffffff;
        }

        .ll-carousel__container {
            max-width: 1120px;
            overflow: visible;
            padding: 0;
        }

        .ll-carousel__viewport {
            aspect-ratio: 16 / 9;
            background: var(--ivory);
            border: 1px solid rgba(252, 251, 250, 0.72);
            border-radius: 20px;
            box-shadow: var(--ll-carousel-shadow);
            max-width: 1120px;
        }

        .ll-carousel__layout--media {
            background: var(--ivory) !important;
        }

        .ll-carousel__caption {
            background: rgb(127 99 54 / 73%) !important;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            box-shadow: 0 16px 36px rgba(40, 20, 18, 0.2);
            gap: 0.55rem;
            max-width: min(40%, 31rem);
            padding: clamp(1.2rem, 2.2vw, 1.8rem);
        }

        .ll-carousel__caption h3 {
            font-size: clamp(1.55rem, 2.6vw, 2.8rem);
            font-weight: 500;
            line-height: 1.08;
        }

        .ll-carousel__caption p {
            color: rgba(255, 255, 255, 0.92);
            font-size: clamp(0.88rem, 1.05vw, 1.05rem);
            line-height: 1.5;
        }

        .ll-carousel__nav {
            gap: 0.75rem;
            margin-top: 0.9rem;
            max-width: 1120px;
        }

        .ll-carousel__dot {
            border-color: var(--line);
            border-radius: 11px;
            min-height: 4.1rem;
            padding: 0.72rem 0.9rem 0.72rem 1rem;
        }

        .ll-carousel__dot:hover {
            box-shadow: 0 8px 20px rgba(81, 47, 38, 0.08);
            transform: translateY(-2px);
        }

        .ll-carousel__dot-number {
            color: var(--terracotta);
            font-size: 0.7rem;
            letter-spacing: 0.08em;
        }

        .ll-carousel__dot-text {
            color: var(--ink);
            font-size: 0.95rem;
        }

        .ll-carousel__dot-icon {
            height: 40px;
            width: 40px;
        }

        .ll-carousel__control--1:checked~.ll-carousel__nav .ll-carousel__dot--1,
        .ll-carousel__control--2:checked~.ll-carousel__nav .ll-carousel__dot--2 {
            box-shadow: inset 0 0 0 1px var(--biona-orange);
        }

        .ll-carousel+p {
            border-bottom: 1px solid #f0dfd7;
            color: #9a8880 !important;
            font-size: clamp(0.76rem, 1vw, 0.9rem) !important;
            letter-spacing: 0.07em;
            padding: 1.35rem 1rem 1.45rem !important;
        }

        #faq-section {
            background: linear-gradient(180deg, #fffaf6 0%, #fffdfb 100%);
            margin: 0;
            padding: clamp(2.8rem, 5vw, 4.8rem) 1rem clamp(3.2rem, 6vw, 5.5rem);
        }

        #faq-section__header {
            margin: 0 auto 1.8rem;
            max-width: 760px;
        }

        #faq-section-title,
        #faq-section__title {
            color: var(--wine);
            font-size: clamp(1.75rem, 3vw, 2.5rem);
            font-weight: 500;
            line-height: 1.16;
            margin-bottom: 0.65rem;
        }

        #faq-section__subtitle {
            color: var(--muted);
            font-size: 0.98rem;
        }

        #faq-section__list {
            gap: 0.75rem;
            max-width: 900px;
        }

        .faq-section__item {
            background: #ffffff;
            border-color: var(--line);
            border-style: solid;
            border-width: 1px;
            border-radius: 10px;
            box-shadow: 0 5px 18px rgba(75, 46, 38, 0.035);
            overflow: hidden;
        }

        .faq-section__item summary {
            align-items: center;
            cursor: pointer;
            display: flex;
            gap: 0.75rem;
            justify-content: space-between;
            list-style: none;
            min-height: 4rem;
            padding: 1rem 1.25rem;
        }

        .faq-section__item summary::-webkit-details-marker {
            display: none;
        }

        .faq-section__item summary:hover {
            background: var(--blush-light);
        }

        .faq-section__q-text {
            color: var(--ink);
            flex: 1;
            font-size: 0.98rem;
            font-weight: 700;
            line-height: 1.35;
        }

        .faq-section__q-text:hover {
            color: var(--wine);
        }

        .faq-section__icon {
            flex: 0 0 20px;
            height: 20px;
            position: relative;
            width: 20px;
        }

        .faq-section__icon::before,
        .faq-section__icon::after {
            background: var(--terracotta);
            border-radius: 2px;
            content: "";
            position: absolute;
            transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .faq-section__icon::before {
            height: 1.5px;
            left: 4px;
            top: 9px;
            width: 12px;
        }

        .faq-section__icon::after {
            height: 12px;
            left: 9px;
            top: 4px;
            width: 1.5px;
        }

        .faq-section__item details[open] .faq-section__icon::after {
            opacity: 0;
            transform: rotate(90deg);
        }

        .faq-section__a-inner {
            background: #fffdfb;
            border-top-style: solid;
            border-top-width: 1px;
            border-top-color: #efe0da;
            padding: 1rem 1.25rem 1.2rem;
        }

        .faq-section__a-text {
            color: #665b57;
            font-size: 0.94rem;
            line-height: 1.6;
        }

        @media (max-width: 760px) {
            .product-header {
                --badge-size: 7rem;
                --banner-height: 180px;
            }

            .product-header__body {
                padding: calc(var(--badge-size) / 2 + 1.25rem) 1.25rem 0.4rem;
            }

            .product-header__title {
                font-size: clamp(1.65rem, 7.2vw, 2.15rem);
                line-height: 1.12;
            }

            .product-header__subtitle {
                font-size: 0.95rem;
                line-height: 1.5;
                margin-top: 0.85rem;
                max-width: 34rem;
                text-align: center;
            }

            .section-15-container {
                padding: 1.75rem 1.35rem 2.8rem;
            }

            .section-15 {
                flex-direction: column-reverse;
                gap: 1.5rem;
            }

            .section-15__image-wrapper,
            .section-15__content {
                flex: 0 0 auto;
                max-width: none;
                width: 100%;
            }

            .section-15__content {
                padding: 0 0.65rem;
            }

            .section-15__image {
                aspect-ratio: 4 / 3;
                border-radius: 16px;
            }

            .section-15__title {
                font-size: clamp(1.9rem, 8vw, 2.45rem);
                margin-bottom: 0.7rem;
            }

            .section-15__desc {
                font-size: 0.96rem;
                line-height: 1.6;
            }

            .ll-carousel__container {
                padding: 0;
            }

            .ll-carousel__viewport {
                background: #fffaf7;
                border-radius: 16px;
                height: clamp(24rem, 108vw, 29rem);
                min-height: 24rem;
            }

            .ll-carousel__layout--media {
                background: #fffaf7 !important;
                padding: 0.55rem;
            }

            .ll-carousel__figure {
                gap: 0.55rem;
            }

            .ll-carousel__figure .ll-carousel__picture,
            .ll-carousel__figure>.ll-carousel__video {
                background: #f4e9e3;
                border-radius: 12px;
            }

            .ll-carousel__caption {
                background: #7c6d41 !important;
                border: 0;
                border-radius: 12px;
                box-shadow: none;
                max-width: none;
                padding: 0.85rem 0.95rem;
            }

            .ll-carousel__caption h3 {
                font-size: clamp(1.3rem, 6vw, 1.75rem);
            }

            .ll-carousel__caption p {
                font-size: 0.78rem;
                line-height: 1.35;
            }

            .ll-carousel__nav {
                gap: 0.45rem;
                margin-top: 0.65rem;
            }

            .ll-carousel__dot {
                border-radius: 9px;
                min-height: 3.25rem;
                padding: 0.5rem 0.55rem;
            }

            .ll-carousel__dot-number {
                display: none;
            }

            .ll-carousel__dot-text {
                font-size: 0.8rem;
            }

            .ll-carousel__dot-icon {
                height: 34px;
                width: 34px;
            }

            .ll-carousel+p {
                padding: 1.5rem 0.75rem !important;
            }

            #faq-section {
                padding: 2.8rem 1rem 3.5rem;
            }

            #faq-section__header {
                margin-bottom: 1.5rem;
            }

            #faq-section-title,
            #faq-section__title {
                font-size: clamp(1.65rem, 7vw, 2rem);
            }

            #faq-section__subtitle {
                font-size: 0.94rem;
            }

            .faq-section__item summary {
                min-height: 3.8rem;
                padding: 0.9rem 1rem;
            }

            .faq-section__q-text {
                font-size: 0.9rem;
            }
        }
    </style>
    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp" aria-label="product-main-title"> <!-- HTML fica dentro dessa div PDP -->

        <section class="video-header">
            <div class="video-header__banner">
                <video class="video-header__banner-video"
                    poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header_dove.webp" preload="none"
                    autoplay muted loop playsinline width="1200" height="250">
                    <source src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-dove.webm">
                </video>
                <div class="video-header__badge">
                    <img class="video-header__badge-img"
                        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/dove/logo-dove.png"
                        alt="logo da dove">
                </div>
            </div>
            <div class="video-header__body">
                <small class="video-header__brand">dove</small>
                <h2 class="video-header__title">
                    Creme para Pentear Bond Repair Peptideo 240ml
                </h2>
                <p class="video-header__subtitle">
                    Recupere a aparência dos fios com o Creme para Pentear Dove Bond Repair Peptídeo. Sua fórmula com 5%
                    Peptídeo Complex ajuda a reparar danos extremos, controla o frizz e oferece proteção térmica.
                </p>
            </div>
        </section>

        <!-- fecha esse article lá no final do código, depois de todo conteúdo, e antes do fechamento da div.lp-container -->

        <section class="ll-carousel"
            aria-label="Diferenciais do Aparelho de Jantar e Chá Biona Donna Chá das 5 30 Peças">
            <div class="ll-carousel__container">
                <div class="ll-carousel__intro">
                    <p class="ll-carousel__eyebrow"></p>
                    <h2 class="ll-carousel__title"></h2>
                    <p class="ll-carousel__lead"></p>
                </div>

                <input class="ll-carousel__control ll-carousel__control--1" type="radio" name="ll-carousel-active"
                    id="ll-carousel-slide-1" checked="">
                <input class="ll-carousel__control ll-carousel__control--2" type="radio" name="ll-carousel-active"
                    id="ll-carousel-slide-2">

                <div class="ll-carousel__viewport">
                    <div class="ll-carousel__indicators">
                        <span class="ll-carousel__indicator ll-carousel__indicator--1"></span>
                        <span class="ll-carousel__indicator ll-carousel__indicator--2"></span>
                    </div>
                    <label class="ll-carousel__side-hint ll-carousel__side-hint--prev ll-carousel__side-hint--1"
                        for="ll-carousel-slide-2" role="button" aria-label="Voltar para o slide 2">Anterior</label>
                    <label class="ll-carousel__side-hint ll-carousel__side-hint--next ll-carousel__side-hint--1"
                        for="ll-carousel-slide-2" role="button" aria-label="Avançar para o slide 2">Próximo</label>
                    <label class="ll-carousel__side-hint ll-carousel__side-hint--prev ll-carousel__side-hint--2"
                        for="ll-carousel-slide-1" role="button" aria-label="Voltar para o slide 1">Anterior</label>
                    <label class="ll-carousel__side-hint ll-carousel__side-hint--next ll-carousel__side-hint--2"
                        for="ll-carousel-slide-1" role="button" aria-label="Avançar para o slide 1">Próximo</label>
                    <div class="ll-carousel__track">
                        <div class="ll-carousel__panel ll-carousel__panel--1" id="ll-carousel-panel-1"
                            aria-label="Slide 1: Praticidade para servir">
                            <section class="ll-carousel__layout ll-carousel__layout--media"
                                style="--ll-carousel-media-bg: #c82a57; background: #c82a57;"
                                aria-label="Praticidade para servir">
                                <figure class="ll-carousel__figure">
                                    <div class="ll-carousel__picture">
                                        <img class="ll-carousel__image"
                                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/creme-para-pentear-dove-bond-repair-peptideo-240ml-embalagem-113523-01-01.webp"
                                            alt="Creme para pentear Dove Bond Repair Peptídeo 240ml sobre bancada de mármore e fundo holográfico"
                                            width="1800" height="1600" loading="lazy" decoding="async"
                                            style="object-position: 86% 50%;">
                                    </div>
                                    <figcaption class="ll-carousel__caption"
                                        style="--ll-carousel-caption-bg: rgba(0, 0, 0, 0.64); --ll-carousel-caption-text: #ffffff; --ll-carousel-caption-left: clamp(1.25rem, 5vw, 4.75rem); --ll-carousel-caption-right: auto; --ll-carousel-caption-translate-x: 0; --ll-carousel-caption-top: 50%; --ll-carousel-caption-bottom: auto; --ll-carousel-caption-translate-y: -50%;">
                                        <h3>Cuidado durante a finalização</h3>
                                        <p>Oferece proteção térmica, ajuda a prevenir pontas duplas e facilita o
                                            pentear para uma rotina de cuidados completa.</p>
                                    </figcaption>
                                </figure>   
                            </section>
                        </div>

                        <div class="ll-carousel__panel ll-carousel__panel--2" id="ll-carousel-panel-2"
                            aria-label="Slide 2: Delicadeza em cada detalhe">
                            <section class="ll-carousel__layout ll-carousel__layout--media"
                                style="--ll-carousel-media-bg: #c82a57; background: #c82a57;"
                                aria-label="Delicadeza em cada detalhe">
                                <figure class="ll-carousel__figure">
                                    <div class="ll-carousel__picture">
                                        <img class="ll-carousel__image"
                                            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/creme-para-pentear-dove-bond-repair-peptideo-cabelos-lisos-lifestyle-113523-01-02.webp"
                                            alt="Mulher de costas com cabelos castanhos lisos e sem frizz demonstrando Dove Bond Repair Peptídeo"
                                            width="1800" height="1600" loading="lazy" decoding="async"
                                            style="object-position: 22% 50%;">
                                    </div>
                                    <figcaption class="ll-carousel__caption"
                                        style="--ll-carousel-caption-bg: rgba(0, 0, 0, 0.64); --ll-carousel-caption-text: #ffffff; --ll-carousel-caption-left: 56%;">
                                        <h3>Repara danos extremos</h3>
                                        <p>Com 5% Peptídeo Complex, ajuda na reparação dos danos extremos dos fios,
                                            proporcionando cabelos mais macios e livres de frizz.</p>
                                    </figcaption>
                                </figure>
                            </section>
                        </div>
                    </div>
                </div>

                <div class="ll-carousel__nav" style="grid-template-columns: repeat(2, minmax(0, 1fr));"
                    aria-label="Selecionar slide do carrossel">
                    <label class="ll-carousel__dot ll-carousel__dot--1" for="ll-carousel-slide-1" role="button"
                        aria-controls="ll-carousel-panel-1">
                        <span class="ll-carousel__dot-copy">
                            <span class="ll-carousel__dot-number">01</span>
                            <span class="ll-carousel__dot-text">Proteção</span>
                        </span>
                        <span class="ll-carousel__dot-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-shield-icon lucide-shield">
                                <path
                                    d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                            </svg>

                        </span>
                    </label>

                    <label class="ll-carousel__dot ll-carousel__dot--2" for="ll-carousel-slide-2" role="button"
                        aria-controls="ll-carousel-panel-2">

                        <span class="ll-carousel__dot-copy">
                            <span class="ll-carousel__dot-number">02</span>
                            <span class="ll-carousel__dot-text">Reparação</span>
                        </span>

                        <span class="ll-carousel__dot-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-refresh-ccw-icon lucide-refresh-ccw">
                                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                <path d="M3 3v5h5" />
                                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                                <path d="M16 16h5v5" />
                            </svg>
                        </span>
                    </label>
                </div>
            </div>
        </section>

        <p style="color: #8a8a8a; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty;
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
                            <h3 id="faq-section__q-text"> Esse finalizador precisa de enxágue após a aplicação? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Não. O produto permanece nos fios após a aplicação, oferecendo
                                praticidade durante o cuidado diário com o cabelo. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> O creme ajuda a controlar o frizz? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. A fórmula foi desenvolvida para reparar danos extremos,
                                combater o frizz e proporcionar cabelos mais macios no uso diário. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> O finalizador oferece proteção térmica? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. A fórmula conta com proteção térmica, ajudando a proteger
                                os fios durante o uso de ferramentas de calor. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Esse creme para pentear ajuda a prevenir pontas duplas? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> Sim. Além de controlar o frizz, o produto ajuda a prevenir
                                pontas duplas, contribuindo para fios com aparência mais saudável. </p>
                        </div>
                    </details>
                </li>
                <!-------------------------->

                <!-- Cole aqui as perguntas e respostas -->
                <li id="faq-section__item">
                    <details id="faq-section__details">
                        <summary id="faq-section__summary">
                            <h3 id="faq-section__q-text"> Quais são os principais componentes da fórmula? </h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text"> A composição contém 5% Peptídeo Complex, além de proteínas
                                hidrolisadas de trigo, grão-de-bico, lentilha e extrato de quinoa. </p>
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
