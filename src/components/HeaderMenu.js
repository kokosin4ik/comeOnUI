import React from "react";
import { Layout, Menu} from "antd";
import { Link } from 'react-router-dom';
const { Header } = Layout;

export default class HeaderMenu extends React.Component {
  render() {
    return (
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1"><Link to='/'>Home</Link></Menu.Item>
          <Menu.Item key="2"><Link to='/map'>Map</Link></Menu.Item>
          {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
        </Menu>
      </Header>
    );
  }
}
