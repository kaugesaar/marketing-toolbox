import { RollupOptions } from "rollup";
import cleanup from "rollup-plugin-cleanup";
import typescript from "@rollup/plugin-typescript";

const bundle: RollupOptions = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    typescript(),
    cleanup({ comments: "jsdoc", extensions: ["js", "ts"] }),
  ],
  context: "this",
};

export default bundle;
