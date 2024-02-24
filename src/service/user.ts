import { AdapterUser } from "next-auth/adapters";
import { client } from "./sanity";
import { Schema, UserT } from "@/types";
import { User, getServerSession } from "next-auth";
import { cache } from "react";
import { authOptions } from "./auth";
import { useSession } from "next-auth/react";

export const setUser = async ({ id, name, email, image }: User | AdapterUser) => {
  const user: (UserT & Schema)[] = await client.fetch(`*[_type == 'user' && id == '${id}']`);

  if (user[0]) {
    return;
  }

  const newUser: UserT = {
    id,
    name: email?.split("@")[0]!,
    description: name!,
    email: email!,
    image: image!,
    posts: [],
    likes: [],
    saves: [],
    followers: [],
    followings: [],
  };

  const create = client.create({
    ...newUser,
    _type: "user",
  });
  return create;
};

export const getUserByEmail = cache(async (email: string): Promise<UserT & Schema> => {
  const data = await fetch(`/api/user/${email}`);
  const user = (await data.json()) as UserT & Schema;
  if (!user.likes) {
    user.likes = [];
  }
  if (!user.saves) {
    user.saves = [];
  }
  return user;
});

export const getUserByName = cache(async (name: string): Promise<UserT & Schema> => {
  const res = await fetch(`/api/user/${name}`, { method: "get" });
  const user = (await res.json()) as UserT & Schema;
  if (!user.likes) {
    user.likes = [];
  }
  if (!user.saves) {
    user.saves = [];
  }
  return user;
});

export const getUserInfo = cache(async () => {
  return await getServerSession(authOptions).then((session) => {
    if (session?.user) {
      if (session.user.name && session.user.email && session.user.image) {
        const user = {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        };
        return user;
      } else {
        return;
      }
    } else {
      return;
    }
  });
});

export const getFollowings = async (email: string) => {
  const user = await client.fetch(`*[ _type == 'user' && email == '${email}' ]`);
  if (user[0].followings === undefined) {
    return [];
  }
  return user[0].followings;
};

export const updateUserPosts = async (postId: string, email: string, type: "likes" | "saves" | "posts") => {
  const user = await getUserByEmail(email);

  switch (type) {
    case "likes":
      const likes = [...user.likes];
      if (likes.includes(postId)) {
        for (let i = 0; i < likes.length; i++) {
          if (likes[i] === postId) {
            likes.splice(i, 1);
            i--;
          }
        }
        return client.patch(user._id).setIfMissing({ likes: [] }).set({ likes }).commit();
      } else {
        return client
          .patch(user._id)
          .set({ likes: [...likes, postId] })
          .commit();
      }
    case "saves":
      const saves = [...user.saves];
      if (saves.includes(postId)) {
        for (let i = 0; i < saves.length; i++) {
          if (saves[i] === postId) {
            saves.splice(i, 1);
            i--;
          }
        }
        return client.patch(user._id).setIfMissing({ saves: [] }).set({ saves }).commit();
      } else {
        return client
          .patch(user._id)
          .set({ saves: [...saves, postId] })
          .commit();
      }
    case "posts":
      const posts = [...user.posts];
      if (posts.includes(postId)) {
        for (let i = 0; i < posts.length; i++) {
          if (posts[i] === postId) {
            posts.splice(i, 1);
            i--;
          }
        }
        return client.patch(user._id).setIfMissing({ posts: [] }).set({ posts }).commit();
      } else {
        return client
          .patch(user._id)
          .set({ posts: [...posts, postId] })
          .commit();
      }
  }
};

export const getUsersByEmails = async (emails: string[]) => {
  if (emails === undefined) {
    return;
  }
  const query = emails.map((email) => `"${email}"`);
  const items = (await client.fetch(`*[ _type =='user' && email in [${query}]]`)) as (UserT & Schema)[];
  return items;
};

export const getUserClientApi = async (key: string) => {
  if (key.includes("@")) {
    const user = (await client.fetch(`*[_type == 'user' && email == '${key}' ]`))[0] as (UserT & Schema) | undefined;
    return cleanUser(user);
  } else {
    const user = (await client.fetch(`*[_type == 'user' && name == '${key}' ]`))[0] as (UserT & Schema) | undefined;
    return cleanUser(user);
  }
};

export const cleanUser = (_user: (UserT & Schema) | undefined) => {
  if (!_user) {
    return _user;
  }
  const user = _user;
  if (user.saves === undefined) {
    user.saves = [];
  }
  if (user.likes === undefined) {
    user.likes = [];
  }
  if (user.posts === undefined) {
    user.posts = [];
  }
  if (user.followers === undefined) {
    user.followers = [];
  }
  if (user.followings === undefined) {
    user.followings = [];
  }
  return user;
};
