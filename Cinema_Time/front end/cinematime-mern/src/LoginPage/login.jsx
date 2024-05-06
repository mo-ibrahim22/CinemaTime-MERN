import React from "react";
import { Form, Button } from "react-bootstrap";
import "./css/login.css";

function Login() {
    return (
        <>
            <div className="vh-100 logbg">
                <div className="vh-100 d-flex justify-content-center align-items-center  blur-bg">
                    <div className="container w-sm-100 w-50 border rounded-5 bglform p-4">
                        <h1 className="text-center text-light my-4">Login</h1>
                        <Form>
                            <Form.Group controlId="formBasicEmail" className="my-4">
                                <Form.Label className="text-center text-light">Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" className="my-4">
                                <Form.Label className="text-center text-light">Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <div className="d-flex justify-content-center my-4">
                                <Button className="btn btn-warning w-25 rounded-5" type="submit">
                                    Login
                                </Button>
                            </div>
                            <div className="d-flex justify-content-center my-4">
                                <Form.Text className="text-center text-light">
                                    Don't have an account? <a href="/signup" className="text-decoration-none text-warning">Sign up</a>
                                </Form.Text>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
