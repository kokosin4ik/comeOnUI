import {
    Form, Select, Input, Button,
} from 'antd';
// import reqwest from 'reqwest';
import React from "react";
import './UploadFile.css';
import { Collapse } from 'antd';

const Panel = Collapse.Panel;

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class UploadFile extends React.Component {
    constructor() {
        super();

        // this.state = {
        //     fileList: [],
        //     uploading: false,
        // }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                // this.setState({
                //     uploading: true,
                // });
                this.props.uploadFiles({
                    path: this.props.form.getFieldValue('filePath'),
                    key: this.props.form.getFieldValue('keyPath'),
                });

                // this.setState({
                //     uploading: false,
                // });
            }
        });
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;

        const filePathError = isFieldTouched('filePath') && getFieldError('filePath');
        const keyPathError = isFieldTouched('keyPath') && getFieldError('keyPath');

        return (
            <Collapse style={{margin: '0 0 16 32'}}>
                <Panel header="Add new file" key="1">
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            label="File path"
                            labelCol={{span: 5}}
                            wrapperCol={{span: 12}}
                            validateStatus={filePathError ? 'error' : ''}
                            help={filePathError || ''}
                        >
                            {getFieldDecorator('filePath', {
                                rules: [{required: true, message: 'Please input file path!'}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem
                            label="Key path"
                            labelCol={{span: 5}}
                            wrapperCol={{span: 12}}
                            validateStatus={keyPathError ? 'error' : ''}
                            help={keyPathError || ''}
                        >
                            {getFieldDecorator('keyPath', {
                                rules: [{required: true, message: 'Please input key path!'}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem
                            wrapperCol={{span: 12, offset: 5}}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={hasErrors(getFieldsError())}
                            >
                                Add file
                            </Button>
                        </FormItem>
                    </Form>
                </Panel>
            </Collapse>
        );
    }
}
const UploadFileForm = Form.create()(UploadFile);
export default UploadFileForm;