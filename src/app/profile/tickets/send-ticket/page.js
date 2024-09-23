import React from "react";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import MiniTopbar from "@/components/modules/profile/MiniTopbar";
import { HiOutlineTicket } from "react-icons/hi2";
import SendTicket from "@/components/templates/profile/SendTicket";

export default function page() {
  return (
    <ProfileLayout>
      <div className="container">
        <div className="flex-center">
          <MiniTopbar
            title="Send Ticket"
            btn="Tickets"
            link="/profile/tickets"
            icon={<HiOutlineTicket className="text-lg" />}
          />
        </div>
        <div className="flex-center flex-wrap gap-5 p-4 md:pt-8">
          <SendTicket />
        </div>
      </div>
    </ProfileLayout>
  );
}
