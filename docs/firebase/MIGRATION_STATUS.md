# Estado da migracao Firebase

Ultima revisao documental: **2026-08-15**.

## Resumo

Estimativa atual: **97% da migracao concluida**. CRUD colaborativo, regras do
plano Spark, backup manual pelo navegador, primeiro commit real de backup,
restauracao em emulador e restauracao no Firestore real existem. Faltam o
primeiro login real para gerar UID, cadastro do membro real e smoke test final
no GitHub Pages com conta autorizada.

## Decisoes confirmadas

- Firebase sera a fonte principal.
- O projeto permanecera no plano gratuito Spark.
- O navegador gravara no Firestore sob protecao de Security Rules.
- GitHub sera backup manual pelo botao global.
- Nao havera backup automatico de 30 minutos.
- Nao havera GitHub Actions para esse fluxo.
- GitHub App e chave privada nao fazem parte da arquitetura ativa.
- Cada responsavel pelo backup usara seu proprio fine-grained token.
- Digitar nao grava; somente **Salvar** envia conteudo.
- Saves aparecem para outros computadores por listeners.
- Conflitos usam revisao ou versao e nunca sobrescrevem silenciosamente.
- Todos os membros atuais podem criar, editar e excluir.
- Exclusao e direta, sem lixeira de produto.
- Presenca mostra pessoas no mesmo item.

## Implementado

- [x] Configuracao Web do projeto `senkolibtestes`.
- [x] Emuladores de Auth, Firestore, Functions, Realtime, Storage e Hosting.
- [x] Login e verificacao do documento de membro.
- [x] Bootstrap de membro somente no emulador.
- [x] Firestore como fonte local da Biblioteca e Colecoes.
- [x] Gravacoes diretas com transacoes no SDK Web.
- [x] Criacao, edicao e exclusao de layouts e variacoes.
- [x] Criacao, edicao e exclusao de colecoes e layouts internos.
- [x] Criacao, edicao e exclusao de grupos.
- [x] Bloqueio normal de exclusao de grupo em uso.
- [x] Validacao de grupo antes de salvar colecao.
- [x] Reservas atomicas para nomes unicos.
- [x] Revisao por save de HTML/CSS.
- [x] Controle de versao para colecoes e grupos.
- [x] Listeners em tempo real depois do save.
- [x] Protecao de rascunho local contra atualizacao remota.
- [x] Presenca por item e multiplas sessoes da mesma conta.
- [x] Extrator e importador do snapshot legado.
- [x] Regras Firestore para membros, schemas, versoes e exclusao.
- [x] Teste integrado de cliente e regras.
- [x] Botao global de backup no shell.
- [x] Janela responsiva de owner, repositorio, branch e token.
- [x] Snapshot consistente com tres tentativas por `dataVersion`.
- [x] Commit atomico pela Git Data API sem `force`.
- [x] Remocao no commit de arquivos obsoletos em `senkolib-data/`.
- [x] Log de exportacao e metadados do ultimo commit no Firestore.
- [x] Teste do exportador com API GitHub simulada.
- [x] Importador de restauracao com `--dry-run` e `--force`.
- [x] Teste automatizado de restauracao no Firestore Emulator.
- [x] Conferencia visual da janela de backup em desktop e mobile.

## Em validacao

- [ ] Rodada completa com duas contas e dois computadores ou perfis.
- [ ] Atualizacao ao vivo com um editor limpo.
- [ ] Aviso de conflito com um rascunho local.
- [ ] Saida de presenca ao fechar aba e perder conexao.
- [ ] Regressao visual de todos os layouts e variacoes.
- [ ] Regressao manual de grupos, colecoes e layouts internos.

## Dados atuais da migracao

| Tipo | Quantidade |
| --- | ---: |
| Grupos | 5 |
| Layouts da Biblioteca | 34 |
| Variacoes | 11 |
| Colecoes | 5 |
| Layouts internos | 48 |

As antigas variacoes orfas foram promovidas a layouts independentes porque o
historico Git confirmou que seus pais nunca existiram. `section-41` preserva
`padrao-p-table-click` e `section-46` preserva `variavel-1`. O snapshot atual
nao possui warnings.

