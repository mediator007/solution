import { Fragment, useState, useEffect } from 'react';

import { Grid, GridItem } from '@consta/uikit/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./components/AppRouter";

function App() {


  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
