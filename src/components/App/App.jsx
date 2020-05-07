import React from 'react';
import FormControl from '../../containers/FormControl';
import styles from './App.css';
import Header from '../Header/Header';

export default function App() {
  return (
    <div className={styles.App}>
      <Header />
      <FormControl />
    </div>
  );
}
  
