import React from "react";
import { Tree } from 'antd';

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;

class FileTree extends React.Component {
    constructor() {
        super();

        // this.state = {
        //     fileList: [],
        //     loading: false,
        // }
        //

        this.onSelect = this.onSelect.bind(this);
    };

    onSelect() {
        console.log('Trigger Select');
    };

    onExpand() {
        console.log('Trigger Expand');
    };

    render() {
        return (
            <div>
                <DirectoryTree
                    defaultExpandAll
                    onSelect={this.onSelect}
                    onExpand={this.onExpand}
                >
                    <TreeNode title="Root folder" key="0-0">
                        {
                            this.props.fileList.length &&
                            this.props.fileList.map((file) => (
                                <TreeNode title={file.name} key={file.size} isLeaf />
                            ))}
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
