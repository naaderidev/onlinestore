import React from "react";
import Link from "next/link";

export default function EmptyComments({ isLogin }) {
  return (
    <div className="px-2 mb-4 text-teal">
      <p className="flex-center subtitle p-2">
        No reviews have been recorded for this product yet...
      </p>
      <p className="flex-center text-xs p-2">
        Be the first to submit a review for this product.
      </p>
      {!isLogin && (
        <Link
          className="text-sm font-semibold flex-center py-4 hover:text-tint"
          href="/login-register"
        >
          Login | Register
        </Link>
      )}
    </div>
  );
}
