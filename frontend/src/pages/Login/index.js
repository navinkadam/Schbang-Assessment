import React from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";

import Heading from "../../components/Heading";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import { LoginSchema } from "../../constant/FormSchema";
import * as actions from "../../redux-store/actions";
import "./login.css";

export default function Login() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    return (
        <div className="login-wrapper">
            <Heading>Sign In</Heading>
            <Formik
                initialValues={{ userId: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                    // same shape as initial values
                    dispatch(actions.login(values, dispatch));
                }}
            >
                {({ isValid }) => (
                    <Form>
                        <Field name="userId" label="Email" type="text" component={Input} />
                        <Field name="password" label="Password" type="password" component={Input} />
                        <Button type="submit" disabled={!isValid}>
                            Sign In
                        </Button>
                    </Form>
                )}
            </Formik>
            {/* <CustomLink to="/">
        <Heading variant="h5">Forgot your password?</Heading>
      </CustomLink> */}
            <ErrorMessage msg={user.ui_error_msg} />
        </div>
    );
}
