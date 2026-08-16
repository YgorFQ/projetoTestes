# Documentacao tecnica do SenkoLib

Esta pasta e a referencia tecnica canonica da integracao Firebase. Ela existe
para permitir que uma pessoa nova no projeto entenda a arquitetura antes de
alterar o codigo.

## Ordem de leitura recomendada

1. [Estrutura do projeto](architecture/STRUCTURE.md): onde cada tipo de codigo fica.
2. [Classificacao dos arquivos](architecture/FILE_CLASSIFICATION.md): oficial, gerado, prototipo ou legado.
3. [Configuracao do Firebase](firebase/SETUP.md): tutorial inicial para quem nunca usou Firebase.
4. [Arquitetura Firebase](firebase/ARCHITECTURE.md): componentes e fluxos.
5. [Modelo de dados](firebase/DATA_MODEL.md): caminhos e campos do banco.
6. [Desenvolvimento local](firebase/DEVELOPMENT.md): como iniciar e depurar.
7. [Plano de testes](firebase/TEST_PLAN.md): comportamentos que devem passar.
8. [Operacao e producao](firebase/OPERATIONS.md): deploy, membros e rollback.
9. [Backup e restauracao](firebase/BACKUP_AND_RESTORE.md): GitHub e recuperacao.
10. [Estado da migracao](firebase/MIGRATION_STATUS.md): pronto, pendente e riscos.

## Qual documento tem prioridade

Quando houver divergencia, use esta ordem:

1. Codigo e regras implantadas.
2. Documentos em `docs/firebase/`.
3. Documentos em `docs/architecture/`.
4. Guia interno em `app/tools/guide/register.js`.
5. `docs/legacy/SenkoLib - Documentacao Completa.md`, que descreve
   principalmente a arquitetura legada baseada em arquivos e GitHub.

Uma divergencia nao deve ser mantida. Abra uma tarefa e atualize o documento
afetado junto com o codigo.

## Estado resumido

- Em localhost, Firebase e emuladores sao usados automaticamente.
- No GitHub Pages, Firebase real e a fonte principal depois do corte.
- Sem login ou quando o Firebase nao inicia, o aplicativo mostra o ultimo
  backup GitHub em modo publico e somente leitura.
- Biblioteca e Colecoes ja possuem adaptadores Firebase.
- Firestore guarda conteudo; Realtime Database guarda presenca.
- Membros escrevem pelo SDK Web; Security Rules validam identidade, schema,
  versoes e limites no servidor.
- O botao global cria backup manual com token GitHub individual. Nao existe
  agendamento, GitHub Actions ou Function de producao nesse fluxo.
- O mesmo commit guarda o snapshot tecnico restauravel e os arquivos JS
  estaticos usados pelo modo publico. Um Live Server simples basta para le-los.
- Exportador e restauracao existem; backups novos devem ser verificados em
  commits reais e restaurados primeiro em workspace descartavel quando forem
  usados para recuperacao.

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
