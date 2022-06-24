// 用于监听发送到 background 的消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("message 表示发送到这里到消息：" + message);
    console.log("sender 表示发送者：" + sender);
    // 当有多个 background scripts 使用 chrome.runtime.onMessage.addListener 时，
    // 只有其中一个的 sendResponse() 方法会被执行，所以这里注释这个：
    // console.log("response 表示会执行回调函数，并将结果返回到 content script 中" + sendResponse());
})

// Query tab
let queryInfo = { active: true, currentWindow: true };
// 在移动书签的时候，从 background 发送消息到 content script 中
chrome.bookmarks.onMoved.addListener(() => {
    // 参数1：当前的 queryInfo 表示搜索活跃且被当前选中 tabs（selected tab）
    // 参数2：一个 callback，发送消息到某个 tab 中（这里的 tabs 表示所有符合条件的标签页）
    chrome.tabs.query(
        queryInfo,
        tabs => {
            // 在该 callback 中，
            // 参数1 表示表示发送到哪个 tab 中（根据 ID 判断），
            // 参数2表示发送的消息，
            // 参数3 的 callback，获取 response
            chrome.tabs.sendMessage(
                tabs[0].id,
                {someMessages: "Here is some messages"},
                (response) => {
                    console.log(response);
                }
            )
        }
    )
})