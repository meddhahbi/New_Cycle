import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdatePassword = () => {
  const [password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.put(`http://localhost:3001/updatePassword/${id}`, {
        password,
      });

      setSuccess(data.message);
      setError('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError(error.response.data.message);
      setSuccess('');
    }
  };

  return (
    
    <section className="log-in-section section-b-space forgot-section">
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
                            <h4>Reset your password</h4>
                        </div>

                        <div className="input-box">
                            <form className="row g-4" onSubmit={handleSubmit}>
                                <div className="col-12">
                                    <div className="form-floating theme-form-floating log-in-form">
                                        <input type="password" className="form-control" id="email"
                                            placeholder="Email Address" value={password} onChange={(e) => setNewPassword(e.target.value)} required/>
                                        <label htmlFor="email" >Password </label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating theme-form-floating log-in-form">
                                        <input type="password" className="form-control" id="email"
                                            placeholder="Email Address" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                        <label htmlFor="email" >Confirm your password</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-animation w-100" type="submit">Reset
                                        Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  );
};

export default UpdatePassword;