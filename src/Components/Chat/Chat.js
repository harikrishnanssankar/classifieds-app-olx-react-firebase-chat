import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router";
import db from "../../firebase";
import { AuthContext } from "../../store/Context";
import "./Chat.css";



const Chat = () => {
    const { user } = useContext(AuthContext);
    const { chatId } = useParams();
    const [text, setText] = useState('')
    const [userNames, setUserNames] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null)



    useEffect(() => {
        db.collection('chat').doc(`${chatId}`).collection('messages').orderBy("createdAt", "asc").onSnapshot(snapshot => {
            const allMessages = snapshot.docs.map((message) => {
                return {
                    ...message.data(),
                    id: message.id
                }
            })
            setMessages(allMessages)
        })
        return () => {

        }
    }, [chatId])
    useEffect(() => {
        db.collection('users').doc(`${user.uid}`).get().then(res => {
            setUserDetails(res.data())
        })
        return () => {

        }
    }, [user, chatId])
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


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);


    const sendText = (e) => {
        e.preventDefault()
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
                !(chatId === 'chatid') &&
                <div className="chat__header">

                    {(userNames.user1 === userDetails.username) ? <h4>{userNames.user2}</h4> : <h4>{userNames.user1}</h4>}
                </div>
            }
            {
                (chatId ==='chatid') && <h3>start messaging</h3>
            }
            <div className="chat__messageContainer">
                {
                    messages.map(message => {
                        return (
                            <div key={message.id} className={(message.sender === user.uid) ? "chat__message chat__messageSend" : "chat__message chat__messageReceive"}>
                                <p className="chat__messageText">{message.text}</p>
                            </div>
                        )
                    })
                }
                <div ref={messagesEndRef} />
            </div>
            {
                !(chatId === 'chatid') &&
                <form onSubmit={sendText} className="chat__inputContainer">
                    <input onChange={(e) => setText(e.target.value)} className="chat__input" type="text" value={text} placeholder="Start typing" />
                    <i onClick={sendText} className="bi bi-telegram"></i>
                </form>
            }

        </div>
    );
}

export default Chat;