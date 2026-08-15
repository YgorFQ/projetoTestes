# SenkoLib - Estrutura do Projeto

```text
SenkoLib/
|-- app/
|   |-- infrastructure/
|   |   |-- firebase/
|   |       |-- firebase-config.js       - liga/desliga e identifica o projeto Firebase
|   |       |-- senko-firebase.js        - Auth, Firestore, listeners, Storage e presenca
|   |       |-- senko-firestore-writes.js - validacao e transacoes de escrita no plano Spark
|   |       |-- senko-github-backup.js   - snapshot e commit GitHub pelo navegador
|   |       |-- senko-firebase-ui.js     - login, conta e janela do backup global
|   |   |   `-- senko-firebase.css       - interface global de autenticacao
|   |   `-- static-backup/
|   |       |-- senko-data-mode.js       - escolhe Firebase ou backup publico
|   |       |-- senko-static-backup-builder.js - gera o formato publico
|   |       |-- manifest.js              - versao e contagens do ultimo backup
|   |       |-- biblioteca.js            - layouts e variacoes atuais
|   |       `-- colecoes.js              - grupos, colecoes e layouts atuais
|   |
|   |-- shell/
|   |   |-- scripts/
|   |   |   |-- senko-shell.js           - registra features, providers e monta as abas
|   |   |   |-- senko-quick-create.js    - controla a criacao rapida oficial
|   |   |   |-- senko-guide.js           - controla o guia oficial e seus atalhos
|   |   |   `-- senko-utility-menu.js    - agrupa as ferramentas globais no menu do header
|   |   `-- styles/
|   |       |-- styles.css               - layout do shell: header, abas e raiz das features
|   |       |-- senko-quick-create.css    - visual do botao e do modal de criacao
|   |       `-- senko-guide.css           - visual da janela oficial do guia
|   |
|   |-- features/
|   |   |-- biblioteca/
|   |   |   |-- register.js              - registra e carrega a feature
|   |   |   |-- view.js                  - dashboard e modais da Biblioteca
|   |   |   |-- scripts/                 - motor, UI e editores oficiais da Biblioteca
|   |   |   |   |-- copy-base.js         - fornece o HTML Basico usado pelo botao de copia
|   |   |   |   |-- copy-base-editor.js  - edita e salva o HTML Basico
|   |   |   |   `-- copy-base-template.js - template persistido pelo GitHub
|   |   |   |-- styles/                  - estilos exclusivos da feature e dos editores
|   |   |   |-- data/manifest.js         - lista local dos pacotes de dados, compativel com file://
|   |   |   |-- data/layouts/            - arquivos SenkoLib.registerLayout({...})
|   |   |   |-- data/variants/           - arquivos SenkoLib.registerVariantFile(...)
|   |   |   |-- data/firebase-repository.js - leitura e escrita no Firestore
|   |   |   |-- data/static-repository.js - leitura do ultimo backup publico
|   |   |   |-- integrations/github/      - integracao GitHub exclusiva da Biblioteca
|   |   |
|   |   |-- colecoes/
|   |   |   |-- register.js              - registra e carrega a feature
|   |   |   |-- view.js                  - dashboard de Colecoes
|   |   |   |-- scripts/                 - motor, modais e UI de Colecoes
|   |   |   |-- data/manifest.js         - catalogo leve, compativel com file://
|   |   |   |-- data/                    - colecoes e dados de grupos
|   |   |   |   |-- firebase-repository.js - leitura e escrita no Firestore
|   |   |   |   `-- static-repository.js - leitura do ultimo backup publico
|   |   |   |-- integrations/github/      - integracao GitHub exclusiva de Colecoes
|   |   |   `-- styles/                  - estilos exclusivos da feature
|   |   |
|   |   |-- access/
|   |   |   |-- register.js              - integra o modal global para owner/admin
|   |   |   |-- data/firebase-repository.js - transacoes administrativas
|   |   |   |-- scripts/access.js        - solicitacoes, membros e atividade
|   |   |   `-- styles/access.css        - modal administrativo responsivo
|   |   |
|   |   |-- imagens/
|   |   |   |-- index.html               - entrada standalone para testar a feature isolada
|   |   |   |-- scripts/register.js      - registra e monta a feature no shell
|   |   |   |-- scripts/imagens-view.js  - estrutura HTML usada pelo painel principal
|   |   |   |-- scripts/                 - comportamento e utilitarios exclusivos
|   |   |   |-- styles/                  - estilos exclusivos da feature
|   |   |   `-- vendor/                  - bibliotecas locais usadas pela imagem
|   |   |
|   |   `-- sources/
|   |       |-- index.html               - entrada standalone para testar a feature isolada
|   |       |-- scripts/register.js      - registra e monta a feature no shell
|   |       |-- scripts/sources-view.js  - estrutura HTML usada pelo painel principal
|   |       |-- scripts/                 - comportamento e utilitarios exclusivos
|   |       `-- styles/                  - estilos exclusivos da feature
|   |
|   |-- prototype/team-notes/
|   |   |-- register.js                  - injeta o botao de notas da equipe e salva notas no GitHub
|   |   |-- styles.css                   - estilos do modal de notas da equipe
|   |   `-- data/
|   |       |-- manifest.js               - indice das notas carregadas pelo prototipo
|   |       `-- notes/                    - um arquivo JS por nota criada
|   |
|   |-- prototype/gamer-preview/
|   |   |-- register.js                  - registra o Preview beta no shell
|   |   |-- view.js                      - estrutura HTML do Preview beta
|   |   `-- script.js                    - carregamento da base e renderizacao
|   |
|   `-- shared/
|       |-- assets/                      - logo e favicon compartilhados
|       |-- scripts/                     - utilitarios usados por mais de uma feature
|       `-- styles/                      - tokens/componentes visuais compartilhados
|
|-- functions/                           - ferramentas administrativas, emulador e codigo historico
|-- tests/                               - regras, gravacoes, backup simulado e fixtures visuais
|-- docs/
|   |-- README.md                        - indice da documentacao tecnica canonica
|   `-- firebase/                        - arquitetura, dados, testes e operacao Firebase
|-- tools/build-legacy-snapshot.js       - converte dados JS para snapshot de migracao
|-- tools/build-static-backup.js         - regenera o bundle publico pelo snapshot tecnico
|-- firebase.json                        - regras, emuladores, hosting e Functions
|-- firestore.rules                     - leitura e escrita validada para membros
|-- database.rules.json                 - regras da presenca colaborativa
|-- storage.rules                       - regras de arquivos
|-- FIREBASE_SETUP.md                   - configuracao passo a passo para iniciantes
|-- index.html                           - ponto de entrada do SenkoLib
|-- sw.js                                - atualiza o shell sem interceptar os assets versionados
`-- settings.json                        - configuracoes locais do Live Server
```

