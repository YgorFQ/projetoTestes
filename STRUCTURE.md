SenkoLib/
│
├── core/
│   ├── senkolib-core.js        ← adiciona registerCollection/getCollections (só isso)
│   └── script.js               ← adiciona colSwitchView + renderiza aba (só isso)
│
├── modules/
│   └── github/
│       ├── senko-github-v2.js           ← intocado
│       ├── senko-github-variants.js     ← intocado
│       ├── senko-github-delete.js       ← intocado
│       │
│       ├── senko-github-col-save.js     ← salvar/criar layout de coleção
│       ├── senko-github-col-edit.js     ← editar layout de coleção
│       └── senko-github-col-delete.js   ← excluir layout de coleção
│
├── colecoes/
│   ├── col-core.js              ← motor de registro exclusivo das coleções
│   ├── col-script.js            ← toda a lógica de UI das coleções
│   ├── col-modals.js            ← modais (visualizar bloco, editar, adicionar)
│   │
│   ├── data/
│   │   └── colecao-ygor.js      ← SenkoLib.registerCollection([...])
│   │
│   └── variants/
│       └── colecao-ygor.js      ← SenkoLib.registerCollectionVariant(...)
│
├── assets/
│   ├── styles.css               ← intocado
│   └── col-styles.css           ← estilos exclusivos das coleções
│
└── index.html                   ← adiciona aba + carrega scripts de coleções