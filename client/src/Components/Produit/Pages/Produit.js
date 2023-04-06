import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [manualPrice, setManualPrice] = useState(null);
  const [created, setCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", manualPrice !== null ? manualPrice : price || 0); // add a default value of 0 for price
    formData.append("category", category);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    try {
      const res = await axios.post("http://localhost:3001/produit", formData);
      console.log(res.data);
      setCreated(true);
      window.location.href = "AllProduit";
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleManualPriceChange = (e) => {
    setManualPrice(parseFloat(e.target.value));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (manualPrice !== null) {
      setManualPrice(null);
    }
  };

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await axios.get("http://localhost:3001/produit/estimate", {
          params: {
            description: description,
            category: category,
          },
        });
        if (res.data.estimatedPrice !== undefined) {
          setPrice(res.data.estimatedPrice);
        } else {
          setPrice(null);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (description && category && !manualPrice) {
      fetchPrice();
    } else {
      setPrice(null);
    }
  }, [description, category, manualPrice]);

  if (created) {
    return <div>Product created successfully!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {!manualPrice && (
          <p>
            Estimated price: <strong>{price !== null ? price.toFixed(2) : "N/A"}</strong>
          </p>
        )}
        {manualPrice && (
          <p>
            Manual price: <strong>{manualPrice.toFixed(2)}</strong>
          </p>
        )}
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
         

          <option value="books">Books</option>
        </select>
      </div>
      {manualPrice && (
        <div>

          <p>
            You entered a manual price, so the category is not taken into account
            for the price estimation
            </p>
            </div>
      )}
      {!manualPrice && (
        <div>
          <p>
            If you have a specific price in mind, you can enter it manually
            below:
          </p>
          <input
            type="number"
            min="0"
            step="0.01"
            value={manualPrice || ""}
            onChange={handleManualPriceChange}
          />
        </div>
      )}
      <div>
        <label htmlFor="images">Images</label>
        <input type="file" id="images" multiple onChange={handleImageChange} />
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
};
export default CreateProduct;
