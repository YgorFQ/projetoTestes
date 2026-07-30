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
          terms: 'senkolib projeto ferramenta app layouts colecoes imagens sources preview',
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
            'Criacao rapida e a entrada oficial para iniciar criacoes em qualquer aba.',
            'Notas da equipe e um prototipo para guardar prompts, regras, guias e padroes em arquivos proprios.',
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
            'Estilo principal: app/shell/styles/styles.css.',
            'Raiz das features: #senkoFeatureRoot.'
          ]
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
          title: 'Manifest',
          badge: 'dados',
          terms: 'manifest data indice arquivos carregar layouts colecoes variantes',
          paragraphs: [
            'O manifest e o indice de dados da feature. Ele diz quais arquivos devem ser carregados.',
            'Se um arquivo existe na pasta, mas nao esta no manifest, a feature pode nao saber que ele existe.',
            'O manifest usa entradas em objeto com file, id e nome para apontar cada arquivo individual.'
          ],
          bullets: [
            'Formato novo: { file: "layouts/section-1.js", id: "section-1", name: "Section 1" }.',
            'Em Colecoes, uma entrada de colecao pode listar layouts filhos em layouts: [{ file: "collections/minha/layouts/hero.js", id: "hero" }].',
            'Biblioteca, variantes e Colecoes carregam arquivos JS individuais catalogados pelo manifest.'
          ],
          note: 'Analogia: o manifest e o sumario de um livro. O capitulo pode existir, mas se nao esta no sumario, ninguem lembra de abrir.'
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
            'index.html -> carrega tokens, componentes, shell e register.js das areas disponiveis.',
            'app/shell -> cria topo, abas, tema, botoes globais, criacao rapida, Senko Guide e raiz neutra das features.',
            'app/shared -> fornece cores, fontes, componentes neutros e assets globais.',
            'app/features -> guarda features finais, cada uma com seus arquivos proprios.',
            'app/prototype -> guarda somente ideias beta, como Preview e Notas da equipe.',
            'integrations/github -> fica dentro da feature dona daquela integracao.'
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
            'Shell: navegacao, tema, header, raiz das features e registros de providers de GitHub e criacao.',
            'Shared: tokens, componentes neutros e assets realmente globais.',
            'Biblioteca: layouts, variantes, preview de layouts e GitHub da Biblioteca.',
            'Colecoes: colecoes, grupos, layouts dentro de colecoes e GitHub de Colecoes.',
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
            'app/shared: tokens, componentes e assets globais.',
            'app/features: features principais.',
            'app/prototype: telas em teste ou beta.'
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
            'A Biblioteca guarda layouts e variantes de layouts.',
            'Os layouts ficam em arquivos JS individuais dentro de data/layouts e as variantes ficam em arquivos JS individuais dentro de data/variants/[layoutId].'
          ],
          bullets: [
            'Motor: scripts/senkolib-core.js.',
            'UI: scripts/script.js.',
            'Editor oficial: scripts/layout-editor.js.',
            'Editor do HTML Basico: scripts/copy-base-editor.js.',
            'Template do HTML Basico: scripts/copy-base-template.js.',
            'Dados: data/manifest.js, data/layouts, data/variants.',
            'Estilos do editor: styles/layout-editor.css.',
            'Estilos do editor do HTML Basico: styles/copy-base-editor.css.',
            'GitHub: integrations/github/.'
          ],
          note: 'O editor oficial nao fica mais em prototype. Ele pertence a Biblioteca e nao deve oferecer campo editavel para o ID tecnico.'
        },
        {
          title: 'Colecoes',
          badge: 'grupos',
          terms: 'colecoes grupos layout colecao collib colgroups manifest collection layouts individuais',
          paragraphs: [
            'Colecoes organiza layouts dentro de colecoes e grupos.',
            'Os grupos sao cadastro proprio e nao devem ser apagados so porque ficaram vazios.',
            'Cada colecao tem um arquivo de metadados em data/collections/[slug]/collection.js e cada layout da colecao fica em data/collections/[slug]/layouts/[id].js.'
          ],
          bullets: [
            'Motor de colecoes: scripts/col-core.js.',
            'Motor de grupos: scripts/col-groups.js.',
            'Modais: scripts/col-modals.js.',
            'Dados: data/manifest.js, data/col-groups-data.js e data/collections/.',
            'GitHub: integrations/github/colecoes-github.js.'
          ]
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
            'Controlador: app/shell/scripts/senko-quick-create.js.',
            'Estilos: app/shell/styles/senko-quick-create.css.',
            'Registro neutro: SenkoShell.registerCreateProvider().',
            'Biblioteca registra Layout e Variacao em app/features/biblioteca/register.js.',
            'Colecoes registra Colecao e Layout em app/features/colecoes/register.js.',
            'A feature e ativada antes de abrir seu modal para evitar uma janela presa em painel suspenso.',
            'Validacao e GitHub continuam pertencendo a feature que cria o item.'
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
            'Controlador: app/shell/scripts/senko-guide.js.',
            'Estilos: app/shell/styles/senko-guide.css.',
            'Botao global: #senkoGuideBtn no header do index.html.',
            'API publica: SenkoGuide.open() e SenkoGuide.close().',
            'Atalhos para features usam somente SenkoShell.switchFeature().',
            'Toda mudanca relevante no projeto precisa revisar este guia.'
          ],
          note: 'Ser oficial nao transforma o Guide em feature: ele continua sendo uma ferramenta global do shell.'
        },
        {
          title: 'Areas beta',
          badge: 'beta',
          terms: 'preview beta prototype gamer teste prototipo notas equipe team notes',
          paragraphs: [
            'O Preview e Notas da equipe ficam em app/prototype porque ainda sao areas especiais fora das features principais.',
            'Tudo que ainda esta em teste deve comecar em prototype antes de virar feature final.'
          ],
          bullets: [
            'Notas da equipe: app/prototype/team-notes/.',
            'Cada nota criada pelo Team Notes deve virar um arquivo proprio em app/prototype/team-notes/data/notes e entrar no manifest.js.',
            'Preview: app/prototype/gamer-preview/.',
            'Senko Guide nao e mais prototipo; ele fica em app/shell/.',
            'Editor de layout da Biblioteca nao e mais prototipo; ele fica em app/features/biblioteca/.'
          ]
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
            'Notas da equipe: prototipo beta com arquivos individuais e salvamento via GitHub.',
            'Preview: prototipo beta em app/prototype.',
            'Senko Guide: ferramenta oficial do shell e prioridade maxima de manutencao.',
            'Editor da Biblioteca: oficial, integrado em app/features/biblioteca/scripts/layout-editor.js.',
            'Editor do HTML Basico: oficial, integrado em app/features/biblioteca/scripts/copy-base-editor.js.'
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
      id: 'github',
      label: 'GitHub',
      items: [
        {
          title: 'Configuracao',
          badge: 'token',
          terms: 'github token owner repo branch localstorage config',
          paragraphs: [
            'A configuracao do GitHub e global porque owner, repo e token pertencem ao projeto.',
            'O token fica salvo no localStorage do navegador, nunca no codigo-fonte.'
          ],
          bullets: [
            'Config: senkolib_github_config.',
            'Token: senkolib_github_token.',
            'Em GitHub Pages, owner e repo detectados pela URL devem ter prioridade sobre configuracao antiga do navegador.',
            'Em localhost, Live Server ou file://, os botoes de salvar continuam visiveis e owner/repo sao informados pelo botao global de GitHub.',
            'Sem repositorio ou token validos, a interface abre a configuracao e nao envia alteracoes.',
            'Token classic precisa de escopo repo.',
            'Token fine-grained precisa de Contents read/write.'
          ]
        },
        {
          title: 'Botoes globais, logica separada',
          badge: 'shell',
          terms: 'botao global github criacao rapida provider registerGithubProvider registerCreateProvider independencia',
          paragraphs: [
            'Os botoes de GitHub e criacao rapida ficam no shell porque sao controles globais.',
            'Mesmo assim, cada feature registra seus providers e continua dona de sua propria logica.'
          ],
          note: 'Analogia: o shell oferece as tomadas. Biblioteca e Colecoes conectam seus proprios motores por contratos publicos.'
        },
        {
          title: 'Como salvar no GitHub',
          badge: 'api',
          terms: 'github contents api get put delete sha salvar excluir manifest',
          paragraphs: [
            'As integracoes usam a GitHub Contents API.',
            'Antes de salvar, a feature busca o arquivo atual, pega o SHA e envia o novo conteudo.'
          ],
          bullets: [
            'Criar/editar: GET do arquivo, monta conteudo, PUT com SHA.',
            'Excluir: GET do arquivo, DELETE com SHA.',
            'Se criar arquivo novo, atualiza o manifest da feature.',
            'Quando o manifest aponta para arquivo individual, Biblioteca e Colecoes salvam esse arquivo direto e nao procuram marcador.',
            'Itens antigos sem arquivo individual ainda usam os marcadores como fallback temporario.',
            'Se o token falhar, a operacao deve parar e mostrar erro.'
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
            'A estrutura minima deve deixar claro onde fica tela, regra, estilo, dados e integracao.'
          ],
          bullets: [
            'Criar app/features/nova-feature ou app/prototype se for teste.',
            'Criar register.js para carregar arquivos e chamar SenkoShell.registerFeature.',
            'Criar view.js para montar a tela inicial da feature.',
            'Criar scripts proprios para regras internas.',
            'Criar styles proprios usando tokens de shared.',
            'Criar data/manifest.js se a feature carregar dados por lista.',
            'Criar integrations/github dentro da propria feature se ela salvar no GitHub.',
            'Adicionar o register.js no index.html.',
            'Testar troca de abas, tema, console e remocao de outra feature.',
            'Atualizar este guia com a nova feature.'
          ],
          note: 'A feature deve funcionar como uma loja com chave propria: ela usa a entrada do shopping, mas nao depende do estoque da loja vizinha.'
        },
        {
          title: 'Adicionar layout na Biblioteca',
          badge: 'biblioteca',
          terms: 'adicionar layout biblioteca arquivo individual manifest senkolib register registerLayout sintaxe duplicado',
          paragraphs: [
            'Layouts manuais entram em data/layouts e precisam estar no manifest.',
            'Cada layout deve ficar em um arquivo proprio e registrar com SenkoLib.registerLayout({...}).'
          ],
          bullets: [
            'Criar arquivo em app/features/biblioteca/data/layouts/[id].js.',
            'Formato novo: registrar com SenkoLib.registerLayout({...}).',
            'O save GitHub valida o JS final antes de enviar e recusa erro de sintaxe.',
            'Atualizar app/features/biblioteca/data/manifest.js com o objeto do arquivo individual.',
            'Nunca envolver SenkoLib.registerLayout(...) duas vezes no mesmo arquivo.',
            'Testar se aparece no grid.',
            'Testar abrir, copiar, editar e criar variante.'
          ]
        },
        {
          title: 'Adicionar ou editar variante',
          badge: 'variante',
          terms: 'adicionar editar variante variacao biblioteca nome duplicado manifest section layout',
          paragraphs: [
            'Variantes pertencem a um layout da Biblioteca e precisam manter nome unico dentro daquele layout.',
            'Cada variante deve ficar em um arquivo proprio e registrar com SenkoLib.registerVariantFile(layoutId, {...}).'
          ],
          bullets: [
            'Conferir qual layout e dono da variante.',
            'Criar ou editar o arquivo em app/features/biblioteca/data/variants/[layoutId]/[id-da-variacao].js.',
            'Formato novo: registrar com SenkoLib.registerVariantFile(layoutId, {...}).',
            'Garantir que o manifest aponta para o arquivo individual da variante.',
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
            'Colecoes manuais entram em data/collections/[slug] e precisam aparecer no manifest.',
            'O formato novo deve registrar os metadados da colecao com ColLib.registerCollection({...}) e deixar os layouts da colecao em arquivos proprios.'
          ],
          bullets: [
            'Criar o arquivo de metadados em app/features/colecoes/data/collections/[slug]/collection.js.',
            'Formato novo: registrar com ColLib.registerCollection({...}).',
            'Atualizar app/features/colecoes/data/manifest.js com file da colecao e, quando existir, a lista layouts.',
            'Garantir que o grupo exista em col-groups-data.js.',
            'Testar card, abertura e edicao.'
          ]
        },
        {
          title: 'Adicionar layout em colecao',
          badge: 'layout colecao',
          terms: 'adicionar editar layout colecao nome duplicado collib grupo',
          paragraphs: [
            'Layout dentro de colecao e dado da feature Colecoes, nao da Biblioteca.',
            'O formato novo deve registrar um layout de colecao por arquivo com ColLib.registerCollectionLayout(slug, {...}).'
          ],
          bullets: [
            'Editar apenas arquivos de app/features/colecoes.',
            'Criar arquivo em app/features/colecoes/data/collections/[slug]/layouts/[id].js.',
            'Formato novo: registrar com ColLib.registerCollectionLayout(slug, {...}).',
            'Atualizar a lista layouts da colecao dentro do manifest.',
            'Garantir nome unico dentro da colecao.',
            'Os layouts aparecem em ordem alfabetica/natural pelo nome dentro da colecao, sem reordenar o manifest.',
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
            'Script: app/features/biblioteca/scripts/layout-editor.js.',
            'CSS: app/features/biblioteca/styles/layout-editor.css.',
            'Campo editavel: nome do layout ou nome da variacao.',
            'Campo nao editavel: ID gerado.',
            'Salvar layout regrava data/layouts/[id].js.',
            'Salvar variacao regrava data/variants/[layoutId]/[id].js.'
          ],
          note: 'Se precisar mudar ID, trate como migracao: criar novo arquivo, atualizar manifest, mover referencias e remover o antigo.'
        },
        {
          title: 'Editar o HTML Basico',
          badge: 'biblioteca',
          terms: 'editar html basico copy base template github botao lapis',
          paragraphs: [
            'O editor do HTML Basico e uma ferramenta oficial da Biblioteca.',
            'Ele altera o conteudo copiado pelo botao HTML Basico e persiste a nova versao no GitHub.'
          ],
          bullets: [
            'Botao e modal: app/features/biblioteca/view.js.',
            'Comportamento: app/features/biblioteca/scripts/copy-base-editor.js.',
            'Template persistido: app/features/biblioteca/scripts/copy-base-template.js.',
            'Estilos: app/features/biblioteca/styles/copy-base-editor.css.',
            'Persistencia: app/features/biblioteca/integrations/github/senko-github-v2.js.',
            'Apos salvar, copy-base.js recebe o novo HTML em memoria sem exigir recarga.'
          ]
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
            'Confirmar se a mudanca pertence ao provider da feature correta.',
            'Verificar owner, repo e branch configurados.',
            'Testar sem token para ver se a tela de erro aparece.',
            'Testar com token valido e permissao de escrita.',
            'Conferir se GET, PUT e DELETE usam SHA correto.',
            'Conferir se o manifest da feature foi atualizado quando arquivo novo entrou.',
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
          title: 'Arquivo existe, mas nao aparece',
          badge: 'manifest',
          terms: 'arquivo existe nao aparece manifest dados layouts colecoes variantes',
          paragraphs: [
            'O arquivo pode existir na pasta, mas a feature so carrega o que esta no manifest.'
          ],
          bullets: [
            'Layout da Biblioteca: verificar SenkoBibliotecaManifest.layouts.',
            'Variante da Biblioteca: verificar SenkoBibliotecaManifest.variants.',
            'Colecao: verificar SenkoColecoesManifest.collections.',
            'Layout de colecao: verificar SenkoColecoesManifest.collections[].layouts.',
            'Conferir se o caminho do manifest bate exatamente com a pasta real.'
          ]
        },
        {
          title: 'Mensagem: nao encontrado ao editar',
          badge: '404 local',
          terms: 'nao encontrado editar colecao layout de colecao manifest collection layoutId slug caminho',
          paragraphs: [
            'Quando uma colecao ou layout de colecao aparece no catalogo, mas falha ao editar, quase sempre o caminho do manifest nao leva ao arquivo completo.'
          ],
          bullets: [
            'Conferir se collection.js existe em data/collections/[slug]/collection.js.',
            'Conferir se o file da colecao no manifest aponta para collections/[slug]/collection.js.',
            'Conferir se o layout esta listado em layouts no manifest da colecao.',
            'Conferir se o arquivo existe em collections/[slug]/layouts/[id].js.',
            'Conferir se o id do arquivo e igual ao id usado no manifest.'
          ]
        },
        {
          title: 'Layout novo nao aparece na Biblioteca',
          badge: 'biblioteca',
          terms: 'layout novo nao aparece biblioteca registerLayout manifest id duplicado sintaxe',
          paragraphs: [
            'Se o layout foi criado, mas nao aparece no grid, valide primeiro o arquivo individual e depois o manifest.'
          ],
          bullets: [
            'O arquivo deve usar SenkoLib.registerLayout({...}).',
            'Nao pode existir SenkoLib.registerLayout( duplicado no mesmo arquivo.',
            'O arquivo deve estar em SenkoBibliotecaManifest.layouts.',
            'O id do arquivo e o id do manifest precisam ser iguais.',
            'Nao pode existir outro layout com nome visualmente equivalente.'
          ]
        },
        {
          title: 'Variante nova nao aparece',
          badge: 'variante',
          terms: 'variante variacao nova nao aparece registerVariantFile layoutId manifest',
          paragraphs: [
            'Variante so aparece quando o arquivo individual esta registrado no layout pai correto e listado no manifest.'
          ],
          bullets: [
            'O arquivo deve usar SenkoLib.registerVariantFile(layoutId, {...}).',
            'O layoutId deve ser o ID tecnico do layout pai.',
            'O caminho deve seguir variants/[layoutId]/[id-da-variacao].js.',
            'A entrada precisa estar em SenkoBibliotecaManifest.variants.',
            'Nao pode existir outra variante com o mesmo nome dentro do layout.'
          ]
        },
        {
          title: 'Erro de sintaxe com registro duplicado',
          badge: 'sintaxe',
          terms: 'erro sintaxe duplicidade duplicado registerLayout duas vezes parenteses',
          paragraphs: [
            'O arquivo de layout ou variante deve chamar o registro apenas uma vez.'
          ],
          bullets: [
            'Errado: SenkoLib.registerLayout(SenkoLib.registerLayout({...}););',
            'Correto: SenkoLib.registerLayout({...});',
            'A mesma regra vale para SenkoLib.registerVariantFile(...).',
            'Se isso acontecer, corrigir o arquivo antes de atualizar o manifest.'
          ]
        },
        {
          title: 'Botao de salvar nao aparece',
          badge: 'interface',
          terms: 'botao salvar nao aparece github localhost live server file modal layout variacao colecao',
          paragraphs: [
            'Os controles de salvar devem aparecer no GitHub Pages, localhost, Live Server e file://.',
            'A ausencia de credenciais deve abrir a configuracao quando necessario, nunca remover o botao da interface.'
          ],
          bullets: [
            'Conferir se a integracao GitHub da feature foi carregada e inicializada.',
            'Conferir se o modal manteve a ancora usada para injetar o controle.',
            'Um arquivo opcional de variante ausente deve gerar erro no console sem bloquear editores ou integracoes.',
            'Conferir se todos os caminhos listados no manifest existem na pasta de dados.'
          ]
        },
        {
          title: 'GitHub nao salva',
          badge: 'token',
          terms: 'github nao salva token owner repo permissao branch erro',
          paragraphs: [
            'Falhas de GitHub normalmente estao ligadas a token, permissao, repo ou branch.'
          ],
          bullets: [
            'Verificar owner e repo.',
            'Verificar se o token existe.',
            'Verificar se o token expirou.',
            'Verificar permissoes de escrita.',
            'Verificar branch.',
            'Abrir console para ver a mensagem exata.'
          ]
        },
        {
          title: 'Mensagem: token nao encontrado',
          badge: 'mensagem',
          terms: 'mensagem token nao encontrado ausente github configurar credenciais',
          paragraphs: [
            'Acontece quando a feature tenta salvar no GitHub sem token configurado.'
          ],
          bullets: [
            'Abrir o botao global de GitHub.',
            'Informar owner, repo, branch e token.',
            'Confirmar se a feature ativa tem provider de GitHub registrado.',
            'A operacao deve parar com erro claro, sem quebrar outras features.'
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
            'Token classic: precisa de escopo repo.',
            'Token fine-grained: precisa de Contents read/write no repositorio certo.',
            'Conferir se owner e repo apontam para o projeto correto.',
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
            'Conferir se o dado existe no manifest.',
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
            'O projeto tenta evitar cache com meta tags, _senko_reload e service worker.',
            'Mesmo assim, se algo parecer antigo, confirme se esta abrindo o arquivo certo.'
          ],
          bullets: [
            'Testar reload normal.',
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
            'Integracoes GitHub devem ter logica separada por feature.',
            'Token do GitHub nunca entra no codigo.',
            'Nao permitir nomes duplicados.',
            'Grupos de Colecoes nao devem ser apagados automaticamente.',
            'Cada layout, variacao, colecao e layout de colecao novo deve ter seu proprio arquivo JS.',
            'Todo arquivo de dados novo precisa de entrada no manifest da feature.',
            'ID tecnico nao deve ser editado como campo comum.',
            'Ordenacao alfabetica deve acontecer na renderizacao, sem reescrever manifest so para ordenar.',
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
            'Nao voltar layout, variacao ou layout de colecao novo para arquivos grandes com arrays de objetos.',
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
