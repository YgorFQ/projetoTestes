// @ts-nocheck
SenkoLib.registerLayout(
    {
        id: "section-25",
        name: "Section-25",
        tags: ["Carrossel", "grid"],
        html: `        <section class="section-25" aria-label="Abas de conteúdo sobre o produto">

            <input class="section-25__radio" id="s25-tab1" type="radio" name="s25-tabs" aria-label="Mostrar aba Origem"
                checked>
            <input class="section-25__radio" id="s25-tab2" type="radio" name="s25-tabs"
                aria-label="Mostrar aba Processo">
            <input class="section-25__radio" id="s25-tab3" type="radio" name="s25-tabs"
                aria-label="Mostrar aba Envelhecimento">
            <input class="section-25__radio" id="s25-tab4" type="radio" name="s25-tabs"
                aria-label="Mostrar aba Perfil Sensorial">

            <div class="section-25-container">
                <div class="section-25__nav" role="group" aria-label="Seções do produto">
                    <label class="section-25__tab-label" for="s25-tab1">Origem</label>
                    <label class="section-25__tab-label" for="s25-tab2">Processo</label>
                    <label class="section-25__tab-label" for="s25-tab3">Envelhecimento</label>
                    <label class="section-25__tab-label" for="s25-tab4">Perfil Sensorial</label>
                </div>

                <div class="section-25__panels">
                    <div class="section-25__panel section-25__panel--1" role="group" aria-label="Origem">
                        <div class="section-25__split">
                            <figure class="section-25__figure">
                                <img class="section-25__image" width="800" height="600" loading="lazy"
                                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64"
                                    alt="Barris de carvalho enfileirados em adega escura — local de origem do Domecq">
                            </figure>
                            <div class="section-25__body">
                                <h2 class="section-25__title">Tradição brasileira<br>que atravessa gerações</h2>
                                <p class="section-25__description">Produzido no Brasil pela Pernod Ricard Brasil, em
                                    Resende, RJ, o Domecq Coquetel Composto é elaborado com ingredientes selecionados
                                    que garantem seu aroma frutado e sabor inigualável. Uma receita clássica, feita para
                                    momentos que merecem ser celebrados.</p>
                                <span class="section-25__location"></span>
                            </div>
                        </div>
                    </div>

                    <div class="section-25__panel section-25__panel--2" role="group" aria-label="Processo">
                        <div class="section-25__split section-25__split--reverse">
                            <figure class="section-25__figure">
                                <img class="section-25__image" width="800" height="600" loading="lazy"
                                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                                    alt="Mesa com ingredientes e utensílios do processo artesanal de destilação">
                            </figure>
                            <div class="section-25__body">
                                <h2 class="section-25__title">Destilação artesanal<br>com técnica centenária</h2>
                                <p class="section-25__description">Cada lote é produzido com controle rigoroso de
                                    temperatura e tempo de fermentação. O processo combina métodos tradicionais herdados
                                    de mestres destiladores com padrões modernos de qualidade que garantem consistência
                                    e pureza em cada garrafa.</p>
                                <span class="section-25__location"></span>
                            </div>
                        </div>
                    </div>

                    <div class="section-25__panel section-25__panel--3" role="group" aria-label="Envelhecimento">
                        <div class="section-25__split">
                            <figure class="section-25__figure">
                                <img class="section-25__image" width="800" height="600" loading="lazy"
                                    src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3"
                                    alt="Taça com destilado âmbar iluminado — resultado do envelhecimento em barris de carvalho">
                            </figure>
                            <div class="section-25__body">
                                <h2 class="section-25__title">Envelhecido em carvalho<br>para sabor complexo</h2>
                                <p class="section-25__description">O descanso em barris de carvalho americano confere ao
                                    Domecq notas amadeiradas, caramelo e baunilha que equilibram a doçura natural da
                                    bebida. O tempo de maturação é cuidadosamente monitorado para atingir o ponto exato
                                    de harmonia entre força e suavidade.</p>
                                <span class="section-25__location"></span>
                            </div>
                        </div>
                    </div>

                    <div class="section-25__panel section-25__panel--4" role="group" aria-label="Perfil Sensorial">
                        <div class="section-25__split section-25__split--reverse">
                            <figure class="section-25__figure">
                                <img class="section-25__image" width="800" height="600" loading="lazy"
                                    src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&q=80"
                                    alt="Prato gourmet com ingredientes aromáticos que representam o perfil sensorial do produto">
                            </figure>
                            <div class="section-25__body">
                                <h2 class="section-25__title">Aroma frutado,<br>sabor inigualável</h2>
                                <p class="section-25__description">No nariz, notas de frutas tropicais, especiarias
                                    suaves e um toque de mel. Na boca, a entrada é redonda e envolvente, com final longo
                                    e persistente. Um perfil sensorial equilibrado que agrada tanto apreciadores
                                    experientes quanto quem descobre o mundo dos destilados pela primeira vez.</p>
                                <span class="section-25__location"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>`,
        css: `<style>
    .section-25 {
        --s25-color-brand: #7b1d2e;
        --s25-color-bg: #faf7f2;
        --s25-color-tab-bg: #f0ebe3;
        --s25-color-text: #2c1a12;
        --s25-color-muted: #6b5044;
        --s25-color-border: #d9cfc4;
    }

    .section-25__radio {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
    }

    .section-25 {
        background-color: var(--s25-color-bg);
        padding: 2rem 1rem;
        font-family: Georgia, serif;
        position: relative;
    }

    .section-25-container {
        width: 100%;
        margin-inline: auto;
    }

    .section-25__nav {
        display: flex;
        border-bottom: 2px solid var(--s25-color-border);
        overflow-x: auto;
        scrollbar-width: none;
    }

    .section-25__nav::-webkit-scrollbar {
        height: 0;
    }

    .section-25__tab-label {
        flex: 1 0 auto;
        min-width: 7rem;
        padding: 0.75rem 1rem;
        font-size: clamp(0.8rem, 1.5vw, 0.9rem);
        font-family: Arial, sans-serif;
        color: var(--s25-color-muted);
        background-color: var(--s25-color-tab-bg);
        border: 1px solid var(--s25-color-border);
        border-bottom: none;
        cursor: pointer;
        text-align: center;
        white-space: nowrap;
        transition: background-color 0.2s, color 0.2s;
        user-select: none;
    }

    .section-25__panels {
        border: 1px solid var(--s25-color-border);
        border-top: none;
        background-color: #ffffff;
    }

    .section-25__panel {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
        scroll-margin-top: 0;
    }

    .section-25__split {
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    .section-25__figure {
        width: 100%;
        margin: 0;
        aspect-ratio: 4/3;
        overflow: hidden;
    }

    .section-25__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .section-25__body {
        padding: 1.5rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: start;
    }

    .section-25__title {
        font-size: clamp(1.25rem, 3vw, 1.75rem);
        color: var(--s25-color-brand);
        line-height: 1.3;
        margin: 0;
        font-weight: 700;
    }

    .section-25__description {
        font-size: clamp(0.875rem, 1.5vw, 1rem);
        color: var(--s25-color-text);
        line-height: 1.7;
        margin: 0;
        font-family: Arial, sans-serif;
    }

    .section-25__location {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: clamp(0.8rem, 1.2vw, 0.875rem);
        color: var(--s25-color-brand);
        font-family: Arial, sans-serif;
    }

    #s25-tab1:checked~.section-25-container .section-25__tab-label[for="s25-tab1"],
    #s25-tab2:checked~.section-25-container .section-25__tab-label[for="s25-tab2"],
    #s25-tab3:checked~.section-25-container .section-25__tab-label[for="s25-tab3"],
    #s25-tab4:checked~.section-25-container .section-25__tab-label[for="s25-tab4"] {
        background-color: var(--s25-color-brand);
        color: #ffffff;
        border-color: var(--s25-color-brand);
    }

    #s25-tab1:checked~.section-25-container .section-25__panel--1,
    #s25-tab2:checked~.section-25-container .section-25__panel--2,
    #s25-tab3:checked~.section-25-container .section-25__panel--3,
    #s25-tab4:checked~.section-25-container .section-25__panel--4 {
        position: static;
        width: auto;
        height: auto;
        overflow: visible;
        opacity: 1;
        pointer-events: auto;
    }

    @media (min-width: 768px) {
        .section-25-container {
            max-width: 768px;
        }

        .section-25__split {
            flex-direction: row;
        }

        .section-25__figure {
            flex: 0 0 45%;
            aspect-ratio: 4/3;
        }

        .section-25__body {
            flex: 1;
            padding: 2rem 1.5rem;
            justify-content: center;
        }

        .section-25__split--reverse {
            flex-direction: row-reverse;
        }
    }

    @media (min-width: 992px) {
        .section-25-container {
            max-width: 992px;
        }

        .section-25__figure {
            flex: 0 0 42%;
        }

        .section-25__body {
            padding: 2rem;
        }
    }

    @media (min-width: 1200px) {
        .section-25-container {
            max-width: 1200px;
        }
    }

    @media (min-width: 1400px) {
        .section-25-container {
            max-width: 1400px;
        }
    }
</style>`
    }
);
