# SenkoLib - Regras Para Manutencao

O guia oficial em `app/tools/guide/register.js` e prioridade maxima.

A documentacao tecnica canonica do Firebase fica em `docs/firebase/`. Antes de
alterar persistencia, autenticacao, permissoes, modelo de dados,
presenca, migracao, backup ou deploy, leia `docs/README.md` e
`docs/PRODUCT_SPECIFICATION.md`.

Em um novo computador ou uma nova instancia, leia tambem
`docs/CONTEXTO_COMPLETO_CODEX.txt` antes de modificar o projeto.

Sempre que uma mudanca alterar arquitetura, feature, fluxo de dados, GitHub,
estilos globais, validacoes, mensagens de erro, pastas ou responsabilidades,
atualize tambem o guia. Codigo atualizado com guia desatualizado ainda deve ser
considerado trabalho incompleto.

Regras principais:

- Antes de criar qualquer feature, tool, area de produto, tipo persistente,
  integracao ou fluxo de dados, a AI deve explicar resumidamente o que sera
  criado, onde ficara e como persistira, e perguntar explicitamente ao usuario
  se deseja prosseguir. A implementacao so comeca depois de uma resposta
  afirmativa, mesmo quando o pedido inicial ja usa verbos como criar,
  implementar ou adicionar. So pule essa pausa quando o usuario disser
  explicitamente para prosseguir sem perguntar.
- Toda nova area que cria ou altera dados deve seguir o contrato da Biblioteca
  e de Colecoes: Firestore como unica fonte editavel, `backup/latest/` como
  fallback publico somente leitura e inclusao automatica no unico backup global
  para GitHub. Qualquer excecao exige autorizacao explicita do usuario antes da
  implementacao.

- Cada feature deve continuar independente das outras features.
- A independencia vale tambem no fallback: cada feature carrega somente
  `backup/latest/{feature}/manifest.js` e `data.js`. `index.html` conhece apenas
  o manifesto global, e a ausencia de uma pasta nao pode indisponibilizar outra.
- Falhas de permissao ou listener em dados exclusivos de uma feature devem usar
  fallback e aviso locais; nao podem mudar o Firebase ou o modo de dados global.
- `shared` deve guardar apenas tokens, componentes neutros e assets globais.
- O shell nao deve conhecer regras internas de Biblioteca, Colecoes, Imagens,
  Sources ou Preview.
- A integracao GitHub ativa deve ficar em `app/infrastructure/github`; o GitHub
  e usado somente pelo backup global; features nao gravam nele.
- Todo arquivo do projeto deve aparecer em
  `backup/meta/file-classification.json` com um unico estado.
- Nomes duplicados devem ser bloqueados ao criar e ao editar.
- Ao finalizar qualquer alteracao relevante, revise o guia antes de responder
  que o trabalho terminou.
- Mudancas Firebase devem atualizar o documento tecnico correspondente,
  `docs/PRODUCT_SPECIFICATION.md` e os casos afetados em
  `docs/firebase/TEST_PLAN.md`.
- Nao marque backup como concluido sem uma restauracao testada.
- Nunca use gpt-image-2 neste projeto.
