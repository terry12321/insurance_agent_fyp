import * as yup from "yup";

export const ClientPolicySchema = yup.object({
    name: yup.string().required("Name is required"),
    premium: yup
        .string()
        .matches(/^[0-9]*$/g, "Incorrect premium format")
        .required("Premium is required"),
    coverage: yup
        .string()
        .matches(/^[0-9]*$/g, "Incorrect coverage format")
        .required("Coverage is required"),
});
