/**
 * Claude AI Helper — Doc9 Hub App
 * 
 * This module provides a pre-configured Anthropic client
 * for calling the Claude API from your app.
 * 
 * Usage:
 *   const claude = require('./claude');
 * 
 *   // Send a message to Claude
 *   const response = await claude.message('Explique o que é machine learning');
 *   console.log(response);
 * 
 *   // Advanced: use the raw client
 *   const result = await claude.client.messages.create({
 *     model: 'claude-sonnet-4-20250514',
 *     max_tokens: 1024,
 *     messages: [{ role: 'user', content: 'Olá!' }]
 *   });
 * 
 * Environment variable (auto-configured by Doc9 Hub):
 *   ANTHROPIC_API_KEY — Your app's API key
 */

const Anthropic = require('@anthropic-ai/sdk');

let client = null;

function getClient() {
  if (!client) {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.warn('⚠️ ANTHROPIC_API_KEY not set. Claude AI features unavailable.');
      return null;
    }

    client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    console.log('✅ Claude AI client ready');
  }
  return client;
}

/**
 * Send a simple message to Claude and get a text response
 * @param {string} prompt - The message to send
 * @param {object} options - Optional: model, max_tokens, system
 * @returns {Promise<string>} Claude's response text
 */
async function message(prompt, options = {}) {
  const c = getClient();
  if (!c) throw new Error('Claude AI not configured — set ANTHROPIC_API_KEY');

  const response = await c.messages.create({
    model: options.model || 'claude-sonnet-4-20250514',
    max_tokens: options.max_tokens || 1024,
    system: options.system || undefined,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0]?.text || '';
}

/**
 * Send a conversation (multiple messages) to Claude
 * @param {Array} messages - Array of { role: 'user'|'assistant', content: string }
 * @param {object} options - Optional: model, max_tokens, system
 * @returns {Promise<string>} Claude's response text
 */
async function chat(messages, options = {}) {
  const c = getClient();
  if (!c) throw new Error('Claude AI not configured — set ANTHROPIC_API_KEY');

  const response = await c.messages.create({
    model: options.model || 'claude-sonnet-4-20250514',
    max_tokens: options.max_tokens || 1024,
    system: options.system || undefined,
    messages,
  });

  return response.content[0]?.text || '';
}

module.exports = { message, chat, getClient, client: getClient() };
