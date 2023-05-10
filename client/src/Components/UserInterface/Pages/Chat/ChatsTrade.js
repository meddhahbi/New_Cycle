import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import LoadingPage from "../../../Loading";
import {useLocation, useNavigate} from "react-router";
import style from "./style.css"
import {Link} from "react-router-dom";
import Message from "./Message";
import Chat from "./Chat";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Map, {Marker, NavigationControl} from "react-map-gl";
import maplibregl from "maplibre-gl";
import {MapContainer} from "react-leaflet";
import MapContainerr from "./MapContainer";
import Mapp from "./Osm-providers";
import ChatProduct from "./Item/ChatProduct";
import ChatTrade from "./ChatTrade";
const ChatsTrade = (props) => {
    const location = useLocation().pathname
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    // const [product, setProduct] = useState();
    const [post, setPost] = useState();
    const [chatt, setChatt] = useState();
    const [newMessage, setnewMessage] = useState();
    const [selectedReason, setSelectedReason] = useState();
    const messagesEndRef = useRef(null);
    const textAreaRef = useRef(null);
    const [other, setOther] = useState();
    const [reported, setReported] = useState();
    const [finalDeal, setFinalDeal] = useState();
    const [dealt, setDealt] = useState(false);
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
    const badWords=async(msg)=>{
        let response;
        const encodedParams = new URLSearchParams();
        encodedParams.append("content", msg.content);
        encodedParams.append("censor-character", "*");

        const url = 'https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter';

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': 'fe35a5a121msh34466f5ccd34a87p197183jsn8202a7d1a226',
                'X-RapidAPI-Host': 'neutrinoapi-bad-word-filter.p.rapidapi.com'
            },
            body: encodedParams
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                response = json;
            })
            .catch(err => console.error('error:' + err));
        return response;
    }

    const getMessages = async ()=>{
        // let url = `http://localhost:3001/message/${chatId}?page=${currentPage}&limit=${limit}`
        // console.log("msgs")
        let url = `http://localhost:3001/message/${chatId}`
        // console.log(url)
        const {data:msgs}=await axios.get(url, config)
        // console.log(msgs)
        // console.log(msgs)
        setMessages(msgs)
        // setMessages(messages);
        return messages
    }

    const getChat = async ()=>{
        let url = `http://localhost:3001/chat/get_chat_post/${chatId}`
        // console.log(chat)
        const cha=await axios.get(url, config).then(async (p)=>{
            // console.log("chat.post")
            // console.log(p.data)
            setChatt(p.data)
            const urlPost = `http://localhost:3001/article/${p.data.post}`
            const {data:pos}=await axios.get(urlPost, config)
            // setPost(pos.article)
            setPost(pos.article)
            return p
        })
        // console.log("prod")
        // console.log(chat.product)
        // console.log(chat.post)
        // setProduct(chat.product)
        // console.log("chat.post")
        // console.log(chat)
        // console.log(chat.product)
        // setPost(chat.post)

        // setMessages(messages);
        // return cha
    }
    // const getPost = async (c)=>{
    //     let url = `http://localhost:3001/article/${c}`
    //     console.log(url)
    //     const {data:pos}=await axios.get(url, config)
    //     console.log("pos")
    //     console.log(pos)
    //     console.log(pos.article)
    //     // setPost(pos.article)
    //     setPost(pos.article)
    //     // setMessages(messages);
    //     return pos
    // }

    const getDeal = async ()=>{

        let { data:deal } = await axios.get("http://localhost:3001/chat/deal/"+chatId, config)

        setDealt(deal);
        return deal
    }

    const getFinalDeal = async ()=>{
        console.log("deal")
        let { data:deal } = await axios.get("http://localhost:3001/chat/total_deal/"+chatId, config)

        console.log(""+deal)
        setFinalDeal(deal);
        return deal
    }

    const acceptDeal = async ()=>{

        try{
            let { data:deal } = await axios.put("http://localhost:3001/chat/deal/",
                {chatId:chatId},
                config)
            console.log(deal)
            setDealt(true);
        }
        catch (e) {
            console.error(e.message)
        }
    }
    // const getChats = async ()=>{
    //     const { data:chats } = await axios.get("http://localhost:3001/chat/post", config);
    //     setChats(chats);
    //     return chats
    // }
    const getChatsBlogged = async ()=>{
        const { data:chats } = await axios.get("http://localhost:3001/chat/post", config);
        // console.log("chats")
        // console.log(chats)
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
            badWords(newMessage).then()
            const { data } = await axios.post("/message", {
                content: newMessage,
                chatId: localStorage.getItem("chats"),
            },
                config);
            getMessages().then()
            // location==="/client_message_post"?
            // getChatsBlogged().then():
            //     getChats().then();
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

        getMessages().then()

        getDeal().then()
        getOther().then(()=>{})
        getChatsBlogged().then()
        // // getFinalDeal().then()
        //

        getChat().then((c)=>{
            // console.log("c")
            // console.log(c)
            // getPost(c.data.post).then(p=>{
            //     // console.log(p)
            // })
        })
        getChatsBlogged().then()

        if(isLoading){





            window.scrollTo(0, document.body.scrollHeight)
            // const IPGEOLOCATION_API_KEY = '71491428bd354957b539d936a7bf3af9';
            //
            // async function getLocation() {
            //     try {
            //         const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${IPGEOLOCATION_API_KEY}`);
            //         const { city, country_name } = response.data;
            //         console.log(response.data)
            //         console.log(`You are located in ${city}, ${country_name}.`);
            //     } catch (error) {
            //         console.error('Error getting location:', error.message);
            //     }
            // }

            // getLocation();

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

        // return () => {
        //     clearInterval(intervalId);
        // };
    },[chatId, messages, post])
    useEffect( ()=>{

        const intervalId = setInterval(() => {
            // count+=1;
            // console.log("message" + count)
            getFinalDeal().then()
            // console.log("compare users")
            // console.log(chatt.users[0])
            // console.log(userInfo._id)
        }, 3000);
        return () => {
            clearInterval(intervalId);
        };
    }, [getFinalDeal, getMessages, getChat])



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
                }, config).then(async rep => {
                    console.log(rep.data)
                    let data = rep.data
                    if (!data.error){
                        await axios.post("/reportUserDetail",{
                            reportId:data._id,
                            reason: selectedReason
                        },config).then(rep=>{
                            console.log(rep.data)
                            toast.success(reported.username+' reported successfully!', {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        })

                    }
                    else{
                        console.log(data.error)
                        toast.error('You already reported '+reported.username+'!', {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }

                })
                // console.log(rep)


            }
            catch (e) {
                console.log(e)
            }
    };
    const handleDeal=()=>{
        acceptDeal().then()
    };
    return (
        <div ref={elementRef}>
            {isLoading ? <LoadingPage/> :
            <div
                className="chats row container-fluid"

            >

                <ToastContainer/>
                <div className="offcanvas offcanvas-collapse order-xl-2 col-5" id="primaryMenu">
                    <div className="offcanvas-header navbar-shadow">
                        <h5>Chats</h5>
                        <button className="btn-close lead" type="button" data-bs-dismiss="offcanvas"
                                aria-label="Close"/>
                    </div>
                    {/*<div className="offcanvas-body sidebar-nav">*/}
                    {/*    <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary sidebar"*/}
                    {/*         >*/}
                    {/*        <div className="list-group list-group-flush border-bottom scrollarea">*/}
                    {/*            {chats?.map((chat) => (*/}
                    {/*                <div>*/}
                    {/*                    {chat.latestMessage?*/}
                    {/*                        <a href="#" className={*/}
                    {/*                            localStorage.getItem("chats") === chat._id?"list-group-item list-group-item-action py-3 lh-sm active":"list-group-item list-group-item-action py-3 lh-sm"*/}
                    {/*                        }*/}
                    {/*                           aria-current="true" onClick={()=>{*/}
                    {/*                            // console.log(chat.latestMessage)*/}

                    {/*                        }}*/}

                    {/*                           key={chat._id}*/}
                    {/*                        >*/}
                    {/*                            <div className="d-flex w-100 align-items-center justify-content-between">*/}
                    {/*                                <strong className="mb-1">*/}
                    {/*                                    <span>*/}
                    {/*                                        {other&&other.username}*/}
                    {/*                                    </span>*/}
                    {/*                                </strong>*/}
                    {/*                                <small> </small>*/}
                    {/*                                /!*<small>{chat.latestMessage?.updatedAt} </small>*!/*/}
                    {/*                            </div>*/}
                    {/*                            <div className="col-10 mb-1 small">*/}
                    {/*                                <span className="username">*/}
                    {/*                                    {chat.latestMessage?.sender._id === userInfo._id?*/}
                    {/*                                        <div className="latest-message">*/}
                    {/*                                            <strong>You: <strong className="latest-message2">{chat.latestMessage.content}</strong></strong>*/}
                    {/*                                        </div>*/}
                    {/*                                        :*/}
                    {/*                                        <span className="latest-message">{chat.latestMessage.content}</span>*/}
                    {/*                                    }*/}
                    {/*                                </span>*/}
                    {/*                            </div>*/}
                    {/*                        </a>*/}
                    {/*                        :*/}
                    {/*                        ""*/}
                    {/*                    }*/}
                    {/*                </div>*/}

                    {/*            ))*/}
                    {/*            }*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className="row">
                    <div className="col-5 messages-content">
                        <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary sidebar sticky-header"
                             >
                            <div className="list-group list-group-flush border-bottom scrollarea">
                                {chats?.map((chat) => (
                                    <div key={chat._id}>
                                        {chat.latestMessage?
                                            <>
                                                <ChatTrade
                                                    chat={chat}
                                                    setIsLoading={setIsLoading}
                                                    setFinalDeal={setFinalDeal}
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
                                            </>


                                            :
                                            ""
                                        }
                                    </div>

                                ))
                                }
                            </div>
                        </div>
                    </div>



                    <div className="col-7 list-messages " id="list-messages">
                        <div className="right sticky-logos" style={{height: "25px"}}>
                            {!dealt ?
                                <>
                                {/*{product ?*/}
                                {/*    <>*/}

                                {/*        <div className=""*/}
                                {/*             style={{cursor:"pointer", backgroundColor:"tomato", color:"white", borderRadius:"10px", width:"25px"}}*/}
                                {/*             data-bs-toggle="modal"*/}
                                {/*             data-bs-target="#dealUser"*/}
                                {/*             title={"deal for" + product.name}*/}
                                {/*        >*/}
                                {/*            <i className="fa fa-times" title={"deal for "}*/}
                                {/*               style={{fontSize: "large", marginTop: "5px"}}/>*/}

                                {/*        </div>*/}
                                {/*        <div className=""*/}
                                {/*             style={{cursor:"pointer", backgroundColor:"#10d685", color:"white", borderRadius:"10px", width:"25px", padding:"3px", marginLeft:"10px"}}*/}
                                {/*             data-bs-toggle="modal"*/}
                                {/*             data-bs-target="#prod"*/}
                                {/*        >*/}
                                {/*            <i className="fa fa-hand-dots " title="show product" style={{fontSize:"large"}} />*/}
                                {/*        </div>*/}
                                {/*    </>*/}
                                {/*    :*/}
                                {/*    ""*/}
                                {/*}*/}
                                    {post?
                                        <>

                                            <div className=""
                                                 style={{cursor:"pointer", backgroundColor:"tomato", color:"white", borderRadius:"10px", width:"25px"}}
                                                 data-bs-toggle="modal"
                                                 data-bs-target="#dealUser"
                                                 title={"deal for" + post.title}
                                            >
                                                <i className="fa fa-times" title={"deal for "}
                                                   style={{fontSize: "large", marginTop: "5px"}}/>

                                            </div>
                                            <div className=""
                                                 style={{cursor:"pointer", backgroundColor:"#10d685", color:"white", borderRadius:"10px", width:"25px", padding:"3px", marginLeft:"10px"}}
                                                 data-bs-toggle="modal"
                                                 data-bs-target="#prod"
                                            >
                                                <i className="fa fa-hand-dots " title="show product" style={{fontSize:"large"}} />
                                            </div>
                                        </>
                                        :""
                                    }
                                </>
                                :
                                <>
                                    <div className=""
                                         style={{backgroundColor:"green", color:"white", borderRadius:"10px", width:"25px"}}
                                    ><i className="fa fa-check" style={{fontSize:"large", marginTop:"5px"}}/>
                                    </div>
                                    {/*{product ?*/}
                                    {/*    <div className="" title={"you already dealt to exchange" + product.name}*/}
                                    {/*         style={{*/}
                                    {/*             cursor: "pointer",*/}
                                    {/*             backgroundColor: "#10d685",*/}
                                    {/*             color: "white",*/}
                                    {/*             borderRadius: "10px",*/}
                                    {/*             width: "25px",*/}
                                    {/*             padding: "3px",*/}
                                    {/*             marginLeft: "10px"*/}
                                    {/*         }}*/}
                                    {/*         data-bs-toggle="modal"*/}
                                    {/*         data-bs-target="#prod"*/}
                                    {/*    >*/}
                                    {/*        <i className="fa fa-hand-dots " title="show product"*/}
                                    {/*           style={{fontSize: "large"}}/>*/}
                                    {/*    </div>*/}
                                    { post?
                                            <div className="" title={"you already dealt to exchange" + post.title}
                                                 style={{
                                                     cursor: "pointer",
                                                     backgroundColor: "#10d685",
                                                     color: "white",
                                                     borderRadius: "10px",
                                                     width: "25px",
                                                     padding: "3px",
                                                     marginLeft: "10px"
                                                 }}
                                                 data-bs-toggle="modal"
                                                 data-bs-target="#prod"
                                            >
                                                <i className="fa fa-hand-dots " title="show product"
                                                   style={{fontSize: "large"}}/>
                                            </div>
                                            :""
                                    }

                                </>

                            }

                        </div>
                        <div>

                            {finalDeal?
                                <div style={{display:"flex", justifyContent:"center"}}>
                                    {chatt.users[0]._id===userInfo._id?

                                        <div>
                                            {/*{product ?*/}
                                            {/*<div style={{backgroundColor:"#b3d4bf", padding:"10px"}}>*/}
                                            {/*    <h2>you have already dealt!</h2>*/}
                                            {/*    <div className="row">*/}
                                            {/*        <h3 className="col-9">product's location </h3>*/}
                                            {/*        <div className="col-1">*/}

                                            {/*            <div*/}
                                            {/*                style={{cursor:"pointer", backgroundColor:"#2f9fff", color:"white", borderRadius:"10px", width:"25px", padding:"5px"}}*/}
                                            {/*                data-bs-toggle="modal"*/}
                                            {/*                data-bs-target="#map"*/}
                                            {/*                title={"view location"}*/}
                                            {/*            >*/}

                                            {/*                <i className="fa fa-map-marker" title={"deal for "+product.name} style={{fontSize:"large", marginTop:"5px"}}/>*/}

                                            {/*            </div>*/}

                                            {/*        </div>*/}

                                            {/*    </div>*/}
                                            {/*    <strong>city: </strong><span>{product.city}</span><br/>*/}
                                            {/*    <strong>region: </strong><span>{product.region}</span>*/}

                                            {/*</div>*/}
                                            { post?
                                                    <div style={{backgroundColor:"#b3d4bf", padding:"10px"}}>
                                                        <h2>you have already dealt!</h2>
                                                        <div className="row">
                                                            <h3 className="col-9">product's location </h3>
                                                            <div className="col-1">

                                                                <div
                                                                    style={{cursor:"pointer", backgroundColor:"#2f9fff", color:"white", borderRadius:"10px", width:"25px", padding:"5px"}}
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#map"
                                                                    title={"view location"}
                                                                >

                                                                    <i className="fa fa-map-marker" title={"deal for "+post.title} style={{fontSize:"large", marginTop:"5px"}}/>

                                                                </div>

                                                            </div>

                                                        </div>
                                                        {/*<strong>city: </strong><span>{product.city}</span><br/>*/}
                                                        {/*<strong>region: </strong><span>{product.region}</span>*/}

                                                    </div>
                                                    :""
                                            }
                                            <hr/>
                                            <br/>
                                        </div> :""
                                    }
                                </div>:""

                            }
                            </div>

                        {messages?.sort((a,b)=>b.createdAt - a.createdAt).map((message) => (
                            <Message message={message}/>
                        ))}



                    </div>
                    <div className="send-message fixed-bottom">
                        <form action="" onSubmit={handleSubmit} className="chatbox-message-form">
                            <div ref={messagesEndRef}/>

                            <div className="input-group">
                                {!finalDeal?
                                <>
                                    <textarea ref={textAreaRef}
                                          name="send" id="" rows="1" value={newMessage} className=" form-control chat-input"
                                          onChange={handleChange} placeholder="write something" onKeyDown={handleKeyDown}/>
                                    <button className="btn btn-outline-default"><i className="fa fa-paper-plane"/></button>
                                </>:
                                    <div className="already-dealt" style={{width:"100%", backgroundColor:"#cdcdcd"}}>
                                        <div className="already-dealt-c">already dealt!</div>
                                        <hr/>
                                    </div>
                                }
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
                            <h5 className="modal-title" id="exampleModalLabel2">report the client</h5>
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

            <div className="modal fade theme-modal" id="dealUser" tabIndex="-1"
                 aria-labelledby="exampleModalLabel2"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel2">Confirm the Deal ?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-animation btn-md fw-bold"
                                    data-bs-dismiss="modal">Close
                            </button>
                            <button type="button" data-bs-dismiss="modal"
                                    className="btn theme-bg-color btn-md fw-bold text-light" onClick={handleDeal}>Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade theme-modal" id="prod" tabIndex="-1"
                 aria-labelledby="exampleModalLabel2"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down">
                    <div className="modal-content">
                                {/*{*/}
                                {/*    product?*/}
                                {/*        <div className="modal-header">*/}
                                {/*            <h5 className="modal-title" id="exampleModalLabel2">Requested Product</h5>*/}
                                {/*            <div style={{display:"flex", justifyContent:"center", width:"100%"}}>*/}
                                {/*                <ChatProduct prod={product}/>*/}
                                {/*            </div>*/}
                                {/*            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">*/}
                                {/*                <i className="fa-solid fa-xmark"></i>*/}
                                {/*            </button>*/}
                                {/*        </div>*/}
                                {/*        :*/}
                        {post?

                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel2">Requested Product to trade</h5>
                                                <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
                                                    {/*<ChatProduct product={product}/>*/}
                                                    <div className="product-box product-box-bg wow fadeInUp">
                                                        <div className="product-image">
                                                            <a href="product-left-thumbnail.html">
                                                                <img src={`http://localhost:3001/${(post.photo)}`}
                                                                     className="img-fluid blur-up lazyload" alt="" />
                                                            </a>
                                                        </div>
                                                        <div className="product-detail">
                                                            <a href="product-left-thumbnail.html">
                                                                <h6 className="name">
                                                                    {post.title}
                                                                </h6>
                                                            </a>
                                                            <h6 className="name">
                                                                {post.content}
                                                            </h6>

                                                            {/*<h5 className="sold text-content">*/}
                                                            {/*    <span className="theme-color price">$26.69</span>*/}
                                                            {/*    <del>28.56</del>*/}
                                                            {/*</h5>*/}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                            :
                                        ""
                                }
                        <div className="modal-footer">
                            <button type="button" className="btn btn-animation btn-md fw-bold"
                                    data-bs-dismiss="modal">Close
                            </button>
                            {/*<button type="button" data-bs-dismiss="modal"*/}
                            {/*        className="btn theme-bg-color btn-md fw-bold text-light" onClick={handleDeal}>Confirm*/}
                            {/*</button>*/}
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade theme-modal" id="map" tabIndex="-1"
                 aria-labelledby="exampleModalLabel2"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/*<h5 className="modal-title" id="exampleModalLabel2">Requested Product</h5>*/}
                            {/*{*/}
                            {/*    product?*/}
                            {/*    <Mapp*/}
                            {/*    lng={product?product.longitude:36.9007}*/}
                            {/*    lat={product?product.latitude:10.1857}*/}
                            {/*/>:""}*/}

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-animation btn-md fw-bold"
                                    data-bs-dismiss="modal">Close
                            </button>
                            {/*<button type="button" data-bs-dismiss="modal"*/}
                            {/*        className="btn theme-bg-color btn-md fw-bold text-light" onClick={handleDeal}>Confirm*/}
                            {/*</button>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatsTrade;
