// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })





// cypress/support/commands.js
const { Connection, Request } = require('tedious');

// Custom command to execute a SQL query
Cypress.Commands.add('sqlServerQuery', (query) => {
  const config = {
    server: '36.255.69.198',
    authentication: {
      type: 'default',
      options: {
        userName: 'qa',
        password: 'QaGdic@1234'
      }
    },
    options: {
      database: 'cis_backend_qa',
      encrypt: false, // Set to true if your server requires encrypted connections
      trustServerCertificate: true // Trust self-signed certificates if necessary
    }
  };

  return new Cypress.Promise((resolve, reject) => {
    const connection = new Connection(config);

    connection.on('connect', (err) => {
      if (err) {
        reject(err);
      } else {
        const request = new Request(query, (err, rowCount, rows) => {
          if (err) {
            reject(err);
          } else {
            const result = [];
            rows.forEach(row => {
              const rowObject = {};
              row.forEach(column => {
                rowObject[column.metadata.colName] = column.value;
              });
              result.push(rowObject);
            });
            resolve(result);
          }
          connection.close();
        });

        connection.execSql(request);
      }
    });

    connection.connect();
  });
});
