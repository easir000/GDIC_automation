const sqlServer = require('mssql');

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // Task to call stored procedures
      on('task', {
        callStoredProcedure({ procedureName, inputParams }) {
          // Database connection configuration
          const dbConfig = {
            user: config.env.db.userName,
            password: config.env.db.password,
            server: config.env.db.server,
            database: config.env.db.database,
            options: {
              encrypt: true,
            },
          };

          // Connect to the database and call the stored procedure
          return sqlServer.connect(dbConfig).then((pool) => {
            const request = pool.request();

            // Add input parameters to the stored procedure
            inputParams.forEach((param) => {
              request.input(param.name, param.type, param.value);
            });

            // Execute the stored procedure
            return request.execute(procedureName);
          })
          .then((result) => result.recordset)
          .catch((err) => {
            console.error(err);
            throw err;
          });
        }
      });

      return config;
    }
  }
};
