import { LikeT, PostT, Schema, UserT } from "@/types";
import { client } from "./sanity";
import { getFollowings, getUserByEmail } from "./user";
import { v4 as uuidv4 } from "uuid";

export async function publishPost(post: PostT) {
  return client.create({ _type: "likes", postId: post.id, likes: [] }).then(async (like) => {
    return client.create({ _type: "comments", postId: post.id, comments: [] }).then((comments) => {
      return client.create({ ...post, _type: "post", likesId: like._id, commentsId: comments._id });
    });
  });
}

export async function getPostsByWriter(writers: string[]) {
  const query = writers.map((writer) => `"${writer}"`);
  const items = (await client.fetch(`*[ _type =='post' && writer in [${query}]]`)) as (PostT & Schema)[];
  items.sort((a, b) => b._createdAt.localeCompare(a._createdAt));

  return items;
}

export async function getFollowingPosts(email: string) {
  const followers = await getFollowings(email);
  const posts = await getPostsByWriter([...followers, email]);
  return posts;
}

export async function getLikes(postId: string) {
  const data = (await client.fetch(`*[ _type == 'likes' && postId == '${postId}']`))[0];
  const likes = (data.likes ? data.likes : []) as LikeT[];
  return likes;
}

export async function updateLikes(likeId: string, email: string, like: LikeT | undefined) {
  if (!like) {
    return client
      .patch(likeId)
      .setIfMissing({ likes: [] })
      .prepend("likes", [{ email, _key: uuidv4(), _type: "like" }])
      .commit();
  } else {
    return client
      .patch(likeId)
      .unset([`likes[ _key == "${like._key}" ]`])
      .commit();
  }
}

export async function getPostByIds(ids: string[]) {
  const query = ids.map((ids) => `"${ids}"`);
  const items = (await client.fetch(`*[ _type =='post' && id in [${query}]]`)) as (PostT & Schema)[];
  items.sort((a, b) => b._createdAt.localeCompare(a._createdAt));

  return items;
}
