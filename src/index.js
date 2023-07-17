import My_react from "./my_react";

const element = My_react.createElement(
    'div',
    {
        title:'halo'
    },
    '沃尔德'
)

const container = document.querySelector('#root');

My_react.render(element, container);
