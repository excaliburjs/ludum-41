import resolve from "rollup-plugin-node-resolve";

export default {
  input: "build/game.js",
  context: "window",
  external: ["excalibur"],
  output: {
    file: "build/bundle.js",
    sourcemap: true,
    format: "iife",
    globals: {
      excalibur: "ex"
    }
  },
  plugins: [resolve()],
  watch: {
    chokidar: true
  }
};
