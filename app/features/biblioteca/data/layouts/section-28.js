// @ts-nocheck
SenkoLib.registerLayout(
{
    id: 'section-28',
    name: 'Section-28',
    tags: ['full width', 'interativo', '28', 'responsivo'],
    html: `        <section class="section-28" aria-labelledby="section-8-title">
            <h2 class="section-28__title-accessible" id="section-8-title">
                Benefícios do NIVEA Protect Care
            </h2>
            <div class="section-28__inner">
                <div class="section-28__tabs" role="radiogroup" aria-label="Benefícios do NIVEA Protect Care">
                    <div class="section-28__option">
                        <input class="section-28__control section-28__control--protection"
                            id="section-8-control-protection" type="radio" name="section-8-tabs" checked>
                        <label class="section-28__tab section-28__tab--protection" for="section-8-control-protection">
                            <span class="section-28__tab-text">Proteção 72h</span>
                        </label>
                    </div>
                    <div class="section-28__option">
                        <input class="section-28__control section-28__control--care" id="section-8-control-care"
                            type="radio" name="section-8-tabs">
                        <label class="section-28__tab section-28__tab--care" for="section-8-control-care">
                            <span class="section-28__tab-text">Cuidado completo</span>
                        </label>
                    </div>
                </div>
                <div class="section-28__viewport">
                    <div class="section-28__panel section-28__panel--protection">
                        <figure class="section-28__figure">
                            <picture>
                                <source media="(min-width: 768px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/desodorante-aerossol-feminino-nivea-protect-care-embalagem-economica-72h-208142-01-1.webp">
                                <img class="section-28__image" width="1600" height="650" loading="lazy" decoding="async"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/desodorante-aerossol-feminino-nivea-protect-care-embalagem-economica-72h-208142-01-1.webp"
                                    alt="Desodorante NIVEA Protect Care com destaque para proteção de 72 horas">
                            </picture>
                        </figure>
                        <div class="section-28__content">
                            <h3 class="section-28__title">
                                Proteção que acompanha o dia
                            </h3>
                            <span class="section-28__rule" aria-hidden="true"></span>
                            <p class="section-28__copy">
                                Protege contra suor e mau odor por até 72 horas, mantendo a sensação de cuidado por mais
                                tempo.
                            </p>
                        </div>
                    </div>
                    <div class="section-28__panel section-28__panel--care">
                        <figure class="section-28__figure">
                            <picture>
                                <source media="(min-width: 768px)"
                                    srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/208143_03.webp">
                                <img class="section-28__image" width="1200" height="800" loading="lazy" decoding="async"
                                    src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/208143_03.webp"
                                    alt="Mulher com os braços levantados representando axilas bem cuidadas">
                            </picture>
                        </figure>
                        <div class="section-28__content">
                            <h3 class="section-28__title">
                                Cuidado completo para as axilas
                            </h3>
                            <span class="section-28__rule" aria-hidden="true"></span>
                            <p class="section-28__copy">
                                Fórmula com o melhor do NIVEA Creme, que cuida da pele enquanto protege contra suor e
                                mau odor.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="section-28__dots" aria-hidden="true">
                    <span class="section-28__dot section-28__dot--protection"></span>
                    <span class="section-28__dot section-28__dot--care"></span>
                </div>
            </div>
        </section>`,
    css: `        <style>
            .section-28 {
                --s8-color-brand: #003da5;
                --s8-color-ink: #081844;
                --s8-color-muted: #5b6682;
                --s8-color-soft: #dfeaff;
                --s8-color-line: #dbe5f4;
                --s8-color-surface: #ffffff;

                width: 100%;
                position: relative;
                padding: 0 1rem 1.5rem;
                font-family: Roboto, Arial, sans-serif;
                color: var(--s8-color-ink);
                overflow-wrap: anywhere;
            }

            .section-28__title-accessible {
                width: 1px;
                height: 1px;
                position: absolute;
                overflow: hidden;
                margin: 0;
                padding: 0;
                clip-path: inset(50%);
                white-space: nowrap;
            }

            .section-28__inner {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: start;
                gap: 1rem;
                padding: 1rem;
                overflow: hidden;
                border: 1px solid rgba(8, 24, 68, 0.08);
                border-radius: 1.5rem;
                background: var(--s8-color-surface);
                box-shadow: 0 1rem 2.5rem rgba(3, 33, 82, 0.1);
            }

            .section-28__tabs {
                width: 100%;
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                align-items: start;
                gap: 1rem;
                order: 1;
            }

            .section-28__option {
                min-width: 0;
                position: relative;
            }

            .section-28__control {
                position: absolute;
                width: 1px;
                height: 1px;
                opacity: 0;
                pointer-events: none;
            }

            .section-28__tab {
                width: 100%;
                min-height: 3.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                padding: 1rem;
                border: 1px solid var(--s8-color-line);
                border-radius: 999px;
                background: var(--s8-color-surface);
                color: var(--s8-color-brand);
                cursor: pointer;
                transition:
                    background-color 240ms ease,
                    border-color 240ms ease,
                    color 240ms ease,
                    transform 240ms ease;
            }

            .section-28__control:focus-visible+.section-28__tab {
                outline: 0.125rem solid var(--s8-color-brand);
                outline-offset: 0.25rem;
            }

            .section-28__tab-icon {
                width: 1.5rem;
                height: 1.5rem;
                flex: 0 0 1.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .section-28__tab-icon-svg {
                width: 1.5rem;
                height: 1.5rem;
                display: block;
            }

            .section-28__tab-text {
                min-width: 0;
                color: currentColor;
                font-size: clamp(0.75rem, 2.8vw, 0.9375rem);
                font-weight: 700;
                line-height: 1.3;
                text-align: center;
                overflow-wrap: anywhere;
            }

            .section-28__viewport {
                width: 100%;
                display: grid;
                align-items: start;
                overflow: hidden;
                border-radius: 1.5rem;
                background: var(--s8-color-surface);
            }

            .section-28__panel {
                width: 100%;
                min-width: 0;
                position: relative;
                grid-area: 1 / 1;
                display: flex;
                flex-direction: column;
                align-items: start;
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                transform: translateX(1rem);
                transition:
                    opacity 320ms ease,
                    transform 320ms ease,
                    visibility 0s linear 320ms;
            }

            .section-28__figure {
                width: 100%;
                margin: 0;
                overflow: hidden;
                border-radius: 1.5rem 1.5rem 0 0;
                background: var(--s8-color-soft);
            }

            .section-28__image {
                width: 100%;
                height: 100%;
                display: block;
                object-fit: cover;
            }

            /* MOBILE: caixa abaixo da imagem */

            .section-28__content {
                width: 100%;
                min-width: 0;
                display: flex;
                flex-direction: column;
                align-items: start;
                padding: 1.5rem;
                border: 1px solid var(--s8-color-line);
                border-top: 0;
                border-radius: 0 0 1.5rem 1.5rem;
                background: var(--s8-color-surface);
                overflow-wrap: anywhere;
            }

            .section-28__title {
                margin: 0;
                color: var(--s8-color-ink);
                font-size: clamp(1.25rem, 5vw, 1.75rem);
                font-weight: 500;
                line-height: 1.2;
                overflow-wrap: anywhere;
                text-wrap: balance;
            }

            .section-28__rule {
                width: 3rem;
                height: 0.125rem;
                margin: 1rem 0;
                border-radius: 999px;
                background: var(--s8-color-brand);
            }

            .section-28__copy {
                margin: 0;
                color: var(--s8-color-muted);
                font-size: clamp(0.875rem, 3.5vw, 1rem);
                font-weight: 400;
                line-height: 1.6;
                overflow-wrap: anywhere;
                text-wrap: pretty;
            }

            .section-28__dots {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
            }

            .section-28__dot {
                width: 1rem;
                height: 1rem;
                border: 1px solid var(--s8-color-brand);
                border-radius: 50%;
                background: var(--s8-color-surface);
                transition:
                    background-color 240ms ease,
                    transform 240ms ease;
            }

            .section-28:has(.section-28__control--protection:checked) .section-28__tab--protection,
            .section-28:has(.section-28__control--care:checked) .section-28__tab--care,
            .section-28:has(.section-28__control--fragrance:checked) .section-28__tab--fragrance,
            .section-28:has(.section-28__control--application:checked) .section-28__tab--application {
                border-color: var(--s8-color-brand);
                background: var(--s8-color-brand);
                color: var(--s8-color-surface);
                transform: translateY(-0.5rem);
            }

            .section-28:has(.section-28__control--protection:checked) .section-28__panel--protection,
            .section-28:has(.section-28__control--care:checked) .section-28__panel--care,
            .section-28:has(.section-28__control--fragrance:checked) .section-28__panel--fragrance,
            .section-28:has(.section-28__control--application:checked) .section-28__panel--application {
                opacity: 1;
                visibility: visible;
                pointer-events: auto;
                transform: translateX(0);
                transition-delay: 0s;
                z-index: 1;
            }

            .section-28:has(.section-28__control--protection:checked) .section-28__dot--protection,
            .section-28:has(.section-28__control--care:checked) .section-28__dot--care,
            .section-28:has(.section-28__control--fragrance:checked) .section-28__dot--fragrance,
            .section-28:has(.section-28__control--application:checked) .section-28__dot--application {
                background: var(--s8-color-brand);
                transform: scale(1.25);
            }

            @media (min-width: 576px) {
                .section-28 {
                    padding: 0 1.5rem 1.5rem;
                }

                .section-28__inner {
                    padding: 1.5rem;
                }

                .section-28__content {
                    padding: 2rem;
                }

                .section-28__tab-text {
                    font-size: clamp(0.875rem, 2vw, 1rem);
                }
            }

            @media (min-width: 768px) {
                .section-28 {
                    padding: 0 2rem 1.5rem;
                }

                .section-28__inner {
                    gap: 1.5rem;
                }

                .section-28__panel {
                    display: block;
                }

                .section-28__figure {
                    border-radius: 1.5rem;
                }

                /* DESKTOP: caixa totalmente contida dentro da imagem */

                .section-28__content {
                    width: min(38%, 28rem);
                    position: absolute;
                    overflow: auto;
                    padding: 1.5rem;
                    border: 1px solid var(--s8-color-line);
                    border-radius: 1.5rem;
                    background: var(--s8-color-surface);
                    box-shadow: 0 1rem 2.5rem rgba(3, 33, 82, 0.16);
                }

                .section-28__title {
                    font-size: clamp(1.375rem, 2.5vw, 2rem);
                }

                .section-28__copy {
                    font-size: clamp(0.875rem, 1.5vw, 1rem);
                }

                /* POSICIONAMENTO INDEPENDENTE DE CADA CAIXA */

                .section-28__panel--protection .section-28__content {
                    top: 10%;
                    left: 5%;
                }

                .section-28__panel--care .section-28__content {
                    top: 18%;
                    left: 52%;
                }
            }

            @media (min-width: 992px) {
                .section-28 {
                    padding: 0 2.5rem 1.5rem;
                }

                .section-28__tabs {
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                }

                .section-28__content {
                    width: min(36%, 28rem);
                    max-height: calc(100% - 4rem);
                    padding: 2rem;
                }
            }

            @media (min-width: 1200px) {
                .section-28 {
                    padding: 0 3rem 1.5rem;
                }

                .section-28__content {
                    width: min(34%, 28rem);
                    max-height: calc(100% - 6rem);
                }

            }

            @media (min-width: 1400px) {
                .section-28 {
                    padding: 0 3rem 1.5rem;
                }
            }
        </style>`
}
);
