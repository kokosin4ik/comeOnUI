import React from "react";
import { Tree } from 'antd';
import axios from 'axios';

const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;




class Files extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: true
    };
  }
  
  componentDidMount() {
    axios.get(`http://localhost:8080/api/files`)
    .then(res => {
      // debugger
      const data = res.data.message;
      this.setState({ data, loading: false });
    })
  }
  
  onSelect(data, b) {
    debugger
    console.log('Trigger Select');
  };
  
  onExpand(data) {
    console.log('Trigger Expand');
  };
  
  render() {
    
    let { loading, data } = this.state;
    
    if (loading) {
      return <div>
        Loading
      </div>
    }
    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.name} title={item.name}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode key={item.name} title={item.name} isLeaf/>;
    });
    return (
      <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={this.onSelect}
        onExpand={this.onExpand}
      >
        {loop(this.state.data)}
      </DirectoryTree>
    );
  }
}
export default Files