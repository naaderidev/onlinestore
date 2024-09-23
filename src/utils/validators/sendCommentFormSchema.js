import * as Yup from "yup";

const sendCommentFormSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required!"),
  email: Yup.string()
    .trim()
    .email("Email format is not correct")
    .required("Email is required!")
    .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g, "Email is not valid!"),
  body: Yup.string()
    .trim()
    .max(1000, "Your message consists of a maximum of 1000 characters")
    .required("Please write your message!"),
});

export default sendCommentFormSchema;
