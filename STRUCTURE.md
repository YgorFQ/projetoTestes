# SenkoLib - Estrutura do Projeto

```text
SenkoLib/
|-- app/
|   |-- shell/
|   |   |-- scripts/
|   |   |   |-- senko-shell.js           - registra features, providers e monta as abas
|   |   |   |-- senko-quick-create.js    - controla a criacao rapida oficial
|   |   |   `-- senko-guide.js           - controla o guia oficial e seus atalhos
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
|   |   |   |-- integrations/github/      - integracao GitHub exclusiva da Biblioteca
|   |   |
|   |   |-- colecoes/
|   |   |   |-- register.js              - registra e carrega a feature
|   |   |   |-- view.js                  - dashboard de Colecoes
|   |   |   |-- scripts/                 - motor, modais e UI de Colecoes
|   |   |   |-- data/manifest.js         - catalogo leve, compativel com file://
|   |   |   |-- data/                    - colecoes e dados de grupos
|   |   |   |-- integrations/github/      - integracao GitHub exclusiva de Colecoes
|   |   |   `-- styles/                  - estilos exclusivos da feature
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
|-- index.html                           - ponto de entrada do SenkoLib
|-- sw.js                                - desativa cache local em HTTP/HTTPS
`-- settings.json                        - configuracoes locais do Live Server
```

## Regras da organizacao

- `shell` controla o aplicativo como um todo: aba ativa, registro de features e layout da casca.
- A criacao rapida e uma ferramenta oficial do shell e descobre opcoes por `registerCreateProvider`.
- O Senko Guide e uma ferramenta oficial do shell, aberta pelo header e exposta pela API `SenkoGuide.open()`/`close()`.
- Cada feature registrada como provider continua dona de seu carregamento, modal, validacao e persistencia.
- Cada aba com comportamento proprio fica em `app/features/[nome]`.
- Integracoes externas ficam dentro da feature que elas salvam; por isso cada GitHub continua independente.
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
- Cada abertura gera uma chave nova para os assets locais; em HTTP/HTTPS, `sw.js` tambem busca tudo com cache desativado.
