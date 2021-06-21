import './ChooseCategory.css'
import db from '../../firebase';
import { useEffect } from 'react';

const ChooseCategory = ({ setDatas,
  setSubCategory, setCategory, category,
  setSubData, subCategory, subData, datas }) => {
  //useEffect
  useEffect(() => {
    db.collection('category').onSnapshot(snapshot => {
      setDatas(snapshot.docs.map(doc => (
        doc.id
      )))
    })
  }, [setDatas]);
  //functions
  const getSubCategory = (item) => {
    setSubCategory(null)
    setCategory(item);
    db.collection('category').doc(`${item}`).get()
      .then(snapshot => {
        setSubData(snapshot.data().[item])
      })
  };
  const getAllCategory = (item) => {
    setSubCategory(item);
  };
  return (
    <div className="create__container">
      <h6>CHOOSE A CATEGORY</h6>
      <div className="create__category">
        <div className="create__mainCategory">
          {
            //map category
            datas?.map((item) => (
              <button className={(category === item) ? "main__categoryItem itemFocused" : "main__categoryItem"} onClick={() => getSubCategory(item)} key={item}>
                <h5>{item}</h5>
                <i className="bi bi-chevron-right"></i>
              </button>
            ))
          }
        </div>
        <div className="create__subCategory">
          {
            //map subcategory
            subData?.map(item => <button className={(subCategory === item) ? "sub__categoryItem itemFocused" : "sub__categoryItem"} onClick={() => getAllCategory(item)} key={item}>{item}</button>)
          }
        </div>
      </div>
    </div>
  );
}
export default ChooseCategory;