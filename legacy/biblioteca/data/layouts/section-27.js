// @ts-nocheck
SenkoLib.registerLayout(
    {
        id: "section-27",
        name: "Section-27",
        tags: ["grid", "21", "split", "carrossel", "animado"],
        html: `        <section class="section-27-container" aria-labelledby="section-21-title">
            <div class="section-27">
                <div class="section-27__content">
                    <h2 class="section-27__title" id="section-21-title">
                        Versatilidade que simplifica o visual
                    </h2>
                    <p class="section-27__text">
                        Tom areia, conforto de borracha e visual clássico para usar sem pensar duas vezes.
                    </p>
                </div>
                <input class="section-27__control" id="section-21-slide-1" type="radio" name="section-21-carousel"
                    checked="" aria-label="Mostrar primeira imagem">
                <input class="section-27__control" id="section-21-slide-2" type="radio" name="section-21-carousel"
                    aria-label="Mostrar próxima imagem">
                <input class="section-27__control" id="section-21-slide-3" type="radio" name="section-21-carousel"
                    aria-label="Mostrar última imagem">
                <div class="section-27__gallery" role="group" aria-label="Espaços para imagens em recorte diagonal">
                    <div class="section-27__viewport">
                        <div class="section-27__track">
                            <figure class="section-27__panel section-27__panel--first">
                                <img class="section-27__image" width="420" height="320" loading="lazy" decoding="async"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-mao-exibindo-produto-1225195-1225196-1225197-1225198-1225199-05-3.webp"
                                    alt="Imagem ilustrativa das tiras texturizadas da Havaianas Top Senses Areia/Areia">
                            </figure>
                            <figure class="section-27__panel section-27__panel--middle">
                                <img class="section-27__image" width="420" height="320" loading="lazy" decoding="async"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-mao-exibindo-produto-1225195-1225196-1225197-1225198-1225199-05-2.webp"
                                    alt="Imagem ilustrativa do solado macio da Havaianas Top Senses Areia/Areia">
                            </figure>
                            <figure class="section-27__panel section-27__panel--last">
                                <img class="section-27__image" width="420" height="320" loading="lazy" decoding="async"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-modelo-shopping-lifestyle-1225195-1225196-1225197-1225198-1225199-05-1.webp"
                                    alt="Imagem lateral ilustrativa da Havaianas Top Senses Areia/Areia">
                            </figure>
                        </div>
                    </div>
                    <div class="section-27__arrows" role="navigation" aria-label="Controles das imagens em destaque">
                        <label class="section-27__arrow section-27__arrow--right section-27__arrow--next-1"
                            for="section-21-slide-2" aria-label="Mostrar próxima imagem">›</label>
                        <label class="section-27__arrow section-27__arrow--left section-27__arrow--prev-2"
                            for="section-21-slide-1" aria-label="Mostrar imagem anterior">‹</label>
                        <label class="section-27__arrow section-27__arrow--right section-27__arrow--next-2"
                            for="section-21-slide-3" aria-label="Mostrar próxima imagem">›</label>
                        <label class="section-27__arrow section-27__arrow--left section-27__arrow--prev-3"
                            for="section-21-slide-2" aria-label="Mostrar imagem anterior">‹</label>
                        <label class="section-27__arrow section-27__arrow--left section-27__arrow--prev-3-tablet"
                            for="section-21-slide-1" aria-label="Mostrar imagem anterior">‹</label>
                    </div>
                </div>
            </div>
        </section>`,
        css: `<style>
    .section-27 {
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

    .section-27::before {
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

    .section-27::after {
        content: "";
        position: absolute;
        inset: 12px auto auto 18px;
        width: 46%;
        height: 1px;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0));
        z-index: 1;
        pointer-events: none;
    }

    .section-27--reverse .section-27__content {
        order: 2;
    }

    .section-27--reverse .section-27__gallery {
        order: 1;
    }

    .section-27__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 12px;
        padding: 0;
        margin: 0 0 8px 26px;
        position: relative;
        z-index: 1;
    }

    .section-27__title {
        margin: 0;
        color: #ffffff;
        font-size: clamp(1.45rem, 6.7vw, 1.85rem);
        font-weight: 900;
        line-height: 0.98;
        text-transform: uppercase;
        text-shadow: 0 12px 26px rgba(62, 7, 23, 0.26);
    }

    .section-27__text {
        margin: 0;
        color: #ffffff;
        font-size: 0.95rem;
        line-height: 1.55;
    }

    .section-27__control {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
    }

    .section-27__gallery {
        position: relative;
        display: block;
        min-height: 245px;
        height: 100%;
        z-index: 1;
    }

    .section-27__viewport {
        position: relative;
        width: min(82%, 350px);
        min-height: inherit;
        height: 100%;
        margin: 0 40px 0 auto;
        overflow: hidden;
    }

    .section-27__track {
        position: relative;
        min-height: inherit;
        height: 100%;
        transition: transform 0.35s ease;
    }

    .section-27__panel {
        min-height: 0;
        height: auto;
        margin: 0;
        overflow: hidden;
        background: rgba(121, 45, 65, 0.10);
        border-radius: 5px;
        border: 1px solid rgba(121, 45, 65, 0.16);
        box-shadow: 0 16px 36px rgba(62, 7, 23, 0.16);
    }

    .section-27__panel--first {
        clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .section-27__panel--middle {
        clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 100%;
        width: 100%;
    }

    .section-27__panel--last {
        clip-path: polygon(23% 0, 100% 0, 76% 100%, 0 100%);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 200%;
        width: 100%;
    }

    #section-21-slide-1:checked~.section-27__gallery .section-27__track {
        transform: translateX(0);
    }

    #section-21-slide-2:checked~.section-27__gallery .section-27__track {
        transform: translateX(-100%);
    }

    #section-21-slide-3:checked~.section-27__gallery .section-27__track {
        transform: translateX(-200%);
    }

    .section-27__image {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: transform 0.8s ease, filter 0.8s ease;
    }

    .section-27:hover .section-27__image {
        transform: scale(1.035);
        filter: saturate(1.04) contrast(1.04);
    }

    .section-27__image:not([src]) {
        opacity: 0;
    }

    .section-27__arrows {
        position: absolute;
        inset: 0;
        pointer-events: none;
    }

    .section-27__arrow {
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
        animation: section-21-arrow-radiate 1.15s ease-in-out infinite;
    }

    .section-27__arrow::before,
    .section-27__arrow::after {
        content: "";
        position: absolute;
        inset: -8px;
        border-radius: 50%;
        border: 2px solid rgba(255, 153, 0, 0.42);
        opacity: 0;
        pointer-events: none;
    }

    .section-27__arrow::before {
        animation: section-21-arrow-ring 1.35s ease-out infinite;
    }

    .section-27__arrow::after {
        animation: section-21-arrow-ring 1.35s ease-out 0.38s infinite;
    }

    .section-27__arrow:hover {
        color: #3e0717;
        transform: translateY(-50%) scale(1.06);
        box-shadow: 0 0 0 5px rgba(121, 45, 65, 0.10), 0 14px 24px rgba(62, 7, 23, 0.16);
    }

    @keyframes section-21-arrow-radiate {
        0%,
        100% {
            box-shadow: 0 0 0 0 rgba(255, 153, 0, 0.40), 0 8px 18px rgba(62, 7, 23, 0.12);
        }

        50% {
            box-shadow: 0 0 0 9px rgba(255, 153, 0, 0.16), 0 0 22px rgba(121, 45, 65, 0.24), 0 14px 26px rgba(62, 7, 23, 0.18);
        }
    }

    @keyframes section-21-arrow-ring {
        0% {
            opacity: 0.70;
            transform: scale(0.72);
        }

        100% {
            opacity: 0;
            transform: scale(1.65);
        }
    }

    .section-27__arrow--left {
        left: 0;
    }

    .section-27__arrow--right {
        right: 0;
    }

    #section-21-slide-1:checked~.section-27__gallery .section-27__arrow--next-1 {
        display: flex;
    }

    #section-21-slide-2:checked~.section-27__gallery .section-27__arrow--prev-2 {
        display: flex;
    }

    #section-21-slide-2:checked~.section-27__gallery .section-27__arrow--next-2 {
        display: flex;
    }

    #section-21-slide-3:checked~.section-27__gallery .section-27__arrow--prev-3 {
        display: flex;
    }

    @media (min-width: 576px) {
        .section-27 {
            padding: 24px 20px;
        }

        .section-27__title {
            font-size: 1.9rem;
        }

        .section-27__gallery {
            min-height: 230px;
        }

        .section-27__viewport {
            width: calc(100% - 86px);
        }

        .section-27__panel--first {
            left: 0;
            width: 56%;
        }

        .section-27__panel--middle {
            left: 44%;
            width: 56%;
        }

        .section-27__panel--last {
            left: 88%;
            width: 56%;
        }

        #section-21-slide-2:checked~.section-27__gallery .section-27__track {
            transform: translateX(-44%);
        }

        #section-21-slide-3:checked~.section-27__gallery .section-27__track {
            transform: translateX(-44%);
        }

        #section-21-slide-2:checked~.section-27__gallery .section-27__arrow--next-2 {
            display: none;
        }

        #section-21-slide-3:checked~.section-27__gallery .section-27__arrow--prev-3 {
            display: none;
        }

        #section-21-slide-3:checked~.section-27__gallery .section-27__arrow--prev-3-tablet {
            display: flex;
        }
    }

    @media (min-width: 768px) {
        .section-27 {
            grid-template-columns: minmax(0, 0.75fr) minmax(0, 2.25fr);
            align-items: stretch;
            gap: 18px;
            padding: 24px;
        }

        .section-27::before {
            inset: 0 auto 0 0;
            width: 48%;
            height: 100%;
            clip-path: polygon(0 0, 100% 0, 82% 100%, 0 100%);
        }

        .section-27__content {
            width: auto;
            margin: 0;
            padding: 0 1.75rem;
        }

        .section-27__text {
            font-size: 0.86rem;
        }

        .section-27--reverse {
            grid-template-columns: minmax(0, 2.25fr) minmax(0, 0.75fr);
        }

        .section-27__content {
            gap: 14px;
        }

        .section-27__gallery {
            min-height: 250px;
        }
    }

    @media (min-width: 992px) {
        .section-27 {
            gap: 22px;
            padding: 26px;
        }

        .section-27__title {
            font-size: 2.15rem;
        }

        .section-27__gallery {
            min-height: 270px;
        }
    }

    @media (min-width: 992px) {
        .section-27 {
            gap: 24px;
            padding: 28px;
        }

        .section-27__gallery {
            min-height: 285px;
        }

        .section-27__viewport {
            width: 100%;
            overflow: visible;
        }

        #section-21-slide-1:checked~.section-27__gallery .section-27__track,
        #section-21-slide-2:checked~.section-27__gallery .section-27__track,
        #section-21-slide-3:checked~.section-27__gallery .section-27__track {
            transform: none;
        }

        .section-27__panel--first {
            left: 0%;
            width: 37%;
        }

        .section-27__panel--middle {
            left: 31%;
            width: 37%;
        }

        .section-27__panel--last {
            left: 63%;
            width: 37%;
        }

        .section-27__arrows {
            display: none;
        }
    }

    @media (min-width: 1400px) {
        .section-27 {
            gap: 28px;
            padding: 30px;
        }

        .section-27__title {
            font-size: 2.35rem;
        }
    }
</style>`
    }
);
