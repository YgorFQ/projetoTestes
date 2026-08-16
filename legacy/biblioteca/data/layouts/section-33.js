// @ts-nocheck
SenkoLib.registerLayout(
{
    id: 'section-33',
    name: 'Section-33',
    tags: ['Video', 'full width', '33'],
    html: `        <section class="section-33__container" aria-label="Seção de vídeo do produto">
            <div class="section-33__video-section">
                <div class="section-33__video-wrapper">
                    <!--
      =====================================================================
      OPÇÃO 1 — IFRAME DIRETO (YouTube)
      Copie e cole o iframe gerado pelo próprio YouTube:
        1. Abra o vídeo no YouTube
        2. Clique em "Compartilhar" → "Incorporar"
        3. Copie o <iframe> e cole aqui substituindo o abaixo
      Exemplo pronto:
      =====================================================================
      -->
                    <iframe width="560" height="315" title="Vídeo de demonstração do produto" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
                        src="https://www.youtube.com/embed/F_uv8PM0tYc?si=KSkt2pbhIguSII_K"></iframe>

                    <!--
      =====================================================================
      OPÇÃO 2 — SÓ O LINK DO YOUTUBE (sem iframe)
      Se preferir usar apenas o link do vídeo, siga o padrão abaixo:
      Link normal:   https://www.youtube.com/watch?v=ID_DO_VIDEO
      Vire embed:    https://www.youtube.com/embed/ID_DO_VIDEO
      Basta pegar o valor após "?v=" e colar no src assim:
        src="https://www.youtube.com/embed/ID_DO_VIDEO"
      Parâmetros opcionais no link embed:
        ?autoplay=1          → inicia automaticamente (exige mute=1 no Chrome)
        ?mute=1              → sem som
        ?controls=0          → esconde os controles
        ?loop=1&playlist=ID  → repete o vídeo
        ?start=30            → começa no segundo 30
      Exemplo com parâmetros:
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ"
      =====================================================================
      -->

                    <!--
      =====================================================================
      OPÇÃO 3 — LINK DIRETO EM MP4 e/ou WEBM (sem YouTube, sem iframe)
      Use quando o arquivo de vídeo está hospedado direto em algum link
      (seu próprio servidor, CDN, S3, Cloudflare R2, etc).

      Como usar:
        1. Cole o link do arquivo .mp4 no <source> abaixo (obrigatório)
        2. Se também tiver uma versão .webm do mesmo vídeo, cole no
           segundo <source> (opcional, mas melhora compatibilidade/peso)
        3. O navegador tenta o WEBM primeiro; se não suportar, cai pro MP4

      Atributos úteis na tag <video>:
        controls        → mostra os controles nativos (play, volume, etc)
        autoplay        → inicia sozinho (exige "muted" na maioria dos navegadores)
        muted           → sem som (necessário para autoplay funcionar)
        loop            → repete o vídeo
        playsinline     → evita tela cheia automática no iOS
        poster="LINK"   → imagem de capa exibida antes do play

      Exemplo pronto (troque os links pelos seus arquivos):
      =====================================================================
      -->
                    <video controls playsinline poster="https://seudominio.com/caminho/capa-do-video.jpg">
                        <source type="video/webm" src="https://seudominio.com/caminho/video.webm">
                        <source type="video/mp4" src="https://seudominio.com/caminho/video.mp4">
                        Seu navegador não suporta a tag de vídeo.
                    </video>
                </div>
            </div>
        </section>`,
    css: `    <style>
        .section-33__container {
            width: 92%;
            border-radius: 26px;
            max-width: 1600px;
            margin: 0 auto;
            background-color: #2F6F68;
        }

        .section-33__video-section {
            position: relative;
            width: 95%;
            margin: auto;
            max-height: 865px;
            overflow: hidden;
            /* background: linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #e94560 100%); */
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 18px 0;
        }

        .section-33__video-wrapper {
            position: relative;
            width: 100%;
            max-width: 1280px;
            max-height: 865px;

            /*
     * PROPORÇÃO DO VÍDEO
     * 16:9 = padding-bottom: 56.25%
     * 4:3  = padding-bottom: 75%
     * 1:1  = padding-bottom: 100%
     */
            padding-bottom: 56.25%;

            margin: 0 auto;
        }

        .section-33__video-wrapper iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 18px;
        }
    </style>`
}
);
