import { CommentT } from "@/types";
import { client } from "./sanity";
import { v4 as uuidv4 } from "uuid";

export const addComment = (commentsId: string, content: string, email: string) => {
  return client
    .patch(commentsId)
    .setIfMissing({ comments: [] })
    .prepend("comments", [{ writer: email, content, _key: uuidv4(), _type: "comment", time: new Date().toISOString() }])
    .commit();
};

export const getComments = async (commentsId: string) => {
  const data = await client.fetch(`*[_type == 'comments' && _id == '${commentsId}']`);
  const comments = data[0].comments as CommentT[];
  comments.sort((a, b) => a.time.localeCompare(b.time));

  return comments;
};
