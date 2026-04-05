# SenkoLib — Estrutura do Projeto

```
SenkoLib/
│
├── core/
│   ├── senkolib-core.js        — motor de registro de layouts e variantes (obrigatório, carrega primeiro)
│   └── script.js               — lógica principal da UI
│
├── modules/
│   ├── github/
│   │   ├── senko-github-v2.js          — salvar layouts/variantes no GitHub via API
│   │   ├── senko-github-variants.js    — criar e deletar variantes no GitHub
│   │   └── senko-github-delete.js      — excluir layouts do GitHub
│   └── fsa/
│       └── senko-fsa.js                — salvar localmente via File System Access (Chrome/Edge)
│
├── assets/
│   ├── styles.css              — estilos globais da interface
│   ├── senko.png               — logotipo
│   └── senko.ico               — favicon
│
├── layouts/
│   └── layouts001.js           — pacote de layouts (SenkoLib.register([...]))
│
├── variants/
│   └── section-1.js            — variantes do layout section-1 (SenkoLib.registerVariant(...))
│
├── index.html                  — ponto de entrada da aplicação
└── settings.json               — configurações do Live Server (VS Code)
```
