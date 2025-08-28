"use client";
import { useEffect } from "react";
import { Bodies, Composite } from "matter-js";
import { setupEngine } from "@/lib/matter/setupEngine";

export default function MatterCanvas() {
  useEffect(() => {
    const container = document.getElementById("matter")!;
    const { engine } = setupEngine(container);

    // add objects
    const ground = Bodies.rectangle(400, 580, 810, 40, { isStatic: true });
    Composite.add(engine.world, [ground]);
  }, []);

  return <div className="matter"></div>;
}
