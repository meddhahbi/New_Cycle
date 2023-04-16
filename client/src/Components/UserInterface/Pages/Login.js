import React, {useEffect} from 'react';
import { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import styles from "./style/styles.module.css"
import LoadingPage from "../../Loading";
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../../AuthGuard';


export default function Login(){

    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });
   const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        setTimeout(()=>setIsLoading(false), 1500);
    })
   const handleChange = ({ currentTarget: input }) => {
      setData({ ...data, [input.name]: input.value });
   };
    // const [profile, setProfile] = useState(null);
    // const getData= async ()=>{
    //     const url = "http://localhost:3001/me/" + localStorage.getItem("mail");
    //     const response = await fetch(url);
    //     const json = await response.json();
    //     const user = json.user;
    //     console.log(user);
    //     if(response.ok){
    //         setProfile(user);
    //     }
    // }
    // getData()
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const url = "http://localhost:3001/login";
         console.log(url)
            // console.log("data",data)
         const { data: res } = await axios.post(url, data);
            // console.log(res.token[0])
         
            if(res.token[1]==="err"){
                localStorage.setItem("error", res.token[0]);
                setError(res.token[0]);
                console.log(error);
            }
            else{
                console.log(res)
                console.log(res.token[0])
                localStorage.removeItem("error");
                localStorage.setItem("token", res.token[0]);
                localStorage.setItem("mail", res.token[3]);
                localStorage.setItem("role", res.token[2]);
                if(res.token[2]==="client"){
                    window.location = "/";
                    // navigate('/',{replace:true, state: { profile: profile }});
                }
                else if(res.token[2]==="admin"){
                    window.location = "/admin";
                }
            }
         
         // console.log(res.role)
      } catch (error) {
         // if (
         //     error.response &&
         //     error.response.status >= 400 &&
         //     error.response.status <= 500
         // ) {
                
            // console.log(error)
            //     // console.log(res);
         //     setError(error.response.data.message);
            //     console.log("err: ",error.response.data.message);
         // }
      }
   };

    return !isLoggedIn() ? (<div>
        {isLoading ? <LoadingPage/> :
            <div>
                <section className="breadscrumb-section pt-0">
                    <div className="container-fluid-lg">
                        <div className="row">
                            <div className="col-12">
                                <div className="breadscrumb-contain">
                                    <h2 className="mb-2">Log In</h2>
                                    <nav>
                                        <ol className="breadcrumb mb-0">
                                            <li className="breadcrumb-item">
                                                <a href="index.html">
                                                    <i className="fa-solid fa-house"/>
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item active">Log In</li>
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
                                    <img src="../../../../assets/User/images/inner-page/log-in.png"
                                         className="img-fluid"
                                         alt=""/>
                                </div>
                            </div>

                            <div className="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                    <div className="container-fluid">
                                        <div className="collapse navbar-collapse" id="navbarNav">
                                            <ul className="navbar-nav">
                                                <li className="nav-item">
                                                    <a className="nav-link active">
                                                        <Link to="/login">Client</Link>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link">
                                                        <Link to="/loginAssociation">Association</Link>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                                <div className="log-in-box">
                                    <div className="log-in-title">
                                        <h3>Welcome To NewCycle</h3>
                                        <h4>Log In Your Account ( As a client )</h4>
                                    </div>

                                    <div className="input-box">
                                        <form className="row g-4" onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                <div className="form-floating theme-form-floating log-in-form">

                                                    <input type="email" name="email" className="form-control" id="email"
                                                           onChange={handleChange} placeholder="Email Address"/>
                                                    <label htmlFor="email">Email Address</label>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-floating theme-form-floating log-in-form">
                                                    <input type="password" name="password" className="form-control"
                                                           id="password" onChange={handleChange}
                                                           placeholder="Password"/>
                                                    <label htmlFor="password">Password</label>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                {error && <div className={styles.error_msg}>{error}</div>}
                                                <div className="forgot-box">
                                                    <div className="form-check ps-0 m-0 remember-box">
                                                        <input className="checkbox_animated check-box" type="checkbox"
                                                               id="flexCheckDefault"/>
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">Remember
                                                            me</label>
                                                    </div>

                                                    <Link className="forgot-password" to="/forgot">Forgot
                                                        Password?</Link>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <button className="btn btn-animation w-100 justify-content-center"
                                                        type="submit">Log
                                                    In
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="other-log-in">
                                        <h6>or</h6>
                                    </div>

                                    <div className="log-in-button">
                                        <ul>
                                            <li>
                                                <a href="https://www.google.com/" className="btn google-button w-100">
                                                    <img src="../../../../assets/User/images/inner-page/google.png"
                                                         className="lazyload"
                                                         alt=""/> Log In with Google
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://www.facebook.com/" className="btn google-button w-100">
                                                    <img src="../../../../assets/User/images/inner-page/facebook.png"
                                                         className="lazyload"
                                                         alt=""/> Log In with Facebook
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
  </div>):(
    <Navigate to={"/"} />
  )
}
