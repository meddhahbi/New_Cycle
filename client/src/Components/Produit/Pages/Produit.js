import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url='http://localhost:3001/produit';
    axios.post(url, product)
      .then(res => {
        console.log(res.data);
        // Rediriger vers la page AllProducts
        window.location.href = '/AllProduit';
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
        <label htmlFor="price">Name:</label>
        <input type="text" id="price" name="price" onChange={handleChange} />
      </div>
        <label htmlFor="name">Price:</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" name="category" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" onChange={handleChange}></textarea>
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="text" id="image" name="image" onChange={handleChange} />
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProduct;
