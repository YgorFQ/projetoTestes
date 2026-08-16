# Operacao do SenkoLib

## Principios

- Firestore e a fonte editavel.
- Realtime Database guarda presenca.
- GitHub recebe backups manuais.
- GitHub Pages publica o app e o snapshot de leitura.
- Segredos administrativos ficam fora do repositorio e do navegador.

## Rotina de publicacao

1. Atualize a branch local.
2. Rode a bateria de testes.
3. Revise regras e configuracao.
4. Gere o inventario.
5. Commit e push para a branch do Pages.
6. Aguarde o deployment ficar verde.
7. Faça smoke test em producao.

Comandos:

```powershell
npm run inventory:build
npm run test:structure
npm run test:asset-versioning
npm run test:access-modal
npm run test:static-backup
npm run test:firebase-health
npm run scripts:check
```

Implante regras separadamente quando mudarem:

```powershell
npm run firebase:deploy:rules
```

Evite deploy sem `--only`. O hosting do site e as regras possuem ritmos e
permissoes diferentes.

## Gestao de membros

Fluxo normal:

1. pessoa entra com Google;
2. app cria solicitacao pendente;
3. owner/admin abre Acessos;
4. escolhe cargo permitido;
5. transacao cria membro e evento;
6. Realtime Database recebe permissao de presenca;
7. listener da pessoa libera a interface.

Use script CLI apenas para primeiro owner ou recuperacao. Toda promocao comum
deve deixar evento no modal Acessos.

## Recuperacao sem admins

Quem controla o projeto Firebase pode usar a CLI autenticada para cadastrar um
novo owner. Ser proprietario IAM nao altera automaticamente o workspace, pois
sao dominios de autorizacao diferentes.

## Backup manual

Antes de uma operacao arriscada, peça um backup. Confirme no commit:

- manifest tecnico;
- documentos esperados;
- `backup/latest/manifest.js` atualizado;
- contagens coerentes;
- nenhum token ou arquivo `.pem`.

O botao le uma versao coerente usando `dataVersion`. Se o banco mudar durante a
leitura, o exportador tenta novamente antes de publicar.

## Restauracao

Restaure primeiro em workspace descartavel:

```powershell
npm run backup:restore:cli-auth -- \
  --source backup/data \
  --workspace senkolib-restore-test \
  --dry-run
```

Remova `--dry-run` somente depois de revisar contagens. O modo CLI usa a conta
Firebase logada e nao exige chave privada no repositorio.

## Incidente Firebase

1. Confirme status do servico e cota.
2. Observe o badge do app e console.
3. Nao faça repeticoes rapidas de escrita.
4. Preserve o ultimo snapshot publico.
5. Registre horario, conta, acao e codigo do erro.
6. Quando o servico voltar, confirme listeners e um salvamento controlado.

## Incidente de cota

Ao atingir a cota diaria, leituras/escritas podem ser recusadas ate renovacao
ou mudanca de plano. O app deve indicar indisponibilidade e manter o snapshot
publico visivel. Reduza remontagens e listeners duplicados antes de considerar
plano pago.

## Incidente GitHub

- `401`: token invalido ou revogado;
- `403`: permissao insuficiente ou limite secundario;
- `404`: owner, repo ou branch incorretos;
- erro de rede: navegador, CORS, proxy ou indisponibilidade.

Falha de backup nao afeta dados ja salvos no Firebase. Aguarde antes de repetir
um `403` de limite para nao prolongar o bloqueio.

## Rotacao de credenciais

Tokens GitHub sao pessoais e revogaveis. Chaves administrativas, quando usadas
fora deste fluxo, devem ser guardadas em cofre, ter menor privilegio possivel e
ser revogadas apos a tarefa. O app Web nunca recebe essas chaves.
