# Página: Project (lista de projetos)

**Arquivo original:** `protend/project.html`
**Modificador no `<main>`:** `.main-content.project`
**Rota Next.js sugerida:** `/projects`

## Visão geral

Página de gestão de projetos. Topo com 4 KPIs (Total / Pending / On Going / Complete) e CTA "Create New Project". Abaixo, uma seção "Recent Project Update" com cards detalhados em grade.

## Estrutura

```
[ Sidebar ] [ Topbar ]
[ Main Content "project" ]
  Row 1
    Col-9 (xl col-7)
      [Box card-box] 4 KPIs com contadores animados
        - Total Project (1225+)
        - Pending Project (75+)
        - On Going project (1225+)
        - Complete Project (2536+)
    Col-3 (xl col-5)
      [Box] CTA cheio "Create New Project" → new-project.html
  Row 2
    Header "Recent Project Update" + ações: "Add Project" / "View All" / Dropdown filtro
    Grade de cards com left-dot (variante de ProjectCard com indicador colorido à esquerda)
      - Cada card mostra: nome, departamento, snippet, ícone ilustrativo
      - Footer: chart-circle %, avatares, badge prioridade (High/Medium/Low), kebab
```

## Componentes consumidos

| Componente | Documentação |
|-----------|-------------|
| Shell padrão | — |
| `<KpiCounter />` (custom — usa `themesflat-counter` no original) | inline |
| `<CtaCard />` "Create New Project" | inline |
| `<ProjectCardLeftDot />` (variação) | base em `components/project-card.md` |
| `<CircleProgress size="xs" />` | `components/progress-bar.md` |
| `<AvatarStack />` | `components/avatar-stack.md` |
| Badge de prioridade | `tokens.md` (cores 7/8/9) |
| `<Dropdown />` filtro Latest/Monthly/Weekly | `components/dropdown.md` |

## Cards "left-dot"

```html
<div class="box left-dot">
  <div class="box-body">
    <a class="box-title font-w600 fs-18">Adobe XD</a>
    <p class="fs-14 text-muted">Designing Department</p>
    <span class="fs-13 text-muted">There are many variations of passages</span>
    <img src="./images/icon/experience.png" class="img-box">
  </div>
  <div class="box-footer d-flex align-items-center">
    <div class="chart-circle chart-circle-xs" data-value="0.75">
      <canvas></canvas><div class="chart-circle-value">75%</div>
    </div>
    <ul class="user-list mb-0">…3 avatares…</ul>
    <div class="ms-auto d-flex">
      <div class="task-btn bg-danger-1 text-danger">High</div>
      <div class="dropdown">…⋮ View/Add/Remove/More…</div>
    </div>
  </div>
</div>
```

A "left-dot" se refere a uma faixa colorida vertical à esquerda do card que indica status (preto/azul/laranja/verde dependendo do estado).

## Composição React

```tsx
// app/(dashboard)/projects/page.tsx
import { Plus, Eye, Trash2, Settings } from 'lucide-react'

const KPIS = [
  { label: 'Total Project',   value: 1225, color: 6, suffix: '+' },
  { label: 'Pending Project', value: 75,   color: 7, suffix: '+' },
  { label: 'On Going project',value: 1225, color: 8, suffix: '+' },
  { label: 'Complete Project',value: 2536, color: 9, suffix: '+' },
]

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {KPIS.map(k => <KpiTile key={k.label} {...k} />)}
        </div>
        <Link href="/projects/new"
              className="lg:col-span-3 grid place-items-center bg-brand text-white rounded-[10px] p-8 hover:bg-brand/90">
          <div className="text-center">
            <Plus className="w-10 h-10 mx-auto" />
            <h5 className="font-semibold mt-2">Create New Project</h5>
          </div>
        </Link>
      </section>

      <section>
        <header className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h4 className="text-2xl font-semibold">Recent Project Update</h4>
          <div className="flex items-center gap-2">
            <Button variant="outline"><Plus className="w-4 h-4 mr-1"/> Add Project</Button>
            <Button variant="light"><Eye className="w-4 h-4 mr-1" /> View All</Button>
            <SortDropdown options={['Latest', 'Monthly', 'Yearly', 'Weekly']} />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {projects.map(p => <ProjectCardLeftDot key={p.id} project={p} />)}
        </div>
      </section>
    </div>
  )
}
```

## Pontos de atenção

- Os contadores no template (`themesflat-counter`) animam de 0 até o valor ao entrar no viewport. Use `react-countup` + `react-intersection-observer`:
  ```tsx
  import CountUp from 'react-countup'
  import { useInView } from 'react-intersection-observer'
  ```
- A "left-dot" pode ser implementada com `border-l-4 border-l-[color]` no Tailwind.
- Em telas ≤1640px o layout do topo (`col-9` + `col-3`) deve permitir mais espaço aos KPIs — espelhe `xl col-7 / xl col-5`.
