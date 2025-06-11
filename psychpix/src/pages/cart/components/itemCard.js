import React from "react";
import { FiTrash2 } from "react-icons/fi";

const ItemCard = ({ item, onRemove }) => {
  // Calculate discounted price if discount exists
  const discountedPrice = item.discount
    ? item.price * (1 - item.discount / 100)
    : item.price;

  return (
    <div className="itemCard">
      <div style={{ fontWeight: 500 }}>{item.product}</div>
      <div>
        {item.discount ? (
          <>
            <span style={{ textDecoration: "line-through", color: "#888", marginRight: 8 }}>
              R {item.price}
            </span>
            <span>R {discountedPrice.toFixed(2)}</span>
          </>
        ) : (
          <>R {item.price}</>
        )}
      </div>
      <div>{item.quantity}</div>
      <div>R {(discountedPrice * item.quantity).toFixed(2)}</div>
      <div>
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
      <span
        className="admin-delete-text-btn"
        style={{ color: "#a83236", fontWeight: "bold", marginLeft: 10 }}
        onClick={() => onRemove(item._id)}
      >
        <FiTrash2 style={{ marginRight: 5, verticalAlign: "middle" }} />
        Remove
      </span>
    </div>
  );
};

export default ItemCard;