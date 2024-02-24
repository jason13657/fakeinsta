import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FiHome, FiPlusSquare, FiSearch } from "react-icons/fi";
import Avatar from "./Avatar";
import SignBtn from "./SignBtn";
import { getUserInfo } from "@/service/user";

export default async function Navbar() {
  const user = await getUserInfo();
  return (
    <nav className="flex flex-row gap-5 items-center">
      <Link href={"/"}>
        <FiHome className="text-2xl" />
      </Link>
      <Link href={"/search"}>
        <FiSearch className="text-2xl" />
      </Link>
      <Link href={"/new"}>
        <FiPlusSquare className="text-2xl" />
      </Link>
      {user ? <Avatar showName={false} size={27} user={user} /> : <></>}
      <SignBtn />
    </nav>
  );
}
