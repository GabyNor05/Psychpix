import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ItemCard from "./components/itemCard";
import OrderSummary from "./components/OrderSummary";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ display: "flex", gap: 40, maxWidth: 1200, margin: "40px auto" }}>
      <div style={{ flex: 2 }}>
        <h2>Your Cart</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr 120px",
          fontWeight: "bold",
          borderBottom: "2px solid #eee",
          padding: "16px",
          marginBottom: 12
        }}>
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
          <div></div>
        </div>
        {cartItems.map(item => (
          <ItemCard key={item._id} item={item} />
        ))}
        <button
          type="button"
          style={{ marginTop: '20px' }}
          onClick={() => navigate('/adminForm')}
        >
          Go to Stocklist
        </button>
      </div>
      {/* Order Summary (Right) */}
      <OrderSummary total={total} />
    </div>
  );
}

export default Cart;