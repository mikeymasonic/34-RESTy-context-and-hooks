import React, { useState, useEffect } from 'react';
import Form from '../components/Form/Form';
import Display from '../components/Display/Display';
import List from '../components/List/List';
import { fetchResponse } from '../services/api';
import styles from './FormControl.css';

const FormControl = () => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');

  const [disable, setDisable] = useState(true);

  const [headers, setHeaders] = useState({});
  const [response, setResponse] = useState({});
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const storedReqs = JSON.parse(localStorage.getItem('requests'));
    if(storedReqs) setRequests(storedReqs);

    if(method === 'GET' || method === 'DELETE') {
      setDisable(true);
    } else if(method === 'POST' || method === 'PUT' || method === 'PATCH') {
      setDisable(false);
    }
  }, [method]);

  const handleChange = ({ target }) => {
    if(target.name === 'url') setUrl(target.value);
    if(target.name === 'method') setMethod(target.value);
    if(target.name === 'body') setBody(target.value);
  };

  const handleSubmit = () => {
    event.preventDefault();

    let requestObject;
    let saveObject;

    if(method === 'GET' || method === 'DELETE') {
      setBody('');
      requestObject = { 
        method: method 
      };
      saveObject = {
        url: url,
        method: method,
        body: ''
      };
    } else {
      requestObject = { 
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body
      };
      saveObject = {
        url: url,
        method: method,
        body: body
      };
    }

    fetchResponse(url, requestObject)
      .then(response => { 
        if(!response.headers && !response.response || (!response.ok)) {
          setResponse(response.response);
          setHeaders(response.headers);  
          throw Error ('Bad Request');
        } else {
          setResponse(response.response);
          setHeaders(response.headers);    
          handleSave(saveObject);
        }
      });
  };

  const handleSave = (saveObject) => {
    let alreadyExists = false;
    requests.find(request => {
      if(request.method === saveObject.method && request.url === saveObject.url && request.body === saveObject.body) alreadyExists = true;
    });

    if(!alreadyExists) {
      const newRequests = [...requests, saveObject];
      setRequests(newRequests);
      localStorage.setItem('requests', JSON.stringify(newRequests));
    }
    alreadyExists = false;
  };

  const handleClear = () => {
    localStorage.clear();
    setRequests([]);
  };

  const handleLoad = (url, method, body) => {
    setUrl(url);
    setMethod(method);
    setBody(body);
  };

  return (
    <div className={styles.FormControl}>
      <div className={styles.left}>
        <List requests={requests} handleClear={handleClear} handleLoad={handleLoad}/>
      </div>
      <div className={styles.right}>
        <Form url={url} method={method} body={body} disable={disable} onChange={handleChange} onSubmit={handleSubmit}/>
        <Display headers={headers} response={response} />
      </div>
    </div>
  );
};

export default FormControl;
