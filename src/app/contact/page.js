import React from "react";
import Footer from "@/components/modules/Footer";
import Header from "@/components/modules/Header";
import { authUser } from "@/utils/authentication/serverHelpers";
import ContactForm from "@/components/templates/contact/ContactForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function page() {
  const user = await authUser();

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLogin={user ? true : false} />
      <main className="flex-grow">
        <ContactForm />
      </main>
      <Footer />
      <ToastContainer position="bottom-left" theme="dark" />
    </div>
  );
}
