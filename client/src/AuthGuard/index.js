export const isLoggedIn = ()=>{
    let data = localStorage.getItem("token");
    return data != null;
}


export const isAdmin = ()=>{
    let role = localStorage.getItem("role");
    return role === "admin";
}

export const isAssociation= ()=>{
    let role = localStorage.getItem("role");
    return role === "association";
}

export const isClient= ()=>{
    let role = localStorage.getItem("role");
    return role === "client";
}


// export const isSubs= ()=>{
// const userInfo = JSON.parse(localStorage.getItem('userInfo'));
// const subscriptionStatus = userInfo.subscription.status;
// return subscriptionStatus;

   
// }