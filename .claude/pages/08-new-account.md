# Página: New Account (Sign up)

**Arquivo original:** `protend/new-account.html`
**Rota Next.js sugerida:** `/signup` — fora do grupo `(dashboard)` (sem sidebar/topbar)

## Visão geral

Tela de cadastro de nova conta. Layout single-column centralizado, com ilustração à esquerda e formulário à direita.

## Estrutura

```
<body class="loginpage">
  <div class="container-fluid">
    <div class="row vh-100">
      <div class="col-md-6 d-none d-md-flex bg-cover">
        <img src="./images/bg/bg-login.svg" />
      </div>
      <div class="col-md-6 d-flex align-items-center">
        <form class="form-signup w-75 mx-auto">
          <h1>Create Your Account</h1>
          <p>Get started with us</p>
          [Field "Full Name"]
          [Field "Email"]
          [Field "Password"]
          [Field "Confirm Password"]
          [Checkbox "I agree to terms"]
          [Button "Sign Up"]
          [Divisor "or"]
          [Botões sociais: Google, Facebook]
          <p>Already have an account? <a href="user-login.html">Sign In</a></p>
        </form>
      </div>
    </div>
  </div>
</body>
```

## Componentes consumidos

| Componente | Documentação |
|-----------|-------------|
| `<Field />` (4×) | `components/form-controls.md` |
| `<Button variant="primary">` | `components/form-controls.md` |
| `<Checkbox>` Termos | `components/form-controls.md` |
| `<SocialButton>` Google/Facebook | inline |

## Composição React

```tsx
// app/signup/page.tsx
import Link from 'next/link'
import { useState } from 'react'
import { Field } from '@/components/Field'
import { Button } from '@/components/Button'
import { FcGoogle } from 'react-icons/fc'
import { Facebook } from 'lucide-react'

export default function SignupPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <aside className="hidden md:flex items-center justify-center bg-brand-soft">
        <img src="/bg-login.svg" alt="" className="max-w-md" />
      </aside>
      <section className="flex items-center justify-center p-8">
        <form className="w-full max-w-md space-y-5">
          <header className="space-y-2">
            <h1 className="text-3xl font-semibold">Create Your Account</h1>
            <p className="text-ink-muted">Get started with us — it&apos;s free.</p>
          </header>

          <Field label="Full Name" name="name" placeholder="Jane Doe" required />
          <Field label="Email" type="email" name="email" placeholder="you@email.com" required />
          <Field label="Password" type="password" name="password" required />
          <Field label="Confirm Password" type="password" name="password2" required />

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" required /> I agree to the <Link href="/terms" className="text-brand">terms</Link>
          </label>

          <Button type="submit" variant="primary" className="w-full">Sign Up</Button>

          <div className="flex items-center gap-3 text-ink-muted text-sm">
            <hr className="flex-1" /> or <hr className="flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="light" className="inline-flex items-center justify-center gap-2">
              <FcGoogle className="w-5 h-5" /> Google
            </Button>
            <Button variant="light" className="inline-flex items-center justify-center gap-2">
              <Facebook className="w-5 h-5 text-[#1877F2]" /> Facebook
            </Button>
          </div>

          <p className="text-sm text-center text-ink-muted">
            Already have an account? <Link href="/login" className="text-brand font-semibold">Sign In</Link>
          </p>
        </form>
      </section>
    </main>
  )
}
```

## Pontos de atenção (segurança)

- **Nunca crie a conta no client.** A submissão deve ir para um endpoint server-side (Next.js Route Handler ou Server Action) que faz hashing de senha (bcrypt/argon2), validação (Zod) e cria o usuário.
- Adicione **rate limiting** (`upstash/ratelimit` ou Cloudflare Turnstile) na rota de signup.
- Logging de auditoria: registre `signup_success` e `signup_failed` com `email_hash`, `ip`, `user_agent`. Veja a referência interna da Doc9 para padrão de auditoria.
- Validação no client (Zod + react-hook-form) é UX; a validação **autoritativa** é server-side.
- HTTPS obrigatório em produção.
