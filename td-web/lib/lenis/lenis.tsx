"use client";

import ReactLenis, { useLenis } from "lenis/react";
import React, { useEffect, useRef } from "react";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any>(null);
  useEffect(() => {
    function update(time: DOMHighResTimeStamp) {
      if (!lenisRef.current?.lenis) return;
      lenisRef.current?.lenis?.raf(time);
    }

    const rafId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(rafId);
  }, []);
  const lenis = useLenis((lenis) => {
    lenis?.on("scroll", ({ scroll, limit, velocity, direction }) => {
      console.log("scroll position:", scroll);
      console.log("velocity:", velocity);
    });
  });
  return (
    <>
      <ReactLenis
        root
        options={{ autoRaf: false, smoothWheel: true }}
        ref={lenisRef}
      >
        {children}
      </ReactLenis>
    </>
  );
}
