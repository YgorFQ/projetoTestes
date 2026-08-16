# Plano de testes Firebase

Este plano e a definicao minima de qualidade para regressao Firebase,
manutencao e novos cortes. Cada linha deve ser testada no emulador e, quando
indicado, em um ambiente de producao controlado.

## Preparacao

- Emuladores iniciados sem erros.
- Snapshot legado importado.
- Duas contas locais diferentes criadas.
- Uma terceira janela usando a mesma conta para testar sessoes.
- Console do navegador aberto para observar erros.

## Estrutura do repositorio

- [ ] `npm run inventory:build` termina sem erro.
- [ ] Todo arquivo listado possui exatamente um dos quatro estados aceitos.
- [ ] Biblioteca e Colecoes carregam apenas caminhos oficiais ou compatibilidades em `legacy` declaradas no `register.js`.
- [ ] `generated/static-backup` continua publicado; snapshots tecnicos, migracoes e docs nao entram no Firebase Hosting.
- [ ] Nenhuma documentacao canonica aponta para um caminho removido.

## Autenticacao e membros

- [ ] Pessoa deslogada ve a opcao de entrar e nao carrega dados.
- [ ] Primeiro usuario local vira membro automaticamente.
- [ ] Usuario real sem documento de membro recebe estado `unauthorized`.
- [ ] Usuario sem acesso cria ou incrementa somente a propria solicitacao.
- [ ] Usuario real cadastrado como membro consegue ler o workspace.
- [ ] Remover o documento de membro impede a proxima escrita.
- [ ] Sair limpa o estado visual e impede novas operacoes.
- [ ] Proprietario ve Acessos no menu; editor nao ve a acao nem lista seus dados.
- [ ] Admin aprova e remove editor, mas nao cria admin ou proprietario.
- [ ] Proprietario promove cargos e nao consegue remover a propria conta.
- [ ] Aprovacao aparece ao vivo para a conta que aguardava acesso.
- [ ] Falha de sincronizacao da presenca pode ser reparada pelo botao.

## Shell e menu de ferramentas

- [x] Header exibe o menu oficial para as acoes globais.
- [x] Menu fecha ao escolher uma acao, clicar fora ou pressionar Escape.
- [x] Notas abre seu modal original depois de ser movida para o menu.
- [x] Painel cabe em desktop e em `390x844` sem overflow horizontal.
- [x] Membro autorizado ve criacao rapida fixa a esquerda do menu e backup habilitado dentro dele.
- [ ] Proprietario abre o modal Acessos; admin tambem abre e editor nao ve a acao.
- [x] Modal Acessos abre e fecha sem overflow, restaura o foco e cabe em desktop e `390x844`.
- [x] Modal Acessos fecha tambem pelo fundo e pela tecla Escape.

## Biblioteca

- [ ] Lista todos os layouts importados.
- [ ] Lista variacoes sob o layout correto.
- [ ] Cria layout com ID automatico.
- [ ] Cria variacao com ID automatico.
- [ ] Edita nome, tags, HTML e CSS de layout.
- [ ] Edita nome, HTML e CSS de variacao.
- [ ] Recarregar a pagina preserva o ultimo save.
- [ ] Nome duplicado e bloqueado, inclusive com acentos/caixa diferentes.
- [ ] Excluir variacao remove o documento e suas revisoes.
- [ ] Excluir layout remove tambem suas variacoes e revisoes.

## Colecoes

- [ ] Lista grupos e mantem grupos vazios.
- [ ] Cria e edita grupo com nome e cor validos.
- [ ] Exclui grupo manualmente sem excluir automaticamente suas colecoes.
- [ ] Cria e edita colecao.
- [ ] Cria e edita layout dentro de colecao.
- [ ] Layout aparece somente na colecao correta.
- [ ] Nome duplicado de colecao e bloqueado.
- [ ] Nome duplicado de layout e bloqueado dentro da mesma colecao.
- [ ] Mesmo nome de layout e permitido em colecoes diferentes.
- [ ] Excluir layout interno remove suas revisoes.
- [ ] Excluir colecao remove layouts e revisoes filhos.

Teste automatizado: `tests/firestore-client-writes.test.js` cobre o gravador
atual; `npm --prefix functions run test:groups:emulator` preserva a verificacao
da implementacao administrativa anterior. A interface ainda deve ser conferida.

## Tempo real e concorrencia

- [ ] Computador A digita sem salvar; computador B nao muda.
- [ ] Computador A salva; computador B recebe a mudanca.
- [ ] Editor limpo aplica a mudanca remota imediatamente.
- [ ] Editor com rascunho preserva o rascunho e mostra aviso.
- [ ] Salvar a partir de uma revisao antiga retorna conflito.
- [ ] Nenhum conflito sobrescreve silenciosamente o save mais recente.
- [ ] Cada save cria exatamente uma revisao nova.

