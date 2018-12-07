import React from "react";
import {Layout} from "antd";
import "./app.css";
import FilesDashboard from "./FilesDashboard";
import WrappedHorizontalLoginForm from './LoginForm';
import {handleResponse} from './helper';

// const { SubMenu } = Menu;
const {Footer} = Layout;
// const { Link } = ReactRouterDOM;

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            user: {},
            errorMessage: ''
        }

        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    signIn(user) {
        fetch(`http://localhost:8282/enc/user/login?username=${user.name}&password=${user.password}`, {
            method: 'POST'
        })
            .then(handleResponse)
            .then((data) => {
                this.setState({
                    user: {
                        id: data.id,
                        name: data.username
                    },
                    errorMessage: ''
                });
            })
            .catch((error) => {
                this.setState({
                    errorMessage: error.message
                });
            });
    }

    signUp(user) {
        fetch(`http://localhost:8282/enc/user/reg?username=${user.name}&password=${user.password}`, {
            method: 'POST'
        })
            .then(handleResponse)
            .then((data) => {
                this.setState({
                    user : {
                        id: data.id,
                        name: data.username
                    },
                    errorMessage: ''
                });
            })
            .catch((error) => {
                this.setState({
                    errorMessage: error.message
                });
            });
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <Layout style={{height: '100%'}}>
                    {
                        this.state.user.name ?
                            <div>
                                <h2 style={{margin: '0 0 8 32'}}>You are logged as {this.state.user.name}.</h2>
                                <FilesDashboard
                                    user = {this.state.user}
                                />
                            </div>
                            :
                            <div>
                                {
                                    this.state.errorMessage &&
                                    <div style={{color: 'f5222d', marginLeft: 32}}>
                                        {this.state.errorMessage}
                                    </div>
                                }
                                <WrappedHorizontalLoginForm
                                    signIn = {this.signIn}
                                    signUp = {this.signUp}
                                />
                            </div>
                    }
                </Layout>
            </div>
        );
    }
}
