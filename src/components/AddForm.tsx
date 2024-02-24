"use client";

import { uploadImage } from "@/service/assets";
import { addComment } from "@/service/comments";
import { publishPost } from "@/service/post";
import { updateUserPosts } from "@/service/user";
import { PostT } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { PulseLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";

export default function AddForm() {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploadingUrl, setUploadingUrl] = useState<string>();
  const [caption, setCaption] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setUploadingUrl(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handlePublish = () => {
    setIsPublishing(true);
    uploadImage(file!).then((document) => {
      const post: PostT = {
        id: uuidv4(),
        writer: session?.user?.email!,
        imageUrl: document.url,
        likesId: "",
        commentsId: "",
      };
      publishPost(post).then((post) => {
        if (caption !== "") {
          addComment(post.commentsId, caption, post.writer);
        }
        setIsPublishing(false);
        setFile(undefined);
        setCaption("");
        setUploadingUrl("");
        updateUserPosts(post.id, post.writer, "posts");
      });
    });
  };

  return (
    <section className="w-full my-2 relative ">
      {dragActive ? <div className=" absolute top-0 left-0 w-full h-full bg-sky-400 opacity-30" /> : <></>}
      {isPublishing ? (
        <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center z-30">
          <PulseLoader color="#a2d2ff" size={30} />
        </div>
      ) : (
        <></>
      )}
      <form
        className="flex w-full md:w-1/2 relative my-4 justify-center items-center flex-col mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="absolute top-0 left-0 w-full h-64 border-2 border-dotted border-sky-700 -z-20 flex items-center justify-center flex-col">
          <IoImagesOutline size={100} className="opacity-60" />
          <p>Drag and Drop to upload image or Click</p>
        </div>
        {uploadingUrl && (
          <Image
            src={uploadingUrl}
            width={0}
            height={0}
            sizes="100vh"
            alt={"uploading"}
            className="w-full object-cover h-64 absolute top-0 left-0 -z-10"
          />
        )}
        <input
          className=" w-full h-64 file:hidden text-transparent"
          ref={inputRef}
          type="file"
          multiple={true}
          accept=""
          onChange={handleFormChange}
          onDragOver={() => {
            setDragActive(true);
          }}
          onDragLeave={() => {
            setDragActive(false);
          }}
          onDrop={() => {
            setDragActive(false);
          }}
        />
        <textarea
          name="caption"
          id="caption"
          value={caption}
          placeholder="Write a caption"
          onChange={(e) => {
            setCaption(e.target.value);
          }}
          className={`w-full shadow-md ${dragActive && "-z-10"}`}
          rows={7}
        ></textarea>
        <button
          onClick={() => {
            handlePublish();
          }}
          type="submit"
          className="bg-sky-600 w-full text-white py-1 rounded-md"
        >
          Publish
        </button>
      </form>
    </section>
  );
}
