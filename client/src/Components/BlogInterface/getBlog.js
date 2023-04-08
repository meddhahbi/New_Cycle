import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../UserInterface/Navbar';
import Footer from '../UserInterface/Footer';

function GetBlog() {
    const { id } = useParams();
    const [article, setArticle] =  useState({});
  
    console.log('GetBlog rendered'); // Add this line
  
    useEffect(() => {
      fetch(`http://localhost:3001/article/${id}`)
        .then(res => res.json())
        .then(data => setArticle(data.article))
        .catch(error => console.log(error));
    }, [id]);

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
        </section>
        <div><Footer /></div>
    </div>
  );
}

export default GetBlog;