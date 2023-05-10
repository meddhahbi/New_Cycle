
import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import navbar from "./Pages/style/navbar.css"
import {useLocation, useNavigate} from "react-router";
import axios from "axios";

export default function Navbar(){
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
        if(userInfo && userInfo.role === "client"){
            let {data}=await axios.put(urlOffline, {
                userId :profile._id
            }, config)
        }

        // console.log("logout");
        localStorage.clear();
        navigate("/login")
    }
    const [profile, setProfile] = useState();
    const [loaded, setLoaded] = useState(true);
    const [chats, setChats] = useState([]);
    const [chatsTrade, setChatsTrade] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const url="https://localhost:3001/verifySubs/" + localStorage.getItem("mail");
    useEffect(()=>{
        const getData= async ()=>{
            const url1 = "http://localhost:3001/me/" + localStorage.getItem("mail");
            const response1 = await fetch(url1);
            const json1 = await response1.json();
            const user = json1.user;
            if(loaded){

                setProfile(user);
            }


        }
        if(userInfo && userInfo.role === "client"){
            getData().then(async ()=>{
                // if(profile){

                const all_chat_url = "http://localhost:3001/chat"
                if(loaded){
                    // console.log("chatss")

                    const {data:chatss} = await axios.get(all_chat_url, config);
                    setChats(chatss);
                    console.log(chatss)
                    setLoaded(false)
                }

                const all_chat_post_url = "http://localhost:3001/chat/post"
                if(loaded){
                    // console.log("chatss")

                    const {data:chatss} = await axios.get(all_chat_post_url, config);
                    setChatsTrade(chatss);
                    console.log(chatss)
                    setLoaded(false)
                }
                // }
            })

            fetch(url)
                .then(response => response.json())
                .then(data => setIsSubscribed(data.isSubscribed))
                .catch(error => console.error(error));
        }


    },[]);
  //  const [isSubscribed, setIsSubscribed] = useState(false);

  // const url="https://localhost:3001/verifySubs/" + localStorage.getItem("mail");

    // useEffect(() => {
    //     fetch(url)
    //       .then(response => response.json())
    //       .then(data => setIsSubscribed(data.isSubscribed))
    //       .catch(error => console.error(error));
    //   }, []);

