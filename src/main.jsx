import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%)',
      fontFamily: "'Inter', sans-serif", color: '#f0f0ff'
    }}>
      <div style={{
        textAlign: 'center', padding: '48px',
        background: 'rgba(255,255,255,0.05)', borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)',
        maxWidth: '500px'
      }}>
        <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>🚀 Seu App está no ar!</h1>
        <p style={{ color: '#8888aa', lineHeight: 1.6 }}>
          Este é o template padrão do Doc9 Hub. Edite os arquivos em <code style={{ color: '#7c5cfc' }}>src/</code> para personalizar.
        </p>
        <p style={{ marginTop: 24, fontSize: 13, color: '#555577' }}>
          Faça push para o GitHub e o deploy será automático.
        </p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
