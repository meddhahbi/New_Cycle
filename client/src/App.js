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

import Plan from './Components/UserInterface/Pages/Plan';
import Dashboard from './Components/AdminInterface/Pages/Dashboard';
import Donation from './Components/UserInterface/Pages/Donation';



function App() {
  return (
    <div>
      <Routes>
      <Route path="/" exact element={<User />}>

        <Route index element={<Home />} />
        {/*<Route  path='/login' element={<Login />} />*/}
        <Route  path='/register' exact element={<Register />} />
        <Route  path='/forgot' exact element={<Forgot />} />
        {/* <Route path="/reset/:id" element={<ResetPassword />}/> */}
        <Route path='/loginAssociation' exact element={<LoginAssociation />} />
        <Route  path='/login' exact element={<Login />} />

        <Route  path='/registerAssociation' element={<RegisterAssociation />} />


          <Route path='/me' exact element={<UserProfile />} />
          <Route path='/edit_me' exact element={<ProfileForm />} />
          <Route path='/blog' exact element={<BlogList />} />
          <Route path='/addBlog' exact element={<AddBlog />} />

          <Route path='/subscribe' exact element={<Plan />} />
          <Route path='/donate' exact element={<Donation />} />

      </Route>

      <Route path='/confirm/:activationCode' exact element={<ActivationPage />} />
  
      <Route path='/reset/:id' exact element={<ResetPassword />}/>



        <Route path="admin" exact element={<Admin />}>
        <Route path='' exact element={<Dashboard />} />

        
        
        </Route>

        
        {/* <Route path='/confirm/:activationCode' element={<ActivationPage />} /> */}

        <Route path='*' element={<PageNotFound/>}/> 

      </Routes>



    </div>
  );
}

export default App;
