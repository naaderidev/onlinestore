import React from "react";
import { authUser } from "@/utils/authentication/serverHelpers";
import connectToDB from "@/configs/db";
import orderModel from "@/models/Order";
import MiniTopbar from "@/components/modules/profile/MiniTopbar";
import OrdersContainer from "@/components/templates/profile/OrdersContainer";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function page() {
  connectToDB();
  const user = await authUser();
  const ordersList = await orderModel
    .find({ userId: user?._id })
    .sort({ _id: -1 })
    .lean();

  return (
    <ProfileLayout>
      <div className="container">
        <div className="flex-center">
          <MiniTopbar
            title="Your Orders"
            btn="Market"
            link="/market"
            icon={<HiOutlineBuildingStorefront className="text-lg" />}
          />
        </div>
        <div className="flex-center flex-wrap gap-5 p-4 md:pt-8">
          <OrdersContainer orders={JSON.parse(JSON.stringify(ordersList))} />
        </div>
      </div>
      <ToastContainer position="bottom-left" theme="dark" />
    </ProfileLayout>
  );
}
