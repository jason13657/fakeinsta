import { searchUser } from "@/service/search";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { key: string } }) {
  const key = params.key[0];

  const users = await searchUser(key);
  return NextResponse.json(users);
}
