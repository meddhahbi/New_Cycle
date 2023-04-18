import { useState } from "react";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


export default function DashboardAssociation(){


    const [association, setAssociation] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
  //  const [image, setImage] = useState(null);

    const [errors, setErrors] = useState(
        {
            title: '',
            description: '',
            quantity: '',
          //  image:'',
        }
    )


    const formValidation=()=>{

        let status=true;
        let localErrors={
            title: '',
            description: '',
            quantity: '',
          //  image: '',
           // ...errors
        }


        if(title==""){
            localErrors.title='Title is required';
            status=false;
        }
        if(description==""){
            localErrors.description='Description is required';
            status=false;
        }
        if(quantity==""){
            localErrors.quantity='quantity is required';
            status=false;
        }
        // if(image==""){
        //     localErrors.image='image is required';
        //     status=false;
        // }



        setErrors(localErrors);
        console.log(localErrors);
        console.log(status);
        return status;

    }


    const addPost=(e)=>{
        e.preventDefault();
        console.log("form submitted");
        console.log("form data", title, description, quantity);

        if(formValidation()){



            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('quantity', quantity);
           // formData.append('image', image);


            const url='http://localhost:3001/article/addPost'
            axios.post(url, formData)
            .then(response => {
                        console.log(response.data); // Handle response data
                        toast.success("User created successfuly...");
                        setTitle('');
                        setDescription('');
                        setQuantity('');
                       // setImage(null);
                    })
                    .catch(error => {
                        console.log("test");
                        console.error(error); // Handle error
                        toast.error("Failed...");
                    });
    



        }else{
            console.log("from invalid");
        }




    }


return <div>

<section class="user-dashboard-section section-b-space">
        <div class="container-fluid-lg">
            <div class="row">
                <div class="col-xxl-3 col-lg-4">
                    <div class="dashboard-left-sidebar">
                        <div class="close-button d-flex d-lg-none">
                            <button class="close-sidebar">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div class="profile-box">
                            <div class="cover-image">
                                <img src="./../../../assets/User/images/inner-page/cover-img.jpg" class="img-fluid blur-up lazyload"
                                    alt="" />
                            </div>

                            <div class="profile-contain">
                                <div class="profile-image">
                                    <div class="position-relative">
                                        <img src="./../../../assets/User/images/vendor-page/logo.png"
                                            class="blur-up lazyload update_img" alt="" />
                                    </div>
                                </div>

                                <div class="profile-name">
                                    <h3>Joshua D. Bass</h3>
                                    <h6 class="text-content">joshuadbass@rhyta.com</h6>
                                </div>
                            </div>
                        </div>

                        <ul class="nav nav-pills user-nav-pills" id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a href="#pills-tabContent" class="nav-link active" id="pills-dashboard-tab"
                                    data-bs-toggle="pill" data-bs-target="#pills-dashboard" role="tab"
                                    aria-controls="pills-dashboard" aria-selected="true"><i data-feather="home"></i>
                                    DashBoard</a>
                            </li>

                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-product-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-product" type="button" role="tab"
                                    aria-controls="pills-product" aria-selected="false"><i
                                        data-feather="shopping-bag"></i>Posts</button>
                            </li>

                

                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-profile" type="button" role="tab"
                                    aria-controls="pills-profile" aria-selected="false"><i data-feather="user"></i>
                                    Profile</button>
                            </li>

                           

                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-out-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-out" type="button" role="tab" aria-selected="false"><i
                                        data-feather="log-out"></i>
                                    Log Out</button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="col-xxl-9 col-lg-8">
                    <button class="btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none">Show
                        Menu</button>
                    <div class="dashboard-right-sidebar">
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-dashboard" role="tabpanel"
                                aria-labelledby="pills-dashboard-tab">
                                <div class="dashboard-home">
                                    <div class="title">
                                        <h2>My Dashboard</h2>
                                        <span class="title-leaf">
                                            <svg class="icon-width bg-gray">
                                              
                                            </svg>
                                        </span>
                                    </div>

                                    <div class="total-box">
                                        <div class="row g-sm-4 g-3">
                                            <div class="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                <div class="totle-contain">
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg"
                                                        class="img-1 blur-up lazyload" alt="" />
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg" class="blur-up lazyload"
                                                        alt="" />
                                                    <div class="totle-detail">
                                                        <h5>Total Posts</h5>
                                                        <h3>25</h3>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                <div class="totle-contain">
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg"
                                                        class="img-1 blur-up lazyload" alt="" />
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg" class="blur-up lazyload"
                                                        alt="" />
                                                    <div class="totle-detail">
                                                        <h5>Donaed Posts</h5>
                                                        <h3>12550</h3>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                <div class="totle-contain">
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg"
                                                        class="img-1 blur-up lazyload" alt="" />
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg"
                                                        class="blur-up lazyload" alt="" />
                                                    <div class="totle-detail">
                                                        <h5>Order Pending</h5>
                                                        <h3>36</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row g-4">
                                  

                                        <div class="col-xxl-6">
                                            <div class="table-responsive dashboard-bg-box">
                                                <div class="dashboard-title mb-4">
                                                    <h3>Recent Products</h3>
                                                </div>

                                                <table class="table product-table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Images</th>
                                                            <th scope="col">Product Name</th>
                                                            <th scope="col">Price</th>
                                                            <th scope="col">Sales</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td class="product-image">
                                                                <img src="./../../../assets/User/images/vegetable/product/1.png"
                                                                    class="img-fluid" alt="" />
                                                            </td>
                                                            <td>
                                                                <h6>Fantasy Crunchy Choco Chip Cookies</h6>
                                                            </td>
                                                            <td>
                                                                <h6>$25.69</h6>
                                                            </td>
                                                            <td>
                                                                <h6>152</h6>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td class="product-image">
                                                                <img src="./../../../assets/User/images/vegetable/product/2.png"
                                                                    class="img-fluid" alt="" />
                                                            </td>
                                                            <td>
                                                                <h6>Peanut Butter Bite Premium Butter Cookies 600 g</h6>
                                                            </td>
                                                            <td>
                                                                <h6>$35.36</h6>
                                                            </td>
                                                            <td>
                                                                <h6>34</h6>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td class="product-image">
                                                                <img src="./../../../assets/User/images/vegetable/product/3.png"
                                                                    class="img-fluid" alt="" />
                                                            </td>
                                                            <td>
                                                                <h6>Yumitos Chilli Sprinkled Potato Chips 100 g</h6>
                                                            </td>
                                                            <td>
                                                                <h6>$78.55</h6>
                                                            </td>
                                                            <td>
                                                                <h6>78</h6>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td class="product-image">
                                                                <img src="./../../../assets/User/images/vegetable/product/4.png"
                                                                    class="img-fluid" alt="" />
                                                            </td>
                                                            <td>
                                                                <h6>healthy Long Life Toned Milk 1 L</h6>
                                                            </td>
                                                            <td>
                                                                <h6>$32.98</h6>
                                                            </td>
                                                            <td>
                                                                <h6>135</h6>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div class="col-xxl-6">
                                            <div class="order-tab dashboard-bg-box">
                                                <div class="dashboard-title mb-4">
                                                    <h3>Donated Posts</h3>
                                                </div>

                                                <div class="table-responsive">
                                                    <table class="table order-table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Order ID</th>
                                                                <th scope="col">Product Name</th>
                                                                <th scope="col">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td class="product-image">#254834</td>
                                                                <td>
                                                                    <h6>Choco Chip Cookies</h6>
                                                                </td>
                                                                <td>
                                                                    <label class="success">Shipped</label>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td class="product-image">#355678</td>
                                                                <td>
                                                                    <h6>Premium Butter Cookies</h6>
                                                                </td>
                                                                <td>
                                                                    <label class="danger">Pending</label>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td class="product-image">#647536</td>
                                                                <td>
                                                                    <h6>Sprinkled Potato Chips</h6>
                                                                </td>
                                                                <td>
                                                                    <label class="success">Shipped</label>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td class="product-image">#125689</td>
                                                                <td>
                                                                    <h6>Milk 1 L</h6>
                                                                </td>
                                                                <td>
                                                                    <label class="danger">Pending</label>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td class="product-image">#215487</td>
                                                                <td>
                                                                    <h6>Raw Mutton Leg</h6>
                                                                </td>
                                                                <td>
                                                                    <label class="danger">Pending</label>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td class="product-image">#365474</td>
                                                                <td>
                                                                    <h6>Instant Coffee</h6>
                                                                </td>
                                                                <td>
                                                                    <label class="success">Shipped</label>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td class="product-image">#368415</td>
                                                                <td>
                                                                    <h6>Jowar Stick and Jowar Chips</h6>
                                                                </td>
                                                                <td>
                                                                    <label class="danger">Pending</label>
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

                            <div class="tab-pane fade" id="pills-product" role="tabpanel"
                                aria-labelledby="pills-product-tab">
                                <div class="product-tab">
                                    <div class="title">
                                        <h2>All Posts</h2>
                                        <span class="title-leaf">
                                            <svg class="icon-width bg-gray">
                                              
                                            </svg>
                                        </span>
                                    </div>
                                    <button class="btn btn-sm theme-bg-color text-white" data-bs-toggle="modal"
                                                data-bs-target="#edit-profile">Add Post</button>
                                                <br></br>
                                    <div class="table-responsive dashboard-bg-box">
                                        <table class="table product-table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Images</th>
                                                    <th scope="col">Product Name</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Stock</th>
                                                    <th scope="col">Sales</th>
                                                    <th scope="col">Edit / Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="product-image">
                                                        <img src="./../../../assets/User/images/vegetable/product/1.png"
                                                            class="img-fluid" alt="" />
                                                    </td>
                                                    <td>
                                                        <h6>Fantasy Crunchy Choco Chip Cookies</h6>
                                                    </td>
                                                    <td>
                                                        <h6 class="theme-color fw-bold">$25.69</h6>
                                                    </td>
                                                    <td>
                                                        <h6>63</h6>
                                                    </td>
                                                    <td>
                                                        <h6>152</h6>
                                                    </td>
                                                    <td class="efit-delete">
                                                        <i data-feather="edit" class="edit"></i>
                                                        <i data-feather="trash-2" class="delete"></i>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td class="product-image">
                                                        <img src="./../../../assets/User/images/vegetable/product/2.png"
                                                            class="img-fluid" alt="" />
                                                    </td>
                                                    <td>
                                                        <h6>Peanut Butter Bite Premium Butter Cookies 600 g</h6>
                                                    </td>
                                                    <td>
                                                        <h6 class="theme-color fw-bold">$35.36</h6>
                                                    </td>
                                                    <td>
                                                        <h6>14</h6>
                                                    </td>
                                                    <td>
                                                        <h6>34</h6>
                                                    </td>
                                                    <td class="efit-delete">
                                                        <i data-feather="edit" class="edit"></i>
                                                        <i data-feather="trash-2" class="delete"></i>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td class="product-image">
                                                        <img src="./../../../assets/User/images/vegetable/product/3.png"
                                                            class="img-fluid" alt="" />
                                                    </td>
                                                    <td>
                                                        <h6>Yumitos Chilli Sprinkled Potato Chips 100 g</h6>
                                                    </td>
                                                    <td>
                                                        <h6 class="theme-color fw-bold">$78.55</h6>
                                                    </td>
                                                    <td>
                                                        <h6>55</h6>
                                                    </td>
                                                    <td>
                                                        <h6>78</h6>
                                                    </td>
                                                    <td class="efit-delete">
                                                        <i data-feather="edit" class="edit"></i>
                                                        <i data-feather="trash-2" class="delete"></i>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="product-image">
                                                        <img src="./../../../assets/User/images/vegetable/product/4.png"
                                                            class="img-fluid" alt="" />
                                                    </td>
                                                    <td>
                                                        <h6>healthy Long Life Toned Milk 1 L</h6>
                                                    </td>
                                                    <td>
                                                        <h6 class="theme-color fw-bold">$32.98</h6>
                                                    </td>
                                                    <td>
                                                        <h6>69</h6>
                                                    </td>
                                                    <td>
                                                        <h6>135</h6>
                                                    </td>
                                                    <td class="efit-delete">
                                                        <i data-feather="edit" class="edit"></i>
                                                        <i data-feather="trash-2" class="delete"></i>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="product-image">
                                                        <img src="./../../../assets/User/images/vegetable/product/5.png"
                                                            class="img-fluid" alt="" />
                                                    </td>
                                                    <td>
                                                        <h6>Raw Mutton Leg, Packaging 5 Kg</h6>
                                                    </td>
                                                    <td>
                                                        <h6 class="theme-color fw-bold">$36.98</h6>
                                                    </td>
                                                    <td>
                                                        <h6>35</h6>
                                                    </td>
                                                    <td>
                                                        <h6>154</h6>
                                                    </td>
                                                    <td class="efit-delete">
                                                        <i data-feather="edit" class="edit"></i>
                                                        <i data-feather="trash-2" class="delete"></i>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="product-image">
                                                        <img src="./../../../assets/User/images/vegetable/product/6.png"
                                                            class="img-fluid" alt="" />
                                                    </td>
                                                    <td>
                                                        <h6>Cold Brew Coffee Instant Coffee 50 g</h6>
                                                    </td>
                                                    <td>
                                                        <h6 class="theme-color fw-bold">$36.58</h6>
                                                    </td>
                                                    <td>
                                                        <h6>69</h6>
                                                    </td>
                                                    <td>
                                                        <h6>168</h6>
                                                    </td>
                                                    <td class="efit-delete">
                                                        <i data-feather="edit" class="edit"></i>
                                                        <i data-feather="trash-2" class="delete"></i>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="product-image">
                                                        <img src="./../../../assets/User/images/vegetable/product/7.png"
                                                            class="img-fluid" alt="" />
                                                    </td>
                                                    <td>
                                                        <h6>SnackAmor Combo Pack of Jowar Stick and Jowar Chips</h6>
                                                    </td>
                                                    <td>
                                                        <h6 class="theme-color fw-bold">$25.69</h6>
                                                    </td>
                                                    <td>
                                                        <h6>63</h6>
                                                    </td>
                                                    <td>
                                                        <h6>152</h6>
                                                    </td>
                                                    <td class="efit-delete">
                                                        <i data-feather="edit" class="edit"></i>
                                                        <i data-feather="trash-2" class="delete"></i>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    
                                    </div>
                                </div>
                            </div>

                         

                            <div class="tab-pane fade" id="pills-profile" role="tabpanel"
                                aria-labelledby="pills-profile-tab">
                                <div class="dashboard-profile">
                                    <div class="title">
                                        <h2>My Profile</h2>
                                        <span class="title-leaf">
                                            <svg class="icon-width bg-gray">
                                               
                                            </svg>
                                        </span>
                                    </div>

                                    <div class="profile-tab dashboard-bg-box">
                                        <div class="dashboard-title dashboard-flex">
                                            <h3>Profile Name</h3>
                                            <button class="btn btn-sm theme-bg-color text-white" data-bs-toggle="modal"
                                                data-bs-target="#edit-profile">Edit Profile</button>
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


    <div class="modal fade theme-modal" id="edit-profile" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel3">Edit Your Profile</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form  onSubmit={addPost}>

                    <div class="mb-3">
                            <label htmlFor="country" class="form-label">Association</label>
                            <input type="text" class="form-control" id="country" value="107 Veltri Drive" />
                        </div>

                        <div class="mb-3">
                            <label for="companyName" class="form-label">Title</label>
                            <input type="text" class="form-control" value={title} onChange={(e)=>setTitle(e.target.value)}   />
                        </div>
                        <div class="mb-3">
                            <label htmlFor="emailAddress" class="form-label">Description</label>
                            <textarea type="text"  class="form-control" value={description} onChange={(e)=>setDescription(e.target.value)} />
                        </div>
                        
                        <div class="mb-3">
                            <label htmlFor="employees" class="form-label">Quantity</label>
                            <input type="number" class="form-control" value={quantity} onChange={(e)=>setQuantity(e.target.value)}  />
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



</div>




}