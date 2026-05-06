# Progress Bar & Mini-Charts

Barras de progresso lineares e mini-charts (donut/sparkline) usados em todas as páginas para indicar % concluído, KPIs, etc.

## Progress bar linear

### Markup

```html
<div class="progress skill-progress mb-23" style="height:7px; width: 80%;">
  <div class="progress-bar bg-primary progress-animated"
       style="width: 52%; height:7px;"
       role="progressbar"
       aria-valuenow="52" aria-valuemin="0" aria-valuemax="100">
  </div>
</div>
```

| Classe | Função |
|--------|--------|
| `.progress` | Trilho (cinza claro). |
| `.progress.skill-progress` | Variante usada nos project cards (~7px de altura). |
| `.progress-bar` | Preenchimento. |
| `.bg-primary` | Cor da marca (`#3C21F7`). |
| `.progress-animated` | Aplica gradient stripes animados. |

### React

```tsx
export function ProgressBar({ value, height = 8, gradient = false }: {
  value: number    // 0–100
  height?: number
  gradient?: boolean
}) {
  return (
    <div className="w-full rounded-full bg-surface-alt overflow-hidden" style={{ height }}>
      <div
        className={`h-full rounded-full transition-all duration-500
                    ${gradient ? 'bg-gradient-to-r from-brand to-brand-light' : 'bg-brand'}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}
      />
    </div>
  )
}
```

## Donut mini-chart (Peity)

### Markup

```html
<span class="donut-1" data-peity='{ "fill": ["#3C21F7", "rgba(236,236,236,1)"], "innerRadius": 27, "radius": 10}'>
  7/9
</span>
<small>76%</small>
```

`Peity` lê o conteúdo do `<span>` (ex.: `7/9`) e desenha um donut.

### Variações

| Classe | Configuração |
|--------|-------------|
| `.donut-1` | radius 10, innerRadius 27, cor brand |
| `.donut-2` | maior (radius 30, innerRadius 50), cores `#9B8DFF` + `#E4EAF8` |

### Substituto React (Recharts)

```tsx
import { PieChart, Pie, Cell } from 'recharts'

export function Donut({ value, total, size = 80, primary = '#3C21F7', secondary = '#ECECEC' }: {
  value: number; total: number; size?: number; primary?: string; secondary?: string
}) {
  const data = [{ name: 'done', v: value }, { name: 'rest', v: total - value }]
  const innerRadius = size * 0.34
  const outerRadius = size * 0.5

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <PieChart width={size} height={size}>
        <Pie data={data} dataKey="v" innerRadius={innerRadius} outerRadius={outerRadius} startAngle={90} endAngle={-270}>
          <Cell fill={primary} />
          <Cell fill={secondary} />
        </Pie>
      </PieChart>
      <span className="absolute inset-0 grid place-items-center text-xs font-semibold">
        {value}/{total}
      </span>
    </div>
  )
}
```

## Sparkline (Peity bar)

`#total-revenue-chart` no Dashboard é um `<div>` que recebe um pequeno bar-chart inline. No template original, é gerado por **ApexCharts** (configs em `js/pages/dashboard.js`).

Em React, use Recharts `<BarChart>` ou `react-apexcharts`.

## Circle progress (jQuery Circle Progress)

Aparece como anel grosso com % no centro — em `user-profile.html` (skill levels). Markup:

```html
<div class="circle-progress" data-value="0.78" data-color="#3C21F7"></div>
```

Substituto React:

```tsx
export function CircleProgress({ value, size = 120, stroke = 10 }: { value: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - value)
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} stroke="#ECECEC" strokeWidth={stroke} fill="transparent" />
      <circle cx={size/2} cy={size/2} r={r} stroke="#3C21F7" strokeWidth={stroke} strokeLinecap="round"
              strokeDasharray={c} strokeDashoffset={offset} fill="transparent"
              className="transition-all duration-500" />
    </svg>
  )
}
```
