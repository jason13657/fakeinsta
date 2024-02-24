import { CommentT } from "@/types";
import React, { useState } from "react";
import Comment from "./Comment";
import { ClipLoader } from "react-spinners";

type Props = {
  comments: CommentT[];
  showFirst: boolean;
  showIcon: boolean;
  openPostViewer?: () => void;
};

export default function Comments({ comments, showIcon, showFirst, openPostViewer }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const end = () => {
    setIsLoading(false);
  };

  return (
    <section className="flex flex-col grow gap-2">
      {showFirst && comments[0] ? (
        <>
          <Comment comment={comments[0]} showIcon={showIcon} />
          <button
            onClick={() => {
              if (openPostViewer) {
                openPostViewer();
              }
            }}
          >
            {comments.length - 1 > 0 && <p className="font-semibold text-sky-500 text-start">View {comments.length - 1} more Comments</p>}
          </button>
        </>
      ) : (
        <>
          {showIcon ? (
            <>
              {isLoading && (
                <div className="flex grow justify-center items-center">
                  {comments[0] && <ClipLoader size={22} color="#dee2e6" className="m-0" />}
                </div>
              )}
              <div className={`${isLoading ? "hidden h-0 w-0" : ""} flex flex-col gap-2`}>
                {comments.map((comment, index) => {
                  if (comments.length - 1 === index) {
                    return <Comment comment={comment} showIcon={showIcon} key={comment._key} end={end} />;
                  } else {
                    return <Comment comment={comment} showIcon={showIcon} key={comment._key} />;
                  }
                })}
              </div>
            </>
          ) : (
            <>
              {comments.map((comment, index) => {
                if (comments.length - 1 === index) {
                  return <Comment comment={comment} showIcon={showIcon} key={comment._key} end={end} />;
                } else {
                  return <Comment comment={comment} showIcon={showIcon} key={comment._key} />;
                }
              })}
            </>
          )}
        </>
      )}
    </section>
  );
}
