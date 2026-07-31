# SenkoLib - Configuracao do Firebase

Este guia foi escrito para quem nunca usou Firebase. Siga a ordem e nao ative
o modo Firebase no SenkoLib antes de concluir a importacao inicial.

## O que ja esta preparado no codigo

- Login com Google e bloqueio para contas nao convidadas.
- Firestore como banco principal.
- Realtime Database somente para mostrar quem esta no mesmo editor.
- Cloud Functions para salvar com revisao, detectar conflito e excluir.
- Exportacao manual para GitHub e agendamento a cada 30 minutos.
- Regras que deixam o navegador apenas ler dados. Escritas passam pelas Functions.
- Emuladores para testar sem tocar nos dados reais.
- Extrator e importador dos arquivos antigos.

Enquanto `enabled: false` estiver em
`app/infrastructure/firebase/firebase-config.js`, o SenkoLib continua no modo
antigo e nada tenta acessar Firebase.

## Parte 1 - Criar o projeto no Console

1. Abra https://console.firebase.google.com/.
2. Entre com sua conta Google.
3. Clique em **Criar um projeto**.
4. Nome sugerido: `SenkoLib`.
5. O `Project ID` precisa ser unico. Exemplo: `senkolib-ygor`.
6. Guarde esse Project ID; ele sera usado nos arquivos e comandos.
7. O Google Analytics e opcional. Pode deixar desativado.
8. Conclua a criacao.

O Project ID nao pode ser alterado depois.

## Parte 2 - Registrar o aplicativo Web

1. Na pagina inicial do projeto, clique no icone **Web** (`</>`).
2. Apelido sugerido: `SenkoLib Web`.
3. Nao marque Firebase Hosting ainda.
4. Clique em **Registrar app**.
5. O Console mostrara um objeto chamado `firebaseConfig`.
6. Abra `app/infrastructure/firebase/firebase-config.js`.
7. Copie somente os valores para dentro da propriedade `firebase`.
8. Mantenha `enabled: false` por enquanto.

Exemplo apenas de formato:

```js
firebase: {
  apiKey: 'valor-mostrado-pelo-console',
  authDomain: 'senkolib-ygor.firebaseapp.com',
  projectId: 'senkolib-ygor',
  storageBucket: 'senkolib-ygor.firebasestorage.app',
  messagingSenderId: '...',
  appId: '...',
  databaseURL: '...'
}
```

Essa configuracao Web e publica por natureza. Chave administrativa e chave
privada do GitHub nunca entram nesse arquivo.

## Parte 3 - Ativar os produtos

### Authentication

1. No menu lateral, abra **Build > Authentication**.
2. Clique em **Comecar**.
3. Abra **Sign-in method**.
4. Selecione **Google**.
5. Ative o provedor.
6. Escolha seu e-mail como e-mail de suporte.
7. Salve.

### Cloud Firestore

1. Abra **Build > Firestore Database**.
2. Clique em **Criar banco de dados**.
3. Escolha **Standard edition / Native mode**.
4. Escolha a regiao `southamerica-east1` (Sao Paulo), se estiver disponivel.
5. Escolha modo de producao.
6. Conclua.

A localizacao do Firestore nao pode ser trocada depois.

### Realtime Database

1. Abra **Build > Realtime Database**.
2. Clique em **Criar banco de dados**.
3. Escolha `us-central1` (Iowa). O Realtime Database nao oferece uma regiao no
   Brasil; essa e a opcao disponivel nas Americas.
4. Escolha modo bloqueado.
5. Depois de criado, copie a URL mostrada no topo.
6. Cole essa URL em `databaseURL` no `firebase-config.js`.

Este banco guarda apenas presenca: entrada e saida de pessoas dos editores.

### Storage

O Console pode exigir que o projeto esteja no plano Blaze antes de criar o
bucket. Nao confirme a cobranca sem antes ler a Parte 6 e criar um alerta de
orcamento. O Storage nao e necessario para o primeiro teste local.

1. Abra **Build > Storage**.
2. Clique em **Comecar**.
3. Use a mesma regiao do Firestore quando o Console permitir.
4. Escolha regras de producao.

## Parte 4 - Preparar o computador

Abra PowerShell na pasta do projeto:

```powershell
cd D:\Cursos\Repositorios\projetoTestes
npm install
npm --prefix functions install
```

Os emuladores exigem Java. Este computador ainda nao possui Java instalado.
Instale JDK 21:

```powershell
winget install Microsoft.OpenJDK.21
```

Feche e abra o PowerShell depois da instalacao e confira:

```powershell
java -version
```

Depois conecte a Firebase CLI:

```powershell
npm run firebase:login
Copy-Item .firebaserc.example .firebaserc
```

Abra `.firebaserc` e troque `SEU_PROJECT_ID` pelo Project ID criado no Console.
Depois confirme:

```powershell
npx firebase-tools use SEU_PROJECT_ID
```

## Parte 5 - Testar localmente sem usar producao

1. Em `firebase-config.js`, preencha os dados Web.
2. Defina `enabled: true`.
3. Defina `useEmulators: true`.
4. Execute:

```powershell
npm run firebase:emulators
```

