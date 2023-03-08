

import { Link } from "react-router-dom";


export default function Login(){
    return <div>


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
                            <form className="row g-4">
                                <div className="col-12">
                                    <div className="form-floating theme-form-floating log-in-form">
                                        <input type="email" className="form-control" id="email" placeholder="Email Address" />
                                        <label for="email">Email Address</label>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-floating theme-form-floating log-in-form">
                                        <input type="password" className="form-control" id="password"
                                            placeholder="Password" />
                                        <label for="password">Password</label>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="forgot-box">
                                        <div className="form-check ps-0 m-0 remember-box">
                                            <input className="checkbox_animated check-box" type="checkbox"
                                                id="flexCheckDefault" />
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
                                    <a href="https://www.google.com/" className="btn google-button w-100">
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