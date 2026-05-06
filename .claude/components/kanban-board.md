# Kanban Board

Tela `board.html` — colunas verticais com tarefas arrastáveis.

## Estrutura geral

```
[fileira de IconCards de notificação no topo]
[Box do projeto: nome + ações]
┌──── Kanban ──────────────────────────────────┐
│  ┌Backlog─┐ ┌Designed─┐ ┌On Going─┐ ┌Done──┐ │
│  │ task   │ │ task    │ │ task    │ │ task │ │
│  │ task   │ │ task    │ │         │ │      │ │
│  │ + Add  │ │ + Add   │ │ + Add   │ │ +Add │ │
│  └────────┘ └─────────┘ └─────────┘ └──────┘ │
└──────────────────────────────────────────────┘
```

## Markup de uma coluna

```html
<div class="board-col">
  <div class="board-col-header d-flex justify-content-between">
    <h5 class="title">
      <span class="dot bg-orange"></span>
      Backlog
      <span class="count">4</span>
    </h5>
    <a href="#" class="btn-link"><i class='bx bx-dots-horizontal-rounded'></i></a>
  </div>

  <div class="board-col-body">

    <div class="board-card">
      <div class="tags d-flex">
        <span class="badge bg-color-7 color-7">Design</span>
        <span class="badge bg-color-8 color-8">UX</span>
      </div>
      <h6 class="card-title font-w600">Reduce signup friction</h6>
      <p class="fs-14 text-ink-muted">Etiam facilisis ligula nec velit posuere.</p>

      <div class="meta d-flex justify-content-between">
        <ul class="user-list">
          <li><img src="./images/avatar/user-1.png"></li>
          <li><img src="./images/avatar/user-2.png"></li>
        </ul>
        <ul class="actions">
          <li><i class="fas fa-paperclip"></i> 2</li>
          <li><i class="far fa-comment"></i> 5</li>
        </ul>
      </div>
    </div>

    <!-- mais cards… -->

    <a href="#" class="board-add-card">
      <i class='bx bx-plus'></i> Add new card
    </a>
  </div>
</div>
```

## Cores das colunas (dot)

| Coluna | Dot |
|--------|-----|
| Backlog | laranja `#FEA246` |
| Designed | azul `#496EE8` |
| On Going | amarelo `#FFBF3A` |
| Done | verde `#00BC39` |

## Tags coloridas

Reutilize `bg-color-N` + `color-N` para gerar badges contextuais (Design, UX, Marketing, Bug, etc.). Ver `tokens.md → paleta de utilitários`.

## Drag & Drop original

Implementado com **jQuery UI Sortable** (`libs/jquery/jquery-ui.min.js`). Cards podem ser arrastados entre colunas.

## Implementação React (com `@dnd-kit`)

```bash
npm install @dnd-kit/core @dnd-kit/sortable
```

```tsx
'use client'
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import { Plus, Paperclip, MessageCircle, MoreHorizontal } from 'lucide-react'

type Card = { id: string; title: string; description?: string; tags: { label: string; tone: 1|2|3|4|5|6|7|8|9|10|11|12|13 }[]; assignees: string[]; attachments: number; comments: number }
type Column = { id: string; title: string; dotColor: string; cards: Card[] }

export function KanbanBoard({ columns: initial }: { columns: Column[] }) {
  const [columns, setColumns] = useState(initial)

  function onDragEnd(e: DragEndEvent) {
    // adapt: encontre coluna de origem/destino, mova card
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div className="grid grid-flow-col auto-cols-[320px] gap-5 overflow-x-auto pb-4">
        {columns.map(col => (
          <BoardColumn key={col.id} column={col} />
        ))}
      </div>
    </DndContext>
  )
}

function BoardColumn({ column }: { column: Column }) {
  return (
    <section className="bg-surface-alt rounded-[10px] p-4">
      <header className="flex items-center justify-between mb-4">
        <h5 className="flex items-center gap-2 font-semibold">
          <span className="w-2 h-2 rounded-full" style={{ background: column.dotColor }} />
          {column.title}
          <span className="text-ink-muted text-sm">{column.cards.length}</span>
        </h5>
        <button><MoreHorizontal className="w-5 h-5" /></button>
      </header>

      <SortableContext items={column.cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
        <ul className="space-y-3">
          {column.cards.map(c => <SortableCard key={c.id} card={c} />)}
        </ul>
      </SortableContext>

      <button className="mt-3 w-full flex items-center gap-2 px-3 py-2 rounded-lg
                         text-ink-muted hover:bg-box transition">
        <Plus className="w-4 h-4" /> Add new card
      </button>
    </section>
  )
}

function SortableCard({ card }: { card: Card }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id })
  return (
    <li ref={setNodeRef} {...attributes} {...listeners}
        style={{ transform: CSS.Transform.toString(transform), transition }}
        className="bg-box rounded-lg p-4 shadow-sm cursor-grab active:cursor-grabbing">
      <div className="flex gap-2 mb-3">
        {card.tags.map(t => <Badge key={t.label} tone={t.tone}>{t.label}</Badge>)}
      </div>
      <h6 className="font-semibold text-base mb-1">{card.title}</h6>
      {card.description && <p className="text-sm text-ink-muted leading-tight">{card.description}</p>}

      <footer className="flex items-center justify-between mt-4">
        <ul className="flex -space-x-2">
          {card.assignees.slice(0,3).map(a => <li key={a}><img src={a} className="w-7 h-7 rounded-full ring-2 ring-box"/></li>)}
        </ul>
        <ul className="flex gap-3 text-xs text-ink-muted">
          <li className="flex items-center gap-1"><Paperclip className="w-4 h-4"/>{card.attachments}</li>
          <li className="flex items-center gap-1"><MessageCircle className="w-4 h-4"/>{card.comments}</li>
        </ul>
      </footer>
    </li>
  )
}
```

## Pontos de atenção

- O número total de tasks por coluna aparece **ao lado do título** — propague isso vindo de dados.
- O scroll horizontal é importante quando há mais de 4 colunas — preserve `overflow-x-auto`.
- Os cards têm sombra leve, **não a mesma do `.box`** — use `shadow-sm`.
- Adicionar/Editar tasks no template original abre **modal** — ver `modal.md` (modais `#add_card`, `#edit_card`).
