/**
 * Database Helper — Doc9 Hub App
 * 
 * This module provides a pre-configured PostgreSQL connection pool
 * that automatically uses your app's isolated schema.
 * 
 * Usage:
 *   const db = require('./db');
 * 
 *   // Query within your app's schema
 *   const result = await db.query('SELECT * FROM my_table');
 * 
 *   // Create tables (they'll be created in your schema)
 *   await db.query(`
 *     CREATE TABLE IF NOT EXISTS items (
 *       id SERIAL PRIMARY KEY,
 *       name TEXT NOT NULL,
 *       created_at TIMESTAMP DEFAULT NOW()
 *     )
 *   `);
 * 
 * Environment variables (auto-configured by Doc9 Hub):
 *   DATABASE_URL  — PostgreSQL connection string
 *   DB_SCHEMA     — Your app's isolated schema name
 */

const { Pool } = require('pg');

let pool = null;

function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      console.warn('⚠️ DATABASE_URL not set. Database features unavailable.');
      return null;
    }

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30000,
    });

    // Automatically set search_path to app's schema on every new connection
    pool.on('connect', (client) => {
      const schema = process.env.DB_SCHEMA || 'public';
      client.query(`SET search_path TO "${schema}", public`);
    });

    pool.on('error', (err) => {
      console.error('⚠️ Database pool error:', err.message);
    });

    console.log(`✅ Database pool ready (schema: ${process.env.DB_SCHEMA || 'public'})`);
  }
  return pool;
}

/**
 * Execute a SQL query
 * @param {string} text - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<import('pg').QueryResult>}
 */
async function query(text, params) {
  const p = getPool();
  if (!p) throw new Error('Database not configured');
  return p.query(text, params);
}

/**
 * Get a client from the pool (for transactions)
 * @returns {Promise<import('pg').PoolClient>}
 */
async function getClient() {
  const p = getPool();
  if (!p) throw new Error('Database not configured');
  const client = await p.connect();
  const schema = process.env.DB_SCHEMA || 'public';
  await client.query(`SET search_path TO "${schema}", public`);
  return client;
}

module.exports = { query, getClient, getPool };
