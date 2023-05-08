import React, { useState } from 'react';
import axios from 'axios';


 function  AddCategory()  {

    const [name, setName] = useState();
    const [description, setDescription] = useState();

   
 
  
    const addCateg = async(e) => {
      e.preventDefault();
      console.log("form submitted")
     console.log("form data", name,description)
    
    //   const formData = new FormData();
    //   formData.append('name', name);
    //   formData.append('description', description);
    const data = {
        name:name,
        description:description
    }
      
    const url = 'http://localhost:3001/category' 
    await axios.post(url,data)
    .then(response=>{
        console.log(response.data);
        window.location = "/categorie"
    }).catch(error=>{
        
        console.error(error)

    })
 
    };
    
    return (
    <div className="container">
      <h1>Add Categorie</h1>
      <form onSubmit={addCateg} >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Categorie's Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Entre categorie description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
     
        <button type="submit" className="btn btn-animation">
          Add 
        </button>
      </form>
    </div>
  );
};





export default AddCategory;