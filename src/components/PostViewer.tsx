import Image from "next/image";
import React, { useState } from "react";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Avatar from "./Avatar";
import { CommentT, LikeT, PostT, Schema, UserT } from "@/types";
import Comments from "./Comments";
import { format } from "timeago.js";

type Porps = {
  user: (UserT & Schema) | undefined;
  post: PostT & Schema;
  handleLikeBtn: () => void;
  handleSaveBtn: () => void;
  handlePostComment: () => void;
  isLikeLoading: boolean;
  isSaveLoading: boolean;
  isCommentLoading: boolean;
  like: LikeT | undefined;
  isSaving: boolean;
  comments: CommentT[] | undefined;
  count: number;
  closePostViewer: () => void;
  setComment: (value: string) => void;
  comment: string;
};

export default function PostViewer({
  user,
  post,
  isSaving,
  like,
  handleLikeBtn,
  handleSaveBtn,
  isLikeLoading,
  isSaveLoading,
  isCommentLoading,
  comments,
  handlePostComment,
  closePostViewer,
  comment,
  count,
  setComment,
}: Porps) {
  return (
    <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center  z-20">
      <div
        className="absolute top-0 left-0 w-[100vw] h-[100vh] z-30 bg-black opacity-50"
        onClick={() => {
          closePostViewer();
        }}
      />
      <article id="article" className="flex w-[70vw] flex-row bg-white shadow-lg my-2 mx-auto border-gray-200   z-40">
        <div className="w-3/5 relative after:block  bg-slate-700 after:pb-[100%]">
          <Image
            priority
            src={post.imageUrl}
            width={0}
            height={0}
            alt={post.id}
            className="w-full h-full absolute object-cover"
            sizes="100vh"
          />
        </div>
        <div className="flex flex-col w-2/5">
          <div className="flex flex-col grow">
            <div className="p-3 border-[1px]">{user && <Avatar showName={true} size={35} user={user} />}</div>
            <div className="flex flex-col grow p-3 gap-1">
              {comments && <Comments comments={comments} showFirst={false} showIcon={true} />}
              <div className="flex flex-row justify-between">
                <button
                  onClick={() => {
                    handleLikeBtn();
                  }}
                >
                  {isLikeLoading ? (
                    <ClipLoader size={22} color="#dee2e6" className="m-0" />
                  ) : (
                    <>{like ? <FaHeart size={22} color="red" /> : <FaRegHeart size={22} />}</>
                  )}
                </button>
                <button
                  onClick={() => {
                    handleSaveBtn();
                  }}
                >
                  {isSaveLoading ? (
                    <ClipLoader size={20} color="#dee2e6" />
                  ) : (
                    <>{isSaving ? <FaBookmark size={22} /> : <FaRegBookmark size={22} />}</>
                  )}
                </button>
              </div>
              <p className="font-bold text-sm">{count > 1 ? `${count} Likes` : `${count} Like`}</p>
              <p className="text-sm text-gray-500">{format(post._createdAt)}</p>
            </div>
          </div>
          <div className="flex border-t-[1px] border-gray-200 p-2">
            <input
              onChange={(e) => {
                setComment(e.target.value);
              }}
              className="grow outline-none"
              type="text"
              placeholder="Add a comment"
              value={comment}
            />
            <button
              onClick={() => {
                handlePostComment();
              }}
            >
              {comment !== "" ? (
                <>{isCommentLoading ? <ClipLoader size={20} color="#dee2e6" /> : <p className="text-sm font-bold text-sky-400">Post</p>}</>
              ) : (
                <>
                  <p className="text-sm font-bold text-sky-400 opacity-60">Post</p>
                </>
              )}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
