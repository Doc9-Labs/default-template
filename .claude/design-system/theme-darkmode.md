# Tema Claro / Escuro

O template suporta dark mode via classe `.dark` no elemento raiz. A troca é feita por um toggle no rodapé do sidebar.

## Como funciona

1. As cores funcionais (body, box, texto, borda, etc.) são CSS variables no `:root`.
2. O seletor `.dark` redefine essas variáveis.
3. O toggle adiciona/remove a classe `.dark` no `<body>` (ou `<html>`) via `js/main.js` → função `switchTheme()`.

```css
:root {
  --body-bg:#F9FAFE;
  --box-bg:#FFFFFF;
  --text-color:#222943;
  /* ... */
}
.dark {
  --body-bg:#1E1D2B;
  --box-bg:#252837;
  --border-color:#222028;
  --text-color:#FFFFFF;
  --menu-item-active-bg:#9B8DFF;
  --main-color:#FFFFFF;
  --bs-light:#212431;
}
```

Ver tabela completa em `tokens.md → Cores funcionais`.

## Markup do toggle

Está dentro do `<ul class="sidebar-menu">`, último item:

```html
<li>
  <a class="darkmode-toggle" id="darkmode-toggle" onclick="switchTheme()">
    <div>
      <i class='bx bx-cog mr-10'></i>
      <span>darkmode</span>
    </div>
    <span class="darkmode-switch"></span>
  </a>
</li>
```

`.darkmode-switch` é um pílula (~44px × 24px) com `.darkmode-switch::before` desenhando o "círculo" deslizante. Quando o `<body>` ganha `.dark`, o círculo translada para a direita (controlado por CSS, não JS).

## Particularidades a observar

- **Todos os `.bg-color-N` colapsam** para `#1E1D2B` (cor do body) no dark — só o ícone gradiente permanece colorido. Isso simplifica o tema e remove ruído visual.
- **`.dark a:hover`** força `color: #fff !important` — preserve para evitar links escuros sobre fundo escuro.
- **Sombras** (`--shadow`, `--shadow2`) **não são anuladas** no CSS original. Considere zerá-las no `.dark` (sombras escuras sobre fundo escuro tendem a poluir).
- A regra `.dark a, .dark button { --main-color:#3C21F7; --text-color:#3C21F7 }` reabre o roxo da marca em alguns elementos — é um hack: **valide caso a caso ao migrar.**

## Migração para Next.js

### Opção recomendada — `next-themes`

```bash
npm install next-themes
```

```tsx
// app/providers.tsx
'use client'
import { ThemeProvider } from 'next-themes'
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
```

```tsx
// app/layout.tsx
import { Providers } from './providers'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="sidebar-expand"><Providers>{children}</Providers></body>
    </html>
  )
}
```

```tsx
// components/DarkModeToggle.tsx
'use client'
import { useTheme } from 'next-themes'
import { Settings } from 'lucide-react'

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-brand-softer"
    >
      <span className="flex items-center gap-2 text-sm">
        <Settings className="w-4 h-4" /> dark mode
      </span>
      <span data-on={isDark}
            className="relative w-11 h-6 rounded-full bg-surface-alt
                       data-[on=true]:bg-brand transition-colors">
        <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white
                         transition-transform data-[on=true]:translate-x-5" />
      </span>
    </button>
  )
}
```

### Tailwind config

```ts
// tailwind.config.ts
export default {
  darkMode: 'class', // ← essencial para casar com o CSS original
  // ...
}
```

### CSS variables ainda úteis

Mantenha as CSS variables se quiser preservar a estratégia "trocar o `:root` em `.dark`" — o Tailwind aceita perfeitamente:

```css
@layer base {
  :root {
    --body-bg: #F9FAFE;
    --box-bg: #FFFFFF;
    --text:    #222943;
  }
  .dark {
    --body-bg: #1E1D2B;
    --box-bg: #252837;
    --text:    #FFFFFF;
  }
}
```

E em Tailwind:

```ts
colors: {
  body: 'var(--body-bg)',
  box:  'var(--box-bg)',
  ink:  'var(--text)',
}
```

Aí qualquer `bg-body` ou `bg-box` reage automaticamente ao tema.
