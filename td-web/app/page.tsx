import FooterContent from "@/component/content";
import MatterCanvas from "@/component/matter-canvas";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="row-start-2 w-full h-full  justify-self-stretch overflow-hidden">
          <MatterCanvas />
        </main>
        {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"> */}

        {/* </footer> */}
      </div>
      <div
        className="relative h-[800px]"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="relative h-[calc(100vh+800px)] -top-[100vh]">
          <div className="h-[800px] sticky top-[calc(100vh-800px)]">
            <FooterContent />
          </div>
        </div>
      </div>
    </>
  );
}
