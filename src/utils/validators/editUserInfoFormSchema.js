import * as Yup from "yup";

const editUserInfoFormSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Name is requied!")
    .min(4, "Name must be at least 4 characters")
    .max(20, "Name consists of a maximum of 20 characters"),
  email: Yup.string()
    .trim()
    .email("Email format is not correct!")
    .required("Email is required!")
    .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g, "Email is not valid!"),
  phone: Yup.string()
    .trim()
    .required("Phone Number is requied!")
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
      "Phone Number is not correct"
    ),
  address: Yup.string().trim().required("Post address is required!"),
  zip: Yup.string().trim().required("ZIP code is required!"),
});

export default editUserInfoFormSchema;
