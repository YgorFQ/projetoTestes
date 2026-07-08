// @ts-nocheck
SenkoLib.registerLayout(
{
  id: "section-16",
  name: "Section-16",
  tags: ["Alerta", "Ingredientes"],
  html: `    <section class="section-ingredients" aria-labelledby="ingredients-title">
      <div class="section-ingredients__inner">
        <h2 class="section-ingredients__title" id="ingredients-title">Ingredientes</h2>
        <p class="section-ingredients__text">
          Sal, pimenta-do-reino preta, coentro, cominho, orégano, cúrcuma, pimenta-calabresa, fécula de mandioca e
          antiumectante dióxido de silício.
        </p>
        <div class="section-ingredients__alert" role="alert" aria-live="polite">
          <span class="section-ingredients__alert-icon" aria-hidden="true">⚠️</span>
          <p class="section-ingredients__alert-text">
            <strong>Informação sobre alérgenos</strong>
            Contém glúten. Pode conter trigo, aveia e macadâmia. Embalagem com 24 unidades de 40g.
          </p>
        </div>
      </div>
    </section>`,
  css: `  <style>
    .section-ingredients {
      width: 100%;
      background-color: #fff8f0;
      padding: 2rem 1.5rem;
    }

    .section-ingredients__inner {
      max-width: 768px;
      margin: 0 auto;
    }

    .section-ingredients__title {
      font-size: clamp(1.1rem, 3vw, 1.4rem);
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 1rem;
      text-align: center;
    }

    .section-ingredients__text {
      font-size: 0.9rem;
      color: #555;
      line-height: 1.7;
      text-align: center;
      margin-bottom: 1.25rem;
    }

    .section-ingredients__alert {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      background: #fffbee;
      border: 1px solid #f5c542;
      border-radius: 10px;
      padding: 0.9rem 1rem;
    }

    .section-ingredients__alert-icon {
      font-size: 1.2rem;
      flex-shrink: 0;
      line-height: 1.4;
    }

    .section-ingredients__alert-text {
      font-size: 0.85rem;
      color: #7a5a00;
      line-height: 1.55;
    }

    .section-ingredients__alert-text strong {
      display: block;
      font-size: 0.9rem;
      margin-bottom: 0.2rem;
    }

    @media (min-width: 768px) {
      .section-ingredients {
        padding: 2.5rem 2rem;
      }
    }
  </style>`
}
);
