import React from 'react';
import PropTypes from 'prop-types';

import User from './User';

import styles from './UserList.module.css';

const UserList = ({users, userAge, deleteUser,editRow, imagePreviewUrl}) => (
<>
    <ul className={styles.list}>
        {users.map( user => (
            <User user={user} key={user.surname} userAge={userAge(user)} deleteUser={deleteUser} editRow={editRow} imagePreviewUrl={imagePreviewUrl} />
        ))}
    </ul>
    </>
);

UserList.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            firstname: PropTypes.string.isRequired,
            surname: PropTypes.string.isRequired,
            birthdate: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        }),
    ).isRequired,
}

export default UserList;