import React from "react";

const ItemCard = ({ item }) => (
  <div  className = "itemCard" >
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