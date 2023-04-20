import React, {useEffect, useState} from 'react';
import axios from "axios";
import LoadingPage from "../../Loading";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {toast, ToastContainer} from "react-toastify";
// import {UserState} from "../../../Context/userProvider"
export default function UserProfile() {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };


    // console.log(url)
    // // console.log("data",data)
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [oldPass, setOldPass] = useState(null);
    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [passError, setPassError] = useState(null);
    const [passValid, setPassValid] = useState(null);
    const [newPass, setNewPass] = useState(null);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const checkPass = async(pass)=>{
        // if(pass.length>0){
            try {
                if(pass.length>0){
                    const { data:check } = await axios.get("/checkPass/"+pass, config);
                    return check
                }
            }
            catch (e){
                console.log(e.message)
            }
        // }
        // return null
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const getData= async ()=> {
        const url = "http://localhost:3001/me/" + localStorage.getItem("mail");
        const response = await fetch(url);
        const json = await response.json();
        const user = json.user;
        console.log(user.image);
        if (response.ok) {
            setProfile(user);
            console.log(profile)
        } else {

            setProfile(userInfo);
        }
    }
    useEffect(()=>{

        if(isLoading){
            // const {user} = UserState();
            console.log("userInfo");

            if (!userInfo) {
                console.log("no user")
                navigate("/login",{});

            }
            setProfile(userInfo)


            setTimeout(()=> {
                setIsLoading(false)
            }, 1000);
        }

    },[])
    const oldPassOnChange =async (e)=>{
        const check = checkPass(e.target.value).then(
            (check)=>{
                if(check.error){
                    console.log(check.error)
                    setPassError(check.error)
                    setPassValid(null)
                    setShowNewPass(false)
                }
                else if(check.msg){
                    console.log(check.msg)
                    setPassError(null)
                    setPassValid(check.msg)
                }
            }
        )



    }


    const handleChangePass = async()=>{
        const url = "http://localhost:3001/updatePass"
        if(passValid!==null){
            // console.log(newPass)
            const {data:user} = await axios.put(url,{newPass:newPass}, config).then(()=>{
                toast.success(' your password was updated successfully!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            setOldPass(null)
            setNewPass(null)
            console.log(user)
        }
    };
    let newPassOnChange = (e)=>{
            setNewPass(e.target.value)
        console.log(e.target.value)
    };
    const handleToggleClick = () => {
        setShowOldPass(!showOldPass);
    };
    let handleNewToggleClick = () => {
        setShowNewPass(!showNewPass);
    };
    let profileImageOnChange=(e)=>{
        const formData = new FormData()
        console.log(e.target.files[0])
        // setImage(e.target.files[0].name)
        formData.append('image', image.split("uploads\\")[1]);
    };
    return <div>
        {isLoading ? <LoadingPage/> :
            <section className="user-dashboard-section section-b-space">
                <div className="container-fluid-lg">
                    <ToastContainer/>
                    <div className="row">
                        <div className="col-xxl-3 col-lg-4">
                            <div className="dashboard-left-sidebar">
                                <div className="close-button d-flex d-lg-none">
                                    <button className="close-sidebar">
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className="profile-box">
                                    <div className="cover-image">
                                        <img src="../../../../assets/User/images/inner-page/cover-img.jpg"
                                             className="img-fluid blur-up lazyload"
                                             alt=""/>
                                    </div>

                                    <div className="profile-contain">
                                        <div className="profile-image">
                                            {/* <div className="position-relative">
                                                <img src="../../../../assets/User/images/inner-page/user/default.jpg"
                                                     className="blur-up lazyload update_img" alt=""/>
                                                <div className="cover-icon">
                                                    <i className="fa-solid fa-pen">
                                                        <input type="file" onChange="readURL(this,0)"/>
                                                    </i>
                                                </div>
                                            </div> */}
                                            <div className="position-relative">
                                                <img src={profile && "http://localhost:3001/"+profile.image}
                                                     className="blur-up lazyload update_img" alt=""/>
                                                <div className="cover-icon">
                                                    <i className="fa-solid fa-pen">
                                                        <input type="file" accept="image/jpeg, image/png" onChange={profileImageOnChange}/>
                                                    </i>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="profile-name">
                                            <h3>{profile && profile.username}</h3>
                                            <h6 className="text-content">{profile && profile.email}</h6>
                                        </div>
                                    </div>
                                </div>

                                <ul className="nav nav-pills user-nav-pills" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="pills-dashboard-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-dashboard" type="button" role="tab"
                                                aria-controls="pills-dashboard" aria-selected="true"><i
                                            data-feather="home"/>
                                            DashBoard
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-order-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-order" type="button" role="tab"
                                                aria-controls="pills-order"
                                                aria-selected="false"><i data-feather="shopping-bag"/>Order
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-wishlist-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-wishlist" type="button" role="tab"
                                                aria-controls="pills-wishlist" aria-selected="false"><i
                                            data-feather="heart"></i>
                                            Wishlist
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-card-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-card" type="button" role="tab"
                                                aria-controls="pills-card"
                                                aria-selected="false"><i data-feather="credit-card"></i> Saved Card
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-address-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-address" type="button" role="tab"
                                                aria-controls="pills-address" aria-selected="false"><i
                                            data-feather="map-pin"></i>
                                            Address
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-profile" type="button" role="tab"
                                                aria-controls="pills-profile" aria-selected="false"><i
                                            data-feather="user"></i>
                                            Profile
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-security-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-security" type="button" role="tab"
                                                aria-controls="pills-security" aria-selected="false"><i
                                            data-feather="shield"/>
                                            Privacy
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-xxl-9 col-lg-8">
                            <button
                                className="btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none">Show
                                Menu
                            </button>
                            <div className="dashboard-right-sidebar">
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-dashboard" role="tabpanel"
                                         aria-labelledby="pills-dashboard-tab">
                                        <div className="dashboard-home">
                                            <div className="title">
                                                <h2>My Dashboard</h2>
                                                <span className="title-leaf">
                                            <svg className="icon-width bg-gray">
                                                {/*<use*/}
                                                {/*    xlink:href="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf" />*/}
                                            </svg>
                                        </span>
                                            </div>

                                            <div className="dashboard-user-name">
                                                <h6 className="text-content">Hello, <b className="text-title">
                                                    {profile && profile.email}
                                                </b></h6>
                                                <p className="text-content">From your My Account Dashboard you have the
                                                    ability to
                                                    view a snapshot of your recent account activity and update your
                                                    account
                                                    information. Select a link below to view or edit information.</p>
                                            </div>

                                            <div className="total-box">
                                                <div className="row g-sm-4 g-3">
                                                    <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                        <div className="totle-contain">
                                                            <img
                                                                src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg"
                                                                className="img-1 blur-up lazyload" alt=""/>
                                                            <img
                                                                src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg"
                                                                className="blur-up lazyload"
                                                                alt=""/>
                                                            <div className="totle-detail">
                                                                <h5>Total Order</h5>
                                                                <h3>3658</h3>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                        <div className="totle-contain">
                                                            <img
                                                                src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg"
                                                                className="img-1 blur-up lazyload" alt=""/>
                                                            <img
                                                                src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg"
                                                                className="blur-up lazyload"
                                                                alt=""/>
                                                            <div className="totle-detail">
                                                                <h5>Total Pending Order</h5>
                                                                <h3>254</h3>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                        <div className="totle-contain">
                                                            <img
                                                                src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg"
                                                                className="img-1 blur-up lazyload" alt=""/>
                                                            <img
                                                                src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg"
                                                                className="blur-up lazyload" alt=""/>
                                                            <div className="totle-detail">
                                                                <h5>Total Wishlist</h5>
                                                                <h3>32158</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="dashboard-title">
                                                <h3>Account Information</h3>
                                            </div>

                                            <div className="row g-4">
                                                <div className="col-xxl-6">
                                                    <div className="dashboard-contant-title">
                                                        <h4>Contact Information <a href="javascript:void(0)"
                                                                                   data-bs-toggle="modal"
                                                                                   data-bs-target="#editProfile">Edit</a>
                                                        </h4>
                                                    </div>
                                                    <div className="dashboard-detail">
                                                        <h6 className="text-content">MARK JECNO</h6>
                                                        <h6 className="text-content">vicki.pope@gmail.com</h6>
                                                        <a href="javascript:void(0)"
                                                           data-bs-toggle="modal"
                                                           data-bs-target="#editPassword">Change Password</a>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-6">
                                                    <div className="dashboard-contant-title">
                                                        <h4>Newsletters <a href="javascript:void(0)"
                                                                           data-bs-toggle="modal"
                                                                           data-bs-target="#editProfile">Edit</a></h4>
                                                    </div>
                                                    <div className="dashboard-detail">
                                                        <h6 className="text-content">You are currently not subscribed to
                                                            any
                                                            newsletter</h6>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="dashboard-contant-title">
                                                        <h4>Address Book <a href="javascript:void(0)"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#editProfile">Edit</a></h4>
                                                    </div>

                                                    <div className="row g-4">
                                                        <div className="col-xxl-6">
                                                            <div className="dashboard-detail">
                                                                <h6 className="text-content">Default Billing
                                                                    Address</h6>
                                                                <h6 className="text-content">You have not set a default
                                                                    billing
                                                                    address.</h6>
                                                                <a href="javascript:void(0)" data-bs-toggle="modal"
                                                                   data-bs-target="#editProfile">Edit Address</a>
                                                            </div>
                                                        </div>

                                                        <div className="col-xxl-6">
                                                            <div className="dashboard-detail">
                                                                <h6 className="text-content">Default Shipping
                                                                    Address</h6>
                                                                <h6 className="text-content">You have not set a default
                                                                    shipping
                                                                    address.</h6>
                                                                <a href="javascript:void(0)" data-bs-toggle="modal"
                                                                   data-bs-target="#editProfile">Edit Address</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade show" id="pills-wishlist" role="tabpanel"
                                         aria-labelledby="pills-wishlist-tab">
                                        <div className="dashboard-wishlist">
                                            <div className="title">
                                                <h2>My Wishlist History</h2>
                                                <span className="title-leaf title-leaf-gray">
                                            <svg className="icon-width bg-gray">
                                                {/*<use*/}
                                                {/*    xlink:href="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use>*/}
                                            </svg>
                                        </span>
                                            </div>
                                            <div className="row g-sm-4 g-3">
                                                <div className="col-xxl-3 col-lg-6 col-md-4 col-sm-6">
                                                    <div className="product-box-3 theme-bg-white h-100">
                                                        <div className="product-header">
                                                            <div className="product-image">
                                                                <a href="product-left-thumbnail.html">
                                                                    <img src="../assets/images/cake/product/2.png"
                                                                         className="img-fluid blur-up lazyload" alt=""/>
                                                                </a>

                                                                <div className="product-header-top">
                                                                    <button
                                                                        className="btn wishlist-button close_button">
                                                                        <i data-feather="x"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="product-footer">
                                                            <div className="product-detail">
                                                                <span className="span-name">Vegetable</span>
                                                                <a href="product-left-thumbnail.html">
                                                                    <h5 className="name">Fresh Bread and Pastry Flour
                                                                        200
                                                                        g</h5>
                                                                </a>
                                                                <p className="text-content mt-1 mb-2 product-content">Cheesy
                                                                    feet
                                                                    cheesy grin brie. Mascarpone cheese and wine hard
                                                                    cheese
                                                                    the
                                                                    big cheese everyone loves smelly cheese macaroni
                                                                    cheese
                                                                    croque monsieur.</p>
                                                                <h6 className="unit mt-1">250 ml</h6>
                                                                <h5 className="price">
                                                                    <span className="theme-color">$08.02</span>
                                                                    <del>$15.15</del>
                                                                </h5>
                                                                <div className="add-to-cart-box mt-2">
                                                                    <button className="btn btn-add-cart addcart-button"
                                                                            tabIndex="0">Add
                                                                        <span className="add-icon">
                                                                        <i className="fa-solid fa-plus"/>
                                                                    </span>
                                                                    </button>
                                                                    <div className="cart_qty qty-box">
                                                                        <div className="input-group">
                                                                            <button type="button"
                                                                                    className="qty-left-minus"
                                                                                    data-type="minus" data-field="">
                                                                                <i className="fa fa-minus"
                                                                                   aria-hidden="true"/>
                                                                            </button>
                                                                            <input
                                                                                className="form-control input-number qty-input"
                                                                                type="text" name="quantity" value="0"/>
                                                                            <button type="button"
                                                                                    className="qty-right-plus"
                                                                                    data-type="plus" data-field="">
                                                                                <i className="fa fa-plus"
                                                                                   aria-hidden="true"/>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-3 col-lg-6 col-md-4 col-sm-6">
                                                    <div className="product-box-3 theme-bg-white h-100">
                                                        <div className="product-header">
                                                            <div className="product-image">
                                                                <a href="product-left-thumbnail.html">
                                                                    <img src="../assets/images/cake/product/3.png"
                                                                         className="img-fluid blur-up lazyload" alt=""/>
                                                                </a>

                                                                <div className="product-header-top">
                                                                    <button
                                                                        className="btn wishlist-button close_button">
                                                                        <i data-feather="x"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="product-footer">
                                                            <div className="product-detail">
                                                                <span className="span-name">Vegetable</span>
                                                                <a href="product-left-thumbnail.html">
                                                                    <h5 className="name">Peanut Butter Bite Premium
                                                                        Butter
                                                                        Cookies
                                                                        600 g</h5>
                                                                </a>
                                                                <p className="text-content mt-1 mb-2 product-content">Feta
                                                                    taleggio
                                                                    croque monsieur swiss manchego cheesecake dolcelatte
                                                                    jarlsberg. Hard cheese danish fontina boursin melted
                                                                    cheese
                                                                    fondue.</p>
                                                                <h6 className="unit mt-1">350 G</h6>
                                                                <h5 className="price">
                                                                    <span className="theme-color">$04.33</span>
                                                                    <del>$10.36</del>
                                                                </h5>
                                                                <div className="add-to-cart-box mt-2">
                                                                    <button className="btn btn-add-cart addcart-button"
                                                                            tabIndex="0">Add
                                                                        <span className="add-icon">
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </span>
                                                                    </button>
                                                                    <div className="cart_qty qty-box">
                                                                        <div className="input-group">
                                                                            <button type="button"
                                                                                    className="qty-left-minus"
                                                                                    data-type="minus" data-field="">
                                                                                <i className="fa fa-minus"
                                                                                   aria-hidden="true"></i>
                                                                            </button>
                                                                            <input
                                                                                className="form-control input-number qty-input"
                                                                                type="text" name="quantity" value="0"/>
                                                                            <button type="button"
                                                                                    className="qty-right-plus"
                                                                                    data-type="plus" data-field="">
                                                                                <i className="fa fa-plus"
                                                                                   aria-hidden="true"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-3 col-lg-6 col-md-4 col-sm-6">
                                                    <div className="product-box-3 theme-bg-white h-100">
                                                        <div className="product-header">
                                                            <div className="product-image">
                                                                <a href="product-left-thumbnail.html">
                                                                    <img src="../assets/images/cake/product/4.png"
                                                                         className="img-fluid blur-up lazyload" alt=""/>
                                                                </a>

                                                                <div className="product-header-top">
                                                                    <button
                                                                        className="btn wishlist-button close_button">
                                                                        <i data-feather="x"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="product-footer">
                                                            <div className="product-detail">
                                                                <span className="span-name">Snacks</span>
                                                                <a href="product-left-thumbnail.html">
                                                                    <h5 className="name">SnackAmor Combo Pack of Jowar
                                                                        Stick
                                                                        and
                                                                        Jowar Chips</h5>
                                                                </a>
                                                                <p className="text-content mt-1 mb-2 product-content">Lancashire
                                                                    hard cheese parmesan. Danish fontina mozzarella
                                                                    cream
                                                                    cheese
                                                                    smelly cheese cheese and wine cheesecake dolcelatte
                                                                    stilton.
                                                                    Cream cheese parmesan who moved my cheese when the
                                                                    cheese
                                                                    comes out everybody's happy cream cheese red
                                                                    leicester
                                                                    ricotta edam.</p>
                                                                <h6 className="unit mt-1">570 G</h6>
                                                                <h5 className="price">
                                                                    <span className="theme-color">$12.52</span>
                                                                    <del>$13.62</del>
                                                                </h5>
                                                                <div className="add-to-cart-box mt-2">
                                                                    <button className="btn btn-add-cart addcart-button"
                                                                            tabIndex="0">Add
                                                                        <span className="add-icon">
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </span>
                                                                    </button>
                                                                    <div className="cart_qty qty-box">
                                                                        <div className="input-group">
                                                                            <button type="button"
                                                                                    className="qty-left-minus"
                                                                                    data-type="minus" data-field="">
                                                                                <i className="fa fa-minus"
                                                                                   aria-hidden="true"></i>
                                                                            </button>
                                                                            <input
                                                                                className="form-control input-number qty-input"
                                                                                type="text" name="quantity" value="0"/>
                                                                            <button type="button"
                                                                                    className="qty-right-plus"
                                                                                    data-type="plus" data-field="">
                                                                                <i className="fa fa-plus"
                                                                                   aria-hidden="true"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-3 col-lg-6 col-md-4 col-sm-6">
                                                    <div className="product-box-3 theme-bg-white h-100">
                                                        <div className="product-header">
                                                            <div className="product-image">
                                                                <a href="product-left-thumbnail.html">
                                                                    <img src="../assets/images/cake/product/5.png"
                                                                         className="img-fluid blur-up lazyload" alt=""/>
                                                                </a>

                                                                <div className="product-header-top">
                                                                    <button
                                                                        className="btn wishlist-button close_button">
                                                                        <i data-feather="x"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="product-footer">
                                                            <div className="product-detail">
                                                                <span className="span-name">Snacks</span>
                                                                <a href="product-left-thumbnail.html">
                                                                    <h5 className="name">Yumitos Chilli Sprinkled Potato
                                                                        Chips 100 g
                                                                    </h5>
                                                                </a>
                                                                <p className="text-content mt-1 mb-2 product-content">Cheddar
                                                                    cheddar pecorino hard cheese hard cheese cheese and
                                                                    biscuits
                                                                    bocconcini babybel. Cow goat paneer cream cheese
                                                                    fromage
                                                                    cottage cheese cauliflower cheese jarlsberg.</p>
                                                                <h6 className="unit mt-1">100 G</h6>
                                                                <h5 className="price">
                                                                    <span className="theme-color">$10.25</span>
                                                                    <del>$12.36</del>
                                                                </h5>
                                                                <div className="add-to-cart-box mt-2">
                                                                    <button className="btn btn-add-cart addcart-button"
                                                                            tabIndex="0">Add
                                                                        <span className="add-icon">
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </span>
                                                                    </button>
                                                                    <div className="cart_qty qty-box">
                                                                        <div className="input-group">
                                                                            <button type="button"
                                                                                    className="qty-left-minus"
                                                                                    data-type="minus" data-field="">
                                                                                <i className="fa fa-minus"
                                                                                   aria-hidden="true"></i>
                                                                            </button>
                                                                            <input
                                                                                className="form-control input-number qty-input"
                                                                                type="text" name="quantity" value="0"/>
                                                                            <button type="button"
                                                                                    className="qty-right-plus"
                                                                                    data-type="plus" data-field="">
                                                                                <i className="fa fa-plus"
                                                                                   aria-hidden="true"/>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-3 col-lg-6 col-md-4 col-sm-6">
                                                    <div className="product-box-3 theme-bg-white h-100">
                                                        <div className="product-header">
                                                            <div className="product-image">
                                                                <a href="product-left-thumbnail.html">
                                                                    <img src="../assets/images/cake/product/6.png"
                                                                         className="img-fluid blur-up lazyload" alt=""/>
                                                                </a>

                                                                <div className="product-header-top">
                                                                    <button
                                                                        className="btn wishlist-button close_button">
                                                                        <i data-feather="x"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="product-footer">
                                                            <div className="product-detail">
                                                                <span className="span-name">Vegetable</span>
                                                                <a href="product-left-thumbnail.html">
                                                                    <h5 className="name">Fantasy Crunchy Choco Chip
                                                                        Cookies</h5>
                                                                </a>
                                                                <p className="text-content mt-1 mb-2 product-content">Bavarian
                                                                    bergkase smelly cheese swiss cut the cheese
                                                                    lancashire
                                                                    who
                                                                    moved my cheese manchego melted cheese. Red
                                                                    leicester
                                                                    paneer
                                                                    cow when the cheese comes out everybody's happy
                                                                    croque
                                                                    monsieur goat melted cheese port-salut.</p>
                                                                <h6 className="unit mt-1">550 G</h6>
                                                                <h5 className="price">
                                                                    <span className="theme-color">$14.25</span>
                                                                    <del>$16.57</del>
                                                                </h5>
                                                                <div className="add-to-cart-box mt-2">
                                                                    <button className="btn btn-add-cart addcart-button"
                                                                            tabIndex="0">Add
                                                                        <span className="add-icon">
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </span>
                                                                    </button>
                                                                    <div className="cart_qty qty-box">
                                                                        <div className="input-group">
                                                                            <button type="button"
                                                                                    className="qty-left-minus"
                                                                                    data-type="minus" data-field="">
                                                                                <i className="fa fa-minus"
                                                                                   aria-hidden="true"></i>
                                                                            </button>
                                                                            <input
                                                                                className="form-control input-number qty-input"
                                                                                type="text" name="quantity" value="0"/>
                                                                            <button type="button"
                                                                                    className="qty-right-plus"
                                                                                    data-type="plus" data-field="">
                                                                                <i className="fa fa-plus"
                                                                                   aria-hidden="true"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-3 col-lg-6 col-md-4 col-sm-6">
                                                    <div className="product-box-3 theme-bg-white h-100">
                                                        <div className="product-header">
                                                            <div className="product-image">
                                                                <a href="product-left-thumbnail.html">
                                                                    <img src="../assets/images/cake/product/7.png"
                                                                         className="img-fluid blur-up lazyload" alt=""/>
                                                                </a>

                                                                <div className="product-header-top">
                                                                    <button
                                                                        className="btn wishlist-button close_button">
                                                                        <i data-feather="x"/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="product-footer">
                                                            <div className="product-detail">
                                                                <span className="span-name">Vegetable</span>
                                                                <a href="product-left-thumbnail.html">
                                                                    <h5 className="name">Fresh Bread and Pastry Flour
                                                                        200
                                                                        g</h5>
                                                                </a>
                                                                <p className="text-content mt-1 mb-2 product-content">Melted
                                                                    cheese
                                                                    babybel chalk and cheese. Port-salut port-salut
                                                                    cream
                                                                    cheese
                                                                    when the cheese comes out everybody's happy cream
                                                                    cheese
                                                                    hard cheese cream cheese red leicester.</p>
                                                                <h6 className="unit mt-1">1 Kg</h6>
                                                                <h5 className="price">
                                                                    <span className="theme-color">$12.68</span>
                                                                    <del>$14.69</del>
                                                                </h5>
                                                                <div className="add-to-cart-box mt-2">
                                                                    <button className="btn btn-add-cart addcart-button"
                                                                            tabIndex="0">Add
                                                                        <span className="add-icon">
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </span>
                                                                    </button>
                                                                    <div className="cart_qty qty-box">
                                                                        <div className="input-group">
                                                                            <button type="button"
                                                                                    className="qty-left-minus"
                                                                                    data-type="minus" data-field="">
                                                                                <i className="fa fa-minus"
                                                                                   aria-hidden="true"></i>
                                                                            </button>
                                                                            <input
                                                                                className="form-control input-number qty-input"
                                                                                type="text" name="quantity" value="0"/>
                                                                            <button type="button"
                                                                                    className="qty-right-plus"
                                                                                    data-type="plus" data-field="">
                                                                                <i className="fa fa-plus"
                                                                                   aria-hidden="true"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-3 col-lg-6 col-md-4 col-sm-6">
                                                    <div className="product-box-3 theme-bg-white h-100">
                                                        <div className="product-header">
                                                            <div className="product-image">
                                                                <a href="product-left-thumbnail.html">
                                                                    <img src="../assets/images/cake/product/2.png"
                                                                         className="img-fluid blur-up lazyload" alt=""/>
                                                                </a>

                                                                <div className="product-header-top">
                                                                    <button
                                                                        className="btn wishlist-button close_button">
                                                                        <i data-feather="x"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="product-footer">
                                                            <div className="product-detail">
                                                                <span className="span-name">Vegetable</span>
                                                                <a href="product-left-thumbnail.html">
                                                                    <h5 className="name">Fresh Bread and Pastry Flour
                                                                        200
                                                                        g</h5>
                                                                </a>
                                                                <p className="text-content mt-1 mb-2 product-content">Squirty
                                                                    cheese
                                                                    cottage cheese cheese strings. Red leicester paneer
                                                                    danish
                                                                    fontina queso lancashire when the cheese comes out
                                                                    everybody's happy cottage cheese paneer.</p>
                                                                <h6 className="unit mt-1">250 ml</h6>
                                                                <h5 className="price">
                                                                    <span className="theme-color">$08.02</span>
                                                                    <del>$15.15</del>
                                                                </h5>
                                                                <div className="add-to-cart-box mt-2">
                                                                    <button className="btn btn-add-cart addcart-button"
                                                                            tabIndex="0">Add
                                                                        <span className="add-icon">
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </span>
                                                                    </button>
                                                                    <div className="cart_qty qty-box">
                                                                        <div className="input-group">
                                                                            <button type="button"
                                                                                    className="qty-left-minus"
                                                                                    data-type="minus" data-field="">
                                                                                <i className="fa fa-minus"
                                                                                   aria-hidden="true"></i>
                                                                            </button>
                                                                            <input
                                                                                className="form-control input-number qty-input"
                                                                                type="text" name="quantity" value="0"/>
                                                                            <button type="button"
                                                                                    className="qty-right-plus"
                                                                                    data-type="plus" data-field="">
                                                                                <i className="fa fa-plus"
                                                                                   aria-hidden="true"></i>
                                                                            </button>
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

                                    <div className="tab-pane fade show" id="pills-order" role="tabpanel"
                                         aria-labelledby="pills-order-tab">
                                        <div className="dashboard-order">
                                            <div className="title">
                                                <h2>My Orders History</h2>
                                                <span className="title-leaf title-leaf-gray">
                                            <svg className="icon-width bg-gray">
                                                {/*<use*/}
                                                {/*    xlink:href="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use>*/}
                                            </svg>
                                        </span>
                                            </div>

                                            <div className="order-contain">
                                                <div className="order-box dashboard-bg-box">
                                                    <div className="order-container">
                                                        <div className="order-icon">
                                                            <i data-feather="box"></i>
                                                        </div>

                                                        <div className="order-detail">
                                                            <h4>Delivere <span>Panding</span></h4>
                                                            <h6 className="text-content">Gouda parmesan caerphilly
                                                                mozzarella
                                                                cottage cheese cauliflower cheese taleggio gouda.</h6>
                                                        </div>
                                                    </div>

                                                    <div className="product-order-detail">
                                                        <a href="product-left-thumbnail.html" className="order-image">
                                                            <img src="../assets/images/vegetable/product/1.png"
                                                                 className="blur-up lazyload" alt=""/>
                                                        </a>

                                                        <div className="order-wrap">
                                                            <a href="product-left-thumbnail.html">
                                                                <h3>Fantasy Crunchy Choco Chip Cookies</h3>
                                                            </a>
                                                            <p className="text-content">Cheddar dolcelatte gouda.
                                                                Macaroni
                                                                cheese
                                                                cheese strings feta halloumi cottage cheese jarlsberg
                                                                cheese
                                                                triangles say cheese.</p>
                                                            <ul className="product-size">
                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Price : </h6>
                                                                        <h5>$20.68</h5>
                                                                    </div>
                                                                </li>

                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Rate : </h6>
                                                                        <div className="product-rating ms-2">
                                                                            <ul className="rating">
                                                                                <li>
                                                                                    <i data-feather="star"
                                                                                       className="fill"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star"
                                                                                       className="fill"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star"
                                                                                       className="fill"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star"
                                                                                       className="fill"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star"></i>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li>

                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Sold By : </h6>
                                                                        <h5>Fresho</h5>
                                                                    </div>
                                                                </li>

                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Quantity : </h6>
                                                                        <h5>250 G</h5>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="order-box dashboard-bg-box">
                                                    <div className="order-container">
                                                        <div className="order-icon">
                                                            <i data-feather="box"></i>
                                                        </div>

                                                        <div className="order-detail">
                                                            <h4>Delivered <span className="success-bg">Success</span>
                                                            </h4>
                                                            <h6 className="text-content">Cheese on toast cheesy grin
                                                                cheesy
                                                                grin
                                                                cottage cheese caerphilly everyone loves cottage cheese
                                                                the
                                                                big
                                                                cheese.</h6>
                                                        </div>
                                                    </div>

                                                    <div className="product-order-detail">
                                                        <a href="product-left-thumbnail.html" className="order-image">
                                                            <img src="../assets/images/vegetable/product/2.png" alt=""
                                                                 className="blur-up lazyload"/>
                                                        </a>

                                                        <div className="order-wrap">
                                                            <a href="product-left-thumbnail.html">
                                                                <h3>Cold Brew Coffee Instant Coffee 50 g</h3>
                                                            </a>
                                                            <p className="text-content">Pecorino paneer port-salut when
                                                                the
                                                                cheese
                                                                comes out everybody's happy red leicester mascarpone
                                                                blue
                                                                castello cauliflower cheese.</p>
                                                            <ul className="product-size">
                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Price : </h6>
                                                                        <h5>$20.68</h5>
                                                                    </div>
                                                                </li>

                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Rate : </h6>
                                                                        <div className="product-rating ms-2">
                                                                            <ul className="rating">
                                                                                <li>
                                                                                    <i data-feather="star"
                                                                                       className="fill"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star"
                                                                                       className="fill"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star"
                                                                                       className="fill"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star"
                                                                                       className="fill"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star"></i>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li>

                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Sold By : </h6>
                                                                        <h5>Fresho</h5>
                                                                    </div>
                                                                </li>

                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Quantity : </h6>
                                                                        <h5>250 G</h5>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="order-box dashboard-bg-box">
                                                    <div className="order-container">
                                                        <div className="order-icon">
                                                            <i data-feather="box"></i>
                                                        </div>

                                                        <div className="order-detail">
                                                            <h4>Delivere <span>Panding</span></h4>
                                                            <h6 className="text-content">Cheesy grin boursin cheesy grin
                                                                cheesecake
                                                                blue castello cream cheese lancashire melted
                                                                cheese.</h6>
                                                        </div>
                                                    </div>

                                                    <div className="product-order-detail">
                                                        <a href="product-left-thumbnail.html" className="order-image">
                                                            <img src="../assets/images/vegetable/product/3.png" alt=""
                                                                 className="blur-up lazyload"/>
                                                        </a>

                                                        <div className="order-wrap">
                                                            <a href="product-left-thumbnail.html">
                                                                <h3>Peanut Butter Bite Premium Butter Cookies 600 g</h3>
                                                            </a>
                                                            <p className="text-content">Cow bavarian bergkase mascarpone
                                                                paneer
                                                                squirty cheese fromage frais cheese slices when the
                                                                cheese
                                                                comes
                                                                out everybody's happy.</p>
                                                            <ul className="product-size">
                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Price : </h6>
                                                                        <h5>$20.68</h5>
                                                                    </div>
                                                                </li>

                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Rate : </h6>
                                                                        <div className="product-rating ms-2">
                                                                            <ul className="rating">
                                                                                <li>
                                                                                    <i data-feather="star"
                                                                                       className="fill"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star"
                                                                                       className="fill"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star"
                                                                                       className="fill"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star"
                                                                                       className="fill"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star"></i>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li>

                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Sold By : </h6>
                                                                        <h5>Fresho</h5>
                                                                    </div>
                                                                </li>

                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Quantity : </h6>
                                                                        <h5>250 G</h5>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="order-box dashboard-bg-box">
                                                    <div className="order-container">
                                                        <div className="order-icon">
                                                            <i data-feather="box"></i>
                                                        </div>

                                                        <div className="order-detail">
                                                            <h4>Delivered <span className="success-bg">Success</span>
                                                            </h4>
                                                            <h6 className="text-content">Caerphilly port-salut parmesan
                                                                pecorino
                                                                croque monsieur dolcelatte melted cheese cheese and
                                                                wine.</h6>
                                                        </div>
                                                    </div>

                                                    <div className="product-order-detail">
                                                        <a href="product-left-thumbnail.html" className="order-image">
                                                            <img src="../assets/images/vegetable/product/4.png"
                                                                 className="blur-up lazyload" alt=""/>
                                                        </a>

                                                        <div className="order-wrap">
                                                            <a href="product-left-thumbnail.html">
                                                                <h3>SnackAmor Combo Pack of Jowar Stick and Jowar
                                                                    Chips</h3>
                                                            </a>
                                                            <p className="text-content">The big cheese cream cheese
                                                                pepper
                                                                jack
                                                                cheese slices danish fontina everyone loves cheese on
                                                                toast
                                                                bavarian bergkase.</p>
                                                            <ul className="product-size">
                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Price : </h6>
                                                                        <h5>$20.68</h5>
                                                                    </div>
                                                                </li>

                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Rate : </h6>
                                                                        <div className="product-rating ms-2">
                                                                            <ul className="rating">
                                                                                <li>
                                                                                    <i data-feather="star"
                                                                                       className="fill"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star"
                                                                                       className="fill"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star"
                                                                                       className="fill"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star"
                                                                                       className="fill"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star"></i>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li>

                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Sold By : </h6>
                                                                        <h5>Fresho</h5>
                                                                    </div>
                                                                </li>

                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Quantity : </h6>
                                                                        <h5>250 G</h5>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="tab-pane fade show" id="pills-card" role="tabpanel"
                                         aria-labelledby="pills-card-tab">
                                        <div className="dashboard-card">
                                            <div className="title title-flex">
                                                <div>
                                                    <h2>My Card Details</h2>
                                                    <span className="title-leaf">
                                                <svg className="icon-width bg-gray">
                                                    {/*<use*/}
                                                    {/*    xlink:href="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use>*/}
                                                </svg>
                                            </span>
                                                </div>

                                                <button
                                                    className="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3"
                                                    data-bs-toggle="modal" data-bs-target="#editCard"><i
                                                    data-feather="plus"
                                                    className="me-2"></i> Add
                                                    New Card
                                                </button>
                                            </div>

                                            <div className="row g-4">
                                                <div className="col-xxl-4 col-xl-6 col-lg-12 col-sm-6">
                                                    <div className="payment-card-detail">
                                                        <div className="card-details">
                                                            <div className="card-number">
                                                                <h4>XXXX - XXXX - XXXX - 2548</h4>
                                                            </div>

                                                            <div className="valid-detail">
                                                                <div className="title">
                                                                    <span>valid</span>
                                                                    <span>thru</span>
                                                                </div>
                                                                <div className="date">
                                                                    <h3>08/05</h3>
                                                                </div>
                                                                <div className="primary">
                                                                <span
                                                                    className="badge bg-pill badge-light">primary</span>
                                                                </div>
                                                            </div>

                                                            <div className="name-detail">
                                                                <div className="name">
                                                                    <h5>Audrey Carol</h5>
                                                                </div>
                                                                <div className="card-img">
                                                                    <img src="../assets/images/payment-icon/1.jpg"
                                                                         className="img-fluid blur-up lazyloaded"
                                                                         alt=""/>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="edit-card">
                                                            <a data-bs-toggle="modal" data-bs-target="#editCard"
                                                               href="javascript:void(0)"><i
                                                                className="far fa-edit"></i> edit</a>
                                                            <a href="javascript:void(0)" data-bs-toggle="modal"
                                                               data-bs-target="#removeProfile"><i
                                                                className="far fa-minus-square"></i> delete</a>
                                                        </div>
                                                    </div>

                                                    <div className="edit-card-mobile">
                                                        <a data-bs-toggle="modal" data-bs-target="#editCard"
                                                           href="javascript:void(0)"><i
                                                            className="far fa-edit"></i> edit</a>
                                                        <a href="javascript:void(0)"><i
                                                            className="far fa-minus-square"></i>
                                                            delete</a>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-4 col-xl-6 col-lg-12 col-sm-6">
                                                    <div className="payment-card-detail">
                                                        <div className="card-details card-visa">
                                                            <div className="card-number">
                                                                <h4>XXXX - XXXX - XXXX - 1536</h4>
                                                            </div>

                                                            <div className="valid-detail">
                                                                <div className="title">
                                                                    <span>valid</span>
                                                                    <span>thru</span>
                                                                </div>
                                                                <div className="date">
                                                                    <h3>12/23</h3>
                                                                </div>
                                                                <div className="primary">
                                                                <span
                                                                    className="badge bg-pill badge-light">primary</span>
                                                                </div>
                                                            </div>

                                                            <div className="name-detail">
                                                                <div className="name">
                                                                    <h5>Leah Heather</h5>
                                                                </div>
                                                                <div className="card-img">
                                                                    <img src="../assets/images/payment-icon/2.jpg"
                                                                         className="img-fluid blur-up lazyloaded"
                                                                         alt=""/>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="edit-card">
                                                            <a data-bs-toggle="modal" data-bs-target="#editCard"
                                                               href="javascript:void(0)"><i
                                                                className="far fa-edit"></i> edit</a>
                                                            <a href="javascript:void(0)" data-bs-toggle="modal"
                                                               data-bs-target="#removeProfile"><i
                                                                className="far fa-minus-square"></i> delete</a>
                                                        </div>
                                                    </div>

                                                    <div className="edit-card-mobile">
                                                        <a data-bs-toggle="modal" data-bs-target="#editCard"
                                                           href="javascript:void(0)"><i
                                                            className="far fa-edit"></i> edit</a>
                                                        <a href="javascript:void(0)"><i
                                                            className="far fa-minus-square"></i>
                                                            delete</a>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-4 col-xl-6 col-lg-12 col-sm-6">
                                                    <div className="payment-card-detail">
                                                        <div className="card-details dabit-card">
                                                            <div className="card-number">
                                                                <h4>XXXX - XXXX - XXXX - 1366</h4>
                                                            </div>

                                                            <div className="valid-detail">
                                                                <div className="title">
                                                                    <span>valid</span>
                                                                    <span>thru</span>
                                                                </div>
                                                                <div className="date">
                                                                    <h3>05/21</h3>
                                                                </div>
                                                                <div className="primary">
                                                                <span
                                                                    className="badge bg-pill badge-light">primary</span>
                                                                </div>
                                                            </div>

                                                            <div className="name-detail">
                                                                <div className="name">
                                                                    <h5>mark jecno</h5>
                                                                </div>
                                                                <div className="card-img">
                                                                    <img src="../assets/images/payment-icon/3.jpg"
                                                                         className="img-fluid blur-up lazyloaded"
                                                                         alt=""/>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="edit-card">
                                                            <a data-bs-toggle="modal" data-bs-target="#editCard"
                                                               href="javascript:void(0)"><i
                                                                className="far fa-edit"></i> edit</a>
                                                            <a href="javascript:void(0)" data-bs-toggle="modal"
                                                               data-bs-target="#removeProfile"><i
                                                                className="far fa-minus-square"></i> delete</a>
                                                        </div>
                                                    </div>

                                                    <div className="edit-card-mobile">
                                                        <a data-bs-toggle="modal" data-bs-target="#editCard"
                                                           href="javascript:void(0)"><i
                                                            className="far fa-edit"></i> edit</a>
                                                        <a href="javascript:void(0)"><i
                                                            className="far fa-minus-square"></i>
                                                            delete</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade show" id="pills-profile" role="tabpanel"
                                         aria-labelledby="pills-profile-tab">
                                        <div className="dashboard-profile">
                                            <div className="title">
                                                <h2>My Profile</h2>
                                                <span className="title-leaf">
                                            <svg className="icon-width bg-gray">
                                                {/*<use*/}
                                                {/*    xlink:href="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use>*/}
                                            </svg>
                                        </span>
                                            </div>

                                            <div className="profile-detail dashboard-bg-box">
                                                <div className="dashboard-title">
                                                    <h3>Profile Name</h3>
                                                </div>
                                                <div className="profile-name-detail">
                                                    <div className="d-sm-flex align-items-center d-block">
                                                        <h3>{profile && profile.username}</h3>
                                                        <div className="product-rating profile-rating">
                                                            <ul className="rating">
                                                                <li>
                                                                    <i data-feather="star" className="fill"></i>
                                                                </li>
                                                                <li>
                                                                    <i data-feather="star" className="fill"></i>
                                                                </li>
                                                                <li>
                                                                    <i data-feather="star" className="fill"></i>
                                                                </li>
                                                                <li>
                                                                    <i data-feather="star"></i>
                                                                </li>
                                                                <li>
                                                                    <i data-feather="star"></i>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <Link to="/edit_me"
                                                          // data-bs-toggle="modal"
                                                       data-bs-target="#editProfile">Edit</Link>
                                                </div>

                                                <div className="location-profile">
                                                    <ul>
                                                        <li>
                                                            <div className="location-box">
                                                                <i data-feather="map-pin"></i>
                                                                <h6>Email:</h6>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="location-box">
                                                                <i data-feather="mail"/>
                                                                <h6>{profile && profile.email}</h6>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            {/*<div className="location-box">*/}
                                                            {/*    <i data-feather="check-square"/>*/}
                                                            {/*    <h6>Licensed for 2 years</h6>*/}
                                                            {/*</div>*/}
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="profile-description">
                                                    <p>Residences can be classified by and how they are connected to
                                                        neighbouring residences and land. Different types of housing
                                                        tenure
                                                        can
                                                        be used for the same physical type.</p>
                                                </div>
                                            </div>

                                            <div className="profile-about dashboard-bg-box">
                                                <div className="row">
                                                    <div className="col-xxl-7">
                                                        <div className="dashboard-title mb-3">
                                                            <h3>Profile About</h3>
                                                        </div>

                                                        <div className="table-responsive">
                                                            <table className="table">
                                                                <tbody>
                                                                {/*<tr>*/}
                                                                {/*    <td>Gender :</td>*/}
                                                                {/*    <td>Female</td>*/}
                                                                {/*</tr>*/}
                                                                {/*<tr>*/}
                                                                {/*    <td>Birthday :</td>*/}
                                                                {/*    <td>21/05/1997</td>*/}
                                                                {/*</tr>*/}
                                                                <tr>
                                                                    <td>Phone Number :</td>
                                                                    <td>
                                                                        <a href="javascript:void(0)"> {profile && profile.phone}</a>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Address :</td>
                                                                    <td>{profile && profile.postal}</td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                        <div className="dashboard-title mb-3">
                                                            <h3>Login Details</h3>
                                                        </div>

                                                        <div className="table-responsive">
                                                            <table className="table">
                                                                <tbody>
                                                                <tr>
                                                                    <td>Email :</td>
                                                                    <td>
                                                                        <a href="javascript:void(0)">{profile && profile.email}
                                                                            <span data-bs-toggle="modal"
                                                                                  data-bs-target="#editProfile">Edit</span></a>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Password :</td>
                                                                    <td>
                                                                        <a href="javascript:void(0)">●●●●●●
                                                                            <span data-bs-toggle="modal"
                                                                                  data-bs-target="#editPassword">Edit</span></a>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                                    <div className="col-xxl-5">
                                                        <div className="profile-image">
                                                            <img src="../assets/images/inner-page/dashboard-profile.png"
                                                                 className="img-fluid blur-up lazyload" alt=""/>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade show" id="pills-security" role="tabpanel"
                                         aria-labelledby="pills-security-tab">
                                        <div className="dashboard-privacy">
                                            <div className="dashboard-bg-box">
                                                <div className="dashboard-title mb-4">
                                                    <h3>Privacy</h3>
                                                </div>

                                                <div className="privacy-box">
                                                    <div className="d-flex align-items-start">
                                                        <h6>Allows others to see my profile</h6>
                                                        <div className="form-check form-switch switch-radio ms-auto">
                                                            <input className="form-check-input" type="checkbox"
                                                                   role="switch"
                                                                   id="redio" aria-checked="false"/>
                                                            <label className="form-check-label" htmlFor="redio"/>
                                                        </div>
                                                    </div>

                                                    <p className="text-content">all peoples will be able to see my
                                                        profile</p>
                                                </div>

                                                <div className="privacy-box">
                                                    <div className="d-flex align-items-start">
                                                        <h6>who has save this profile only that people see my
                                                            profile</h6>
                                                        <div className="form-check form-switch switch-radio ms-auto">
                                                            <input className="form-check-input" type="checkbox"
                                                                   role="switch"
                                                                   id="redio2" aria-checked="false"/>
                                                            <label className="form-check-label"
                                                                   htmlFor="redio2"/>
                                                        </div>
                                                    </div>

                                                    <p className="text-content">all peoples will not be able to see my
                                                        profile</p>
                                                </div>

                                                <button
                                                    className="btn theme-bg-color btn-md fw-bold mt-4 text-white">Save
                                                    Changes
                                                </button>
                                            </div>

                                            <div className="dashboard-bg-box mt-4">
                                                <div className="dashboard-title mb-4">
                                                    <h3>Account settings</h3>
                                                </div>

                                                <div className="privacy-box">
                                                    <div className="d-flex align-items-start">
                                                        <h6>Deleting Your Account Will Permanently</h6>
                                                        <div className="form-check form-switch switch-radio ms-auto">
                                                            <input className="form-check-input" type="checkbox"
                                                                   role="switch"
                                                                   id="redio3" aria-checked="false"/>
                                                            <label className="form-check-label"
                                                                   htmlFor="redio3"></label>
                                                        </div>
                                                    </div>
                                                    <p className="text-content">Once your account is deleted, you will
                                                        be
                                                        logged out
                                                        and will be unable to log in back.</p>
                                                </div>

                                                <div className="privacy-box">
                                                    <div className="d-flex align-items-start">
                                                        <h6>Deleting Your Account Will Temporary</h6>
                                                        <div className="form-check form-switch switch-radio ms-auto">
                                                            <input className="form-check-input" type="checkbox"
                                                                   role="switch"
                                                                   id="redio4" aria-checked="false"/>
                                                            <label className="form-check-label"
                                                                   htmlFor="redio4"></label>
                                                        </div>
                                                    </div>

                                                    <p className="text-content">Once your account is deleted, you will
                                                        be
                                                        logged out
                                                        and you will be create new account</p>
                                                </div>

                                                <button
                                                    className="btn theme-bg-color btn-md fw-bold mt-4 text-white">Delete
                                                    My
                                                    Account
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade theme-modal" id="editProfile" tabIndex="-1"
                     aria-labelledby="exampleModalLabel2"
                     aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel2">Edit Profile</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-4">
                                    <div className="col-xxl-12">
                                        <form>
                                            <div className="form-floating theme-form-floating">
                                                <input type="text" className="form-control" id="pname"
                                                       value="Jack Jennas" />
                                                    <label htmlFor="pname">Full Name</label>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="col-xxl-6">
                                        <form>
                                            <div className="form-floating theme-form-floating">
                                                <input type="email" className="form-control" id="email1"
                                                       value="vicki.pope@gmail.com"/>
                                                    <label htmlFor="email1">Email address</label>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="col-xxl-6">
                                        <form>
                                            <div className="form-floating theme-form-floating">
                                                <input className="form-control" type="tel" value="4567891234"
                                                       name="mobile" id="mobile"
                                                       maxLength="10" onInput="javascript: if (this.value.length > this.maxLength) this.value =
                                            this.value.slice(0, this.maxLength);"/>
                                                    <label htmlFor="mobile">Email address</label>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="col-12">
                                        <form>
                                            <div className="form-floating theme-form-floating">
                                                <input type="text" className="form-control" id="address1"
                                                       value="8424 James Lane South San Francisco"/>
                                                    <label htmlFor="address1">Add Address</label>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="col-12">
                                        <form>
                                            <div className="form-floating theme-form-floating">
                                                <input type="text" className="form-control" id="address2"
                                                       value="CA 94080"/>
                                                    <label htmlFor="address2">Add Address 2</label>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="col-xxl-4">
                                        <form>
                                            <div className="form-floating theme-form-floating">
                                                <select className="form-select" id="floatingSelect1"
                                                        aria-label="Floating label select example">
                                                    <option selected>Choose Your Country</option>
                                                    <option value="kindom">United Kingdom</option>
                                                    <option value="states">United States</option>
                                                    <option value="fra">France</option>
                                                    <option value="china">China</option>
                                                    <option value="spain">Spain</option>
                                                    <option value="italy">Italy</option>
                                                    <option value="turkey">Turkey</option>
                                                    <option value="germany">Germany</option>
                                                    <option value="russian">Russian Federation</option>
                                                    <option value="malay">Malaysia</option>
                                                    <option value="mexico">Mexico</option>
                                                    <option value="austria">Austria</option>
                                                    <option value="hong">Hong Kong SAR, China</option>
                                                    <option value="ukraine">Ukraine</option>
                                                    <option value="thailand">Thailand</option>
                                                    <option value="saudi">Saudi Arabia</option>
                                                    <option value="canada">Canada</option>
                                                    <option value="singa">Singapore</option>
                                                </select>
                                                <label htmlFor="floatingSelect">Country</label>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="col-xxl-4">
                                        <form>
                                            <div className="form-floating theme-form-floating">
                                                <select className="form-select" id="floatingSelect">
                                                    <option selected>Choose Your City</option>
                                                    <option value="kindom">India</option>
                                                    <option value="states">Canada</option>
                                                    <option value="fra">Dubai</option>
                                                    <option value="china">Los Angeles</option>
                                                    <option value="spain">Thailand</option>
                                                </select>
                                                <label htmlFor="floatingSelect">City</label>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="col-xxl-4">
                                        <form>
                                            <div className="form-floating theme-form-floating">
                                                <input type="text" className="form-control" id="address3" value="94080" />
                                                    <label htmlFor="address3">Pin Code</label>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-animation btn-md fw-bold"
                                        data-bs-dismiss="modal">Close
                                </button>
                                <button type="button" data-bs-dismiss="modal"
                                        className="btn theme-bg-color btn-md fw-bold text-light">Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade theme-modal" id="editPassword" tabIndex="-1"
                     aria-labelledby="exampleModalLabel2"
                     aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel2">Edit Password</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-4">
                                    <div className="col-xxl-10">
                                            <div className="form-floating theme-form-floating">
                                                <input type={showOldPass ? 'text' : 'password'} className="form-control" id="pname" disabled={passValid!==null} value={oldPass} onChange={oldPassOnChange}/>
                                                <label htmlFor="pname">your Password</label>
                                            </div>
                                    </div>
                                    <div className="col-xxl-2">
                                        <div className="form-floating theme-form-floating">
                                            <button onClick={handleToggleClick} className={showOldPass ? 'form-control btn btn-outline-danger' : 'form-control btn btn-outline-success'}>
                                                {showOldPass ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                    </div>

                                    {passValid?
                                        <>
                                            <div className="col-xxl-10">
                                                <div className="form-floating theme-form-floating">
                                                    <input type={showNewPass ? 'text' : 'password'} className="form-control" id="newPass" value={newPass} onChange={newPassOnChange}/>
                                                    <label htmlFor="address1" >New Password</label>
                                                </div>
                                            </div>
                                            <div className="col-xxl-2">
                                                <div className="form-floating theme-form-floating">
                                                    <button onClick={handleNewToggleClick} className={showNewPass ? 'form-control btn btn-outline-danger' : 'form-control btn btn-outline-success'}>
                                                        {showNewPass ? 'Hide' : 'Show'}
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        ""
                                    }
                                    {passError?
                                        <div style={{textAlign:'left', color:'orangered'}}>
                                            {passError}
                                        </div>
                                    :
                                    ""}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-animation btn-md fw-bold"
                                        data-bs-dismiss="modal">Close
                                </button>
                                <button type="button" data-bs-dismiss="modal"
                                        className="btn theme-bg-color btn-md fw-bold text-light"
                                        onClick={handleChangePass}
                                >Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>


        }
    </div>
};


