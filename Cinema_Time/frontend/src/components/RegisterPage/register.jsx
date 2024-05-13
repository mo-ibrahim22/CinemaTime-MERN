import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./css/reg.css";
import swal from "sweetalert2";

function Register() {
    const { createuser, apiDomain, networkError } = useAuth();
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(/^[A-Za-z].*/, "Name must start with a character")
            .required("Name is Required"),
        email: Yup.string().email("Invalid email address").required("Email is Required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is Required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is Required"),
        gender: Yup.string().required("Gender is Required"),
    });

    const onSubmit = async (values) => {
        try {
            const { name, email, password, gender } = values;
            const response = await axios.post(`${apiDomain}/api/user/register`, {
                name,
                email,
                password,
                gender,
            });
            const { token } = response.data;
            createuser(token, email, false); // isAdmin set to false for new users
            navigate("/home");
            swal.fire({
                icon: "success",
                icon: "success",
                title: `Welcome, ${values.email.split("@")[0].charAt(0).toUpperCase() + values.email.split("@")[0].slice(1)}!`,
                text: "You have successfully registered.",
            });
        } catch (error) {
            console.error("Registration error:", error);
            if (error.request && !error.response) {
                networkError();
            }
            else {

                swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: "An error occurred while registering. Please try another email.",
                });
            }
        }
    };

    return (
        <>
            <div className="vh-100 logbg">
                <div className="vh-100 d-flex justify-content-center align-items-center blur-bg overflow-auto">
                    <div className="container col-sm-12 col-md-8 col-lg-6 border rounded-5 bglform p-5 ">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            <Form>
                                <h1 className="text-center text-light  pt-3">Register</h1>

                                <div className="row">
                                    <div className=" pt-3 text-light col-sm-12 col-md-6">
                                        <div>
                                            <label htmlFor="name">Name</label>
                                        </div>
                                        <Field
                                            type="text"
                                            placeholder="Enter name"
                                            className="form-control "
                                            id="name"
                                            name="name"
                                        />
                                        <ErrorMessage name="name" className="text-danger" component="div" />
                                    </div>

                                    <div className=" pt-3 text-light col-sm-12 col-md-6">
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

                                    <div className=" pt-3 text-light col-sm-12 col-md-6">
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

                                    <div className=" pt-3 text-light col-sm-12 col-md-6">
                                        <div>
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                        </div>
                                        <Field
                                            type="password"
                                            placeholder="Confirm Password"
                                            className="form-control"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                        />
                                        <ErrorMessage
                                            name="confirmPassword"
                                            className="text-danger"
                                            component="div"
                                        />
                                    </div>
                                </div>

                                <div className=" pt-3 text-light text-center">
                                    <div>
                                        <label htmlFor="gender" className="h4">
                                            Gender
                                        </label>
                                    </div>
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

                                <div className="d-flex justify-content-center  pt-3">
                                    <button className="btn btn-warning w-25 rounded-5" type="submit">
                                        Register
                                    </button>
                                </div>

                                <div className="d-flex justify-content-center  pt-3">
                                    <p className="text-center text-light">
                                        Already have an account?{" "}
                                        <Link to="/" className="text-decoration-none text-warning">
                                            Login
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

export default Register;
