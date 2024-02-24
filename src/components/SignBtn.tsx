"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function SignBtn() {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <button
          onClick={() => {
            signOut();
          }}
          className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 rounded-md"
        >
          <p className="bg-white px-2 py-1">Sign Out</p>
        </button>
      ) : (
        <Link className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 rounded-md" href="/auth/signin">
          <p className="bg-white px-2 py-1">Sign In</p>
        </Link>
      )}
    </>
  );
}
