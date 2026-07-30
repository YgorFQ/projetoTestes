// @ts-nocheck
/* senko-copy-base.js — snippet do botao "HTML Basico" */

(function () {
  'use strict';

  var api = window.SenkoBibliotecaCopyBase = window.SenkoBibliotecaCopyBase || {};
  var initialized = false;
  var htmlBasico = window.SenkoCopyBaseDefaultHtml || `<div class="lp-container">
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        .pdp {
            width: 100%;
            display: flex;
            flex-direction: column;
            font-family: Roboto, sans-serif;
        }

        .pdp * {
            box-sizing: border-box;
            margin: 0;
        }
    </style>
    <!-- ---------------------------------------- ÁREA PARA COLOCAR STYLES ----------------------------------------------------------- -->

    <style>
        /*inicio-area-de-faq*/
        #faq-section {
            width: 100%;
            padding: 2rem 16px;
            box-sizing: border-box;
            margin: 0 auto 25px;
            padding-top: 0;
            font-family: sans-serif;
        }

        #faq-section__header {
            text-align: center;
            margin: 1rem 0;
        }

        #faq-section__title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: bold;
            color: #333;
            margin: 0 0 12px;
            line-height: 98%;
        }

        #faq-section__subtitle {
            font-size: 1rem;
            color: #666;
            margin: 0;
        }

        #faq-section__list {
            list-style: none;
            margin: 0 auto;
            padding: 0;
            max-width: 60rem;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        #faq-section__item {
            background: #fff;
            border: 1px solid #e5e5e5;
            border-radius: 12px;
            overflow: hidden;
        }

        #faq-section__item summary {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 16px 20px;
            cursor: pointer;
            list-style: none;
        }

        #faq-section__item summary::-webkit-details-marker {
            display: none;
        }

        #faq-section__item summary:hover {
            background: #f9f9f9;
        }

        #faq-section__q-text {
            font-size: 1rem;
            font-weight: bold;
            color: #333;
            flex: 1;
        }

        #faq-section__q-text:hover {
            color: #ea5b0c;
        }

        #faq-section__icon {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
            position: relative;
        }

        #faq-section__icon::before,
        #faq-section__icon::after {
            content: '';
            position: absolute;
            background: #888;
            border-radius: 2px;
            transition: transform 0.25s ease, opacity 0.25s ease;
        }

        #faq-section__icon::before {
            width: 12px;
            height: 1.5px;
            top: 9px;
            left: 4px;
        }

        #faq-section__icon::after {
            width: 1.5px;
            height: 12px;
            top: 4px;
            left: 9px;
        }

        #faq-section__item[open] #faq-section__icon::after {
            transform: rotate(90deg);
            opacity: 0;
        }

        #faq-section__a-inner {
            padding: 14px 20px 16px;
            border-top: 1px solid #e5e5e5;
        }

        #faq-section__a-text {
            font-size: 0.9rem;
            color: #555;
            line-height: 1.6;
            margin: 0;
        }

        @media (max-width: 480px) {
            #faq-section__q-text {
                font-size: 0.9rem;
            }
        }

        /*final-area-de-faq*/
    </style>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <article class="pdp" id="pdp" aria-label="Conteúdo rico do produto"> <!-- HTML fica dentro dessa div PDP -->



        <!-- Área de FAQ -->
        <section id="faq-section" aria-label="Perguntas frequentes">
            <div id="faq-section__header">
                <h2 id="faq-section__title" id="faq-section-title">Título Principal</h2>
                <p id="faq-section__subtitle">Sub-título</p>
            </div>
            <ul id="faq-section__list">
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Pergunta</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Pergunta</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Pergunta</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Pergunta</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
                <li id="faq-section__item">
                    <details id="faq-section__item">
                        <summary>
                            <h3 id="faq-section__q-text">Pergunta</h3>
                            <span id="faq-section__icon" aria-hidden="true"></span>
                        </summary>
                        <div id="faq-section__a-inner">
                            <p id="faq-section__a-text">Resposta</p>
                        </div>
                    </details>
                </li>
            </ul>
        </section>

    </article>
</div>`;

  function copyWithFallback(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  function copyBaseHtml() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(htmlBasico).catch(function () {
        copyWithFallback(htmlBasico);
      });
      return;
    }

    copyWithFallback(htmlBasico);
  }

  api.init = function initCopyBase() {
    if (initialized) return;
    initialized = true;
    var copyButton = document.getElementById('copyAllBtn');
    if (!copyButton) return;
    copyButton.addEventListener('click', copyBaseHtml);
  };

  api.getHtml = function getCopyBaseHtml() {
    return htmlBasico;
  };

  api.setHtml = function setCopyBaseHtml(nextHtml) {
    if (typeof nextHtml !== 'string' || !nextHtml.trim()) return false;
    htmlBasico = nextHtml;
    window.SenkoCopyBaseDefaultHtml = nextHtml;
    return true;
  };
})();
