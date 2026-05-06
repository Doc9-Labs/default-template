# Página: Dashboard

**Arquivo original:** `protend/index.html`
**Modificador no `<main>`:** `.main-content.dashboard`
**Rota Next.js sugerida:** `/` (raiz, dentro de `app/(dashboard)/page.tsx`)

## Visão geral

Tela inicial da aplicação. Apresenta KPIs do projeto pessoal do usuário, gráfico de progresso, banner promocional, mini-charts e um carousel com projetos recentes.

## Estrutura

```
[ Sidebar ] [ Topbar ]
[ Main Content "dashboard" ]
  Row 1 — IconCards (Notification | Message | Calendar | Create New Project)
  Row 2 — duas colunas
    Col-6 esquerda
      [Project Statistics (line chart)]
      [Total Clients (KPI + donut)]
      [Total Task Done (KPI + progress bar)]
      [Total Clients (KPI + sparkline)]
      [New Projects (KPI + sparkline)]
      [Project Statistics #2 (bar chart)]
    Col-6 direita
      [Banner gradiente "Manage your project in one touch"]
      [Current Balance (KPI + bar chart)]
      [On Progress (donut grande + descrição)]
      [Daily Task list]
  Row 3 — full width
    [Carousel "Project Statistics" com Project Cards]
```

## Componentes consumidos

| Componente | Documentação |
|-----------|-------------|
| `<Sidebar />` | `components/sidebar.md` |
| `<Topbar />` | `components/topbar.md` (título: "Dashboard") |
| `<IconCard />` × 4 | `components/icon-card.md` |
| `<NotificationList />` | `components/notification-list.md` (dentro do IconCard de Message) |
| `<Box />` | `components/box.md` (variantes default + manage) |
| `<ProgressBar />`, `<Donut />`, `<CircleProgress />` | `components/progress-bar.md` |
| `<CustomerChart />` (linha) e bar charts | `components/chart-wrappers.md` |
| `<DailyTaskList />` | `components/calendar.md` (seção Daily Task) |
| `<ProjectCard />` em carousel | `components/project-card.md` + `components/carousel.md` |
| `<AddProjectModal />` | `components/modal.md` |

## KPIs e mini-widgets desta página

| Bloco | Valor exemplo | Visual |
|-------|--------------|--------|
| Total Clients | 78 (`+0.5%`) | Donut Peity 7/9 (76%) |
| Total Task Done | 34 | Progress bar 78% |
| Total Clients | 565 (`-3% than last month`) | Bar sparkline |
| New Projects | 565 (`+0.5% than last month`) | Bar sparkline |
| Current Balance | $25,456.44 (`+3.2 than last week`) | Bar chart |
| On Progress | 228,134 (50%) | Donut grande |

## Libs JS específicas

- ApexCharts (gráficos)
- Peity (donuts inline)
- Owl Carousel (lista de projetos)
- Bootstrap (modal `#add_project`)

Init em `js/pages/dashboard.js`.

## Composição React (sugestão)

```tsx
// app/(dashboard)/page.tsx
import { IconCard } from '@/components/IconCard'
import { Box } from '@/components/Box'
import { CustomerChart } from '@/components/charts/CustomerChart'
import { BarChartCurrentBalance } from '@/components/charts/CurrentBalance'
import { Donut } from '@/components/Donut'
import { ProgressBar } from '@/components/ProgressBar'
import { ProjectCarousel } from '@/components/ProjectCarousel'
import { DailyTaskList } from '@/components/DailyTaskList'
import { Bell, MessageCircle, Calendar, Plus } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-wrap gap-4">
        <IconCard variant={1} icon={Bell} title="Notification" caption="5 Unread notification" />
        <IconCard variant={2} icon={MessageCircle} title="Message" caption="5 Unread notification">
          <NotificationList items={…} />
        </IconCard>
        <IconCard variant={3} icon={Calendar} title="Calendar" caption="5 Unread notification" href="/calendar" />
        <IconCard variant={4} icon={Plus} title="Create New Project" onClick={() => setOpen(true)} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Box title="Project Statistics" actions={<LegendCompleteDoing />}><CustomerChart /></Box>
          <Box><KpiTotalClients /></Box>
          <Box><KpiTotalTaskDone /></Box>
          <div className="grid grid-cols-2 gap-6">
            <Box><KpiSparkline title="Total Clients" value={565} delta="-3%" /></Box>
            <Box><KpiSparkline title="New Projects" value={565} delta="+0.5%" /></Box>
          </div>
          <Box title="Project Statistics"><BarChart3 /></Box>
        </div>
        <div className="space-y-6">
          <Box variant="manage">
            <ManageBannerContent />
          </Box>
          <Box title="Current Balance"><BarChartCurrentBalance /></Box>
          <Box><OnProgressWidget /></Box>
          <Box title="Daily Task"><DailyTaskList items={…} /></Box>
        </div>
      </section>

      <ProjectCarousel projects={recentProjects} />

      <AddProjectModal open={open} onOpenChange={setOpen} onSubmit={createProject} />
    </div>
  )
}
```

## Pontos de atenção

- Em ≤1640px, o lado direito deve "quebrar" em duas colunas internas (`xl:grid-cols-2`) para os KPIs (Current Balance + On Progress).
- O carousel ocupa 100% e mostra 4 cards em desktop / 2 em tablet / 1 em mobile.
- O título do `<Topbar>` muda para **"Dashboard"** nesta rota — passe via prop ou via context.
