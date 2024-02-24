import { CommentT } from "@/types";
import { useEffect } from "react";
import { json } from "stream/consumers";
import useSWR from "swr";

export function useComments(id: string) {
  const { data, isLoading, error, mutate } = useSWR<CommentT[]>(`/api/comments/${id}`, (url: string) =>
    fetch(url).then((res) => res.json())
  );

  return { comments: data, commentsMutate: mutate };
}
