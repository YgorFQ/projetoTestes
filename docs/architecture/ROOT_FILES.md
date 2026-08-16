# Arquivos da raiz

A raiz do SenkoLib deve conter apenas pontos de entrada e arquivos que uma
ferramenta procura nesse local. Dados, regras, documentacao detalhada, testes e
scripts pertencem a pastas especificas.

## Arquivos mantidos

| Arquivo | Por que fica na raiz |
| --- | --- |
| `index.html` | E a entrada publicada diretamente pelo GitHub Pages. |
| `sw.js` | Precisa ficar no mesmo nivel do site para controlar todo o escopo do Service Worker. |
| `firebase.json` | E o arquivo que a Firebase CLI procura ao executar emuladores e deploys. |
| `.firebaserc` | Guarda o alias do projeto usado pela Firebase CLI. |
| `package.json` | Define os comandos npm executados na raiz. |
| `package-lock.json` | Fixa as versoes instaladas pelo npm. |
| `README.md` | E exibido automaticamente na pagina inicial do repositorio. |
| `AGENTS.md` | Entrega as regras do projeto aos agentes de desenvolvimento. |
| `.gitignore` | Define os arquivos locais que o Git nao deve versionar. |

## Arquivos movidos

- regras e indices Firebase: `config/firebase/`;
- configuracao do Live Server: `.vscode/settings.json`;
- documentacao: `docs/`;
- scripts de manutencao: `tools/`;
- snapshots e inventarios: `generated/`;
- implementacoes antigas: `legacy/`.

## Logs locais

`database-debug.log`, `firestore-debug.log`, `firebase-debug.log` e
`ui-debug.log` podem ser criados automaticamente pelos emuladores. Eles nao
fazem parte do projeto, ficam ignorados pelo Git e nao aparecem no GitHub. Um
log pode continuar visivel no computador enquanto o emulador estiver aberto.
