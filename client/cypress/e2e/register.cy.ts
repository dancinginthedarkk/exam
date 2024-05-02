describe('RegistrationForm', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/registration')
  })

  it('displays the registration form correctly', () => {
    cy.get('input[name="login"]').should('exist')

    cy.get('input[name="fio"]').should('exist')

    cy.get('input[name="phone"]').should('exist')

    cy.get('input[name="email"]').should('exist')

    cy.get('input[name="password"]').should('exist')

    cy.get('button[type="submit"]').should('exist')

    cy.get('a').contains('Войти').should('exist')
  })

  it('submits the registration form correctly', () => {
    cy.get('input[name="login"]').type('testuser')
    cy.get('input[name="fio"]').type('Test User')
    cy.get('input[name="phone"]').type('80008882222')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('testpassword')

    cy.get('button[type="submit"]').click()
  })

  it('navigates to login page when clicking on login link', () => {
    cy.get('a').contains('Войти').click()
    cy.url().should('include', '/login')
  })
})
