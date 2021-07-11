import React, { useEffect, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import db from '../../firebase';
import Cards from '../Cards/Cards';


const Posts = () => {
  // const history = useHistory();
  const [products, setProducts] = useState([])
  useEffect(() => {
    db.collection('products').get().then(snapshot => {
      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
          createdAt: product.data().date.toDate().toLocaleString('en-IN', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, day: 'numeric', month: 'numeric', year: 'numeric' }),
        }
      })
      setProducts(allPost)
    })
  },[])



  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="post__cards">
          {
            products.map(product => {
              return (
                // <div onClick={()=> history.push(`/item/${product.id}`)} key={product.id} className="card" >
                //   <div className="favorite">
                //     <Heart></Heart>
                //   </div>
                //   <div className="image">
                //     <img src={product.url} alt="" />
                //   </div>
                //   <div className="content">
                //     <p className="rate">&#x20B9; {product.price}</p>
                //     <span className="kilometer">{product.subCategory}</span>
                //     <p className="name">{product.title}</p>
                //   </div>
                //   <div className="date">
                //     <span>{product.date}</span>
                //   </div>
                // </div>
                <div className="post__card" key={product.id}>
                  <Cards product={product} />
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
