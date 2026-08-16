// @ts-nocheck
SenkoLib.registerLayout(
    {
        id: 'section-26',
        name: 'Section-26',
        tags: ['Split', 'interativo', '21', 'animado'],
        html: `        <section class="section-26-container section-anchor" id="funcoes-3-em-1"
            aria-label="Funções 3 em 1 do aparelho">
            <input class="section-26__switcher-control" id="function-sandwich" type="radio" name="section-26__switcher"
                aria-label="Selecionar função Sanduicheira" checked>
            <input class="section-26__switcher-control" id="function-grill" type="radio" name="section-26__switcher"
                aria-label="Selecionar função Grill">
            <input class="section-26__switcher-control" id="function-plate" type="radio" name="section-26__switcher"
                aria-label="Selecionar função Chapa">

            <div class="section-26 is-reverse">
                <div class="section-26__content">
                    <h2 class="section-26__title">Um aparelho, três funções</h2>
                    <p class="section-26__desc">Selecione uma função para conhecer as possibilidades do aparelho.</p>

                    <div class="section-26__switcher">
                        <div class="section-26__switcher-tabs" role="group" aria-label="Escolha uma função do aparelho">
                            <label class="section-26__switcher-tab section-26__switcher-tab--sandwich"
                                for="function-sandwich">Sanduicheira</label>
                            <label class="section-26__switcher-tab section-26__switcher-tab--grill"
                                for="function-grill">Grill</label>
                            <label class="section-26__switcher-tab section-26__switcher-tab--plate"
                                for="function-plate">Chapa</label>
                        </div>

                        <div class="section-26__switcher-panels">
                            <div class="section-26__switcher-panel section-26__switcher-panel--sandwich">
                                <h3 class="section-26__switcher-panel-title">Sanduíches para diferentes momentos</h3>
                                <p class="section-26__switcher-panel-text">Permite preparar sanduíches e mistos com
                                    contato entre as chapas.</p>
                            </div>

                            <div class="section-26__switcher-panel section-26__switcher-panel--grill">
                                <h3 class="section-26__switcher-panel-title">Grelhados com mais possibilidades</h3>
                                <p class="section-26__switcher-panel-text">Pode ser utilizado no preparo de
                                    hambúrgueres, peixes e outros grelhados.</p>
                            </div>

                            <div class="section-26__switcher-panel section-26__switcher-panel--plate">
                                <h3 class="section-26__switcher-panel-title">Chapa lisa para variar as receitas</h3>
                                <p class="section-26__switcher-panel-text">A chapa lisa inferior permite preparar ovos,
                                    omeletes, tapiocas e pão na chapa.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="section-26__image-wrapper">
                    <img class="section-26__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/press-grill-mondial-master-press-pg-01-cl-grelhando-carne-e-legumes-preto-inox-2224740-2224741-02.webp"
                        alt="Imagem ilustrativa dos recursos práticos do Grill Mondial Master Press" />
                </div>
            </div>
        </section>`,
        css: `<style>
    /* ============ COMPARTILHADO: .section-26 (usado em #funcoes-3-em-1 E #preparos) ============ */
    .section-26-container {
        background-color: #b8321f;
        padding: 1.5rem;
        box-sizing: border-box;

        margin: 0 auto;
        width: 92%;
        border-radius: 1.5rem;
    }

    .section-26 {
        display: flex;
        flex-direction: column-reverse;
        gap: 1.25rem;
        margin: 0 auto;
        width: 100%;
        box-sizing: border-box;
    }

    .section-26__image-wrapper {
        width: 100%;
        flex-shrink: 0;
    }

    .section-26__image {
        margin: auto;
        border-radius: 16px;
        display: block;
        object-fit: cover;
        width: 100%;
        max-width: 530px;
        aspect-ratio: 16 / 9;
    }

    .section-26__content {
        display: flex;
        flex-direction: column;
        width: 95%;
        margin: auto;
        box-sizing: border-box;
    }

    .section-26__title {
        color: #fff8f4;
        font-size: 32px;
        font-weight: 600;
        line-height: 40px;
        margin: 0 0 1rem;
        text-align: left;
    }

    .section-26__desc {
        color: #fff8f4;
        font-size: 14px;
        line-height: 22px;
        margin: 0 0 1.5rem;
        text-align: left;
    }

    .section-26__feature-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        list-style: none;
        margin: 0;
        gap: 22px;
        padding: 0;
    }

    .section-26__feature-item {
        align-items: flex-start;
        display: flex;
        flex-direction: row;
        gap: 0.75rem;
    }

    .section-26__feature-item-icon {
        border-radius: 8px;
        flex-shrink: 0;
        height: 44px;
        object-fit: contain;
        width: 44px;
    }

    .section-26__feature-item-body {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
    }

    .section-26__feature-item-title {
        color: #fff9f6;
        font-size: 1.05rem;
        font-weight: 700;
        line-height: 1.35;
        margin: 0;
    }

    .section-26__feature-item-text {
        color: #fff9f6;
        font-size: 0.8125rem;
        line-height: 1.55;
        margin: 0;
    }

    /* ── NOVO: aspect-ratio e desc oculta no mobile ── */
    @media (max-width: 759px) {
        .section-26__image {
            aspect-ratio: 4 / 3;
        }
    }

    @media (min-width: 480px) {
        .section-26-container {
            padding: 1.75rem;
        }

        .section-26__feature-item-title {
            font-size: 1.1rem;
        }
    }

    @media (min-width: 768px) {
        .section-26-container {
            padding: 2rem;
        }

        .section-26 {
            max-width: 768px;
        }

        .section-26__image {
            border-radius: 20px;
            aspect-ratio: 16 / 9;
        }
    }

    @media (min-width: 760px) {
        .section-26 {
            align-items: center;
            flex-direction: row;
            gap: 1.5rem;
            justify-content: center;
            max-width: 960px;
        }

        .section-26--reverse {
            flex-direction: row-reverse;
        }

        .section-26__image-wrapper {
            flex: 0 0 48%;
            max-width: 48%;
        }

        .section-26__image {
            aspect-ratio: 4 / 3;
            height: 100%;
            max-height: 420px;
        }

        .section-26__content {
            flex: 1 1 0;
            min-width: 0;
        }

        .section-26__feature-list--icon-right .section-26__feature-item {
            flex-direction: row-reverse;
        }

        .section-26__feature-list--icon-right .section-26__feature-item-body {
            align-items: flex-end;
        }

        .section-26__feature-list--icon-right .section-26__feature-item-title,
        .section-26__feature-list--icon-right .section-26__feature-item-text {
            text-align: right;
        }

        .section-26__feature-item-icon {
            height: 48px;
            width: 48px;
        }

        .section-26__feature-item-title {
            font-size: 1.2rem;
        }

        .section-26__feature-item-text {
            font-size: 0.875rem;
        }
    }

    @media (min-width: 1060px) {
        .section-26 {
            max-width: 1060px;
            gap: 2rem;
        }

        .section-26__feature-list {
            gap: 1.25rem;
        }
    }

    @media (min-width: 1280px) {
        .section-26 {
            max-width: 1280px;
            gap: 2.5rem;
        }

        .section-26__image-wrapper {
            flex: 0 0 50%;
            max-width: 50%;
        }

        .section-26__image {
            max-height: 460px;
        }

        .section-26__feature-item-title {
            font-size: 1.3rem;
        }

        .section-26__feature-item-text {
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

    /* ============ SESSAO: #funcoes-3-em-1 - seletor de funcoes (.section-26__switcher, renomeado de .function-switcher) ============ */
    /* Seletor 3 em 1 */
    .section-26__switcher {
        width: 100%;
        display: grid;
        gap: 1rem;
    }

    .section-26__switcher-control {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
    }

    .section-26__switcher-tabs {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: .5rem;
    }

    .section-26__switcher-tab {
        min-height: 3rem;
        display: grid;
        place-items: center;
        padding: .7rem .55rem;
        border: 1px solid rgba(255, 255, 255, .42);
        border-radius: .85rem;
        color: #fff8f4;
        background: rgba(255, 255, 255, .08);
        cursor: pointer;
        font: 700 clamp(.72rem, 1.7vw, .9rem)/1.2 Roboto, Arial, sans-serif;
        text-align: center;
        transition: transform .22s ease, background-color .22s ease, color .22s ease;
    }

    .section-26__switcher-tab:hover {
        transform: translateY(-3px);
    }

    .section-26__switcher-panels {
        display: grid;
    }

    .section-26__switcher-panel {
        grid-area: 1 / 1;
        opacity: 0;
        pointer-events: none;
        transform: translateX(1rem);
        transition: opacity .3s ease, transform .3s ease;
    }

    .section-26__switcher-panel-title {
        margin: 0 0 .5rem;
        color: #fff8f4;
        font-size: 1.1rem;
        line-height: 1.3;
    }

    .section-26__switcher-panel-text {
        margin: 0;
        color: #fff8f4;
        font-size: .9rem;
        line-height: 1.65;
    }

    .section-26-container:has(#function-sandwich:checked) .section-26__switcher-tab--sandwich,
    .section-26-container:has(#function-grill:checked) .section-26__switcher-tab--grill,
    .section-26-container:has(#function-plate:checked) .section-26__switcher-tab--plate {
        color: #b8321f;
        background: #fff8f4;
        transform: translateY(-3px);
    }

    .section-26-container:has(#function-sandwich:checked) .section-26__switcher-panel--sandwich,
    .section-26-container:has(#function-grill:checked) .section-26__switcher-panel--grill,
    .section-26-container:has(#function-plate:checked) .section-26__switcher-panel--plate {
        opacity: 1;
        pointer-events: auto;
        transform: translateX(0);
    }

    /* ============ COMPARTILHADO: microinteracoes de imagem (.section-26__image, .section-3__image, .section-8__image) ============ */
    /* Microinterações gerais */
    .section-26__image {
        transition: transform .65s ease, filter .65s ease;
    }

    .section-26-container:hover .section-26__image {
        transform: scale(1.025);
        filter: saturate(1.04) contrast(1.02);
    }

    /* ============ COMPARTILHADO: animacao de entrada por scroll (.section-3, .section-26-container, .section-8, .recipe-strip, #faq-section) ============ */
    @supports (animation-timeline: view()) {

        .section-26-container {
            animation: section-reveal both linear;
            animation-timeline: view();
            animation-range: entry 5% cover 24%;
        }

        @keyframes section-reveal {
            from {
                opacity: 0;
                transform: translateY(2rem);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
</style>`
    }
);
