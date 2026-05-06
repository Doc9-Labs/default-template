# Sidebar

Navegação lateral fixa, ocupa **400px** à esquerda e contém: logo, menu (com submenus), toggle de dark mode.

## Markup-fonte (resumido de `index.html`)

```html
<div class="sidebar">
  <div class="sidebar-logo">
    <a href="index.html"><img src="./images/logo.png" alt="Protend logo"></a>
    <div class="sidebar-close" id="sidebar-close">
      <i class='bx bx-left-arrow-alt'></i>
    </div>
  </div>

  <div class="simlebar-sc" data-simplebar>          <!-- scroll custom -->
    <ul class="sidebar-menu tf">
      <!-- Item com submenu -->
      <li class="sidebar-submenu">
        <a href="index.html" class="sidebar-menu-dropdown">
          <i class='bx bxs-home'></i>
          <span>Dashboard</span>
          <div class="dropdown-icon"><i class='bx bx-chevron-down'></i></div>
        </a>
        <ul class="sidebar-menu sidebar-menu-dropdown-content">
          <li><a href="index.html">Dashboard</a></li>
          <li><a href="user-profile.html">User Profile</a></li>
          <li><a href="user-login.html">User Login</a></li>
          <li><a href="new-account.html">New Account</a></li>
        </ul>
      </li>

      <!-- Item simples -->
      <li>
        <a href="board.html"><i class='bx bxs-dashboard'></i><span>Board</span></a>
      </li>

      <!-- Toggle dark mode (último item) -->
      <li>
        <a class="darkmode-toggle" id="darkmode-toggle" onclick="switchTheme()">
          <div><i class='bx bx-cog mr-10'></i><span>darkmode</span></div>
          <span class="darkmode-switch"></span>
        </a>
      </li>
    </ul>
  </div>
</div>
```

## Classes-chave

