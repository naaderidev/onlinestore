import React from "react";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import MiniTopbar from "@/components/modules/profile/MiniTopbar";
import connectToDB from "@/configs/db";
import wishlistModel from "@/models/Wishlist";
import WishlistContainer from "@/components/templates/profile/WishlistContainer";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { authUser } from "@/utils/authentication/serverHelpers";

export default async function page() {
  connectToDB();
  const user = await authUser();
  const wishlist = await wishlistModel
    .find({ userId: user?._id })
    .populate("productId", "_id title discount variants")
    .lean();
  return (
    <ProfileLayout>
      <div className="container">
        <div className="flex-center">
          <MiniTopbar
            title="Wishlist"
            btn="Market"
            link="/market"
            icon={<HiOutlineBuildingStorefront className="text-lg" />}
          />
        </div>
        <div className="flex-center flex-wrap gap-5 p-4 md:pt-8">
          <WishlistContainer wishlist={JSON.parse(JSON.stringify(wishlist))} />
        </div>
      </div>
    </ProfileLayout>
  );
}
