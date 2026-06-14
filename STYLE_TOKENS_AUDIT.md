# Extracao de estilo do SenkoLib

Este documento registra o visual atual que deve servir de base para a
padronizacao futura dos estilos em `app/shared/styles/`.

## Arquivos analisados

| Arquivo | Papel atual |
| --- | --- |
| `app/shared/styles/senko-tokens.css` | Tokens oficiais extraidos desta auditoria: paleta, tema, fontes, radius e sombras. |
| `app/shared/styles/senko-components.css` | Componentes visuais neutros criados para padronizacao gradual. |
| `app/shell/styles/styles.css` | Tema principal, layout do shell e boa parte do visual da Biblioteca. |
| `app/features/colecoes/styles/col-styles.css` | Estilos especificos da feature Colecoes, usando os tokens do shell. |
| `app/features/biblioteca/prototypes/layout-editor-prototype.css` | Editor/prototipo da Biblioteca, ja usa varios tokens globais com fallback. |
| `app/features/imagens/styles/imagens.css` | Estilos proprios da feature Imagens, consumindo os tokens oficiais do SenkoLib. |
| `app/features/sources/styles/sources.css` | Estilos proprios da feature Sources, consumindo os tokens oficiais do SenkoLib. |
| `app/prototype/gamer-preview/styles.css` | Preview beta renderizado como painel direto; usa iframe apenas para o preview interno. |

## Paleta base atual

### Tema claro principal

Estes valores aparecem no `styles.css` do shell e sao a melhor base para o
primeiro arquivo de tokens compartilhados:

```css
:root {
  --bg:        #f8f8f8;
  --bg2:       #f2f2f2;
  --bg3:       #e8e8e8;
  --border:    #e8e8e8;
  --border2:   #d4d4d4;
  --text:      #1a1a1a;
  --text2:     #555555;
  --text3:     #aaaaaa;
  --accent:    #ff6b00;
  --accent2:   #ff8c38;
  --accent-bg: rgba(255,107,0,.08);
  --red:       #e03030;
  --green:     #1a9e52;
}
```

### Tema escuro principal

```css
[data-theme="dark"] {
  --bg:        #1c1e1f;
  --bg2:       #1f2223;
  --bg3:       #25282a;
  --border:    #363b3d;
  --border2:   #3c4144;
  --text:      #d8d4cf;
  --text2:     #b2aca2;
  --text3:     #b2aca2;
  --accent:    #ff7a1a;
  --accent2:   #aa4800;
  --accent-bg: rgba(204,86,0,.08);
  --red:       #a91919;
  --green:     #157e42;
}
```

## Tokens estruturais atuais

```css
:root {
  --radius:      10px;
  --radius-lg:   16px;
  --shadow:      0 2px 12px rgba(0,0,0,.07);
  --shadow-lg:   0 8px 48px rgba(0,0,0,.13);
  --shadow-card: 0 1px 4px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.05);

  --font-display: 'Nunito', sans-serif;
  --font-body:    'Nunito', sans-serif;
  --font-code:    'DM Mono', monospace;

  --transition: .2s cubic-bezier(.4,0,.2,1);
}

[data-theme="dark"] {
  --shadow-card: 0 1px 6px rgba(0,0,0,.5), 0 4px 16px rgba(0,0,0,.4);
  --shadow-lg:   0 8px 48px rgba(0,0,0,.6);
}
```

## Diferenca de nomenclatura entre areas

Biblioteca, Colecoes e Shell usam:

```css
--bg
--bg2
--bg3
--font-body
--font-code
```

Imagens, ferramentas compartilhadas de imagem e Preview usam:

```css
--surface
--surface2
--surface3
--sans
--mono
```

Recomendacao: no futuro `senko-tokens.css`, manter os nomes atuais como
compatibilidade e criar aliases claros:

```css
:root {
  --surface:  var(--bg);
  --surface2: var(--bg2);
  --surface3: var(--bg3);
  --sans:     var(--font-body);
  --mono:     var(--font-code);
}
```

