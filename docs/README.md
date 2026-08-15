# Documentacao tecnica do SenkoLib

Esta pasta e a referencia tecnica canonica da integracao Firebase. Ela existe
para permitir que uma pessoa nova no projeto entenda a arquitetura antes de
alterar o codigo.

## Ordem de leitura recomendada

1. [Arquitetura Firebase](firebase/ARCHITECTURE.md): componentes e fluxos.
2. [Modelo de dados](firebase/DATA_MODEL.md): caminhos e campos do banco.
3. [Desenvolvimento local](firebase/DEVELOPMENT.md): como iniciar e depurar.
4. [Plano de testes](firebase/TEST_PLAN.md): comportamentos que devem passar.
5. [Operacao e producao](firebase/OPERATIONS.md): deploy, membros e rollback.
6. [Backup e restauracao](firebase/BACKUP_AND_RESTORE.md): GitHub e recuperacao.
7. [Estado da migracao](firebase/MIGRATION_STATUS.md): pronto, pendente e riscos.

O tutorial inicial continua em [FIREBASE_SETUP.md](../FIREBASE_SETUP.md). O
mapa geral de pastas esta em [STRUCTURE.md](../STRUCTURE.md).

## Qual documento tem prioridade

Quando houver divergencia, use esta ordem:

1. Codigo e regras implantadas.
2. Documentos em `docs/firebase/`.
3. `FIREBASE_SETUP.md` e `STRUCTURE.md`.
4. Guia interno em `app/shell/scripts/senko-guide.js`.
5. `Guia e documentacao/SenkoLib - Documentacao Completa.md`, que descreve
   principalmente a arquitetura legada baseada em arquivos e GitHub.

Uma divergencia nao deve ser mantida. Abra uma tarefa e atualize o documento
afetado junto com o codigo.

## Estado resumido

- Em localhost, Firebase e emuladores sao usados automaticamente.
- Fora de localhost, o modo legado ainda permanece ativo.
- Biblioteca e Colecoes ja possuem adaptadores Firebase.
- Firestore guarda conteudo; Realtime Database guarda presenca.
- Membros escrevem pelo SDK Web; Security Rules validam identidade, schema,
  versoes e limites no servidor.
- O botao global cria backup manual com token GitHub individual. Nao existe
  agendamento, GitHub Actions ou Function de producao nesse fluxo.
- Exportador e restauracao existem; ainda falta o ensaio ponta a ponta usando
  um commit real antes do corte de producao.

Consulte [MIGRATION_STATUS.md](firebase/MIGRATION_STATUS.md) antes de continuar
a implementacao.

## Regra de manutencao

Toda mudanca que altere dados, seguranca, fluxo de salvamento, nomes de
Functions, configuracao, comandos, backup ou comportamento colaborativo deve:

1. Atualizar o documento tecnico correspondente.
2. Atualizar `MIGRATION_STATUS.md`.
3. Atualizar o Senko Guide quando houver impacto para quem usa o aplicativo.
4. Executar os testes relacionados em `TEST_PLAN.md`.

Codigo atualizado com documentacao desatualizada e trabalho incompleto.
