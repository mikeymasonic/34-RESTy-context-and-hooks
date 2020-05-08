import React, { useState, useEffect } from 'react';
import Form from '../components/Form/Form';
import Display from '../components/Display/Display';
import List from '../components/List/List';
import { fetchResponse } from '../services/api';
import styles from './FormControl.css';
import { useURL, useBody, useMethod, useDispatch, useDisable, useResponse, useHeaders, useRequests } from '../hooks/StateProvider';

const FormControl = () => {
  const url = useURL();
  const body = useBody();
  const method = useMethod();
  const dispatch = useDispatch();
  const disable = useDisable();
  const response = useResponse();
  const headers = useHeaders();
  const requests = useRequests();

  // const [url, setUrl] = useState('');
  // const [method, setMethod] = useState('GET');
  // const [body, setBody] = useState('');

  // const [disable, setDisable] = useState(true);

  // const [headers, setHeaders] = useState({});
  // const [response, setResponse] = useState({});
  // const [requests, setRequests] = useState([]);

  useEffect(() => {
    const storedReqs = JSON.parse(localStorage.getItem('requests'));
    if(storedReqs) dispatch({ type: 'SET_REQUESTS', payload:storedReqs }); 
    // requests(storedReqs);

    if(method === 'GET' || method === 'DELETE') {
      dispatch({ type: 'SET_DISABLE', payload: true });
      // disable(true);
    } else if(method === 'POST' || method === 'PUT' || method === 'PATCH') {
      dispatch({ type: 'SET_DISABLE', payload: false });
      // disable(false);
    }
  }, [method]);

  // const handleChange = ({ target }) => {
  //   if(target.name === 'url') setUrl(target.value);
  //   if(target.name === 'method') setMethod(target.value);
  //   if(target.name === 'body') setBody(target.value);
  // };

  const handleChange = ({ target }) => {
    switch(target.name) {
      case 'url':
        return dispatch({ type: 'SET_URL', payload: target.value });
      case 'method':
        return dispatch({ type: 'SET_METHOD', payload: target.value });
      case 'body':
        return dispatch({ type: 'SET_BODY', payload: target.value });
    }
  };

  const handleSubmit = () => {
    event.preventDefault();

    let requestObject;
    let saveObject;

    if(method === 'GET' || method === 'DELETE') {
      // setBody('');
      dispatch({ type: 'SET_BODY', payload:'' });
      // body('');
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
          // setResponse(response.response);
          // setHeaders(response.headers); 
          dispatch({ type: 'SET_RESPONSE', payload:response.response });
          dispatch({ type: 'SET_HEADERS', payload:response.headers });

          // response(response.response);
          // headers(response.headers);  
          throw Error ('Bad Request');
        } else {
          // setResponse(response.response);
          // setHeaders(response.headers);
          dispatch({ type: 'SET_RESPONSE', payload:response.response });
          dispatch({ type: 'SET_HEADERS', payload:response.headers });  
          // response(response.response);
          // headers(response.headers);    
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
      // setRequests(newRequests);
      
      // requests(newRequests);
      dispatch({ type: 'SET_REQUESTS', payload:newRequests });

      localStorage.setItem('requests', JSON.stringify(newRequests));
    }
    alreadyExists = false;
  };

  const handleClear = () => {
    localStorage.clear();
    // setRequests([]);
    dispatch({ type: 'SET_REQUESTS', payload:[] });
    // requests([]);
  };

  const handleLoad = (url, method, body) => {
    // setUrl(url);
    // setMethod(method);
    // setBody(body);
    dispatch({ type: 'SET_URL', payload:url });
    dispatch({ type: 'SET_METHOD', payload:method });
    dispatch({ type: 'SET_BODY', payload:body });
    // url(url);
    // method(method);
    // body(body);
  };

  return (
    <div className={styles.FormControl}>
      <div className={styles.left}>
        <List handleClear={handleClear} handleLoad={handleLoad}/>
      </div>
      <div className={styles.right}>
        <Form onChange={handleChange} onSubmit={handleSubmit}/>
        <Display />
      </div>
    </div>
  );
};

export default FormControl;
