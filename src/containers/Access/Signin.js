import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signin } from "../../redux/actions/signinActions";

const Signin = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState();
  const [password, SetPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
    dispatch(signin(user));
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  return (
    <div>
      <Container className="mt-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="text"
              placeholder="Password"
              onChange={(e) => SetPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Signin;
