import { getFollowingPosts } from "@/service/post";
import { client } from "@/service/sanity";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: { email: string } }) {
  const email = params.email[0];

  const posts = await getFollowingPosts(email);

  return NextResponse.json(posts);
}
