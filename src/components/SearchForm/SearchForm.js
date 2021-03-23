import React from 'react';
import PropTypes from 'prop-types';

import styles from './SearchForm.module.css';

const SearchForm = ({setFilter, filter}) => {
    const handleChange = e => {
        setFilter(e.target.value);
      };
    
      return (
        <div className={styles.wrapper}>
          <input type="text" className={styles.search} onChange={handleChange} placeholder="Search" value={filter} ></input>
        </div>
      );
};

SearchForm.propTypes = {
  setFilter: PropTypes.func.isRequired
}

export default SearchForm;