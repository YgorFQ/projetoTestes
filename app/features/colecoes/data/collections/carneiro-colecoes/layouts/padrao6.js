// @ts-nocheck
ColLib.registerCollectionLayout("carneiro-colecoes",
{
  id: "padrao6",
  name: "padrao6",
  html: `<div class="lp-container" style="background-color: #fef9f4;">
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Varela+Round&display=swap');

    * {
      padding: 0;
      margin: 0;
    }

    .pdp {
      display: flex;
      flex-direction: column;
      font-family: Roboto, sans-serif
    }

    .pdp * {
      box-sizing: border-box;
      margin: 0;
    }

    .pdp-text-gradient {
      background: linear-gradient(90deg, #c29869, #ddbc88, #e6c588);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
      background-clip: text;
    }
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
    rel="stylesheet">
  <title>PDP - eFácil</title>
  <!-- ---------------------------------------- ÁREA PARA COLOCAR STYLES ----------------------------------------------------------- -->

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
    .section-15-container {
      background-color: #f16425;
      padding: 1.5rem;
      width: 100%;
      box-sizing: border-box;
    }

    .section-15 {
      display: flex;
      flex-direction: column-reverse;
      /* ← era column-reverse */
      gap: 1.25rem;
      margin: 0 auto;
      width: 100%;
      box-sizing: border-box;
    }

    .section-15__image-wrapper {
      width: 100%;
      flex-shrink: 0;
    }

    .section-15__image {
      margin: auto;
      border-radius: 16px;
      display: block;
      object-fit: cover;
      width: 100%;
      max-width: 530px;
      aspect-ratio: 16 / 9;
    }

    .section-15__content {
      display: flex;
      flex-direction: column;
      width: 95%;
      margin: auto;
      box-sizing: border-box;
    }

    .section-15__title {
      color: #1a1a1a;
      font-size: 32px;
      font-weight: 600;
      line-height: 40px;
      margin: 0 0 1rem;
      text-align: left;
    }

    .section-15__desc {
      color: #1a1a1a;
      font-size: 14px;
      line-height: 22px;
      margin: 0 0 1.5rem;
      text-align: left;
    }

    .section-15__feature-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      list-style: none;
      margin: 0;
      gap: 22px;
      padding: 0;
    }

    .section-15__feature-item {
      align-items: flex-start;
      display: flex;
      flex-direction: row;
      gap: 0.75rem;
    }

    .section-15__feature-item-icon {
      border-radius: 8px;
      flex-shrink: 0;
      height: 44px;
      object-fit: contain;
      width: 44px;
    }

    .section-15__feature-item-body {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .section-15__feature-item-title {
      color: #1a1a1a;
      font-size: 1.05rem;
      font-weight: 700;
      line-height: 1.35;
      margin: 0;
    }

    .section-15__feature-item-text {
      color: #1a1a1a;
      font-size: 0.8125rem;
      line-height: 1.55;
      margin: 0;
    }

    /* ── NOVO: aspect-ratio e desc oculta no mobile ── */
    @media (max-width: 759px) {

      .section-15__image {
        aspect-ratio: 4 / 3;
      }
    }

    @media (min-width: 480px) {
      .section-15-container {
        padding: 1.75rem;
      }

      .section-15__feature-item-title {
        font-size: 1.1rem;
      }
    }

    @media (min-width: 768px) {
      .section-15-container {
        padding: 2rem;
      }

      .section-15 {
        max-width: 768px;
      }

      .section-15__image {
        border-radius: 20px;
        aspect-ratio: 16 / 9;
      }
    }

    @media (min-width: 760px) {
      .section-15 {
        align-items: center;
        flex-direction: row;
        gap: 1.5rem;
        justify-content: center;
        max-width: 960px;
      }

      .section-15--reverse {
        flex-direction: row-reverse;
      }

      .section-15__image-wrapper {
        flex: 0 0 48%;
        max-width: 48%;
      }

      .section-15__image {
        aspect-ratio: 4 / 3;
        height: 100%;
        max-height: 420px;
      }

      .section-15__content {
        flex: 1 1 0;
        min-width: 0;
      }

      .section-15__feature-list--icon-right .section-15__feature-item {
        flex-direction: row-reverse;
      }

      .section-15__feature-list--icon-right .section-15__feature-item-body {
        align-items: flex-end;
      }

      .section-15__feature-list--icon-right .section-15__feature-item-title,
      .section-15__feature-list--icon-right .section-15__feature-item-text {
        text-align: right;
      }

      .section-15__feature-item-icon {
        height: 48px;
        width: 48px;
      }

      .section-15__feature-item-title {
        font-size: 1.2rem;
      }

      .section-15__feature-item-text {
        font-size: 0.875rem;
      }
    }

    @media (min-width: 1060px) {
      .section-15 {
        max-width: 1060px;
        gap: 2rem;
      }

      .section-15__feature-list {
        gap: 1.25rem;
      }
    }

    @media (min-width: 1280px) {
      .section-15 {
        max-width: 1280px;
        gap: 2.5rem;
      }

      .section-15__image-wrapper {
        flex: 0 0 50%;
        max-width: 50%;
      }

      .section-15__image {
        max-height: 460px;
      }

      .section-15__feature-item-title {
        font-size: 1.3rem;
      }

      .section-15__feature-item-text {
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
  </style>

  <style>
    .seals-section {
      width: 100%;
      background-color: #fef9f4;
      padding: 2.5rem 1.5rem;
      box-sizing: border-box;
      font-family: sans-serif;
    }

    .seals-section__inner {
      max-width: 960px;
      margin: 0 auto;
    }

    .seals-section__title {
      text-align: center;
      font-size: clamp(1.2rem, 3vw, 1.6rem);
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 0.5rem;
    }

    .seals-section__subtitle {
      text-align: center;
      color: #888;
      font-size: 0.9rem;
      margin-bottom: 2rem;
    }

    .seals-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .seal-card {
      background: #fff;
      border: 1px solid #e8e8e8;
      border-radius: 14px;
      padding: 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .seal-card__icon {
      font-size: 1.6rem;
      flex-shrink: 0;
      line-height: 1;
    }

    .seal-card__body {
      min-width: 0;
    }

    .seal-card__title {
      font-size: 0.8rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 0.15rem;
      line-height: 1.3;
    }

    .seal-card__text {
      font-size: 0.72rem;
      color: #777;
      line-height: 1.45;
      margin: 0;
    }

    @media (min-width: 520px) {
      .seals-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (min-width: 768px) {
      .seals-grid {
        grid-template-columns: repeat(6, 1fr);
      }

      .seal-card {
        flex-direction: column;
        text-align: center;
        padding: 1.25rem 0.75rem;
        gap: 0.5rem;
      }

      .seal-card__icon {
        font-size: 2rem;
      }

      .seal-card__title {
        font-size: 0.75rem;
      }

      .seal-card__text {
        display: none;
      }
    }
  </style>

  <style>
    .faq-section {
      width: 100%;
      padding: 2rem 16px;
      box-sizing: border-box;
      margin: 0 auto 25px;
      padding-top: 0;
      font-family: sans-serif;
    }

    .faq-section__header {
      text-align: center;
      margin: 2rem auto;
      margin-top: 0;
    }

    .faq-section__title {
      font-size: clamp(1.5rem, 3vw, 2rem);
      font-weight: bold;
      color: #333;
      margin: 0 0 12px;
      line-height: 98%;
    }

    .faq-section__subtitle {
      font-size: 1rem;
      color: #666;
      margin: 0;
    }

    .faq-section__list {
      list-style: none;
      margin: 0 auto;
      padding: 0;
      max-width: 56rem;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .faq-section__item {
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 12px;
      overflow: hidden;
    }

    .faq-section__item summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 16px 20px;
      cursor: pointer;
      list-style: none;
    }

    .faq-section__item summary::-webkit-details-marker {
      display: none;
    }

    .faq-section__item summary:hover {
      background: #f9f9f9;
    }

    .faq-section__q-text {
      font-size: 1rem;
      font-weight: bold;
      color: #333;
      flex: 1;
    }

    .faq-section__q-text:hover {
      color: #ea5b0c;
    }

    .faq-section__icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      position: relative;
    }

    .faq-section__icon::before,
    .faq-section__icon::after {
      content: '';
      position: absolute;
      background: #888;
      border-radius: 2px;
      transition: transform 0.25s ease, opacity 0.25s ease;
    }

    .faq-section__icon::before {
      width: 12px;
      height: 1.5px;
      top: 9px;
      left: 4px;
    }

    .faq-section__icon::after {
      width: 1.5px;
      height: 12px;
      top: 4px;
      left: 9px;
    }

    .faq-section__item[open] .faq-section__icon::after {
      transform: rotate(90deg);
      opacity: 0;
    }

    .faq-section__a-inner {
      padding: 14px 20px 16px;
      border-top: 1px solid #e5e5e5;
    }

    .faq-section__a-text {
      font-size: 0.9rem;
      color: #555;
      line-height: 1.6;
      margin: 0;
    }

    @media (max-width: 480px) {
      .faq-section__q-text {
        font-size: 0.9rem;
      }
    }
  </style>

  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->


    <section class="product-header-2" aria-label="Cabeçalho do produto">
      <header class="product-header__banner-2">
        <figure style="width:100%;height:100%;margin:0;">
          <img class="product-header__banner-img-2"
            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sabonete-liquido-johnsons-baby-detalhe-bolhas-espuma-201447-00.jpg"
            alt="Detalhe de bolhas de sabão translúcidas e espuma cremosa do Sabonete Líquido Johnson's Baby"
            width="1338" height="250" loading="eager" decoding="async">
        </figure>
        <div class="product-header__badge-2" role="img" aria-label="Logo da marca">
          <img class="product-header__badge-img-2"
            src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/johnsonsbaby/logo-johnsonsbaby.png"
            alt="Ícone da marca" loading="lazy" decoding="async">
        </div>
      </header>
      <article class="product-header__body-2">
        <small class="product-header__brand-2">── Johnson's Baby ──</small>
        <h1 class="product-header__title-2">
          <span>Sabonete Líquido Glicerina</span>
          <strong> Baby Cabeça aos Pés, 750 mL</strong>
        </h1>

        <p class="product-header__subtitle-2">
          Limpeza completa e suave desde o primeiro dia de vida. Com glicerina de origem natural,
          este sabonete 3 em 1 limpa, hidrata e protege a pele do bebê contra o ressecamento,
          mantendo o cuidado essencial no dia a dia
        </p>
      </article>
    </section>

    <div class="section-15-container" style="background-color: #f9e0d8;">
      <div class="section-15">
        <div class="section-15__content">
          <h2 class="section-15__title">
            Limpeza e hidratação para todos os momentos
          </h2>

          <p class="section-15__desc">
            Com 94% de ingredientes naturais e glicerina, o Sabonete Cabeça aos Pés é hipoalergênico,
            suave e ideal para uso diário. Limpa sem agredir, preservando a hidratação natural da pele.
          </p>
        </div>
        <div class="section-15__image-wrapper">
          <img class="section-15__image"
            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sabonete-liquido-johnsons-baby-da-cabeca-aos-pes-glicerina-208026_01.jpg"
            alt="Sabonete Líquido Johnson's Baby Da Cabeça aos Pés 200ml com glicerina e vitamina B5" loading="lazy"
            decoding="async">
        </div>
      </div>
    </div>

    <div class="section-15-container" style="background-color: #fef9f4;">
      <div class="section-15 is-reverse">
        <div class="section-15__content">
          <ul class="section-15__feature-list" aria-label="Benefícios do produto">
            <li class="section-15__feature-item">
              <div class="section-15__feature-item-body">
                <strong class="section-15__feature-item-title">Limpeza Completa 3 em 1</strong>
                <p class="section-15__feature-item-text">Limpa, hidrata e protege contra o ressecamento</p>
              </div>
            </li>
            <li class="section-15__feature-item">
              <div class="section-15__feature-item-body">
                <strong class="section-15__feature-item-title">Hidratação Natural</strong>
                <p class="section-15__feature-item-text">Com glicerina que ajuda a manter a pele macia e saudável</p>
            </li>
            <li class="section-15__feature-item">
              <div class="section-15__feature-item-body">
                <strong class="section-15__feature-item-title">Uso Desde o Primeiro Dia</strong>
                <p class="section-15__feature-item-text">Seguro para recém-nascidos e ideal para uso diário</p>
              </div>
            </li>
            <li class="section-15__feature-item">
              <div class="section-15__feature-item-body">
                <strong class="section-15__feature-item-title">Cuidado Suave</strong>
                <p class="section-15__feature-item-text">Hipoalergênico, com pH equilibrado e sem ingredientes
                  agressivos</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="section-15__image-wrapper">
          <img class="section-15__image"
            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sabonete-liquido-johnsons-baby-bebe-banho-lifestyle-201447-02.jpg"
            alt="Bebê sorrindo durante banho com Johnson's Baby, limpeza suave e proteção para pele delicada"
            loading="lazy" decoding="async">
        </div>
      </div>
    </div>

    <div class="section-15-container" style="background-color: #f9e0d8;">
      <div class="section-15">
        <div class="section-15__content">
          <h2 class="section-15__title">
            Fórmula CHEGA DE LÁGRIMAS® — suave para o corpo e olhos
          </h2>

          <p class="section-15__desc">
            Desenvolvido para não causar ardência nos olhos, o banho se torna mais tranquilo e seguro.
            Sua fórmula é tão suave quanto água pura, ideal para o uso diário da cabeça aos pés.
          </p>
        </div>
        <div class="section-15__image-wrapper">
          <img class="section-15__image"
            src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/sabonete-liquido-johnsons-baby-bebe-brincando-agua-lifestyle-201447-03.jpg"
            alt="Bebê feliz brincando com água na banheira usando Johnson's Baby — fórmula Chega de Lágrimas"
            loading="lazy" decoding="async">
        </div>
      </div>
    </div>

    <section class="seals-section" aria-labelledby="seals-title">
      <div class="seals-section__inner">
        <h2 class="seals-section__title" id="seals-title">Por que confiar no JOHNSON'S® Baby?</h2>
        <p class="seals-section__subtitle">Cada detalhe da fórmula foi pensado para a pele delicada do seu bebê.
        </p>
        <ul class="seals-grid" role="list" aria-label="Diferenciais da fórmula">
          <li class="seal-card">
            <span class="seal-card__icon" aria-hidden="true">🌿</span>
            <div class="seal-card__body">
              <strong class="seal-card__title">94% Natural</strong>
              <p class="seal-card__text">Ingredientes de origem natural conforme ISO 16128</p>
            </div>
          </li>
          <li class="seal-card">
            <span class="seal-card__icon" aria-hidden="true">🚫</span>
            <div class="seal-card__body">
              <strong class="seal-card__title">Sem Parabenos</strong>
              <p class="seal-card__text">Livre de parabenos, sulfatos, corantes e ftalatos</p>
            </div>
          </li>
          <li class="seal-card">
            <span class="seal-card__icon" aria-hidden="true">🔬</span>
            <div class="seal-card__body">
              <strong class="seal-card__title">Testado Clinicamente</strong>
              <p class="seal-card__text">Aprovado por pediatras e dermatologistas</p>
            </div>
          </li>
          <li class="seal-card">
            <span class="seal-card__icon" aria-hidden="true">💧</span>
            <div class="seal-card__body">
              <strong class="seal-card__title">pH Ideal</strong>
              <p class="seal-card__text">Equilibrado para a pele sensível do bebê</p>
            </div>
          </li>
          <li class="seal-card">
            <span class="seal-card__icon" aria-hidden="true">🌸</span>
            <div class="seal-card__body">
              <strong class="seal-card__title">Hipoalergênico</strong>
              <p class="seal-card__text">Formulado para minimizar risco de alergias</p>
            </div>
          </li>
          <li class="seal-card">
            <span class="seal-card__icon" aria-hidden="true">👶</span>
            <div class="seal-card__body">
              <strong class="seal-card__title">Todas as Idades</strong>
              <p class="seal-card__text">Do recém-nascido em diante, seguro para o dia a dia</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Área de FAQ -->
    <section class="faq-section" aria-labelledby="faq-section-title">
      <div class="faq-section__header">
        <h3 class="faq-section__title" id="faq-section-title">Dúvidas Frequentes</h3>
        <p class="faq-section__subtitle">Sabonete JOHNSON'S® Cabeça aos Pés</p>
      </div>
      <ul class="faq-section__list">
        <li class="faq-section__item">
          <details class="faq-section__item">
            <summary>
              <h3 class="faq-section__q-text">A partir de qual idade posso usar?</h3>
              <span class="faq-section__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-section__a-inner">
              <p class="faq-section__a-text">
                Seguro desde o primeiro dia de vida. Fórmula hipoalergênica e testada por pediatras.
              </p>
            </div>
          </details>
        </li>
        <li class="faq-section__item">
          <details class="faq-section__item">
            <summary>
              <h3 class="faq-section__q-text">Pode usar todos os dias?</h3>
              <span class="faq-section__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-section__a-inner">
              <p class="faq-section__a-text">
                Sim. Foi desenvolvido para uso diário, mantendo a pele limpa e hidratada sem ressecar.
              </p>
            </div>
          </details>
        </li>
        <li class="faq-section__item">
          <details class="faq-section__item">
            <summary>
              <h3 class="faq-section__q-text">Ele hidrata mesmo sendo sabonete?</h3>
              <span class="faq-section__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-section__a-inner">
              <p class="faq-section__a-text">
                Sim. A glicerina ajuda a reter a hidratação natural da pele durante o banho.
              </p>
            </div>
          </details>
        </li>
        <li class="faq-section__item">
          <details class="faq-section__item">
            <summary>
              <h3 class="faq-section__q-text">Pode causar irritação?</h3>
              <span class="faq-section__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-section__a-inner">
              <p class="faq-section__a-text">
                Não. É hipoalergênico e livre de parabenos, sulfatos, corantes e ftalatos.
              </p>
            </div>
          </details>
        </li>
        <li class="faq-section__item">
          <details class="faq-section__item">
            <summary>
              <h3 class="faq-section__q-text">O que significa “Cabeça aos Pés”?</h3>
              <span class="faq-section__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-section__a-inner">
              <p class="faq-section__a-text">
                Significa que pode ser usado no corpo e cabelo, simplificando a rotina de cuidados do bebê.
              </p>
            </div>
          </details>
        </li>
      </ul>
    </section>

    <p
      style="color: #8a8a8a; font-family: sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); text-wrap: pretty; text-align: center; padding: 30px 0;">
      IMAGENS MERAMENTE ILUSTRATIVAS</p>
  </div>
</div>`,
  css: ``
}
);
