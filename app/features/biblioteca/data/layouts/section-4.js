// @ts-nocheck
SenkoLib.registerLayout(
  {
    id: "section-4",
    name: "Section-4 (Manual de Instrução)",
    tags: ["Section-4", "4", "Section 4", "manual de instrução", "responsivo", "acessível"],
    html: `        <section class="section-4-manual__container">
            <figure class="section-4-manual__figura">
                <a class="section-4-manual__link" target="_blank" rel="noopener noreferrer"
                    href="https://static1.efacil.com.br/wcsstore/AuroraStorefrontAssetStore/PDP/philips-walita/2209713-manual.pdf">
                    <img class="section-4-manual__imagem" width="1200" height="250" loading="lazy" decoding="async"
                        fetchpriority="low"
                        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/manual-banner.jpg"
                        alt="Banner com ícone de caderno e texto Manual de Instruções" />

                </a>
                <figcaption class="section-4-manual__legenda">
                    Manual de Instruções — abrir PDF em nova aba
                </figcaption>
            </figure>
        </section>`,
    css: `<style>
  .section-4-manual__container {
    width: 100%;
    margin: 0 auto;
    height: auto;
  }

  .section-4-manual__figura {
    margin: 0;
  }

  .section-4-manual__link {
    display: flex;
    align-items: center;
    text-decoration: none;
    width: 100%;
  }

  .section-4-manual__imagem {
    border-radius: 0.25rem;
    height: auto;
    object-fit: cover;
    width: 100%;
  }

  .section-4-manual__legenda {
    font-family: Arial, sans-serif;
    font-size: 0.75rem;
    color: #666;
    margin-top: 0.25rem;
    text-align: center;
  }

  .section-4-manual__link:focus-visible {
  outline: 3px solid #ff9900;
  outline-offset: 4px;
  border-radius: 0.25rem;
}

  @media (min-width: 820px) {

    .section-4-manual__container,
    .section-4-manual__figura,
    .section-4-manual__imagem {
      height: 250px;
    }
  }
</style>`
  }
);
