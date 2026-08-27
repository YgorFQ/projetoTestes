# Notas da equipe

## O que esta feature faz

Notas da equipe organiza conteudo compartilhado em secoes e paginas. Ela e
uma feature oficial e independente, como Biblioteca e Colecoes:

- Firestore e a fonte editavel;
- `backup/latest/team-notes/` e o fallback publico somente leitura;
- o GitHub so recebe Notas quando alguem aciona o backup global;
- criar, editar ou excluir uma nota nunca chama a API do GitHub;
- a ausencia ou falha do snapshot de outra feature nao impede Notas de abrir.

O catalogo antigo em `app/tools/team-notes/data/` foi removido. Nao existem
duas fontes editaveis nem arquivos manuais de notas.

## Tutorial de uso

1. Abra **Notas da equipe** no menu de ferramentas.
2. Crie ou selecione uma secao na primeira coluna.
3. Use **Nova pagina** na segunda coluna.
4. Preencha titulo e conteudo no editor.
5. Clique em **Salvar** para enviar a pagina ao Firestore.
6. Use as buscas separadas para filtrar secoes ou localizar pagina por titulo
   e conteudo.
7. Use **Copiar** para levar o conteudo ao clipboard.
8. Exclua paginas ou secoes pelo dialogo proprio da feature. Excluir uma secao
   remove tambem suas paginas.

Uma pagina nova existe apenas no navegador ate o primeiro clique em
**Salvar**. Ao trocar de pagina ou secao com alteracoes locais, a interface
pede confirmacao antes de descartar o rascunho.

## O que tempo real significa

Digitar nao grava cada letra no Firebase e nao mostra o texto incompleto para
outra pessoa. O fluxo e:

1. a pessoa digita em um rascunho local;
2. clica em **Salvar**;
3. a transacao valida titulo, versao e permissao;
4. depois do commit, listeners entregam a versao salva aos outros membros.

Portanto, somente alteracoes confirmadas sao compartilhadas em tempo real.
Nao deve ser adicionado autosave por tecla sem uma nova decisao de produto.

## Avisos do editor

- sucesso: circulo verde com `✓` ao lado direito do titulo;
- titulo de pagina duplicado: circulo vermelho com `X` ao lado do titulo;
- nome de secao duplicado: o mesmo circulo vermelho junto ao campo da secao;
- os indicadores permanecem por dois segundos e desaparecem reduzindo a
  opacidade;
- outras falhas, como permissao, rede ou conflito de versao, continuam usando
  mensagem textual para nao esconder a causa.

A verificacao local evita uma tentativa obviamente duplicada, mas a garantia
real acontece na transacao do Firestore. Isso cobre duas pessoas tentando usar
o mesmo nome ao mesmo tempo.

## Persistencia e concorrencia

Dados editaveis:

```text
workspaces/{workspaceId}/teamNoteSections/{sectionId}
workspaces/{workspaceId}/teamNoteSections/{sectionId}/pages/{pageId}
```

Secoes e paginas possuem `version`. Cada save envia `expectedVersion`; se o
documento mudou desde que foi aberto, a transacao retorna conflito em vez de
sobrescrever a versao atual. Nomes sao reservados nos escopos:

- `team-note-sections` para secoes do workspace;
- `team-note-pages:{sectionId}` para titulos dentro de cada secao.

Notas nao criam revisoes imutaveis. Recuperar uma versao anterior depende de
um commit antigo do backup GitHub.

Limite atual: quando um listener recebe um snapshot salvo, `replaceData()`
recarrega o editor. Assim, um rascunho local ainda nao salvo pode ser
substituido visualmente por uma alteracao remota. A transacao continua
bloqueando um save atrasado, mas preservar e comparar esse rascunho antes de
aplicar o snapshot ainda e uma melhoria pendente.

## Modo static e isolamento

O modo publico carrega somente:

```text
backup/latest/team-notes/manifest.js
backup/latest/team-notes/data.js
```

Nesse modo, busca, leitura e copia continuam disponiveis; toda mutacao fica
bloqueada. O `index.html` conhece apenas o manifesto global. A propria feature
carrega seu manifesto e payload, portanto pode ser removida ou testada sem
alterar o carregamento das demais.

Os listeners Firebase usam `errorScope: 'feature'`. Uma falha exclusiva de
Notas, como regras ainda nao implantadas, mostra o erro dentro da feature e faz
somente Notas usar seu fallback. Ela nao deve manter um alerta global depois
que a pessoa navega para Biblioteca ou Colecoes.

## Arquivos e responsabilidades

| Arquivo | Responsabilidade |
|---|---|
| `register.js` | Carrega dependencias, snapshot proprio e registra a feature |
| `view.js` | Monta a interface |
| `core.js` | Modelo local, ordenacao e buscas |
| `script.js` | Selecao, rascunho, editor, dialogos e feedback visual |
| `data-source.js` | Alterna entre repositorio Firebase e static |
| `repositories/firebase-repository.js` | Listeners e mutacoes Firestore |
| `repositories/static-repository.js` | Normaliza o snapshot somente leitura |
| `styles.css` | Estilos exclusivos usando tokens compartilhados |

Essa forma compacta e valida para features pequenas. Nao e obrigatorio criar
pastas `controllers/` e `core/` quando separar arquivos simples ja deixa as
responsabilidades claras.

## Backup

O botao global le secoes e paginas junto com Biblioteca, Colecoes, grupos e
HTML Basico. Em seguida, cria uma unica tree, um unico commit e um unico push.
O commit atualiza tanto o snapshot tecnico restauravel em `backup/data/`
quanto o payload publico independente em `backup/latest/team-notes/`.

Excluir uma nota no Firestore so a remove do fallback publico depois do
proximo backup. Commits anteriores continuam sendo o historico recuperavel.

## Validacao antes de publicar

```powershell
npm run test:team-notes
npm run test:static-independence
npm run test:static-backup
npm run test:structure
npm run test:asset-versioning
```

Com Java e os emuladores disponiveis, execute tambem:

```powershell
npm run test:firestore-rules
```

O teste estrutural de Node nao substitui o teste das Security Rules. Antes de
aprovar producao, faca smoke test com dois membros: salve em uma janela,
confirme a chegada na outra, teste nome duplicado, conflito, exclusao, fallback
somente leitura e independencia ao retirar o payload de outra feature.
