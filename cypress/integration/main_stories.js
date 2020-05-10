describe('Basic pages', function () {
  it('The user can click through the static pages', function () {
    // App landing page
    cy.visitAuthenticated('/');
    cy.contains('Pandemic Important Resource Allocation Tool');
    cy.contains('Partner');

    // Contact
    cy.contains('Contact').click();
    cy.contains('Request a callback');
    cy.contains('mail@pirat-tool.com');
    cy.contains('Request a callback')

    // About us
    cy.contains('About us').click();
    cy.contains('Julia Klüpfel');
    cy.contains('PhD Student');
    cy.contains('Lukas Vordemann');

    // FAQ
    cy.contains('FAQ').click();
    cy.contains('Tutorials');
    cy.get('iframe').should('have.attr', 'src',
      'https://www.youtube-nocookie.com/embed/Pzh8KgdHhWg');

    // Legal notice
    cy.contains('Legal notice').click();
    cy.contains('Imprint');
    cy.contains('Lukas Vordemann');

    // Privacy policy
    cy.contains('Privacy policy').click();
    cy.contains('Data Protection Declaration');
    cy.contains('Lukas Vordemann');
  });
});


describe('Create and find offer', function () {

  beforeEach(function () {
    cy.fixture('offer').then((offer) => {
      this.offer = offer;
    });
  })

  let offerChangeUrl;

  it('The user can create an offer', function () {
    const { provider, staff, device, consumable } = this.offer;

    cy.visitAuthenticated('/');
    cy.contains('Create offer').click();

    // Contact data
    cy.get('input[placeholder="Institution"]').eq(0).type(provider.institution);
    cy.get('input[placeholder="Name"]').type(provider.name);
    cy.get('input[placeholder="Email"]').type(provider.email);
    cy.get('input[placeholder*="Telephone"').type(provider.telephone);
    cy.get('input[placeholder*="Street"').type(provider.street);
    cy.get('input[placeholder="Postal code"').type(provider.postalCode);
    cy.get('input[placeholder="City"').type(provider.city);
    cy.get('[type="checkbox"]').eq(0).check();

    // Add resources
    cy.contains('Add consumable').click();
    cy.contains('Add device').click();
    cy.contains('Add staff').click();

    // Staff
    cy.get('select').eq(0).select(staff.qualification);
    cy.get('input[placeholder="Institution"]').eq(1).type(staff.institution);
    cy.get('input[placeholder*="Department"]').type(staff.department);
    cy.get('select').eq(1).select(staff.area);
    cy.get('textarea').eq(0).type(staff.comment);
    cy.get('[type="checkbox"]').eq(1).check();

    // Device
    cy.get('select').eq(2).select(device.category);
    cy.get('input[placeholder*="Exact name"]').eq(0).type(device.name);
    cy.get('input[placeholder="Manufacturer"]').eq(0).type(device.manufacturer);
    cy.get('input[placeholder*="serial number"]').eq(0).type(device.serialNumber);
    cy.get('input[placeholder="Amount"]').eq(0).type(device.amount);
    cy.get('textarea').eq(1).type(device.comment);

    // Consumable
    cy.get('select').eq(3).select(consumable.category);
    cy.get('input[placeholder*="Exact name"]').eq(1).type(consumable.name);
    cy.get('input[placeholder="Manufacturer"]').eq(1).type(consumable.manufacturer);
    cy.get('input[placeholder*="serial number"]').eq(1).type(consumable.serialNumber);
    cy.get('input[placeholder="Amount"]').eq(1).type(consumable.amount);
    cy.get('select').eq(4).select(consumable.unit);
    cy.get('textarea').eq(2).type(consumable.comment);

    cy.clickRecaptcha();
    cy.get('button').contains('Create offer').click();
    cy.url().should('include', '/change');
    cy.url().should((url) => {
      offerChangeUrl = url;
    });
  });

  it('The user can edit the offer', function () {
    cy.visitAuthenticated('/');
    cy.wait(500);
    cy.visitAuthenticated(offerChangeUrl);
    // TODO
  });
});
