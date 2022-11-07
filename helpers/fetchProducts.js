const fetchProducts = async (QUERY) => 
fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`)
    .then((response) => response.json())
    .catch(() => new Error('You must provide an url'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
