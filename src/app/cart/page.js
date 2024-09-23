import React from "react";
import { authUser } from "@/utils/authentication/serverHelpers";
import Header from "@/components/modules/Header";
import Footer from "@/components/modules/Footer";
import UserCart from "@/components/templates/cart/UserCart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function page() {
  const user = await authUser();
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLogin={user ? true : false} />
      <main className="flex-grow">
        <UserCart user={JSON.parse(JSON.stringify(user))} />
      </main>
      <Footer />
      <ToastContainer position="bottom-left" theme="dark" />
    </div>
  );
}
