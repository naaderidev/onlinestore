import * as Yup from "yup";

const answerToTicketFormSchema = Yup.object().shape({
  body: Yup.string()
    .trim()
    .max(3000, "حداکثر 3000 کاراکتر مجاز است")
    .required("وارد کردن پیام مناسب الزامی است"),
});

export default answerToTicketFormSchema;
