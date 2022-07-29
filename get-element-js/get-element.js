// 鼠标右键打开菜单时，所处位置的 Mouse Event
let curMouseEvent = null;

/**
 * 每次鼠标右键打开菜单时，都更新所处位置的元素
 *
 * @param event Mouse Event
 */
oncontextmenu = (event) => {
    console.log("----oncontextmenu 方法，监听鼠标右键打开菜单时，所处位置的 Mouse Event----");
    curMouseEvent = event;
};

/**
 * 当 background 检测到右键菜单按钮被点击后，发送一个请求到这里。
 * 此时的 {@code curMouseEvent} 就是点击该按钮时，鼠标所在的位置的 Mouse Event
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "clicked") {
        console.log("----右键菜单中，某个特定按钮被点击时，鼠标所处位置的元素----");
        let curElement = document.elementFromPoint(curMouseEvent.clientX, curMouseEvent.clientY);
        console.log(curElement);
    }
});