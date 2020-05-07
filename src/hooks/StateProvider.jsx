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
