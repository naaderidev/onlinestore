"use client";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "@/components/templates/login-register/Register";
import EmailLogin from "@/components/templates/login-register/EmailLogin";

export default function page() {
  const [authType, setAuthType] = useState("login");

  return (
    <div className="bg-login-pattern baner flex-center h-screen">
      {authType === "login" ? (
        <EmailLogin showRegisterForm={() => setAuthType("register")} />
      ) : (
        <Register showLoginForm={() => setAuthType("login")} />
      )}
      <ToastContainer position="bottom-left" theme="dark" />
    </div>
  );
}
