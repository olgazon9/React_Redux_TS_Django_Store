// src/components/Cart.tsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { removeFromCart } from '../features/cart/cartSlice';

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const authToken = useSelector((state: RootState) => state.auth.authToken); // Corrected property name
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const totalSum = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    console.log('isAuthenticated:', isAuthenticated);
    console.log('authToken:', authToken);

    if (!isAuthenticated) {
      console.log('Authentication failed. Please login to proceed with the checkout.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity })),
        }),
      });

      console.log('Response:', response);

      if (response.ok) {
        console.log('Order placed successfully!');
        // You may want to dispatch an action to clear the cart or navigate to a confirmation page
        // dispatch(clearCart());
      } else {
        console.error('Failed to place the order. Please try again.');
      }
    } catch (error) {
      console.error('Error while placing the order:', error);
      console.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Shopping Cart</h5>
        <ul className="list-group">
          {cartItems.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              {item.name} x {item.quantity} - ${item.price * item.quantity}
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-3">
          <strong>Total: ${totalSum}</strong>
        </div>
        <button type="button" className="btn btn-outline-success" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
