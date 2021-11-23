import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default Yup.object().shape({
    name: Yup.string().min(5, "Too short.").max(50, "Too Long.").required("Your name required."),
    phoneNumber: Yup.string().required("Your phone number required.").matches(phoneRegExp, "Phone number is not valid"),
    email: Yup.string().email("Invalid email").required("Email is required."),
    password: Yup.string().required("No password provided.").min(8, "Password is too short - should be 8 chars minimum."),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match.")
        .required("You must re-type your password."),
});
