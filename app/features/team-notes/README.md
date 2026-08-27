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

## Avisos de salvamento

- pagina salva mostra um circulo verde com check ao lado do titulo;
- titulo de pagina ou nome de secao duplicado mostra um circulo vermelho com X;
- os indicadores perdem opacidade e desaparecem em dois segundos;
- outros erros continuam textuais para manter a causa compreensivel.
