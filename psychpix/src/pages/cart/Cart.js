import React from "react";
import { useNavigate } from 'react-router-dom';
import placeholder from "../placeholder.png";
import ItemCard from "./components/itemCard";
import OrderSummary from "./components/OrderSummary";
import CartModal from "./components/CartModal"; // If you want to use it

const cartItems = [
  { id: 1, product: "Sample Product 1", price: 120, quantity: 2, image: placeholder },
  { id: 2, product: "Sample Product 2", price: 80, quantity: 1, image: placeholder },
];

function Cart() {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ display: "flex", gap: 40, maxWidth: 1200, margin: "40px auto" }}>
      {/* Cart Items (Left) */}
      <div style={{ flex: 2 }}>
        <h2>Your Cart</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr 120px",
          fontWeight: "bold",
          borderBottom: "2px solid #eee",
          padding: "12px 0",
          marginBottom: 12
        }}>
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
          <div></div>
        </div>
        {cartItems.map(item => (
          <ItemCard key={item.id} item={item} />
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

      {/* Optionally render <CartModal /> here if needed */}
    </div>
  );
}

export default Cart;