import React from "react";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import MiniTopbar from "@/components/modules/profile/MiniTopbar";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import UserAccount from "@/components/templates/profile/UserAccount";
import { authUser } from "@/utils/authentication/serverHelpers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function page() {
  const user = await authUser();
  return (
    <ProfileLayout>
      <div className="container">
        <div className="flex-center">
          <MiniTopbar
            title="Your Account"
            btn="Market"
            link="/market"
            icon={<HiOutlineBuildingStorefront className="text-lg" />}
          />
        </div>
        <div className="flex-center flex-wrap gap-5 p-4 md:pt-8">
          <UserAccount user={JSON.parse(JSON.stringify(user))} />
        </div>
      </div>
      <ToastContainer position="bottom-left" theme="dark" />
    </ProfileLayout>
  );
}
