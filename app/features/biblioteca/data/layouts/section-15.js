// @ts-nocheck
SenkoLib.registerLayout(
{
    id: 'section-15',
    name: 'Section-15',
    tags: ['Split', 'Section 15', '15'],
    html: `<section class="section-15-container" aria-labelledby="section-15-title">
  <div class="section-15">
    <div class="section-15__content">
      <h2 class="section-15__title" id="section-15-title">
        A garantia de que o que está por trás das paredes nunca será um problema
      </h2>

      <p class="section-15__desc">
        Ao escolher um condutor que une a máxima segurança contra incêndios, a
        eficiência energética para seus equipamentos de alta potência e a
        flexibilidade necessária para uma instalação ágil, você garante a
        proteção do seu patrimônio e a tranquilidade de saber que sua estrutura
        elétrica foi feita para durar uma vida inteira.
      </p>

      <ul class="section-15__feature-list" aria-label="Benefícios do produto">
        <li class="section-15__feature-item">
          <img class="section-15__feature-item-icon" loading="lazy" src="C:UsersygorqDownloads2222455_03-2-1.png" alt=""
            width="48" height="48" />

          <div class="section-15__feature-item-body">
            <strong class="section-15__feature-item-title">
              Manhãs Sem Pausa
            </strong>

            <p class="section-15__feature-item-text">
              Prepare vitaminas nutritivas em segundos e use a função
              autolimpeza para sair de casa sem deixar bagunça na pia.
            </p>
          </div>
        </li>

        <li class="section-15__feature-item">
          <img class="section-15__feature-item-icon" loading="lazy" src="C:UsersgorqDownloads222455_03-2-2.png" alt=""
            width="48" height="48" />

          <div class="section-15__feature-item-body">
            <strong class="section-15__feature-item-title">
              Receitas de uma Só Vez
            </strong>

            <p class="section-15__feature-item-text">
              A jarra de 2,1 L permite cozinhar para a família inteira sem
              precisar bater os ingredientes em várias etapas.
            </p>
          </div>
        </li>

        <li class="section-15__feature-item">
          <img class="section-15__feature-item-icon" loading="lazy" src="C:UsersygorqDownloads2222455_03-2-3.png" alt=""
            width="48" height="48" />

          <div class="section-15__feature-item-body">
            <strong class="section-15__feature-item-title">
              Cozinha Sempre Organizada
            </strong>

            <p class="section-15__feature-item-text">
              O sistema enrola-cabo e o design leve eliminam a briga com fios e
              facilitam o armazenamento após o uso.
            </p>
          </div>
        </li>

        <li class="section-15__feature-item">
          <img class="section-15__feature-item-icon" loading="lazy" src="C:UsersygorqDownloads2222455_03-2-4.png" alt=""
            width="48" height="48" />

          <div class="section-15__feature-item-body">
            <strong class="section-15__feature-item-title">
              Cuidado com o Bolso
            </strong>

            <p class="section-15__feature-item-text">
              Durabilidade garantida por lâminas de aço inox e 1 ano de
              garantia, evitando gastos inesperados com trocas precoces.
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div class="section-15__image-wrapper">
      <img class="section-15__image"
        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao4.jpg"
        alt="Eletricista com capacete branco e colete laranja em obra" />
    </div>
  </div>
</section>`,
    css: `<style>
  .section-15-container,
  .section-15-container * {
    box-sizing: border-box;
  }

  .section-15-container {
    width: 100%;
    padding: 1.5rem;
    background-color: #f16425;
  }

  .section-15 {
    display: flex;
    flex-direction: column-reverse;
    gap: 1.5rem;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
  }

  .section-15__image-wrapper {
    width: 100%;
    flex-shrink: 0;
  }

  .section-15__image {
    display: block;
    width: 100%;
    max-width: 530px;
    margin: 0 auto;
    border-radius: 16px;
    object-fit: cover;
    aspect-ratio: 4 / 3;
  }

  .section-15__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
  }

  .section-15__title {
    margin: 0 0 1rem;
    color: #f3f3f3;
    font-size: clamp(1.75rem, 4vw, 2rem);
    font-weight: 600;
    line-height: 1.25;
    text-align: left;
  }

  .section-15__desc {
    margin: 0 0 1.5rem;
    color: #f3f3f3;
    font-size: 0.875rem;
    line-height: 1.6;
    text-align: left;
  }

  .section-15__feature-list {
    display: flex;
    flex-direction: column;
    gap: 1.375rem;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .section-15__feature-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .section-15__feature-item-icon {
    display: block;
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    border-radius: 8px;
    object-fit: contain;
  }

  .section-15__feature-item-body {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
  }

  .section-15__feature-item-title {
    margin: 0;
    color: #f5f5f5;
    font-size: 1.05rem;
    font-weight: 700;
    line-height: 1.35;
  }

  .section-15__feature-item-text {
    margin: 0;
    color: #f5f5f5;
    font-size: 0.8125rem;
    line-height: 1.55;
  }

  @media (min-width: 480px) {
    .section-15-container {
      padding: 1.75rem;
    }

    .section-15__feature-item-title {
      font-size: 1.1rem;
    }
  }

  @media (min-width: 760px) {
    .section-15-container {
      padding: 2rem;
    }

    .section-15 {
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 2rem;
    }

    .section-15--reverse {
      flex-direction: row-reverse;
    }

    .section-15__image-wrapper {
      flex: 0 1 48%;
      max-width: 48%;
    }

    .section-15__image {
      width: 100%;
      max-width: none;
      max-height: 460px;
      border-radius: 20px;
      aspect-ratio: 4 / 3;
    }

    .section-15__content {
      flex: 1 1 0;
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
      width: 48px;
      height: 48px;
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
      gap: 2.5rem;
    }
  }

  @media (min-width: 1280px) {
    .section-15__image-wrapper {
      flex-basis: 50%;
      max-width: 50%;
    }

    .section-15__feature-item-title {
      font-size: 1.3rem;
    }

    .section-15__feature-item-text {
      font-size: 0.9rem;
    }
  }

  /* Entrada inicial */
  .section-15__content,
  .section-15__image-wrapper {
    animation: section-15-fade-up 0.8s ease both;
  }

  .section-15__image-wrapper {
    animation-delay: 0.15s;
  }

  @keyframes section-15-fade-up {
    from {
      opacity: 0;
      transform: translateY(28px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Imagem interativa */
  .section-15__image-wrapper {
    overflow: hidden;
    border-radius: 20px;
  }

  .section-15__image {
    transition:
      transform 0.5s ease,
      filter 0.5s ease;
  }

  .section-15__image-wrapper:hover .section-15__image {
    transform: scale(1.04);
    filter: brightness(1.05);
  }

  /* Cards dos benefícios */
  .section-15__feature-item {
    position: relative;
    padding: 0.8rem;
    border: 1px solid transparent;
    border-radius: 12px;
    transition:
      background-color 0.3s ease,
      border-color 0.3s ease,
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .section-15__feature-item:hover,
  .section-15__feature-item:focus-visible {
    background-color: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 12px 28px rgba(60, 20, 4, 0.18);
    transform: translateX(8px);
    outline: none;
  }

  /* Animação dos ícones */
  .section-15__feature-item-icon {
    transition:
      transform 0.35s ease,
      background-color 0.35s ease;
  }

  .section-15__feature-item:hover .section-15__feature-item-icon,
  .section-15__feature-item:focus-visible .section-15__feature-item-icon {
    transform: scale(1.12) rotate(-4deg);
  }

  /* Destaque dos títulos */
  .section-15__feature-item-title {
    transition: transform 0.3s ease;
  }

  .section-15__feature-item:hover .section-15__feature-item-title,
  .section-15__feature-item:focus-visible .section-15__feature-item-title {
    transform: translateX(4px);
  }

  /* Entrada progressiva dos itens */
  .section-15__feature-item {
    animation: section-15-item-in 0.65s ease both;
  }

  .section-15__feature-item:nth-child(1) {
    animation-delay: 0.15s;
  }

  .section-15__feature-item:nth-child(2) {
    animation-delay: 0.25s;
  }

  .section-15__feature-item:nth-child(3) {
    animation-delay: 0.35s;
  }

  .section-15__feature-item:nth-child(4) {
    animation-delay: 0.45s;
  }

  @keyframes section-15-item-in {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Animação ao aparecer durante o scroll */
  @supports (animation-timeline: view()) {
    .section-15 {
      animation: section-15-scroll-reveal linear both;
      animation-timeline: view();
      animation-range: entry 10% cover 35%;
    }

    @keyframes section-15-scroll-reveal {
      from {
        opacity: 0;
        transform: translateY(40px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  /* Mobile */
  @media (max-width: 759px) {

    .section-15__feature-item:hover,
    .section-15__feature-item:focus-visible {
      transform: translateY(-4px);
    }
  }

  /* Acessibilidade */
  @media (prefers-reduced-motion: reduce) {

    .section-15,
    .section-15__content,
    .section-15__image-wrapper,
    .section-15__image,
    .section-15__feature-item,
    .section-15__feature-item-icon,
    .section-15__feature-item-title {
      animation: none;
      transition: none;
    }
  }

        @media(min-width: 760px) {
            .is-reverse {
                flex-direction: row-reverse;
            }
        }
</style>
`
}
);
