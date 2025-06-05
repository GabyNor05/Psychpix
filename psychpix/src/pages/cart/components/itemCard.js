import React from "react";
import { FiTrash2 } from "react-icons/fi";

  
const ItemCard = ({ item, onRemove }) => (
  <div className="itemCard">
    <div style={{ fontWeight: 500 }}>{item.product}</div>
    <div>R {item.price}</div>
    <div>{item.quantity}</div>
    <div>R {item.price * item.quantity}</div>
    <div >
      <img
        src={item.image}
        alt={item.product}
        style={{
          width: 90,
          height: 90,
          objectFit: "cover",
          borderRadius: 8,
          background: "#eee",
          marginRight: 10
        }}
      />
    </div>
    <span className ="admin-delete-text-btn" style={{color:'#a83236', fontWeight: 'bold', marginLeft: 10}}
        onClick={() => onRemove(item._id)}>
        <FiTrash2 style={{ marginRight: 5, verticalAlign: 'middle' }} />
        Remove
    </span>
  </div>
);

export default ItemCard;