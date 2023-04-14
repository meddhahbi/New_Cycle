import './App.css';
import { Route, Routes } from 'react-router';
import User from './Components/UserInterface/User';
import Admin from './Components/AdminInterface/Admin';
import Home from './Components/UserInterface/Pages/Home';
import Login from './Components/UserInterface/Pages/Login';
import Register from './Components/UserInterface/Pages/Register';
import Forgot from './Components/UserInterface/Pages/Forgot';
import ActivationPage from './Components/UserInterface/Pages/ActivationPage';
import ResetPassword from './Components/UserInterface/Pages/resetPassword';
import LoginAssociation from './Components/UserInterface/Pages/LoginAssociation';
import UserProfile from "./Components/UserInterface/Pages/UserProfile";
import PageNotFound from './Components/UserInterface/PageNotFound';
import RegisterAssociation from './Components/UserInterface/Pages/RegisterAssociation';
import ProfileForm from "./Components/UserInterface/Pages/profileForm";

import BlogList from './Components/BlogInterface/BlogList';
import AddBlog from './Components/BlogInterface/addBlog'

import GetBlog from './Components/BlogInterface/getBlog'

import Plan from './Components/UserInterface/Pages/Plan';

import Dashboard from './Components/AdminInterface/Pages/Dashboard';
import UpdateBlog from './Components/BlogInterface/updateBlog';
import Scraped from './Components/BlogInterface/scraped';





function App() {
  return (
    <div>
      <Routes>
      <Route exact path="/" element={<User />}>

        <Route exact index element={<Home />} />
        {/*<Route  path='/login' element={<Login />} />*/}
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/forgot' element={<Forgot />} />
        {/* <Route path="/reset/:id" element={<ResetPassword />}/> */}
        <Route exact path='/loginAssociation' element={<LoginAssociation />} />
        <Route exact path='/login' element={<Login />} />

        <Route exact path='/registerAssociation' element={<RegisterAssociation />} />


          <Route exact path='/me' element={<UserProfile />} />
          <Route  exact path='/edit_me' element={<ProfileForm />} />


          <Route exact path='/blog' element={<BlogList />} />
          <Route exact path='/addBlog' element={<AddBlog />} />
          
         

          <Route exact path='/subscribe' element={<Plan />} />


          <Route exact  path='/subscribe' element={<Plan />} />
          <Route exact path='/scraped' element={<Scraped />} />
        


      </Route>

      <Route exact path='/confirm/:activationCode' element={<ActivationPage />} />
  

        <Route exact path='/reset/:id' element={<ResetPassword />}/>
        <Route exact path='/getBlog/:id' element={<GetBlog />} />
        <Route exact path='/updateBlog/:id' element={<UpdateBlog />} />
        

      <Route exact path='/reset/:id' element={<ResetPassword />}/>




        <Route exact path="admin" element={<Admin />}>
        <Route exact path='dashboard' element={<Dashboard />} />

        
        
        </Route>

        
        {/* <Route path='/confirm/:activationCode' element={<ActivationPage />} /> */}

        <Route path='*' element={<PageNotFound/>}/> 

      </Routes>



    </div>
  );
}

export default App;
