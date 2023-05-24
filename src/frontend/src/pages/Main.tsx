import React from "react";
import axios, { AxiosResponse } from 'axios';
import NavBar from "../components/UI/NavBar";

import { Context } from "../Context";

const Main = () => {
    const [result, setResult] = React.useState();
    
    const [isAuth, setIsAuth, roleList] = React.useContext(Context)

    function getApi () {
      console.log('Test:', window.location.hostname) // result for me: localhost
      axios.get(
        'http://' + window.location.hostname + ':8000/api/v1' // thats why :8000
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

        <div style={{display: 'inline-block', marginLeft: '7%'}}>        
            roles user:  {roleList.map( (it:any) => (<li>{it}</li>))}
        </div>                                 
        
      </React.Fragment>
    )
};

export default Main;