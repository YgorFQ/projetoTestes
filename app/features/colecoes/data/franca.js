// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   colecoes/data/franca.js — Coleção: França

   ATENÇÃO: Arquivo gerado pelo módulo GitHub do SenkoLib.
   NÃO edite manualmente em produção.
═══════════════════════════════════════════════════════════════════════ */
ColLib.register({
  slug:  'franca',
  name:  'França',
  group: 'selecao-francesa',
  tags:  ['catalogo'],
  layouts: [
    /*@@@@Col - padrao-1 */
    {
      id:   'padrao-1',
      name: 'Padrão 1',
      html: `<div class="lp-container">
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
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet">
    <title>PDP - eFácil</title>
    <!-- ---------------------------------------- ÁREA PARA COLOCAR STYLES ----------------------------------------------------------- -->
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .product-header {
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

        .product-header__banner {
            width: 100%;
            height: var(--banner-height);
            position: relative;
            display: flex;
            justify-content: center;
        }

        .product-header__banner figure {
            width: 100%;
            height: 100%;
            margin: 0;
        }

        .product-header__banner-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .product-header__badge {
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

        .product-header__badge-img {
            max-width: 90px;
            max-height: 90px;
            object-fit: contain;
        }

        .product-header__body {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: calc(var(--badge-size) / 2 + 1.1rem) 0.3rem 2.5rem;
            text-align: center;
        }

        .product-header__brand {
            color: #ff9900;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }

        .product-header__title {
            font-size: clamp(1.4rem, 4vw, 2.4rem);
            line-height: clamp(1.6rem, 4vw, 3.1rem);
            font-weight: 600;
            max-width: 50rem;
            text-wrap: pretty;
        }

        .product-header__subtitle {
            color: #8a8a8a;
            font-size: clamp(1rem, 2vw, 1.2rem);
            line-height: 120%;
            margin-top: 1rem;
            max-width: 52rem;
            text-wrap: pretty;
        }

        @media (max-width: 768px) {
            .product-header {
                --banner-height: 180px;
            }
        }

        @media (max-width: 470px) {
            .product-header__subtitle {
                text-align: justify;
                font-size: clamp(0.9rem, 2vw, 1.2rem);
            }
        }
    </style>



    <style>
        .groupcontainer {

            width: 100%;
            max-width: 1600px;
            margin: 0 auto;
        }

        .groupcontainer2 {
            margin-bottom: 50px;
            align-self: center;
        }

        .groupimage-section {

            position: relative;
            width: 100%;
        }

        .groupimage-section img {

            width: 100%;
            height: auto;
            display: block;
        }

        .grouptext-overlay {

            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            width: 90%;
        }

        .grouptext-overlay-Up {

            position: absolute;
            top: 13%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            width: 90%;
            line-height: 100%;
            text-align: center
        }

        .grouptext-overlay-Down {

            position: absolute;
            top: 80%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            width: 90%;
            line-height: 100%;
            text-align: center
        }

        .grouptext-overlay-Right {

            position: absolute;
            top: 50%;
            left: 80%;
            transform: translate(-50%, -50%);
            text-align: left;
            max-width: 40%;
            width: 90%;
            line-height: 100%;
            text-align: center
        }

        .grouptext-overlay-Left {

            position: absolute;
            top: 50%;
            left: 25%;
            transform: translate(-50%, -50%);
            text-align: left;
            max-width: 40%;
            width: 90%;
            line-height: 100%;
            text-align: center
        }

        .grouptext-overlay h1 {

            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 1rem;
            color: #000000;
        }

        .grouptext-overlay h3 {

            font-size: 2.1rem;
            font-weight: bold;
            margin-bottom: 5px;
            color: #000000;
        }

        .grouptext-overlay p {

            font-size: 1.5rem;
            color: #000000;
        }

        .grouptext-overlay p1 {

            font-size: 1.5rem;
            color: #000000;
        }

        .groupvideo {

            width: 100%;
            height: auto;
            display: block;
        }

        /* Responsividade */

        @media (max-width: 1060px) {

            .grouptext-overlay h1 {

                font-size: 2rem;
            }

            .grouptext-overlay h3 {

                font-size: 1.8rem;
                margin-bottom: -5px;
            }

            .grouptext-overlay p {

                font-size: 0.7rem;
            }

            .grouptext-overlay p1 {

                font-size: 1rem;
            }
        }

        @media (max-width: 960px) {

            .grouptext-overlay h1 {

                font-size: 2rem;
            }

            .grouptext-overlay h3 {

                margin-top: 30px;
                font-size: 1.4rem;
                margin-bottom: -5px;
            }

            .grouptext-overlay p {

                font-size: 1rem;
            }

            .grouptext-overlay p1 {

                font-size: 1rem;
            }
        }

        @media (max-width: 768px) {

            .grouptext-overlay h1 {

                font-size: 2rem;
            }

            .grouptext-overlay h3 {

                font-size: 0.95rem;
                margin-bottom: -5px;
            }

            .grouptext-overlay p {

                font-size: 1rem;
            }

            .grouptext-overlay p1 {

                font-size: 0.9rem;
            }
        }

        @media (max-width: 480px) {

            .grouptext-overlay h1 {

                font-size: 1.5rem;
            }

            .grouptext-overlay h3 {

                font-size: 1.1rem;
            }

            .grouptext-overlay p {

                font-size: 0.8rem;
            }

            .grouptext-overlay p1 {

                font-size: 0.8rem;
            }
        }

        /*--------------------------Image Down----------------------------------*/

        .grouptext-overlay-Down h {

            font-size: 2vw;
            font-weight: bold;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down h1 {

            font-size: 1.9vw;
            font-weight: bold;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down h2 {

            font-size: 1.8vw;
            font-weight: bold;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down h3 {

            font-size: 1.7vw;
            font-weight: bold;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down p {

            font-size: 1.2vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down p1 {

            font-size: 1.1vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down p2 {

            font-size: 1vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down p3 {

            font-size: 0.9vw;
            color: #ffffff;
            line-height: 100%;
        }

        /* Responsividade */

        @media (max-width: 1260px) {

            .paintdrops {

                top: 100px;
            }
        }

        @media (max-width: 1060px) {

            .paintdrops {

                top: 120px;
            }

            .grouptext-overlay-Down {

                line-height: 160%;
                max-width: 70%;
            }

            .grouptext-overlay-Down h {

                font-size: 1.8vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Down h1 {

                font-size: 1.7vw;
                font-weight: bold;
                margin-bottom: 0.1rem;
            }

            .grouptext-overlay-Down h2 {

                font-size: 1.6vw;
                font-weight: bold;
                margin-bottom: .2rem;
            }

            .grouptext-overlay-Down h3 {

                font-size: 1.5vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Down p {

                font-size: 1vw;
            }

            .grouptext-overlay-Down p1 {

                font-size: 0.9rem;
            }

            .grouptext-overlay-Down p2 {

                font-size: 0.8vw;
            }

            .grouptext-overlay-Down p3 {

                font-size: 0.7vw;
            }
        }

        @media (max-width: 960px) {

            .paintdrops {

                top: 130px;
            }

            .grouptext-overlay-Down {

                bottom: -2%;
                line-height: 140%;
                max-width: 80%;
            }

            .grouptext-overlay-Down h {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Down h1 {

                font-size: 2vw;
            }

            .grouptext-overlay-Down h2 {

                font-size: 1.9vw;
            }

            .grouptext-overlay-Down h3 {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Down p {

                font-size: 1.5vw;
            }

            .grouptext-overlay-Down p1 {

                font-size: 1.4vw;
            }

            .grouptext-overlay-Down p2 {

                font-size: 1.3vw;
            }

            .grouptext-overlay-Down p3 {

                font-size: 1.2vw;
            }
        }

        @media (max-width: 768px) {

            .paintdrops {

                top: 150px;
            }

            .grouptext-overlay-Down {

                bottom: 0%;
                line-height: 116%;
                max-width: 86%;
            }

            .grouptext-overlay-Down h {

                font-size: 2.5vw;
            }

            .grouptext-overlay-Down h1 {

                font-size: 2.4vw;
            }

            .grouptext-overlay-Down h2 {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Down h3 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Down p {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Down p1 {

                font-size: 1.7vw;
            }

            .grouptext-overlay-Down p2 {

                font-size: 1.6vw;
            }

            .grouptext-overlay-Down p3 {

                font-size: 1.5vw;
            }
        }

        @media (max-width: 500px) {

            .paintdrops {

                top: 150px;
            }

            .grouptext-overlay-Down {

                bottom: 0%;
                line-height: 140%;
                max-width: 80%;
            }

            .grouptext-overlay-Down h {

                font-size: 3vw;
            }

            .grouptext-overlay-Down h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Down h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Down h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Down p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Down p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Down p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Down p3 {

                font-size: 2vw;
            }
        }

        @media (max-width: 480px) {

            .grouptext-overlay-Down h {

                font-size: 3vw;
            }

            .grouptext-overlay-Down h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Down h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Down h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Down p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Down p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Down p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Down p3 {

                font-size: 2vw;
            }
        }

        /*--------------------------Image Up----------------------------------*/

        .grouptext-overlay-Up h {

            font-size: 2vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up h1 {

            font-size: 1.9vw;
            font-weight: bold;
            margin-bottom: 0.1rem;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up h2 {

            font-size: 1.8vw;
            font-weight: bold;
            margin-bottom: .2rem;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up h3 {

            font-size: 1.7vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up p {

            font-size: 1.2vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up p1 {

            font-size: 1.1vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up p2 {

            font-size: 1vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up p3 {

            font-size: 0.9vw;
            color: #ffffff;
            line-height: 100%;
        }

        /* Responsividade */

        @media (max-width: 1060px) {

            .grouptext-overlay-Up {

                top: 22%;
                line-height: 140%;
                max-width: 80%;
            }

            .grouptext-overlay-Up h {

                font-size: 1.8vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Up h1 {

                font-size: 1.7vw;
                font-weight: bold;
                margin-bottom: 0.1rem;
            }

            .grouptext-overlay-Up h2 {

                font-size: 1.6vw;
                font-weight: bold;
                margin-bottom: .2rem;
            }

            .grouptext-overlay-Up h3 {

                font-size: 1.5vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Up p {

                font-size: 1vw;
            }

            .grouptext-overlay-Up p1 {

                font-size: 0.9rem;
            }

            .grouptext-overlay-Up p2 {

                font-size: 0.8vw;
            }

            .grouptext-overlay-Up p3 {

                font-size: 0.7vw;
            }
        }

        @media (max-width: 960px) {

            .grouptext-overlay-Up {

                top: 25%;
                max-width: 70%;
            }

            .grouptext-overlay-Up h {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Up h1 {

                font-size: 2vw;
            }

            .grouptext-overlay-Up h2 {

                font-size: 1.9vw;
            }

            .grouptext-overlay-Up h3 {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Up p {

                font-size: 1.5vw;
            }

            .grouptext-overlay-Up p1 {

                font-size: 1.4vw;
            }

            .grouptext-overlay-Up p2 {

                font-size: 1.3vw;
            }

            .grouptext-overlay-Up p3 {

                font-size: 1.2vw;
            }
        }

        @media (max-width: 768px) {

            .grouptext-overlay-Up {

                top: 29%;
                max-width: 80%;
            }

            .grouptext-overlay-Up h {

                font-size: 2.5vw;
            }

            .grouptext-overlay-Up h1 {

                font-size: 2.4vw;
            }

            .grouptext-overlay-Up h2 {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Up h3 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Up p {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Up p1 {

                font-size: 1.7vw;
            }

            .grouptext-overlay-Up p2 {

                font-size: 1.6vw;
            }

            .grouptext-overlay-Up p3 {

                font-size: 1.5vw;
            }
        }

        @media (max-width: 500px) {

            .grouptext-overlay-Up {

                top: 30%;
                max-width: 70%;
            }

            .grouptext-overlay-Up h {

                font-size: 3vw;
            }

            .grouptext-overlay-Up h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Up h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Up h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Up p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Up p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Up p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Up p3 {

                font-size: 2vw;
            }
        }

        @media (max-width: 480px) {

            .grouptext-overlay-Up {

                top: 15%;
                max-width: 70%;
            }

            .grouptext-overlay-Up h {

                font-size: 3vw;
            }

            .grouptext-overlay-Up h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Up h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Up h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Up p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Up p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Up p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Up p3 {

                font-size: 2vw;
            }
        }

        /*--------------------------Image Text Right----------------------------------*/

        .grouptext-overlay-Right h {

            font-size: 2vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right h1 {

            font-size: 1.9vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right h2 {

            font-size: 1.8vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right h3 {

            font-size: 1.7vw;
            font-weight: bold;
            margin-bottom: 5px;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right p {

            font-size: 1.2vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right p1 {

            font-size: 1.1vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right p2 {

            font-size: 1vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right p3 {

            font-size: 0.9vw;
            color: #000000;
            line-height: 100%;
        }

        /* Responsividade */

        @media (max-width: 1060px) {

            .grouptext-overlay-Right {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Right h {

                font-size: 1.8vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Right h1 {

                font-size: 1.7vw;
                font-weight: bold;
                margin-bottom: 0.1rem;
            }

            .grouptext-overlay-Right h2 {

                font-size: 1.6vw;
                font-weight: bold;
                margin-bottom: .2rem;
            }

            .grouptext-overlay-Right h3 {

                font-size: 1.5vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Right p {

                font-size: 1vw;
            }

            .grouptext-overlay-Right p1 {

                font-size: 0.9rem;
            }

            .grouptext-overlay-Right p2 {

                font-size: 0.8vw;
            }

            .grouptext-overlay-Right p3 {

                font-size: 0.7vw;
            }
        }

        @media (max-width: 960px) {

            .grouptext-overlay-Right {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Right h {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Right h1 {

                font-size: 2vw;
            }

            .grouptext-overlay-Right h2 {

                font-size: 1.9vw;
            }

            .grouptext-overlay-Right h3 {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Right p {

                font-size: 1.5vw;
            }

            .grouptext-overlay-Right p1 {

                font-size: 1.4vw;
            }

            .grouptext-overlay-Right p2 {

                font-size: 1.3vw;
            }

            .grouptext-overlay-Right p3 {

                font-size: 1.2vw;
            }
        }

        @media (max-width: 768px) {

            .grouptext-overlay-Right {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Right h {

                font-size: 2.5vw;
            }

            .grouptext-overlay-Right h1 {

                font-size: 2.4vw;
            }

            .grouptext-overlay-Right h2 {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Right h3 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Right p {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Right p1 {

                font-size: 1.7vw;
            }

            .grouptext-overlay-Right p2 {

                font-size: 1.6vw;
            }

            .grouptext-overlay-Right p3 {

                font-size: 1.5vw;
            }
        }

        @media (max-width: 500px) {

            .grouptext-overlay-Right {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Right h {

                font-size: 3vw;
            }

            .grouptext-overlay-Right h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Right h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Right h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Right p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Right p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Right p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Right p3 {

                font-size: 2vw;
            }
        }

        @media (max-width: 480px) {

            .grouptext-overlay-Right {

                top: 15%;
                max-width: 70%;
            }

            .grouptext-overlay-Right h {

                font-size: 3vw;
            }

            .grouptext-overlay-Right h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Right h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Right h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Right p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Right p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Right p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Right p3 {

                font-size: 2vw;
            }
        }

        /*--------------------------Image Text Left----------------------------------*/

        .grouptext-overlay-Left h {

            font-size: 2vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left h1 {

            font-size: 1.9vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left h2 {

            font-size: 1.8vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left h3 {

            font-size: 1.7vw;
            font-weight: bold;
            margin-bottom: 5px;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left p {

            font-size: 1.2vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left p1 {

            font-size: 1.1vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left p2 {

            font-size: 1vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left p3 {

            font-size: 0.9vw;
            color: #000000;
            line-height: 100%;
        }

        /* Responsividade */

        @media (max-width: 1060px) {

            .grouptext-overlay-Left {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Left h {

                font-size: 2vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Left h1 {

                font-size: 1.9vw;
                font-weight: bold;
                margin-bottom: 0.1rem;
            }

            .grouptext-overlay-Left h2 {

                font-size: 1.8vw;
                font-weight: bold;
                margin-bottom: .2rem;
            }

            .grouptext-overlay-Left h3 {

                font-size: 1.7vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Left p {

                font-size: 1.2vw;
            }

            .grouptext-overlay-Left p1 {

                font-size: 1.1vw;
            }

            .grouptext-overlay-Left p2 {

                font-size: 1vw;
            }

            .grouptext-overlay-Left p3 {

                font-size: 0.9vw;
            }
        }

        @media (max-width: 960px) {

            .grouptext-overlay-Left {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Left h {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Left h1 {

                font-size: 2vw;
            }

            .grouptext-overlay-Left h2 {

                font-size: 1.9vw;
            }

            .grouptext-overlay-Left h3 {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Left p {

                font-size: 1.5vw;
            }

            .grouptext-overlay-Left p1 {

                font-size: 1.4vw;
            }

            .grouptext-overlay-Left p2 {

                font-size: 1.3vw;
            }

            .grouptext-overlay-Left p3 {

                font-size: 1.2vw;
            }
        }

        @media (max-width: 768px) {

            .grouptext-overlay-Left {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Left h {

                font-size: 2.5vw;
            }

            .grouptext-overlay-Left h1 {

                font-size: 2.4vw;
            }

            .grouptext-overlay-Left h2 {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Left h3 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Left p {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Left p1 {

                font-size: 1.7vw;
            }

            .grouptext-overlay-Left p2 {

                font-size: 1.6vw;
            }

            .grouptext-overlay-Left p3 {

                font-size: 1.5vw;
            }
        }

        @media (max-width: 500px) {

            .grouptext-overlay-Left {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Left h {

                font-size: 3vw;
            }

            .grouptext-overlay-Left h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Left h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Left h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Left p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Left p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Left p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Left p3 {

                font-size: 2vw;
            }
        }

        @media (max-width: 480px) {

            .grouptext-overlay-Left {

                top: 15%;
                max-width: 70%;
            }

            .grouptext-overlay-Left h {

                font-size: 3vw;
            }

            .grouptext-overlay-Left h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Left h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Left h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Left p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Left p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Left p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Left p3 {

                font-size: 2vw;
            }
        }

        /* ---------------------------------------- Glass TextBox----------------------------------------------------------- -->*/

        .grouptext-overlay-Background {

            /* Glass effect */

            background: rgba(255, 255, 255, 0.2);
            border-radius: 4.5vw;
            padding: 0.5rem;
            backdrop-filter: blur(0.8vw);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
            -webkit-backdrop-filter: blur(10px);
            /* Centralização do conteúdo */

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.3);
            max-width: 70%;
            z-index: 100;
        }

        .grouptext-overlay-Background2 {

            /* Glass effect */

            background-image: url('https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/tial/sign.jpg');
            background-size: contain;
            border-radius: 4.5vw;
            padding: 30px;
            backdrop-filter: blur(0.8vw);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
            -webkit-backdrop-filter: blur(10px);
            /* Centralização do conteúdo */

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.3);
            max-width: 70%;
            z-index: 100;
        }
    </style>

    <STYLE>
        .pdp-product {

            margin-left: auto;
            margin-right: auto;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }


        .pdp-product-description {

            --tw-text-opacity: 1;
            color: rgb(138 138 138/var(--tw-text-opacity));
            font-size: 14px;
            line-height: 22px;
            margin-top: 1rem;
            max-width: 56rem;
            text-align: center;
            text-wrap: pretty;
        }
    </STYLE>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

   <section class="product-header" aria-label="Cabeçalho do produto">
  <header class="product-header__banner">
    <figure style="width:100%;height:100%;margin:0;">
      <img
        src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/4600487.jpg"
        alt="Banner do produto" class="product-header__banner-img" loading="eager">
    </figure>

    <div class="product-header__badge" role="img" aria-label="Logo da marca">
      <img
        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/baly/baly-logo.png"
        alt="imagem png com ícone da marca" class="product-header__badge-img">
    </div>
  </header>

  <article class="product-header__body">
    <small class="product-header__brand">Baly</small>
    <h1 class="product-header__title">
      Energético Coco e Açaí
    </h1>
   
  </article>
</section>

        <div class="groupcontainer">
            <div class="groupimage-section">
                <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/energetico-baly-coco-acai-lata-473ml-respingo-liquido-4600487-01.jpg"
                    style="border-radius: 30px 30px 00px 00px;" width="1600" height="865"
                    alt="Lata de Energético Baly Coco e Açaí 473ml flutuando em meio a respingos de líquido roxo brilhante">
                <div class="grouptext-overlay-Right grouptext-overlay-Background"
                    style="max-width:41%; left:77%;min-height: 10%;top:12% ; background-color:#5f2845;">
                    <h1 style="color: #f0f0f0;"><b>Perfil Aromático e Sabor</b></h1>
                    <p1 style="color: #f0f0f0; font-weight: 600">
                       A união dos sabores tropicais resulta em uma combinação de açaí e coco característica desta bebida energética.
                    </p1>
                </div>
            </div>

            <div class="groupimage-section">
                <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/energetico-baly-coco-acai-lata-473ml-pessoa-bebendo-lifestyle-4600487-02.jpg"
                    style="border-radius: 00px 00px 30px 30px;" width="1600" height="865"
                    alt="Pessoa bebendo Energético Baly Coco e Açaí Lata 473ml em cenário lifestyle">
                <div class="grouptext-overlay-Right grouptext-overlay-Background"
                    style="max-width:41%; left:23%;min-height: 10%;top:12% ;background-color:#5f2845;">

                    <h1 style="color: #f0f0f0;"><b>Concentração de Cafeína</b></h1>
                    <p1 style="color: #f0f0f0; font-weight: 600">
                      O produto incorpora 60mg de cafeína por porção de 250ml para compor a sua estrutura energética.
                       
                    </p1>
                </div>
            </div>
        </div>


        <div class="pdp-product">
            <p class="pdp-product-description">
                <b>Imagens Meramente Ilustrativas</b>
            </p>
        </div>

    </div>
</div>`,
      css:  ``,
    },

    /*@@@@Col - video-telefone */
    {
      id:   'video-telefone',
      name: 'Video telefone',
      html: `<div class="lp-container">
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
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet">
    <title>PDP - eFácil</title>
    <!-- ---------------------------------------- ÁREA PARA COLOCAR STYLES ----------------------------------------------------------- -->
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .product-header {
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

        .product-header__banner {
            width: 100%;
            height: var(--banner-height);
            position: relative;
            display: flex;
            justify-content: center;
        }

        .product-header__banner figure {
            width: 100%;
            height: 100%;
            margin: 0;
        }

        .product-header__banner-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .product-header__badge {
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

        .product-header__badge-img {
            max-width: 90px;
            max-height: 90px;
            object-fit: contain;
        }

        .product-header__body {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: calc(var(--badge-size) / 2 + 1.1rem) 0.3rem 2.5rem;
            text-align: center;
        }

        .product-header__brand {
            color: #ff9900;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }

        .product-header__title {
            font-size: clamp(1.4rem, 4vw, 2.4rem);
            line-height: clamp(1.6rem, 4vw, 3.1rem);
            font-weight: 600;
            max-width: 50rem;
            text-wrap: pretty;
        }

        .product-header__subtitle {
            color: #8a8a8a;
            font-size: clamp(1rem, 2vw, 1.2rem);
            line-height: 120%;
            margin-top: 1rem;
            max-width: 52rem;
            text-wrap: pretty;
        }

        @media (max-width: 768px) {
            .product-header {
                --banner-height: 180px;
            }
        }

        @media (max-width: 470px) {
            .product-header__subtitle {
                text-align: justify;
                font-size: clamp(0.9rem, 2vw, 1.2rem);
            }
        }
    </style>


    <style>
        * {
            margin: 0;
            padding: 0;
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
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }

        .video-header__title {
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

        @media (max-width: 768px) {
            .video-header {
                --banner-height: 180px;
            }
        }

        @media (max-width: 470px) {
            .video-header__subtitle {
                text-align: justify;
                font-size: clamp(0.9rem, 2vw, 1.2rem);
            }
        }
    </style>

    <style>
        .groupcontainer {

            width: 100%;
            max-width: 1600px;
            margin: 0 auto;
        }

        .groupcontainer2 {
            margin-bottom: 50px;
            align-self: center;
        }

        .groupimage-section {

            position: relative;
            width: 100%;
        }

        .groupimage-section img {

            width: 100%;
            height: auto;
            display: block;
        }

        .grouptext-overlay {

            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            width: 90%;
        }

        .grouptext-overlay-Up {

            position: absolute;
            top: 13%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            width: 90%;
            line-height: 100%;
            text-align: center
        }

        .grouptext-overlay-Down {

            position: absolute;
            top: 80%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            width: 90%;
            line-height: 100%;
            text-align: center
        }

        .grouptext-overlay-Right {

            position: absolute;
            top: 50%;
            left: 80%;
            transform: translate(-50%, -50%);
            text-align: left;
            max-width: 40%;
            width: 90%;
            line-height: 100%;
            text-align: center
        }

        .grouptext-overlay-Left {

            position: absolute;
            top: 50%;
            left: 25%;
            transform: translate(-50%, -50%);
            text-align: left;
            max-width: 40%;
            width: 90%;
            line-height: 100%;
            text-align: center
        }

        .grouptext-overlay h1 {

            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 1rem;
            color: #000000;
        }

        .grouptext-overlay h3 {

            font-size: 2.1rem;
            font-weight: bold;
            margin-bottom: 5px;
            color: #000000;
        }

        .grouptext-overlay p {

            font-size: 1.5rem;
            color: #000000;
        }

        .grouptext-overlay p1 {

            font-size: 1.5rem;
            color: #000000;
        }

        .groupvideo {

            width: 100%;
            height: auto;
            display: block;
        }

        /* Responsividade */

        @media (max-width: 1060px) {

            .grouptext-overlay h1 {

                font-size: 2rem;
            }

            .grouptext-overlay h3 {

                font-size: 1.8rem;
                margin-bottom: -5px;
            }

            .grouptext-overlay p {

                font-size: 0.7rem;
            }

            .grouptext-overlay p1 {

                font-size: 1rem;
            }
        }

        @media (max-width: 960px) {

            .grouptext-overlay h1 {

                font-size: 2rem;
            }

            .grouptext-overlay h3 {

                margin-top: 30px;
                font-size: 1.4rem;
                margin-bottom: -5px;
            }

            .grouptext-overlay p {

                font-size: 1rem;
            }

            .grouptext-overlay p1 {

                font-size: 1rem;
            }
        }

        @media (max-width: 768px) {

            .grouptext-overlay h1 {

                font-size: 2rem;
            }

            .grouptext-overlay h3 {

                font-size: 0.95rem;
                margin-bottom: -5px;
            }

            .grouptext-overlay p {

                font-size: 1rem;
            }

            .grouptext-overlay p1 {

                font-size: 0.9rem;
            }
        }

        @media (max-width: 480px) {

            .grouptext-overlay h1 {

                font-size: 1.5rem;
            }

            .grouptext-overlay h3 {

                font-size: 1.1rem;
            }

            .grouptext-overlay p {

                font-size: 0.8rem;
            }

            .grouptext-overlay p1 {

                font-size: 0.8rem;
            }
        }

        /*--------------------------Image Down----------------------------------*/

        .grouptext-overlay-Down h {

            font-size: 2vw;
            font-weight: bold;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down h1 {

            font-size: 1.9vw;
            font-weight: bold;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down h2 {

            font-size: 1.8vw;
            font-weight: bold;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down h3 {

            font-size: 1.7vw;
            font-weight: bold;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down p {

            font-size: 1.2vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down p1 {

            font-size: 1.1vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down p2 {

            font-size: 1vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down p3 {

            font-size: 0.9vw;
            color: #ffffff;
            line-height: 100%;
        }

        /* Responsividade */

        @media (max-width: 1260px) {

            .paintdrops {

                top: 100px;
            }
        }

        @media (max-width: 1060px) {

            .paintdrops {

                top: 120px;
            }

            .grouptext-overlay-Down {

                line-height: 160%;
                max-width: 70%;
            }

            .grouptext-overlay-Down h {

                font-size: 1.8vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Down h1 {

                font-size: 1.7vw;
                font-weight: bold;
                margin-bottom: 0.1rem;
            }

            .grouptext-overlay-Down h2 {

                font-size: 1.6vw;
                font-weight: bold;
                margin-bottom: .2rem;
            }

            .grouptext-overlay-Down h3 {

                font-size: 1.5vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Down p {

                font-size: 1vw;
            }

            .grouptext-overlay-Down p1 {

                font-size: 0.9rem;
            }

            .grouptext-overlay-Down p2 {

                font-size: 0.8vw;
            }

            .grouptext-overlay-Down p3 {

                font-size: 0.7vw;
            }
        }

        @media (max-width: 960px) {

            .paintdrops {

                top: 130px;
            }

            .grouptext-overlay-Down {

                bottom: -2%;
                line-height: 140%;
                max-width: 80%;
            }

            .grouptext-overlay-Down h {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Down h1 {

                font-size: 2vw;
            }

            .grouptext-overlay-Down h2 {

                font-size: 1.9vw;
            }

            .grouptext-overlay-Down h3 {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Down p {

                font-size: 1.5vw;
            }

            .grouptext-overlay-Down p1 {

                font-size: 1.4vw;
            }

            .grouptext-overlay-Down p2 {

                font-size: 1.3vw;
            }

            .grouptext-overlay-Down p3 {

                font-size: 1.2vw;
            }
        }

        @media (max-width: 768px) {

            .paintdrops {

                top: 150px;
            }

            .grouptext-overlay-Down {

                bottom: 0%;
                line-height: 116%;
                max-width: 86%;
            }

            .grouptext-overlay-Down h {

                font-size: 2.5vw;
            }

            .grouptext-overlay-Down h1 {

                font-size: 2.4vw;
            }

            .grouptext-overlay-Down h2 {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Down h3 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Down p {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Down p1 {

                font-size: 1.7vw;
            }

            .grouptext-overlay-Down p2 {

                font-size: 1.6vw;
            }

            .grouptext-overlay-Down p3 {

                font-size: 1.5vw;
            }
        }

        @media (max-width: 500px) {

            .paintdrops {

                top: 150px;
            }

            .grouptext-overlay-Down {

                bottom: 0%;
                line-height: 140%;
                max-width: 80%;
            }

            .grouptext-overlay-Down h {

                font-size: 3vw;
            }

            .grouptext-overlay-Down h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Down h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Down h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Down p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Down p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Down p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Down p3 {

                font-size: 2vw;
            }
        }

        @media (max-width: 480px) {

            .grouptext-overlay-Down h {

                font-size: 3vw;
            }

            .grouptext-overlay-Down h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Down h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Down h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Down p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Down p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Down p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Down p3 {

                font-size: 2vw;
            }
        }

        /*--------------------------Image Up----------------------------------*/

        .grouptext-overlay-Up h {

            font-size: 2vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up h1 {

            font-size: 1.9vw;
            font-weight: bold;
            margin-bottom: 0.1rem;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up h2 {

            font-size: 1.8vw;
            font-weight: bold;
            margin-bottom: .2rem;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up h3 {

            font-size: 1.7vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up p {

            font-size: 1.2vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up p1 {

            font-size: 1.1vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up p2 {

            font-size: 1vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up p3 {

            font-size: 0.9vw;
            color: #ffffff;
            line-height: 100%;
        }

        /* Responsividade */

        @media (max-width: 1060px) {

            .grouptext-overlay-Up {

                top: 22%;
                line-height: 140%;
                max-width: 80%;
            }

            .grouptext-overlay-Up h {

                font-size: 1.8vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Up h1 {

                font-size: 1.7vw;
                font-weight: bold;
                margin-bottom: 0.1rem;
            }

            .grouptext-overlay-Up h2 {

                font-size: 1.6vw;
                font-weight: bold;
                margin-bottom: .2rem;
            }

            .grouptext-overlay-Up h3 {

                font-size: 1.5vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Up p {

                font-size: 1vw;
            }

            .grouptext-overlay-Up p1 {

                font-size: 0.9rem;
            }

            .grouptext-overlay-Up p2 {

                font-size: 0.8vw;
            }

            .grouptext-overlay-Up p3 {

                font-size: 0.7vw;
            }
        }

        @media (max-width: 960px) {

            .grouptext-overlay-Up {

                top: 25%;
                max-width: 70%;
            }

            .grouptext-overlay-Up h {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Up h1 {

                font-size: 2vw;
            }

            .grouptext-overlay-Up h2 {

                font-size: 1.9vw;
            }

            .grouptext-overlay-Up h3 {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Up p {

                font-size: 1.5vw;
            }

            .grouptext-overlay-Up p1 {

                font-size: 1.4vw;
            }

            .grouptext-overlay-Up p2 {

                font-size: 1.3vw;
            }

            .grouptext-overlay-Up p3 {

                font-size: 1.2vw;
            }
        }

        @media (max-width: 768px) {

            .grouptext-overlay-Up {

                top: 29%;
                max-width: 80%;
            }

            .grouptext-overlay-Up h {

                font-size: 2.5vw;
            }

            .grouptext-overlay-Up h1 {

                font-size: 2.4vw;
            }

            .grouptext-overlay-Up h2 {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Up h3 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Up p {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Up p1 {

                font-size: 1.7vw;
            }

            .grouptext-overlay-Up p2 {

                font-size: 1.6vw;
            }

            .grouptext-overlay-Up p3 {

                font-size: 1.5vw;
            }
        }

        @media (max-width: 500px) {

            .grouptext-overlay-Up {

                top: 30%;
                max-width: 70%;
            }

            .grouptext-overlay-Up h {

                font-size: 3vw;
            }

            .grouptext-overlay-Up h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Up h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Up h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Up p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Up p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Up p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Up p3 {

                font-size: 2vw;
            }
        }

        @media (max-width: 480px) {

            .grouptext-overlay-Up {

                top: 15%;
                max-width: 70%;
            }

            .grouptext-overlay-Up h {

                font-size: 3vw;
            }

            .grouptext-overlay-Up h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Up h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Up h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Up p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Up p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Up p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Up p3 {

                font-size: 2vw;
            }
        }

        /*--------------------------Image Text Right----------------------------------*/

        .grouptext-overlay-Right h {

            font-size: 2vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right h1 {

            font-size: 1.9vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right h2 {

            font-size: 1.8vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right h3 {

            font-size: 1.7vw;
            font-weight: bold;
            margin-bottom: 5px;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right p {

            font-size: 1.2vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right p1 {

            font-size: 1.1vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right p2 {

            font-size: 1vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right p3 {

            font-size: 0.9vw;
            color: #000000;
            line-height: 100%;
        }

        /* Responsividade */

        @media (max-width: 1060px) {

            .grouptext-overlay-Right {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Right h {

                font-size: 1.8vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Right h1 {

                font-size: 1.7vw;
                font-weight: bold;
                margin-bottom: 0.1rem;
            }

            .grouptext-overlay-Right h2 {

                font-size: 1.6vw;
                font-weight: bold;
                margin-bottom: .2rem;
            }

            .grouptext-overlay-Right h3 {

                font-size: 1.5vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Right p {

                font-size: 1vw;
            }

            .grouptext-overlay-Right p1 {

                font-size: 0.9rem;
            }

            .grouptext-overlay-Right p2 {

                font-size: 0.8vw;
            }

            .grouptext-overlay-Right p3 {

                font-size: 0.7vw;
            }
        }

        @media (max-width: 960px) {

            .grouptext-overlay-Right {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Right h {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Right h1 {

                font-size: 2vw;
            }

            .grouptext-overlay-Right h2 {

                font-size: 1.9vw;
            }

            .grouptext-overlay-Right h3 {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Right p {

                font-size: 1.5vw;
            }

            .grouptext-overlay-Right p1 {

                font-size: 1.4vw;
            }

            .grouptext-overlay-Right p2 {

                font-size: 1.3vw;
            }

            .grouptext-overlay-Right p3 {

                font-size: 1.2vw;
            }
        }

        @media (max-width: 768px) {

            .grouptext-overlay-Right {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Right h {

                font-size: 2.5vw;
            }

            .grouptext-overlay-Right h1 {

                font-size: 2.4vw;
            }

            .grouptext-overlay-Right h2 {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Right h3 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Right p {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Right p1 {

                font-size: 1.7vw;
            }

            .grouptext-overlay-Right p2 {

                font-size: 1.6vw;
            }

            .grouptext-overlay-Right p3 {

                font-size: 1.5vw;
            }
        }

        @media (max-width: 500px) {

            .grouptext-overlay-Right {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Right h {

                font-size: 3vw;
            }

            .grouptext-overlay-Right h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Right h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Right h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Right p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Right p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Right p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Right p3 {

                font-size: 2vw;
            }
        }

        @media (max-width: 480px) {

            .grouptext-overlay-Right {

                top: 15%;
                max-width: 70%;
            }

            .grouptext-overlay-Right h {

                font-size: 3vw;
            }

            .grouptext-overlay-Right h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Right h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Right h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Right p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Right p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Right p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Right p3 {

                font-size: 2vw;
            }
        }

        /*--------------------------Image Text Left----------------------------------*/

        .grouptext-overlay-Left h {

            font-size: 2vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left h1 {

            font-size: 1.9vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left h2 {

            font-size: 1.8vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left h3 {

            font-size: 1.7vw;
            font-weight: bold;
            margin-bottom: 5px;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left p {

            font-size: 1.2vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left p1 {

            font-size: 1.1vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left p2 {

            font-size: 1vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left p3 {

            font-size: 0.9vw;
            color: #000000;
            line-height: 100%;
        }

        /* Responsividade */

        @media (max-width: 1060px) {

            .grouptext-overlay-Left {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Left h {

                font-size: 2vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Left h1 {

                font-size: 1.9vw;
                font-weight: bold;
                margin-bottom: 0.1rem;
            }

            .grouptext-overlay-Left h2 {

                font-size: 1.8vw;
                font-weight: bold;
                margin-bottom: .2rem;
            }

            .grouptext-overlay-Left h3 {

                font-size: 1.7vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Left p {

                font-size: 1.2vw;
            }

            .grouptext-overlay-Left p1 {

                font-size: 1.1vw;
            }

            .grouptext-overlay-Left p2 {

                font-size: 1vw;
            }

            .grouptext-overlay-Left p3 {

                font-size: 0.9vw;
            }
        }

        @media (max-width: 960px) {

            .grouptext-overlay-Left {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Left h {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Left h1 {

                font-size: 2vw;
            }

            .grouptext-overlay-Left h2 {

                font-size: 1.9vw;
            }

            .grouptext-overlay-Left h3 {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Left p {

                font-size: 1.5vw;
            }

            .grouptext-overlay-Left p1 {

                font-size: 1.4vw;
            }

            .grouptext-overlay-Left p2 {

                font-size: 1.3vw;
            }

            .grouptext-overlay-Left p3 {

                font-size: 1.2vw;
            }
        }

        @media (max-width: 768px) {

            .grouptext-overlay-Left {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Left h {

                font-size: 2.5vw;
            }

            .grouptext-overlay-Left h1 {

                font-size: 2.4vw;
            }

            .grouptext-overlay-Left h2 {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Left h3 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Left p {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Left p1 {

                font-size: 1.7vw;
            }

            .grouptext-overlay-Left p2 {

                font-size: 1.6vw;
            }

            .grouptext-overlay-Left p3 {

                font-size: 1.5vw;
            }
        }

        @media (max-width: 500px) {

            .grouptext-overlay-Left {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Left h {

                font-size: 3vw;
            }

            .grouptext-overlay-Left h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Left h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Left h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Left p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Left p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Left p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Left p3 {

                font-size: 2vw;
            }
        }

        @media (max-width: 480px) {

            .grouptext-overlay-Left {

                top: 15%;
                max-width: 70%;
            }

            .grouptext-overlay-Left h {

                font-size: 3vw;
            }

            .grouptext-overlay-Left h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Left h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Left h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Left p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Left p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Left p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Left p3 {

                font-size: 2vw;
            }
        }

        /* ---------------------------------------- Glass TextBox----------------------------------------------------------- -->*/

        .grouptext-overlay-Background {

            /* Glass effect */

            background: rgba(255, 255, 255, 0.2);
            border-radius: 4.5vw;
            padding: 0.5rem;
            backdrop-filter: blur(0.8vw);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
            -webkit-backdrop-filter: blur(10px);
            /* Centralização do conteúdo */

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.3);
            max-width: 70%;
            z-index: 100;
        }

        .grouptext-overlay-Background2 {

            /* Glass effect */

            background-image: url('https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/tial/sign.jpg');
            background-size: contain;
            border-radius: 4.5vw;
            padding: 30px;
            backdrop-filter: blur(0.8vw);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
            -webkit-backdrop-filter: blur(10px);
            /* Centralização do conteúdo */

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.3);
            max-width: 70%;
            z-index: 100;
        }
    </style>

    <STYLE>
        .pdp-product {

            margin-left: auto;
            margin-right: auto;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }


        .pdp-product-description {

            --tw-text-opacity: 1;
            color: rgb(138 138 138/var(--tw-text-opacity));
            font-size: 14px;
            line-height: 22px;
            margin-top: 1rem;
            max-width: 56rem;
            text-align: center;
            text-wrap: pretty;
        }
    </STYLE>

    <style>
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
    </style>
    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="video-header" aria-label="Cabeçalho do produto">
            <header class="video-header__banner">
                <video class="video-header__banner-video"
                    poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmalte-impala-a-cor-da-moda-ilustracao-frasco-vermelho-113512-01.jpg"
                    preload="none" autoplay muted loop playsinline width="1200" height="250" aria-hidden="true">
                    <source
                        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/impala/header-impala.mov"
                        loading="eager">
                </video>
                <div class="video-header__badge" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/impala/impala-logo.png"
                        alt="imagem png com ícone da marca" class="video-header__badge-img">
                </div>
            </header>
            <article class="video-header__body">
                <small class="video-header__brand">impala</small>
                <h1 class="video-header__title">
                    Esmalte a Cor da Sua Moda - Tudo Dourado
                </h1>

            </article>
        </section>


        <div class="section-13-container">
            <section class="section-13" aria-label="Demonstração em vídeo do produto">
                <figure class="section-13__phone-wrap">
                    <div class="section-13__phone" role="img" aria-label="Celular exibindo vídeo do produto">
                        <div class="section-13__notch" aria-hidden="true"></div>
                        <!-- Tela -->
                        <div class="section-13__screen">
                            <video class="section-13__video"
                                src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/impala/esmalte-impala-a-cor-da-sua-moda-colecao-efeito-po-cromado-tutorial-113512-04.mov"
                                autoplay muted loop playsinline aria-label="Demonstração em vídeo do produto"></video>
                        </div>
                    </div>
                    <figcaption class="section-13__caption">

                    </figcaption>
                </figure>
            </section>
        </div>

        <div class="groupcontainer">
            <div class="groupimage-section">
                <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmalte-impala-a-cor-da-moda-glitter-tudo-dourado-still-life-113511-01.jpg"
                    style="border-radius: 30px 30px 00px 00px;" width="1600" height="865"
                    alt="Esmalte Impala A Cor da Moda Glitter Tudo Dourado 7,5ml em cenário luxuoso com acessórios dourados">
                <div class="grouptext-overlay-Right grouptext-overlay-Background"
                    style="max-width:41%; left:77%;min-height: 10%;top:12% ; background-color:#c89e6e;">
                    <h1 style="color: #f0f0f0;"><b>Luminosidade com Brilho</b></h1>
                    <p1 style="color: #f0f0f0; font-weight: 600">
                        O efeito reflexivo do pó cromado ilumina as mãos com uma luminosidade radiante e sofisticada.
                    </p1>
                </div>
            </div>

            <div class="groupimage-section">
                <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmalte-impala-a-cor-da-moda-glitter-tudo-dourado-unhas-lifestyle-113511-02.jpg"
                    style="border-radius: 00px 00px 30px 30px;" width="1600" height="865"
                    alt="Mão segurando Esmalte Impala Glitter Tudo Dourado com aplicação em degradê nas unhas sobre fundo brilhante">
                <div class="grouptext-overlay-Right grouptext-overlay-Background"
                    style="max-width:41%; left:23%;min-height: 10%;top: 17% ;background-color:#c89e6e;">

                    <h1 style="color: #f0f0f0;"><b>Pigmentação com Cobertura</b></h1>
                    <p1 style="color: #f0f0f0; font-weight: 600">
                        O esmalte utiliza uma formulação de alto desempenho que cobre a superfície da unha com  uniformidade.
                       
                    </p1>
                </div>
            </div>
        </div>


        <div class="pdp-product">
            <p class="pdp-product-description">
                <b>Imagens Meramente Ilustrativas</b>
            </p>
        </div>

    </div>
</div>`,
      css:  ``,
    },

    /*@@@@Col - padrao-2 */
    {
      id:   'padrao-2',
      name: 'padrão 2',
      html: `<div class="lp-container">
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
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet">
    <title>PDP - eFácil</title>
    <!-- ---------------------------------------- ÁREA PARA COLOCAR STYLES ----------------------------------------------------------- -->
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .product-header {
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

        .product-header__banner {
            width: 100%;
            height: var(--banner-height);
            position: relative;
            display: flex;
            justify-content: center;
        }

        .product-header__banner figure {
            width: 100%;
            height: 100%;
            margin: 0;
        }

        .product-header__banner-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .product-header__badge {
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

        .product-header__badge-img {
            max-width: 90px;
            max-height: 90px;
            object-fit: contain;
        }

        .product-header__body {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: calc(var(--badge-size) / 2 + 1.1rem) 0.3rem 2.5rem;
            text-align: center;
        }

        .product-header__brand {
            color: #ff9900;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }

        .product-header__title {
            font-size: clamp(1.4rem, 4vw, 2.4rem);
            line-height: clamp(1.6rem, 4vw, 3.1rem);
            font-weight: 600;
            max-width: 50rem;
            text-wrap: pretty;
        }

        .product-header__subtitle {
            color: #8a8a8a;
            font-size: clamp(1rem, 2vw, 1.2rem);
            line-height: 120%;
            margin-top: 1rem;
            max-width: 52rem;
            text-wrap: pretty;
        }

        @media (max-width: 768px) {
            .product-header {
                --banner-height: 180px;
            }
        }

        @media (max-width: 470px) {
            .product-header__subtitle {
                text-align: justify;
                font-size: clamp(0.9rem, 2vw, 1.2rem);
            }
        }
    </style>


    <style>
        * {
            margin: 0;
            padding: 0;
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
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }

        .video-header__title {
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

        @media (max-width: 768px) {
            .video-header {
                --banner-height: 180px;
            }
        }

        @media (max-width: 470px) {
            .video-header__subtitle {
                text-align: justify;
                font-size: clamp(0.9rem, 2vw, 1.2rem);
            }
        }
    </style>

    <style>
        .groupcontainer {

            width: 100%;
            max-width: 1600px;
            margin: 0 auto;
        }

        .groupcontainer2 {
            margin-bottom: 50px;
            align-self: center;
        }

        .groupimage-section {

            position: relative;
            width: 100%;
        }

        .groupimage-section img {

            width: 100%;
            height: auto;
            display: block;
        }

        .grouptext-overlay {

            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            width: 90%;
        }

        .grouptext-overlay-Up {

            position: absolute;
            top: 13%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            width: 90%;
            line-height: 100%;
            text-align: center
        }

        .grouptext-overlay-Down {

            position: absolute;
            top: 80%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            width: 90%;
            line-height: 100%;
            text-align: center
        }

        .grouptext-overlay-Right {

            position: absolute;
            top: 50%;
            left: 80%;
            transform: translate(-50%, -50%);
            text-align: left;
            max-width: 40%;
            width: 90%;
            line-height: 100%;
            text-align: center
        }

        .grouptext-overlay-Left {

            position: absolute;
            top: 50%;
            left: 25%;
            transform: translate(-50%, -50%);
            text-align: left;
            max-width: 40%;
            width: 90%;
            line-height: 100%;
            text-align: center
        }

        .grouptext-overlay h1 {

            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 1rem;
            color: #000000;
        }

        .grouptext-overlay h3 {

            font-size: 2.1rem;
            font-weight: bold;
            margin-bottom: 5px;
            color: #000000;
        }

        .grouptext-overlay p {

            font-size: 1.5rem;
            color: #000000;
        }

        .grouptext-overlay p1 {

            font-size: 1.5rem;
            color: #000000;
        }

        .groupvideo {

            width: 100%;
            height: auto;
            display: block;
        }

        /* Responsividade */

        @media (max-width: 1060px) {

            .grouptext-overlay h1 {

                font-size: 2rem;
            }

            .grouptext-overlay h3 {

                font-size: 1.8rem;
                margin-bottom: -5px;
            }

            .grouptext-overlay p {

                font-size: 0.7rem;
            }

            .grouptext-overlay p1 {

                font-size: 1rem;
            }
        }

        @media (max-width: 960px) {

            .grouptext-overlay h1 {

                font-size: 2rem;
            }

            .grouptext-overlay h3 {

                margin-top: 30px;
                font-size: 1.4rem;
                margin-bottom: -5px;
            }

            .grouptext-overlay p {

                font-size: 1rem;
            }

            .grouptext-overlay p1 {

                font-size: 1rem;
            }
        }

        @media (max-width: 768px) {

            .grouptext-overlay h1 {

                font-size: 2rem;
            }

            .grouptext-overlay h3 {

                font-size: 0.95rem;
                margin-bottom: -5px;
            }

            .grouptext-overlay p {

                font-size: 1rem;
            }

            .grouptext-overlay p1 {

                font-size: 0.9rem;
            }
        }

        @media (max-width: 480px) {

            .grouptext-overlay h1 {

                font-size: 1.5rem;
            }

            .grouptext-overlay h3 {

                font-size: 1.1rem;
            }

            .grouptext-overlay p {

                font-size: 0.8rem;
            }

            .grouptext-overlay p1 {

                font-size: 0.8rem;
            }
        }

        /*--------------------------Image Down----------------------------------*/

        .grouptext-overlay-Down h {

            font-size: 2vw;
            font-weight: bold;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down h1 {

            font-size: 1.9vw;
            font-weight: bold;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down h2 {

            font-size: 1.8vw;
            font-weight: bold;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down h3 {

            font-size: 1.7vw;
            font-weight: bold;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down p {

            font-size: 1.2vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down p1 {

            font-size: 1.1vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down p2 {

            font-size: 1vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Down p3 {

            font-size: 0.9vw;
            color: #ffffff;
            line-height: 100%;
        }

        /* Responsividade */

        @media (max-width: 1260px) {

            .paintdrops {

                top: 100px;
            }
        }

        @media (max-width: 1060px) {

            .paintdrops {

                top: 120px;
            }

            .grouptext-overlay-Down {

                line-height: 160%;
                max-width: 70%;
            }

            .grouptext-overlay-Down h {

                font-size: 1.8vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Down h1 {

                font-size: 1.7vw;
                font-weight: bold;
                margin-bottom: 0.1rem;
            }

            .grouptext-overlay-Down h2 {

                font-size: 1.6vw;
                font-weight: bold;
                margin-bottom: .2rem;
            }

            .grouptext-overlay-Down h3 {

                font-size: 1.5vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Down p {

                font-size: 1vw;
            }

            .grouptext-overlay-Down p1 {

                font-size: 0.9rem;
            }

            .grouptext-overlay-Down p2 {

                font-size: 0.8vw;
            }

            .grouptext-overlay-Down p3 {

                font-size: 0.7vw;
            }
        }

        @media (max-width: 960px) {

            .paintdrops {

                top: 130px;
            }

            .grouptext-overlay-Down {

                bottom: -2%;
                line-height: 140%;
                max-width: 80%;
            }

            .grouptext-overlay-Down h {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Down h1 {

                font-size: 2vw;
            }

            .grouptext-overlay-Down h2 {

                font-size: 1.9vw;
            }

            .grouptext-overlay-Down h3 {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Down p {

                font-size: 1.5vw;
            }

            .grouptext-overlay-Down p1 {

                font-size: 1.4vw;
            }

            .grouptext-overlay-Down p2 {

                font-size: 1.3vw;
            }

            .grouptext-overlay-Down p3 {

                font-size: 1.2vw;
            }
        }

        @media (max-width: 768px) {

            .paintdrops {

                top: 150px;
            }

            .grouptext-overlay-Down {

                bottom: 0%;
                line-height: 116%;
                max-width: 86%;
            }

            .grouptext-overlay-Down h {

                font-size: 2.5vw;
            }

            .grouptext-overlay-Down h1 {

                font-size: 2.4vw;
            }

            .grouptext-overlay-Down h2 {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Down h3 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Down p {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Down p1 {

                font-size: 1.7vw;
            }

            .grouptext-overlay-Down p2 {

                font-size: 1.6vw;
            }

            .grouptext-overlay-Down p3 {

                font-size: 1.5vw;
            }
        }

        @media (max-width: 500px) {

            .paintdrops {

                top: 150px;
            }

            .grouptext-overlay-Down {

                bottom: 0%;
                line-height: 140%;
                max-width: 80%;
            }

            .grouptext-overlay-Down h {

                font-size: 3vw;
            }

            .grouptext-overlay-Down h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Down h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Down h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Down p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Down p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Down p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Down p3 {

                font-size: 2vw;
            }
        }

        @media (max-width: 480px) {

            .grouptext-overlay-Down h {

                font-size: 3vw;
            }

            .grouptext-overlay-Down h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Down h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Down h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Down p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Down p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Down p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Down p3 {

                font-size: 2vw;
            }
        }

        /*--------------------------Image Up----------------------------------*/

        .grouptext-overlay-Up h {

            font-size: 2vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up h1 {

            font-size: 1.9vw;
            font-weight: bold;
            margin-bottom: 0.1rem;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up h2 {

            font-size: 1.8vw;
            font-weight: bold;
            margin-bottom: .2rem;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up h3 {

            font-size: 1.7vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up p {

            font-size: 1.2vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up p1 {

            font-size: 1.1vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up p2 {

            font-size: 1vw;
            color: #ffffff;
            line-height: 100%;
        }

        .grouptext-overlay-Up p3 {

            font-size: 0.9vw;
            color: #ffffff;
            line-height: 100%;
        }

        /* Responsividade */

        @media (max-width: 1060px) {

            .grouptext-overlay-Up {

                top: 22%;
                line-height: 140%;
                max-width: 80%;
            }

            .grouptext-overlay-Up h {

                font-size: 1.8vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Up h1 {

                font-size: 1.7vw;
                font-weight: bold;
                margin-bottom: 0.1rem;
            }

            .grouptext-overlay-Up h2 {

                font-size: 1.6vw;
                font-weight: bold;
                margin-bottom: .2rem;
            }

            .grouptext-overlay-Up h3 {

                font-size: 1.5vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Up p {

                font-size: 1vw;
            }

            .grouptext-overlay-Up p1 {

                font-size: 0.9rem;
            }

            .grouptext-overlay-Up p2 {

                font-size: 0.8vw;
            }

            .grouptext-overlay-Up p3 {

                font-size: 0.7vw;
            }
        }

        @media (max-width: 960px) {

            .grouptext-overlay-Up {

                top: 25%;
                max-width: 70%;
            }

            .grouptext-overlay-Up h {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Up h1 {

                font-size: 2vw;
            }

            .grouptext-overlay-Up h2 {

                font-size: 1.9vw;
            }

            .grouptext-overlay-Up h3 {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Up p {

                font-size: 1.5vw;
            }

            .grouptext-overlay-Up p1 {

                font-size: 1.4vw;
            }

            .grouptext-overlay-Up p2 {

                font-size: 1.3vw;
            }

            .grouptext-overlay-Up p3 {

                font-size: 1.2vw;
            }
        }

        @media (max-width: 768px) {

            .grouptext-overlay-Up {

                top: 29%;
                max-width: 80%;
            }

            .grouptext-overlay-Up h {

                font-size: 2.5vw;
            }

            .grouptext-overlay-Up h1 {

                font-size: 2.4vw;
            }

            .grouptext-overlay-Up h2 {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Up h3 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Up p {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Up p1 {

                font-size: 1.7vw;
            }

            .grouptext-overlay-Up p2 {

                font-size: 1.6vw;
            }

            .grouptext-overlay-Up p3 {

                font-size: 1.5vw;
            }
        }

        @media (max-width: 500px) {

            .grouptext-overlay-Up {

                top: 30%;
                max-width: 70%;
            }

            .grouptext-overlay-Up h {

                font-size: 3vw;
            }

            .grouptext-overlay-Up h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Up h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Up h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Up p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Up p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Up p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Up p3 {

                font-size: 2vw;
            }
        }

        @media (max-width: 480px) {

            .grouptext-overlay-Up {

                top: 15%;
                max-width: 70%;
            }

            .grouptext-overlay-Up h {

                font-size: 3vw;
            }

            .grouptext-overlay-Up h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Up h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Up h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Up p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Up p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Up p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Up p3 {

                font-size: 2vw;
            }
        }

        /*--------------------------Image Text Right----------------------------------*/

        .grouptext-overlay-Right h {

            font-size: 2vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right h1 {

            font-size: 1.9vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right h2 {

            font-size: 1.8vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right h3 {

            font-size: 1.7vw;
            font-weight: bold;
            margin-bottom: 5px;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right p {

            font-size: 1.2vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right p1 {

            font-size: 1.1vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right p2 {

            font-size: 1vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Right p3 {

            font-size: 0.9vw;
            color: #000000;
            line-height: 100%;
        }

        /* Responsividade */

        @media (max-width: 1060px) {

            .grouptext-overlay-Right {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Right h {

                font-size: 1.8vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Right h1 {

                font-size: 1.7vw;
                font-weight: bold;
                margin-bottom: 0.1rem;
            }

            .grouptext-overlay-Right h2 {

                font-size: 1.6vw;
                font-weight: bold;
                margin-bottom: .2rem;
            }

            .grouptext-overlay-Right h3 {

                font-size: 1.5vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Right p {

                font-size: 1vw;
            }

            .grouptext-overlay-Right p1 {

                font-size: 0.9rem;
            }

            .grouptext-overlay-Right p2 {

                font-size: 0.8vw;
            }

            .grouptext-overlay-Right p3 {

                font-size: 0.7vw;
            }
        }

        @media (max-width: 960px) {

            .grouptext-overlay-Right {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Right h {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Right h1 {

                font-size: 2vw;
            }

            .grouptext-overlay-Right h2 {

                font-size: 1.9vw;
            }

            .grouptext-overlay-Right h3 {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Right p {

                font-size: 1.5vw;
            }

            .grouptext-overlay-Right p1 {

                font-size: 1.4vw;
            }

            .grouptext-overlay-Right p2 {

                font-size: 1.3vw;
            }

            .grouptext-overlay-Right p3 {

                font-size: 1.2vw;
            }
        }

        @media (max-width: 768px) {

            .grouptext-overlay-Right {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Right h {

                font-size: 2.5vw;
            }

            .grouptext-overlay-Right h1 {

                font-size: 2.4vw;
            }

            .grouptext-overlay-Right h2 {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Right h3 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Right p {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Right p1 {

                font-size: 1.7vw;
            }

            .grouptext-overlay-Right p2 {

                font-size: 1.6vw;
            }

            .grouptext-overlay-Right p3 {

                font-size: 1.5vw;
            }
        }

        @media (max-width: 500px) {

            .grouptext-overlay-Right {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Right h {

                font-size: 3vw;
            }

            .grouptext-overlay-Right h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Right h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Right h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Right p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Right p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Right p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Right p3 {

                font-size: 2vw;
            }
        }

        @media (max-width: 480px) {

            .grouptext-overlay-Right {

                top: 15%;
                max-width: 70%;
            }

            .grouptext-overlay-Right h {

                font-size: 3vw;
            }

            .grouptext-overlay-Right h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Right h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Right h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Right p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Right p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Right p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Right p3 {

                font-size: 2vw;
            }
        }

        /*--------------------------Image Text Left----------------------------------*/

        .grouptext-overlay-Left h {

            font-size: 2vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left h1 {

            font-size: 1.9vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left h2 {

            font-size: 1.8vw;
            font-weight: bold;
            margin-bottom: .5rem;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left h3 {

            font-size: 1.7vw;
            font-weight: bold;
            margin-bottom: 5px;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left p {

            font-size: 1.2vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left p1 {

            font-size: 1.1vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left p2 {

            font-size: 1vw;
            color: #000000;
            line-height: 100%;
        }

        .grouptext-overlay-Left p3 {

            font-size: 0.9vw;
            color: #000000;
            line-height: 100%;
        }

        /* Responsividade */

        @media (max-width: 1060px) {

            .grouptext-overlay-Left {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Left h {

                font-size: 2vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Left h1 {

                font-size: 1.9vw;
                font-weight: bold;
                margin-bottom: 0.1rem;
            }

            .grouptext-overlay-Left h2 {

                font-size: 1.8vw;
                font-weight: bold;
                margin-bottom: .2rem;
            }

            .grouptext-overlay-Left h3 {

                font-size: 1.7vw;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .grouptext-overlay-Left p {

                font-size: 1.2vw;
            }

            .grouptext-overlay-Left p1 {

                font-size: 1.1vw;
            }

            .grouptext-overlay-Left p2 {

                font-size: 1vw;
            }

            .grouptext-overlay-Left p3 {

                font-size: 0.9vw;
            }
        }

        @media (max-width: 960px) {

            .grouptext-overlay-Left {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Left h {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Left h1 {

                font-size: 2vw;
            }

            .grouptext-overlay-Left h2 {

                font-size: 1.9vw;
            }

            .grouptext-overlay-Left h3 {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Left p {

                font-size: 1.5vw;
            }

            .grouptext-overlay-Left p1 {

                font-size: 1.4vw;
            }

            .grouptext-overlay-Left p2 {

                font-size: 1.3vw;
            }

            .grouptext-overlay-Left p3 {

                font-size: 1.2vw;
            }
        }

        @media (max-width: 768px) {

            .grouptext-overlay-Left {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Left h {

                font-size: 2.5vw;
            }

            .grouptext-overlay-Left h1 {

                font-size: 2.4vw;
            }

            .grouptext-overlay-Left h2 {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Left h3 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Left p {

                font-size: 1.8vw;
            }

            .grouptext-overlay-Left p1 {

                font-size: 1.7vw;
            }

            .grouptext-overlay-Left p2 {

                font-size: 1.6vw;
            }

            .grouptext-overlay-Left p3 {

                font-size: 1.5vw;
            }
        }

        @media (max-width: 500px) {

            .grouptext-overlay-Left {

                top: 50%;
                max-width: 40%;
            }

            .grouptext-overlay-Left h {

                font-size: 3vw;
            }

            .grouptext-overlay-Left h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Left h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Left h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Left p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Left p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Left p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Left p3 {

                font-size: 2vw;
            }
        }

        @media (max-width: 480px) {

            .grouptext-overlay-Left {

                top: 15%;
                max-width: 70%;
            }

            .grouptext-overlay-Left h {

                font-size: 3vw;
            }

            .grouptext-overlay-Left h1 {

                font-size: 2.9vw;
            }

            .grouptext-overlay-Left h2 {

                font-size: 2.8vw;
            }

            .grouptext-overlay-Left h3 {

                font-size: 2.7vw;
            }

            .grouptext-overlay-Left p {

                font-size: 2.3vw;
            }

            .grouptext-overlay-Left p1 {

                font-size: 2.2vw;
            }

            .grouptext-overlay-Left p2 {

                font-size: 2.1vw;
            }

            .grouptext-overlay-Left p3 {

                font-size: 2vw;
            }
        }

        /* ---------------------------------------- Glass TextBox----------------------------------------------------------- -->*/

        .grouptext-overlay-Background {

            /* Glass effect */

            background: rgba(255, 255, 255, 0.2);
            border-radius: 4.5vw;
            padding: 0.5rem;
            backdrop-filter: blur(0.8vw);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
            -webkit-backdrop-filter: blur(10px);
            /* Centralização do conteúdo */

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.3);
            max-width: 70%;
            z-index: 100;
        }

        .grouptext-overlay-Background2 {

            /* Glass effect */

            background-image: url('https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/tial/sign.jpg');
            background-size: contain;
            border-radius: 4.5vw;
            padding: 30px;
            backdrop-filter: blur(0.8vw);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
            -webkit-backdrop-filter: blur(10px);
            /* Centralização do conteúdo */

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.3);
            max-width: 70%;
            z-index: 100;
        }
    </style>

    <STYLE>
        .pdp-product {

            margin-left: auto;
            margin-right: auto;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }


        .pdp-product-description {

            --tw-text-opacity: 1;
            color: rgb(138 138 138/var(--tw-text-opacity));
            font-size: 14px;
            line-height: 22px;
            margin-top: 1rem;
            max-width: 56rem;
            text-align: center;
            text-wrap: pretty;
        }
    </STYLE>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

        <section class="video-header" aria-label="Cabeçalho do produto">
            <header class="video-header__banner">
                <video class="video-header__banner-video"
                    poster="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmalte-impala-a-cor-da-moda-ilustracao-frasco-vermelho-113512-01.jpg"
                    preload="none" autoplay muted loop playsinline width="1200" height="250" aria-hidden="true">
                    <source
                        src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/impala/header-impala.mov"
                        loading="eager">
                </video>
                <div class="video-header__badge" role="img" aria-label="Logo da marca">
                    <img src="https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/impala/impala-logo.png"
                        alt="imagem png com ícone da marca" class="video-header__badge-img">
                </div>
            </header>
            <article class="video-header__body">
                <small class="video-header__brand">impala</small>
                <h1 class="video-header__title">
                    Esmalte a Cor da Sua Moda - Tudo Dourado
                </h1>

            </article>
        </section>

        <div class="groupcontainer">
            <div class="groupimage-section">
                <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmalte-impala-a-cor-da-moda-glitter-tudo-dourado-still-life-113511-01.jpg"
                    style="border-radius: 30px 30px 00px 00px;" width="1600" height="865"
                    alt="Esmalte Impala A Cor da Moda Glitter Tudo Dourado 7,5ml em cenário luxuoso com acessórios dourados">
                <div class="grouptext-overlay-Right grouptext-overlay-Background"
                    style="max-width:41%; left:77%;min-height: 10%;top:12% ; background-color:#c89e6e;">
                    <h1 style="color: #f0f0f0;"><b>Luminosidade com Brilho</b></h1>
                    <p1 style="color: #f0f0f0; font-weight: 600">
                        O efeito reflexivo do pó cromado ilumina as mãos com uma luminosidade radiante e sofisticada.
                    </p1>
                </div>
            </div>

            <div class="groupimage-section">
                <img src="https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/esmalte-impala-a-cor-da-moda-glitter-tudo-dourado-unhas-lifestyle-113511-02.jpg"
                    style="border-radius: 00px 00px 30px 30px;" width="1600" height="865"
                    alt="Mão segurando Esmalte Impala Glitter Tudo Dourado com aplicação em degradê nas unhas sobre fundo brilhante">
                <div class="grouptext-overlay-Right grouptext-overlay-Background"
                    style="max-width:41%; left:23%;min-height: 10%;top: 17% ;background-color:#c89e6e;">

                    <h1 style="color: #f0f0f0;"><b>Pigmentação com Cobertura</b></h1>
                    <p1 style="color: #f0f0f0; font-weight: 600">
                        O esmalte utiliza uma formulação de alto desempenho que cobre a superfície da unha com  uniformidade.
                       
                    </p1>
                </div>
            </div>
        </div>


        <div class="pdp-product">
            <p class="pdp-product-description">
                <b>Imagens Meramente Ilustrativas</b>
            </p>
        </div>

    </div>
</div>`,
      css:  ``,
    },

  ]
});
