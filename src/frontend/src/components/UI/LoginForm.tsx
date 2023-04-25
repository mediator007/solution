import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginForm = () => {

  function login (event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log('LOGIN!')
  };
  
  function LoginForm() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
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