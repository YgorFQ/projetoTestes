// @ts-nocheck
SenkoLib.registerLayout(
{
  id: "section-22",
  name: "section-22",
  tags: ["tabela", "responsivo", "acessível"],
  html: `<footer aria-label="Informações complementares e produtos Relacionados">
  <p class="p__end">
    <strong>Imagens Meramente Ilustrativas</strong>
  </p>
  <section class="table-container-custom" aria-label="tabela contendo produtos relacionados e citados dentre deste conteúdo">
    <table class="table-design-custom" aria-describedby="table-desc">
      <caption id="table-desc" class="sr-only" style="text-align:left; padding: 0 0 8px; font-weight:600;">
        Produtos Havaianas Kids Color disponíveis
      </caption>
      <thead class="table-head-custom">
        <tr class="table-tr-custom">
          <th class="table-text-custom table-th-custom" style="background-color: #fb373c; border-radius: 10px 0 0 0;" scope="col">SKU
          </th>
          <th class="table-text-custom table-th-custom" style="background-color: #fb373c; border-radius: 0 10px 0 0;" scope="col">TÍTULO
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224878</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR BRANCO 23/4</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224879</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR BRANCO 25/6</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224881</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR BRANCO 27/8</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224882</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR BRANCO 29/0</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224883</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR BRANCO 31/2</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224884</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR PRETO 23/4</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224885</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR PRETO 25/6</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224886</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR PRETO 27/8</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224887</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR PRETO 29/0</td>
        </tr>
        <tr class="table-tr-custom">
          <td class="table-text-custom table-td-custom-title">1224888</td>
          <td class="table-text-custom table-td-custom-sub">HAVAIANAS KIDS COLOR PRETO 31/2</td>
        </tr>
      </tbody>
    </table>
  </section>
</footer>
`,
  css: `<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

   .p__end {
    color: #8a8a8a;
    font-family: sans-serif;
    font-size: clamp(1rem, 2vw, 1.2rem);
    text-wrap: pretty;
    text-align: center;
    padding: 40px 0;
  }


  .table-container-custom {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    display: block;
  }

  .table-design-custom {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
  }

  .table-head-custom {
    color: #fff;
    border-radius: 10px;
  }

  .table-text-custom {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #979797;
    font-family: sans-serif;
  }

  .table-row-custom:hover {
    background-color: #f1f1f1;
    filter: brightness(0.9);
  }

  .table-th-custom {
    font-weight: bold;
  }

  .table-td-custom {
    color: #555;
  }

  .table-tr-custom:nth-child(even) {
    background-color: #f1f1f1;
  }

  td a {
    color: #000;
    font-weight: 600;
    text-decoration: none;
  }

  td a:hover {
    color: #e74011;
  }

  @media (prefers-contrast: more) {
    .table-td-custom-sub {
      color: #000;
      font-weight: 550;
    }

    .table-td-custom-title {
      color: #000;
      font-weight: 700;
    }

    .p__end {
      color: #000;
    }
  }

  @media (max-width: 600px) {
    .table-container-custom {
      padding: 10px;
    }

    .table-text-custom,
    .table-th-custom,
    .table-td-custom {
      padding: 8px;
    }
  }
</style>`
}
);
