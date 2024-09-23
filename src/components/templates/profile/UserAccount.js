"use client";
import React from "react";
import { useFormik } from "formik";
import editUserInfoFormSchema from "@/utils/validators/editUserInfoFormSchema";
import apiRequest from "@/libs/axios/configs";

export default function UserAccount({ user }) {
  const userInfoForm = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      zip: user.zip,
    },
    validationSchema: editUserInfoFormSchema,
    onSubmit: async (values) => {
      const res = await apiRequest.put("/users/change-info", {
        ...values,
        id: user._id,
      });
      if (res.status === 200) {
        location.reload();
      }
    },
  });

  return (
    <form action="" onSubmit={userInfoForm.handleSubmit}>
      <div className="form-row">
        <div className="form-col-50">
          <label htmlFor="">Name</label>
          <input
            className="text-teal"
            type="text"
            name="name"
            value={userInfoForm.values.name}
            onChange={userInfoForm.handleChange}
            onBlur={userInfoForm.handleBlur}
          />
          {userInfoForm.errors.name && userInfoForm.touched.name && (
            <span className="text-xs text-red">{userInfoForm.errors.name}</span>
          )}
        </div>
        <div className="form-col-50">
          <label htmlFor="">Phone</label>
          <input
            className="text-teal"
            type="text"
            name="phone"
            value={userInfoForm.values.phone}
            onChange={userInfoForm.handleChange}
            onBlur={userInfoForm.handleBlur}
          />
          {userInfoForm.errors.phone && userInfoForm.touched.phone && (
            <span className="text-xs text-red">
              {userInfoForm.errors.phone}
            </span>
          )}
        </div>
      </div>
      <div className="form-row">
        <div className="form-col-50">
          <label htmlFor="">Email</label>
          <input
            className="text-teal"
            type="email"
            name="email"
            value={userInfoForm.values.email}
            onChange={userInfoForm.handleChange}
            onBlur={userInfoForm.handleBlur}
          />
          {userInfoForm.errors.email && userInfoForm.touched.email && (
            <span className="text-xs text-red">
              {userInfoForm.errors.email}
            </span>
          )}
        </div>
        <div className="form-col-50">
          <label htmlFor="">ZIP Code</label>
          <input
            className="text-teal"
            type="text"
            name="zip"
            value={userInfoForm.values.zip}
            onChange={userInfoForm.handleChange}
            onBlur={userInfoForm.handleBlur}
          />
          {userInfoForm.errors.zip && userInfoForm.touched.zip && (
            <span className="text-xs text-red">{userInfoForm.errors.zip}</span>
          )}
        </div>
      </div>
      <div className="form-row">
        <div className="form-col-50">
          <label htmlFor="">Post Address</label>
          <input
            className="text-teal"
            type="text"
            name="address"
            value={userInfoForm.values.address}
            onChange={userInfoForm.handleChange}
            onBlur={userInfoForm.handleBlur}
          />
          {userInfoForm.errors.address && userInfoForm.touched.address && (
            <span className="text-xs text-red">
              {userInfoForm.errors.address}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={userInfoForm.isSubmitting}
        className="btn-teal mt-4"
      >
        <span>{userInfoForm.isSubmitting ? "Processing..." : "Edit Info"}</span>
      </button>
    </form>
  );
}
