import React from 'react';
import PropTypes from 'prop-types';

import styles from './SelectForm.module.css';

const SelectFrom = ({setSortType}) => {
    const handleChange = e => {
        setSortType(e.target.value);
      };
    return (
        <div className={styles.wrapper}>
            <select name="select" className={styles.select} defaultValue="def" onChange={handleChange}>
                <option value="def" disabled hidden >Sort by:</option>
                <option value="firstname">First Name</option>
                <option value="surname">Surname</option>
                <option value="age">Age</option>
            </select>
        </div>
    );
};

SelectFrom.propTypes = {
    setSortType: PropTypes.func.isRequired
}

export default SelectFrom;