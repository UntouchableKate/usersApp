import React, {useState} from 'react'

import styles from './AddUserForm.module.css';

import addIcon from '../../images/add-icon.png';
import cancelIcon from '../../images/delete-icon.svg';

const AddUserForm = ({addUser, userAcc}) => {

  const [user, setUser] = useState(userAcc)

  const handleInputChange = e => {
    const { name, value } = e.currentTarget
    setUser({ ...user, [name]: value })
  }

  const [file, setFile] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  


  const handleInputFileChange = e => {
    const { name} = e.currentTarget
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    }
    const imgUrl = URL.createObjectURL(file);

    reader.readAsDataURL(file)
    setUser({...user, [name]: imgUrl })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!user.firstname || !user.surname || !user.email || !user.birthdate ) {
       alert('You need to fill in all the input fields'); 
      return;
    }
    addUser(user)
    setUser(userAcc)

    toggleAddUserForm()
  }

  const [isShown, setIsShown] = useState(false);
  const toggleAddUserForm = () => setIsShown(!isShown);

  return (
    <>
     
     {isShown && (

    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <button className={styles.closeModalBtn} onClick={toggleAddUserForm}><img alt="cancel icon" src={cancelIcon} /></button>
      <h3>Add new user</h3>
      <label>First Name</label>
      <input type="text" name="firstname" value={user.firstname} onChange={handleInputChange} />
      <label>Surname</label>
      <input type="text" name="surname" value={user.surname} onChange={handleInputChange} />
      <label>Email</label>
      <input type="email" name="email" value={user.email} onChange={handleInputChange} />
      <label>Date of Birth</label>
      <input type="date" name="birthdate"  max="2014-12-31" value={user.birthdate} onChange={handleInputChange} />
      <label>Avatar</label>
      <input type="file" accept="image/*" name="avatar"  onChange={handleInputFileChange} />
      {imagePreviewUrl && <img alt={file.name} src={imagePreviewUrl} className={styles.previewImg} />}
      <button type="submit" className={styles.addUserBtn}>Add</button>
    </form>
       )}
      <button className={styles.toggleButton} onClick={toggleAddUserForm}><img alt="add icon"  src={addIcon} /></button>
  </>

  )
}

export default AddUserForm;