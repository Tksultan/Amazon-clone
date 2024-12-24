import {cart, addtocart, loadFromStorage} from '../data/cart.js'

describe('Test suait: addtocart', ()=>{

  it('adds an exsisting product to the cart', ()=>{
    
  });

  it('add a new product to the cart',()=>{
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    loadFromStorage();
    addtocart('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');

    expect(cart.lenghth).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});