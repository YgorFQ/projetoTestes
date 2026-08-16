# Backup GitHub e restauracao

## Objetivo

O GitHub e uma copia externa do Firestore. Ele nao participa de criar, editar
ou excluir. Se o GitHub estiver fora do ar ou o token expirar, os saves do
SenkoLib continuam no Firebase normalmente.

O backup atual e exclusivamente manual. Nao existe GitHub Actions, agendamento
de 30 minutos nem Cloud Function de producao.

O mesmo commit possui duas representacoes. `backup/data/` e o snapshot
tecnico completo para restauracao e auditoria. `backup/latest/`
e a ultima versao publica usada pelo aplicativo quando Firebase nao esta
disponivel ou a pessoa nao entrou.

## Quem pode fazer backup

Para fazer backup, a pessoa precisa de duas permissoes independentes:

1. ser membro do workspace Firebase para ler os dados;
2. ter acesso de escrita ao repositorio `YgorFQ/projetoTestes` no GitHub.

Ser membro do SenkoLib nao concede acesso ao GitHub. Ser colaborador do GitHub
nao concede acesso ao Firebase.

## Como o botao funciona

O botao com o simbolo do GitHub fica no topo do shell. Ao clicar:

1. abre a janela **Backup no GitHub**;
2. mostra owner, repositorio e branch configurados pelo projeto;
3. solicita o token pessoal daquele navegador;
4. le um snapshot consistente do Firestore;
5. gera os arquivos publicos somente com a versao atual;
6. envia os arquivos alterados juntos em uma tree pela Git Data API;
7. cria um commit e atualiza a branch sem `force`;
8. grava o SHA no workspace e conclui um documento em `exports`.

O commit e atomico: a branch recebe todos os arquivos juntos ou nao recebe
nenhum. Uma falha nunca deixa metade do snapshot no commit final.

Antes de enviar, o navegador calcula o SHA Git de cada JSON e compara com a
tree atual. Arquivos identicos sao reaproveitados. Os arquivos alterados sao
incluidos juntos em uma unica requisicao de criacao da tree, evitando uma
requisicao por JSON e os limites secundarios do GitHub. O manifesto muda em
todo backup porque registra `exportedAt`.

## Configurar um token individual

Use um fine-grained personal access token. Nao use senha, chave privada do
GitHub App nem token compartilhado pela equipe.

No GitHub:

1. Entre na conta que recebeu acesso ao repositorio.
2. Abra **Settings**.
3. Abra **Developer settings**.
4. Abra **Personal access tokens > Fine-grained tokens**.
5. Clique em **Generate new token**.
6. Em **Token name**, use um nome como `SenkoLib backup - computador trabalho`.
7. Escolha uma expiracao curta que a equipe consiga renovar.
8. Em **Repository access**, escolha **Only select repositories**.
9. Selecione somente `projetoTestes`.
10. Em **Repository permissions**, defina **Contents: Read and write**.
11. Nao conceda Actions, Administration, Members ou Secrets.
12. Gere o token e copie o valor uma unica vez.

No SenkoLib:

1. Entre com a conta Google autorizada.
2. Clique no botao GitHub do topo.
3. Confira o destino fixo `YgorFQ`, `projetoTestes` e `main`.
4. Cole o token em **Token pessoal**.
5. Clique em **Fazer backup**.
6. Aguarde a mensagem `Backup salvo no GitHub`.

O destino oficial do backup vem de
`app/infrastructure/firebase/firebase-config.js`. Quando esse destino existe,
valores antigos em `localStorage` nao podem sobrescrever owner, repositorio ou
branch. O `localStorage` guarda o token pessoal daquele navegador e mantem a
configuracao de destino apenas como fallback para ambientes antigos ou testes
sem `githubBackup` configurado. Limpar os dados do site exige colar o token de
novo.

## Seguranca do token

O token nunca deve:

- aparecer em `firebase-config.js`;
- ser enviado ao Firestore;
- ser colocado em `.env` do frontend;
- ser colado em issue, chat, captura de tela ou commit;
- ser compartilhado entre pessoas.

Como o token fica no navegador, qualquer JavaScript executado na mesma origem
poderia le-lo. Por isso:

- limite o token a um repositorio;
- conceda somente `Contents: Read and write`;
- use expiracao;
- revogue imediatamente um token exposto;
- nao instale scripts desconhecidos no SenkoLib.

Um erro 401 limpa o token local para impedir novas tentativas com uma
credencial invalida. Um erro 403 pode indicar permissao insuficiente ou um
limite temporario da API; o SenkoLib diferencia esses casos na mensagem.

## GitHub App antigo

