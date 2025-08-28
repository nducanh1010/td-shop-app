import { Mouse, MouseConstraint, Engine, Render, Composite } from "matter-js";

export const createMouseDrag = (engine: Engine, render: Render) => {
  const mouse = Mouse.create(render.canvas);

  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: true,
      },
    },
  });

  Composite.add(engine.world, mouseConstraint);

  (render as any).mouse = mouse;

  return mouseConstraint;
};
