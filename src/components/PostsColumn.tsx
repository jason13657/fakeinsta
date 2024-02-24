"use client";

import React, { use, useEffect, useState } from "react";
import Post from "./Post";
import { useFollowingPosts } from "@/hooks/post";
import { getUserByEmail } from "@/service/user";
import { getFollowingPosts } from "@/service/post";
import { Schema, UserT } from "@/types";
import { GridLoader } from "react-spinners";

type Props = {
  email: string;
};

export default function PostsColumn({ email }: Props) {
  const { posts, error, isLoading } = useFollowingPosts(email);

  return (
    <section className="flex flex-col justify-start grow">
      {isLoading && (
        <div className="flex grow justify-center items-center">
          <GridLoader color="#ffbe0b" />
        </div>
      )}
      {posts.map((post) => {
        return <Post post={post} key={post.id} email={email} />;
      })}
    </section>
  );
}
