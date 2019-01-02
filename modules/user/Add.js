import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addUser } from '../../redux/actions/user'
import { browserHistory } from 'react-router';
class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            object: {},
            file: '',
            imagePreviewUrl: '',
            isLoading: false,
            isEdit: ''
        }
    }
    componentWillMount() {
        let params = {
            // date:
        }
        console.log(this.props)
        // this.props.onGetAllUser(params);
    }
    componentWillReceiveProps(props) {
        const {listUser} = props.user;
        if (listUser.type === "USER_ADD_SUCCESS") {
            browserHistory.push('/order');
        }

        // if (listUser.type === "USER_ALL_FAIL") {
        //     alert('load data fail');
        // }
        this.setState({ isLoading: false });
    }
    onChangeObject(e) {
        this.state.object[e.target.name] = e.target.value;
        this.setState({ object: this.state.object });
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.object)
        const {name, email, password, rePassword} = this.state.object;
        if (!name || !email || !password) {
            alert('data not null');
            return;
        }
        if (this.state.password !== this.state.rePassword) {
            alert('repassword wrong');
            return;
        }
        delete this.state.object.rePassword;
        this.props.onAddUser(this.state.object);
        console.log(this.state.object)
    }


    renderForm() {

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
            <div>

                <form className="form-horizontal" onSubmit={(e) => this.onSubmit(e)}>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Name:</label>
                        <div className="col-sm-10">
                            <input name='name' type="text" className="form-control"
                                onChange={(e) => this.onChangeObject(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Email:</label>
                        <div className="col-sm-10">
                            <input name='email' type="email" className="form-control"
                                onChange={(e) => this.onChangeObject(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Pasword:</label>
                        <div className="col-sm-10">
                            <input name='password' type="password" className="form-control"
                                onChange={(e) => this.onChangeObject(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Retype password:</label>
                        <div className="col-sm-10">
                            <input name='rePassword' type="password" className="form-control"
                                onChange={(e) => this.onChangeObject(e)} />
                        </div>
                    </div>


                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );

    }
    render() {

        return (
            <div>
                <div className="container">

                    <h1 className="text-center">Register</h1>
                    <button className="btn btn-default" onClick={() => browserHistory.push('/user/list')}>
                        <i className="fa fa-reply" aria-hidden="true"></i> List</button>
                    {this.renderForm(this)}
                </div>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUser: (params) => dispatch(addUser.bind(null, params)),
    }
}

export default connect(
    (state, ownProps) => ({
        auth: state.auth,
        user: state.user,
    })
    ,
    mapDispatchToProps
)(Add)