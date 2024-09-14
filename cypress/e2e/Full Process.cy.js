describe('Validate MSSQL Stored Procedure - GetUserDetails', () => {
  it('should return correct user details for a given UserId', () => {
    const procedureName = 'GetUserDetails';
    const inputParams = [
      { name: 'UserId', type: sqlServer.Int, value: 1 } // Replace 1 with a valid UserId
    ];

    // Call the stored procedure and validate the result
    cy.task('callStoredProcedure', { procedureName, inputParams }).then((result) => {
      console.log(result); // For debugging, this will log the result

      // Assuming the result contains the columns: FirstName, LastName, and Email
      expect(result).to.have.length(1); // Ensure one row is returned

      const user = result[0]; // Get the first result row
      
      // Perform validation on the result
      expect(user.FirstName).to.equal('John');   // Replace with expected data
      expect(user.LastName).to.equal('Doe');     // Replace with expected data
      expect(user.Email).to.equal('john.doe@example.com'); // Replace with expected data
    });
  });
});
