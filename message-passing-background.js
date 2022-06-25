let baiduDemoId = null;
let sogouDemoId = null;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // 获取 sender 的 Tab ID
    let tabId = sender.tab.id;
    // 来自哪里的消息
    let from = message.from;

    switch (from) {
        case "baidu-demo":
            baiduDemoId = tabId;
            // 这里的参数是 any，所以可以传递 int
            sendResponse("sogou tab id: " + sogouDemoId);
            break;
        case "sogou-demo":
            sogouDemoId = tabId;
            // 这里的参数是 any，所以可以传递 json
            sendResponse({name: "baidu tab id", tabId: baiduDemoId});
            break;
        default:
            break;
    }

    // 获取消息中，是否有“修改 message-passing/baidu-demo.js 中 button 内容的请求”的消息，
    let baiduInnerText = message.changeBaiduButtonInnerTextRequest;
    if (baiduInnerText) {
        // 如果有的话，就触发修改的 function
        sendButtonInnerTextToBaiduDemoId(baiduInnerText);
    }

    // 如果想要将 sendResponse 从异步方法转为同步方法，可以 `return true`：
    // return true;
});

/**
 * 发送一个请求到 message-passing/baidu-demo.js 中，
 * baidu-demo.js 接收到该请求后，会修改该页面中 button 的文字内容
 *
 * @param innerText button 的文字内容
 */
function sendButtonInnerTextToBaiduDemoId(innerText) {
    chrome.tabs.sendMessage(
        baiduDemoId,
        {baiduButtonInnerText: innerText},
        (resp) => console.log(resp)
    )
}