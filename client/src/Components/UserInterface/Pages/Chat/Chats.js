import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import LoadingPage from "../../../Loading";
import {useNavigate} from "react-router";
import TimeAgo from "react-timeago";
import style from "./style.css"
import {Link} from "react-router-dom";
const Chats = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [newMessage, setnewMessage] = useState();
    const [sidebarStyle, setSidebarStyle] = useState();
    const [other, setOther] = useState();
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const elementRef = useRef();
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };

    const getMessages = async ()=>{

        const { data:messages } = await axios.get("/message/"+localStorage.getItem("chats"), config);
        // console.log(data)
        setMessages(messages.slice(messages.length-11, messages.length));
        return messages
    }
    const getChats = async ()=>{

        // console.log("data")
        const { data:chats } = await axios.get("/chat", config);
        // console.log(data)
        // console.log("chatssss")
        setChats(chats);
        return chats
    }
    const getOther = async ()=>{

        // console.log("data")
        const { data } = await axios.get("/chat/get_other/"+localStorage.getItem("chats"), config);
        // console.log(data)
        setOther(data)
        return data
    }
    const handleChange = (e) =>{
        setnewMessage(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "/message"
            const { data } = await axios.post("/message", {
                content: newMessage,
                chatId: localStorage.getItem("chats"),
            },
                config);
            console.log(url)
            console.log(newMessage)
        } catch (e) {
            console.log(e)
        }
        setnewMessage("")
    }
    useEffect(()=>{

        getMessages().then()

        if(isLoading){
            getChats().then()
            // setSidebarStyle({borderRight:"thick double #bbb", maxWidth:"300px"})
            getOther().then(()=>{})
                // window.scrollTo(0, document.body.scrollHeight))

            if (!userInfo) {
                // authMiddleware(navigate)
                navigate("/login",{});


            }
            console.log(chats)
            setTimeout(()=> {

                setIsLoading(false)
            }, 1000);
        }

    })

    return (
        <div ref={elementRef}>
            {isLoading ? <LoadingPage/> :
            <div
                className="chats row container-fluid"

            >

                <div className="header-nav">
                    <div className="header-nav-middle">
                        <div className="main-nav navbar navbar-light ">
                            <div className="offcanvas offcanvas-collapse order-xl-2" id="primaryMenu">
                                <div className="offcanvas-header navbar-shadow">
                                    <h5>Chats</h5>
                                    <button className="btn-close lead" type="button" data-bs-dismiss="offcanvas"
                                            aria-label="Close"/>
                                </div>
                                <div className="offcanvas-body sidebar-nav">
                                    <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary sidebar"
                                         style={sidebarStyle}>
                                        <div className="list-group list-group-flush border-bottom scrollarea">
                                            {chats?.map((chat) => (
                                                <div>
                                                    {chat.latestMessage?
                                                                <a href="#" className={
                                                                    localStorage.getItem("chats") === chat._id?"list-group-item list-group-item-action py-3 lh-sm active":"list-group-item list-group-item-action py-3 lh-sm"
                                                                }
                                                                   aria-current="true" onClick={()=>{
                                                                    console.log(chat.latestMessage)
                                                                }}

                                                                   key={chat._id}
                                                                >
                                                                    <div className="d-flex w-100 align-items-center justify-content-between">
                                                                        <strong className="mb-1">
                                                                                <span>
                                                                                    {chat.latestMessage?.sender.username}
                                                                            </span>
                                                                        </strong>
                                                                        <small> </small>
                                                                        {/*<small>{chat.latestMessage?.updatedAt} </small>*/}
                                                                    </div>
                                                                    <div className="col-10 mb-1 small">
                                                                            <span className="username">
                                                                        {chat.latestMessage?.sender._id === userInfo._id?
                                                                            <div className="latest-message">
                                                                                <strong>You: <strong className="latest-message2">{chat.latestMessage.content}</strong></strong>
                                                                            </div>
                                                                            :<span className="latest-message">{chat.latestMessage.content}</span>
                                                                        }
                                                                        </span>
                                                                    </div>
                                                                </a>
                                                        :
                                                        ""
                                                    }
                                                </div>

                                            ))
                                            }
                                        </div>
                                    </div>
                                    <ul className="navbar-nav">
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#"
                                               data-bs-toggle="dropdown">Home </a>
                                        </li>

                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#"
                                               data-bs-toggle="dropdown">Shop</a>
                                        </li>

                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#"
                                               data-bs-toggle="dropdown">Product</a>

                                        </li>

                                        <li className="nav-item dropdown dropdown-mega">
                                            <a className="nav-link dropdown-toggle ps-xl-2 ps-0"
                                               href="#" data-bs-toggle="dropdown">Mega Menu</a>

                                        </li>

                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#"
                                               data-bs-toggle="dropdown">Blog</a>

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    {messages?.sort((a,b)=>b.createdAt - a.createdAt).map((chat) => (
                        <div
                            className="userChat"
                            key={chat.id}
                        >

                            {chat.sender._id === userInfo._id?
                                <div className="userChatInfoRight">

                                    <div className="userChatInfo darker">
                                        <div className="right userInfo">
                                            <div className="user" >
                                                {/*<span className="username">{chat.sender.username}</span>*/}
                                                <img src="../../../../../assets/User/images/inner-page/user/default.png"
                                                     data-toggle="tooltip" data-placement="top" title={chat.sender.username}
                                                     className="right-img"
                                                />
                                            </div>
                                        </div>
                                        <div className="message">
                                            <p>{chat.content}</p>
                                        </div>
                                        <span className="time-right"><TimeAgo date={chat.updatedAt} /></span>
                                    </div>
                                </div>
                                :
                                <div className="userChatInfo">
                                    <div className="user">
                                        <img src="../../../../../assets/User/images/inner-page/user/default.png"
                                             alt={chat.sender.username}
                                             className="left-img"
                                        />
                                        <span className="username">{chat.sender.username}</span>
                                    </div>

                                    <div className="right">
                                        <p>{chat.content}</p>
                                    </div>

                                    <span className="time-left"><TimeAgo date={chat.updatedAt} /></span>
                                </div>
                            }
                        </div>
                    ))}



                </div>
                <div className="send-message">
                    <form action="" onSubmit={handleSubmit} >
                        <input value={newMessage} type="text" className="form-control chat-input" placeholder="write something"
                            onChange={handleChange}
                        />
                    </form>
                </div>
            </div>

            }
        </div>
    );
}

export default Chats;
