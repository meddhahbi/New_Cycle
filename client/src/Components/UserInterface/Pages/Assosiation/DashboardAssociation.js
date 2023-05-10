import React, {useEffect, useMemo, useState} from "react";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import useFullPageLoader from "../../../../hooks/useFullPageLoader";
// import { TableHeader, Pagination, Search } from "../../../DataTable";
import   Pagination  from "../../../DataTable/Pagination";
import   Header  from "../../../DataTable/Header";
import   Search  from "../../../DataTable/Search";
import NavbarAssociation from "./NavbarAssociation";
import Footer from "../../Footer";
import Swal from "sweetalert2";


export default function DashboardAssociation(){
    const [title, setTitle] = useState('');
    const [cat, setCat] = useState('');
    const [recentPosts, setRecentPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [categories, setCategories] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    const ITEMS_PER_PAGE = 5;
    const headers = [
        { name: "No#", field: "id", sortable: false },
        { name: "Title", field: "title", sortable: true },
        { name: "Category", field: "category.name", sortable: false },
        { name: "Description", field: "description", sortable: true },
        { name: "Current quantity", field: "restingQuantity", sortable: false }

    ];

    const allPostsData = useMemo(() => {
        // console.log("posts")
        if (allPosts.length >0){

        }
        let computedComments = allPosts;

        if (search) {
            computedComments = computedComments.filter(
                post =>
                    post.title.toLowerCase().includes(search.toLowerCase()) ||
                    // post.restingQuantity.toString().includes(search.toString()) ||
                    post.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedComments.length);

        //Sorting posts
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [allPosts, currentPage, search, sorting]);


    const handlePostSubmit = (e) => {
        e.preventDefault();
        // console.log(cat)
      
        const data = {
            // association,
            title,
            description,
            quantity,
            category:cat
        };
      
        axios.post('http://localhost:3001/association_post',data, config)
          .then((res) => {
                console.log(res);
                window.location.reload()
          })
          .catch((err) => {
            console.log(err);
          });
      };
    const getRecentPosts = async()=>{
        await axios.get('http://localhost:3001/association_post/my-recent-posts', config).then((posts)=>{
            setRecentPosts(posts.data)
            return posts
        })
    }
    const getAllPosts = async()=>{
        showLoader();
        await axios.get('http://localhost:3001/association_post/', config).then((posts)=>{
            hideLoader();
            console.log(posts.data)
            setAllPosts(posts.data)
            return posts
        })
    }
    const getCats=()=> {
        fetch(`http://localhost:3001/category/`)
            .then(res => res.json())
            .then(data => {
                setCategories(data)
                // console.log(data);
            })
    }
    useEffect( () => {

        getRecentPosts().then((p)=>{
            // console.log(p)
        })
        getAllPosts().then()
        getCats()

    }, [])


    const delPost = async (id) =>{
        console.log(id)
        const url ="http://localhost:3001/association_post/del/"+id
        Swal.fire({
            title: 'Are you sure you want to delete this post?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await axios.get(url, config).then(p=>{
                    setAllPosts(p.data)
                })
            }
        })
            .catch(error => {
                console.log(error);
            });

    }


    const getByCat=(e)=> {
        console.log(e.target.value)
        setCat(e.target.value);
    }

    return <div>
    <NavbarAssociation/>

    <section className="user-dashboard-section section-b-space">
        <div className="container-fluid-lg">
            <div className="row">
                <div className="col-xxl-3 col-lg-4">
                    <div className="dashboard-left-sidebar">
                        <div className="close-button d-flex d-lg-none">
                            <button className="close-sidebar">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className="profile-box">
                            <div className="cover-image">
                                <img src="./../../../assets/User/images/inner-page/cover-img.jpg"
                                     className="img-fluid blur-up lazyload"
                                     alt=""/>
                            </div>

                            <div className="profile-contain">
                                <div className="profile-image">
                                    <div className="position-relative">
                                        <img src="./../../../assets/User/images/vendor-page/logo.png"
                                             className="blur-up lazyload update_img" alt=""/>
                                    </div>
                                </div>

                                <div className="profile-name">
                                    <h3>Joshua D. Bass</h3>
                                    <h6 className="text-content">joshuadbass@rhyta.com</h6>
                                </div>
                            </div>
                        </div>

                        <ul className="nav nav-pills user-nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a href="#pills-tabContent" className="nav-link active" id="pills-dashboard-tab"
                                   data-bs-toggle="pill" data-bs-target="#pills-dashboard" role="tab"
                                   aria-controls="pills-dashboard" aria-selected="true"><i data-feather="home"></i>
                                    DashBoard</a>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-product-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-product" type="button" role="tab"
                                        aria-controls="pills-product" aria-selected="false"><i
                                    data-feather="shopping-bag"></i>Posts
                                </button>
                            </li>


                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-profile" type="button" role="tab"
                                        aria-controls="pills-profile" aria-selected="false"><i data-feather="user"></i>
                                    Profile
                                </button>
                            </li>


                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-out-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-out" type="button" role="tab" aria-selected="false"><i
                                    data-feather="log-out"></i>
                                    Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-xxl-9 col-lg-8">
                    <button className="btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none">Show
                        Menu
                    </button>
                    <div className="dashboard-right-sidebar">
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-dashboard" role="tabpanel"
                                 aria-labelledby="pills-dashboard-tab">
                                <div className="dashboard-home">
                                    <div className="title">
                                        <h2>My Dashboard</h2>
                                        <span className="title-leaf">
                                            <svg className="icon-width bg-gray">

                                            </svg>
                                        </span>
                                    </div>

                                    <div className="total-box">
                                        <div className="row g-sm-4 g-3">
                                            <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                <div className="totle-contain">
                                                    <img
                                                        src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg"
                                                        className="img-1 blur-up lazyload" alt=""/>
                                                    <img
                                                        src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg"
                                                        className="blur-up lazyload"
                                                        alt=""/>
                                                    <div className="totle-detail">
                                                        <h5>Total Posts</h5>
                                                        <h3>25</h3>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                <div className="totle-contain">
                                                    <img
                                                        src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg"
                                                        className="img-1 blur-up lazyload" alt=""/>
                                                    <img
                                                        src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg"
                                                        className="blur-up lazyload"
                                                        alt=""/>
                                                    <div className="totle-detail">
                                                        <h5>Donaed Posts</h5>
                                                        <h3>12550</h3>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                <div className="totle-contain">
                                                    <img
                                                        src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg"
                                                        className="img-1 blur-up lazyload" alt=""/>
                                                    <img
                                                        src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg"
                                                        className="blur-up lazyload" alt=""/>
                                                    <div className="totle-detail">
                                                        <h5>Order Pending</h5>
                                                        <h3>36</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row g-4">


                                        <div className="col-xxl-6">
                                            <div className="table-responsive dashboard-bg-box">
                                                <div className="dashboard-title mb-4">
                                                    <h3>Recent Posts</h3>
                                                </div>

                                                <table className="table product-table">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Images</th>
                                                        <th scope="col">title</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Sales</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {recentPosts.map((post)=>(
                                                        <tr>
                                                            <td className="product-image">
                                                                <img
                                                                    src="./../../../assets/User/images/vegetable/product/1.png"
                                                                    className="img-fluid" alt=""/>
                                                            </td>
                                                            <td>
                                                                <h6>{post.title}</h6>
                                                            </td>
                                                            <td>
                                                                <h6>$25.69</h6>
                                                            </td>
                                                            <td>
                                                                <h6>152</h6>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="col-xxl-6">
                                            <div className="order-tab dashboard-bg-box">
                                                <div className="dashboard-title mb-4">
                                                    <h3>Donated Posts</h3>
                                                </div>

                                                <div className="table-responsive">
                                                    <table className="table order-table">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">Order ID</th>
                                                            <th scope="col">Product Name</th>
                                                            <th scope="col">Status</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td className="product-image">#254834</td>
                                                            <td>
                                                                <h6>Choco Chip Cookies</h6>
                                                            </td>
                                                            <td>
                                                                <label className="success">Shipped</label>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="product-image">#355678</td>
                                                            <td>
                                                                <h6>Premium Butter Cookies</h6>
                                                            </td>
                                                            <td>
                                                                <label className="danger">Pending</label>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="product-image">#647536</td>
                                                            <td>
                                                                <h6>Sprinkled Potato Chips</h6>
                                                            </td>
                                                            <td>
                                                                <label className="success">Shipped</label>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="product-image">#125689</td>
                                                            <td>
                                                                <h6>Milk 1 L</h6>
                                                            </td>
                                                            <td>
                                                                <label className="danger">Pending</label>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="product-image">#215487</td>
                                                            <td>
                                                                <h6>Raw Mutton Leg</h6>
                                                            </td>
                                                            <td>
                                                                <label className="danger">Pending</label>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="product-image">#365474</td>
                                                            <td>
                                                                <h6>Instant Coffee</h6>
                                                            </td>
                                                            <td>
                                                                <label className="success">Shipped</label>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="product-image">#368415</td>
                                                            <td>
                                                                <h6>Jowar Stick and Jowar Chips</h6>
                                                            </td>
                                                            <td>
                                                                <label className="danger">Pending</label>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="pills-product" role="tabpanel"
                                 aria-labelledby="pills-product-tab">
                                <div className="product-tab">
                                    <div className="title">
                                        <h2>All Posts</h2>
                                        <span className="title-leaf">
                                            <svg className="icon-width bg-gray">

                                            </svg>
                                        </span>
                                    </div>
                                    <button className="btn btn-sm theme-bg-color text-white" data-bs-toggle="modal"
                                            data-bs-target="#edit-profile">Add Post
                                    </button>
                                    <br/> <br/>
                                    <div className="table-responsive dashboard-bg-box">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Pagination
                                                    total={totalItems}
                                                    itemsPerPage={ITEMS_PER_PAGE}
                                                    currentPage={currentPage}
                                                    onPageChange={page => setCurrentPage(page)}
                                                />
                                            </div>
                                            <div className="col-md-6 d-flex flex-row-reverse">
                                                <Search
                                                    onSearch={value => {
                                                        setSearch(value);
                                                        setCurrentPage(1);
                                                    }}
                                                />
                                            </div>

                                        </div>
                                        <table className="table product-table">
                                            <Header
                                                headers={headers}
                                                onSorting={(field, order) =>
                                                    setSorting({ field, order })
                                                }
                                            />
                                            {/*<thead>*/}
                                            {/*<tr>*/}
                                            {/*    <th scope="col">Images</th>*/}
                                            {/*    <th scope="col">title</th>*/}
                                            {/*    <th scope="col">description</th>*/}
                                            {/*    <th scope="col">total quantity</th>*/}
                                            {/*    <th scope="col">Sales</th>*/}
                                            {/*    <th scope="col">Edit / Delete</th>*/}
                                            {/*</tr>*/}
                                            {/*</thead>*/}
                                            <tbody>

                                            {allPostsData&&allPostsData.map(post=>(
                                                <tr>
                                                    <td className="product-image">
                                                        <img src="./../../../assets/User/images/vegetable/product/1.png"
                                                             className="img-fluid" alt=""/>
                                                    </td>
                                                    <td>
                                                        <h6>{post.title}</h6>
                                                    </td>
                                                    <td>
                                                        <h6>{post.category.name}</h6>
                                                    </td>
                                                    <td>
                                                        <h6 className="theme-color fw-bold">{post.description}</h6>
                                                    </td>
                                                    <td style={post.restingQuantity === 0?
                                                        {backgroundColor:"#79ffb7"}
                                                        :{backgroundColor:"#ffd5d5"}}>
                                                        <h6>{post.restingQuantity}/{post.quantity}</h6>
                                                    </td>
                                                    <td className="efit-delete">
                                                        <button className="btn btn-outline-danger" onClick={() => delPost(post._id)} >
                                                            <i data-feather="delete" className="fa fa-trash"/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}

                                            </tbody>
                                        </table>


                                    </div>
                                </div>
                            </div>


                            <div className="tab-pane fade" id="pills-profile" role="tabpanel"
                                 aria-labelledby="pills-profile-tab">
                                <div className="dashboard-profile">
                                    <div className="title">
                                        <h2>My Profile</h2>
                                        <span className="title-leaf">
                                            <svg className="icon-width bg-gray">

                                            </svg>
                                        </span>
                                    </div>

                                    <div className="profile-tab dashboard-bg-box">
                                        <div className="dashboard-title dashboard-flex">
                                            <h3>Profile Name</h3>
                                            <button className="btn btn-sm theme-bg-color text-white"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#edit-profile">Edit Profile
                                            </button>
                                        </div>

                                        <ul>
                                            <li>
                                                <h5>Company Name :</h5>
                                                <h5>Grocery Store</h5>
                                            </li>
                                            <li>
                                                <h5>Email Address :</h5>
                                                <h5>joshuadbass@rhyta.com</h5>
                                            </li>
                                            <li>
                                                <h5>Country / Region :</h5>
                                                <h5>107 Veltri Drive</h5>
                                            </li>

                                            <li>
                                                <h5>Year Established :</h5>
                                                <h5>2022</h5>
                                            </li>

                                            <li>
                                                <h5>Total Employees :</h5>
                                                <h5>154 - 360 People</h5>
                                            </li>
                                            <li>
                                                <h5>Category :</h5>
                                                <h5>Grocery</h5>
                                            </li>

                                            <li>
                                                <h5>Street Address :</h5>
                                                <h5>234 High St</h5>
                                            </li>

                                            <li>
                                                <h5>City / State :</h5>
                                                <h5>107 Veltri Drive</h5>
                                            </li>

                                            <li>
                                                <h5>Zip :</h5>
                                                <h5>B23 6SN</h5>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <div className="modal fade theme-modal" id="edit-profile" tabIndex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel3">Add A Post</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        {/*<div className="mb-3">*/}
                        {/*    <label htmlFor="association" className="form-label">Association</label>*/}
                        {/*    <input type="text" className="form-control" id="association" value={association}*/}
                        {/*           onChange={(e) => setAssociation(e.target.value)}/>*/}
                        {/*</div>*/}
                        <div className="mb-3">
                            {/*<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">*/}
                            {/*    /!*<select className="form-select" aria-label="Default select example">*!/*/}
                            {/*    {categories.map(*/}
                            {/*        (c)=>(*/}
                            {/*            <a onClick={()=>getByCat(c._id)} className="dropdown-item" href="#">{c.name}</a>*/}
                            {/*        ))}*/}
                            {/*    /!*</select>*!/*/}
                            {/*</div>*/}

                            <select name="" id="" className="form-control" value={cat} onChange={getByCat}>
                                <option value="" disabled>select a category</option>
                                {categories.map(
                                    (c) => (
                                        <option value={c._id}
                                                className="dropdown-item">{c.name}</option>
                                    )
                                )}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" value={title}
                                   onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Description</label>
                            <textarea className="form-control" id="title" value={description}
                                   onChange={(e) => setDescription(e.target.value)}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <input type="number" className="form-control" id="quantity" value={quantity}
                                   onChange={(e) => setQuantity(e.target.value)}/>
                        </div>
                        {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-animation btn-md fw-bold"
                                    data-bs-dismiss="modal">Cancel
                            </button>
                            <button type="submit" className="btn theme-bg-color btn-md fw-bold text-light" onClick={handlePostSubmit}
                            >Save
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
    <Footer/>


</div>




}
