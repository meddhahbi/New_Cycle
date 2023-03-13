
import { Link } from "react-router-dom";


export default function Navbar(){
    return <div>

<header className="pb-md-4 pb-0">
        <div className="header-top">
            <div className="container-fluid-lg">
                <div className="row">
                    <div className="col-xxl-3 d-xxl-block d-none">
                        <div className="top-left-header">
                            <i className="iconly-Location icli text-white"></i>
                            <span className="text-white">1418 Riverwood Drive, CA 96052, US</span>
                        </div>
                    </div>

                    <div className="col-xxl-6 col-lg-9 d-lg-block d-none">
                        <div className="header-offer">
                            <div className="notification-slider">
                                <div>
                                    <div className="timer-notification">
                                        <h6><strong className="me-1">Welcome to Fastkart!</strong>Wrap new offers/gift
                                            every signle day on Weekends.<strong className="ms-1">New Coupon Code: Fast024
                                            </strong>

                                        </h6>
                                    </div>
                                </div>

                                <div>
                                    <div className="timer-notification">
                                        <h6>Something you love is now on sale!
                                            <a href="shop-left-sidebar.html" className="text-white">Buy Now
                                                !</a>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <ul className="about-list right-nav-about">
                            <li className="right-nav-list">
                                <div className="dropdown theme-form-select">
                                    <button className="btn dropdown-toggle" type="button" id="select-language"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="../../assets/images/User/country/united-states.png"
                                            className="img-fluid blur-up lazyload" alt="" />
                                        <span>English</span>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="select-language">
                                        <li>
                                            <a className="dropdown-item" href="#" id="english">
                                                <img src="../../assets/User/images/country/united-kingdom.png"
                                                    className="img-fluid blur-up lazyload" alt="" />
                                                <span>English</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#" id="france">
                                                <img src="../../assets/User/images/country/germany.png"
                                                    className="img-fluid blur-up lazyload" alt="" />
                                                <span>Germany</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#" id="chinese">
                                                <img src="../../assets/User/images/country/turkish.png"
                                                    className="img-fluid blur-up lazyload" alt="" />
                                                <span>Turki</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="right-nav-list">
                                <div className="dropdown theme-form-select">
                                    <button className="btn dropdown-toggle" type="button" id="select-dollar"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <span>USD</span>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end sm-dropdown-menu"
                                        aria-labelledby="select-dollar">
                                        <li>
                                            <a className="dropdown-item" id="aud" href="#">AUD</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" id="eur" href="#">EUR</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" id="cny" href="#">CNY</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="top-nav top-header sticky-header">
            <div className="container-fluid-lg">
                <div className="row">
                    <div className="col-12">
                        <div className="navbar-top">
                            <button className="navbar-toggler d-xl-none d-inline navbar-menu-button" type="button"
                                data-bs-toggle="offcanvas" data-bs-target="#primaryMenu">
                                <span className="navbar-toggler-icon">
                                    <i className="fa-solid fa-bars"></i>
                                </span>
                            </button>
                            <a href="index.html" className="web-logo nav-logo">
                                <img src="../../assets/User/images/logo/1.png" className="img-fluid blur-up lazyload" alt="" />
                            </a>

                            <div className="middle-box">
                                <div className="location-box">
                                    <button className="btn location-button" data-bs-toggle="modal"
                                        data-bs-target="#locationModal">
                                        <span className="location-arrow">
                                            <i data-feather="map-pin"></i>
                                        </span>
                                        <span className="locat-name">Your Location</span>
                                        <i className="fa-solid fa-angle-down"></i>
                                    </button>
                                </div>

                                <div className="search-box">
                                    <div className="input-group">
                                        <input type="search" className="form-control" placeholder="I'm searching for..."
                                            aria-label="Recipient's username" aria-describedby="button-addon2" />
                                        <button className="btn" type="button" id="button-addon2">
                                            <i data-feather="search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="rightside-box">
                                <div className="search-full">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i data-feather="search" className="font-light"></i>
                                        </span>
                                        <input type="text" className="form-control search-type" placeholder="Search here.." />
                                        <span className="input-group-text close-search">
                                            <i data-feather="x" className="font-light"></i>
                                        </span>
                                    </div>
                                </div>
                                <ul className="right-side-menu">
                                    <li className="right-side">
                                        <div className="delivery-login-box">
                                            <div className="delivery-icon">
                                                <div className="search-box">
                                                    <i data-feather="search"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    
                                    <li className="right-side">
                                        <a href="wishlist.html" className="btn p-0 position-relative header-wishlist">
                                            <i data-feather="heart"></i>
                                        </a>
                                    </li>
                                    <li className="right-side">
                                        <div className="onhover-dropdown header-badge">
                                            <button type="button" className="btn p-0 position-relative header-wishlist">
                                                <i data-feather="shopping-cart"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge">2
                                                    <span className="visually-hidden">unread messages</span>
                                                </span>
                                            </button>

                                            <div className="onhover-div">
                                                <ul className="cart-list">
                                                    <li className="product-box-contain">
                                                        <div className="drop-cart">
                                                            <a href="product-left-thumbnail.html" className="drop-image">
                                                                <img src="../../assets/User/images/vegetable/product/1.png"
                                                                    className="blur-up lazyload" alt="" />
                                                            </a>

                                                            <div className="drop-contain">
                                                                <a href="product-left-thumbnail.html">
                                                                    <h5>Fantasy Crunchy Choco Chip Cookies</h5>
                                                                </a>
                                                                <h6><span>1 x</span> $80.58</h6>
                                                                <button className="close-button close_button">
                                                                    <i className="fa-solid fa-xmark"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li className="product-box-contain">
                                                        <div className="drop-cart">
                                                            <a href="product-left-thumbnail.html" className="drop-image">
                                                                <img src="../../assets/User/images/vegetable/product/2.png"
                                                                    className="blur-up lazyload" alt="" />
                                                            </a>

                                                            <div className="drop-contain">
                                                                <a href="product-left-thumbnail.html">
                                                                    <h5>Peanut Butter Bite Premium Butter Cookies 600 g
                                                                    </h5>
                                                                </a>
                                                                <h6><span>1 x</span> $25.68</h6>
                                                                <button className="close-button close_button">
                                                                    <i className="fa-solid fa-xmark"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>

                                                <div className="price-box">
                                                    <h5>Total :</h5>
                                                    <h4 className="theme-color fw-bold">$106.58</h4>
                                                </div>

                                                <div className="button-group">
                                                    <a href="cart.html" className="btn btn-sm cart-button">View Cart</a>
                                                    <a href="checkout.html" className="btn btn-sm cart-button theme-bg-color
                                                    text-white">Checkout</a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="right-side onhover-dropdown">
                                        <div className="delivery-login-box">
                                            <div className="delivery-icon">
                                                <i data-feather="user"></i>
                                            </div>
                                            <div className="delivery-detail">
                                                <h6>Hello,</h6>
                                                <h5>My Account</h5>
                                            </div>
                                        </div>

                                        <div className="onhover-div onhover-div-login">
                                            <ul className="user-box-name">
                                                <li className="product-box-contain">
                                                    <i></i>
                                                <Link to="/login">Log In</Link>
                                                </li>

                                                <li className="product-box-contain">
                                                <Link to="/register">Register</Link>
                                                </li>

                                            
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="container-fluid-lg">
            <div className="row">
                <div className="col-12">
                    <div className="header-nav">
                        <div className="header-nav-left">
                            <button className="dropdown-category">
                                <i data-feather="align-left"></i>
                                <span>All Categories</span>
                            </button>

                            <div className="category-dropdown">
                                <div className="category-title">
                                    <h5>Categories</h5>
                                    <button type="button" className="btn p-0 close-button text-content">
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>

                                <ul className="category-list">
                                    <li className="onhover-category-list">
                                        <a href="#" className="category-name">
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/svg/1/vegetable.svg" alt="" />
                                            <h6>Vegetables & Fruit</h6>
                                            <i className="fa-solid fa-angle-right"></i>
                                        </a>

                                        <div className="onhover-category-box">
                                            <div className="list-1">
                                                <div className="category-title-box">
                                                    <h5>Organic Vegetables</h5>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <a href="#">Potato & Tomato</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Cucumber & Capsicum</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Leafy Vegetables</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Root Vegetables</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Beans & Okra</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Cabbage & Cauliflower</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Gourd & Drumstick</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Specialty</a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="list-2">
                                                <div className="category-title-box">
                                                    <h5>Fresh Fruit</h5>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <a href="#">Banana & Papaya</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Kiwi, Citrus Fruit</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Apples & Pomegranate</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Seasonal Fruits</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Mangoes</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Fruit Baskets</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="onhover-category-list">
                                        <a href="#" className="category-name">
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/svg/1/cup.svg" alt="" />
                                            <h6>Beverages</h6>
                                            <i className="fa-solid fa-angle-right"></i>
                                        </a>

                                        <div className="onhover-category-box w-100">
                                            <div className="list-1">
                                                <div className="category-title-box">
                                                    <h5>Energy & Soft Drinks</h5>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <a href="#">Soda & Cocktail Mix</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Soda & Cocktail Mix</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Sports & Energy Drinks</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Non Alcoholic Drinks</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Packaged Water</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Spring Water</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Flavoured Water</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="onhover-category-list">
                                        <a href="#" className="category-name">
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/svg/1/meats.svg" alt="" />
                                            <h6>Meats & Seafood</h6>
                                            <i className="fa-solid fa-angle-right"></i>
                                        </a>

                                        <div className="onhover-category-box">
                                            <div className="list-1">
                                                <div className="category-title-box">
                                                    <h5>Meat</h5>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <a href="#">Fresh Meat</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Frozen Meat</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Marinated Meat</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Fresh & Frozen Meat</a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="list-2">
                                                <div className="category-title-box">
                                                    <h5>Seafood</h5>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <a href="#">Fresh Water Fish</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Dry Fish</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Frozen Fish & Seafood</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Marine Water Fish</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Canned Seafood</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Prawans & Shrimps</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Other Seafood</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="onhover-category-list">
                                        <a href="#" className="category-name">
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/svg/1/breakfast.svg" alt="" />
                                            <h6>Breakfast & Dairy</h6>
                                            <i className="fa-solid fa-angle-right"></i>
                                        </a>

                                        <div className="onhover-category-box">
                                            <div className="list-1">
                                                <div className="category-title-box">
                                                    <h5>Breakfast Cereals</h5>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <a href="#">Oats & Porridge</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Kids Cereal</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Muesli</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Flakes</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Granola & Cereal Bars</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Instant Noodles</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Pasta & Macaroni</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Frozen Non-Veg Snacks</a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="list-2">
                                                <div className="category-title-box">
                                                    <h5>Dairy</h5>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <a href="#">Milk</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Curd</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Paneer, Tofu & Cream</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Butter & Margarine</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Condensed, Powdered Milk</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Buttermilk & Lassi</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Yogurt & Shrikhand</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Flavoured, Soya Milk</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="onhover-category-list">
                                        <a href="#" className="category-name">
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/svg/1/frozen.svg" alt="" />
                                            <h6>Frozen Foods</h6>
                                            <i className="fa-solid fa-angle-right"></i>
                                        </a>

                                        <div className="onhover-category-box w-100">
                                            <div className="list-1">
                                                <div className="category-title-box">
                                                    <h5>Noodle, Pasta</h5>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <a href="#">Instant Noodles</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Hakka Noodles</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Cup Noodles</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Vermicelli</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Instant Pasta</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="onhover-category-list">
                                        <a href="#" className="category-name">
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/svg/1/biscuit.svg" alt="" />
                                            <h6>Biscuits & Snacks</h6>
                                            <i className="fa-solid fa-angle-right"></i>
                                        </a>

                                        <div className="onhover-category-box">
                                            <div className="list-1">
                                                <div className="category-title-box">
                                                    <h5>Biscuits & Cookies</h5>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <a href="#">Salted Biscuits</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Marie, Health, Digestive</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Cream Biscuits & Wafers</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Glucose & Milk Biscuits</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Cookies</a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="list-2">
                                                <div className="category-title-box">
                                                    <h5>Bakery Snacks</h5>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <a href="#">Bread Sticks & Lavash</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Cheese & Garlic Bread</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Puffs, Patties, Sandwiches</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Breadcrumbs & Croutons</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="onhover-category-list">
                                        <a href="#" className="category-name">
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/svg/1/grocery.svg" alt="" />
                                            <h6>Grocery & Staples</h6>
                                            <i className="fa-solid fa-angle-right"></i>
                                        </a>

                                        <div className="onhover-category-box">
                                            <div className="list-1">
                                                <div className="category-title-box">
                                                    <h5>Grocery</h5>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <a href="#">Lemon, Ginger & Garlic</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Indian & Exotic Herbs</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Organic Vegetables</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Organic Fruits</a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="list-2">
                                                <div className="category-title-box">
                                                    <h5>Organic Staples</h5>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <a href="#">Organic Dry Fruits</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Organic Dals & Pulses</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Organic Millet & Flours</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Organic Sugar, Jaggery</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Organic Masalas & Spices</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Organic Rice, Other Rice</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Organic Flours</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Organic Edible Oil, Ghee</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="header-nav-middle">
                            <div className="main-nav navbar navbar-expand-xl navbar-light navbar-sticky">
                                <div className="offcanvas offcanvas-collapse order-xl-2" id="primaryMenu">
                                    <div className="offcanvas-header navbar-shadow">
                                        <h5>Menu</h5>
                                        <button className="btn-close lead" type="button" data-bs-dismiss="offcanvas"
                                            aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body">
                                        <ul className="navbar-nav">
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#"
                                                    data-bs-toggle="dropdown">Home</a>
                                            </li>

                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#"
                                                    data-bs-toggle="dropdown">Shop</a>
                                            </li>

                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#"
                                                    data-bs-toggle="dropdown">Product</a>

                                            </li>

                                            <li className="nav-item dropdown dropdown-mega">
                                                <a className="nav-link dropdown-toggle ps-xl-2 ps-0"
                                                    href="#" data-bs-toggle="dropdown">Mega Menu</a>

                                            </li>

                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#"
                                                    data-bs-toggle="dropdown">Blog</a>
                                    
                                            </li>

                                            <li className="nav-item dropdown new-nav-item">
                                                <label className="new-dropdown">New</label>
                                                <a className="nav-link dropdown-toggle" href="#"
                                                    data-bs-toggle="dropdown">Pages</a>
                                        
                                            </li>

                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#"
                                                    data-bs-toggle="dropdown">Seller</a>
                                    
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="header-nav-right">
                            <button className="btn deal-button" data-bs-toggle="modal" data-bs-target="#deal-box">
                                <i data-feather="zap"></i>
                                <span>Deal Today</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>


    </div>
}