# Modelo de dados Firebase

## Convencoes

- O workspace atual e `senkolib`.
- IDs tecnicos nao sao nomes de exibicao.
- IDs novos de layouts, variantes e colecoes sao gerados pelo Firestore.
- O ID de grupo e fornecido pela feature e validado pelo cliente e regras.
- Datas de escrita usam `serverTimestamp()`.
- Membros escrevem pelo SDK Web dentro de transacoes.
- `firestore.rules` valida identidade, campos, versoes e limites.
- `nameKey` e uma versao normalizada do nome usada para ordenacao e unicidade.

## Arvore do Firestore

```text
workspaces/{workspaceId}
|-- members/{uid}
|-- accessRequests/{uid}
|-- memberEvents/{eventId}
|-- groups/{groupId}
|-- bibliotecaLayouts/{layoutId}
|   |-- revisions/{revisionId}
|   `-- variants/{variantId}
|       `-- revisions/{revisionId}
|-- collections/{collectionId}
|   `-- layouts/{layoutId}
|       `-- revisions/{revisionId}
|-- nameReservations/{hash}
`-- exports/{exportId}
```

## Documento do workspace

Caminho: `workspaces/{workspaceId}`

| Campo | Tipo | Uso |
| --- | --- | --- |
| `name` | string | Nome administrativo do workspace |
| `schemaVersion` | number | Versao do modelo importado |
| `dataVersion` | number | Incrementado em cada alteracao de conteudo |
| `updatedAt` | timestamp | Ultima alteracao |
| `updatedBy` | string | UID da ultima pessoa que alterou |
| `lastGithubExportVersion` | number | `dataVersion` do ultimo backup concluido |
| `lastGithubExportAt` | timestamp | Horario do ultimo backup concluido |
| `lastGithubCommitSha` | string | Commit criado no GitHub |

Campos `migratedAt`, `migrationCounts` e `migrationWarnings` sao adicionados
pela importacao inicial.

A restauracao registra `restoreStatus`, `restoreStartedAt`, `restoredAt`,
`restoreSource`, `restoredFromWorkspace`, `restoredFromExportedAt` e
`restoreCounts`. Em falha, registra `restoreError`. Membros e exports nao fazem
parte do conteudo substituido pela ferramenta.

## Membros

Caminho: `workspaces/{workspaceId}/members/{uid}`

| Campo | Tipo | Uso |
| --- | --- | --- |
| `uid` | string | UID do Firebase Authentication |
| `email` | string | Identificacao administrativa |
| `displayName` | string | Nome mostrado na interface |
| `role` | string | `owner`, `admin` ou `editor` |
| `joinedAt` | timestamp | Entrada no workspace |
| `updatedAt` / `updatedBy` | timestamp/string | Ultima mudanca administrativa |

A existencia do documento libera o CRUD de conteudo. `role` controla somente
governanca de pessoas: proprietarios gerenciam todos os cargos, admins gerenciam
editores e editores nao acessam a feature administrativa.

## Solicitacoes de acesso

Caminho: `workspaces/{workspaceId}/accessRequests/{uid}`

Quando uma conta Google autentica, mas ainda nao existe em `members`, o
navegador registra `uid`, `email`, `displayName`, `status: pending`,
`attemptCount`, `firstAttemptAt` e `lastAttemptAt`. Uma revisao adiciona
`reviewedAt`, `reviewedBy` e `reviewedRole`. A conta pode ler e atualizar
somente o proprio documento; nao pode listar outras solicitacoes. O Console do
Firebase continua capaz de listar os documentos para administracao do projeto.

Tokens, senhas e credenciais nao sao registrados. A colecao tambem nao entra
nos backups publicos ou tecnicos do GitHub.

## Atividade de membros

Caminho: `workspaces/{workspaceId}/memberEvents/{eventId}`

Registra `approve`, `reject`, `role-change` e `remove`, com alvo, cargo, ator e
horario. Somente proprietarios e admins podem criar ou listar eventos. Eventos
nao podem ser alterados ou excluidos pelo frontend e nao entram no backup.

## Grupos

Caminho: `workspaces/{workspaceId}/groups/{groupId}`

Campos principais: `id`, `workspaceId`, `name`, `nameKey`, `color`, `version`,
`createdAt`, `createdBy`, `updatedAt`, `updatedBy` e `updatedByName`.

`color` deve estar no formato `#rrggbb`. Grupos vazios continuam existindo. A
transacao confirma que `groupId` existe antes de salvar uma colecao.

