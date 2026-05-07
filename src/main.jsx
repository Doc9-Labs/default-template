import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

const STEPS = [
  {
    num: 1,
    icon: '🔗',
    title: 'Conectar ao Claude Code',
    desc: 'Abra o terminal e conecte o repositório ao Claude Code para começar a desenvolver.',
    code: `# Clone o repositório (o link está no Hub)
git clone https://github.com/Doc9-Labs/hub-SEU-APP.git
cd hub-SEU-APP

# Abra no Claude Code
claude`,
    tip: 'O arquivo CLAUDE.md na raiz do projeto contém todas as instruções e referências do design system para o Claude.',
  },
  {
    num: 2,
    icon: '💬',
    title: 'Descrever o que você quer',
    desc: 'Converse com o Claude Code e descreva o app que deseja criar. Ele já conhece o design system Doc9.',
    code: `# Exemplo de prompt no Claude Code:

> Crie uma página de dashboard com um gráfico de barras
  mostrando vendas mensais e uma tabela de clientes
  recentes. Use o design system Doc9 (Poppins, roxo
  #3C21F7, cards com box shadow).`,
    tip: 'A pasta .claude/ contém specs de componentes, tokens, layout e páginas — o Claude usa como referência automaticamente.',
  },
  {
    num: 3,
    icon: '🌿',
    title: 'Criar uma Branch',
    desc: 'Sempre trabalhe em uma branch separada para manter o main estável.',
    code: `# Crie uma branch para sua feature
git checkout -b feature/minha-feature

# O Claude Code já pode criar a branch por você:
> Crie uma branch chamada feature/dashboard
  e implemente o dashboard`,
    tip: 'Branches protegem o código em produção. Nunca commite diretamente na main.',
  },
  {
    num: 4,
    icon: '📤',
    title: 'Fazer o Push e abrir um PR',
    desc: 'Envie suas alterações para o GitHub e abra um Pull Request para revisão.',
    code: `# Adicione e commite suas alterações
git add .
git commit -m "feat: adiciona dashboard de vendas"

# Envie para o GitHub
git push origin feature/minha-feature

# Abra o Pull Request no GitHub:
# → github.com/Doc9-Labs/hub-SEU-APP/pulls
# → "New Pull Request"
# → base: main ← compare: feature/minha-feature`,
    tip: 'O PR permite revisar as mudanças antes de ir para produção. Você pode pedir para o Claude Code fazer isso por você.',
  },
  {
    num: 5,
    icon: '✅',
    title: 'Revisar e Fazer o Merge',
    desc: 'Revise o código no PR, aprove e faça o merge para a branch main.',
    code: `# No GitHub, na página do PR:
# 1. Revise os arquivos alterados (aba "Files changed")
# 2. Clique em "Merge pull request"
# 3. Confirme com "Confirm merge"

# Ou via terminal:
git checkout main
git merge feature/minha-feature
git push origin main`,
    tip: 'Após o merge, a branch pode ser deletada. O GitHub oferece essa opção automaticamente.',
  },
  {
    num: 6,
    icon: '🚀',
    title: 'Deploy Automático',
    desc: 'O push para main dispara o GitHub Actions que faz o deploy automaticamente no servidor.',
    code: `# O deploy é automático! Após o merge:
# 1. GitHub Actions detecta o push na main
# 2. Conecta via SSH no servidor
# 3. Puxa as mudanças (git pull)
# 4. Instala dependências (npm install)
# 5. Faz o build (npm run build)
# 6. Reinicia o app (pm2 restart)

# Acompanhe em:
# → github.com/Doc9-Labs/hub-SEU-APP/actions`,
    tip: 'O deploy leva ~30 segundos. Se algo der errado, o GitHub Actions mostra os logs de erro.',
  },
];

function StepCard({ step, isActive, onClick }) {
  return (
    <div
      className={`step-card ${isActive ? 'step-active' : ''}`}
      onClick={onClick}
    >
      <div className="step-num">{step.num}</div>
      <div className="step-icon">{step.icon}</div>
      <h3>{step.title}</h3>
      <p>{step.desc}</p>
    </div>
  );
}

function StepDetail({ step }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(step.code.replace(/^# .*$/gm, '').replace(/^> /gm, '').trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="step-detail" key={step.num}>
      <div className="step-detail-header">
        <span className="step-detail-icon">{step.icon}</span>
        <div>
          <div className="step-detail-label">Passo {step.num} de {STEPS.length}</div>
          <h2>{step.title}</h2>
        </div>
      </div>
      <p className="step-detail-desc">{step.desc}</p>
      <div className="code-block">
        <div className="code-header">
          <span>Terminal</span>
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? '✅ Copiado!' : '📋 Copiar'}
          </button>
        </div>
        <pre><code>{step.code}</code></pre>
      </div>
      {step.tip && (
        <div className="tip-box">
          <span className="tip-icon">💡</span>
          <span>{step.tip}</span>
        </div>
      )}
    </div>
  );
}

function App() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="onboarding-page">
      <header className="onboarding-header">
        <div className="brand">
          <div className="brand-icon">D9</div>
          <div>
            <h1>Bem-vindo ao seu App</h1>
            <p>Siga os passos abaixo para construir e deployar seu aplicativo</p>
          </div>
        </div>
        <a href="https://hub.doc9lawtech.com.br" className="btn btn-secondary">← Voltar ao Hub</a>
      </header>

      <div className="steps-nav">
        {STEPS.map((step, i) => (
          <StepCard
            key={step.num}
            step={step}
            isActive={i === activeStep}
            onClick={() => setActiveStep(i)}
          />
        ))}
      </div>

      <StepDetail step={STEPS[activeStep]} />

      <div className="step-navigation">
        <button
          className="btn btn-secondary"
          disabled={activeStep === 0}
          onClick={() => setActiveStep(p => p - 1)}
        >
          ← Anterior
        </button>
        <div className="step-dots">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === activeStep ? 'dot-active' : ''}`}
              onClick={() => setActiveStep(i)}
            />
          ))}
        </div>
        <button
          className="btn btn-primary"
          disabled={activeStep === STEPS.length - 1}
          onClick={() => setActiveStep(p => p + 1)}
        >
          Próximo →
        </button>
      </div>

      <footer className="onboarding-footer">
        <div className="footer-links">
          <span>📚 Referências:</span>
          <a href="https://docs.github.com/en/pull-requests" target="_blank" rel="noopener noreferrer">GitHub PRs</a>
          <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer">Claude Code Docs</a>
          <a href="https://hub.doc9lawtech.com.br" target="_blank" rel="noopener noreferrer">Doc9 Hub</a>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
