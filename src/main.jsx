import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="box" style={{ textAlign: 'center', padding: '48px', maxWidth: '520px', animation: 'fadeInUp 0.6s ease' }}>
        <div style={{
          width: 64, height: 64, borderRadius: 14,
          background: 'var(--gradient-brand)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', fontSize: 28, color: '#fff', fontWeight: 700,
          boxShadow: '0 8px 32px rgba(60,33,247,0.3)'
        }}>D9</div>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>🚀 Seu App está no ar!</h1>
        <p style={{ color: 'var(--text-second-color)', lineHeight: 1.7, marginBottom: 24 }}>
          Este é o template padrão do <strong>Doc9 Hub</strong>. Edite os arquivos em{' '}
          <code style={{ color: '#3C21F7', background: 'rgba(60,33,247,0.08)', padding: '2px 6px', borderRadius: 4 }}>src/</code>{' '}
          para personalizar.
        </p>
        <p style={{ fontSize: 13, color: 'var(--text-second-color)' }}>
          Faça push para o GitHub e o deploy será automático.
        </p>
        <div style={{ marginTop: 32 }}>
          <a href="https://hub.doc9lawtech.com.br" className="btn btn-primary">← Voltar ao Hub</a>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
