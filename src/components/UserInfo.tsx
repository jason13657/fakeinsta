import { getUserInfo } from "@/service/user";
import Image from "next/image";
import React from "react";

export default async function UserInfo() {
  const user = await getUserInfo();

  return (
    <>
      {user ? (
        <section className="flex flex-col w-1/5 py-7 px-4">
          <div className="flex items-center gap-4">
            <Image src={user?.image!} width={54} height={54} alt={user?.name!} className="rounded-full" />
            <div>
              <p className="font-bold">{user?.email?.split("@")[0]}</p>
              <p className="text-gray-600">{user?.name}</p>
            </div>
          </div>
          <p className="mt-9 text-sm text-gray-600">About · Help · Press · Api · Jobs · Privacy · Terms · Location · Language</p>
          <p className="mt-9 text-sm font-bold text-gray-600">
            @Copyright FakeInsta
            <br />
            @Jason
          </p>
        </section>
      ) : (
        <></>
      )}
    </>
  );
}
