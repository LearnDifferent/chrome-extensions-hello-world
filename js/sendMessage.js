// 在窗口加载的时候，发送一条消息，并搭载回调函数
window.onload = testMessage();

function testMessage() {
    chrome.runtime.sendMessage(
        {msg: "Hello from a content"},
        () => console.log(2 + 2))
}