import { client } from "@/service/sanity";
import { getUserByEmail, getUserClientApi, getUsersByEmails } from "@/service/user";
import { Schema, UserT } from "@/types";
import React from "react";
import Avatar from "./Avatar";

type Props = {
  email: string;
};

export default async function Followings({ email }: Props) {
  const user = await getUserClientApi(email);

  if (!user) {
    return <></>;
  }

  const followings = await getUsersByEmails(user.followings);

  if (followings === undefined) {
    return <></>;
  }

  return (
    <>
      {user.followings && user.followings.length > 0 ? (
        <section className="flex flex-col shadow-lg my-2 w-4/5 mx-auto border-gray-200 border-[1px] rounded-md overflow-hidden p-3 gap-3">
          {followings.map(async (following) => {
            const data = (await client.fetch(`*[_type == 'user' && email == '${following.email}' ]`))[0] as UserT & Schema;
            return <Avatar key={following.name} showName={false} size={55} user={{ email: data.email, image: data.image }} border={true} />;
          })}
        </section>
      ) : (
        <></>
      )}
    </>
  );
}
