export function GetTitle(location) {
    const title = "Rungkad";
    const subTitle = () => {
        if (location.pathname === '/') {
            return "Dashboard"
        } else {
            let x = location.pathname.substring(1)
            let x1 = x.split('/')[0].replace(/-/g, " ")
            return x1.charAt(0).toUpperCase() + x1.slice(1)
        }
    }
    return {title, subTitle}
}

export const Debounce = (func) => {
    let timer;
    return function (...args) {
        const context = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
        }, 500);
    };
};