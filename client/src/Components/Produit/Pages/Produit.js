import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState("");
  const [manualPrice, setManualPrice] = useState(null);
  const [stock, setStock] = useState("");
  const [categories, setCategories] = useState([]);
  const [created, setCreated] = useState(false);
  const [city, setCity] = useState("");
  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");
    console.log(location.data)
    if(location.data){

      setCity(location.data.city) ;
    }
    else{
      setCity("tunis") ;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // setTimeout(async ()=>{

    const location = await axios.get("https://ipapi.co/json").then(loc=>{
      console.log(loc)
    });
    console.log(location)
    let city = location ? location.data.city : "tunis"
    let country = location ? location.data.country_name : "tunisia"
    let region = location ? location.data.region : "el ghazala"
    let latitude = location ? location.data.latitude : 36.8232
    let longitude = location ? location.data.longitude : 10.1701

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", manualPrice !== null ? manualPrice : price || 0); // add a default value of 0 for price
      formData.append("category", category);
      formData.append("country", country);
      formData.append("city", city);
      formData.append("region", region);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("stock", stock);

      formData.append("images", images);
    // }, 2000)

    try {

        const res = await axios.post("http://localhost:3001/produit", formData, config);
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
    // if (manualPrice !== null) {
    //   setManualPrice(null);
    // }
  };


  const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
};
  const getCats=()=> {
    fetch(`http://localhost:3001/category/`)
        .then(res => res.json())
        .then(data => {
          setCategories(data)
          // console.log(data);
        })
  }

  useEffect(() => {
    getCats()
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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <form onSubmit={handleSubmit}>

    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input
        type="text"
        className="form-control"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  
    <div className="mb-3">
      <label htmlFor="description" className="form-label">Description</label>
      <textarea
        className="form-control"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {!manualPrice && (
        <p className="mt-2">
          Estimated price: <strong>{price !== null ? price.toFixed(2) : "N/A"}</strong>
        </p>
      )}
      {manualPrice && (
        <p className="mt-2">
          Manual price: <strong>{manualPrice.toFixed(2)}</strong>
        </p>
      )}
    </div>
  
    {/*<div className="mb-3">*/}
    {/*  <label htmlFor="category" className="form-label">Category</label>*/}
    {/*  <select*/}
    {/*    className="form-select"*/}
    {/*    id="category"*/}
    {/*    value={category}*/}
    {/*    onChange={handleCategoryChange}*/}
    {/*  >*/}
    {/*    <option value="">Select a category</option>*/}
    {/*    <option value="electronics">Electronics</option>*/}
    {/*    <option value="clothing">Clothing</option>*/}
    {/*    <option value="books">Books</option>*/}
    {/*  </select>*/}
    {/*</div>*/}
      <select name="" id="" className="form-control" value={category} onChange={handleCategoryChange}>
        <option value="" disabled>select a category</option>
        {categories.map(
            (c) => (
                <option value={c._id}
                        className="dropdown-item">{c.name}</option>
            )
        )}
      </select>
  
    {manualPrice && (
      <div className="mb-3">
        <p className="text-danger">
          You entered a manual price, so the category is not taken into account for the price estimation.
        </p>
      </div>
    )}
  
    {!manualPrice && (
      <div className="mb-3">
        <p className="mb-2">
          If you have a specific price in mind, you can enter it manually below:
        </p>
        <div className="input-group">
          <span className="input-group-text">DT</span>
          <input
            type="number"
            className="form-control"
            min="0"
            step="0.01"
            value={manualPrice || ""}
            onChange={handleManualPriceChange}
          />
        </div>
      </div>
    )}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Stock</label>
        <input
            type="number"
            className="form-control"
            id="name"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
        />
      </div>
  
    <div className="mb-3">
      <label htmlFor="images" className="form-label">Photo</label>
      <input
        type="file"
        className="form-control"
        id="images"
        onChange={(e) => setImages(e.target.files[0])}
      />
    </div>
  
    <button type="submit" className="btn btn-success">Create Product</button>
  
  </form>
  </div>
  );
};
export default CreateProduct;
