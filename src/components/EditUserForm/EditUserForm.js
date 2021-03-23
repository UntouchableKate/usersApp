import React, { useState } from 'react'
import PropTypes from 'prop-types';

import styles from '../AddUserForm/AddUserForm.module.css';

const EditUserForm = ({currentUser, updateUser, setEditing}) => {
  const [user, setUser] = useState(currentUser)

  const handleInputChange = e => {
    const { name, value } = e.currentTarget
    setUser({ ...user, [name]: value })
  }

  const [file, setFile] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const fileInput = React.createRef();

  const handleInputFileChange = e => {
    const { name} = e.currentTarget
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    }
    reader.readAsDataURL(file)
    const imgUrl = URL.createObjectURL(file);

    setUser({...user, [name]: imgUrl })
  }


  const handleSubmit = event => {
    event.preventDefault()
    updateUser(user.birthdate, user)
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
       <h3>User editing</h3>
      <label>First Name</label>
      <input type="text" name="firstname" value={user.firstname} onChange={handleInputChange} />
      <label>Surname</label>
      <input type="text" name="surname" value={user.surname} onChange={handleInputChange} />
      <label>Email</label>
      <input type="email" name="email" value={user.email} onChange={handleInputChange} />
      <label>Date of Birth</label>
      <input type="date" name="birthdate"  max="2014-12-31" value={user.birthdate} onChange={handleInputChange} />
      <label>Avatar</label>
      <input type="file" accept="image/*" name="avatar" ref={fileInput}  onChange={handleInputFileChange} />
      {imagePreviewUrl && <img src={imagePreviewUrl} alt={file.name} className={styles.previewImg} />}
      <button type="submit" className={styles.addUserBtn}>Update user</button>
      <button
        onClick={() => setEditing(false)}
        className={styles.cancelEditingBtn}
      >
        Cancel
      </button>
    </form>
  )
}

EditUserForm.propTypes ={
  updateUser: PropTypes.func.isRequired,
  currentUser: PropTypes.objectOf(PropTypes.string.isRequired),
  setEditing: PropTypes.func.isRequired,
}

export default EditUserForm;