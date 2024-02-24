import { client } from "@/service/sanity";
import { getUserByEmail, getUserByName } from "@/service/user";
import { Schema, UserT } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FollowingBtn from "./FollowingBtn";

type Props = {
  pageUser: UserT & Schema;
  email: string | undefined;
};

export default async function UserDetail({ pageUser, email }: Props) {
  const current = pageUser.email === email;

  return (
    <section className="flex flex-row justify-center gap-8 py-10 shadow-sm items-center">
      <Image src={pageUser.image} width={110} priority height={110} alt={pageUser.name} className="rounded-full" />
      <div className="flex flex-col gap-2">
        <div className="flex gap-6">
          <h2 className="text-lg">{pageUser.name}</h2>
          {!current && <FollowingBtn pageUser={pageUser} email={email} />}
        </div>
        <div className="flex gap-4">
          <span className="flex gap-1">
            <p className="font-bold">{pageUser.posts ? pageUser.posts.length : "0"}</p>Posts
          </span>
          <span className="flex gap-1">
            <p className="font-bold">{pageUser.followers ? pageUser.followers.length : "0"}</p>Followers
          </span>
          <span className="flex gap-1">
            <p className="font-bold">{pageUser.followings ? pageUser.followings.length : "0"}</p>Following
          </span>
        </div>
        <h2 className="font-bold">{pageUser.description}</h2>
      </div>
    </section>
  );
}
