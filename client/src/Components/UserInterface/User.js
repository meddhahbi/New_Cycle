// import axios from "axios"
// import { useEffect, useState } from "react"
import { Outlet } from "react-router"
import Footer from "./Footer"
import Navbar from "./Navbar"


export default function User(){
    

    return <div>

        <div><Navbar /></div>
        <Outlet />
        <div><Footer /></div>



    </div>




}