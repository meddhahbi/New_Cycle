import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SideBar from '../Sidebar';
import Navbar from '../Navbar';
import Style from '../Pages/style/Posts.css'

function AllAssoPosts() {
  const [articles, setArticles] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      setIsDeleting(true);
      axios.delete(`http://localhost:3001/association/${id}`)
        .then(res => {
          setArticles(articles.filter(article => article._id !== id));
          setIsDeleting(false);
        })
        .catch(err => {
          console.log(err);
          setIsDeleting(false);
        });
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3001/association/articles')
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <SideBar />
      <section id='wej' class="blog-section section-b-space">
        <div class="container-fluid-lg">
          <table class="styled-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Quantity</th>
                <th>Resting Quantity</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article._id}>
                  <td>{article.title}</td>
                  <td>{article.description}</td>
                  <td>{article.createdAt}</td>
                  <td>{article.quantity}</td>
                  <td>{article.restingQuantity}</td>
                  <td><button class="btn btn-success"onClick={() => handleDelete(article._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AllAssoPosts;