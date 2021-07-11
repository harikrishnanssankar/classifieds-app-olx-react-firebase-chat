import Arrow from "../../assets/Arrow";
import './Category.css'
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import db from "../../firebase";
import { useHistory } from "react-router";

const Category = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const [categoryItem, setCategoryItem] = useState('');
    const [subCategoryItem, setSubCategoryItem] = useState('');
    const history = useHistory();
    useEffect(() => {
        db.collection('categories').onSnapshot(snapshot => {
            snapshot.docs.map(category => setCategory(category.data()))
        })
    }, [])

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div className="category__menu">
            <div className="category__title">
                <div className="category__titleContents" onClick={openModal}>
                    <span>ALL CATEGORIES</span>
                    <div className={modalIsOpen? 'category__arrow' : 'category__arrowDown'}>
                        <Arrow></Arrow>
                    </div>
                </div>
                <div className="category__quickOptions">
                    <span>Cars</span>
                    <span>Motorcycle</span>
                    <span>Mobile Phone</span>
                    <span>For Sale:Houses & Apartments</span>
                    <span>Scooter</span>
                    <span>Commercial & Other Vehicles</span>
                    <span>For Rent: House & Apartments</span>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                className="Modal"
                overlayClassName="Overlay"
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className="category__list">
                    {
                        Object.keys(category).map((item, key) => {
                            return (
                                <div className={`category__listGroup ${item}`} key={key}>
                                    <h6 onClick={() => setCategoryItem(item)} className="category__listTitle">{item}</h6>
                                    {category.[`${item}`].map((res, k) => {
                                        return (
                                            <h6 className="category__listContent" onClick={() => history.push(`/search/search?${res}`)} key={k}>{res}</h6>
                                        )
                                    })}
                                </div>
                            )
                        })
                    }
                </div>
            </Modal>
        </div>
    );
}
export default Category;
