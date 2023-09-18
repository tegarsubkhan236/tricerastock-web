import {
    FormOutlined,
    LineOutlined,
    UserSwitchOutlined,
    BankOutlined,
    AppstoreOutlined
} from "@ant-design/icons";

function getItem(label, key, icon, children, type) {
    return {key, icon, children, label, type};
}

const menuList = [
    getItem("Dashboard", "/", <AppstoreOutlined/>),
    getItem("User Authority", "/user_authority", <UserSwitchOutlined />),
    getItem("Core Inventory", "/core_inventory", <BankOutlined />),
    getItem("Buy Transaction", "/buy_transaction", <FormOutlined/>,[
        getItem("Purchase Order", "/buy_transaction/purchase_order", <LineOutlined />),
        getItem("Receiving Order", "/buy_transaction/receiving_order", <LineOutlined />),
        getItem("Return Order", "/buy_transaction/return_order", <LineOutlined />),
    ]),
    getItem("Sell Transaction", "/sell_transaction", <FormOutlined/>,[
        getItem("Sales Order", "/sell_transaction/sales_order", <LineOutlined />),
        getItem("Return Order", "/sell_transaction/return_order", <LineOutlined />),
    ]),
    getItem("Report", "/report", <FormOutlined/>),
]

export default menuList;