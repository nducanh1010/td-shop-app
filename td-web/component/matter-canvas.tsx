"use client";
import { useEffect, useRef, useState } from "react";
import Matter, { Bodies, Composite, World } from "matter-js";
import { createWall, manifestMatter } from "@/lib/matter";

export default function MatterCanvas() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const matterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matterRef.current) return;
    const { render, engine } = manifestMatter(
      matterRef.current.clientWidth,
      matterRef.current.clientHeight,
      matterRef.current
    );
    let walls = createWall(render);
    World.add(engine.world, walls);
    const handleResize = () => {
      if (!matterRef.current) return;
      const { width, height } = matterRef.current?.getBoundingClientRect();

      render.options.width = width;
      render.options.height = height;
      console.log("resize");
      // rebuild walls
      World.remove(engine.world, walls);
      walls = createWall(render);
      World.add(engine.world, walls);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      // Matter.Render.stop(render);
      // Matter.World.clear(engine.world, false);
      // Matter.Engine.clear(engine);
      // render.canvas.remove();
      // render.textures = {};
        Matter.Render.setPixelRatio(render, window.devicePixelRatio);
    };
  }, []);

  return <div ref={matterRef} id="matter " className="w-full h-full"></div>;
}
