import { Navigate, Outlet } from "react-router"
import Navbar from "./Navbar";

import Sidebar from "./Sidebar";
import {isAdmin, isClient, isLoggedIn} from "../../AuthGuard";



export default function Admin(){

    
  
    return isLoggedIn() ? (
        isAdmin() ? (
          <div>
            <Navbar />
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <Outlet />
            </div>
          </div>
        ) :isClient()? (
          <Navigate to={"/"} />
        ):(
            <Navigate to={"/association"} />
        )
      ) : (
        <Navigate to={"/login"} />
      );
    };


