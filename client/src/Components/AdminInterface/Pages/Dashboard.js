
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/dashboard.css'
import Swal from 'sweetalert2';


export default function Dashboard(){


    const [users, setUsers] = useState([]);
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [reportedCount, setReportedCount] = useState(0);
    const [pendingUsersCount, setPendingUsersCount] = useState(0);
    const [postCount, setPostCount] = useState(0);




    useEffect(() => {
        axios.get('http://localhost:3001/users')
          .then(response => setUsers(response.data))
          .catch(error => console.log(error));
      }, []);

      useEffect(() => {
        axios.get('http://localhost:3001/article/count/article')
          .then(response => setPostCount(response.data))
          .catch(error => console.log(error));
      }, []);




      useEffect(() => {
        axios.get('http://localhost:3001/count/reported')
          .then(response => setReportedCount(response.data))
          .catch(error => console.log(error));
      }, []);


      useEffect(() => {
        axios.get('http://localhost:3001/count')
          .then(response => setUserCount(response.data))
          .catch(error => console.log(error));
      }, []);



      useEffect(() => {
        axios.get('http://localhost:3001/count/notActive')
          .then(response => setPendingUsersCount(response.data))
          .catch(error => console.log(error));
      }, []);





      useEffect(() => {
        axios.get('http://localhost:3001/bloked')
          .then(response => setBlockedUsers(response.data))
          .catch(error => console.log(error));
      }, []);

      

    
      const handleBlockUser=(id)=>{

       
        
         Swal.fire({
            title: 'Do you want to block this user?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.put(`/block/${id}`)
              window.location.reload();
            }
          })
        .catch(error => {
          console.log(error);
        });

      }


      const handleUnblockUser=(id)=>{
         Swal.fire({
            title: 'Do you want to unblock this user?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.put(`/unblock/${id}`)
        
              window.location.reload();
            }
          })
        
        .catch(error => {
          console.log(error);
        });

      }


    

      //localhost:3001/association

return <div style={{width:"80%"}} className="div1">
{/*<div className="div1">*/}
<section className="user-dashboard-section section-b-space">
        <div className="container-fluid">
            <div className="row" style={{width:"100%"}}>
                <div className="col-xxl-12 col-lg-12">
                    <button className="btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none">Show
                        Menu</button>
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
                                                    <img src="../../assets/User/images/icon/list.png"
                                                        className="img-1 blur-up lazyload" alt="" />
                                                    <img src="../../assets/User/images/icon/listD.png" className="blur-up lazyload"
                                                        alt="" />
                                                    <div className="totle-detail">
                                                        <h5>Total Users</h5>
                                                        <h3>{userCount}</h3>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                <div className="totle-contain">
                                                    <img src="../../assets/User/images/icon/user.png"
                                                        className="img-1 blur-up lazyload" alt="" />
                                                    <img src="../../assets/User/images/icon/userD.png" className="blur-up lazyload"
                                                        alt="" />
                                                    <div className="totle-detail">
                                                        <h5>Total Users Pending</h5>
                                                        <h3>{pendingUsersCount} </h3>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                <div className="totle-contain">
                                                    <img src="../../assets/User/images/icon/userreport.png"
                                                        className="img-1 blur-up lazyload" alt="" />
                                                    <img src="../../assets/User/images/icon/reportD.png" className="blur-up lazyload"
                                                        alt="" />
                                                    <div className="totle-detail">
                                                        <h5>Total Repoted</h5>
                                                        <h3>{reportedCount}</h3>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                <div className="totle-contain">
                                                    <img src="../../assets/User/images/icon/blog.png"
                                                        className="img-1 blur-up lazyload" alt="" />
                                                    <img src="../../assets/User/images/icon/blogD.png"
                                                        className="blur-up lazyload" alt="" />
                                                    <div className="totle-detail">
                                                        <h5>Total Users Posts</h5>
                                                        <h3>{postCount}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row g-4">
                                       

                                        <div className="col-xxl-6">
                                            <div className="table-responsive dashboard-bg-box">
                                                <div className="dashboard-title mb-4">
                                                    <h3>Blocked Users</h3>
                                                </div>

                                                <table className="table product-table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Username</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Phone</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {blockedUsers.map(Blockeduser => (
                                                                    <tr key={Blockeduser.id}>
                                                                    <td>{Blockeduser.username}</td>
                                                                    <td>{Blockeduser.email}</td>
                                                                    <td>{Blockeduser.phone}</td>
                                                                    <td><button onClick={() => handleUnblockUser(Blockeduser._id)} className="bg-success text-white" style={{backgroundColor: "green", color: "white", border: "none"}}>Unblock</button></td>

                                                                    </tr>
                                                                ))}

                                                      
                                                       

                                                      
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="col-xxl-6">
                                            <div className="order-tab dashboard-bg-box">
                                                <div className="dashboard-title mb-4">
                                                    <h3>List of users</h3>
                                                </div>

                                                <div className="table-responsive">
                                                    <table className="table order-table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Username</th>
                                                                <th scope="col">Email</th>
                                                                <th scope="col">Phone</th>
                                                                <th scope="col">Active</th>
                                                                <th scope="col">Blocked</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {/* {users && users.map((item) => (
                                                                <tr key={item._id} id={item._id}>
                                                                    <td className="product-image">{item.email}</td>
                                                                    <td>
                                                                    <h6>test</h6>
                                                                    </td>
                                                                    <td>
                                                                    <label className="success">Shipped</label>
                                                                    </td>
                                                                </tr>
                                                                ))} */}
                                                                  {users.map(user => (
                                                                    <tr key={user.id}>
                                                                    <td>{user.username}</td>
                                                                    <td>{user.email}</td>
                                                                    <td>{user.phone}</td>
                                                                    <td>{user.isActive ? 
                                                                        <label className="success">Active</label> : 
                                                                        <label className="bg-secondary text-white">Pending</label>}</td>
                                                                    <td>{user.isBlocked ?  <label className="bg-danger text-white">Yes</label> : 
                                                                    <label className="bg-success text-white">No</label>
                                                                       }</td>
                                                                    <td><button onClick={() => handleBlockUser(user._id)} className="bg-danger text-white" style={{backgroundColor: "red", color: "white", border: "none"}}>Block</button></td>

                                                                    </tr>
                                                                ))}
                                                            {/* <tr>
                                                                <td className="product-image">#254834</td>
                                                                <td>
                                                                    <h.6>Choco Chip Cookies</h.6>
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
                                                            </tr> */}

                                                          

                                                         
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
{/*</div>*/}

</div>


}
