// ***********************************************
// For comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('visitAuthenticated', (url, options) => {
  if (Cypress.env('BASIC_AUTH_USERNAME') || Cypress.env('BASIC_AUTH_PASSWORD')) {
    cy.visit(url, Object.assign({}, {
      auth: {
        username: Cypress.env('BASIC_AUTH_USERNAME'),
        password: Cypress.env('BASIC_AUTH_PASSWORD'),
      }
    }, options));
  } else {
    cy.visit(url, options);
  }
});


// Thanks to https://stackoverflow.com/a/60828421
Cypress.Commands.add("clickRecaptcha", () => {
  cy.get('iframe')
    .first()
    .then($iframe => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body)
        .find('.recaptcha-checkbox-border')
        .should('be.visible')
        .click();
    });
  cy.wait(3000);
});
