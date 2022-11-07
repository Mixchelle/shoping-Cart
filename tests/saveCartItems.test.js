const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Teste se saveCartItems é uma função;', () => {
    expect(typeof saveCartItems).toBe('function')
  });
  it('Teste se, ao executar savedCartItems, o método localStorage.setItem é chamado;', () => {
    saveCartItems();
    expect(localStorage.setItem).toBeCalled();
  });
  it('Teste se, ao executar savedCartItems, o método localStorage.setItem é chamado com o cartItems como parâmetro;', () => {
    saveCartItems();
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems');
  })
 
});
