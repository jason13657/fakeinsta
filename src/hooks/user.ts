import { Schema, UserT } from "@/types";
import useSWR from "swr";

export const useUser = (email: string) => {
  const { data, error, isLoading } = useSWR(`/api/user/${email}`, (url: string) => fetch(url).then((res) => res.json()));
  const user: (UserT & Schema) | undefined = data;

  return { user, error, isLoading };
};
