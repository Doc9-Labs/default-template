require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');

// Load shared env
const sharedEnvPath = path.join(__dirname, '.env.shared');
if (fs.existsSync(sharedEnvPath)) {
  const lines = fs.readFileSync(sharedEnvPath, 'utf8').split('\n');
  lines.forEach(line => {
    const [key, ...vals] = line.split('=');
    if (key && vals.length) process.env[key.trim()] = vals.join('=').trim();
  });
}

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist (Vite build output)
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: process.env.APP_SUBDOMAIN || 'unknown', timestamp: new Date().toISOString() });
});

// SPA fallback
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send(`<html><body><h1>App ${process.env.APP_SUBDOMAIN || ''} is running!</h1><p>Build your frontend with <code>npm run build</code></p></body></html>`);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`App running on port ${PORT}`);
});
