# Chart Wrappers

O template carrega 4 libs de chart. Esta nota mapeia cada `<div id="…">` para a lib correspondente, e indica substitutos React.

## Inventário

| ID/classe | Lib | Tipo |
|-----------|-----|------|
| `#customer-chart` | ApexCharts | Linha (Project Statistics) |
| `#chartBar2` | ApexCharts | Bar (Current Balance) |
| `#chartBar3` | ApexCharts | Bar (Project Statistics #2) |
| `#total-revenue-chart`, `#total-revenue-chart-1` | ApexCharts | Sparkline / mini-bar |
| `.donut-1`, `.donut-2` | Peity | Donut inline |
| Apex page (`chart-apex.html`) | ApexCharts | Pizza, área, radar, etc. |
| `.circle-progress` | jQuery Circle Progress | Anel circular grosso |
| Chart.js (carregado mas pouco usado) | Chart.js bundle | Reservado para extensões |

## Configs originais

Em `js/pages/dashboard.js` e `js/pages/apexchart.js`. Exemplo de `#customer-chart`:

```js
new ApexCharts(document.querySelector('#customer-chart'), {
  series: [
    { name: 'Complete', data: [44, 55, 41, 67, 22, 43, 21] },
    { name: 'Doing',    data: [13, 23, 20, 8, 13, 27, 33] },
  ],
  chart: { type: 'line', height: 320, toolbar: { show: false } },
  colors: ['#3C21F7', '#FFBF3A'],
  stroke: { curve: 'smooth', width: 3 },
  dataLabels: { enabled: false },
  xaxis: { categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  legend: { show: false },
}).render();
```

## Substituto React — `react-apexcharts`

Mantém compatibilidade quase 1:1 com os configs:

```bash
npm install apexcharts react-apexcharts
```

```tsx
'use client'
import dynamic from 'next/dynamic'
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export function CustomerChart() {
  const series = [
    { name: 'Complete', data: [44, 55, 41, 67, 22, 43, 21] },
    { name: 'Doing',    data: [13, 23, 20, 8, 13, 27, 33] },
  ]

  const options: ApexCharts.ApexOptions = {
    chart: { type: 'line', toolbar: { show: false }, fontFamily: 'Poppins' },
    colors: ['#3C21F7', '#FFBF3A'],
    stroke: { curve: 'smooth', width: 3 },
    dataLabels: { enabled: false },
    xaxis: { categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
    legend: { show: false },
    grid: { borderColor: 'var(--border-color)' },
  }

  return <ApexChart type="line" series={series} options={options} height={320} />
}
```

## Alternativa — Recharts

Se quiser fugir de ApexCharts inteiro, **Recharts** é mais idiomático em React:

```tsx
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { day: 'Mon', complete: 44, doing: 13 },
  { day: 'Tue', complete: 55, doing: 23 },
  // …
]

export function CustomerChartRecharts() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <XAxis dataKey="day" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip />
        <Line type="monotone" dataKey="complete" stroke="#3C21F7" strokeWidth={3} dot={false} />
        <Line type="monotone" dataKey="doing"    stroke="#FFBF3A" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

## Mini-charts (Peity → Recharts ou SVG inline)

Ver `progress-bar.md` para o `<Donut />`. Para sparkline, use:

```tsx
import { Sparklines, SparklinesLine } from 'react-sparklines'

<Sparklines data={[5, 10, 5, 20, 15, 30, 22]} width={80} height={28}>
  <SparklinesLine color="#3C21F7" />
</Sparklines>
```

## Pontos de atenção

- **SSR:** ApexCharts não funciona no servidor. Em Next.js App Router, use `dynamic(() => import('react-apexcharts'), { ssr: false })`.
- **Cores:** padronize com tokens (`brand`, `accent.yellow`, etc.).
- **Tema escuro:** ApexCharts aceita `theme: { mode: 'dark' }`. Em Recharts, ajuste cores via CSS variables ou prop `stroke`.
- O template original carrega Chart.js mas raramente utiliza — pode ser removido sem efeito.
