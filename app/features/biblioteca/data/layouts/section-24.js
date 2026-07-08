// @ts-nocheck
SenkoLib.registerLayout(
{
  id: "section-24",
  name: "Section-24",
  tags: ["split", "adaptativo", "24"],
  html: `<section class="section-24" aria-labelledby="section-24-title">
    <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-1"
        aria-label="Mostrar imagem de visão geral" checked>
    <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-2"
        aria-label="Mostrar imagem de detalhe">
    <input class="section-24__input" type="radio" name="section-24-view" id="section-24-view-3"
        aria-label="Mostrar imagem de uso">

    <article class="section-24__container">
        <section class="section-24__content" aria-labelledby="section-24-title">
            <nav class="section-24__options" aria-label="Escolha a imagem exibida">
                <label class="section-24__button section-24__button--one" for="section-24-view-1">
                    <span class="section-24__button-title">26 dentes fixos</span>
                    <span class="section-24__button-text">Recolhe folhas, grama solta e resíduos leves com mais
                        praticidade.</span>
                </label>

                <label class="section-24__button section-24__button--two" for="section-24-view-2">
                    <span class="section-24__button-title">Plástico resistente</span>
                    <span class="section-24__button-text">Polipropileno de alta resistência, leve para usar e feito para
                        durar.</span>
                </label>

                <label class="section-24__button section-24__button--three" for="section-24-view-3">
                    <span class="section-24__button-title">Cabo de 120 cm</span>
                    <span class="section-24__button-text">Madeira renovável com acabamento envernizado e toque mais
                        liso.</span>
                </label>
            </nav>
        </section>

        <figure class="section-24__visual" aria-label="Imagens alternáveis do produto">
            <div class="section-24__frame">
                <!-- IMG 1-->
                <div class="section-24__panel section-24__panel--one">
                    <img class="section-24__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-uso-gramado-509702-03.webp"
                        width="1200" height="900" loading="lazy" alt="Imagem de visão geral do produto"
                        decoding="async">
                </div>
                <!-- IMG 2-->
                <div class="section-24__panel section-24__panel--two">
                    <img class="section-24__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-conjunto-ferramentas-509702-02.webp"
                        width="1200" height="900" loading="lazy" alt="Imagem aproximada do acabamento do produto"
                        decoding="async">
                </div>
                <!-- IMG 3-->
                <div class="section-24__panel section-24__panel--three">
                    <img class="section-24__image"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/vassoura-jardim-tramontina-plastica-laranja-cabo-madeira-lifestyle-509702-01.webp"
                        width="1200" height="900" loading="lazy" alt="Imagem do produto em contexto de uso"
                        decoding="async">
                </div>
            </div>

            <figcaption class="section-24__caption">
                <span class="section-24__message section-24__message--one">Mais alcance sobre folhas e resíduos
                    leves.</span>
                <span class="section-24__message section-24__message--two">Leveza e resistência para a rotina do
                    jardim.</span>
                <span class="section-24__message section-24__message--three">Cabo longo, toque liso e acabamento
                    envernizado.</span>
            </figcaption>
        </figure>
    </article>
</section>`,
  css: `<style>
    * {
        margin: 0;
        padding: 0;
    }

    .section-24 {
        --s24-color-brand: #ff9900;
        --s24-color-ink: #202124;
        --s24-color-muted: #62666d;
        --s24-color-soft: #f4f5f2;
        --s24-color-surface: #ffffff;
        --s24-color-line: #d9ddd3;
        --s24-color-brand-soft: #fff2d9;
        --s24-color-brand-strong: #9c5d00;
        width: 100%;
        margin: 0;
        padding: 2rem 1rem;
        color: var(--s24-color-ink);
        background: var(--s24-color-soft);
        font-family: Arial, Helvetica, sans-serif;
    }

    .section-24,
    .section-24__input,
    .section-24__container,
    .section-24__content,
    .section-24__options,
    .section-24__button,
    .section-24__visual,
    .section-24__frame,
    .section-24__panel,
    .section-24__image,
    .section-24__caption,
    .section-24__message {
        box-sizing: border-box;
    }

    .section-24__input {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
    }

    .section-24__container {
        width: 100%;
        display: grid;
        gap: 1.5rem;
        align-items: start;
    }

    .section-24__content {
        width: 100%;
        display: grid;
        gap: 1rem;
        align-items: start;
    }

    .section-24__button-title,
    .section-24__button-text,
    .section-24__message {
        margin: 0;
        min-width: 0;
        overflow-wrap: anywhere;
    }

    .section-24__options {
        width: 100%;
        display: grid;
        gap: 1rem;
        align-items: start;
        margin-top: 0.5rem;
    }

    .section-24__button {
        position: relative;
        width: 100%;
        display: grid;
        gap: 0.5rem;
        align-items: start;
        padding: 1rem;
        border: 1px solid var(--s24-color-line);
        border-radius: 0.5rem;
        color: var(--s24-color-ink);
        background: var(--s24-color-surface);
        cursor: pointer;
        overflow: hidden;
        transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease, transform 180ms ease;
    }

    .section-24__button::before {
        position: absolute;
        top: 0.5rem;
        bottom: 0.5rem;
        left: 0;
        width: 0.25rem;
        border-radius: 0 0.5rem 0.5rem 0;
        background: var(--s24-color-brand);
        content: "";
        opacity: 0;
        transform: scaleY(0.4);
        transform-origin: center;
        transition: opacity 180ms ease, transform 180ms ease;
    }

    .section-24__button:hover {
        border-color: var(--s24-color-brand);
        box-shadow: 0 0.5rem 1.5rem rgba(32, 33, 36, 0.1);
        transform: translateY(-0.125rem);
    }

    .section-24__button:active {
        transform: scale(0.99);
    }

    .section-24__button-title {
        position: relative;
        z-index: 1;
        font-size: clamp(1rem, 2.7vw, 1.1875rem);
        font-weight: 800;
        line-height: 1.25;
        transition: color 180ms ease;
    }

    .section-24__button-text {
        position: relative;
        z-index: 1;
        color: var(--s24-color-muted);
        font-size: clamp(0.875rem, 2.3vw, 1rem);
        line-height: 1.45;
    }

    .section-24__visual {
        width: 100%;
        margin: 0;
        display: grid;
        gap: 1rem;
        align-items: start;
    }

    .section-24__frame {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        border: 1px solid var(--s24-color-line);
        border-radius: 0.5rem;
        background: var(--s24-color-surface);
        box-shadow: 0 1rem 2rem rgba(32, 33, 36, 0.08);
    }

    .section-24__panel {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        pointer-events: none;
        transform: translateY(0.5rem);
        transition: opacity 220ms ease, transform 220ms ease;
    }

    .section-24__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: saturate(0.92);
        transform: scale(1.04);
        transition: filter 420ms ease, transform 420ms ease;
    }

    .section-24__caption {
        position: relative;
        min-height: 4rem;
        padding: 1rem;
        border-left: 0.25rem solid var(--s24-color-brand);
        border-radius: 0.5rem;
        color: var(--s24-color-ink);
        background: var(--s24-color-surface);
        box-shadow: 0 0.5rem 1rem rgba(32, 33, 36, 0.06);
    }

    .section-24__message {
        position: absolute;
        inset: 1rem;
        color: var(--s24-color-ink);
        font-size: clamp(0.875rem, 2.2vw, 1rem);
        font-weight: 700;
        line-height: 1.4;
        opacity: 0;
        transform: translateY(0.5rem);
        transition: opacity 180ms ease, transform 180ms ease;
    }

    #section-24-view-1:checked~.section-24__container .section-24__panel--one,
    #section-24-view-2:checked~.section-24__container .section-24__panel--two,
    #section-24-view-3:checked~.section-24__container .section-24__panel--three {
        z-index: 2;
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
    }

    #section-24-view-1:checked~.section-24__container .section-24__panel--one .section-24__image,
    #section-24-view-2:checked~.section-24__container .section-24__panel--two .section-24__image,
    #section-24-view-3:checked~.section-24__container .section-24__panel--three .section-24__image {
        filter: saturate(1);
        transform: scale(1);
    }

    #section-24-view-1:checked~.section-24__container .section-24__message--one,
    #section-24-view-2:checked~.section-24__container .section-24__message--two,
    #section-24-view-3:checked~.section-24__container .section-24__message--three {
        opacity: 1;
        transform: translateY(0);
    }

    #section-24-view-1:checked~.section-24__container .section-24__button--one,
    #section-24-view-2:checked~.section-24__container .section-24__button--two,
    #section-24-view-3:checked~.section-24__container .section-24__button--three {
        border-color: var(--s24-color-brand);
        background: var(--s24-color-brand-soft);
        box-shadow: 0 0.5rem 1.5rem rgba(32, 33, 36, 0.12), inset 0 0 0 2px var(--s24-color-brand);
        transform: translateY(-0.125rem);
    }

    #section-24-view-1:checked~.section-24__container .section-24__button--one::before,
    #section-24-view-2:checked~.section-24__container .section-24__button--two::before,
    #section-24-view-3:checked~.section-24__container .section-24__button--three::before {
        opacity: 1;
        transform: scaleY(1);
    }

    #section-24-view-1:checked~.section-24__container .section-24__button--one .section-24__button-title,
    #section-24-view-2:checked~.section-24__container .section-24__button--two .section-24__button-title,
    #section-24-view-3:checked~.section-24__container .section-24__button--three .section-24__button-title {
        color: var(--s24-color-brand-strong);
    }

    #section-24-view-1:focus-visible~.section-24__container .section-24__button--one,
    #section-24-view-2:focus-visible~.section-24__container .section-24__button--two,
    #section-24-view-3:focus-visible~.section-24__container .section-24__button--three {
        outline: 2px solid var(--s24-color-brand);
        outline-offset: 4px;
    }

    @media (min-width: 576px) {

        .section-24__container {
            gap: 2rem;
        }
    }

    @media (min-width: 768px) {

        .section-24__container {
            grid-template-columns: minmax(0, 1fr);
            gap: .5rem;
        }

        .section-24__content {
            order: 2;
        }

        .section-24__visual {
            order: 1;
        }

        .section-24__options {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .section-24__button-title {
            font-size: clamp(0.875rem, 1.8vw, 1rem);
        }

        .section-24__button-text {
            font-size: clamp(0.75rem, 1.6vw, 0.875rem);
        }

        .section-24__frame {
            aspect-ratio: 16 / 9;
        }
    }

    @media (min-width: 992px) {

        .section-24__container {
            grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
            gap: 3rem;
        }

        .section-24__content {
            order: 1;
            align-self: center;
        }

        .section-24__visual {
            order: 2;
        }

        .section-24--reverse .section-24__content {
            order: 2;
        }

        .section-24--reverse .section-24__visual {
            order: 1;
        }

        .section-24__options {
            grid-template-columns: minmax(0, 1fr);
        }

        .section-24__button {
            padding: 1.5rem;
        }

        .section-24__button-title {
            font-size: clamp(1rem, 2.7vw, 1.1875rem);
        }

        .section-24__button-text {
            font-size: clamp(0.875rem, 2.3vw, 1rem);
        }
    }

    @media (min-width: 1200px) {
        .section-24__container {
            gap: 3rem;
        }

        .section-24__frame {
            aspect-ratio: 16 / 9;
        }
    }
</style>`
}
);
