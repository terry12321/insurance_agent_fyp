import * as yup from "yup";

export const SignupSchema = yup.object({
    firstName:yup.string().required("First name required"),
    lastName:yup.string().required("Last name required"),
    email:yup.string().required("Email required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Password is required"),
});
