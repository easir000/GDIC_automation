describe('Database Test', () => {
  it('should query the database', () => {
    cy.task('queryDb', 'SELECT * FROM your_table_name').then((result) => {
      console.log(result);
      // Add your assertions here
    });
  });
});
