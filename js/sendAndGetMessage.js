// 在窗口加载的时候，发送一条消息，并搭载回调函数
window.onload = testMessage();
function testMessage() {
    chrome.runtime.sendMessage(
        {msg: "Hello from a content"},
        () => console.log(2 + 2)
    )
}

// 监听发送到当前页面的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(sender.tab ?
        "如果 sender 参数中有 tab 的属性，表示 from a content script:" + sender.tab.url :
        "如果 sender 参数中没有 tab 的属性，则表示 from the extension");

    // message 参数表示传递过来的 Json 消息
    if (message.someMessages === "Here is some messages") {
        // sendResponse 是 callback，可以直接返回 Json 作为回复
        sendResponse({theResponse: "Here is the response"})
    }
    /*
    In the above example, `sendResponse` was called synchronously.
    If you want to asynchronously use sendResponse,
    add `return true;` to the onMessage event handler.
     */
})