// 用于监听发送到 background 的消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("message 表示发送到这里到消息：" + message);
    console.log("sender 表示发送者：" + sender);
    console.log("response 表示会执行回调函数，并将结果返回到 content script 中" + sendResponse());
})