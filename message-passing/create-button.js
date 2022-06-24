/**
 * 在 body 中，生成没有 event 的 button 并返回
 *
 * @param btnName button 名称
 * @return {HTMLButtonElement} 返回 button
 */
function createButtonWithName(btnName) {
    let body = document.getElementsByTagName("body")[0];
    let btn = document.createElement("button");
    btn.innerText = btnName;
    btn.setAttribute("id", btnName);
    body.prepend(btn);
    return btn;
}