# /commit — Commit, PR e Merge na Main

Quando o usuário executar este comando, siga exatamente estes passos:

## 1. Verificar mudanças pendentes
- Execute `git status` para ver os arquivos modificados/adicionados.
- Se não houver mudanças, informe o usuário e pare.

## 2. Gerar mensagem de commit
- Analise os diffs com `git diff` e `git diff --cached`.
- Gere uma mensagem de commit concisa e descritiva no formato Conventional Commits (ex: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `style:`).
- Se o usuário passar um argumento com `$ARGUMENTS`, use-o como mensagem de commit.

## 3. Criar branch, commit e push
- Gere um nome de branch baseado na mensagem de commit (ex: `feat/descricao-curta`).
- Execute:
  ```
  git checkout -b <nome-da-branch>
  git add -A
  git commit -m "<mensagem>"
  git push origin <nome-da-branch>
  ```

## 4. Criar Pull Request
- Use o GitHub CLI para criar a PR:
  ```
  gh pr create --title "<mensagem>" --body "Mudanças automáticas via Claude /commit" --base main --head <nome-da-branch>
  ```
- Se `gh` não estiver disponível, use a API do GitHub via `curl` com o token disponível.

## 5. Merge automático
- Faça o merge da PR na main:
  ```
  gh pr merge --merge --delete-branch
  ```

## 6. Voltar para a main
- Execute:
  ```
  git checkout main
  git pull origin main
  ```

## 7. Reportar ao usuário
- Mostre um resumo com:
  - ✅ Branch criada
  - ✅ Commit realizado
  - ✅ PR criada (com link)
  - ✅ Merge concluído
  - ✅ Branch deletada

## Tratamento de erros
- Se qualquer passo falhar, informe o erro claramente e sugira como resolver.
- Se houver conflitos de merge, NÃO faça merge automático — informe o usuário.
