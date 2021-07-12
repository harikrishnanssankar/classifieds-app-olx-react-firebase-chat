import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import db, { firebasestorage } from "../../firebase";
import { AuthContext } from "../../store/Context";
import LocationAutocomplete from "../LocationAutocomplete/LocationAutocomplete";
import PacmanLoader from "react-spinners/PacmanLoader";
import FadeLoader from "react-spinners/FadeLoader";
import { v4 as uuidv4 } from 'uuid';
import './EditPost.css'




const EditPost = () => {
    //Context
    const { user } = useContext(AuthContext);
    //params
    const { postId } = useParams();
    //useState
    const [image, setImage] = useState();
    const [userDetails, setUserDetails] = useState();
    const [place, setPlace] = useState({});
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [userloading, setUserLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState();
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false)
    //useHistory
    const history = useHistory();
    //fetch user details
    useEffect(() => {
        setUserLoading(true)
        db.collection('users').doc(`${user?.uid}`).get().then(res => {
            setUserDetails(res.data())
        })
        setUserLoading(false)
        return () => {

        }
    }, [user])
    //fetch productdetails
    useEffect(() => {
        setLoading(true)
        db.collection('products').doc(`${postId}`).onSnapshot(snapshot => {
            let snapshotRef = snapshot.data()
            setImageUrl(snapshotRef.url)
            setPlace(snapshotRef.place)
            setTitle(snapshotRef.title)
            setPrice(snapshotRef.price)
            setDescription(snapshotRef.description)
            setCategory(snapshotRef.category);
            setSubCategory(snapshotRef.subCategory);
            setProduct(snapshotRef)

        })
        setLoading(false)
        return () => {

        }
    }, [postId])

    //submit function
    const handleSubmit = () => {
        if (image) {
            setUploading(true)
            firebasestorage.ref(`/image/${uuidv4()}-${image.name}`).put(image).then(({ ref }) => {
                ref.getDownloadURL().then((url) => {
                    db.collection('products').doc(`${postId}`).update({
                        place,
                        title,
                        price,
                        description,
                        url,
                    })
                }).then(
                    setUploaded(true),
                    setTimeout(() => {
                        history.push('/myads')
                    }, 1000)
                )
            })
            setUploading(false)
        } else {
            setUploading(true)
            db.collection('products').doc(`${postId}`).update({
                place,
                title,
                price,
                description,
            }).then(
                setUploaded(true),
                setTimeout(() => {
                    history.push('/myads')
                }, 1000)
            )
        }
        setUploading(false)
    }



    return (
        <div className="editPost__container">
            {
                (loading && userloading) ?
                    <div className="post__loadingComponent">
                        <PacmanLoader color={'#006772 '} loading={loading} size={25} />
                    </div>
                    :
                    <>{
                        (user?.uid === product?.userId) ?
                            <>
                                <h6 style={{ fontWeight: 600, color: '#002f34' }}>SELECTED CATEGORY</h6>
                                <div className="post__changeCategory">
                                    <span>{category + ' / ' + subCategory}</span>
                                </div>
                                <div className="post__details">
                                    <h5>INCLUDE SOME DETAILS</h5>
                                    <label htmlFor="">Ad Title*</label>
                                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="" id="" />
                                    <label >Description*</label>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} cols="20" rows="3"></textarea>
                                </div>
                                <div className="post__price">
                                    <h5>SET A PRICE</h5>
                                    <label>Price*</label>
                                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" name="" id="" />
                                </div>
                                <div className="post__photo">
                                    <h5>UPLOAD PHOTO</h5>
                                    <img width="200px" max-height="400px" src={image ? URL.createObjectURL(image) : imageUrl} alt="" />
                                    <div className="custom-file">
                                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                                    </div>
                                </div>
                                <div className="post__location">
                                    <h5>CONFIRM YOUR LOCATION</h5>
                                    <div>
                                        <LocationAutocomplete setPlace={setPlace} place={place} />
                                    </div>
                                </div>
                                <div style={{ width: '100%' }} className="post__userDetails">
                                    <h5>REVIEW YOUR DETAILS</h5>
                                    <div style={{ display: 'flex', columnGap: '10px', width: '100%' }}>
                                        <img style={{ borderRadius: '50%', objectFit: 'cover', }} className="post__userPhoto" src={userDetails?.photourl} alt="img" />
                                        <div>
                                            <div>
                                                <span>Name : </span>
                                                <span>{userDetails?.username}</span>
                                            </div>
                                            <div>
                                                <span>Phone No:{userDetails?.phone}</span>
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', paddingBottom: '5px' }} className="post__button">
                                    <button style={{ marginLeft: 'auto', marginRight: 0 }} onClick={handleSubmit}>Post now</button>
                                </div>
                            </>
                            :
                            <div><h1>Access Denied</h1></div>
                    }
                    </>
            }
            {
                uploading &&
                <div className="editPost__uploading">
                    <h3>Uploading...</h3>
                    <FadeLoader color={'#006772 '} loading={uploading} size={25} />
                </div>
            }
            {
                uploaded &&
                <div className="editPost__uploading">
                    <h3>Uploaded!!</h3>
                </div>
            }
        </div>
    );
}

export default EditPost;