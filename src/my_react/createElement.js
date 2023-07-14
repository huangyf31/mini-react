function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            //根据type来渲染，要么是字符串要么是对象，但是字符串没有type属性
            children: children?.map((child) => {
                return typeof child === 'object' ? child : createTextElement(child)
            })
        }
    }
}

function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}

export default createElement;
