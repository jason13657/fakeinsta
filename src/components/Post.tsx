"use client";

import { useUser } from "@/hooks/user";
import { PostT, Schema, UserT } from "@/types";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Image from "next/image";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart, FaSearch } from "react-icons/fa";
import { format } from "timeago.js";
import { getLikes, updateLikes } from "@/service/post";
import { useLikes } from "@/hooks/likes";
import { ClipLoader } from "react-spinners";
import { updateUserPosts } from "@/service/user";
import { useSaves } from "@/hooks/saves";
import { addComment, getComments } from "@/service/comments";
import { useComments } from "@/hooks/comments";
import Comments from "./Comments";
import PostViewer from "./PostViewer";
import PostGrid from "./PostGrid";

type Props = {
  post: PostT & Schema;
  email: string | undefined;
  grid?: boolean;
};

export default function Post({ post, email, grid }: Props) {
  const { user } = useUser(post.writer);
  const { like, count, likeMutate } = useLikes(post.id, email);
  const { isSaving, saveMutate } = useSaves(post.id, email);
  const { comments, commentsMutate } = useComments(post.commentsId);

  const [isLikeLoading, setIsLikeLoading] = useState<boolean>(false);
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const [isCommentLoading, setIsCommentLoading] = useState<boolean>(false);

  const [isPostViewer, setIsPostViewer] = useState<boolean>(false);

  const [comment, setComment] = useState<string>("");

  const handleLikeBtn = () => {
    if (!email) {
      return;
    }

    if (isLikeLoading) {
      return;
    }
    setIsLikeLoading(true);
    updateLikes(post.likesId, email, like).then(() => {
      likeMutate()
        .then(() => {
          setIsLikeLoading(false);
        })
        .catch(() => {
          setIsLikeLoading(false);
        });
    });
    updateUserPosts(post.id, email, "likes");
  };

  const handleSaveBtn = () => {
    if (!email) {
      return;
    }

    if (isSaveLoading) {
      return;
    }
    setIsSaveLoading(true);
    updateUserPosts(post.id, email, "saves").then(() => {
      saveMutate().then(() => {
        setIsSaveLoading(false);
      });
    });
  };

  const handlePostComment = () => {
    if (!email) {
      return;
    }

    if (comment == "") {
      return;
    }
    setIsCommentLoading(true);
    addComment(post.commentsId, comment, email).then(() => {
      setIsCommentLoading(false);
      setComment("");
      commentsMutate();
    });
  };

  const openPostViewer = () => {
    setIsPostViewer(true);
  };

  const closePostViewer = () => {
    setIsPostViewer(false);
  };

  return (
    <>
      {grid ? (
        <PostGrid imageUrl={post.imageUrl} openPostViewer={openPostViewer} />
      ) : (
        <article className="flex flex-col shadow-lg my-2 w-4/5 mx-auto border-gray-200 border-[1px] rounded-md overflow-hidden">
          <div className="p-3">{user && <Avatar showName={true} size={35} user={user} />}</div>
          <button
            className="w-full relative after:block  bg-slate-700 after:pb-[100%]"
            onClick={() => {
              openPostViewer();
            }}
          >
            <Image
              priority
              src={post.imageUrl}
              width={0}
              height={0}
              alt={post.id}
              className="w-full h-full absolute object-cover"
              sizes="100vh"
            />
          </button>
          <div className="m-2 flex flex-col">
            <div className="flex flex-row justify-between ">
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
            {comments && <Comments comments={comments} showFirst={true} showIcon={false} openPostViewer={openPostViewer} />}
            <p className="text-sm text-gray-500">{format(post._createdAt)}</p>
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
        </article>
      )}
      {isPostViewer && (
        <PostViewer
          user={user}
          post={post}
          isSaving={isSaving}
          isCommentLoading={isCommentLoading}
          isLikeLoading={isLikeLoading}
          isSaveLoading={isSaveLoading}
          count={count}
          handleLikeBtn={handleLikeBtn}
          handlePostComment={handlePostComment}
          handleSaveBtn={handleSaveBtn}
          like={like}
          comments={comments}
          closePostViewer={closePostViewer}
          comment={comment}
          setComment={setComment}
        />
      )}
    </>
  );
}
