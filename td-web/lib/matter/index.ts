import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Body,
  Mouse,
  MouseConstraint,
  Constraint,
} from "matter-js";
import { createMouseDrag } from "./interactions/mouse";
const createWall = (render: Render) => {
  const renderHeight = render.options.height;
  const renderWidth = render.options.width;
  const bottom = Bodies.rectangle(
    renderWidth! / 2,
    renderHeight!,
    renderWidth!,
    DEFAULT_WALL_WIDTH,
    {
      isStatic: true,
      // chamfer
    }
  );
  const right = Bodies.rectangle(
    renderWidth!,
    renderHeight! / 2,
    DEFAULT_WALL_WIDTH,
    renderHeight!,
    {
      isStatic: true,
    }
  );
  const top = Bodies.rectangle(
    renderWidth! / 2,
    0,
    renderWidth!,
    DEFAULT_WALL_WIDTH,
    {
      isStatic: true,
    }
  );
  const left = Bodies.rectangle(
    0,
    renderHeight! / 2,
    DEFAULT_WALL_WIDTH,
    renderHeight!,
    {
      isStatic: true,
    }
  );
  return [top, left, right, bottom];
};
const DEFAULT_WALL_WIDTH = 5;
export const manifestMatter = (width: number, height: number) => {
  const engine = Engine.create();
  engine.timing.timeScale = 0.8;
  console.log(width, height);
  const render = Render.create({
    element: document.getElementById("matter")!,
    engine: engine,
    options: {
      width,
      height,
      wireframes: false,
      background: "#F3F3F3",
    },
  });
  // đăng kí tương tác user
  createMouseDrag(engine, render);
  const boxA = Bodies.rectangle(400, 200, 80, 80, {
    render: {},
  });
  Body.create({ slop: 0.01 });
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
  // const leftEdge = Constraint.create({
  //   pointA: { x: 20, y: render.options.height! - 30 }, // left edge
  //   bodyB: ground,
  //   pointB: { x: -ground.bounds.max.x / 2, y: 0 }, // attach to left side
  //   stiffness: 1,
  // });

  const partA = Bodies.rectangle(300, 300, 100, 20);
  const partB = Bodies.circle(0, 0, 20);
  const chassis = Bodies.rectangle(0, 0, 120, 20);
  const wheelA = Bodies.circle(-40, 20, 20);
  const wheelB = Bodies.circle(40, 20, 20);

  const car = Body.create({
    parts: [chassis, wheelA, wheelB],
    frictionAir: 1,
  });
  Composite.add(engine.world, [boxA, boxB, ...createWall(render)]);
  // Composite.add(engine.world, car);
  // đây là biến khởi tạo ko cần sửa
  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);
  return { engine, render, runner };
};
