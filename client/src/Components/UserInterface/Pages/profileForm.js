import React, {useEffect, useState} from 'react';
import LoadingPage from "../../Loading";
import inputStyle from "./style/profileForm.css";
import axios from "axios";
import {useNavigate} from "react-router";

const ProfileForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [data, setData] = useState({ username: "", phone: 0, postal:0});
    const [errors, setErrors] = useState(
        {
            username: '',
            phone: '',
            postal: '',
        }
    )

    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    const getData = async ()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const url = "/me/" + localStorage.getItem("mail");
        const response = await fetch(url);
        const json = await response.json();
        const user = json.user;
    }
    useEffect(()=>{

        if(isLoading === true){
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            setProfile(userInfo);
            data.postal = userInfo.postal
            data.phone = userInfo.phone
            data.username = userInfo.username

            // const {user} = UserState();
            console.log("userInfo");

            if (!userInfo) {
                console.log("no user")
                // authMiddleware(navigate)
                navigate("/login",{});
            }
            else {
                getData().then(r => {
                    console.log(r)
                    setTimeout(()=> {
                        setIsLoading(false)
                    }, 1500);
                })

                // console.log(data)
            }
            setIsLoading(false)
        }
    })

    const formValidation=()=> {

        let status = true;
        let localErrors={
            username: '',
            phone: '',
            postal: '',
            all:''
            // ...errors
        }

        if(data.username===""){
            localErrors.username='Username is required';
            status=false;
        }
        else if(data.username.length>8){
            localErrors.username='Username must be at most 8 caracters';
            status=false;
        }
        else if(data.username.length<3 && data.username.length > 0){
            localErrors.username='Username must be at least 3 caracters';
            status=false;
        }

        if(data.phone===""){
            localErrors.username='Phone is required';
            status=false;
        }

        if(data.postal===""){
            localErrors.postal='Postal code is required';
            status=false;
        }

        if(data.username === profile.username && data.postal === profile.postal && data.phone === profile.phone){
            localErrors.all='None of the data is updated yet!';
            status=false;
        }
        setErrors(localErrors);
        return status
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formValidation()){
            try {
                const url = "/client/me/update/"+localStorage.getItem("mail");
                console.log("data",data)
                const res = await axios.put(url, data);
                console.log(res);
                window.location = "/me"
            } catch (e) {
                console.log(e)
            }
        }
    }
    return (
        <div>
            {isLoading ? <LoadingPage/> :
                <div>
                    <section className="breadscrumb-section pt-0">
                        <div className="container-fluid-lg">
                            <div className="row">
                                <div className="col-12">
                                    <div className="breadscrumb-contain">
                                        <h2>Update profile</h2>
                                        <nav>
                                            <ol className="breadcrumb mb-0">
                                                <li className="breadcrumb-item">
                                                    <a href="index.html">
                                                        <i className="fa-solid fa-house"></i>
                                                    </a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">Update profile</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="contact-box-section">
                        <div className="container-fluid-lg">
                            <div className="row g-lg-5 g-3">
                                <div className="col-lg-6">
                                    <div className="left-sidebar-box">
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="contact-image">
                                                    <img src="../../../../assets/User/images/inner-page/contact-us.png"
                                                         className="img-fluid blur-up lazyloaded" alt=""/>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <div className="contact-title">
                                                    <h3>Your Information:</h3>
                                                </div>

                                                <div className="contact-detail">
                                                    <div className="row g-4">
                                                        <div className="col-xxl-6 col-lg-12 col-sm-6">
                                                            <div className="contact-detail-box">
                                                                <div className="contact-icon">
                                                                    <i className="fa-solid fa-phone"/>
                                                                </div>
                                                                <div className="contact-detail-title">
                                                                    <h4>Phone</h4>
                                                                </div>

                                                                <div className="contact-detail-contain">
                                                                    <p>{profile.phone}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-xxl-6 col-lg-12 col-sm-6">
                                                            <div className="contact-detail-box">
                                                                <div className="contact-icon">
                                                                    <i className="fa-solid fa-envelope"></i>
                                                                </div>
                                                                <div className="contact-detail-title">
                                                                    <h4>Email</h4>
                                                                </div>

                                                                <div className="contact-detail-contain">
                                                                    <p>{profile.email}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-xxl-6 col-lg-12 col-sm-6">
                                                            <div className="contact-detail-box">
                                                                <div className="contact-icon">
                                                                    <i className="fa-solid fa-location-dot"></i>
                                                                </div>
                                                                <div className="contact-detail-title">
                                                                    <h4>Postal Code</h4>
                                                                </div>

                                                                <div className="contact-detail-contain">
                                                                    <p>{profile.postal}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/*<div className="col-xxl-6 col-lg-12 col-sm-6">*/}
                                                        {/*    <div className="contact-detail-box">*/}
                                                        {/*        <div className="contact-icon">*/}
                                                        {/*            <i className="fa-solid fa-building"></i>*/}
                                                        {/*        </div>*/}
                                                        {/*        <div className="contact-detail-title">*/}
                                                        {/*            <h4>Bournemouth Office</h4>*/}
                                                        {/*        </div>*/}

                                                        {/*        <div className="contact-detail-contain">*/}
                                                        {/*            <p>Visitación de la Encina 22</p>*/}
                                                        {/*        </div>*/}
                                                        {/*    </div>*/}
                                                        {/*</div>*/}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="title d-xxl-none d-block">
                                        <h2>Profile</h2>
                                    </div>
                                    <div className="right-sidebar-box">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-12 input-style">
                                                    <div className="mb-md-4 mb-3 custom-form">
                                                        <label htmlFor="exampleFormControlInput" className="form-label">Username</label>
                                                        <div className="custom-input">
                                                            <input type="text" className="form-control" id="exampleFormControlInput" name="username"
                                                                   placeholder="Enter Your Userame" defaultValue={data.username} onChange={handleChange} />

                                                            <i className="fa-solid fa-user"/>
                                                        </div>
                                                        {
                                                            errors.username!==""?<div style={{textAlign:'left', color:'orangered'}}>
                                                                {errors.username}
                                                            </div>:''
                                                        }
                                                    </div>
                                                </div>

                                                {/*<div className="col-xxl-6 col-lg-12 col-sm-6">*/}
                                                {/*    <div className="mb-md-4 mb-3 custom-form">*/}
                                                {/*        <label htmlFor="exampleFormControlInput1" className="form-label">Last*/}
                                                {/*            Name</label>*/}
                                                {/*        <div className="custom-input">*/}
                                                {/*            <input type="text" className="form-control"*/}
                                                {/*                   id="exampleFormControlInput1"*/}
                                                {/*                   placeholder="Enter Last Name"/>*/}
                                                {/*            <i className="fa-solid fa-user"></i>*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}

                                                <div className="col-xxl-6 col-lg-12 col-sm-6">
                                                    <div className="mb-md-4 mb-3 custom-form">
                                                        <label htmlFor="exampleFormControlInput2" className="form-label">Phone Number</label>
                                                        <div className="custom-input">
                                                            <input type="number" className="form-control"
                                                                   id="exampleFormControlInput2" name="phone"
                                                                   placeholder="Enter Your Phone Number" defaultValue={data.phone} onChange={handleChange} />

                                                            <i className="fa-solid fa-phone" />
                                                        </div>
                                                        {
                                                            errors.phone!==""?<div style={{textAlign:'left', color:'orangered'}}>
                                                                {errors.phone}
                                                            </div>:''
                                                        }
                                                    </div>
                                                </div>

                                                <div className="col-xxl-6 col-lg-12 col-sm-6 input-style">
                                                    <div className="mb-md-4 mb-3 custom-form">
                                                        <label htmlFor="exampleFormControlInput3" className="form-label">Postal Code</label>
                                                        <div className="custom-input">
                                                            <input type="number" className="form-control" id="exampleFormControlInput3"
                                                                   placeholder="Enter Your Postal Code" maxLength="10" name="postal"
                                                                   defaultValue={data.postal} onChange={handleChange} />

                                                            <i className="fa fa-map-marker"/>
                                                        </div>
                                                        {
                                                            errors.postal!==""?<div style={{textAlign:'left', color:'orangered'}}>
                                                                {errors.postal}
                                                            </div>:''
                                                        }
                                                    </div>
                                                </div>

                                                {/*    <div className="col-12">*/}
                                                {/*        <div className="mb-md-4 mb-3 custom-form">*/}
                                                {/*            <label htmlFor="exampleFormControlTextarea"*/}
                                                {/*                   className="form-label">Message</label>*/}
                                                {/*            <div className="custom-textarea">*/}
                                                {/*<textarea className="form-control" id="exampleFormControlTextarea"*/}
                                                {/*          placeholder="Enter Your Message" rows="6"/>*/}
                                                {/*                <i className="fa-solid fa-message"/>*/}
                                                {/*            </div>*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                            </div>


                                            {
                                                errors.all!==""?<div style={{textAlign:'left', color:'orangered'}}>
                                                    {errors.all}
                                                </div>:''
                                            }
                                            <button className="btn btn-animation btn-md fw-bold ms-auto">Update</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            }
        </div>

    );
};

export default ProfileForm;
