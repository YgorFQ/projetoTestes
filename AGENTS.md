# SenkoLib - Regras Para Manutencao

O guia oficial em `app/tools/guide/register.js` e prioridade maxima.

A documentacao tecnica canonica do Firebase fica em `docs/firebase/`. Antes de
alterar persistencia, autenticacao, permissoes, modelo de dados,
presenca, migracao, backup ou deploy, leia `docs/README.md` e
`docs/PRODUCT_SPECIFICATION.md`.

Sempre que uma mudanca alterar arquitetura, feature, fluxo de dados, GitHub,
estilos globais, validacoes, mensagens de erro, pastas ou responsabilidades,
atualize tambem o guia. Codigo atualizado com guia desatualizado ainda deve ser
considerado trabalho incompleto.

Regras principais:

- Cada feature deve continuar independente das outras features.
- `shared` deve guardar apenas tokens, componentes neutros e assets globais.
- O shell nao deve conhecer regras internas de Biblioteca, Colecoes, Imagens,
  Sources ou Preview.
- A integracao GitHub ativa deve ficar em `app/infrastructure/github`; as
  o GitHub e usado somente pelo backup global; features nao gravam nele.
- Todo arquivo do projeto deve aparecer em
  `generated/meta/file-classification.json` com um unico estado.
- Nomes duplicados devem ser bloqueados ao criar e ao editar.
- Ao finalizar qualquer alteracao relevante, revise o guia antes de responder
  que o trabalho terminou.
- Mudancas Firebase devem atualizar o documento tecnico correspondente,
  `docs/PRODUCT_SPECIFICATION.md` e os casos afetados em
  `docs/firebase/TEST_PLAN.md`.
- Nao marque backup como concluido sem uma restauracao testada.
