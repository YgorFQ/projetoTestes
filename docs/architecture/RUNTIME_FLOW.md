# Fluxo de execucao e dados

## Visao resumida

```text
index.html
  -> assets e tokens compartilhados
  -> snapshot estatico gerado
  -> infraestrutura Firebase e modo de dados
  -> shell e ferramentas globais
  -> register.js de cada feature
  -> view + core + repositories + controllers
```

## 1. Inicializacao da pagina

O `index.html` e um carregador explicito. A ordem dos scripts e parte do
contrato, pois o projeto nao usa bundler. APIs globais sao colocadas em
`window.Senko...` e consumidas somente depois do script que as define.

1. Tokens e estilos compartilhados definem a base visual.
2. O snapshot publico registra `window.SenkoStaticBackup`.
3. A configuracao web inicializa Firebase, autenticacao e saude dos servicos.
4. `SenkoDataMode` decide entre `firebase` e `static`.
5. O shell cria header, menu e raiz de features.
6. Tools registram comandos globais.
7. Cada feature registra `mount` e `activate`, sem renderizar tudo de imediato.

## 2. Contrato de `register.js`

O arquivo de registro e o composition root da feature. Ele pode conhecer todos
os modulos internos daquela pasta e as APIs publicas da infraestrutura. Outros
modulos nao devem carregar scripts dinamicamente por conta propria.

Responsabilidades:

- registrar a feature no shell;
- criar o painel uma unica vez;
- carregar CSS e JavaScript em ordem segura;
- aplicar a fonte de dados inicial;
- iniciar e encerrar listeners;
- expor apenas providers globais intencionais;
- converter falha de carga em estado visual.

## 3. Modo Firebase

Depois de autenticacao e autorizacao, repositories criam listeners Firestore.
Snapshots recebidos sao convertidos para o formato neutro dos cores:

```text
Firestore snapshot
  -> repository normaliza timestamps e nomes de campos
  -> core substitui arrays/mapas em memoria
  -> controller solicita nova renderizacao
  -> editor aberto compara revisionId
```

Listeners sao cancelados quando o modo deixa de ser Firebase. Guardar as
funcoes `unsubscribe` evita leituras duplicadas depois de F5 parcial, troca de
sessao ou remontagem.

## 4. Modo estatico

`backup/latest/manifest.js`, `biblioteca.js` e `colecoes.js` formam
um bundle gerado. Repositories estaticos leem esse objeto e devolvem clones para
que controladores nao alterem a copia global.

O modo e somente leitura por definicao. Botoes de criacao e salvamento devem
ser ocultados ou recusar a acao com mensagem clara. Nao existe sincronizacao
de volta para o snapshot.

## 5. Escrita no Firestore

Todas as mutacoes de conteudo passam por
`app/infrastructure/firebase/senko-firestore-writes.js`. O modulo usa transacao
porque quatro invariantes precisam mudar juntas:

- o recurso recebe nova versao;
- a revisao imutavel e criada;
- a reserva de nome aponta para o recurso;
- `workspace.dataVersion` avanca exatamente uma unidade.

Se qualquer verificacao falha, nada e persistido. Repetir a operacao nao gera
meio recurso nem uma reserva orfa.

## 6. Deteccao de conflito

O editor guarda a revisao que serviu de base. Na transacao, o valor e comparado
ao `currentRevisionId` do servidor. Valores diferentes significam que outro
salvamento ocorreu. O erro `aborted` chega ao controller e deve ser traduzido
para uma mensagem humana, sem novo envio automatico.

## 7. Presenca

A presenca usa Realtime Database porque entradas efemeras, desconexao e
`onDisconnect` combinam melhor com esse produto. Presenca informa quem esta no
mesmo recurso; ela nao concede permissao e nao bloqueia salvamento.

## 8. Backup para GitHub

```text
usuario abre tool
  -> token fica apenas na sessao/localStorage do navegador
  -> builder le Firestore em estado coerente
  -> geradores produzem snapshot tecnico e bundle publico
  -> cliente GitHub cria/atualiza arquivos em um commit
  -> GitHub Pages publica o bundle
```

O backup nao e parte da transacao que salva um layout. Isso evita transformar
instabilidade ou limites do GitHub em indisponibilidade do editor.

## 9. Falhas esperadas

| Falha | Camada que detecta | Resposta esperada |
|---|---|---|
| sessao expirada | Firebase client | pedir novo login |
| membro ausente | autorizacao/rules | registrar solicitacao pendente |
| nome duplicado | transaction/reservation | manter editor aberto |
| revisao divergente | transaction | avisar conflito |
| Firebase sem resposta | health/data mode | mostrar status e snapshot |
| snapshot ausente | register.js | abrir vazio com aviso |
| token GitHub invalido | cliente GitHub | explicar permissao |
| limite GitHub | cliente GitHub | pedir espera antes de repetir |

## 10. Como seguir um bug

Para bug de tela, comece em `view.js`, siga o listener no controller e termine
na API chamada. Para bug de dados, comece no repository, confira a conversao e
depois a regra Firestore. Para bug de inicializacao, siga a ordem do
`index.html` e o `register.js`. Para bug global, comece no shell ou em
`app/tools`.
