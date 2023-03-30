import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";

const UserContext = createContext();
function UserProvider({children}) {
    const [user, setUser] = useState();
    const history = useNavigate();

    useEffect(() => {
        console.log("hello")
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (!userInfo) {
            console.log("no user")
            window.location = "/login";
        }
        else{

            setUser(userInfo);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history]);
    return (
        <UserContext.Provider value={
            user
        }>

        </UserContext.Provider>
    );
}
export const UserState = () => {
    return useContext(UserContext);
};

export default UserProvider;
