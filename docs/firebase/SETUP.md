# Configuracao do Firebase para iniciantes

Este guia configura o SenkoLib do zero. As chaves do app Web sao publicas por
design; seguranca real vem de login, documentos de membro e Security Rules.
Nunca coloque chave privada administrativa ou token GitHub no frontend.

## 1. Criar ou selecionar o projeto

1. Abra o Firebase Console.
2. Crie um projeto ou selecione o projeto do SenkoLib.
3. Em Configuracoes do projeto, adicione um aplicativo Web.
4. Copie o objeto de configuracao para
   `app/infrastructure/firebase/firebase-config.js`.
5. Defina `workspaceId`; o padrao deste projeto e `senkolib`.

## 2. Ativar Authentication

1. Abra Authentication > Sign-in method.
2. Ative Google.
3. Escolha o email de suporte.
4. Em Settings > Authorized domains, adicione o dominio de producao.
5. Para GitHub Pages, autorize `ygorfq.github.io`.

Entrar com Google cria identidade, nao permissao. O UID so edita quando existe
em `workspaces/senkolib/members/{uid}`.

## 3. Criar Firestore

1. Abra Firestore Database.
2. Crie o banco `(default)`.
3. Escolha a regiao planejada para o projeto.
4. Nao use regras abertas de teste em producao.

Implante regras e indices versionados:

```powershell
npx firebase-tools login
npx firebase-tools use senkolibtestes
npm run firebase:deploy:rules
```

Os arquivos implantados sao:

- `firebase/firestore.rules`;
- `firebase/firestore.indexes.json`;
- `firebase/database.rules.json`.

## 4. Criar Realtime Database

Realtime Database guarda somente presenca e espelhos pequenos de acesso. Crie
uma instancia e confirme que `databaseURL` em `firebase-config.js` aponta para
ela. Depois implante as regras pelo comando anterior.

## 5. Primeiro owner

A interface nao pode criar o primeiro owner porque ainda nao existe alguem
autorizado. Use a conta autenticada na Firebase CLI:

```powershell
npm run admin:add-member -- \
  --workspace senkolib \
  --uid UID_DA_CONTA \
  --email email@exemplo.com \
  --name "Nome da pessoa" \
  --role owner
```

Depois do primeiro owner, use Menu > Acessos. Owner pode promover owners,
admins e editors. Admin gerencia somente editors. Editor nao administra pessoas.

## 6. Configurar GitHub Pages e backup

Em `firebase-config.js`, ajuste `githubBackup.owner`, `repo` e `branch`. Cada
usuario informa seu proprio token no modal de backup. O token precisa acessar
o repositorio e deve ser revogado se aparecer em screenshot, log ou commit.

O backup grava:

- snapshot tecnico em `backup/data/`;
- bundle publico em `backup/latest/`.

Somente o segundo e carregado pelo site. O primeiro serve para restauracao e e
recriado a cada backup concluido.

## 7. Ambiente local

Requisitos:

- Node compativel com as dependencias da raiz;
- JDK 21 para emuladores;
- Firebase CLI instalada pelo projeto;
- servidor HTTP simples para a pagina.

```powershell
npm install
npm run firebase:emulators
```

Portas padrao:

| Servico | URL |
|---|---|
| Emulator UI | `http://127.0.0.1:4000` |
| Hosting | `http://127.0.0.1:5000` |
| Firestore | `127.0.0.1:8080` |
| Realtime Database | `127.0.0.1:9000` |
| Auth | `127.0.0.1:9099` |

`useEmulators` so e respeitado em `localhost` ou `127.0.0.1`. Isso evita que
uma configuracao esquecida envie o site publicado para a maquina do dev.

## 8. Checklist de producao

- dominio autorizado no Authentication;
- primeiro owner cadastrado;
- regras implantadas e testadas;
- Firebase real habilitado;
- Biblioteca e Colecoes carregam;
- salvamento aparece em outro navegador;
- conflito recusa revisao atrasada;
- solicitacao de acesso chega ao modal;
- backup cria commit sem segredo;
- fallback abre sem sessao Firebase.

## Problemas comuns

`permission-denied`: confira UID, workspace e cargo; depois regras implantadas.

Popup fecha ou dominio nao autorizado: adicione o host em Authorized domains.

Emulador abre mas app usa producao: confirme hostname local e
`useEmulators: isLocalhost`.

Storage falha no deploy: inicialize Storage no Console antes de implantar suas
regras. O fluxo atual de conteudo nao depende de Storage.
