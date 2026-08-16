// @ts-nocheck
SenkoLib.registerLayout(
{
    id: 'section-8',
    name: 'Section-8',
    tags: ['58', 'Split', 'Carrossel', 'interativo'],
    html: `        <section class="section-8 section-8--interactive">
            <div class="section-8__inner">
                <div class="section-8__tabs" role="radiogroup" aria-label="Escolha o benefício exibido">
                    <label class="section-8__tab section-8__tab--protection">
                        <input class="section-8__control section-8__control--protection" type="radio"
                            name="section-3-tabs-b" aria-label="Selecionar benefício Proteção 72h" checked>
                        <span class="section-8__tab-icon" aria-hidden="true">
                            <svg class="section-8__tab-icon-svg" viewBox="0 0 24 24" fill="none" focusable="false">
                                <path d="M12 3.5 19 6v5.5c0 4.4-2.8 7.8-7 9.4-4.2-1.6-7-5-7-9.4V6l7-2.5Z"
                                    stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                                <path d="m9 12 2 2 4-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span class="section-8__tab-text">Proteção 72h</span>
                    </label>

                    <label class="section-8__tab section-8__tab--care">
                        <input class="section-8__control section-8__control--care" type="radio" name="section-3-tabs-b"
                            aria-label="Selecionar benefício Cuidado completo">
                        <span class="section-8__tab-icon" aria-hidden="true">
                            <svg class="section-8__tab-icon-svg" viewBox="0 0 24 24" fill="none" focusable="false">
                                <path d="M12 3.5c4 4.8 6 8.2 6 11.1a6 6 0 0 1-12 0c0-2.9 2-6.3 6-11.1Z"
                                    stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span class="section-8__tab-text">Cuidado completo</span>
                    </label>

                    <label class="section-8__tab section-8__tab--fragrance">
                        <input class="section-8__control section-8__control--fragrance" type="radio"
                            name="section-3-tabs-b" aria-label="Selecionar benefício Fragrância NIVEA Creme">
                        <span class="section-8__tab-icon" aria-hidden="true">
                            <svg class="section-8__tab-icon-svg" viewBox="0 0 24 24" fill="none" focusable="false">
                                <path d="M20 5c-8.2.3-13 4.4-15 12.5 4.8-.8 9.2-3.7 15-12.5Z" stroke="currentColor"
                                    stroke-width="1.8" stroke-linejoin="round" />
                                <path d="M5 18c3-4.1 6.4-6.8 10.4-8.2" stroke="currentColor" stroke-width="1.8"
                                    stroke-linecap="round" />
                            </svg>
                        </span>
                        <span class="section-8__tab-text">Fragrância NIVEA Creme</span>
                    </label>

                    <label class="section-8__tab section-8__tab--application">
                        <input class="section-8__control section-8__control--application" type="radio"
                            name="section-3-tabs-b" aria-label="Selecionar benefício Aplicação prática">
                        <span class="section-8__tab-icon" aria-hidden="true">
                            <svg class="section-8__tab-icon-svg" viewBox="0 0 24 24" fill="none" focusable="false">
                                <path d="M9 8h6v12H9V8Z" stroke="currentColor" stroke-width="1.8"
                                    stroke-linejoin="round" />
                                <path d="M10.5 4h3L15 8H9l1.5-4Z" stroke="currentColor" stroke-width="1.8"
                                    stroke-linejoin="round" />
                                <path d="M12 11v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                            </svg>
                        </span>
                        <span class="section-8__tab-text">Aplicação prática</span>
                    </label>
                </div>

                <div class="section-8__viewport">
                    <div class="section-8__panel section-8__panel--protection" role="group"
                        aria-labelledby="section-3-b-title-protection">
                        <figure class="section-8__media">
                            <img class="section-8__image" width="1600" height="650" loading="lazy" decoding="async"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/desodorante-aerossol-feminino-nivea-protect-care-embalagem-economica-72h-208142-01-1.webp"
                                alt="Desodorante NIVEA Protect Care com destaque para proteção de 72 horas">
                        </figure>
                        <div class="section-8__content">
                            <h2 class="section-8__title" id="section-3-b-title-protection">Proteção que acompanha o dia
                            </h2>
                            <span class="section-8__rule" aria-hidden="true"></span>
                            <p class="section-8__copy">
                                Protege contra suor e mau odor por até 72 horas, mantendo a sensação de cuidado por mais
                                tempo.
                            </p>
                        </div>
                    </div>

                    <div class="section-8__panel section-8__panel--care" role="group"
                        aria-labelledby="section-3-b-title-care">
                        <figure class="section-8__media">
                            <img class="section-8__image" width="1200" height="800" loading="lazy" decoding="async"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/208143_03.webp"
                                alt="Mulher com os braços levantados representando axilas bem cuidadas">
                        </figure>
                        <div class="section-8__content">
                            <h2 class="section-8__title" id="section-3-b-title-care">Cuidado completo para as axilas
                            </h2>
                            <span class="section-8__rule" aria-hidden="true"></span>
                            <p class="section-8__copy">
                                Fórmula com o melhor do NIVEA Creme, que cuida da pele enquanto protege contra suor e
                                mau odor.
                            </p>
                        </div>
                    </div>

                    <div class="section-8__panel section-8__panel--fragrance" role="group"
                        aria-labelledby="section-3-b-title-fragrance">
                        <figure class="section-8__media">
                            <img class="section-8__image" width="1200" height="800" loading="lazy" decoding="async"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/208143_03.webp"
                                alt="Mulher demonstrando sensação de cuidado com fragrância NIVEA Creme">
                        </figure>
                        <div class="section-8__content">
                            <h2 class="section-8__title" id="section-3-b-title-fragrance">Fragrância NIVEA Creme</h2>
                            <span class="section-8__rule" aria-hidden="true"></span>
                            <p class="section-8__copy">
                                Perfume clássico de cuidado, pensado para deixar uma sensação limpa e confortável após a
                                aplicação.
                            </p>
                        </div>
                    </div>

                    <div class="section-8__panel section-8__panel--application" role="group"
                        aria-labelledby="section-3-b-title-application">
                        <figure class="section-8__media">
                            <img class="section-8__image" width="1200" height="800" loading="lazy" decoding="async"
                                src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/208143_02.webp"
                                alt="Desodorante NIVEA Protect Care aplicado na axila">
                        </figure>
                        <div class="section-8__content">
                            <h2 class="section-8__title" id="section-3-b-title-application">Aplicação rápida e prática
                            </h2>
                            <span class="section-8__rule" aria-hidden="true"></span>
                            <p class="section-8__copy">
                                Aplique nas axilas a 15 cm de distância e espere secar antes de se vestir.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="section-8__dots" aria-hidden="true">
                    <span class="section-8__dot section-8__dot--protection" aria-hidden="true"></span>
                    <span class="section-8__dot section-8__dot--care" aria-hidden="true"></span>
                    <span class="section-8__dot section-8__dot--fragrance" aria-hidden="true"></span>
                    <span class="section-8__dot section-8__dot--application" aria-hidden="true"></span>
                </div>
            </div>
        </section>`,
    css: `<style>
    .section-8 {
        --s3-color-brand: #003da5;
        --s3-color-ink: #081844;
        --s3-color-muted: #5b6682;
        --s3-color-soft: #dfeaff;
        --s3-color-line: #dbe5f4;
        --s3-color-surface: #ffffff;
        width: 100%;
        position: relative;
        padding: 0 1rem 1.5rem;
        font-family: Roboto, Arial, sans-serif;
        color: var(--s3-color-ink);
        overflow-wrap: anywhere;
    }

    .section-8__control {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
        transform: translate(-50%, -50%);
    }

    .section-8__inner {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        align-items: start;
        gap: 1rem;
        padding: 1rem;
        overflow: hidden;
        border: 1px solid rgba(8, 24, 68, 0.08);
        border-radius: 1.5rem;
        background: var(--s3-color-surface);
        box-shadow: 0 1rem 2.5rem rgba(3, 33, 82, 0.1);
    }

    .section-8__tabs {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

    .section-8__tab {
        min-height: 3.5rem;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid var(--s3-color-line);
        border-radius: 999px;
        background: var(--s3-color-surface);
        color: var(--s3-color-brand);
        cursor: pointer;
        transition: background-color 240ms ease, border-color 240ms ease, color 240ms ease, transform 240ms ease;
    }

    .section-8__tab-icon {
        width: 1.75rem;
        height: 1.75rem;
        flex: 0 0 1.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .section-8__tab-icon-svg {
        width: 1.5rem;
        height: 1.5rem;
        display: block;
    }

    .section-8__tab-text {
        color: currentColor;
        font-size: clamp(0.875rem, 1.8vw, 1rem);
        font-weight: 700;
        line-height: 1.4;
        text-align: center;
    }

    .section-8__viewport {
        width: 100%;
        display: grid;
        align-items: center;
        overflow: hidden;
        order: -2;
        border-radius: 1.5rem;
        background: var(--s3-color-brand);
    }

    .section-8__panel {
        width: 100%;
        grid-area: 1 / 1;
        display: grid;
        grid-template-columns: 1fr;
        align-items: start;
        opacity: 0;
        pointer-events: none;
        transform: translateX(1rem);
        transition: opacity 320ms ease, transform 320ms ease;
    }

    .section-8__media {
        width: 100%;
        margin: 0;
        aspect-ratio: 4 / 3;
    }

    .section-8__image {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
    }

    .section-8__content {
        min-width: 0;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        padding: 2rem;
        background: linear-gradient(135deg, #0849ba 0%, var(--s3-color-brand) 100%);
    }

    .section-8__title {
        color: var(--s3-color-surface);
        font-size: clamp(1.75rem, 4.2vw, 2.625rem);
        font-weight: 400;
        line-height: 1.18;
        margin: 0;
        text-wrap: balance;
    }

    .section-8__rule {
        width: 4rem;
        height: 0.125rem;
        margin: 1.5rem 0;
        border-radius: 999px;
        background: var(--s3-color-soft);
    }

    .section-8__copy {
        color: var(--s3-color-soft);
        font-size: clamp(0.9375rem, 2vw, 1.125rem);
        font-weight: 400;
        line-height: 1.7;
        margin: 0;
        text-wrap: pretty;
    }

    .section-8__dots {
        display: flex;
        align-items: center;
        justify-content: center;
        order: -1;
        gap: 1rem;
        margin: 0.5rem 0 0;
    }

    .section-8__dot {
        width: 1rem;
        height: 1rem;
        position: relative;
        border: 1px solid var(--s3-color-brand);
        border-radius: 50%;
        background: var(--s3-color-surface);
        transition: background-color 240ms ease, transform 240ms ease;
    }

    .section-8:has(.section-8__control--protection:checked) .section-8__tab--protection,
    .section-8:has(.section-8__control--care:checked) .section-8__tab--care,
    .section-8:has(.section-8__control--fragrance:checked) .section-8__tab--fragrance,
    .section-8:has(.section-8__control--application:checked) .section-8__tab--application {
        border-color: var(--s3-color-brand);
        background: var(--s3-color-brand);
        color: var(--s3-color-surface);
        transform: translateY(-0.5rem);
    }

    .section-8__tab:has(.section-8__control:focus-visible) {
        outline: 0.125rem solid var(--s3-color-brand);
        outline-offset: 0.25rem;
    }

    .section-8:has(.section-8__control--protection:checked) .section-8__panel--protection,
    .section-8:has(.section-8__control--care:checked) .section-8__panel--care,
    .section-8:has(.section-8__control--fragrance:checked) .section-8__panel--fragrance,
    .section-8:has(.section-8__control--application:checked) .section-8__panel--application {
        opacity: 1;
        pointer-events: auto;
        transform: translateX(0);
        z-index: 1;
    }

    .section-8:has(.section-8__control--protection:checked) .section-8__dot--protection,
    .section-8:has(.section-8__control--care:checked) .section-8__dot--care,
    .section-8:has(.section-8__control--fragrance:checked) .section-8__dot--fragrance,
    .section-8:has(.section-8__control--application:checked) .section-8__dot--application {
        background: var(--s3-color-brand);
        transform: scale(1.25);
    }

    @media (min-width: 576px) {
        .section-8 {
            padding: 0 1.5rem 1.5rem;
        }

        .section-8__tabs {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (min-width: 768px) {
        .section-8 {
            padding: 0 2rem 1.5rem;
        }

        .section-8__inner {
            gap: 1.5rem;
            padding: 1.5rem;
        }

        .section-8__panel {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        }

        .section-8__panel--care,
        .section-8__panel--application {
            direction: rtl;
        }

        .section-8__panel--care .section-8__media,
        .section-8__panel--care .section-8__content,
        .section-8__panel--application .section-8__media,
        .section-8__panel--application .section-8__content {
            direction: ltr;
        }

        .section-8__media {
            height: 100%;
            aspect-ratio: auto;
        }

        .section-8__content {
            min-height: 24rem;
            padding: 3rem;
        }
    }

    @media (min-width: 992px) {
        .section-8 {
            padding: 0 2.5rem 1.5rem;
        }

        .section-8__tabs {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
    }

    @media (min-width: 1200px) {
        .section-8 {
            padding: 0 3rem 1.5rem;
        }
    }

    @media (min-width: 1400px) {
        .section-8 {
            padding: 0 3rem 1.5rem;
        }
    }
</style>`
}
);
