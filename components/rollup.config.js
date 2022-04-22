import commonjs from "@rollup/plugin-commonjs"
import babel from "rollup-plugin-babel"
import ts from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"

export default {
    input:"./buffer/index.ts",
    output:[
        // {
        //     file:"./dist/scrollbar.esm.js",
        //     format:"esm",
        //     name:"Scrollbar"
        // },
        {
            file:"./dist/buffer.min.js",
            format:"esm",
            name:"buffer"
        }
    ],
    plugins:[
        ts(),
        commonjs(),
        babel({
            exclude:"node_modules/**"
        }),
        // terser()
    ]
}