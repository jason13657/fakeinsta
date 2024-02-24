import { client } from "@/service/sanity";
import { getUserClientApi } from "@/service/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { key: string } }) {
  const key = params.key[0];

  const user = await getUserClientApi(key);
  return NextResponse.json(user);
}
