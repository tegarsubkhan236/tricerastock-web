import {currencyFormatter} from "../helper/currency";
let store;

export const AppTitle = () => {
  return "Ziromart"
}

export const AppSubTitle = (location) => {
    let subTitle;
    if (location.pathname === '/') {
        subTitle = "Dashboard"
    } else {
        let x = location.pathname.substring(1)
        let x1 = x.split('/')[0].replace(/-/g, " ").replace(/_/g, " ")
        subTitle = x1.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }
    return subTitle
}

export const injectStore = (_store) => {
    store = _store;
};

export const getStore = () => store;

export const Debounce = (func, timeout = 500) => {
    let timer;
    return function (...args) {
        const context = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
        }, timeout);
    };
};

export const PaginationConfig = (current, pageSize, total, onShowSizeChange, onChange) => {
    return {
        current,
        pageSize,
        total,
        showSizeChanger: true,
        hideOnSinglePage: true,
        showQuickJumper: true,
        showLessItems: true,
        showTotal: (total, range) => `Showing ${currencyFormatter(range[0])} to ${currencyFormatter(range[1])} of ${currencyFormatter(total)} entries`,
        onShowSizeChange,
        onChange,
    }
}