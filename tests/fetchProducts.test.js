require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Teste se fetchProducts é uma função;', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  it('testa se ao chamar fetchProducts com o argumento computador, testa se a mesma foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('testa se ao chamar fetchProducts com o argumento computador, testa se a mesma foi chamada com o endpoint coreto', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('testa se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });
  it("Testa se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: 'You must provide an url'.", async () => {
    const expectedError = new Error('You must provide an url')
    const result = await fetchProducts();
    expect(result).toEqual(expectedError);
  });
});

