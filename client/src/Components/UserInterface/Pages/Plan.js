import axios from "axios";
import { Link } from "react-router-dom";
import LoadingPage from "../../Loading";
import React, {useEffect} from 'react';
import { useState } from "react";


export default function Plan(){

	const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        setTimeout(()=>setIsLoading(false), 1500);
    })

  const createSub=(e)=>{
    e.preventDefault();
	

	console.log(localStorage.getItem("mail"));
    const url= "http://localhost:3001/subscribe/"+ localStorage.getItem("mail");
	console.log(url);
	axios.post(url);

	window.open(
		'https://buy.stripe.com/test_cN2bMCaCDeVy13ibII',
		'_blank' // <- This is what makes it open in a new window.
	  );
   
		


  }



    return <div> 
        
		{isLoading ? <LoadingPage/> :  

		<div className="container">
  {!localStorage.getItem("token") ? (
    <div className="card-deck mb-3 text-center">
      <div className="card mb-4 shadow-sm">
        <div className="card-header">
          <h4 className="my-0 font-weight-normal">Free</h4>
        </div>
        <div className="card-body">
          <h1 className="card-title pricing-card-title">
            $0 <small className="text-muted">/ month</small>
          </h1>
          <ul className="list-unstyled mt-3 mb-4">
            <li>5 users included</li>
            <br />
            <li>2 GB of storage</li>
            <br />
            <li>Email support</li>
            <br />
            <li>Help center access</li>
            <br />
          </ul>
         <center> <button type="button" className="btn btn-outline-success">
		 <Link to="/register">Sign up for free</Link>  
          </button></center>
        </div>
      </div>


	  <div className="card-deck mb-3 text-center">
      <div className="card mb-4 shadow-sm">
        <div className="card-header">
          <h4 className="my-0 font-weight-normal">Premium</h4>
        </div>
        <div className="card-body">
          <h1 className="card-title pricing-card-title">
		  $2 <small className="text-muted">/ month</small>
          </h1>
          <ul className="list-unstyled mt-3 mb-4">
            <li>5 users included</li>
            <br />
            <li>2 GB of storage</li>
            <br />
            <li>Email support</li>
            <br />
            <li>Help center access</li>
            <br />
          </ul>
		  <h4 style={{color:"#00a693"}}>You must to be registred</h4>
        </div>
      </div>
    </div>





    </div>

	




  ) : (
	<div className="card-deck mb-3 text-center">
    <div className="card mb-4 shadow-sm">
      <div className="card-header">
        <h4 className="my-0 font-weight-normal">Premium</h4>
      </div>
      <div className="card-body">
        <h1 className="card-title pricing-card-title">
          $2 <small className="text-muted">/ month</small>
        </h1>
        <ul className="list-unstyled mt-3 mb-4">
          <li>20 users included</li>
          <li>10 GB of storage</li>
          <li>Priority email support</li>
          <li>Help center access</li>
        </ul>
        <form onSubmit={createSub}>
          <center>
            <button className="btn btn-lg btn-block btn-success">
              Get started
            </button>
          </center>
        </form>
      </div>
    </div>
	</div>
  )}
</div>


  }






</div>


}