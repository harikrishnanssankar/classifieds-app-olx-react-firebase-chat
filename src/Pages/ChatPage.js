import { useContext } from "react";
import AllChat from "../Components/AllChats/AllChat";
import Chat from "../Components/Chat/Chat";
import Footer from "../Components/Footer/Footer"
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
                            <AllChat />
                            <Chat />
                        </div>
                        :
                        <h1>No Chat to Display</h1>
                }
            </div>
            <Footer />
        </div>
    );
}

export default ChatPage;