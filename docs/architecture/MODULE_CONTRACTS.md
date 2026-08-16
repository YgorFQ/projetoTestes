# Contratos entre modulos

## Por que existem contratos

O SenkoLib usa JavaScript carregado diretamente no navegador. Sem imports de
um bundler, nomes globais podem virar dependencias invisiveis. Este documento
define quais dependencias sao intencionais e onde cada regra pertence.

## Shell

O shell pode:

- registrar e ativar features;
- registrar providers de criacao rapida;
- oferecer a raiz visual;
- controlar tema, menu e ferramentas globais.

O shell nao pode conhecer layout, variante, colecao, grupo ou formato de
documento Firestore. Ele chama callbacks neutros registrados pelas features.

## Tools

Uma tool e uma janela ou comando global. Pode usar APIs publicas do shell e da
infraestrutura, mas nao deve importar controller interno de feature.

Exemplos: Acessos, Guide, Backup, Notas e Sessao.

## Feature

Cada feature possui cinco papeis:

| Arquivo/pasta | Papel |
|---|---|
| `register.js` | compor e registrar |
| `view.js` | criar estrutura DOM |
| `core/` | manter estado e invariantes em memoria |
| `repositories/` | converter uma fonte externa para o core |
| `controllers/` | eventos, modais, renderizacao e casos de uso |
| `styles/` | aparencia exclusiva da feature |

Uma feature nao chama funcoes internas de outra. Quando duas areas precisam do
mesmo comportamento neutro, ele sobe para `app/shared` ou `app/infrastructure`.

## Core

O core nao acessa DOM, Firebase ou GitHub. Ele recebe objetos, aplica regras em
memoria e oferece consultas. Isso permite testar unicidade e atualizacao sem
abrir navegador ou iniciar emulador.

## Repository

Repository e um adaptador de leitura. Ele:

- conhece SDK/campos da fonte;
- converte documentos para o formato da feature;
- devolve unsubscribe para listeners;
- reporta erro ao chamador;
- nao mostra modal nem altera HTML.

Escritas compartilhadas ficam no modulo transacional da infraestrutura para
que Biblioteca e Colecoes usem as mesmas garantias.

## Controller

Controller coordena uma interacao. Ele pode ler DOM, chamar core/repository,
abrir modal e traduzir erros. Nao deve montar credenciais, escrever regras de
seguranca ou inventar outro armazenamento.

## Shared

`app/shared` aceita somente recursos realmente neutros:

- tokens de design;
- componentes visuais sem regra de negocio;
- assets usados por varias areas;
- helpers sem conhecimento de feature.

Se o nome de um helper inclui Biblioteca ou Colecoes, ele provavelmente nao e
shared.

## Infrastructure

Infraestrutura encapsula servicos externos e politicas tecnicas comuns:

- inicializacao Firebase;
- autenticacao e autorizacao;
- transacoes Firestore;
- presenca Realtime Database;
- saude e modo de dados;
- geracao e publicacao de backup.

## APIs globais permitidas

Globais sao compatibilidade deliberada com o carregamento por scripts. Toda API
global nova precisa ter prefixo `Senko`, dono claro e documentacao no topo do
arquivo.

Nao use globais para compartilhar variaveis mutaveis entre features. Prefira
metodos que devolvem copias, listeners com unsubscribe e eventos do shell.

## Regras para comentarios

Comentarios devem explicar motivo, contrato, ordem ou risco. Nao devem repetir
o codigo. Um modulo complexo deve conter:

1. cabecalho com responsabilidade e limites;
2. comentario antes de cada fluxo atomico ou assíncrono importante;
3. explicacao de invariantes que nao aparecem na sintaxe;
4. nota proxima de compatibilidades de navegador ou servico;
5. aviso de seguranca junto a tokens, regras ou HTML nao confiavel.

Exemplo util:

```js
// O listener e cancelado antes de trocar o conjunto de pais; sem isso cada
// mudanca de colecao duplicaria leituras e renderizacoes.
unsubscribeLayouts();
```

Exemplo inutil:

```js
// Define loading como true.
loading = true;
```

## Checklist para um modulo novo

- o dono esta correto;
- o nome global tem prefixo e API pequena;
- dependencias aparecem no register ou index;
- listeners possuem descarte;
- estado de erro e visivel;
- somente a camada correta conhece a fonte externa;
- comentarios explicam as decisoes;
- Guia e docs foram atualizados;
- teste cobre o contrato de maior risco.
