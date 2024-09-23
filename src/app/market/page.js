import React from "react";
import Footer from "@/components/modules/Footer";
import Header from "@/components/modules/Header";
import { authUser } from "@/utils/authentication/serverHelpers";
import productModel from "@/models/Product";
import MarketContainer from "@/components/templates/market/MarketContainer";
import BrandModel from "@/models/Brand";
import CategoryModel from "@/models/Category";
import connectToDB from "@/configs/db";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function page() {
  connectToDB();
  const user = await authUser();
  const products = await productModel.find({}).sort({ _id: -1 }).lean();
  const brands = await BrandModel.find({}).lean();
  const categories = await CategoryModel.find({}).lean();
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLogin={user ? true : false} />
      <main className="flex-grow">
        <section className="bg-category-pattern baner"></section>
        <section className="flex gap-8 m-8">
          <MarketContainer
            products={JSON.parse(JSON.stringify(products))}
            brands={JSON.parse(JSON.stringify(brands))}
            categories={JSON.parse(JSON.stringify(categories))}
          />
        </section>
      </main>
      <Footer />
      <ToastContainer position="bottom-left" theme="dark" />
    </div>
  );
}
