import "./index.css";
import {useLocation, Link} from "react-router-dom";
import {Breadcrumb} from "antd";
import menuList from "../../../../../router/menuList";

const getPath = (menuList, pathname) => {
    let temp = [];
    try {
        function getNodePath(node) {
            temp.push(node);
            if (node.key === pathname) {
                throw new Error("GOT IT!");
            }
            if (node.children && node.children.length > 0) {
                for (let i = 0; i < node.children.length; i++) {
                    getNodePath(node.children[i]);
                }
                temp.pop();
            } else {
                temp.pop();
            }
        }

        for (let i = 0; i < menuList.length; i++) {
            getNodePath(menuList[i]);
        }
    } catch (e) {
        return temp;
    }
};

const Index = () => {
    let location = useLocation();
    let path = getPath(menuList, location.pathname);
    const first = path && path[0];
    if (first && first.label.trim() !== "Dashboard") {
        path = [{label: "Dashboard", key: "/"}].concat(path);
    }
    return (
        <div className="Breadcrumb-container">
            <Breadcrumb>
                {path &&
                    path.map((item) =>
                        item.label === "Dashboard" ? (
                            <Breadcrumb.Item key={item.key}>
                                <Link to={`${item.key}`}>{item.label}</Link>
                            </Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item key={item.key}>{item.label}</Breadcrumb.Item>
                        )
                    )}
            </Breadcrumb>
        </div>
    );
};

export default Index;