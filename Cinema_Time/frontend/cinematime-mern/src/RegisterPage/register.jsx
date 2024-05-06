import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./css/reg.css";

function Register() {
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: ""
    };

    const validationSchema = Yup.object({
        name: Yup.string().matches(/^[A-Za-z].*/, "Name must start with a character").required("Name is Required"),
        email: Yup.string().email("Invalid email address").required("Email is Required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is Required'),
        gender: Yup.string().required("Gender is Required")
    });

    const onSubmit = (values) => {
        // Handle registration logic here
        console.log(values);
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
                                <h1 className="text-center text-light mt-4">Register</h1>

                                <div className="row">
                                    <div className="mt-4 text-light col-sm-12 col-md-6">
                                        <div><label htmlFor="name">Name</label></div>
                                        <Field type="text" placeholder="Enter name" className="form-control " id="name" name="name" />
                                        <ErrorMessage name="name" className="text-danger" component="div" />
                                    </div>

                                    <div className="mt-4 text-light col-sm-12 col-md-6">
                                        <div><label htmlFor="email">Email</label></div>
                                        <Field type="email" placeholder="Enter email" className="form-control " id="email" name="email" />
                                        <ErrorMessage name="email" className="text-danger" component="div" />
                                    </div>

                                    <div className="mt-4 text-light col-sm-12 col-md-6">
                                        <div><label htmlFor="password">Password</label></div>
                                        <Field type="password" placeholder="Password" className="form-control" id="password" name="password" />
                                        <ErrorMessage name="password" className="text-danger" component="div" />
                                    </div>

                                    <div className="mt-4 text-light col-sm-12 col-md-6">
                                        <div><label htmlFor="confirmPassword">Confirm Password</label></div>
                                        <Field type="password" placeholder="Confirm Password" className="form-control" id="confirmPassword" name="confirmPassword" />
                                        <ErrorMessage name="confirmPassword" className="text-danger" component="div" />
                                    </div>
                                </div>

                                <div className="mt-4 text-light text-center">
                                    <div><label htmlFor="gender" className="h4">Gender</label></div>
                                    <div className="d-flex justify-content-evenly">
                                        <label>
                                            <Field type="radio" name="gender" value="male" />
                                            Male
                                        </label>
                                        <label>
                                            <Field type="radio" name="gender" value="female" />
                                            Female
                                        </label>
                                    </div>
                                    <ErrorMessage name="gender" className="text-danger" component="div" />
                                </div>

                                <div className="d-flex justify-content-center mt-4">
                                    <button className="btn btn-warning w-25 rounded-5" type="submit">
                                        Register
                                    </button>
                                </div>

                                <div className="d-flex justify-content-center mt-4">
                                    <p className="text-center text-light">
                                        Already have an account? <Link to="/" className="text-decoration-none text-warning">Login</Link>
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

export default Register;
