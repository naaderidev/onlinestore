import React from "react";
import { authUser } from "@/utils/authentication/serverHelpers";
import productModel from "@/models/Product";
import Header from "@/components/modules/Header";
import Footer from "@/components/modules/Footer";
import ProductInfo from "@/components/templates/product/ProductInfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductMoreInfo from "@/components/templates/product/ProductMoreInfo";
import RelatedProducts from "@/components/templates/product/RelatedProducts";

export default async function page({ params }) {
  const user = await authUser();
  const productID = params.id;
  const product = await productModel
    .findOne({ _id: productID })
    .populate("comments")
    .lean();

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLogin={user ? true : false} />
      <main className="flex-grow">
        <ProductInfo product={JSON.parse(JSON.stringify(product))} />
        <ProductMoreInfo
          product={JSON.parse(JSON.stringify(product))}
          isLogin={user ? true : false}
        />
        <RelatedProducts productID={JSON.parse(JSON.stringify(productID))} />
      </main>
      <Footer />
      <ToastContainer position="bottom-left" theme="dark" />
    </div>
  );
}
