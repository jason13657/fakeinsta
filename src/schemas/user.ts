const user = {
  name: "user",
  type: "document",
  title: "User",
  fields: [
    {
      name: "id",
      type: "string",
      title: "Id",
    },
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "description",
      type: "string",
      title: "Description",
    },
    {
      name: "email",
      type: "string",
      title: "Email",
    },
    {
      name: "image",
      type: "string",
      title: "Image",
    },
    {
      name: "posts",
      title: "Posts",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "likes",
      title: "Likes",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "saves",
      title: "Saves",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "followers",
      title: "Followers",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "followings",
      title: "Followings",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};

export default user;
