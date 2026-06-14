// @ts-nocheck
SenkoLib.registerVariant('section-10', [
/*@@@@Senko - variao-1-animado */
  {
    name: 'variao-1-animado',
    html: `        <section aria-label="Grid de especificações do produto" style="background-color: #6e0c2a08;">
            <div class="section-10 section-10--carousel-mobile" aria-labelledby="section-10-title">
                <h2 class="section-10__title" id="section-10-title">
                    Detalhes que fazem diferença no uso
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
                                        alt="Detalhe ilustrativo das tiras texturizadas da Havaianas Top Senses Areia/Areia"
                                        loading="lazy" decoding="async">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Tiras texturizadas em PVC
                                    </h3>
                                    <p class="section-10__card-text">
                                        Tiras mais grossas ajudam na estabilidade e mantêm a sensação de frescor.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-detalhe-solado-inferior-1225195-1225196-1225197-1225198-1225199-03-2.webp"
                                        alt="Detalhe ilustrativo do solado da Havaianas Top Senses Areia/Areia" loading="lazy"
                                        decoding="async">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Solado macio de borracha
                                    </h3>
                                    <p class="section-10__card-text">
                                        Base 100% borracha, flexível e durável para caminhar com conforto.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-modelo-passarela-madeira-lifestyle-1225195-1225196-1225197-1225198-1225199-03-3.webp"
                                        alt="Imagem ilustrativa da cor neutra da Havaianas Top Senses Areia/Areia" loading="lazy"
                                        decoding="async">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Areia/Areia fácil de combinar
                                    </h3>
                                    <p class="section-10__card-text">
                                        Cor neutra para compor looks casuais sem pesar no visual.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                        <li class="section-10__item">
                            <figure class="section-10__card">
                                <div class="section-10__media">
                                    <img class="section-10__image"
                                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-elegance-amaranto-detalhe-logotipo-relevo-1225195-1225196-1225197-1225198-1225199-03-4.webp"
                                        alt="Detalhe ilustrativo da Havaianas Top Senses Areia/Areia fácil de limpar" loading="lazy"
                                        decoding="async">
                                </div>
                                <figcaption>
                                    <h3 class="section-10__card-title">
                                        Fácil de lavar
                                    </h3>
                                    <p class="section-10__card-text">
                                        Pode ser lavado à mão com sabão neutro ou na máquina de lavar roupa.
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
        </section>`,
    css: `    <style>
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
            padding-bottom: 22px;
        }

        .section-10__button {
            position: relative;
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

        .section-10__button::after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: -17px;
            width: 0;
            height: 0;
            border-right: 8px solid transparent;
            border-bottom: 10px solid #ff9900;
            border-left: 8px solid transparent;
            filter: drop-shadow(0 5px 6px rgba(62, 7, 23, 0.22));
            opacity: 0;
            transform: translate(-50%, 6px);
            transition: opacity 0.25s ease;
            pointer-events: none;
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

        #section-10-slide-1:checked~.section-10__controls .section-10__button--1::after,
        #section-10-slide-2:checked~.section-10__controls .section-10__button--2::after,
        #section-10-slide-3:checked~.section-10__controls .section-10__button--3::after,
        #section-10-slide-4:checked~.section-10__controls .section-10__button--4::after {
            opacity: 1;
            animation: section-10-arrow-bounce 0.82s ease-in-out infinite;
        }

        @keyframes section-10-arrow-bounce {
            0%,
            100% {
                transform: translate(-50%, 6px);
            }

            50% {
                transform: translate(-50%, -1px);
            }
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
    </style>`,
  },
]);
