import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resetPassword2 } from '../../redux/actions/auth'
import { browserHistory } from 'react-router';


class ResetPass2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            object: {},
            isSend: false,
            imagePreviewUrl: '',
            isLoading: false,
            isEdit: ''
        }
        console.log(props, 222);


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
        let toast = new iqwerty.toast.Toast();
        if (listUser.type === "RESET_PASSWORD2_SUCCESS") {
            toast.setText(listUser.data.message).show();
            setTimeout(() => browserHistory.push('/login'), 3000);
        }
        if (listUser.type === "RESET_PASSWORD2_FAIL") {
            toast.setText(listUser.data.message).show();
        }
        this.setState({ isLoading: false });
    }
    onChangeObject(e) {
        this.state.object[e.target.name] = e.target.value;
        this.setState({ object: this.state.object });
    }
    onSubmit(e) {
        e.preventDefault();
        if (!this.state.password) {
            var toast = new iqwerty.toast.Toast();
            toast.setText('password not null').show();
            return;
        }
        if (this.state.password !== this.state.rePassword) {
            var toast = new iqwerty.toast.Toast();
            toast.setText('re-password not match').show();
            return;
        }
        let params = {
            email: this.props.params.email,
            key: this.props.params.key,
            password: this.state.password
        }
        this.props.resetPassword2(params);
        this.setState({ isLoading: true });
    }


    renderForm() {
        if (this.state.isLoading === true) {
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
                <button className="btn btn-default" onClick={() => browserHistory.push('/login')}>
                    <i className="fa fa-reply" aria-hidden="true"></i> Back</button>
                <hr />
                <form className="form-horizontal" onSubmit={(e) => this.onSubmit(e)}>

                    <div className="form-group">
                        <label className="control-label col-sm-2">Password: </label>
                        <div className="col-sm-10">
                            <input name='email' type="password" className="form-control"
                                onChange={(e) => this.setState({ password: e.target.value })} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Re-password: </label>
                        <div className="col-sm-10">
                            <input name='email' type="password" className="form-control"
                                onChange={(e) => this.setState({ rePassword: e.target.value })} />
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

                    {this.renderForm(this)}
                </div>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        resetPassword2: (params) => dispatch(resetPassword2.bind(null, params)),
    }
}

export default connect(
    (state, ownProps) => ({
        auth: state.auth,
        user: state.user,
    })
    ,
    mapDispatchToProps
)(ResetPass2)