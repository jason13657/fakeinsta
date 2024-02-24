import { client } from "./sanity";

export async function uploadImage(blob: File) {
  return client.assets
    .upload("image", blob, { filename: blob.name })
    .then((document) => {
      return document;
    })
    .catch((error) => {
      throw Error("Upload failed:", error.message);
    });
}
