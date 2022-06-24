// 让浏览器记住打勾的状态

// 创建 checkbox
let input = document.createElement("input");
input.type = "checkbox";
// 为 checkbox 设置 ID
const CHECKBOX_ID = "storage-test";
input.id = CHECKBOX_ID;
// 注入刚刚创建的 input
const BODY = document.getElementsByTagName("body")[0];
BODY.prepend(input);
// 为 input 添加单击事件，用于记录 checkbox 的打勾的状态
input.addEventListener("click", () => storeCheckboxStatus());

// 每次载入时，获取存储在 Chrome 中的 checkbox 的打勾的状态，并设置
getAndSetCheckboxStatus();

/**
 * 该事件会记录 checkbox 的打勾的状态
 */
function storeCheckboxStatus() {
    // 获取 checkbox 的打勾状态
    let checkboxStatus = document.getElementById(CHECKBOX_ID).checked;
    // 使用 key-value 的形式，存储 checkbox 的状态
    let checkboxStatusToStore = {checkedStatus: checkboxStatus };
    // 存储到 Chrome 中。参数 1 表示存储的内容，参数 2 表示 callback
    chrome.storage.local.set(checkboxStatusToStore, () => {
        // 这里使用 callback，打印一下
        console.log("stored", checkboxStatusToStore);
    });
}

/**
 * 获取存储在 Chrome 中的 checkbox 打勾状态，并设置
 */
function getAndSetCheckboxStatus() {
    chrome.storage.local.get(["checkedStatus"], (result) => {
        // 获取存储在 Chrome 中的 checkbox 打勾状态
        let storedCheckedStatus = result.checkedStatus;
        // 在 callback 的时候，将 checkbox 的状态设置为 Chrome 存储的状态
        document.getElementById(CHECKBOX_ID).checked = storedCheckedStatus;
    });
}