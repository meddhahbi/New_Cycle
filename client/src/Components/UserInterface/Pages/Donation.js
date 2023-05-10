import React, {useEffect} from 'react';
import { useState } from "react";
import LoadingPage from "../../Loading";
import Donationn from "./Donation/Donation";
import ChatProduct from "./Chat/Item/ChatProduct";
import Don from "./Donation/Don";
import "./Donation/style.css"




export default function Donation(){

    const [products, setProducts] = useState([]);

    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [recents, setRecent] = useState([]);
    const [cat, setCat] = useState();
    const [post, setPost] = useState(null);


    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        setTimeout(()=>setIsLoading(false), 1500);
    })


    useEffect(() => {
    
        fetch(`http://localhost:3001/association/articles`)
          .then(res => res.json() )
          .then(data =>{ setArticles(data)
            console.log(data);
           // console.log(data.data.data.quantity)

    //    setQuantity(data.quantity)
    })
          .catch(error => console.log(error));

        fetch(`http://localhost:3001/category/`)
          .then(res => res.json() )
          .then(data =>{
              setCategories(data)
            console.log(data);
           // console.log(data.data.data.quantity)

    //    setQuantity(data.quantity)
    })
          .catch(error => console.log(error));
      }, []);


    useEffect(() => {
    
          fetch(`http://localhost:3001/association_post/recent_six`)
        .then(res => res.json() )
        .then(data =>{ setRecent(data)
          console.log(data);
    })
          .catch(error => console.log(error));
      }, []);


    const getByCat=(_id)=> {
        return undefined;
    }

    let handCat = (data)=>{
        console.log(data)
        setCat(data)
    };
    let handleProds=(data)=>{
        setProducts(data)
    };
    let handlePost = (data)=>{
        setPost(data)
    };
    return <div>
 {isLoading ? <LoadingPage/> :
<section className="blog-section section-b-space">
        <div className="container-fluid-lg">
            <div className="row g-4">
                <div className="col-xxl-9 col-xl-8 col-lg-7 order-lg-2">
                    <div className="row g-4 ratio_65">
                        <div className="dropdown rightside-menu">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                filter
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">All</a>
                                <p style={{marginLeft:"5px"}}>categories:</p>
                                {!categories?
                                    <h3>No Categories</h3>:
                                    categories.map(
                                    (c)=>(
                                        <a onClick={()=>getByCat(c._id)} className="dropdown-item" href="#">{c.name}</a>
                                    )
                                )}
                                {/*<a className="dropdown-item" href="#">Action</a>*/}
                                {/*<a className="dropdown-item" href="#">Another action</a>*/}
                                {/*<a className="dropdown-item" href="#">Something else here</a>*/}
                            </div>
                        </div>

                    {/*{articles.map(article => (*/}

                    {/*    <div className="col-xxl-4 col-sm-6">*/}
                    {/*        <div className="blog-box wow fadeInUp" data-wow-delay="0.05s">*/}
                    {/*            /!* <div className="blog-image">*/}
                    {/*                <a href="blog-detail.html">*/}
                    {/*                    <img src="../../../../assets/User/images/inner-page/blog/2.jpg" className="bg-img" alt="" />*/}
                    {/*                </a>*/}
                    {/*            </div> *!/*/}

                    {/*            <div className="blog-contain">*/}
                    {/*                <div className="blog-label">*/}
                    {/*                <span className="time"><i data-feather="clock"></i> <span>{new Date(article.createdAt).toLocaleString()}</span></span>*/}
                    {/*                    <span className="super"><i data-feather="user"></i> <span>{article.associationName}</span></span>*/}
                    {/*                </div>*/}
                    {/*                <a href="blog-detail.html">*/}
                    {/*                    <h3>{article.title}</h3>*/}
                    {/*                </a>*/}
                    {/*                */}
                    {/*                <p>{article.description}</p>*/}
                    {/*               */}

                    {/*                        /!* <h4 className="quantity">quantity: {article.quantity}</h4> *!/*/}
                    {/*                    */}
                    {/*                <button  className="blog-button" data-bs-toggle="modal"*/}
                    {/*                            data-bs-target="#edit-profile">Donate*/}
                    {/*                    <i className="fa-solid fa-right-long"></i></button>*/}
                    {/*            </div>*/}
                    {/*               */}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*))} */}

                    {articles.map(article => (

                        <Donationn cat={article.category._id} post={article} onSetPost={handlePost} onSetCat={handCat} onSetProducts={handleProds}/>
                    ))}
                    </div>

                
                </div>


                <div class="modal fade theme-modal" id="edit-profile" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel3">Make a request from email</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form>

                    <div class="mb-3">
                            <label htmlFor="country" class="form-label">Name</label>
                            <input type="text" class="form-control" id="country" />
                        </div>

                        <div class="mb-3">
                            <label for="companyName" class="form-label">Email</label>
                            <input type="text" class="form-control"    />
                        </div>
                        <div class="mb-3">
                            <label htmlFor="emailAddress" class="form-label">Description</label>
                            <textarea type="text"  class="form-control"  />
                        </div>
                        
                        <div class="mb-3">
                            <label htmlFor="employees" class="form-label">Quantity for donate</label>
                            <input type="number" class="form-control"  />
                        </div>
                        {/* <div class="mb-3">
                            <label htmlFor="category" class="form-label">Image</label>
                            <input type="file" class="form-control" value={image} onChange={(e)=>setImage(e.target.value)} />
                        </div> */}
    
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-animation btn-md fw-bold"
                        data-bs-dismiss="modal">Cancle</button>
                    <button type="submit" class="btn theme-bg-color btn-md fw-bold text-light"
                        >Save</button>
                </div>
            </div>
        </div>
                                    </div>


                <div className="col-xxl-3 col-xl-4 col-lg-5 order-lg-1">
                    <div className="left-sidebar-box wow fadeInUp">
                        <div className="left-search-box">
                            <div className="search-box">
                                <input type="search" className="form-control" id="exampleFormControlInput1"
                                    placeholder="Search...." />
                            </div>
                        </div>

                        <div className="accordion left-accordion-box" id="accordionPanelsStayOpenExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseOne">
                                        Recent Post
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show"
                                    aria-labelledby="panelsStayOpen-headingOne">
                                    <div className="accordion-body pt-0">

                                    {recents.map(recent => (

                                        <div className="recent-post-box">
                                            <div className="recent-box">
                                                <a href="blog-detail.html" className="recent-image">
                                                    <img src="../../../../assets/User/images/inner-page/blog/1.jpg"
                                                        className="img-fluid blur-up lazyload" alt="" />
                                                </a>

                                                <div className="recent-detail">
                                                    <a href="blog-detail.html">

                                                        <h5 className="recent-name">{recent.title}</h5>
                                                    </a>
                                                    <h6>{new Date(recent.createdAt).toLocaleString()} <i data-feather="thumbs-up"></i></h6>
                                                </div>
                                            </div>

                                          
                                        </div>
                                         ))} 

                                    </div>
                                </div>
                            </div>



                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div className="modal fade theme-modal" id={"donate"} tabIndex="-1"
         aria-labelledby="exampleModalLabel2"
         aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down">
            <Don post={post} cat={cat} products={products}/>
        </div>
    </div>
    </section>

}
    </div>


}
