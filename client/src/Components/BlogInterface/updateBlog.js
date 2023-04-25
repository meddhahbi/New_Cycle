import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../UserInterface/Navbar';
import Footer from '../UserInterface/Footer';

function UpdateBlog() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [photo, setPhoto] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('photo', photo);

        axios.put(`http://localhost:3001/article/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response.data);
            setTitle('');
            setContent('');
            setPhoto(null);

            window.location = "/blog"

        }).catch(error => {
            console.log(error.response.data);

        });
    };

    return (
        <div>
            <Navbar></Navbar>
            <section>
                <div className="container">
                    <h1>Update Blog</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">
                                Content
                            </label>
                            <textarea
                                className="form-control"
                                id="content"
                                rows="3"
                                placeholder="Enter content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">
                                Photo
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="photo"
                                onChange={(e) => setPhoto(e.target.files[0])}
                            />
                        </div>
                        <button type="submit" className="btn btn-animation">
                            update Article
                        </button>
                    </form>
                </div>
            </section>
            <Footer></Footer>

        </div>
    );
};

export default UpdateBlog;
