import React from "react";
import { Tree, Button, Icon } from 'antd';

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;

class FileTree extends React.Component {
    constructor() {
        super();

        this.state = {
            selectedFile: {},
        }


        this.onSelect = this.onSelect.bind(this);
    };

    onSelect(key) {
        this.setState({
            selectedFile: {
                id: key,
                status: this.props.fileList.find(function(file){
                    return file.id === parseInt(key[0])
                }).status
            }
        });
    };

    render() {
        return (
            <div>
                <Button
                    type="primary"
                    style={{marginLeft:32}}
                    disabled = {this.state.selectedFile.status !== 'ENCRYPTED'}
                    onClick={
                        () => {
                            this.props.doDecrypt(this.state.selectedFile.id);
                            this.setState({
                                selectedFile: {}
                            });
                        }
                    }
                >
                    <Icon type="left" />Decrypt
                </Button>
                <Button
                    type="primary"
                    style={{marginLeft:16}}
                    disabled = {this.state.selectedFile.status !== 'DECRYPTED'}
                    onClick={
                        () => {
                            this.props.doEncrypt(this.state.selectedFile.id);
                            this.setState({
                                selectedFile: {}
                            })
                        }
                    }
                >
                    Encrypt<Icon type="right" />
                </Button>
                <DirectoryTree
                    defaultExpandAll
                    onSelect={this.onSelect}
                    onExpand={this.onExpand}
                    // selectedKeys = {this.state.selectedKeys}
                >
                    <TreeNode title="Root folder" key="0-0">
                        {
                            this.props.fileList.length &&
                            this.props.fileList.map((file) => (
                                <TreeNode title={file.name + ' -- ' + file.status} key={file.id} isLeaf />
                            ))
                        }
                    </TreeNode>
                </DirectoryTree>
                {
                    !this.props.fileList.length &&
                    <div style={{marginLeft:32}}>There are no files yet</div>
                }
            </div>
        );
    }
};

export default FileTree;
