const fetchItem = async (id) => 
fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json())
    .catch(() => new Error('You must provide an url'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
