/**
 * 获取通过 js/storage-test.js 存储在 Chrome 中的值
 */
chrome.storage.local.get(["checkedStatus"], (result) => {
    // 获取存储在 Chrome 中的 checkbox 打勾状态
    console.log("js/storage-test.js 存储在 Chrome 中的 checkedStatus 的值: "
        + result.checkedStatus);
});