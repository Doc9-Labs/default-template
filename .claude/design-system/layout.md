# Layout & Grid

Estrutura macro de toda página do Protend.

## Shell (envoltório padrão)

Toda página da app (exceto login) segue exatamente este esqueleto:

```html
<body class="sidebar-expand">
  <div class="sidebar"> ... </div>            <!-- 400px fixo à esquerda -->
  <div class="main-header"> ... </div>        <!-- 136px fixo no topo -->
  <div class="main">
    <div class="main-content [page-id]">
      <!-- conteúdo da página -->
    </div>
  </div>
  <!-- modais (fora do main) -->
  <!-- scripts -->
</body>
```

Onde `[page-id]` é uma classe identificadora (`dashboard`, `board`, `project`, `clients`, `message`, `calendar`) que serve de hook para CSS página-específico.

### Estados do sidebar

| Classe no `<body>` | Comportamento |
|--------------------|---------------|
| `.sidebar-expand` | Sidebar visível (estado padrão desktop) |
| `.sidebar-expand.active` | Sidebar oculta — `.main` ocupa toda a largura |
| `.counter-scroll` (extra) | Adiciona contadores animados (usado em login/dashboard) |

JS responsável: `js/main.js` — listeners em `#mobile-toggle` e `#sidebar-close` apenas alternam `.active` no `<body>`.

> Em React: um único state `sidebarOpen: boolean` no `<Shell />`, sem necessidade de Context.

## Áreas

### `.sidebar`
- `width: var(--sidebar-size)` (400px), `position: fixed`, `top: 0; left: 0; bottom: 0`.
- Contém: logo (top), menu (`<ul.sidebar-menu>`), toggle dark mode (último item).
- Scroll interno via SimpleBar (`data-simplebar`).
- Detalhes em `components/sidebar.md`.

### `.main-header`
- `height: var(--main-header-height)` (136px desktop, 90px ≤1200px).
- `position: fixed`, ocupa o espaço **à direita** da sidebar (`left: var(--sidebar-size)`).
- Contém: hamburger mobile + título + busca + dropdown idiomas + dropdown perfil.
- Detalhes em `components/topbar.md`.

### `.main`
- Wrapper do conteúdo, recebe `padding-left` igual à largura do sidebar e `padding-top` igual à altura do header.
- Quando `body.sidebar-expand.active`, o `padding-left` cai para 0.

### `.main-content`
- Container do conteúdo da página com `padding` lateral (30px desktop / 15-20 mobile).
- Recebe modificador da página (`.dashboard`, `.board`, etc.).

## Sistema de grid

O template usa **dois sistemas em paralelo**:

### 1. Grid próprio (`css/grid.css`)
Replica o conceito Bootstrap mas com classes simplificadas:

```html
<div class="row">
  <div class="col-6 col-md-6 col-sm-12">...</div>
  <div class="col-6 col-md-6 col-sm-12">...</div>
</div>
```

Colunas: `.col-1` … `.col-12` (base 12). Sufixos responsivos: `-sm`, `-md`, `-lg`, `-xl`, `-xxl`.

### 2. Bootstrap 5 (utilities)
Classes de flex/spacing do Bootstrap (`d-flex`, `align-items-center`, `me-auto`, `mb-0`, etc.) usadas livremente em todo lugar. Ver Bootstrap 5 docs para semântica.

## Breakpoints

Definidos em `css/responsive.css` e implícitos no grid:

| Breakpoint | Trigger | Comportamento |
|-----------|---------|---------------|
| ≤1820px | `max-width: 1820px` | Cards do topo (`.box.card-box .icon-box`) reflowam para 47% (2 colunas). |
| ≤1700px | `max-width: 1700px` | Botões/listas de ação ganham espaçamento extra. |
| 1200–1640px | `min-width:1200 / max-width:1640` | `box-manage` quebra em duas linhas; `.content-item` empilha hora + bloco. |
| ≤1200px | `max-width: 1200px` | Header reduz para 90px; cards do topo viram 49% cada. **Sidebar entra em modo retrátil.** |
| ≤991px | `max-width: 991px` | Sidebar oculta por padrão; layout vira mobile-first. |
| ≤767px | `max-width: 767px` | Cards 100% width; tipografia reduz; muitos `flex` viram `wrap`. |
| ≤575px | (em `style.css`) | `.fs-16` vira 14px, `.fs-18` vira 16px, `.fs-28` vira 24px. |

> **Recomendação Next.js:** mapeie para os breakpoints Tailwind padrão (sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536) e adicione um `3xl` em 1700 para preservar o comportamento de "wrap dos icon-cards".

## Padrão de página

Quase todas as páginas seguem o mesmo template **dentro** de `.main-content`:

```
┌─ ROW 1 ─────────────────────────────────────────┐
│  4× IconCard (Notificação | Mensagem |          │ <- componente icon-card
│              Calendário | Create New Project)   │
└─────────────────────────────────────────────────┘
┌─ ROW 2 ─ conteúdo principal da página ──────────┐
│   varia: charts, tabelas, kanban, formulários…  │
└─────────────────────────────────────────────────┘
```

**Exceções:** `user-login.html` e `new-account.html` usam layout single-column centralizado, sem sidebar/topbar.

## Próximos passos

- Ver `components/sidebar.md` e `components/topbar.md` para implementar o shell.
- Ver `components/icon-card.md` para a primeira linha recorrente.
- Ver `pages/01-dashboard.md` para um exemplo completo de composição.