Assim as features podem renderizar no `index.html` principal sem perder
isolamento visual.

## Componentes visuais extraidos

### Toolbars de feature

Biblioteca usa `.feature-toolbar` e Colecoes usa `.col-feature-toolbar`.
As duas seguem a mesma ideia:

- layout flex;
- `gap: .75rem`;
- `margin-bottom: 1rem`;
- acoes alinhadas a direita no desktop;
- empilha no mobile.

Isto deve virar componente compartilhado em `senko-components.css`, mantendo
as classes especificas de cada feature como casca local quando necessario.

### Inputs e busca

Padrao atual:

- fundo `var(--bg3)`;
- borda `1.5px solid var(--border)`;
- raio `var(--radius)`;
- texto `var(--text)`;
- placeholder `var(--text3)`;
- foco com `border-color: var(--accent)` e `box-shadow: 0 0 0 3px var(--accent-bg)`.

Esse comportamento aparece tanto na Biblioteca quanto em Colecoes.

### Botoes

Familias atuais:

- primario: fundo `var(--accent)`, texto branco, hover em `var(--accent2)`;
- secundario/ghost: transparente, borda `var(--border)`, hover laranja;
- perigo: fundo `var(--red)`;
- icone/quadrado: usado em tema, fechar modal e pequenas acoes.

O tamanho mais comum fica perto de:

```css
padding: .45rem 1.1rem;
border-radius: var(--radius);
font-weight: 800;
```

### Cards

Padrao principal da Biblioteca:

```css
background: var(--bg);
border: 1.5px solid var(--border);
border-radius: var(--radius-lg);
box-shadow: var(--shadow-card);
```

Colecoes reaproveita a mesma linguagem nos cards e modais, com classes
`col-*` especificas.

### Tags e badges

Padrao atual:

```css
background: var(--accent-bg);
border: 1px solid rgba(255,107,0,.18);
border-radius: 5px;
color: var(--accent);
font-family: var(--font-code);
```

Esse estilo funciona bem como badge/tag global, mas o seletor final deve ser
neutro, por exemplo `.senko-tag` ou `.senko-badge`.

### Modais

Padrao principal:

```css
background: var(--bg);
border: 1.5px solid var(--border);
border-radius: var(--radius-lg);
box-shadow: var(--shadow-lg);
```

Cabecalho usa borda inferior `1.5px solid var(--border)`, titulo com
`var(--font-display)`, peso alto e texto `var(--text)`.

## Decisoes aplicadas nesta etapa

1. Criado `app/shared/styles/senko-tokens.css` com a paleta, fontes, radius,
   sombras, transicoes e aliases `surface/sans/mono`.
2. Criado `app/shared/styles/senko-components.css` com componentes neutros
   usados pela tela principal: botoes, busca, toolbar, modal base, cards e tags.
3. `index.html` agora carrega os arquivos shared antes do CSS do shell.
4. O shell deixou de declarar os tokens e reset basico; isso agora pertence ao
   shared oficial.

## Decisoes recomendadas para as proximas etapas

1. Deixar o shell com estilos de layout do aplicativo: header, abas, raiz das
   features e estado vazio.
2. Deixar cada feature com seletores proprios para estrutura interna:
   `.col-*`, cards de layout da Biblioteca, telas de Imagens e Preview.
3. Migrar aos poucos o que ainda esta duplicado no `styles.css` para
   componentes neutros, quando for seguro.
4. Manter Imagens e Sources sem arquivos internos compartilhados entre si.
5. Manter janelas de feature como paineis diretos do shell; iframe fica apenas
   para preview, sandbox ou medicao interna.

## Observacoes importantes

- A aparencia de Biblioteca e Colecoes ja esta bastante alinhada.
- A maior divergencia hoje e de nomes, nao de cor.
- `Imagens` e `Sources` agora consomem os tokens oficiais do SenkoLib, mas
  mantem estilos estruturais proprios dentro da pasta da feature.
- O laranja principal do tema claro e consistente: `#ff6b00`.
- O tema escuro oficial usa `#ff7a1a` como destaque principal.
