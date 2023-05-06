import React, { useState, useEffect, useId } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../UserInterface/Navbar';
import Footer from '../UserInterface/Footer';
import axios from 'axios';
// import TimeAgo from 'react-timeago'



function GetBlog() {
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [isliked, setIsLiked] = useState(false);
    const token = localStorage.getItem("token");
    const parts = token.split('.');
    const payload = JSON.parse(atob(parts[1]));
    const userId = payload.id;

    const getLikes = (l)=>{
        
    }


    useEffect(() => {
        fetch(`http://localhost:3001/article/${id}`)
            .then(res => res.json())
            .then(data => {
                setArticle(data.article)
                setLikes(data.article.likes)
                if(data.article.likes.length===0){
                    setIsLiked(false)
                }
                for(let like of data.article.likes){
                    
                console.log(like)
                console.log(userId)
                if (like ===userId){
                    setIsLiked(true)
                    break;
                }
                }



                // setComments(data.article.commentList)  

            })
            .catch(error => console.log(error));
    }, [id]);

    useEffect(() => {
        axios.get('http://localhost:3001/comment/commentByArticle/' + id)
            //.then(res => res.json())
            .then(data => {
                // console.log(data.data) 
                setComments(data.data)
            })

            .catch(error => console.log(error));
    }, [id, comments]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const badWords = ['bad', 'words', 'here'];
            let sanitizedComment = comment;
            for (const badWord of badWords) {
                const regex = new RegExp(`\\b${badWord}\\b`, 'gi');
                sanitizedComment = sanitizedComment.replace(regex, '***');
            }
            const { data } = await axios.post(
                'http://localhost:3001/comment',
                {
                    text: sanitizedComment,
                    articleId: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setComment('');
        } catch (error) {
            console.log(error);
        }
    };
    
    const likePost = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3001/article/like`, {
                articleId: id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // Fetch the updated article data and update the state variable
            const updatedArticle = await fetch(`http://localhost:3001/article/${id}`).then(res => res.json());
            setArticle(updatedArticle.article);
            setLikes(updatedArticle.article.likes)
            for(let like of updatedArticle.article.likes){
                setIsLiked(true)
                console.log(like)
                console.log("userId-")
                console.log(userId)
                if (like ==userId){
                    console.log("t")
                    
                    setIsLiked(true)
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    const unlikePost = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3001/article/unlike`, {
                articleId: id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            

            // Fetch the updated article data and update the state variable
            const updatedArticle = await fetch(`http://localhost:3001/article/${id}`).then(res => res.json());
            setIsLiked(false)
            setArticle(updatedArticle.article);
            for(let like of updatedArticle.article.likes){
                if (like ===userId){
                    setIsLiked(true)
                    break;
                }
                setIsLiked(false)
            }

        } catch (err) {
            console.log(err);
        }
    };
    const badWords=async(msg)=>{
        let response;
        const encodedParams = new URLSearchParams();
        encodedParams.append("content", msg);
        encodedParams.append("censor-character", "*");
    
        const url = 'https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter';
    
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': 'fe35a5a121msh34466f5ccd34a87p197183jsn8202a7d1a226',
                'X-RapidAPI-Host': 'neutrinoapi-bad-word-filter.p.rapidapi.com'
            },
            body: encodedParams
        };
    
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                console.log(json["censored-content"]);
                return json["censored-content"]
                response = json;
            })
            .catch(err => console.error('error:' + err));
        return response["censored-content"];
    }



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
                                            {!isliked?
                                            <i className="material-icons"
                                            onClick={() => { likePost(article._id) }}
                                            style={{cursor:'pointer'}}
                                        >
                                            thumb_up
                                        </i>
                                            :
                                        <i className="material-icons"
                                            onClick={() => { unlikePost(article._id) }}
                                            style={{cursor:'pointer'}}
                                        >thumb_down</i>
                                            }
                                            <h4> {article.likes && article.likes.length > 0 ? article.likes.length : 0}Likes </h4>


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
                <div class="comment-box overflow-hidden container">
                    <div class="leave-title">
                        <h3>Comments</h3>
                    </div>
                    {comments.map((comment) => (
                        <div class="user-comment-box">
                            <ul>
                                <li>
                                    <div class="user-box border-color">

                                        <div class="user-iamge">
                                            <img src={`http://localhost:3001/${(comment.user.image)}`}
                                                class="img-fluid blur-up lazyload" alt="" />
                                            <div class="user-name">

                                                {/* <TimeAgo date={comment.createdAt} /> */}
                                                <h5 class="text-content">{comment.user.username}</h5>
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
            <form class="container" onSubmit={handleSubmit}>
                <div class="inputDiv ">
                    <label class="inputLabel container" for="password">Comment</label>
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