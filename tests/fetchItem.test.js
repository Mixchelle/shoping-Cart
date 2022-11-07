require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Teste se fetchItem é uma função;', () => {
    expect(typeof fetchItem).toBe('function')
  });
  it('testa se a funcao fechItem com o argumento MLB1615760527 foi chamada corretamente', () => {
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527";', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquiv', async () => {
    const resultado = await fetchItem('MLB1615760527');
    expect(resultado).toEqual(item);
  });
  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url".', async () => {
    const expectedError = new Error('You must provide an url');
    const resultado = await fetchItem();
    expect(resultado).toEqual(expectedError);
  });
});
