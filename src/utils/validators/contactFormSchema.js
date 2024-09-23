import * as Yup from "yup";

const contactFormSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  phone: Yup.string()
    .trim()
    .required("Phone number is required")
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
      "Phone number is not correct!"
    ),
  email: Yup.string()
    .trim()
    .required("Email is required")
    .matches(
      /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g,
      "Email format is not correct!"
    ),
  message: Yup.string().trim().required("Please write your message!"),
});

export default contactFormSchema;
