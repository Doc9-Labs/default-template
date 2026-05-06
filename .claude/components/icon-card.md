# IconCard

Cartão colorido com ícone gradiente — aparece como **fileira de 4** no topo de quase todas as páginas (Notification, Message, Calendar, Create New Project).

## Markup-fonte (de `index.html`)

```html
<div class="box card-box">
  <!-- 1) Notification -->
  <div class="icon-box bg-color-1">
    <div class="icon bg-icon-1"><i class="bx bxs-bell bx-tada"></i></div>
    <div class="content">
      <h5 class="title-box">Notification</h5>
      <p class="color-1 mb-0 pt-4">5 Unread notification</p>
    </div>
  </div>

  <!-- 2) Message com dropdown de notificações -->
  <div class="icon-box bg-color-2">
    <div class="icon bg-icon-2"><i class='bx bxs-message-rounded'></i></div>
    <div class="content click-c">
      <h5 class="title-box">Message</h5>
      <p class="color-2 mb-0 pt-4">5 Unread notification</p>
    </div>
    <div class="notification-list card">…ver notification-list.md…</div>
  </div>

  <!-- 3) Calendar (link) -->
  <div class="icon-box bg-color-3">
    <a class="create d-flex" href="calendar.html">
      <div class="icon bg-icon-3"><i class="bx bx-calendar"></i></div>
      <div class="content">
        <h5 class="title-box">Calendar</h5>
        <p class="color-3 mb-0 pt-4">5 Unread notification</p>
      </div>
    </a>
  </div>

  <!-- 4) CTA principal (cor sólida) -->
  <div class="icon-box bg-color-4">
    <a class="create d-flex" href="#" data-toggle="modal" data-target="#add_project">
      <div class="icon bg-white"><i class="bx bx-plus"></i></div>
      <div class="content d-flex align-items-center">
        <h5 class="color-white">Create New Project</h5>
      </div>
    </a>
  </div>
</div>
```

## Anatomia

```
┌──────────────────────────────────────┐
│  ┌──┐  Title                         │ <- bg: bg-color-N (suave)
│  │🔔│  5 Unread notification         │ <- icon: bg-icon-N (gradiente)
│  └──┘                                │ <- texto: color-N
└──────────────────────────────────────┘
```

| Variação | Uso típico | Cores |
|----------|-----------|-------|
| `bg-color-1` | Notificação | Amarelo |
| `bg-color-2` | Mensagem | Verde |
| `bg-color-3` | Calendário | Roxo |
| `bg-color-4` | CTA principal (cor sólida) | Roxo cheio + ícone branco |

## Comportamento

- O card 2 (Message) **abre uma lista flutuante** ao clicar (`.click-c`) — ver `notification-list.md`. JS em `js/main.js`.
- O card 3 (Calendar) é um link normal.
- O card 4 (Create New Project) abre o **modal** `#add_project`. Ver `modal.md`.

## Componente React

```tsx
import { type LucideIcon } from 'lucide-react'

type Variant = 1 | 2 | 3 | 4
type IconCardProps = {
  variant: Variant
  icon: LucideIcon
  title: string
  caption?: string
  href?: string
  onClick?: () => void
  children?: React.ReactNode  // dropdown de notificações, etc.
}

const VARIANT_BG = {
  1: 'bg-[rgba(255,188,3,0.1)] dark:bg-[#1E1D2B]',
  2: 'bg-[#E5F8EB] dark:bg-[#1E1D2B]',
  3: 'bg-[rgba(60,33,247,0.1)] dark:bg-[#1E1D2B]',
  4: 'bg-brand text-white',
} as const

const VARIANT_ICON = {
  1: 'bg-gradient-to-b from-[#FFBB00] to-[#FFF574] text-white',
  2: 'bg-gradient-to-b from-[#00843E] to-[#59F187] text-white',
  3: 'bg-gradient-to-b from-[#3C21F7] to-[#9B8DFF] text-white',
  4: 'bg-white text-brand',
} as const

const VARIANT_TEXT = {
  1: 'text-[#FFBB01]', 2: 'text-[#00BC39]', 3: 'text-[#9687FE]', 4: 'text-white',
} as const

export function IconCard({ variant, icon: Icon, title, caption, href, onClick, children }: IconCardProps) {
  const Wrap = href ? 'a' : (onClick ? 'button' : 'div')
  return (
    <Wrap href={href} onClick={onClick}
          className={`relative flex items-center gap-4 p-5 rounded-[10px] flex-1 min-w-[260px] ${VARIANT_BG[variant]}`}>
      <span className={`grid place-items-center w-14 h-14 rounded-2xl ${VARIANT_ICON[variant]}`}>
        <Icon className="w-6 h-6" />
      </span>
      <span className="flex flex-col">
        <span className="font-semibold text-lg">{title}</span>
        {caption && <span className={`text-sm pt-1 ${VARIANT_TEXT[variant]}`}>{caption}</span>}
      </span>
      {children}
    </Wrap>
  )
}
```

### Composição

```tsx
<div className="flex flex-wrap gap-4">
  <IconCard variant={1} icon={Bell}    title="Notification" caption="5 Unread notification" />
  <IconCard variant={2} icon={MessageCircle} title="Message" caption="5 Unread notification">
    <NotificationList />
  </IconCard>
  <IconCard variant={3} icon={Calendar} title="Calendar" caption="5 Unread notification" href="/calendar" />
  <IconCard variant={4} icon={Plus}     title="Create New Project" onClick={openAddProject} />
</div>
```

## Pontos de atenção

- Em ≤1820px viram **2 colunas** (47% width); em ≤1200px continuam 2 colunas (49% width); em ≤575px viram 1 coluna.
- O ícone do card 1 tem animação `bx-tada` (Boxicons). Em Lucide, simule com `animate-pulse` ou um keyframe próprio.
- O badge `5 Unread notification` é repetido literalmente nos 3 primeiros cards no template — em produção venha de dados.
