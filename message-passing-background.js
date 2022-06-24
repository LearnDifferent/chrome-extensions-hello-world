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
    // 如果想要将 sendResponse 从异步方法转为同步方法，可以 `return true`：
    // return true;
});