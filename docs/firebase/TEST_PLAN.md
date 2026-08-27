# Plano de testes

## Bateria rapida

```powershell
npm run test:structure
npm run test:asset-versioning
npm run test:access-modal
npm run test:static-backup
npm run test:copy-base-editor
npm run test:firebase-health
npm run test:faq-prototype
npm run test:team-notes
npm run scripts:check
```

## Regras Firestore

Com o emulador ativo:

```powershell
$env:FIRESTORE_EMULATOR_HOST='127.0.0.1:8080'
$env:GCLOUD_PROJECT='senkolib-rules-test'
node tests/firestore-client-writes.test.js
```

Cenarios obrigatorios:

- membro cria layout valido;
- visitante e recusado;
- schema com campo inesperado e recusado;
- nome reservado impede duplicata;
- versao atrasada e recusada;
- HTML Basico cria o singleton, incrementa a versao e recusa conflito;
- documento, revisao, reserva e dataVersion mudam juntos;
- owner/admin/editor mantem conteudo;
- regras administrativas respeitam cargos.
- membro cria secao e pagina de Notas;
- titulo duplicado na mesma secao e recusado;
- versao atrasada de pagina e recusada;
- visitante nao le nem altera Notas;
- excluir secao permite remover as paginas vinculadas.

## Regras Realtime Database

```powershell
$env:FIREBASE_DATABASE_EMULATOR_HOST='127.0.0.1:9000'
$env:GCLOUD_PROJECT='senkolib-database-rules-test'
node tests/database-member-management.test.js
```

Validar presenca propria, leitura por membro, bloqueio de visitante, owner,
admin e tentativa de promover owner sem permissao.

## Smoke test de Biblioteca

- abre e mostra contagem;
- pesquisa por nome e tag;
- preview renderiza;
- copiar HTML/CSS funciona;
- botao de editar HTML Basico abre o modal e carrega o valor atual;
- primeiro save cria `settings/copyBase` e o seguinte atualiza por versao;
- conflito preserva o rascunho e o modo estatico bloqueia o save;
- cria layout;
- edita layout;
- cria e edita variacao;
- exclui variacao e layout;
- nomes equivalentes sao recusados;
- ID tecnico nao e campo editavel;
- outro navegador recebe a mudanca.

## Smoke test de Colecoes

- abre e mostra grupos/colecoes;
- cria grupo;
- cria colecao no grupo;
- cria layout interno;
- edita layout completo;
- grupo vazio pode ser excluido;
- grupo em uso nao pode ser excluido;
- exclusao remove reservas relacionadas;
- outro navegador recebe a mudanca.

## Acessos

- conta desconhecida gera pendencia;
- owner aprova editor, admin ou owner;
- admin aprova editor/admin, nunca owner;
- editor nao abre gestao;
- rebaixamento e remocao respeitam limites;
- evento mostra ator, alvo, cargo e horario;
- modal fecha por botao, fundo e Escape;
- foco volta ao trigger.

## Concorrencia

Abra o mesmo item em dois navegadores. Salve no primeiro e tente salvar no
segundo. Esperado: segundo recebe conflito, rascunho fica recuperavel e o dado
do primeiro permanece no Firestore.

## Modo estatico

- Firebase indisponivel usa snapshot;
- badge informa somente leitura;
- criar, editar e excluir ficam bloqueados;
- pesquisa, preview e copia continuam;
- nenhuma feature tenta carregar fonte adicional;
- sem snapshot, estado vazio e visivel.

## Backup

- token nao aparece em payload gerado;
- um commit contem snapshot tecnico e publico;
- manifestos possuem contagens coerentes;
- mudanca de dataVersion durante exportacao causa nova tentativa;
- erro 401/403/404/rede possui mensagem util;
- falha do GitHub nao altera Firestore.

## Responsividade e acessibilidade

Teste desktop e mobile:

- menu nao sobrepoe criacao rapida;
- modais cabem na altura e rolam internamente;
- texto nao vaza de botoes;
- foco e visivel;
- Escape fecha overlays permitidos;
- labels e nomes acessiveis existem;
- tema claro e escuro mantem contraste.

## Prototipo Teste - FAQ multissite

- entrada aceita pares `<q>/<a>` e `<h3>/<p>`;
- importacao acrescenta perguntas somente ao site selecionado;
- edicao, inclusao e exclusao atualizam preview e codigo final;
- canonical eFacil, Martins e desconhecido mostram a versao correta;
- Entrada, Perguntas, Simular e Codigo alternam uma unica area principal por vez;
- a janela nao cria rolagem horizontal e o painel lateral de redirecionamentos nao existe;
- preview nao navega ao clicar nos links presentes nas respostas;
- entrega copiada contem somente HTML e CSS;
- tema claro e escuro preservam legibilidade da janela.

## Notas da equipe

- a tela ocupa toda a area da feature e separa secoes, paginas e editor em tres colunas continuas;
- criar secao bloqueia nome duplicado;
- excluir secao pede confirmacao, remove suas paginas e seleciona outra secao disponivel;
- criar, editar, copiar, salvar e excluir pagina atualizam o Firestore;
- exclusoes de secao e pagina usam o modal proprio das Notas, com foco contido, Escape e cancelamento pelo fundo;
- busca de secoes considera o nome e busca de paginas considera titulo e conteudo;
- tipo, tags e filtro de tipo nao aparecem na feature;
- itens da lista de paginas mostram somente titulo e data, sem previa do conteudo;
- navegar com alteracoes nao salvas pede confirmacao;
- as colunas de secoes e paginas possuem a mesma largura;
- salvar pagina mostra check ao lado do titulo, e nome duplicado mostra X vermelho, ambos com fade de dois segundos;
- o modo static usa backup/latest/team-notes/manifest.js e data.js e bloqueia toda mutacao;
- remover o payload de outra feature nao torna Notas indisponivel;
- salvar ou excluir nao chama a GitHub Contents API;
- o backup global inclui secoes e paginas no mesmo commit das demais mudancas;
- desktop, tablet e mobile permanecem navegaveis sem rolagem horizontal.

## Registro de uma rodada

Anote commit, ambiente, navegadores, testes executados, falhas conhecidas e
resultado do smoke test. Nao declare producao aprovada quando um teste de regra
foi substituido apenas por verificacao visual.
