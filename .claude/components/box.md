# Box (Card base)

Container universal de qualquer "card" do template. Todo `.box` tem fundo `var(--box-bg)`, radius `10px` e sombra suave.

## Markup-base

```html
<div class="box">
  <div class="box-header">
    <h4 class="box-title">Título</h4>
    <!-- opcional: ações à direita -->
  </div>
  <div class="box-body">
    conteúdo
  </div>
</div>
```

## Classes

| Classe | Função |
|--------|--------|
| `.box` | Wrapper. Define fundo, padding, radius, sombra. |
| `.box-header` | Cabeçalho do box (título + ações). |
| `.box-title` | Título — geralmente `<h4>` ou `<h5>`. |
| `.box-body` | Corpo principal. |
| `.box-right` | Bloco alinhado à direita do header (botões, dropdown). |
| `.f-height` | Modificador para fixar altura (gráficos). |
| `.box.card-box` | Variante usada para a **fileira de IconCards** (4 colunas). |
| `.box.box-carousel` | Variante para projetos no carrossel. |
| `.box.box-manage` | Banner gradient ("Manage your project in one touch"). |

## Padrões de uso

### Box simples com KPI

```html
<div class="box">
  <div class="box-body d-flex pb-0">
    <div class="me-auto">
      <h5 class="box-title">Total Clients</h5>
      <h4 class="font-wb fs-30 mt-23">78</h4>
      <p class="mt-11"><span class="text-primary">+0.5%</span> than last week</p>
    </div>
    <div class="donut-chart-sale">…peity…</div>
  </div>
</div>
```

### Box com header + filtros

```html
<div class="box f-height">
  <div class="box-header d-flex justify-content-between mb-wrap">
    <h3 class="mt-9 ml-5">Project Statistics</h3>
    <ul class="card-list mb-0">
      <li class="custom-label"><span></span>Complete</li>
      <li class="custom-label"><span></span>Doing</li>
    </ul>
  </div>
  <div class="box-body pt-20">
    <div id="customer-chart"></div>
  </div>
</div>
```

### Banner gradiente

```html
<div class="box box-manage">
  <div class="box-body d-flex pd-7 pb-0">
    <div class="me-auto w-55">
      <h5 class="card-title text-white fs-30 font-w500">Manage your project in one touch</h5>
      <p class="text-o7 fs-18 font-w500 pb-11">Etiam facilisis ligula nec velit posuere.</p>
    </div>
    <div class="btn-now">
      <a class="h6 font-w500" href="#"><span>Try For Free Now</span></a>
    </div>
  </div>
</div>
```

`.box-manage` aplica o gradiente roxo (ver `tokens.md → garadient-1`) e força texto branco.

## Componente React

```tsx
type BoxProps = {
  title?: React.ReactNode
  actions?: React.ReactNode
  variant?: 'default' | 'manage' | 'carousel'
  fixedHeight?: boolean
  className?: string
  children: React.ReactNode
}

export function Box({ title, actions, variant = 'default', fixedHeight, className = '', children }: BoxProps) {
  const base = 'rounded-[10px] bg-box shadow-[0_0_50px_0_rgb(42_89_152_/_0.10)] dark:shadow-none p-6'
  const variants = {
    default:  '',
    manage:   'text-white bg-gradient-to-r from-brand to-brand-light',
    carousel: 'p-4',
  }
  return (
    <div className={`${base} ${variants[variant]} ${fixedHeight ? 'h-full' : ''} ${className}`}>
      {(title || actions) && (
        <header className="flex items-center justify-between mb-4">
          {title && <h3 className="text-xl font-semibold">{title}</h3>}
          {actions}
        </header>
      )}
      {children}
    </div>
  )
}
```

## Pontos de atenção

- O CSS original sobrescreve `padding` em vários lugares com `pd-7`, `pd-1r`, `pb-0`, `pt-20` etc. — em React prefira passar `className` ou um prop `padding`.
- `.f-height` força que o box preencha 100% da coluna do grid (útil quando há 2 boxes lado a lado e um é mais alto). Em flex/grid CSS moderno isso vira `h-full` + container `items-stretch`.
- Não confunda `.box.card-box` (fileira de 4 IconCards lado a lado) com `.card-box` solto.
