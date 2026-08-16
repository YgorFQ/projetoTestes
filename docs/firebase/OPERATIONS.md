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

## Avisos de disponibilidade

O header diferencia falhas reais do modo publico normal:

| Aviso | Causa | Comportamento |
| --- | --- | --- |
| `Somente leitura` | Pessoa deslogada ou Firebase desativado | Usa o ultimo backup publico |
| `Limite atingido` | Firestore retornou `resource-exhausted` ou mensagem de cota | Bloqueia escrita e usa o ultimo backup |
| `Sem conexao` | O navegador ficou offline | Bloqueia escrita e usa o ultimo backup |
| `Firebase fora do ar` | Listener retornou indisponibilidade ou timeout | Bloqueia escrita e usa o ultimo backup |

A faixa mostra a data do backup que esta sendo exibido. **Tentar novamente**
recarrega o SenkoLib para repetir a verificacao. Nao fique recarregando quando
o limite diario tiver acabado; aguarde a renovacao da cota. Para validar o
visual sem afetar producao, abra
`tests/fixtures/firebase-status-harness.html?kind=quota` por Live Server.

## Checklist antes do deploy

1. `git status --short` revisado.
2. `npm install` concluido.
3. Snapshot legado sem warnings.
4. Teste de cliente e regras aprovado.
5. Teste de restauracao aprovado.
6. Conta Firebase correta no CLI.
7. Projeto ativo `senkolibtestes`.
8. Commit de rollback identificado.
9. `meta[name="senko-release"]` incrementada quando o corte altera codigo ou CSS.

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

## Cache e versao do frontend

O `index.html` separa codigo de dados publicos:

- CSS e JavaScript usam `meta[name="senko-release"]`, estavel durante o release;
- `manifest.js`, `biblioteca.js` e `colecoes.js` recebem uma chave nova em cada
  abertura para refletir o ultimo backup;
- localhost e `file://` continuam sem cache entre aberturas;
- `sw.js` nao intercepta requisicoes e nao transforma `F5` em hard reload.

Ao publicar mudanca de codigo ou CSS, incremente `senko-release`. Um commit
gerado somente pelo botao de backup nao precisa alterar essa versao.

## Adicionar um membro

Fluxo normal, sem CMD:

1. A pessoa tenta entrar com Google.
2. Um proprietario ou admin abre **Acessos > Solicitacoes**.
3. Admins aprovam como editor. Proprietarios escolhem editor, admin ou
   proprietario.
4. A pessoa recebe acesso automaticamente; sair e entrar novamente nao e
   obrigatorio.

O botao grava o membro no Firestore, registra a atividade e sincroniza
`presenceAccess` no Realtime Database. Um aviso amarelo indica que e necessario
usar **Sincronizar** no membro.

Fluxo de emergencia pelo Console:

1. A pessoa tenta entrar com Google uma vez.
2. No Console Firebase, abra **Firestore Database > Dados > workspaces >
   senkolib > accessRequests**.
3. Abra o documento da pessoa e copie `uid`, `email` e `displayName`.
4. Como alternativa, o UID tambem aparece em **Authentication > Users**.
5. Crie `workspaces/senkolib/members/{uid}` no Firestore.
6. Preencha `uid`, `email`, `displayName`, `role`, `joinedAt`, `updatedAt` e
   `updatedBy`. Datas sao timestamps; `role` e `owner`, `admin` ou `editor`.
7. Crie `presenceAccess/senkolib/{uid} = true` no Realtime Database.
8. Para owner/admin, crie tambem `memberManagers/senkolib/{uid}` com o cargo.
9. A pessoa entra novamente.

Editores nao podem editar `members`, listar solicitacoes ou alterar
`presenceAccess`. Security Rules permitem essas operacoes somente aos cargos
administrativos correspondentes.

Alternativa pelo Firebase CLI, depois que o usuario ja apareceu em
Authentication:

```powershell
npm --prefix functions run member:add:cli-auth -- `
  --uid UID_COPIADO `
  --email email@exemplo.com `
  --name "Nome da pessoa" `
  --role editor
```

Esse comando cria o documento em `members`, libera `presenceAccess` e, para
owner/admin, cria `memberManagers`. Ele usa a conta logada em
`npx firebase-tools login`; nao exige chave JSON administrativa.

## Remover um membro

Use **Acessos > Membros > Remover**. Proprietarios removem qualquer outra
pessoa; admins removem somente editores.

Em emergencia:

1. Apague `workspaces/senkolib/members/{uid}`.
2. Apague `presenceAccess/senkolib/{uid}` e `memberManagers/senkolib/{uid}`.
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

Cada backup tambem atualiza o bundle publico em
`generated/static-backup/`. A pagina sem login permanece na versao do
ultimo backup, mesmo que o Firestore tenha mudancas mais novas.

## Verificar o modo publico

1. Conclua um backup pelo botao GitHub.
2. Aguarde o commit chegar ao host publicado ou atualize a copia local.
3. Abra uma janela anonima, sem sessao Google do SenkoLib.
4. Confirme o selo **Somente leitura** no header.
5. Confira Biblioteca, variacoes, grupos, colecoes e layouts internos.
6. Abra layouts e confirme preview e copia de codigo.
7. Confirme que criar, editar, excluir e fazer backup nao estao disponiveis.

Para um teste independente do Firebase, use um Live Server na raiz do
repositorio. O modo publico usa arquivos JavaScript locais e nao faz `fetch`
de JSON. `file://` nao faz parte do contrato suportado.

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

Use esse rollback apenas para testar ou congelar a edicao Firebase. Com o
bundle publico presente, o host continua exibindo o ultimo backup em modo
somente leitura; ele nao volta aos arquivos legados.

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
- `generated/static-backup/manifest.js`: versao e contagens publicas;
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
