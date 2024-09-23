import React from "react";
import connectToDB from "@/configs/db";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import MiniTopbar from "@/components/modules/profile/MiniTopbar";
import ticketModel from "@/models/Ticket";
import AnswerCard from "@/components/templates/profile/AnswerCard";
import NoAnswerCard from "@/components/templates/profile/NoAnswerCard";
import { HiOutlineTicket } from "react-icons/hi2";

export default async function page({ params }) {
  connectToDB();
  const ticketID = params.id;
  const ticket = await ticketModel
    .findOne({ _id: ticketID })
    .populate("user")
    .lean();
  const answerTicket = await ticketModel
    .findOne({ mainTicket: ticket._id })
    .lean();
  return (
    <ProfileLayout>
      <div className="container">
        <div className="flex-center">
          <MiniTopbar
            title="Your Answer"
            btn="Tickets"
            link="/profile/tickets"
            icon={<HiOutlineTicket className="text-lg" />}
          />
        </div>
        <div className="flex-center flex-wrap gap-5 p-4 md:pt-8">
          <div className="container">
            <AnswerCard type="user" {...ticket} />
            {answerTicket ? (
              <AnswerCard type="admin" {...answerTicket} />
            ) : (
              <NoAnswerCard />
            )}
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
