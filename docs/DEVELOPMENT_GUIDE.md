# Guia de desenvolvimento

## Primeiros 15 minutos

1. Leia `README.md` e `docs/PRODUCT_SPECIFICATION.md`.
2. Veja `docs/architecture/STRUCTURE.md` para localizar o dono da mudanca.
3. Leia o `register.js` da area antes dos controllers.
4. Rode `npm install` na raiz. Todas as dependencias estao centralizadas nela.
5. Inicie os emuladores com `npm run firebase:emulators`.
6. Abra um servidor HTTP simples para o frontend.

## Servidor local

Qualquer servidor estatico serve. Exemplo:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Abra `http://127.0.0.1:4173/`. Em localhost, a configuracao usa emuladores. Em
GitHub Pages, ela usa o projeto real.

## Como implementar uma mudanca

1. Escreva o comportamento esperado em uma frase.
2. Identifique o dono: shell, tool, feature, shared ou infrastructure.
3. Siga o fluxo atual antes de criar arquivo ou global novo.
4. Altere a menor superficie que preserve o contrato.
5. Comente motivos e invariantes novos.
6. Atualize Senko Guide e o documento canonico correspondente.
7. Rode testes locais e uma regressao visual.
8. Confira `git diff` para arquivos gerados ou segredos acidentais.

## Comandos principais

```powershell
npm run inventory:build
npm run test:structure
npm run test:asset-versioning
npm run test:access-modal
npm run test:static-backup
npm run test:firebase-health
npm run scripts:check
```

Testes de regras usam emuladores. Veja `docs/firebase/TEST_PLAN.md` para os
comandos e cenarios completos.

## Alterar Biblioteca ou Colecoes

- estrutura HTML: `view.js`;
- comportamento visual: `controllers/`;
- estado em memoria e unicidade: `core/`;
- leitura Firebase: `repositories/firebase-repository.js`;
- leitura de contingencia: `repositories/static-repository.js`;
- transacao de escrita: infraestrutura Firebase;
- formato autorizado: `firebase/firestore.rules`.

Uma alteracao de campo quase sempre exige revisar repository, escrita, regra,
teste e documentacao do modelo de dados.

## Alterar acesso

Revise em conjunto:

- UI em `app/tools/access`;
- repository de membros e solicitacoes;
- regras Firestore;
- regras Realtime Database quando houver presenca;
- tabela de cargos na especificacao;
- testes de membro e promocao.

Nunca confie apenas em esconder um botao. A regra Firebase deve recusar a mesma
acao para quem nao possui cargo.

## Alterar backup

O bundle estatico e gerado. Nao edite arquivos em
`backup/latest/` manualmente. Altere o builder, rode o teste e gere
um novo backup por meio do fluxo oficial.

Tokens pessoais nunca devem aparecer em fixtures, screenshots versionados,
logs ou documentacao. Revogue imediatamente qualquer token exposto.

## Depuracao por camada

### A tela nao abre

Confira console, URL de asset e ordem no `register.js`. Um erro antes de
`panel.replaceChildren` normalmente e dependencia de carga.

### A tela abre vazia

Confira `SenkoDataMode`, disponibilidade do snapshot, autorizacao e listeners
do repository. Nao adicione dados fixos ao controller para mascarar o erro.

### Salvar falha

Leia o `error.code`. `aborted` indica conflito; `already-exists` indica reserva
de nome; `permission-denied` indica membro/regra; `unavailable` indica servico.

### Outro computador nao atualiza

Confirme que ambos usam o mesmo workspace e modo Firebase. Depois confira se o
listener inclui o pai correto e se o unsubscribe nao foi chamado cedo demais.

### GitHub Pages nao mudou

O commit do backup e o deploy da pagina sao etapas diferentes. Confira commit,
branch configurada, status do Pages e cache. O site deve usar assets com
versionamento e `Cache-Control` apropriado.

## Antes de publicar

- nenhuma chave privada ou token no diff;
- regras passaram no emulador;
- fonte Firebase e snapshot testados;
- Biblioteca e Colecoes abrem e pesquisam;
- criar, editar, conflito e excluir foram exercitados quando afetados;
- menu global e modal de Acessos continuam responsivos;
- Guide ensina o comportamento novo;
- inventario foi reconstruido;
- release foi atualizada quando necessario.
