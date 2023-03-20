import { Outlet } from "react-router"
import NavbarAdmin from "./Navbar";


export default function Admin(){


    return <div>

        {/*<NavbarAdmin />*/}
        <Outlet />
        <div>Admin</div>



    </div>




}
