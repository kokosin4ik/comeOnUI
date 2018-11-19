import React from "react";
import { Layout, Breadcrumb } from "antd";
import { Row, Col } from 'antd';
import Files from './fileStructure/files';
import Controll from './controll/controll';
import './MainView.css';
import { Divider } from 'antd';
import openSocket from 'socket.io-client';

const  socket = openSocket('http://localhost:3000');
const { Content } = Layout;

export default class MainView extends React.Component {
  
  
  componentDidMount() {
    socket.on('timer', timestamp => console.log(timestamp));
    socket.emit('subscribeToTimer', 1000);
  }
  
  
  render() {
    return (
      <div className='main-div'>
        <Controll>
        </Controll>
        <Divider className='no-margin'/>
        <Row gutter={16} className='window'>
          <Col span={6}>
            <Files className="right-border"/>
          </Col>
    
          <Col span={18} />
        </Row>
        <Divider className='no-margin'/>
        
      </div>
      
    );
  }
}
