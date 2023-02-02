export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;
    const later = function () {
        const last = +new Date() - timestamp;
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };
    return function (...args) {
        context = this;
        timestamp = +new Date();
        const callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
}

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