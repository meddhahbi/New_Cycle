import React, {useEffect} from 'react';
import { useState } from "react";
import LoadingPage from "../../Loading";


export default function Donation(){

    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        setTimeout(()=>setIsLoading(false), 1500);
    })






    return <div>
 {isLoading ? <LoadingPage/> :
<section className="blog-section section-b-space">
        <div className="container-fluid-lg">
            <div className="row g-4">
                <div className="col-xxl-9 col-xl-8 col-lg-7 order-lg-2">
                    <div className="row g-4 ratio_65">
                        <div className="col-xxl-4 col-sm-6">
                            <div className="blog-box wow fadeInUp">
                                <div className="blog-image">
                                    <a href="blog-detail.html">
                                        <img src="../../../../assets/User/images/inner-page/blog/1.jpg"
                                            className="bg-img blur-up lazyload" alt="" />
                                    </a>
                                </div>

                                <div className="blog-contain">
                                    <div className="blog-label">
                                        <span className="time"><i data-feather="clock"></i> <span>25 Feg, 2022</span></span>
                                        <span className="super"><i data-feather="user"></i> <span>Mark J.
                                                Speight</span></span>
                                    </div>
                                    <a href="blog-detail.html">
                                        <h3>one pot creamy mediterranean chicken pasta cream.</h3>
                                    </a>
                                    <button onclick="location.href = 'blog-detail.html';" className="blog-button">Read More
                                        <i className="fa-solid fa-right-long"></i></button>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-sm-6">
                            <div className="blog-box wow fadeInUp" data-wow-delay="0.05s">
                                <div className="blog-image">
                                    <a href="blog-detail.html">
                                        <img src="../../../../assets/User/images/inner-page/blog/2.jpg" className="bg-img" alt="" />
                                    </a>
                                </div>

                                <div className="blog-contain">
                                    <div className="blog-label">
                                        <span className="time"><i data-feather="clock"></i> <span>25 Feg, 2022</span></span>
                                        <span className="super"><i data-feather="user"></i> <span>rebeus
                                                hagrid</span></span>
                                    </div>
                                    <a href="blog-detail.html">
                                        <h3>Crispy Frozen Vegetable is the on the Tempura.</h3>
                                    </a>
                                    <button onclick="location.href = 'blog-detail.html';" className="blog-button">Read More
                                        <i className="fa-solid fa-right-long"></i></button>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-sm-6">
                            <div className="blog-box wow fadeInUp" data-wow-delay="0.1s">
                                <div className="blog-image">
                                    <a href="blog-detail.html">
                                        <img src="../../../../assets/User/images/inner-page/blog/3.jpg"
                                            className="bg-img blur-up lazyload" alt="" />
                                    </a>
                                    <label><i className="fa-solid fa-bolt-lightning"></i> popular</label>
                                </div>

                                <div className="blog-contain">
                                    <div className="blog-label">
                                        <span className="time"><i data-feather="clock"></i> <span>25 Feg, 2022</span></span>
                                        <span className="super"><i data-feather="user"></i> <span>Chris C.
                                                Hall</span></span>
                                    </div>
                                    <a href="blog-detail.html">
                                        <h3>How to start regrowing green onions and other vegetables.</h3>
                                    </a>
                                    <button onclick="location.href = 'blog-detail.html';" className="blog-button">Read More
                                        <i className="fa-solid fa-right-long"></i></button>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-sm-6">
                            <div className="blog-box wow fadeInUp" data-wow-delay="0.15s">
                                <div className="blog-image">
                                    <a href="blog-detail.html">
                                        <img src="../../../../assets/User/images/inner-page/blog/4.jpg"
                                            className="bg-img blur-up lazyload" alt="" />
                                    </a>
                                </div>

                                <div className="blog-contain">
                                    <div className="blog-label">
                                        <span className="time"><i data-feather="clock"></i> <span>25 Feg, 2022</span></span>
                                        <span className="super"><i data-feather="user"></i> <span>James M.
                                                Martin</span></span>
                                    </div>
                                    <a href="blog-detail.html">
                                        <h3>Starting a vegetable garden: the basics.</h3>
                                    </a>
                                    <button onclick="location.href = 'blog-detail.html';" className="blog-button">Read More
                                        <i className="fa-solid fa-right-long"></i></button>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-sm-6">
                            <div className="blog-box wow fadeInUp" data-wow-delay="0.2s">
                                <div className="blog-image">
                                    <a href="blog-detail.html">
                                        <img src="../../../../assets/User/images/inner-page/blog/5.jpg"
                                            className="bg-img blur-up lazyload" alt="" />
                                    </a>
                                </div>

                                <div className="blog-contain">
                                    <div className="blog-label">
                                        <span className="time"><i data-feather="clock"></i> <span>25 Feg, 2022</span></span>
                                        <span className="super"><i data-feather="user"></i> <span>Cecil M.
                                                Levis</span></span>
                                    </div>
                                    <a href="blog-detail.html">
                                        <h3>Adapt this simple pasta salad to whatever vegetable.</h3>
                                    </a>
                                    <button onclick="location.href = 'blog-detail.html';" className="blog-button">Read More
                                        <i className="fa-solid fa-right-long"></i></button>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-sm-6">
                            <div className="blog-box wow fadeInUp" data-wow-delay="0.25s">
                                <div className="blog-image">
                                    <a href="blog-detail.html">
                                        <img src="../../../../assets/User/images/inner-page/blog/1.jpg"
                                            className="bg-img blur-up lazyload" alt="" />
                                    </a>
                                </div>

                                <div className="blog-contain">
                                    <div className="blog-label">
                                        <span className="time"><i data-feather="clock"></i> <span>25 Feg, 2022</span></span>
                                        <span className="super"><i data-feather="user"></i> <span>Mary R.
                                                Hernandez</span></span>
                                    </div>
                                    <a href="blog-detail.html">
                                        <h3>With chefs idle and vegetables rotting, China's virus-hit.</h3>
                                    </a>
                                    <button onclick="location.href = 'blog-detail.html';" className="blog-button">Read More
                                        <i className="fa-solid fa-right-long"></i></button>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-sm-6">
                            <div className="blog-box wow fadeInUp" data-wow-delay="0.3s">
                                <div className="blog-image">
                                    <a href="blog-detail.html">
                                        <img src="../../../../assets/User/images/inner-page/blog/2.jpg"
                                            className="bg-img blur-up lazyload" alt="" />
                                    </a>
                                </div>

                                <div className="blog-contain">
                                    <div className="blog-label">
                                        <span className="time"><i data-feather="clock"></i> <span>25 Feg, 2022</span></span>
                                        <span className="super"><i data-feather="user"></i> <span>Cheryl D.
                                                Moser</span></span>
                                    </div>
                                    <a href="blog-detail.html">
                                        <h3>Turn that bowl of pasta into a supercharged veggie vehicle.</h3>
                                    </a>
                                    <button onclick="location.href = 'blog-detail.html';" className="blog-button">Read More
                                        <i className="fa-solid fa-right-long"></i></button>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-sm-6">
                            <div className="blog-box wow fadeInUp" data-wow-delay="0.35s">
                                <div className="blog-image">
                                    <a href="blog-detail.html">
                                        <img src="../../../../assets/User/images/inner-page/blog/3.jpg"
                                            className="bg-img blur-up lazyload" alt="" />
                                    </a>
                                </div>

                                <div className="blog-contain">
                                    <div className="blog-label">
                                        <span className="time"><i data-feather="clock"></i> <span>25 Feg,
                                                2022</span></span>
                                        <span className="super"><i data-feather="user"></i> <span>Mina M.
                                                Short</span></span>
                                    </div>
                                    <a href="blog-detail.html">
                                        <h3>Health, care and skin on the for your organic.</h3>
                                    </a>
                                    <button onclick="location.href = 'blog-detail.html';" className="blog-button">Read More
                                        <i className="fa-solid fa-right-long"></i></button>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-sm-6">
                            <div className="blog-box wow fadeInUp" data-wow-delay="0.4s">
                                <div className="blog-image">
                                    <a href="blog-detail.html">
                                        <img src="../../../../assets/User/images/inner-page/blog/4.jpg"
                                            className="bg-img blur-up lazyload" alt="" />
                                    </a>
                                </div>

                                <div className="blog-contain">
                                    <div className="blog-label">
                                        <span className="time"><i data-feather="clock"></i> <span>25 Feg, 2022</span></span>
                                        <span className="super"><i data-feather="user"></i> <span>Marie S.
                                                Santiago</span></span>
                                    </div>
                                    <a href="blog-detail.html">
                                        <h3>Fresh organicsm, brand, fresh and picnic place awesome.</h3>
                                    </a>
                                    <button onclick="location.href = 'blog-detail.html';" className="blog-button">Read More
                                        <i className="fa-solid fa-right-long"></i></button>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-sm-6">
                            <div className="blog-box wow fadeInUp" data-wow-delay="0.45s">
                                <div className="blog-image">
                                    <a href="blog-detail.html">
                                        <img src="../../../../assets/User/images/inner-page/blog/3.jpg"
                                            className="bg-img blur-up lazyload" alt="" />
                                    </a>
                                    <label><i className="fa-solid fa-bolt-lightning"></i> popular</label>
                                </div>

                                <div className="blog-contain">
                                    <div className="blog-label">
                                        <span className="time"><i data-feather="clock"></i> <span>25 Feg, 2022</span></span>
                                        <span className="super"><i data-feather="user"></i> <span>Mark J.
                                                Speight</span></span>
                                    </div>
                                    <a href="blog-detail.html">
                                        <h3>With chefs idle and vegetables rotting, China's virus-hit.</h3>
                                    </a>
                                    <button onclick="location.href = 'blog-detail.html';" className="blog-button">Read More
                                        <i className="fa-solid fa-right-long"></i></button>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-sm-6">
                            <div className="blog-box wow fadeInUp" data-wow-delay="0.5s">
                                <div className="blog-image">
                                    <a href="blog-detail.html">
                                        <img src="../../../../assets/User/images/inner-page/blog/4.jpg"
                                            className="bg-img blur-up lazyload" alt="" />
                                    </a>
                                </div>

                                <div className="blog-contain">
                                    <div className="blog-label">
                                        <span className="time"><i data-feather="clock"></i> <span>25 Feg, 2022</span></span>
                                        <span className="super"><i data-feather="user"></i> <span>Chris C.
                                                Hall</span></span>
                                    </div>
                                    <a href="blog-detail.html">
                                        <h3>Vegina good quality special liquide fesh vagitables.</h3>
                                    </a>
                                    <button onclick="location.href = 'blog-detail.html';" className="blog-button">Read More
                                        <i className="fa-solid fa-right-long"></i></button>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-sm-6">
                            <div className="blog-box wow fadeInUp" data-wow-delay="0.55s">
                                <div className="blog-image">
                                    <a href="blog-detail.html">
                                        <img src="../../../../assets/User/images/inner-page/blog/5.jpg"
                                            className="bg-img blur-up lazyload" alt="" />
                                    </a>
                                </div>

                                <div className="blog-contain">
                                    <div className="blog-label">
                                        <span className="time"><i data-feather="clock"></i> <span>25 Feg, 2022</span></span>
                                        <span className="super"><i data-feather="user"></i> <span>James M.
                                                Martin</span></span>
                                    </div>
                                    <a href="blog-detail.html">
                                        <h3>How to freeze fresh vegetables while preserving their best qualities.</h3>
                                    </a>
                                    <button onclick="location.href = 'blog-detail.html';" className="blog-button">Read More
                                        <i className="fa-solid fa-right-long"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>

                 
                </div>

                <div className="col-xxl-3 col-xl-4 col-lg-5 order-lg-1">
                    <div className="left-sidebar-box wow fadeInUp">
                        <div className="left-search-box">
                            <div className="search-box">
                                <input type="search" className="form-control" id="exampleFormControlInput1"
                                    placeholder="Search...." />
                            </div>
                        </div>

                        <div className="accordion left-accordion-box" id="accordionPanelsStayOpenExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseOne">
                                        Recent Post
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show"
                                    aria-labelledby="panelsStayOpen-headingOne">
                                    <div className="accordion-body pt-0">
                                        <div className="recent-post-box">
                                            <div className="recent-box">
                                                <a href="blog-detail.html" className="recent-image">
                                                    <img src="../../../../assets/User/images/inner-page/blog/1.jpg"
                                                        className="img-fluid blur-up lazyload" alt="" />
                                                </a>

                                                <div className="recent-detail">
                                                    <a href="blog-detail.html">
                                                        <h5 className="recent-name">Green onion knife and salad placed</h5>
                                                    </a>
                                                    <h6>25 Jan, 2022 <i data-feather="thumbs-up"></i></h6>
                                                </div>
                                            </div>

                                            <div className="recent-box">
                                                <a href="blog-detail.html" className="recent-image">
                                                    <img src="../../../../assets/User/images/inner-page/blog/2.jpg"
                                                        className="img-fluid blur-up lazyload" alt="" />
                                                </a>

                                                <div className="recent-detail">
                                                    <a href="blog-detail.html">
                                                        <h5 className="recent-name">Health and skin for your organic</h5>
                                                    </a>
                                                    <h6>25 Jan, 2022 <i data-feather="thumbs-up"></i></h6>
                                                </div>
                                            </div>

                                            <div className="recent-box">
                                                <a href="blog-detail.html" className="recent-image">
                                                    <img src="../../../../assets/User/images/inner-page/blog/3.jpg"
                                                        className="img-fluid blur-up lazyload" alt="" />
                                                </a>

                                                <div className="recent-detail">
                                                    <a href="blog-detail.html">
                                                        <h5 className="recent-name">Organics mix masala fresh & soft</h5>
                                                    </a>
                                                    <h6>25 Jan, 2022 <i data-feather="thumbs-up"></i></h6>
                                                </div>
                                            </div>

                                            <div className="recent-box">
                                                <a href="blog-detail.html" className="recent-image">
                                                    <img src="../../../../assets/User/images/inner-page/blog/4.jpg"
                                                        className="img-fluid blur-up lazyload" alt="" />
                                                </a>

                                                <div className="recent-detail">
                                                    <a href="blog-detail.html">
                                                        <h5 className="recent-name">Fresh organics brand and picnic</h5>
                                                    </a>
                                                    <h6>25 Jan, 2022 <i data-feather="thumbs-up"></i></h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        

                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

}
    </div>


}