import * as Yup from "yup";

const registerFormSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Name is requied!")
    .min(4, "Name must be at least 4 characters")
    .max(20, "Name consists of a maximum of 20 characters"),
  // username: Yup.string()
  //   .trim()
  //   .required("Username is requied!")
  //   .min(4, "Username must be at least 4 characters")
  //   .max(20, "Username consists of a maximum of 20 characters"),
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
  phone: Yup.string()
    .trim()
    .required("Phone Number is requied!")
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
      "Phone Number is not correct"
    ),
  // province: Yup.string().trim().required("Province is requied!"),
  // city: Yup.string().trim().required("City is requied!"),
  address: Yup.string().trim().required("Address is requied!"),
  zip: Yup.string().trim().required("ZIP code is requied!"),
});

export default registerFormSchema;
