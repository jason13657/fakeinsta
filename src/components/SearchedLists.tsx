import { Schema, UserT } from "@/types";
import React from "react";
import SearchedList from "./SearchedList";
import { cleanUser } from "@/service/user";

type Props = {
  users: (UserT & Schema)[];
};

export default function SearchedLists({ users }: Props) {
  return (
    <ul className="flex flex-col gap-3">
      {users.map((user) => {
        return <SearchedList user={cleanUser(user) as UserT & Schema} key={user.id} />;
      })}
    </ul>
  );
}
