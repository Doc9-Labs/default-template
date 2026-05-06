# Protend — Documentação para Replicação (React / Next.js)

Documentação extraída do template **Protend Project Management Admin Dashboard** (Themesflat, v1.0). O objetivo é permitir replicar o layout em outros projetos — em particular React/Next.js — preservando identidade visual, hierarquia de informação e comportamento das páginas.

> Origem: `/protend-package/protend/` (HTML/CSS/JS estático, base Bootstrap 5 + jQuery).

## Como usar esta documentação

A documentação está dividida em três camadas, do mais geral ao mais específico:

1. **Design system** (`design-system/`) — tokens, grid, breakpoints, ícones e dark mode. Leia primeiro: tudo o resto referencia esses tokens.
2. **Componentes** (`components/`) — blocos reutilizáveis (Sidebar, Topbar, Box, KanbanBoard, etc.) com markup-exemplo, classes-chave e proposta de assinatura React.
3. **Páginas** (`pages/`) — uma `.md` por tela, listando seções, componentes consumidos e libs JS específicas.

Quando for portar para Next.js, comece pelo design system (Tailwind config / CSS variables), depois implemente os componentes em `components/` (App Router → `app/` ou Pages Router → `components/`), e por fim monte as rotas a partir das páginas.

## Mapa de arquivos

```
templates-md/
├── README.md                       (este arquivo)
├── design-system/
│   ├── tokens.md                   cores, tipografia, espaçamentos, radius, sombras
│   ├── layout.md                   grid, breakpoints, shell (sidebar + topbar + main)
│   ├── icons.md                    Boxicons / FontAwesome / IcoMoon
│   └── theme-darkmode.md           estratégia de tema claro/escuro
├── components/
│   ├── sidebar.md                  navegação lateral com submenus e dark toggle
│   ├── topbar.md                   header (busca, idiomas, perfil)
│   ├── box.md                      box / card base
│   ├── icon-card.md                cartão colorido com ícone (4 variações no topo das páginas)
│   ├── notification-list.md        lista de notificações dropdown
│   ├── project-card.md             card de projeto (carousel e grid)
│   ├── kanban-board.md             colunas drag-and-drop do board
│   ├── data-table.md               tabela de clientes (DataTables)
│   ├── form-controls.md            inputs, selects, file upload, datepicker
│   ├── dropdown.md                 menus suspensos
│   ├── modal.md                    modais Bootstrap
│   ├── avatar-stack.md             pilha de avatares circulares
│   ├── progress-bar.md             barras de progresso e mini-charts (peity)
│   ├── calendar.md                 mini-calendário (Pignose) e FullCalendar
│   ├── chart-wrappers.md           ApexCharts, Chart.js, Peity, Circle-progress
│   └── carousel.md                 Owl Carousel para listas horizontais
└── pages/
    ├── 01-dashboard.md             index.html
    ├── 02-board.md                 board.html (Kanban)
    ├── 03-calendar.md              calendar.html
    ├── 04-chart-apex.md            chart-apex.html
    ├── 05-clients.md               clients.html
    ├── 06-client-details.md        client-details.html
    ├── 07-message.md               message.html
    ├── 08-new-account.md           new-account.html
    ├── 09-new-project.md           new-project.html
    ├── 10-project.md               project.html
    ├── 11-project-details.md       project-details.html
    ├── 12-user-login.md            user-login.html
    └── 13-user-profile.md          user-profile.html
```

> Os 4 HTMLs em `protend/fonts/*.html` (`fa-brands-400.html`, `fa-solid-900.html`, `fa-regular-400.html`, `boxicons.html`) são apenas glifos de preview das fontes — não são páginas da app. Estão cobertos em `design-system/icons.md`.

## Stack original

| Camada | Tecnologia |
|--------|-----------|
| Markup | HTML5 estático |
| CSS    | Bootstrap 5 + Grid próprio (`css/grid.css`) + `style.css` (~3500+ linhas) + `responsive.css` |
| Fontes | Poppins (Google Fonts, principal); Roboto carregada em algumas páginas |
| Ícones | Boxicons, Font Awesome 5, IcoMoon |
| JS base | jQuery 3.x, jQuery UI, Bootstrap 5 bundle |
| Charts | ApexCharts, Chart.js, Peity, jQuery Circle Progress |
| Calendário | Pignose Calendar (mini), FullCalendar |
| Tabela | DataTables.net + responsive |
| Carousel | Owl Carousel 2 |
| Datepicker | Bootstrap Datepicker, Flatpickr, jQuery UI Datepicker |
| Outros | SimpleBar (scroll do sidebar), Moment.js, jQuery Bar Rating |

## Recomendações para Next.js

| Tópico | Recomendação |
|--------|-------------|
| Estrutura | App Router (`app/(dashboard)/...`) com `layout.tsx` global aplicando shell (Sidebar + Topbar). Login fica fora desse grupo. |
| Estilo | **Tailwind CSS** com `@theme` ou `tailwind.config` espelhando os tokens em `design-system/tokens.md`. Pode-se manter um `globals.css` para utilitários `fs-*`, `bg-color-*` se preferir migração faseada. Alternativa: CSS Modules com as variáveis CSS originais. |
| Tipografia | Importe Poppins via `next/font/google` para evitar layout shift. |
| Ícones | Substitua Boxicons/FA por **lucide-react** ou **react-icons**. Mapas de equivalência em `design-system/icons.md`. |
| Charts | `react-apexcharts` (mantém compat com os configs originais) ou `recharts`. Para mini-donuts, use `recharts <PieChart>` em vez de Peity. |
| Tabela | `@tanstack/react-table` substitui DataTables. |
| Calendário | `@fullcalendar/react` mantém paridade direta. |
| Carousel | `embla-carousel-react` ou `swiper` substitui Owl. |
| Forms | `react-hook-form` + `zod` para validação; mantenha classes utilitárias do template. |
| Drag & drop (Kanban) | `@dnd-kit/core` no lugar de jQuery UI. |
| Tema escuro | `next-themes` ligando classe `dark` no `<html>` — o CSS atual já espera essa classe. |

## Pontos de atenção ao portar

- O CSS original usa **muitos `!important`** (especialmente nos utilitários `fs-*`, `mt-*`, `bg-color-*`). Em Tailwind isso some naturalmente. Não tente preservar.
- Há **acoplamento jQuery** em vários comportamentos (toggle do sidebar, dropdown idiomas, abrir notificações, troca de tema, sliders). Reescreva como `useState`/`useEffect` simples — nenhum desses estados precisa de stores globais.
- O template **não usa CSS variables para espaçamentos** — apenas para cores e algumas dimensões do shell. A migração para Tailwind/design-tokens é uma boa oportunidade para regularizar.
- A grade Bootstrap convive com uma grade própria em `grid.css`. Em projetos novos, prefira só Tailwind.
- Os utilitários `bg-color-1..13` representam 13 pares (background suave + cor de destaque) — mapeie todos no design system, eles aparecem em quase todas as páginas.

## Próximos passos sugeridos

1. Ler `design-system/tokens.md` e gerar o `tailwind.config.ts` correspondente.
2. Criar componente `<Shell />` (Sidebar + Topbar + `<main>` slot) seguindo `design-system/layout.md`.
3. Implementar componentes na ordem: `Box` → `IconCard` → `Sidebar` → `Topbar` → `ProjectCard` → restantes.
4. Replicar páginas começando por `01-dashboard.md` (cobre ~80% dos componentes).
