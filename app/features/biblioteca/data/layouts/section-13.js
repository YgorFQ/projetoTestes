// @ts-nocheck
SenkoLib.registerLayout(
{
  id: "section-13",
  name: "Section-13",
  tags: ["13", "celular", "section-13"],
  html: `    <div class="section-13-container">
      <section class="section-13" aria-label="Demonstração em vídeo do produto">
        <figure class="section-13__phone-wrap">
          <div class="section-13__phone" role="img" aria-label="Celular exibindo vídeo do produto">
            <div class="section-13__notch" aria-hidden="true"></div>
            <!-- Tela -->
            <div class="section-13__screen">
              <video class="section-13__video" src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/risque/Lollapalooza.mov" autoplay muted loop playsinline loading="lazy"
                aria-label="Demonstração em vídeo do produto"></video>
            </div>
          </div>
          <figcaption class="section-13__caption">
            <p class="section-13__caption-title">Veja em ação</p>
            <p class="section-13__caption-desc">Acompanhe como o produto funciona na prática em um vídeo demonstrativo.
            </p>
          </figcaption>
        </figure>
      </section>
    </div>`,
  css: `  <style>
    /* ── CONTAINER UNIVERSAL ─────────────────────────── */
    .section-13-container {
      padding-top: 20px;
      padding-bottom: 20px;
    }

    @media (min-width: 768px) {
      .section-13-container {
        padding-top: 28px;
        padding-bottom: 28px;
      }
    }

    @media (min-width: 1200px) {
      .section-13-container {
        padding-top: 25px;
        padding-bottom: 25px;
      }
    }

    /* ── SECTION BASE ────────────────────────────────── */
    .section-13 {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
    }

    /* ── PHONE WRAPPER ───────────────────────────────── */
    .section-13__phone-wrap {
      position: relative;
      width: 220px;
      flex-shrink: 0;
    }

    @media (min-width: 576px) {
      .section-13__phone-wrap {
        width: 260px;
      }
    }

    @media (min-width: 768px) {
      .section-13__phone-wrap {
        width: 300px;
      }
    }

    @media (min-width: 992px) {
      .section-13__phone-wrap {
        width: 340px;
      }
    }

    /* ── PHONE FRAME ─────────────────────────────────── */
    .section-13__phone {
      position: relative;
      width: 100%;
      aspect-ratio: 9 / 19.5;
      background: #0d0d0d;
      border-radius: 40px;
      box-shadow: 0 0 0 2px #2a2a2a, 0 0 0 4px #111, 0 0 0 6px #3a3a3a, 0 0 15px 1px rgb(0 0 0 / 29%), inset 0 0 0 1px rgba(255, 255, 255, 0.06);
      overflow: hidden;
    }

    /* Brilho lateral esquerdo */
    .section-13__phone::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(115deg,
          rgba(255, 255, 255, 0.08) 0%,
          transparent 40%);
      border-radius: inherit;
      z-index: 3;
      pointer-events: none;
    }

    /* ── NOTCH / DYNAMIC ISLAND ──────────────────────── */
    .section-13__notch {
      position: absolute;
      top: 14px;
      left: 50%;
      transform: translateX(-50%);
      width: 28%;
      height: 22px;
      background: #0d0d0d;
      border-radius: 20px;
      z-index: 4;
    }

    /* ── SCREEN ──────────────────────────────────────── */
    .section-13__screen {
      position: absolute;
      inset: 0;
      border-radius: 38px;
      overflow: hidden;
      z-index: 2;
    }

    /* ── VIDEO ───────────────────────────────────────── */
    .section-13__video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* ── GLOW AMBIENTAL ──────────────────────────────── */
    .section-13__glow {
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      height: 60px;
      background: radial-gradient(ellipse at center, rgba(80, 140, 255, 0.25) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      filter: blur(8px);
    }

    /* ── CAPTION ─────────────────────────────────────── */
    .section-13__caption {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 1.1rem;
    }

    .section-13__caption-title {
      font-family: sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #111;
      letter-spacing: 0.02em;
    }

    .section-13__caption-desc {
      font-family: sans-serif;
      font-size: 13px;
      color: #666;
      line-height: 1.5;
      max-width: 280px;
    }

    @media (min-width: 768px) {
      .section-13__caption-title {
        font-size: 15px;
      }

      .section-13__caption-desc {
        font-size: 14px;
        max-width: 320px;
      }
    }
  </style>`
}
);
