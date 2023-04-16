import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router";
import { isLoggedIn } from "../../../AuthGuard";


export default function Forgot() {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const url = `http://localhost:3001/resetPwd`;
        const { data } = await axios.post(url, { email });
      } catch (error) {
        console.log(error);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setErrorMessage("This email does not exist");
        }
        setTimeout(() => {
            setErrorMessage("");
          }, 5000); // hide error message after 5 seconds
      }
    };
    return  !isLoggedIn() ? ( <section className="log-in-section section-b-space forgot-section">
    <div className="container-fluid-lg w-100">
        <div className="row">
            <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
                <div className="image-contain">
                    <img src="../../../../assets/User/images/inner-page/forgot.png" className="img-fluid" alt="" />
                </div>
            </div>

            <div className="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
                <div className="d-flex align-items-center justify-content-center h-100">
                    <div className="log-in-box">
                        <div className="log-in-title">
                            <h3>Welcome To Fastkart</h3>
                            <h4>Forgot your password</h4>
                        </div>

                        <div className="input-box">
                            <form className="row g-4" onSubmit={handleSubmit}>
                                <div className="col-12">
                                    <div className="form-floating theme-form-floating log-in-form">
                                        <input type="email" className="form-control" id="email"
                                            placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} value={email}/>
                                             {errorMessage && <p>{errorMessage}</p>}
                                        <label htmlFor="email" >Email Address</label>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <button className="btn btn-animation w-100" type="submit">Forgot
                                        Password</button>
                                </div>
                            </form>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>):(
    <Navigate to={"/"} />
)
}