# Topbar (Main Header)

Barra fixa no topo, à direita da sidebar. Altura `136px` desktop / `90px` ≤1200px.

## Markup-fonte (resumido de `index.html`)

```html
<div class="main-header">
  <div class="d-flex">
    <div class="mobile-toggle" id="mobile-toggle"><i class='bx bx-menu'></i></div>
    <div class="main-title">Dashboard</div>
  </div>

  <div class="d-flex align-items-center">
    <!-- Busca desktop -->
    <form class="app-search d-none d-lg-block">
      <div class="position-relative">
        <input type="text" class="form-control" placeholder="Search">
        <span class="bx bx-search-alt"></span>
      </div>
    </form>

    <!-- Busca mobile (dropdown) -->
    <div class="dropdown d-inline-block d-lg-none ms-2">
      <button class="btn header-item" data-bs-toggle="dropdown">
        <i class='bx bx-search-alt'></i>
      </button>
      <div class="dropdown-menu p-0">…form…</div>
    </div>

    <!-- Idiomas -->
    <div class="dropdown d-inline-block">
      <button class="btn header-item" data-bs-toggle="dropdown">
        <span class="btn dropdown-toggle">EN <i class='bx bx-caret-down'></i></span>
      </button>
      <div class="dropdown-menu dropdown-menu-end">
        <a class="dropdown-item language" data-lang="en">
          <img src="./images/flags/us.jpg" height="12"> English
        </a>
        … sp / gr / it / ru …
      </div>
    </div>

    <!-- Perfil -->
    <div class="dropdown d-inline-block mt-12">
      <button class="btn header-item" data-bs-toggle="dropdown">
        <img class="rounded-circle header-profile-user" src="./images/profile/profile.png">
        <span class="pulse-css"></span>
        <span class="info d-xl-inline-block color-span">
          <span class="d-block fs-20 font-w600">Randy Riley</span>
          <span class="d-block mt-7">randy.riley@gmail.com</span>
        </span>
        <i class='bx bx-chevron-down'></i>
      </button>
      <div class="dropdown-menu dropdown-menu-end">
        <a class="dropdown-item" href="#"><i class="bx bx-user"></i> Profile</a>
        <a class="dropdown-item" href="#"><i class="bx bx-wallet"></i> My Wallet</a>
        <a class="dropdown-item d-block" href="#">
          <span class="badge bg-success float-end">11</span>
          <i class="bx bx-wrench"></i> Settings
        </a>
        <a class="dropdown-item" href="#"><i class="bx bx-lock-open"></i> Lock screen</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item text-danger" href="user-login.html">
          <i class="bx bx-power-off text-danger"></i> Logout
        </a>
      </div>
    </div>
  </div>
</div>
```

## Slots

| Slot | Componente |
|------|-----------|
| Esquerda | Hamburger (mobile) + título da página |
| Centro/direita | Busca |
| Direita | Seletor de idioma |
| Direita | Avatar + nome + email + dropdown |

## Particularidades

- O `.pulse-css` é um indicador animado verde sobreposto ao avatar (status online).
- O nome+email **somem em telas <xl** (`.d-xl-inline-block`). Mantenha esse comportamento — abaixo de 1200px sobra só o avatar.
- Cada idioma usa uma bandeira como `<img height="12">` em `images/flags/`. Em React substitua por componentes de bandeira (`country-flag-icons`) ou por emoji (`🇺🇸 🇪🇸 🇩🇪 🇮🇹 🇷🇺`).

## Sugestão React

```tsx
'use client'
import { useState } from 'react'
import { Menu, Search, ChevronDown, User, Wallet, Wrench, Unlock, Power } from 'lucide-react'

export function Topbar({ title, onMenu }: { title: string; onMenu: () => void }) {
  return (
    <header className="fixed top-0 left-0 lg:left-[400px] right-0 h-[90px] lg:h-[136px]
                       bg-body z-30 flex items-center justify-between px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <button onClick={onMenu} className="lg:hidden p-2"><Menu /></button>
        <h1 className="font-semibold text-2xl">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <SearchBox />
        <LanguageMenu />
        <ProfileMenu />
      </div>
    </header>
  )
}

function SearchBox() {
  return (
    <form className="hidden lg:block relative">
      <input
        className="h-11 w-[280px] rounded-lg bg-surface-alt pl-4 pr-10 outline-none focus:ring-2 ring-brand"
        placeholder="Search"
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted" />
    </form>
  )
}

const LANGS = [
  { code: 'en', label: 'English',  flag: '🇺🇸' },
  { code: 'sp', label: 'Spanish',  flag: '🇪🇸' },
  { code: 'gr', label: 'German',   flag: '🇩🇪' },
  { code: 'it', label: 'Italian',  flag: '🇮🇹' },
  { code: 'ru', label: 'Russian',  flag: '🇷🇺' },
]

function LanguageMenu() {
  const [lang, setLang] = useState('en')
  // … dropdown …
}

function ProfileMenu() {
  // avatar + nome (xl+) + dropdown { Profile / Wallet / Settings(11) / Lock / Logout }
}
```

## Pontos de atenção

- A propriedade `position: fixed` do header soma com a `position: fixed` da sidebar. Em React/Tailwind, use `lg:left-[400px]` no header para deixar o espaço da sidebar — espelhando o que o `.main` faz.
- Em mobile, o `mobile-toggle` é o **único** caminho para abrir a sidebar — preserve o handler.
- O dropdown de "Settings" mostra um badge com contador (`11`). Trate como prop ou contexto de notificações.
- O CSS original mantém o título à esquerda e o resto colado à direita (`d-flex justify-content-between`).
