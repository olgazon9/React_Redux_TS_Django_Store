import { CartItem, JwtToken } from './cartSlice';
import { jwtDecode as jwt_decode } from 'jwt-decode'; 


const BASE_URL = 'http://127.0.0.1:8000';

export const placeOrder = async (authToken: string, cartItems: CartItem[], totalSum: number): Promise<void> => {
  if (!authToken) {
    throw new Error('No auth token provided.');
  }

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

  const response = await fetch(`${BASE_URL}/orders/`, {
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
};
