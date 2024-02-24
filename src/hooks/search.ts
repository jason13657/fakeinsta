import { Schema, UserT } from "@/types";
import { useState } from "react";
import useSWR from "swr";

export const useUserSearch = () => {
  const [key, setKey] = useState<string>("");
  const { data, error, isLoading, mutate } = useSWR(`/api/search/${key}`, async (url: string) => {
    if (key === "") {
      return fetch(`/api/search/*`).then((res) => res.json());
    }
    return fetch(url).then((res) => res.json());
  });
  const users: (UserT & Schema)[] | undefined = data;

  const search = (key: string) => {
    setKey(key);
  };

  return { users, error, isLoading, search };
};
