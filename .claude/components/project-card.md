# Project Card

Card individual de um projeto — aparece em **carrossel** (dashboard) e em **grid** (página `project.html`).

## Markup-fonte (`index.html`)

```html
<div class="box box-carousel">
  <div class="card-top">
    <div class="sm-f-wrap d-flex">
      <h5 class="icon-gold text-white bg-green">G</h5>      <!-- avatar/iniciais -->
      <a href="project-details.html" class="h5 t-title">Gold App</a>
    </div>
    <div class="dropdown">                                   <!-- menu kebab -->
      <a href="javascript:void(0);" class="btn-link" data-bs-toggle="dropdown">
        <svg width="24" height="24">…3 dots verticais…</svg>
      </a>
      <div class="dropdown-menu dropdown-menu-right">
        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_project">
          <i class="bx bx-trash"></i> Delete
        </a>
        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#edit_project">
          <i class="bx bx-edit mr-5"></i>Edit
        </a>
      </div>
    </div>
  </div>

  <div class="card-center">
    <h6 class="font-w400 fs-16">Task Done:23/45</h6>
    <div class="progress skill-progress mb-23" style="height:7px; width: 80%;">
      <div class="progress-bar bg-primary progress-animated" style="width: 52%; height:7px;"></div>
    </div>
    <div class="sm-f-wrap d-flex justify-content-between">
      <ul class="user-list">
        <li><img src="./images/avatar/user-1.png"></li>
        <li><img src="./images/avatar/user-2.png"></li>
        <li><img src="./images/avatar/user-3.png"></li>
        <li><img src="./images/avatar/user-4.png"></li>
        <li><img src="./images/avatar/user-5.png"></li>
      </ul>
      <ul class="tf-icon-list">
        <li><a href="#"><i class='bx bx-calendar'></i></a></li>
        <li><a href="#"><i class='bx bxs-star'></i></a></li>
      </ul>
    </div>
  </div>
</div>
```

## Anatomia

```
┌──────────────────────────────────────┐
│  ┌─┐ Gold App                  ⋮     │ <- card-top: avatar + title + menu
│  └─┘                                  │
├──────────────────────────────────────┤
│  Task Done: 23/45                    │ <- card-center
│  ████████░░░░░░░░  52%               │
│  👤👤👤👤👤              📅 ⭐       │
└──────────────────────────────────────┘
```

## Variações de cor do "avatar de iniciais"

- `bg-green` (`#00BC39`)
- `bg-yellow` (`#FFBF3A`)
- `bg-blue` (`#5F45FF`)
- `bg-orange`, `bg-red`, `bg-light`, etc.

A letra é a inicial do nome do projeto: `<h5 class="icon-gold text-white bg-green">G</h5>`.

## Componente React

```tsx
import { Calendar, Star, MoreVertical, Trash2, Pencil } from 'lucide-react'

type Project = {
  id: string
  name: string
  initial: string
  color: 'green' | 'yellow' | 'blue' | 'orange' | 'red' | 'purple'
  tasksDone: number
  tasksTotal: number
  members: { id: string; avatarUrl: string; name: string }[]
  starred: boolean
  href: string
}

const INITIAL_BG = {
  green:  'bg-[#00BC39]',
  yellow: 'bg-[#FFBF3A]',
  blue:   'bg-[#5F45FF]',
  orange: 'bg-[#FFA143]',
  red:    'bg-[#F7284A]',
  purple: 'bg-brand',
}

export function ProjectCard({ project, onEdit, onDelete }: {
  project: Project
  onEdit: () => void
  onDelete: () => void
}) {
  const pct = Math.round((project.tasksDone / project.tasksTotal) * 100)

  return (
    <article className="bg-box rounded-[10px] p-5 shadow-[0_0_50px_0_rgb(42_89_152_/_0.10)] dark:shadow-none">
      <header className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className={`grid place-items-center w-10 h-10 rounded-lg text-white font-semibold ${INITIAL_BG[project.color]}`}>
            {project.initial}
          </span>
          <a href={project.href} className="text-lg font-semibold hover:text-brand">
            {project.name}
          </a>
        </div>
        <KebabMenu onEdit={onEdit} onDelete={onDelete} />
      </header>

      <div>
        <p className="text-sm text-ink-muted mb-2">Task Done: {project.tasksDone}/{project.tasksTotal}</p>
        <div className="h-[7px] w-4/5 rounded-full bg-surface-alt mb-5">
          <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex items-center justify-between">
          <ul className="flex -space-x-2">
            {project.members.slice(0, 5).map(m => (
              <li key={m.id}>
                <img src={m.avatarUrl} alt={m.name} className="w-8 h-8 rounded-full ring-2 ring-box" />
              </li>
            ))}
          </ul>
          <div className="flex gap-2 text-ink-muted">
            <button aria-label="Schedule"><Calendar className="w-5 h-5" /></button>
            <button aria-label="Star" data-active={project.starred}>
              <Star className="w-5 h-5 data-[active=true]:fill-yellow-400 data-[active=true]:text-yellow-400" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
```

## Pontos de atenção

- O carrossel do Dashboard usa Owl Carousel. Em React → `embla-carousel-react`.
- Em `project.html` o mesmo card aparece em grade `.col-4 / .col-6 / .col-12` responsiva, com botão "Create New Project" como primeiro item.
- O bloco de avatares se repete (`avatar-stack.md`) — extraia como componente.
