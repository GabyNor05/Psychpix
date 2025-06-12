import React from "react";
import "../css/cart.css";

function FormatPrice(price){
        let result = '';
        let stringPrice = String(Math.floor(price));
        for (let index = stringPrice.length - 1; index >= 0; index--) {
            result += stringPrice[stringPrice.length - index - 1];
            if(index % 3 == 0 && index != 0){
                result += ',';
            }
        }
        return result;
    }

const OrderSummary = ({ total, onCheckout }) => (
  <div className = "orderSummary" >
    <h3>Order Summary</h3>
    <div style={{ margin: "18px 0", fontSize: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Subtotal:</span>
        <span>R {FormatPrice(total)}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <span>Shipping:</span>
        <span>R 0</span>
      </div>
      <hr style={{ margin: "18px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
        <span>Total:</span>
        <span>R {FormatPrice(total)}</span>
      </div>
    </div>
    <button className = "checkout-button" onClick={onCheckout}>
      Checkout
    </button>
  </div>
);

export default OrderSummary;