import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';




export default function Register(){


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [postal, setPostal] = useState('');

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
        console.log("form data", username, email, password, phone, postal);


        //? Form valid
        if(formValidation()){


            const data = { 
                username,
                email,
                password,
                phone,
                postal 
            };
            const url='http://localhost:3001/register'
            axios.post(url, data)
            .then(response => {
                        console.log(response.data); // Handle response data
                        toast.success("User created successfuly...");
                        setUsername('');
                        setEmail('');
                        setPassword('');
                        setPhone('');
                        setPostal('');
                    })
                    .catch(error => {
                        console.error(error); // Handle error
                        toast.error("Failed...");
                    });
    



        }else{
            console.log("from invalid");
        }

    

        
    }





    return <div>
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
                    <div className="log-in-box">
                        <div className="log-in-title">
                            <h3>Welcome To NewCycle</h3>
                            <h4>Create New Account</h4>
                        </div>

                        <div className="input-box">
                            <form className="row g-4" onSubmit={register} >
                                <div className="col-12">
                                    <div className="form-floating theme-form-floating">
                                        <input type="text" className="form-control" id="username" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} />
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
                                            placeholder="postal" name="postal" value={postal} onChange={(e)=>setPostal(e.target.value)} />
                                        {
                                            errors.postal!=""?<div style={{textAlign:'left', color:'orangered'}}>
                                                {errors.postal}
                                                </div>:''
                                        }
                                        <label htmlFor="postal">Postal</label>
                                    </div>
                                
                                </div>



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
                                    <a href="https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&amp;flowEntry=ServiceLogin"
                                        className="btn google-button w-100">
                                        <img src="../../../../assets/User/images/inner-page/google.png" className="lazyload"
                                            alt="" />
                                        Sign up with Google
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/" className="btn google-button w-100">
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
                            <a href="login.html">Log In</a>
                        </div>
                    </div>
                </div>

                <div className="col-xxl-7 col-xl-6 col-lg-6"></div>
            </div>
        </div>
    </section>
    </div>
}

