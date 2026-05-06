# Form Controls

Inputs, selects, textarea, checkbox, file upload e datepickers — usados em `new-project.html`, `new-account.html`, `user-login.html`, `user-profile.html`.

## Inputs e textarea

```html
<div class="form-group mb-4">
  <label class="form-label fs-14 font-w600 mb-2">Project Name</label>
  <input type="text" class="form-control" placeholder="Enter project name">
</div>

<div class="form-group mb-4">
  <label class="form-label fs-14 font-w600 mb-2">Description</label>
  <textarea class="form-control" rows="4" placeholder="Describe the project…"></textarea>
</div>
```

`.form-control` (Bootstrap) aplica:
- height 48px (~3rem)
- background `var(--bs-light)` (cinza muito claro)
- radius 8px
- border 1px (anulada no template para parecer "filled")
- focus: ring roxo

## Select

```html
<select class="form-select">
  <option>Marketing</option>
  <option>Engineering</option>
  <option>Design</option>
</select>
```

## Checkbox / Radio

```html
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="remember">
  <label class="form-check-label" for="remember">Remember me</label>
</div>
```

## Upload de arquivo

`new-project.html` usa um upload "drag & drop":

```html
<div class="upload-box">
  <input type="file" id="files" hidden>
  <label for="files" class="d-flex">
    <i class="bx bx-cloud-upload"></i>
    <div>
      <h6 class="font-w600">Drop files here to upload</h6>
      <p class="fs-13 text-ink-muted mb-0">JPG, PNG, PDF up to 10MB</p>
    </div>
  </label>
</div>
```

## Datepicker

Três libs convivem no template — escolha **uma**:

| Lib | Onde |
|-----|------|
| `bootstrap-datepicker` | `new-project.html` (deadline, start date) |
| `flatpickr` | algumas páginas |
| `pignose-calendar` (mini-calendar) | dashboard, sidebar |
| jQuery UI Datepicker | `libs/date-picker/` |

Inicialização original (`bootstrap-datepicker`):

```js
$('.datepicker').datepicker({ format: 'mm/dd/yyyy', autoclose: true, todayHighlight: true });
```

## Botões

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-light">Secondary</button>
<button class="btn btn-outline-primary">Outline</button>
<button class="btn btn-danger">Delete</button>
<a class="btn btn-link">Cancel</a>
```

`.btn-primary` no template usa `var(--main-color)` (roxo `#3C21F7`) com hover mais escuro.

## Componentes React

### Input genérico

```tsx
import { forwardRef, type InputHTMLAttributes } from 'react'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }

export const Field = forwardRef<HTMLInputElement, FieldProps>(({ label, error, ...rest }, ref) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold">{label}</label>
    <input
      ref={ref} {...rest}
      className="w-full h-12 px-4 rounded-lg bg-surface-alt border border-transparent
                 focus:border-brand focus:ring-2 ring-brand/30 outline-none transition"
    />
    {error && <p className="text-sm text-[#F7284A]">{error}</p>}
  </div>
))
Field.displayName = 'Field'
```

### Botão primário

```tsx
type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'light' | 'outline' | 'danger' | 'link'
}

export function Button({ variant = 'primary', className = '', ...rest }: BtnProps) {
  const styles = {
    primary: 'bg-brand text-white hover:bg-brand/90',
    light:   'bg-surface-alt text-ink hover:bg-surface-alt/70',
    outline: 'border border-brand text-brand hover:bg-brand-soft',
    danger:  'bg-[#F7284A] text-white hover:bg-[#F7284A]/90',
    link:    'text-brand hover:underline',
  }
  return (
    <button {...rest}
            className={`h-11 px-5 rounded-lg font-semibold transition ${styles[variant]} ${className}`} />
  )
}
```

### Datepicker

Recomendação React: **`react-day-picker`** ou **`@radix-ui/react-popover` + `date-fns`** ou **`flatpickr-react`** (drop-in).

```tsx
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
```

## Pontos de atenção

- O CSS original aplica `var(--bs-light)` no fundo do input — em dark, vira cinza escuro. Mantenha esse comportamento usando `bg-surface-alt` (que muda com tema).
- Estados `:focus` no template não têm outline visível — adicione um ring para acessibilidade.
- O `floatlabel` que aparece em algumas páginas é só CSS de espaçamento, não a feature de Material Design.
