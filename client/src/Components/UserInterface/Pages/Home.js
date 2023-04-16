import { Link } from "react-router-dom";
import LoadingPage from "../../Loading";
import { useState } from "react";
import React, {useEffect} from 'react';





export default function Home(){

    const [isLoading, setIsLoading] = useState(true);

      useEffect(()=>{
        setTimeout(()=>setIsLoading(false), 1500);
    })


    return  <div> {isLoading ? <LoadingPage/> : <div className="theme-color-2 bg-effect">
    <section className="home-section-2 home-section-small section-b-space">
        <div className="container-fluid-lg">
            <div className="row g-4">
                <div className="col-xxl-5 col-md-8">
                    <div className="home-contain h-100">
                        {/* <img src="../../../../assets/User/images/veg-3/home/1.jpg" className="img-fluid bg-img blur-up lazyload" alt="" /> */}
                        <div className="home-detail p-center position-relative">
                            <div>
                                <h6 className="ls-expanded theme-color">DONATION</h6>
                                <h1 className="fw-bold w-100">100% transparency</h1>
                                <h3 className="text-content fw-light">Fruit & Vegetables</h3>
                                <p className="d-sm-block d-none">Free shipping on all your order. we deliver you enjoy</p>
                             <Link to="/donate">   <button 
                                    className="btn mt-sm-4 btn-2 theme-bg-color text-white mend-auto btn-2-animation">Donate
                                    Now</button></Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xxl-3 col-md-4 ratio_medium d-md-block d-none">
                    <div className="home-contain home-small h-100">
                        <div className="h-100">
                        <img src="../../../../assets/User/images/veg-3/home/1.jpg" className="img-fluid bg-img blur-up lazyload" alt="" />
                        </div>
                        <div className="home-detail text-center p-top-center w-100 text-white">
                            <div>
                                <h4 className="fw-bold">No Poverty</h4>
                                <h5 className="text-center">Let's eradicate poverty</h5><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                                <Link to="/donate">    <button className="btn bg-white theme-color mt-3 home-button mx-auto btn-2"
                                    >Donate Now</button></Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xxl-3 ratio_65 d-xxl-block d-none">
                    <div className="row g-3">
                        <div className="col-xxl-12 col-sm-6">
                            <div className="home-contain">
                                <a href="shop-left-sidebar.html">
                                    <img src="../../../../assets/User/images/veg-3/home/3.jpeg"
                                        className="img-fluid bg-img blur-up lazyload" alt="" />
                                </a>
                                <div className="home-detail text-white p-center text-center">
                                    <div>
                                        <h4 className="text-center">Organic Lifestyle</h4>
                                        <h5 className="text-center">Best Weekend Sales</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-12 col-sm-6">
                            <div className="home-contain">
                                <a href="shop-left-sidebar.html">
                                    <img src="../../../../assets/User/images/veg-3/home/4.jpg"
                                        className="img-fluid bg-img blur-up lazyload" alt="" />
                                </a>
                                <div className="home-detail text-white w-50 p-center-left home-p-sm">
                                    <div>
                                        <h4 className="fw-bold">Safe food saves lives</h4>
                                        <h5>Discount Offer</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="category-section-2">
        <div className="container-fluid-lg">
            <div className="title">
                <h2>Shop By Categories</h2>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="category-slider arrow-slider">
                        <div>
                            <div className="shop-category-box border-0 wow fadeIn">
                                <a href="shop-left-sidebar.html" className="circle-1">
                                    <img src="../../../../assets/User/images/veg-3/category/1.png" className="img-fluid blur-up lazyload"
                                        alt="" />
                                </a>
                                <div className="category-name">
                                    <h6>Oils, Rofined & Ghee</h6>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="shop-category-box border-0 wow fadeIn" data-wow-delay="0.05s">
                                <a href="shop-left-sidebar.html" className="circle-2">
                                    <img src="../../../../assets/User/images/veg-3/category/2.png" className="img-fluid blur-up lazyload"
                                        alt="" />
                                </a>
                                <div className="category-name">
                                    <h6>Rice, Flour & Grains</h6>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="shop-category-box border-0 wow fadeIn" data-wow-delay="0.1s">
                                <a href="shop-left-sidebar.html" className="circle-3">
                                    <img src="../../../../assets/User/images/veg-3/category/3.png" className="img-fluid blur-up lazyload"
                                        alt="" />
                                </a>
                                <div className="category-name">
                                    <h6>Food Cupboard</h6>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="shop-category-box border-0 wow fadeIn" data-wow-delay="0.15s">
                                <a href="shop-left-sidebar.html" className="circle-4">
                                    <img src="../../../../assets/User/images/veg-3/category/4.png" className="img-fluid blur-up lazyload"
                                        alt="" />
                                </a>
                                <div className="category-name">
                                    <h6>Dals & Pulses</h6>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="shop-category-box border-0 wow fadeIn" data-wow-delay="0.2s">
                                <a href="shop-left-sidebar.html" className="circle-4">
                                    <img src="../../../../assets/User/images/veg-3/category/5.png" className="img-fluid blur-up lazyload"
                                        alt="" />
                                </a>
                                <div className="category-name">
                                    <h6>Drinks & Beverages</h6>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="shop-category-box border-0 wow fadeIn" data-wow-delay="0.25s">
                                <a href="shop-left-sidebar.html" className="circle-1">
                                    <img src="../../../../assets/User/images/veg-3/category/6.png" className="img-fluid blur-up lazyload"
                                        alt="" />
                                </a>
                                <div className="category-name">
                                    <h6>Fresh Fruits & Vegetables</h6>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="shop-category-box border-0 wow fadeIn" data-wow-delay="0.3s">
                                <a href="shop-left-sidebar.html" className="circle-2">
                                    <img src="../../../../assets/User/images/veg-3/category/7.png" className="img-fluid blur-up lazyload"
                                        alt="" />
                                </a>
                                <div className="category-name">
                                    <h6>Ready to eat Meals</h6>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="shop-category-box border-0 wow fadeIn" data-wow-delay="0.35s">
                                <a href="shop-left-sidebar.html" className="circle-3">
                                    <img src="../../../../assets/User/images/veg-3/category/8.png" className="img-fluid blur-up lazyload"
                                        alt="" />
                                </a>
                                <div className="category-name">
                                    <h6>Instant Mixes</h6>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="shop-category-box border-0 wow fadeIn" data-wow-delay="0.4s">
                                <a href="shop-left-sidebar.html" className="circle-4">
                                    <img src="../../../../assets/User/images/veg-3/category/2.png" className="img-fluid blur-up lazyload"
                                        alt="" />
                                </a>
                                <div className="category-name">
                                    <h6>Rice, Flour & Grains</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section>
        <div class="container-fluid-lg">
            <div class="title">
                <h2>Best Value</h2>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="three-slider arrow-slider ratio_65">
                        <div>
                            <div class="offer-banner hover-effect">
                                <img src="../../../../assets/User/images/veg-3/value/1.png" class="img-fluid bg-img blur-up lazyload"
                                    alt="" />
                                <div class="banner-detail">
                                    <h5 class="theme-color">Buy more, Save more</h5>
                                    <h6>Fresh Vegetable</h6>
                                </div>
                                <div class="offer-box">
                                    <button onclick="location.href = 'shop-left-sidebar.html';"
                                        class="btn-category btn theme-bg-color text-white">View Offer</button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="offer-banner hover-effect">
                                <img src="../../../../assets/User/images/veg-3/value/2.png" class="img-fluid bg-img blur-up lazyload"
                                    alt="" />
                                <div class="banner-detail">
                                    <h5 class="theme-color">Save More!</h5>
                                    <h6>Organic Vegetable</h6>
                                </div>
                                <div class="offer-box">
                                    <button onclick="location.href = 'shop-left-sidebar.html';"
                                        class="btn-category btn theme-bg-color text-white">View Offer</button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="offer-banner hover-effect">
                                <img src="../../../../assets/User/images/veg-3/value/3.png" class="img-fluid bg-img blur-up lazyload"
                                    alt="" />
                                <div class="banner-detail">
                                    <h5 class="theme-color">Hot Deals!</h5>
                                    <h6>Fruita & Vagerables</h6>
                                </div>
                                <div class="offer-box">
                                    <button onclick="location.href = 'shop-left-sidebar.html';"
                                        class="btn-category btn theme-bg-color text-white">View Offer</button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="offer-banner hover-effect">
                                <img src="../../../../assets/User/images/veg-3/value/1.png" class="img-fluid bg-img blur-up lazyload"
                                    alt="" />
                                <div class="banner-detail">
                                    <h5 class="theme-color">Buy more, Save more</h5>
                                    <h6>Fruita & Vagerables</h6>
                                </div>
                                <div class="offer-box">
                                    <button onclick="location.href = 'shop-left-sidebar.html';"
                                        class="btn-category btn theme-bg-color text-white">View
                                        Offer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>



   
    



    </div>
}
    </div>
     
}