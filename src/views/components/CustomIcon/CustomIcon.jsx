import { HomeOutlined, ShopOutlined, TagOutlined, TagsOutlined, TeamOutlined } from '@ant-design/icons';

const AllIcons = {
    HomeOutlined,
    ShopOutlined,
    TagOutlined,
    TagsOutlined,
    TeamOutlined
};

const CustomIcon = ({type, props}) => {
    const MyIcon = AllIcons[type];
    return <MyIcon {...props}/>
};

export default CustomIcon;