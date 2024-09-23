import * as Yup from "yup";

const phoneLoginFormSchema = Yup.object().shape({
  phone: Yup.string()
    .trim()
    .required("Phone Number is required!")
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
      "Phone Number is not correct!"
    ),
});

export default phoneLoginFormSchema;
