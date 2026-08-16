# Desenvolvimento local com Firebase

## Pre-requisitos

- Node.js compativel com o Firebase CLI.
- JDK 21 para os emuladores.
- Dependencias da raiz e de `functions` instaladas.
- Firebase CLI autenticada no projeto de testes.

Confira no PowerShell:

```powershell
node --version
npm --version
java -version
npx firebase-tools --version
```

## Preparacao inicial

```powershell
cd D:\Cursos\Repositorios\projetoTestes
npm install
npm --prefix functions install
npx firebase-tools login
npx firebase-tools use
```

O projeto esperado em `.firebaserc` e `senkolibtestes`.

## Iniciar o ambiente

```powershell
npm run firebase:emulators
```

Portas configuradas:

| Servico | URL/porta |
| --- | --- |
| Aplicativo | `http://127.0.0.1:5000/` |
| Emulator UI | `http://127.0.0.1:4000/` |
| Functions | `127.0.0.1:5001` |
| Firestore | `127.0.0.1:8080` |
| Realtime Database | `127.0.0.1:9000` |
| Authentication | `127.0.0.1:9099` |
| Storage | `127.0.0.1:9199` |

Nao abra o projeto por `file://` para testar Firebase. Modulos dinamicos,
Authentication e Hosting precisam de HTTP.

## Primeiro login local

1. Abra o aplicativo na porta 5000.
2. Use **Entrar com Google**.
3. O emulador mostra uma tela de identidade simulada.
4. Informe nome, e-mail e, opcionalmente, foto.
5. `bootstrapEmulatorMember` cria automaticamente o membro local.
6. `ensurePresenceAccess` libera a presenca no Realtime Database.

Esse usuario nao e uma conta Google real e existe apenas no emulador.

## Persistencia dos emuladores

O comando atual inicia os emuladores sem `--import` e sem
`--export-on-exit`. Portanto, os dados locais podem desaparecer quando o
processo e encerrado.

Para guardar um estado de teste antes de fechar:

```powershell
npx firebase-tools emulators:export .firebase\emulator-data
```

Para iniciar carregando esse estado:

```powershell
npx firebase-tools emulators:start --import .firebase\emulator-data
```

`.firebase/` esta no `.gitignore` e nao deve ser usado como migracao oficial.

## Importar os dados legados no emulador

Primeiro gere e revise o snapshot:

```powershell
npm run migration:build
```

O comando informa contagens e inconsistencias. Depois, com o emulador aberto
em outro PowerShell:

```powershell
$env:SENKO_FIREBASE_PROJECT_ID='senkolibtestes'
$env:FIRESTORE_EMULATOR_HOST='127.0.0.1:8080'
npm --prefix functions run migrate:legacy
```

O snapshot atual nao possui warnings. Nao use `--allow-warnings` nem `--force`
sem investigar a inconsistencia e conferir se o workspace possui dados.

## Onde observar os dados

Na Emulator UI:

- **Authentication**: contas locais.
- **Firestore**: workspace, membros, conteudo e revisoes.
- **Realtime Database**: acesso e sessoes de presenca.
- **Functions**: somente bootstrap local, presenca e testes administrativos.
- **Logs**: falhas de regra, validacao e conexao.

## Ciclo de uma alteracao

1. Identifique a camada dona do comportamento.
2. Atualize a feature, infraestrutura ou regra dona da operacao.
3. Atualize o documento correspondente em `docs/firebase/`.
4. Atualize `MIGRATION_STATUS.md`.
5. Execute `npm --prefix functions run check` se mexeu nas ferramentas administrativas.
6. Execute `node --check arquivo.js` nos scripts de frontend alterados.
7. Rode os casos relacionados de `TEST_PLAN.md`.
8. Confira `git diff --check` e `git status --short`.

Para validar a integracao oficial entre header, menu e modal administrativo:

```powershell
npm run test:access-modal
```

O teste visual com um proprietario simulado fica em
`tests/fixtures/access-modal-harness.html`. Ele nao acessa Firebase real nem
altera membros; existe somente para conferir o shell em desktop e mobile.

Para repetir o teste de integracao de grupos com os emuladores abertos:

```powershell
$env:FIRESTORE_EMULATOR_HOST='127.0.0.1:8080'
node tests/firestore-client-writes.test.js
npm --prefix functions run test:groups:emulator
npm --prefix functions run test:restore:emulator
```

O primeiro teste usa exatamente `senko-firestore-writes.js` contra as Security
Rules: cobre CRUD, conflito, exclusao recursiva, bloqueios e backup GitHub
simulado. Os testes em `functions` cobrem a implementacao administrativa
anterior e a restauracao. Detalhes estao em `BACKUP_AND_RESTORE.md`.

Para o teste de regras iniciar e encerrar seu proprio Firestore Emulator,
feche o conjunto de emuladores e use:

```powershell
npm run test:firestore-rules
```

## Como adicionar uma operacao de escrita

No plano Spark, escritas de produto usam o SDK Web e precisam de uma regra
equivalente no servidor.

1. Defina caminhos, campos e limites em `DATA_MODEL.md`.
2. Implemente a transacao em `senko-firestore-writes.js`.
3. Leia o documento de membro dentro da transacao para detectar remocao de acesso.
4. Valide IDs, nomes, limites, versao e relacionamento pai-filho no cliente.
5. Repita em `config/firebase/firestore.rules` tudo que protege integridade ou acesso.
6. Incremente `workspace.dataVersion` junto da alteracao.
7. Exponha um metodo pequeno no repositorio da feature.
8. Preserve o rascunho quando houver `aborted`.
9. Adicione caso positivo, visitante e dado malformado ao teste de regras.
10. Compile regras com `firebase deploy --only firestore:rules --dry-run`.

Security Rules nao executam consultas arbitrarias nem SHA-256. Se uma regra de
negocio nao puder ser garantida nas Rules, documente o limite e reavalie se o
recurso exige backend antes de libera-lo para membros nao confiaveis.

## Erros comuns

### `unauthenticated`

Nao existe login valido. Entre novamente e confira o emulador de Auth.

### `permission-denied`

O UID nao possui documento em `workspaces/senkolib/members`, ou a permissao
foi removida durante a operacao.

### `aborted`

Conflito de revisao ou versao. Isso e protecao de concorrencia, nao falha de
rede. Preserve o rascunho e compare com a versao atual.

### `already-exists`

Outro item no mesmo escopo ja reservou o nome normalizado.

### `not-found`

O recurso pai foi excluido ou o ID nao existe mais.

### `Failed to fetch dynamically imported module`

Confirme que o Hosting esta aberto na porta 5000 e faca recarga forcada. Nao
use `file://`.

### A presenca nao aparece

Confira `presenceAccess`, as regras do Realtime Database e se as duas pessoas
abriram exatamente o mesmo item. No emulador, confira tambem a Function local
`ensurePresenceAccess`; em producao Spark, cadastre o acesso manualmente.
