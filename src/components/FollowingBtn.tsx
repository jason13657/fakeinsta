"use client";

import { follow, unFollow } from "@/service/follow";
import { Schema, UserT } from "@/types";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";

type Props = {
  pageUser: UserT & Schema;
  email: string | undefined;
};

export default function FollowingBtn({ pageUser, email }: Props) {
  const [isFollowing, setIsFollowing] = useState<boolean>(email ? pageUser.followers.includes(email) : false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!email) {
    return <></>;
  }

  const handlePressed = () => {
    setIsLoading(true);
    if (!isFollowing) {
      follow(pageUser.email, email).then(() => {
        setIsLoading(false);
        setIsFollowing(true);
        return;
      });
    } else {
      unFollow(pageUser.email, email).then(() => {
        setIsLoading(false);
        setIsFollowing(false);
        return;
      });
    }
  };

  return (
    <>
      {isFollowing ? (
        <button
          className="px-3 py-1 rounded-md border-gray-400  border-2 items-center"
          onClick={() => {
            handlePressed();
          }}
        >
          {isLoading ? <BeatLoader size={10} color="#adb5bd" /> : <>Unfollow</>}
        </button>
      ) : (
        <button
          className="px-3 py-1 rounded-md border-sky-400 border-2"
          onClick={() => {
            handlePressed();
          }}
        >
          {isLoading ? <BeatLoader size={10} color="#adb5bd" /> : <>Follow</>}
        </button>
      )}
    </>
  );
}
