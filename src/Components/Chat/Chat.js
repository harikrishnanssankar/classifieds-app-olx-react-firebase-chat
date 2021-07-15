import { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import db from "../../firebase";
import { AuthContext } from "../../store/Context";
import "./Chat.css";

const Chat = () => {
    const { user } = useContext(AuthContext);
    const { chatId } = useParams();
    const [text, setText] = useState('')
    const [userNames, setUserNames] = useState([]);
    const [userId, setUserId] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const [forbidden, setForbidden] = useState(false);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [otherPreson, setOtherPreson] = useState();

    //fetching user IDs from chat
    useEffect(() => {
        setLoading(true)
        db.collection("chat").doc(`${chatId}`).get().then(res => {
            setUserId(
                res.data()?.users
            )
        })
        setLoading(false);
        return () => {

        }
    }, [chatId, user])

    //finding if the user has access to that particular chat
    //to forbade those without
    useEffect(() => {
        (userId?.includes(user?.uid)) ? setForbidden(false) : setForbidden(true);
        return () => {
        }
    }, [user, userId]);

    //fetching all messages
    useEffect(() => {
        db.collection('chat').doc(`${chatId}`).collection('messages').orderBy("createdAt", "asc").onSnapshot(snapshot => {
            const allMessages = snapshot.docs.map((message) => {
                return {
                    ...message.data(),
                    id: message.id,
                    date: message.data().createdAt.toDate(),
                    hour: message.data().createdAt.toDate().toLocaleString('en-IN', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, day: 'numeric', month: 'numeric', year: 'numeric' }),
                }
            })
            setMessages(allMessages)
        })
        return () => {

        }
    }, [chatId])

    //fetching userDetails from users
    useEffect(() => {
        db.collection('users').doc(`${user?.uid}`).get().then(res => {
            setUserDetails(res.data())
        })
        return () => {

        }
    }, [user, chatId])
    //fetching userNames from chats
    useEffect(() => {
        db.collection("chat").doc(`${chatId}`).get().then(res => {
            setUserNames({
                user1: res.data()?.user1,
                user2: res.data()?.user2
            })
        })
        return () => {

        }
    }, [chatId, user])

    useEffect(() => {
        if (user && userId) {
            if (userId[0] === user.uid) {
                db.collection('users').doc(userId[1]).get().then(res => {
                    setOtherPreson(res.data())
                })
            } else {
                db.collection('users').doc(userId[0]).get().then(res => {
                    setOtherPreson(res.data())
                })
            }
        }
        return () => {

        }
    }, [user, userId])


    //to place the scrollbar of chat container always at bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    //sending message function
    const sendText = (e) => {
        e.preventDefault();
        (text !== '') &&
            db.collection('chat').doc(`${chatId}`).collection('messages').add({
                text: text,
                createdAt: new Date(),
                sender: user.uid
            }).then(
                setText('')
            )
    }

    return (
        <div className="chat__main">
            {
                ((chatId !== 'chatid') && !forbidden) &&
                <div

                    className="chat__header"
                    style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}
                >
                    <i onClick={() => history.goBack()} className="bi bi-arrow-left-short chat__backArrow"></i>
                    <img
                        onClick={() => {
                            (user.uid !== userId[0]) ?
                                history.push(`/profile/${userId[0]}`)
                                :
                                history.push(`/profile/${userId[1]}`)
                        }}
                        style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover' }}
                        src={otherPreson?.photourl}
                        alt=""
                    />
                    {
                        (
                            (userNames?.user1 === userDetails?.username)
                            ||
                            (userNames?.user1 === user?.displayName)
                        ) ?
                            <h4
                                onClick={() => {
                                    (user.uid !== userId[0]) ?
                                        history.push(`/profile/${userId[0]}`)
                                        :
                                        history.push(`/profile/${userId[1]}`)
                                }}
                            >
                                {userNames?.user2}
                            </h4>
                            :
                            <h4
                                onClick={() => {
                                    (user.uid !== userId[0]) ?
                                        history.push(`/profile/${userId[0]}`)
                                        :
                                        history.push(`/profile/${userId[1]}`)
                                }}
                            >
                                {userNames.user1}
                            </h4>
                    }
                </div>
            }
            {
                (chatId === 'chatid') && <h2 className="chat__warning">Start Chatting...</h2>
            }
            {
                (forbidden) ?
                    <>
                        {
                            (chatId !== 'chatid') &&
                            <h2 className="chat__warning">Sorry, Chat is Forbidden...</h2>
                        }
                    </>
                    :
                    <div className="chat__messageContainer">
                        {
                            messages.map(message => {
                                return (
                                    <div key={message.id} className={(message.sender === user.uid) ? "chat__message chat__messageSend" : "chat__message chat__messageReceive"}>
                                        <p className="chat__messageText">{message.text}</p>
                                        <p className="chat__messageTime">{message.hour}</p>
                                    </div>
                                )
                            })
                        }
                        <div ref={messagesEndRef} />
                    </div>
            }
            {
                ((chatId !== 'chatid') && !forbidden) &&
                <form onSubmit={sendText} className="chat__inputContainer">
                    <input onChange={(e) => setText(e.target.value)} className="chat__input" type="text" value={text} placeholder="Start typing" />
                    <i onClick={sendText} className="bi bi-telegram"></i>
                </form>
            }
        </div>
    );
}

export default Chat;