A chave privada e o GitHub App configurados durante a tentativa com Cloud
Functions nao sao usados por esta arquitetura. A chave privada nunca pode ser
movida para o navegador.

Depois de confirmar o primeiro backup por token individual, o responsavel pode
desinstalar o App do repositorio, revogar a chave no GitHub e excluir a copia
local. Guarde-o apenas se houver uma decisao explicita de usar um backend
externo no futuro.

## Conteudo exportado

O commit grava JSON em:

```text
backup/data/
|-- manifest.json
`-- workspaces/senkolib/
    |-- groups/{groupId}.json
    |-- bibliotecaLayouts/{layoutId}.json
    |   |-- revisions/{revisionId}.json
    |   `-- variants/{variantId}/
    |       `-- revisions/{revisionId}.json
    `-- collections/{collectionId}.json
        `-- layouts/{layoutId}/
            `-- revisions/{revisionId}.json
```

Cada documento Firestore vira um JSON. Timestamps viram texto ISO 8601. O
`manifest.json` informa:

- `schemaVersion`;
- `workspaceId`;
- `exportedAt`;
- `dataVersion`;
- lista exata de arquivos do snapshot.

Arquivos antigos dentro de `backup/data/` que nao fazem parte do novo
snapshot sao removidos no mesmo commit. Isso faz uma exclusao no Firebase
tambem desaparecer do backup mais recente, enquanto commits anteriores
continuam preservando o estado antigo.

Nao sao exportados:

- membros;
- solicitacoes em `accessRequests` e atividade em `memberEvents`;
- `presenceAccess` e sessoes de presenca;
- `memberManagers`;
- reservas de nome;
- logs em `exports`;
- configuracao Firebase;
- token GitHub ou qualquer outro segredo;
- documento raiz completo do workspace.

O bundle publico gerado no mesmo commit fica em:

```text
backup/latest/
|-- manifest.js
|-- biblioteca.js
`-- colecoes.js
```

Esses tres arquivos sao dados gerados. Nao devem ser editados manualmente.
Eles contem somente a versao atual de layouts, variacoes, colecoes, layouts
internos e grupos. Nao incluem documentos de revisao, autoria, membros,
e-mails, presenca, tokens ou logs. O HTML e o CSS ficam publicos por decisao
de produto.

O gerador compartilhado fica em
`app/infrastructure/static-backup/senko-static-backup-builder.js`. Para
reconstruir o bundle a partir de `backup/data/` sem acessar Firebase:

```powershell
npm run backup:build-static
```

## Consistencia do snapshot

O Firestore nao oferece uma transacao de leitura para todas as subcolecoes do
workspace. O exportador usa `dataVersion`:

1. le a versao antes;
2. le todos os recursos conhecidos;
3. le a versao depois;
4. aceita o snapshot somente se as duas versoes forem iguais.

Se alguem salvar durante a leitura, o exportador descarta os dados em memoria
e repete ate tres vezes. Depois disso, falha sem criar commit. O membro pode
aguardar alguns segundos e clicar novamente.

Este mecanismo depende de todo CRUD incrementar `dataVersion`; por isso essa
regra e validada em `firebase/firestore.rules`.

## Como verificar um backup

1. Confirme a mensagem de sucesso no SenkoLib.
2. Abra a pagina de commits do repositorio.
3. Localize `SenkoLib backup vN (nome da pessoa)`.
4. Abra `backup/data/manifest.json` no commit.
5. Compare `dataVersion` com o campo do workspace.
6. Confira uma amostra de grupo, layout, variacao, colecao e layout interno.
7. Confirme que HTML e CSS estao completos.
8. Confirme que nenhum token ou documento `members` apareceu.
9. Abra o aplicativo sem login e confira o selo **Somente leitura**.
10. Confira as mesmas contagens em Biblioteca e Colecoes.

No Firestore, `workspaces/senkolib/exports/{id}` deve ficar com
`status: completed`, `commitSha`, `commitUrl` e `fileCount`. Uma falha fica com
`status: failed` e uma mensagem curta.

O membro autenticado ve o Firestore ao vivo. Uma pessoa sem login ve o bundle
do ultimo backup, portanto uma mudanca nova so aparece no modo publico depois
de outro backup e da publicacao do commit no GitHub Pages.

Para testar fora do Firebase, sirva a raiz do repositorio com Live Server ou
outro servidor HTTP estatico. Abrir `index.html` diretamente por `file://` nao
e um requisito desta arquitetura.

## Erros comuns do backup

### `GitHub recusou o backup (401)`

Token expirado, revogado ou incorreto. Gere outro token e abra o botao de novo.

### `GitHub recusou o backup (403)`

