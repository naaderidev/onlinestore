"use client";
import React, { useState, useEffect } from "react";
import EmptyContainer from "@/components/modules/profile/EmptyContainer";
import Pagination from "@/components/modules/Pagination";
import OrderCard from "./OrderCard";

export default function OrdersContainer({ orders }) {
  const count = 3; // Define count for how many items to show per page
  const [shownOrders, setShownOrders] = useState(orders.slice(0, count));

  // Update the shownOrders when tickets change
  useEffect(() => {
    setShownOrders(orders.slice(0, count));
  }, [orders]);
  
  return (
    <div className="container">
      {orders.length === 0 ? (
        <EmptyContainer message="You haven't placed an order yet! Take a look at the store!" />
      ) : (
        <>
          {shownOrders.map((order) => (
            <OrderCard key={order._id} {...order} />
          ))}
          <Pagination
            items={orders}
            setShownItems={setShownOrders}
            count={count}
            type="cms"
          />
        </>
      )}
    </div>
  );
}
