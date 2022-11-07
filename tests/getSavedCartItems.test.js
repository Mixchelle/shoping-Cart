const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Teste se getSavedCartItems é uma função;', () => {
    expect(typeof getSavedCartItems).toBe('function')
  });
  it('Testa se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado;', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toBeCalled();
  });
  it('Testa se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro a chave cartItems e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});

