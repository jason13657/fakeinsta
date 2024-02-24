import { getFollowingPosts } from "@/service/post";
import { PostT, Schema } from "@/types";
import useSWR from "swr";

export function useFollowingPosts(email: string) {
  const { data, error, isLoading } = useSWR(`/api/post/${email}`, (url: string) => fetch(url).then((res) => res.json()));

  const posts: (PostT & Schema)[] = data === undefined ? [] : data;

  return { posts, error, isLoading };
}
