import { Outlet } from "react-router"
import Navbar from "./Navbar";

import Sidebar from "./Sidebar";



export default function Admin(){


    return <div>
        <Navbar />
        <Sidebar/>
        <Outlet />

        </div>






}
