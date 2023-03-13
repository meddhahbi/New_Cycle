import { Outlet } from "react-router"
import Navbar from "../Navbar"
import Footer from "../Footer"


export default function User(){


    return <div>

        <div><Navbar /></div>
        <Outlet />
        <div><Footer /></div>



    </div>




}