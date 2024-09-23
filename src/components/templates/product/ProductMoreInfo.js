"use client";
import React, { useState } from "react";
import LongText from "@/components/modules/LongText";
import EmptyComments from "./EmptyComments";
import CommentCard from "./CommentCard";
import { TEXT } from "@/utils/constants";
import { useFormik } from "formik";
import apiRequest from "@/libs/axios/configs";
import sendCommentFormSchema from "@/utils/validators/sendCommentFormSchema";
import { HiMiniPaperAirplane, HiOutlineStar } from "react-icons/hi2";

export default function ProductMoreInfo({ product, isLogin }) {
  const [activeSection, setActiveSection] = useState("moreInfo");
  const [score, setScore] = useState(5);

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  const isAnyCommentToShow = product.comments?.some(
    (comment) => comment.isAccept === true
  );

  const sendCommentForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      body: "",
    },
    validationSchema: sendCommentFormSchema,
    onSubmit: async (values, { resetForm }) => {
      const newComment = {
        name: values.name,
        email: values.email,
        body: values.body,
        score,
        productId: product._id,
      };
      console.log("new comment in frnt::", newComment);
      await apiRequest.post("/comments", newComment);
      resetForm();
    },
  });

  return (
    <>
      <section className="my-4 mx-8">
        <div className="flex items-center justify-start gap-x-4 bg-tint/10 rounded-md p-4 mb-4">
          <span
            className={
              activeSection === "moreInfo" ? "more-info active" : "more-info"
            }
            onClick={() => toggleSection("moreInfo")}
          >
            Product Description
          </span>
          <span
            className={
              activeSection === "comments" ? "more-info active" : "more-info"
            }
            onClick={() => toggleSection("comments")}
          >
            Ratings & Reviews
          </span>
          <span
            className={
              activeSection === "post" ? "more-info active" : "more-info"
            }
            onClick={() => toggleSection("post")}
          >
            Post New Comment
          </span>
        </div>
        <div className="my-4 p-2 bg-tint/10 rounded-md">
          {activeSection === "moreInfo" && (
            <div className="my-4 pl-4 pr-8">
              <LongText text={TEXT} />
            </div>
          )}
          {activeSection === "comments" && (
            <div>
              {product.comments.length ? (
                isAnyCommentToShow ? (
                  product.comments.map(
                    (comment) =>
                      comment.isAccept && (
                        <CommentCard key={comment._id} {...comment} />
                      )
                  )
                ) : (
                  <EmptyComments isLogin={isLogin} />
                )
              ) : (
                <EmptyComments isLogin={isLogin} />
              )}
            </div>
          )}
          {activeSection === "post" && (
            <>
              {isLogin ? (
                <div className="block m-5 text-justify text-teal">
                  <h3 className="suntitle font-semibold">
                    Please submit your feedback to us
                  </h3>
                  <p className="text-xs my-4">
                    Your email address will not be published. Please fill out
                    all fields.
                  </p>
                  <div className="flex items-center gap-1">
                    <h4 className="text-sm">Your Score</h4>
                    <div className="rate">
                      <HiOutlineStar onClick={() => setScore(5)} />
                      <HiOutlineStar onClick={() => setScore(4)} />
                      <HiOutlineStar onClick={() => setScore(3)} />
                      <HiOutlineStar onClick={() => setScore(2)} />
                      <HiOutlineStar onClick={() => setScore(1)} />
                    </div>
                    <span className="text-sm font-semibold text-amber-600 px-2">
                      {score} Star
                    </span>
                  </div>
                  <form
                    action=""
                    className="flex flex-col gap-2.5 my-6 w-full md:w-1/2"
                    onSubmit={sendCommentForm.handleSubmit}
                  >
                    <input
                      type="text"
                      name="name"
                      value={sendCommentForm.values.name}
                      onChange={sendCommentForm.handleChange}
                      onBlur={sendCommentForm.handleBlur}
                      placeholder="Enter your Name"
                      className="outline-none rounded-md py-1.5 px-2 border border-teal bg-transparent"
                    />
                    {sendCommentForm.errors.name &&
                      sendCommentForm.touched.name && (
                        <span className="text-xs text-rose-800">
                          {sendCommentForm.errors.name}
                        </span>
                      )}
                    <input
                      type="email"
                      name="email"
                      value={sendCommentForm.values.email}
                      onChange={sendCommentForm.handleChange}
                      onBlur={sendCommentForm.handleBlur}
                      placeholder="Enter your Email"
                      className="outline-none rounded-md py-1.5 px-2 border border-teal bg-transparent"
                    />
                    {sendCommentForm.errors.email &&
                      sendCommentForm.touched.email && (
                        <span className="text-xs text-rose-800">
                          {sendCommentForm.errors.email}
                        </span>
                      )}
                    <textarea
                      placeholder="Your Message..."
                      className="outline-none rounded-md py-1.5 px-2 border border-teal bg-transparent"
                      rows={5}
                      cols={30}
                      name="body"
                      value={sendCommentForm.values.body}
                      onChange={sendCommentForm.handleChange}
                      onBlur={sendCommentForm.handleBlur}
                    />
                    {sendCommentForm.errors.body &&
                      sendCommentForm.touched.body && (
                        <span className="text-xs text-rose-800">
                          {sendCommentForm.errors.body}
                        </span>
                      )}
                    <button
                      type="submit"
                      disabled={sendCommentForm.isSubmitting}
                      className="btn-teal flex-center gap-2 text-teal w-fit"
                    >
                      <span>
                        {sendCommentForm.isSubmitting
                          ? "Processing..."
                          : "Send"}
                      </span>
                      <HiMiniPaperAirplane className="text-base" />
                    </button>
                  </form>
                </div>
              ) : (
                <EmptyComments isLogin={isLogin} />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
