import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

const STEPS = [
  {
    num: 1,
    icon: '🔗',
    title: 'Abrir o Projeto no Claude Code',
    desc: 'Acesse o Claude Code pela interface web e conecte o repositório do seu app.',
    instructions: [
      'Acesse o Claude Code e faça login com sua conta',
      'Clique em "New Project" ou "Open Project"',
      'Cole a URL do repositório GitHub do seu app (disponível no Hub)',
      'O Claude vai clonar e carregar o projeto automaticamente',
    ],
    screenshot: 'claude_open_project',
    tip: 'O arquivo CLAUDE.md na raiz do projeto contém todas as instruções do design system Doc9. O Claude usa como referência automaticamente.',
  },
  {
    num: 2,
    icon: '💬',
    title: 'Descrever o que deseja construir',
    desc: 'Use a interface de chat do Claude Code para descrever o app que deseja criar.',
    instructions: [
      'No campo de mensagem, descreva o que quer criar',
      'Seja específico: mencione componentes, dados, comportamento',
      'O Claude conhece o design system Doc9 e vai aplicar automaticamente',
      'Revise o código gerado antes de aceitar as mudanças',
    ],
    screenshot: 'claude_chat',
    example: 'Crie uma página de dashboard com um gráfico de barras mostrando vendas mensais e uma tabela de clientes recentes. Use o design system Doc9.',
    tip: 'A pasta .claude/ contém specs de componentes, tokens de cores e layout — o Claude usa tudo como referência.',
  },
  {
    num: 3,
    icon: '✅',
    title: 'Revisar e Aceitar as Mudanças',
    desc: 'O Claude mostra um diff das alterações. Revise e aceite ou peça ajustes.',
    instructions: [
      'Verifique o diff de cada arquivo alterado',
      'Clique em "Accept" para aceitar ou "Reject" para recusar',
      'Se algo não ficou como esperado, peça ao Claude para ajustar',
      'Quando satisfeito, confirme todas as mudanças',
    ],
    screenshot: 'claude_review',
    tip: 'Você pode iterar quantas vezes quiser. Peça ajustes específicos como "mude a cor do botão" ou "adicione um filtro na tabela".',
  },
  {
    num: 4,
    icon: '📤',
    title: 'Criar um Pull Request',
    desc: 'O Claude pode criar o PR automaticamente ou você pode fazer manualmente pelo GitHub.',
    instructions: [
      'No Claude Code, clique em "Create Pull Request"',
      'Adicione um título descritivo (ex: "Adiciona dashboard de vendas")',
      'Descreva as mudanças no corpo do PR',
      'O PR aparecerá no repositório GitHub do seu app',
    ],
    screenshot: 'claude_pr',
    tip: 'Pull Requests permitem revisão antes de ir para produção. Outros membros do time podem comentar e aprovar.',
  },
  {
    num: 5,
    icon: '🔀',
    title: 'Fazer o Merge',
    desc: 'Após revisar o PR no GitHub, faça o merge para enviar as mudanças para produção.',
    instructions: [
      'Abra o PR no GitHub (link disponível no Claude Code)',
      'Revise os arquivos alterados na aba "Files changed"',
      'Clique em "Merge pull request"',
      'Confirme com "Confirm merge"',
    ],
    screenshot: 'github_merge',
    tip: 'Após o merge, a branch pode ser deletada. O GitHub oferece essa opção automaticamente.',
  },
  {
    num: 6,
    icon: '🚀',
    title: 'Deploy Automático',
    desc: 'O push para main dispara o GitHub Actions que faz o deploy automaticamente.',
    instructions: [
      'O deploy é automático após o merge!',
      'GitHub Actions detecta o push na main',
      'Conecta via SSH, puxa mudanças, instala dependências e faz build',
      'O app é reiniciado com as novas alterações (~30s)',
    ],
    screenshot: 'github_actions',
    tip: 'Acompanhe o progresso em: GitHub → Repositório → Aba "Actions". Se algo der errado, os logs de erro aparecem lá.',
  },
];

function StepCard({ step, isActive, onClick }) {
  return (
    <div className={`step-card ${isActive ? 'step-active' : ''}`} onClick={onClick}>
      <div className="step-num">{step.num}</div>
      <div className="step-icon">{step.icon}</div>
      <h3>{step.title}</h3>
      <p>{step.desc}</p>
    </div>
  );
}

function StepDetail({ step }) {
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

      <div className="instructions-list">
        {step.instructions.map((instr, i) => (
          <div key={i} className="instruction-item">
            <span className="instruction-num">{i + 1}</span>
            <span>{instr}</span>
          </div>
        ))}
      </div>

      {step.example && (
        <div className="example-box">
          <div className="example-label">💬 Exemplo de prompt:</div>
          <p>{step.example}</p>
        </div>
      )}

      {/* Placeholder para screenshot — substitua o src pela imagem real */}
      <div className="screenshot-placeholder" data-name={step.screenshot}>
        <div className="screenshot-inner">
          <span className="screenshot-icon">🖼️</span>
          <span className="screenshot-text">Screenshot: {step.screenshot}.png</span>
          <span className="screenshot-hint">Adicione a imagem em /src/assets/{step.screenshot}.png</span>
        </div>
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
          <StepCard key={step.num} step={step} isActive={i === activeStep} onClick={() => setActiveStep(i)} />
        ))}
      </div>

      <StepDetail step={STEPS[activeStep]} />

      <div className="step-navigation">
        <button className="btn btn-secondary" disabled={activeStep === 0} onClick={() => setActiveStep(p => p - 1)}>
          ← Anterior
        </button>
        <div className="step-dots">
          {STEPS.map((_, i) => (
            <span key={i} className={`dot ${i === activeStep ? 'dot-active' : ''}`} onClick={() => setActiveStep(i)} />
          ))}
        </div>
        <button className="btn btn-primary" disabled={activeStep === STEPS.length - 1} onClick={() => setActiveStep(p => p + 1)}>
          Próximo →
        </button>
      </div>

      <footer className="onboarding-footer">
        <div className="footer-links">
          <span>📚 Referências:</span>
          <a href="https://docs.github.com/en/pull-requests" target="_blank" rel="noopener noreferrer">GitHub PRs</a>
          <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer">Claude Code</a>
          <a href="https://hub.doc9lawtech.com.br" target="_blank" rel="noopener noreferrer">Doc9 Hub</a>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
