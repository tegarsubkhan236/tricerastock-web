import SidebarLogo from "../assets/images/ziromart_logo.svg"
import AuthLogo from "../assets/images/ziromart_full_logo.png"
import AuthBackground from "../assets/images/login_background.jpeg"

export const AppTitle = "Ziromart"
export const AppSidebarLogo = SidebarLogo
export const AppAuthLogo = AuthLogo
export const AppAuthBackground = AuthBackground
export const getAppSubTitle = (location) => {
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