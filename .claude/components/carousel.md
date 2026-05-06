# Carousel

O template usa **Owl Carousel 2** para listas horizontais (a lista de Project Cards no Dashboard, por exemplo).

## Markup-fonte

```html
<div class="themesflat-carousel-box data-effect has-bullets bullet-circle bullet24 clearfix"
     data-gap="30" data-column="4" data-column2="2" data-column3="1" data-auto="true">
  <div class="owl-carousel owl-theme">
    <div class="box box-carousel">…ProjectCard 1…</div>
    <div class="box box-carousel">…ProjectCard 2…</div>
    <div class="box box-carousel">…ProjectCard 3…</div>
    <!-- … -->
  </div>
</div>
```

| Atributo `data-*` | Função |
|-------------------|--------|
| `data-gap` | Espaço entre cards (px). |
| `data-column` | Cards visíveis em desktop. |
| `data-column2` | Cards visíveis em tablet. |
| `data-column3` | Cards visíveis em mobile. |
| `data-auto` | Auto-play. |

Init original em `js/shortcode.js` lê esses `data-*` e chama `$.owlCarousel`.

## Substituto React — Embla

```bash
npm install embla-carousel-react
```

```tsx
'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback } from 'react'

export function ProjectCarousel({ children }: { children: React.ReactNode[] }) {
  const [ref, api] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = useCallback(() => api?.scrollNext(), [api])

  return (
    <div className="relative">
      <div ref={ref} className="overflow-hidden">
        <div className="flex gap-[30px]">
          {children.map((c, i) => (
            <div key={i} className="shrink-0 basis-full md:basis-1/2 xl:basis-1/4">
              {c}
            </div>
          ))}
        </div>
      </div>

      <button onClick={scrollPrev}
              className="absolute -left-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-box shadow">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={scrollNext}
              className="absolute -right-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-box shadow">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
```

## Pontos de atenção

- O CSS do template estiliza setas e bullets do Owl. Em Embla, desenhe as setas você mesmo (como acima) — fica mais consistente.
- Se quiser compatibilidade total com `data-*` do template, prefira **Swiper** (que tem API parecida).
- Para listas que **não** são carrossel (como `project.html`, que é grade), não envolva em carrossel.
