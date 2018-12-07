import React from "react";
import FileTree from './FileTree';
import "./FilesDashboard.css";
import {Button, Icon} from 'antd';
import UploadFile from './UploadFile';

class FilesDashboard extends React.Component {
    constructor() {
        super();

        this.state = {
            fileList: [],
            loading: false,
        }

        this.uploadFiles = this.uploadFiles.bind(this);
    }

    componentDidMount() {
        // debugger
        // fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
        //     .then(handleResponse)
        //     .then((data) => {
        //         const { currencies, totalPages } = data;
        //
        //         this.setState({
        //             currencies,
        //             loading: false,
        //             totalPages
        //         });
        //     })
        //     .catch((error) => {
        //         this.setState({
        //             error: error.errorMessage,
        //             loading: false,
        //         });
        //     });
    }

    uploadFiles(files) {
        //todo: Add userID

        // fetch('https://mywebsite.com/endpoint/', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(user)
        // })
        //     .then(handleResponse)
        //     .then((data) => {
        //         this.setState({
        //             fileList: data
        //         });
        //     })
        //     .catch((error) => {
        //         console.log("Error");
        //     });
        this.setState({
            fileList: this.state.fileList.concat(files)
        });
    }

    render() {
        return (
            <div style={{width: '40%'}}>
                <div className="decrypted-tree">
                    {/*<Button type="primary">*/}
                    {/*Decrypt<Icon type="right" />*/}
                    {/*</Button>*/}
                    <UploadFile
                        uploadFiles={this.uploadFiles}
                    />
                    <FileTree
                        fileList={this.state.fileList}
                    />

                </div>
            </div>

        );
    }
}

export default FilesDashboard;