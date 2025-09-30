declare module "*.mdx" {
  import type { JSX } from "solid-js";
  const MDXComponent: (props: Record<string, unknown>) => JSX.Element;
  export default MDXComponent;
}
