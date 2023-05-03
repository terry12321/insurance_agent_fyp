import * as yup from "yup";

export const ClientSchema = yup.object({
    name: yup.string().required("Name is required"),
    NRIC: yup
        .string()
        .matches(/([A-Z]){1}\d{7}([A-Z]){1}$/g, "Invalid NRIC!")
        .max(9)
        .required("NRIC is required"),
    contactNo: yup
        .string()
        .matches(/(8|9)(\d{7}|\d{3} \d{4})/g, "Invalid contact number!")
        .min(8)
        .max(8, "contact must be at most 8 numbers")
        .required("Contact is required"),
    email: yup.string().email().typeError("Invalid email!"),
    address: yup
        .string()
        .typeError("Please an address!")
        .required("Address is required"),
    occupation: yup.string().required("Occupation is required"),
});
