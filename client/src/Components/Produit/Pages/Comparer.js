import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetComparison = ({ id }) => { // add id as a prop
  const [comparison, setComparison] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchComparison = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/comparison/${id}`);
        setComparison(response.data);
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComparison();
  }, [id]); // add id to the dependency array

  const renderProductComparison = () => {
    if (products.length < 2) {
      return <p>Please select at least two products to compare</p>;
    }
    return (
      <div className="product-comparison">
        <div className="product">
          <h3>{products[0].name}</h3>
          <img src={products[0].image} alt={products[0].name} />
          <p>{products[0].description}</p>
        </div>
        <div className="product">
          <h3>{products[1].name}</h3>
          <img src={products[1].image} alt={products[1].name} />
          <p>{products[1].description}</p>
        </div>
      </div>
    );
  };


  if (!comparison) {
    return <p>Loading comparison...</p>;
  }

  return (
    <div className="comparison">
      <h2>Comparison {comparison._id}</h2>
      <p>Created by {comparison.user.name}</p>
      <h3>Products</h3>
      <ul>
        {comparison.products.map((product) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
      {renderProductComparison()}
    </div>
  );
};

export default GetComparison;
