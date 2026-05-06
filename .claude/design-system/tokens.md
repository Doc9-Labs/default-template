# Design Tokens

Tokens extraídos de `protend/css/style.css` (`:root`) e do uso recorrente nas páginas. Estes valores são os **canônicos** — qualquer divergência em utilitários `bg-color-*`, `color-*` etc. é declinação destes tokens.

## Cores

### Cores funcionais (do `:root`)

| Token | Light | Dark | Uso |
|-------|-------|------|-----|
| `--body-bg` | `#F9FAFE` | `#1E1D2B` | Fundo geral da aplicação |
| `--box-bg` | `#FFFFFF` | `#252837` | Fundo de cards/boxes |
| `--main-color` | `#3C21F7` | `#FFFFFF` (texto)| Roxo da marca / acento principal |
| `--text-color` | `#222943` | `#FFFFFF` | Texto principal |
| `--text-second-color` | `#878787` | `#878787` | Texto secundário (parágrafos) |
| `--border-color` | `#E9E9E9` | `#222028` | Bordas e divisores |
| `--menu-item-active-bg` | `rgba(60,33,247,0.15)` | `#9B8DFF` | Item ativo no sidebar |
| `--bs-yellow` | `#FFBF3A` | igual | Acento amarelo (Bootstrap override) |
| `--bs-blue` | `#5F45FF` | igual | Acento azul |
| `--bs-light` | `#F1F1F1` | `#212431` | Fundos secundários |
| `--bg-card` | `rgba(255,255,255,0.7)` | igual | Card translúcido (sobre imagens) |

### Paleta de utilitários `.bg-color-N` / `.color-N`

O template define **13 pares** de cores. Cada par tem um *background suave* (`bg-color-N`), uma *cor de destaque* (`color-N`) e, em alguns casos, um *gradiente para ícone* (`bg-icon-N`).

| N | Background suave | Cor destaque | Gradiente do ícone | Uso típico |
|---|-----------------|--------------|--------------------|-----------|
| 1 | `rgba(255,188,3,0.1)` | `#FFBB01` | `#FFBB00 → #FFF574` | Notificação (amarelo) |
| 2 | `#E5F8EB` | `#00BC39` | `#00843E → #59F187` | Mensagem (verde) |
| 3 | `rgba(60,33,247,0.1)` | `#9687FE` | `#3C21F7 → #9B8DFF` | Calendário (roxo) |
| 4 | `#3C21F7` (sólido) | `#26C9E5` | — | CTA "Create new project" (roxo cheio) |
| 5 | `#E6FFFF` | — | `#21F7F7 → #9B8DFF` | Variação ciano |
| 6 | `#EAEFFF` | `#496EE8` | — | Azul suave |
| 7 | `#FFF2E5` | `#FEA246` | — | Laranja suave |
| 8 | `#E6FAF4` | `#35CF96` | — | Verde-água suave |
| 9 | `#FEE9ED` | `#F7284A` | — | Vermelho suave |
| 10 | `#EAEFFF` | `#496EE8` | `#456CE9 → #94A5DC` | Tag azul |
| 11 | `#FFF2E5` | `#FFA143` | `#FFA143 → #F3D5B7` | Tag laranja |
| 12 | `#E6FAF4` | `#35CF96` | `#4DEBBC → #B4F1DF` | Tag verde |
| 13 | `#FEE9ED` | — | `#F7284A → #F9BAC6` | Tag vermelha |

> No tema escuro, **todos** os `bg-color-N` colapsam para `#1E1D2B` (mesmo do body) — o destaque visual passa a ser apenas o ícone gradiente.

### Gradiente da marca

```css
.garadient-1 {
  background: linear-gradient(to right, #3C21F7 0%, #9B8DFF 100%);
}
```

Use como acento em CTAs grandes ou banners ("Manage your project in one touch").

### Sugestão de mapeamento Tailwind

```ts
// tailwind.config.ts
colors: {
  brand: {
    DEFAULT: '#3C21F7',
    soft: 'rgba(60,33,247,0.1)',
    softer: 'rgba(60,33,247,0.15)',
    light: '#9B8DFF',
  },
  ink: { DEFAULT: '#222943', muted: '#878787' },
  surface: { DEFAULT: '#FFFFFF', alt: '#F1F1F1', body: '#F9FAFE' },
  accent: {
    yellow:  { DEFAULT: '#FFBB01', soft: 'rgba(255,188,3,0.1)' },
    green:   { DEFAULT: '#00BC39', soft: '#E5F8EB' },
    purple:  { DEFAULT: '#9687FE', soft: 'rgba(60,33,247,0.1)' },
    cyan:    { DEFAULT: '#26C9E5' },
    blue:    { DEFAULT: '#496EE8', soft: '#EAEFFF' },
    orange:  { DEFAULT: '#FEA246', soft: '#FFF2E5' },
    teal:    { DEFAULT: '#35CF96', soft: '#E6FAF4' },
    red:     { DEFAULT: '#F7284A', soft: '#FEE9ED' },
  },
  ring: { dark: '#222028', light: '#E9E9E9' },
}
```

## Tipografia

### Fonte