5. Abra http://127.0.0.1:5000/.
6. Clique em **Entrar com Google**.
7. O emulador mostra uma tela de login simulada; nenhum login real e enviado.
8. O primeiro usuario local vira membro automaticamente.
9. A interface dos emuladores fica em http://127.0.0.1:4000/.

Para voltar ao modo antigo, use `enabled: false`. Para testar o Firebase real,
use `useEmulators: false`.

## Parte 6 - Publicar regras e Functions basicas

O plano Blaze sera necessario para Cloud Functions implantadas e para o
agendamento de 30 minutos. Configure um alerta de orcamento no Google Cloud
antes de publicar.

Primeiro publique apenas regras e operacoes de dados:

```powershell
npx firebase-tools deploy --only firestore,database,storage
npx firebase-tools deploy --only functions:saveVersionedContent,functions:saveCollection,functions:deleteContent,functions:ensurePresenceAccess
```

Nao publique as Functions do GitHub antes de configurar o GitHub App.

## Parte 7 - Cadastrar o primeiro membro real

1. Coloque `enabled: true` e `useEmulators: false`.
2. Abra o SenkoLib pelo servidor local ou site publicado.
3. Clique em **Entrar com Google**.
4. A tela informara que a conta ainda nao tem acesso. Isso e esperado.
5. Volte ao Console Firebase.
6. Abra **Authentication > Users**.
7. Copie o `User UID` da sua conta.
8. Abra **Firestore Database > Data**.
9. Crie a colecao `workspaces`.
10. Crie o documento `senkolib`.
11. Adicione `name` como string `SenkoLib`.
12. Adicione `dataVersion` como number `0`.
13. Dentro desse documento, crie a subcolecao `members`.
14. Crie um documento cujo ID seja exatamente o User UID copiado.
15. Adicione `email`, `displayName` e `joinedAt`.
16. Recarregue o SenkoLib.

Para convidar outra pessoa, ela entra uma vez, voce copia o UID em
Authentication e cria outro documento em `workspaces/senkolib/members`.

## Parte 8 - Preparar a migracao dos dados atuais

Crie o snapshot:

```powershell
npm run migration:build
```

O arquivo sera criado em:

```text
migration-output/senkolib-legacy.json
```

O extrator valida quantidades e informa layouts ou variantes orfas. O snapshot
nao entra no Git porque a pasta esta no `.gitignore`.

Para importar em producao:

1. No Console, abra **Configuracoes do projeto > Contas de servico**.
2. Clique em **Gerar nova chave privada**.
3. Salve o JSON fora do repositorio. Exemplo: `D:\Segredos\senkolib-admin.json`.
4. Nunca envie esse JSON ao GitHub.
5. No PowerShell, execute:

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS='D:\Segredos\senkolib-admin.json'
$env:SENKO_FIREBASE_PROJECT_ID='SEU_PROJECT_ID'
npm --prefix functions run migrate:legacy
```

Se o extrator encontrar inconsistencias, a importacao para. Corrija os dados
antes de continuar. `--allow-warnings` existe para emergencia, mas pula itens
orfaos e nao deve ser a primeira escolha.

Depois da importacao:

1. Confira contagens no Firestore.
2. Remova as variaveis da sessao fechando o PowerShell.
3. Exclua a chave local.
4. No Console/IAM, revogue a chave gerada.

## Parte 9 - Configurar o backup GitHub

Esta parte pode ser feita depois que leitura e salvamento Firebase estiverem
validados.

1. No GitHub, abra **Settings > Developer settings > GitHub Apps**.
2. Crie um GitHub App para o SenkoLib.
3. Em Repository permissions, conceda **Contents: Read and write**.
4. Desative webhook se ele nao for usado.
5. Instale o App somente no repositorio de backup escolhido.
6. Guarde App ID e Installation ID.
7. Gere uma private key `.pem`.
8. Copie `functions/.env.example` para
   `functions/.env.SEU_PROJECT_ID`.
9. Preencha nesse arquivo `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`,
   `GITHUB_APP_ID` e `GITHUB_INSTALLATION_ID`.
10. Cadastre a chave privada como Secret Manager:

```powershell
npx firebase-tools functions:secrets:set GITHUB_PRIVATE_KEY --data-file 'D:\Segredos\senkolib-github.pem'
```

11. Publique as duas Functions:

```powershell
npx firebase-tools deploy --only functions:exportGithubSnapshot,functions:scheduledGithubExport
```

O botao do header dispara `exportGithubSnapshot`. A Function
`scheduledGithubExport` verifica mudancas a cada 30 minutos e nao cria commit
quando `dataVersion` nao mudou.

## Erros comuns

- **Configuracao Firebase incompleta:** algum valor do `firebaseConfig` ficou vazio.
- **Conta sem acesso:** o UID ainda nao existe em `members`.
- **Failed to fetch dynamically imported module:** abra por servidor HTTP, nao
  dependa de `file://`.
- **Java nao encontrado:** instale JDK 21 e reabra o PowerShell.
- **Outra pessoa salvou uma versao mais recente:** o bloqueio de concorrencia
  funcionou; compare ou recarregue antes de salvar.
- **Configuracao GitHub incompleta:** as Functions do GitHub foram publicadas
  antes dos parametros/GitHub App.
