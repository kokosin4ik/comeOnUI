import React from "react";
import FileTree from './FileTree';
import "./FilesDashboard.css";
import {Button, Icon} from 'antd';
import UploadFileForm from './UploadFile';
import {handleResponse} from './helper';

class FilesDashboard extends React.Component {
    constructor() {
        super();

        this.state = {
            fileList: [],
            message: '',
            errorMessage: ''
        }

        this.uploadFiles = this.uploadFiles.bind(this);
        this.doDecrypt = this.doDecrypt.bind(this);
        this.doEncrypt = this.doEncrypt.bind(this);
    }

    componentDidMount() {
        this.fetchFiles();
    }

    doDecrypt(fileId) {
        fetch(`http://localhost:8282/enc/file/decrypt?fileId=${fileId}`, {
            method: 'POST',
        })
            .then(handleResponse)
            .then((file) => {
                this.setState({
                    message: `${file.name} has been successfully decrypted`,
                    errorMessage: ''
                });
                this.fetchFiles();
            })
            .catch((error) => {
                this.setState({
                    message: '',
                    errorMessage: error.message
                });
            });
    }

    doEncrypt(fileId) {
        fetch(`http://localhost:8282/enc/file/encrypt?fileId=${fileId}`, {
            method: 'POST',
        })
            .then(handleResponse)
            .then((file) => {
                this.setState({
                    message: `${file.name} has been successfully encrypted`,
                    errorMessage: ''
                });
                this.fetchFiles();
            })
            .catch((error) => {
                this.setState({
                    message: '',
                    errorMessage: error.message
                });
            });
    }

    fetchFiles() {
        fetch(`http://localhost:8282/enc/user/files?userId=${this.props.user.id}`)
            .then(handleResponse)
            .then((fileList) => {
                this.setState({
                    fileList
                });
            })
            .catch((error) => {
                console.log("Error");
            });
    }

    uploadFiles(file) {
        fetch(`http://localhost:8282/enc/file/save?path=${file.path}&userId=${this.props.user.id}`, {
            method: 'POST',
        })
            .then(handleResponse)
            .then((file) => {
                this.setState({
                    message: `${file.name} has been successfully added`,
                    errorMessage: ''
                });
                this.fetchFiles();
            })
            .catch((error) => {
                this.setState({
                    message: '',
                    errorMessage: error.message
                });
            });
    }

    render() {
        return (
            <div style={{width: '40%'}}>
                <div className="decrypted-tree">
                    <UploadFileForm
                        uploadFiles={this.uploadFiles}
                    />
                    {
                        this.state.message &&
                        <div style={{margin: '0 0 12 32', color: '#0b8235'}}><i>{this.state.message}</i></div>
                    }
                    {
                        this.state.errorMessage &&
                        <div style={{color: 'f5222d', margin: '0 0 12 32'}}>
                            <i>{this.state.errorMessage}</i>
                        </div>
                    }
                    <FileTree
                        fileList={this.state.fileList}
                        doEncrypt={this.doEncrypt}
                        doDecrypt={this.doDecrypt}
                    />

                </div>
            </div>

        );
    }
}

export default FilesDashboard;