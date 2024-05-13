import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import swal from "sweetalert2";
import './css/newitem.css';

function UpdateItemForm({ item }) {
    
    const { user, apiDomain, handleUnauthorized, networkError } = useAuth();
    const [posterURL, setPosterURL] = useState(item.poster); // To store the image URL
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialValues = {
        categorie: item.categorie,
        poster: item.poster,
        rating: item.rating.toString(),
        title: item.title,
        trailerLink: item.trailerLink,
        description: item.description,
        watchingLink: item.watchingLink,
    };

    const validationSchema = Yup.object().shape({
        categorie: Yup.string().required("Category is required"),
        rating: Yup.number().required("Rating is required"),
        title: Yup.string().required("Title is required"),
        trailerLink: Yup.string().url("Invalid URL").required("Trailer link is required"),
        description: Yup.string().required("Description is required"),
        watchingLink: Yup.string().url("Invalid URL").required("Watching link is required"),
        poster: Yup.mixed().required("Poster is required"),
    });

    const handleFileChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPosterURL(reader.result);
                setFieldValue("poster", reader.result); // set base64 value to form field
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (values, { setSubmitting }) => {
        setIsSubmitting(true);
        try {
            const response = await axios.put(`${apiDomain}/api/item/${item._id}`, values, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            console.log(response.data);
            swal.fire({
                icon: "success",
                title: "Item Updated!",
                text: "Item has been successfully updated.",
            });
        } catch (error) {
            console.error("Update error:", error);
            if (error.request && !error.response) {
                networkError();
            }
            else if (error.response.status === 401) {
                handleUnauthorized();
            } else {
                swal.fire({
                    icon: "error",
                    title: "Update Failed",
                    text: "Failed to update item. Please try again.",
                });
            }
        } finally {
            setIsSubmitting(false);
            setSubmitting(false);
        }
    };

    return (
        <div className="container col-sm-12 col-md-8 col-lg-6 border ibglform rounded-5 p-5">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ setFieldValue, isSubmitting }) => (
                    <Form>
                        <h1 className="text-center text-light pt-3">Update Item</h1>

                        <div className="form-group pt-3 text-light">
                            <label htmlFor="categorie">Category</label>
                            <Field as="select" name="categorie" className="form-control">
                                <option value="" disabled>Select Category</option>
                                <option value="Movies">Movies</option>
                                <option value="TvShows">TvShows</option>
                                <option value="Anime">Anime</option>
                            </Field>
                            <ErrorMessage name="categorie" component="div" className="text-danger" />
                        </div>

                        <div className="form-group pt-3 text-light">
                            <label htmlFor="poster">Poster</label>
                            <div>
                                <input
                                    type="text"
                                    name="poster"
                                    placeholder="Enter Image URL or Upload File"
                                    value={posterURL}
                                    onChange={(event) => {
                                        setPosterURL(event.target.value);
                                        setFieldValue("poster", event.target.value);
                                    }}
                                    className="form-control"
                                />
                                <input
                                    type="file"
                                    name="posterFile"
                                    className="form-control mt-2"
                                    onChange={(event) => handleFileChange(event, setFieldValue)}
                                />
                            </div>
                            {posterURL && <img src={posterURL} alt="poster" style={{ marginTop: "10px", maxWidth: "200px" }} />}
                            <ErrorMessage name="poster" component="div" className="text-danger" />
                        </div>

                        <div className="form-group pt-3 text-light">
                            <label htmlFor="rating">Rating</label>
                            <Field type="text" name="rating" className="form-control" />
                            <ErrorMessage name="rating" component="div" className="text-danger" />
                        </div>

                        <div className="form-group pt-3 text-light">
                            <label htmlFor="title">Title</label>
                            <Field type="text" name="title" className="form-control" />
                            <ErrorMessage name="title" component="div" className="text-danger" />
                        </div>

                        <div className="form-group pt-3 text-light">
                            <label htmlFor="trailerLink">Trailer Link</label>
                            <Field type="text" name="trailerLink" className="form-control" />
                            <ErrorMessage name="trailerLink" component="div" className="text-danger" />
                        </div>

                        <div className="form-group pt-3 text-light">
                            <label htmlFor="description">Description</label>
                            <Field as="textarea" name="description" className="form-control" />
                            <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>

                        <div className="form-group pt-3 text-light">
                            <label htmlFor="watchingLink">Watching Link</label>
                            <Field type="text" name="watchingLink" className="form-control" />
                            <ErrorMessage name="watchingLink" component="div" className="text-danger" />
                        </div>

                        <div className="form-group pt-3 d-flex justify-content-center">
                            <button type="submit" disabled={isSubmitting} className="btn btn-outline-warning w-75">
                                {isSubmitting ? "Updating..." : "Update Item"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default UpdateItemForm;
