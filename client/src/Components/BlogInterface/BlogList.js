import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Blog from "./Blog";
import { isLoggedIn, isClient, isSubs } from '../../AuthGuard/index';
//import jwt_decode from 'jwt-decode';
// import TimeAgo from 'react-timeago'




function BlogList() {
    const [articles, setArticles] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    // const token = localStorage.getItem("token");
    // const parts = token.split('.');
    // const payload = JSON.parse(atob(parts[1]));
    // const userId = payload.id;
     const userId = JSON.parse(localStorage.getItem("userInfo"))


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



    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
            setIsDeleting(true);
            axios.delete(`http://localhost:3001/article/${id}`)
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


    return (
        <div>
            <section class="breadscrumb-section pt-0">

                <div class="container-fluid-lg">
                    <div class="row">
                        <div class="col-12">
                            <div class="breadscrumb-contain">
                                <h2>Products for trade</h2>
                                <nav>
                                   
                                        <ol class="breadcrumb mb-0">
                                            <li class="breadcrumb-item">
                                                <a href="/addBlog">
                                                    <i class="fa-solid fa-house"></i>
                                                </a>
                                            </li>
                                            <li class="breadcrumb-item active" aria-current="page">
                                                If you have a product for trade click here !!
                                            </li>
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
{/*                    <div class="blog-contain blog-contain-2">*/}
{/*                        <div class="blog-label">*/}
{/*                            <span class="time"><i data-feather="clock"></i> <span>{article.createdAt}</span></span>*/}

{/*                        </div>*/}
{/*                        <a href="blog-detail.html">*/}
{/*                            <h3>{article.title}</h3>*/}

{/*                        </a>*/}
{/*                        <p>{article.content}</p>*/}

{/*                        <Link to={{ pathname: `/getBlog/${article._id}` }} className="blog-button">*/}
{/*                            Read More <i className="fa-solid fa-right-long"></i>*/}
{/*                        </Link>*/}

{/*                        <br />*/}
{/*                        <button class="btn btn-outline-danger" onClick={() => handleDelete(article._id)} hidden={article.user != userId._id}><i class="bi bi-trash"></i></button>*/}


{/*                        <Link to={`/updateBlog/${article._id}`} >*/}
{/*                            <button hidden={article.user != userId._id}>Update Blog </button>*/}
{/*                        </Link>*/}

{/*                        <Link to={`/client_message_blog`} >*/}
{/*                            <button className="btn btn-outline-behance" hidden={article.user === userId._id}><i className="fa fa-comment" style={{ fontSize: "xx-large" }} /></button>*/}
{/*                        </Link>*/}
{/*                    </div>*/}
{/*                </div>*/}
{/*        </div>*/}
{/*</div>*/}
{/*</div>*/}
{/*</div>*/}
                </div>
            </section>
        </div>

    );

}

export default BlogList;
