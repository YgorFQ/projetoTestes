// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "variacao-12",
  name: "Variação 12",
  html: `<div class="lp-container">
    <meta charset="UTF-8">
    <title>PDP - eFacil</title>

    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .lp-container {
            width: 100%;
            background: #ffffff;
        }

        .pdp {
            display: flex;
            flex-direction: column;
            font-family: Roboto, sans-serif;
            color: #1b2148;
            background: #ffffff;
            width: 100%;
        }

        .pdp * {
            box-sizing: border-box;
            margin: 0;
        }
    </style>

    <style>
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
            margin: 2rem auto;
        }

        #faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #1b2148;
            margin: 0 0 12px;
            line-height: 98%;
        }

        #faq-section__subtitle {
            font-size: 1rem;
            color: #5d6783;
            margin: 0;
        }

        #faq-section__list {
            list-style: none;
            margin: 0 auto;
            padding: 0;
            max-width: 56rem;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        #faq-section__item {
            background: #fff;
            border: 1px solid #dbe8f8;
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
            background: #f5f9ff;
        }

        #faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #1b2148;
            flex: 1;
        }

        #faq-section__q-text:hover {
            color: #5f8fce;
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
            background: #5f8fce;
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
            border-top: 1px solid #dbe8f8;
        }

        #faq-section__a-text {
            font-size: 0.9rem;
            color: #4e5874;
            line-height: 1.6;
            margin: 0;
        }

        @media (max-width: 480px) {
            #faq-section__q-text {
                font-size: 0.9rem;
            }
        }
    </style>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .product-header-2 {
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

        .product-header__banner-2 {
            width: 100%;
            height: var(--banner-height);
            position: relative;
            display: flex;
            justify-content: center;
        }

        .product-header__banner-2 figure {
            width: 100%;
            height: 100%;
            margin: 0;
        }

        .product-header__banner-img-2 {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .product-header__badge-2 {
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

        .product-header__badge-img-2 {
            max-width: 90px;
            max-height: 90px;
            object-fit: contain;
        }

        .product-header__body-2 {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: calc(var(--badge-size) / 2 + 1.8rem) 0.3rem 2.5rem;
            text-align: center;
        }

        .product-header__brand-2 {
            color: #ff9900;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            margin-bottom: 0.75rem;
        }

        .product-header__title-2 {
            font-size: clamp(1.4rem, 4vw, 2.4rem);
            line-height: clamp(1.6rem, 4vw, 3.1rem);
            font-weight: 300;
            max-width: 50rem;
            text-wrap: pretty;
            color: #1a1a1a;
        }

        .product-header__title-2 strong {
            font-weight: 700;
            display: block;
        }

        .product-header__subtitle-2 {
            color: #8a8a8a;
            font-size: clamp(0.95rem, 2vw, 1.1rem);
            line-height: 1.65;
            margin-top: 1.25rem;
            max-width: 48rem;
            text-wrap: pretty;
        }

        @media (max-width: 768px) {
            .product-header-2 {
                --banner-height: 180px;
            }
        }

        @media (max-width: 470px) {
            .product-header__subtitle-2 {
                text-align: justify;
                font-size: clamp(0.9rem, 2vw, 1.1rem);
            }
        }
    </style>

    <style>
        .section-1-wrap,
        .section-2-wrap,
        .section-3-wrap {
            padding: 28px 16px;
        }

        .section-1 {
            display: grid;
            gap: 24px;
            align-items: center;
            margin: 0 auto;
            width: 100%;
        }

        .section-1__content {
            display: flex;
            flex-direction: column;
            gap: 16px;
            order: 3;
        }

        .section-1__eyebrow {
            color: #5f8fce;
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.16em;
            text-transform: uppercase;
        }

        .section-1__title {
            color: #11184a;
            font-size: clamp(1.45rem, 3vw, 2.25rem);
            line-height: 1.12;
            font-weight: 700;
            text-wrap: pretty;
        }

        .section-1__text {
            color: #4e5874;
            font-size: 1rem;
            line-height: 1.68;
            text-wrap: pretty;
        }

        .section-1__list {
            display: grid;
            gap: 10px;
            list-style: none;
            padding: 0;
        }

        .section-1__item {
            display: flex;
            gap: 10px;
            align-items: flex-start;
            color: #273158;
            font-size: 0.98rem;
            line-height: 1.45;
        }

        .section-1__marker {
            width: 10px;
            height: 10px;
            margin-top: 7px;
            border-radius: 50%;
            background: #89b9ef;
            flex: 0 0 auto;
        }

        .section-1__media {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 320px;
            border-radius: 22px;
            background: linear-gradient(145deg, #eef8ff 0%, #d9ecff 100%);
            overflow: hidden;
        }

        .section-1__image {
            width: min(88%, 390px);
            height: auto;
            display: block;
            padding: 20px;
            object-fit: contain;
            filter: drop-shadow(0 24px 34px rgba(24, 37, 88, 0.18));
        }

        .section-2 {
            display: grid;
            gap: 14px;
            width: 100%;
            margin: 0 auto;
        }

        .section-2__intro {
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 8px;
        }

        .section-2__title {
            color: #11184a;
            font-size: clamp(1.35rem, 3vw, 2rem);
            line-height: 1.18;
            font-weight: 700;
        }

        .section-2__text {
            color: #5d6783;
            font-size: 1rem;
            line-height: 1.6;
        }

        .section-2__grid {
            display: grid;
            gap: 12px;
        }

        .section-2__card {
            border: 1px solid #dbe8f8;
            border-radius: 8px;
            background: #ffffff;
            padding: 18px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            min-height: 136px;
        }

        .section-2__number {
            color: #5f8fce;
            font-size: 1.85rem;
            line-height: 1;
            font-weight: 700;
        }

        .section-2__label {
            color: #11184a;
            font-size: 1rem;
            font-weight: 700;
            line-height: 1.3;
        }

        .section-2__description {
            color: #4e5874;
            font-size: 0.94rem;
            line-height: 1.5;
        }

        .section-3 {
            display: grid;
            gap: 22px;
            align-items: center;
            width: 100%;
            margin: 0 auto;
            padding: 22px;
            border-radius: 22px;
            background: #f5f9ff;
        }

        .section-3__content {
            display: flex;
            flex-direction: column;
            gap: 14px;
        }

        @media (max-width: 767px) {
            .section-3__content {
                order: 1;
            }
        }

        .section-3__title {
            color: #11184a;
            font-size: clamp(1.35rem, 3vw, 2rem);
            line-height: 1.18;
            font-weight: 700;
            text-wrap: pretty;
        }

        .section-3__text {
            color: #4e5874;
            font-size: 1rem;
            line-height: 1.65;
            text-wrap: pretty;
        }

        .section-3__steps {
            display: grid;
            gap: 10px;
            list-style: none;
            padding: 0;
        }

        .section-3__step {
            display: grid;
            grid-template-columns: 44px 1fr;
            gap: 12px;
            align-items: start;
            color: #273158;
            font-size: 0.96rem;
            line-height: 1.48;
        }

        .section-3__step-number {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #11184a;
            color: #ffffff;
            font-weight: 700;
        }

        .section-3__media {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 300px;
        }

        .section-3__image {
            width: min(88%, 390px);
            height: auto;
            display: block;
            object-fit: contain;
            filter: drop-shadow(0 20px 28px rgba(24, 37, 88, 0.16));
        }

        @media (min-width: 576px) {

            .section-1,
            .section-2,
            .section-3 {
                max-width: 576px;
            }

            .section-2__grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 768px) {

            .section-1,
            .section-2,
            .section-3 {
                max-width: 768px;
            }

            .section-1 {
                grid-template-columns: 0.92fr 1.08fr;
            }

            .section-1--reverse {
                grid-template-columns: 1.08fr 0.92fr;
            }

            .section-1--reverse .section-1__media {
                order: 2;
            }

            .section-3 {
                grid-template-columns: 1.08fr 0.92fr;
                padding: 34px;
            }
        }

        @media (min-width: 992px) {

            .section-1,
            .section-2,
            .section-3 {
                max-width: 992px;
            }

            .section-2__grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }

        @media (min-width: 1200px) {

            .section-1,
            .section-2,
            .section-3 {
                max-width: 1200px;
            }
        }

        @media (min-width: 1400px) {

            .section-1,
            .section-2,
            .section-3 {
                max-width: 1400px;
            }
        }
    </style>

    <div class="pdp" id="pdp">
        <section class="product-header-2" aria-label="Cabeçalho do produto">
            <header class="product-header__banner-2">
                <div style="width: 100%; height: 100%; margin: 0px;">
                    <img class="product-header__banner-img-2"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/amaciante-comfort-puro-cuidado-toalhas-algodao-lifestyle-1704676-00fix.jpg"
                        alt="Toalhas brancas macias empilhadas com flores de algodão e penas, Amaciante Comfort Puro Cuidado"
                        loading="eager" decoding="async">
                </div>
                <div class="product-header__badge-2" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/comfort/logo-comfort.png"
                        alt="Ícone da marca" class="product-header__badge-img-2">
                </div>
            </header>
            <article class="product-header__body-2">
                <small class="product-header__brand-2">── Comfort ──</small>
                <h1 class="product-header__title-2">
                    <span>Amaciante Concentrado Puro Cuidado</span>
                    <strong>maciez suave para roupas de bebês</strong>
                </h1>
                <p class="product-header__subtitle-2">
                    Fórmula hipoalergênica, dermatologicamente testada e com perfume suave. Rende até 50 lavagens.
                </p>
            </article>
        </section>

        <section class="section-1-wrap" aria-label="Benefícios do amaciante Comfort Puro Cuidado">
            <article class="section-1">
                <div class="section-1__media">
                    <img class="section-1__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/amaciante-comfort-concentrado-puro-cuidado-fundo-preto-1704676-01.png"
                        alt="Amaciante Comfort Concentrado Puro Cuidado 1L hipoalergênico indicado para roupas de bebê"
                        loading="lazy" decoding="async" style="margin: auto;">
                </div>
                <div class="section-1__content">
                    <p class="section-1__eyebrow">Cuidado concentrado</p>
                    <h3 class="section-1__title">Maciez e perfume suave em cada lavagem</h3>
                    <p class="section-1__text">
                        Menos de meia tampinha ajuda a deixar as roupas macias, cheirosas e agradáveis ao toque.
                    </p>
                    <ul class="section-1__list" aria-label="Principais atributos do produto">
                        <li class="section-1__item"><span class="section-1__marker"
                                aria-hidden="true"></span>Hipoalergênico.</li>
                        <li class="section-1__item"><span class="section-1__marker" aria-hidden="true"></span>Perfume
                            delicado.</li>
                        <li class="section-1__item"><span class="section-1__marker" aria-hidden="true"></span>Para
                            roupas de bebês.
                        </li>
                        <li class="section-1__item"><span class="section-1__marker" aria-hidden="true"></span>Até 50
                            lavagens.</li>
                    </ul>
                </div>
            </article>
        </section>

        <section class="section-2-wrap" aria-label="Destaques do Comfort Concentrado">
            <article class="section-2">
                <div class="section-2__intro">
                    <h3 class="section-2__title">Rende mais. Usa menos.</h3>
                    <p class="section-2__text">
                        Comfort concentrado entrega cuidado com uma dosagem pequena no último enxágue.
                    </p>
                </div>
                <div class="section-2__grid">
                    <article class="section-2__card">
                        <strong class="section-2__number">50</strong>
                        <h4 class="section-2__label">lavagens</h4>
                        <p class="section-2__description">Usando 20 ml por lavagem.</p>
                    </article>
                    <article class="section-2__card">
                        <strong class="section-2__number">4,5 L</strong>
                        <h4 class="section-2__label">de rendimento</h4>
                        <p class="section-2__description">1 L que rende como 4,5 L.</p>
                    </article>
                    <article class="section-2__card">
                        <strong class="section-2__number">20 ml</strong>
                        <h4 class="section-2__label">para até 8 kg</h4>
                        <p class="section-2__description">Menos de 1/3 da tampa.</p>
                    </article>
                    <article class="section-2__card">
                        <strong class="section-2__number">Sim</strong>
                        <h4 class="section-2__label">testado na pele</h4>
                        <p class="section-2__description">Para peles delicadas.</p>
                    </article>
                </div>
            </article>
        </section>

        <section class="section-3-wrap" aria-label="Modo de uso do amaciante">
            <article class="section-3">
                <div class="section-3__content">
                    <h3 class="section-3__title">Dosagem sem complicação</h3>
                    <p class="section-3__text">
                        Coloque no compartimento da máquina ou na água do último enxágue.
                    </p>
                    <ol class="section-3__steps">
                        <li class="section-3__step"><span class="section-3__step-number">1</span><span>Máquinas até 8 kg
                                ou lavagem
                                à mão: 20 ml.</span></li>
                        <li class="section-3__step"><span class="section-3__step-number">2</span><span>Máquinas de 9 a
                                14 kg: dosar
                                22,5 ml.</span></li>
                        <li class="section-3__step"><span class="section-3__step-number">3</span><span>Máquinas de 15 kg
                                ou maiores:
                                1 tampa.</span></li>
                    </ol>
                </div>
                <div class="section-3__media">
                    <img class="section-3__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/amaciante-comfort-concentrado-puro-cuidado-hipoalergenico-1l-1704676-02fix.jpg"
                        alt="Amaciante Comfort Concentrado Puro Cuidado 1L hipoalergênico envolto por flores de algodão e penas"
                        style="border-radius: 20px; margin: auto;" loading="lazy" decoding="async">
                </div>
            </article>
        </section>

        <section class="section-1-wrap" aria-label="Cuidados e recomendações de uso">
            <article class="section-1 section-1--reverse">
                <div class="section-1__content">
                    <p class="section-1__eyebrow">Uso consciente</p>
                    <h3 class="section-1__title">Use do jeito certo</h3>
                    <p class="section-1__text">
                        Siga o rótulo, respeite a dosagem e guarde em local fresco, longe de crianças e animais.
                    </p>
                    <ul class="section-1__list" aria-label="Recomendacoes importantes">
                        <li class="section-1__item"><span class="section-1__marker" aria-hidden="true"></span>Não use em
                            seda ou
                            couro.</li>
                        <li class="section-1__item"><span class="section-1__marker" aria-hidden="true"></span>Não
                            aplique direto na
                            roupa.</li>
                        <li class="section-1__item"><span class="section-1__marker" aria-hidden="true"></span>Mantenha
                            fora do
                            alcance infantil.</li>
                        <li class="section-1__item"><span class="section-1__marker" aria-hidden="true"></span>Em contato
                            com olhos,
                            lave com água.</li>
                    </ul>
                </div>
                <div class="section-1__media">
                    <img class="section-1__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/amaciante-comfort-puro-cuidado-maquina-lavar-uso-lifestyle-1704676-03fix.jpg"
                        alt="Máquina de lavar roupas aberta com peças coloridas e espuma de Amaciante Comfort Puro Cuidado"
                        style="border-radius: 38px; margin: auto;" loading="lazy" decoding="async">
                </div>
            </article>
        </section>

        <section id="faq-section" aria-labelledby="faq-section-title">
            <div id="faq-section__header">
                <h3 id="faq-section__title" id="faq-section-title">Dúvidas rápidas</h3>
                <p id="faq-section__subtitle">As principais respostas antes de usar.</p>
            </div>
            <ul id="faq-section__list">
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">É indicado para roupas de bebê?</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Sim, é indicado para roupas de crianças e bebês.</p>
                        </div>
                    </details>
                </li>
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Quantas lavagens o produto rende?</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Até 50 lavagens, usando 20 ml em máquinas de até 8 kg.</p>
                        </div>
                    </details>
                </li>
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">O amaciante é hipoalergênico?</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Sim. Ele é hipoalergênico e dermatologicamente testado.</p>
                        </div>
                    </details>
                </li>
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Onde coloco o amaciante?</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">No compartimento da máquina ou na água do último enxágue.</p>
                        </div>
                    </details>
                </li>
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Pode usar em qualquer tecido?</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Não é recomendado para seda e couro.</p>
                        </div>
                    </details>
                </li>
            </ul>
        </section>

        <p
            style="color: rgb(138, 138, 138); font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty; text-align: center; padding: 30px 0px;">
            IMAGENS MERAMENTE ILUSTRATIVAS</p>
    </div>
</div>`,
  css: ``
}
);
