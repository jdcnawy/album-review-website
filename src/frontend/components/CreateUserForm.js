import React from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./components.module.css";

const CreateUserForm = ({ createUser }) => {
  return (
    <div className={styles.CreateUserForm}>
      <h2>Create an Account!</h2>
      <Form onSubmit={(e) => createUser(e)}>
        <Form.Group controlId="name">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter your username" />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter your email" />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Enter your password" />
        </Form.Group>

        <Form.Group controlId="aboutMe">
          <Form.Label>About Me</Form.Label>
          <Form.Control as="textarea" rows={3} name="aboutMe" placeholder="Tell us about yourself" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create User
        </Button>
      </Form>
    </div>
  );
};

export default CreateUserForm;
