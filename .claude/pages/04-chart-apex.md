# Página: Apex Charts

**Arquivo original:** `protend/chart-apex.html`
**Rota Next.js sugerida:** `/charts` (catálogo / showcase)

## Visão geral

Página de demonstração com vários tipos de chart ApexCharts: linha, área, coluna, barra, pizza, donut, radar, bubble, etc. Funciona como **referência** de configurações para outras páginas.

## Estrutura

```
[ Sidebar ] [ Topbar ]
[ Main Content ]
  Row 1 — IconCards (Notification | Message | Calendar | Create New Project)
  Row 2..N — uma grade de boxes, cada um com um chart diferente
    [Box title="Line"]            <div id="line-chart"></div>
    [Box title="Area"]            <div id="area-chart"></div>
    [Box title="Column"]          <div id="column-chart"></div>
    [Box title="Bar"]             <div id="bar-chart"></div>
    [Box title="Pie"]             <div id="pie-chart"></div>
    [Box title="Donut"]           <div id="donut-chart"></div>
    [Box title="Radar"]           <div id="radar-chart"></div>
    [Box title="Bubble"]          <div id="bubble-chart"></div>
    …
```

## Componentes consumidos

| Componente | Documentação |
|-----------|-------------|
| `<Sidebar />`, `<Topbar />` | shell padrão |
| `<IconCard />` × 4 | `components/icon-card.md` |
| `<Box title>` | `components/box.md` |
| `<ApexChart>` (wrapper de `react-apexcharts`) | `components/chart-wrappers.md` |

## Libs JS específicas

- ApexCharts (todos os charts)
- Init em `js/pages/apexchart.js`

## Composição React (sugestão)

```tsx
'use client'
import dynamic from 'next/dynamic'
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const PALETTE = ['#3C21F7', '#FFBF3A', '#00BC39', '#F7284A', '#9B8DFF', '#26C9E5']

export default function ChartsPage() {
  return (
    <div className="space-y-6">
      <IconCardsRow />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Box title="Line">
          <ApexChart type="line" height={320} series={lineSeries} options={{ colors: PALETTE, chart: { toolbar: { show: false } } }} />
        </Box>
        <Box title="Area">
          <ApexChart type="area" height={320} series={areaSeries} options={areaOptions} />
        </Box>
        <Box title="Column">
          <ApexChart type="bar" height={320} series={columnSeries} options={columnOptions} />
        </Box>
        {/* … pie, donut, radar, bubble … */}
      </div>
    </div>
  )
}
```

## Pontos de atenção

- Esta página tem peso visual de "showroom". Em produção, geralmente é interna ou removida.
- Centralize a paleta (`PALETTE`) num arquivo de tokens para casar com `tokens.md`.
- Configurações shareadas (toolbar, fontFamily, dataLabels) podem virar um `defaultApexOptions` exportado.
