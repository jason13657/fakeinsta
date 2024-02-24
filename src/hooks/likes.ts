import { LikeT } from "@/types";
import { useEffect, useState } from "react";
import useSWR from "swr";

export function useLikes(postId: string, userEmail: string | undefined) {
  const { data, error, mutate } = useSWR<LikeT[]>(`/api/likes/${postId}`, async (url: string) => {
    if (!userEmail) {
      return;
    }
    return fetch(url).then((res) => res.json());
  });

  const [count, setCount] = useState<number>(0);
  const [like, setLike] = useState<LikeT>();

  useEffect(() => {
    if (data) {
      setCount(data.length);
      setLike(undefined);
      data.forEach((like) => {
        if (like.email === userEmail) {
          setLike(like);
          return;
        }
      });
    }
  }, [data, userEmail]);

  return {
    like,
    count,
    likeMutate: mutate,
  };
}
