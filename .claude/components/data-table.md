# Data Table

Tabela usada na página `clients.html` (gestão de clientes). Construída sobre **DataTables.net** (`libs/datatable/` + `libs/datatables.net-responsive/`).

## Markup-base

```html
<div class="box">
  <div class="box-header d-flex justify-content-between">
    <h4 class="box-title">Manager Client</h4>
    <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#add_client">
      <i class="bx bx-plus"></i> Add Client
    </a>
  </div>

  <div class="box-body">
    <table id="clients-table" class="table dt-responsive nowrap" style="width:100%">
      <thead>
        <tr>
          <th>Client</th>
          <th>Company</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <img src="./images/avatar/user-1.png" class="rounded-circle me-2" width="32">
            <span class="font-w600">Elizabeth Holland</span>
          </td>
          <td>Acme Corp.</td>
          <td>+55 11 99999-0000</td>
          <td>elizabeth@acme.com</td>
          <td><span class="badge bg-color-8 color-8">Active</span></td>
          <td>
            <a href="client-details.html"><i class="bx bx-show"></i></a>
            <a href="#"><i class="bx bx-edit"></i></a>
            <a href="#" class="text-danger"><i class="bx bx-trash"></i></a>
          </td>
        </tr>
        <!-- … -->
      </tbody>
    </table>
  </div>
</div>
```

## Inicialização original

```js
$('#clients-table').DataTable({
  responsive: true,
  pageLength: 10,
  language: { search: '', searchPlaceholder: 'Search…' }
});
```

## Componente React (TanStack Table)

```bash
npm install @tanstack/react-table
```

```tsx
'use client'
import { useState } from 'react'
import {
  useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel,
  getFilteredRowModel, flexRender, type ColumnDef, type SortingState,
} from '@tanstack/react-table'
import { Eye, Pencil, Trash2, ArrowUpDown } from 'lucide-react'

type Client = {
  id: string
  name: string
  avatarUrl: string
  company: string
  phone: string
  email: string
  status: 'active' | 'paused' | 'churned'
}

const STATUS_BADGE = {
  active:  'bg-[#E6FAF4] text-[#35CF96]',
  paused:  'bg-[#FFF2E5] text-[#FEA246]',
  churned: 'bg-[#FEE9ED] text-[#F7284A]',
} as const

const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'Client',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img src={row.original.avatarUrl} className="w-8 h-8 rounded-full" alt="" />
        <span className="font-semibold">{row.original.name}</span>
      </div>
    ),
  },
  { accessorKey: 'company', header: 'Company' },
  { accessorKey: 'phone',   header: 'Phone' },
  { accessorKey: 'email',   header: 'Email' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const v = getValue<Client['status']>()
      return <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_BADGE[v]}`}>{v}</span>
    },
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => (
      <div className="flex items-center gap-3 text-ink-muted">
        <a href={`/clients/${row.original.id}`} aria-label="View"><Eye className="w-4 h-4" /></a>
        <button aria-label="Edit"><Pencil className="w-4 h-4" /></button>
        <button aria-label="Delete" className="text-[#F7284A]"><Trash2 className="w-4 h-4" /></button>
      </div>
    ),
  },
]

export function ClientsTable({ data }: { data: Client[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [search, setSearch] = useState('')

  const table = useReactTable({
    data, columns,
    state: { sorting, globalFilter: search },
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search…"
        className="h-10 px-4 rounded-lg bg-surface-alt mb-4 w-72 focus:ring-2 ring-brand outline-none"
      />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id} className="border-b border-ring-light dark:border-ring-dark">
                {hg.headers.map(h => (
                  <th key={h.id} className="text-left text-sm uppercase text-ink-muted py-3 px-4 font-semibold">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b border-ring-light/50">
                {row.getVisibleCells().map(c => (
                  <td key={c.id} className="py-4 px-4">
                    {flexRender(c.column.columnDef.cell, c.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination table={table} />
    </div>
  )
}
```

## Pontos de atenção

- Para preservar a aparência do template, use os badges com `bg-color-N` / `color-N`.
- O DataTables original injeta paginação e busca **dentro** do `box`. Em React, mantenha o input de busca acima do `<table>` e a paginação abaixo.
- Em tela menor, a coluna de "Action" pode virar dropdown kebab.
