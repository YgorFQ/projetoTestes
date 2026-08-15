# SenkoLib - Regras Para Manutencao

O guia oficial em `app/shell/scripts/senko-guide.js` e prioridade maxima.

A documentacao tecnica canonica do Firebase fica em `docs/firebase/`. Antes de
alterar persistencia, autenticacao, permissoes, modelo de dados, Functions,
presenca, migracao, backup ou deploy, leia `docs/README.md` e
`docs/firebase/MIGRATION_STATUS.md`.

Sempre que uma mudanca alterar arquitetura, feature, fluxo de dados, GitHub,
estilos globais, validacoes, mensagens de erro, pastas ou responsabilidades,
atualize tambem o guia. Codigo atualizado com guia desatualizado ainda deve ser
considerado trabalho incompleto.

Regras principais:

- Cada feature deve continuar independente das outras features.
- `shared` deve guardar apenas tokens, componentes neutros e assets globais.
- O shell nao deve conhecer regras internas de Biblioteca, Colecoes, Imagens,
  Sources ou Preview.
- Integracoes GitHub devem ficar separadas por feature.
- Nomes duplicados devem ser bloqueados ao criar e ao editar.
- Ao finalizar qualquer alteracao relevante, revise o guia antes de responder
  que o trabalho terminou.
- Mudancas Firebase devem atualizar o documento tecnico correspondente,
  `docs/firebase/MIGRATION_STATUS.md` e os casos afetados em
  `docs/firebase/TEST_PLAN.md`.
- Nao marque backup como concluido sem uma restauracao testada.
