import commonjs from "@rollup/plugin-commonjs"
import babel from "rollup-plugin-babel"
import ts from "@rollup/plugin-typescript"
import resolve from "rollup-plugin-node-resolve"
import { terser } from "rollup-plugin-terser"

export default {
    input:"./src/index.ts",
    plugins:[
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**' // 只编译我们的源代码
        }),
        ts()
        // terser()
    ],
    output:[
        {
            file:"./dist/bundle.js",
            format:"esm",
            name:"demo"
        }
    ]
}