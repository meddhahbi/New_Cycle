
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import axios from 'axios';




export default function ActivationPage(){




    const { activationCode } = useParams();

    console.log(activationCode);
    const url=`http://localhost:3001/verifyuser/${activationCode}`;

    axios.post(url);



    const handleSubmit= async(e)=>{
        e.preventDefault();
        window.location = "/login";
    }

    return <div>

<section>
<div className="mainDiv">
<div class="cardStyle">
    
    <img src="../../assets/User/images/logo/1.png" id="signupLogo"/>
    
    <h2 class="formTitle">
        The account has been verified successfully
    </h2>

    <form action="" method="post" name="signupForm" id="signupForm" onSubmit={handleSubmit}>

    <div class="buttonWrapper">
    <button type="submit" id="submitButton" className="submitButton pure-button pure-button-success    ">
        <span>You can log In now </span>
        
    </button>
    
    </div>
        </form>

</div>
</div>
</section>


    </div>

}