- **Principal:** Poppins (Google Fonts), pesos 300, 400, 500, 600, 700.
- Algumas páginas (login, novo projeto) também carregam **Roboto** — pode ser unificado em Poppins sem perda visual.

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
body { font-family: "Poppins", sans-serif; font-size: 16px; color: var(--text-color); }
```

### Headings

Todos os `h1..h6` herdam:
- `font-weight: 600`
- `line-height: 1.2`
- `color: var(--color-primary)` (note que a variável é `--color-primary` apesar do `:root` definir `--text-color` — alinhe os dois ao migrar).

| Tag | Tamanho |
|-----|---------|
| `h4` / `.h4` | `1.5em` (~24px) |
| `h5` / `.h5` | `1.25em` (~20px) |
| `h6` / `.h6` | `1.125em` (~18px) |

### Utilitários `.fs-*`

Forçam tamanho via `!important`. Mapa completo:

| Classe | Tamanho | Line-height | Mobile (<575px) |
|--------|---------|-------------|------------------|
| `.fs-12` | 12px | 1.5 | — |
| `.fs-13` | 13px | 1.5 | — |
| `.fs-14` | 14px | 1.6 | — |
| `.fs-15` | 15px | 1.5 | — |
| `.fs-16` | 16px | 1.6 | 14px |
| `.fs-17` | 17px | 1.6 | — |
| `.fs-18` | 18px | 1.5 | 16px |
| `.fs-20` | 20px | 1.5 | — |
| `.fs-22` | 22px | 1.5 | — |
| `.fs-24` | 24px | 1.4 | — |
| `.fs-26` | 26px | 1.4 | — |
| `.fs-28` | 28px | 1.4 | 24px |
| `.fs-30` | 30px | 1.4 | — |
| `.fs-32` | 32px | 1.25 | — |
| `.fs-34` | 34px | 1.25 | — |
| `.fs-35` | 35px | 1.25 | — |
| `.fs-36` | 36px | 1.25 | — |
| `.fs-38` | 38px | 1.25 | — |
| `.fs-46` | 46px | 1.25 | — |

### Utilitários de peso

| Classe | font-weight |
|--------|-------------|
| `.font-w400` | 400 |
| `.font-w500` | 500 |
| `.font-w600` | 600 |
| `.font-wb` | 700 |
| `.font-w900` | 900 |

## Espaçamento

O template usa duas estratégias misturadas:

1. **Bootstrap spacing** (`mb-0`, `mt-2`, `pt-4`, `pb-11`, `me-auto`, `ml-5`, etc.) — escala padrão Bootstrap.
2. **Utilitários custom em pixels** com `!important`: `mt-7`, `mt-9`, `mt-10`, `mt-11`, `mt-14`, `mt-18`, `mt-20`, `mt-23`, `mt-28`, `mt-32`, `mt-36`, `mb-6`, `mb-10`, `mb-20`, `mb-22`, `mb-23`, `mb-32`, `mb-36`, `pt-4`, `pt-9`, `pt-11`, `pt-20`, `pl-5`, `pl-7`, `pl-8`, `pl-12`, `pr-7`, `mr-5`, `mr-7`, `mr-14`. O número é o valor em **pixels**.

> Em Tailwind isso vira `mt-[20px]` ou (preferível) integre com a escala `4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 36 px` arredondando em múltiplos de 4.

### Padding/margin de containers

| Local | Valor |
|-------|-------|
| `.box` (card) | padding interno ~24-32px (varia por página) |
| `.box-header` | padding inferior + bordas internas |
| `.main-content` | padding lateral 30px (desktop), 15-20px (mobile) |
| `.sidebar` | width `var(--sidebar-size)` = 400px (desktop) |
| `.main-header` | height `var(--main-header-height)` = 136px (desktop), 90px (≤1200px), menor em mobile |

## Border radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--box-border-radius` | `10px` | Boxes/cards padrão |
| Botões | `8px–10px` | Buttons primários |
| Imagens de avatar | `50%` | Sempre circulares |
| Inputs | `8px` | Form controls |

## Sombras

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow` | `0 0 50px 0px rgb(42 89 152 / 10%)` | Sombra padrão de cards (light) |
| `--shadow2` | `0 0 50px 0px rgb(42 89 152 / 5%)` | Sombra suave (boxes secundários) |

> No dark mode as sombras geralmente são removidas ou substituídas por borda sutil.

## Dimensões do shell

| Token | Valor | Notas |
|-------|-------|-------|
| `--sidebar-size` | `400px` | Largura sidebar expandida |
| `--sidebar-logo-size` | `80px` | Altura do bloco do logo |
| `--sidebar-logo-img-size` | `57px` | Tamanho do logo |
| `--profile-image-size` | `45px` | Avatar do header |
| `--main-header-height` | `136px` | Altura do header desktop |
| `--darkmode-toggle-size` | `20px` | Bola do toggle de tema |

A sidebar tem dois estados:
- `body.sidebar-expand` (default) → sidebar aberta;
- `body.sidebar-expand.active` → sidebar colapsada/oculta.

Ver `design-system/layout.md` para o shell completo.