O importador cria grupos com modelo completo e reserva de nome. O cliente
`deleteGroup` consulta colecoes e permite excluir somente grupos vazios.
Colecoes nunca sao apagadas junto do grupo. Como todos os membros atuais sao
editores confiaveis, esta verificacao de uso e uma regra de aplicacao, nao uma
consulta que Security Rules consigam repetir.

## Layout da Biblioteca

Caminho: `workspaces/{workspaceId}/bibliotecaLayouts/{layoutId}`

| Campo | Tipo | Uso |
| --- | --- | --- |
| `id` | string | ID tecnico atual |
| `legacyId` | string ou null | ID anterior a migracao |
| `kind` | string | Sempre `libraryLayout` |
| `name` / `nameKey` | string | Exibicao e unicidade |
| `tags` | string[] | Ate 40 tags de 80 caracteres |
| `html` | string | Ate 750.000 caracteres |
| `css` | string | Ate 250.000 caracteres |
| `currentRevisionId` | string | Revisao exigida no proximo save |
| `version` | number | Contador informativo de saves |
| `createdAt` / `createdBy` | timestamp/string | Auditoria de criacao |
| `updatedAt` / `updatedBy` | timestamp/string | Auditoria de alteracao |
| `updatedByName` | string | Nome mostrado no aviso ao vivo |

## Variacao da Biblioteca

Caminho:
`workspaces/{workspaceId}/bibliotecaLayouts/{layoutId}/variants/{variantId}`

Usa os mesmos campos do layout, com estas diferencas:

- `kind` e `libraryVariant`.
- `parentId` contem o ID do layout pai.
- A transacao e as regras recusam salvar se o layout pai nao existir.
- A unicidade do nome vale somente dentro do layout pai.

## Colecao

Caminho: `workspaces/{workspaceId}/collections/{collectionId}`

Campos principais: `id`, `legacyId`, `workspaceId`, `name`, `nameKey`,
`groupId`, `tags`, `version`, campos de criacao e campos de atualizacao.

Colecoes nao possuem revisoes imutaveis porque guardam apenas metadados. A
concorrencia e controlada pelo campo `version`.

## Layout interno de colecao

Caminho:
`workspaces/{workspaceId}/collections/{collectionId}/layouts/{layoutId}`

Usa o modelo de conteudo versionado. `kind` e `collectionLayout`, `parentId` e
`collectionId` apontam para a colecao pai. A unicidade do nome vale somente
dentro dessa colecao.

## Revisoes

Caminho: `{recursoVersionado}/revisions/{revisionId}`

Cada save cria um documento novo com `revisionId`, `resourceId`, `workspaceId`,
`kind`, `name`, `tags`, `html`, `css`, `baseRevisionId`, `createdAt`,
`createdBy` e `createdByName`.

Revisoes podem ser criadas somente junto de uma nova `currentRevisionId` e nao
podem ser editadas. A exclusao em duas fases remove revisoes e filhos por lotes
de ate 400 referencias.

## Reservas de nome

Caminho: `workspaces/{workspaceId}/nameReservations/{sha256}`

O ID e SHA-256 de `escopo:nameKey`. O documento guarda `scope`, `name`,
`nameKey`, `resourcePath` e `updatedAt`.

Reservas evitam nomes duplicados de forma atomica, inclusive quando duas
pessoas tentam criar o mesmo nome ao mesmo tempo.

## Historico de exportacoes

Caminho: `workspaces/{workspaceId}/exports/{exportId}`

Estados conhecidos:

- `running`: exportacao iniciada.
- `completed`: commit criado; inclui SHA, URL e quantidade de arquivos.
- `failed`: inclui uma mensagem de erro limitada a 1.000 caracteres.

O navegador so pode atualizar o job que ele mesmo iniciou. Jobs e membros nao
entram no snapshot GitHub.

## Realtime Database

```text
presenceAccess/{workspaceId}/{uid} = true
memberManagers/{workspaceId}/{uid} = "owner" | "admin"

presence/{workspaceId}/{resourceType}/{resourceId}/{uid}/{sessionId}
  displayName: string
  photoURL: string
  joinedAt: server timestamp
```

`memberManagers` autoriza a tela administrativa a sincronizar
`presenceAccess`. Proprietarios sincronizam qualquer membro; admins somente
editores. O usuario escreve apenas suas proprias sessoes de presenca.

Tipos atuais de recurso:

- `biblioteca-layout`
- `biblioteca-variant`
- `collection-layout`

## Storage

O SDK e o emulador de Storage estao conectados, mas nenhuma feature atual envia
arquivos. As regras permitem leitura de membro em `workspaces/{workspaceId}` e
bloqueiam escrita. Qualquer uso futuro precisa definir metadados, limites,
validacao backend, ciclo de exclusao e estrategia de backup antes de liberar
escrita.
