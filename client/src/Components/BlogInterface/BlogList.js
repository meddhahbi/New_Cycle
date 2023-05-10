import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Blog from "./Blog";
//import jwt_decode from 'jwt-decode';

// import TimeAgo from 'react-timeago'




function BlogList() {
    const [articles, setArticles] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);



    useEffect(() => {

        fetch(`http://localhost:3001/article`)
            .then(res => res.json())
            .then(data => {
                console.log("test")
                    setArticles(data.articles)
                }
            )
            .catch(error => console.log(error));
    }, []);





    return (
        <div>
            <section class="breadscrumb-section pt-0">

                <div class="container-fluid-lg">
                    <div class="row">
                        <div class="col-12">
                            <div class="breadscrumb-contain">
                                <h2>List of products for trade </h2>
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
                    <Link to="/addBlog" className="btn btn-success">New</Link>
                    {articles.map(article => (
                    <Blog article={article} articles={articles} setArticles={setArticles} setIsDeleting={setIsDeleting}/>

                    ))}
                </div>
            </section>
        </div>

    );

}

export default BlogList;
