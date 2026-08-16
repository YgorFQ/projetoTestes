# Classificacao dos arquivos

Cada arquivo mantido pelo projeto recebe exatamente um estado no inventario
`generated/meta/file-classification.json`. O inventario evita depender do nome
ou da memoria de quem reorganizou as pastas.

## Estados

| Estado | Significado | Pode ser editado manualmente? |
| --- | --- | --- |
| `official` | Codigo, configuracao, teste ou documento usado e mantido pelo projeto | Sim |
| `generated` | Saida reconstruida por script, backup ou gerenciador de pacotes | Somente quando o processo gerador exigir |
| `prototype` | Experimento ainda fora do contrato oficial do SenkoLib | Sim, sem criar dependencia oficial |

## Atualizacao

Depois de criar, mover ou remover arquivos, execute:

```powershell
npm run inventory:build
```

O script usa os arquivos versionados e os novos arquivos ainda nao ignorados
pelo Git. Artefatos locais ignorados seguem a classificacao da pasta, mas nao
entram na lista para que um clone limpo produza o mesmo inventario. As regras
ficam em `tools/build-file-classification.js`; uma nova categoria nao deve ser
inventada apenas para um arquivo.

Pastas comunicam a intencao principal:

- `app/`, `tests/`, `tools/` e `docs/` sao oficiais por padrao;
- `generated/` e sempre gerado;
- `app/prototype/` e sempre prototipo.

O projeto nao mantem uma categoria historica executavel. Quando uma
implementacao deixa de ter funcao depois da regressao, ela e removida. O Git
preserva o historico sem aumentar a superficie do runtime atual.
