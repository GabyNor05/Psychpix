import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ItemCard from "./components/itemCard";
import OrderSummary from "./components/OrderSummary";
import lineSquare from './assets/lilsquare.png';
import "./css/cart.css";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  }
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    console.log("Checkout clicked");
    try {
      const response = await fetch("http://localhost:5000/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({ items: cartItems }),
      });
      if (response.ok) {
        alert("Checkout successful! Stock updated.");
        setCartItems([]);
        localStorage.removeItem("cart");
        // Optionally navigate to a success page
      } else {
        const data = await response.json();
        alert("Checkout failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      alert("Checkout error: " + err.message);
    }
  };

  return (
    <div className = "cart-container" >
      <div style={{ flex: 2 }}>
        <div className="SectionLabels" style={{ paddingRight: '32px'}}>
          <h2 className="domine-Label" style={{ width: 'fit-content'}}>Your Cart</h2>
          <img className='lineSquareBR' src={lineSquare} alt='lilSquare' style={{ bottom: '-12px'}}/>
        </div>
        
        <div className = "heading-row" >
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
          <div></div>
        </div>
        {cartItems.map(item => (
          <ItemCard key={item._id} item={item} onRemove={handleRemove} />
        ))}
        <button className="continue-shopping-button" type="button" onClick={() => navigate('/discover')}>
          Continue Shopping
        </button>
      </div>
      {/* Order Summary (Right) */}
      <OrderSummary total={total} onCheckout={handleCheckout}/>
    </div>
  );
}

export default Cart;