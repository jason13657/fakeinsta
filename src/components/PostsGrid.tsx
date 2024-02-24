"use client";

import React, { useEffect, useState } from "react";
import Selector from "./Selector";
import { PostT, Schema, UserT } from "@/types";
import { getPostByIds } from "@/service/post";
import Post from "./Post";
import { GridLoader } from "react-spinners";

type Props = {
  pageUser: UserT & Schema;
  email: string | undefined;
};

export default function PostsGrid({ pageUser, email }: Props) {
  const [selected, setSelected] = useState<"posts" | "saved" | "liked">("posts");
  const [isLoading, setIsLoasing] = useState<boolean>(false);
  const [posts, setPosts] = useState<(PostT & Schema)[]>([]);

  const handleSelect = (type: "posts" | "saved" | "liked") => {
    setSelected(type);
  };

  useEffect(() => {
    setIsLoasing(true);

    if (selected === "posts") {
      if (!pageUser.posts) {
        setIsLoasing(false);
        return;
      }
      getPostByIds(pageUser.posts).then((post) => {
        setPosts(post);
        setIsLoasing(false);
      });
      return;
    }
    if (selected === "saved") {
      if (!pageUser.saves) {
        setIsLoasing(false);
        return;
      }
      getPostByIds(pageUser.saves).then((post) => {
        setPosts(post);
        setIsLoasing(false);
      });
      return;
    }
    if (selected === "liked") {
      if (!pageUser.likes) {
        setIsLoasing(false);
        return;
      }
      getPostByIds(pageUser.likes).then((post) => {
        setPosts(post);
        setIsLoasing(false);
      });
      return;
    }
  }, [selected, pageUser.likes, pageUser.posts, pageUser.saves]);

  return (
    <section className="flex flex-col grow ">
      <Selector handleSelect={handleSelect} selected={selected} />
      {isLoading ? (
        <div className="flex grow justify-center items-center">
          <GridLoader />
        </div>
      ) : (
        <>
          {posts[0] ? (
            <div className="grid grid-cols-3 grid-flow-row gap-4 py-5">
              {posts.map((post) => {
                return <Post post={post} key={post.id} email={email} grid={true} />;
              })}
            </div>
          ) : (
            <div className="flex grow justify-center items-center">
              <p className="text-gray-600">no contents</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
