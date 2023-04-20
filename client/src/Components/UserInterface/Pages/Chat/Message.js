import React, {useEffect, useState} from 'react';
import TimeAgo from "react-timeago";

function Message(props) {
    const {message} = props;

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    useEffect(()=>{

    },[])
    // console.log("message")
    // console.log(message)
    // const [checked, setChecked] = useState(false);
    // const toggleChecked = () => {
    //     setChecked(!checked);
    // }
    return (
        <div key={message._id}
             className="userChat">

                {message.sender._id === userInfo._id?
                    <div className="userChatInfoRight">

                        <div className="userChatInfo darker">
                            <div className="row">
                                {/*<div className="chatbox-message-dropdown left-icon col-2">*/}
                                {/*    <i className="bx bx-dots-vertical-rounded chatbox-message-dropdown-toggle"*/}
                                {/*    onClick={toggleChecked}/>*/}
                                {/*    <ul className={checked?"chatbox-message-dropdown-menu show":"chatbox-message-dropdown-menu "}>*/}
                                {/*        <li>*/}
                                {/*            <a href="#">Report</a>*/}
                                {/*        </li>*/}
                                {/*    </ul>*/}
                                {/*</div>*/}
                                <div className="right userInfo ">

                                    <div className="user" >
                                        <span className="username">{message.sender.username}</span>
                                        {message.sender.image?
                                            <img src={"http://localhost:3001/"+message.sender.image}
                                                 data-toggle="tooltip" data-placement="top" title={message.sender.username}
                                                 className="right-img"
                                            />
                                        :
                                            <img src="../../../../../assets/User/images/inner-page/user/default.png"
                                                 data-toggle="tooltip" data-placement="top" title={message.sender.username}
                                                 className="right-img"
                                            />
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="message">
                                <p dangerouslySetInnerHTML={{__html: message.content.replace(/\n/g, '<br>')}}/>
                            </div>
                            <span className="time-right"><TimeAgo date={message.updatedAt} /></span>
                        </div>
                    </div>
                    :
                    <div className="userChatInfo">
                        <div className="user">
                            {message.sender.image?
                                <img src={"http://localhost:3001/"+message.sender.image}
                                     data-toggle="tooltip" data-placement="top" title={message.sender.username}
                                     className="left-img"
                                />
                                :
                                <img src="../../../../../assets/User/images/inner-page/user/default.png"
                                     data-toggle="tooltip" data-placement="top" title={message.sender.username}
                                     className="left-img"
                                />
                            }
                            <span className="username">{message.sender.username}</span>
                        </div>

                        <div className="right">
                            <p dangerouslySetInnerHTML={{__html: message.content.replace(/\n/g, '<br>')}}/>
                        </div>

                        <span className="time-left"><TimeAgo date={message.updatedAt} /></span>
                    </div>
                }
        </div>
    );
}

export default Message;
