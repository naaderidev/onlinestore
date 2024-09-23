import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import apiRequest from "@/libs/axios/configs";
import PhoneLogin from "./PhoneLogin";
import Modal from "@/components/modules/modals/Modal";
import VerifiedModal from "@/components/modules/modals/VerifiedModal";
import emailLoginFormSchema from "@/utils/validators/emailLoginFormSchema";
import {
  HiMiniPencilSquare,
  HiDevicePhoneMobile,
  HiMiniLockClosed,
  HiMiniEnvelope,
} from "react-icons/hi2";

export default function EmailLogin({ showRegisterForm }) {
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const router = useRouter();

  const emailLoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: emailLoginFormSchema,
    onSubmit: async (values, { resetForm }) => {
      const res = await apiRequest.post("/auth/login", values);
      if (res.status === 200) {
        setCurrentModal("verify");
      }
      resetForm();
    },
  });

  const verifyLogin = async () => {
    const userData = await apiRequest("/auth/me");
    userData.data.role === "ADMIN"
      ? router.replace("/")
      : router.replace("/profile");
  };

  return (
    <>
      <div className="login-container flex items-center justify-center h-screen w-screen text-indigo-900">
        <div className="flex flex-col items-center justify-center relative bg-gray-100 opacity-95 p-8 rounded-2xl">
          <h2 className="font-bold text-xl my-2">Sign In</h2>
          <h6 className="font-light text-xs mb-4">
            Don't have an account? Regidter Now for Free!
          </h6>
          {!isLoginWithOtp ? (
            <>
              <div className="flex items-center gap-4 font-light text-sm my-5">
                <button
                  className="flex items-center gap-2 bg-white rounded-md px-2 py-1.5 hover:shadow-custom"
                  onClick={showRegisterForm}
                >
                  <HiMiniPencilSquare className="icon" />
                  <span>Register</span>
                </button>
                <button
                  className="flex items-center gap-2 bg-white rounded-md px-2 py-1.5 hover:shadow-custom"
                  onClick={() => setIsLoginWithOtp(true)}
                >
                  <HiDevicePhoneMobile className="icon" />
                  <span>Sign in by mobile</span>
                </button>
              </div>
              <div className="divider text-base mb-4">OR</div>
              <form
                action=""
                onSubmit={emailLoginForm.handleSubmit}
                className="flex flex-col gap-2 font-light text-sm"
              >
                <div className="flex items-center gap-2 bg-white rounded-md">
                  <HiMiniEnvelope className="icon" />
                  <input
                    type="email"
                    name="email"
                    className="outline-none rounded-md px-2 py-1.5"
                    placeholder="Enter Email"
                    value={emailLoginForm.values.email}
                    onChange={emailLoginForm.handleChange}
                    onBlur={emailLoginForm.handleBlur}
                  />
                </div>
                {emailLoginForm.errors.email &&
                  emailLoginForm.touched.email && (
                    <span className="text-xs text-rose-800">
                      {emailLoginForm.errors.email}
                    </span>
                  )}
                <div className="flex items-center gap-2 bg-white rounded-md">
                  <HiMiniLockClosed className="icon" />
                  <input
                    type="password"
                    name="password"
                    className="outline-none rounded-md px-2 py-1.5"
                    placeholder="Enter Password"
                    value={emailLoginForm.values.password}
                    onChange={emailLoginForm.handleChange}
                    onBlur={emailLoginForm.handleBlur}
                  />
                </div>
                {emailLoginForm.errors.password &&
                  emailLoginForm.touched.password && (
                    <span className="text-xs text-rose-800">
                      {emailLoginForm.errors.password}
                    </span>
                  )}
                <button
                  type="submit"
                  disabled={emailLoginForm.isSubmitting}
                  className="bg-indigo-900/80 transition-all text-white text-base py-1.5 mt-2 rounded-md w-full hover:bg-indigo-900 hover:shadow-custom"
                >
                  <span>
                    {emailLoginForm.isSubmitting ? "Processing..." : "SignIn"}
                  </span>
                </button>
              </form>
              <Link href="/" className="font-light text-xs my-4 text-rose-900">
                Forgot Password?
              </Link>
            </>
          ) : (
            <PhoneLogin
              hidePhoneLogin={() => setIsLoginWithOtp(false)}
              showRegisterForm={showRegisterForm}
            />
          )}
        </div>
      </div>
      {currentModal && (
        <Modal>
          {currentModal === "verify" && (
            <VerifiedModal
              message="Welcome"
              btn="my profile"
              verifyModal={verifyLogin}
              closeModal={() => setCurrentModal(null)}
            />
          )}
        </Modal>
      )}
    </>
  );
}
