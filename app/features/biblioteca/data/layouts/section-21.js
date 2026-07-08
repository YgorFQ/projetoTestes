// @ts-nocheck
SenkoLib.registerLayout(
{
  id: "section-21",
  name: "Section-18",
  tags: ["cards", "clicavel", "interativo", "diversos"],
  html: ` <section class="features-section">
    <div class="section-header" aria-labelledby="main-title">
        <h2 id="main-title">TUDO O QUE VOCÊ PROCURA</h2>
    </div>

    <!-- Inputs de rádio agrupados para acessibilidade -->
    <div role="radiogroup" aria-label="Escolha uma característica para visualizar">
        <input type="radio" id="feat1" name="feature" class="sr-only" checked>
        <input type="radio" id="feat2" name="feature" class="sr-only">
        <input type="radio" id="feat3" name="feature" class="sr-only">

        <div class="grid-container">
            <!-- Coluna Esquerda -->
            <aside class="column" aria-label="Funcionalidade de resistência">
                <label for="feat1" class="feature-card" role="radio" aria-checked="true" tabindex="0">
                    <article>
                        <h2>É RESISTENTE?</h2>
                        <p>Sim! Possui caixa de engrenagem metálica para maior vida útil e interruptor selado que bloqueia a entrada de pó.</p>
                    </article>
                </label>
            </aside>

            <!-- Coluna Central: Imagens (Picture) e Card 2 -->
            <section class="image-display" aria-label="Imagem ilustrativa da funcionalidade selecionada">
                <div class="circle-frame" aria-live="polite" aria-label="Imagem da funcionalidade selecionada">
                    
                    <!-- IMAGEM 1 RESPONSIVA -->
                    <picture class="img1">
                        <source media="(max-width: 320px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-acabamento-solda-metal-509478-03.jpg?ims=492x">
                        <source media="(max-width: 375px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-acabamento-solda-metal-509478-03.jpg?ims=301x">
                        <source media="(min-width: 400px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-acabamento-solda-metal-509478-03.jpg?ims=318x">
                        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-acabamento-solda-metal-509478-03.jpg?ims=318x">
                        <source media="(max-width: 1280px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-acabamento-solda-metal-509478-03.jpg?ims=400x">
                        <source media="(min-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-acabamento-solda-metal-509478-03.jpg?ims=400x">
                        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-acabamento-solda-metal-509478-03.jpg" 
                        alt="Operador com Esmerilhadeira Black & Decker realizando acabamento sobre solda">
                    </picture>

                    <!-- IMAGEM 2 RESPONSIVA -->
                    <picture class="img2">
                       <source media="(max-width: 320px)" srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-limpeza-superficie-enferrujada-509478-04.jpg?ims=492x">
                        <source media="(max-width: 375px)" srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-limpeza-superficie-enferrujada-509478-04.jpg?ims=301x">
                        <source media="(min-width: 400px)" srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-limpeza-superficie-enferrujada-509478-04.jpg?ims=318x">
                        <source media="(max-width: 1024px)" srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-limpeza-superficie-enferrujada-509478-04.jpg?ims=318x">
                        <source media="(max-width: 1280px)" srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-limpeza-superficie-enferrujada-509478-04.jpg?ims=400x">
                        <source media="(min-width: 1440px)" srcset="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-limpeza-superficie-enferrujada-509478-04.jpg?ims=400x">
                        <img src="	https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-limpeza-superficie-enferrujada-509478-04.jpg" 
                        alt="Esmerilhadeira Black & Decker G720XB2 limpando superfície enferrujada">
                    </picture>

                    <!-- IMAGEM 3 RESPONSIVA -->
                    <picture class="img3">
                        <source media="(max-width: 320px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-desbaste-borda-chapa-metal-509478-05.jpg?ims=492x">
                        <source media="(max-width: 375px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-desbaste-borda-chapa-metal-509478-05.jpg?ims=301x">
                        <source media="(min-width: 400px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-desbaste-borda-chapa-metal-509478-05.jpg?ims=318x">
                        <source media="(max-width: 1024px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-desbaste-borda-chapa-metal-509478-05.jpg?ims=318x">
                        <source media="(max-width: 1280px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-desbaste-borda-chapa-metal-509478-05.jpg?ims=400x">
                        <source media="(min-width: 1440px)" srcset="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-desbaste-borda-chapa-metal-509478-05.jpg?ims=400x">
                        <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmerilhadeira-angular-black-decker-g720xb2-desbaste-borda-chapa-metal-509478-05.jpg" 
                        alt="Esmerilhadeira Black & Decker desbastando borda de peça metálica espessa">
                    </picture>

                </div>

                <label for="feat2" class="feature-card" role="radio" style="width: 90%;" aria-checked="false" tabindex="0">
                    <article>
                        <h2>A PEGADA É SEGURA?</h2>
                        <p>Sua carcaça é emborrachada e conta com empunhadura ergonômica de 3 posições, dando total controle.</p>
                    </article>
                </label>
            </section>

            <!-- Coluna Direita -->
            <aside class="column" aria-label="Funcionalidade de troca de disco">
                <label for="feat3" class="feature-card" role="radio" aria-checked="false" tabindex="0">
                    <article>
                        <h2>É FÁCIL TROCAR DISCO?</h2>
                        <p>A troca de disco é rápida graças ao botão de trava do eixo e o ajuste da guarda é feito sem ferramentas.</p>
                    </article>
                </label>
            </aside>
        </div>
    </div>
</section>`,
  css: `   .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
        }

        .features-section {
            max-width: 1200px;
            margin: 40px auto;
            background: white;
            border-radius: 40px;
            padding: 60px 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.05);
            font-family: sans-serif;
        }

        .section-header {
            text-align: center;
            margin-bottom: 50px;
        }

        .section-header h2 {
            font-size: 2rem;
            line-height: 2rem;
            color: #000;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .section-header p {
            color: #8a8a8a;
            max-width: 600px;
            margin: 0 auto;
        }

        /* Layout Grid */
        .grid-container {
            display: grid;
            grid-template-columns: 1fr 1.2fr 1fr;
            gap: 30px;
            align-items: center;
        }

        .column {
            display: flex;
            flex-direction: column;
            gap: 30px;
        }

        /* Container da Imagem Central */
        .image-display {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 40px;
        }

        .circle-frame {
            width: 100%;
            max-width: 400px;
            aspect-ratio: 780 / 740;
            border-radius: 50%;
            border: 05px solid #f2540d;
            overflow: hidden;
            position: relative;
            background: #eee;
        }

        /* Ajuste para que o picture se comporte como a imagem antiga */
        .circle-frame picture {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .circle-frame img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        /* Estilo dos Cards */
        .feature-card {
            display: block;
            background: white;
            padding: 25px;
            border-radius: 20px;
            border: 2px solid #eee;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            position: relative;
        }

        .feature-card h2 {
            margin: 0 0 10px 0;
            font-size: 1.2rem;
            color: #000;
            font-weight: 550;
            line-height: 2.2vh;
        }

        .feature-card p {
            margin: 0;
            font-size: 0.95rem;
            color: #666;
            line-height: 1.6;
        }

        /* Animações e Estados Interativos */
        .feature-card:hover {
            background-color: #fffcfa;
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.08);
        }

        /* Feedback visual quando o input invisível é focado ou marcado */
        input:focus-visible + .feature-card {
            outline: 3px solid #f2540d;
            outline-offset: 5px;
        }

        /* Lógica de Troca de Imagens (através da tag picture agora) */
        #feat1:checked ~ .grid-container .img1,
        #feat2:checked ~ .grid-container .img2,
        #feat3:checked ~ .grid-container .img3 {
            opacity: 1;
            z-index: 2;
        }

        #feat1:checked ~ .grid-container label[for="feat1"],
        #feat2:checked ~ .grid-container label[for="feat2"],
        #feat3:checked ~ .grid-container label[for="feat3"] {
            border-color: #f2540d;
            background-color: #fffcfa;
        }

@media (max-width: 1060px) {

        .grid-container {
                grid-template-columns: 1fr;
                gap: 40px;
            }

            .image-display {
                grid-row: 1;
            }

            .circle-frame {
                max-width: 320px;
            }

            .column {
                order: 2;
            }
        }



`
}
);
