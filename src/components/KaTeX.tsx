import { type Component, createEffect } from "solid-js";
import "katex/dist/katex.min.css";
import katex from "katex";

const KaTeX: Component<{ math: string; display?: boolean }> = (props) => {
  let element: HTMLDivElement | undefined;

  createEffect(() => {
    if (element) {
      element.innerHTML = "";
      katex.render(props.math, element, {
        displayMode: props.display ?? false,
        throwOnError: false,
      });
    }
  });

  return (
    <div
      ref={element}
      class="katex-container"
    />
  );
};

export default KaTeX;
