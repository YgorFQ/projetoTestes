# SenkoLib - Configuracao do Firebase

Este e o roteiro principal para uma pessoa que nunca usou Firebase. Execute em
ordem e nao pule a verificacao de cada parte.

Projeto atual:

```text
Firebase project ID: senkolibtestes
Workspace ID: senkolib
Repositorio: YgorFQ/projetoTestes
Branch de backup: main
Plano esperado: Spark (gratuito)
```

## Antes de comecar

Leia tambem:

- `docs/firebase/ARCHITECTURE.md`: por que cada componente existe;
- `docs/firebase/DATA_MODEL.md`: caminhos e campos do banco;
- `docs/firebase/DEVELOPMENT.md`: ambiente local;
- `docs/firebase/BACKUP_AND_RESTORE.md`: token, backup e restauracao;
- `docs/firebase/MIGRATION_STATUS.md`: pronto e pendente.

Requisitos no computador:

- Node.js e npm;
- Java 21 ou compativel para os emuladores;
- acesso ao projeto `senkolibtestes` no Firebase Console;
- acesso ao repositorio para quem for testar backup real.

Nao e necessario ativar o plano Blaze. A arquitetura ativa nao implanta Cloud
Functions, nao usa Scheduler e nao usa Secret Manager.

## O que o codigo ja possui

- configuracao publica do aplicativo Web;
- login Google;
- verificacao de membros;
- listeners em tempo real;
- transacoes de criacao, edicao e exclusao;
- revisoes e controle de conflitos;
- regras Firestore para escrita direta de membros;
- presenca pelo Realtime Database;
- emuladores locais;
- migracao dos arquivos antigos;
- backup manual para GitHub;
- restauracao administrativa;
- testes automatizados.

O Firebase esta ativado somente em localhost enquanto o corte de producao nao
for concluido.

## Parte 1 - Conferir o projeto Firebase

