import { Fragment, useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import { Context } from "./Context.js";

function App() {
  const [isAuth, setIsAuth] = useState<Boolean>();

  return (
      <Context.Provider value={[isAuth, setIsAuth]}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Context.Provider>
  )
}

export default App;
