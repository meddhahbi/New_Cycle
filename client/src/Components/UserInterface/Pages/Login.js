import React from 'react';
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./style/styles.module.css"


export default function Login(){
    const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:3001/login";
			console.log(url)
            // console.log("data",data)
			const { data: res } = await axios.post(url, data);
            // console.log(res.token[0])
			
            if(res.token[1]=="err"){
                localStorage.setItem("error", res.token[0]);
                setError(res.token[0]);
                console.log(error);
            }
            // else if(res.token[1]=="err_pass"){
            //     console.log(res.token[0])
            //     localStorage.setItem("error", res.token[0]);
            //     setError(res.token[0]);
            //     console.log(error);
            // }else if(res.token[1]=="err_check"){
            //     localStorage.setItem("error", res.token[0]);
            //     setError(res.token[0]);
            //     console.log(error);
            // }
            else{
                console.log(res)
                console.log(res.token[0])
                localStorage.setItem("token", res.token[0]);
                if(res.token[2]==="client"){
                    window.location = "/";
                }
                else if(res.token[2]==="admin"){
                    window.location = "/admin";
                }
            }
			
			// console.log(res.role)
		} catch (error) {
			// if (
			// 	error.response &&
			// 	error.response.status >= 400 &&
			// 	error.response.status <= 500
			// ) {
                
            // console.log(error)
            //     // console.log(res);
			// 	setError(error.response.data.message);
            //     console.log("err: ",error.response.data.message);
			// }
		}
	};
    return <div>
    {/* <div class="fullpage-loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div> */}

<section class="breadscrumb-section pt-0">
        <div class="container-fluid-lg">
            <div class="row">
                <div class="col-12">
                    <div class="breadscrumb-contain">
                        <h2 class="mb-2">Log In</h2>
                        <nav>
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item">
                                    <a href="index.html">
                                        <i class="fa-solid fa-house"></i>
                                    </a>
                                </li>
                                <li class="breadcrumb-item active">Log In</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </section>




        
    <section className="log-in-section background-image-2 section-b-space">
        <div className="container-fluid-lg w-100">
            <div className="row">
                <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
                    <div className="image-contain">
                        <img src="../../../../assets/User/images/inner-page/log-in.png" className="img-fluid" alt="" />
                    </div>
                </div>

                <div className="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
                    <div className="log-in-box">
                        <div className="log-in-title">
                            <h3>Welcome To Fastkart</h3>
                            <h4>Log In Your Account</h4>
                        </div>

                        <div className="input-box">
                            <form className="row g-4" onSubmit={handleSubmit}>
                                <div className="col-12">
                                    <div className="form-floating theme-form-floating log-in-form">

                                        <input type="email" name="email" className="form-control" id="email" onChange={handleChange} placeholder="Email Address" />
                                        <label for="email">Email Address</label>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-floating theme-form-floating log-in-form">
                                        <input type="password" name="password" className="form-control" id="password" onChange={handleChange}
                                            placeholder="Password" />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </div>

                                <div className="col-12">
                                    {error && <div className={styles.error_msg}>{error}</div>}
                                    <div className="forgot-box">
                                        <div className="form-check ps-0 m-0 remember-box">
                                            <input className="checkbox_animated check-box" type="checkbox"
                                                id="flexCheckDefault"/>
                                            <label className="form-check-label" for="flexCheckDefault">Remember me</label>
                                        </div>
                                    
                                        <Link className="forgot-password" to="/forgot">Forgot Password?</Link>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <button className="btn btn-animation w-100 justify-content-center" type="submit">Log
                                        In</button>
                                </div>
                            </form>
                        </div>

                        <div className="other-log-in">
                            <h6>or</h6>
                        </div>

                        <div className="log-in-button">
                            <ul>
                                <li>
                                    <a href="http://localhost:3001/auth/google" className="btn google-button w-100">
                                        <img src="../../../../assets/User/images/inner-page/google.png" className="lazyload"
                                            alt="" /> Log In with Google
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/" className="btn google-button w-100">
                                        <img src="../../../../assets/User/images/inner-page/facebook.png" className="lazyload"
                                            alt="" /> Log In with Facebook
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="other-log-in">
                            <h6></h6>
                        </div>

                        <div className="sign-up-box">
                            <h4>Don't have an account?</h4>
                            <a href="sign-up.html">Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    </div>
}