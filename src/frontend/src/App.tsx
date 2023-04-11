import React from 'react';
import { useState, useEffect } from 'react';
import axios, { Axios, AxiosResponse } from 'axios';

function App() {
  const [result, setResult] = useState();

  function getApi () {
    axios.get(
      'http://127.0.0.1:8000/api/v1/'
      ).then((response: AxiosResponse) => {
        console.log('response', response)
      }).catch(error => {
        console.log('---error', error)
      })
  };

  useEffect(()=> {
    getApi()
  }, [])

  return (
  <div>
    Hello world!    
  </div>
  );
}

export default App;
