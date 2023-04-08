import React, { useState } from 'react';
import axios from 'axios';

 function AddBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [photo, setPhoto] = useState("");
 
  
    const handleSubmit = (event) => {
      event.preventDefault();
    
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('author', author);
      formData.append('photo', photo);
    
      axios.post('http://localhost:3001/article', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        console.log(response.data);
        setTitle('');
        setContent('');
        setAuthor('');
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
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
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

export default AddBlog;