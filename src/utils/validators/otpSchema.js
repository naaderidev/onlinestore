import * as Yup from "yup";

const otpSchema = Yup.object().shape({
  code: Yup.string()
    .trim()
    .required("Entering received code ie required!")
    .max(5, "Sent code is only 5 digits!"),
});

export default otpSchema;
