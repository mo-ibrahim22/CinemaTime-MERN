import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


function DeleteAccount({ userobj }) {
    const { user, removeuser, apiDomain, handleUnauthorized , networkError} = useAuth();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const initialValues = {
        oldPassword: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        oldPassword: Yup.string().required("Old Password is Required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("oldPassword"), null], "Passwords must match")
            .required("Confirm Password is Required"),
    });

    const onDelete = async (values) => {
        try {
            const response = await axios.delete(`${apiDomain}/api/user/${userobj._id}`, {
                data: {
                    oldPassword: values.oldPassword,
                },
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            console.log(response.data);
            setDeleteSuccess(true);
            MySwal.fire({
                icon: "success",
                title: "Account Deleted!",
                text: "Your account has been successfully deleted.",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    removeuser();
                    navigate("/");
                }
            });
        } catch (error) {
            console.error("Delete error:", error);
            if(error.request) {
                networkError();
            }
            else if (error.response.status === 401) {
                handleUnauthorized();
            }
            else {
                MySwal.fire({
                    icon: "error",
                    title: "Delete Failed",
                    text: "Failed to delete account. Please try again.",
                    confirmButtonText: "OK",
                });
            }
        }
    };

    return (

        <div className="container col-sm-12 col-md-8 col-lg-6 border rounded-5 bglform p-4 ">
            <h1 className="text-center text-light mt-4">Delete Account</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onDelete}>
                <Form>
                    <div className="mt-4 text-light">
                        <div>
                            <label htmlFor="oldPassword">Old Password</label>
                        </div>
                        <Field type="password" className="form-control" id="oldPassword" name="oldPassword" />
                        <ErrorMessage name="oldPassword" className="text-danger" component="div" />
                    </div>

                    <div className="mt-4 text-light">
                        <div>
                            <label htmlFor="confirmPassword">Confirm Old Password</label>
                        </div>
                        <Field type="password" className="form-control" id="confirmPassword" name="confirmPassword" />
                        <ErrorMessage name="confirmPassword" className="text-danger" component="div" />
                    </div>

                    <div className="d-flex justify-content-center mt-4 mb-5">
                        <button className="btn btn-danger w-50 rounded-5" type="submit">
                            Delete Account
                        </button>
                    </div>

                    {deleteSuccess && (
                        <div className="alert alert-success mt-3" role="alert">
                            Account deleted successfully!
                        </div>
                    )}
                </Form>
            </Formik>

        </div>
    );
}

export default DeleteAccount;
