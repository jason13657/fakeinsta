import PostsGrid from "@/components/PostsGrid";
import UserDetail from "@/components/UserDetail";
import { client } from "@/service/sanity";
import { getUserClientApi, getUserInfo } from "@/service/user";
import { Schema, UserT } from "@/types";
import React from "react";

type Props = {
  params: { slug: string };
};

export default async function UserPage({ params }: Props) {
  const signedUser = await getUserInfo();
  const pageUser = await getUserClientApi(params.slug);

  return (
    <section className="flex flex-col justify-center grow">
      {pageUser ? (
        <>
          <UserDetail pageUser={pageUser} email={signedUser?.email} />
          <div className="border-t-[1px] border-gray-200" />
          <PostsGrid pageUser={pageUser} email={signedUser?.email} />
        </>
      ) : (
        <div className="flex grow justify-center items-center">
          <h2 className="text-2xl text-gray-600">no user found</h2>
        </div>
      )}
    </section>
  );
}
