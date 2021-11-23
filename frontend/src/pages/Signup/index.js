import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";

import Heading from "../../components/Heading";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";

import { SignupSchema } from "../../constant/FormSchema";

import * as actions from "../../redux-store/actions";

import "./signup.css";

export default function Signup() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.redirect) {
            navigate("/");
            dispatch(actions.setUserData({ redirect: false }));
        }
        return;
    }, [user.redirect, navigate, dispatch]);

    return (
        <div className="signUp-wrapper">
            <Heading>Create an Account</Heading>
            <Formik
                enableReinitialize={true}
                initialValues={{ name: "", phoneNumber: "", email: "", password: "", passwordConfirmation: "" }}
                validationSchema={SignupSchema}
                onSubmit={(data) => dispatch(actions.signUp({ ...data }, dispatch))}
            >
                {({ isValid }) => (
                    <Form>
                        <Field name="name" label="Full Name" type="text" component={Input} />
                        <Field name="email" label="Email" type="email" component={Input} />
                        <Field name="phoneNumber" label="Phone Number" type="text" component={Input} />

                        <div className="field-wrapper">
                            <Field name="password" label="Password" type="password" component={Input} />
                            <Field name="passwordConfirmation" label="Confirm Password" type="password" component={Input} />
                        </div>

                        <Button type="submit" disabled={!isValid}>
                            Sign Up
                        </Button>
                        <ErrorMessage msg={user.ui_error_msg} />
                    </Form>
                )}
            </Formik>
        </div>
    );
}
