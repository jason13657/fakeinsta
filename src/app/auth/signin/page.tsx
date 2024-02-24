import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { headers } from "next/headers";
import GoogleSignIn from "@/components/GoogleSignIn";

export default async function SignIn() {
  return (
    <section className="flex flex-col justify-center items-center h-full">
      <GoogleSignIn />
    </section>
  );
}
