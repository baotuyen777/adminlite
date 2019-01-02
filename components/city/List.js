import React, { Component } from 'react'
import List from './containers/List'
import {Header, Footer} from '../layout'
import { connect} from 'react-redux'
class ListComponent extends Component{
     constructor(props){
        super(props);
        const {page } = this.props.params;
        this.state={page};
    }
    componentWillReceiveProps(props){
        this.setState({page:props.params.page});
    }
   
    render(){
        const user=JSON.parse(localStorage.getItem("qsdkUser")) || null;
        if(user==null){
            setTimeout(()=>{var Router = require('react-router');
            Router.browserHistory.push('/login');},100)
        }
        return(
            <div>
            <Header data={user}/>
                <div className="container">
                    <h1>City</h1>
                    <List page={this.state.page} />
                </div>
            <Footer/>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch){
    return { 
        // onGetDataCity:()=> dispatch(getDataCity)
    }
}

export default connect(
    (state, ownProps) =>({
        // cityListData : state.city.cityList
    }),
  mapDispatchToProps
)(ListComponent)