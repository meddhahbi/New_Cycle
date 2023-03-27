import React, { useState } from 'react';
import axios from 'axios';

const UpdateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });
  const [id, setId] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'id') {
      setId(e.target.value);
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/produit/${id}`, product)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={product.name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="text" id="price" name="price" value={product.price} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" name="category" value={product.category} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={product.description} onChange={handleChange}></textarea>
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="text" id="image" name="image" value={product.image} onChange={handleChange} />
      </div>
      <button type="submit">Update Product</button>
    </form>
  );
};

export default UpdateProduct;
