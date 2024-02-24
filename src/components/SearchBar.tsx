import React, { useEffect, useState } from "react";

type Props = {
  keyChange: (key: string) => void;
};

export default function SearchBar({ keyChange }: Props) {
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    keyChange(key);
  }, [key, keyChange]);

  return (
    <input
      className="border-gray-400 border-[1px] rounded-sm outline-none shadow-sm p-2 my-2 "
      value={key}
      onChange={(e) => {
        setKey(e.target.value);
      }}
      placeholder="Search for users "
    />
  );
}
