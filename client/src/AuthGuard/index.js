export const isLoggedIn = ()=>{
    let data = localStorage.getItem("token");
    if(data != null ) return true;
    else return false;
}


export const isAdmin = ()=>{
    let role = localStorage.getItem("role");
    if(role == "admin") return true
    else return false;
}

export const isAssociation= ()=>{
    let role = localStorage.getItem("role");
    if(role == "association") return true
    else return false
}