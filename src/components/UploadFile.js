import {
    Upload, Button, Icon, message,
} from 'antd';
// import reqwest from 'reqwest';
import React from "react";
import './UploadFile.css';

class UploadFile extends React.Component {
    constructor() {
        super();

        this.state = {
            fileList: [],
            uploading: false,
        }

        // const {uploadFiles} = this.props;



        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(event) {
        event.preventDefault();

        this.setState({
            uploading: true,
        });
        this.props.uploadFiles(this.filePath.value);

        this.setState({
            uploading: false,
        });
    }

    render() {
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {

                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <form style={{marginLeft:32}} onSubmit={this.handleUpload}>
                <input
                    className="path-input"
                    placeholder="Path to file"
                    ref={(input) => this.filePath = input}
                />
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Uploading' : 'Encrypt files' }
                </Button>
            </form>
        );
    }
}

export default UploadFile;