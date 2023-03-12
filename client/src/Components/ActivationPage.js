
import { useParams } from 'react-router-dom';
import axios from 'axios';




export default function ActivationPage(){




    const { activationCode } = useParams();

    console.log(activationCode);
    const url=`http://localhost:3001/verifyuser/${activationCode}`;

    axios.post(url);





    return <div>

    ActivationPage    


    </div>

}