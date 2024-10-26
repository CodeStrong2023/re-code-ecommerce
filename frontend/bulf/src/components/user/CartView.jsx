import { useCart } from './CartContext';
import './CartView.css';

const CartView = () => {
  const { cartItems, removeFromCart, addToCart, decreaseQuantity } = useCart();

  const handlePurchase = () => {
    alert("Thank you for your purchase!");
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
        </>
      )}
    </div>
  );
};

export default CartView;
