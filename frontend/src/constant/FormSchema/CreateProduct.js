import * as Yup from "yup";

export default Yup.object().shape({
    name: Yup.string().min(5, "Too short.").max(50, "Too Long.").required("Product name required."),
    price: Yup.number().min(0, "Product value must be greater than 0.").required("Product Price name required."),
    description: Yup.string().min(20, "Too short.").max(500, "Too Long.").required("Product description required."),
    // images: Yup.array().min(0, "Product description required.").max(4, "Maximum 4 images upload").required("Product description required."),
});
