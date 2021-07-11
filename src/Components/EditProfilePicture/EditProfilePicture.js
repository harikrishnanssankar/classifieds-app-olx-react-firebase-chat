import { useContext, useEffect, useState } from 'react';
import db, { firebasestorage } from '../../firebase';
import { AuthContext } from '../../store/Context';
import './EditProfilePicture.css'
const EditProfilePicture = () => {
    const { user } = useContext(AuthContext);
    const [photoUrl, setPhotoUrl] = useState('');
    const [profilePic, setProfilePic] = useState()


    useEffect(() => {
        db.collection('users').doc(`${user?.uid}`).onSnapshot(snapshot => {
            setPhotoUrl(snapshot.data()?.photourl)
        })
        return () => {

        }
    }, [user])


    const handleUploadPhoto = () => {
        firebasestorage.ref(`/ProfilePic/${user.uid}.jpeg`).put(profilePic).then(({ ref }) => {
            ref.getDownloadURL().then((url) => {
                db.collection('users').doc(`${user.uid}`).update({
                   photourl:url
                });
                alert('Profile Picture updated')
            })
        })
    }





    return (
        <div className="edit__profilePicture">
            <h5>Edit profile</h5>
            <div className="editPicture__change">
                <img className="editPicture__profilePic" src={profilePic? URL.createObjectURL(profilePic) : photoUrl} alt="img" />
                <div className="editPicture__btns">
                    <p>Clear photos are an important way for buyers and sellers to learn about each other. Be sure doesn’t include any personal or sensitive info you’d rather not have others see.</p>
                    <span>It’s not much fun to chat with a landscape!</span>
                    <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} />
                    <button onClick={handleUploadPhoto}>Upload </button>
                </div>
            </div>
        </div>
    );
}

export default EditProfilePicture;