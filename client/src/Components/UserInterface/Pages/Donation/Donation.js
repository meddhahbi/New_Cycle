import React, {useEffect, useState} from 'react';
import axios from "axios";
import {isLoggedIn} from "../../../../AuthGuard";
import {Link} from "react-router-dom";


function Donationn(props) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    const [day, setDay] = useState();
    const [percentage, setPercentage] = useState();
    const [bgColor, setBgColor] = useState();
    const [color, setColor] = useState();
    const {post, cat} = props
    // props.onSetCat(cat)

    useEffect(()=>{

        const date = new Date(post.createdAt); // create a new Date object
        const dateString = date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }); // convert to date string in format of dd mmm, yyyy

        setDay(dateString)
        const per = (post.restingQuantity / post.quantity) * 100

        setPercentage(per)
        switch (true){
            case(per === 100):
                setBgColor("#ff006a")
                setColor("#ffffff")
                break;
            case (per<100 && per >50):
                setBgColor("#ff8400")
                setColor("#ffffff")
                break;
            case (per<=50 && per >0):
                setBgColor("#fffb00")
                setColor("#000000")
                break;
            default:
                setBgColor("#37ff00")
                setColor("#000000")
            // case (per ===0):
            //     setColor("#37ff00")
            //     break;
        }
    })


    const getProds = ()=>{
        console.log("don")
        console.log(cat)
        // fetch(`http://localhost:3001/produit/prods_by_cat/${cat}`, config)
        //     // .then(res => res.json() )
        //     .then(data =>{
        //         console.log("donated products");
        //         console.log(data);
        //         // props.onSetProducts(data.data)
        //     })
        //     .catch(error => console.log(error));
        const prods = axios.get(`http://localhost:3001/produit/prods_by_cat/${cat}`, config)
            .then(prods=>{

                console.log(prods)
                props.onSetProducts(prods.data)
            })
    }
    let handleDonate=()=>{
        props.onSetCat(cat)
        getProds()
        props.onSetPost(post)
    };
    return (
            <div className="col-xxl-5 col-sm-6">
                <div className="blog-box wow fadeInUp">

                    <div className="blog-contain">
                        <div className="blog-label">
                            {post.association && post.association.name}
                        </div>
                    </div>
                    {/*<div className="blog-image">*/}
                    {/*    <a href="blog-detail.html">*/}
                    {/*        <img src="../../../../../assets/User/images/inner-page/blog/1.jpg"*/}
                    {/*             className="bg-img blur-up lazyload" alt=""/>*/}
                    {/*    </a>*/}
                    {/*</div>*/}

                    <div className="blog-contain">
                        <div className="blog-label">
                                            <span className="time"><i
                                                data-feather="clock"/> <span>{day}</span></span>
                            {/*<span className="super">*/}
                                {/*<i data-feather="user"/> <span>Mark J.*/}
                                {/*                Speight</span></span>*/}
                        </div>
                        <a href="blog-detail.html" style={{marginBottom:"10px"}}>
                            <h3><strong>donate: </strong>{post.title}</h3>
                        </a>

                        <p style={{marginBottom:"10px"}}><strong>Category: </strong> {post.category.name}</p>
                        <p style={{marginBottom:"10px"}}><strong>We need: </strong> {post.restingQuantity} products!</p>
                        {/*<div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75"*/}
                        <div className="progress" role="progressbar" aria-valuenow="75"
                             aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar" style={{width: `${percentage}%`,backgroundColor:bgColor, color:color, weight:"bold"}}>{percentage}%</div>
                        </div>
                        <div style={{display:"flex"}}>

                            {isLoggedIn()?<button
                                className="blog-button"
                                data-bs-toggle="modal"
                                data-bs-target={"#donate"} onClick={handleDonate}>Donate
                                <i className="fa-solid fa-right-long"/></button>:
                                <Link
                                    className="blog-button" to="/login">Login To Donate
                                    <i className="fa-solid fa-right-long"/></Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Donationn;
