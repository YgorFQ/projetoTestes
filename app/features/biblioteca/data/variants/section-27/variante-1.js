// @ts-nocheck
SenkoLib.registerVariantFile("section-27",
{
  id: "variante-1",
  name: "variante-1",
  html: `        <section class="section-21-container" aria-label="Estilo e detalhes das Havaianas Kids Flores Preto">
            <article class="section-21" aria-labelledby="section-21-title">
                <div class="section-21__content">
                    <h2 class="section-21__title" id="section-21-title">
                        Um jardim secreto aos pés
                    </h2>
                    <p class="section-21__text">
                        Flores, conforto e um visual delicado para deixar os passeios das meninas ainda mais especiais.
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
                                    src="C:\\Users\\ygorq\\Downloads\\1224938_1224936_1224937_1224939_1224941_1224942_1224943_05-1.webp"
                                    alt="Imagem da tira metálica da Havaianas Kids Flores Preto" loading="lazy" width="420"
                                    height="320">
                            </figure>
                            <figure class="section-21__panel section-21__panel--middle">
                                <img class="section-21__image"
                                    src="C:\\Users\\ygorq\\Downloads\\1224938_1224936_1224937_1224939_1224941_1224942_1224943_05-2.webp"
                                    alt="Imagem da estampa floral da Havaianas Kids Flores Preto" loading="lazy" width="420"
                                    height="320">
                            </figure>
                            <figure class="section-21__panel section-21__panel--last">
                                <img class="section-21__image"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sandalia-havaianas-dual-solado-dupla-camada-borracha-1225035-08.webp"
                                    alt="Imagem do chinelo Havaianas Kids Flores Preto" loading="lazy" width="420"
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
        </section>`,
  css: `    <style>
        .section-21 {
            width: 100%;
            min-height: 280px;
            overflow: hidden;
            display: grid;
            align-items: stretch;
            gap: 18px;
            padding: 22px 16px;
            background: linear-gradient(135deg, #2b2227 0%, #3a2930 58%, #fff1f6 58.2%, #fff7fa 100%);
            border-radius: 6px;
            color: #fff9fb;
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
            color: #fff9fb;
            font-size: 1.65rem;
            font-weight: 900;
            line-height: 0.98;
            text-transform: uppercase;
        }

        .section-21__text {
            margin: 0;
            color: #f2d7e2;
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
            background: #f7dbe6;
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
            border: 1px solid #f0bfd0;
            border-radius: 50%;
            background: #fff8fb;
            color: #8e3d5c;
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
    </style>`
}
);
