import React, { useState } from "react";
import clsx from "clsx";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import otpSchema from "@/utils/validators/otpSchema";
import Modal from "@/components/modules/modals/Modal";
import VerifiedModal from "@/components/modules/modals/VerifiedModal";
import phoneLoginFormSchema from "@/utils/validators/phoneLoginFormSchema";
import apiRequest from "@/libs/axios/configs";
import {
  HiMiniPencilSquare,
  HiDevicePhoneMobile,
  HiMiniKey,
  HiMiniEnvelope,
} from "react-icons/hi2";

export default function PhoneLogin({ hidePhoneLogin, showRegisterForm }) {
  const router = useRouter();
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentModal, setCurrentModal] = useState(null);

  const phoneLoginForm = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: phoneLoginFormSchema,
    onSubmit: async (values) => {
      const res = await apiRequest.post("/auth/sms/send", values);
      if (res.status === 201) {
        setPhoneNumber(values.phone);
        setIsOtpSend(true);
      }
    },
  });

  const otpForm = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: otpSchema,
    onSubmit: async (values, { resetForm }) => {
      const res = await apiRequest.post("/auth/sms/verify", {
        ...values,
        phone: phoneNumber,
      });
      if (res.status === 200) {
        setCurrentModal("verify-code");
      }
      resetForm();
    },
  });

  const verifyCode = async () => {
    setCurrentModal(null);
    setIsOtpSend(false);
    const userData = await apiRequest("/auth/me");
    userData.role === "ADMIN"
      ? router.replace("/")
      : router.replace("/profile");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center gap-4 font-light text-sm my-5">
          <button
            className="flex items-center gap-2 bg-white rounded-md px-2 py-1.5 hover:shadow-custom"
            onClick={showRegisterForm}
          >
            <HiMiniPencilSquare className="icon" />
            <span>Register</span>
          </button>
          <button
            onClick={() => location.reload()}
            className="flex items-center gap-2 bg-white rounded-md px-2 py-1.5 hover:shadow-custom"
          >
            <HiMiniEnvelope className="icon" />
            <span>Sign in by email</span>
          </button>
        </div>
        <div className="divider text-base mb-4">OR</div>
        <form
          action=""
          onSubmit={phoneLoginForm.handleSubmit}
          className={clsx("font-light text-sm", {
            "flex flex-col gap-2": isOtpSend === false,
            "hidden text-teal": isOtpSend === true,
          })}
        >
          <div className="flex items-center gap-2 bg-white rounded-md">
            <HiDevicePhoneMobile className="icon" />
            <input
              name="phone"
              className="outline-none rounded-md px-2 py-1.5"
              type="text"
              value={phoneLoginForm.values.phone}
              onChange={phoneLoginForm.handleChange}
              onBlur={phoneLoginForm.handleBlur}
              placeholder="Enter Phone Number"
            />
          </div>
          {phoneLoginForm.errors.phone && phoneLoginForm.touched.phone && (
            <span className="text-xs text-rose-800">
              {phoneLoginForm.errors.phone}
            </span>
          )}
          <button
            type="submit"
            disabled={phoneLoginForm.isSubmitting}
            className="bg-indigo-900/80 transition-all text-white text-base py-1.5 mt-2 rounded-md w-full hover:bg-indigo-900 hover:shadow-custom"
          >
            <span>
              {phoneLoginForm.isSubmitting ? "Processing..." : "Confirm Number"}
            </span>
          </button>
        </form>
        <form
          action=""
          onSubmit={otpForm.handleSubmit}
          className={clsx("font-light text-sm", {
            "flex flex-col gap-2": isOtpSend === true,
            "hidden text-teal": isOtpSend === false,
          })}
        >
          <div className="flex items-center gap-2 bg-white rounded-md">
            <HiMiniKey className="icon" />
            <input
              type="text"
              name="code"
              className="outline-none rounded-md px-2 py-1.5"
              placeholder="Enter Code Received"
              value={otpForm.values.code}
              onChange={otpForm.handleChange}
              onBlur={otpForm.handleBlur}
            />
          </div>
          {otpForm.errors.code && otpForm.touched.code && (
            <span className="text-xs text-rose-800">{otpForm.errors.code}</span>
          )}
          <button
            type="submit"
            disabled={otpForm.isSubmitting}
            className="bg-indigo-900/80 transition-all text-white text-base py-1.5 mt-2 rounded-md w-full hover:bg-indigo-900 hover:shadow-custom"
          >
            <span>
              {otpForm.isSubmitting ? "Processing..." : "Confirm Code"}
            </span>
          </button>
        </form>
        <button
          onClick={hidePhoneLogin}
          className="text-xs text-catalan-600 hover:text-rose-800 cursor-pointer text-center mt-5"
        >
          Cancel operation
        </button>
      </div>
      {currentModal && (
        <Modal>
          {currentModal === "verify-code" && (
            <VerifiedModal
              message="Welcome"
              btn="profile"
              verifyModal={verifyCode}
              closeModal={() => setCurrentModal(null)}
            />
          )}
        </Modal>
      )}
    </>
  );
}
