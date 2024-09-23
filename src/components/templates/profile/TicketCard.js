import React from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  HiCursorArrowRays,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

export default function TicketCard({
  _id,
  title,
  department,
  hasAnswer,
  createdAt,
}) {
  return (
    <Link href={`/profile/tickets/answer/${_id}`}>
      <div className="user-panel-card">
        <div className="flex items-center gap-2">
          <HiCursorArrowRays className="icon text-tint" />
          <h3 className="text-sm text-teal">{title}</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-teal">
          <span className="hidden lg:inline-flex">
            {new Date(createdAt).toLocaleDateString("en-US")}
          </span>
          <span className="hidden lg:inline-flex">
            {new Date(createdAt).toLocaleTimeString("en-US")}
          </span>
          <span className="badge hidden md:inline-flex bg-tint">
            {department.title}
          </span>
          <div
            className={clsx("badge flex-center gap-2", {
              "bg-tint": hasAnswer === true,
              "bg-amber-600": hasAnswer === false,
            })}
          >
            <span className="hidden md:inline-flex">
              {hasAnswer ? "َAnswered" : "Under Review"}
            </span>
            {hasAnswer ? (
              <HiOutlineCheckCircle className="text-base" />
            ) : (
              <HiOutlineClock className="text-base" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
