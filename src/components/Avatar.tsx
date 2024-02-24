import { Schema, UserT } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  showName: boolean;
  size: number;
  user: {
    image: string;
    email: string;
  };
  border?: boolean;
};

export default function Avatar({ showName, size, user: { image, email }, border }: Props) {
  return (
    <div className="flex gap-2 items-center">
      {border ? (
        <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] rounded-full">
          <div className="border-2 border-white rounded-full">
            <Link href={`/user/${email.split("@")[0]}`}>
              <Image src={image} width={size} height={size} alt={email} className="rounded-full" />
            </Link>
          </div>
        </div>
      ) : (
        <Link href={`/user/${email.split("@")[0]}`}>
          <Image src={image} width={size} height={size} alt={email} className="rounded-full" />
        </Link>
      )}
      {showName === true && <p className="font-bold">{email.split("@")[0]}</p>}
    </div>
  );
}
