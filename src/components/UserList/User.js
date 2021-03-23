import React, {useState} from 'react';
import PropTypes from 'prop-types';

import styles from './UserList.module.css';

import editIcon from '../../images/edit-icon.svg';
import deleteIcon from '../../images/delete-icon.svg';

const User = ({user, userAge,deleteUser, editRow}) => {
    const [isShown, setIsShown] = useState(false);

    const toggleDetails = () => setIsShown(!isShown);

    const handleDeleteUser = surname => {
         let answer = window.confirm('Are you sure you want to delete user?')
    
         if (answer) {
          deleteUser(surname)
         }
      }

    return (
        <div>
        <li key={user.surname} className={styles.item} >
        <div className={styles.buttonsWrapper}>
            <button  onClick={() => handleDeleteUser(user.surname)}>
                <img alt="delete icon" src={deleteIcon} />
            </button>
            <button onClick={() => editRow(user)} >
                <img alt="edit icon" src={editIcon} />
            </button>
        </div>

        <div onClick={toggleDetails}>
        <div className={styles.nameWrapper}>
        <p>{user.firstname}</p>
        <p>{user.surname}</p>
        </div>
        <p className={styles.email}>{user.email}</p>
      <p className={userAge < 18 ? styles.infant : styles.adult}>Age: {userAge}</p>

      {isShown &&
     <div>
         <p>Date of Birth: {user.birthdate}</p>
         {user.avatar && <img className={styles.avatar} alt="user avatar" src={user.avatar}></img>}
         
          </div>
}
</div>
    </li>



</div>
)}

User.propTypes ={
    user: PropTypes.shape({
        firstname: PropTypes.string.isRequired,
            surname: PropTypes.string.isRequired,
            birthdate: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
    }).isRequired,
}

export default User;