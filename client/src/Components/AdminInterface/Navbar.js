
import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import navbar from "./Pages/style/navbar.css"
import {useLocation, useNavigate} from "react-router";
import axios from "axios";

export default function Navbar(){

    const navigate = useNavigate();
    const location = useLocation().pathname
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    const urlOffline="http://localhost:3001/setOffline";
    const logout = async (e)=>{
        e.preventDefault();
        let {data}=await axios.put(urlOffline, {
            userId :profile._id
        }, config)
        // console.log("logout");
        localStorage.clear();
        navigate("/login")
    }
    const [profile, setProfile] = useState(null);
    useEffect(()=>{
        const getData= async ()=>{
            const url = "http://localhost:3001/me/" + localStorage.getItem("mail");
            const response = await fetch(url);
            const json = await response.json();
            const user = json.user;
            console.log(user);
            if(response.ok){
                setProfile(user);
            }
        }
        getData()
    },[])




    return <div>
        <header className="pb-0 fixed-header">
<div className="top-nav top-header">
    <div className="container-fluid-xs">
        <div className="row">
            <div className="col-12">
                <div className="navbar-top">
                    <button className="navbar-toggler d-xl-none d-inline navbar-menu-button" type="button"
                        data-bs-toggle="offcanvas" data-bs-target="#primaryMenu">
                        <span className="navbar-toggler-icon navbar-toggler-icon-2">
                            <i className="fa-solid fa-bars"></i>
                        </span>
                    </button>

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
                                <button className="btn bg-theme" type="button" id="button-addon2">
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
                                <a href="contact-us.html" className="delivery-login-box">
                                    <div className="delivery-icon">
                                        <i data-feather="phone-call"></i>
                                    </div>
                                    <div className="delivery-detail">
                                        {/*<h6>24/7 Delivery</h6>*/}
                                        {/*<h5>+91 888 104 2340</h5>*/}
                                        <button className="btn btn-danger" onClick={logout}>logout</button>
                                    </div>
                                </a>
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
                                                        <img src="../assets/images/vegetable/product/1.png"
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
                                                        <img src="../assets/images/vegetable/product/2.png"
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
                          
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</header>
    </div>
}


