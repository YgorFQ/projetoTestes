# Notas da equipe

Feature oficial de secoes e paginas compartilhadas.

## Fontes de dados

- Editavel: `workspaces/{workspaceId}/teamNoteSections/{sectionId}/pages/{pageId}`
  no Firestore.
- Contingencia: `window.SenkoStaticBackup.features['team-notes']`, carregado de
  `backup/latest/team-notes/manifest.js` e `data.js`, sempre somente leitura.
- GitHub: somente o botao global de backup. A feature nao possui cliente,
  token, manifesto ou CRUD GitHub proprio.

`repositories/firebase-repository.js` adapta listeners e escritas.
`repositories/static-repository.js` adapta o ultimo snapshot publico.
`data-source.js` troca as fontes conforme `SenkoDataMode`.

## Dados legados

Os arquivos em `app/tools/team-notes/data/` foram preservados apenas como fonte
legada para uma migracao controlada. Eles nao sao carregados pelo `index.html`,
nao recebem novas escritas e nao sao uma terceira fonte de dados.
