import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./css/login.css";
import swal from "sweetalert2";

function Login() {
    const { createuser } = useAuth();
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is Required"),
        password: Yup.string().required("Password is Required"),
    });

    const onSubmit = async (values) => {
        try {
            const response = await axios.post("http://localhost:3000/api/user/login", values);
            const { token, isAdmin } = response.data;
            createuser(token, values.email, isAdmin);
            navigate("/home");
        } catch (error) {
            console.error("Login error:", error);
            swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Invalid email or password",
            });
        }
    };

    return (
        <>
            <div className="vh-100 logbg">
                <div className="vh-100 d-flex justify-content-center align-items-center blur-bg">
                    <div className="container col-sm-12 col-md-8 col-lg-6 border rounded-5 bglform p-4 ">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            <Form>
                                <h1 className="text-center text-light mt-4">Login</h1>
                                <div className="mt-4 text-light">
                                    <div>
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <Field
                                        type="email"
                                        placeholder="Enter email"
                                        className="form-control "
                                        id="email"
                                        name="email"
                                    />
                                    <ErrorMessage name="email" className="text-danger" component="div" />
                                </div>

                                <div className="mt-4 text-light">
                                    <div>
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <Field
                                        type="password"
                                        placeholder="Password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                    />
                                    <ErrorMessage name="password" className="text-danger" component="div" />
                                </div>

                                <div className="d-flex justify-content-center mt-4">
                                    <button className="btn btn-warning w-25 rounded-5" type="submit">
                                        Login
                                    </button>
                                </div>

                                <div className="d-flex justify-content-center mt-4">
                                    <p className="text-center text-light">
                                        Don't have an account?{" "}
                                        <Link to="/register" className="text-decoration-none text-warning">
                                            Sign up
                                        </Link>
                                    </p>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
