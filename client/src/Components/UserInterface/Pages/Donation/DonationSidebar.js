import React from 'react';

function DonationSidebar(props) {
    return (
        <div className="col-xxl-3 col-xl-4 col-lg-5 d-lg-block d-none">
            <div className="left-sidebar-box">
                <div className="left-search-box">
                    <div className="search-box">
                        <input type="search" className="form-control" id="exampleFormControlInput4"
                               placeholder="Search...."/>
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
                                            <img src="../assets/images/inner-page/blog/1.jpg"
                                                 className="img-fluid blur-up lazyload" alt=""/>
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
                                            <img src="../assets/images/inner-page/blog/2.jpg"
                                                 className="img-fluid blur-up lazyload" alt=""/>
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
                                            <img src="../assets/images/inner-page/blog/3.jpg"
                                                 className="img-fluid blur-up lazyload" alt=""/>
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
                                            <img src="../assets/images/inner-page/blog/4.jpg"
                                                 className="img-fluid blur-up lazyload" alt=""/>
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

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                                    aria-controls="panelsStayOpen-collapseTwo">
                                Category
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse collapse show"
                             aria-labelledby="panelsStayOpen-headingTwo">
                            <div className="accordion-body p-0">
                                <div className="category-list-box">
                                    <ul>
                                        <li>
                                            <a href="blog-list.html">
                                                <div className="category-name">
                                                    <h5>Latest Recipes</h5>
                                                    <span>10</span>
                                                </div>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="blog-list.html">
                                                <div className="category-name">
                                                    <h5>Diet Food</h5>
                                                    <span>6</span>
                                                </div>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="blog-list.html">
                                                <div className="category-name">
                                                    <h5>Low calorie Items</h5>
                                                    <span>8</span>
                                                </div>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="blog-list.html">
                                                <div className="category-name">
                                                    <h5>Cooking Method</h5>
                                                    <span>9</span>
                                                </div>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="blog-list.html">
                                                <div className="category-name">
                                                    <h5>Dairy Free</h5>
                                                    <span>12</span>
                                                </div>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="blog-list.html">
                                                <div className="category-name">
                                                    <h5>Vegetarian Food</h5>
                                                    <span>10</span>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                                    aria-controls="panelsStayOpen-collapseThree">
                                Product Tags
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse collapse show"
                             aria-labelledby="panelsStayOpen-headingThree">
                            <div className="accordion-body pt-0">
                                <div className="product-tags-box">
                                    <ul>

                                        <li>
                                            <a href="javascript:void(0)">Fruit Cutting</a>
                                        </li>

                                        <li>
                                            <a href="javascript:void(0)">Meat</a>
                                        </li>

                                        <li>
                                            <a href="javascript:void(0)">organic</a>
                                        </li>

                                        <li>
                                            <a href="javascript:void(0)">cake</a>
                                        </li>

                                        <li>
                                            <a href="javascript:void(0)">pick fruit</a>
                                        </li>

                                        <li>
                                            <a href="javascript:void(0)">backery</a>
                                        </li>

                                        <li>
                                            <a href="javascript:void(0)">organix food</a>
                                        </li>

                                        <li>
                                            <a href="javascript:void(0)">Most Expensive Fruit</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false"
                                    aria-controls="panelsStayOpen-collapseFour">
                                Trending Products
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse collapse show"
                             aria-labelledby="panelsStayOpen-headingFour">
                            <div className="accordion-body">
                                <ul className="product-list product-list-2 border-0 p-0">
                                    <li>
                                        <div className="offer-product">
                                            <a href="shop-left-sidebar.html" className="offer-image">
                                                <img src="../assets/images/vegetable/product/23.png"
                                                     className="blur-up lazyload" alt=""/>
                                            </a>

                                            <div className="offer-detail">
                                                <div>
                                                    <a href="shop-left-sidebar.html">
                                                        <h6 className="name">Meatigo Premium Goat Curry</h6>
                                                    </a>
                                                    <span>450 G</span>
                                                    <h6 className="price theme-color">$ 70.00</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="offer-product">
                                            <a href="shop-left-sidebar.html" className="offer-image">
                                                <img src="../assets/images/vegetable/product/24.png"
                                                     className="blur-up lazyload" alt=""/>
                                            </a>

                                            <div className="offer-detail">
                                                <div>
                                                    <a href="shop-left-sidebar.html">
                                                        <h6 className="name">Dates Medjoul Premium Imported</h6>
                                                    </a>
                                                    <span>450 G</span>
                                                    <h6 className="price theme-color">$ 40.00</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="mb-0">
                                        <div className="offer-product">
                                            <a href="shop-left-sidebar.html" className="offer-image">
                                                <img src="../assets/images/vegetable/product/26.png"
                                                     className="blur-up lazyload" alt=""/>
                                            </a>

                                            <div className="offer-detail">
                                                <div>
                                                    <a href="shop-left-sidebar.html">
                                                        <h6 className="name">Apple Red Premium Imported</h6>
                                                    </a>
                                                    <span>1 KG</span>
                                                    <h6 className="price theme-color">$ 80.00</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DonationSidebar;
