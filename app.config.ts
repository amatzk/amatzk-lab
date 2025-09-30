import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
/* @ts-expect-error */
import pkg from "@vinxi/plugin-mdx";
import Icons from "unplugin-icons/vite";
import tsconfigPaths from "vite-tsconfig-paths";

const { default: mdx } = pkg;
export default defineConfig({
  extensions: ["mdx", "md"],
  ssr: false,
  vite: {
    plugins: [
      tsconfigPaths(),
      tailwindcss(),
      mdx.withImports({})({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
      }),
      Icons({
        compiler: "solid",
        autoInstall: true,
      }),
    ],
  },
});
