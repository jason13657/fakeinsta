const likes = {
  name: "likes",
  type: "document",
  title: "Likes",
  fields: [
    {
      name: "postId",
      title: "Post Id",
      type: "string",
    },
    {
      name: "likes",
      title: "Likes",
      type: "array",
      of: [
        {
          title: "Like",
          name: "like",
          type: "object",
          fields: [{ name: "email", type: "string", title: "Email" }],
        },
      ],
    },
  ],
};

export default likes;
