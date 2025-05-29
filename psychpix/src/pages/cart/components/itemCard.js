import React from "react";

const ItemCard = ({ item }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 120px",
    alignItems: "center",
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    marginBottom: 18,
    padding: "16px 0"
  }}>
    <div style={{ fontWeight: 500 }}>{item.product}</div>
    <div>R {item.price}</div>
    <div>{item.quantity}</div>
    <div>R {item.price * item.quantity}</div>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <img
        src={item.image}
        alt={item.product}
        style={{
          width: 90,
          height: 90,
          objectFit: "cover",
          borderRadius: 8,
          background: "#eee"
        }}
      />
    </div>
  </div>
);

export default ItemCard;