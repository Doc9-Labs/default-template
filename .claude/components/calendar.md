# Calendar

O template usa **dois calendários** distintos:

| Lib | Onde | Tamanho |
|-----|------|---------|
| **Pignose Calendar** | Sidebar/widget pequeno, dashboard | Compacto (mini) |
| **FullCalendar 5** | Página `calendar.html` | Tela cheia |

## 1) Pignose Calendar (mini)

### Markup

```html
<div class="datepicker-here" data-language="en"></div>
```

### Init

```js
$('.datepicker-here').pignoseCalendar({
  format: 'YYYY-MM-DD',
  schedules: [{ name: 'Meeting', date: '2026-05-10', backgroundColor: '#3C21F7', textColor: '#fff' }],
});
```

### Substituto React

Recomendado: **`react-day-picker`**:

```bash
npm install react-day-picker date-fns
```

```tsx
import { DayPicker } from 'react-day-picker'
import { ptBR } from 'date-fns/locale'

export function MiniCalendar({ selected, onSelect, eventDays = [] }: {
  selected?: Date
  onSelect?: (d: Date | undefined) => void
  eventDays?: Date[]
}) {
  return (
    <DayPicker
      mode="single" locale={ptBR}
      selected={selected} onSelect={onSelect}
      modifiers={{ event: eventDays }}
      modifiersClassNames={{ event: 'has-event' }}
      className="bg-box rounded-[10px] p-4"
    />
  )
}
```

```css
/* globals.css */
.has-event { position: relative; }
.has-event::after {
  content: ''; position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%);
  width: 4px; height: 4px; border-radius: 50%; background: var(--brand, #3C21F7);
}
```

## 2) FullCalendar (calendar.html)

### Markup

```html
<div id="calendar"></div>
```

### Init original (`js/pages/fullcalendar.js`)

```js
var calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
  initialView: 'dayGridMonth',
  headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' },
  events: [
    { title: 'Meeting', date: '2026-05-08', backgroundColor: '#3C21F7' },
    { title: 'Design Review', date: '2026-05-12', backgroundColor: '#FFBF3A' },
  ],
});
calendar.render();
```

### Substituto React

```bash
npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/list @fullcalendar/interaction
```

```tsx
'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

export function AppCalendar({ events }: { events: { id: string; title: string; date: string; color?: string }[] }) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      }}
      events={events.map(e => ({ ...e, backgroundColor: e.color ?? '#3C21F7', borderColor: e.color ?? '#3C21F7' }))}
      height="auto"
    />
  )
}
```

### Override visual

FullCalendar carrega CSS próprio. Para casar com o tema:

```css
.fc { font-family: 'Poppins', sans-serif; }
.fc-toolbar-title { color: var(--text-color); }
.fc-button { background: var(--brand) !important; border-color: var(--brand) !important; }
.fc-day-today { background: rgba(60,33,247,0.05) !important; }
```

## Daily Task list (variante Dashboard)

No `index.html` há um widget "Daily Task" que **não** é calendário, mas lista hora + cor:

```html
<div class="content-item">
  <div class="left"><h5>10:00</h5></div>
  <div class="right bg-orange">
    <div class="content-box w-100">
      <h5 class="text-white">iOs Dev team meeting</h5>
      <h6 class="text-w07">10:00 - 11:00</h6>
    </div>
  </div>
</div>
```

Trate como componente próprio (`<DailyTaskList />`) — não como calendário.
