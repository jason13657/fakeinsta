import { getUserByEmail } from "@/service/user";
import { CommentT } from "@/types";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";

type Props = {
  comment: CommentT;
  showIcon: boolean;
  end?: () => void;
};

export default function Comment({ comment, showIcon, end }: Props) {
  const [iconUrl, setIconUrl] = useState<string>();

  useEffect(() => {
    if (showIcon) {
      getUserByEmail(comment.writer).then((user) => {
        setIconUrl(user.image);
        if (end) {
          end();
        }
      });
    }
  }, [comment.writer, end, showIcon]);

  return (
    <div className="flex flex-row">
      {iconUrl ? (
        <Avatar showName={true} size={24} user={{ email: comment.writer, image: iconUrl }} />
      ) : (
        <p className="font-bold">{comment.writer.split("@")[0]}</p>
      )}
      <p className="mx-2">{comment.content}</p>
    </div>
  );
}
