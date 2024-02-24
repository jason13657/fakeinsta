import AddForm from "@/components/AddForm";
import Avatar from "@/components/Avatar";
import { getUserInfo } from "@/service/user";
import React from "react";

export default async function NewPage() {
  const user = await getUserInfo();

  return (
    <section className="flex flex-col items-center my-7">
      {user ? <Avatar showName={true} size={34} user={user} /> : <></>}
      <AddForm />
    </section>
  );
}
