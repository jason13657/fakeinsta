"use client";

import { getCsrfToken, getProviders, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function GoogleSignIn() {
  const handleSignin = () => {
    signIn("google", { callbackUrl: "/" }).then(console.log);
  };

  return (
    <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 rounded-md">
      <button
        className="flex px-4 py-2 bg-white"
        onClick={() => {
          handleSignin();
        }}
      >
        <p>Sign In with Google</p>
      </button>
    </div>
  );
}
