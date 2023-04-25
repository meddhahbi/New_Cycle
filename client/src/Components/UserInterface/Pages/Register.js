import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, Navigate } from "react-router-dom";
import { isLoggedIn } from '../../../AuthGuard';
import LoadingPage from "../../Loading";
import React, {useEffect} from 'react';
import { useState } from "react";



export default function Register(){


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [postal, setPostal] = useState('');
    const [image, setImage] = useState("");


    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        setTimeout(()=>setIsLoading(false), 1500);
    })
    const [errors, setErrors] = useState(
        {
            username: '',
            email: '',
            password: '',
            phone: '',
            postal: '',
        }
    )



    const formValidation=()=>{

        let status=true;
        let localErrors={
            username: '',
            email: '',
            password: '',
            phone: '',
            postal: '',
           // ...errors
        }

        if(username==""){
            localErrors.username='Username is required';
            status=false;
        }

        if (email == "") {
            localErrors.email = 'Email is required or invalid format';
            status=false;
        }

        
        

        if(password=="" || password.length < 8){
            localErrors.password= 'Password is required and min 8 caracteres';
            status=false;
        }

        
        if (phone == "") {
            localErrors.phone = "Phone number is required or invalid format";
            status=false;
        } 
    

        if (postal == "") {
            localErrors.postal = "Postal code is required or invalid format";
            status=false;
        }


    

        setErrors(localErrors);
        console.log(localErrors);
        console.log(status);
        return status;

    }



    const register=(e)=>{
        e.preventDefault();
        console.log("form submitted");
        console.log("form data", username, email, password, phone, postal,image);


        //? Form valid
        if(formValidation()){

            // let img = image.split("uploads\\")[1]

            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('phone', phone);
            formData.append('postal', postal);
            formData.append('image', image);


            // const data = { 
            //     username,
            //     email,
            //     password,
            //     phone,
            //     postal 
            // };
            const url='http://localhost:3001/register'
            axios.post(url, formData)
            .then(response => {
                        console.log(response.data); // Handle response data
                        toast.success("User created successfuly...");
                        // setUsername('');
                        // setEmail('');
                        // setPassword('');
                        // setPhone('');
                        // setPostal('');
                        // setImage(null);
                    })
                    .catch(error => {
                        console.log("test");
                        console.error(error); // Handle error
                        toast.error("Failed...");
                    });
    



        }else{
            console.log("from invalid");
        }

    

        
    }





    return  !isLoggedIn() ? ( <div>
    {isLoading ? <LoadingPage/> : <div>
<section className="breadscrumb-section pt-0">
    <Toaster />
        <div className="container-fluid-lg">
            <div className="row">
                <div className="col-12">
                    <div className="breadscrumb-contain">
                        <h2 className="mb-2">Register</h2>
                        <nav>
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item">
                                    <a href="index.html">
                                        <i className="fa-solid fa-house"></i>
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

    <section className="log-in-section section-b-space">
        <div className="container-fluid-lg w-100">
            <div className="row">
                <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
                    <div className="image-contain">
                        <img src="../../../../assets/User/images/inner-page/sign-up.png" className="img-fluid" alt="" />
                    </div>
                </div>
                

                <div className="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
                   
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link active" >
                                                <Link to="/register">Client</Link>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" >
                                                <Link to="/registerAssociation">Association</Link>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                   
                   
                    <div className="log-in-box">
                        <div className="log-in-title">
                            <h3>Welcome To NewCycle</h3>
                            <h4>Create New Account ( i'm client )</h4>
                        </div>

                        <div className="input-box">
                            <form className="row g-4" onSubmit={register} >
                                <div className="col-12">
                                    <div className="form-floating theme-form-floating">
                                        <input type="text" className="form-control" id="username" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
                                        {
                                            errors.username!=""?<div style={{textAlign:'left', color:'orangered'}}>
                                                {errors.username}
                                                </div>:''
                                        }
                                        <label htmlFor="username">Username</label>
                                       

                                    

                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating theme-form-floating">
                                        <input type="email" className="form-control" id="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)}  />
                                        {
                                            errors.email!=""?<div style={{textAlign:'left', color:'orangered'}}>
                                                {errors.email}
                                                </div>:''
                                        }
                                         <label htmlFor="email">Email Address</label>
                                    
                                    </div>
                                
                                </div>

                                <div className="col-12">
                                    <div className="form-floating theme-form-floating">
                                        <input type="password" className="form-control" id="password"
                                            placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}  />
                                        {
                                            errors.password!=""?<div style={{textAlign:'left', color:'orangered'}}>
                                                {errors.password}
                                                </div>:''
                                        }
                                           <label htmlFor="password">Password</label>
                                       
                                    </div>
                                
                                </div>

                                <div className="col-12">
                                    <div className="form-floating theme-form-floating">
                                        <input type="number" className="form-control" id="phone"
                                            placeholder="Phone" name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                                        {
                                            errors.phone!=""?<div style={{textAlign:'left', color:'orangered'}}>
                                                {errors.phone}
                                                </div>:''
                                        }
                                         <label htmlFor="phone">Phone</label>
                                       
                                    </div>
                                </div>



                                <div className="col-12">
                                    <div className="form-floating theme-form-floating">
                                        <input type="number" className="form-control" id="postal"
                                            placeholder="Postal" name="postal" value={postal} onChange={(e)=>setPostal(e.target.value)} />
                                        {
                                            errors.postal!=""?<div style={{textAlign:'left', color:'orangered'}}>
                                                {errors.postal}
                                                </div>:''
                                        }
                                           <label htmlFor="postal">Postal</label>
                                      
                                    </div>
                                
                                </div>

                                <input type="file" accept="image/jpeg, image/png" onChange={(e) => setImage(e.target.files[0])} />

                                <div className="col-12">
                                    <div className="forgot-box">
                                        <div className="form-check ps-0 m-0 remember-box">
                                            <input className="checkbox_animated check-box" type="checkbox"
                                                id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">I agree with
                                                <span>Terms</span> and <span>Privacy</span></label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <button className="btn btn-animation w-100" type="submit">Sign Up</button>
                                </div>
                            </form>
                        </div>

                        <div className="other-log-in">
                            <h6>or</h6>
                        </div>

                        <div className="log-in-button">
                            <ul>
                                <li>
                                    <a href="http://localhost:3001/auth/google"
                                        className="btn google-button w-100">
                                        <img src="../../../../assets/User/images/inner-page/google.png" className="lazyload"
                                            alt="" />
                                        Sign up with Google
                                    </a>
                                </li>
                                <li>
                                    <a href="http://localhost:3001/auth/facebook/callback" className="btn google-button w-100">
                                        <img src="../../../../assets/User/images/inner-page/facebook.png" className="lazyload"
                                            alt="" /> Sign up with Facebook
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="other-log-in">
                            <h6></h6>
                        </div>

                        <div className="sign-up-box">
                            <h4>Already have an account?</h4>
                            <Link to="/login">Log In</Link>
                    
                        </div>
                    </div>
                </div>

                <div className="col-xxl-7 col-xl-6 col-lg-6"></div>
            </div>
        </div>
    </section>

    </div>
}
    </div>)
    :(
        <Navigate to={"/"} />
    )
}

