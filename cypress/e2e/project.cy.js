const fetchMock = require('../mocks/fetch')
const products = require('../mocks/computerCategory')
const PROJECT_URL = './index.html'

const LOADING = '.loading';
const ITEM_SELECTOR = '.item';
const ADD_CART_BUTTON = '.item__add'
const CART_ITEMS = '.cart__items'
const EMPTY_CART_BUTTON = '.empty-cart'
const TOTAL_PRICE = '.total-price'

let results = products.results

const addToCart = (index) => {
  cy.get(ITEM_SELECTOR)
    .should('exist')
    .eq(index)
    .children(ADD_CART_BUTTON)
    .click();
}

const countCart = (amount) => {
  cy.get(CART_ITEMS)
    .children()
    .should('have.length', amount);
}

const checkPrice = (results, indexes) => {
  cy.wait(1000);
  let total = 0;
  indexes.forEach(index => total += results[index].price);
  cy.get(TOTAL_PRICE)
    .should('contain', total.toString());
}

describe('Shopping Cart Project', () => {
  beforeEach(() => {
    cy.visit(PROJECT_URL, {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });
    cy.clearLocalStorage();
  });

  describe('1 - Desenvolva testes para atingir 25% de cobertura total e 100% da função fetchProducts', () => {
    it('Verifica a cobertura de testes unitários', () => {
      cy.getCoverage().its('total.functions.pct').should('be.gte', 25.00);
      cy.getCoverage().its('fetchProducts.functions.pct').should('be.gte', 100.00);
      cy.getCoverage().its('fetchProducts.lines.pct').should('be.gte', 100.00);
    });
  });

  describe('2 - Crie uma listagem de produtos', () => {
    it('Listagem de produtos', () => {
      cy.get(ITEM_SELECTOR)
        .should('exist')
        .should('have.length', results.length);
    });
  });

  describe('3 - Desenvolva testes para atingir 50% de cobertura total e 100% da função fetchItem', () => {
    it('Verifica a cobertura de testes unitários', () => {
      cy.getCoverage().its('total.functions.pct').should('be.gte', 50.00);
      cy.getCoverage().its('fetchItem.functions.pct').should('be.gte', 100.00);
      cy.getCoverage().its('fetchItem.lines.pct').should('be.gte', 100.00);
    });
  });

  describe('4 - Adicione o produto ao carrinho de compras', () => {
    it('Adicione o produto ao carrinho de compras', () => {
      cy.wait(1000);
      addToCart(36);
      countCart(1);
      cy.get(CART_ITEMS)
        .children()
        .first()
        .should('have.text', `ID: ${results[36].id} | TITLE: ${results[36].title} | PRICE: $${results[36].price}`)
    });
  });

  describe('5 - Remova o item do carrinho de compras ao clicar nele', () => {
    it('Remova o item do carrinho de compras ao clicar nele', () => {
      addToCart(29);
      addToCart(31);
      addToCart(15);

      cy.get(CART_ITEMS)
        .children()
        .eq(1)
        .click()
      countCart(2);

      cy.get(CART_ITEMS)
        .children()
        .eq(1)
        .click()
      countCart(1);

      cy.get(CART_ITEMS)
        .children()
        .eq(0)
        .click()
      countCart(0);
    });
  });

  describe('6 - Desenvolva testes para atingir 75% de cobertura total e 100% da função saveCartItems', () => {
    it('Verifica a cobertura de testes unitários', () => {
      cy.getCoverage().its('total.functions.pct').should('be.gte', 75.00);
      cy.getCoverage().its('saveCartItems.functions.pct').should('be.gte', 100.00);
      cy.getCoverage().its('saveCartItems.lines.pct').should('be.gte', 100.00);
    });
  });

  describe('7 - Desenvolva testes para atingir 100% de cobertura total e 100% da função getSavedCartItems', () => {
    it('Verifica a cobertura de testes unitários', () => {
      cy.getCoverage().its('total.functions.pct').should('be.gte', 100.00);
      cy.getCoverage().its('getSavedCartItems.functions.pct').should('be.gte', 100.00);
      cy.getCoverage().its('getSavedCartItems.lines.pct').should('be.gte', 100.00);
    });
  });

  describe('8 - Carregue o carrinho de compras através do **LocalStorage** ao iniciar a página', () => {
    it('Carregue o carrinho de compras através do **LocalStorage** ao iniciar a página', () => {
      let first = 36;
      let last = 29;

      addToCart(first);
      cy.wait(1000);

      countCart(1);

      cy.get(CART_ITEMS)
        .children()
        .first()
        .should('have.text', `ID: ${results[first].id} | TITLE: ${results[first].title} | PRICE: $${results[first].price}`)
       
      addToCart(last);
      cy.wait(1000);

      cy.get(CART_ITEMS)
        .children()
        .last()
        .should('have.text', `ID: ${results[last].id} | TITLE: ${results[last].title} | PRICE: $${results[last].price}`)
  
      cy.reload({
        onBeforeLoad(win) {
          win.fetch = fetchMock;
        },
      });

      cy.get(CART_ITEMS)
        .children()
        .first()
        .should('have.text', `ID: ${results[first].id} | TITLE: ${results[first].title} | PRICE: $${results[first].price}`)

      cy.get(CART_ITEMS)
        .children()
        .last()
        .should('have.text', `ID: ${results[last].id} | TITLE: ${results[last].title} | PRICE: $${results[last].price}`)
    });

    it('Deverá ser possível remover items do carrinho ao clicar sobre eles mesmo após recarregar a página', () => {
      addToCart(29);
      addToCart(31);
      addToCart(15);

      cy.reload({
        onBeforeLoad(win) {
          win.fetch = fetchMock;
        },
      });

      cy.get(CART_ITEMS)
        .children()
        .eq(1)
        .click()
      countCart(2);

      cy.get(CART_ITEMS)
        .children()
        .eq(1)
        .click()
      countCart(1);

      cy.get(CART_ITEMS)
        .children()
        .eq(0)
        .click()
      countCart(0);
    })
  });

  describe('9 - Calcule o valor total dos itens do carrinho de compras de forma assíncrona', () => {
    it('Calcule o valor total dos itens do carrinho de compras de forma assíncrona', () => {
      addToCart(5);
      checkPrice(results, [5]);
      addToCart(42);
      checkPrice(results, [5, 42]);
      addToCart(36);
      checkPrice(results, [5, 42, 36]);
      addToCart(15);
      checkPrice(results, [5, 42, 36, 15]);
      cy.get(CART_ITEMS)
        .children()
        .eq(1)
        .click()
      checkPrice(results, [5, 36, 15]);
    });
  });

  describe('10 - Implemente a lógica no botão Esvaziar Carrinho para limpar o carrinho de compras', () => {
    it('Botão para limpar carrinho de compras', () => {
      addToCart(3);
      addToCart(0);
      addToCart(1);
      countCart(3);
      cy.get(EMPTY_CART_BUTTON)
        .click()
      countCart(0);
    });
  });

  describe('11 - Adicione um texto de `carregando` durante uma requisição à API', () => {
    it('Adicionar um texto de "carregando" durante uma requisição à API', () => {
      cy.visit(PROJECT_URL, {
        onBeforeLoad(win) {
          win.fetch = (url) => (new Promise(async (resolve) => {
            const fetchResult = await fetchMock(url);
            setTimeout(() => {
              resolve(fetchResult);
            }, 1000);
          }));
        },
      });
      cy.get(LOADING)
        .should('exist')
        .wait(3000)
        .should('not.exist');
    });
  });
});
