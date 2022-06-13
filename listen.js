// 用于监听发送到 background 的消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("message 表示发送到这里到消息：" + message);
    console.log("sender 表示发送者：" + sender);
})