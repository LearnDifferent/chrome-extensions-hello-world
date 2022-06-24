const NAME = "baidu-demo";
const BAIDU_BTN = createButtonWithName(NAME);

/**
 * 将此 tab 的 ID 传到 background 并打印另一个 tab 的 ID
 */
function sendIdAndGetAnotherId() {
    chrome.runtime.sendMessage(
        {from: NAME},
        (resp) => {
            // 这个 resp 是 int
            console.log(resp);
        }
    );
}

// 在页面加载的时候就运行这个方法
window.onload = sendIdAndGetAnotherId();

BAIDU_BTN.onclick = () => {
    sendIdAndGetAnotherId();
}