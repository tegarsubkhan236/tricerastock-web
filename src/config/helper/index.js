export function getMenuItemInMenuListByProperty(menuList, key, value) {
    let stack = [];
    stack = stack.concat(menuList);
    let res;
    while (stack.length) {
        let cur = stack.shift();
        if (cur.children && cur.children.length > 0) {
            stack = cur.children.concat(stack);
        }
        if (value === cur[key]) {
            res = cur;
        }
    }
    return res;
}