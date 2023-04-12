import { Fragment, useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Grid, GridItem } from '@consta/uikit/Grid';
import LoginForm from './components/UI/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <Fragment>
      <div style={{display: 'inline-block'}}>
        version:  <div style={{color: 'green'}}>{result}</div>
      </div>
      <Grid cols='5'>
        <GridItem col='2'/>
        <GridItem col='1'>
          {LoginForm()}
        </GridItem>
        <GridItem col='2'/>
      </Grid>
    </Fragment>
  );
}

export default App;
