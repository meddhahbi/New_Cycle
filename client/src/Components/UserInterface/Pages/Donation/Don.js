import React, {useEffect, useState} from 'react';
import axios from "axios";
// import {config} from "@fortawesome/fontawesome-svg-core";

function Don(props) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };

    // const {selectedProd, setSelectedProd}=useState({});
    const [selectedProd, setSelectedProd] = useState();
    const [donate, setDonate] = useState(0);
    const {cat, products, post}=props;


    const [errors, setErrors] = useState(
        {
            currentMore: '',
            postMore: '',
            positive: '',
            zero: '',
        }
    )
    const emptyErrors = {
        currentMore: '',
        postMore: '',
        positive: '',
        zero: '',
    }

    const formValidation=()=> {

        let status = true;
        let localErrors = {
            currentMore: '',
            postMore: '',
            positive: '',
            zero: '',
            // ...errors
        }
        // console.log("donate")
        // console.log(post)
        const don = parseInt(donate)
        // console.log("don")
        // console.log(typeof don)


        if ( don=== 0) {
            localErrors.zero = 'Donate';
            status = false;
        }else if ( don< 0) {
            localErrors.positive = 'You can only donate with a positive number';
            status = false;
        }
        if(parseInt(post.restingQuantity)<parseInt(selectedProd.stock)){
            if (don > parseInt(post.restingQuantity)) {
                localErrors.postMore = `we are asking for only ${post.restingQuantity} products`;
                status = false;
            }
        }else{
            if (don > parseInt(selectedProd.stock)) {
                localErrors.currentMore = `You have only ${selectedProd.stock} products`;
                status = false;
            }
        }




        setErrors(localErrors)
        return status
    }

    // const [products, setProducts] = useState([]);
    useEffect(()=>{
        // console.log("cat")
        // console.log(cat)
        // getProds()
    })
    // const handleSelectedProd=(prod)=>{
    //     console.log(prod)
    //     setSelectedProd(prod)
    //
    // };
    let handleDonate = (e)=>{
        // console.log("e.target.value")
        // console.log(e.target.value)
        setDonate(e.target.value)
    };
    const handleUpdate=async ()=>{
        console.log(selectedProd._id)
        await axios.put("http://localhost:3001/association_post/",{
            productId:selectedProd._id,
            postId:post._id,
            donated:donate
        }, config).then(()=>{
                window.location.reload()
            }
        )
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        // console.log("post")
        // console.log(post)
        if(formValidation() && donate){
            // console.log("post")
            // console.log(post)
            // console.log("hi")


            handleUpdate().then()
            // window.location="/donate";
            // setDonate(0)
        }
    };
    return (
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel2">Donate</h5>
                {/*<br/>*/}
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        onClick={()=>{
                            setSelectedProd(null);
                            setDonate(0)
                            setErrors(emptyErrors)
                        }}
                >
                    <i className="fa-solid fa-xmark"/>
                </button>
            </div>
            <div className="modal-body">
                <div
                    // style={{display:"flex", justifyContent:"center", width:"100%"}}
                >
                    {/*<ChatProduct prod={product}/>*/}
                    <ul className="list-group" style={{display:"flex", justifyContent:"center", width:"100%"}}>
                        {
                            post?

                                <h4 style={{marginBottom:"10px"}}><strong>We need: </strong> {post.restingQuantity} products!</h4>
                                :""
                        }
                        {products.length ===0?
                            <h3>you have no products in this category</h3>:
                            <>
                                <h5>You have:</h5>
                                {products.map(product=>(
                                    <li className={"list-group-item"} onClick={()=>{
                                        setSelectedProd(product)
                                        setDonate(0)
                                    }} style={{ width:"100%", cursor:"pointer"}}>
                                        <h5>
                                            name: <strong>{product.name}</strong>
                                        </h5>
                                        <h5>
                                            <i><strong>{product.stock}</strong> products</i>
                                        </h5>
                                    </li>
                                ))}
                            </>
                        }
                        <br/>
                        <div>
                            {selectedProd?
                                <>
                                    <h3>{selectedProd && selectedProd.name}:</h3>
                                    <h3>you have {selectedProd && selectedProd.stock}:</h3>
                                    <form onSubmit={handleSubmit}>
                                        <div className="col-12">
                                            <div className="form-floating theme-form-floating log-in-form">
                                                <input type="number" name="donate" className="form-control" id="donate"
                                                       style={errors.zero!==""||errors.currentMore!==""||errors.positive!==""||errors.postMore!==""?{borderColor:"red"}:null}
                                                       value={donate} onChange={handleDonate} placeholder="Email Address"/>
                                                <label htmlFor="donate">Donate now!</label>
                                            </div>
                                        </div>
                                        <div className="col-12">

                                            {
                                                errors.zero!==""?<strong style={{fontSize:"13px",color: "red"}}>
                                                    {errors.zero}!
                                                </strong>:""
                                            }

                                            {
                                                errors.currentMore!==""?<div style={{color: "red"}}>
                                                    {errors.currentMore}
                                                </div>:""
                                            }

                                            {
                                                errors.positive!==""?<div style={{color: "red"}}>
                                                    {errors.positive}
                                                </div>:""
                                            }

                                            {
                                                errors.postMore!==""?<div style={{color: "red"}}>
                                                    {errors.postMore}
                                                </div>:""
                                            }

                                            <div className="form-floating theme-form-floating log-in-form">


                                            </div>
                                        </div>
                                        <button className="btn btn-primary float-end">donate</button>
                                    </form>

                                </>:""
                            }
                        </div>
                        {/*<li className="list-group-item">Cras justo odio</li>*/}
                        {/*<li className="list-group-item">Dapibus ac facilisis in</li>*/}
                        {/*<li className="list-group-item">Morbi leo risus</li>*/}
                        {/*<li className="list-group-item">Porta ac consectetur ac</li>*/}
                        {/*<li className="list-group-item">Vestibulum at eros</li>*/}
                    </ul>
                </div>

            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-animation btn-md fw-bold"
                        data-bs-dismiss="modal" onClick={()=>{
                            setSelectedProd(null);
                            setDonate(0)
                            setErrors(emptyErrors)
                }}>Close
                </button>
                {/*<button type="button" data-bs-dismiss="modal"*/}
                {/*        className="btn theme-bg-color btn-md fw-bold text-light" onClick={handleDeal}>Confirm*/}
                {/*</button>*/}
            </div>
        </div>
    );
}

export default Don;