//   const subscriptionStatus=(e)=>{
//     e.preventDefault();
//     const [subscribed,setSubscribed] =useState(false);
//     const url="https://localhost:3001/verifySubs/" + localStorage.getItem("mail");
//     useEffect(()=>{
//         axios.get(url)
//         .then((response)=>{
//             setSubscribed(response.data.subscribed);
//         }).catch((error)=>{
//             console.error(error);
//         })
//     })
//   }
    const check_report = async ()=>{
        const reportUserUrl = "http://localhost:3001/reportUser/check_reported"
        try{
            if(userInfo && userInfo.role === "client"){
                const{data:rep} = await axios.put(reportUserUrl,{}, config).then(async rep => {
                    console.log(rep.data)
                    if(rep.data === true){

                        setTimeout(()=>{
                            localStorage.clear()
                            navigate("/login")
                        }, 3000)
                    }

                })
            }
        }

        catch (e) {
                console.log(e)
            }
    }
    useEffect( ()=>{

        setTimeout(()=>{
            check_report().then()
        }, 10000)
        // const intervalId = setInterval(() => {
        //     check_report().then()
        // }, 5000);
        // return () => {
        //     clearInterval(intervalId);
        // };
    }, [])



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
                                            <img src="../../../assets/images/User/country/united-states.png"
                                                 className="img-fluid blur-up lazyload" alt="" />
                                            <span>English</span>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="select-language">
                                            <li>
                                                <a className="dropdown-item" href="#" id="english">
                                                    <img src="../../../assets/User/images/country/united-kingdom.png"
                                                         className="img-fluid blur-up lazyload" alt="" />
                                                    <span>English</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#" id="france">
                                                    <img src="../../../assets/User/images/country/germany.png"
                                                         className="img-fluid blur-up lazyload" alt="" />
                                                    <span>Germany</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#" id="chinese">
                                                    <img src="../../../assets/User/images/country/turkish.png"
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

                                {location!=="/client_messages" && userInfo && userInfo.role === "client"?
                                    <>
                                        {location!=="/client_messages_blog"?

                                            <button className="navbar-toggler d-xl-none d-inline navbar-menu-button" type="button"
                                                    data-bs-toggle="offcanvas" data-bs-target="#primaryMenu">
                                        <span className="navbar-toggler-icon">
                                            <i className="fa-solid fa-bars"></i>
                                        </span>
                                            </button>
                                            :<button className="navbar-toggler d-inline navbar-menu-button" type="button"
                                                     data-bs-toggle="offcanvas" data-bs-target="#primaryMenu">
                                            <span className="navbar-toggler-icon">
                                                <i className="fa-solid fa-bars"></i>
                                            </span>
                                            </button>}
                                    </>
                                    :
                                    <div>

                                    </div>
                                }
                                <Link to="/" className="web-logo nav-logo">
                                    <img src="../../assets/User/images/logo/1.png" className="img-fluid blur-up lazyload" alt="" />
                                </Link>
                                {/*{location !== "/client_messages" ?*/}
                                    <div className="middle-box">
                                        <div className="location-box">
                                            <button className="btn location-button" data-bs-toggle="modal"
                                                    data-bs-target="#locationModal">
                                        <span className="location-arrow">
                                            <i data-feather="map-pin" className="fa fa-map-marker"/>
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
                                                    <i data-feather="search" className="fa-solid fa-search"/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                {/*    : ""*/}
                                {/*}*/}

                                <div className="rightside-box">
                                    <div className="search-full">
                                        <div className="input-group">
                                            {/*<span className="input-group-text">*/}
                                            {/*    <i data-feather="search" className="font-light"></i>*/}
                                            {/*</span>*/}
                                            <input type="text" className="form-control search-type" placeholder="Search here.." />
                                            <span className="input-group-text close-search">
                                            <i data-feather="x" className="font-light"></i>
                                        </span>
                                        </div>
                                    </div>
                                    <ul className="right-side-menu">


                                        <li className="right-side">
                                            <a href="wishlist.html" className="btn p-0 position-relative header-wishlist">
                                                <i data-feather="heart" className="fa fa-comments-alt"/>
                                            </a>
                                        </li>
                                        <li className="right-side">

                                            <div className="onhover-dropdown header-badge">
                                                <button type="button" className="btn p-0 position-relative header-wishlist">
                                                    <i data-feather="shopping-cart" className="fa fa-shopping-cart"/>
                                                    <span className="position-absolute top-0 start-100 translate-middle badge">2
                                                    <span className="visually-hidden">unread messages</span>
                                                </span>
                                                </button>

                                                <div className="onhover-div">
                                                    <ul className="cart-list">
                                                        <li className="product-box-contain">
                                                            <div className="drop-cart">
                                                                <a href="product-left-thumbnail.html" className="drop-image">
                                                                    <img src="../../../assets/User/images/vegetable/product/1.png"
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
                                        {localStorage.getItem("token")?
                                        <li className="right-side">
                                            <div className="onhover-dropdown header-badge">


                                                <div className="delivery-detail">
                                                    {
                                                        profile?<div>
                                                            <h6><center><div className="delivery-icon">
                                                                <button type="button" className="btn p-0 position-relative header-wishlist">
                                                                    <i data-feather="user" className="fa fa-heart"/>
                                                                    <span className="position-absolute top-0 start-100 translate-middle badge">
                                                                    2
                                                                    <span className="visually-hidden">unread messages</span>
                                                                </span>
                                                                </button>
                                                            </div></center></h6>
                                                            {/*<h5>{profile && profile.username}</h5>*/}
                                                        </div>:""
                                                    }
                                                </div>
                                            </div>
                                            <div className="onhover-div onhover-div-login">

                                            </div>
                                        </li>
                                            :""}
                                        {localStorage.getItem("token")?
                                        <li className="right-side onhover-dropdown">
                                            <div className="header-badge">



                                                    <div className="delivery-detail">
                                                        {
                                                            profile?<div>
                                                                <h6><center><div>
                                                                    <button type="button" className="btn p-0 position-relative header-wishlist">
                                                                        <i className="fa fa-comments col-sm" title="shop"/>
                                                                        <span className="position-absolute top-0 start-100 translate-middle badge">
                                                                    2
                                                                    <span className="visually-hidden">unread messages</span>
                                                                </span>
                                                                    </button>
                                                                </div></center></h6>
                                                                {/*<h5>{profile && profile.username}</h5>*/}
                                                            </div>:""
                                                        }
                                                    </div>

                                            </div>
                                            <div className="onhover-div">

                                                <ul className="cart-list">
                                                    {chats?.map((chat) => (
                                                        <li
                                                            className="comment-box-contain"
                                                            key={chat._id}
                                                        >
                                                            <Link to="/client_messages" onClick={()=>{
                                                                localStorage.removeItem("chats");
                                                                localStorage.setItem("chats",chat._id);
                                                            }}>
                                                                <div
                                                                    className="drop-cart"
                                                                >

                                                                    <div className="user">
                                                                        <img src="../../../../../assets/User/images/inner-page/user/default.png"
                                                                             alt=""
                                                                             className="left-nav-img"
                                                                        />
                                                                        {chat.users?.map((userr) => (
                                                                            <span className="username">
                                                                            {userr._id !== profile._id?
                                                                                <>
                                                                                    {chat.product && <span>{chat.product.name} (<span>{userr.username}</span>)</span>
                                                                                    ||
                                                                                    chat.post && <span>{chat.post.title} (<span>{userr.username}</span>)</span>}
                                                                                </>


                                                                            :""
                                                                            }
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    ))
                                                    }
                                                </ul>

                                            </div>
                                        </li>
                                            :""
                                        }
                                        {localStorage.getItem("token")?
                                        <li className="right-side onhover-dropdown">
                                            <div className="header-badge">



                                                    <div className="delivery-detail">
                                                        {
                                                            profile?<div>
                                                                <h6><center><div>
                                                                    <button type="button" className="btn p-0 position-relative header-wishlist">
                                                                        <i className="fa fa-comments-o col-sm" title="trade"/>
                                                                        <span className="position-absolute top-0 start-100 translate-middle badge">
                                                                    2
                                                                    <span className="visually-hidden">unread messages</span>
                                                                </span>
                                                                    </button>
                                                                </div></center></h6>
                                                                {/*<h5>{profile && profile.username}</h5>*/}
                                                            </div>:""
                                                        }
                                                    </div>

                                            </div>
                                            <div className="onhover-div">

                                                <ul className="cart-list">
                                                    {chatsTrade?.map((chat) => (
                                                        <li
                                                            className="comment-box-contain"
                                                            key={chat._id}
                                                        >
                                                            <Link to="/client_messages_blog" onClick={()=>{
                                                                localStorage.removeItem("chats");
                                                                localStorage.setItem("chats",chat._id);
                                                            }}>
                                                                <div
                                                                    className="drop-cart"
                                                                >

                                                                    <div className="user">
                                                                        <img src="../../../../../assets/User/images/inner-page/user/default.png"
                                                                             alt=""
                                                                             className="left-nav-img"
                                                                        />
                                                                        {chat.users?.map((userr) => (
                                                                            <span className="username">
                                                                            {userr._id !== profile._id?
                                                                                <>
                                                                                    {chat.post && <span>{chat.post.title} (<span>{userr.username}</span>)</span>}
                                                                                </>


                                                                            :""
                                                                            }
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    ))
                                                    }
                                                </ul>

                                            </div>
                                        </li>
                                            :""
                                        }
                                        <li className="right-side onhover-dropdown">
                                            <div className="header-badge">


                                                {localStorage.getItem("token")?<div className="delivery-detail">
                                                    {
                                                        profile?<div>
                                                            <h6><center><div className="delivery-icon">
                                                                <i data-feather="user" className="fa fa-user"/>
                                                            </div></center></h6>
                                                            {/*<h5>{profile && profile.username}</h5>*/}
                                                        </div>:""
                                                    }
                                                </div>:<div className="delivery-detail">
                                                    <h6>Login/Sign Up</h6>
                                                </div>}

                                            </div>

                                            <div className="onhover-div onhover-div-login">


                                                {!localStorage.getItem("token")?
                                                    <ul className="user-box-name"><li className="product-box-contain">
                                                        <i></i>
                                                        <Link to="/login">Log In</Link>
                                                    </li>

                                                        <li className="product-box-contain">
                                                            <Link to="/register">Register</Link>
                                                        </li>
                                                    </ul>
                                                    :<ul className="user-box-name">
                                                        <li className="product-box-contain">
                                                            <Link to="/me">Profile</Link>
                                                        </li>
                                                        <li className="product-box-contain">
                                                            <form onSubmit={logout}>
                                                                <button className="btn btn-sm btn-outline-danger" >Logout</button>
                                                            </form>
                                                        </li>
                                                    </ul>}



                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {location!=="/client_messages"?
                <>
                {location!=="/client_messages_blog"?
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
                                                            aria-label="Close"/>
                                                </div>
                                                <div className="offcanvas-body">
                                                    <ul className="navbar-nav">
                                                        <li className="nav-item dropdown">
                                                            <Link className="nav-link dropdown-toggle" to="/"
                                                               // data-bs-toggle="dropdown"
                                                            >Home</Link>
                                                        </li>

                                                        <li className="nav-item dropdown">
                                                            {/*<a className="nav-link dropdown-toggle" href="#"*/}
                                                            {/*   data-bs-toggle="dropdown">Shop</a>*/}
                                                            <Link className="nav-link dropdown-toggle" to="/donate">Donate!</Link>
                                                        </li>

                                                        <li className="nav-item dropdown">
                                                            {/*<a className="nav-link dropdown-toggle" href="#"*/}
                                                            {/*   data-bs-toggle="dropdown">Shop</a>*/}
                                                            <Link className="nav-link dropdown-toggle" to="/blog">Trade</Link>
                                                        </li>

                                                        <li className="nav-item dropdown">
                                                            {/*<a className="nav-link dropdown-toggle" href="#"*/}
                                                            {/*   data-bs-toggle="dropdown">Product</a>*/}
                                                            <Link className="nav-link dropdown-toggle" to="/AllProduit"
                                                                  // data-bs-toggle="dropdown"
                                                            >Shop</Link>

                                                        </li>



                                                        <li className="nav-item dropdown">
                                                            <Link className="nav-link dropdown-toggle" to="/scraped"
                                                               // data-bs-toggle="dropdown"
                                                            >recommended blogs</Link>

                                                        </li>

                                                        {/*<li className="nav-item dropdown new-nav-item">*/}
                                                        {/*    <label className="new-dropdown">New</label>*/}
                                                        {/*    <a className="nav-link dropdown-toggle" href="#"*/}
                                                        {/*       data-bs-toggle="dropdown">Pages</a>*/}

                                                        {/*</li>*/}

                                                        {/*<li className="nav-item dropdown">*/}
                                                        {/*    <a className="nav-link dropdown-toggle" href="#"*/}
                                                        {/*       data-bs-toggle="dropdown">Seller</a>*/}

                                                        {/*</li>*/}
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
                            {/*    </div>*/}
                            {/*</div>*/}
                            {isSubscribed || !localStorage.getItem("token") ?
                                <div className="header-nav-right">
                                    <button className="btn deal-button" data-bs-toggle="modal" data-bs-target="#deal-box">
                                        <i data-feather="zap"></i>
                                        <Link to="/subscribe">
                                            <span>Take your subscription</span></Link>
                                    </button>
                                </div> :

                                <div className="header-nav-right">
                                </div>
                            }




                        </div>
                    </div>
                    :""
                }
                </>
                :""
            }
        </header>

        {/*
    <div class="fullpage-loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div> 
   */}

    </div>
}
