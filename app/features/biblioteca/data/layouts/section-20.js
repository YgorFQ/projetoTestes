// @ts-nocheck
SenkoLib.registerLayout(
{
  id: "section-20",
  name: "Section-20",
  tags: ["bullet points"],
  html: `<section class="section-10" aria-label="Principais características do adesivo">
    <article class="section-10__intro">
        <h2 class="section-10__title">Diferenciais para fixar com confiança</h2>
        <p class="section-10__text">
            Força de montagem, acabamento limpo e resistência para uso interno ou externo.
            Um adesivo para resolver mais aplicações com menos ferramentas.
        </p>
    </article>
    <div class="section-10__grid" aria-label="Lista de benefícios">
        <article class="section-10__item">
            <span class="section-10__marker" aria-hidden="true">✓</span>
            <p class="section-10__label">Nanotecnologia</p>
        </article>
        <article class="section-10__item">
            <span class="section-10__marker" aria-hidden="true">✓</span>
            <p class="section-10__label">Flexível</p>
        </article>
        <article class="section-10__item">
            <span class="section-10__marker" aria-hidden="true">✓</span>
            <p class="section-10__label">Agarre imediato</p>
        </article>
        <article class="section-10__item">
            <span class="section-10__marker" aria-hidden="true">✓</span>
            <p class="section-10__label">Resistente aos raios UV</p>
        </article>
        <article class="section-10__item">
            <span class="section-10__marker" aria-hidden="true">✓</span>
            <p class="section-10__label">Substitui pregos e parafusos</p>
        </article>
        <article class="section-10__item">
            <span class="section-10__marker" aria-hidden="true">✓</span>
            <p class="section-10__label">Uso interno e externo</p>
        </article>
        <article class="section-10__item">
            <span class="section-10__marker" aria-hidden="true">✓</span>
            <p class="section-10__label">Não escorre</p>
        </article>
        <article class="section-10__item">
            <span class="section-10__marker" aria-hidden="true">✓</span>
            <p class="section-10__label">Aceita pintura</p>
        </article>
    </div>
</section>`,
  css: `<style>
    .section-10 {
        padding: 1.5rem;
        box-sizing: border-box;
        font-family: sans-serif;
    }

    .section-10__intro {
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
        margin: 0 0 1.25rem;
    }

    .section-10__title {
        color: #222;
        font-size: 1.55rem;
        font-weight: 700;
        line-height: 1.18;
        margin: 0;
    }

    .section-10__text {
        color: #222;
        font-size: 0.95rem;
        line-height: 1.55;
        margin: 0;
    }

    .section-10__grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }

    .section-10__item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        min-height: 58px;
        padding: 0.9rem;
        box-sizing: border-box;
        border: 1px solid rgba(245, 197, 66, 0.24);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.08);
    }

    .section-10__marker {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 30px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #f5c542;
        color: #1f2422;
        font-size: 0.95rem;
        font-weight: 700;
        line-height: 1;
    }

    .section-10__label {
        color: #222;
        font-size: 0.95rem;
        font-weight: 700;
        line-height: 1.35;
        margin: 0;
    }

    @media (min-width: 576px) {
        .section-10 {
            padding: 1.75rem;
        }

        .section-10__grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 768px) {
        .section-10 {
            padding: 2rem;
        }

        .section-10__intro {
            max-width: 720px;
            margin: auto;
            margin-bottom: 1.5rem;
        }

        .section-10__title {
            font-size: 2rem;
        }
    }

    @media (min-width: 992px) {
        .section-10 {
            display: grid;
            grid-template-columns: 0.8fr 1.2fr;
            align-items: center;
            gap: 2rem;
        }

        .section-10__intro {
            margin-bottom: 0;
        }

        .section-10__grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1200px) {
        .section-10 {
            padding: 2.25rem;
        }

        .section-10__grid {
            gap: 0.9rem;
        }
    }

    @media (min-width: 1400px) {
        .section-10 {
            padding: 2.75rem 5rem;
        }
    }
</style>`
}
);
