"use client";
import ReactLenis, { useLenis } from "lenis/react";
import React, { useEffect, useRef } from "react";
import Script from "next/script";
export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any>(null);
  useEffect(() => {
    let rafId: number;
    function update(time: DOMHighResTimeStamp) {
      lenisRef.current?.lenis?.raf(time);
      rafId = requestAnimationFrame(update);
    }
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);
  return (
    <>
      <ReactLenis
        root
        options={{
          duration: 1.5,
          autoRaf: false,
          smoothWheel: true,
        }}
        ref={lenisRef}
      >
        {children}
      </ReactLenis>
      <Script src="" />
    </>
  );
}
