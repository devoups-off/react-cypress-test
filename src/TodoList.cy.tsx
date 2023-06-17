import React from 'react'
import TodoList from './TodoList'

describe('<TodoList />', () => {

  beforeEach(() => {
    cy.mount(<TodoList />)
  });

  it('should add a new todo to the list', () => {
    const todoText = 'Test Todo';

    cy.get('input[type="text"]').type(todoText);
    cy.get('button[type="submit"]').click();
    cy.get('ul').contains('li', todoText).should('be.visible');

    cy.get('ul li').should('have.length', 1);

    // Ajouter plus d'éléments à la liste
    cy.get('input[type="text"]').type('Second Todo');
    cy.get('button[type="submit"]').click();
    cy.get('input[type="text"]').type('Third Todo');
    cy.get('button[type="submit"]').click();

    cy.get('ul li').should('have.length', 3);
  });

  it('should delete a todo from the list', () => {
    cy.get('input[type="text"]').type('Todo 1');
    cy.get('button[type="submit"]').click();
    cy.get('input[type="text"]').type('Todo 2');
    cy.get('button[type="submit"]').click();
    cy.get('input[type="text"]').type('Todo 3');
    cy.get('button[type="submit"]').click();

    cy.get('ul li').should('have.length', 3);

    cy.get('ul li')
        .last()
        .within(() => {
          cy.get('.delete-button').click();
        });

    cy.get('ul li').should('have.length', 2);
  });
})
