import './App.css';
import {Route, Routes, useNavigate} from 'react-router';
import User from './Components/UserInterface/User';
import Admin from './Components/AdminInterface/Admin';
import Home from './Components/UserInterface/Pages/Home';
import Login from './Components/UserInterface/Pages/Login';
import Register from './Components/UserInterface/Pages/Register';
import Forgot from './Components/UserInterface/Pages/Forgot';
import ActivationPage from './Components/UserInterface/Pages/ActivationPage';
import Produit from './Components/Produit/Pages/Produit';
import AllProduit from './Components/Produit/Pages/AllProduit';
import UpdateProduct from './Components/Produit/Pages/UpdateProduct';
import ResetPassword from './Components/UserInterface/Pages/resetPassword';
import LoginAssociation from './Components/UserInterface/Pages/LoginAssociation';
import UserProfile from "./Components/UserInterface/Pages/UserProfile";
import PageNotFound from './Components/UserInterface/PageNotFound';
import RegisterAssociation from './Components/UserInterface/Pages/RegisterAssociation';
import ProfileForm from "./Components/UserInterface/Pages/profileForm";
import Wishlist from './Components/Produit/Pages/wishlist';
import Comparer from './Components/Produit/Pages/Comparer';

import BlogList from './Components/BlogInterface/BlogList';
import AddBlog from './Components/BlogInterface/addBlog'



import GetBlog from './Components/BlogInterface/getBlog'


import Plan from './Components/UserInterface/Pages/Plan';
import authMiddleware from "./middleware/middleware";
import Chats from "./Components/UserInterface/Pages/Chat/Chats";
import Dashboard from './Components/AdminInterface/Pages/Dashboard';
import Associations from './Components/AdminInterface/Pages/Associations';

import Donation from './Components/UserInterface/Pages/Donation';

import { useState, useEffect } from 'react';



import UpdateBlog from './Components/BlogInterface/updateBlog';
import Scraped from './Components/BlogInterface/scraped';
import DashboardAssociation from './Components/UserInterface/Pages/Assosiation/DashboardAssociation';
import ChatGeoLoc from "./Components/UserInterface/Pages/Chat/ChatGeoLoc";
import MapContainerr from "./Components/UserInterface/Pages/Chat/MapContainer";
import Mapp from "./Components/UserInterface/Pages/Chat/Osm-providers";
import AllPosts from './Components/BlogInterface/AllPosts';
import AllAssoPosts from './Components/BlogInterface/AssoPosts';




function App() {

  return (
    <div>
      
      <Routes>

      <Route path="/" exact element={<User />}>

    <Route  path='/produit' element={<Produit />} />

          <Route  path='/AllProduit' element={<AllProduit />} />

        <Route exact index element={<Home />} />
        {/*<Route  path='/login' element={<Login />} />*/}


        <Route  path='/register' exact element={<Register />} />
        <Route  path='/forgot' exact element={<Forgot />} />
        {/* <Route path="/reset/:id" element={<ResetPassword />}/> */}
        <Route path='/loginAssociation' exact element={<LoginAssociation />} />
        <Route  path='/login' exact element={<Login />} />



        <Route exact path='/registerAssociation' element={<RegisterAssociation />} />


          <Route path='/me' element={<UserProfile />}/>
          <Route path='/geo_loc' element={<ChatGeoLoc />}/>
          <Route path='/edit_me' element={<ProfileForm />}/>
          <Route path='/subscribe' element={<Plan />} />
          <Route path='/client_messages' element={<Chats />} />
          <Route path='/client_message_blog' element={<Chats />} />







          <Route exact path='/blog' element={<BlogList />} />
          <Route exact path='/addBlog' element={<AddBlog />} />
          
          <Route path='/me' exact element={<UserProfile />} />
          <Route path='/edit_me' exact element={<ProfileForm />} />
        


          <Route path='/subscribe' exact element={<Plan />} />
          <Route path='/donate' exact element={<Donation />} />

          <Route path='/me' exact element={<UserProfile />} />
          <Route path='/edit_me' exact element={<ProfileForm />} />
        


          <Route path='/subscribe' exact element={<Plan />} />
          <Route path='/donate' exact element={<Donation />} />

          <Route exact path='/scraped' element={<Scraped />} />
          
          

      </Route>




          <Route exact path='/association' element={<DashboardAssociation />} />
          <Route exact path='/allPosts' element={<AllPosts />} />
          <Route exact path='/allPostsAsso' element={<AllAssoPosts />} />
          <Route exact path='/map' element={<Mapp />} />
          <Route  path='/UpdateProduct/:id' element={<UpdateProduct />} />
          <Route  path='/wishlist/:userId' element={<Wishlist />} />
          <Route  path='/comparison/:id' element={<Comparer />} />

      <Route path='/confirm/:activationCode' exact element={<ActivationPage />} />
  
      <Route path='/reset/:id' exact element={<ResetPassword />}/>


        <Route exact path='/getBlog/:id' element={<GetBlog />} />
        <Route exact path='/updateBlog/:id' element={<UpdateBlog />} />
        


      <Route exact path='/reset/:id' element={<ResetPassword />}/>
      

     
     


     
     


     
            
        <Route path="admin" exact element={<Admin />}>
        
        <Route path='' exact element={<Dashboard />} />
        <Route path='associations' exact element={<Associations />}/>

        
       
        
        </Route>
    

        
        {/* <Route path='/confirm/:activationCode' element={<ActivationPage />} /> */}

        <Route path='*' element={<PageNotFound/>}/> 

      </Routes>



    </div>
  );
}

export default App;
