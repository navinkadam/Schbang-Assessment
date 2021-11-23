import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Heading from "../../../components/Heading";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { CreateProduct } from "../../../constant/FormSchema";
import FileInput from "../../../components/FileInput";

import * as actions from "../../../redux-store/actions";

import "./createProduct.css";

export default function Signup({ isEdit }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const product = useSelector((state) => state.product);

    const [productImages, setProductImages] = useState([]);

    useEffect(() => {
        if (product.refresh) {
            navigate("/");
            dispatch(actions.setProductData({ refresh: false }));
        }
        return;
    }, [product.refresh, navigate, dispatch]);

    const onFileUpload = (fileObj) => {
        setProductImages([...productImages, ...fileObj]);
    };
    return (
        <div className="c-product-wrapper">
            <Heading>Create Product</Heading>
            <Formik
                enableReinitialize={true}
                initialValues={{ name: "", price: "", email: "", description: "", images: [] }}
                validationSchema={CreateProduct}
                onSubmit={(data) => {
                    dispatch(actions.createProduct({ ...data, images: productImages }, dispatch));
                }}
            >
                {({ isValid }) => (
                    <Form>
                        <div className="field-wrapper">
                            <Field name="name" label="Name" type="text" component={Input} />
                            <Field name="price" label="Price" type="Number" min={0} component={Input} />
                        </div>
                        <Field name="description" label="Description" type="textarea" min={0} component={Input} />

                        <FileInput onChange={onFileUpload} />
                        <Button type="submit" disabled={!isValid}>
                            Create Product
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
