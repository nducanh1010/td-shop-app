import {
  Mouse,
  MouseConstraint,
  Engine,
  Render,
  Composite,
  Events,
} from "matter-js";

export const createMouseDrag = (engine: Engine, render: Render) => {
  const mouse = Mouse.create(render.canvas);

  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

  Composite.add(engine.world, mouseConstraint);

  (render as any).mouse = mouse;
  Events.on(mouseConstraint, "enddrag", (event) => {
    for (const body of Composite.allBodies(engine.world)) {
      if (Math.abs(body.velocity.x) > 50) {
        body.velocity.x = Math.sign(body.velocity.x) * 10;
        console.log(body.velocity.x);
      }

      if (Math.abs(body.velocity.x) > 50)
        body.velocity.y = Math.sign(body.velocity.y) * 10;
    }
  });
  return mouseConstraint;
};
