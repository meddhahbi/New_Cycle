import { Outlet } from "react-router"
import Navbar from "./Navbar";

import Sidebar from "./Sidebar";



export default function Admin(){


    return <div>
        <Navbar />
        <div className="col-md-3">
        <Sidebar/>
        </div>
        <div className="col-md-9">
        <Outlet />
        </div>
        </div>






}
