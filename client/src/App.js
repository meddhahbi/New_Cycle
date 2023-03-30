import './App.css';
import {Route, Routes, useNavigate} from 'react-router';
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
import Plan from './Components/UserInterface/Pages/Plan';
import authMiddleware from "./middleware/middleware";
import Chats from "./Components/UserInterface/Pages/Chat/Chats";


function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<User />}>

        <Route index element={<Home />} />
        {/*<Route  path='/login' element={<Login />} />*/}
        <Route  path='/register' element={<Register />} />
        <Route  path='/forgot' element={<Forgot />} />
        {/* <Route path="/reset/:id" element={<ResetPassword />}/> */}
        <Route path='/loginAssociation' element={<LoginAssociation />} />
        <Route  path='/login' element={<Login />} />

        <Route  path='/registerAssociation' element={<RegisterAssociation />} />


          <Route path='/me' element={<UserProfile />}/>
          <Route path='/edit_me' element={<ProfileForm />}/>
          <Route path='/subscribe' element={<Plan />} />
          <Route path='/client_messages' element={<Chats />} />





      </Route>



          {/* <Route  path='/register' element={<Register />} />
          <Route  path='/forgot' element={<Forgot />} /> */}
          {/* <Route path="/reset/:id" element={<ResetPassword />}/> */}
          {/* <Route path='/loginAssociation' element={<LoginAssociation />} /> */}
          <Route path='/confirm/:activationCode' element={<ActivationPage />} />
  
        <Route path='/reset/:id' element={<ResetPassword />}/>



        <Route path="/admin" element={<Admin />}>

        
        
        </Route>


        <Route path='/confirm/:activationCode' element={<ActivationPage />} />

        <Route path='*' element={<PageNotFound/>}/> 

      </Routes>



    </div>
  );
}

export default App;
