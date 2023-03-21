import React, {useEffect, useState} from 'react';
import LoadingPage from "../../Loading";
import inputStyle from "./style/profileForm.css";
import axios from "axios";

const ProfileForm = () => {
    const [username, setUsername]=useState(null);
    // const [password, setPassword]=useState(null);
    const [phone, setPhone]=useState(null);
    const [postal, setPostal]=useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [data, setData] = useState({ username: "", phone: 0, postal:0});

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    const getData = async ()=>{
        const url = "http://localhost:3001/me/" + localStorage.getItem("mail");
        const response = await fetch(url);
        const json = await response.json();
        const user = json.user;
        // console.log(user);
        if(response.ok){
            setProfile(user);
        }

        if(isLoading === true){

            setUsername(profile.username)
            setPostal(profile.postal)
            setPhone(profile.phone)

            data.postal = profile.postal
            data.phone = profile.phone
            data.username = profile.username
        }
    }
    useEffect(()=>{
        if(isLoading === true){
            getData()
            setTimeout(()=> {
                setIsLoading(false)
            }, 1500);
            // console.log(data)
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:3001/client/me/update/"+localStorage.getItem("mail");
            console.log(url)
            console.log("data",data)
            const res = await axios.put(url, data);
            console.log(res);
            console.log(data)
            // window.location = "/"
        } catch (e) {
            console.log(e)
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
                                                                   placeholder="Enter Your Userame" defaultValue={username} onChange={handleChange} />
                                                            <i className="fa-solid fa-user"/>
                                                        </div>
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
                                                                   placeholder="Enter Your Phone Number" defaultValue={phone} onChange={handleChange} />
                                                            <i className="fa-solid fa-phone" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-6 col-lg-12 col-sm-6 input-style">
                                                    <div className="mb-md-4 mb-3 custom-form">
                                                        <label htmlFor="exampleFormControlInput3" className="form-label">Postal Code</label>
                                                        <div className="custom-input">
                                                            <input type="number" className="form-control" id="exampleFormControlInput3"
                                                                   placeholder="Enter Your Postal Code" maxLength="10" name="postal"
                                                                   defaultValue={postal} onChange={handleChange} />
                                                            <i className="fa fa-map-marker"/>
                                                        </div>
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
