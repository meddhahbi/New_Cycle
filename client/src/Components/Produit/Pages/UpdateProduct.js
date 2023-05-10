import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const UpdateProduct = () => {
  
    const { id } = useParams();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('description', description);
      if(images){
        formData.append('images', images);
      }
      // console.log(formData)
      axios.put(`http://localhost:3001/produit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        console.log(response.data);
        setName('');
        setPrice('');
        setCategory('');
        setDescription('');
        setImages(null);

        window.location.href = "AllProduit";
      
      }).catch(error => {
        console.log(error.response.data);
        
      });
    };



  
  return (
     <div> 
          
        <section>
    <div className="container">
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
          name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
          Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Enter content"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
          Category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            placeholder="Enter author name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
          Price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            placeholder="Enter author name"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="images" className="form-label">
            Photo
          </label>
          <input
            type="file"
            className="form-control"
            id="images"
            onChange={(e) => setImages(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-animation">
          Update product
        </button>
      </form>
    </div>
    </section>
    
    </div>
  );
};

export default UpdateProduct;

