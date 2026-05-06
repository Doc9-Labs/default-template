# Página: Calendar

**Arquivo original:** `protend/calendar.html`
**Modificador no `<main>`:** `.main-content.calendar` (genérico)
**Rota Next.js sugerida:** `/calendar`

## Visão geral

Calendário em tela cheia (FullCalendar) com eventos coloridos.

## Estrutura

```
[ Sidebar ] [ Topbar ]
[ Main Content ]
  Row 1 — IconCards (Notification | Message | Calendar | Create New Project)
  Row 2 — full width
    [Box] <div id="calendar"></div>
  + modal #add_project
```

## Componentes consumidos

| Componente | Documentação |
|-----------|-------------|
| `<Sidebar />`, `<Topbar />` (título "Calendar") | `components/sidebar.md`, `components/topbar.md` |
| `<IconCard />` × 4 | `components/icon-card.md` |
| `<Box />` | `components/box.md` |
| `<AppCalendar />` (FullCalendar) | `components/calendar.md` |
| `<AddProjectModal />` | `components/modal.md` |

## Libs JS específicas

- FullCalendar 5 (`libs/fullcalendar/`)
- Moment.js
- Bootstrap (modal)

## Composição React (sugestão)

```tsx
// app/(dashboard)/calendar/page.tsx
import { AppCalendar } from '@/components/AppCalendar'

const events = [
  { id: '1', title: 'Sprint Planning', date: '2026-05-08', color: '#3C21F7' },
  { id: '2', title: 'Design Review',   date: '2026-05-12', color: '#FFBF3A' },
  { id: '3', title: 'QA Day',          date: '2026-05-20', color: '#00BC39' },
]

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <IconCardsRow />
      <Box className="overflow-hidden">
        <AppCalendar events={events} />
      </Box>
    </div>
  )
}
```

## Pontos de atenção

- FullCalendar não roda no servidor — use `dynamic(..., { ssr: false })` em Next.js.
- O CSS do FullCalendar tende a "vazar" estilos. Encapsule com `:where(.fc) { … }` ou use o seletor especificado em `components/calendar.md`.
- Ao clicar em uma data vazia, o template original abre o modal `#add_project`. Em React, conecte via `dateClick={() => setOpen(true)}`.
