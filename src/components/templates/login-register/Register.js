import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import apiRequest from "@/libs/axios/configs";
import Modal from "@/components/modules/modals/Modal";
import VerifiedModal from "@/components/modules/modals/VerifiedModal";
import registerFormSchema from "@/utils/validators/registerFormSchema";

import {
  HiMiniUser,
  HiMiniMapPin,
  HiDevicePhoneMobile,
  HiMiniLockClosed,
  HiMiniEnvelope,
  HiMiniHomeModern,
} from "react-icons/hi2";

export default function Register({ showLoginForm }) {
  const router = useRouter();
  const [currentModal, setCurrentModal] = useState(null);
  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      zip: "",
    },
    validationSchema: registerFormSchema,
    onSubmit: async (values) => {
      const res = await apiRequest.post("/auth/register", values);
      if (res.status === 201) {
        setCurrentModal("verify-register");
      }
    },
  });

  return (
    <>
      <div className="login-container flex items-center justify-center h-screen w-screen text-indigo-900">
        <div className="flex flex-col items-center justify-center relative bg-gray-100 opacity-95 p-8 rounded-2xl">
          <h2 className="font-bold text-xl my-2">Register</h2>
          <div className="text-link text-catalan-800 flex-center gap-2 mb-4">
            <div className="font-light text-xs mb-4">
              Have you registered before?
              <button
                className="px-2 text-sm font-bold"
                onClick={() => location.reload()}
              >
                Login
              </button>
            </div>
          </div>
          <form
            action=""
            onSubmit={registerForm.handleSubmit}
            className="flex-center flex-col"
          >
            <div className="form-row">
              <div className="form-col-50">
                <div className="flex items-center gap-2 px-2 bg-white rounded-md">
                  <HiMiniUser className="icon" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    name="name"
                    value={registerForm.values.name}
                    onChange={registerForm.handleChange}
                    onBlur={registerForm.handleBlur}
                    className="outline-none rounded-md py-1.5"
                  />
                </div>
                {registerForm.errors.name && registerForm.touched.name && (
                  <span className="text-xs text-rose-800">
                    {registerForm.errors.name}
                  </span>
                )}
              </div>
              <div className="form-col-50">
                <div className="flex items-center gap-2 px-2 bg-white rounded-md">
                  <HiDevicePhoneMobile className="icon" />
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={registerForm.values.phone}
                    onChange={registerForm.handleChange}
                    onBlur={registerForm.handleBlur}
                    className="outline-none rounded-md py-1.5"
                  />
                </div>
                {registerForm.errors.phone && registerForm.touched.phone && (
                  <span className="text-xs text-rose-800">
                    {registerForm.errors.phone}
                  </span>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-col-50">
                <div className="flex items-center gap-2 px-2 bg-white rounded-md">
                  <HiMiniEnvelope className="icon" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={registerForm.values.email}
                    onChange={registerForm.handleChange}
                    onBlur={registerForm.handleBlur}
                    className="outline-none rounded-md py-1.5"
                  />
                </div>
                {registerForm.errors.email && registerForm.touched.email && (
                  <span className="text-xs text-rose-800">
                    {registerForm.errors.email}
                  </span>
                )}
              </div>
              <div className="form-col-50">
                <div className="flex items-center gap-2 px-2 bg-white rounded-md">
                  <HiMiniLockClosed className="icon" />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={registerForm.values.password}
                    onChange={registerForm.handleChange}
                    onBlur={registerForm.handleBlur}
                    className="outline-none rounded-md py-1.5"
                  />
                </div>
                {registerForm.errors.password &&
                  registerForm.touched.password && (
                    <span className="text-xs text-rose-800">
                      {registerForm.errors.password}
                    </span>
                  )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-col-50">
                <div className="flex items-center gap-2 px-2 bg-white rounded-md">
                  <HiMiniMapPin className="icon" />
                  <input
                    type="text"
                    placeholder="Enter your zip code"
                    name="zip"
                    value={registerForm.values.zip}
                    onChange={registerForm.handleChange}
                    onBlur={registerForm.handleBlur}
                    className="outline-none rounded-md py-1.5"
                  />
                </div>
                {registerForm.errors.zip && registerForm.touched.zip && (
                  <span className="text-xs text-rose-800">
                    {registerForm.errors.zip}
                  </span>
                )}
              </div>
              <div className="form-col-50">
                <div className="flex items-center gap-2 px-2 bg-white rounded-md">
                  <HiMiniHomeModern className="icon" />
                  <input
                    type="text"
                    placeholder="Enter your full address"
                    name="address"
                    value={registerForm.values.address}
                    onChange={registerForm.handleChange}
                    onBlur={registerForm.handleBlur}
                    className="outline-none rounded-md py-1.5"
                  />
                </div>
                {registerForm.errors.address &&
                  registerForm.touched.address && (
                    <span className="text-xs text-rose-800">
                      {registerForm.errors.address}
                    </span>
                  )}
              </div>
            </div>
            <button
              type="submit"
              disabled={registerForm.isSubmitting}
              className="bg-indigo-900/80 transition-all text-white text-base py-1.5 mt-4 rounded-md w-1/3 hover:bg-indigo-900 hover:shadow-custom"
            >
              <span>
                {registerForm.isSubmitting ? "Processing..." : "Register"}
              </span>
            </button>
          </form>
          <Link
            href="/"
            className="text-link text-xs text-catalan-600 hover:text-rose-800 cursor-pointer text-center mt-4"
          >
            Back to Home!
          </Link>
        </div>
      </div>
      {currentModal && (
        <Modal>
          {currentModal === "verify-register" && (
            <VerifiedModal
              message="Welcome"
              btn="my profile"
              verifyModal={() => router.replace("/profile")}
              closeModal={() => setCurrentModal(null)}
            />
          )}
        </Modal>
      )}
    </>
  );
}
