import React from "react";
import axios, { AxiosResponse } from 'axios';
import NavBar from "../components/UI/NavBar";

import { Context } from "../Context";
import { Grid, GridItem } from "@consta/uikit/Grid";
import Callbacks from "../components/UI/Callbacks";
import { Text } from "@consta/uikit/Text";
import { Card } from "@consta/uikit/Card";
import Process from "../components/UI/Process";

const Main = () => {
    const [result, setResult] = React.useState();
    
    const [isAuth, setIsAuth, roleList, move, setMove] = React.useContext(Context)

    function getApi () {
      console.log('Test:', window.location.hostname)
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
        <Grid cols='12' xAlign="left">
          
          <GridItem col='3'>
            <Text 
              style={{marginBottom: '15%', marginTop: '14%'}}
              weight="bold"
              size="xl">Отклики</Text>
              <Callbacks/>
          </GridItem>
          <GridItem col='1'/>
          <GridItem col='8'>
          <Text 
              style={{marginBottom: '1%', marginTop: '4%'}}
              weight="bold"
              size="xl">Воронка найма</Text>
            <Process/>
          </GridItem>
          {/* <GridItem col='4'>
            <div style={{display: 'inline-block', marginLeft: '7%'}}>
              version:  <div style={{color: 'green'}}>{result}</div>
            </div>       

            <div style={{display: 'inline-block', marginLeft: '7%'}}>        
                roles user:  {roleList.map( (it:any) => (<li>{it}</li>))}
            </div>     
          </GridItem> */}
        </Grid>
      </React.Fragment>
    )
};

export default Main;