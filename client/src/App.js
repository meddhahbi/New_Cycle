import logo from './logo.svg';
import './App.css';
import {Route, Routes } from 'react-router';
import User from './Components/UserInterface/User';
import Admin from './Components/AdminInterface/Admin';
import Home from './Components/UserInterface/Pages/Home';
import Login from './Components/UserInterface/Pages/Login';
import PageNotFound from './Components/PageNotFound';
import Register from './Components/UserInterface/Pages/Register';
import Forgot from './Components/UserInterface/Pages/Forgot';

function App() {
  return (
    <div>
     
      <Routes>
        <Route path="/" element={<User />}>

          <Route index element={<Home />} />
          <Route  path='/login' element={<Login />} />
          <Route  path='/register' element={<Register />} />
          <Route  path='/forgot' element={<Forgot />} />
        
        
        </Route>
      


     
        <Route path="/admin" element={<Admin />}>

        
        
        </Route>
     
        <Route path='*' element={<PageNotFound/>}/> 
     
      </Routes>



    </div>
  );
}

export default App;
