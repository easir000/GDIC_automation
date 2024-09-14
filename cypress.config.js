const { defineConfig } = require('cypress');
const cypressSqlServer = require('cypress-sql-server');
const sqlServer = require('mssql');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      cypressSqlServer.loadDBPlugin(on, config);

      on('task', {
        queryDb(query) {
          const dbConfig = {
            user: config.env.db.userName,
            password: config.env.db.password,
            server: config.env.db.server,
            database: config.env.db.database,
            options: config.env.db.options
          };

          return sqlServer.connect(dbConfig).then(pool => {
            return pool.request().query(query);
          }).then(result => {
            return result.recordset;
          }).catch(err => {
            console.error(err);
            throw err;
          });
        }
      });

      return config;
    },
    baseUrl: 'http://36.255.69.198/auth/login', // Update with your app URL if needed
  },
});

