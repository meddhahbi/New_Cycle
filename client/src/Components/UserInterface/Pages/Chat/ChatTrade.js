import React, {useEffect, useState} from 'react';
import style from './style.css';
import TimeAgo from "react-timeago";
import axios from "axios";

function ChatTrade(props) {
    const [checked, setChecked] = useState(false);
    const [post, setPost] = useState(false);
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    const toggleChecked = () => {
        setChecked(!checked);
    }
    const reportUser = async () => {
        props.onSetReported(other)
        setChecked(false)
        console.log(other)
    }
    const getPost = async()=>{
        const urlPost = `http://localhost:3001/article/${chat.post}`
        const {data:pos}=await axios.get(urlPost, config)
        setPost(pos.article)
    }
    const {chat, setIsLoading, userInfo, other}= props;
    useEffect(()=>{
        getPost().then()
    })

    return (
        <>
            <div className={
                localStorage.getItem("chats") === chat._id?"list-group-item list-group-item-action py-3 lh-sm active chat-container row":"list-group-item list-group-item-action py-3 lh-sm chat-container row"
            }>
                <div className="chatbox-message-dropdown right">
                    <i className="fas fa-ellipsis-v bx-dots-vertical-rounded chatbox-message-dropdown-toggle"
                       onClick={toggleChecked}/>
                    <ul className={checked?"chatbox-message-dropdown-menu show":"chatbox-message-dropdown-menu "}>
                        <li>
                            <a href="javascript:void(0)"
                               onClick={reportUser}
                               data-bs-toggle="modal"
                               data-bs-target="#userReport"
                            >Report</a>
                        </li>
                    </ul>
                    <br/>
                </div>



                <div className="row">
                    <div className="col-9 chat-cont">

                        <a href="#" className={
                            localStorage.getItem("chats") === chat._id?"list-group-item list-group-item-action active":"list-group-item list-group-item-action"
                        }
                           aria-current="true" onClick={()=>{
                            // console.log(chat.latestMessage)
                            setIsLoading(true)

                            localStorage.setItem("chats", chat._id)
                            setTimeout(()=>{

                                // window.scrollTo(0, document.body.scrollHeight)
                                setIsLoading(false)

                            }, 1000)
                        }}

                           key={chat._id}
                        >
                            <div className="d-flex w-100 align-items-center justify-content-between">
                                <strong className="mb-1">
                                <span>
                                    {/*{chat.latestMessage?.sender.username}*/}
                                    {post && post.title} ({chat.users[0]._id===userInfo._id?
                                        chat.users[1].username
                                        :
                                        chat.users[0].username
                                    })
                                </span>

                                </strong>
                                <small> <TimeAgo date={chat.latestMessage.updatedAt}/> </small>
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

                    </div>
                    <div className="right col-1">

                        <span >
                            {chat.users[0]._id===userInfo._id?
                                <span>
                                    {chat.users[1].isOnline?
                                        <i className="fas fa-circle" style={{color: "#74ff00"}} title="online"/>
                                        :
                                        <i className="fas fa-circle" style={{color: "#ddbf00"}} title="offline"/>}
                                </span>
                                :
                                <span>
                                    {chat.users[0].isOnline?
                                        <i className="fas fa-circle" style={{color: "#74ff00"}} title="online"/>
                                        :
                                        <i className="fas fa-circle" style={{color: "#ddbf00"}} title="offline"/>}
                                </span>
                            }
                        </span>
                    </div>
                </div>

            </div>

        </>
    );
}

export default ChatTrade;
