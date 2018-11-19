import React from "react";
import { Row, Col } from 'antd';
import { Button } from  'antd';
import './controll.css';



class Controll extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return <div>
      <Row gutter={16} type="flex" justify="end" className="row">
        <Col span={2}>
          <Button type="primary">View</Button>
        </Col>
        <Col span={2}>col-4</Col>
        <Col span={2}>col-4</Col>
        <Col span={2}>col-4</Col>
      </Row>
    </div>
  }
}
export default Controll