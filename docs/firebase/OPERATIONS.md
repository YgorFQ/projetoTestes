# Operacao, deploy e acesso

## Estado atual

O aplicativo usa Firebase real no GitHub Pages e Firebase Emulator em
localhost. Regras, indices, dados iniciais, primeiro membro real e smoke test
de producao ja foram concluidos. Consulte `MIGRATION_STATUS.md` antes de
alterar regras, importar dados ou publicar novo corte.

## Ambientes

| Ambiente | Firebase | Dados | Finalidade |
| --- | --- | --- | --- |
| `127.0.0.1` / `localhost` | Emuladores | Descartaveis | Desenvolvimento e teste |
| Projeto `senkolibtestes` | Servicos reais | Conteudo principal | Producao atual |
| GitHub Pages | Firebase real | Conteudo do Firestore | Aplicacao publica |

Nao use o projeto real como substituto do emulador durante desenvolvimento.

## Checklist antes do deploy

1. `git status --short` revisado.
2. `npm install` concluido.
3. Snapshot legado sem warnings.
4. Teste de cliente e regras aprovado.
5. Teste de restauracao aprovado.
6. Conta Firebase correta no CLI.
7. Projeto ativo `senkolibtestes`.
8. Commit de rollback identificado.

Comandos:

```powershell
Set-Location D:\Cursos\Repositorios\projetoTestes
npx firebase-tools use
npm run migration:build
$env:FIRESTORE_EMULATOR_HOST='127.0.0.1:8080'
node tests/firestore-client-writes.test.js
npm --prefix functions run test:restore:emulator
npx firebase-tools deploy --only firestore:rules --dry-run
```

## Publicar regras e indices

Com o projeto correto:

```powershell
npx firebase-tools deploy --only firestore:rules,firestore:indexes,database
```

Se Storage estiver ativo:

```powershell
npx firebase-tools deploy --only firestore:rules,firestore:indexes,database,storage
```

Nao use deploy geral. O `firebase.json` ainda contem Functions para emulacao e
ferramentas historicas; a arquitetura Spark nao implanta essas Functions.

Depois, abra o Console e confira o horario das regras.

## Adicionar um membro

Todos os membros atuais sao editores completos.

1. A pessoa autentica com Google uma vez.
2. Em **Authentication > Users**, copie o UID.
3. Crie `workspaces/senkolib/members/{uid}` no Firestore.
4. Preencha `uid`, `email`, `displayName` e `joinedAt`.
5. Crie `presenceAccess/senkolib/{uid} = true` no Realtime Database.
6. A pessoa entra novamente.

O frontend nao pode editar `members` nem `presenceAccess`.

Alternativa pelo Firebase CLI, depois que o usuario ja apareceu em
Authentication:

```powershell
npm --prefix functions run member:add:cli-auth -- `
  --uid UID_COPIADO `
  --email email@exemplo.com `
  --name "Nome da pessoa"
```

Esse comando cria o documento em `members` e tambem libera
`presenceAccess/senkolib/{uid}` no Realtime Database. Ele usa a conta logada em
`npx firebase-tools login`; nao exige chave JSON administrativa.

## Remover um membro

1. Apague `workspaces/senkolib/members/{uid}`.
2. Apague `presenceAccess/senkolib/{uid}`.
3. Desative ou exclua a conta em Authentication quando necessario.
4. Peça a revogacao do token GitHub individual, se a pessoa possuia um.
5. Confira sessoes de presenca antigas.

Listeners e novas transacoes passam a falhar quando o documento de membro
deixa de existir. Um token GitHub e uma permissao separada e deve ser tratado
no GitHub.

## Importar dados reais

Gere primeiro:

```powershell
npm run migration:build
```

Contagens esperadas: 5 grupos, 34 layouts da Biblioteca, 11 variacoes, 5
colecoes, 48 layouts internos e zero warnings.

Teste no emulador. Para a importacao real, use uma conta de servico temporaria:

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS='D:\Segredos\senkolib-admin.json'
$env:SENKO_FIREBASE_PROJECT_ID='senkolibtestes'
Remove-Item Env:FIRESTORE_EMULATOR_HOST -ErrorAction SilentlyContinue
npm --prefix functions run migrate:legacy
```

