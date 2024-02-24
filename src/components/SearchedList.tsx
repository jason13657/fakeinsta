import { Schema, UserT } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  user: UserT & Schema;
};

export default function SearchedList({ user }: Props) {
  return (
    <Link href={`/user/${user.email.split("@")[0]}`}>
      <li className="bg-white border-[1px] border-gray-400 p-3 rounded-sm flex gap-4 items-center">
        <div>
          <Image src={user.image} width={60} height={60} alt={user.name} className="rounded-full" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-bold text-lg">{user.name}</h2>
          <p className="text-gray-500">{user.description}</p>
          <p className="text-gray-500">
            {user.followers.length} followers {user.followings.length} followings
          </p>
        </div>
      </li>
    </Link>
  );
}
