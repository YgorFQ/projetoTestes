# SenkoLib - Estrutura do Projeto

```text
SenkoLib/
|-- app/
|   |-- shell/
|   |   |-- scripts/senko-shell.js       - registra features e monta as abas
|   |   `-- styles/styles.css            - tema e estrutura global da interface
|   |
|   |-- features/
|   |   |-- biblioteca/
|   |   |   |-- scripts/                 - motor e UI da Biblioteca
|   |   |   |-- data/layouts/            - pacotes SenkoLib.register([...])
|   |   |   |-- data/variants/           - arquivos SenkoLib.registerVariant(...)
|   |   |   `-- prototypes/              - prototipo do editor de layouts
|   |   |
|   |   |-- colecoes/
|   |   |   |-- scripts/                 - motor, modais e UI de Colecoes
|   |   |   |-- data/                    - colecoes e dados de grupos
|   |   |   `-- styles/                  - estilos exclusivos da feature
|   |   |
|   |   |-- imagens/
|   |   |   |-- index.html               - Compressor e Redimensionador dentro da aba Imagens
|   |   |   |-- scripts/                 - scripts da feature
|   |   |   `-- vendor/                  - bibliotecas locais usadas pela imagem
|   |   |
|   |   `-- sources/
|   |       |-- index.html               - gerador e medidor de sources
|   |       `-- scripts/                 - scripts da feature
|   |
|   |-- integrations/
|   |   `-- github/scripts/              - gravacao de layouts, variantes e colecoes
|   |
|   `-- shared/
|       |-- assets/                      - logo e favicon compartilhados
|       |-- scripts/                     - utilitarios usados por mais de uma feature
|       |-- snippets/                    - blocos reutilizaveis da Biblioteca
|       `-- styles/                      - estilos compartilhados por ferramentas
|
|-- index.html                           - ponto de entrada do SenkoLib
|-- sw.js                                - service worker network first
`-- settings.json                        - configuracoes locais do Live Server
```

## Regras da organizacao

- `shell` controla o aplicativo como um todo: tema global, aba ativa e registro de features.
- Cada aba com comportamento proprio fica em `app/features/[nome]`.
- Integracoes externas ficam em `app/integrations`; por isso o GitHub nao e uma feature.
- Codigo compartilhado so entra em `app/shared` quando mais de uma feature depende dele.
- `Imagens` e `Sources` usam iframes internos para manter o CSS das ferramentas herdadas do ORS isolado da Biblioteca.
- Uma feature opcional so cria aba quando o seu script de registro carrega. Remover a pasta da feature impede esse registro.
