import React from 'react';
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

function App() {
  const [result, setResult] = useState();

  function getApi () {
    axios.get(
      'http://127.0.0.1:8000/api/v1/'
      ).then((response: AxiosResponse) => {
        setResult(response.data.version)
      }).catch(error => {
        console.log('---error', error)
      })
  };

  useEffect(()=> {
    getApi()
  }, [])

  return (
  <div>
    <h3>Backend API</h3>
    version:  <div style={{color: 'green'}}>{result}</div>
  </div>
  );
}

export default App;
