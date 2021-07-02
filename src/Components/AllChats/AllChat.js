import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import db from '../../firebase';
import { AuthContext } from '../../store/Context';
import './AllChat.css'

const AllChat = () => {
  const [userChats, setUserChats] = useState([])
  const [docId, setDocId] = useState([]);
  const { user } = useContext(AuthContext);
  const [chatNames, setChatNames] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const history = useHistory();
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    db.collection('users').doc(`${user.uid}`).get().then(res => {
      setUserDetails(res.data())
    })
    return () => {

    }
  }, [user])

  useEffect(() => {
    if (user) {
      db.collection("chat").where("users", "array-contains", `${user.uid}`).onSnapshot(res => {

        const allChats = res.docs.map((usr) => {
          return {
            user1: usr.data().user1,
            user2: usr.data().user2,
            id: usr.id
          }
        })
        setUserChats(allChats);
      })
    }

    return () => {

    }
  }, [user])

  return (
    <div className="allChat">
      {
        userChats.map(userChat => {
          return (
            <div className="allChat__container" onClick={() => history.push(`/chat/${userChat.id}`)} key={userChat.id}>
              {(userChat.user1 === userDetails.username) ? <h5 className="allChat__text">{userChat.user2}</h5> : <h5 className="allChat__text">{userChat.user1}</h5>}
            </div>
          )
        })
      }
    </div>
  );
}

export default AllChat;