export type Schema = {
  _rev: string;
  _type: string;
  _id: string;
  _updatedAt: string;
  _createdAt: string;
};

export type UserT = {
  id: string;
  name: string;
  description: string;
  email: string;
  image: string;
  posts: string[];
  likes: string[];
  saves: string[];
  followers: string[];
  followings: string[];
};

export type PostT = {
  id: string;
  writer: string;
  imageUrl: string;
  likesId: string;
  commentsId: string;
};

export type LikeT = {
  _key: string;
  _type: string;
  email: string;
};

export type CommentT = {
  _key: string;
  _type: string;
  writer: string;
  content: string;
  time: string;
};
