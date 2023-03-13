
import { useParams } from 'react-router-dom';
import axios from 'axios';




export default function ActivationPage(){




    const { activationCode } = useParams();

    console.log(activationCode);
    const url=`http://localhost:3001/verifyuser/${activationCode}`;

    axios.post(url);





    return <div>

<section className="breadscrumb-section pt-0">
        <div className="container-fluid-lg">
            <div className="row">
                <div className="col-12">
                    <div className="breadscrumb-contain">
                        <h2 className="mb-2">Activation Page</h2>
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


    </div>

}