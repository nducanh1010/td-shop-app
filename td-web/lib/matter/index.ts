import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Body,
  Mouse,
  MouseConstraint,
} from "matter-js";
import { createMouseDrag } from "./interactions/mouse";
export const runMatter = () => {
  const engine = Engine.create();
  const render = Render.create({
    element: document.getElementById("matter")!,
    engine: engine,
    options: {
      wireframes: false,
      background: "oklch(0.6171 0.1375 39.0427)",
    },
  });
  // đăn kí tương tác user
  const mouseInteraction = createMouseDrag(engine, render);
  const boxA = Bodies.rectangle(400, 200, 80, 80, {
    render: {},
  });
  const renderHeight = render.options.height;
  const renderWidth = render.options.width;
  const boxB = Bodies.rectangle(450, 50, 80, 80);
  const ground = Bodies.rectangle(
    renderWidth! / 2, // this posisition center the object :)
    renderHeight!,
    renderWidth!,
    30,
    {
      isStatic: true,
    }
  );
  const partA = Bodies.rectangle(300, 300, 100, 20);
  const partB = Bodies.circle(0, 0, 20);
  const chassis = Bodies.rectangle(0, 0, 120, 20);
  const wheelA = Bodies.circle(-40, 20, 20);
  const wheelB = Bodies.circle(40, 20, 20);

  const car = Body.create({
    parts: [chassis, wheelA, wheelB],
    frictionAir: 1,
  });
  // combine into one body
  /*  Create custom body
   */
  const compound = Body.create({
    parts: [partA, partB],
    position: { x: 20, y: 20 },
  });
  Body.setPosition(car, { x: 200, y: 20 });
  Composite.add(engine.world, [
    boxA,
    boxB,
    ground,
    compound,
    car,
    mouseInteraction,
  ]);
  Composite.add(engine.world, car);
  // đây là biến khởi tạo ko cần sửa
  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);
  console.log("runner", runner);
};
