# Prototipo - Notas da equipe como feature

Este prototipo transforma o modal atual de Notas da equipe em uma tela completa,
com a hierarquia visual de um caderno digital:

1. secoes;
2. paginas da secao selecionada;
3. editor da pagina.

O visual usa os tokens do SenkoLib. A referencia do OneNote orienta apenas a
separacao e a hierarquia; cores, tipografia, botoes e estados seguem o produto.

## O que foi preservado do modal atual

- criacao de notas;
- pesquisa de secoes e paginas;
- edicao de titulo e conteudo;
- contador de caracteres e estado de alteracoes nao salvas;
- copia, salvamento e exclusao;
- confirmacao antes de descartar um rascunho.

O prototipo acrescenta secoes, paginas vinculadas a uma secao, breadcrumb e uma
area de edicao permanente. A feature ocupa toda a area abaixo do header global,
sem hero, moldura de modal ou barra de caderno. Os dados ficam somente na
memoria da aba e a mensagem de salvamento deixa essa limitacao explicita.

Tipo e tags foram removidos. A lista de paginas mostra apenas titulo e data;
nenhum trecho do conteudo e revelado antes de abrir a pagina.

## Diagnostico da implementacao atual

O modal oficial em `app/tools/team-notes/` carrega um manifesto e arquivos de
notas individuais. Criar, editar e excluir executa operacoes sequenciais na API
do GitHub e depois atualiza o manifesto.

Esse fluxo nao deve ser levado para a futura feature. O contrato atual do
SenkoLib define Firestore como unica fonte editavel e GitHub apenas como destino
do backup global. Operacoes sequenciais tambem podem deixar arquivo e manifesto
fora de sincronia quando uma etapa falha.

## Contrato Firebase proposto

O prototipo separa a tela de um pequeno modelo com metodos equivalentes aos que
um repository Firebase precisara oferecer. Uma implementacao oficial pode usar:

```text
workspaces/{workspaceId}/teamNoteSections/{sectionId}
workspaces/{workspaceId}/teamNotePages/{pageId}
```

Campos principais de secao:

```text
id, workspaceId, name, nameKey, order, createdAt, createdBy, updatedAt, updatedBy
```

Campos principais de pagina:

```text
id, workspaceId, sectionId, title, titleKey, content, version,
createdAt, createdBy, updatedAt, updatedBy, updatedByName
```

O salvamento oficial deve usar transacao, `expectedVersion`, incremento de
`dataVersion`, listener em tempo real, regras por membro e inclusao no backup
tecnico/publico. Nomes de secoes devem ser unicos no workspace e nomes de
paginas devem ser unicos dentro da propria secao.

Nenhuma gravacao Firebase foi ativada neste prototipo.
