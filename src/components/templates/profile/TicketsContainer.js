"use client";
import React, { useState, useEffect } from "react";
import EmptyContainer from "@/components/modules/profile/EmptyContainer";
import TicketCard from "./TicketCard";
import Pagination from "@/components/modules/Pagination";

export default function TicketsContainer({ tickets }) {
  const count = 3; // Define count for how many items to show per page  
  const [shownTickets, setShownTickets] = useState(tickets.slice(0, count));  

  // Update the shownTickets when tickets change  
  useEffect(() => {  
    setShownTickets(tickets.slice(0, count));  
  }, [tickets]); 

  return (
    <div className="container">
      {tickets.length === 0 ? (
        <EmptyContainer message="You haven't send any ticket yet. Feel free to ask question!" />
      ) : (
        <>
          {shownTickets.map((ticket) => {
            return <TicketCard key={ticket._id} {...ticket} />;
          })}
          <Pagination
            items={tickets}
            setShownItems={setShownTickets}
            count={count}
            type="cms"
          />
        </>
      )}
    </div>
  );
}
