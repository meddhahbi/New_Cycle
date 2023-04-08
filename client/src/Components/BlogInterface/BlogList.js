import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function BlogList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    
    fetch(`http://localhost:3001/article`)
      .then(res => res.json())
      .then(data => setArticles(data.articles))
      .catch(error => console.log(error));
  }, []);
  

  return (
    <div>

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
            
          {articles.map(article => (
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
                                    <Link to={{ pathname: `/getBlog/${article._id}` }} className="blog-button">
                                        Read More <i className="fa-solid fa-right-long"></i>
                                        </Link>
                                </div>
                            </div>
                        </div>                            
              </div>
</div>
</div>  
))}      
        </div>
    </section>
    </div>
    
  );
  
}

export default BlogList;
