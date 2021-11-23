import * as Yup from "yup";

export default Yup.object().shape({
    userId: Yup.string().trim().required("Email is required."),
    password: Yup.string().trim().required("No password provided."),
});
