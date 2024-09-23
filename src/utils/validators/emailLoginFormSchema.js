import * as Yup from "yup";

const emailLoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Email format is not correct!")
    .required("Email is required!")
    .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g, "Email is not valid!"),
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password consists of a maximum of 20 characters")
    .required("Password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
      "Password must include special and uppercase letters"
    ),
});

export default emailLoginFormSchema;
