import React from "react";
import connectToDB from "@/configs/db";
import orderModel from "@/models/Order";
import MiniTopbar from "@/components/modules/profile/MiniTopbar";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import OrderInfo from "@/components/templates/profile/OrderInfo";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

export default async function page({ params }) {
  connectToDB();
  const mainOrder = await orderModel
    .findOne({ _id: params.id })
    .populate("userId")
    .lean();
  return (
    <ProfileLayout>
      <div className="container">
        <div>
          <MiniTopbar
            title="Order Details"
            btn="Orders"
            link="/profile"
            icon={<HiOutlineClipboardDocumentList className="text-lg" />}
          />
          <OrderInfo order={JSON.parse(JSON.stringify(mainOrder))} />
        </div>
      </div>
    </ProfileLayout>
  );
}
