import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <section className="py-3 mx-auto w-full bg-white border-b-[1px] border-neutral-200 shadow-sm">
      <div className="flex flex- row justify-between items-center max-w-screen-lg mx-auto">
        <Link href="/">
          <h1 className="text-3xl font-bold">FakeInsta</h1>
        </Link>
        <Navbar />
      </div>
    </section>
  );
}
