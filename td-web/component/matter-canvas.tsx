"use client";
import { useEffect, useRef, useState } from "react";
import Matter, { Bodies, Composite } from "matter-js";
import { setupEngine } from "@/lib/matter/setupEngine";
import { manifestMatter } from "@/lib/matter";

export default function MatterCanvas() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const matterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => {
      if (!matterRef.current) return;
      const { width, height } = matterRef.current?.getBoundingClientRect();
      console.log(width, height);
      setSize({
        width,
        height,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const { render, engine } = manifestMatter(size.width, size.height);
    return () => {
      Matter.Render.stop(render); // stop the render loop
      Matter.World.clear(engine.world, false); // remove all bodies/constraints
      Matter.Engine.clear(engine); // clear the physics engine
      render.canvas.remove(); // remove <canvas> from DOM
      render.textures = {}; // release any loaded textures
    };
  }, [size.width, size.height]);

  return <div ref={matterRef} id="matter " className="w-full"></div>;
}
