import { Navigate, Outlet } from "react-router"
import Navbar from "./Navbar";

import Sidebar from "./Sidebar";
import {isAdmin, isClient, isLoggedIn} from "../../AuthGuard";



export default function Admin(){

    
  
    return isLoggedIn() ? (
        isAdmin() ? (
          <div>
            <Navbar />
            <div>

                <div>
                    <Sidebar />
                </div>
                <div >
                    <Outlet />
                </div>
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


