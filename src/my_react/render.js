let nextUnitOfWork = null;

function performUnitOfWork(fiber) {
    //reactElement 转换成一个真实DOM
    if (!fiber.dom) {
        fiber.dom = createDom(fiber);
    }
    if (fiber.parent) {
        fiber.parent.dom.appendChild(fiber.dom);
    }
    //为当前的fiber创造它子节点的fiber
    const elements = fiber?.props?.children;
    let prevSibling = null;
    elements.forEach((childrenElement, index) => {
        const newFiber = {
            parent: fiber,
            props: childrenElement.props,
            type: childrenElement.type,
            dom: null,
        }
        if (index === 0) {
            fiber.child = newFiber;
        }else {
            prevSibling.sibling = newFiber;
        }
        prevSibling = newFiber;
    })
    //return下一个任务单元
    if(fiber.child){
        return fiber.child;
    }
    let nextFiber = fiber;
    while (nextFiber){
        if(nextFiber.sibling){
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent
    }
}

//工作函数
function workLoop(deadline) {
    //默认需要去执行
    let shouldYield = true;
    while (nextUnitOfWork && shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() > 1;
    }
    // deadline.timeRemaining();//得到当前帧剩余的时间 scheduler
    //浏览器空闲状态运行这个回调函数
    requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop)

function createDom(element) {
    const dom =
        element.type === 'TEXT_ELEMENT' ?
            document.createTextNode('')
            : document.createElement(element.type);
    const isProperty = key => key !== 'children';
    //对创造出dom赋props
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => dom[name] = element.props[name])

    //用递归 children也塞进dom
    return dom;
}

function render(element, container) {
    nextUnitOfWork = {
        dom: container,
        props: {
            children: [element],
        }
    }

}

export default render;
