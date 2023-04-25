import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';




function Scraped() {
    const [articles, setArticles] = useState([]);
    const [showMore, setShowMore] = useState(false); // State to control whether to show more articles

    useEffect(() => {
        // Fetch data from backend
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/scrape`); // Assumes backend is running on the same host and port
                const data = await response.json();
                console.log('Fetched data:', data); // Log fetched data for debugging
                setArticles(data.articles);
                console.log(data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to handle "Show More" button click
    const handleShowMoreClick = () => {
        setShowMore(true); // Set showMore state to true to display all articles
    };

    return (
        <div>




            <section class="breadscrumb-section pt-0">

                <div class="container-fluid-lg">
                    <div class="row">
                        <div class="col-12">
                            <div class="breadscrumb-contain">
                                <h2>Recommanded Blogs</h2>
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

                    {articles.slice(0, showMore ? articles.length : 10).map((article, index) => (
                        <div class="row g-4">
                            <div class="col-xxl-9 col-xl-8 col-lg-7 order-lg-2">
                                <div class="row g-4">

                                    <div class="col-12">
                                        <div class="blog-box blog-list wow fadeInUp" data-wow-delay="0.2s">
                                            {/* <a href="blog-detail.html" class="blog-image">

                                {article.photo && <img  width="400" height="200" src={`http://localhost:3001/${(article.photo)}`}  />}

                                </a> */}

                                            <div class="blog-contain blog-contain-2">

                                                <a href="blog-detail.html">
                                                    <h3>Title :{article.title}</h3>

                                                </a>
                                                <p>Descriptio :{article.description}</p>

                                                <a href={article.link}  className="blog-button">
                                                    Read More <i className="fa-solid fa-right-long"></i>
                                                </a>



                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                    {!showMore && articles.length > 10 && (
                        <a onClick={handleShowMoreClick}  className="blog-button">
                            show More <i className="fa-solid fa-right-long"></i>
                        </a>
                    )}
                </div>
            </section>
        </div>

    );

}

export default Scraped;
