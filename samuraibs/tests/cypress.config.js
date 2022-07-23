const { defineConfig } = require("cypress");
const { pool, Pool } = require('pg')

/// <reference types="Cypress" />

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1440,
    viewportHeight: 900,
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const pool = new Pool({
        host: 'ziggy.db.elephantsql.com',
        user: 'bmbphyex',
        password: 'FECudg5d-HMCk1yaQnGnMjBjRjZbj231',
        database: 'bmbphyex',
        port: 5432
      })

      on('task', {
        removeUser(email) {
          return new Promise((resolve) => {
            pool.query('DELETE FROM public.users WHERE email = $1', [email], (error, result) => {
              if (error) {
                throw error
              }
              resolve({ success: result })
            })
          })
        }
      })
    },
  },
});
