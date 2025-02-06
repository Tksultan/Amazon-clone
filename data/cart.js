export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) 

  if (!cart){
    cart = [];
  }
}



export function savetostorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addtocart(productId) {

  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const quantity = Number(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity, 
      deliveryOptionId: '1'
    });
  }
  savetostorage();
}

export function removefromCart(productId){
  const newcart = [];

  cart.forEach((cartItem)=>{
    if (cartItem.productId !== productId){
      newcart.push(cartItem);
    }
  });

  cart = newcart;
  savetostorage();
}

export function updatedeliveryOption(productId, deliveryOptionId){

  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  savetostorage();
}
