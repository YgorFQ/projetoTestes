// @ts-nocheck
SenkoLib.registerLayout(
{
  id: "section-15",
  name: "Section-15",
  tags: ["Split", "Section 15", "15"],
  html: `<div class="section-15-container">
    <div class="section-15">
        <div class="section-15__content">
            <!-- ══ TÍTULO + DESCRIÇÃO (apague este bloco se não quiser usar) ══ -->
            <h2 class="section-15__title">
                A garantia de que o que está por trás das paredes nunca será um problema
            </h2>
            <p class="section-15__desc">
                Ao escolher um condutor que une a máxima segurança contra incêndios, a eficiência energética para seus
                equipamentos de alta potência e a flexibilidade necessária para uma instalação ágil, você garante a
                proteção do seu patrimônio e a tranquilidade de saber que sua estrutura elétrica foi feita para durar
                uma vida inteira.
            </p>
            <!-- ══ FIM TÍTULO + DESCRIÇÃO ══ -->
            <ul class="section-15__feature-list" aria-label="Benefícios do produto">
                <li class="section-15__feature-item">
                    <img class="section-15__feature-item-icon" loading="lazy" src="C:\\Users\\ygorq\\Downloads\\2222455_03-2-1.png"
                        alt="Ícone" />
                    <div class="section-15__feature-item-body">
                        <strong class="section-15__feature-item-title">Manhãs Sem Pausa</strong>
                        <p class="section-15__feature-item-text">Prepare vitaminas nutritivas em segundos e use a função
                            autolimpeza para sair de casa sem deixar bagunça na pia</p>
                    </div>
                </li>
                <li class="section-15__feature-item">
                    <img class="section-15__feature-item-icon" loading="lazy" src="C:\\Users\\ygorq\\Downloads\\2222455_03-2-2.png"
                        alt="Ícone" />
                    <div class="section-15__feature-item-body">
                        <strong class="section-15__feature-item-title">Receitas de uma Só Vez</strong>
                        <p class="section-15__feature-item-text">A jarra de 2,1L permite cozinhar para a família inteira
                            sem precisar bater os ingredientes em várias etapas</p>
                    </div>
                </li>
                <li class="section-15__feature-item">
                    <img class="section-15__feature-item-icon" loading="lazy" src="C:\\Users\\ygorqDownloads\\2222455_03-2-3.png"
                        alt="Ícone" />
                    <div class="section-15__feature-item-body">
                        <strong class="section-15__feature-item-title">Cozinha Sempre Organizada</strong>
                        <p class="section-15__feature-item-text">O sistema enrola-cabo e o design leve eliminam a briga
                            com fios e facilitam o armazenamento após o uso</p>
                    </div>
                </li>
                <li class="section-15__feature-item">
                    <img class="section-15__feature-item-icon" loading="lazy" src="C:\\Users\\ygorq\\Downloads\\2222455_03-2-4.png"
                        alt="Ícone" />
                    <div class="section-15__feature-item-body">
                        <strong class="section-15__feature-item-title">Cuidado com o Bolso</strong>
                        <p class="section-15__feature-item-text">Durabilidade garantida por lâminas de aço inox e 1 ano
                            de garantia, evitando gastos inesperados com trocas precoces</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="section-15__image-wrapper">
            <img class="section-15__image" src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/EQUIPE_QUALIDADE_CONTEUDO/sessao4.jpg"
                 alt="Eletricista com capacete branco e colete laranja em obra" />
        </div>
    </div>
</div>`,
  css: `<style>
  .section-15-container {
      background-color: #f16425;
      padding: 1.5rem;
      width: 100%;
      box-sizing: border-box;
  }
  
  .section-15 {
      display: flex;
      flex-direction: column-reverse;
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
      color: #f3f3f3;
      font-size: 32px;
      font-weight: 600;
      line-height: 40px;
      margin: 0 0 1rem;
      text-align: left;
  }
  
  .section-15__desc {
      color: #f3f3f3;
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
      color: #f5f5f5;
      font-size: 1.05rem;
      font-weight: 700;
      line-height: 1.35;
      margin: 0;
  }
  
  .section-15__feature-item-text {
      color: #f5f5f5;
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
</style>`
}
);
