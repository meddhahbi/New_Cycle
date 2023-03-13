import './App.css';
import {Route, Routes } from 'react-router';
import User from './Components/UserInterface/User';
import Admin from './Components/AdminInterface/Admin';
import Home from './Components/UserInterface/Pages/Home';
import Login from './Components/UserInterface/Pages/Login';
import PageNotFound from './Components/PageNotFound';
import Register from './Components/UserInterface/Pages/Register';
import Forgot from './Components/UserInterface/Pages/Forgot';
import ActivationPage from './Components/UserInterface/Pages/ActivationPage';
import ResetPassword from './Components/UserInterface/Pages/resetPassword';
import LoginAssociation from './Components/UserInterface/Pages/LoginAssociation';


function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<User />}>

        <Route index element={<Home />} />
        <Route  path='/login' element={<Login />} />
        <Route  path='/register' element={<Register />} />
        <Route  path='/forgot' element={<Forgot />} />
        <Route path="/reset/:id" element={<ResetPassword />}/>
        <Route path='/confirm/:activationCode' element={<ActivationPage />} />
        <Route path='/loginAssociation' element={<LoginAssociation />} />



      </Route>
  
        



        <Route path="/admin" element={<Admin />}>

        
        
        </Route>

        <Route path='*' element={<PageNotFound/>}/> 

      </Routes>



    </div>
  );
}

export default App;
