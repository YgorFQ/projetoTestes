# Documentacao tecnica do SenkoLib

Esta pasta e a referencia canonica do produto e da implementacao. Ela existe
para uma pessoa nova entender o SenkoLib antes de alterar o codigo.

## Ordem de leitura recomendada

1. [Especificacao do produto](PRODUCT_SPECIFICATION.md): comportamento, cargos e estados.
2. [Guia de desenvolvimento](DEVELOPMENT_GUIDE.md): primeiros passos, comandos e depuracao.
3. [Estrutura do projeto](architecture/STRUCTURE.md): onde cada tipo de codigo fica.
4. [Fluxo de execucao](architecture/RUNTIME_FLOW.md): inicializacao, listeners e backup.
5. [Contratos entre modulos](architecture/MODULE_CONTRACTS.md): limites de cada camada.
6. [Classificacao dos arquivos](architecture/FILE_CLASSIFICATION.md): oficial, gerado ou prototipo.
7. [Arquivos da raiz](architecture/ROOT_FILES.md): por que alguns arquivos nao podem ser movidos.
8. [Configuracao do Firebase](firebase/SETUP.md): tutorial inicial para quem nunca usou Firebase.
9. [Arquitetura Firebase](firebase/ARCHITECTURE.md): componentes e seguranca.
10. [Modelo de dados](firebase/DATA_MODEL.md): caminhos e campos do banco.
11. [Plano de testes](firebase/TEST_PLAN.md): comportamentos que devem passar.
12. [Operacao e producao](firebase/OPERATIONS.md): deploy, membros e recuperacao.

## Qual documento tem prioridade

Quando houver divergencia, use esta ordem:

1. Codigo e regras implantadas.
2. Documentos em `docs/firebase/`.
3. Documentos em `docs/architecture/`.
4. Guia interno em `app/tools/guide/register.js`.

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

O corte para Firebase foi concluido. Nao adicione outra fonte editavel; dados
atuais pertencem ao Firestore e contingencia pertence ao snapshot gerado.

## Regra de manutencao

Toda mudanca que altere dados, seguranca, fluxo de salvamento, configuracao,
comandos, backup ou comportamento colaborativo deve:

1. Atualizar o documento tecnico correspondente.
2. Atualizar `PRODUCT_SPECIFICATION.md` quando mudar o contrato do produto.
3. Atualizar o Senko Guide quando houver impacto para quem usa o aplicativo.
4. Executar os testes relacionados em `TEST_PLAN.md`.

Codigo atualizado com documentacao desatualizada e trabalho incompleto.
