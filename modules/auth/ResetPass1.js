import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resetPassword1 } from '../../redux/actions/auth'
import { browserHistory } from 'react-router';


class ResetPass1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            object: {},
            isSend: false,
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
        if (listUser.type === "RESET_PASSWORD1_SUCCESS") {
            this.setState({ isSend: true })
        }
        if (listUser.type === "RESET_PASSWORD1_FAIL") {
            var toast = new iqwerty.toast.Toast();
            toast.setText(listUser.data.message).show();
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
        if (!this.state.email) {

            var toast = new iqwerty.toast.Toast();
            toast.setText('email not null').show();
            return;
        }
        let params = {
            email: this.state.email,
            url: barseUrl + '/auth/reset-password-step2'
        }
        this.props.onResetPassword1(params);
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
        if (this.state.isSend === true) {
            return (
                <div >
                    <center >
                        <p>1 link confirm reset password sent to your mail! please check your mail!</p>
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
                        <label className="control-label col-sm-2">Email: </label>
                        <div className="col-sm-10">
                            <input name='email' type="email" className="form-control"
                                onChange={(e) => this.setState({ email: e.target.value })} />
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
        onResetPassword1: (params) => dispatch(resetPassword1.bind(null, params)),
    }
}

export default connect(
    (state, ownProps) => ({
        auth: state.auth,
        user: state.user,
    })
    ,
    mapDispatchToProps
)(ResetPass1)