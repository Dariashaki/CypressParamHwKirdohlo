const adminURL = 'https://sanitarskyi-ngx-admin.herokuapp.com/';

describe('Parametrized tests', () => {

    describe('Enter data', () => {

        const paramTest = ({ testData1, testData2, expectedResult1, expectedResult2 }) => function () {
            cy.visit(adminURL);
            cy.get('.theme-preview[alt="Cosmic Theme"]').click();
            cy.get('.ng-tns-c141-9.ng-star-inserted[title="Forms"]').click();
            cy.get('.ng-tns-c141-11.ng-star-inserted[title="Form Layouts"]').click();
            cy.get('.mat-ripple.sidebar-toggle.mat-ripple-unbounded').click();
            cy.get('nb-layout-header').then($el => $el.remove());
            // Email
            cy.get('nb-card-header:contains("Horizontal form") + nb-card-body input[placeholder="Email"]').type(testData1);
            cy.get('nb-card-header:contains("Horizontal form") + nb-card-body input[placeholder="Email"]').should("contain.value", expectedResult1);
            // Password
            cy.get('nb-card-header:contains("Horizontal form") + nb-card-body input[placeholder="Password"]').type(testData2);
            cy.get('nb-card-header:contains("Horizontal form") + nb-card-body input[placeholder="Password"]').should("contain.value", expectedResult2);
            // Checkbox
            cy.get('nb-card-header:contains("Horizontal form") + nb-card-body label:contains("Remember me")').click();
        }

        it(`enter data`, paramTest({ testData1: 'dariyakirdoglo@gmail.com', expectedResult1: 'dariyakirdoglo@gmail.com', testData2: 'A123456_a', expectedResult2: 'A123456_a' }));

        it(`enter data2`, paramTest({ testData1: 'd.kirdoglo@gmail.com', expectedResult1: 'd.kirdoglo@gmail.com', testData2: 'B123456_b', expectedResult2: 'B123456_b' }));
    })

})