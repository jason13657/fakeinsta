import React from "react";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { GoHeart } from "react-icons/go";

type Props = {
  handleSelect: (type: "posts" | "saved" | "liked") => void;
  selected: "posts" | "saved" | "liked";
};

export default function Selector({ handleSelect, selected }: Props) {
  return (
    <div className="flex justify-center gap-14">
      <button
        className={`flex items-center py-3 border-t-[1px] w-[80px] justify-center ${
          selected === "posts" ? "border-gray-700" : "border-transparent text-gray-500"
        }`}
        onClick={() => {
          handleSelect("posts");
        }}
      >
        <BsGrid3X3Gap size={12} />
        <p className={`${selected === "posts" ? "font-semibold" : ""}`}>POSTS</p>
      </button>
      <button
        className={`flex items-center py-3 border-t-[1px] w-[80px] justify-center ${
          selected === "saved" ? "border-gray-700" : "border-transparent text-gray-500"
        }`}
        onClick={() => {
          handleSelect("saved");
        }}
      >
        <FaRegBookmark size={12} />
        <p className={`${selected === "saved" ? "font-semibold" : ""}`}>SAVED</p>
      </button>
      <button
        className={`flex items-center py-3 border-t-[1px] w-[80px] justify-center ${
          selected === "liked" ? "border-gray-700" : "border-transparent text-gray-500"
        }`}
        onClick={() => {
          handleSelect("liked");
        }}
      >
        <GoHeart size={12} />
        <p className={`${selected === "liked" ? "font-semibold" : ""}`}>LIKED</p>
      </button>
    </div>
  );
}