## Presenca

- [ ] Uma sessao mostra `So voce neste editor`.
- [ ] Duas contas no mesmo item mostram a outra pessoa.
- [ ] Duas sessoes da mesma conta mostram `Outra sessao sua`.
- [ ] Pessoas em itens diferentes nao aparecem juntas.
- [ ] Layout e variacao do mesmo layout usam salas diferentes.
- [ ] Fechar o editor remove a sessao.
- [ ] Encerrar a conexao remove a sessao por `onDisconnect`.

## Validacao e limites

- [x] `resource-exhausted` e mensagem de cota sao classificados como `quota`.
- [x] Navegador offline e indisponibilidade do Firestore possuem avisos distintos.
- [x] Aviso de limite informa que o ultimo backup esta em somente leitura.
- [ ] Teste manual real apos a renovacao da cota confirma retorno ao Firebase.
- [ ] Nome com menos de 2 caracteres e recusado.
- [ ] Nome acima de 160 caracteres e recusado.
- [ ] ID vazio, com `/` ou acima de 180 caracteres e recusado.
- [ ] Cor de grupo fora de `#rrggbb` e recusada.
- [ ] No maximo 40 tags sao persistidas.
- [ ] Cada tag e limitada a 80 caracteres.
- [ ] HTML acima de 750.000 caracteres e recusado.
- [ ] CSS acima de 250.000 caracteres e recusado.
- [ ] Criar filho de pai excluido retorna `not-found`.

## Seguranca

- [ ] Firestore nega leitura sem autenticacao.
- [ ] Firestore nega leitura para nao membro.
- [ ] Firestore permite escrita valida somente para membro.
- [ ] Firestore recusa schema, versao ou ator invalidos.
- [ ] Firestore impede o navegador de escrever em `members`.
- [ ] Firestore impede listar solicitacoes ou gravar solicitacao para outro UID.
- [ ] Alteracao de conteudo sem incremento de `dataVersion` e recusada.
- [ ] Realtime Database permite escrever apenas a propria sessao.
- [ ] Realtime Database nega presenca sem `presenceAccess`.
- [ ] Realtime Database permite owner sincronizar cargos e admin apenas editores.
- [ ] Storage nega escrita no estado atual.
- [ ] Nenhuma chave administrativa aparece no frontend ou no Git.

## Migracao

- [ ] `npm run migration:build` produz contagens esperadas.
- [ ] Inconsistencias interrompem importacao sem `--allow-warnings`.
- [ ] Workspace preenchido interrompe importacao sem `--force`.
- [ ] Importacao cria recursos, revisoes e reservas de nome, inclusive para grupos.
- [ ] Contagens do Firestore correspondem ao snapshot validado.

## GitHub

- [ ] Botao manual cria um unico commit de snapshot.
- [ ] Commit contem `generated/backups/senkolib-data/manifest.json` e todos os recursos esperados.
- [ ] Token individual possui acesso somente ao repositorio e Contents write.
- [ ] Token nao aparece no Firestore, commit ou logs.
- [ ] Arquivo excluido no Firebase some do snapshot mais recente.
- [ ] Commit atualiza a branch sem `force`.
- [ ] Save do Firebase continua funcionando quando GitHub falha.
- [ ] Falha cria documento `exports/{id}` com estado `failed`.
- [ ] Restauracao em workspace vazio foi executada e comparada com a origem.
- [ ] Commit atualiza os tres arquivos em `generated/static-backup/` juntos.
- [ ] Bundle publico contem a ultima versao, sem documentos de revisao antiga.
- [ ] Bundle publico nao contem membros, e-mails, tokens, presenca ou autoria.
- [ ] Sem login, Biblioteca e Colecoes usam o bundle em modo somente leitura.
- [ ] Live Server mostra preview e permite copiar codigo sem acessar Firebase.
- [ ] Criacao, edicao, exclusao e backup ficam indisponiveis no modo publico.
- [ ] Login autorizado troca o bundle pelos listeners Firebase sem recarregar.
- [ ] Logout volta ao ultimo bundle publico e encerra listeners das features.

`tests/static-backup-builder.test.js` cobre o formato publico e a exclusao de
revisoes e dados privados. `tests/firestore-client-writes.test.js` cobre
snapshot, tree, remocao obsoleta, commit e log usando API GitHub simulada.
`test:restore:emulator` cobre modelo
completo, protecao contra sobrescrita e preservacao de membros. O item final
exige um commit real criado pelo botao e verificacao visual da restauracao.

## Evidencia do teste

Para cada rodada, registre em `MIGRATION_STATUS.md`:

- data;
- ambiente;
- pessoa que testou;
- itens aprovados;
- falhas encontradas;
- commit ou versao testada.