## Regras da organizacao

- `shell` controla o aplicativo como um todo: aba ativa, registro de features e layout da casca.
- `app/infrastructure/firebase` concentra servicos globais sem conhecer regras internas das features.
- `app/infrastructure/static-backup` concentra selecao de modo e dados publicos gerados.
- Biblioteca e Colecoes possuem repositorios Firebase e estatico proprios; o shell nao acessa seus documentos.
- Com Firebase ativado, o navegador usa transacoes do SDK Web e as regras validam cada escrita.
- Realtime Database guarda somente presenca de editores; conteudo fica no Firestore.
- A ferramenta global Acessos aparece no menu somente para `owner` e `admin`,
  abre em modal e repete as restricoes de cargo nas regras.
- GitHub recebe snapshot tecnico e bundle publico somente quando um membro aciona o botao manual.
- Sem uma sessao Firebase `ready`, o ultimo backup aparece em modo somente leitura.
- Um Live Server simples suporta o modo publico; `file://` nao e requisito.
- A criacao rapida e uma ferramenta oficial do shell, fica imediatamente a
  esquerda do menu e descobre opcoes por `registerCreateProvider`.
- O menu de ferramentas move os controles globais existentes para um painel;
  ele preserva IDs, listeners, permissao e estado de cada ferramenta.
- Avisos de disponibilidade e progresso ficam fora do menu porque precisam
  permanecer visiveis mesmo quando o painel esta fechado.
- O Senko Guide e uma ferramenta oficial do shell, aberta pelo header e exposta pela API `SenkoGuide.open()`/`close()`.
- Cada feature registrada como provider continua dona de seu carregamento, modal, validacao e persistencia.
- Cada aba com comportamento proprio fica em `app/features/[nome]`.
- Integracoes GitHub legadas continuam preservadas ate a ultima etapa da reforma.
- No modo Firebase, o backup GitHub e global e roda em `senko-github-backup.js` com token individual.
- Codigo compartilhado so entra em `app/shared` quando mais de uma feature depende dele.
- `shared/styles/senko-tokens.css` define a paleta oficial; `senko-components.css` define componentes visuais neutros.
- Features registradas pelo shell renderizam no `index.html` principal. Cada uma monta seu proprio painel direto e isolado.
- Nas features com montagem sob demanda, `register.js` integra com o shell, `view.js` fornece o HTML e o script principal cuida do comportamento.
- Biblioteca e Colecoes carregam motores, dados e GitHub apenas quando suas abas sao abertas.
- O editor oficial do HTML Basico pertence a Biblioteca e salva `scripts/copy-base-template.js` pela integracao GitHub da propria feature.
- Seus manifestos de dados sao atualizados pelas integracoes GitHub sem alterar o `index.html`.
- Colecoes renderiza os cards pelo catalogo e so executa o arquivo completo quando o usuario abre ou edita uma colecao.
- O painel principal nao busca nem recorta o `index.html` standalone de uma feature.
- `iframe` fica reservado para preview, sandbox ou medicao interna, nunca para carregar uma janela inteira de feature.
- Uma feature opcional so cria aba quando o seu script de registro carrega. Remover a pasta da feature impede esse registro.
- Em producao, codigo recebe a versao de `meta[name="senko-release"]` e pode
  usar o cache do navegador. Em localhost e `file://`, cada abertura continua
  com uma chave nova para facilitar desenvolvimento.
- `manifest.js`, `biblioteca.js` e `colecoes.js` sempre recebem uma chave por
  abertura, pois o botao de backup pode altera-los sem modificar `index.html`.
- `sw.js` nao intercepta requisicoes; ele apenas limpa caches historicos e
  avisa a pagina quando uma nova versao do worker assume o controle.

## Documentacao canonica

- `docs/README.md` define a ordem de leitura e a prioridade entre documentos.
- `docs/firebase/ARCHITECTURE.md` explica componentes e sequencias.
- `docs/firebase/DATA_MODEL.md` registra caminhos, campos e limites.
- `docs/firebase/DEVELOPMENT.md` ensina a executar e depurar localmente.
- `docs/firebase/TEST_PLAN.md` define a regressao obrigatoria.
- `docs/firebase/OPERATIONS.md` documenta membros, deploy e rollback.
- `docs/firebase/BACKUP_AND_RESTORE.md` documenta limites do backup e restauracao.
- `docs/firebase/MIGRATION_STATUS.md` e o checklist vivo da transicao.
