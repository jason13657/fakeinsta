import Followings from "@/components/Followings";
import PostsColumn from "@/components/PostsColumn";
import UserInfo from "@/components/UserInfo";
import { getUserInfo } from "@/service/user";

export default async function Home() {
  const user = await getUserInfo();

  return (
    <section className="flex flex-row grow">
      <div className="w-1/5" />
      <div className="flex flex-col w-3/5 grow">
        {user && <Followings email={user?.email} />}
        {user && <PostsColumn email={user?.email} />}
      </div>
      <UserInfo />
    </section>
  );
}
