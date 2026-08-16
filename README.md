# SenkoLib

O SenkoLib usa Firebase como fonte principal dos dados e guarda no GitHub um
backup manual que tambem alimenta o modo publico somente leitura.

Para continuar o desenvolvimento em outro computador ou em uma nova instancia
do Codex, leia primeiro o
[contexto completo de transferencia](docs/CONTEXTO_COMPLETO_CODEX.txt).

Comece pela [especificacao do produto](docs/PRODUCT_SPECIFICATION.md) e pela
[documentacao tecnica](docs/README.md). O mapa das pastas esta em
[Estrutura do projeto](docs/architecture/STRUCTURE.md) e a classificacao de
cada arquivo esta em
[`backup/meta/file-classification.json`](backup/meta/file-classification.json).
Os poucos arquivos mantidos na raiz e seus motivos estao documentados em
[Arquivos da raiz](docs/architecture/ROOT_FILES.md).

Para abrir localmente, sirva a raiz com um servidor HTTP simples. O ambiente
Firebase completo e os emuladores estao explicados em
[Configuracao do Firebase](docs/firebase/SETUP.md).
