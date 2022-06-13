// 消息提醒
chrome.notifications.create({
    type: "basic",
    title: "消息标题",
    message: "成功创建消息的提示",
    iconUrl: "../icons/16.png"
}, function () {
});
// 发送消息到 background
document.getElementById("sendToBg").onclick = function () {
    // 参数：
    // 1. 被发送的消息对象
    // 2. callback：从 background 回复的信息
    chrome.runtime.sendMessage({
        helloMsg: "Hello",
    }, function (response) {
        // alert(response.anyResponseIsOk);
    });
}