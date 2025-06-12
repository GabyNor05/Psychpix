import React from "react";
import { FiTrash2 } from "react-icons/fi";

const ItemCard = ({ item, onRemove }) => {
  // Calculate discounted price if discount exists
  const discountedPrice = item.discount
    ? item.price * (1 - item.discount / 100)
    : item.price;

    console.log(item);

  return (
    <div className="itemCard">
      <h4 style={{ fontWeight: 500 }}>{item.product}</h4>
      <div>
        {item.discount ? (
          <div style={{ display: 'grid'}}>
            <span style={{ textDecoration: "line-through", color: "#888", marginRight: 8 }}>
              R {item.price}
            </span>
            <span><h4 style={{ fontSize: '18px'}}>R {discountedPrice.toFixed(2)}</h4></span>
          </div>
        ) : (
          <>R {item.price}</>
        )}
      </div>
      <div><h4>{item.quantity}</h4></div>
      <div><h4 style={{ fontSize: '18px'}}>R {(discountedPrice * item.quantity).toFixed(2)}</h4></div>
      <div style={{ display: 'grid', justifyItems: 'center', gap: '8px'}}>
        <img
          src={item.image}
          alt={item.product}
          style={{
            width: 90,
            height: 90,
            objectFit: "cover",
            borderRadius: 8,
            background: "#eee",
          }}
        />
        <div style={{ display: 'flex', gap: '16px'}}>
          <img src={item.woodframe.image} style={{ height: '32px', width: '32px', objectFit: 'cover', borderRadius: '50%',}} />
          <h6 style={{ alignSelf: 'center'}}>{item.woodframe.name}</h6>
        </div>
        <span style={{ display: 'flex', alignItems: 'end', gap: '12px'}}><h1 style={{ fontSize: '20px'}}>{item.framesymbol}</h1><h5>{item.framesize}</h5></span>
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