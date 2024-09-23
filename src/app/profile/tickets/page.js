import React from "react";
import connectToDB from "@/configs/db";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import { authUser } from "@/utils/authentication/serverHelpers";
import ticketModel from "@/models/Ticket";
import MiniTopbar from "@/components/modules/profile/MiniTopbar";
import { HiOutlineTicket } from "react-icons/hi2";
import TicketsContainer from "@/components/templates/profile/TicketsContainer";

export default async function page() {
  connectToDB();
  const user = await authUser();
  const tickets = await ticketModel
    .find({ user: user?._id, isAnswer: false })
    .populate("department", "title")
    .sort({ _id: -1 })
    .lean();
  return (
    <ProfileLayout>
      <div className="container">
        <div className="flex-center">
          <MiniTopbar
            title="Your Tickets"
            btn="Send"
            link="/profile/tickets/send-ticket"
            icon={<HiOutlineTicket className="text-lg" />}
          />
        </div>
        <div className="flex-center flex-wrap gap-5 p-4 md:pt-8">
          <TicketsContainer tickets={JSON.parse(JSON.stringify(tickets))} />
        </div>
      </div>
    </ProfileLayout>
  );
}
