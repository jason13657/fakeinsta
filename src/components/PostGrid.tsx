import Image from "next/image";

type Porps = {
  imageUrl: string;
  openPostViewer: () => void;
};

export default function PostGrid({ imageUrl, openPostViewer }: Porps) {
  return (
    <button
      onClick={() => {
        openPostViewer();
      }}
      className="w-full relative after:block  bg-slate-700 after:pb-[100%]"
    >
      <Image priority src={imageUrl} width={0} height={0} alt={imageUrl} className="w-full h-full  absolute object-cover" sizes="100vh" />
    </button>
  );
}
