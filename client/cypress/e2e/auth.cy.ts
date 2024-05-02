describe('Authentication Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  })

  it('displays the login form correctly', () => {
    cy.get('input[name="login"]').should('exist')

    cy.get('input[name="password"]').should('exist')

    cy.get('button[type="submit"]').should('exist')

    cy.get('a').contains('Зарегистрироваться').should('exist')
  })

  it('navigates to registration page when clicking on registration link', () => {
    cy.contains('Зарегистрироваться').click()
    cy.url().should('include', '/registration')
  })
})
