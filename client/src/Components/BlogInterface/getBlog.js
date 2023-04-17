import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../UserInterface/Navbar';
import Footer from '../UserInterface/Footer';
import axios from 'axios';



function GetBlog() {
    const { id } = useParams();
    const [article, setArticle] =  useState({});
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    // useEffect(() => {
    //     fetch(`http://localhost:3001/comment`) 
    //       .then((response) => {
    //         if (!response.ok) {
    //           throw new Error("Failed to retrieve comments from server");
    //         }
    //         return response.json();
    //       })
    //       .then((data) => {
    //         setComments(data.cmt);
    //       })
          
    //   }, [comments]);

   

    useEffect(() => {
      fetch(`http://localhost:3001/article/${id}`)
        .then(res => res.json())
        .then(data => {setArticle(data.article)    
        setComments(data.article.commentList)
        })
        .catch(error => console.log(error));
    }, [id,comments]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
    

        try {
            const { data } = await axios.post(`http://localhost:3001/comment`, {
              comment,
              articleId: id 
            }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` 
              }
            });
            setComment('');
          } catch (error) {
          }
      };

  return (
    <div>
        <div><Navbar /></div>
        <section class="breadscrumb-section pt-0">
            <div class="container-fluid-lg">
                <div class="row">
                    <div class="col-12">
                        <div class="breadscrumb-contain">
                            <h2>Blog List</h2>
                            <nav>
                                <ol class="breadcrumb mb-0">
                                    <li class="breadcrumb-item">
                                        <a href="index.html">
                                            <i class="fa-solid fa-house"></i>
                                        </a>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">Blog List</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="blog-section section-b-space">
            
            <div class="container-fluid-lg">
                
            
                <div class="row g-4">
                    <div class="col-xxl-9 col-xl-8 col-lg-7 order-lg-2">
                        <div class="row g-4">  
                                                                                
                            <div class="col-12">
                                <div class="blog-box blog-list wow fadeInUp" data-wow-delay="0.2s">
                                    <a href="blog-detail.html" class="blog-image">
                                        
                                    {article.photo && <img  width="400" height="200" src={`http://localhost:3001/${(article.photo)}`}  />}
                                    </a>

                                    <div class="blog-contain blog-contain-2">
                                        <div class="blog-label">
                                            <span class="time"><i data-feather="clock"></i> <span>{article.createdAt}</span></span>

                                        </div>
                                        <a href="blog-detail.html">
                                            <h3>{article.title}</h3>
                                            
                                        </a>
                                        <p>{article.content}</p>
                                        
                                    </div>
                                </div>
                            </div>    
                            <Link to={{ pathname: `/blog` }} className="blog-button">
                            go to list article <i className="fa-solid fa-right-long"></i>
                        </Link>                        
                </div>
    </div>
    </div>  
        
            </div>
           
            <div class="comment-box overflow-hidden">
                        <div class="leave-title">
                            <h3>Comments</h3>
                        </div>
                         {comments.map((comment) => (
                        <div class="user-comment-box">
                            <ul>
                                <li>
                                    <div class="user-box border-color">
                                      
                                        <div class="user-iamge">
                                            <img src="./profile.jpg"
                                                class="img-fluid blur-up lazyload" alt=""/>
                                            <div class="user-name">
                                                <h6>{comment.createdAt}</h6>
                                                <h5 class="text-content">Glenn Greer</h5>
                                            </div>
                                        </div>

                                        <div class="user-contain">
                                            
                                            <p>{comment.comment}</p>
                                        </div>
                                    </div>
                                </li>

                            
                            </ul>
                        </div>
                         ))} 
             </div>
               
             
             
               
        </section>
        <form onSubmit={handleSubmit}>
        <div class="inputDiv ">
      <label class="inputLabel" for="password">Comment</label>
      <input type="text" id="comment" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
    </div>
        
        
        <button type="submit" className="btn btn-animation ">
          Add comment
        </button>
      </form>
      
        <div><Footer /></div>
    </div>
  );
}

export default GetBlog;