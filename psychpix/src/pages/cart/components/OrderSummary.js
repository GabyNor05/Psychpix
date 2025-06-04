import React from "react";
import "../css/cart.css";

const OrderSummary = ({ total }) => (
  <div className = "orderSummary" >
    <h3>Order Summary</h3>
    <div style={{ margin: "18px 0", fontSize: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Subtotal:</span>
        <span>R {total}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <span>Shipping:</span>
        <span>R 0</span>
      </div>
      <hr style={{ margin: "18px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
        <span>Total:</span>
        <span>R {total}</span>
      </div>
    </div>
    <button className = "checkout-button" >
      Checkout
    </button>
  </div>
);

export default OrderSummary;