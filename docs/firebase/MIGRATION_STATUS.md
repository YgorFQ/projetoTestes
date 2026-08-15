# Estado da migracao Firebase

Ultima revisao documental: **2026-08-15**.

## Resumo

Estimativa atual: **100% da migracao Firebase concluida**. O complemento de
continuidade publica esta implementado localmente e em validacao: o ultimo
backup pode alimentar Biblioteca e Colecoes sem login, em modo somente leitura.
O corte Firebase original continua marcado por tag Git.

## Decisoes confirmadas

- Firebase sera a fonte principal.
- O projeto permanecera no plano gratuito Spark.
- O navegador gravara no Firestore sob protecao de Security Rules.
- GitHub sera backup manual pelo botao global.
- Nao havera backup automatico de 30 minutos.
- Nao havera GitHub Actions para esse fluxo.
- GitHub App e chave privada nao fazem parte da arquitetura ativa.
- O ultimo backup sera a fonte publica somente leitura quando Firebase nao
  estiver `ready`.
- O fallback publico contem apenas a ultima versao, nunca revisoes antigas.
- Abrir por Live Server e suportado; abrir por `file://` nao e requisito.
- Arquivos legados serao removidos somente no ultimo processo da reforma.
- Cada responsavel pelo backup usara seu proprio fine-grained token.
- Digitar nao grava; somente **Salvar** envia conteudo.
- Saves aparecem para outros computadores por listeners.
- Conflitos usam revisao ou versao e nunca sobrescrevem silenciosamente.
- Todos os cargos atuais podem criar, editar e excluir conteudo.
- Proprietarios gerenciam todos os cargos; admins gerenciam somente editores.
- Exclusao e direta, sem lixeira de produto.
- Presenca mostra pessoas no mesmo item.

## Implementado

- [x] Configuracao Web do projeto `senkolibtestes`.
- [x] Emuladores de Auth, Firestore, Functions, Realtime, Storage e Hosting.
- [x] Login e verificacao do documento de membro.
- [x] Registro seguro de contas autenticadas sem acesso em `accessRequests`.
- [x] Papeis `owner`, `admin` e `editor` protegidos por Security Rules.
- [x] Feature independente para solicitacoes, membros e atividade.
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
- [x] Janela responsiva com destino GitHub fixo do projeto e token individual.
- [x] Snapshot consistente com tres tentativas por `dataVersion`.
- [x] Commit atomico pela Git Data API sem `force`.
- [x] Remocao no commit de arquivos obsoletos em `senkolib-data/`.
- [x] Log de exportacao e metadados do ultimo commit no Firestore.
- [x] Protecao contra `localStorage` antigo enviando backup para outro repositorio.
- [x] Teste do exportador com API GitHub simulada.
- [x] Importador de restauracao com `--dry-run` e `--force`.
- [x] Teste automatizado de restauracao no Firestore Emulator.
- [x] Conferencia visual da janela de backup em desktop e mobile.
- [x] Gerador compartilhado do bundle publico por feature.
- [x] Repositorios estaticos independentes para Biblioteca e Colecoes.
- [x] Estado global alternando Firebase e backup somente leitura.
- [x] Snapshot publico inicial com as contagens do ultimo backup tecnico.
- [x] Teste que exclui revisoes antigas, membros, e-mails e autoria do bundle.

## Em validacao

- [ ] Rodada completa com duas contas e dois computadores ou perfis.
- [ ] Atualizacao ao vivo com um editor limpo.
- [ ] Aviso de conflito com um rascunho local.
- [ ] Saida de presenca ao fechar aba e perder conexao.
- [ ] Regressao visual de todos os layouts e variacoes.
- [ ] Regressao manual de grupos, colecoes e layouts internos.
- [ ] Backup real contendo os tres arquivos publicos gerados.
- [x] GitHub Pages anonimo exibindo o ultimo backup em modo somente leitura.
- [x] Live Server com Firebase indisponivel exibindo todas as contagens.
- [ ] Troca anonimo -> membro e membro -> anonimo sem recarregar a pagina.

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
- [x] Criar o primeiro membro real.
- [x] Criar `presenceAccess` para cada membro real.
- [x] Importar o snapshot final sem warnings.
- [x] Separar ativacao de producao e emuladores na configuracao.
- [x] Publicar o frontend com Firebase ativo no GitHub Pages.
- [x] Executar smoke test de producao.
- [x] Criar commit e tag do corte.

