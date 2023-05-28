import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from '../../utils/consts';
import { Context } from '../../Context';

const LoginForm = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = React.useContext(Context)

  function login (event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    //setIsAuth(true)
    location.reload()
  };

  useEffect(()=>{
    if (isAuth) {
      navigate(MAIN_ROUTE);
    }
  }, [isAuth])
  
  function LoginForm() {
    return (
      <Form>
        {/*<Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>*/}
        <Button variant="primary" type="submit" onClick={login}>
          Войти
        </Button>
      </Form>
    )
  };

  return(
    <div>
      {LoginForm()}
    </div>
  )
};



export default LoginForm;