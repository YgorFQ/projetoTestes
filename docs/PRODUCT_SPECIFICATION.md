# Especificacao do produto SenkoLib

## 1. Objetivo

O SenkoLib e uma aplicacao web colaborativa para catalogar, localizar,
visualizar, copiar e manter blocos de HTML e CSS. O produto reune Biblioteca,
Colecoes e ferramentas auxiliares em uma interface unica, sem fazer uma area
depender das regras internas de outra.

Esta especificacao responde quatro perguntas:

1. O que o produto oferece ao usuario.
2. Quem pode executar cada acao.
3. Qual comportamento e obrigatorio em sucesso, conflito e falha.
4. Onde um desenvolvedor deve implementar cada mudanca.

## 2. Fonte de verdade

O Firestore e a fonte principal e editavel. O navegador nao envia alteracoes a
cada tecla: formularios mantem um rascunho local e somente o comando Salvar
inicia uma transacao. Depois do commit, listeners em tempo real entregam o novo
documento para todos os clientes autorizados.

O snapshot em `backup/latest/` e a fonte publica de contingencia. Ele
contem somente o estado do ultimo backup concluido, e nunca aceita edicao. Esse
snapshot e reconstruido pelo fluxo global de backup para GitHub.

Nao existe terceira fonte de dados. Arquivos JavaScript individuais nao sao
banco, e o GitHub nao participa de criar, editar ou excluir conteudo.

## 3. Areas do produto

### Biblioteca

- lista layouts independentes;
- pesquisa por nome, ID e tags;
- abre preview isolado;
- copia HTML, CSS ou o conjunto completo;
- cria e edita layouts;
- cria e edita variacoes ligadas a um layout;
- exclui layouts e variacoes;
- mostra alteracoes remotas no editor aberto.

### Colecoes

- agrupa conjuntos de layouts por colecao;
- organiza colecoes em grupos nomeados e coloridos;
- cria, edita e exclui grupos vazios;
- cria, edita e exclui colecoes;
- cria, edita e exclui layouts internos;
- pesquisa colecoes e abre previews completos.

### Ferramentas globais

- Criacao rapida inicia fluxos sem exigir navegacao manual ate a feature;
- Acessos administra solicitacoes e cargos;
- Backup no GitHub publica o ultimo estado completo do Firebase;
- Notas da equipe guarda referencias operacionais;
- Senko Guide explica produto, arquitetura e manutencao;
- Sessao mostra a conta atual e oferece saida;
- Status informa Firebase disponivel, degradado ou indisponivel.

## 4. Cargos

| Acao | Owner | Admin | Editor | Visitante |
|---|---:|---:|---:|---:|
| Ver dados Firebase | sim | sim | sim | nao |
| Criar, editar e excluir conteudo | sim | sim | sim | nao |
| Aprovar novo editor | sim | sim | nao | nao |
| Aprovar novo admin | sim | nao | nao | nao |
| Promover ou remover owner | sim | nao | nao | nao |
| Gerenciar qualquer cargo | sim | limitado | nao | nao |
| Fazer backup no GitHub | sim | sim | sim | nao |
| Ver snapshot publico | sim | sim | sim | sim |

O cargo do Console Firebase e diferente do cargo dentro do SenkoLib. Permissao
IAM para administrar o projeto Google nao cria automaticamente um documento de
membro no workspace. O produto autoriza pelo documento
`workspaces/{workspaceId}/members/{uid}`.

## 5. Fluxo de salvamento

1. O usuario abre um editor e recebe o `currentRevisionId` atual.
2. Alteracoes ficam apenas no estado do editor.
3. Ao salvar, o controller envia dados e `baseRevisionId` ao modulo de escritas.
4. Uma transacao le membro, recurso, reserva de nome e item pai quando houver.
5. A transacao recusa nome duplicado ou revisao desatualizada.
6. Em sucesso, documento, revisao, reserva e `dataVersion` mudam juntos.
7. Listeners atualizam os clientes conectados.
8. Um editor aberto recebe a versao remota sem sobrescrita silenciosa.

## 6. Concorrencia

O produto usa controle otimista. Nao existe bloqueio que impeça duas pessoas de
abrirem o mesmo layout. Existe comparacao de revisao no salvamento.

- Se ninguem salvou depois da abertura, a transacao conclui.
- Se outra pessoa salvou, a transacao retorna conflito.
- A tela explica que existe versao mais nova.
- O listener pode atualizar o preview e os dados remotos visiveis.
- Um rascunho local nao deve ser descartado sem confirmacao.

## 7. Exclusao

Exclusoes sao diretas e confirmadas pela interface. O fluxo remove tambem
subdocumentos, revisoes e reservas de nome que pertencem ao recurso. Um grupo
de Colecoes so pode ser excluido quando nao possui colecoes associadas.

## 8. Backup e contingencia

O backup e manual. Qualquer membro autorizado pode abrir a ferramenta global,
informar um token pessoal com acesso ao repositorio e publicar um snapshot.

Um backup bem-sucedido deve:

- ler um estado coerente do Firestore;
- gerar manifestos e payloads de leitura publica;
- gravar o snapshot tecnico para restauracao;
- gravar o bundle estatico usado no site;
- criar um unico commit identificavel;
- nunca colocar o token no commit;
- informar erro de rede, permissao ou limite da API com mensagem curta.

## 9. Estados de disponibilidade

### Firebase disponivel

O usuario autorizado le e edita em tempo real. O snapshot nao substitui os
listeners enquanto a sessao esta saudavel.

### Firebase degradado

O shell mostra o estado do servico. Uma operacao que falhar permanece falha;
ela nao deve ser convertida silenciosamente em edicao local.

### Firebase indisponivel

O aplicativo usa o snapshot estatico quando ele existe. A interface fica em
somente leitura e identifica essa condicao. A ultima copia publicada continua
visivel, mas pode estar atrasada em relacao ao banco.

### Sem Firebase e sem snapshot

A feature abre vazia e mostra falha de fonte. Ela nao procura arquivos ocultos
ou dados codificados dentro de controladores.

## 10. Requisitos nao funcionais

- abrir por GitHub Pages ou servidor HTTP simples;
- nao exigir bundler para executar o frontend;
- manter recursos de uma feature dentro da propria pasta;
- carregar features sob demanda;
- nunca expor segredo administrativo no navegador;
- manter regras Firebase versionadas e testadas;
- permitir que um dev júnior encontre dono, fluxo e teste de cada comportamento;
- atualizar codigo, Guia e documentacao na mesma entrega.

## 11. Criterio de pronto

Uma mudanca so esta pronta quando comportamento, estado de erro, permissao,
documentacao e testes relevantes concordam. Se a explicacao ensinaria algo
diferente do codigo, a entrega esta incompleta.
