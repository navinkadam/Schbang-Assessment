import * as Yup from "yup";

export default Yup.object().shape({
    name: Yup.string().min(5, "Too short.").max(50, "Too Long.").required("User name required."),
    email: Yup.string().required("User Email required.").email(),
});
