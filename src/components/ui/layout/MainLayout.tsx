import Image from "next/image";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="min-h-screen bg-zinc-300">
      {/*<Image
        src={"abstractform.svg"}
        width='500'
        height='500'
        alt=""
        className="fixed bottom-0 right-0 -z-5 opacity-30"
      />*/}
      <div className="container mx-auto min-h-screen bg-white z-0">{children}</div>
    </div>
  );
}
