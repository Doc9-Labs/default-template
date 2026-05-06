# Página: New Project

**Arquivo original:** `protend/new-project.html`
**Modificador no `<main>`:** `.main-content.project`
**Rota Next.js sugerida:** `/projects/new`

## Visão geral

Formulário largo para criar um projeto. Inclui campos de identificação, equipe, datas, prioridade, descrição e upload de arquivos.

## Estrutura

```
[ Sidebar ] [ Topbar ]
[ Main Content "project" ]
  Row 1 — IconCards (sem o "Create" → este é o próprio create)
  Row 2 — full width
    [Box]
      <form>
        Row: Project ID | Project Title
        Row: Department (select) | Project Priority (select)
        Row: Client (select) | Price ($)
        Row: Assign Team (select) | From (datepicker) | To (datepicker)
        Description (textarea)
        Upload (drop area)
        Footer: Cancel | Save
      </form>
```

## Componentes consumidos

| Componente | Documentação |
|-----------|-------------|
| Shell padrão | — |
| `<IconCard />` × 4 | `components/icon-card.md` |
| `<Field />` | `components/form-controls.md` |
| `<Select />` (4×: Department, Priority, Client, Team) | `components/form-controls.md` |
| `<Datepicker />` (From, To) | `components/form-controls.md` |
| `<Textarea />` Description | `components/form-controls.md` |
| `<UploadBox />` | `components/form-controls.md` |
| `<Button />` | `components/form-controls.md` |

## Markup-resumo

```html
<form class="row">
  <div class="col-md-6"><Field label="Project ID" placeholder="2569852" /></div>
  <div class="col-md-6"><Field label="Project Title" placeholder="Software Development" /></div>

  <div class="col-md-6"><Select label="Department" options={DEPARTMENTS} /></div>
  <div class="col-md-6"><Select label="Project Priority" options={['High','Medium','Low']} /></div>

  <div class="col-md-6"><Select label="Client" options={CLIENTS} /></div>
  <div class="col-md-6"><Field label="Price ($)" placeholder="Enter Price" /></div>

  <div class="col-md-6"><Select label="Assign Team" options={TEAMS} /></div>
  <div class="col-md-3"><Datepicker label="From" /></div>
  <div class="col-md-3"><Datepicker label="To" /></div>

  <div class="col-12">
    <Textarea label="Description" rows={10} />
  </div>

  <div class="col-12">
    <UploadBox label="Attachments" accept=".pdf,.png,.jpg" />
  </div>

  <div class="col-12 d-flex justify-content-end gap-3">
    <Button variant="light">Cancel</Button>
    <Button variant="primary" type="submit">Save Project</Button>
  </div>
</form>
```

## Libs JS específicas

- Select2 (selects ricos com busca)
- Bootstrap Datepicker
- Bootstrap (modais, file input)

## Composição React (com `react-hook-form` + `zod`)

```tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  id: z.string().min(1),
  title: z.string().min(3),
  department: z.string().min(1),
  priority: z.enum(['High', 'Medium', 'Low']),
  clientId: z.string().min(1),
  price: z.coerce.number().nonnegative(),
  teamId: z.string().min(1),
  from: z.coerce.date(),
  to: z.coerce.date(),
  description: z.string().optional(),
})
type ProjectInput = z.infer<typeof schema>

export default function NewProjectPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectInput>({ resolver: zodResolver(schema) })

  async function onSubmit(data: ProjectInput) {
    await fetch('/api/projects', { method: 'POST', body: JSON.stringify(data) })
  }

  return (
    <Box title="New Project">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Project ID"    {...register('id')}     error={errors.id?.message} />
        <Field label="Project Title" {...register('title')}  error={errors.title?.message} />
        <Select label="Department"   {...register('department')} options={DEPARTMENTS} />
        <Select label="Priority"     {...register('priority')}   options={['High','Medium','Low']} />
        <Select label="Client"       {...register('clientId')}   options={CLIENTS} />
        <Field label="Price ($)"     {...register('price')}      type="number" />
        <Select label="Assign Team"  {...register('teamId')}     options={TEAMS} />
        <Field label="From" type="date" {...register('from')} />
        <Field label="To"   type="date" {...register('to')} />

        <div className="md:col-span-2">
          <Textarea label="Description" {...register('description')} rows={8} />
        </div>

        <div className="md:col-span-2 flex justify-end gap-3">
          <Button variant="light" type="button">Cancel</Button>
          <Button variant="primary" type="submit">Save Project</Button>
        </div>
      </form>
    </Box>
  )
}
```

## Pontos de atenção

- Os `<select>` no template usam **Select2** com busca. Em React, `react-select` substitui bem.
- O datepicker do template aceita `DD-MM-YYYY` — em React, normalize para ISO no envio (`zod` cuida disso).
- Os campos `Project ID` parecem auto-sugeridos (ex.: "2569852"). Em produção isso vai do backend — esconda e gere após o save.
