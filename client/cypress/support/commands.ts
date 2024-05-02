/// <reference types="cypress" />
// ***********************************************
Cypress.Commands.add('login', () => {
  // Assuming your login endpoint is '/login'
  cy.intercept('POST', 'http://localhost:5001/api/user/login', {
    statusCode: 200,
    body: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlvIjoiMTIzIiwibG9naW4iOiIxMjMiLCJwaG9uZSI6IjEyMyIsImVtYWlsIjoiMTIzIiwicGFzc3dvcmQiOiIkMmIkMDUkR1dPVEl1QmFjR3B1eTU4NFBKRlpKT1J0eGZ0T2p3bFpVUjVnaDZYMGIvck5kLkp5R0hiY20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MTQ2NjgzOTUsImV4cCI6MTcxNDc1NDc5NX0.xJdXHsU_WEL1nw6FPWSYTBA-WTENccIglL5iw7wHorM',
    },
  }).as('login')

  // Visit the login page
  cy.visit('http://localhost:5173/login')

  // Fill in the login form with valid credentials
  cy.get('input[name="login"]').type('your_username')
  cy.get('input[name="password"]').type('your_password')

  // Submit the login form
  cy.get('button[type="submit"]').click()

  // Wait for the login request to complete
  cy.wait('@login')
})

Cypress.Commands.add('applications', () => {
  // Assuming your login endpoint is '/login'
  cy.intercept('GET', 'http://localhost:5001/api/application/', {
    statusCode: 200,
    body: {
      application: [
        {
          id: 1,
          carNumber: '123',
          description: '1213',
          status: 'Принят',
          createdAt: '2024-04-30T17:15:33.140Z',
          updatedAt: '2024-05-01T15:49:44.874Z',
          userId: 1,
        },
        {
          id: 2,
          carNumber: '123',
          description: '123',
          status: 'В ожидании',
          createdAt: '2024-04-30T17:22:36.379Z',
          updatedAt: '2024-05-01T15:49:44.874Z',
          userId: 1,
        },
      ],
    },
  }).as('applications')

  // Visit the login page
  cy.visit('http://localhost:5173/applications')

  cy.wait('@applications')
})
