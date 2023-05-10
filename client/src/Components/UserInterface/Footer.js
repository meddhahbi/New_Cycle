import React from "react";
import {useLocation} from "react-router";

export default function Footer(){
    const location = useLocation().pathname
    // console.log("footer")
    // console.log(location)
    return <div>

        {location!=="/client_messages"?
            <>
                {location!=="/client_messages_blog"?<footer className="section-t-space">
                    <div className="container-fluid-lg">
                        <div className="main-footer section-b-space section-t-space">
                            <div className="row g-md-4 g-3">
                                <div className="col-xl-3 col-lg-4 col-sm-6">
                                    <div className="footer-logo">
                                        <div className="theme-logo">
                                            <a href="index.html">
                                                <img src="../assets/images/logo/1.png" className="blur-up lazyload" alt="" />
                                            </a>
                                        </div>

                                        <div className="footer-logo-contain">
                                            <p>We are a friendly bar serving a variety of cocktails, wines and beers. Our bar is a
                                                perfect place for a couple.</p>

                                            <ul className="address">
                                                <li>
                                                    <i data-feather="home"></i>
                                                    <a href="#">1418 Riverwood Drive, CA 96052, US</a>
                                                </li>
                                                <li>
                                                    <i data-feather="mail"></i>
                                                    <a href="#">support@new_cycle.com</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                                    <div className="footer-title">
                                        <h4>Categories</h4>
                                    </div>

                                    <div className="footer-contain">
                                        <ul>
                                            <li>
                                                <a href="shop-left-sidebar.html" className="text-content">Vegetables & Fruit</a>
                                            </li>
                                            <li>
                                                <a href="shop-left-sidebar.html" className="text-content">Beverages</a>
                                            </li>
                                            <li>
                                                <a href="shop-left-sidebar.html" className="text-content">Meats & Seafood</a>
                                            </li>
                                            <li>
                                                <a href="shop-left-sidebar.html" className="text-content">Frozen Foods</a>
                                            </li>
                                            <li>
                                                <a href="shop-left-sidebar.html" className="text-content">Biscuits & Snacks</a>
                                            </li>
                                            <li>
                                                <a href="shop-left-sidebar.html" className="text-content">Grocery & Staples</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-xl col-lg-2 col-sm-3">
                                    <div className="footer-title">
                                        <h4>Useful Links</h4>
                                    </div>

                                    <div className="footer-contain">
                                        <ul>
                                            <li>
                                                <a href="index.html" className="text-content">Home</a>
                                            </li>
                                            <li>
                                                <a href="shop-left-sidebar.html" className="text-content">Shop</a>
                                            </li>
                                            <li>
                                                <a href="about-us.html" className="text-content">About Us</a>
                                            </li>
                                            <li>
                                                <a href="blog-list.html" className="text-content">Blog</a>
                                            </li>
                                            <li>
                                                <a href="contact-us.html" className="text-content">Contact Us</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-xl-2 col-sm-3">
                                    <div className="footer-title">
                                        <h4>Help Center</h4>
                                    </div>

                                    <div className="footer-contain">
                                        <ul>
                                            <li>
                                                <a href="order-success.html" className="text-content">Your Order</a>
                                            </li>
                                            <li>
                                                <a href="user-dashboard.html" className="text-content">Your Account</a>
                                            </li>
                                            <li>
                                                <a href="order-tracking.html" className="text-content">Track Order</a>
                                            </li>
                                            <li>
                                                <a href="wishlist.html" className="text-content">Your Wishlist</a>
                                            </li>
                                            <li>
                                                <a href="search.html" className="text-content">Search</a>
                                            </li>
                                            <li>
                                                <a href="faq.html" className="text-content">FAQ</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-lg-4 col-sm-6">
                                    <div className="footer-title">
                                        <h4>Contact Us</h4>
                                    </div>

                                    <div className="footer-contact">
                                        <ul>
                                            <li>
                                                <div className="footer-number">
                                                    <i data-feather="phone"></i>
                                                    <div className="contact-number">
                                                        <h6 className="text-content">Hotline 24/7 :</h6>
                                                        <h5>+216 99 999 999</h5>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="footer-number">
                                                    <i data-feather="mail"></i>
                                                    <div className="contact-number">
                                                        <h6 className="text-content">Email Address :</h6>
                                                        <h5>new_cycle@hotmail.com</h5>
                                                    </div>
                                                </div>
                                            </li>


                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sub-footer section-small-space">
                            <div className="reserve">
                                <h6 className="text-content">©2022 NewCycle All rights reserved</h6>
                            </div>

                            <div className="payment">
                                <img src="../../assets/images/User/payment/1.png" className="blur-up lazyload" alt="" />
                            </div>

                        </div>
                    </div>
                </footer>:""}
            </>

            :""
        }




    </div>
}
