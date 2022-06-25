const NAME = "sogou-demo";
let sogouBtn = createButtonWithName(NAME);
// 这个变量存储 callback 回来的字符串
let someString;
// 存储 callback 回来的 tab ID
let anotherTabId;

/**
 * 将此 tab 的 ID 传到 background 并打印另一个 tab 的 ID
 */
function sendIdAndGetAnotherId() {
    chrome.runtime.sendMessage(
        {from: NAME},
        (resp) => {
            // 这个 resp 是 json
            // 获取回传回来的 key 为 name 的 value
            someString = resp.name;
            // 获取另一个 tab 的 ID
            anotherTabId = resp.tabId;
        }
    );
}

// 在页面加载的时候就运行这个方法
window.onload = sendIdAndGetAnotherId();

sogouBtn.onclick = () => {
    sendIdAndGetAnotherId();
    // 动态修改 sogouBtn
    sogouBtn.innerText = someString;
}

// 点击此 button，可以动态修改 message-passing/baidu-demo.js 里面的 button 的 innerText
let changeBaiduBtn = createButtonWithName("Change Baidu Button Name");
changeBaiduBtn.onclick = () => {
    // 点击的时候，发送此消息到 background，background 接收到此消息后，会发送一个修改 button 的请求到 baidu-demo.js 中
    chrome.runtime.sendMessage(
        {changeBaiduButtonInnerTextRequest: "new button"},
        () => console.log("修改百度页面的 button 文字")
    );
}