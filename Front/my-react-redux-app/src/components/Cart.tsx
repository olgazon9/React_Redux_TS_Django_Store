import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, clearCart } from '../features/cart/cartSlice';
import { AppDispatch, RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(selectCart);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [errorMessage, setErrorMessage] = useState(''); // New state variable for error message

  const totalSum = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      if (!isAuthenticated || !accessToken) {
        console.log('User not authenticated. Redirect to login or handle accordingly.');
        return;
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/orders/',
        {
          total_amount: totalSum,
          order_details: items.map((item) => ({
            product_name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Clear the cart after successful checkout
      dispatch(clearCart());
      alert('Checkout successful!');
      navigate('/'); // Redirect to home or order history page
    } catch (error) {
      console.error('Checkout failed:', error); // Log the error

      // Handle the error as needed and update error message
      if (error instanceof AxiosError && error.response && error.response.status === 401) {
        console.log('Access token expired or invalid. Redirect to login or refresh token.');
        setErrorMessage('Access token expired or invalid. Please login or refresh token.');
      } else if (error instanceof AxiosError) {
        // Handle other Axios errors with specific messages
        setErrorMessage(`An error occurred during checkout: ${error.message}`);
      } else {
        // Handle general errors
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h3>Cart</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity} - ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p>Total: ${totalSum}</p>
      {errorMessage && <p className="error-message">{errorMessage}</p>} 
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
