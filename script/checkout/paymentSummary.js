import {cart} from '../../data/cart.js';
import { getdelivaryOptions } from '../../data/delivaryOptions.js';
import { getProducts } from '../../data/products.js';
import { formateCrurrency } from '../utils/money.js';

export function renderpaymentSummary(){
  let productpriceCents = 0;
  let shippingPrice = 0;
  let cartquantity = 0;
  cart.forEach((cartitems)=>{
    const product = getProducts(cartitems.productId);
    cartquantity += Number(cartitems.quantity)
    productpriceCents += product.priceCents * cartitems.quantity;

    const delivaryoption = getdelivaryOptions(cartitems.deliveryOptionId);

    shippingPrice = delivaryoption.priceCents;
  });
    const totalbeforeTax = (shippingPrice + productpriceCents);
    const taxCents = totalbeforeTax * 0.1;
    const totalCents = totalbeforeTax + taxCents;

  const paymentsummaryHTML=`
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartquantity}):</div>
      <div class="payment-summary-money">$${formateCrurrency(productpriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formateCrurrency(shippingPrice)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formateCrurrency(totalbeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formateCrurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formateCrurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  </div>
`;
document.querySelector('.js-payment-summary').innerHTML = paymentsummaryHTML;
}