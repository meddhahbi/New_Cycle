import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import LoadingPage from "../../../Loading";
import {useNavigate} from "react-router";
import style from "./style.css"
import {Link} from "react-router-dom";
import Message from "./Message";
import Chat from "./Chat";
const Chats = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [newMessage, setnewMessage] = useState();
    const [selectedReason, setSelectedReason] = useState();
    const messagesEndRef = useRef(null);
    const textAreaRef = useRef(null);
    const [other, setOther] = useState();
    const [reported, setReported] = useState();
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const elementRef = useRef();
    const chatId = localStorage.getItem("chats")
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };

    let count = 0



    const onChangeSelect=(e)=> {
        setSelectedReason(e.target.value);
        console.log(e.target.value)
        console.log("reported")
        console.log(reported)
    }

    const getMessages = async ()=>{

        let { data:messages } = await axios.get("http://localhost:3001/message/"+chatId, config)
        setMessages(messages);
        return messages
    }
    const getChats = async ()=>{
        const { data:chats } = await axios.get("http://localhost:3001/chat", config);
        setChats(chats);
        return chats
    }
    const getOther = async ()=>{

        // console.log("data")
        const { data } = await axios.get("http://localhost:3001/chat/get_other/"+chatId, config);
        // console.log(data)
        setOther(data)
        // console.log("other")
        // console.log(other)
        return data
    }
    const handleChange = (e) =>{
        const chatboxForm = document.querySelector('.chatbox-message-form')
        let line = e.target.value.split('\n').length

        if(e.target.rows < 6 || line < 6) {
            e.target.rows = line
        }
        if(e.target.rows > 1) {
            chatboxForm.style.alignItems = 'flex-end'
        } else {
            chatboxForm.style.alignItems = 'center'
        }

        console.log(e.target.value)
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
            getMessages().then()
            getChats().then()
            // console.log(url)
            // console.log(newMessage)
        } catch (e) {
            console.log(e)
        }
        setnewMessage("")
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            handleSubmit(e).then();
        }
        e.target.rows = 1
    };
    const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(()=>{
        const intervalId = setInterval(() => {
            // count+=1;
            // console.log("message" + count)
        }, 1000);


        getOther().then(()=>{})
        getChats().then()
        getMessages().then(
            ()=>{
            }
        )

        if(isLoading){
            window.scrollTo(0, document.body.scrollHeight)


            scrollToBottom()
            if (!userInfo) {
                // authMiddleware(navigate)
                navigate("/login",{});


            }
            // console.log(chats)
            setTimeout(()=> {

                // window.scrollTo(0, document.body.scrollHeight)
                setIsLoading(false)
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    },[chatId, messages])


    // const [checked, setChecked] = useState(false);
    // const toggleChecked = () => {
    //     setChecked(!checked);
    // }

    const handleSetReported = async(data)=>{
        setReported(data)
        console.log(data)
    };
    const ReportUser=async ()=>{
            const message = "user "+reported.username+" is going to be reported!"
            console.log(message)
            const reportUserUrl = "/reportUser"
            try{
                const{data:rep} = await axios.post(reportUserUrl,{
                    userId:reported._id
                }, config)
                console.log(rep)
            }
            catch (e) {
                console.log(e.message)
            }
        //
        //     setIsLoading(true)
        //     setChecked(false)
        //
        //     setTimeout(()=>{
        //         setIsLoading(false)
        //     }, 1000)
    };
    return (
        <div ref={elementRef}>
            {isLoading ? <LoadingPage/> :
            <div
                className="chats row container-fluid"

            >
                <div className="offcanvas offcanvas-collapse order-xl-2 col-5" id="primaryMenu">
                    <div className="offcanvas-header navbar-shadow">
                        <h5>Chats</h5>
                        <button className="btn-close lead" type="button" data-bs-dismiss="offcanvas"
                                aria-label="Close"/>
                    </div>
                    <div className="offcanvas-body sidebar-nav">
                        <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary sidebar"
                             >
                            <div className="list-group list-group-flush border-bottom scrollarea">
                                {chats?.map((chat) => (
                                    <div>
                                        {chat.latestMessage?
                                            <a href="#" className={
                                                localStorage.getItem("chats") === chat._id?"list-group-item list-group-item-action py-3 lh-sm active":"list-group-item list-group-item-action py-3 lh-sm"
                                            }
                                               aria-current="true" onClick={()=>{
                                                // console.log(chat.latestMessage)
                                            }}

                                               key={chat._id}
                                            >
                                                <div className="d-flex w-100 align-items-center justify-content-between">
                                                    <strong className="mb-1">
                                                        <span>
                                                            {other&&other.username}
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
                                                            :
                                                            <span className="latest-message">{chat.latestMessage.content}</span>
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
                    </div>
                </div>
                <div className="row">
                    <div className="col-5 messages-content">
                        <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary sidebar sticky-header sidebar-sticky col-4"
                             >
                            <div className="list-group list-group-flush border-bottom scrollarea">
                                {chats?.map((chat) => (
                                    <div key={chat._id}>
                                        {chat.latestMessage?
                                            <Chat
                                                chat={chat}
                                                setIsLoading={setIsLoading}
                                                isLoading={isLoading}
                                                userInfo={userInfo}
                                                onSetReported={handleSetReported}
                                                other = {
                                                    chat.users[0]._id===userInfo._id?
                                                            chat.users[1]
                                                            :
                                                            chat.users[0]
                                                }
                                            />

                                            :
                                            ""
                                        }
                                    </div>

                                ))
                                }
                            </div>
                        </div>
                    </div>



                    <div className="col-7 list-messages" id="list-messages">
                        {messages?.sort((a,b)=>b.createdAt - a.createdAt).map((message) => (
                            <Message message={message}/>
                        ))}



                    </div>
                    <div className="send-message fixed-bottom">
                        <form action="" onSubmit={handleSubmit} className="chatbox-message-form">
                            {/*<input value={newMessage} type="text" className="form-control chat-input" placeholder="write something"*/}
                            {/*       onChange={handleChange}*/}
                            {/*/>*/}
                            <div ref={messagesEndRef}/>
                            <div className="input-group">
                                <textarea ref={textAreaRef}
                                        name="send" id="" rows="1" value={newMessage} className=" form-control chat-input"
                                        onChange={handleChange} placeholder="write something" onKeyDown={handleKeyDown}/>
                                <button className="btn btn-outline-default"><i className="fa fa-paper-plane"/></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



            }
            <div className="modal fade theme-modal" id="userReport" tabIndex="-1"
                 aria-labelledby="exampleModalLabel2"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel2">Edit Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row g-4">
                                <div className="col-xxl-12">
                                    <div className="form-floating theme-form-floating">
                                        <select className="form-control" value={selectedReason} id="reason" onChange={onChangeSelect}>
                                            <option value="bullying or harassment">bullying or harassment</option>
                                            <option value="posting inappropriate things">posting inappropriate things</option>
                                            <option value="fake account">fake account</option>
                                        </select>
                                        <label htmlFor="pname">report</label>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-animation btn-md fw-bold"
                                    data-bs-dismiss="modal">Close
                            </button>
                            <button type="button" data-bs-dismiss="modal"
                                    className="btn theme-bg-color btn-md fw-bold text-light" onClick={ReportUser}>Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chats;
