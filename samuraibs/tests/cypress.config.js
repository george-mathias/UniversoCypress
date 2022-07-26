const { defineConfig } = require("cypress");
const { pool, Pool } = require('pg')

/// <reference types="Cypress" />

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://samuraibs-web-george.herokuapp.com/",
    viewportWidth: 1440,
    viewportHeight: 900,
    projectId: "tq89w3",

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
        },
        findToken(email) {
          return new Promise((resolve) => {
            pool.query(`SELECT B.token from
                      public.users A
                      INNER JOIN public.user_tokens B
                      ON A.id = B.user_id
                      WHERE A.email = $1
                      ORDER BY B.created_at`, [email], (error, result) => {
              if (error) {
                throw error
              }
              resolve({ token: result.rows[0].token })
            })
          })
        }
      })
    },
  },
});
