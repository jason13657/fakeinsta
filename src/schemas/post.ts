const post = {
  name: "post",
  type: "document",
  title: "Post",
  fields: [
    {
      name: "id",
      type: "string",
      title: "Id",
    },
    {
      name: "writer",
      type: "string",
      title: "Writer",
    },
    {
      name: "likesId",
      type: "string",
      title: "Likes Id",
    },
    {
      name: "commentsId",
      type: "string",
      title: "Comments Id",
    },
    {
      name: "imageUrl",
      title: "Image URL",
      type: "url",
    },
  ],
};

export default post;