## Melhorias posteriores

- [x] Painel administrativo para membros, permissoes e logs.
- [x] Papeis de proprietario, admin e editor.
- [ ] Backend para integrar papeis do Google Cloud IAM, somente se esse requisito surgir.
- [ ] Tela de historico e restauracao de revisoes.
- [ ] Politica de retencao de revisoes e backups.
- [ ] Indicador visual da data do ultimo backup.
- [ ] Metricas e alertas operacionais.
- [ ] Storage somente quando houver requisito de arquivo.

## Proximo passo recomendado

1. Usar uma segunda conta para testar o fluxo completo em `Acessos`: solicitar,
   aprovar como editor, promover para admin e remover.
2. Confirmar que o admin consegue gerenciar apenas editores e que o editor nao
   enxerga a feature administrativa.
3. Validar atualizacao ao vivo, presenca e conflito em dois computadores ou
   perfis de navegador.
4. Manter os arquivos legados ate a regressao completa terminar.

## Observacao sobre GitHub Pages

O commit de backup grava `senkolib-data/` para recuperacao e tambem gera os
arquivos publicos em `app/infrastructure/static-backup/`. Membros autorizados
veem Firebase ao vivo. Pessoas sem login ou com Firebase indisponivel veem o
ultimo backup, com comandos de escrita bloqueados.

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
| 2026-08-15 | GitHub Pages | 4812d098921a8f960fccba78eca5c36bbcf31065 | Parcial aprovado | Codigo do corte publicado e `firebase-config.js` servido com `enabled: true`; aguardando primeiro membro real para smoke test autenticado |
| 2026-08-15 | Firebase real | NR6Zez...GfL2 | Aprovado | Primeiro membro real criado no Firestore e `presenceAccess` liberado no Realtime Database |
| 2026-08-15 | GitHub Pages | c0cef9f | Aprovado | Conta autorizada entrou, Biblioteca carregou, tag em layout persistiu, edicao de layout salvou e Colecoes salvou no Firebase real |
| 2026-08-15 | GitHub backup | alteracoes locais | Aprovado | Identificado backup enviado para repo errado por configuracao antiga do navegador; destino fixo do projeto passou a prevalecer sobre `localStorage`, com teste automatizado |
| 2026-08-15 | Live Server publico | alteracoes locais | Aprovado | Sem login: 34 layouts, 11 variacoes, 5 colecoes, 48 layouts internos e 5 grupos pelo bundle; escrita bloqueada, copia e preview mantidos; desktop e 390x844 sem overflow |
| 2026-08-15 | GitHub Pages publico | 0f64f44 | Aprovado | Pagina anonima exibiu selo Somente leitura, 34 layouts e 5 colecoes; login disponivel e controles de criacao, edicao e backup bloqueados |
| 2026-08-15 | Firestore Emulator e producao | alteracoes locais | Aprovado | Solicitacoes de acesso passaram nas regras: conta grava apenas o proprio UID, incrementa tentativas e nao lista terceiros; regras publicadas em `senkolibtestes` |
| 2026-08-15 | Emuladores e GitHub Pages | e3c929d | Aprovado | Regras de owner/admin/editor passaram nos testes automatizados; gestao de acessos foi publicada e permanece invisivel para visitantes anonimos, que continuam no backup somente leitura |
| 2026-08-15 | UI local e teste unitario | alteracoes locais | Aprovado | Limite, indisponibilidade e navegador offline possuem avisos distintos; fallback informa a data do backup e permaneceu responsivo em desktop e 390x844 |
| 2026-08-15 | GitHub Pages e cache local | 66ef971 | Aprovado | F5 deixou de forcar rede para todo CSS/JS; dois reloads mediram 142 ms e 109 ms, codigo usou a versao do release e os tres arquivos do backup permaneceram sempre frescos |
| 2026-08-15 | UI local e GitHub Pages | 80aefb2 | Aprovado | Menu de ferramentas agrupou acoes globais sem recria-las; Notas, tema, fechamento, permissoes e responsividade em desktop e 390x844 foram validados |
