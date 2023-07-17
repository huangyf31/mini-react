function createElement(type, props, ...children) {
    return {
        type,
        props: {
            props,
            children: children.map(child => {
                return typeof child === 'object' ? child : createTextElement(child);
            })
        }
    }
}

function createTextElement(child) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: child,
            children: [],
        }
    }
}

export default createElement;
