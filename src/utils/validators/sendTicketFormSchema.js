import * as Yup from "yup";

const sendTicketFormSchema = Yup.object().shape({
  department: Yup.string().required("Selecting department is required"),
  subDepartment: Yup.string().required("Selecting subdepartment is required"),
  title: Yup.string().trim().required("Enterin a title is required"),
  priority: Yup.string().required("Selecting priority is required"),
  body: Yup.string()
    .trim()
    .max(1000, "Message consists of a maximum of 1000 characters")
    .required("Please write your message"),
});

export default sendTicketFormSchema;
