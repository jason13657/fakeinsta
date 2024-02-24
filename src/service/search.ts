import { Schema, UserT } from "@/types";
import { client } from "./sanity";

export const searchUser = async (key: string) => {
  if (key === "*") {
    const users = (await client.fetch(`*[_type == 'user']`)) as (UserT & Schema)[];

    return users;
  }

  const users = (await client.fetch(`*[_type == 'user' && name match '${key}*' || description match '${key}*']`)) as (UserT & Schema)[];

  return users;
};
