import { getComments } from "@/service/comments";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id[0];

  const comments = await getComments(id);

  return NextResponse.json(comments);
}
