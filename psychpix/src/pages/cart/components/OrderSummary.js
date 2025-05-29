import React from "react";

const OrderSummary = ({ total }) => (
  <div style={{
    flex: 1,
    background: "#fafafa",
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    padding: "32px 24px",
    height: "fit-content"
  }}>
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
    <button style={{
      width: "100%",
      padding: "12px",
      background: "#56adc7",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      fontSize: 18,
      fontWeight: 600,
      cursor: "pointer"
    }}>
      Checkout
    </button>
  </div>
);

export default OrderSummary;