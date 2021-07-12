import { useContext, useEffect } from "react";
import { Redirect } from "react-router";
import AllChat from "../Components/AllChats/AllChat";
import Chat from "../Components/Chat/Chat";
import Header from "../Components/Header/Header"
import { AuthContext } from "../store/Context";
import "./ChatPage.css"

const ChatPage = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if(!user){
          return <Redirect to={{
            pathname: "/",
            state: {from: "create"}
          }} />
        } 
        return () => {
          
        }
      }, [user])
    return (
        <div className="chat__page">
            <Header />
            <div className="chatPage__main">
                        <div className="chatPage__container">
                            <div className="chatPage__allChat">
                                <AllChat />
                            </div>
                            <div className="chatPage__chats">
                                <Chat />
                            </div>
                        </div>
            </div>
        </div>
    );
}

export default ChatPage;