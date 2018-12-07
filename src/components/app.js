import React from "react";
import {Layout, Menu, Breadcrumb, Icon} from "antd";
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
            user: {}
        }

        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    signIn(user) {
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
        //         const { currencies, totalPages } = data;
        //
        //         this.setState({user});
        //     })
        //     .catch((error) => {
        //         console.log("Error");
        //     });
        this.setState({user});
    }

    signUp(user) {
        this.setState({user});
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <Layout style={{height: '100%'}}>
                    {
                        this.state.user.name ?
                            <div>
                                You are logged as {this.state.user.name}.
                                <FilesDashboard
                                    user = {this.state.user}
                                />
                            </div>
                            :
                            <WrappedHorizontalLoginForm
                                signIn = {this.signIn}
                                signUp = {this.signUp}
                            />
                    }
                </Layout>
            </div>
        );
    }
}
