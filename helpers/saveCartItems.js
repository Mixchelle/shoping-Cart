const saveCartItems = (itemsave) => {
  localStorage.setItem('cartItems', JSON.stringify(itemsave));
  // seu código aqui
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
