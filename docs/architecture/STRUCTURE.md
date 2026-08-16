# SenkoLib - Estrutura do projeto

Esta e a organizacao oficial desde a versao `2026.08.16.2`. O objetivo e
separar codigo executado, ferramentas globais, material historico e arquivos
que podem ser regenerados.

```text
SenkoLib/
|-- app/
|   |-- features/                    - janelas de conteudo independentes
|   |   |-- biblioteca/
|   |   |   |-- register.js          - carrega e registra a feature
|   |   |   |-- view.js              - estrutura visual
|   |   |   |-- controllers/         - eventos, editores e fluxo de tela
|   |   |   |-- core/                - modelo e regras internas
|   |   |   |-- repositories/        - Firebase e fallback estatico
|   |   |   `-- styles/              - estilos exclusivos
|   |   |-- colecoes/                 - mesma divisao da Biblioteca
|   |   |-- imagens/                  - feature independente
|   |   `-- sources/                  - feature independente
|   |-- tools/                        - janelas e comandos globais do shell
|   |   |-- access/                   - membros, cargos e solicitacoes
|   |   |-- github-backup/            - modal do backup manual
|   |   |-- guide/                    - guia interno oficial
|   |   |-- quick-create/             - criacao rapida
|   |   |-- session/                  - login, conta e estado Firebase
|   |   `-- team-notes/               - notas da equipe
|   |-- shell/                        - header, abas e montagem do aplicativo
|   |-- infrastructure/
|   |   |-- firebase/                 - SDK, configuracao e transacoes
|   |   |-- github/                   - servico do snapshot GitHub
|   |   `-- static-backup/            - motor que le e constroi o fallback
|   |-- shared/                       - recursos usados por mais de uma area
|   `-- prototype/                    - experiencias ainda nao oficiais
|-- legacy/
|   |-- biblioteca/                   - dados JS e integracoes antigas
|   `-- colecoes/                     - dados JS e integracoes antigas
|-- generated/
|   |-- backups/senkolib-data/        - snapshot tecnico do ultimo backup
|   |-- static-backup/                - bundle publico carregado pelo site
|   |-- migrations/                   - snapshot local de importacao, ignorado
|   `-- meta/                         - inventarios gerados do repositorio
|-- docs/
|   |-- architecture/                 - estrutura e decisoes gerais
|   |-- firebase/                     - operacao atual do backend
|   `-- legacy/                       - documentos historicos
|-- config/firebase/                  - regras, indices e exemplo do projeto
|-- .vscode/settings.json             - configuracao local do Live Server
|-- functions/                        - CLI administrativa e backend anterior
|-- tests/                            - testes automatizados e fixtures visuais
|-- tools/                            - scripts executados pelo desenvolvedor
|-- .firebaserc                       - projeto selecionado pela CLI Firebase
|-- .gitignore                        - arquivos locais fora do Git
|-- AGENTS.md                         - regras para agentes de desenvolvimento
|-- README.md                         - entrada da documentacao no GitHub
|-- index.html                        - entrada principal e ordem de carga
|-- firebase.json                     - deploy e emuladores
|-- package.json                      - comandos e dependencias npm
|-- package-lock.json                 - versoes exatas das dependencias
`-- sw.js                             - Service Worker com escopo da aplicacao
```

## Responsabilidades

### `app/features`

Uma feature e uma janela principal do produto. Ela nao acessa detalhes de
outra feature. Biblioteca e Colecoes usam a mesma estrutura interna:

- `register.js` integra a feature ao shell e declara a ordem de carregamento;
- `view.js` fornece a estrutura HTML;
- `controllers/` recebe eventos da interface e coordena os casos de uso;
- `core/` concentra regras e estado proprios da feature;
- `repositories/` adapta Firebase ou o snapshot estatico;
- `styles/` contem somente o visual daquela feature.

### `app/tools`

Uma tool e uma janela ou acao global, disponivel em mais de uma feature. Ela
pode aparecer no menu do header, mas continua dona do proprio modal, estilo,
permissoes e persistencia. O shell apenas oferece os pontos de registro.

### `app/infrastructure`

Infraestrutura conversa com servicos externos ou decide o modo de dados. Ela
nao renderiza janelas de produto. Por isso a interface de login fica em
`app/tools/session`, enquanto o cliente Firebase permanece em
`app/infrastructure/firebase`.

### `legacy` e `generated`

`legacy/` e codigo historico preservado. Ele ainda pode ser carregado como
compatibilidade enquanto a migracao nao for encerrada, mas nao recebe novas
funcionalidades.

`generated/` nao e fonte para edicao manual. O backup GitHub escreve o
snapshot tecnico em `generated/backups/senkolib-data/` e o fallback publico em
`generated/static-backup/`. O segundo e necessario no deploy; os demais podem
ser excluidos do Firebase Hosting.

### `config` e arquivos da raiz

As regras e os indices do Firebase ficam em `config/firebase/`; `firebase.json`
aponta para esses caminhos. A raiz preserva somente arquivos exigidos pelas
ferramentas ou pontos de entrada do site. Consulte
[Arquivos da raiz](ROOT_FILES.md) antes de mover qualquer um deles.

## Regras para novos arquivos

1. Pergunte se o arquivo pertence a uma janela principal, ferramenta global,
   infraestrutura ou recurso compartilhado.
2. Nao crie uma pasta `scripts` generica dentro de Biblioteca ou Colecoes;
   use `controllers`, `core` ou `repositories` conforme a responsabilidade.
3. Nao grave snapshots junto do codigo executado.
4. Nao importe novos modulos a partir de `legacy/` salvo para manter uma
   compatibilidade que esteja documentada.
5. Atualize o inventario com `npm run inventory:build`.
6. Atualize a documentacao e o guia interno junto da alteracao.

## Ordem de carga

`index.html` carrega tokens e estilos, o snapshot publico, a infraestrutura,
o shell, as tools e por ultimo os registradores das features. Cada
`register.js` pode carregar seus modulos internos sob demanda. Essa ordem
mantem as janelas independentes e evita colocar regras de Biblioteca ou
Colecoes dentro do shell.

Consulte [Classificacao dos arquivos](FILE_CLASSIFICATION.md) para entender o
estado de cada caminho e [Arquitetura Firebase](../firebase/ARCHITECTURE.md)
para os fluxos de leitura, salvamento e backup.
