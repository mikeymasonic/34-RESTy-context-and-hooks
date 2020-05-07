import React from 'react';
import PropTypes from 'prop-types';
import styles from './List.css';

const List = ({ requests, handleClear, handleLoad }) => {
  const requestNodes = requests.map(request => {
    const home = request.url.split('/')[2];
    const user = request.url.split('.com')[1];
    return <li key={`${request.url}${request.method}`} onClick={() => handleLoad(request.url, request.method, request.body)}>
      <h3>{request.method}</h3>
      <p>{home}</p>
      <p>{user}</p>
    </li>;
  });

  return (
    <div className={styles.List}>
      <ul>
        {requestNodes}
      </ul>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};

List.propTypes = {
  requests: PropTypes.array,
  handleClear: PropTypes.func,
  handleLoad: PropTypes.func
};

export default List;
