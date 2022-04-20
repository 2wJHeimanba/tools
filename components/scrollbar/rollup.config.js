import commonjs from "@rollup/plugin-commonjs"
import babel from "rollup-plugin-babel"
import ts from "@rollup/plugin-typescript"

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
        commonjs(),
        babel({
            exclude:"node_modules/**"
        }),
        ts()
    ]
}