"use client";
import React from "react";
import { useFormik } from "formik";
import contactFormSchema from "@/utils/validators/contactFormSchema";
import apiRequest from "@/libs/axios/configs";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import Image from "next/image";

export default function ContactForm() {
  const contactForm = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
    validationSchema: contactFormSchema,
    onSubmit: async (values, { resetForm }) => {
      await apiRequest.post("/contact", values);
      resetForm();
    },
  });
  return (
    <div className="flex-center flex-col mb-10">
      <h1 className="title py-5" data-aos="fade-right">
        Contact Us
      </h1>
      <Image
        src="./images/message.svg"
        alt="contact-img"
        data-aos="fade-left"
        width={100}
        height={100}
        quality={100}
      />
      <form
        action=""
        className="flex flex-col gap-2.5 my-4"
        onSubmit={contactForm.handleSubmit}
        data-aos="fade-up"
      >
        <input
          type="text"
          name="name"
          value={contactForm.values.name}
          onChange={contactForm.handleChange}
          onBlur={contactForm.handleBlur}
          placeholder="Your Name"
          className="outline-none rounded-md py-1.5 px-2 border border-teal"
        />
        {contactForm.errors.name && contactForm.touched.name && (
          <span className="text-xs text-rose-800">
            {contactForm.errors.name}
          </span>
        )}
        <input
          type="text"
          name="phone"
          value={contactForm.values.phone}
          onChange={contactForm.handleChange}
          onBlur={contactForm.handleBlur}
          placeholder="Phone Number"
          className="outline-none rounded-md py-1.5 px-2 border border-teal"
        />
        {contactForm.errors.phone && contactForm.touched.phone && (
          <span className="text-xs text-rose-800">
            {contactForm.errors.phone}
          </span>
        )}
        <input
          type="text"
          name="email"
          value={contactForm.values.email}
          onChange={contactForm.handleChange}
          onBlur={contactForm.handleBlur}
          placeholder="Valid Email"
          className="outline-none rounded-md py-1.5 px-2 border border-teal"
        />
        {contactForm.errors.email && contactForm.touched.email && (
          <span className="text-xs text-rose-800">
            {contactForm.errors.email}
          </span>
        )}
        <textarea
          placeholder="Your Message"
          className="outline-none rounded-md py-1.5 px-2 border border-teal"
          rows={6}
          cols={30}
          name="message"
          value={contactForm.values.message}
          onChange={contactForm.handleChange}
          onBlur={contactForm.handleBlur}
        />
        {contactForm.errors.message && contactForm.touched.message && (
          <span className="text-xs text-rose-800">
            {contactForm.errors.message}
          </span>
        )}
        <button
          type="submit"
          disabled={contactForm.isSubmitting}
          className="btn-teal flex-center gap-2 text-teal"
        >
          <span className="text-lg">
            {contactForm.isSubmitting ? "Processing..." : "Send"}
          </span>
          <HiMiniPaperAirplane className="text-base" />
        </button>
      </form>
    </div>
  );
}
