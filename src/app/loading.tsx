import React from "react";
import { SyncLoader } from "react-spinners";

export default function loading() {
  return (
    <div className="flex grow items-center justify-center">
      <SyncLoader color="#ffbe0b" />
    </div>
  );
}
