import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import { Context } from "./Context.js";

import { useKeycloak } from '@react-keycloak/web';

import axios, { AxiosResponse } from 'axios';
import { ListFormat } from 'typescript';

function App() {
  const [isAuth, setIsAuth] = useState<Boolean>();
  const [move, setMove] = useState<Boolean>(false);
  const [roleList, setRoleList] = useState<Array<Text>>([]);

  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {       
    console.log('USEEFFECT keycloak.token')       
    if(initialized===true) {
      if(keycloak.authenticated===true) {
        console.log('User Id: ' + keycloak.subject + ' token: ' + keycloak.token)
        //Получаем перечень ролей пользователя по его токену
        axios.post(          
          'http://' + window.location.hostname + ':8000/api/v1/verify_token',
          {access_token: keycloak.token,}
          ).then((response: AxiosResponse) => {
            console.log(response.data.roles)
            setRoleList(response.data.roles)
            setIsAuth(true)
          }).catch(error => {
            console.log('Error api: ', error)
          })
      }
    }
  }, [keycloak.token]);    

  return (
    <Theme preset={presetGpnDefault}>
      <Context.Provider value={[isAuth, setIsAuth, roleList, move, setMove]}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Context.Provider>
    </Theme>
  )
}

export default App;
