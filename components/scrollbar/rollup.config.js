import commonjs from "@rollup/plugin-commonjs"
import babel from "rollup-plugin-babel"
import ts from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"

export default {
    input:"./src/index.ts",
    output:[
        {
            file:"./dist/scrollbar.esm.js",
            format:"esm",
            name:"Scrollbar"
        }
    ],
    plugins:[
        ts(),
        commonjs(),
        babel({
            exclude:"node_modules/**"
        }),
        terser()
    ]
}