import { getFollowingPosts, getLikes } from "@/service/post";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: { postId: string } }) {
  const postId = params.postId[0];
  const likes = await getLikes(postId);
  return NextResponse.json(likes);
}
