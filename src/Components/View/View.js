import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import db from '../../firebase';
import { AuthContext } from '../../store/Context';
import './View.css';
import { v4 as uuidv4 } from 'uuid';

function View() {
  const [data, setData] = useState({})
  const { productId } = useParams();
  const location = useLocation();
  const [sellerDetails, setSellerDetails] = useState({});
  const [copy, setCopy] = useState('Copy');
  const copyRef = useRef(null);
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [userChats, setUserChats] = useState([]);
  const [docId, setDocId] = useState([]);
  const [userDetails, setUserDetails] = useState([])
  const [date, setDate] = useState('');

  useEffect(() => {
    //fetching product Details
    db.collection('products').doc(`${productId}`).get()
      .then(snapshot => {
        setData(snapshot.data());
        setDate(snapshot.data().date.toDate().toLocaleString('en-IN', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, day: 'numeric', month: 'numeric', year: 'numeric' }))
      });
  }, [productId])
  useEffect(() => {
    //fetching seller details
    db.collection('users').where('id', '==', `${data.userId}`).get().then(res => {
      res.forEach(doc => {
        setSellerDetails(doc.data());
      })
    })
    //fetching user details
    db.collection('users').doc(`${user?.uid}`).get().then(res => {
      setUserDetails(res.data());
    })

    return () => {

    }
  }, [data, user]);
  useEffect(() => {
    let handler = (event) => {

      (!copyRef.current.contains(event.target)) &&
        setCopy('Copy')

    }
    document.addEventListener("mouseout", handler);
    return () => {
      document.removeEventListener("mouseout", handler)
    }
  })
  const handleCopy = () => {
    navigator.clipboard.writeText("localhost:3000" + location.pathname).then(
      setCopy('Copied!!!')
    )
  }


  useEffect(() => {
    if (user) {
      db.collection("chat").where("users", "array-contains", `${user.uid}`).onSnapshot(res => {
        setUserChats(res.docs.map(doc => doc.id))
      })
    }

    return () => {

    }
  }, [user])
  useEffect(() => {
    if (user) {
      db.collection("chat").where("users", "array-contains", `${sellerDetails.id}`).onSnapshot(res => {
        setDocId(userChats.filter(value => res.docs.map(doc => doc.id).includes(value)))
      })
    }

    return () => {

    }
  }, [user, sellerDetails, userChats])


  const handleChatClick = () => {
    if (user) {
      const chatId = uuidv4();
      if (docId.length === 0) {
        db.collection('chat').doc(`${chatId}`).set({
          users: [`${user.uid}`, `${sellerDetails.id}`],
          user1: `${userDetails.username}`,
          user2: `${sellerDetails.username}`
        }).then(history.push(`/chat/${chatId}`))
      } else {
        history.push(`/chat/${docId[0]}`)
      }
    } else {
      alert('please login')
    }
  }


  return (

    <div className="item__container">
      <span>{data.category + ' / ' + data.subCategory}</span>
      <div className="item__parentDiv">
        <div className="item__leftContainer">
          <div className="item__img">
            <img
              src={data.url}
              alt="error loading"
            />
          </div>
          <div className="item__moreInfo">
            <h5>Description</h5>
            <p>{data.description}</p>
          </div>
        </div>
        <div className="item__description">
          <div className="item__productDescription">
            <div>
              <p className="item__price">&#x20B9; {data.price} </p>
              <span>{data.title}</span>
              <p>{data.subCategory}</p>
              <span>{date}</span>
            </div>
            <div ref={copyRef} className="item__share">
              <i className="bi bi-share item__shareLink" onClick={handleCopy}></i>
              <div className="item__tooltipText">{copy}</div>
            </div>
          </div>
          <div className="item__sellerDescription">
            <p>Seller description</p>
            <div className="item__sellerImageName">
              <img src={sellerDetails.photourl} alt="img" />
              <p>
                {
                  (user?.uid === sellerDetails.id) ?
                    <p onClick={() => history.push('/myProfile')} style={{ margin: 0 }} >{sellerDetails.username}</p>
                    :
                    <p onClick={() => history.push(`/profile/${sellerDetails.id}`)}  style={{ margin: 0 }} >{sellerDetails.username}</p>
                }
                <span style={{ fontSize: 14, fontWeight: 400 }}>Member since {sellerDetails?.createdAt?.toDate().toLocaleString('en-IN', { month: 'short', year: 'numeric' })}</span>
              </p>
              <i className="bi bi-chevron-right"></i>
            </div>
            <p className="item__sellerContactNum">Contact No: {sellerDetails.phone}</p>
            {
              (user?.uid === sellerDetails.id) ?
                <button onClick={handleChatClick} disabled className="item__chatBtn">Ask questions your self</button>
                :
                <button onClick={handleChatClick} className="item__chatBtn">Chat with seller</button>
            }
          </div>
          <div className="item__location">
            <p>Posted in</p>
            <p>{data?.place?.value}</p>
            <img src={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/${data?.place?.position?.lon},${data?.place?.position?.lat},12/380x160?access_token=pk.eyJ1IjoiaGFyaWtyaXNobmFuc3NhbmthciIsImEiOiJja3FuenhzMXIwMmhpMnZzMng5cGx0bWNhIn0.dda298RlmnCXkPdi-BBjiQ`} alt="" />
          </div>
        </div>
      </div>
    </div>

  );
}
export default View;
