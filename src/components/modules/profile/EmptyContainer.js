import React from "react";

export default function EmptyContainer({ message }) {
  return (
    <div className="text-lg font-semibold text-center m-auto text-red">
      {message}
    </div>
  );
}
