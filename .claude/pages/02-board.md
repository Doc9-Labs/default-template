# Página: Board (Kanban)

**Arquivo original:** `protend/board.html`
**Modificador no `<main>`:** `.main-content.board`
**Rota Next.js sugerida:** `/board`

## Visão geral

Quadro Kanban com colunas (Backlog / Designed / On Going / Done) e cards arrastáveis. Inclui resumo do projeto no topo (nome, equipe, ações).

## Estrutura

```
[ Sidebar ] [ Topbar ]
[ Main Content "board" ]
  Row 1 — IconCards (Notification | Message | Calendar | Create New Project)
  Row 2 — Cabeçalho do projeto
    [Box] Nome do projeto + Project Details + ⭐ + ⋮
          Team Name | 32 Comments | Edit | Invite People | New ▾
          Avatares da equipe
  Row 3 — Kanban com 4 colunas
```

## Componentes consumidos

| Componente | Documentação |
|-----------|-------------|
| `<Sidebar />`, `<Topbar />` | `components/sidebar.md`, `components/topbar.md` |
| `<IconCard />` × 4 | `components/icon-card.md` |
| `<Box />` (cabeçalho do projeto) | `components/box.md` |
| `<AvatarStack size={40} />` | `components/avatar-stack.md` |
| `<KanbanBoard />` | `components/kanban-board.md` |
| `<Dropdown />` (kebabs) | `components/dropdown.md` |
| `<AddCardModal />`, `<DeleteProjectModal />` | `components/modal.md` |

## Cabeçalho do projeto (markup-resumo)

```html
<div class="box">
  <div class="box-header">
    <h4 class="box-title">Here will be full project name</h4>
    <div class="box-right d-flex">
      <a class="btn" href="project-details.html">Project Details</a>
      <div class="icon-ratting"><i class='bx bxs-star'></i></div>
      <div class="dropdown">…⋮ Delete/Edit…</div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="box-body d-flex justify-content-between">
    <div class="team-name"><a href="#" class="team"><i class="fas fa-tags"></i><h5>Team Name</h5></a></div>
    <div class="action">
      <a href="#" class="comment">32 Comments</a>
      <a href="#" class="edit">Edit</a>
      <a href="#" class="invite"><i class="fas fa-user-plus"></i>Invite People</a>
      <a href="#" class="add">New<i class="fas fa-caret-down"></i></a>
    </div>
    <ul class="user-list s2">…avatares…</ul>
  </div>
</div>
```

## Libs JS específicas

- jQuery UI (sortable para arrastar cards)
- Bootstrap 5 (modais)

## Composição React (sugestão)

```tsx
// app/(dashboard)/board/page.tsx
'use client'
import { useState } from 'react'
import { Star, Tag, Pencil, MessageSquare, UserPlus, ChevronDown, MoreVertical } from 'lucide-react'

export default function BoardPage() {
  const [columns, setColumns] = useState(initialColumns)

  return (
    <div className="space-y-6">
      <IconCardsRow />

      <Box>
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{project.name}</h2>
          <div className="flex items-center gap-3">
            <Link href="/projects/details" className="btn btn-light">Project Details</Link>
            <button aria-label="Star"><Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /></button>
            <ProjectMenu />
          </div>
        </header>
        <hr className="my-4 border-ring-light dark:border-ring-dark" />
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-ink-muted">
            <Tag className="w-4 h-4" /> <h5 className="font-semibold">{project.teamName}</h5>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a><MessageSquare className="w-4 h-4 inline mr-1" /> 32 Comments</a>
            <a><Pencil className="w-4 h-4 inline mr-1" /> Edit</a>
            <a><UserPlus className="w-4 h-4 inline mr-1" /> Invite People</a>
            <button className="btn btn-primary inline-flex items-center gap-1">
              New <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <AvatarStack members={project.team} size={40} />
        </div>
      </Box>

      <KanbanBoard columns={columns} onChange={setColumns} />
    </div>
  )
}
```

## Pontos de atenção

- Em ≤991px, o cabeçalho do projeto vira layout em colunas empilhadas — preserve `flex-wrap` e mantenha os avatares no fim.
- O botão "New ▾" é um dropdown com tipos de tarefa (Story, Bug, Task) — implemente como Radix Dropdown.
- O `<KanbanBoard />` deve ter scroll horizontal próprio, não da página.
