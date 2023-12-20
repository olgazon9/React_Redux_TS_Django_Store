// src/components/Products.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import JS (optional)
import { Product } from '../features/products/productsSlice';
import Cart from './Cart';

const Products: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, status, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleBuyClick = (product: Product) => {
    // Assume the quantity is 1 for simplicity, modify as needed
    dispatch(addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 }));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Products</h2>
      <div className="row justify-content-center">
        {data.map((product) => (
          <div key={product.id} className="col-md-4 mb-3">
            <div className="card border-secondary">
              <img src={product.image} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                <button
                  type="button"
                  className ="btn btn-outline-success"
                  onClick={() => handleBuyClick(product)}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Cart /> {/* Include the Cart component */}
      </div>
    </div>
  );
};

export default Products;
