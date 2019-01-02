import React, { Component } from 'react'
import { browserHistory } from 'react-router'

export default class Logout extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        localStorage.removeItem('authZ');
        setTimeout(() => browserHistory.push('/login'), 100);
        ;
    }
    render() {
        return (<div></div>);
    }
}