1. Abra o [Firebase Console](https://console.firebase.google.com/).
2. Entre com a conta que administra o projeto.
3. Abra **senkolibtestes**.
4. Clique na engrenagem e abra **Configuracoes do projeto**.
5. Confirme que o **ID do projeto** e `senkolibtestes`.
6. Abra **Uso e faturamento** e confirme o plano Spark.

O nome visivel pode mudar; o ID do projeto nao deve mudar no codigo.

## Parte 2 - Conferir o aplicativo Web

Em **Configuracoes do projeto > Geral > Seus apps**, deve existir um aplicativo
Web. A configuracao publica usada pelo SenkoLib fica em:

```text
app/infrastructure/firebase/firebase-config.js
```

Campos esperados:

```js
firebase: {
  apiKey: '...',
  authDomain: 'senkolibtestes.firebaseapp.com',
  projectId: 'senkolibtestes',
  storageBucket: 'senkolibtestes.firebasestorage.app',
  messagingSenderId: '340361654040',
  appId: '...',
  databaseURL: 'https://senkolibtestes-default-rtdb.firebaseio.com'
}
```

A `apiKey` do app Web identifica o projeto e pode ficar no frontend. Ela nao e
uma credencial administrativa. O acesso real e controlado por Authentication
e Security Rules.

Nunca coloque nesse arquivo:

- chave JSON de conta de servico;
- token pessoal do GitHub;
- chave privada de GitHub App;
- senha.

## Parte 3 - Ativar Authentication

1. No menu lateral, abra **Build > Authentication**.
2. Clique em **Comecar**, se necessario.
3. Abra **Sign-in method**.
4. Abra **Google**.
5. Marque **Ativar**.
6. Escolha um e-mail de suporte.
7. Salve.

Antes da producao, confira **Settings > Authorized domains**. O dominio usado
pelo app precisa estar autorizado. `localhost` normalmente ja aparece.

Authentication responde apenas quem e a pessoa. A permissao vem do documento
`members/{uid}` explicado na Parte 8.

## Parte 4 - Ativar Cloud Firestore

1. Abra **Build > Firestore Database**.
2. Clique em **Criar banco de dados**, se ainda nao existir.
3. Escolha o modo de producao.
4. Escolha uma regiao proxima da equipe e mantenha essa decisao.
5. Conclua.

Nao use as regras temporarias abertas do modo de teste. O arquivo oficial e
`firestore.rules`.

O Firestore guarda:

- grupos;
- layouts da Biblioteca e variacoes;
- colecoes e layouts internos;
- revisoes;
- reservas de nome;
- historico de backups.

## Parte 5 - Ativar Realtime Database

1. Abra **Build > Realtime Database**.
2. Clique em **Criar banco de dados**.
3. Escolha a regiao.
4. Inicie bloqueado.
5. Confirme que a URL e:

```text
https://senkolibtestes-default-rtdb.firebaseio.com
```

Ele guarda somente presenca temporaria. O Firestore continua sendo o banco do
conteudo.

## Parte 6 - Storage

Storage nao e usado pelas features atuais. Se o Console permitir ativar no
plano escolhido, mantenha `storage.rules` implantado. Se a ativacao pedir
faturamento, pule esta parte: isso nao bloqueia Biblioteca, Colecoes ou backup.

Nao adapte layouts para Storage sem atualizar arquitetura, modelo de dados,
regras e restauracao.

## Parte 7 - Preparar o projeto local

Abra PowerShell:

```powershell
Set-Location D:\Cursos\Repositorios\projetoTestes
npm install
npx firebase-tools login
npx firebase-tools use
```

Resultado esperado de `use`:

```text
Active Project: default (senkolibtestes)
```

Confira Java:

```powershell
java -version
```

Confira sintaxe e regras:

```powershell
node --check app/infrastructure/firebase/senko-firebase.js
node --check app/infrastructure/firebase/senko-firestore-writes.js
node --check app/infrastructure/github/backup-service.js
node --check app/tools/session/register.js
npx firebase-tools deploy --only firestore:rules --dry-run
```

`--dry-run` compila, mas nao publica.

## Parte 8 - Testar localmente

Inicie todos os emuladores:

```powershell
npm run firebase:emulators
```

Enderecos:

```text
SenkoLib:   http://127.0.0.1:5000
Emulator UI http://127.0.0.1:4000
```

1. Abra o SenkoLib.
2. Clique em **Entrar com Google**.
3. No emulador, use uma identidade de teste.
4. O ambiente local cria o documento de membro automaticamente.
5. Confirme layouts e colecoes.

O bootstrap automatico existe somente no emulador. Nunca adicione esse
comportamento em producao.

## Parte 9 - Rodar testes de regras

Com o emulador Firestore aberto:

```powershell
$env:FIRESTORE_EMULATOR_HOST='127.0.0.1:8080'
node tests/firestore-client-writes.test.js
```

O teste confirma:

- CRUD de todos os tipos principais;
- revisao e conflito;
- exclusao recursiva;
- incremento de `dataVersion`;
- log e metadados de backup;
- bloqueio de visitante;
- bloqueio de escrita em `members`;
- exportador contra GitHub simulado.

Mensagens `PERMISSION_DENIED` aparecem nos casos negativos esperados. O final
deve mostrar:

```text
Firestore client/rules test: OK
```

## Parte 10 - Publicar regras e indices

Antes de publicar, revise `git diff` e rode os testes. Depois:

```powershell
npx firebase-tools deploy --only firestore:rules,firestore:indexes,database,storage
```

Se Storage nao estiver ativado, publique apenas:

```powershell
npx firebase-tools deploy --only firestore:rules,firestore:indexes,database
```

Nao use `firebase deploy` sem `--only`: o `firebase.json` ainda lista Functions
para desenvolvimento e historico, mas o plano Spark nao deve tentar implanta-las.

Depois do deploy:

1. abra Firestore > Rules e confira o horario;
2. abra Realtime Database > Rules e confira o horario;
3. rode um login real apenas depois de cadastrar o membro.

## Parte 11 - Cadastrar o primeiro membro real

O UID so aparece depois que a conta se autentica pelo menos uma vez.

1. Ative temporariamente o frontend no dominio de teste ou use um fluxo de
   autenticacao controlado.
2. A pessoa tenta entrar com Google.
3. Em **Authentication > Users**, copie o UID.
4. Em **Firestore Database > Data**, abra ou crie:

```text
workspaces
  senkolib
    members
      UID_COPIADO
```

5. No documento, adicione:

```text
uid         string  UID_COPIADO
email       string  email da pessoa
displayName string  nome da pessoa
joinedAt    timestamp horario atual
```

6. Em Realtime Database > Data, crie:

```text
presenceAccess/senkolib/UID_COPIADO = true
```

7. A pessoa recarrega e entra novamente.

O documento Firestore concede CRUD completo. O valor do Realtime concede
somente presenca. Remover um membro exige apagar ambos e, se necessario,
desativar a conta em Authentication.

As regras impedem que o frontend crie ou altere membros.

## Parte 12 - Preparar os dados antigos

Gere o snapshot:

```powershell
npm run migration:build
```

Resultado atual esperado:

```text
groups: 5
bibliotecaLayouts: 34
bibliotecaVariants: 11
collections: 5
collectionLayouts: 48
warnings: []
```

Teste a importacao no emulador:

```powershell
$env:SENKO_FIREBASE_PROJECT_ID='senkolibtestes'
$env:FIRESTORE_EMULATOR_HOST='127.0.0.1:8080'
npm --prefix functions run migrate:legacy
```

Sem `--force`, o importador recusa um workspace que ja possui layouts ou
colecoes. Essa e uma protecao. Nunca use `--force` apenas para contornar a
mensagem; primeiro descubra quais dados existem.

Para producao, use uma conta de servico temporaria fora do repositorio:

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS='D:\Segredos\senkolib-admin.json'
$env:SENKO_FIREBASE_PROJECT_ID='senkolibtestes'
Remove-Item Env:FIRESTORE_EMULATOR_HOST -ErrorAction SilentlyContinue
npm --prefix functions run migrate:legacy
```

Depois, revogue a chave administrativa.

Alternativa sem chave JSON, usando a conta ja logada no Firebase CLI:

```powershell
$env:SENKO_FIREBASE_PROJECT_ID='senkolibtestes'
npm --prefix functions run restore:github:cli-auth -- `
  --source D:\Cursos\Repositorios\projetoTestes `
  --commit d9e63426514bee66ac997b608dff706922551c86 `
  --workspace senkolib
```

Esse caminho restaura um commit de backup e interrompe se o workspace ja tiver
conteudo gerenciado. Ele foi usado no corte inicial para escrever os dados reais
sem guardar chave administrativa no projeto.

## Parte 13 - Configurar backup GitHub

O destino publico ja esta em `firebase-config.js`:

```js
githubBackup: {
  owner: 'YgorFQ',
  repo: 'projetoTestes',
  branch: 'main'
}
```

Cada pessoa que fara backup precisa:

1. acesso de escrita ao repositorio;
2. um fine-grained personal access token limitado ao repositorio;
3. permissao `Contents: Read and write`;
4. ser membro Firebase.

O passo a passo completo esta em
`docs/firebase/BACKUP_AND_RESTORE.md`.

O token e colado na janela do botao GitHub e guardado somente no navegador.
Ele nao deve ser enviado ao Firebase nem ao codigo.

## Parte 14 - Ativar Firebase fora de localhost

Hoje `firebase-config.js` possui:

```js
enabled: isLocalhost,
useEmulators: isLocalhost
```

Isto evita que o site atual use o banco real antes do corte. Quando todas as
pendencias de `MIGRATION_STATUS.md` estiverem concluídas, separe as condicoes:

```js
enabled: true,
useEmulators: isLocalhost
```

Antes dessa alteracao:

1. publique regras e indices;
2. cadastre membros e `presenceAccess`;
3. importe os dados;
4. crie e restaure um backup real;
5. confira dominios autorizados;
6. tenha um commit de rollback.

Se um backup ja aparece no GitHub mas a pagina publica nao mostra a alteracao,
isso e esperado enquanto `enabled` continuar dependendo de `isLocalhost`. O
backup fica em `generated/backups/senkolib-data/`; ele nao substitui a etapa de importar dados no
Firestore real nem a etapa de ativar Firebase no GitHub Pages.

## Erros comuns

### `Conta sem acesso`

O login funcionou, mas nao existe
`workspaces/senkolib/members/{uid}`. Cadastre o UID exato.

### `Missing or insufficient permissions`

Confira login, membro, regras publicadas e `workspaceId`. No ambiente local,
confirme que o frontend e o emulador usam o mesmo project ID.

### `Outra pessoa salvou uma versao mais recente`

E a protecao de concorrencia. Recarregue ou compare o rascunho; nao altere a
regra para forcar a sobrescrita.

### Presenca nao aparece

Confira `presenceAccess/senkolib/{uid} = true` e as regras do Realtime
Database. CRUD do Firestore pode continuar normal.

### Deploy tenta exigir Blaze

Voce provavelmente executou deploy geral ou incluiu Functions. Use os comandos
com `--only` da Parte 10.

### Backup retorna 401 ou 403

401 indica token invalido ou expirado. 403 indica escopo ou acesso
insuficiente. Gere um token individual com permissao minima.

### Backup pede token em outro computador

E esperado. A configuracao fica no `localStorage` daquele perfil de navegador
e nao sincroniza pelo Firebase.
