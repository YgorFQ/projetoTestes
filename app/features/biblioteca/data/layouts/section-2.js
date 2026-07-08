// @ts-nocheck
SenkoLib.registerLayout(
{
  id: "section-2",
  name: "Section-2 (Header Vídeo)",
  tags: ["Section-2", "Section 2", "2", "vídeo", "header vídeo", "responsivo", "acessível"],
  html: `<section class="video-header" aria-label="Cabeçalho do produto">
    <header class="video-header__banner">
        <video class="video-header__banner-video"
            poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header_precon.webp" preload="none"
            autoplay muted loop playsinline width="1200" height="250" aria-hidden="true">
            <source src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-precon.webm">
        </video>
        <div class="video-header__badge" role="img" aria-label="Logo da marca precon dentro de um círculo laranja">
            <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/precon/logo-precon.png"
                alt="" class="video-header__badge-img">
        </div>
    </header>
    <section class="video-header__body" aria-label="Título e descrição do produto">
        <small class="video-header__brand">precon</small>
        <h2 class="video-header__title" id="video-main-title">
            CONJUNTOS DE PARAFUSO AUTOBROCANTES CERAMICO/BRANCO
        </h2>
        <p class="video-header__subtitle">
            Perfuram e fixam em uma única etapa, dispensando pré-furo. Ideais para agilizar sua obra ou reparo com
            total segurança e firmeza nas aplicações.
        </p>
    </section>
</section>`,
  css: `<style>
* {
  margin: 0;
  padding: 0;
}

.video-header,
.video-header * {
  box-sizing: border-box;
  margin: 0;
}

.video-header {
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

.video-header__banner {
  width: 100%;
  height: var(--banner-height);
  position: relative;
  display: flex;
  justify-content: center;
}

.video-header__banner-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
}

.video-header__badge {
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

.video-header__badge-img {
  max-width: 90px;
  max-height: 90px;
  object-fit: contain;
}

.video-header__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(var(--badge-size) / 2 + 1.1rem) 0.3rem 2.5rem;
  text-align: center;
}

.video-header__brand {
  color: #ff9900;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.video-header__title {
  color: #000;
  font-size: clamp(1.4rem, 4vw, 2.4rem);
  line-height: clamp(1.6rem, 4vw, 3.1rem);
  font-weight: 600;
  max-width: 50rem;
  text-wrap: pretty;
}

.video-header__subtitle {
  color: #8a8a8a;
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 120%;
  margin-top: 1rem;
  max-width: 52rem;
  text-wrap: pretty;
}

@media (prefers-contrast: more) {
  .video-header__subtitle {
    color: #000;
  }

  .video-header__brand {
    color: #3a2301;
  }
}

@media (max-width: 768px) {
  .video-header {
    --banner-height: 180px;
  }
}

@media (max-width: 470px) {
  .video-header__subtitle {
    text-align: justify;
    font-size: clamp(0.9rem, 2vw, 1.5rem);
    font-weight: 550;
  }
}
</style>`
}
);
