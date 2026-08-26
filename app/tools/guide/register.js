(function () {
  /*
   * Senko Guide - guia oficial e global do projeto.
   *
   * Este modulo pertence ao shell porque nao representa uma aba nem uma regra
   * de negocio de uma feature. Ele controla a janela de ajuda aberta pelo
   * botao de livro no header e apenas usa APIs publicas para criar atalhos.
   *
   * REGRA DE MANUTENCAO:
   * - Este guia e prioridade maxima. Toda alteracao em arquitetura, feature,
   *   GitHub, fluxo de dados, erro comum, validacao ou estilo global precisa
   *   atualizar os topicos abaixo.
   * - Se uma IA estiver alterando o projeto, ela deve considerar este arquivo
   *   parte obrigatoria da mudanca sempre que o comportamento documentado mudar.
   */
  var activeCategory = 'overview';
  var overlay;
  var searchInput;
  var contentEl;
  var navEl;
  var counterEl;
  var emptyEl;
  var previousBodyOverflow = '';

  var GUIDE = [
    {
      id: 'overview',
      label: 'Visao geral',
      items: [
        {
          title: 'O que e o SenkoLib',
          badge: 'inicio',
          terms: 'senkolib projeto ferramenta app layouts colecoes imagens sources preview teste faq',
          paragraphs: [
            'O SenkoLib e uma ferramenta web/local para organizar layouts, colecoes, imagens, sources e previews em uma mesma interface.',
            'Pense nele como uma oficina: cada bancada faz uma tarefa diferente, mas todas ficam dentro do mesmo lugar.'
          ],
          bullets: [
            'Biblioteca guarda layouts e variacoes.',
            'Colecoes organiza grupos de layouts.',
            'Imagens comprime e redimensiona arquivos.',
            'Sources gera picture, source e ims.',
            'Preview e uma area beta para testes.',
            'Teste e um prototipo para montar e validar FAQs de eFacil, Martins e sites genericos.',
            'Notas beta experimenta secoes, paginas e um editor continuo antes de substituir a ferramenta atual.',
            'Criacao rapida e a entrada oficial para iniciar criacoes em qualquer aba.',
            'Notas da equipe e uma ferramenta global oficial para guardar prompts, regras, guias e padroes em arquivos proprios.',
            'No fluxo atual, Biblioteca cria layouts e variacoes; Colecoes cria colecoes e layouts dentro de uma colecao existente.'
          ]
        },
        {
          title: 'Ideia principal',
          badge: 'regra',
          terms: 'independente independencia feature remover pasta nao quebrar',
          paragraphs: [
            'A regra mais importante e que cada feature deve ser independente.',
            'Se uma feature for removida, as outras devem continuar funcionando normalmente.'
          ],
          note: 'Analogia: o SenkoLib e um shopping. O shell e o shopping; cada feature e uma loja. Uma loja nao deve depender do caixa da outra.'
        },
        {
          title: 'Guia sempre atualizado',
          badge: 'prioridade',
          terms: 'guia documentacao prioridade maxima atualizar ai manutencao codigo mudanca',
          paragraphs: [
            'Toda vez que algo for alterado no projeto, o guia tambem precisa ser revisado.',
            'Isso vale para arquitetura, features, GitHub, fluxos de dados, estilos globais, erros conhecidos e regras de validacao.'
          ],
          bullets: [
            'Codigo alterado com guia desatualizado ainda e trabalho incompleto.',
            'Se uma IA mexer no projeto, ela deve verificar este guia antes de finalizar.',
            'Mudancas pequenas tambem contam quando mudam comportamento, nome, arquivo, fluxo ou erro exibido.'
          ],
          note: 'Pense no guia como o mapa do projeto. Se a cidade muda e o mapa nao muda, a proxima pessoa se perde.'
        },
        {
          title: 'Links rapidos',
          badge: 'atalhos',
          terms: 'links rapidos abrir biblioteca colecoes imagens sources preview github',
          paragraphs: [
            'Use estes atalhos para pular direto para uma area do SenkoLib sem fechar mentalmente o contexto do guia.'
          ],
          actions: [
            { label: 'Abrir Biblioteca', feature: 'biblioteca' },
            { label: 'Abrir Colecoes', feature: 'colecoes' },
            { label: 'Abrir Imagens', feature: 'imagens' },
            { label: 'Abrir Sources', feature: 'sources' },
            { label: 'Abrir Preview', feature: 'gamer-preview' },
            { label: 'Configurar GitHub', githubConfig: true }
          ]
        },
        {
          title: 'Como abrir o projeto',
          badge: 'rodar',
          terms: 'abrir rodar servidor localhost python file index',
          paragraphs: [
            'O projeto pode ser aberto pelo index.html ou por um servidor local.',
            'Para teste mais parecido com GitHub Pages, prefira servidor local.'
          ],
          bullets: [
            'Abrir direto: index.html.',
            'Servidor local: python -m http.server 5190 --bind 127.0.0.1.',
            'URL local: http://127.0.0.1:5190/index.html.'
          ]
        }
      ]
    },
    {
      id: 'architecture',
      label: 'Arquitetura',
      items: [
        {
          title: 'Shell',
          badge: 'nucleo',
          terms: 'shell casca header abas tema github feature root',
          paragraphs: [
            'O shell e a casca principal do app. Ele controla o topo, abas, tema, botoes globais e a area onde cada feature aparece.',
            'Ele nao deve cuidar de regras internas como criar layout, editar colecao ou comprimir imagem.'
          ],
          bullets: [
            'Arquivo principal: app/shell/scripts/senko-shell.js.',
            'Menu de ferramentas: app/shell/scripts/senko-utility-menu.js.',
            'Estilo principal: app/shell/styles/styles.css.',
            'Raiz das features: #senkoFeatureRoot.',
            'O menu move os controles existentes e preserva IDs, listeners, permissoes e estados.'
          ]
        },
        {
          title: 'Menu de ferramentas',
          badge: 'oficial',
          terms: 'menu hamburguer ferramentas header botoes globais janela utilitarios',
          paragraphs: [
            'O botao de menu no canto superior abre um painel com notas, LayoutLab, guia, Acessos, backup, conta e tema quando cada acao esta disponivel.',
            'O menu nao recria as ferramentas: ele move os elementos que ja existem para preservar integracoes e permissoes.'
          ],
          bullets: [
            'Controlador: app/shell/scripts/senko-utility-menu.js.',
            'Estilos: bloco senko-utility-menu em app/shell/styles/styles.css.',
            'Fecha ao escolher uma acao, clicar fora ou pressionar Escape.',
            'Acoes escondidas ou desabilitadas continuam respeitando o estado original.',
            'Criacao rapida permanece fixa imediatamente a esquerda do menu.',
            'Acessos abre como modal global somente para owner e admin.',
            'Status do Firebase e progresso de publicacao permanecem visiveis fora do painel.'
          ],
          note: 'O menu e parte oficial do shell; novas ferramentas globais devem preservar IDs, listeners e regras de permissao.'
        },
        {
          title: 'register.js',
          badge: 'entrada',
          terms: 'register registrar feature mount carregar scripts css dados',
          paragraphs: [
            'O register.js e a porta de entrada de uma feature.',
            'Ele avisa o shell que a feature existe, cria o painel e carrega os arquivos necessarios.'
          ],
          note: 'Analogia: e o funcionario que abre a loja, acende a luz e chama o resto da equipe.'
        },
        {
          title: 'view.js',
          badge: 'tela',
          terms: 'view tela html estrutura interface modal painel',
          paragraphs: [
            'O view.js monta a estrutura visual inicial da feature.',
            'Ele deve criar a tela, containers, botoes e areas de resultado, mas nao virar dono de toda a regra de negocio.'
          ]
        },
        {
          title: 'Manifestos e inventarios',
          badge: 'dados',
          terms: 'manifest data indice arquivos carregar layouts colecoes variantes',
          paragraphs: [
            'Os dados atuais vem do Firestore ou do bundle em backup/latest. Nao existe uma terceira fonte.',
            'O inventario backup/meta/file-classification.json marca cada arquivo como official, generated ou prototype.'
          ],
          bullets: [
            'Execute npm run inventory:build depois de criar, mover ou remover arquivos.',
            'backup/latest/manifest.js informa a versao e as contagens do fallback publico.',
            'Manifestos gerados sao saida do backup e nunca cadastro manual.'
          ],
          note: 'Conteudo novo e criado pela interface e persistido no Firestore.'
        },
        {
          title: 'Shared',
          badge: 'global',
          terms: 'shared tokens componentes estilos globais tema cores',
          paragraphs: [
            'A pasta shared guarda apenas coisas realmente globais, como tokens de cor, fontes, componentes visuais neutros e assets compartilhados.',
            'Nao coloque regra interna de feature em shared.'
          ],
          bullets: [
            'Tokens: app/shared/styles/senko-tokens.css.',
            'Componentes neutros: app/shared/styles/senko-components.css.',
            'Assets: app/shared/assets/.'
          ]
        },
        {
          title: 'Mapa visual da arquitetura',
          badge: 'mapa',
          terms: 'mapa visual arquitetura index shell shared features prototype github fluxo',
          paragraphs: [
            'O fluxo principal e simples: o index carrega a base, o shell monta a navegacao e cada feature se registra sozinha.'
          ],
          bullets: [
            'index.html -> carrega tokens, snapshot publico, infraestrutura, shell, tools e register.js das areas disponiveis.',
            'app/shell -> cria topo, abas, tema e a raiz neutra das features.',
            'app/tools -> guarda janelas e comandos globais, como Acessos, Guide, sessao e backup.',
            'app/shared -> fornece cores, fontes, componentes neutros e assets globais.',
            'app/features -> guarda features finais, cada uma com seus arquivos proprios.',
            'app/prototype -> guarda somente ideias beta, como Preview.',
            'app/infrastructure -> conversa com Firebase, GitHub e o modo de dados.',
            'generated -> recebe snapshots, fallback publico e inventarios reconstruiveis.'
          ],
          note: 'Analogia: index e a porta de entrada, shell e a recepcao, shared e o almoxarifado, features sao as salas de trabalho.'
        },
        {
          title: 'Tabela de responsabilidades',
          badge: 'dono',
          terms: 'responsabilidades dono shell shared biblioteca colecoes imagens sources preview github',
          paragraphs: [
            'Antes de alterar qualquer coisa, descubra quem e o dono do comportamento.'
          ],
          bullets: [
            'Shell: navegacao, tema, header, raiz das features e contratos de registro.',
            'Tools: modais e comandos globais registrados no shell.',
            'Shared: tokens, componentes neutros e assets realmente globais.',
            'Biblioteca: layouts, variantes e preview de layouts.',
            'Colecoes: colecoes, grupos e layouts dentro de colecoes.',
            'Infrastructure: SDKs, transacoes, modo de dados e backup global.',
            'Imagens: compressao, redimensionamento e bibliotecas locais de imagem.',
            'Sources: geracao de picture/source/srcset/ims e medicao por modo.',
            'Prototype: telas em experimento antes de virarem features finais.'
          ],
          note: 'Se voce nao sabe quem e o dono, pare e procure antes. Colocar codigo no dono errado e o jeito mais facil de criar dependencia escondida.'
        }
      ]
    },
    {
      id: 'folders',
      label: 'Pastas',
      items: [
        {
          title: 'Mapa das pastas',
          badge: 'mapa',
          terms: 'pastas estrutura app shell features shared prototype',
          paragraphs: [
            'A organizacao do projeto separa o que e global do que pertence a cada feature.'
          ],
          bullets: [
            'index.html: entrada principal do projeto.',
            'sw.js: controle de cache em HTTP/HTTPS.',
            'app/shell: estrutura geral do app.',
            'app/tools: ferramentas globais e seus modais.',
            'app/shared: tokens, componentes e assets globais.',
            'app/features: features principais.',
            'app/prototype: telas em teste ou beta.',
            'backup: ultimo snapshot publico, dados restauraveis e inventarios gerados.',
            'firebase: regras, indices e exemplo de configuracao.',
            'scripts/admin: operacoes locais de contas e membros.',
            'scripts/backup: criacao e restauracao de snapshots.',
            'scripts/maintenance: manutencao automatizada do repositorio.',
            'tests: verificacoes automaticas e fixtures isoladas.',
            '.vscode/settings.json: configuracao local do Live Server.',
            'docs: toda a documentacao canonica do produto e da implementacao.'
          ]
        },
        {
          title: 'Arquivos que ficam na raiz',
          badge: 'raiz',
          terms: 'raiz root index firebase package sw readme agents gitignore obrigatorio',
          paragraphs: [
            'A raiz guarda somente pontos de entrada e arquivos procurados diretamente pelas ferramentas.'
          ],
          bullets: [
            'index.html e a entrada do GitHub Pages.',
            'sw.js fica na raiz para controlar todo o escopo do site.',
            'firebase.json e .firebaserc sao procurados pela Firebase CLI.',
            'package.json e package-lock.json pertencem ao npm da raiz.',
            'README.md, AGENTS.md e .gitignore possuem funcoes convencionais do repositorio.',
            'Logs dos emuladores sao locais, ignorados e nunca devem ser enviados ao GitHub.',
            'Explicacao completa: docs/architecture/ROOT_FILES.md.'
          ]
        },
        {
          title: 'Onde mexer',
          badge: 'manutencao',
          terms: 'alterar mexer css feature global shell shared',
          paragraphs: [
            'Antes de alterar algo, descubra quem e o dono daquilo.'
          ],
          bullets: [
            'Mudanca global: index.html, shell ou shared.',
            'Mudanca da Biblioteca: app/features/biblioteca.',
            'Mudanca de Colecoes: app/features/colecoes.',
            'Mudanca de Imagens: app/features/imagens.',
            'Mudanca de Sources: app/features/sources.',
            'Mudanca de ferramenta global: app/tools/[nome].',
            'Mudanca do cliente Firebase ou GitHub: app/infrastructure.',
            'Mudanca de regras e indices Firebase: firebase/.',
            'Operacao administrativa: scripts/admin/.',
            'Criacao ou restauracao de backup: scripts/backup/.',
            'Experimento: app/prototype.'
          ]
        }
      ]
    },
    {
      id: 'features',
      label: 'Features',
      items: [
        {
          title: 'Biblioteca',
          badge: 'layouts',
          terms: 'biblioteca layout variacao variante senkolib register variants layout-editor editor oficial id manifest html basico copy base',
          paragraphs: [
            'A Biblioteca guarda layouts, variantes e o HTML Basico compartilhado no Firestore e le o ultimo snapshot publico quando o Firebase nao esta disponivel.',
            'Firebase e snapshot gerado sao as duas unicas fontes de dados.'
          ],
          bullets: [
            'Motor: core/index.js.',
            'UI: controllers/index.js.',
            'Editor oficial: controllers/layout-editor.js.',
            'Template do HTML Basico: controllers/copy-base-template.js.',
            'Editor do HTML Basico: controllers/copy-base-editor.js.',
            'Estilo do modal: styles/copy-base-editor.css.',
            'Persistencia: repositories/firebase-repository.js.',
            'Fallback: repositories/static-repository.js.',
            'Estilos do editor: styles/layout-editor.css.'
          ],
          note: 'O editor oficial nao fica mais em prototype. Ele pertence a Biblioteca e nao deve oferecer campo editavel para o ID tecnico.'
        },
        {
          title: 'Colecoes',
          badge: 'grupos',
          terms: 'colecoes grupos layout colecao collib colgroups manifest collection layouts individuais',
          paragraphs: [
            'Colecoes organiza layouts dentro de colecoes e grupos no Firestore.',
            'Os grupos sao cadastro proprio e nao devem ser apagados so porque ficaram vazios.',
            'Firebase e snapshot gerado sao as duas unicas fontes de dados.'
          ],
          bullets: [
            'Motor de colecoes: core/index.js.',
            'Motor de grupos: controllers/groups.js.',
            'Modais: controllers/modals.js.',
            'Gerenciador de grupos: cria, edita e exclui grupos vazios no modo Firebase.',
            'Editor de layouts completos: controllers/layout-editor.js.',
            'Estilos do editor: styles/layout-editor.css.',
            'Persistencia: repositories/firebase-repository.js.',
            'Fallback: repositories/static-repository.js.'
          ],
          note: 'O editor de Colecoes acompanha a experiencia visual da Biblioteca, mas possui codigo, estilos, validacao e persistencia proprios.'
        },
        {
          title: 'Imagens',
          badge: 'midia',
          terms: 'imagens compressor redimensionador zip webp jpg png shadow dom',
          paragraphs: [
            'Imagens tem compressor e redimensionador.',
            'A feature usa Shadow DOM para isolar seus estilos do resto do app.'
          ],
          bullets: [
            'Compressor: scripts/compressor.js.',
            'Redimensionador: scripts/resizer.js.',
            'Utilitarios: scripts/imagens-utils.js.',
            'Bibliotecas locais: vendor/JSZip, UPNG e browser-image-compression.'
          ]
        },
        {
          title: 'Sources',
          badge: 'picture',
          terms: 'sources picture source srcset ims breakpoint medida base html',
          paragraphs: [
            'Sources ajuda a gerar picture, source, srcset e ims a partir de HTML colado pelo usuario.',
            'Tambem usa Shadow DOM para evitar conflito visual com outras features.'
          ],
          bullets: [
            'Ferramenta principal: scripts/picture.js.',
            'View: scripts/sources-view.js.',
            'Modo padrao mede em um documento interno.',
            'Modo Base.html mede dentro de uma base importada.'
          ]
        },
        {
          title: 'Criacao rapida',
          badge: 'oficial',
          terms: 'criacao rapida quick create provider registerCreateProvider shell layout variacao colecao',
          paragraphs: [
            'A criacao rapida e uma ferramenta oficial do shell aberta pelo botao laranja de mais.',
            'Ela apresenta providers registrados pelas features sem conhecer seus dados ou modais internos.'
          ],
          bullets: [
            'Controlador: app/tools/quick-create/register.js.',
            'Estilos: app/tools/quick-create/styles.css.',
            'Registro neutro: SenkoShell.registerCreateProvider().',
            'Biblioteca registra Layout e Variacao em app/features/biblioteca/register.js.',
            'Colecoes registra Colecao e Layout em app/features/colecoes/register.js.',
            'A feature e ativada antes de abrir seu modal para evitar uma janela presa em painel suspenso.',
            'Validacao e persistencia continuam pertencendo a feature que cria o item.'
          ],
          note: 'O modal global escolhe o destino; o formulario final continua sendo o modal oficial da feature.'
        },
        {
          title: 'Senko Guide',
          badge: 'oficial',
          terms: 'senko guide guia oficial shell ajuda documentacao modal busca categorias',
          paragraphs: [
            'O Senko Guide e a documentacao oficial e pesquisavel do projeto.',
            'Ele pertence ao shell porque pode ser aberto em qualquer aba e nao controla dados de nenhuma feature.'
          ],
          bullets: [
            'Controlador: app/tools/guide/register.js.',
            'Estilos: app/tools/guide/styles.css.',
            'Botao global: #senkoGuideBtn dentro do menu de ferramentas do header.',
            'API publica: SenkoGuide.open() e SenkoGuide.close().',
            'Atalhos para features usam somente SenkoShell.switchFeature().',
            'Toda mudanca relevante no projeto precisa revisar este guia.'
          ],
          note: 'Ser oficial nao transforma o Guide em feature: ele continua sendo uma ferramenta global do shell.'
        },
        {
          title: 'Ferramentas oficiais e areas beta',
          badge: 'beta',
          terms: 'preview beta prototype gamer teste faq multissite prototipo notas equipe team notes',
          paragraphs: [
            'Notas da equipe continua como tool oficial; Preview, Teste e Notas beta ficam em app/prototype enquanto sao avaliados.',
            'Tudo que ainda esta em teste deve comecar em prototype antes de virar feature final.'
          ],
          bullets: [
            'Notas da equipe: app/tools/team-notes/.',
            'O acionador de Notas da equipe fica no menu de ferramentas e o painel consome os tokens visuais compartilhados do SenkoLib. A feature mantem classes proprias e nao deve criar uma paleta paralela.',
            'A experiencia de Notas da equipe organiza busca, filtros, lista e editor em areas claras, sinaliza alteracoes nao salvas e pede confirmacao antes de descarta-las.',
            'Cada nota criada pelo Team Notes deve virar um arquivo proprio em app/tools/team-notes/data/notes e entrar no manifest.js.',
            'Preview: app/prototype/gamer-preview/.',
            'Teste: app/prototype/faq-teste/.',
            'Notas beta: app/prototype/team-notes-workspace/. A tela testa a hierarquia caderno, secoes, paginas e editor com dados apenas na memoria; secoes podem ser excluidas junto com suas paginas vinculadas e as exclusoes usam um modal proprio do prototipo.',
            'Senko Guide e Team Notes nao sao prototipos; ambos ficam em app/tools/.',
            'Editor de layout da Biblioteca nao e mais prototipo; ele fica em app/features/biblioteca/.'
          ]
        },
        {
          title: 'Teste: FAQ multissite',
          badge: 'prototipo',
          terms: 'teste faq efacil martins generico canonical perguntas respostas abas compacto q a h3 p',
          paragraphs: [
            'Teste monta tres conjuntos independentes de perguntas e respostas e gera uma unica entrega em HTML e CSS puro.',
            'O canonical da pagina mostra o FAQ eFacil ou Martins; quando nenhum dominio conhecido aparece, o FAQ generico funciona como fallback.'
          ],
          bullets: [
            'A entrada aceita pares q/a e h3/p, inclusive os dois formatos na mesma colagem.',
            'Cada site possui editor proprio, inclusao manual e exclusao de perguntas.',
            'A interface compacta separa Entrada, Perguntas, Simular e Codigo em quatro abas; apenas uma area principal aparece por vez.',
            'O simulador troca o canonical do preview sem alterar o codigo final e monta somente o FAQ reconhecido.',
            'A janela lateral de redirecionamentos foi removida; links continuam preservados no conteudo e no codigo final.',
            'O rascunho fica somente no localStorage deste navegador e nao grava Firebase ou GitHub.',
            'A entrega final continua em HTML e CSS puro e preserva os links escritos nas respostas.'
          ],
          note: 'Enquanto o fluxo estiver sendo refinado, a aba deve permanecer em app/prototype e usar o nome temporario Teste.'
        }
      ]
    },
    {
      id: 'status',
      label: 'Status',
      items: [
        {
          title: 'Status das areas',
          badge: 'estado',
          terms: 'status areas estavel beta reforma biblioteca colecoes imagens sources preview guia',
          paragraphs: [
            'Este status ajuda uma pessoa nova a saber onde pode confiar mais e onde precisa testar com mais cuidado.'
          ],
          bullets: [
            'Biblioteca: feature principal, deve permanecer estavel e independente.',
            'Colecoes: feature principal, deve permanecer estavel e independente.',
            'Imagens: feature independente, mas merece revisao cuidadosa quando houver reforma interna.',
            'Sources: feature independente, mas merece revisao cuidadosa quando houver reforma interna.',
            'Criacao rapida: ferramenta oficial do shell com providers registrados pelas features.',
            'Notas da equipe: ferramenta oficial em app/tools, com arquivos individuais e salvamento via GitHub.',
            'Preview: prototipo beta em app/prototype.',
            'Teste: prototipo beta de FAQ multissite em app/prototype.',
            'Senko Guide: ferramenta oficial do shell e prioridade maxima de manutencao.',
            'Editor da Biblioteca: oficial, integrado em app/features/biblioteca/controllers/layout-editor.js.',
            'HTML Basico: template oficial copiavel e editor Firebase em app/features/biblioteca/controllers/copy-base-editor.js.'
          ]
        },
        {
          title: 'Quando algo vira feature final',
          badge: 'promover',
          terms: 'prototype virar feature final mover pasta registrar testar documentar',
          paragraphs: [
            'Um prototipo so deve sair de app/prototype quando o fluxo estiver claro, testado e documentado.'
          ],
          bullets: [
            'Criar pasta propria em app/features.',
            'Garantir register.js, view.js, scripts, styles e dados separados.',
            'Remover dependencia escondida de outra feature.',
            'Registrar no index.html.',
            'Remover a versao antiga de app/prototype quando o fluxo virar oficial.',
            'Atualizar este guia antes de considerar a migracao concluida.'
          ]
        }
      ]
    },
    {
      id: 'firebase',
      label: 'Firebase',
      items: [
        {
          title: 'Firebase e continuidade publica',
          badge: 'dados',
          terms: 'firebase firestore continuidade enabled config banco principal',
          paragraphs: [
            'Firebase e a fonte principal editavel de Biblioteca e Colecoes. Sem uma sessao autorizada, o SenkoLib mostra o ultimo backup publico em modo somente leitura.',
            'A configuracao fica em app/infrastructure/firebase/firebase-config.js e o passo a passo completo fica em docs/firebase/SETUP.md.'
          ],
          bullets: [
            'Documentacao canonica: docs/README.md e docs/firebase/.',
            'Contrato do produto: docs/PRODUCT_SPECIFICATION.md.',
            'Firestore guarda conteudo, metadados e revisoes.',
            'Variantes e layouts de colecao sao observados nas subcolecoes de cada documento pai.',
            'O navegador executa transacoes e Firestore Rules valida membro, campos, versoes e limites.',
            'Realtime Database guarda somente quem esta presente em um editor.',
            'Storage recebera imagens e conteudos que ultrapassarem o limite definido.',
            'O navegador nunca recebe credencial administrativa nem chave privada do GitHub; o backup usa o token individual de quem clicou.',
            'SenkoDataMode alterna entre firebase, static e unavailable sem misturar as regras internas das features.',
            'Falhas de cota, internet ou disponibilidade exibem uma faixa persistente no header e mudam a fonte para o ultimo backup somente leitura.',
            'Uma conta autenticada sem acesso registra a propria solicitacao em workspaces/senkolib/accessRequests; proprietarios e admins podem listar pelo modal Acessos do menu.'
          ]
        },
        {
          title: 'Firebase fora do ar ou sem cota',
          badge: 'status',
          terms: 'firebase fora do ar limite cota 50 mil leitura offline indisponivel resource exhausted',
          paragraphs: [
            'O header mostra Limite atingido, Sem conexao ou Firebase fora do ar quando uma falha real interrompe os dados ao vivo.',
            'O SenkoLib bloqueia escrita e exibe a data do ultimo backup publico usado. O modo Somente leitura sem alerta continua significando apenas que a pessoa nao entrou.'
          ],
          bullets: [
            'resource-exhausted e mensagens de quota viram o estado quota.',
            'unavailable, deadline-exceeded e network-request-failed viram indisponibilidade.',
            'O evento offline do navegador muda imediatamente para o fallback.',
            'Tentar novamente recarrega a pagina; nao existe repeticao automatica consumindo leituras.',
            'Harness visual: tests/fixtures/firebase-status-harness.html?kind=quota.'
          ]
        },
        {
          title: 'Modo publico somente leitura',
          badge: 'fallback',
          terms: 'fallback publico static somente leitura live server firebase indisponivel backup',
          paragraphs: [
            'O modo publico usa os arquivos gerados pelo ultimo backup GitHub. Ele existe para consulta quando a pessoa nao entrou ou quando o Firebase nao consegue iniciar.',
            'O HTML e o CSS ficam publicos por decisao de produto, mas membros, e-mails, presenca, tokens, logs, autoria e revisoes antigas nao entram nesse bundle.'
          ],
          bullets: [
            'Arquivos gerados: backup/latest/manifest.js, biblioteca.js e colecoes.js.',
            'Adaptadores: repositories/static-repository.js dentro de Biblioteca e Colecoes.',
            'Criar, editar, excluir e fazer backup ficam bloqueados no modo static.',
            'Preview e copia de HTML/CSS continuam disponiveis.',
            'Um Live Server simples na raiz e suportado; file:// nao e requisito.',
            'Ao entrar como membro, os listeners Firebase substituem o snapshot estatico.',
            'Ao sair, as features encerram listeners e voltam ao ultimo backup.',
            'Sem nenhuma das duas fontes, a feature abre vazia e informa indisponibilidade.'
          ]
        },
        {
          title: 'Salvar e atualizar outras pessoas',
          badge: 'tempo real',
          terms: 'salvar ao vivo realtime listener revisao conflito rascunho outra pessoa',
          paragraphs: [
            'Digitar no editor altera somente o rascunho local. O Firebase recebe conteudo apenas quando a pessoa usa Salvar.',
            'Depois do save, listeners atualizam quem esta observando. Um editor com rascunho proprio recebe aviso e nao e sobrescrito.'
          ],
          bullets: [
            'Cada save cria uma revisao imutavel.',
            'baseRevisionId detecta se outra pessoa salvou antes.',
            'O editor oficial da Biblioteca salva layouts e variacoes por transacoes do SDK Web.',
            'O HTML Basico usa o singleton settings/copyBase e expectedVersion; ele nao cria revisoes ou reserva de nome.',
            'Novos layouts e variacoes recebem IDs de documento gerados pelo Firestore.',
            'Colecoes e seus layouts internos usam o mesmo fluxo de transacoes e revisoes.',
            'Biblioteca e Colecoes mostram quem esta no mesmo editor usando o Realtime Database.',
            'Um editor sem rascunho aplica a nova versao imediatamente na tela.',
            'Um editor com alteracoes locais preserva o rascunho, avisa sobre a versao nova e continua usando a revisao antiga para impedir sobrescrita silenciosa.'
          ]
        },
        {
          title: 'Membros e seguranca',
          badge: 'acesso',
          terms: 'membro login google uid permissao rules convidar',
          paragraphs: [
            'Owner, admin e editor podem criar, editar e excluir conteudo.',
            'Entrar com Google nao concede acesso sozinho: o UID precisa existir em workspaces/senkolib/members.'
          ],
          bullets: [
            'Firestore Rules libera conteudo para membros e repete as restricoes administrativas de cada cargo.',
            'O modal Acessos altera members por transacoes protegidas; editores continuam bloqueados.',
            'Owner gerencia qualquer cargo; admin aprova e remove somente editores; editor nao convida pessoas.',
            'Acessos fica no menu global e mostra solicitacoes, membros e atividade somente para owner/admin.',
            'O primeiro owner e cadastrado por procedimento administrativo; os proximos cargos usam a interface.',
            'Nos emuladores, crie o usuario local e cadastre o membro com o script administrativo.'
          ]
        },
        {
          title: 'Ambientes e emuladores',
          badge: 'local',
          terms: 'ambiente desenvolvimento producao emulator localhost java',
          paragraphs: [
            'Emuladores sao copias locais de Auth, Firestore, Realtime Database, Storage e Hosting.',
            'Eles permitem testar login, regras e salvamento sem alterar dados reais.'
          ],
          bullets: [
            'useEmulators true funciona somente em localhost.',
            'Interface local: http://127.0.0.1:4000/.',
            'Aplicativo local: http://127.0.0.1:5000/.',
            'O computador precisa de JDK 21 para iniciar os emuladores.'
          ]
        }
      ]
    },
    {
      id: 'github',
      label: 'GitHub',
      items: [
        {
          title: 'Configuracao',
          badge: 'token',
          terms: 'github token owner repo branch localstorage config',
          paragraphs: [
            'No modo Firebase, GitHub e um backup global acionado manualmente pelo botao do shell.',
            'Cada pessoa usa seu proprio fine-grained token, guardado somente no localStorage daquele navegador.'
          ],
          bullets: [
            'Botao global: le o Firebase e cria um snapshot manual do workspace.',
            'Destino oficial: owner, repositorio e branch vem de firebase-config.js.',
            'localStorage antigo nao deve sobrescrever o destino oficial quando githubBackup esta configurado.',
            'Nao existe backup automatico, GitHub Actions ou agendamento de 30 minutos.',
            'Token recomendado: fine-grained, somente no repositorio e Contents read/write.',
            'GitHub App e chave privada nao fazem parte da arquitetura ativa.',
            'Formato tecnico: JSON em backup/data/.',
            'Formato publico: arquivos JS gerados em backup/latest/.',
            'A restauracao administrativa existe e deve ser testada primeiro em workspace descartavel.',
            'A chave senkolib_github_token guarda o token pessoal no navegador; ela nunca entra no commit.'
          ]
        },
        {
          title: 'Botoes globais, logica separada',
          badge: 'shell',
          terms: 'botao global github criacao rapida provider registerGithubProvider registerCreateProvider independencia',
          paragraphs: [
            'Os botoes de GitHub e criacao rapida ficam no shell porque sao controles globais.',
            'No modo Firebase, a infraestrutura registra um exportador global. Providers antigos por feature permanecem apenas como codigo historico ate a limpeza final.'
          ],
          note: 'Analogia: o shell oferece as tomadas. Biblioteca e Colecoes conectam seus proprios motores por contratos publicos.'
        },
        {
          title: 'Como salvar no GitHub',
          badge: 'api',
          terms: 'github contents api get put delete sha salvar excluir manifest',
          paragraphs: [
            'No modo Firebase, o navegador autenticado le os dados atuais do workspace e cria um unico commit pela Git Data API.',
            'O GitHub nao participa de criar, editar ou excluir dentro do SenkoLib.'
          ],
          bullets: [
            'Exportacao manual: qualquer membro que tambem tenha token com acesso ao repositorio pode usar o botao global.',
            'Nao existe exportacao automatica; a equipe e responsavel por acionar o backup.',
            'O token nunca entra no snapshot ou no Firestore.',
            'A janela mostra o destino fixo do projeto; no fluxo Firebase a pessoa nao escolhe outro repo pelo navegador.',
            'O historico Git preserva snapshots anteriores mesmo quando um item e excluido.',
            'Se dataVersion mudar durante a leitura, o exportador descarta a tentativa e le novamente antes de criar o commit.',
            'O mesmo commit gera o snapshot restauravel completo e o bundle publico apenas com a versao atual.',
            'Features nao escrevem no GitHub; somente a ferramenta global executa o backup.'
          ]
        },
        {
          title: 'Como restaurar um backup',
          badge: 'admin',
          terms: 'restaurar backup snapshot dry run force commit workspace firebase admin',
          paragraphs: [
            'Restauracao e uma operacao administrativa local. Ela nao aparece como botao para membros e exige acesso administrativo ao Firebase.',
            'O procedimento completo e os comandos ficam em docs/firebase/BACKUP_AND_RESTORE.md.'
          ],
          bullets: [
            'Executar --dry-run antes de qualquer escrita.',
            'Restaurar primeiro em um workspace descartavel.',
            'Sem --force, um workspace com conteudo e recusado.',
            '--force substitui conteudo e reservas, mas preserva membros e segredos.',
            'O teste automatizado usa npm run test:restore-emulator.'
          ]
        }
      ]
    },
    {
      id: 'guides',
      label: 'Guias',
      items: [
        {
          title: 'Checklist antes de alterar algo',
          badge: 'antes',
          terms: 'checklist antes alterar mexer guia dono feature testes manutencao',
          paragraphs: [
            'Use este checklist antes de tocar no codigo. Ele reduz mudancas feitas no lugar errado.'
          ],
          bullets: [
            'Identificar qual feature ou camada e dona do comportamento.',
            'Conferir se a mudanca e global, da feature ou apenas de prototipo.',
            'Verificar se existe dependencia escondida entre features.',
            'Planejar teste minimo antes de editar.',
            'Atualizar este guia se a mudanca alterar fluxo, regra, erro, arquivo ou responsabilidade.'
          ]
        },
        {
          title: 'Adicionar feature nova',
          badge: 'passo a passo',
          terms: 'adicionar feature nova register view scripts styles prototype independente pasta obrigatorio',
          paragraphs: [
            'Uma feature nova deve ficar isolada e se registrar no shell.',
            'A estrutura minima deve deixar claro onde fica tela, regra, estilo e persistencia.'
          ],
          bullets: [
            'Criar app/features/nova-feature ou app/prototype se for teste.',
            'Criar register.js para carregar arquivos e chamar SenkoShell.registerFeature.',
            'Criar view.js para montar a tela inicial da feature.',
            'Criar controllers, core e repositories quando essas responsabilidades existirem.',
            'Criar styles proprios usando tokens de shared.',
            'Usar app/infrastructure para servicos externos globais; nao duplicar clientes dentro da feature.',
            'Adicionar o register.js no index.html.',
            'Testar troca de abas, tema, console e remocao de outra feature.',
            'Executar npm run inventory:build para classificar os novos arquivos.',
            'Atualizar este guia com a nova feature.'
          ],
          note: 'A feature deve funcionar como uma loja com chave propria: ela usa a entrada do shopping, mas nao depende do estoque da loja vizinha.'
        },
        {
          title: 'Adicionar layout na Biblioteca',
          badge: 'biblioteca',
          terms: 'adicionar layout biblioteca arquivo individual manifest senkolib register registerLayout sintaxe duplicado',
          paragraphs: [
            'Layouts novos sao criados pela interface e persistidos no Firestore somente quando a pessoa confirma Salvar.',
            'Nao crie arquivos de dados manuais para cadastrar conteudo novo.'
          ],
          bullets: [
            'Entrar com uma conta membro e usar Criacao rapida > Layout.',
            'Preencher nome, tags, HTML e CSS; o ID tecnico e gerado automaticamente.',
            'Salvar executa uma transacao e cria uma revisao imutavel.',
            'O listener atualiza os outros computadores depois do save.',
            'O GitHub so recebe essa versao quando alguem fizer o backup global.',
            'Testar se aparece no grid.',
            'Testar abrir, copiar, editar e criar variante.'
          ]
        },
        {
          title: 'Editar o HTML Basico',
          badge: 'biblioteca',
          terms: 'html basico copy base editar modal firebase singleton settings copyBase conflito',
          paragraphs: [
            'O botao de lapis ao lado de HTML Basico abre o template compartilhado que sera copiado por toda a equipe.',
            'Enquanto o documento ainda nao existe no Firestore, a Biblioteca usa o template local; o primeiro salvamento cria settings/copyBase.'
          ],
          bullets: [
            'Entrar com uma conta membro e abrir Biblioteca.',
            'Usar o botao Editar HTML basico, revisar o codigo e salvar no Firebase.',
            'Cada save incrementa version e dataVersion na mesma transacao.',
            'Se outra pessoa salvar antes, o rascunho local e preservado e o save atrasado e recusado.',
            'O proximo backup global inclui o singleton no snapshot tecnico e em backup/latest/biblioteca.js.',
            'No modo estatico, copiar continua disponivel e editar permanece bloqueado.'
          ]
        },
        {
          title: 'Adicionar ou editar variante',
          badge: 'variante',
          terms: 'adicionar editar variante variacao biblioteca nome duplicado manifest section layout',
          paragraphs: [
            'Variantes pertencem a um layout da Biblioteca e precisam manter nome unico dentro daquele layout.',
            'Variantes novas sao documentos do Firestore e aparecem no fallback depois do proximo backup global.'
          ],
          bullets: [
            'Conferir qual layout e dono da variante.',
            'Abrir o layout dono e usar a acao de criar ou editar variante.',
            'Salvar pelo editor oficial para manter revisao e deteccao de conflito.',
            'Variacoes pertencem a subcolecao do layout no Firestore.',
            'Bloquear nome repetido ao criar e ao editar.',
            'As variantes aparecem em ordem alfabetica/natural pelo nome, sem reordenar o manifest.',
            'Testar abrir o layout, selecionar variante, editar, salvar e recarregar.'
          ]
        },
        {
          title: 'Adicionar colecao',
          badge: 'colecoes',
          terms: 'adicionar colecao arquivo individual collib registerCollection manifest grupos slug',
          paragraphs: [
            'Colecoes novas sao criadas pela interface e persistidas no Firestore.',
            'O snapshot gerado e somente leitura e nunca substitui o banco atual.'
          ],
          bullets: [
            'Entrar como membro e usar Criacao rapida > Colecao.',
            'Escolher um grupo existente ou criar o grupo pela interface.',
            'Salvar cria o documento, a reserva de nome e os campos de auditoria.',
            'Testar card, abertura e edicao.'
          ]
        },
        {
          title: 'Adicionar layout em colecao',
          badge: 'layout colecao',
          terms: 'adicionar editar layout colecao nome duplicado collib grupo',
          paragraphs: [
            'Layout dentro de colecao e dado da feature Colecoes, nao da Biblioteca.',
            'O layout e salvo na subcolecao da colecao escolhida e recebe revisao propria.'
          ],
          bullets: [
            'Abrir a colecao e usar a acao de criar layout.',
            'Preencher nome e HTML completo no editor oficial.',
            'Salvar pela interface para manter versao, revisao e auditoria.',
            'Garantir nome unico dentro da colecao.',
            'Os layouts aparecem em ordem alfabetica/natural pelo nome sem reescrever dados.',
            'Nao importar funcoes internas da Biblioteca.',
            'Testar criar, editar, excluir e recarregar a colecao.'
          ]
        },
        {
          title: 'Editar layout ou variacao',
          badge: 'editor',
          terms: 'editar layout variacao editor oficial layout-editor id gerado tags preview salvar excluir',
          paragraphs: [
            'O editor oficial da Biblioteca fica dentro da propria feature e substitui os modais antigos.',
            'Ele edita nome, tags, HTML, CSS e preview, mas nao deve editar o ID tecnico.'
          ],
          bullets: [
            'Script: app/features/biblioteca/controllers/layout-editor.js.',
            'CSS: app/features/biblioteca/styles/layout-editor.css.',
            'Campo editavel: nome do layout ou nome da variacao.',
            'Campo nao editavel: ID gerado.',
            'Salvar layout ou variacao executa transacao no Firestore.',
            'Cada save cria revisao e falha se a revisao-base estiver desatualizada.'
          ],
          note: 'Se precisar mudar ID, trate como migracao: criar novo arquivo, atualizar manifest, mover referencias e remover o antigo.'
        },
        {
          title: 'Editar layout completo de Colecoes',
          badge: 'editor',
          terms: 'editar layout completo colecoes editor html css preview largura responsivo independente',
          paragraphs: [
            'Colecoes possui um editor amplo para alterar nome e HTML completo enquanto acompanha o preview ao vivo.',
            'A interface acompanha o editor da Biblioteca, mas a implementacao permanece integralmente dentro da feature Colecoes.'
          ],
          bullets: [
            'Script: app/features/colecoes/controllers/layout-editor.js.',
            'CSS: app/features/colecoes/styles/layout-editor.css.',
            'Persistencia: app/features/colecoes/repositories/firebase-repository.js.',
            'O editor trabalha com HTML completo e incorpora CSS separado ao HTML quando necessario.',
            'Nunca importar o editor ou os estilos da Biblioteca para oferecer esta tela.'
          ],
          note: 'Experiencia consistente nao significa dependencia entre features: cada editor continua funcionando se a outra feature for removida.'
        },
        {
          title: 'Alterar estilos',
          badge: 'css',
          terms: 'estilos css tokens tema cores shared shell feature',
          paragraphs: [
            'Estilo deve ficar no dono certo.'
          ],
          bullets: [
            'Cores e tema: shared/styles/senko-tokens.css.',
            'Componentes neutros: shared/styles/senko-components.css.',
            'Header e abas: shell/styles/styles.css.',
            'Visual especifico: pasta styles da propria feature.',
            'Nunca depender diretamente do CSS de outra feature.'
          ]
        },
        {
          title: 'Checklist antes de mexer no GitHub',
          badge: 'github',
          terms: 'checklist github token owner repo branch provider contents api sha',
          paragraphs: [
            'GitHub precisa ser tratado com cuidado porque mexe em arquivos reais do repositorio.'
          ],
          bullets: [
            'Confirmar se a mudanca pertence ao exportador global Firebase ou a ferramenta de backup.',
            'Verificar owner, repo e branch configurados.',
            'Testar sem token para ver se a tela de erro aparece.',
            'Testar com fine-grained token limitado ao repositorio e Contents read/write.',
            'Conferir se o commit usa tree atomica e atualiza a branch sem force.',
            'Conferir manifest.json, remocao de arquivos obsoletos e ausencia de segredos.',
            'Atualizar o guia se a mensagem de erro, permissao ou fluxo mudar.'
          ]
        },
        {
          title: 'Checklist antes de publicar',
          badge: 'publicar',
          terms: 'checklist publicar deploy github pages reload cache guia documentacao',
          paragraphs: [
            'Antes de entregar uma mudanca, garanta que o projeto nao ficou bom so na aba que voce testou.'
          ],
          bullets: [
            'Abrir a pagina em servidor local.',
            'Trocar entre todas as features carregadas.',
            'Testar tema claro e escuro.',
            'Testar reload comum para validar cache.',
            'Verificar console sem erros novos.',
            'Revisar se este guia foi atualizado.',
            'Conferir se comentarios importantes continuam explicando a regra de independencia.'
          ]
        },
        {
          title: 'Checklist de teste',
          badge: 'qa',
          terms: 'testar checklist abas tema github token duplicado console reload',
          paragraphs: [
            'Depois de alterar o projeto, rode um teste minimo.'
          ],
          bullets: [
            'Abrir o projeto.',
            'Trocar entre todas as abas.',
            'Testar tema claro e escuro.',
            'Verificar console do navegador.',
            'Testar criar, editar e excluir quando a mudanca tocar dados.',
            'Testar nome duplicado.',
            'Testar sem token e com token se mexeu no GitHub.',
            'Testar reload comum.'
          ]
        }
      ]
    },
    {
      id: 'errors',
      label: 'Erros comuns',
      items: [
        {
          title: 'A feature nao aparece',
          badge: 'aba',
          terms: 'feature nao aparece aba register index shell console',
          paragraphs: [
            'Geralmente acontece quando o register.js nao foi carregado ou nao registrou a feature.'
          ],
          bullets: [
            'Conferir se o index.html carrega o register.js.',
            'Conferir se existe SenkoShell.registerFeature.',
            'Verificar erro no console.',
            'Verificar caminho do arquivo.'
          ]
        },
        {
          title: 'Dado salvo, mas nao aparece',
          badge: 'dados',
          terms: 'dado salvo nao aparece firebase listener snapshot layout colecao variante',
          paragraphs: [
            'No modo Firebase, a feature acompanha consultas em tempo real. No modo static, ela mostra exatamente o conteudo do ultimo backup.'
          ],
          bullets: [
            'Conferir SenkoDataMode.getState() e o selo do header.',
            'Em firebase, conferir erros de listener, permissao e consulta no console.',
            'Em static, fazer novo backup GitHub para publicar a ultima alteracao.',
            'Confirmar que backup/latest foi atualizado no commit.',
            'Nao editar o snapshot gerado para tentar corrigir dados atuais.'
          ]
        },
        {
          title: 'Mensagem: nao encontrado ao editar',
          badge: 'documento',
          terms: 'nao encontrado editar colecao layout firebase document id slug caminho',
          paragraphs: [
            'O item pode ter sido removido por outra pessoa ou a tela pode estar usando uma referencia desatualizada.'
          ],
          bullets: [
            'Fechar o editor e abrir o item novamente pela lista atualizada.',
            'Conferir se o documento ainda existe no Firestore.',
            'Verificar no console o caminho e o ID informados pelo repositorio.',
            'Nao recriar o documento com o mesmo ID sem entender a exclusao.'
          ]
        },
        {
          title: 'Layout novo nao aparece na Biblioteca',
          badge: 'biblioteca',
          terms: 'layout novo nao aparece biblioteca registerLayout manifest id duplicado sintaxe',
          paragraphs: [
            'Se o save terminou, mas o layout nao aparece, confirme a fonte de dados e o listener da Biblioteca.'
          ],
          bullets: [
            'Confirmar que a tela esta em modo firebase e que a conta ainda e membro.',
            'Verificar se a transacao retornou sucesso e se o documento existe.',
            'Verificar erros do listener no console.',
            'Em modo static, somente um novo backup atualiza o grid publico.',
            'Nao pode existir outro layout com nome visualmente equivalente.'
          ]
        },
        {
          title: 'Variante nova nao aparece',
          badge: 'variante',
          terms: 'variante variacao nova nao aparece registerVariantFile layoutId manifest',
          paragraphs: [
            'A variante precisa estar na subcolecao do layout pai e chegar pelo listener correspondente.'
          ],
          bullets: [
            'O layoutId deve ser o ID tecnico do layout pai.',
            'Conferir a subcolecao variants do documento no Firestore.',
            'Fechar e reabrir o layout para descartar uma selecao antiga.',
            'Em modo static, gerar e publicar um novo backup.',
            'Nao pode existir outra variante com o mesmo nome dentro do layout.'
          ]
        },
        {
          title: 'Botao de salvar nao aparece',
          badge: 'interface',
          terms: 'botao salvar nao aparece github localhost live server file modal layout variacao colecao',
          paragraphs: [
            'No modo Firebase autorizado, os controles de salvar devem aparecer. No backup publico, a ausencia desses controles e intencional porque o modo e somente leitura.',
            'Use o selo Somente leitura e SenkoDataMode.getState() para distinguir fallback correto de uma falha de carregamento.'
          ],
          bullets: [
            'Conferir se SenkoDataMode esta em firebase e a sessao possui member.',
            'Conferir se o modal foi montado antes de buscar seus controles.',
            'Conferir se o cargo permite escrita e se as regras foram publicadas.',
            'Abrir o console para identificar falha de repositorio ou permissao.'
          ]
        },
        {
          title: 'GitHub nao salva',
          badge: 'token',
          terms: 'github nao salva token owner repo permissao branch erro',
          paragraphs: [
            'Falhas de GitHub normalmente estao ligadas a token, permissao, destino fixo do projeto ou branch.'
          ],
          bullets: [
            'Verificar owner, repo e branch em firebase-config.js.',
            'Recarregar a pagina publicada para receber a versao que ignora localStorage antigo.',
            'Verificar se o token existe.',
            'Verificar se o token expirou.',
            'Verificar permissoes de escrita.',
            'Abrir console para ver a mensagem exata.'
          ]
        },
        {
          title: 'Mensagem: token nao encontrado',
          badge: 'mensagem',
          terms: 'mensagem token nao encontrado ausente github configurar credenciais',
          paragraphs: [
            'Acontece quando a ferramenta de backup tenta usar o GitHub sem token configurado.'
          ],
          bullets: [
            'Abrir o botao global de GitHub.',
            'Informar somente o token quando o destino fixo do projeto ja estiver configurado.',
            'Confirmar se app/infrastructure/github/backup-service.js carregou antes de app/tools/github-backup/register.js.',
            'A operacao deve parar com erro claro, sem afetar saves no Firebase.'
          ]
        },
        {
          title: 'Mensagem: permissao negada',
          badge: '403',
          terms: 'mensagem permissao negada forbidden 403 github token scope contents repo',
          paragraphs: [
            'Normalmente significa token sem permissao suficiente ou repo errado.'
          ],
          bullets: [
            'Preferir token fine-grained; nao compartilhar token classic entre a equipe.',
            'O fine-grained token precisa de Contents read/write somente no repositorio certo.',
            'Conferir se firebase-config.js aponta para o projeto correto.',
            'Conferir se a branch existe.'
          ]
        },
        {
          title: 'Mensagem: arquivo nao encontrado no GitHub',
          badge: '404',
          terms: 'mensagem arquivo nao encontrado 404 github contents path caminho branch',
          paragraphs: [
            'A API nao encontrou o arquivo no caminho usado pela integracao.'
          ],
          bullets: [
            'Conferir caminho exato do arquivo no provider da feature.',
            'Conferir se a branch configurada e a branch onde o arquivo existe.',
            'Se o arquivo for novo, a criacao deve usar PUT sem SHA.',
            'Se o arquivo ja existe, buscar SHA antes de atualizar.'
          ]
        },
        {
          title: 'Mensagem: conflito de SHA',
          badge: '409',
          terms: 'mensagem conflito sha github 409 arquivo desatualizado concorrencia',
          paragraphs: [
            'Acontece quando o arquivo remoto mudou depois que a tela carregou ou quando a integracao usa SHA antigo.'
          ],
          bullets: [
            'Buscar o arquivo novamente antes de salvar.',
            'Usar o SHA retornado pelo GET mais recente.',
            'Evitar sobrescrever conteudo sem confirmar o estado remoto.',
            'Recarregar a tela e repetir o fluxo se alguem alterou o arquivo por fora.'
          ]
        },
        {
          title: 'Nome duplicado',
          badge: 'validacao',
          terms: 'nome duplicado layout variante colecao editar criar',
          paragraphs: [
            'O projeto bloqueia nomes repetidos para evitar arquivos confusos e dados quebrados.'
          ],
          bullets: [
            'Nao pode repetir nome de layout.',
            'Nao pode repetir nome de variante no mesmo layout.',
            'Nao pode repetir nome de colecao.',
            'Nao pode repetir nome de layout dentro da mesma colecao.'
          ]
        },
        {
          title: 'Mensagem: aparece mais de uma vez no arquivo',
          badge: 'duplicado',
          terms: 'mensagem aparece mais de uma vez arquivo variante layout colecao duplicado corrigir',
          paragraphs: [
            'Esse alerta indica que o dado ja chegou duplicado ao arquivo ou que uma edicao permitiu nome repetido.'
          ],
          bullets: [
            'Encontrar os itens repetidos no arquivo indicado.',
            'Renomear ou remover o duplicado manualmente quando necessario.',
            'Verificar se a validacao bloqueia duplicidade tanto ao criar quanto ao editar.',
            'Testar novamente depois de recarregar a pagina.'
          ]
        },
        {
          title: 'Mensagem: Cannot read properties',
          badge: 'js',
          terms: 'mensagem cannot read properties undefined null javascript elemento ausente',
          paragraphs: [
            'Geralmente significa que o codigo tentou usar um elemento, dado ou funcao que ainda nao existe.'
          ],
          bullets: [
            'Conferir se o script foi carregado na ordem correta.',
            'Conferir se a feature criou a view antes de buscar elementos.',
            'Conferir se o repositorio entregou o dado antes do controller usa-lo.',
            'Conferir se uma feature nao esta chamando codigo de outra.'
          ]
        },
        {
          title: 'Mensagem: Failed to fetch',
          badge: 'rede',
          terms: 'mensagem failed to fetch rede github api cors internet token',
          paragraphs: [
            'Pode ser falha de rede, URL errada, bloqueio do navegador ou problema ao falar com a API do GitHub.'
          ],
          bullets: [
            'Conferir conexao com internet.',
            'Conferir URL montada para a GitHub Contents API.',
            'Conferir se o token nao esta vazio.',
            'Abrir o console e verificar a requisicao que falhou.'
          ]
        },
        {
          title: 'Cache antigo',
          badge: 'reload',
          terms: 'cache reload ctrl shift r service worker senko_reload',
          paragraphs: [
            'Em producao, CSS e JavaScript usam a versao meta senko-release para o navegador reaproveitar o cache entre reloads.',
            'Os tres arquivos do backup publico recebem uma chave nova em toda abertura, entao dados atualizados nao dependem de limpar o cache.'
          ],
          bullets: [
            'Testar reload normal.',
            'Incrementar meta[name="senko-release"] quando codigo ou CSS mudar.',
            'Backup-only nao exige incremento porque manifest.js, biblioteca.js e colecoes.js sao sempre frescos.',
            'sw.js nao intercepta assets; ele apenas limpa caches historicos durante atualizacoes.',
            'Testar servidor local.',
            'Conferir caminho do arquivo alterado.',
            'Verificar se o navegador nao esta usando aba antiga.'
          ]
        },
        {
          title: 'Sources nao mostra Base.html',
          badge: 'sources',
          terms: 'sources base html selecionar base oculto modo medicao',
          paragraphs: [
            'Isso e esperado no modo padrao. O botao de Base.html so aparece quando o modo de medicao e Base.html.'
          ]
        },
        {
          title: 'Grupo vazio nao aparece na barra',
          badge: 'colecoes',
          terms: 'grupo vazio barra pill filtro colecoes apagado',
          paragraphs: [
            'Um grupo vazio pode nao aparecer como pill de filtro, mas isso nao significa que ele foi apagado.',
            'O dado deve continuar em col-groups-data.js.'
          ]
        }
      ]
    },
    {
      id: 'product-spec',
      label: 'Especificacao',
      items: [
        {
          title: 'Fonte de verdade',
          badge: 'contrato',
          terms: 'fonte verdade firebase firestore snapshot static dados',
          paragraphs: [
            'Firestore e a unica fonte editavel. O snapshot em backup/latest e a unica fonte de contingencia e funciona somente para leitura.',
            'O GitHub armazena o resultado do backup, mas nao participa do salvamento diario de layouts ou colecoes.'
          ],
          bullets: [
            'Firebase pronto: listeners em tempo real alimentam as features.',
            'Firebase indisponivel: o ultimo snapshot publico alimenta as features.',
            'Sem Firebase e sem snapshot: a feature abre vazia e informa a falha.',
            'Nunca codificar dados atuais dentro de controller, view ou core.'
          ]
        },
        {
          title: 'Quando uma alteracao e enviada',
          badge: 'salvar',
          terms: 'salvar tecla rascunho enviar firestore tempo real',
          paragraphs: [
            'Digitar em um editor altera somente o rascunho daquele navegador. O Firestore recebe dados quando a pessoa confirma Salvar.',
            'Depois do commit, os listeners atualizam outros computadores automaticamente.'
          ],
          note: 'Nao adicione autosave por tecla: ele aumenta leituras/escritas, dificulta conflito e muda uma decisao central do produto.'
        },
        {
          title: 'Conflito de edicao',
          badge: 'concorrencia',
          terms: 'conflito revisao baseRevisionId sobrescrita duas pessoas',
          paragraphs: [
            'Duas pessoas podem abrir o mesmo item. Cada editor guarda a revisao usada como base e a transacao compara esse valor ao servidor.',
            'Se outra pessoa salvou primeiro, a segunda tentativa e recusada; nenhuma sobrescrita silenciosa e permitida.'
          ],
          bullets: [
            'currentRevisionId identifica a versao atual.',
            'baseRevisionId identifica a versao aberta pelo editor.',
            'Erro aborted significa que o usuario precisa comparar ou recarregar.',
            'O rascunho local deve ser preservado enquanto o aviso estiver visivel.'
          ]
        },
        {
          title: 'Cargos e limites',
          badge: 'seguranca',
          terms: 'owner admin editor permissoes aprovar promover excluir',
          paragraphs: [
            'Owner, admin e editor podem manter conteudo. A diferenca aparece na gestao de pessoas.'
          ],
          bullets: [
            'Owner gerencia todos os cargos e pode criar outro owner.',
            'Admin aprova e gerencia somente editores; apenas owner concede admin ou owner.',
            'Editor nao concede acesso a outras contas.',
            'Esconder botao nao basta: Security Rules repetem esses limites.',
            'Cargo do Console Firebase nao substitui o documento de membro do SenkoLib.'
          ]
        },
        {
          title: 'Exclusao',
          badge: 'dados',
          terms: 'excluir apagar revisoes reserva grupo vazio',
          paragraphs: [
            'Exclusoes sao diretas depois da confirmacao. O fluxo remove filhos, revisoes e reserva de nome relacionados ao recurso.',
            'Grupos so podem ser excluidos quando nenhuma colecao os utiliza.'
          ]
        },
        {
          title: 'Estados do Firebase',
          badge: 'saude',
          terms: 'firebase ready degraded unavailable static status limite leituras',
          bullets: [
            'Pronto: sessao autorizada e listeners ativos.',
            'Degradado: uma operacao falhou; o status continua visivel e o erro nao e escondido.',
            'Indisponivel com snapshot: interface publica somente leitura.',
            'Indisponivel sem snapshot: conteudo vazio com aviso.',
            'Atingir a cota pode causar recusas ate a renovacao do limite; nao existe leitura ilimitada local escondida.'
          ]
        },
        {
          title: 'Criterio de pronto',
          badge: 'entrega',
          terms: 'pronto done teste documentacao guide regra erro permissao',
          bullets: [
            'Comportamento principal funciona.',
            'Estado de erro foi exercitado.',
            'Permissao existe na UI e nas regras.',
            'Teste cobre o contrato de maior risco.',
            'Documentacao canonica e Guide ensinam o comportamento atual.',
            'Inventario foi reconstruido quando arquivos mudaram.'
          ]
        }
      ]
    },
    {
      id: 'developer-flow',
      label: 'Desenvolvimento',
      items: [
        {
          title: 'Como ler uma feature',
          badge: 'junior',
          terms: 'ler feature register view core repository controller ordem',
          paragraphs: [
            'Comece no register.js para entender a ordem e as dependencias. Depois leia view, core, repository e por ultimo o controller do fluxo que sera alterado.'
          ],
          bullets: [
            'register.js responde o que carrega e quando.',
            'view.js responde quais elementos existem.',
            'core responde quais invariantes vivem em memoria.',
            'repository responde de onde os dados vem.',
            'controller responde como a pessoa interage.'
          ]
        },
        {
          title: 'Seguir um salvamento',
          badge: 'debug',
          terms: 'seguir salvar debug controller repository writes rules listener',
          bullets: [
            'Encontre o click no controller.',
            'Confira o payload enviado ao repository.',
            'Siga para senko-firestore-writes.js.',
            'Compare os campos com firebase/firestore.rules.',
            'Confira o mapper do repository de leitura.',
            'Verifique o listener que chama render ou atualiza o editor.'
          ]
        },
        {
          title: 'Comentarios de qualidade',
          badge: 'codigo',
          terms: 'comentarios documentar motivo contrato invariante manutencao',
          paragraphs: [
            'Comente motivo, contrato, ordem, seguranca e risco. Nao repita em portugues uma atribuicao que ja e obvia no codigo.'
          ],
          bullets: [
            'Todo modulo complexo deve ter cabecalho de responsabilidade e limites.',
            'Fluxos atomicos ou assincronos devem explicar por que a ordem importa.',
            'Listeners devem explicar quando sao cancelados.',
            'HTML de dados externos deve trazer comentario de escape/sanitizacao.',
            'Workaround deve explicar quando pode ser removido.'
          ]
        },
        {
          title: 'Mudanca de campo Firestore',
          badge: 'checklist',
          terms: 'campo firestore schema mapper rules teste documentacao',
          bullets: [
            'Atualizar payload de escrita.',
            'Atualizar mapper de leitura.',
            'Atualizar Security Rules e limites.',
            'Considerar documentos existentes antes de fechar o schema.',
            'Atualizar teste de regras.',
            'Atualizar DATA_MODEL.md e especificacao quando for comportamento de produto.'
          ]
        },
        {
          title: 'Arquivos gerados',
          badge: 'nao editar',
          terms: 'generated snapshot inventario package lock editar gerar',
          paragraphs: [
            'Arquivos em generated e lockfiles sao resultados de processos. Altere a fonte ou o gerador e reconstrua a saida.'
          ],
          bullets: [
            'Inventario: npm run inventory:build.',
            'Snapshot publico: fluxo de backup ou npm run backup:build-static sobre um snapshot tecnico valido.',
            'package-lock: npm install.',
            'Nunca corrigir dado atual editando backup/latest manualmente.'
          ]
        },
        {
          title: 'Documentos para consultar',
          badge: 'docs',
          terms: 'documentos especificacao runtime contratos development guide docs',
          bullets: [
            'docs/PRODUCT_SPECIFICATION.md: contrato do produto.',
            'docs/DEVELOPMENT_GUIDE.md: rotina e depuracao.',
            'docs/architecture/RUNTIME_FLOW.md: inicio, listeners e backup.',
            'docs/architecture/MODULE_CONTRACTS.md: limites entre camadas.',
            'docs/firebase/DATA_MODEL.md: caminhos e campos.',
            'docs/firebase/TEST_PLAN.md: regressao e regras.'
          ]
        }
      ]
    },
    {
      id: 'rules',
      label: 'Regras',
      items: [
        {
          title: 'Regras que nao podem quebrar',
          badge: 'importante',
          terms: 'regras independencia nao misturar shared feature shell github guia atualizar',
          paragraphs: [
            'Essas regras mantem o projeto facil de entender e seguro para evoluir.'
          ],
          bullets: [
            'Uma feature nao deve depender de outra feature.',
            'Codigo de uma feature nao deve ficar na pasta de outra.',
            'O shell nao deve conhecer detalhes internos das features.',
            'Shared deve ter apenas coisas realmente globais.',
            'O backup GitHub ativo fica separado em app/infrastructure/github e app/tools/github-backup.',
            'Token do GitHub nunca entra no codigo.',
            'Nao permitir nomes duplicados.',
            'Grupos de Colecoes nao devem ser apagados automaticamente.',
            'Novos dados editaveis pertencem ao Firestore; o backup gera automaticamente o bundle publico.',
            'ID tecnico nao deve ser editado como campo comum.',
            'Ordenacao alfabetica deve acontecer na renderizacao, sem reescrever dados so para ordenar.',
            'Toda alteracao precisa ser testada em mais de uma aba.',
            'Toda alteracao relevante precisa atualizar este guia.'
          ]
        },
        {
          title: 'Nao faca isso',
          badge: 'perigo',
          terms: 'nao faca isso proibido dependencia misturar feature shared shell dados',
          paragraphs: [
            'Esta lista existe para evitar os problemas que mais deixam o projeto dificil de entender.'
          ],
          bullets: [
            'Nao colocar codigo de Imagens dentro de Sources, ou o inverso.',
            'Nao colocar regra interna de feature em shared.',
            'Nao fazer Colecoes depender de funcoes internas da Biblioteca.',
            'Nao fazer o shell conhecer detalhes como layouts, variantes ou grupos.',
            'Nao salvar token do GitHub no codigo.',
            'Nao deixar duas colecoes, layouts, variantes ou layouts de colecao com o mesmo nome.',
            'Nao editar manualmente os arquivos em backup/latest/.',
            'Nao editar ID gerado pelo editor como se fosse nome de exibicao.',
            'Nao deixar tela oficial dentro de prototype depois que virou fluxo oficial.',
            'Nao finalizar mudanca sem atualizar o guia quando o comportamento documentado mudou.'
          ]
        },
        {
          title: 'Guia faz parte da entrega',
          badge: 'obrigatorio',
          terms: 'guia documentacao entrega obrigatorio prioridade maxima ai atualizar',
          paragraphs: [
            'O guia nao e detalhe extra. Ele e uma parte oficial do projeto.',
            'Quem alterar o SenkoLib precisa deixar o guia coerente com o codigo atual.'
          ],
          bullets: [
            'Mudou arquitetura: atualizar Arquitetura e Pastas.',
            'Mudou uma feature: atualizar Features, Guias e Erros comuns se necessario.',
            'Mudou GitHub: atualizar GitHub, Guias e Erros comuns.',
            'Mudou estilo global: atualizar Guias e Regras.',
            'Mudou validacao ou mensagem de erro: atualizar Erros comuns.',
            'Se uma IA estiver trabalhando no projeto, ela deve revisar este arquivo antes de responder que terminou.'
          ],
          note: 'Regra simples: se a explicacao antiga ensinaria algo errado, o guia precisa mudar junto.'
        }
      ]
    }
  ];

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function normalize(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function highlight(value, query) {
    var safe = escapeHtml(value);
    var q = normalize(query).trim();
    if (!q) return safe;

    var original = String(value || '');
    var normalized = normalize(original);
    var index = normalized.indexOf(q);
    if (index === -1) return safe;

    var before = escapeHtml(original.slice(0, index));
    var match = escapeHtml(original.slice(index, index + q.length));
    var after = escapeHtml(original.slice(index + q.length));
    return before + '<mark class="senko-guide-mark">' + match + '</mark>' + after;
  }

  function itemText(item) {
    return normalize([
      item.title,
      item.badge,
      item.terms,
      (item.paragraphs || []).join(' '),
      (item.bullets || []).join(' '),
      (item.actions || []).map(function (action) { return action.label; }).join(' '),
      item.note || ''
    ].join(' '));
  }

  function matches(item, query) {
    var q = normalize(query).trim();
    if (!q) return true;
    return itemText(item).indexOf(q) !== -1;
  }

  function allItemsForCategory(categoryId) {
    if (categoryId === 'all') {
      return GUIDE.reduce(function (acc, group) {
        return acc.concat(group.items.map(function (item) {
          return Object.assign({ categoryLabel: group.label, categoryId: group.id }, item);
        }));
      }, []);
    }

    var group = GUIDE.find(function (entry) { return entry.id === categoryId; });
    if (!group) return [];
    return group.items.map(function (item) {
      return Object.assign({ categoryLabel: group.label, categoryId: group.id }, item);
    });
  }

  function renderNav() {
    navEl.innerHTML = '';

    var title = document.createElement('div');
    title.className = 'senko-guide-nav-title';
    title.textContent = 'Categorias';
    navEl.appendChild(title);

    var allCount = allItemsForCategory('all').length;
    var allButton = document.createElement('button');
    allButton.type = 'button';
    allButton.className = 'senko-guide-tab' + (activeCategory === 'all' ? ' is-active' : '');
    allButton.dataset.guideCategory = 'all';
    allButton.innerHTML =
      '<span>Todos</span>' +
      '<span class="senko-guide-tab-count">' + allCount + '</span>';
    allButton.addEventListener('click', function () {
      activeCategory = 'all';
      render();
    });
    navEl.appendChild(allButton);

    GUIDE.forEach(function (group) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'senko-guide-tab' + (group.id === activeCategory ? ' is-active' : '');
      button.dataset.guideCategory = group.id;
      button.innerHTML =
        '<span>' + escapeHtml(group.label) + '</span>' +
        '<span class="senko-guide-tab-count">' + group.items.length + '</span>';
      button.addEventListener('click', function () {
        activeCategory = group.id;
        render();
      });
      navEl.appendChild(button);
    });
  }

  function createTextBlock(tag, value, query) {
    var el = document.createElement(tag);
    el.innerHTML = highlight(value, query);
    return el;
  }

  function runAction(action) {
    if (!action) return;

    if (action.category) {
      activeCategory = action.category;
      if (searchInput) searchInput.value = '';
      render();
      return;
    }

    if (action.feature && window.SenkoShell && typeof window.SenkoShell.switchFeature === 'function') {
      if (window.SenkoShell.switchFeature(action.feature)) closeGuide();
      return;
    }

    if (action.githubConfig) {
      var button = document.getElementById('senkoGithubConfigBtn');
      closeGuide();
      if (button && !button.hidden && !button.disabled) button.click();
    }
  }

  function renderCard(item, query) {
    var card = document.createElement('article');
    card.className = 'senko-guide-card';

    var head = document.createElement('div');
    head.className = 'senko-guide-card-head';
    head.innerHTML =
      '<h3>' + highlight(item.title, query) + '</h3>' +
      '<span class="senko-guide-badge">' + escapeHtml(item.badge || item.categoryLabel || 'guia') + '</span>';
    card.appendChild(head);

    (item.paragraphs || []).forEach(function (paragraph) {
      card.appendChild(createTextBlock('p', paragraph, query));
    });

    if (item.bullets && item.bullets.length) {
      var list = document.createElement('ul');
      item.bullets.forEach(function (bullet) {
        var li = document.createElement('li');
        li.innerHTML = highlight(bullet, query);
        list.appendChild(li);
      });
      card.appendChild(list);
    }

    if (item.note) {
      var note = document.createElement('div');
      note.className = 'senko-guide-note';
      note.innerHTML = '<strong>Nota:</strong> ' + highlight(item.note, query);
      card.appendChild(note);
    }

    if (item.actions && item.actions.length) {
      var actions = document.createElement('div');
      actions.className = 'senko-guide-actions';

      item.actions.forEach(function (action) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'senko-guide-action';
        button.textContent = action.label;
        button.addEventListener('click', function () {
          runAction(action);
        });
        actions.appendChild(button);
      });

      card.appendChild(actions);
    }

    return card;
  }

  function render() {
    var query = searchInput ? searchInput.value : '';
    var hasQuery = normalize(query).trim().length > 0;
    var sourceCategory = hasQuery ? 'all' : activeCategory;
    var items = allItemsForCategory(sourceCategory).filter(function (item) {
      return matches(item, query);
    });

    renderNav();
    contentEl.innerHTML = '';
    contentEl.appendChild(emptyEl);

    items.forEach(function (item) {
      contentEl.appendChild(renderCard(item, query));
    });

    emptyEl.classList.toggle('is-visible', items.length === 0);
    counterEl.textContent = items.length + ' resultado' + (items.length === 1 ? '' : 's') + (hasQuery ? ' no guia' : '');
  }

  function createModal() {
    if (overlay) return;

    overlay = document.createElement('div');
    overlay.className = 'senko-guide-overlay';
    overlay.hidden = true;
    overlay.innerHTML =
      '<section class="senko-guide-modal" role="dialog" aria-modal="true" aria-labelledby="senkoGuideTitle">' +
      '  <header class="senko-guide-head">' +
      '    <div class="senko-guide-title">' +
      '      <div class="senko-guide-kicker">Guia oficial</div>' +
      '      <h2 id="senkoGuideTitle">Documentacao do SenkoLib</h2>' +
      '      <p>Arquitetura, guias rapidos, regras e erros comuns do projeto.</p>' +
      '    </div>' +
      '    <button class="senko-modal-close modal-close senko-guide-close" id="senkoGuideCloseBtn" type="button" title="Fechar" aria-label="Fechar">' +
      '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      '    </button>' +
      '  </header>' +
      '  <div class="senko-guide-searchbar">' +
      '    <label class="senko-guide-search-wrap">' +
      '      <svg class="senko-guide-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>' +
      '      <input class="senko-guide-search" id="senkoGuideSearch" type="search" placeholder="Buscar por shell, manifest, token, cache, feature..." autocomplete="off">' +
      '    </label>' +
      '    <div class="senko-guide-counter" id="senkoGuideCounter">0 resultados</div>' +
      '  </div>' +
      '  <div class="senko-guide-layout">' +
      '    <nav class="senko-guide-nav" id="senkoGuideNav" aria-label="Categorias do guia"></nav>' +
      '    <main class="senko-guide-content" id="senkoGuideContent">' +
      '      <div class="senko-guide-empty" id="senkoGuideEmpty">Nada encontrado. Tente buscar por outro termo.</div>' +
      '    </main>' +
      '  </div>' +
      '</section>';

    document.body.appendChild(overlay);

    searchInput = document.getElementById('senkoGuideSearch');
    contentEl = document.getElementById('senkoGuideContent');
    navEl = document.getElementById('senkoGuideNav');
    counterEl = document.getElementById('senkoGuideCounter');
    emptyEl = document.getElementById('senkoGuideEmpty');

    searchInput.addEventListener('input', render);
    document.getElementById('senkoGuideCloseBtn').addEventListener('click', closeGuide);
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) closeGuide();
    });

    render();
  }

  function openGuide() {
    createModal();
    /*
     * A API publica pode ser chamada mais de uma vez. Guardamos o overflow
     * original somente na transicao de fechado para aberto para nao perder o
     * estado real da pagina.
     */
    if (overlay.hidden) {
      previousBodyOverflow = document.body.style.overflow;
    }
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    var button = document.getElementById('senkoGuideBtn');
    if (button) button.classList.add('is-active');
    window.setTimeout(function () {
      if (searchInput) searchInput.focus();
    }, 0);
  }

  function closeGuide() {
    if (!overlay) return;
    overlay.hidden = true;
    document.body.style.overflow = previousBodyOverflow || '';
    var button = document.getElementById('senkoGuideBtn');
    if (button) button.classList.remove('is-active');
  }

  function bindButton() {
    var button = document.getElementById('senkoGuideBtn');
    if (!button || button.dataset.senkoGuideBound) return;

    button.dataset.senkoGuideBound = '1';
    button.hidden = false;
    button.addEventListener('click', openGuide);
  }

  function initGuide() {
    bindButton();
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && overlay && !overlay.hidden) closeGuide();
    });
  }

  /*
   * A API oficial permite que outras ferramentas globais abram ou fechem o
   * guia sem conhecer sua estrutura HTML. O conteudo interno permanece privado.
   */
  window.SenkoGuide = window.SenkoGuide || {};
  window.SenkoGuide.open = openGuide;
  window.SenkoGuide.close = closeGuide;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGuide);
  } else {
    initGuide();
  }
})();
