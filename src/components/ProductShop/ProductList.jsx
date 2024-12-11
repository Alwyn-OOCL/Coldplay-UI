import React from 'react';
import ProductItem from './ProductItem';
import './ProductList.css';

export default function ProductList({ products }) {
  return (
      <div className="product-list">
        {products.map(product => (
            <ProductItem key={product.productId} product={product} />
        ))}
      </div>
  );
}