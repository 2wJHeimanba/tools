import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import ts from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input:"./src/index.ts",
  output:[
    {
      file:"./dist/bundle.js",
      format:"esm",
      name:"demo"
    }
  ],
  plugins:[
    resolve(),
    commonjs(),
    babel({
      exclude:"node_modules/**"
    }),
    ts()
  ]
}
