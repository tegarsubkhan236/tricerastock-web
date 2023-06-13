export const AppTitle = () => {
  return "Rungkad"
}

export const AppSubTitle = (location) => {
    let subTitle;
    if (location.pathname === '/') {
        subTitle = "Dashboard"
    } else {
        let x = location.pathname.substring(1)
        let x1 = x.split('/')[0].replace(/-/g, " ")
        subTitle = x1.charAt(0).toUpperCase() + x1.slice(1)
    }
    return subTitle
}