// 获取需要植入的脚本的路径
const SCRIPT_FILE_PATH = chrome.extension.getURL("inject-js/inject.js");
const SCRIPT_FILE_PATH_ZERO = chrome.extension.getURL("inject-js/inject0.js");
const SCRIPT_FILE_PATH_ONE = chrome.extension.getURL("inject-js/inject1.js");
// 植入到哪个地方（这里以 tag 为标准）
const TAG_NAME = "body";

/*
测试的时候，可以在页面放入这几个按钮来测试：
<button type="button" onclick="runInjectedMethod()">click</button>
<button type="button" onclick="runInjectedMethod0()">click 0</button>
<button type="button" onclick="runInjectedMethod1()">click 1</button>
 */

/**
 * 注入一个脚本文件
 *
 * @param filePath 脚本文件的路径
 * @param tagName  脚本文件注入在哪个 tag 后面
 */
function injectScript(filePath, tagName) {
    let node = document.getElementsByTagName(tagName)[0];
    let script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", filePath);
    node.appendChild(script);
}
injectScript(SCRIPT_FILE_PATH, TAG_NAME);

/**
 * inject0.js 中有一个方法使用了 inject1.js 的方法，
 * 所以我们需要先注入 inject1.js，再注入 inject2.js
 *
 * @param filePath 脚本文件的路径
 * @param tagName  脚本文件注入在哪个 tag 后面
 * @param callback 回调函数
 */
function injectTwoScript(filePath, tagName, callback) {
    let node = document.getElementsByTagName(tagName)[0];
    let script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", filePath);
    if (typeof callback == "function") {
        script.onload = function() { callback(); };
    }
    node.appendChild(script);
}
injectTwoScript(SCRIPT_FILE_PATH_ONE , TAG_NAME, function() {
    injectTwoScript(SCRIPT_FILE_PATH_ZERO, TAG_NAME);
});