A conta ou token nao possui `Contents: Read and write` no repositorio. Confira
o acesso do colaborador e o escopo do fine-grained token.

### `O GitHub limitou temporariamente os backups`

O GitHub aplicou um limite secundario por excesso de requisicoes ou atividade
de criacao. Nao gere outro token nem clique repetidamente. Aguarde alguns
minutos e tente uma vez. O exportador envia todos os arquivos alterados em uma
unica tree para reduzir a chance desse limite.

### `Nao foi possivel conectar a API do GitHub`

O navegador nao recebeu uma resposta HTTP. Confira a conexao, bloqueadores de
rede e a disponibilidade do GitHub antes de tentar novamente.

### `GitHub recusou o backup (404)`

O destino fixo em `firebase-config.js` ou a branch esta incorreto. Um
repositorio privado tambem pode retornar 404 quando o token nao possui acesso.

### Backup apareceu em outro repositorio

Isso pode acontecer em uma versao antiga da pagina que ainda aceitava
`senkolib_github_config` salvo no navegador como prioridade. Na arquitetura
atual, o projeto tem prioridade sobre `localStorage`. Recarregue a pagina
depois de publicar a correcao e confirme que a janela mostra
`YgorFQ/projetoTestes/main` como destino fixo.

### Erro ao atualizar a referencia

Outro commit pode ter chegado durante o backup ou a branch pode estar
protegida. Nao use `force`; atualize a configuracao de permissao ou tente de
novo.

### Workspace mudou durante tres leituras

Existem saves frequentes. Aguarde um momento de menor atividade.

## Ferramenta de restauracao

O comando administrativo e:

```powershell
npm run backup:restore -- --source <pasta> [opcoes]
```

Origens aceitas:

- raiz de um repositorio que contenha `backup/data/`;
- propria pasta `backup/data/`;
- caminho de `backup/data/manifest.json`;
- commit de um repositorio Git local, com `--commit`.

Exemplo de validacao sem escrever:

```powershell
npm run backup:restore -- `
  --source D:\Backups\senkolib-repo `
  --commit <SHA_DO_COMMIT> `
  --workspace senkolib-restauracao `
  --dry-run
```

O `--dry-run` valida manifesto, JSON, caminhos, pais, revisoes, grupos, nomes
unicos e limites sem acessar Firebase.

## Restaurar no emulador

Com os emuladores abertos:

```powershell
$env:SENKO_FIREBASE_PROJECT_ID='senkolibtestes'
$env:FIRESTORE_EMULATOR_HOST='127.0.0.1:8080'
npm run backup:restore -- `
  --source D:\Backups\senkolib-repo `
  --commit <SHA_DO_COMMIT> `
  --workspace senkolib-restauracao
```

Use sempre um workspace descartavel primeiro.

## Restaurar em Firebase real

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS='D:\Segredos\senkolib-admin.json'
$env:SENKO_FIREBASE_PROJECT_ID='senkolibtestes'
Remove-Item Env:FIRESTORE_EMULATOR_HOST -ErrorAction SilentlyContinue
npm run backup:restore -- `
  --source D:\Backups\senkolib-repo `
  --commit <SHA_DO_COMMIT> `
  --workspace senkolib-restauracao
```

A restauracao e uma operacao administrativa local e nao exige Functions
implantadas. A conta de servico deve ficar fora do repositorio e ser revogada
depois do uso.

## Protecoes e `--force`

- Workspace preenchido e recusado sem `--force`.
- `--force` remove conteudo gerenciado e reservas antes de restaurar.
- Membros, Authentication, exports, presenca e segredos nao sao restaurados.
- Reservas de nome sao recalculadas.
- `dataVersion` recebe o valor do manifesto.
- Metadados do ultimo backup sao limpos.
- O workspace registra estado, origem, horario e contagens da restauracao.

`--force` nao e uma transacao unica para o workspace inteiro. Uma falha depois
da limpeza pode deixar estado parcial. Restrinja saves durante o procedimento
e mantenha um segundo backup confirmado.

## Testes automatizados

Com o Firestore Emulator aberto:

```powershell
$env:FIRESTORE_EMULATOR_HOST='127.0.0.1:8080'
npm run test:static-backup
node tests/firestore-client-writes.test.js
npm run test:restore-emulator
```

O teste estatico garante que somente o estado atual e publicado e que dados
de membros e revisoes antigas ficam fora. O teste do cliente usa uma API
GitHub simulada e nao transmite token nem cria commit real. O ultimo valida a
restauracao por pasta e commit local.

Antes da producao, ainda e obrigatorio criar um commit real pelo botao,
restaura-lo em workspace descartavel e comparar as contagens.
