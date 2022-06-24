const NAME = "sogou-demo";
let sogouBtn = createButtonWithName(NAME);
// 这个变量存储 callback 回来的字符串
let someString;

/**
 * 将此 tab 的 ID 传到 background 并打印另一个 tab 的 ID
 */
function sendIdAndGetAnotherId() {
    chrome.runtime.sendMessage(
        {from: NAME},
        (resp) => {
            // 这个 resp 是 json
            console.log(resp.name);
            console.log(resp.tabId);
            someString = resp.name;
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