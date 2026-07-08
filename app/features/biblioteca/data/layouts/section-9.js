// @ts-nocheck
SenkoLib.registerLayout(
{
  id: "section-9",
  name: "Section-9",
  tags: ["Section 9", "9", "grid"],
  html: `<section id="faq-section" aria-labelledby="faq-section-title">
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
</section>`,
  css: `<style>
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
</style>`
}
);
