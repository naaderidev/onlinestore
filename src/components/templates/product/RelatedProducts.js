import React from "react";
import connectToDB from "@/configs/db";
import productModel from "@/models/Product";
import ProductSlider from "@/components/modules/ProductSlider";

export default async function RelatedProducts({ productID }) {
  connectToDB();
  const mainProduct = await productModel.findOne({ _id: productID }).lean();
  const relatedProducts = await productModel
    .find({ $or: [{ category: mainProduct.category }, { brand: mainProduct.brand }] })
    .limit(10)
    .sort({ _id: -1 })
    .lean();
  return (
    <div className="mx-2 sm:mx-5">
      <h1 className="title m-5">Products you may like</h1>
      <ProductSlider products={JSON.parse(JSON.stringify(relatedProducts))} />
    </div>
  );
}
