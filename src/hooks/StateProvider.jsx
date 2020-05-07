import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const StateContext = createContext();

const initialState = {
  url: '',
  method: 'GET',
  body: '',
  disable: true,
  headers: {},
  response: {},
  requests: []
};

export function reducer(state, action) {
  switch(action.type) {
    case 'SET_URL':
      return { ...state, url: action.payload };
    case 'SET_METHOD':
      return { ...state, method: action.payload };
    case 'SET_BODY':
      return { ...state, body: action.payload };
    case 'SET_REQUESTS':
      return { ...state, requests: [...state.requests, action.payload] };
    case 'SET_DISABLE':
      return { ...state, disable: action.payload };
    case 'SET_RESPONSE':
      return { ...state, response: action.payload };
    case 'SET_HEADERS':
      return { ...state, headers: action.payload };
    
    default:
      return state;
  }
}

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

StateProvider.propTypes = {
  children: PropTypes.node
};

export const useGlobalState = () => {
  const { state } = useContext(StateContext);
  return state;
};

export const useURL = () => {
  const { url } = useGlobalState();
  return url;
};

export const useBody = () => {
  const { body } = useGlobalState();
  return body;
};

export const useMethod = () => {
  const { method } = useGlobalState();
  return method;
};

export const useDispatch = () => {
  const { dispatch } = useContext(StateContext);
  return dispatch;
};

export const useDisable = () => {
  const { disable } = useGlobalState();
  return disable;
};

export const useResponse = () => {
  const { response } = useContext(StateContext);
  return response;
};

export const useHeaders = () => {
  const { headers } = useContext(StateContext);
  return headers;
};

export const useRequests = () => {
  const { requests } = useGlobalState();
  return requests;
};

