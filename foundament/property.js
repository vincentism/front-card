// 节选自高级程序设计第六章

// 属性类型

// 1. 数据属性
//     [[Value]] 默认值 undefined
//     [[Configurable]] 能否 delete 能否修改属性特性 能否修改为访问器属性 直接在对象上定义的属性，默认值true
//     [[Enumerable]] 能否通过 for-in 循环返回属性
//     [[Writable]] 能否修改属性的值
// 2. 访问器属性
//     [[Configurable]]
//     [[Enumerable]]
//     [[Get]]
//     [[Set]]


// 修改属性特性
var person = {};
Object.defineProperty(person, "name", {
    writable: false,
    value: "Nicholas"
});

// 修改 Configurable 为 false 之后不能再进行修改
// 一次修改多个属性，Object.defineProperties


// 读取属性特性
// Object.getOwnPropertyDescriptor

