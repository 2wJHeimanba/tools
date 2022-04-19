import resolve from "rollup-plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import babel from "rollup-plugin-babel"
import ts from "@rollup/plugin-typescript"

export default {
    input:"./src/index.ts",
    output:[
        {
            file:"./dist/bundle.es.js",
            format:"esm",
            name:"Parser"
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