import React from "react";

import {
    Form, Icon, Input, Button,
} from 'antd';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component {
    constructor() {
        super();

        // this.state = {
        //     fileList: [],
        //     loading: false,
        // }
        //

        this.handleSubmit = this.handleSubmit.bind(this);
        this.signUp = this.signUp.bind(this);
    };

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    signUp() {
        this.props.signUp({
            name: this.props.form.getFieldValue('userName'),
            password: this.props.form.getFieldValue('password'),
            keyPath: this.props.form.getFieldValue('keyPath'),
            flashPath: this.props.form.getFieldValue('flashPath')
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.signIn({
                    name: values.userName,
                    password: values.password,
                    keyPath: values.keyPath,
                    flashPath: values.flashPath
                });
            }
        });
    }

    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const keyPathError = isFieldTouched('keyPath') && getFieldError('keyPath');
        const flashPathError = isFieldTouched('flashPath') && getFieldError('flashPath');

        return (
            <Form onSubmit={this.handleSubmit} style={{width: '30%', height: 32, margin: '16 32 32 32'}}>
                <FormItem
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}
                >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}
                >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={keyPathError ? 'error' : ''}
                    help={keyPathError || ''}
                >
                    {getFieldDecorator('keyPath', {
                        rules: [{required: true, message: 'Please input key path!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Key path"/>
                    )}
                </FormItem>
                <FormItem
                    validateStatus={flashPathError ? 'error' : ''}
                    help={flashPathError || ''}
                >
                    {getFieldDecorator('flashPath', {
                        rules: [{required: true, message: 'Please input flash path!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Flash path"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        style = {{marginRight: 4}}
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        Sign in
                    </Button>
                    <Button
                        style = {{marginLeft: 4}}
                        type="danger"
                        disabled={hasErrors(getFieldsError())}
                        onClick={this.signUp}
                    >
                        Sign up
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedHorizontalLoginForm = Form.create()(LoginForm);

export default WrappedHorizontalLoginForm;