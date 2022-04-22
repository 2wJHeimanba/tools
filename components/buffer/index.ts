
type Person<T = number> = {
    name:string,
    married:boolean,
    age:T
}

let van:Partial<Person<string>> = {
    age:"123"
}
type t1 = Exclude<keyof Person,"name">
let wen:Exclude<keyof Person,"married"> = "age"

const omitTest:Omit<Person,"name"> = {
    married:true,
    age:32
}

console.log(van,wen,omitTest)

