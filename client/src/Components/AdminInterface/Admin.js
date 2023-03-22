import { Outlet } from "react-router"

import Sidebar from "./Sidebar";


export default function Admin(){


    return <div>
    
        <Sidebar/>
        <Outlet />
        <div>Admin</div>

        </div>






}
