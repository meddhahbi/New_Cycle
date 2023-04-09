import React, { useState, useEffect } from 'react';


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
                                    
                                {article.photo && <img src={`data:image/jpeg;base64,${(article.photo).toString('base64')}`}  />}
                                </a>

                                <div class="blog-contain blog-contain-2">
                                    <div class="blog-label">
                                        <span class="time"><i data-feather="clock"></i> <span>{article.createdAt}</span></span>

                                    </div>
                                    <a href="blog-detail.html">
                                        <h3>{article.title}</h3>
                                        
                                    </a>
                                    <p>{article.content}</p>
                                    <button onclick="location.href = 'blog-detail.html';" class="blog-button">Read
                                        More <i class="fa-solid fa-right-long"></i></button>
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
