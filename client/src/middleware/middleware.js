export default function authMiddleware(func) {
    if (!isLoggedIn()) {
        func('/login');
    }
}
const isLoggedIn = ()=>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // const {user} = UserState();
    console.log("userInfo");

    return !!userInfo;
}
