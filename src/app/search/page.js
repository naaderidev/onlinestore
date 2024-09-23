import React from "react";
import Footer from "@/components/modules/Footer";
import Header from "@/components/modules/Header";
import { authUser } from "@/utils/authentication/serverHelpers";
import SearchContainer from "@/components/templates/search/SearchContainer";

export default async function page() {
  const user = await authUser();
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLogin={user ? true : false} />
      <main className="flex-grow">
        <SearchContainer />
      </main>
      <Footer />
    </div>
  );
}