| Classe | Função |
|--------|--------|
| `.sidebar` | Container fixo (400px width). |
| `.sidebar-logo` | Bloco do logo (80px de altura). |
| `.sidebar-close` | Botão para colapsar (visível apenas em mobile). |
| `.simlebar-sc` + `data-simplebar` | Habilita scroll custom via [SimpleBar](https://github.com/Grsmto/simplebar). |
| `.sidebar-menu` | `<ul>` raiz dos itens. |
| `.sidebar-submenu` | `<li>` que possui submenu. |
| `.sidebar-menu-dropdown` | `<a>` que abre/fecha submenu (toggle). |
| `.sidebar-menu-dropdown-content` | `<ul>` interno do submenu. |
| `.current-menu-item` (no `<a>`) | Marca o item atual da página (alguns HTMLs usam, outros não). |
| `.active` (no `<ul>` interno) | Submenu aberto. |
| `.darkmode-toggle` | Wrapper do botão de tema. |
| `.darkmode-switch` | Pílula visual (animada via CSS). |

## Estados (do `<body>`)

| Classe `<body>` | Efeito |
|-----------------|--------|
| `sidebar-expand` (default) | Sidebar visível |
| `sidebar-expand active` | Sidebar oculta (mobile/colapsada) |

JS responsável (`js/main.js`):

```js
$('#mobile-toggle').on('click', () => $('body').toggleClass('active'));
$('#sidebar-close').on('click', () => $('body').toggleClass('active'));
// Submenus
$('.sidebar-menu-dropdown').on('click', function () {
  $(this).siblings('.sidebar-menu-dropdown-content').toggleClass('active');
  $(this).find('.dropdown-icon').toggleClass('active');
});
```

## Itens do menu (canônico)

```
Dashboard ▾
  ├─ Dashboard          → index.html
  ├─ User Profile       → user-profile.html
  ├─ User Login         → user-login.html
  └─ New Account        → new-account.html

Project ▾
  ├─ Project            → project.html
  ├─ Project Details    → project-details.html
  └─ New Project        → new-project.html

Client ▾
  ├─ Manager Client     → clients.html
  └─ Client Details     → client-details.html

Board                  → board.html
Calendar               → calendar.html
Message                → message.html
Components ▾
  └─ Apex Charts        → chart-apex.html

[Dark mode toggle]
```

## Implementação React (sugestão)

### Tipos

```ts
export type SidebarItem =
  | { kind: 'link';    label: string; href: string; icon: LucideIcon }
  | { kind: 'group';   label: string; icon: LucideIcon; children: { label: string; href: string }[] }
  | { kind: 'toggle';  label: string; icon: LucideIcon }; // dark mode
```

### Componente

```tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home, Zap, User, LayoutDashboard, Calendar, MessageSquareText,
  Component, ChevronDown, ChevronsLeft, Settings,
} from 'lucide-react'
import { DarkModeToggle } from './DarkModeToggle'

const ITEMS: SidebarItem[] = [
  { kind: 'group', label: 'Dashboard', icon: Home, children: [
    { label: 'Dashboard',    href: '/' },
    { label: 'User Profile', href: '/profile' },
    { label: 'User Login',   href: '/login' },
    { label: 'New Account',  href: '/signup' },
  ]},
  { kind: 'group', label: 'Project', icon: Zap, children: [
    { label: 'Project',         href: '/projects' },
    { label: 'Project Details', href: '/projects/details' },
    { label: 'New Project',     href: '/projects/new' },
  ]},
  { kind: 'group', label: 'Client', icon: User, children: [
    { label: 'Manager Client', href: '/clients' },
    { label: 'Client Details', href: '/clients/details' },
  ]},
  { kind: 'link', label: 'Board',    href: '/board',    icon: LayoutDashboard },
  { kind: 'link', label: 'Calendar', href: '/calendar', icon: Calendar },
  { kind: 'link', label: 'Message',  href: '/messages', icon: MessageSquareText },
  { kind: 'group', label: 'Components', icon: Component, children: [
    { label: 'Apex Charts', href: '/charts' },
  ]},
]

export function Sidebar({ onClose }: { onClose: () => void }) {
  return (
    <aside className="fixed inset-y-0 left-0 w-[400px] bg-box border-r border-ring-light dark:border-ring-dark flex flex-col">
      <div className="flex items-center justify-between px-6 h-20">
        <Link href="/"><img src="/logo.png" className="h-[57px]" alt="Protend" /></Link>
        <button onClick={onClose} className="lg:hidden">
          <ChevronsLeft className="w-6 h-6" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-4">
        <ul className="space-y-1">
          {ITEMS.map((it, i) => <SidebarEntry key={i} item={it} />)}
          <li><DarkModeToggle /></li>
        </ul>
      </nav>
    </aside>
  )
}

function SidebarEntry({ item }: { item: SidebarItem }) {
  const pathname = usePathname()
  if (item.kind === 'link') {
    const active = pathname === item.href
    return (
      <li>
        <Link href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg
                          hover:bg-brand-softer
                          ${active ? 'bg-brand-softer text-brand' : ''}`}>
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </Link>
      </li>
    )
  }
  if (item.kind === 'group') {
    const [open, setOpen] = useState(item.children.some(c => pathname === c.href))
    return (
      <li>
        <button onClick={() => setOpen(o => !o)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brand-softer">
          <item.icon className="w-5 h-5" />
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <ul className="ml-9 mt-1 space-y-0.5">
            {item.children.map(c => (
              <li key={c.href}>
                <Link href={c.href}
                      className={`block px-3 py-2 rounded-md text-sm
                                  hover:text-brand
                                  ${pathname === c.href ? 'text-brand font-semibold' : ''}`}>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    )
  }
  return null
}
```

## Pontos de atenção

- O scroll custom (SimpleBar) não é necessário em React — o `overflow-y-auto` resolve. Mantenha apenas se quiser estética idêntica (use `simplebar-react`).
- O CSS original anima a abertura/fechamento via `max-height`. Em React, `framer-motion` ou Tailwind `transition-all` + medição de altura entrega resultado equivalente.
- Em telas `<1200px`, a sidebar deve ficar **off-canvas** (transform: translateX(-100%)) e abrir sobreposta. Implemente com `data-open` + `transition-transform`.
