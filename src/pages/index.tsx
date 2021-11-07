// import { Menu, Switch } from 'antd';
// import {
//   AppstoreOutlined,
//   MailOutlined,
//   SettingOutlined,
// } from '@ant-design/icons';

// const { SubMenu } = Menu;

// // submenu keys of first level
// const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

// export default (): JSX.Element => {
//   const [openKeys, setOpenKeys] = useState<any[]>(['sub1']);

//   // TODO 这里暂时写any，业务开发使用type定义类型
//   const onOpenChange = (keys: any) => {
//     const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
//     if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
//       setOpenKeys(keys);
//     } else {
//       setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
//     }
//   };

//   return (
//     <>

//       <Menu

//         mode="inline"
//         openKeys={openKeys}
//         onOpenChange={onOpenChange}
//         style={{ width: 256, height: 800 }}
//       >
//         <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
//           <Menu.Item key="1">Option 1</Menu.Item>
//           <Menu.Item key="2">Option 2</Menu.Item>
//           <Menu.Item key="3">Option 3</Menu.Item>
//           <Menu.Item key="4">Option 4</Menu.Item>
//         </SubMenu>
//         <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
//           <Menu.Item key="5">Option 5</Menu.Item>
//           <Menu.Item key="6">Option 6</Menu.Item>
//           <SubMenu key="sub3" title="Submenu">
//             <Menu.Item key="7">Option 7</Menu.Item>
//             <Menu.Item key="8">Option 8</Menu.Item>
//           </SubMenu>
//         </SubMenu>
//         <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
//           <Menu.Item key="9">Option 9</Menu.Item>
//           <Menu.Item key="10">Option 10</Menu.Item>
//           <Menu.Item key="11">Option 11</Menu.Item>
//           <Menu.Item key="12">Option 12</Menu.Item>
//         </SubMenu>
//       </Menu>

//       {/* <Content /> */}
//     </>
//   );
// };

import { useState } from 'react';
import { Layout, Menu, Breadcrumb, Switch } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import './index.less';

import Example from '@/pages/example';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default (): JSX.Element => {
  const [menuTheme, setMenuTheme] = useState<'dark' | 'light'>('dark');
  const onChangeTheme = (value: any) => {
    setMenuTheme(value ? 'dark' : 'light');
  };

  return (
    <Layout>
      <div className="theme-change">
        <Switch
          checked={menuTheme === 'dark'}
          onChange={onChangeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </div>

      <Header className="header">
        <Menu theme={menuTheme} mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            theme={menuTheme}
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: window.screen.availHeight - 143, borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<NotificationOutlined />}
              title="subnav 3"
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '10px 24px' }}>
          {/* TODO  这里需要做一套路由匹配组件的计算 */}
          <Example />
        </Layout>
      </Layout>
    </Layout>
  );
};
