import { Schema, UserT } from "@/types";
import { client } from "./sanity";
import { cleanUser } from "./user";

export const follow = async (_following: string, _current: string) => {
  const following = cleanUser((await client.fetch(`*[_type == 'user' && email == '${_following}' ]`))[0]) as UserT & Schema;
  const current = cleanUser((await client.fetch(`*[_type == 'user' && email == '${_current}' ]`))[0]) as UserT & Schema;

  const followers = following.followers;
  followers.push(current.email);
  client.patch(following._id).set({ followers }).commit();

  const followings = current.followings;
  followings.push(following.email);
  client.patch(current._id).set({ followings }).commit();

  return;
};

export const unFollow = async (_following: string, _current: string) => {
  const following = cleanUser((await client.fetch(`*[_type == 'user' && email == '${_following}' ]`))[0]) as UserT & Schema;
  const current = cleanUser((await client.fetch(`*[_type == 'user' && email == '${_current}' ]`))[0]) as UserT & Schema;

  const followers = following.followers;
  for (let i = 0; i < followers.length; i++) {
    if (followers[i] === current.email) {
      followers.splice(i, 1);
      i--;
    }
  }
  client.patch(following._id).set({ followers }).commit();

  const followings = current.followings;
  for (let i = 0; i < followings.length; i++) {
    if (followings[i] === following.email) {
      followings.splice(i, 1);
      i--;
    }
  }
  client.patch(current._id).set({ followings }).commit();

  return;
};
