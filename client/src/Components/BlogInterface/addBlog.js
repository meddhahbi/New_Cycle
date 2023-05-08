import React, { useState } from 'react';
import axios from 'axios';

 function AddBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    const [photo, setPhoto] = useState("");
   
 
  
    const handleSubmit = (event) => {
      event.preventDefault();
    
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('photo', photo);
    
      axios.post('http://localhost:3001/article', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(response => {
        console.log(response.data);
        setTitle('');
        setContent('');
        setPhoto(null);

        window.location = "/blog"
      
      }).catch(error => {
        console.log(error.response.data);
        
      });
    };
    
    return (
    <div className="container">
      <h1>Add Article</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            rows="3"
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            Photo
          </label>
          <input
            type="file"
            className="form-control"
            id="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-animation">
          Add Article
        </button>
      </form>
    </div>
  );
};

//     const [image, setImage] = useState("");
//     const [author, setAuthor] = useState("");
//     const [photo, setPhoto] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const url = `http://localhost:3001/article`;
//         const { data } = await axios.post(url, { title, content,image,author,photo});
//       } catch (error) {
//         console.log(error);
     
        
//       }
//     };

//     return <section className="log-in-section section-b-space forgot-section">
//     <div className="container-fluid-lg w-100">
//         <div className="row">
//             <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
//                 <div className="image-contain">
//                     <img src="../../../../assets/User/images/inner-page/forgot.png" className="img-fluid" alt="" />
//                 </div>
//             </div>

//             <div className="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
//                 <div className="d-flex align-items-center justify-content-center h-100">
//                     <div className="log-in-box">
//                         <div className="log-in-title">
//                             <h3>Welcome To NewCycle</h3>
//                             <h4>Add Blog</h4>
//                         </div>

//                         <div className="input-box">
//                             <form className="row g-4" onSubmit={handleSubmit}>
//                                 <div className="col-12">
//                                     <div className="form-floating theme-form-floating log-in-form">
//                                         <input type="text" className="form-control" id="title"
//                                             placeholder="title" onChange={(e) => setTitle(e.target.value)} value={title}/>
                        
//                                         <label htmlFor="title" >Title</label>
//                                     </div>
//                                 </div>
//                                 <div className="col-12">
//                                     <div className="form-floating theme-form-floating log-in-form">
//                                         <input type="text" className="form-control" id="content"
//                                             placeholder="content" onChange={(e) => setContent(e.target.value)} value={content}/>
                        
//                                         <label htmlFor="content" >Content</label>
//                                     </div>
//                                 </div>
//                                 <div className="col-12">
//                                     <div className="form-floating theme-form-floating log-in-form">
//                                         <input type="file" className="form-control" id="photo" accept="image/*"
//                                         onChange={(e) => setPhoto(e.target.value)} value={photo} />
//                                         <label htmlFor="image">Image</label>
//                                     </div>
//                                     </div>
                                   
//                                 <div className="col-12">
//                                     <div className="form-floating theme-form-floating log-in-form">
//                                         <input type="text" className="form-control" id="author"
//                                             placeholder="Author" onChange={(e) => setAuthor(e.target.value)} value={author}/>
                        
//                                         <label htmlFor="author" >Author</label>
//                                     </div>
//                                 </div>

//                                 <div className="col-12">
//                                     <button className="btn btn-animation w-100" type="submit">Add </button>
//                                 </div>
//                             </form>
                           
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </section>



export default AddBlog;