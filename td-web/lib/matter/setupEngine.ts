import { Engine, Render, Runner, Composite } from "matter-js";

export function setupEngine(container: HTMLElement) {
  const engine = Engine.create();

  const render = Render.create({
    element: container,
    engine,
    options: {
      width: 800,
      height: 600,
      background: "oklch(0.6171 0.1375 39.0427",
      wireframes: false,
    },
  });

  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);

  return { engine, render, runner };
}
