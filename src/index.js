//将用createElement方法
// import React from "react";
// import ReactDom from "react-dom"
import My_react from "./my_react";

const element = My_react.createElement(
    'div',
    {
        title:'halo'
    },
    '我耳朵'
)

const container = document.querySelector('#root')
//元素已经定义了，怎么渲染到页面上去，就要用ReactDom.render方法
My_react.render(
    element,
    //元素渲染到哪去
    container
)
//element作为一个render的一个参数，那么createElement是有返回值的
//打印这个返回值
console.log(element);

