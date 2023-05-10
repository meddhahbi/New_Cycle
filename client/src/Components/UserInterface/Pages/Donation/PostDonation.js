import React, {useEffect, useState} from 'react';
import {isLoggedIn} from "../../../../AuthGuard";
import {Navigate} from "react-router";
import axios from "axios";
import Donationn from "./Donation";
import {Link} from "react-router-dom";



function PostDonation(props) {

    const [posts, setPosts] = useState();
    const getPosts = async () =>{
        const url ="http://localhost:3001/association_post/recent_six"
        await axios.get(url).then(p=>{
            setPosts(p.data)
        })
    }
    useEffect(()=>{
        getPosts().then()
    },[])

    return (
        isLoggedIn()?(<div className="blog-section section-b-space">
                <section className="breadscrumb-section pt-0">
                    <div className="container-fluid-lg">
                        <div className="row">
                            <div className="col-12">
                                <div className="breadscrumb-contain">
                                    <h2>Donation List</h2>
                                    <nav>
                                        <ol className="breadcrumb mb-0">
                                            <li className="breadcrumb-item">
                                                <Link to="/">
                                                    <i className="fa-solid fa-house"/>
                                                </Link>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">Donation List</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            <div className="container-fluid-lg"  style={{marginTop:"20px"}}>
                <div className="row g-4">
                    <div className="col-xxl-9 col-xl-8 col-lg-7 order-lg-2">
                        <div className="row g-4 ratio_65">
                            {posts?.map((post)=>(
                                <Donationn post={post}/>
                            ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>):
            <Navigate to={"/login"}/>

    );
}

export default PostDonation;
