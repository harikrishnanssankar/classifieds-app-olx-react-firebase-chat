import React, { useEffect, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import db from '../../firebase';
import Cards from '../Cards/Cards';
import PacmanLoader from "react-spinners/PacmanLoader";



const Posts = () => {
  const [products, setProducts] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const [lastKey, setLastKey] = useState();
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);


  const fetchRef = db.collection('products').orderBy("date", "desc");

  useEffect(() => {
    fetchRef.limit(3).get().then(snapshot => {
      const isCollectionEmpty = snapshot.size === 0;
      if (!isCollectionEmpty) {
        const allPost = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
            createdAt: product.data().date.toDate().toLocaleString('en-IN', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, day: 'numeric', month: 'numeric', year: 'numeric' }),
          }
        })
        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        setProducts(allPost)
        setShuffled(allPost.slice(0, allPost.length).sort(() => Math.random() - 0.5).slice(0, 2))
        setLastKey(lastDoc)
      } else {
        setIsEmpty(true)
      }
    })
  }, [])


  const fetchMore = () => {
    setLoading(true);
    fetchRef.startAfter(lastKey).get()
      .then(snapshot => {
        const isCollectionEmpty = snapshot.size === 0;
        if (!isCollectionEmpty) {
          const allPost = snapshot.docs.map((product) => {
            return {
              ...product.data(),
              id: product.id,
              createdAt: product.data().date.toDate().toLocaleString('en-IN', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, day: 'numeric', month: 'numeric', year: 'numeric' }),
            }
          })
          const lastDoc = snapshot.docs[snapshot.docs.length - 1];
          setProducts(products => [...products, ...allPost])
          setLastKey(lastDoc);
        } else {
          setIsEmpty(true)
        }
        setLoading(false);
      })
  }



  return (
    <div className="post__ParentDiv">
      <div className="moreView">
        <div className="post__heading">
          <span>Quick Menu</span>
          <span>View more <i className="bi bi-chevron-right"></i></span>
        </div>
        <div className="post__cards">
          {
            shuffled.map(product => {
              return (
                <div className="post__card" key={product.id}>
                  <Cards product={product} />
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="post__recommendations">
        <h4>Fresh recommendations</h4>
        <div className="post__freshCards">
          {
            products.map(product => {
              return (
                <div className="post__card" key={product.id}>
                  <Cards product={product} />
                </div>
              )
            })
          }
        </div>
        {
          !loading && !isEmpty && <button className="post__loadmoreBtn" onClick={fetchMore}>Load More</button>
        }
        {
          isEmpty && <h5 className="post__loadmoreEnd">You have reached the end of world!!!</h5>
        }
      </div>
      {
        loading &&
        <div className="post__loadingComponent">
          <PacmanLoader color={'#006772 '} loading={loading} size={25} />
        </div>
      }
    </div>
  );
}

export default Posts;
