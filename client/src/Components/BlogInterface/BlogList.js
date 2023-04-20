import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import TimeAgo from 'react-timeago'






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


        <section>
        <div class="accordion left-accordion-box" id="accordionPanelsStayOpenExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseOne">
                                        Recent Post
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show"
                                    aria-labelledby="panelsStayOpen-headingOne">
                                    <div class="accordion-body pt-0">
                                        <div class="recent-post-box">
                                            <div class="recent-box">
                                                <a href="blog-detail.html" class="recent-image">
                                                    <img src="../assets/images/inner-page/blog/1.jpg"
                                                        class="img-fluid blur-up lazyload" alt=""/>
                                                </a>

                                                <div class="recent-detail">
                                                    <a href="blog-detail.html">
                                                        <h5 class="recent-name">Green onion knife and salad placed</h5>
                                                    </a>
                                                    <h6>25 Jan, 2022 <i data-feather="thumbs-up"></i></h6>
                                                </div>
                                            </div>

                                           

     
    

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

                                    <Link to={{ pathname: `/getBlog/${article._id}` }} className="blog-button">
                                        Read More <i className="fa-solid fa-right-long"></i>
                                        </Link>


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