Depois:

1. compare contagens no Console;
2. abra amostras de HTML/CSS;
3. confira revisoes e reservas;
4. revogue a chave administrativa.

Quando uma chave administrativa nao estiver instalada e a conta logada no
Firebase CLI tiver permissao suficiente, tambem e possivel restaurar um commit
de backup diretamente:

```powershell
$env:SENKO_FIREBASE_PROJECT_ID='senkolibtestes'
npm --prefix functions run restore:github:cli-auth -- `
  --source D:\Cursos\Repositorios\projetoTestes `
  --commit <SHA> `
  --workspace senkolib
```

Esse modo nao implementa `--force`; se houver conteudo gerenciado no workspace,
ele interrompe antes de escrever.

## Fazer backup

O backup e acionado no botao GitHub do shell. Ele exige membro Firebase e um
fine-grained token individual com `Contents: Read and write` somente no
repositorio.

Nao existe agendamento. A equipe precisa definir uma rotina humana, por
exemplo: backup no inicio e no final de uma sessao importante, antes de uma
migracao e antes de exclusoes em massa.

Confira o commit e `exports/{id}` depois de cada backup importante. Consulte
`BACKUP_AND_RESTORE.md` para configuracao e erros.

## Restaurar um backup

Sempre valide primeiro:

```powershell
npm --prefix functions run restore:github -- `
  --source D:\Backups\senkolib-repo `
  --commit <SHA> `
  --workspace senkolib-restauracao `
  --dry-run
```

Restaure em um workspace descartavel no emulador, compare dados e somente
depois considere o projeto real. `--force` pode deixar estado parcial se a
operacao falhar depois da limpeza.

## Ativar o frontend em producao

Estado atual:

```js
enabled: true,
useEmulators: isLocalhost
```

Para rollback temporario do frontend, sem apagar dados do Firestore:

```js
enabled: isLocalhost,
useEmulators: isLocalhost
```

Use esse rollback apenas quando for intencional congelar o Firebase no host
publico. Se ja existirem saves reais no Firestore, voltar ao modo legado pode
criar duas fontes divergentes.

## Ordem historica do corte

1. Congelar edicoes no modo legado.
2. Gerar snapshot final.
3. Publicar regras e indices.
4. Cadastrar membros e `presenceAccess`.
5. Importar dados reais.
6. Comparar contagens e amostras.
7. Ativar Firebase no host publico.
8. Testar login, leitura, save, conflito e exclusao controlada.
9. Fazer backup GitHub pelo botao.
10. Conferir e restaurar o commit em ambiente descartavel.
11. Criar tag do corte.

## Rollback do frontend

Se o corte falhar antes de novos saves relevantes:

1. restaure o commit anterior do frontend;
2. mantenha o Firestore intacto para diagnostico;
3. bloqueie temporariamente edicoes se houver divergencia;
4. registre horario e operacoes executadas.

Se houver saves reais no Firestore, nao volte silenciosamente ao GitHub como
fonte principal. Isso criaria duas fontes divergentes. Exporte um backup,
compare os estados e planeje a reconciliacao.

## Logs e diagnostico

Locais principais:

- Console do navegador: SDK, listeners, conflito e GitHub API;
- Emulator UI: documentos, regras e Functions locais;
- Firestore `exports`: inicio, sucesso e falha de backups;
- historico de commits: snapshot externo;
- `firebase-debug.log` e logs de emuladores: inicializacao local.

Para um incidente, registre:

- horario e fuso;
- UID da pessoa;
- tipo e ID do recurso;
- mensagem completa sem token;
- `dataVersion`;
- SHA do ultimo backup;
- passos que reproduzem.

## Segredos

- Configuracao Web Firebase nao e segredo administrativo.
- Token GitHub e segredo individual guardado no navegador.
- Conta de servico e segredo administrativo temporario.
- Chave privada do GitHub App antigo nao e usada.
- Nunca envie segredos ao Git, Firestore, capturas ou logs.

Se um token GitHub vazar, revogue no GitHub. Se uma conta de servico vazar,
revogue a chave no Google Cloud e revise logs de auditoria.
