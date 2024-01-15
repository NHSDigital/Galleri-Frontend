// <reference types="Cypress" />


//GAL-316_TC01

describe('Target Percentage: Default value used last', () => {
    it('allows the user to see the value used last when invitations were generated for a selected clinic', () => { 
    
    //Step 1: User lands on the landing page
    cy.visit("http://localhost:3004")
    
    //Step 2: Click on the Target percentage of appointments to fill field
    cy.get('#input-target-percentage')
    .should('have.text','25'); 
    
    });
    });
    
    //GAL-316_TC02

    describe('Target Percentage: Default value is set to 50', () => {
        it('allows the user to see the default value is set to 50 percent when no previous invitation batches were selected', () => { 
        
        //Step 1: User lands on the landing page
        cy.visit("http://localhost:3004")
        
        //User should see the text Clinic Invitation Criteria
        cy.get('#clinic-invitation-criteria-section')
        .should('contain','Clinic Invitation Criteria')
        
         //Step 3: User sees 50 percent being displayed
        cy.get('#input-target-percentage')
        .should('have.text', '50'); 
        
        });
        });
        
        //GAL-316_TC03

        describe('Target Percentage: set value between 1 to 100', () => {
            it('allows the user to set the value between 1 to 100 percent to no decimal point', () => { 
            
            //Step 1: User lands on the landing page
            cy.visit("http://localhost:3004");
            
             //Step 2: Click on the Target Percentage of appointments to fill field
            cy.get('#input-target-percentage').clear(); 
            
            //Step 3: User enters 64 in the current percentage of appointments to fill field
            cy.get('#input-target-percentage').type('64'); 
            
            //Step 4: Clicks on update
            cy.get('#update-button').click(); 
            
            //Step 5: The value should be saved successfully
            cy.get('#input-target-percentage').should('have.text', '64'); 
            
            });
            });

            //GAL-316_TC04

            describe('Target Percentage: set value by entering boundary values', () => {
                it('allows the user to enter boundary values like 1 and 100'), () => { 
                
                //Step 1: User lands on the landing page
                cy.visit("http://localhost:3004"); 
                
                //Step 2: Click on the Target Percentage of appointments to fill field
                cy.get('#input-target-percentage').clear(); 
                
                //Step 3: User enters 1 in the current percentage of appointments to fill field
                cy.get('#input-target-percentage').type('1'); 
                
                //Step 4: Click on update
                cy.get('#update-button').click(); 
                
                //Step 5: The value should be saved successfully
                cy.get('#input-target-percentage').should('have.text', '1'); 
                
                //Step 6: Click on the Target Percentage of appointments to fill field
                cy.get('#input-target-percentage').clear(); 
                
                //Step 7: User enters 100 in the current percentage of appointments to fill field
                cy.get('#input-target-percentage').type('100');
                
                 //Step 8: Click on update
                 cy.get('#update-button').click(); 
                
                //Step 9: The value should be saved successfully
                cy.get('#input-target-percentage').should('have.text', '100'); 
                
                
            }
        });

        //GAL-316_TC05

        describe('Target Percentage: set value by entering 0', () => {
            it('allows the user to enter value 0 and expect warning message', () => { 
            
            //Step 1: User lands on a landing page
            cy.visit("http://localhost:3004"); 
            
            //Step 2: Click on the Target Percentage of appointments to fill field
            cy.get('#input-target-percentage').clear(); 
            
            //Step 3: User enters 1 in the current percentage of appointments to fill field
            cy.get('#input-target-percentage').type('0'); 
            
            //Step 4: Click on update
            cy.get('#update-button').click(); 
            
            //Step 5: User expects to see a warning message
            cy.get('#error-message').should('have.text','The target percentage must be between 1% and 100%')
            
             });
            });

           // GAL-316_TC06

            describe('Target Percentage: set value by entering a value outside of the permitted range', () => {
                it('ensures the user to enter a value outside of the permitted range and should expect a warning message', () => { 
                
                //Step 1: User lands on a landing page
                cy.visit("http://localhost:3004"); 
                
                //Step 2: Click on the Target Percentage of appointments to fill field
                cy.get('#input-target-percentage').clear(); 
                
                //Step 3: User enters 101 in the current percentage of appointments to fill field
                cy.get('#input-target-percentage').type('101'); 
                
                //Step 4: Click on update
                cy.get('#update-button').click();  
                
                //Step 5: User should expect to see a warning message
                cy.get('error-message').should('have.text', 'The target percentage must be between 1% and 100%'); 
                
                });
                });

               // GAL-316_TC07

                describe('Target Percentage: field is left empty', () => {
                    it('ensures that the user cannot leave the percentage field empty', () => {
                    
                     //Step 1: User lands on a landing page
                    cy.visit("http://localhost:3004"); 
                    
                    //Step 2: Click on the Target Percentage of appointments to fill field
                    cy.get('#input-target-percentage').clear(); 
                    
                    //Step 3: User enters no value in the current percentage of appointments to fill field
                    cy.get('#input-target-percentage').type(''); 
                    
                    //Step 4: Click on update
                    cy.get('#update-button').click();  
                    
                    //Step 5: User should expect to see a warning message
                    cy.get('#error-message').should('have.text', 'The target percentage must be between 1% and 100%'); 
                    
                    });
                    });

                   // GAL-316_TC08

                    describe('Target Percentage: cannot enter text or percentage symbol', () => {
                        it('nsures that the user cannot enter text or percentage symbol in the percentage field', () => {
                        
                         //Step 1: User lands on a landing page
                        cy.visit("http://localhost:3004"); 
                        
                        //Step 2: Click on the Target Percentage of appointments to fill field
                        cy.get('#input-target-percentage').clear(); 
                        
                        //Step 3: User enters text in the current percentage of appointments to fill field
                        cy.get('#input-target-percentage').type('percent'); 
                        
                        //Step 4: Click on update
                        cy.get('#update-button').click(); 
                        
                        //Step 5: User should expect to see a warning message
                        cy.get('#warning-message').should('have.text', ''); 
                        
                        //Step 6: Click on the Target Percentage of appointments to fill field
                        cy.get('#input-target-percentage').clear(); 
                        
                        //Step 7: User enters % symbol in the current percentage of appointments to fill field
                        cy.get('#input-target-percentage').type('%'); 
                        
                        //Step 8: Click on update button
                        cy.get('#update-button').click(); 
                        
                        //Step 9: User should expect to see a warning message
                        cy.get('#warning-message').should('have.text', ''); 
                        
                        });
                        });

                       // GAL-316_TC09

                        describe('Target Percentage: verify actual Target Percentage Appointment Number', () => {
                            it('verifies that the system calculates actual Target Appointment number', () => { 
                            
                            //Step 1: User lands on a landing page
                            cy.visit("http://localhost:3004"); 
                            
                            //Step 2: Click on the Target Percentage of appointments to fill field
                            cy.get('#input-target-percentage').clear(); 
                            
                            //Step 3: User enters in a value in the current percentage of appointments to fill field
                            cy.get('#input-target-percentage').type('34'); 
                            
                            //Step 4: Click on update button
                            cy.get('#update-button').click(); 
                            
                            //Step 5: User should see the actual Target Percentage Appointment Number
                            cy.contains('Target number of appointments to fill').should('have.text', ''); 
                        });
                            });
                            
                        
                    
                
            
                
            