## Pendencias obrigatorias antes de producao

- [x] Resolver variacoes orfas sem perder conteudo.
- [x] Completar campos, auditoria e reservas dos grupos.
- [x] Implementar restauracao do snapshot GitHub.
- [x] Remover Blaze, agendamento e GitHub App dos requisitos ativos.
- [x] Implementar escrita direta protegida para o plano Spark.
- [x] Implementar backup manual por token individual.
- [x] Criar um fine-grained token de teste com escopo minimo.
- [x] Produzir um commit real pelo botao global.
- [x] Restaurar esse commit em workspace descartavel.
- [x] Comparar contagens e amostras de HTML/CSS.
- [x] Publicar regras e indices no projeto real.
- [ ] Criar o primeiro membro real.
- [ ] Criar `presenceAccess` para cada membro real.
- [x] Importar o snapshot final sem warnings.
- [x] Separar ativacao de producao e emuladores na configuracao.
- [ ] Publicar o frontend com Firebase ativo no GitHub Pages.
- [ ] Executar smoke test de producao.
- [ ] Criar commit e tag do corte.

## Melhorias posteriores

- [ ] Painel administrativo para membros, permissoes e logs.
- [ ] Papeis de leitor, editor e administrador, se necessarios.
- [ ] Backend seguro para administrar membros sem Console.
- [ ] Tela de historico e restauracao de revisoes.
- [ ] Politica de retencao de revisoes e backups.
- [ ] Indicador visual da data do ultimo backup.
- [ ] Metricas e alertas operacionais.
- [ ] Storage somente quando houver requisito de arquivo.

## Proximo passo recomendado

1. Publicar o codigo do corte no branch `main`.
2. Abrir o GitHub Pages e fazer o primeiro login real com Google.
3. Exportar ou consultar o usuario criado no Firebase Auth.
4. Rodar `npm --prefix functions run member:add:cli-auth -- --uid <uid> --email <email> --name <nome>`.
5. Recarregar o GitHub Pages e executar o smoke test.

## Observacao sobre GitHub Pages

O commit de backup grava `senkolib-data/` para recuperacao externa. Ele nao e a
fonte de leitura do aplicativo publico. A pagina publica so passa a mostrar os
dados do Firebase depois que o codigo com `enabled: true` chega ao branch usado
pelo GitHub Pages.

## Registro de rodadas de teste

Adicione novas rodadas sem apagar as anteriores.

| Data | Ambiente | Versao/commit | Resultado | Observacoes |
| --- | --- | --- | --- | --- |
| 2026-08-01 | Emuladores | alteracoes locais | Parcial | CRUD principal validado; presenca ajustada para sessoes da mesma conta |
| 2026-08-15 | Emuladores | alteracoes locais | Parcial aprovado | Grupos e restauracao passaram; snapshot com 34 layouts, 11 variacoes e zero warnings |
| 2026-08-15 | Firestore Emulator | alteracoes locais | Aprovado | Cliente direto, regras, conflitos, exclusao recursiva e bloqueios de seguranca passaram |
| 2026-08-15 | GitHub simulado | alteracoes locais | Aprovado | Snapshot, tree, exclusao de arquivo antigo, commit e log Firestore passaram sem trafego externo |
| 2026-08-15 | UI local | alteracoes locais | Aprovado | Janela global de backup conferida em desktop e 390x844 |
| 2026-08-15 | GitHub real | d9e63426514bee66ac997b608dff706922551c86 | Aprovado | Primeiro backup real criado pelo botao global; 197 arquivos em `senkolib-data/` |
| 2026-08-15 | Firestore Emulator | d9e63426514bee66ac997b608dff706922551c86 | Aprovado | Backup real restaurado em `senkolib-restauracao-d9e6342`; contagens conferidas: 5 grupos, 34 layouts, 11 variacoes, 5 colecoes, 48 layouts internos |
| 2026-08-15 | Firebase real | d9e63426514bee66ac997b608dff706922551c86 | Aprovado | Regras Firestore/Realtime publicadas, `ygorfq.github.io` autorizado e backup restaurado no workspace `senkolib`; contagens reais conferidas |
