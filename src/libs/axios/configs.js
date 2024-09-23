import axios from "axios";
import { toast } from "react-toastify";

const apiRequest = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "content-Type": "application/json",
  },
  //   params: {}
});

apiRequest.interceptors.request.use(
  (config) => {
    // console.log("requset Config::", config);
    return config;
  },
  (error) => {
    // console.log("requset error::", error);
    return Promise.reject(error);
  }
);

apiRequest.interceptors.response.use(
  (response) => {
    // console.log("response int::", response);
    if (response.status === 201) {
      toast.success(<p className="toast">Operation is done successfully</p>);
    } else if (response.status === 200) {
      toast.success(<p className="toast">Operation is done successfully</p>);
    }
    return response;
  },
  (error) => {
    // console.log("response int error::", error);
    const status = error.response.status;
    if (status === 500) {
      return toast.error(
        <p className="toast">Server error! try later...</p>
      );
    } else if (status === 401) {
      return toast.error(
        <p className="toast">Please login to continue</p>
      );
    } else if (status === 433) {
      return toast.error(
        <p className="toast">Information you enterde is not correct</p>
      );
    } else if (status === 422) {
      return toast.error(
        <p className="toast">User not found</p>
      );
    } else if (status === 434) {
      return toast.error(
        <p className="toast">You have registered before!</p>
      );
    } else if (status === 435) {
      return toast.info(
        <p className="toast">محصول درحال حاضر در لیست دلخواه موجود است</p>
      );
    } else if (status === 436) {
      return toast.error(<p className="toast">Discount code is expired</p>);
    } else if (status === 437) {
      return toast.error(<p className="toast">Discount code is invalid</p>);
    } else if (status === 438) {
      return toast.error(<p className="toast">User is banned already!</p>);
    } else if (status === 409) {
      return toast.error(<p className="toast">Code is invalid</p>);
    } else if (status === 410) {
      return toast.error(<p className="toast">Code is expired</p>);
    } else if (status === 404) {
      return toast.error(
        <p className="toast">Sorry... Not Found!</p>
      );
    } else if (status === 400) {
      return toast.error(<p className="toast">No Image!</p>);
    }
    return Promise.reject(error);
  }
);

export default apiRequest;
