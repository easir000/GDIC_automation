// cypress/integration/sqlServerTest.spec.js

describe('SQL Server Database Tests', () => {
    it('should connect to the SQL Server and fetch data', () => {
      // Replace 'SELECT * FROM your_table' with your actual SQL query
      cy.sqlServerQuery('SELECT * FROM your_table').then((result) => {
        // Perform assertions on the result
        expect(result).to.have.length.greaterThan(0);
        cy.log('Query Result:', result);
      });
    });
  });
  