import * as Yup from "yup";

const checkDiscountFormSchema = Yup.object().shape({
  code: Yup.string()
    .trim()
    .max(10, "Discount code consists of a maximum of 10 characters"),
});

export default checkDiscountFormSchema;
