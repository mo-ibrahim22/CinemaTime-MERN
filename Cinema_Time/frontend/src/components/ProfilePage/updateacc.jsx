import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Updateacc({ userobj }) {
    const { user, removeuser } = useAuth();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const initialValues = {
        name: userobj.name,
        email: userobj.email,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        gender: userobj.gender,
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(/^[A-Za-z].*/, "Name must start with a character")
            .required("Name is Required"),
        email: Yup.string().email("Invalid email address").required("Email is Required"),
        oldPassword: Yup.string().min(6, "Password must be at least 6 characters"),
        newPassword: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .notOneOf([Yup.ref("oldPassword"), null], "New password must be different from old password")
            .required("New Password is Required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
            .required("Confirm Password is Required"),
        gender: Yup.string().required("Gender is Required"),
    });

    const onSubmit = async (values) => {
        try {
            const { confirmPassword, ...data } = values; // Remove confirmPassword from data sent to backend
            const response = await axios.put(`http://localhost:3000/api/user/${userobj._id}`, data, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            console.log(response.data);
            setUpdateSuccess(true);
            MySwal.fire({
                icon: "success",
                title: "Profile Updated!",
                text: "Your profile has been successfully updated.",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    removeuser();
                    navigate("/");
                }
            });
        } catch (error) {
            console.error("Update error:", error);
            MySwal.fire({
                icon: "error",
                title: "Update Failed",
                text: "Failed to update profile. Please try again.",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <>

            <div className="container col-sm-12 col-md-8 col-lg-6 border rounded-5 bglform p-4 ">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    <Form>
                        <h1 className="text-center text-light mt-4">Update Account</h1>
                        <div className="row">

                            <div className="mt-4 text-light col-sm-12 col-md-6">
                                <div>
                                    <label htmlFor="name">Name</label>
                                </div>
                                <Field type="text" className="form-control" id="name" name="name" />
                                <ErrorMessage name="name" className="text-danger" component="div" />
                            </div>

                            <div className="mt-4 text-light col-sm-12 col-md-6">
                                <div>
                                    <label htmlFor="email">Email</label>
                                </div>
                                <Field type="email" className="form-control" id="email" name="email" />
                                <ErrorMessage name="email" className="text-danger" component="div" />
                            </div>

                            <div className="mt-4 text-light col-sm-12 col-md-6">
                                <div>
                                    <label htmlFor="oldPassword">Old Password</label>
                                </div>
                                <Field type="password" className="form-control" id="oldPassword" name="oldPassword" />
                                <ErrorMessage name="oldPassword" className="text-danger" component="div" />
                            </div>

                            <div className="mt-4 text-light col-sm-12 col-md-6">
                                <div>
                                    <label htmlFor="newPassword">New Password</label>
                                </div>
                                <Field type="password" className="form-control" id="newPassword" name="newPassword" />
                                <ErrorMessage name="newPassword" className="text-danger" component="div" />
                            </div>

                            <div className="mt-4 text-light col-12">
                                <div className="w-75 m-auto text-center">
                                    <div>
                                        <label htmlFor="confirmPassword">Confirm New Password</label>
                                    </div>
                                    <Field type="password" className="form-control" id="confirmPassword" name="confirmPassword" />
                                    <ErrorMessage name="confirmPassword" className="text-danger" component="div" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 text-light text-center">
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

                        <div className="d-flex justify-content-center  mt-4 mb-5 ">
                            <button className="btn btn-warning w-25 rounded-5" type="submit">
                                Update
                            </button>
                        </div>

                        {updateSuccess && (
                            <div className="alert alert-success mt-3" role="alert">
                                Profile updated successfully!
                            </div>
                        )}
                    </Form>
                </Formik>

            </div>
        </>
    );
}

export default Updateacc;
