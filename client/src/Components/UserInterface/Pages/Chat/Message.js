import React from 'react';
import TimeAgo from "react-timeago";

function Message(props) {
    const {message} = props;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    // console.log("message")
    // console.log(message)
    return (
        <div key={message._id}
             className="userChat">

                {message.sender._id === userInfo._id?
                    <div className="userChatInfoRight">

                        <div className="userChatInfo darker">
                            <div className="right userInfo">
                                <div className="user" >
                                    <i className="fa fa-ellipsis-v"/>
                                    <span className="username">{message.sender.username}</span>
                                    <img src="../../../../../assets/User/images/inner-page/user/default.png"
                                         data-toggle="tooltip" data-placement="top" title={message.sender.username}
                                         className="right-img"
                                    />
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
                            <img src="../../../../../assets/User/images/inner-page/user/default.png"
                                 alt={message.sender.username}
                                 className="left-img"
                            />
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
