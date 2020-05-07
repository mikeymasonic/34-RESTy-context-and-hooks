export const fetchResponse = (url, request) => {
  return fetch(url, request)
    .then(res => { 
      let headers = {};
      for(let header of res.headers.entries()) headers[header[0]] = header[1];
      return res.json()
        .then(response => {
          const responseObj = {
            headers: headers,
            response: response,
            ok: res.ok
          };
          return responseObj;      
        })
        .catch(error => error);    
    });
};
