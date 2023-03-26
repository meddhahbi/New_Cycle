import axios from "axios";


export default function Plan(){

  const createSub=(e)=>{
    e.preventDefault();

    const url= "localhost:3001/subscribe"+ localStorage.getItem("mail");
    axios.post(url).then(e=>{
      console.log("Success");
    })


  }



    return <div> 
        
        
        <div className="container">
	<div className="card-deck mb-3 text-center">
		<div className="card mb-4 shadow-sm">
			<div className="card-header">
				<h4 className="my-0 font-weight-normal">Free</h4>
			</div>
			<div className="card-body">
				<h1 className="card-title pricing-card-title">$0 <small className="text-muted">/ month</small></h1>
				<ul className="list-unstyled mt-3 mb-4">
					<li>5 users included</li><br></br>
					<li>2 GB of storage</li><br></br>
					<li>Email support</li><br></br>
					<li>Help center access</li><br></br>
				</ul>
				<button type="button" className="btn btn-outline-success">Sign up for free</button>
			</div>
		</div>
		<div className="card mb-4 shadow-sm">
			<div className="card-header">
				<h4 className="my-0 font-weight-normal">Premium</h4>
			</div>
			<div className="card-body">
				<h1 className="card-title pricing-card-title">$2 <small className="text-muted">/ month</small></h1>
				<ul className="list-unstyled mt-3 mb-4">
					<li>20 users included</li>
					<li>10 GB of storage</li>
					<li>Priority email support</li>
					<li>Help center access</li>
				</ul>
        <form onSubmit={createSub}>
				<a href="https://buy.stripe.com/test_cN2bMCaCDeVy13ibII" type="button" className="btn btn-lg btn-block btn-success">Get started</a>
        </form>
      </div>
		</div>
	
	</div>
</div>

</div>


}