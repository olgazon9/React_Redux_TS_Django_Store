import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { removeFromCart } from '../features/cart/cartSlice';
import { jwtDecode as jwt_decode } from 'jwt-decode'; 

interface JwtToken {
  user_id: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const authToken = useSelector((state: RootState) => state.auth.authToken);
  const cartItems = useSelector((state: RootState) => state.cart.items) as CartItem[];

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const totalSum = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!authToken) {
      console.error('Authentication token not found.');
      return;
    }

    try {
      const decodedToken = jwt_decode<JwtToken>(authToken);
      const userId = decodedToken.user_id;

      const orderPayload = {
        total_amount: totalSum,
        user: userId,
        order_details: cartItems.map(item => ({
          product_name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      const response = await fetch('http://127.0.0.1:8000/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(orderPayload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Order placed successfully');
      // Handle successful order placement here
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  useEffect(() => {
    // Other useEffect logic if needed
  }, []);

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
