import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
// const token = localStorage.getItem("token");
// const parts = token.split('.');
// const payload = JSON.parse(atob(parts[1]));
// const userId = payload.id;
const userId = 0;
const userInfo = JSON.parse(localStorage.getItem("userInfo"))

function Blog(props) {
    const {article, articles, setArticles, setIsDeleting} = props;
    const handleDelete = (id) => {
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
    };
    const sendMessage = async (e)=>{
        console.log("user")
        console.log(article.user)
        const newChat = {
            userId:article.user,
            postId:article._id,
            postName: article.title
        }
        await axios.post("http://localhost:3001/chat",newChat, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then(data=>{
            console.log(data.data)
            localStorage.setItem("chats", data.data._id)
            // window.location = "/client_messages"
        })
    }
    return (
        <div>

                <div class="row g-4">
                    <div class="col-xxl-9 col-xl-8 col-lg-7 order-lg-2">
                        <div class="row g-4">

                            <div class="col-12">
                                <div class="blog-box blog-list wow fadeInUp" data-wow-delay="0.2s">
                                    <a href="blog-detail.html" class="blog-image">


                                        {article.photo && <img width="400" height="200" src={`http://localhost:3001/${(article.photo)}`} />}



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

                                        <br/>
                                        <button onClick={() => handleDelete(article._id)} hidden={article.user != userInfo._id}>  delete</button>


                                        <Link to={`/updateBlog/${article._id}`} >
                                            <button  hidden={article.user != userInfo._id}>Update Blog </button>
                                        </Link>

                                        <Link to={`/client_messages`} >
                                            <button className="btn btn-outline-behance"  hidden={article.user === userInfo._id}  onClick={sendMessage}><i className="fa fa-comment" style={{fontSize:"xx-large"}} /></button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Blog;
