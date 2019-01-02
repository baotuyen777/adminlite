import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import { getAllUser, deleteUser } from '../../redux/actions/user'

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isLoading: false,
            isDisabled: ''
        }
    }
    componentWillMount() {
        let params = {
            // date:
        }
        console.log(this.props,111)
        this.props.onGetAllUser(params);
    }
    componentWillReceiveProps(props) {
        console.log(props,222);
        const {listUser} = props.user;
        if (listUser.type === "USER_ALL_SUCCESS") {
            // console.log(props);return;
            this.setState({
                data: listUser.data.data,
            });

        }

        if (listUser.type === "USER_ALL_FAIL") {
            alert('load data fail');
        }
        this.setState({ isLoading: false });
    }
    onDelete(id) {
        if (!id) {
            alert({ notice: 'ID invalid' });
            return;
        }
        var r = confirm("Are you sure ?");
        if (r) {
            this.props.onDelele(id);
            this.setState({ isLoading: true });
        }
    }
    renderList() {
        if (this.state.data === null) {
            return (
                <div >
                    <center >
                        <div className="loading">
                            <i className="fa-spin fa fa-cog" aria-hidden="true"></i>
                        </div>
                    </center>
                </div>
            );
        }
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map((object, index) =>
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{object.name}</td>
                            <td>{object.email}</td>
                            <td><button onClick={() => this.onDelete(object.id) }><i className="fa fa-trash" aria-hidden="true"></i></button></td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        );

    }
    render() {

        return (
            <div>
                <div className="container">

                    <h1 className="text-center">User</h1>
                    <div className="action">
                        <button className="btn btn-success" onClick={() => browserHistory.push('/user/add') }>
                            <i className="fa fa-plus" aria-hidden="true"></i> Add new </button>
                    </div>
                    {this.renderList(this) }
                </div>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onSendDataLogin: (email, password) => dispatch(sendDataLogin.bind(null, email, password)),
        onGetAllUser: (params) => dispatch(getAllUser.bind(null, params)),
        onDelele: (params) => dispatch(deleteUser.bind(null, params)),
    }
}

export default connect(
    (state, ownProps) => ({
        auth: state.auth,
        user: state.user,
    })
    ,
    mapDispatchToProps
)(List)