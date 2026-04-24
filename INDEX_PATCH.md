# Patch para index.html
# Adicione as linhas marcadas nos locais indicados.
# Nenhuma linha existente é removida ou alterada.

## 1. No <head>, após <link rel="stylesheet" href="assets/styles.css" />

  <link rel="stylesheet" href="assets/col-styles.css" />


## 2. No <body>, antes de </body> (após os scripts existentes do GitHub)
#    Inserir após:  <script src="modules/github/senko-github-delete.js"></script>

  <!-- ═══════════════════════════════════════════════════
       COLEÇÕES — motor e UI
       Ordem obrigatória:
         1. col-groups.js          motor de grupos (sem dados)
         2. col-groups-data.js     dados dos grupos
         3. col-core.js            motor de coleções
         4. colecoes/data/*.js     uma linha por coleção criada
         5. col-script.js          UI: grid, filtros, troca de aba
         6. col-modals.js          todos os modais
         7. senko-github-col.js    integração GitHub (Fase 2)
  ════════════════════════════════════════════════════ -->
  <script src="colecoes/col-groups.js"></script>
  <script src="colecoes/col-groups-data.js"></script>
  <script src="colecoes/col-core.js"></script>

  <!-- ═══════════════════════════════════════════════════
       ARQUIVOS DE COLEÇÕES
       Para cada coleção criada, adicione uma linha <script> abaixo.
       O módulo GitHub faz isso automaticamente ao criar uma coleção.
  ════════════════════════════════════════════════════ -->
  <script src="colecoes/data/kit-lancamento-2026.js"></script>
  <!-- <script src="colecoes/data/[slug].js"></script> -->

  <script src="colecoes/col-script.js"></script>
  <script src="colecoes/col-modals.js"></script>
  <!-- <script src="modules/github/senko-github-col.js"></script> -->
  <!-- descomente quando a Fase 2 estiver pronta -->
