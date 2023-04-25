import React from "react";
import axios, { AxiosResponse } from 'axios';
import NavBar from "../components/UI/NavBar";

const Main = () => {
    const [result, setResult] = React.useState();

    function getApi () {
      console.log(window.location.hostname)
      axios.get(
        'http://' + window.location.hostname + ':8000/api/v1'
        ).then((response: AxiosResponse) => {
          setResult(response.data.api_version)
        }).catch(error => {
          console.log('---error', error)
        })
    };
  
    React.useEffect(()=> {
      getApi()
    }, [])

    return(
      <React.Fragment>
        <NavBar/>
        <div style={{display: 'inline-block', marginLeft: '7%'}}>
            version:  <div style={{color: 'green'}}>{result}</div>
        </div>
      </React.Fragment>
    )
};

export default Main;