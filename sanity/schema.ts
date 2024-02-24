import { type SchemaTypeDefinition } from "sanity";
import user from "../src/schemas/user";
import post from "../src/schemas/post";
import likes from "../src/schemas/likes";
import comments from "../src/schemas/comments";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, post, likes, comments],
};
