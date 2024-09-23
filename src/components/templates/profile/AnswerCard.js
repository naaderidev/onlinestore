import React from "react";
import clsx from "clsx";

export default function AnswerCard({ type, body, createdAt }) {
  return (
    <div
      className={`flex ${type === "user" ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`px-4 py-3 w-full md:w-1/2 ${
          type === "user"
            ? "border-teal border-s-2 border-t-4 rounded-ss-2xl"
            : "border-tint border-t-4 border-e-2 rounded-se-2xl"
        }`}
      >
        <div
          className={`flex flex-col text-white font-light ${
            type === "user" ? "items-start" : "items-end"
          }`}
        >
          <h2
            className={clsx("badge mb-2", {
              "bg-teal": type === "user",
              "bg-red": type === "admin",
            })}
          >
            {type === "user" ? "User" : "Admin"}
          </h2>
          <h3 className="badge mb-2 bg-tint">
            <span>{new Date(createdAt).toLocaleDateString("en-US")}</span>
            <span className="px-2">|</span>
            <span>{new Date(createdAt).toLocaleTimeString("en-US")}</span>
          </h3>
        </div>
        <p className="text-base text-teal mt-4">{body}</p>
      </div>
    </div>
  );
}
