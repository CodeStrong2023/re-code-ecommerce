import { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { useUser } from './UserContext';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

import './CartView.css';

const CartView = () => {
  const { cartItems, removeFromCart, addToCart, decreaseQuantity } = useCart();
  const { user, token } = useUser();
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    initMercadoPago('TEST-66ca14b3-4f75-4369-801a-e96c54b1f2d7', { locale: 'es-AR' });
  }, []);

  const handlePurchase = async () => {
    if (!user) {
      alert("You must be logged in to make a purchase.");
      return;
    }

    const productData = cartItems.map(item => ({
      id: item.id,
      quantity: item.quantity
    }));

    const purchaseData = {
      email: user.email,
      products: productData,
    };
    try {
      const response = await fetch('http://localhost:8080/api/auth/user/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(purchaseData),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        alert(errorMessage);
        throw new Error(errorMessage);
      }

      const preferenceId = await response.text();
      console.log(preferenceId)
      setPreferenceId(preferenceId);
      

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-view">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id} className="cart-item">
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addToCart(item)}>+</button>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="purchase-section">
            <button onClick={handlePurchase} className="purchase-button">Buy Now</button>
          </div>
          {preferenceId && (
            <div className="wallet-container">
              <Wallet initialization={{ preferenceId }} /> 
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartView;
