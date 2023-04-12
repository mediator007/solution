import React from 'react';
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

function App() {
  const [result, setResult] = useState();

  function getApi () {
    console.log(window.location.hostname)
    axios.get(
      'http://' + window.location.hostname + ':8000/api/v1'
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
