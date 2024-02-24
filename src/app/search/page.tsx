"use client";

import SearchBar from "@/components/SearchBar";
import SearchedLists from "@/components/SearchedLists";
import { useUserSearch } from "@/hooks/search";
import { client } from "@/service/sanity";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function SearchPage() {
  const { users, error, isLoading, search } = useUserSearch();

  const keyChange = (key: string) => {
    search(key);
  };

  return (
    <section className="flex flex-col w-2/3 mx-auto grow">
      <SearchBar keyChange={keyChange} />
      {isLoading && !users && (
        <div className="flex justify-center items-center grow">
          <ClipLoader />
        </div>
      )}
      {users && <SearchedLists users={users} />}
    </section>
  );
}
