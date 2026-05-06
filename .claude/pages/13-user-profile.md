# Página: User Profile

**Arquivo original:** `protend/user-profile.html`
**Modificador no `<main>`:** `.main-content.user`
**Rota Next.js sugerida:** `/profile` (perfil do usuário logado)

## Visão geral

Painel pessoal com 4 KPIs (Total / Running / On Hold / Complete tasks), filtros (período + prioridade) e tabela de tarefas atribuídas.

## Estrutura

```
[ Sidebar ] [ Topbar ]
[ Main Content "user" ]
  Row 1
    [Box card-box] 4 IconCards customizados:
      bg-color-1 — Total Task (1225)
      bg-color-2 — Running Task (154+)
      bg-color-3 — On Hold Task (75+)
      bg-color-5 — Complete Task (120+)
  Row 2 — full width
    [Box] Filtros
      [Field "From"] (datepicker)
      [Field "To"]   (datepicker)
      [Select "Priority"] (High/Medium/Low)
      [Button "Search"]
    [Box body] DataTable de tarefas
```

## Componentes consumidos

| Componente | Documentação |
|-----------|-------------|
| Shell padrão | — |
| `<IconCard variant>` (variações 1, 2, 3, 5) | `components/icon-card.md` |
| `<KpiCounter />` (CountUp) | em `pages/10-project.md` |
| `<Field />` datepicker × 2 | `components/form-controls.md` |
| `<Select />` Priority | `components/form-controls.md` |
| `<Button />` Search | `components/form-controls.md` |
| `<TasksTable />` | base em `components/data-table.md` |

## Markup-resumo dos KPIs

```html
<div class="box card-box">
  <div class="icon-box bg-color-1">
    <div class="icon bg-icon-1"><i class='bx bxs-briefcase'></i></div>
    <div class="content">
      <h5 class="title-box fs-15">Total Task</h5>
      <div class="themesflat-counter color-1">
        <span class="number" data-from="0" data-to="1225" data-speed="2500">1225</span>
      </div>
    </div>
  </div>
  <!-- repete para Running (bg-color-2 + bx-task) / On Hold (bg-color-3 + bx-block) / Complete (bg-color-5 + bx-task white) -->
</div>
```

## Composição React

```tsx
// app/(dashboard)/profile/page.tsx
'use client'
import { useState } from 'react'
import { Briefcase, ListChecks, Ban, CheckCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'

const KPIS = [
  { variant: 1, icon: Briefcase, label: 'Total Task',    value: 1225 },
  { variant: 2, icon: ListChecks, label: 'Running Task', value: 154,  suffix: '+' },
  { variant: 3, icon: Ban,        label: 'On Hold Task', value: 75,   suffix: '+' },
  { variant: 5, icon: CheckCheck, label: 'Complete Task',value: 120,  suffix: '+' },
]

export default function ProfilePage() {
  const [filters, setFilters] = useState<{ from?: Date; to?: Date; priority?: 'High'|'Medium'|'Low' }>({})
  const tasks = useTasks(filters)

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map(k => (
          <IconCard key={k.label} variant={k.variant as 1|2|3|5} icon={k.icon} title={k.label}>
            <KpiCounter to={k.value} suffix={k.suffix} />
          </IconCard>
        ))}
      </section>

      <Box>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <Field label="From" type="date" onChange={e => setFilters(f => ({ ...f, from: new Date(e.target.value) }))} />
          <Field label="To"   type="date" onChange={e => setFilters(f => ({ ...f, to: new Date(e.target.value) }))} />
          <Select label="Priority" options={['High', 'Medium', 'Low']}
                  onChange={e => setFilters(f => ({ ...f, priority: e.target.value as any }))} />
          <Button variant="primary" type="button">Search</Button>
        </form>
      </Box>

      <Box title="My Tasks">
        <TasksTable data={tasks} />
      </Box>
    </div>
  )
}
```

## Pontos de atenção

- O template usa **Select2** para o select de prioridade — em React, prefira `react-select` para estética similar ou `<select>` nativo com classes utilitárias.
- A table de tasks deve mostrar: Project | Task | Priority badge | Due date | Status | Action.
- Adicione paginação server-side se a quantidade de tasks for grande.
