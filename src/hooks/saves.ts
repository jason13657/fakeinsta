import { Schema, UserT } from "@/types";
import { useEffect, useState } from "react";
import useSWR from "swr";

export function useSaves(postId: string, userEmail: string | undefined) {
  const { data, isLoading, error, mutate } = useSWR<UserT & Schema>(`/api/user/${userEmail}`, async (url: string) => {
    if (!userEmail) {
      return;
    }
    return fetch(url).then((res) => res.json());
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    setIsSaving(false);

    if (data?.saves) {
      const saves = data.saves;
      if (saves.includes(postId)) {
        setIsSaving(true);
      }
    }
  }, [data, postId]);

  return { isSaving, saveMutate: mutate };
}
