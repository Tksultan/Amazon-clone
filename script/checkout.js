import {cart, removefromCart, updatedeliveryOption} from "../data/cart.js";
import {products} from "../data/products.js";

import { formateCrurrency } from "./utils/money.js";

import {deliveryOption} from '../data/delivaryOptions.js'
 
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


function renderorderSummary(){
  let cartsummaryHTML = '';

  cart.forEach((cartitem)=>{

    const productId = cartitem.productId;

    let matchingProduct;

    products.forEach((product)=>{
      if (product.id === productId){
        matchingProduct = product;
      }
    });

    const deliveryOptionId = cartitem.deliveryOptionId;

    let deliveryOptions;

    deliveryOption.forEach((option)=>{
      if (option.id === deliveryOptionId){
        deliveryOptions = option;
      }
    });

    /*  using dayjs library for getting current date*/
    const today = dayjs();
    const deliveydate = today.add(
      deliveryOptions.deliveryDays, 'days'
    );
    const datestring = deliveydate.format('dddd, MMMM D');

    cartsummaryHTML +=`
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${datestring}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formateCrurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartitem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionHTML(matchingProduct,cartitem)} 
          </div>
        </div>
      </div>
    `
  });
  document.querySelector('.js-order-summary').innerHTML = cartsummaryHTML;

  document.querySelectorAll('.js-delete-link')
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId = link.dataset.productId;
      removefromCart(productId);
      
      const pdContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      pdContainer.remove();
      localStorage.setItem('cart', JSON.stringify(cart));
      showcartQuant()
    }
    )
  });
  showcartQuant();
  function showcartQuant(){
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector('.js-cart-itam-count-checkout')
      .innerHTML = `${cartQuantity} items`;
  }

  function deliveryOptionHTML(matchingProduct,cartitem){
    let Html= ''
    deliveryOption.forEach((delivaryOptions)=>{
      const today = dayjs();
      const deliveydate = today.add(
        delivaryOptions.deliveryDays, 'days'
      );
      const datestring = deliveydate.format('dddd, MMMM D');
      const priceString = delivaryOptions.priceCents === 0 ? 'Free' : `$${formateCrurrency(delivaryOptions.priceCents)}- `;
      const isChecked = delivaryOptions.id === cartitem.deliveryOptionId;
      Html += 
      `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${delivaryOptions.id}">
        <input type="radio"
          ${isChecked ? 'checked': ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${datestring}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>
      `
    });
    return Html;
  }

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      /*
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      */
      const {productId, deliveryOptionId} =element.dataset;
      localStorage.setItem('cart', JSON.stringify(cart));
      updatedeliveryOption(productId, deliveryOptionId);
      renderorderSummary();
    });
  });
}

renderorderSummary();