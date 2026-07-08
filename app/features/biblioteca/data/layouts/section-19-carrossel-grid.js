// @ts-nocheck
SenkoLib.registerLayout(
{
  id: "section-19-carrossel-grid",
  name: "Section-19 (Carrossel Grid)",
  tags: ["carrossel", "grid", "section 19", "19"],
  html: `<input class="section-19__radio" type="radio" name="slide-19" id="s19-1" checked>
<input class="section-19__radio" type="radio" name="slide-19" id="s19-2">
<input class="section-19__radio" type="radio" name="slide-19" id="s19-3">
<div class="section-19">
    <section class="section-19__wrap" aria-label="Carrossel de aplicações do produto">
        <header class="section-19__header">
            <h3 class="section-19__title">Aplicações do Cabo Flexível Corfio 4,0 mm²</h3>
        </header>

        <div class="section-19__track" role="list">
            <article class="section-19__card" role="listitem">
                <img class="section-19__card-img"
                    src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/megatron/404517_04-2.png"
                    alt="Interior de uma obra em andamento com paredes de gesso cruas, tubulações expostas e luz do sol iluminando a poeira no ar"
                    width="310" height="220" loading="lazy">
                <div class="section-19__card-body">
                    <h4 class="section-19__card-title">Instalações Comerciais e Industriais</h4>
                    <p class="section-19__card-desc">Indicado para circuitos de distribuição de energia em
                        comércios, galpões, áreas técnicas e ambientes industriais, conforme o projeto elétrico</p>
                </div>
            </article>

            <article class="section-19__card" role="listitem">
                <img class="section-19__card-img"
                    src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/megatron/404517_04-1.png"
                    alt="Imagem propositalmente desfocada de uma recepção moderna, bem iluminada e com poltronas dispostas perto de janelas grandes"
                    width="310" height="220" loading="lazy">
                <div class="section-19__card-body">
                    <h4 class="section-19__card-title">Redes Residenciais e Prediais</h4>
                    <p class="section-19__card-desc">Aplicável em casas e prédios residenciais para circuitos
                        que exigem seção nominal de 4,0 mm² e condutor flexível de cobre</p>
                </div>
            </article>

            <article class="section-19__card" role="listitem">
                <img class="section-19__card-img"
                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/cabo-flexivel-corfio-aplicacao-cozinha-lifestyle-4203793-21.jpg"
                    alt="Ambiente de cozinha residencial com foco em balcão, sugerindo aplicação de cabos elétricos Corfio"
                    width="310" height="220" loading="lazy">
                <div class="section-19__card-body">
                    <h4 class="section-19__card-title">Cozinhas, Áreas de Serviço e Circuitos Específicos</h4>
                    <p class="section-19__card-desc">Pode atender circuitos específicos quando o projeto exigir
                        seção de 4,0 mm², respeitando carga, distância e método de instalação</p>
                </div>
            </article>
        </div>

        <nav class="section-19__nav" aria-label="Navegação do carrossel">
            <div class="section-19__btn-slot section-19__btn--prev">
                <span class="section-19__btn-disabled" aria-hidden="true">&#8592;</span>
                <label for="s19-1" aria-label="Slide anterior">&#8592;</label>
                <label for="s19-2" aria-label="Slide anterior">&#8592;</label>
            </div>

            <div class="section-19__dots" role="tablist" aria-label="Slides">
                <label class="section-19__dot" for="s19-1" role="tab" aria-label="Ir para slide 1"></label>
                <label class="section-19__dot" for="s19-2" role="tab" aria-label="Ir para slide 2"></label>
                <label class="section-19__dot" for="s19-3" role="tab" aria-label="Ir para slide 3"></label>
            </div>

            <div class="section-19__btn-slot section-19__btn--next">
                <label for="s19-2" aria-label="Próximo slide">&#8594;</label>
                <label for="s19-3" aria-label="Próximo slide">&#8594;</label>
                <span class="section-19__btn-disabled" aria-hidden="true">&#8594;</span>
            </div>
        </nav>
    </section>
</div>`,
  css: `<style>
    /* ── Tokens do section-19 ── */
    .section-19 {
        font-family: system-ui, sans-serif;
        width: 100%;
        background: #f3f5f7;
        overflow: hidden;
        border-top: 1px solid #e2e6ea;
        border-bottom: 1px solid #e2e6ea;
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
        color: #1d2430;
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
        border: 1px solid #dde2e8;
        box-shadow: 0 12px 30px rgba(28, 35, 52, .08);
        text-align: left;
        transform: scale(0.85);
        opacity: .38;
        transition: transform .44s cubic-bezier(.4, 0, .2, 1), opacity .44s ease, box-shadow .44s ease;
    }

    .section-19__card-img {
        width: 100%;
        object-fit: cover;
        display: block;
        border-bottom: 3px solid #ef8f22;
    }

    .section-19__card-body {
        padding: 16px 16px 18px;
    }

    .section-19__card-title {
        font-size: 1.05rem;
        font-weight: 700;
        line-height: 1.3;
        margin-bottom: 8px;
        color: #2f2f82;
    }

    .section-19__card-desc {
        font-size: 0.92rem;
        color: #586070;
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
        box-shadow: 0 18px 40px rgba(28, 35, 52, .12);
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
            box-shadow: 0 18px 40px rgba(28, 35, 52, .12);
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
            box-shadow: 0 18px 40px rgba(28, 35, 52, .12);
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
        background: #2f2f82;
        opacity: .35;
        cursor: pointer;
        transition: opacity .25s, width .3s, background .25s, border-radius .3s;
    }

    #s19-1:checked~.section-19 .section-19__dot[for="s19-1"],
    #s19-2:checked~.section-19 .section-19__dot[for="s19-2"],
    #s19-3:checked~.section-19 .section-19__dot[for="s19-3"] {
        opacity: 1;
        background: #ef8f22;
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
        background: #2f2f82;
        border: 1px solid rgba(47, 47, 130, .1);
        color: #fefefe;
        font-size: 17px;
        cursor: pointer;
        transition: background .2s, border-color .2s, transform .15s;
        user-select: none;
    }

    .section-19__btn-slot label:hover {
        background: #ef8f22;
        border-color: #ef8f22;
        transform: scale(1.1);
    }

    .section-19__btn-slot label:active {
        transform: scale(.93);
    }

    .section-19__btn-disabled {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #2f2f82;
        border: 1px solid rgba(47, 47, 130, .1);
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
</style>`
}
);
