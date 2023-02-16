const adminURL = 'https://sanitarskyi-ngx-admin.herokuapp.com/';

describe('Toastr tests', () => {

    beforeEach(() => {
        cy.visit(adminURL);
        cy.get('.theme-preview[alt="Cosmic Theme"]').click();
        cy.get('ul.menu-items li a[title="Modal & Overlays"]').click();
        cy.get('ul.menu-items li ul.menu-items li a[title="Toastr"]').click();
        cy.get('.mat-ripple.sidebar-toggle.mat-ripple-unbounded').click();
        cy.get('nb-layout-header').then($el => $el.remove());
    });


    const toastrTest = (testData, expectedResult) => function () {
        // Fill the form
        // position
        cy.get('label:contains("Position:") + nb-select').click();
        cy.get('nb-option-list nb-option[ng-reflect-value="' + testData.position + '"]').click();
        // title
        cy.get('label:contains("Title:") + input').clear().type(testData.title);
        // content
        cy.get('label:contains("Content:") + input').clear().type(testData.content);
        // time
        cy.get('label:contains("Time") + input').clear().type(testData.time);
        // type
        cy.get('label:contains("Toast type:") + nb-select').click();
        cy.get('nb-option-list nb-option[ng-reflect-value="' + testData.type + '"]').click();

        // Submit form
        cy.get('button:contains("Show toast")').click();

        // Checks
        // icon
        cy.get('.toastr-overlay-container nb-toast nb-icon > svg > g > g').should('have.attr', 'data-name', expectedResult.icon);
        // title
        cy.get('.toastr-overlay-container nb-toast .content-container .title').should('include.text', expectedResult.title);
        // content
        cy.get('.toastr-overlay-container nb-toast .content-container .message').should('have.text', expectedResult.content);
        // color
        cy.get('.toastr-overlay-container nb-toast').should('have.css', 'background-color', expectedResult.color);
        // position
        cy.get('.toastr-overlay-container nb-toast')
            .parentsUntil('.toastr-overlay-container')
            .parent()
            .should('have.css', 'justify-content', 'flex-' + expectedResult.position.horizontal)
            .and('have.css', 'align-items', 'flex-' + expectedResult.position.vertical);

        // hide
        cy.get('nb-toast').click();
    };

    it('show toast 1', toastrTest(
        {
            position: 'top-start',
            title: 'test title',
            content: 'test content',
            time: '5000',
            type: 'success'
        },
        {
            icon: 'checkmark',
            title: 'test title',
            content: 'test content',
            color: 'rgb(0, 214, 143)',
            position: {
                vertical: 'start',
                horizontal: 'start'
            }
        }
    ));

    it('show toast 2', toastrTest(
        {
            position: 'top-end',
            title: 'test title',
            content: 'test content',
            time: '5000',
            type: 'primary'
        },
        {
            icon: 'email',
            title: 'test title',
            content: 'test content',
            color: 'rgb(161, 110, 255)',
            position: {
                vertical: 'start',
                horizontal: 'end'
            }
        }
    ));

    it('show toast 3', toastrTest(
        {
            position: 'bottom-end',
            title: 'test title',
            content: 'test content',
            time: '5000',
            type: 'info'
        },
        {
            icon: 'question-mark',
            title: 'test title',
            content: 'test content',
            color: 'rgb(0, 149, 255)',
            position: {
                vertical: 'end',
                horizontal: 'end'
            }
        }
    ));

    it('show toast 4', toastrTest(
        {
            position: 'bottom-start',
            title: 'test title',
            content: 'test content',
            time: '5000',
            type: 'warning'
        },
        {
            icon: 'alert-triangle',
            title: 'test title',
            content: 'test content',
            color: 'rgb(255, 170, 0)',
            position: {
                vertical: 'end',
                horizontal: 'start'
            }
        }
    ));
});