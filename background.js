// Chrome 右键菜单的 create 功能
// 参数 1：对象，参数 2：callback
chrome.contextMenus.create({
    // 对象的类型
    type: "normal",
    // 标题
    title: "This is a title",
    // ID
    id: "id1",
    // 右键菜单的作用范围
    contexts: ["all", "selection", "link"],
    // 单击事件
    onclick: function (onClickData) {
        // 这里的参数 onClickData 表示被单击的“右键菜单”对象的数据
        // 注意，这个是在「背景页」里面才看得到输出
        console.log(onClickData);
    }
}, function () {
    console.log("创建右键菜单");
});

// 这里创建一个 checkbox，作为 id1 菜单的 child
// 使用了变量来存储按钮的属性
// 添加一个复制选中文本，并打开新窗口的方法
var checkBoxValues = {
    type: "checkbox",
    title: "This is a checkbox that can open another window",
    parentId: "id1",
    contexts: ["selection"],
    // 复制选中文本，并打开百度翻译
    onclick: function (text) {
        // selectionText 是数据中，被选中的文本属性
        window.open("https://fanyi.baidu.com/?aldtype=16047#en/zh/" +
            text.selectionText);
    }
};
chrome.contextMenus.create(checkBoxValues, function () {
});

// 这里创建一个 radio，作为 id1 菜单的 child，并且添加改变 id1 的功能
chrome.contextMenus.create({
    type: "radio",
    title: "This is a radio that can change parent",
    parentId: "id1",
    onclick: function (t) {
        // update 是改变菜单按键的方法
        chrome.contextMenus.update("id1", {
            title: "id1 has been changed"
        })
    }
}, function () {
});

// 只在某些页面才会显示的右键菜单按钮
chrome.contextMenus.create({
    type: "normal",
    title: "Only be shown in some websites",
    id: "id2",
    contexts: ["all"],
    // 能够显示此右键菜单按钮的网站
    documentUrlPatterns: ["https://www.baidu.com/*", "https://www.apple.com.cn/*"],
}, function () {
});