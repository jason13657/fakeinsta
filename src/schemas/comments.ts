const comments = {
  name: "comments",
  type: "document",
  title: "Comments",
  fields: [
    {
      name: "postId",
      title: "Post Id",
      type: "string",
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [
        {
          name: "comment",
          title: "Comment",
          type: "object",
          fields: [
            {
              name: "writer",
              type: "string",
              title: "Writer",
            },
            {
              name: "content",
              type: "string",
              title: "Content",
            },
            {
              name: "time",
              type: "string",
              title: "Time",
            },
          ],
        },
      ],
    },
  ],
};

export default comments;
