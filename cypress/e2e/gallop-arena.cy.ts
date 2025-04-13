describe('Gallop Arena', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.viewport(1280, 800)
  })

  it('should have a functioning header with buttons', () => {
    cy.get('[data-test="header-controls"]').should('be.visible')
  })

  it('should be able to generate horses and race schedule', () => {
    // Initial state should show guide section
    cy.get('[data-test="arena"]').should('be.visible')

    // Generate horses
    cy.get('[data-test="header-button-generate-horses"]').should('be.visible').click()

    // After generating, horse list should be visible
    cy.get('[data-test="horse-list"]').should('be.visible')

    // Check if we have horses in the list (between 1 to 20 horses)
    cy.get('[data-test="horse-list"] [data-test="horse-item"]').should('have.length.within', 1, 20)
  })

  it('should generate a race schedule with 6 rounds and correct distances', () => {
    // Generate horses first
    cy.get('[data-test="header-button-generate-horses"]').click()
    cy.get('[data-test="horse-list"]').should('be.visible')

    // Generate race schedule
    cy.get('[data-test="header-button-generate-schedule"]').should('be.visible').click()

    // Open results menu to view all rounds
    cy.get('[data-test="header-button-results"]').click()
    cy.get('[data-test="results-menu"]').should('be.visible')
    cy.get('[data-test="results-menu-content"]').should('be.visible')

    // Verify all 6 rounds exist with correct distances
    cy.get('[data-test="race-results"]').should('have.length', 6)
    cy.get('[data-test="race-result"]').should('contain', 'Round 1 - 1200m')
    cy.get('[data-test="race-result"]').should('contain', 'Round 2 - 1400m')
    cy.get('[data-test="race-result"]').should('contain', 'Round 3 - 1600m')
    cy.get('[data-test="race-result"]').should('contain', 'Round 4 - 1800m')
    cy.get('[data-test="race-result"]').should('contain', 'Round 5 - 2000m')
    cy.get('[data-test="race-result"]').should('contain', 'Round 6 - 2200m')
  })

  it('should be able to start and complete a race', () => {
    // Generate horses first
    cy.get('[data-test="header-button-generate-horses"]').click()
    cy.get('[data-test="horse-list"]').should('be.visible')

    // Generate race schedule
    cy.get('[data-test="header-button-generate-schedule"]').should('be.visible').click()

    // Start the race
    cy.get('[data-test="header-button-start-race"]').should('be.visible').click({ force: true })

    // Race view should be visible
    cy.get('[data-test="race-view"]').should('be.visible')

    // Verify horses are moving (wait for the animation to start)
    cy.get('[data-test="race-track"]').should('be.visible')
    cy.get('[data-test="race-horse"]').should('have.length.above', 0)

    // Wait for the first round to complete (may need to adjust timeout based on actual race duration)
    cy.get('[data-test="race-title-heading"]', { timeout: 30000 }).contains('Round', {
      timeout: 30000,
    })
  })

  it('should display race status information', () => {
    // Generate horses
    cy.get('[data-test="header-button-generate-horses"]').click()
    cy.get('[data-test="horse-list"]').should('be.visible')

    // Generate race schedule
    cy.get('[data-test="header-button-generate-schedule"]').should('be.visible').click()

    // Start the race
    cy.get('[data-test="header-button-start-race"]').click({ force: true })

    // Verify race is progressing with horses moving
    cy.get('[data-test="race-track"]').should('be.visible')
    cy.get('[data-test="race-horse"]').should('have.length.above', 0)

    // Verify round badge is visible
    cy.get('[data-test="round-badge"]', { timeout: 30000 }).should('be.visible')
    cy.get('[data-test="distance-badge"]', { timeout: 30000 }).should('be.visible')

    // Verify that results button is enabled eventually (after race completes)
    cy.get('[data-test="header-button-results"]', { timeout: 30000 }).should('be.visible')
  })

  it('should complete a single race round', () => {
    // Setup test
    cy.get('[data-test="header-button-generate-horses"]').click()
    cy.get('[data-test="header-button-generate-schedule"]').should('be.visible').click()
    cy.get('[data-test="header-button-start-race"]').click({ force: true })

    // Wait for horses to be visible and race to be in progress
    cy.get('[data-test="race-horse"]', { timeout: 10000 }).should('be.visible')

    // Wait for race to complete by looking for the next round button to be enabled
    // This indicates the current round has completed
    cy.get('[data-test="header-button-next-round"]', { timeout: 50000 }).should('be.visible')
    cy.get('[data-test="header-button-next-round"]', { timeout: 60000 }).should('not.be.disabled')
  })

  it('should allow navigating through multiple race rounds', () => {
    // Setup test
    cy.get('[data-test="header-button-generate-horses"]').click()
    cy.get('[data-test="header-button-generate-schedule"]').should('be.visible').click()
    cy.get('[data-test="header-button-start-race"]').click({ force: true })

    // Wait for the first round to complete
    cy.get('[data-test="header-button-next-round"]', { timeout: 50000 }).should('be.visible')

    // Wait for the button to not be disabled
    cy.get('[data-test="header-button-next-round"]', { timeout: 60000 }).should('not.be.disabled')

    // Check current round is 1
    cy.get('[data-test="round-badge"]').contains('Round 1')

    // Navigate to next round
    cy.get('[data-test="header-button-next-round"]').click()

    // Check that round 2 is now active
    cy.get('[data-test="round-badge"]', { timeout: 10000 }).contains('Round 2')

    // Verify race distance changes for round 2
    cy.get('[data-test="distance-badge"]').contains('1400m')
  })

  it('should display race results in the results menu', () => {
    // Setup test
    cy.get('[data-test="header-button-generate-horses"]').click()
    cy.get('[data-test="header-button-generate-schedule"]').should('be.visible').click()
    cy.get('[data-test="header-button-start-race"]').click({ force: true })

    // Wait for the first round to complete
    cy.get('[data-test="header-button-next-round"]', { timeout: 50000 }).should('be.visible')
    cy.get('[data-test="header-button-next-round"]', { timeout: 60000 }).should('not.be.disabled')

    // Open results menu
    cy.get('[data-test="header-button-results"]').click()

    // Verify results menu is displayed
    cy.get('[data-test="results-menu"]').should('be.visible')
    cy.get('[data-test="results-menu-content"]').should('be.visible')

    // Check that results for the completed round are displayed
    cy.get('[data-test="race-result"]').contains('Round 1 - 1200m')
    cy.get('[data-test="results-list"]').should('be.visible')
    cy.get('[data-test="results-item"]').should('have.length.above', 0)
  })

  it('should enable auto next round functionality', () => {
    // Setup test
    cy.get('[data-test="header-button-generate-horses"]').click()
    cy.get('[data-test="header-button-generate-schedule"]').should('be.visible').click()

    // Start the race
    cy.get('[data-test="header-button-start-race"]').click({ force: true })

    // Make sure the race has started before checking the auto next checkbox
    cy.get('[data-test="race-horse"]', { timeout: 10000 }).should('be.visible')

    // Wait for the race to be in progress with Round 1 visible
    cy.get('[data-test="round-badge"]', { timeout: 10000 }).contains('Round 1')

    // Enable auto next
    cy.get('[data-test="auto-next-checkbox"] input[type="checkbox"]').check({ force: true })

    // Wait for the first round to complete by first looking for the next round button
    // Then check that it's not disabled, which indicates round 1 is complete
    cy.get('[data-test="header-button-next-round"]', { timeout: 60000 }).should('be.visible')
    cy.get('[data-test="header-button-next-round"]', { timeout: 90000 }).should('not.be.disabled')

    // With auto-next enabled, should advance to Round 2 automatically
    // Increase timeout to give enough time for the transition
    cy.get('[data-test="round-badge"]', { timeout: 120000 }).contains('Round 2')
    cy.get('[data-test="distance-badge"]', { timeout: 120000 }).contains('1400m')

    // Uncheck auto next to stop auto progression
    cy.get('[data-test="auto-next-checkbox"] input[type="checkbox"]').uncheck({ force: true })
  })

  it('should have animated horse movement during races', () => {
    // Setup test
    cy.get('[data-test="header-button-generate-horses"]').click()
    cy.get('[data-test="header-button-generate-schedule"]').should('be.visible').click()
    cy.get('[data-test="header-button-start-race"]').click({ force: true })

    // Wait for horses to appear and the race to be in progress
    cy.get('[data-test="race-horse"]', { timeout: 10000 }).should('be.visible')
    cy.get('[data-test="round-badge"]', { timeout: 10000 }).should('contain', 'Round 1')

    // Instead of checking actual movement which can be hard to detect in tests,
    // verify that the animation styles are properly applied to the horses
    cy.get('[data-test="race-horse"]').then(($horses) => {
      const firstHorse = $horses[0]
      const computedStyle = window.getComputedStyle(firstHorse)

      // Check CSS properties related to animation
      const hasAnimationProperties =
        computedStyle.transition.includes('left') || // Check for transition on left property
        computedStyle.animation.includes('horsePulse') || // Check for animation name
        (computedStyle.transform.includes('translateX') &&
          firstHorse.style.transform.includes('translateX')) // Check transform

      // Verify animation is applied
      cy.wrap(hasAnimationProperties).should('be.true')

      // If possible, check that the element has a class that indicates it's animated
      const hasAnimationClass = firstHorse.classList.contains('race-horse')
      cy.wrap(hasAnimationClass).should('be.true')
    })
  })

  it('should display results modal after completing all race rounds', () => {
    // Setup test
    cy.get('[data-test="header-button-generate-horses"]').click()
    cy.get('[data-test="header-button-generate-schedule"]').should('be.visible').click()
    cy.get('[data-test="header-button-start-race"]').click({ force: true })

    // Enable auto next to go through all rounds automatically
    cy.get('[data-test="auto-next-checkbox"] input[type="checkbox"]').check({ force: true })

    // Wait for first round to complete
    cy.get('[data-test="header-button-next-round"]', { timeout: 160000 }).should('not.be.disabled')

    // Wait for Round 2 to start
    cy.get('[data-test="round-badge"]', { timeout: 160000 }).contains('Round 2')

    // Wait for Round 3 to start (showing progression)
    cy.get('[data-test="round-badge"]', { timeout: 160000 }).contains('Round 3')

    // Wait for the final round to complete and results modal to appear
    cy.get('[data-test="results-modal"]', { timeout: 280000 }).should('be.visible')

    // Verify results modal has expected content
    cy.get('[data-test="results-modal"]').contains('Race Results')

    // Check that the results table is displayed with horse positions
    // Use scrollIntoView as its own command to ensure the table is visible
    cy.get('[data-test="results-modal"]').find('table').scrollIntoView()

    // Then verify it's visible as a separate command
    cy.get('[data-test="results-modal"]').find('table').should('be.visible')

    // Verify table contents
    cy.get('[data-test="results-modal"]').find('table th').eq(0).should('contain', 'Position')
    cy.get('[data-test="results-modal"]').find('table th').eq(1).should('contain', 'Horse')
    cy.get('[data-test="results-modal"]').find('table th').eq(2).should('contain', 'Total Points')

    // Verify that at least one row of results exists
    cy.get('[data-test="results-modal"]').find('table tbody tr').should('have.length.at.least', 1)
  })
})
