import { useContext } from "react";
import AllChat from "../Components/AllChats/AllChat";
import Chat from "../Components/Chat/Chat";
import Header from "../Components/Header/Header"
import { AuthContext } from "../store/Context";
import "./ChatPage.css"

const ChatPage = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="chat__page">
            <Header />
            <div className="chatPage__main">
                {
                    user ?
                        <div className="chatPage__container">
                            <div className="chatPage__allChat">
                                <AllChat />
                            </div>
                            <div className="chatPage__chats">
                                <Chat />
                            </div>
                        </div>
                        :
                        <h1>No Chat to Display</h1>
                }
            </div>
        </div>
    );
}

export default ChatPage;