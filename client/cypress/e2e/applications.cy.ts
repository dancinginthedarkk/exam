describe('MyApplicationsPage', () => {
  beforeEach(() => {
    cy.login()
    cy.applications()
  })

  it('displays the my applications page correctly', () => {
    // Now you can visit the MyApplicationsPage and test it
    cy.visit('http://localhost:5173/applications')

    // Add your assertions here to test the MyApplicationsPage
  })

  it('displays a message when there are no applications', () => {
    cy.get('div').contains('Актуальные заявления отсутствуют')
  })

  it('displays applications list when there are applications', () => {
    // Assuming there are applications, check if the list is displayed
    cy.get('div').should('not.contain', 'Актуальные заявления отсутствуют')
    cy.get('ul').should('be.visible')
  })

  it('navigates to application details page when clicking on an application', () => {
    // Assuming there's at least one application, click on the first one
    cy.get('ul > li').first().click()
    // Assuming navigation changes the URL to '/application/:id', check if the URL has changed
    cy.url().should('include', '/application/')
  })

  it('updates application status when clicking on status icons', () => {
    // Assuming there's at least one application with status 'В ожидании'
    cy.get('div')
      .contains('В ожидании')
      .siblings('div')
      .within(() => {
        // Click on the 'Done' icon
        cy.get('button').first().click()
        // Check if status is updated to 'Принято'
        cy.get('div').contains('Принято')
        // Click on the 'Clear' icon
        cy.get('button').last().click()
        // Check if status is updated to 'Отклонено'
        cy.get('div').contains('Отклонено')
      })
  })

  it('paginates applications correctly', () => {
    // Assuming there are more than `itemsPerPage` applications
    // Click on the second page
    cy.get('button').contains('2').click()
    // Check if the second page is active
    cy.get('button').contains('2').should('have.class', 'active')
    // Check if the first application on the list is the sixth overall application
    // Assuming each page displays `itemsPerPage` applications
    cy.get('ul > li')
      .first()
      .should('contain', 'Номер автомобиля: Car Number 6')
  })
})
