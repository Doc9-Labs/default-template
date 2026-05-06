# Página: Project Details

**Arquivo original:** `protend/project-details.html`
**Rota Next.js sugerida:** `/projects/[id]`

## Visão geral

Detalhamento de um projeto. Cabeçalho com identidade, métricas, equipe, datas; corpo com tabs (Overview / Tasks / Files / Activity / Discussion).

## Estrutura

```
[ Sidebar ] [ Topbar ]
[ Main Content ]
  Row 1 — IconCards
  Row 2 — Cabeçalho do projeto
    [Box] título + status + descrição curta + ações (Edit, Delete, Star)
  Row 3 — KPIs do projeto (Total Tasks, Open, In Progress, Done) — usando bg-color-N
  Row 4 — Tabs com conteúdo
    [Tab Overview]   → descrição longa, datas, prioridade, cliente, time, progresso, gráficos
    [Tab Tasks]      → tabela ou kanban embutido
    [Tab Files]      → lista de arquivos
    [Tab Activity]   → timeline
    [Tab Discussion] → comentários
  Sidebar lateral (col-4)
    [Box] Team (avatares + funções)
    [Box] Tags
    [Box] Important dates
    [Box] Budget
```

## Componentes consumidos

| Componente | Documentação |
|-----------|-------------|
| Shell padrão | — |
| `<IconCard />` × 4 | `components/icon-card.md` |
| `<Box />` | `components/box.md` |
| `<Tabs />` (Radix UI Tabs) | inline |
| `<KpiTile />` (KPIs do projeto) | similar a `pages/10-project.md` |
| `<ProgressBar />`, `<CircleProgress />` | `components/progress-bar.md` |
| `<AvatarStack />` | `components/avatar-stack.md` |
| Timeline de atividades | seção própria |
| Tabela de tasks | `components/data-table.md` |

## Composição React

```tsx
// app/(dashboard)/projects/[id]/page.tsx
import * as Tabs from '@radix-ui/react-tabs'
import { Star, Pencil, Trash2 } from 'lucide-react'

export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id)
  const tasks = await getTasks(params.id)
  const activities = await getActivities(params.id)

  return (
    <div className="space-y-6">
      <IconCardsRow />

      <Box>
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{project.name}</h2>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs bg-[#E6FAF4] text-[#35CF96]">
              {project.status}
            </span>
            <p className="text-ink-muted mt-3 max-w-2xl">{project.shortDescription}</p>
          </div>
          <div className="flex items-center gap-2">
            <button><Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /></button>
            <Button variant="light"><Pencil className="w-4 h-4 mr-1" /> Edit</Button>
            <Button variant="danger"><Trash2 className="w-4 h-4 mr-1" /> Delete</Button>
          </div>
        </header>
      </Box>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile label="Total Tasks"  value={project.totalTasks}  color={6} />
        <KpiTile label="Open"         value={project.openTasks}   color={7} />
        <KpiTile label="In Progress"  value={project.doingTasks}  color={8} />
        <KpiTile label="Done"         value={project.doneTasks}   color={9} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs.Root defaultValue="overview" className="space-y-4">
            <Tabs.List className="flex gap-2 border-b border-ring-light dark:border-ring-dark">
              {['overview','tasks','files','activity','discussion'].map(t => (
                <Tabs.Trigger key={t} value={t}
                              className="px-4 py-3 -mb-px border-b-2 border-transparent
                                         data-[state=active]:border-brand data-[state=active]:text-brand
                                         capitalize font-semibold">
                  {t}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <Tabs.Content value="overview">
              <Box>
                <h4 className="font-semibold mb-2">About</h4>
                <p className="text-ink-muted leading-relaxed">{project.description}</p>
                <ProgressBar value={project.percentDone} />
              </Box>
            </Tabs.Content>

            <Tabs.Content value="tasks"><TasksTable data={tasks} /></Tabs.Content>
            <Tabs.Content value="files"><FilesList files={project.files} /></Tabs.Content>
            <Tabs.Content value="activity"><Timeline items={activities} /></Tabs.Content>
            <Tabs.Content value="discussion"><Discussion comments={project.comments} /></Tabs.Content>
          </Tabs.Root>
        </div>

        <aside className="space-y-4">
          <Box title="Team">
            <ul className="space-y-3">
              {project.team.map(m => (
                <li key={m.id} className="flex items-center gap-3">
                  <img src={m.avatarUrl} alt="" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold">{m.name}</p>
                    <p className="text-sm text-ink-muted">{m.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Box>

          <Box title="Tags">
            <div className="flex flex-wrap gap-2">
              {project.tags.map(t => (
                <span key={t.label} className={`px-3 py-1 rounded-full text-xs bg-color-${t.tone} color-${t.tone}`}>
                  {t.label}
                </span>
              ))}
            </div>
          </Box>

          <Box title="Important Dates">
            <DateRow label="Created"  date={project.createdAt} />
            <DateRow label="Start"    date={project.startAt} />
            <DateRow label="Deadline" date={project.deadline} />
          </Box>

          <Box title="Budget">
            <p className="text-3xl font-semibold">${project.budget.toLocaleString()}</p>
            <ProgressBar value={(project.spent / project.budget) * 100} />
            <p className="text-sm text-ink-muted mt-2">
              ${project.spent.toLocaleString()} spent of ${project.budget.toLocaleString()}
            </p>
          </Box>
        </aside>
      </div>
    </div>
  )
}
```

## Pontos de atenção

- Os tabs usam Radix UI — preserve `data-[state=active]:` para casar com a estética do template (sublinhado roxo).
- Tags usam a paleta 1–13 do `tokens.md` — passe `tone` numérico.
- A coluna lateral some em mobile e empilha abaixo dos tabs (≤1024px).
